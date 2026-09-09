import type { Localized, Tag } from "@/i18n/useLocale"

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
  /**
   * Product and protocol names stay as plain strings — they read the same in
   * every language. Anything that is a description in words is written per
   * language, so a Portuguese page does not carry English chips.
   */
  tools: Tag[]
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
    tools: [
      "LLMs",
      { pt: "Engenharia de prompt", en: "Prompt engineering" },
      "RAG",
      "MCP",
      { pt: "Agentes e subagentes", en: "Agents & subagents" },
      { pt: "Especialização de agentes", en: "Agent specialization" },
      { pt: "Controle de custo", en: "Cost control" },
    ],
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
    tools: [
      { pt: "Auth e sessões", en: "Auth & sessions" },
      { pt: "Permissões", en: "Permissions" },
      { pt: "Validação de entrada", en: "Input validation" },
      { pt: "Segredos", en: "Secrets" },
      "Prompt injection",
      { pt: "Vazamento de dados", en: "Data leakage" },
    ],
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
