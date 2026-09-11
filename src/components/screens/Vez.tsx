import type { ReactNode } from "react"
import {
  CalendarDays,
  ChartColumn,
  ChevronDown,
  CircleUserRound,
  Clock,
  Grid2x2,
  Headphones,
  LayoutGrid,
  ListFilter,
  MapPin,
  Scissors,
  Settings,
  Sparkles,
  Star,
  Store,
  Tags,
  Users,
  Wallet,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { HomeIndicator, Screen, StatusBar } from "./chrome"
import { Fragment } from "./fragments"

/**
 * VEZ, rebuilt from the product's own screens.
 *
 * A booking marketplace with five surfaces, and the one here whose shape is
 * genuinely two-sided: a customer looking for a free slot in a city, and a shop
 * whose day is a queue of people and a grid of chairs. The same appointment is
 * a *search result* on one side and a *conflict to resolve* on the other, which
 * is why both apps are staged rather than one.
 *
 * Structure, chrome and palette are the product's. Every name, shop, time and
 * figure is invented — the captures in /docs/projetos are reference material.
 */

/** The product's coral. Everything actionable is this colour and nothing else is. */
const CORAL = "#EE6C4C"
const CORAL_WASH = "#FDEDE8"
const INK = "#14171A"
const BODY = "#5B6169"
const MUTED = "#9AA1A9"
const LINE = "rgba(20,23,26,0.10)"
const CANVAS = "#F7F7F8"
const GREEN = "#2E7D52"
const AMBER = "#B4801F"

/** Exported for `Miniature`: the ground both consoles' pages sit on. */
export const VEZ_CANVAS = CANVAS
/** The logical width both consoles are authored against. */
export const VEZ_WIDTH = 1180

/* ────────────────────────────  THE CLIENT APP  ─────────────────────────── */

const client = {
  city: "Joinville",
  area: { pt: "CENTRO · 1.284 ESTABELECIMENTOS", en: "DOWNTOWN · 1,284 BUSINESSES" } satisfies Localized,
  prompt: { pt: "Do que você\nprecisa hoje?", en: "What do you\nneed today?" } satisfies Localized,
  search: { pt: "Serviço, loja ou profissional", en: "Service, shop or professional" } satisfies Localized,
  live: { pt: "AO VIVO · NA FILA", en: "LIVE · IN QUEUE" } satisfies Localized,
  position: { pt: "POSIÇÃO 4", en: "POSITION 4" } satisfies Localized,
  shop: "Barbearia Meia-Nove",
  wait: { pt: "ESPERA EST. 24 MIN · 1,2 KM", en: "EST. WAIT 24 MIN · 1.2 KM" } satisfies Localized,
  confirm: { pt: "Confirmar chegada", en: "Confirm arrival" } satisfies Localized,
  seeQueue: { pt: "Ver fila", en: "See queue" } satisfies Localized,
  categories: { pt: "Categorias", en: "Categories" } satisfies Localized,
  seeAll: { pt: "VER TODAS", en: "SEE ALL" } satisfies Localized,
  /* Each category is a flat mark in its own hue — the product's way of making a
     grid of eight scannable without eight illustrations to maintain. */
  kinds: [
    { label: { pt: "Barbearia", en: "Barber" } satisfies Localized, tint: "#4B6EA4", wash: "#E8EDF5" },
    { label: { pt: "Cabelo", en: "Hair" } satisfies Localized, tint: "#A8447A", wash: "#F7E9F0" },
    { label: { pt: "Unhas", en: "Nails" } satisfies Localized, tint: "#A86E3B", wash: "#F6EDE3" },
    { label: { pt: "Estética", en: "Aesthetics" } satisfies Localized, tint: "#664DA3", wash: "#EEEAF6" },
    { label: { pt: "Dermato", en: "Derma" } satisfies Localized, tint: "#2E7D8A", wash: "#E5F1F3" },
    { label: { pt: "Odonto", en: "Dental" } satisfies Localized, tint: "#2E7D52", wash: "#E6F1EA" },
    { label: { pt: "Pet", en: "Pet" } satisfies Localized, tint: "#8A7A1F", wash: "#F4F2DF" },
    { label: { pt: "Massagem", en: "Massage" } satisfies Localized, tint: "#6B7076", wash: "#EDEEEF" },
  ],
  tabs: [
    { label: { pt: "INÍCIO", en: "HOME" } satisfies Localized },
    { label: { pt: "EXPLORAR", en: "EXPLORE" } satisfies Localized },
    { label: { pt: "IA", en: "AI" } satisfies Localized },
    { label: { pt: "AGENDA", en: "DIARY" } satisfies Localized },
    { label: { pt: "PERFIL", en: "PROFILE" } satisfies Localized },
  ],
}

/** The ring the product uses as its only glyph, at any size. */
const Ring = ({ size, color, filled = 0.28 }: { size: number; color: string; filled?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" fill="none" stroke={color} strokeWidth="2.4" opacity="0.28" />
    <circle
      cx="10"
      cy="10"
      r="7.5"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeDasharray={`${47 * filled} 47`}
      transform="rotate(-90 10 10)"
    />
  </svg>
)

/**
 * The customer's app.
 *
 * Leads on the live queue card, which is the product's real idea: not "book a
 * slot next Tuesday" but "four people ahead of you, leave now". A marketplace
 * of appointments is a directory; a marketplace of *waiting* is a reason to
 * open the app on a Saturday morning.
 */
export const VezClient = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <StatusBar />

      <div className="flex shrink-0 items-start gap-[10px] px-[18px] pt-[2px]">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-[5px] text-[17px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            {client.city}
            <ChevronDown size={14} strokeWidth={2.4} />
          </p>
          <p
            className="mt-[3px] truncate text-[8.5px] font-medium tracking-[0.08em]"
            style={{ color: MUTED }}
          >
            {pick(client.area)}
          </p>
        </div>
        <span
          className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[11px] text-[11px] font-semibold text-white"
          style={{ background: "#2B2F35" }}
        >
          CT
        </span>
      </div>

      <p
        className="shrink-0 whitespace-pre-line px-[18px] pt-[14px] text-[23px] font-bold leading-[1.12] tracking-[-0.03em]"
        style={{ color: INK }}
      >
        {pick(client.prompt)}
      </p>

      <div className="flex shrink-0 items-center gap-[9px] px-[18px] pt-[13px]">
        <div
          className="flex flex-1 items-center gap-[9px] rounded-[13px] px-[13px] py-[11px]"
          style={{ background: "#F1F2F3" }}
        >
          <Ring size={13} color={MUTED} filled={1} />
          <span className="truncate text-[11.5px]" style={{ color: BODY }}>
            {pick(client.search)}
          </span>
        </div>
        {/* Conversational search is a first-class control, not a setting. */}
        <span
          className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[13px]"
          style={{ background: CORAL }}
        >
          <Sparkles size={17} strokeWidth={2.2} className="text-white" />
        </span>
      </div>

      <div className="shrink-0 px-[18px] pt-[14px]">
        <div className="rounded-[14px] p-[13px]" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-[6px] text-[8.5px] font-bold tracking-[0.08em]" style={{ color: GREEN }}>
              <span className="h-[6px] w-[6px] rounded-full" style={{ background: GREEN }} />
              {pick(client.live)}
            </span>
            <span
              className="rounded-[6px] px-[7px] py-[3px] text-[8px] font-bold tracking-[0.06em]"
              style={{ background: "#FBF0D8", color: AMBER }}
            >
              {pick(client.position)}
            </span>
          </div>

          <div className="mt-[11px] flex items-center gap-[11px]">
            <span
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(150deg,#6E1F2B,#3A1018)" }}
            >
              M9
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-bold tracking-[-0.01em]" style={{ color: INK }}>
                {client.shop}
              </p>
              <p className="mt-[2px] text-[8.5px] font-medium tracking-[0.05em]" style={{ color: MUTED }}>
                {pick(client.wait)}
              </p>
            </div>
            <div className="relative shrink-0">
              <Ring size={30} color={AMBER} filled={0.62} />
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
                style={{ color: INK }}
              >
                4
              </span>
            </div>
          </div>

          <div className="mt-[11px] flex gap-[8px]">
            <div
              className="flex flex-1 items-center justify-center rounded-[11px] py-[10px]"
              style={{ background: CORAL }}
            >
              <span className="text-[11.5px] font-semibold text-white">{pick(client.confirm)}</span>
            </div>
            <div
              className="flex items-center justify-center rounded-[11px] px-[16px]"
              style={{ border: `1px solid ${LINE}` }}
            >
              <span className="text-[11.5px] font-medium" style={{ color: INK }}>
                {pick(client.seeQueue)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-[18px] pt-[16px]">
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            {pick(client.categories)}
          </p>
          <span className="text-[8px] font-bold tracking-[0.12em]" style={{ color: CORAL }}>
            {pick(client.seeAll)}
          </span>
        </div>

        <div className="mt-[10px] grid grid-cols-4 gap-x-[9px] gap-y-[10px]">
          {client.kinds.map((kind) => (
            <div key={kind.label.en} className="flex flex-col items-center">
              <div
                className="flex h-[54px] w-full items-center justify-center rounded-[13px]"
                style={{ background: kind.wash }}
              >
                <span
                  className="h-[13px] w-[13px] rotate-45 rounded-[3px]"
                  style={{ background: kind.tint }}
                />
              </div>
              <span className="mt-[5px] text-center text-[9px] font-medium" style={{ color: INK }}>
                {pick(kind.label)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <nav
        className="flex shrink-0 items-start justify-around px-[8px] pb-[2px] pt-[10px]"
        style={{ borderTop: `1px solid ${LINE}` }}
        aria-hidden="true"
      >
        {client.tabs.map((tab, index) => (
          <div key={tab.label.en} className="flex w-[54px] flex-col items-center gap-[4px]">
            <Ring size={16} color={index === 0 ? CORAL : MUTED} filled={index === 0 ? 0.7 : 0.28} />
            <span
              className="text-[7.5px] font-bold tracking-[0.06em]"
              style={{ color: index === 0 ? CORAL : MUTED }}
            >
              {pick(tab.label)}
            </span>
          </div>
        ))}
      </nav>
      <HomeIndicator />
    </Screen>
  )
}

/* ────────────────────────────  THE SHOP'S APP  ─────────────────────────── */

const store = {
  shop: "Barbearia Dom Aníbal",
  open: { pt: "QUI 18 SET · ABERTO ATÉ 18:00", en: "THU 18 SEP · OPEN UNTIL 6:00PM" } satisfies Localized,
  stats: [
    { value: "14", label: { pt: "ATENDIDOS", en: "SERVED" } satisfies Localized, tint: INK },
    { value: "7", label: { pt: "NA FILA", en: "IN QUEUE" } satisfies Localized, tint: CORAL },
    { value: "1.480", label: { pt: "R$ HOJE", en: "R$ TODAY" } satisfies Localized, tint: GREEN },
  ],
  alerts: [
    {
      title: { pt: "Conflito de horário às 17:15", en: "Booking clash at 5:15pm" } satisfies Localized,
      body: {
        pt: "O pedido de Marcos Aurélio cai sobre Heitor Cruz, com Rai.",
        en: "Marcos Aurélio's request lands on Heitor Cruz, with Rai.",
      } satisfies Localized,
      action: { pt: "Resolver", en: "Resolve" } satisfies Localized,
      tint: "#C0392B",
      wash: "#FBEAE7",
    },
    {
      title: { pt: "Fabrício Lemos está 12 min atrasado", en: "Fabrício Lemos is 12 min late" } satisfies Localized,
      body: {
        pt: "Tinha 14:00 com Téo. Ligar ou liberar o horário?",
        en: "Had 2:00pm with Téo. Call, or release the slot?",
      } satisfies Localized,
      action: { pt: "Ver", en: "View" } satisfies Localized,
      tint: AMBER,
      wash: "#FBF3DF",
    },
  ],
  now: { pt: "AGORA", en: "NOW" } satisfies Localized,
  current: {
    name: "Bruno Sales",
    what: { pt: "Corte + barba · com Aníbal", en: "Cut + beard · with Aníbal" } satisfies Localized,
    clock: "14:11",
    of: { pt: "DE 45 MIN", en: "OF 45 MIN" } satisfies Localized,
    finish: { pt: "Concluir atendimento", en: "Finish" } satisfies Localized,
    detail: { pt: "Detalhes", en: "Details" } satisfies Localized,
  },
  decide: { pt: "PRECISA DA SUA DECISÃO", en: "NEEDS YOUR DECISION" } satisfies Localized,
  requests: [
    {
      name: "Marcos Aurélio",
      what: { pt: "Barba navalha · Rai", en: "Razor shave · Rai" } satisfies Localized,
      when: { pt: "hoje · 17:15", en: "today · 5:15pm" } satisfies Localized,
      price: "R$ 45",
      flag: { pt: "conflito com Heitor Cruz", en: "clashes with Heitor Cruz" } satisfies Localized,
      note: { pt: "3 atendimentos", en: "3 visits" } satisfies Localized,
    },
  ],
  refuse: { pt: "Recusar", en: "Decline" } satisfies Localized,
  approve: { pt: "Aprovar", en: "Approve" } satisfies Localized,
  tabs: [
    { label: { pt: "HOJE", en: "TODAY" } satisfies Localized },
    { label: { pt: "AGENDA", en: "DIARY" } satisfies Localized },
    { label: { pt: "FILA", en: "QUEUE" } satisfies Localized, badge: "7" },
    { label: { pt: "LOJA", en: "SHOP" } satisfies Localized },
    { label: { pt: "MAIS", en: "MORE" } satisfies Localized },
  ],
}

/**
 * The same marketplace, from behind the chair.
 *
 * It is a queue and an inbox of decisions, not a calendar — because the thing
 * that actually goes wrong in a barbershop is two bookings on one barber and a
 * customer twelve minutes late, and both of those are decisions somebody has to
 * make between haircuts.
 */
export const VezStore = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <StatusBar />

      <div className="flex shrink-0 items-start gap-[10px] px-[18px] pt-[2px]">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            {store.shop}
          </p>
          <p className="mt-[3px] text-[8px] font-medium tracking-[0.08em]" style={{ color: MUTED }}>
            {pick(store.open)}
          </p>
        </div>
        <span
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] text-[10px] font-semibold"
          style={{ background: "#F1F2F3", color: BODY }}
        >
          DA
        </span>
      </div>

      <div className="flex shrink-0 gap-[8px] px-[18px] pt-[12px]">
        {store.stats.map((stat) => (
          <div
            key={stat.label.en}
            className="flex-1 rounded-[11px] px-[10px] py-[9px]"
            style={{ background: "#F4F5F6" }}
          >
            <p className="text-[17px] font-bold tracking-[-0.03em]" style={{ color: stat.tint }}>
              {stat.value}
            </p>
            <p className="mt-[1px] text-[7.5px] font-bold tracking-[0.08em]" style={{ color: MUTED }}>
              {pick(stat.label)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[12px] shrink-0">
        {store.alerts.map((alert) => (
          <div
            key={alert.title.en}
            className="flex items-start gap-[9px] px-[18px] py-[10px]"
            style={{ background: alert.wash }}
          >
            <span
              className="mt-[1px] flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[4px] text-[10px] font-bold text-white"
              style={{ background: alert.tint }}
            >
              !
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold leading-tight" style={{ color: alert.tint }}>
                {pick(alert.title)}
              </p>
              <p className="mt-[3px] text-[9.5px] leading-[1.35]" style={{ color: BODY }}>
                {pick(alert.body)}
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-medium" style={{ color: alert.tint }}>
              {pick(alert.action)}
            </span>
          </div>
        ))}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden px-[18px] pt-[13px]">
        <p className="text-[8.5px] font-bold tracking-[0.1em]" style={{ color: MUTED }}>
          {pick(store.now)}
        </p>
        <div className="mt-[8px] overflow-hidden rounded-[12px]" style={{ border: `1px solid ${LINE}` }}>
          <div className="flex items-center gap-[11px] p-[12px]">
            <span
              className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
              style={{ background: "#F1F2F3", color: BODY }}
            >
              BS
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] font-bold" style={{ color: INK }}>
                {store.current.name}
              </p>
              <p className="mt-[1px] truncate text-[9.5px]" style={{ color: BODY }}>
                {pick(store.current.what)}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[15px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
                {store.current.clock}
              </p>
              <p className="text-[7.5px] font-bold tracking-[0.06em]" style={{ color: MUTED }}>
                {pick(store.current.of)}
              </p>
            </div>
          </div>
          {/* The bar is the appointment running out, not decoration. */}
          <div className="h-[2.5px]" style={{ background: "#EDEFF0" }}>
            <div className="h-full w-[38%]" style={{ background: GREEN }} />
          </div>
          <div className="flex" style={{ borderTop: `1px solid ${LINE}` }}>
            <div className="flex flex-1 items-center justify-center py-[10px]">
              <span className="text-[11.5px] font-semibold" style={{ color: GREEN }}>
                {pick(store.current.finish)}
              </span>
            </div>
            <div
              className="flex items-center justify-center px-[16px]"
              style={{ borderLeft: `1px solid ${LINE}` }}
            >
              <span className="text-[11.5px] font-medium" style={{ color: BODY }}>
                {pick(store.current.detail)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-[14px] flex items-center gap-[8px]">
          <p className="text-[8.5px] font-bold tracking-[0.1em]" style={{ color: MUTED }}>
            {pick(store.decide)}
          </p>
          <span
            className="flex h-[15px] min-w-[15px] items-center justify-center rounded-full px-[5px] text-[8.5px] font-bold text-white"
            style={{ background: CORAL }}
          >
            3
          </span>
        </div>

        {store.requests.map((request) => (
          <div
            key={request.name}
            className="mt-[8px] overflow-hidden rounded-[12px]"
            style={{ border: `1px solid ${LINE}` }}
          >
            <div className="p-[12px]">
              <div className="flex items-start justify-between gap-[10px]">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-bold" style={{ color: INK }}>
                    {request.name}
                  </p>
                  <p className="mt-[1px] truncate text-[9.5px]" style={{ color: BODY }}>
                    {pick(request.what)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9.5px]" style={{ color: BODY }}>
                    {pick(request.when)}
                  </p>
                  <p className="mt-[1px] text-[11px] font-semibold" style={{ color: INK }}>
                    {request.price}
                  </p>
                </div>
              </div>
              <div className="mt-[9px] flex gap-[6px]">
                <span
                  className="flex items-center gap-[5px] rounded-[6px] px-[7px] py-[4px] text-[8.5px] font-medium"
                  style={{ background: CORAL_WASH, color: "#C0392B" }}
                >
                  <span className="h-[5px] w-[5px] rounded-full" style={{ background: "#C0392B" }} />
                  {pick(request.flag)}
                </span>
                <span
                  className="rounded-[6px] px-[7px] py-[4px] text-[8.5px]"
                  style={{ background: "#F1F2F3", color: BODY }}
                >
                  {pick(request.note)}
                </span>
              </div>
            </div>
            <div className="flex" style={{ borderTop: `1px solid ${LINE}` }}>
              <div className="flex flex-1 items-center justify-center py-[10px]">
                <span className="text-[11.5px] font-medium" style={{ color: BODY }}>
                  {pick(store.refuse)}
                </span>
              </div>
              <div
                className="flex flex-[1.6] items-center justify-center py-[10px]"
                style={{ background: CORAL }}
              >
                <span className="text-[11.5px] font-semibold text-white">{pick(store.approve)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav
        className="relative flex shrink-0 items-start justify-around px-[8px] pb-[2px] pt-[10px]"
        style={{ borderTop: `1px solid ${LINE}` }}
        aria-hidden="true"
      >
        {store.tabs.map((tab, index) =>
          tab.badge ? (
            <div key={tab.label.en} className="flex w-[54px] flex-col items-center">
              <span
                className="-mt-[22px] flex h-[40px] w-[40px] flex-col items-center justify-center rounded-full text-white shadow-[0_6px_14px_rgba(238,108,76,0.4)]"
                style={{ background: CORAL }}
              >
                <span className="text-[13px] font-bold leading-none">{tab.badge}</span>
                <span className="mt-[1px] text-[5.5px] font-bold tracking-[0.06em]">
                  {pick({ pt: "NA FILA", en: "QUEUE" })}
                </span>
              </span>
              <span className="mt-[4px] text-[7.5px] font-bold tracking-[0.06em]" style={{ color: CORAL }}>
                {pick(tab.label)}
              </span>
            </div>
          ) : (
            <div key={tab.label.en} className="flex w-[54px] flex-col items-center gap-[4px]">
              <span
                className="h-[15px] w-[15px] rounded-[4px]"
                style={{
                  background: index === 0 ? INK : "transparent",
                  border: index === 0 ? "none" : `1.6px solid ${MUTED}`,
                }}
              />
              <span
                className="text-[7.5px] font-bold tracking-[0.06em]"
                style={{ color: index === 0 ? INK : MUTED }}
              >
                {pick(tab.label)}
              </span>
            </div>
          ),
        )}
      </nav>
      <HomeIndicator />
    </Screen>
  )
}

/* ─────────────────────────────  THE CONSOLES  ──────────────────────────── */

type NavGroup = {
  heading: Localized
  items: { icon: typeof Users; label: Localized; badge?: string }[]
}

const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-[12px] bg-white", className)} style={{ border: `1px solid ${LINE}` }}>
    {children}
  </div>
)

/**
 * The shell both web surfaces share.
 *
 * `tag` is the only thing that separates them at a glance — PORTAL for the shop
 * that owns one diary, ADMIN for the operator who owns the marketplace — which
 * is a deliberate choice in the product and worth keeping: they are the same
 * application at two altitudes, not two applications.
 */
const VezShell = ({
  tag,
  nav,
  active,
  title,
  note,
  right,
  children,
}: {
  tag: string
  nav: NavGroup[]
  active: [number, number]
  title: string
  note: string
  right?: ReactNode
  children: ReactNode
}) => {
  const { pick } = useLocale()

  return (
    <div className="flex" style={{ background: CANVAS, color: INK, width: VEZ_WIDTH }}>
      <aside
        className="flex w-[228px] shrink-0 flex-col bg-white pb-[14px]"
        style={{ borderRight: `1px solid ${LINE}` }}
      >
        <div className="flex items-center gap-[9px] px-[18px] pt-[16px]">
          <span
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] text-[13px] font-bold text-white"
            style={{ background: CORAL }}
          >
            V
          </span>
          <span className="text-[15px] font-bold tracking-[-0.02em]">Vez</span>
          <span
            className="ml-auto text-[8px] font-bold tracking-[0.14em]"
            style={{ color: MUTED }}
          >
            {tag}
          </span>
        </div>

        <nav className="mt-[18px] flex-1">
          {nav.map((group, groupIndex) => (
            <div key={group.heading.en} className={groupIndex ? "mt-[18px]" : undefined}>
              <p
                className="px-[18px] pb-[7px] text-[8.5px] font-bold tracking-[0.14em]"
                style={{ color: MUTED }}
              >
                {pick(group.heading)}
              </p>
              {group.items.map((item, index) => {
                const on = groupIndex === active[0] && index === active[1]
                return (
                  <div
                    key={item.label.en}
                    className="relative mx-[10px] flex items-center gap-[11px] rounded-[9px] px-[10px] py-[9px]"
                    style={{ background: on ? CORAL_WASH : "transparent" }}
                  >
                    {on ? (
                      <span
                        className="absolute -left-[10px] top-1/2 h-[22px] w-[3px] -translate-y-1/2 rounded-r-[2px]"
                        style={{ background: CORAL }}
                      />
                    ) : null}
                    <item.icon
                      size={15}
                      strokeWidth={1.9}
                      className="shrink-0"
                      style={{ color: on ? CORAL : BODY }}
                    />
                    <span
                      className="flex-1 text-[12px] font-medium tracking-[-0.01em]"
                      style={{ color: on ? CORAL : INK }}
                    >
                      {pick(item.label)}
                    </span>
                    {item.badge ? (
                      <span className="text-[10px] font-semibold" style={{ color: CORAL }}>
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <div
          className="flex items-center gap-[14px] bg-white px-[24px] py-[14px]"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <div className="min-w-0">
            <p className="text-[19px] font-bold tracking-[-0.03em]">{title}</p>
            <p className="mt-[2px] text-[10.5px]" style={{ color: BODY }}>
              {note}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-[12px]">{right}</div>
        </div>

        <div className="px-[24px] py-[18px]">{children}</div>
      </div>
    </div>
  )
}

const portal = {
  nav: [
    {
      heading: { pt: "OPERAÇÃO", en: "OPERATIONS" } satisfies Localized,
      items: [
        { icon: LayoutGrid, label: { pt: "Visão geral", en: "Overview" } satisfies Localized },
        { icon: CalendarDays, label: { pt: "Agenda", en: "Diary" } satisfies Localized },
        { icon: ListFilter, label: { pt: "Fila de espera", en: "Waiting queue" } satisfies Localized, badge: "7" },
        { icon: Users, label: { pt: "Clientes", en: "Customers" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "CADASTRO", en: "RECORDS" } satisfies Localized,
      items: [
        { icon: Tags, label: { pt: "Serviços", en: "Services" } satisfies Localized },
        { icon: Scissors, label: { pt: "Equipe", en: "Team" } satisfies Localized },
        { icon: Clock, label: { pt: "Horários", en: "Opening hours" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "NEGÓCIO", en: "BUSINESS" } satisfies Localized,
      items: [
        { icon: ChartColumn, label: { pt: "Financeiro", en: "Finance" } satisfies Localized },
        { icon: Store, label: { pt: "Perfil público", en: "Public profile" } satisfies Localized },
        { icon: Settings, label: { pt: "Configurações", en: "Settings" } satisfies Localized },
      ],
    },
  ] as NavGroup[],
  title: { pt: "Visão geral", en: "Overview" } satisfies Localized,
  note: { pt: "quinta-feira, 18 de setembro de 2026", en: "Thursday, 18 September 2026" } satisfies Localized,
  cta: { pt: "Novo agendamento", en: "New booking" } satisfies Localized,
  stats: [
    {
      label: { pt: "Atendimentos hoje", en: "Appointments today" } satisfies Localized,
      value: "22",
      delta: "+4",
      note: { pt: "de 28 vagas do dia", en: "of 28 slots today" } satisfies Localized,
      up: true,
    },
    {
      label: { pt: "Faturamento hoje", en: "Revenue today" } satisfies Localized,
      value: "R$ 1.840",
      delta: "+16%",
      note: { pt: "média de quinta: R$ 1.520", en: "Thursday average: R$ 1,520" } satisfies Localized,
      up: true,
    },
    {
      label: { pt: "Ocupação da agenda", en: "Diary occupancy" } satisfies Localized,
      value: "84%",
      delta: "-3%",
      note: { pt: "1h40 livres até 20:00", en: "1h40 free until 8:00pm" } satisfies Localized,
      up: false,
    },
    {
      label: { pt: "Na fila agora", en: "In queue now" } satisfies Localized,
      value: "7",
      delta: "24min",
      note: { pt: "espera média de hoje", en: "today's average wait" } satisfies Localized,
      up: true,
    },
    {
      label: { pt: "Não comparecimento", en: "No-shows" } satisfies Localized,
      value: "4,8%",
      delta: "-1,2",
      note: { pt: "últimos 30 dias", en: "last 30 days" } satisfies Localized,
      up: true,
    },
  ],
  alerts: [
    {
      tag: { pt: "CONFLITO", en: "CLASH" } satisfies Localized,
      title: { pt: "Dois agendamentos às 17:15 com o Rai", en: "Two bookings at 5:15pm with Rai" } satisfies Localized,
      body: {
        pt: "Alguém marcou pelo app enquanto você lançava no balcão.",
        en: "Someone booked in the app while you were entering it at the counter.",
      } satisfies Localized,
      action: { pt: "Resolver na agenda", en: "Resolve in the diary" } satisfies Localized,
      tint: "#C0392B",
    },
    {
      tag: { pt: "COBRANÇA", en: "BILLING" } satisfies Localized,
      title: { pt: "Assinatura com pendência", en: "Subscription past due" } satisfies Localized,
      body: { pt: "O cartão foi recusado na cobrança de 12/09.", en: "The card was declined on 12/09." } satisfies Localized,
      action: { pt: "Atualizar pagamento", en: "Update payment" } satisfies Localized,
      tint: AMBER,
    },
  ],
  pending: { pt: "Aguardando sua aprovação", en: "Waiting for your approval" } satisfies Localized,
  manual: { pt: "Aprovação manual está ligada", en: "Manual approval is on" } satisfies Localized,
  columns: [
    { pt: "CLIENTE", en: "CUSTOMER" } satisfies Localized,
    { pt: "SERVIÇO", en: "SERVICE" } satisfies Localized,
    { pt: "QUANDO", en: "WHEN" } satisfies Localized,
    { pt: "VALOR", en: "PRICE" } satisfies Localized,
  ],
  requests: [
    {
      name: "Marcos Aurélio",
      meta: { pt: "cliente desde 2024 · 18 visitas", en: "customer since 2024 · 18 visits" } satisfies Localized,
      service: { pt: "Corte + barba", en: "Cut + beard" } satisfies Localized,
      who: "Rai · 50min",
      when: { pt: "hoje 17:15", en: "today 5:15pm" } satisfies Localized,
      price: "R$ 90",
    },
    {
      name: "Diego Salles",
      meta: { pt: "primeira vez aqui", en: "first time here" } satisfies Localized,
      service: { pt: "Corte social", en: "Classic cut" } satisfies Localized,
      who: "Téo · 30min",
      when: { pt: "sex 09:00", en: "Fri 9:00am" } satisfies Localized,
      price: "R$ 55",
    },
    {
      name: "Henrique Paz",
      meta: { pt: "2 faltas nos últimos 6 meses", en: "2 no-shows in the last 6 months" } satisfies Localized,
      service: { pt: "Barba na navalha", en: "Razor shave" } satisfies Localized,
      who: "Rai · 30min",
      when: { pt: "sex 11:30", en: "Fri 11:30am" } satisfies Localized,
      price: "R$ 45",
    },
    {
      name: "Tiago Ramos",
      meta: { pt: "sinal de R$ 20 já pago", en: "R$ 20 deposit already paid" } satisfies Localized,
      service: { pt: "Platinado", en: "Bleach" } satisfies Localized,
      who: "Ana · 1h40",
      when: { pt: "sáb 14:00", en: "Sat 2:00pm" } satisfies Localized,
      price: "R$ 210",
    },
  ],
  approve: { pt: "Aprovar", en: "Approve" } satisfies Localized,
  refuse: { pt: "Recusar", en: "Decline" } satisfies Localized,
  queue: { pt: "Na fila agora", en: "In queue now" } satisfies Localized,
  openQueue: { pt: "Abrir fila", en: "Open queue" } satisfies Localized,
  waiting: [
    { name: "Caio Bertoldo", what: { pt: "Corte social · QR code no balcão", en: "Classic cut · QR at the counter" } satisfies Localized, wait: "31min" },
    { name: "Everton Lima", what: { pt: "Barba · balcão", en: "Beard · counter" } satisfies Localized, wait: "18min" },
    { name: "Rui Antunes", what: { pt: "Corte + barba · app remoto", en: "Cut + beard · remote app" } satisfies Localized, wait: "9min" },
  ],
  weeks: { pt: "Últimas 8 semanas", en: "Last 8 weeks" } satisfies Localized,
  bars: [62, 68, 64, 74, 70, 82, 78, 88],
  hourly: {
    title: { pt: "Hoje, hora por hora", en: "Today, hour by hour" } satisfies Localized,
    note: {
      pt: "Os vãos claros são horários que você ainda pode vender.",
      en: "The pale gaps are slots you can still sell.",
    } satisfies Localized,
    free: { pt: "1h40 livres", en: "1h40 free" } satisfies Localized,
    /* `at` is a percentage across the working day, `width` how long it runs —
       so the gaps between blocks are the product's actual inventory. */
    staff: [
      { name: "Rai", slots: [{ at: 0, width: 13, label: "08:00" }, { at: 15, width: 12, label: "09:30" }, { at: 33, width: 11, label: "12:00" }, { at: 50, width: 12, label: "13:30", clash: true }, { at: 70, width: 12, label: "17:00" }] },
      { name: "Téo", slots: [{ at: 5, width: 13, label: "08:30" }, { at: 26, width: 12, label: "11:00" }, { at: 52, width: 11, label: "14:00", clash: true }, { at: 67, width: 12, label: "15:30" }] },
      { name: "Ana", slots: [{ at: 0, width: 14, label: "08:00" }, { at: 34, width: 11, label: "12:00" }, { at: 58, width: 12, label: "15:00" }] },
      { name: "Sérgio", slots: [{ at: 8, width: 12, label: "09:00" }, { at: 30, width: 18, label: "11:30" }, { at: 72, width: 12, label: "16:30" }] },
    ],
    hours: ["08", "10", "12", "14", "16", "18", "20"],
  },
}

/** The shop's own console: an approval inbox and a live queue, not a calendar. */
export const VezPortal = () => {
  const { pick } = useLocale()

  return (
    <VezShell
      tag="PORTAL"
      nav={portal.nav}
      active={[0, 0]}
      title={pick(portal.title)}
      note={pick(portal.note)}
      right={
        <>
          <div className="text-right">
            <p className="text-[15px] font-bold tracking-[-0.02em]">14:32</p>
            <p className="text-[9.5px]" style={{ color: BODY }}>
              {pick({ pt: "Qui, 18 de setembro", en: "Thu, 18 September" })}
            </p>
          </div>
          <span
            className="rounded-[9px] px-[14px] py-[9px] text-[11.5px] font-semibold text-white"
            style={{ background: CORAL }}
          >
            {pick(portal.cta)}
          </span>
        </>
      }
    >
      <div className="grid grid-cols-5 gap-[12px]">
        {portal.stats.map((stat) => (
          <Card key={stat.label.en} className="px-[14px] py-[12px]">
            <p className="text-[10px]" style={{ color: BODY }}>
              {pick(stat.label)}
            </p>
            <p className="mt-[6px] flex items-baseline gap-[6px]">
              <span className="text-[21px] font-bold tracking-[-0.03em]">{stat.value}</span>
              <span
                className="text-[9.5px] font-semibold"
                style={{ color: stat.up ? GREEN : "#C0392B" }}
              >
                {stat.delta}
              </span>
            </p>
            <p className="mt-[6px] text-[9px]" style={{ color: MUTED }}>
              {pick(stat.note)}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-[12px] space-y-[8px]">
        {portal.alerts.map((alert) => (
          <div
            key={alert.tag.en}
            className="flex items-center gap-[12px] rounded-[10px] bg-white px-[14px] py-[11px]"
            style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${alert.tint}` }}
          >
            <span
              className="shrink-0 text-[8.5px] font-bold tracking-[0.1em]"
              style={{ color: alert.tint }}
            >
              {pick(alert.tag)}
            </span>
            <span className="text-[11.5px] font-bold">{pick(alert.title)}</span>
            <span className="min-w-0 flex-1 truncate text-[10.5px]" style={{ color: BODY }}>
              {pick(alert.body)}
            </span>
            <span className="shrink-0 text-[10.5px] font-medium" style={{ color: alert.tint }}>
              {pick(alert.action)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-[12px] grid grid-cols-[1.55fr_1fr] gap-[12px]">
        <Card className="px-[16px] py-[14px]">
          <div className="flex items-baseline gap-[10px]">
            <p className="text-[14px] font-bold tracking-[-0.02em]">{pick(portal.pending)}</p>
            <span
              className="flex h-[17px] min-w-[17px] items-center justify-center rounded-full px-[5px] text-[9.5px] font-bold text-white"
              style={{ background: CORAL }}
            >
              4
            </span>
            <span className="ml-auto text-[9.5px]" style={{ color: BODY }}>
              {pick(portal.manual)}
            </span>
          </div>

          <div
            className="mt-[12px] grid grid-cols-[1.3fr_1.1fr_0.9fr_0.5fr_1.1fr] pb-[7px]"
            style={{ borderBottom: `1px solid ${LINE}` }}
          >
            {portal.columns.map((column) => (
              <span
                key={column.en}
                className="text-[8.5px] font-bold tracking-[0.1em]"
                style={{ color: MUTED }}
              >
                {pick(column)}
              </span>
            ))}
            <span />
          </div>

          {portal.requests.map((request) => (
            <div
              key={request.name}
              className="grid grid-cols-[1.3fr_1.1fr_0.9fr_0.5fr_1.1fr] items-center py-[10px]"
              style={{ borderBottom: `1px solid ${LINE}` }}
            >
              <div className="min-w-0 pr-[8px]">
                <p className="truncate text-[11.5px] font-semibold">{request.name}</p>
                <p className="truncate text-[9px]" style={{ color: MUTED }}>
                  {pick(request.meta)}
                </p>
              </div>
              <div className="min-w-0 pr-[8px]">
                <p className="truncate text-[11px]">{pick(request.service)}</p>
                <p className="truncate text-[9px]" style={{ color: MUTED }}>
                  {request.who}
                </p>
              </div>
              <span className="text-[10.5px]" style={{ color: BODY }}>
                {pick(request.when)}
              </span>
              <span className="text-[11px] font-semibold">{request.price}</span>
              <div className="flex items-center justify-end gap-[6px]">
                <span
                  className="rounded-[7px] px-[11px] py-[6px] text-[10px] font-semibold text-white"
                  style={{ background: CORAL }}
                >
                  {pick(portal.approve)}
                </span>
                <span
                  className="rounded-[7px] px-[10px] py-[6px] text-[10px] font-medium"
                  style={{ border: `1px solid ${LINE}`, color: BODY }}
                >
                  {pick(portal.refuse)}
                </span>
              </div>
            </div>
          ))}
        </Card>

        <div className="space-y-[12px]">
          <Card className="px-[16px] py-[14px]">
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-bold tracking-[-0.02em]">{pick(portal.weeks)}</p>
              <span className="text-[9px]" style={{ color: MUTED }}>
                {pick({ pt: "agendamentos · faturamento", en: "bookings · revenue" })}
              </span>
            </div>
            <div className="mt-[12px] flex h-[74px] items-end gap-[7px]">
              {portal.bars.map((bar, index) => (
                <div key={index} className="relative flex-1">
                  <div
                    className="w-full rounded-t-[3px]"
                    style={{ height: bar, background: "#E9EBEC" }}
                  />
                  <span
                    className="absolute inset-x-0"
                    style={{ bottom: bar * 0.55, height: 2, background: CORAL }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="px-[16px] py-[14px]">
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-bold tracking-[-0.02em]">{pick(portal.queue)}</p>
              <span className="text-[10px] font-medium" style={{ color: CORAL }}>
                {pick(portal.openQueue)}
              </span>
            </div>
            <div className="mt-[11px] space-y-[9px]">
              {portal.waiting.map((person, index) => (
                <div key={person.name} className="flex items-center gap-[10px]">
                  <span className="w-[10px] shrink-0 text-[9.5px]" style={{ color: MUTED }}>
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-semibold">{person.name}</p>
                    <p className="truncate text-[9px]" style={{ color: MUTED }}>
                      {pick(person.what)}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-[10.5px] font-bold"
                    style={{ color: index === 0 ? CORAL : AMBER }}
                  >
                    {person.wait}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="mt-[12px] px-[16px] py-[14px]">
        <div className="flex items-baseline gap-[10px]">
          <p className="text-[14px] font-bold tracking-[-0.02em]">{pick(portal.hourly.title)}</p>
          <p className="text-[10px]" style={{ color: BODY }}>
            {pick(portal.hourly.note)}
          </p>
          <span className="ml-auto text-[10px] font-medium" style={{ color: BODY }}>
            {pick(portal.hourly.free)}
          </span>
        </div>

        <div className="relative mt-[12px]">
          {portal.hourly.staff.map((person) => (
            <div key={person.name} className="flex items-center gap-[12px] py-[5px]">
              <span className="w-[46px] shrink-0 text-[10.5px] font-semibold">{person.name}</span>
              <div className="relative h-[22px] flex-1">
                {person.slots.map((slot) => (
                  <span
                    key={slot.label}
                    className="absolute inset-y-0 flex items-center justify-center rounded-[5px] text-[9px]"
                    style={{
                      left: `${slot.at}%`,
                      width: `${slot.width}%`,
                      background: slot.clash ? CORAL_WASH : "#F1F2F3",
                      color: slot.clash ? "#C0392B" : BODY,
                    }}
                  >
                    {slot.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
          {/* Now. The one line on the panel that moves. */}
          <span
            className="pointer-events-none absolute inset-y-0 w-[1.5px]"
            style={{ left: "calc(46px + 12px + 56%)", background: CORAL }}
          />
        </div>

        <div className="mt-[6px] flex pl-[58px]">
          {portal.hourly.hours.map((hour) => (
            <span key={hour} className="flex-1 text-[9px]" style={{ color: MUTED }}>
              {hour}
            </span>
          ))}
        </div>
      </Card>
    </VezShell>
  )
}

const adminData = {
  nav: [
    {
      heading: { pt: "OPERAÇÃO", en: "OPERATIONS" } satisfies Localized,
      items: [
        { icon: LayoutGrid, label: { pt: "Visão geral", en: "Overview" } satisfies Localized },
        { icon: Grid2x2, label: { pt: "Aprovações", en: "Approvals" } satisfies Localized, badge: "7" },
        { icon: Store, label: { pt: "Estabelecimentos", en: "Businesses" } satisfies Localized },
        { icon: Headphones, label: { pt: "Suporte", en: "Support" } satisfies Localized, badge: "5" },
      ],
    },
    {
      heading: { pt: "CRESCIMENTO", en: "GROWTH" } satisfies Localized,
      items: [
        { icon: MapPin, label: { pt: "Cidades", en: "Cities" } satisfies Localized },
        { icon: Tags, label: { pt: "Cotas e planos", en: "Quotas and plans" } satisfies Localized },
        { icon: Star, label: { pt: "Avaliações", en: "Reviews" } satisfies Localized, badge: "5" },
      ],
    },
    {
      heading: { pt: "NEGÓCIO", en: "BUSINESS" } satisfies Localized,
      items: [
        { icon: Wallet, label: { pt: "Financeiro", en: "Finance" } satisfies Localized, badge: "4" },
        { icon: CircleUserRound, label: { pt: "Clientes finais", en: "End customers" } satisfies Localized },
      ],
    },
  ] as NavGroup[],
  title: { pt: "Visão geral", en: "Overview" } satisfies Localized,
  note: { pt: "Plataforma toda · setembro 2026", en: "Whole platform · September 2026" } satisfies Localized,
  work: { pt: "FILA DE TRABALHO", en: "WORK QUEUE" } satisfies Localized,
  queue: [
    { value: "7", label: { pt: "Aprovações aguardando", en: "Approvals waiting" } satisfies Localized, note: { pt: "mais antiga há 2d 4h", en: "oldest 2d 4h ago" } satisfies Localized, tint: AMBER },
    { value: "5", label: { pt: "Chamados de suporte", en: "Support tickets" } satisfies Localized, note: { pt: "2 com prioridade alta", en: "2 high priority" } satisfies Localized, tint: INK },
    { value: "5", label: { pt: "Avaliações denunciadas", en: "Reported reviews" } satisfies Localized, note: { pt: "aguardando decisão", en: "awaiting a decision" } satisfies Localized, tint: MUTED },
    { value: "4", label: { pt: "Cobranças vencidas", en: "Overdue invoices" } satisfies Localized, note: { pt: "R$ 3.160 em atraso", en: "R$ 3,160 outstanding" } satisfies Localized, tint: CORAL },
  ],
  mrr: { pt: "RECEITA RECORRENTE MENSAL", en: "MONTHLY RECURRING REVENUE" } satisfies Localized,
  mrrValue: "R$ 214.380",
  mrrDelta: "+8,1%",
  split: [
    { label: { pt: "Mensalidade", en: "Subscription" } satisfies Localized, value: "R$ 137.200", tint: INK, share: 64 },
    { label: { pt: "Comissão", en: "Commission" } satisfies Localized, value: "R$ 77.180", tint: CORAL, share: 36 },
  ],
  active: { pt: "ESTABELECIMENTOS ATIVOS", en: "ACTIVE BUSINESSES" } satisfies Localized,
  activeValue: "1.284",
  joined: { pt: "Novos no mês", en: "New this month" } satisfies Localized,
  left: { pt: "Cancelamentos", en: "Cancellations" } satisfies Localized,
  bookings: { pt: "AGENDAMENTOS NO MÊS", en: "BOOKINGS THIS MONTH" } satisfies Localized,
  bookingsValue: "121.043",
  paid: { pt: "passaram pelo pagamento integrado", en: "went through integrated payment" } satisfies Localized,
  growth: {
    title: { pt: "Receita e volume de agendamentos", en: "Revenue and booking volume" } satisfies Localized,
    revenue: { pt: "Receita", en: "Revenue" } satisfies Localized,
    volume: { pt: "Agendamentos", en: "Bookings" } satisfies Localized,
    months: [
      { label: { pt: "abr", en: "Apr" } satisfies Localized, bar: 54, line: 38 },
      { label: { pt: "mai", en: "May" } satisfies Localized, bar: 62, line: 47 },
      { label: { pt: "jun", en: "Jun" } satisfies Localized, bar: 66, line: 55 },
      { label: { pt: "jul", en: "Jul" } satisfies Localized, bar: 74, line: 64 },
      { label: { pt: "ago", en: "Aug" } satisfies Localized, bar: 82, line: 73 },
      { label: { pt: "set", en: "Sep" } satisfies Localized, bar: 94, line: 84 },
    ],
  },
  quotas: { pt: "Vagas de mensalidade por cidade", en: "Subscription slots per city" } satisfies Localized,
  quotasNote: { pt: "Cada célula é uma vaga. Preenchida = ocupada.", en: "Each cell is a slot. Filled = taken." } satisfies Localized,
  cities: [
    { name: "São Paulo", state: { pt: "esgotada · só comissão", en: "sold out · commission only" } satisfies Localized, taken: 40, of: 40 },
    { name: "Campinas", state: { pt: "2 vagas restantes", en: "2 slots left" } satisfies Localized, taken: 22, of: 24 },
    { name: "Curitiba", state: { pt: "7 vagas restantes", en: "7 slots left" } satisfies Localized, taken: 17, of: 24 },
    { name: "Belo Horizonte", state: { pt: "esgotada · só comissão", en: "sold out · commission only" } satisfies Localized, taken: 24, of: 24 },
    { name: "Florianópolis", state: { pt: "9 vagas restantes", en: "9 slots left" } satisfies Localized, taken: 9, of: 18 },
    { name: "Joinville", state: { pt: "12 vagas restantes", en: "12 slots left" } satisfies Localized, taken: 6, of: 18 },
    { name: "Porto Alegre", state: { pt: "4 vagas restantes", en: "4 slots left" } satisfies Localized, taken: 20, of: 24 },
  ],
}

/**
 * The console above the marketplace.
 *
 * Leads on a work queue rather than a metric, because running a marketplace is
 * a job with an inbox: approvals, tickets, reported reviews, overdue cards. The
 * city quota grid below it is the business model made visible — a fixed number
 * of subscription slots per city, and what happens when one sells out.
 */
export const VezAdmin = () => {
  const { pick } = useLocale()

  return (
    <VezShell
      tag="ADMIN"
      nav={adminData.nav}
      active={[0, 0]}
      title={pick(adminData.title)}
      note={pick(adminData.note)}
      right={
        <span className="text-[10.5px] tracking-[0.04em]" style={{ color: MUTED }}>
          18 set 2026
        </span>
      }
    >
      <p className="text-[8.5px] font-bold tracking-[0.14em]" style={{ color: MUTED }}>
        {pick(adminData.work)}
      </p>
      <div className="mt-[9px] grid grid-cols-4 gap-[12px]">
        {adminData.queue.map((item) => (
          <div
            key={item.label.en}
            className="rounded-[10px] bg-white px-[14px] py-[12px]"
            style={{ border: `1px solid ${LINE}`, borderLeft: `3px solid ${item.tint}` }}
          >
            <p className="text-[20px] font-bold tracking-[-0.03em]" style={{ color: item.tint }}>
              {item.value}
            </p>
            <p className="mt-[3px] text-[11px] font-medium">{pick(item.label)}</p>
            <p className="mt-[3px] text-[9px]" style={{ color: MUTED }}>
              {pick(item.note)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[12px] grid grid-cols-[1.5fr_1fr_1fr] gap-[12px]">
        <Card className="px-[16px] py-[14px]">
          <p className="text-[8.5px] font-bold tracking-[0.12em]" style={{ color: BODY }}>
            {pick(adminData.mrr)}
          </p>
          <p className="mt-[6px] flex items-baseline gap-[8px]">
            <span className="text-[26px] font-bold tracking-[-0.04em]">{adminData.mrrValue}</span>
            <span className="text-[10px] font-semibold" style={{ color: GREEN }}>
              {adminData.mrrDelta}
            </span>
          </p>
          {/* The split is the monetisation model, not a chart: two ways of being
              paid for the same booking. */}
          <div className="mt-[11px] flex h-[7px] overflow-hidden rounded-full">
            {adminData.split.map((part) => (
              <div key={part.label.en} style={{ flexGrow: part.share, background: part.tint }} />
            ))}
          </div>
          <div className="mt-[9px] flex gap-[18px]">
            {adminData.split.map((part) => (
              <div key={part.label.en} className="flex items-center gap-[6px]">
                <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: part.tint }} />
                <span className="text-[9.5px]" style={{ color: BODY }}>
                  {pick(part.label)}
                </span>
                <span className="text-[9.5px] font-semibold">{part.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-[16px] py-[14px]">
          <p className="text-[8.5px] font-bold tracking-[0.12em]" style={{ color: BODY }}>
            {pick(adminData.active)}
          </p>
          <p className="mt-[6px] text-[26px] font-bold tracking-[-0.04em]">{adminData.activeValue}</p>
          <div className="mt-[11px] h-px" style={{ background: LINE }} />
          <div className="mt-[9px] flex gap-[18px]">
            <div>
              <p className="text-[12px] font-bold" style={{ color: GREEN }}>
                +47
              </p>
              <p className="text-[9px]" style={{ color: MUTED }}>
                {pick(adminData.joined)}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: "#C0392B" }}>
                −12
              </p>
              <p className="text-[9px]" style={{ color: MUTED }}>
                {pick(adminData.left)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="px-[16px] py-[14px]">
          <p className="text-[8.5px] font-bold tracking-[0.12em]" style={{ color: BODY }}>
            {pick(adminData.bookings)}
          </p>
          <p className="mt-[6px] text-[26px] font-bold tracking-[-0.04em]">
            {adminData.bookingsValue}
          </p>
          <p className="mt-[11px] text-[9.5px]" style={{ color: BODY }}>
            <b>38,4%</b> {pick(adminData.paid)}
          </p>
          <div className="mt-[7px] h-[6px] overflow-hidden rounded-full" style={{ background: "#E9EBEC" }}>
            <div className="h-full rounded-full" style={{ width: "38.4%", background: CORAL }} />
          </div>
        </Card>
      </div>

      <div className="mt-[12px] grid grid-cols-[1fr_1.1fr] gap-[12px]">
        <Card className="px-[16px] py-[14px]">
          <div className="flex items-baseline justify-between">
            <p className="text-[14px] font-bold tracking-[-0.02em]">{pick(adminData.growth.title)}</p>
            <div className="flex items-center gap-[12px]">
              <span className="flex items-center gap-[5px] text-[9px]" style={{ color: BODY }}>
                <span className="h-[2px] w-[12px]" style={{ background: CORAL }} />
                {pick(adminData.growth.revenue)}
              </span>
              <span className="flex items-center gap-[5px] text-[9px]" style={{ color: BODY }}>
                <span className="h-[8px] w-[8px] rounded-[2px]" style={{ background: "#E9EBEC" }} />
                {pick(adminData.growth.volume)}
              </span>
            </div>
          </div>

          <div className="mt-[14px] flex h-[132px] items-end gap-[14px]">
            {adminData.growth.months.map((month) => (
              <div key={month.label.en} className="relative flex-1">
                <div
                  className="w-full rounded-t-[3px]"
                  style={{ height: month.bar, background: "#E9EBEC" }}
                />
                <span
                  className="absolute inset-x-0 h-[2px]"
                  style={{ bottom: month.line, background: CORAL }}
                />
                <span
                  className="absolute left-1/2 h-[6px] w-[6px] -translate-x-1/2 rounded-full"
                  style={{ bottom: month.line - 2, background: CORAL }}
                />
              </div>
            ))}
          </div>
          <div className="mt-[7px] flex gap-[14px]">
            {adminData.growth.months.map((month) => (
              <span
                key={month.label.en}
                className="flex-1 text-center text-[9px]"
                style={{ color: MUTED }}
              >
                {pick(month.label)}
              </span>
            ))}
          </div>
        </Card>

        <Card className="px-[16px] py-[14px]">
          <p className="text-[14px] font-bold tracking-[-0.02em]">{pick(adminData.quotas)}</p>
          <p className="mt-[2px] text-[9.5px]" style={{ color: BODY }}>
            {pick(adminData.quotasNote)}
          </p>

          <div className="mt-[12px] space-y-[10px]">
            {adminData.cities.map((city) => (
              <div key={city.name} className="flex items-center gap-[12px]">
                <div className="w-[112px] shrink-0">
                  <p className="text-[11px] font-semibold">{city.name}</p>
                  <p
                    className="text-[9px]"
                    style={{ color: city.taken === city.of ? CORAL : GREEN }}
                  >
                    {pick(city.state)}
                  </p>
                </div>
                <div className="flex min-w-0 flex-1 flex-wrap gap-[3px]">
                  {Array.from({ length: city.of }).map((_, index) => (
                    <span
                      key={index}
                      className="h-[9px] w-[9px] rounded-[2px]"
                      style={{
                        background: index < city.taken ? INK : "transparent",
                        border: index < city.taken ? "none" : `1px solid ${LINE}`,
                      }}
                    />
                  ))}
                </div>
                <span className="shrink-0 text-[10px] font-semibold" style={{ color: BODY }}>
                  {city.taken}/{city.of}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

    </VezShell>
  )
}

/* ───────────────────────  FRAGMENTS, OUTSIDE A PHONE  ────────────────────── */

/**
 * One card per app, and together they are the product in two sentences: the
 * customer is told when to leave the house, and the shop is told what is
 * waiting on its decision. Neither moment lives on a screen anybody is looking
 * at when it happens, which is exactly why they are worth staging.
 */
export const VezQueueCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint={CORAL}
      mark={<Sparkles size={8} strokeWidth={2.6} className="text-white" />}
      eyebrow={pick({ pt: "SUA VEZ", en: "YOU'RE NEXT" })}
      badge={pick({ pt: "1º na fila", en: "1st in queue" })}
      badgeBg="#FBF0D8"
      badgeInk={AMBER}
      title={pick({
        pt: "Você é o próximo na Meia-Nove",
        en: "You're next at Meia-Nove",
      })}
      body={pick({
        pt: "Saia agora · 1,2 km · espera 6 min",
        en: "Leave now · 1.2 km · 6 min wait",
      })}
    />
  )
}

export const VezRequestCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint="#2B2F35"
      mark={<CalendarDays size={8} strokeWidth={2.6} className="text-white" />}
      eyebrow={pick({ pt: "NOVO PEDIDO", en: "NEW REQUEST" })}
      badge={pick({ pt: "Aguardando", en: "Pending" })}
      badgeBg={CORAL_WASH}
      badgeInk="#C0392B"
      title={pick({ pt: "Diego Salles quer sex 09:00", en: "Diego Salles wants Fri 9:00am" })}
      body={pick({ pt: "Corte social · Téo · R$ 55", en: "Classic cut · Téo · R$ 55" })}
    />
  )
}
