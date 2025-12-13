import { FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { LegacyRef } from "react";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t: translate } = useTranslation();
  const posts = [
    {
      title: "Project 1",
      description: "Description for project 1",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
    },
    {
      title: "Project 2",
      description: "Description for project 2",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
    },
    {
      title: "Project 3",
      description: "Description for project 3",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{translate("projects")}</h2>
           <p className="text-muted-foreground mb-12 max-w-3xl">{translate("descriptionProjects")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => {
            const PostCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <a
                  ref={elementRef as any}
                  className={`group block bg-card border border-border rounded-lg overflow-hidden card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{post.description}</p>
                  </div>
                </a>
              );
            };
            return <PostCard key={index} />;
          })}
        </div>

        <div className={`text-center scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <Button variant="outline" size="lg" className="group">
            {translate("moreProjectsOnGitHub")}
            <FaExternalLinkAlt className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
