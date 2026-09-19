import { useCallback, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"


export type AgentGraphLabels = {
  context: string[]
  core: { label: string; note: string }
  specialists: string[]
  legend: { dispatch: string; report: string }
  caption: string
}

type Edge = {
  from: string
  to: string
  delay: number
  back?: boolean
}

const PULSE_SECONDS = 4.4

const CORE = "core"

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
  const [paused, setPaused] = useState(true)

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const frame = container.getBoundingClientRect()
    if (!frame.width || !frame.height) return

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

      const d =
        Math.abs(dx) >= Math.abs(dy)
          ? `M ${a.x} ${a.y} C ${a.x + dx * 0.5} ${a.y}, ${b.x - dx * 0.5} ${b.y}, ${b.x} ${b.y}`
          : `M ${a.x} ${a.y} C ${a.x} ${a.y + dy * 0.5}, ${b.x} ${b.y - dy * 0.5}, ${b.x} ${b.y}`

      next.push({ id: `${edge.from}-${edge.to}-${index}`, d, edge })
    })

    setBox({ width: frame.width, height: frame.height })
    setWires(next)
  }, [labels])

  const schedule = useCallback(() => {
    if (pending.current) return
    pending.current = requestAnimationFrame(() => {
      pending.current = 0
      measure()
    })
  }, [measure])

  useLayoutEffect(() => {
    measure()

    const container = containerRef.current
    const resizeObserver =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null

    if (container) {
      resizeObserver?.observe(container)
      for (const node of container.querySelectorAll<HTMLElement>(`[${NODE_ATTR}]`)) {
        resizeObserver?.observe(node)
      }
    }

    const intersectionObserver =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
            threshold: 0,
          })
        : null

    if (container && intersectionObserver) intersectionObserver.observe(container)
    else setPaused(false)

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
                  animationDelay: `-${wire.edge.delay}s`,
                  animationDirection: wire.edge.back ? "reverse" : "normal",
                }}
              />
            </g>
          ))}
        </svg>

        <div className="relative mx-auto grid w-full max-w-4xl gap-y-8 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-x-10 lg:gap-x-12">
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

      <figcaption className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-5">
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
