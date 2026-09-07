import { useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import type { Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * The pieces every case study shares.
 *
 * Each project composes these differently — that is the whole point of the
 * section — but the information they carry is identical, so a visitor learns
 * to read the second and third case study faster than the first.
 */

export const CaseIndex = ({ index }: { index: number }) => (
  <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted-foreground">
    {String(index + 1).padStart(2, "0")}
  </span>
)

export const StatusPill = ({ status }: { status: Project["status"] }) => {
  const { pick } = useLocale()
  const live = status === "live"

  return (
    <span className="inline-flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {live ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
        ) : null}
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            live ? "bg-primary" : "bg-muted-foreground",
          )}
        />
      </span>
      {pick(live ? COPY.work.live : COPY.work.building)}
    </span>
  )
}

/** Kind → name → headline → summary. The reading order of every case study. */
export const CaseTitle = ({
  project,
  index,
  className,
}: {
  project: Project
  index: number
  className?: string
}) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>()

  return (
    <div {...revealProps} className={cn(revealProps.className, className)}>
      <div className="flex items-center gap-4">
        <CaseIndex index={index} />
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        <StatusPill status={project.status} />
      </div>

      <p className="mt-6 text-[0.8125rem] font-medium tracking-tight text-muted-foreground">
        {pick(project.kind)}
      </p>

      {/* The brand mark rides with the name rather than floating in the device
          composition, where it always ended up colliding with a screen. */}
      <div className="mt-3 flex items-center gap-3.5">
        <BrandMark project={project} className="h-9 w-9 shrink-0 rounded-[0.625rem]" />
        <h3 className="display-lg text-balance text-foreground">{project.name}</h3>
      </div>

      <p className="display-sm mt-6 max-w-[24ch] text-balance text-foreground/80">
        {pick(project.headline)}
      </p>

      <p className="mt-5 max-w-[46ch] text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
        {pick(project.summary)}
      </p>
    </div>
  )
}

/**
 * The three beats: problem → what I built → what I owned.
 *
 * Rendered as a rule-separated list rather than cards, so it reads as an
 * editorial sidebar and doesn't compete with the device composition for
 * attention.
 */
export const CaseBeats = ({
  project,
  className,
  delay = 0.1,
}: {
  project: Project
  className?: string
  delay?: number
}) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLDListElement>({ delay })

  return (
    <dl {...revealProps} className={cn(revealProps.className, className)}>
      {project.beats.map((beat) => (
        <div key={beat.label.en} className="border-t border-border pb-4 pt-4 md:pb-0">
          <dt className="eyebrow">{pick(beat.label)}</dt>
          <dd className="mt-2 text-pretty text-sm leading-relaxed text-foreground/85">
            {pick(beat.value)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/** Role and stack — the credentials strip, kept quiet and typographic. */
export const CaseFacts = ({
  project,
  className,
  delay = 0.16,
}: {
  project: Project
  className?: string
  delay?: number
}) => {
  const { pick } = useLocale()
  const { revealProps } = useReveal<HTMLDivElement>({ delay })

  return (
    <div {...revealProps} className={cn(revealProps.className, className)}>
      <div>
        <p className="eyebrow">{pick(COPY.work.role)}</p>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground/85">
          {pick(project.role)}
        </p>
      </div>

      <div className="mt-6">
        <p className="eyebrow">{pick(COPY.work.stack)}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.platforms.map((platform) => (
            <li
              key={platform}
              className="tag border-foreground/25 text-foreground"
            >
              {platform}
            </li>
          ))}
          {project.stack.map((tool) => (
            <li key={tool} className="tag">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** The project's logo on its own brand field. Used as a quiet corner mark. */
export const BrandMark = ({ project, className }: { project: Project; className?: string }) => {
  if (!project.logo) return null

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl border border-white/10",
        className,
      )}
      style={{
        background: `linear-gradient(140deg, ${project.brand.from}, ${project.brand.to})`,
      }}
    >
      <img
        src={project.logo}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="max-h-[46%] max-w-[58%] object-contain"
      />
    </div>
  )
}
