import type { ReactNode } from "react"

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
  mark?: ReactNode
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
