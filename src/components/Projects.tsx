import { FaExternalLinkAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useTranslation } from "react-i18next"
import { SocialMediaLinks } from "@/utils/links"

type Post = {
  title: string
  description: string
  image: string
  background?: string
  status: "use" | "production" | "development"
}

const statusColor = {
  use: {
    bg: "bg-card",
    text: "text-primary",
  },
  production: {
    bg: "bg-card",
    text: "text-secondary",
  },
  development: {
    bg: "bg-card",
    text: "text-tertiary",
  },
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
    background: "bg-white",
  },
]

const PostCard = ({ post }: { post: Post; }) => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()
  return (
    <a
      ref={elementRef as any}
      className={`group block bg-card border border-border rounded-lg overflow-hidden md:card-hover scroll-fade-in ${isVisible ? "visible" : ""
        }`}
    >
      <div className={`relative aspect-video flex justify-center items-center overflow-hidden ${post.background}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-1/3 h-w-1/3 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute bottom-3 right-0 ${statusColor[post.status].bg
            } pt-1 pb-1 pl-3 pr-5 rounded-tl-full rounded-bl-full`}
        >
          <p
            className={`${statusColor[post.status].text
              } text-sm font-semibold`}
          >
            {translate(post.status)}
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-2">
        <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {translate(post.description)}
        </p>
      </div>
    </a>
  )
}

const Projects = () => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()

  return (
    <section id="projects" className="md:py-20 py-10 bg-muted/30 scroll-mt-10 md:scroll-mt-0">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {translate("projects")}
          </h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">
            {translate("descriptionProjects")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => {
            return <PostCard key={post.title} post={post} />
          })}
        </div>

        <div
          className={`text-center scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          <Button
            onClick={() =>
              window.open(
                `${SocialMediaLinks.github}?tab=repositories`,
                "_blank",
              )
            }
            variant="outline"
            size="lg"
            className="group"
          >
            {translate("moreProjectsOnGitHub")}
            <FaExternalLinkAlt className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Projects
