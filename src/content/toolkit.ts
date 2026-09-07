import type { Localized } from "@/i18n/useLocale"

/**
 * Tools, grouped by the layer of the product they belong to.
 *
 * Deliberately typographic — no logo wall. The grouping is the argument: the
 * order runs from the decisions that outlive everything (architecture) down to
 * the machinery that ships it, with mobile and web sitting side by side as two
 * surfaces rather than two careers.
 */
export type ToolGroup = {
  label: Localized
  tools: string[]
}

export const TOOLKIT: ToolGroup[] = [
  {
    label: { pt: "Arquitetura", en: "Architecture" },
    tools: ["Clean Architecture", "MVVM", "TypeScript", "ESLint", "Prettier"],
  },
  {
    label: { pt: "Mobile", en: "Mobile" },
    tools: ["React Native", "Expo", "React Navigation", "Xcode", "Android Studio"],
  },
  {
    label: { pt: "Web", en: "Web" },
    tools: ["React", "Next.js", "Tailwind CSS", "Styled Components", "Restyle"],
  },
  {
    label: { pt: "IA", en: "AI" },
    tools: ["MCP", "RAG", "Multi-agent", "Subagents", "Git worktrees"],
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
    label: { pt: "Segurança", en: "Security" },
    tools: ["Auth & sessions", "Permissions", "Input validation", "Secrets"],
  },
  {
    label: { pt: "Testes", en: "Testing" },
    tools: ["Jest", "React Native Testing Library"],
  },
  {
    label: { pt: "CI/CD", en: "CI/CD" },
    tools: ["GitHub Actions", "Fastlane", "App Store", "Google Play"],
  },
]
