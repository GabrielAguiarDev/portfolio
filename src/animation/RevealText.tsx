import { Fragment, type ElementType } from "react"

import { cn } from "@/lib/utils"

import { animation } from "./config"
import { prefersReducedMotion } from "./runtime"
import { useReveal } from "./useReveal"

type RevealTextProps = {
  /** The text to render. Split on spaces; the full string stays accessible. */
  text: string
  /** Element to render as. Defaults to a heading-neutral span. */
  as?: ElementType
  className?: string
  /** Extra delay in seconds before the first word starts. */
  delay?: number
}

/**
 * Word-by-word masked reveal — the signature motion of the layout.
 *
 * Each word sits inside an `overflow: hidden` mask and slides up into place on
 * a staggered delay. The whole string is exposed via `aria-label` so assistive
 * tech reads it as one phrase rather than a list of words, and it stays in the
 * HTML for indexing either way.
 *
 * With reduced motion, or with `headingReveal` disabled, it renders as plain
 * text with no wrapper spans at all.
 */
const RevealText = ({ text, as, className, delay = 0 }: RevealTextProps) => {
  const Tag = (as ?? "span") as ElementType
  const { ref, revealed } = useReveal<HTMLElement>()

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
