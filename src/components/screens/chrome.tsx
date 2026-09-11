import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Shared iOS-style chrome for the coded app screens.
 *
 * Everything is sized in raw pixels against the 320×692 logical screen that
 * `PhoneFrame` scales — so these numbers are deliberately absolute, not
 * responsive. They are the phone's own coordinate space.
 *
 * The reference captures the screens are rebuilt from are 430pt wide, so
 * measurements taken off them are multiplied by 320/430 ≈ 0.744 to land here.
 * Where that would put a label under ~8.5px it is rounded up instead: these
 * screens are also rendered at a third of phone size inside a case study, and
 * type that disappears there is worse than type a point too large.
 */

export const StatusBar = ({ tone = "dark" }: { tone?: "dark" | "light" }) => (
  <div
    aria-hidden="true"
    className={cn(
      "flex h-[46px] shrink-0 items-end justify-between px-[22px] pb-[6px] text-[12px] font-semibold tracking-tight",
      tone === "dark" ? "text-black/85" : "text-white",
    )}
  >
    <span>9:41</span>
    <div className="flex items-center gap-[5px]">
      {/* Signal bars */}
      <div className="flex items-end gap-[2px]">
        {[4, 6, 8, 10].map((height) => (
          <span
            key={height}
            className="w-[3px] rounded-[1px] bg-current"
            style={{ height }}
          />
        ))}
      </div>
      {/* Wi-Fi */}
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
        <path
          d="M7.5 9.6 5.4 7.4a3 3 0 0 1 4.2 0L7.5 9.6ZM3.3 5.3a6 6 0 0 1 8.4 0l1.4-1.5a8 8 0 0 0-11.2 0l1.4 1.5Z"
          fill="currentColor"
        />
      </svg>
      {/* Battery */}
      <div className="flex items-center gap-[1px]">
        <div className="h-[11px] w-[22px] rounded-[3px] border border-current/40 p-[2px]">
          <div className="h-full w-[72%] rounded-[1px] bg-current" />
        </div>
        <div className="h-[4px] w-[1.5px] rounded-r-full bg-current/40" />
      </div>
    </div>
  </div>
)

export const HomeIndicator = ({ tone = "dark" }: { tone?: "dark" | "light" }) => (
  <div className="flex h-[22px] shrink-0 items-center justify-center" aria-hidden="true">
    <div
      className={cn(
        "h-[4px] w-[110px] rounded-full",
        tone === "dark" ? "bg-black/25" : "bg-white/40",
      )}
    />
  </div>
)

/** The root of every coded screen: fixed logical size, column layout. */
export const Screen = ({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) => (
  <div
    className={cn("flex h-full w-full flex-col overflow-hidden", className)}
    style={style}
  >
    {children}
  </div>
)

/**
 * The soft bottom edge on a screen whose content runs past it.
 *
 * Several of these screens legitimately have more content than 692px — the
 * guest app's module grid is eleven tiles in a viewport that fits nine, and the
 * storefront's best-seller list runs on for pages. Trimming a list to whatever
 * fits would misrepresent the product; leaving the last row chopped through the
 * middle of a word reads as a rendering bug rather than as a scroll.
 *
 * So the overflow is faded out instead. The gradient is the screen's own
 * background colour, which is why it is a parameter rather than a constant.
 */
export const ScrollFade = ({
  children,
  to = "#FFFFFF",
  className,
}: {
  children: ReactNode
  to?: string
  className?: string
}) => (
  <div className={cn("relative min-h-0 flex-1 overflow-hidden", className)}>
    {children}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[30px]"
      style={{ background: `linear-gradient(to top, ${to} 22%, transparent)` }}
    />
  </div>
)

/**
 * The line every screen in the family signs off with.
 *
 * It is in the real product on every route, and it is the one piece of chrome
 * that identifies who built the thing — which is the whole point of the
 * portfolio it now sits inside.
 */
export const BuiltBy = ({ tone = "#8A8A8A" }: { tone?: string }) => (
  <p
    className="shrink-0 pb-[4px] pt-[7px] text-center text-[8.5px] tracking-[0.01em]"
    style={{ color: tone }}
  >
    Desenvolvido por Yaayoo Fusion Thinking
  </p>
)
