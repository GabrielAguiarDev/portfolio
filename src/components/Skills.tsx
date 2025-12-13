import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useTranslation } from "react-i18next"
import {
  ExpoIcon,
  FastlaneIcon,
  PrettierIcon,
  ReactHookFormIcon,
  ReactQueryIcon,
  ShopifyIcon,
} from "./svg"

const Skills = () => {
  const { t: translate } = useTranslation()
  const { elementRef, isVisible } = useScrollAnimation()

  const skills = [
    // Core
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    },
    {
      name: "React Native",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnative/reactnative-original-wordmark.svg",
    },
    { name: "Expo", icon: ExpoIcon },
    // Mobile professional
    { name: "Fastlane", icon: FastlaneIcon },
    {
      name: "Xcode",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg",
    },
    {
      name: "Android Studio",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg",
    },
    {
      name: "React Navigation",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactnavigation/reactnavigation-original.svg",
    },
    // Architecture, state and data
    { name: "TanStack Query", icon: ReactQueryIcon },
    {
      name: "Zustand",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
    },
    {
      name: "Firebase",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
    },
    { name: "React Hook Form", icon: ReactHookFormIcon },
    // Quality and testing
    {
      name: "Jest",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg",
    },
    {
      name: "React Native Testing Library",
      icon: "https://oss.callstack.com/react-native-testing-library/img/owl.png",
    },
    {
      name: "ESLint + Prettier",
      icon: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg",
        PrettierIcon,
      ],
    },
    // UI and styling
    {
      name: "Styled Components",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/styledcomponents/styledcomponents-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    { name: "Restyle", icon: ShopifyIcon },
    // Frontend
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
    },
    // Backend
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    },
  ]

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-fade-in ${isVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {translate("skillsAndTools")}
          </h2>
          <p className="text-muted-foreground mb-12">
            {translate("descriptionSkillsAndTools")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.map((skill, index) => {
            const SkillCard = () => {
              const { elementRef, isVisible } = useScrollAnimation()
              return (
                <div
                  ref={elementRef}
                  key={index}
                  className={`flex flex-col items-center gap-3 p-6 bg-card border border-border rounded-lg card-hover scroll-fade-in ${
                    isVisible ? "visible" : ""
                  }`}
                >
                  {Array.isArray(skill.icon) ? (
                    <div className="flex gap-5">
                      {skill.icon.map((Icon, idx) =>
                        typeof Icon === "function" ? (
                          <Icon key={idx} />
                        ) : (
                          <img
                            key={idx}
                            src={Icon}
                            alt={skill.name}
                            className="w-12 h-12"
                          />
                        ),
                      )}
                    </div>
                  ) : typeof skill.icon === "function" ? (
                    <skill.icon />
                  ) : (
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12"
                    />
                  )}
                  <span className="text-sm text-center font-medium">
                    {skill.name}
                  </span>
                </div>
              )
            }
            return <SkillCard key={index} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
