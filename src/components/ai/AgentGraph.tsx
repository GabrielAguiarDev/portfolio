import { useCallback, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * How the work is actually dispatched.
 *
 * Project context arrives on the left, an orchestrator decides, specialised
 * subagents run in parallel on the right, and each one reports back. The
 * ember pulses run outward — a task being delegated — and the pale ones run
 * inward, which is the part that matters: an agent finishing is a report to be
 * judged, not a decision that has been made.
 *
 * The nodes are real HTML, so the names are selectable, localised and read by
 * a screen reader in the right order. Only the wiring is SVG, and it is
 * measured from the laid-out nodes rather than hardcoded — which is what lets
 * the same graph be three columns on a desktop and a single stack on a phone
 * with no second set of coordinates.
 *
 * The pulses are CSS animations on `stroke-dashoffset`, so no JavaScript runs
 * per frame. That property is not compositor-animatable in any engine though,
 * so each animated path costs a main-thread paint every frame — which is why
 * the whole set is paused whenever the graph is off screen, the same pause
 * discipline the two canvases on this page follow.
 */

export type AgentGraphLabels = {
  /** Where context comes from, in the order they should be read. */
  context: string[]
  /** The orchestrator, and the one line that says what it does. */
  core: { label: string; note: string }
  /** The specialists it delegates to. */
  specialists: string[]
  legend: { dispatch: string; report: string }
  /** Description of the whole figure, for assistive technology. */
  caption: string
}

type Edge = {
  from: string
  to: string
  /** Seconds of head start, so the graph never pulses all at once. */
  delay: number
  /** A report travelling back toward the orchestrator. */
  back?: boolean
}

/** One full pass of a pulse along an edge, in seconds. */
const PULSE_SECONDS = 4.4

const CORE = "core"

/** Marks a node the wiring attaches to. Its value is the edge endpoint id. */
const NODE_ATTR = "data-agent-node"

const AgentGraph = ({
  labels,
  className,
}: {
  labels: AgentGraphLabels
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pending = useRef(0)
  const [box, setBox] = useState({ width: 0, height: 0 })
  const [wires, setWires] = useState<{ id: string; d: string; edge: Edge }[]>([])
  // Starts paused: this section is well below the fold, so the pulses should
  // not tick before the observer confirms the graph is actually on screen.
  const [paused, setPaused] = useState(true)

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const frame = container.getBoundingClientRect()
    if (!frame.width || !frame.height) return

    // Endpoints are resolved from the DOM in one query rather than through a
    // ref map. A ref callback per node cannot be made stable — `register(id)`
    // allocates a new closure every render, so React detaches and reattaches
    // every node on every commit — and this also keeps the endpoint ids in one
    // place instead of requiring the markup and the edge list to agree by hand.
    const centres = new Map<string, { x: number; y: number }>()

    for (const node of container.querySelectorAll<HTMLElement>(`[${NODE_ATTR}]`)) {
      const id = node.getAttribute(NODE_ATTR)
      if (!id) continue
      const rect = node.getBoundingClientRect()
      centres.set(id, {
        x: rect.left - frame.left + rect.width / 2,
        y: rect.top - frame.top + rect.height / 2,
      })
    }

    const edges: Edge[] = [
      ...labels.context.map((_, index) => ({
        from: `context-${index}`,
        to: CORE,
        delay: index * 0.55,
      })),
      ...labels.specialists.flatMap((_, index) => [
        { from: CORE, to: `specialist-${index}`, delay: 1.1 + index * 0.42 },
        { from: CORE, to: `specialist-${index}`, delay: 2.6 + index * 0.42, back: true },
      ]),
    ]

    const next: { id: string; d: string; edge: Edge }[] = []

    edges.forEach((edge, index) => {
      const a = centres.get(edge.from)
      const b = centres.get(edge.to)
      if (!a || !b) return

      const dx = b.x - a.x
      const dy = b.y - a.y

      // Control points follow whichever axis the pair is actually separated
      // along, so the same edge reads as a horizontal fan on a wide screen and
      // a vertical trunk on a narrow one.
      const d =
        Math.abs(dx) >= Math.abs(dy)
          ? `M ${a.x} ${a.y} C ${a.x + dx * 0.5} ${a.y}, ${b.x - dx * 0.5} ${b.y}, ${b.x} ${b.y}`
          : `M ${a.x} ${a.y} C ${a.x} ${a.y + dy * 0.5}, ${b.x} ${b.y - dy * 0.5}, ${b.x} ${b.y}`

      next.push({ id: `${edge.from}-${edge.to}-${index}`, d, edge })
    })

    setBox({ width: frame.width, height: frame.height })
    setWires(next)
  }, [labels])

  /**
   * One measure per frame at most.
   *
   * A window drag fires the ResizeObserver every frame, and each measure is a
   * forced layout read per node plus two state updates that rebuild twelve
   * path strings and re-render twenty-four paths. Coalescing also keeps the
   * SVG's `viewBox` from lagging its box by more than one frame, which is the
   * interval in which the wires sit off the nodes. Same pattern the navbar
   * uses for its scroll handler.
   */
  const schedule = useCallback(() => {
    if (pending.current) return
    pending.current = requestAnimationFrame(() => {
      pending.current = 0
      measure()
    })
  }, [measure])

  useLayoutEffect(() => {
    // The first pass is synchronous: there is nothing to draw until the nodes
    // are measured, so deferring it would show a bare graph for a frame.
    measure()

    const container = containerRef.current
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null

    // The container alone is not enough: a longer translation re-wraps a pill
    // without changing the box around it, which moves the endpoints.
    if (container) {
      resizeObserver?.observe(container)
      for (const node of container.querySelectorAll<HTMLElement>(`[${NODE_ATTR}]`)) {
        resizeObserver?.observe(node)
      }
    }

    // `stroke-dashoffset` is painted on the main thread, so the pulses stop
    // outright while the graph cannot be seen rather than ticking for the
    // whole life of the page.
    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
            threshold: 0,
          })
        : null

    if (container && intersectionObserver) intersectionObserver.observe(container)
    // No observer to tell us: leave them running rather than never starting.
    else setPaused(false)

    // Webfonts land after first paint and shift every label.
    let cancelled = false
    document.fonts?.ready
      .then(() => {
        if (!cancelled) schedule()
      })
      .catch(() => {})

    return () => {
      cancelled = true
      if (pending.current) cancelAnimationFrame(pending.current)
      pending.current = 0
      resizeObserver?.disconnect()
      intersectionObserver?.disconnect()
    }
  }, [measure, schedule])

  return (
    <figure className={cn("relative", className)}>
      <div ref={containerRef} className="relative">
        {/* Behind the nodes, which are opaque — that is what trims each edge
            to the pill it arrives at without any endpoint arithmetic.

            No `preserveAspectRatio="none"`: the viewBox is the box in CSS
            pixels, so the default uniform fit is a 1:1 map, and in the single
            frame where a resize has outrun React it scales the wiring instead
            of shearing it. */}
        <svg
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full",
            paused && "agent-wires-paused",
          )}
          viewBox={`0 0 ${box.width || 1} ${box.height || 1}`}
        >
          {wires.map((wire) => (
            <g key={wire.id}>
              <path
                d={wire.d}
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="agent-pulse"
                d={wire.d}
                fill="none"
                pathLength={100}
                strokeDasharray="2.5 97.5"
                strokeLinecap="round"
                strokeWidth={wire.edge.back ? 2 : 2.5}
                stroke={
                  wire.edge.back ? "hsl(var(--foreground) / 0.55)" : "hsl(var(--primary))"
                }
                vectorEffect="non-scaling-stroke"
                style={{
                  animationDuration: `${PULSE_SECONDS}s`,
                  // Negative, so every edge starts already mid-cycle. A
                  // positive delay parks a visible dash at the path's start
                  // until it elapses — nearly four seconds of stationary dots
                  // on arrival, which reads as exactly the rendering fault the
                  // reduced-motion rule for this class exists to avoid.
                  animationDelay: `-${wire.edge.delay}s`,
                  animationDirection: wire.edge.back ? "reverse" : "normal",
                }}
              />
            </g>
          ))}
        </svg>

        {/* Capped and centred: the three columns are each 1fr, so on a very
            wide panel the edges would stretch into a pair of long flat lines
            with the whole graph marooned in the middle of it. */}
        <div className="relative mx-auto grid w-full max-w-4xl gap-y-8 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-x-10 lg:gap-x-12">
          {/* Context in, held against the left edge so its edges have a run. */}
          <ul className="flex flex-wrap justify-center gap-3 sm:flex-col sm:items-start">
            {labels.context.map((label, index) => (
              <li key={label}>
                <span
                  {...{ [NODE_ATTR]: `context-${index}` }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground"
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* The orchestrator */}
          <div className="flex justify-center">
            <div
              {...{ [NODE_ATTR]: CORE }}
              className="relative flex flex-col items-center gap-1 rounded-[--radius] border border-foreground/20 bg-card px-6 py-5 text-center"
            >
              <span
                aria-hidden="true"
                className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary"
              />
              <span className="display-sm text-foreground">{labels.core.label}</span>
              <span className="max-w-[16ch] text-pretty text-[0.75rem] leading-snug text-muted-foreground">
                {labels.core.note}
              </span>
            </div>
          </div>

          {/* The specialists, held against the right edge. `w-fit` with an
              auto left margin pushes the group out there while keeping the
              pills flush with each other, so four edges arrive at one x
              instead of four. */}
          <ul className="grid grid-cols-2 gap-3 sm:ml-auto sm:w-fit sm:grid-cols-1 sm:gap-2.5">
            {labels.specialists.map((label, index) => (
              <li key={label} className="flex sm:justify-start">
                <span
                  {...{ [NODE_ATTR]: `specialist-${index}` }}
                  className="inline-flex w-full items-center gap-2.5 rounded-full border border-border bg-card px-3.5 py-2 text-[0.8125rem] font-medium tracking-tight text-foreground/85 sm:w-auto"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/25"
                  />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Held to the same width as the graph, so the rule under it reads as
          part of the figure rather than as a divider in the panel. */}
      <figcaption className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-5">
        {/* The prose caption is the figure's whole accessible description. The
            legend beside it is hidden from assistive technology on purpose:
            its two words mean nothing without the colour swatches they label,
            and the caption already states both directions in full. */}
        <span className="sr-only">{labels.caption}</span>

        <span aria-hidden="true" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {[
            { label: labels.legend.dispatch, tone: "bg-primary" },
            { label: labels.legend.report, tone: "bg-foreground/50" },
          ].map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span className={cn("h-px w-6", item.tone)} />
              <span className="eyebrow">{item.label}</span>
            </span>
          ))}
        </span>
      </figcaption>
    </figure>
  )
}

export default AgentGraph
