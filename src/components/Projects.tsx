import { FaExternalLinkAlt } from "react-icons/fa"
import { useTranslation } from "react-i18next"

import { animation, gridDelay, useParallax, useReveal } from "@/animation"
import SectionHeader from "@/components/SectionHeader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SocialMediaLinks } from "@/utils/links"

type Post = {
  title: string
  description: string
  image: string
  /** Brand backdrop the logo sits on, so each mark keeps its own contrast. */
  background?: string
  status: "use" | "production" | "development"
}

/** Status dot colour. Only "in use" earns the accent. */
const statusDot = {
  use: "bg-primary",
  production: "bg-foreground",
  development: "bg-muted-foreground",
} as const

const posts: Post[] = [
  {
    title: "Yago - Mordomo Digital",
    description: "descriptionProjectYago",
    image: "/yago.png",
    status: "use",
    background: "bg-gradient-to-t from-[#35A8A7] to-[#3758AD]",
  },
  {
    title: "Y-Studio",
    description: "descriptionProjectYStudio",
    image: "/y-studio.png",
    status: "use",
    background: "bg-[#5F33B4]",
  },
  {
    title: "Porto Seguro Shopping",
    description: "descriptionProjectShopping",
    image: "/porto-seguro-shopping.webp",
    status: "development",
    background: "bg-[#F2EFE9]",
  },
]

const PostCard = ({ post, index }: { post: Post; index: number }) => {
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })
  const imageRef = useParallax<HTMLImageElement>(animation.parallax.projectImage)
  const { t: translate } = useTranslation()

  return (
    <li
      {...revealProps}
      className={cn(
        revealProps.className,
        "surface flex flex-col overflow-hidden md:card-lift",
      )}
    >
      <div
        className={cn(
          "relative flex aspect-[16/10] items-center justify-center overflow-hidden",
          post.background,
        )}
      >
        <img
          ref={imageRef}
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-[38%] max-w-[140px] object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn("h-1.5 w-1.5 rounded-full", statusDot[post.status])}
          />
          <span className="eyebrow">{translate(post.status)}</span>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{post.title}</h3>
        <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-muted-foreground">
          {translate(post.description)}
        </p>
      </div>
    </li>
  )
}

const Projects = () => {
  const { t: translate } = useTranslation()
  const cta = useReveal<HTMLDivElement>({ delay: 0.1 })

  return (
    <section id="projects" className="scroll-mt-20 border-y border-border bg-muted/50 py-16 md:py-28">
      <div className="container">
        <SectionHeader
          title={translate("projects")}
          lead={translate("descriptionProjects")}
          className="border-t-foreground/20"
        />

        <ul className="mt-11 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.title} post={post} index={index} />
          ))}
        </ul>

        <div
          {...cta.revealProps}
          className={cn(cta.revealProps.className, "mt-10 flex justify-center md:mt-12")}
        >
          <Button
            onClick={() =>
              window.open(`${SocialMediaLinks.github}?tab=repositories`, "_blank", "noopener")
            }
            variant="outline"
            size="lg"
            className="group"
          >
            {translate("moreProjectsOnGitHub")}
            <FaExternalLinkAlt
              className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Projects
