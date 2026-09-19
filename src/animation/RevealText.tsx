import { Fragment, type ElementType } from "react"

import { cn } from "@/lib/utils"

import { animation } from "./config"
import { prefersReducedMotion } from "./runtime"
import { useReveal } from "./useReveal"

type RevealTextProps = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  hold?: boolean
}

const RevealText = ({ text, as, className, delay = 0, hold = false }: RevealTextProps) => {
  const Tag = (as ?? "span") as ElementType
  const { ref, revealed } = useReveal<HTMLElement>({ hold })

  if (!animation.enabled.headingReveal || prefersReducedMotion()) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = text.split(/\s+/).filter(Boolean)

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={cn("reveal-text", revealed && "is-revealed", className)}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="reveal-text__mask" aria-hidden="true">
            <span
              className="reveal-text__word"
              style={{
                transitionDelay: `${
                  delay + animation.delay.heading + index * animation.delay.headingWordStep
                }s`,
              }}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}

export default RevealText
