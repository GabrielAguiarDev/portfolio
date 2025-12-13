import { FaExternalLinkAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useTranslation } from "react-i18next"
import { SocialMediaLinks } from "@/utils/links"

type Post = {
  title: string
  description: string
  image: string
  status: "use" | "production" | "development"
}

const statusColor = {
  use: {
    bg: "bg-primary/40",
    text: "text-primary",
  },
  production: {
    bg: "bg-secondary/40",
    text: "text-secondary",
  },
  development: {
    bg: "bg-tertiary/40",
    text: "text-tertiary",
  },
} as const

const PostCard = ({ post, index }: { post: Post; index: number }) => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()
  return (
    <a
      ref={elementRef as any}
      className={`group block bg-card border border-border rounded-lg overflow-hidden card-hover scroll-fade-in ${
        isVisible ? "visible" : ""
      }`}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute bottom-3 right-0 ${
            statusColor[post.status].bg
          } pt-1 pb-1 pl-3 pr-5 rounded-tl-full rounded-bl-full`}
        >
          <p
            className={`${
              statusColor[post.status].text
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
          {post.description}
        </p>
      </div>
    </a>
  )
}

const Projects = () => {
  const { elementRef, isVisible } = useScrollAnimation()
  const { t: translate } = useTranslation()

  const posts: Post[] = [
    {
      title: "Yago - Mordomo Digital",
      description: translate("descriptionProjectYago"),
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      status: "use",
    },
    {
      title: "Y-Studio",
      description: translate("descriptionProjectYStudio"),
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      status: "use",
    },
    {
      title: "Porto Seguro Shopping",
      description: translate("descriptionProjectShopping"),
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      status: "development",
    },
  ]
  return (
    <section id="projects" className="py-20 bg-muted/30">
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
            return <PostCard key={post.title} index={index} post={post} />
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
