import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const Intel = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const posts = [
    {
      title: "Understanding Information Stealers: How They Work and How to Defend Against Them",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      link: "#"
    },
    {
      title: "Remote Access Made Simple For Hackers | Go Reverse Shell Tutorial",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      link: "#"
    },
    {
      title: "Python Keylogger 101: How to Build a Keylogger",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      link: "#"
    }
  ];

  return (
    <section id="intel" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Intel</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post, index) => {
            const PostCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <a
                  ref={elementRef}
                  href={post.link}
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
              </div>
            </a>
              );
            };
            return <PostCard key={index} />;
          })}
        </div>

        <div className={`text-center scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <Button variant="outline" size="lg" className="group">
            Want to read more
            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Intel;
