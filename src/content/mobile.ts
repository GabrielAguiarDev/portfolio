import { TOOLKIT } from "@/content/toolkit"

/**
 * What survives on a phone.
 *
 * The page is written for a wide screen, where a reader scans a column of
 * argument with the diagrams beside it. On a phone that same page becomes one
 * narrow column several times longer, and the sections carrying the most
 * detail — the AI pillars, the roles, the toolkit index — turn into a wall of
 * type nobody reaches the end of.
 *
 * So a phone gets the same narrative with less of it. Every section is still
 * there and still makes the same claim; each just shows only what it needs to
 * make it. Nothing here is a second, shorter piece of copy — it is the same
 * copy, less of it. That distinction matters: two versions of a sentence drift
 * apart, and the one nobody is looking at is always the one that goes stale.
 *
 * ── What is cut is text. Never a picture. ───────────────────────────────────
 *
 * Every trim below removes words. Not one removes a drawing.
 *
 * This is the rule and not an accident of where the fat happened to be. The
 * problem on a phone is reading, not scrolling: a diagram is the one thing on
 * a narrow screen that gives back more than the height it takes, because it
 * says in one object what the paragraph beside it needs four sentences to say.
 * Cutting the pictures and keeping the prose would make the page shorter and
 * harder — the opposite trade.
 *
 * So the point field opens the page, the orchestration diagram carries the AI
 * section, the layer stack carries the engineering one, the process track
 * still scrolls sideways and the portrait stays. A caption or a label attached
 * to one of them counts as part of the picture, not as prose, and stays too.
 *
 * ── How the trim is applied ─────────────────────────────────────────────────
 *
 * Entirely in CSS, through Tailwind's `md:` variant: an item a phone does not
 * get is still rendered, and hidden below 768px. This is a decision about the
 * width of a window, and a window can change width — hiding it in CSS means
 * rotating a tablet or dragging a desktop window narrow lands on the right
 * page in the same frame, with no hook, no re-render, and no boundary to get
 * wrong.
 *
 * There is deliberately no JavaScript in it. An earlier version kept the
 * Foundations canvas off phones through a `matchMedia` hook, on the reasoning
 * that `display: none` hides a canvas without stopping its draw loop. That
 * reasoning was sound and the decision was still wrong: it was a picture, and
 * pictures are the half of the page a phone should keep.
 *
 * 768px is Tailwind's `md` and the same line as `MOBILE_BREAKPOINT` in
 * `animation/config.ts`. Keep the three in step.
 *
 * ── Everything a phone does not get ─────────────────────────────────────────
 *
 * The counts below are the trims worth tuning. The rest are one-line yes/no
 * decisions that live as a `hidden md:*` class on the element itself, and are
 * listed here so this file is the whole index rather than half of it:
 *
 *   Foundations  the tool chips under each of the four principles
 *   AI           the tool chips under each pillar
 *   Impact       the three qualitative claims under the figures
 *   Experience   the tool chips under each role
 *
 * Everything else stays. Every diagram, in particular: the hero's point field,
 * the layer stack and its caption, the orchestration diagram, the process
 * track and the portrait. Plus the whole work index, the five-row layer index,
 * all four principles, the four figures, every role, and contact.
 */
export const MOBILE = {
  /**
   * AI pillars a phone gets, counted from the top of the list.
   *
   * The four are ordered by how much they distinguish the work: model and
   * context, then orchestration, then guardrails, then cost. The first two are
   * the argument; the last two are the detail behind it, and detail is what
   * the section can afford to lose on a phone — each of these bodies is four
   * sentences.
   */
  aiPillars: 2,

  /**
   * Paragraphs of the About text a phone gets, counted from the top.
   *
   * The first two answer the question the section exists for: what he has
   * worked on, and how he behaves when it is on fire. The rest expand the
   * architecture and security threads that Foundations has already made in
   * full, further up the same page.
   */
  aboutParagraphs: 2,

  /**
   * Responsibilities per role a phone gets, counted from the top.
   *
   * The lists are written most-important-first, and the longest runs to six.
   * Four roles at six bullets each is twenty-four lines of near-identical
   * shape, which stops being read well before it stops being scrolled.
   */
  roleResponsibilities: 3,

  /**
   * Key contributions per role a phone gets, counted from the top. Zero drops
   * the block, its heading included.
   *
   * The odd one out, and worth knowing why before changing it. Every other
   * trim on this page removes a restatement — the AI pillars restate the
   * diagram, the Impact claims restate Foundations, the chips restate the
   * toolkit index. These do not: they are the only per-role outcomes on the
   * page, and the responsibilities beside them describe scope, not result. So
   * a phone loses something a wide screen has, which is a real cost and was a
   * deliberate call: each role already leads with a one-line summary, and four
   * roles carrying three lists each is what made the section the longest on
   * the page.
   *
   * Set this to 1 to put the strongest contribution per role back — they are
   * written most-important-first, so the top one is the one worth having.
   */
  roleHighlights: 0,

  /**
   * Toolkit groups a phone gets, by their English label — the same key the
   * index is already rendered with.
   *
   * Deliberately a list and not "the first five". The nine groups run from the
   * decisions that outlive a product down to the machinery that ships it, so
   * cutting from the bottom would drop security — a claim the rest of the page
   * spends real space making, and the last one it should be caught dropping.
   * These five are the ones the page argues for by name.
   */
  toolkitGroups: ["Architecture", "Mobile", "Web", "AI", "Security"] as readonly string[],
} as const

/**
 * Dev-only guard, matching the ones in `experience.ts` and `profile.ts`.
 *
 * `toolkitGroups` above keys off a label written in `toolkit.ts`, so renaming a
 * group there would silently drop it from every phone rather than fail. The
 * nudge reaches the person who can fix it and never the visitor.
 */
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
