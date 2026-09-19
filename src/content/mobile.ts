import { TOOLKIT } from "@/content/toolkit"

export const MOBILE = {
  aiPillars: 2,

  aboutParagraphs: 2,

  roleResponsibilities: 3,

  roleHighlights: 0,

  toolkitGroups: ["Architecture", "Mobile", "Web", "AI", "Security"] as readonly string[],
} as const

if (import.meta.env.DEV) {
  const labels = new Set(TOOLKIT.map((group) => group.label.en))
  const stale = MOBILE.toolkitGroups.filter((label) => !labels.has(label))

  if (stale.length) {
    console.warn(
      `[portfolio] MOBILE.toolkitGroups in src/content/mobile.ts names groups that ` +
        `no longer exist in src/content/toolkit.ts: ${stale.join(", ")}. ` +
        `They are hidden on phones until the labels match again.`,
    )
  }
}
