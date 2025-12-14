import { FaExternalLinkAlt } from "react-icons/fa"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useTranslation } from "react-i18next"
import { FaApple, FaReact } from "react-icons/fa"
import { DiAndroid } from "react-icons/di";
import { MdCss } from "react-icons/md";
import { RiNextjsFill } from "react-icons/ri";

const projects = [
  {
    title: "mobileDeveloper",
    company: "YaaYoo - Fusion Thinking",
    description: "descriptionExperienceMobileDeveloper",
    icons: [<FaApple key="apple" className="w-12 h-12" />, <DiAndroid key="android" className="w-12 h-12" />],
  },
  {
    title: "frontendDeveloper",
    company: "YaaYoo - Fusion Thinking",
    description: "descriptionExperienceFrontendDeveloper",
    icons: [<FaReact key="react" className="w-12 h-12" />, <RiNextjsFill key="nextjs" className="w-12 h-12" />],
  },
  {
    title: "portfolioWebsite",
    company: "projectFreelancer",
    description: "descriptionExperienceProjectFreelancer",
    icons: [<FaReact key="react" className="w-12 h-12" />, <MdCss key="css" className="w-12 h-12" />],
  },
]

const TimelineCard = ({
  project,
  isLeft,
}: {
  project: {
    title: string
    company: string
    description: string
    icons: JSX.Element[]
    link?: string
  }
  isLeft: boolean
}) => {
  const { t: translate } = useTranslation()
  return (
    <a
      href={project.link}
      className="flex group bg-card border border-border rounded-lg overflow-hidden card-hover"
    >
      {!isLeft && (
        <div className="w-40 min-h-32 overflow-hidden items-center justify-center flex gap-5 bg-primary/5">
          {project.icons?.map((Icon) => Icon)}
        </div>
      )}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold transition-colors group-hover/card:text-primary">
            {translate(project.title)}
          </h3>
          {project?.link && (
            <FaExternalLinkAlt className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <p className="text-xs font-light text-muted-foreground leading-relaxed mb-2">
          {project.company}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {translate(project.description)}
        </p>
      </div>
      {isLeft && (
        <div className="w-40 min-h-32 overflow-hidden items-center justify-center flex gap-5 bg-primary/5">
          {project.icons?.map((Icon) => Icon)}
        </div>
      )}
    </a>
  )
}

const TimelineItem = ({
  project,
  isLeft,
}: {
  project: {
    title: string
    company: string
    description: string
    icons: JSX.Element[]
    link?: string
  }
  isLeft: boolean
}) => {
  const { elementRef, isVisible } = useScrollAnimation()

  return (
    <div
      ref={elementRef}
      className={`scroll-fade-in ${isVisible ? "visible" : ""
        } flex items-center w-full mb-8`}
    >
      <div className="w-5/12 relative group/card">
        {isLeft && (
          <div className="pr-8 z-10">
            <TimelineCard project={project} isLeft={isLeft} />
          </div>
        )}
        {isLeft && (
          <div
            className="
    absolute top-1/2 -right-24 h-0.5 -z-10
    bg-gradient-to-l from-primary/30 via-primary to-primary
    origin-right
    opacity-0 scale-x-0
    transition-all duration-200 ease-out
    group-hover/card:opacity-100
    group-hover/card:scale-x-100
  "
            style={{
              transform: "translateY(-50%)",
              width: "9rem",
            }}
          />
        )}
      </div>
      <div className="w-2/12 flex justify-center relative">
        <div
          className="
    w-4 h-4 bg-primary rounded-full border-4 border-background z-10
    shadow-primary/30
    transition-all duration-200
    group-hover:shadow-primary/60
    group-hover:scale-105
  "
        />
      </div>
      <div className="w-5/12 relative group/card">
        {!isLeft && (
          <div className="pl-8">
            <TimelineCard project={project} isLeft={isLeft} />
          </div>
        )}
        {!isLeft && (
          <div
            className="
    absolute top-1/2 -left-24 h-0.5 -z-10
    bg-gradient-to-r from-primary/30 via-primary to-primary
    origin-left
    opacity-0 scale-x-0
    transition-all duration-200 ease-out
    group-hover/card:opacity-100
    group-hover/card:scale-x-100
  "
            style={{
              transform: "translateY(-50%)",
              width: "9rem",
            }}
          />
        )}
      </div>
    </div>
  )
}

const MobileTimelineItem = ({ project }: { project: { title: string; description: string; icons: JSX.Element[]; link?: string } }) => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()
  return (
    <div
      ref={elementRef}
      className={`group scroll-fade-in ${isVisible ? "visible" : ""
        } flex w-full`}
    >
      <div className="flex items-start mr-6 relative">
        <div
          className="
    w-3 h-3 bg-primary rounded-full border-2 border-background z-10 mt-2
    shadow-primary/30
    transition-all duration-200
    group-hover:shadow-primary/60
    group-hover:scale-105
  "
        />
        <div
          className="
    absolute top-[10px] left-3 h-0.5
    bg-gradient-to-r from-primary via-primary to-primary/30
    origin-left
    opacity-0 scale-x-0
    transition-all duration-200 ease-out
    group-hover:opacity-100
    group-hover:scale-x-100
  "
          style={{ width: "calc(1.5rem - 0.75rem)" }}
        />
      </div>
      <div className="flex-1 pb-8">
        <a
          href={project.link}
          className="group block bg-card border border-border rounded-lg overflow-hidden card-hover"
        >
          <div className="aspect-video overflow-hidden items-center justify-center flex gap-5 bg-primary/5">
            {project.icons?.map((Icon) => Icon)}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                {translate(project.title)}
              </h3>
              {project?.link && (
                <FaExternalLinkAlt className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {translate(project.description)}
            </p>
          </div>
        </a>
      </div>
    </div>
  )
}

const Experiences = () => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()

  return (
    <section id="experiences" className="md:py-20 py-10 bg-muted/30 scroll-mt-10 md:scroll-mt-0">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {translate("experiences")}
          </h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            {translate("descriptionExperiences")}
          </p>
        </div>
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border -translate-x-1/2" />
          {projects.map((project, index) => (
            <TimelineItem
              key={index}
              project={project}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
        <div className="md:hidden relative">
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />
          {projects.map((project, index) => (
            <MobileTimelineItem key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experiences
