import { useReveal } from "@/animation"
import { COPY } from "@/content/copy"
import { platformsOf, type Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

const LOGO_SIZES: Record<string, string> = {
  yago: "max-h-[74%] max-w-[84%]",
  "y-studio": "max-h-[60%] max-w-[72%]",
  "porto-seguro-shopping": "max-h-[60%] max-w-[72%]",
  "aguiar-one": "max-h-[68%] max-w-[78%]",
  vez: "max-h-[68%] max-w-[78%]",
}


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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <CaseIndex index={index} />
        <span aria-hidden="true" className="h-px w-8 bg-border" />
        <StatusPill status={project.status} />
        {project.year ? (
          <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-muted-foreground">
            {project.year}
          </span>
        ) : null}
      </div>

      <p className="mt-6 text-[0.8125rem] font-medium tracking-tight text-muted-foreground">
        {pick(project.kind)}
      </p>

      <div className="mt-3 flex items-center gap-3.5">
        <BrandMark project={project} className="h-9 w-9 shrink-0 rounded-[0.625rem]" />
        <h1 className="display-lg text-balance text-foreground">{project.name}</h1>
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
        <p className="eyebrow">{pick(COPY.work.context)}</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          {project.context.company}
        </p>
        {project.context.kind === "freelance" ? (
          <p className="mt-1 text-xs text-muted-foreground">{pick(COPY.work.freelance)}</p>
        ) : null}
      </div>

      <div className="mt-6">
        <p className="eyebrow">{pick(COPY.work.stack)}</p>
        <ul className="mt-3 flex flex-wrap gap-2 empty:mt-0">
          {platformsOf(project).map((platform) => (
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

export const BrandMark = ({
  project,
  className,
}: {
  project: Project
  className?: string
}) => (
  <div
    className={cn(
      "flex items-center justify-center overflow-hidden rounded-2xl border border-white/10",
      className,
    )}
    style={{
      background:
        project.brand.surface ??
        `linear-gradient(140deg, ${project.brand.from}, ${project.brand.to})`,
    }}
  >
    {project.logo ? (
      <img
        src={project.logo}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className={cn(
          "max-h-[54%] max-w-[66%] object-contain",
          LOGO_SIZES[project.id],
        )}
      />
    ) : (
      <span
        aria-hidden="true"
        className="font-display text-[0.875rem] font-semibold leading-none"
        style={{ color: project.brand.ink }}
      >
        {project.name.trim().charAt(0).toUpperCase()}
      </span>
    )}
  </div>
)
