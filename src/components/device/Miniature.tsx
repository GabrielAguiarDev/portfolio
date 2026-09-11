import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

/**
 * Renders a desktop layout at its authoring width and scales the result down.
 *
 * The web screens in this project are authored against a fixed logical width,
 * the same way the phone screens are authored against `SCREEN_WIDTH` — a dense
 * dashboard has a width at which its type, rails and tables are correct, and
 * reflowing it into a 260px preview box would not make it small, it would make
 * it wrong. So the layout is rendered at its real width and transformed.
 *
 * The box takes its height from what is actually inside it. A fixed aspect
 * ratio would be unrelated to the content: too tall and the browser window
 * sits above a band of dead chrome, too short and the dashboard is cropped —
 * and which one it is would change silently every time the screen it wraps
 * grew a row.
 */
const Miniature = ({
  width,
  ratio,
  background,
  children,
}: {
  width: number
  /**
   * Width ÷ height to crop the result to, instead of taking the height from
   * the content.
   *
   * A dashboard is a scrolling document: authored whole, it is two and a half
   * screens tall, and a frame drawn around all of it is a frame no monitor has
   * ever been. Passing `16 / 10` shows what a laptop actually shows — the top
   * of the page, in the shape the reader recognises — and lets the rest run
   * past the bottom edge the way it does in the product.
   *
   * The height is exact, not a ceiling — a monitor is the same shape whatever
   * is on it. A page shorter than the screen simply ends, and what shows below
   * it is the page's own ground, which is why `background` travels with the
   * ratio rather than being optional decoration.
   */
  ratio?: number
  /**
   * The page's own background, painted behind the scaled content.
   *
   * Only meaningful with `ratio`. Without it the box is exactly as tall as what
   * is inside and nothing can show through; with it, a short page leaves real
   * estate that has to be the product's canvas colour and not the browser
   * chrome's near-black, or the window reads as a failed render.
   */
  background?: string
  children: ReactNode
}) => {
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [height, setHeight] = useState(0)

  /*
    Layout effect, not a passive one.

    The scale is applied before the browser paints, so the content arrives at
    its right size in the first frame it is visible. As a passive effect it
    landed one frame late, and the figure inside visibly assembled itself after
    the frame around it had already appeared.
  */
  useLayoutEffect(() => {
    const outer = box.current
    const inner = content.current
    if (!outer || !inner) return

    const measure = () => {
      const outerWidth = outer.getBoundingClientRect().width
      const factor = outerWidth / width
      setScale(factor)
      // With a ratio the height comes from CSS, below — measuring it here
      // would only re-derive a number the browser already has.
      if (!ratio) setHeight(inner.offsetHeight * factor)
    }

    if (typeof ResizeObserver === "undefined") {
      measure()
      return
    }

    const observer = new ResizeObserver(measure)
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [width, ratio])

  return (
    <div
      ref={box}
      className="w-full overflow-hidden"
      /*
        Zero until measured, never `auto`.

        With no height of its own the box takes one from its content — and the
        content is the layout at its *authoring* width, because a transform does
        not affect layout. So for the frame before the first measurement a
        1180px dashboard made this box some 740px tall, and everything sizing
        itself from the result believed it. That is not a cosmetic flash: the
        hover preview places its card by reading this card's height, and it was
        reading a number four times too large and flipping the card to the wrong
        side of the pointer.
      */
      /*
        With a ratio the height is CSS, so the box is its final shape in the
        first layout pass — before any measurement. That matters more than it
        sounds: a JS-measured height means the window opens flat and unfolds a
        frame later, inside a card that has already appeared. One thing
        arriving in two pieces is most of what reads as unpolished here.
      */
      style={{
        height: ratio ? undefined : height,
        aspectRatio: ratio ? String(ratio) : undefined,
        background,
      }}
    >
      <div
        ref={content}
        style={{
          width,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          // Hidden until measured, so the layout never flashes at 1:1.
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Miniature
