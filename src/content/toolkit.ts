import type { Localized } from "@/i18n/useLocale"

/**
 * Tools, grouped by the job they do.
 *
 * Deliberately typographic — no logo wall. The grouping is the point: it shows
 * which layer of a product each tool belongs to.
 */
export type ToolGroup = {
  label: Localized
  tools: string[]
}

export const TOOLKIT: ToolGroup[] = [
  {
    label: { pt: "Mobile", en: "Mobile" },
    tools: ["React Native", "Expo", "React Navigation", "Xcode", "Android Studio"],
  },
  {
    label: { pt: "Frontend", en: "Frontend" },
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Styled Components", "Restyle"],
  },
  {
    label: { pt: "Estado", en: "State" },
    tools: ["Zustand", "Redux Toolkit", "React Hook Form", "Zod"],
  },
  {
    label: { pt: "Dados", en: "Data" },
    tools: ["TanStack Query", "Firebase", "Node.js"],
  },
  {
    label: { pt: "Testes", en: "Testing" },
    tools: ["Jest", "React Native Testing Library"],
  },
  {
    label: { pt: "Arquitetura", en: "Architecture" },
    tools: ["MVVM", "Clean Architecture", "ESLint", "Prettier"],
  },
  {
    label: { pt: "CI/CD", en: "CI/CD" },
    tools: ["GitHub Actions", "Fastlane", "App Store", "Google Play"],
  },
]
