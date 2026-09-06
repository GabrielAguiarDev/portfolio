import type { ComponentType } from "react"
import { useTranslation } from "react-i18next"

import { gridDelay, useReveal } from "@/animation"
import SectionHeader from "@/components/SectionHeader"
import { cn } from "@/lib/utils"
import {
  ExpoIcon,
  FastlaneIcon,
  PrettierIcon,
  ReactHookFormIcon,
  ReactQueryIcon,
  ShopifyIcon,
} from "./svg"

/**
 * A skill icon is either a path to a self-hosted asset in /public/icons or an
 * inline SVG component. Assets used to be pulled from third-party CDNs on every
 * visit; they are now served from our own origin and lazily loaded.
 */
type SkillIcon = string | ComponentType

type Skill = {
  name: string
  icon: SkillIcon | SkillIcon[]
}

const skills: Skill[] = [
  // Core
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "React Native", icon: "/icons/react-native.svg" },
  { name: "Expo", icon: ExpoIcon },
  // Mobile professional
  { name: "Fastlane", icon: FastlaneIcon },
  { name: "Xcode", icon: "/icons/xcode.svg" },
  { name: "Android Studio", icon: "/icons/android-studio.svg" },
  { name: "React Navigation", icon: "/icons/react-navigation.svg" },
  // Architecture, state and data
  { name: "TanStack Query", icon: ReactQueryIcon },
  { name: "Zustand", icon: "/icons/zustand.webp" },
  { name: "Firebase", icon: "/icons/firebase.svg" },
  { name: "React Hook Form", icon: ReactHookFormIcon },
  // Quality and testing
  { name: "Jest", icon: "/icons/jest.svg" },
  { name: "React Native Testing Library", icon: "/icons/rntl.webp" },
  { name: "ESLint + Prettier", icon: ["/icons/eslint.svg", PrettierIcon] },
  // UI and styling
  { name: "Styled Components", icon: "/icons/styled-components.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "Restyle", icon: ShopifyIcon },
  // Frontend
  { name: "React", icon: "/icons/react.svg" },
  { name: "Next.js", icon: "/icons/nextjs.svg" },
  // Backend
  { name: "Node.js", icon: "/icons/nodejs.svg" },
]

const SkillGlyph = ({ icon }: { icon: SkillIcon }) => {
  if (typeof icon === "function") {
    const Icon = icon
    return (
      <span className="flex h-10 w-10 items-center justify-center [&>svg]:h-10 [&>svg]:w-10">
        <Icon />
      </span>
    )
  }

  return (
    <img
      src={icon}
      alt=""
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      className="h-10 w-10 object-contain"
    />
  )
}

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const { revealProps } = useReveal<HTMLLIElement>({ delay: gridDelay(index) })
  const icons = Array.isArray(skill.icon) ? skill.icon : [skill.icon]

  return (
    <li
      {...revealProps}
      className={cn(
        revealProps.className,
        "surface flex h-full min-h-[9rem] flex-col items-center justify-center gap-4 p-5 text-center md:card-lift",
      )}
    >
      <div className="flex items-center gap-3" aria-hidden="true">
        {icons.map((icon, iconIndex) => (
          <SkillGlyph key={iconIndex} icon={icon} />
        ))}
      </div>
      <span className="text-pretty text-sm font-medium leading-snug text-foreground">
        {skill.name}
      </span>
    </li>
  )
}

const Skills = () => {
  const { t: translate } = useTranslation()

  return (
    <section id="skills" className="scroll-mt-20 py-16 md:py-28">
      <div className="container">
        <SectionHeader
          title={translate("skillsAndTools")}
          lead={translate("descriptionSkillsAndTools")}
        />

        <ul className="mt-11 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-16 md:gap-5 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills
