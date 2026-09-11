import type { ReactNode } from "react"

/**
 * The card that floats free of any device on a case study's stage.
 *
 * These are the moments a screenshot cannot reach: a push that arrives while
 * the app is closed, a ticket somebody picked up, a queue position changing.
 * They are *annotations* on the composition, not a claim about another screen —
 * so they are small, they sit next to the handset they belong to, and they are
 * glass over the dark page rather than a rendering of an app surface.
 *
 * Deliberately smaller than they were. At the size of a real notification they
 * competed with the devices for attention, and they are the least important
 * thing on the stage.
 */
export const Fragment = ({
  eyebrow,
  badge,
  badgeBg,
  badgeInk,
  title,
  body,
  mark,
  tint,
}: {
  eyebrow: string
  badge?: string
  badgeBg?: string
  badgeInk?: string
  title: string
  body: string
  /** Sits in the app-icon slot. A glyph, or nothing. */
  mark?: ReactNode
  /** The app-icon's fill — normally the product's own gradient. */
  tint: string
}) => (
  <div className="w-full rounded-[13px] border border-white/12 bg-white/[0.07] p-[10px] backdrop-blur-xl">
    <div className="flex items-center gap-[6px]">
      <div
        className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[4px]"
        style={{ background: tint }}
      >
        {mark}
      </div>
      <span className="truncate text-[8px] font-semibold uppercase tracking-[0.14em] text-white/60">
        {eyebrow}
      </span>
      {badge ? (
        <span
          className="ml-auto shrink-0 rounded-full px-[6px] py-[2px] text-[7.5px] font-bold"
          style={{ background: badgeBg, color: badgeInk }}
        >
          {badge}
        </span>
      ) : null}
    </div>
    <p className="mt-[6px] text-[11px] font-semibold leading-tight tracking-[-0.01em] text-white">
      {title}
    </p>
    <p className="mt-[2px] text-[9.5px] leading-snug text-white/55">{body}</p>
  </div>
)
