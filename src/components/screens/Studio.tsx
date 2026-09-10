import type { ReactNode } from "react"
import {
  BedDouble,
  CalendarDays,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings,
  Smartphone,
  Users,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { HomeIndicator, Screen, StatusBar } from "./chrome"

/**
 * Y-Studio is the one product here that lives on a desktop, so it gets a
 * browser window rather than a phone. The module rail on the left is the
 * point of the whole case study: the same shell, different modules switched on.
 */

const PURPLE = "#5F33B4"
const LILAC = "#8B5CF6"

/** A browser window. Fluid, unlike the phone — it is sized by its container. */
export const BrowserFrame = ({
  children,
  url,
  className,
  screenshot,
  alt,
}: {
  /** The interface drawn in code. Omitted when `screenshot` carries the view. */
  children?: ReactNode
  url: string
  className?: string
  /** Capture path. When set it replaces the coded view entirely. */
  screenshot?: string
  alt?: string
}) => (
  <div
    className={cn(
      "overflow-hidden rounded-[14px] border border-white/10 bg-[#0E0F13] md:rounded-[18px]",
      className,
    )}
  >
    <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2.5 md:px-4">
      <div className="flex gap-1.5" aria-hidden="true">
        {["#FF5F57", "#FEBC2E", "#28C840"].map((color) => (
          <span
            key={color}
            className="h-[9px] w-[9px] rounded-full opacity-90"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="mx-auto flex max-w-[240px] flex-1 items-center justify-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-1">
        <span className="truncate text-[10px] text-white/40">{url}</span>
      </div>
      <div className="w-[42px]" aria-hidden="true" />
    </div>
    {screenshot ? (
      <img
        src={screenshot}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className="block w-full"
      />
    ) : (
      children
    )}
  </div>
)

const copy = {
  modules: [
    { icon: CalendarDays, label: { pt: "Booking", en: "Booking" } satisfies Localized },
    { icon: Users, label: { pt: "CRM", en: "CRM" } satisfies Localized },
    { icon: LayoutGrid, label: { pt: "CMS", en: "CMS" } satisfies Localized },
    { icon: MessageSquare, label: { pt: "Chat", en: "Chat" } satisfies Localized },
    { icon: Smartphone, label: { pt: "Guest App", en: "Guest App" } satisfies Localized },
    { icon: Settings, label: { pt: "Config", en: "Settings" } satisfies Localized },
  ],
  title: { pt: "Visão geral", en: "Overview" } satisfies Localized,
  subtitle: {
    pt: "Resort Vila Mare · hoje",
    en: "Vila Mare Resort · today",
  } satisfies Localized,
  stats: [
    { label: { pt: "Ocupação", en: "Occupancy" } satisfies Localized, value: "82%" },
    { label: { pt: "Reservas", en: "Bookings" } satisfies Localized, value: "34" },
    { label: { pt: "Check-ins", en: "Check-ins" } satisfies Localized, value: "12" },
  ],
  week: { pt: "Últimos 7 dias", en: "Last 7 days" } satisfies Localized,
  arrivals: { pt: "Chegadas de hoje", en: "Today's arrivals" } satisfies Localized,
  rows: [
    { name: "M. Ribeiro", room: "214", tag: { pt: "Suíte", en: "Suite" } satisfies Localized },
    { name: "A. Costa", room: "108", tag: { pt: "Standard", en: "Standard" } satisfies Localized },
    { name: "L. Ferreira", room: "302", tag: { pt: "Suíte", en: "Suite" } satisfies Localized },
  ],
}

export const StudioDashboard = () => {
  const { pick } = useLocale()
  const bars = [52, 68, 45, 78, 92, 71, 84]

  return (
    <div className="flex bg-[#FAFAFC] text-[#101828]">
      {/* Module rail — the product's core idea, made visible. */}
      <div className="hidden w-[152px] shrink-0 flex-col border-r border-black/[0.06] bg-white p-3 sm:flex">
        <div className="flex items-center gap-2 px-2 py-1">
          <div
            className="h-[18px] w-[18px] rounded-[6px]"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})` }}
          />
          <span className="text-[12px] font-semibold tracking-[-0.02em]">Y-Studio</span>
        </div>

        <div className="mt-4 space-y-0.5">
          {copy.modules.map(({ icon: Icon, label }, index) => {
            const active = index === 0
            return (
              <div
                key={label.en}
                className="flex items-center gap-2 rounded-lg px-2 py-[7px] text-[11.5px] font-medium"
                style={{
                  background: active ? `${PURPLE}12` : "transparent",
                  color: active ? PURPLE : "#667085",
                }}
              >
                <Icon size={13} strokeWidth={2.2} />
                {pick(label)}
              </div>
            )
          })}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-4 py-2.5">
          <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#F2F4F7] px-2.5 py-1.5">
            <Search size={12} className="text-[#98A2B3]" strokeWidth={2.4} />
            <span className="text-[10.5px] text-[#98A2B3]">Buscar…</span>
          </div>
          <div
            className="h-[22px] w-[22px] shrink-0 rounded-full"
            style={{ background: `linear-gradient(135deg, ${LILAC}, ${PURPLE})` }}
          />
        </div>

        <div className="p-4 md:p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#98A2B3]">
            {pick(copy.subtitle)}
          </p>
          <h3 className="mt-1 text-[19px] font-semibold tracking-[-0.03em] md:text-[22px]">
            {pick(copy.title)}
          </h3>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            {copy.stats.map((stat) => (
              <div
                key={stat.label.en}
                className="rounded-xl border border-black/[0.06] bg-white p-3"
              >
                <p className="text-[9.5px] font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
                  {pick(stat.label)}
                </p>
                <p className="mt-1.5 text-[20px] font-semibold tracking-[-0.03em] md:text-[24px]">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid gap-2.5 md:grid-cols-[1.15fr_1fr]">
            <div className="rounded-xl border border-black/[0.06] bg-white p-3.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
                {pick(copy.week)}
              </p>
              <div className="mt-3.5 flex h-[72px] items-end gap-[7px]">
                {bars.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-[3px]"
                    style={{
                      height: `${height}%`,
                      background:
                        index === 4 ? PURPLE : `linear-gradient(180deg, ${LILAC}55, ${LILAC}22)`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-black/[0.06] bg-white p-3.5">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#98A2B3]">
                {pick(copy.arrivals)}
              </p>
              <div className="mt-2.5 space-y-2">
                {copy.rows.map((row) => (
                  <div key={row.name} className="flex items-center gap-2.5">
                    <BedDouble size={13} className="shrink-0 text-[#98A2B3]" strokeWidth={2.2} />
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium">
                      {row.name}
                    </span>
                    <span className="text-[10px] text-[#98A2B3]">{row.room}</span>
                    <span
                      className="shrink-0 rounded-full px-2 py-[2px] text-[9px] font-semibold"
                      style={{ background: `${PURPLE}12`, color: PURPLE }}
                    >
                      {pick(row.tag)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * The guest-facing half of the same platform, on a phone — which is the honest
 * way to show a "modular ecosystem": one module, another surface.
 */
export const StudioChat = () => {
  const { pick } = useLocale()

  const chat = {
    title: { pt: "Concierge", en: "Concierge" } satisfies Localized,
    online: { pt: "Responde em minutos", en: "Replies in minutes" } satisfies Localized,
    messages: [
      {
        from: "guest" as const,
        text: { pt: "Consigo late check-out amanhã?", en: "Can I get a late check-out tomorrow?" } satisfies Localized,
      },
      {
        from: "hotel" as const,
        text: {
          pt: "Consegue sim — liberei até 14h para o quarto 214.",
          en: "Yes — I've released 2pm for room 214.",
        } satisfies Localized,
      },
      {
        from: "guest" as const,
        text: { pt: "Perfeito, obrigado!", en: "Perfect, thank you!" } satisfies Localized,
      },
    ],
    placeholder: { pt: "Escreva uma mensagem", en: "Write a message" } satisfies Localized,
  }

  return (
    <Screen className="bg-white">
      <StatusBar />

      <div className="flex items-center gap-[10px] border-b border-black/[0.06] px-[18px] pb-[13px] pt-[4px]">
        <div
          className="h-[32px] w-[32px] rounded-full"
          style={{ background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})` }}
        />
        <div>
          <p className="text-[14px] font-semibold tracking-[-0.02em] text-[#101828]">
            {pick(chat.title)}
          </p>
          <p className="mt-[1px] flex items-center gap-[5px] text-[10.5px] text-[#667085]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#12B76A]" />
            {pick(chat.online)}
          </p>
        </div>
      </div>

      <div className="flex-1 space-y-[10px] px-[18px] py-[18px]">
        {chat.messages.map((message, index) => {
          const mine = message.from === "guest"
          return (
            <div key={index} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div
                className="max-w-[76%] rounded-[16px] px-[13px] py-[9px] text-[12.5px] leading-[1.35]"
                style={
                  mine
                    ? { background: PURPLE, color: "#FFFFFF", borderBottomRightRadius: 5 }
                    : { background: "#F2F4F7", color: "#101828", borderBottomLeftRadius: 5 }
                }
              >
                {pick(message.text)}
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-[18px] pb-[10px]">
        <div className="flex items-center justify-between rounded-full border border-black/[0.07] px-[16px] py-[11px]">
          <span className="text-[12px] text-[#98A2B3]">{pick(chat.placeholder)}</span>
          <div
            className="h-[22px] w-[22px] rounded-full"
            style={{ background: `linear-gradient(135deg, ${PURPLE}, ${LILAC})` }}
          />
        </div>
      </div>
      <HomeIndicator />
    </Screen>
  )
}
