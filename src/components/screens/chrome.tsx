import type { ReactNode } from "react"

import { cn } from "@/lib/utils"


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
      <div className="flex items-end gap-[2px]">
        {[4, 6, 8, 10].map((height) => (
          <span
            key={height}
            className="w-[3px] rounded-[1px] bg-current"
            style={{ height }}
          />
        ))}
      </div>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
        <path
          d="M7.5 9.6 5.4 7.4a3 3 0 0 1 4.2 0L7.5 9.6ZM3.3 5.3a6 6 0 0 1 8.4 0l1.4-1.5a8 8 0 0 0-11.2 0l1.4 1.5Z"
          fill="currentColor"
        />
      </svg>
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

export const BuiltBy = ({ tone = "#8A8A8A" }: { tone?: string }) => (
  <p
    className="shrink-0 pb-[4px] pt-[7px] text-center text-[8.5px] tracking-[0.01em]"
    style={{ color: tone }}
  >
    Desenvolvido por Yaayoo Fusion Thinking
  </p>
)
