import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Shared iOS-style chrome for the coded app screens.
 *
 * Everything is sized in raw pixels against the 320×692 logical screen that
 * `PhoneFrame` scales — so these numbers are deliberately absolute, not
 * responsive. They are the phone's own coordinate space.
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

export type TabItem = {
  icon: ReactNode
  label: string
}

export const TabBar = ({
  items,
  active = 0,
  accent,
  tone = "dark",
}: {
  items: TabItem[]
  active?: number
  accent: string
  tone?: "dark" | "light"
}) => (
  <nav
    aria-hidden="true"
    className={cn(
      "mt-auto flex shrink-0 items-start justify-around border-t px-[10px] pt-[11px]",
      tone === "dark" ? "border-black/[0.07]" : "border-white/10",
    )}
  >
    {items.map((item, index) => (
      <div
        key={item.label}
        className="flex w-[64px] flex-col items-center gap-[5px]"
        style={{
          color: index === active ? accent : tone === "dark" ? "#9CA0A8" : "#7C818C",
        }}
      >
        {item.icon}
        <span className="text-[9.5px] font-medium tracking-tight">{item.label}</span>
      </div>
    ))}
  </nav>
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
