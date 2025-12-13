import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTranslation } from "react-i18next";
import { ExpoIcon, ReactHookFormIcon, ReactQueryIcon } from "./svg";


const Skills = () => {
  const { t: translate } = useTranslation();
  const { elementRef, isVisible } = useScrollAnimation();
  const skills = [
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original-wordmark.svg" },
    { name: "Expo", icon: ExpoIcon },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "TanStack Query", icon: ReactQueryIcon },
    { name: "Zustand", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg" },
    { name: "React Hook Form", icon: ReactHookFormIcon },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
    { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg" },
    { name: "React Testing Library", icon: "https://oss.callstack.com/react-native-testing-library/img/owl.png" },
    { name: "ESLint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original-wordmark.svg" },
  ];

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div ref={elementRef} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{translate("skillsAndTools")}</h2>
          <p className="text-muted-foreground mb-12">
            {translate("descriptionSkillsAndTools")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const SkillCard = () => {
              const { elementRef, isVisible } = useScrollAnimation();
              return (
                <div
                  ref={elementRef}
                  key={index}
                  className={`flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg card-hover scroll-fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {typeof skill.icon === 'function' ? <skill.icon /> : <img src={skill.icon} alt={skill.name} className="w-12 h-12" />}
                  <span className="text-sm text-center font-medium">{skill.name}</span>
                </div>
              );
            };
            return <SkillCard key={index} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
