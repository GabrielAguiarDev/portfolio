import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

const Miniature = ({
  width,
  ratio,
  background,
  children,
}: {
  width: number
  ratio?: number
  background?: string
  children: ReactNode
}) => {
  const box = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const outer = box.current
    const inner = content.current
    if (!outer || !inner) return

    const measure = () => {
      const outerWidth = outer.getBoundingClientRect().width
      const factor = outerWidth / width
      setScale(factor)
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
          visibility: scale ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default Miniature
