import type { ReactNode } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import { useTranslation } from "react-i18next"
import { FaApple, FaReact } from "react-icons/fa"
import { DiAndroid } from "react-icons/di"
import { MdCss } from "react-icons/md"
import { RiNextjsFill } from "react-icons/ri"

import { gridDelay, useReveal, useTimelineDraw } from "@/animation"
import SectionHeader from "@/components/SectionHeader"
import { cn } from "@/lib/utils"

type Experience = {
  title: string
  subTitle: string
  description: string
  icons: ReactNode[]
  link?: string
}

const iconClass = "h-6 w-6"

const projects: Experience[] = [
  {
    title: "mobileDeveloper",
    subTitle: "YaaYoo - Fusion Thinking",
    description: "descriptionExperienceMobileDeveloper",
    icons: [<FaApple key="apple" className={iconClass} />, <DiAndroid key="android" className={iconClass} />],
  },
  {
    title: "frontendDeveloper",
    subTitle: "YaaYoo - Fusion Thinking",
    description: "descriptionExperienceFrontendDeveloper",
    icons: [<FaReact key="react" className={iconClass} />, <RiNextjsFill key="nextjs" className={iconClass} />],
  },
  {
    title: "titleProjectFreelancer",
    subTitle: "descriptionProjectFreelancer",
    description: "descriptionExperienceProjectFreelancer",
    icons: [<FaReact key="react" className={iconClass} />, <MdCss key="css" className={iconClass} />],
  },
]

const TimelineEntry = ({ project, index }: { project: Experience; index: number }) => {
  const { t: translate } = useTranslation()
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })

  const Card = project.link ? "a" : "article"
  const cardProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer noopener" }
    : {}

  return (
    <li
      {...revealProps}
      className={cn(revealProps.className, "grid grid-cols-[12px_1fr] gap-x-5 pb-6 last:pb-0 md:gap-x-8 md:pb-8")}
    >
      {/* Node sitting on the rail. The background-coloured border cuts a gap
          into the line so the dot reads as a marker, not a bulge. */}
      <span
        aria-hidden="true"
        className="mt-[13px] h-3 w-3 rounded-full border-[3px] border-background bg-primary"
      />

      <Card
        {...cardProps}
        className="surface block p-5 transition-colors duration-300 md:card-lift md:p-7"
      >
        {/* On a phone the icons take their own row above the title, so a long
            role name is never squeezed into a narrow column. */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
          <div
            className="order-first flex items-center gap-3 text-muted-foreground md:order-last md:shrink-0"
            aria-hidden="true"
          >
            {project.icons}
            {project.link ? <FaExternalLinkAlt className="h-3.5 w-3.5" /> : null}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              {translate(project.title)}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{translate(project.subTitle)}</p>
          </div>
        </div>
        <p className="mt-4 whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
          {translate(project.description)}
        </p>
      </Card>
    </li>
  )
}

const Experiences = () => {
  const { t: translate } = useTranslation()
  const { containerRef, railRef } = useTimelineDraw<HTMLOListElement, HTMLSpanElement>()

  return (
    <section id="experiences" className="scroll-mt-20 border-y border-border bg-muted/50 py-16 md:py-28">
      <div className="container">
        <SectionHeader
          title={translate("experiences")}
          lead={translate("descriptionExperiences")}
          className="border-t-foreground/20"
        />

        <ol ref={containerRef} className="relative mt-11 md:mt-16">
          {/* The rail. Laid out fully drawn, then scrubbed by GSAP when the
              motion runtime is available — so it is always visible either way. */}
          <span
            ref={railRef}
            aria-hidden="true"
            className="absolute bottom-4 left-[5px] top-4 w-0.5 origin-top rounded-full bg-gradient-to-b from-primary via-primary/40 to-border"
          />
          {projects.map((project, index) => (
            <TimelineEntry key={project.title} project={project} index={index} />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experiences
