import { RevealText, useReveal } from "@/animation"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  lead?: string
  className?: string
}

/**
 * The editorial header used by every section: a hairline rule, a large serif
 * heading that reveals word by word, and an optional lead paragraph.
 */
const SectionHeader = ({ title, lead, className }: SectionHeaderProps) => {
  const { revealProps } = useReveal<HTMLParagraphElement>({ delay: 0.12 })

  return (
    <header className={cn("border-t border-border pt-7 md:pt-10", className)}>
      <RevealText
        as="h2"
        text={title}
        className="heading-lg text-balance text-foreground"
      />
      {lead ? (
        <p
          {...revealProps}
          className={cn(
            revealProps.className,
            "mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg",
          )}
        >
          {lead}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeader
