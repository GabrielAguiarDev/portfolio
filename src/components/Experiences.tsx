import { FaExternalLinkAlt } from "react-icons/fa";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TimelineCard = ({
  project,
  isLeft,
  onHover,
  onLeave
}: {
  project: { title: string; company: string; description: string; image: string; link?: string };
  isLeft: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  return (
    <a
      href={project.link}
      className="flex group bg-card border border-border rounded-lg overflow-hidden card-hover"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {!isLeft && (
        <div className="w-40 min-h-32 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project?.link && (
            <FaExternalLinkAlt className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </div>
        <p className="text-xs font-light text-muted-foreground leading-relaxed mb-2">{project.company}</p>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {project.description}
        </p>
      </div>
      {isLeft && (
        <div className="w-40 min-h-32 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
    </a>
  );
};

const TimelineItem = ({
  project,
  index,
  isLeft
}: {
  project: { title: string; company: string; description: string; image: string; link?: string };
  index: number;
  isLeft: boolean;
}) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={elementRef}
      className={`scroll-fade-in ${isVisible ? 'visible' : ''} flex items-center w-full mb-8`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Left side content */}
      <div className="w-5/12 relative">
        {isLeft && (
          <div className="pr-8 z-10">
            <TimelineCard
              project={project}
              isLeft={isLeft}
              onHover={() => setIsHovered(true)}
              onLeave={() => setIsHovered(false)}
            />
          </div>
        )}
        {/* Connecting line - positioned outside the card, fills the gap to timeline */}
        {isLeft && (
          <div
            className={`absolute top-1/2 -right-24 h-0.5 -z-10 bg-gradient-to-l from-primary/30 via-primary to-primary origin-right transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            style={{
              transform: 'translateY(-50%)',
              width: '9rem'
            }}
          />
        )}
      </div>

      {/* Timeline center */}
      <div className="w-2/12 flex justify-center relative">
        <div className={`w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transition-all duration-300 ${isHovered ? 'shadow-primary/60 scale-125' : 'shadow-primary/30'
          }`} />
      </div>

      {/* Right side content */}
      <div className="w-5/12 relative">
        {!isLeft && (
          <div className="pl-8">
            <TimelineCard
              project={project}
              isLeft={isLeft}
              onHover={() => setIsHovered(true)}
              onLeave={() => setIsHovered(false)}
            />
          </div>
        )}
        {/* Connecting line - positioned outside the card, fills the gap to timeline */}
        {!isLeft && (
          <div
            className={`absolute top-1/2 -left-24 h-0.5 -z-10 bg-gradient-to-r from-primary/30 via-primary to-primary origin-left transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
            style={{
              transform: 'translateY(-50%)',
              width: '9rem'
            }}
          />
        )}
      </div>
    </div>
  );
};

const MobileTimelineItem = ({
  project,
  index
}: {
  project: { title: string; description: string; image: string; link?: string };
  index: number;
}) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={elementRef}
      className={`scroll-fade-in ${isVisible ? 'visible' : ''} flex w-full`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Timeline left */}
      <div className="flex items-start mr-6 relative">
        <div className={`w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg z-10 mt-2 transition-all duration-300 ${isHovered ? 'shadow-primary/60 scale-125' : 'shadow-primary/30'
          }`} />
        {/* Connecting line - animates from timeline to card, fills entire gap */}
        <div
          className={`absolute top-[10px] left-3 h-0.5 bg-gradient-to-r from-primary via-primary to-primary/30 origin-left transition-all duration-500 ease-out ${isHovered ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          style={{ width: 'calc(1.5rem - 0.75rem)' }} // mr-6 minus the dot width
        />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <a
          href={project.link}
          className="group block bg-card border border-border rounded-lg overflow-hidden card-hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="aspect-video overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <FaExternalLinkAlt className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

const Experiences = () => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t: translate } = useTranslation();
  const projects = [
    {
      title: translate("mobileDeveloper"),
      company: "YaaYoo - Fusion Thinking",
      description: translate("descriptionExperienceMobileDeveloper"),
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    },
    {
      title: translate("frontendDeveloper"),
      company: "YaaYoo - Fusion Thinking",
      description: translate("descriptionExperienceFrontendDeveloper"),
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    },
    {
      title: translate("portfolioWebsite"),
      company: translate("projectFreelancer"),
      description: translate("descriptionExperienceProjectFreelancer"),
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de",
      link: "#"
    },
  ];

  return (
    <section id="experiences" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{translate("experiences")}</h2>
          <p className="text-muted-foreground mb-12 max-w-3xl">{translate("descriptionExperiences")}</p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Continuous timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border -translate-x-1/2" />

          {projects.map((project, index) => (
            <TimelineItem
              key={index}
              project={project}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden relative">
          {/* Continuous timeline line for mobile */}
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-border" />

          {projects.map((project, index) => (
            <MobileTimelineItem
              key={index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
