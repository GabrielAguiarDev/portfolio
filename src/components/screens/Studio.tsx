import type { ReactNode } from "react"
import {
  Award,
  Banknote,
  BedDouble,
  Boxes,
  CalendarDays,
  ChartColumn,
  ChevronDown,
  ChevronsLeft,
  CircleUserRound,
  ClipboardList,
  ConciergeBell,
  Copy,
  CreditCard,
  EllipsisVertical,
  FileText,
  Folder,
  FolderPlus,
  Globe,
  Handshake,
  Link2,
  Mail,
  MessageCircle,
  Percent,
  QrCode,
  Receipt,
  Sailboat,
  Search,
  ShoppingCart,
  Smartphone,
  Tags,
  UtensilsCrossed,
  Users,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

/**
 * Y-Studio, rebuilt from the product's own screens.
 *
 * The thing worth reproducing here is not a dashboard, it is the shell. Every
 * module — yBooking, yCRM, yCMS, yCommerce, and the Yago guest platform —
 * loads inside the same rail, the same top bar, the same licensee chip, and
 * differs only in the navigation it publishes and the page it renders. That is
 * the product, and it is why two screens from two modules say more about it
 * than one screen ever could.
 *
 * Authored at `DESKTOP_WIDTH` and scaled by `Miniature` wherever it is placed,
 * the same way the phone screens are authored at a fixed logical width. Every
 * figure, client name, campaign and date is invented.
 */

/** The logical width every web screen here is authored against. */
export const DESKTOP_WIDTH = 1180

const PURPLE = "#5F33B4"
const PURPLE_WASH = "#EFEBF7"
/** The ground every module's page sits on. Exported for `Miniature`. */
export const STUDIO_CANVAS = "#F5F6FA"
const CANVAS = STUDIO_CANVAS
const PANEL = "#EEF0F7"
const INK = "#101828"
const MUTED = "#98A2B3"
const BODY = "#475467"
const HAIRLINE = "rgba(16,24,40,0.08)"

/**
 * The platform's module palette, as the product defines it.
 *
 * Taken from `src/styles/colors.ts` in the Y-Studio codebase, not sampled off a
 * screenshot — these are the values the real shell paints each module's mark
 * with, and getting one wrong is the kind of detail that quietly says "this is
 * a drawing of the product" rather than the product.
 */
const MODULE = {
  booking: "#0080ed",
  crm: "#ff7f00",
  cms: "#009326",
  cx: "#01869d",
  chat: "#c94535",
  commerce: "#e5378e",
  midia: "#00af57",
  storage: "#114d97",
  yago: "#741695",
} as const

const GREEN = "#48B961"
const RED = "#FA6767"
const BLUE = "#2E9BF0"
const AMBER = "#F5A524"

/** A browser window. Fluid, unlike the screens — it is sized by its container. */
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

/* ────────────────────────────────  SHELL  ────────────────────────────────── */

/**
 * The module mark: a play glyph, tinted per module, over the module's name.
 *
 * One mark per module is how the product distinguishes them — the shell is
 * otherwise identical everywhere — so the tint is doing real work here rather
 * than decorating.
 */
const ModuleMark = ({ tint, label }: { tint: string; label: string }) => (
  <div className="flex flex-col items-center gap-[3px]">
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 2.4c0-1 1-1.6 1.9-1.1l12.4 7.3c.9.5.9 1.8 0 2.3L4.9 18.7c-.9.5-1.9-.1-1.9-1.1V2.4Z" fill={tint} />
      <path d="M6.6 7.1 10 10.4l-3.4 3.3V7.1Z" fill="#FFFFFF" />
    </svg>
    <span className="text-[8px] font-bold tracking-[-0.01em]" style={{ color: INK }}>
      {label}
    </span>
  </div>
)

/** The Y-Studio wordmark that sits at the top of the rail. */
const StudioWordmark = () => (
  <div className="flex items-center gap-[7px] px-[18px] pt-[16px]">
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill={PURPLE} />
      <path d="M9 9.5c0-.9.9-1.4 1.6-1l10 5.7c.7.4.7 1.4 0 1.8l-10 5.7c-.7.4-1.6-.1-1.6-1V9.5Z" fill="#FFFFFF" />
      <path d="M13 13.6 16 16l-3 2.4v-4.8Z" fill={PURPLE} />
    </svg>
    <div>
      <p className="text-[17px] font-bold leading-none tracking-[-0.03em]" style={{ color: INK }}>
        Studio
      </p>
      <p className="mt-[3px] text-[5.5px] font-semibold tracking-[0.18em]" style={{ color: MUTED }}>
        UM PRODUTO YAAYOO
      </p>
    </div>
  </div>
)

type NavItem = {
  icon: typeof Users
  label: Localized
  /** Renders the disclosure chevron. The product uses it for grouped routes. */
  group?: boolean
  /** Sub-routes, rendered only for the open group. */
  children?: Localized[]
}

/**
 * The rail, the top bar and the licensee chip — everything a module inherits.
 *
 * `activeChild` is separate from `active` because the product keeps the parent
 * route highlighted while a child is selected, which is the only way you can
 * tell from a screenshot which module section you are actually in.
 */
const StudioShell = ({
  module,
  tint,
  nav,
  active,
  activeChild,
  date,
  licensee,
  children,
}: {
  module: string
  tint: string
  nav: NavItem[]
  active: number
  activeChild?: number
  date: Localized
  licensee: string
  children: ReactNode
}) => {
  const { pick } = useLocale()

  const welcome: Localized = { pt: "Bem vindo(a) ao", en: "Welcome to" }
  const licensedTo: Localized = { pt: "Licenciado para:", en: "Licensed to:" }

  return (
    <div className="flex" style={{ background: CANVAS, color: INK, width: DESKTOP_WIDTH }}>
      <aside className="flex w-[205px] shrink-0 flex-col bg-white pb-[14px]">
        <div className="relative">
          <StudioWordmark />
          <ChevronsLeft
            size={14}
            strokeWidth={2.4}
            className="absolute right-[12px] top-[14px]"
            style={{ color: MUTED }}
          />
        </div>

        <nav className="mt-[22px] flex-1">
          {nav.map((item, index) => {
            const on = index === active
            return (
              <div key={item.label.en}>
                <div
                  className="relative flex items-center gap-[10px] py-[10px] pl-[18px] pr-[14px]"
                  style={{
                    background: on ? PURPLE_WASH : "transparent",
                    color: on ? PURPLE : INK,
                  }}
                >
                  {on ? (
                    <span
                      className="absolute left-0 top-1/2 h-[26px] w-[4px] -translate-y-1/2 rounded-r-[3px]"
                      style={{ background: PURPLE }}
                    />
                  ) : null}
                  <item.icon
                    size={14}
                    strokeWidth={2.1}
                    className="shrink-0"
                    style={{ color: on ? PURPLE : INK }}
                  />
                  <span className="flex-1 text-[11.5px] font-medium tracking-[-0.01em]">
                    {pick(item.label)}
                  </span>
                  {item.group ? <ChevronDown size={12} strokeWidth={2.4} /> : null}
                </div>

                {on && item.children
                  ? item.children.map((child, childIndex) => (
                      <p
                        key={child.en}
                        className="py-[6px] pl-[42px] text-[11px] font-medium"
                        style={{ color: childIndex === activeChild ? PURPLE : BODY }}
                      >
                        {pick(child)}
                      </p>
                    ))
                  : null}
              </div>
            )
          })}
        </nav>

        <div
          className="mx-[16px] mt-[16px] flex items-center gap-[9px] rounded-[13px] px-[11px] py-[11px]"
          style={{ background: PURPLE }}
        >
          <CircleUserRound size={26} strokeWidth={1.6} className="shrink-0 text-white" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold leading-tight text-white">Paulo Andrade</p>
            <p className="mt-[1px] text-[8.5px] leading-tight text-white/70">
              {pick({ pt: "Administrador(a)", en: "Administrator" })}
            </p>
          </div>
          <EllipsisVertical size={13} strokeWidth={2.4} className="shrink-0 text-white/80" />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div
          className="flex items-center gap-[14px] px-[26px] py-[13px]"
          style={{ background: PANEL }}
        >
          <ModuleMark tint={tint} label={module.replace(/^y/, "")} />
          <ChevronDown size={16} strokeWidth={2.4} style={{ color: INK }} />
          <div className="min-w-0">
            <p className="text-[14px] tracking-[-0.01em]" style={{ color: INK }}>
              {pick(welcome)} <span className="font-bold">{module}</span>.
            </p>
            <p className="mt-[2px] text-[9.5px] font-medium" style={{ color: BODY }}>
              {pick(date)}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-[9px]">
            <span className="text-[9.5px]" style={{ color: BODY }}>
              {pick(licensedTo)}
            </span>
            <span
              className="rounded-[6px] bg-white px-[8px] py-[5px] text-[8px] font-bold tracking-[0.08em]"
              style={{ color: PURPLE }}
            >
              {licensee}
            </span>
            <ChevronDown size={14} strokeWidth={2.4} style={{ color: INK }} />
          </div>
        </div>

        <div className="px-[26px] py-[20px]">{children}</div>
      </div>
    </div>
  )
}

/** Every card in every module is this box. */
const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn("rounded-[12px] bg-white", className)}
    style={{ border: `1px solid ${HAIRLINE}` }}
  >
    {children}
  </div>
)

const CardTitle = ({ title, note }: { title: string; note?: string }) => (
  <>
    <p className="text-[15px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
      {title}
    </p>
    {note ? (
      <p className="mt-[3px] text-[9.5px] italic" style={{ color: BODY }}>
        {note}
      </p>
    ) : null}
  </>
)

/** The period filter that heads every dashboard in the platform. */
const PeriodFilters = () => {
  const { pick } = useLocale()

  return (
    <div className="flex items-center gap-[14px]">
      <div
        className="flex w-[132px] items-center gap-[8px] rounded-[8px] bg-white px-[10px] py-[8px]"
        style={{ border: `1px solid ${HAIRLINE}` }}
      >
        <span className="flex-1 text-[10px]" style={{ color: BODY }}>
          {pick({ pt: "Semana", en: "Week" })}
        </span>
        <ChevronDown size={12} strokeWidth={2.4} style={{ color: INK }} />
      </div>
      {[
        { pt: "Data início", en: "Start date" },
        { pt: "Data fim", en: "End date" },
      ].map((label) => (
        <div
          key={label.en}
          className="flex w-[124px] items-center gap-[8px] rounded-[8px] bg-white px-[10px] py-[8px]"
          style={{ border: `1px solid ${HAIRLINE}` }}
        >
          <span className="flex-1 text-[10px]" style={{ color: MUTED }}>
            {pick(label)}
          </span>
          <CalendarDays size={12} strokeWidth={2.2} style={{ color: BODY }} />
        </div>
      ))}
    </div>
  )
}

/**
 * The half-donut the platform uses wherever a total splits into named parts.
 *
 * Drawn from arc geometry rather than a chart library: it is four fixed
 * segments on a static screen, and pulling Recharts into the case study chunk
 * to draw them would cost more than the entire rest of this file.
 */
const Gauge = ({ segments }: { segments: { value: number; color: string }[] }) => {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  const radius = 40
  const cx = 50
  const cy = 46

  const point = (fraction: number) => {
    const angle = Math.PI * (1 - fraction)
    return [cx + radius * Math.cos(angle), cy - radius * Math.sin(angle)]
  }

  let acc = 0

  return (
    <svg viewBox="0 0 100 52" className="w-full" aria-hidden="true">
      {segments.map((segment, index) => {
        const from = acc / total
        acc += segment.value
        const to = acc / total
        const [x1, y1] = point(from)
        const [x2, y2] = point(to)

        return (
          <path
            key={index}
            d={`M${x1.toFixed(2)} ${y1.toFixed(2)} A${radius} ${radius} 0 ${
              to - from > 0.5 ? 1 : 0
            } 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
            stroke={segment.color}
            strokeWidth="10"
            fill="none"
          />
        )
      })}
    </svg>
  )
}

/**
 * A day of bookings: what came in against what was turned away.
 *
 * The paired green/red bars are the chart the product leads with, and the pair
 * is the point — a booking total on its own says nothing about how much
 * availability the rate plan is refusing.
 */
const PairedBars = ({
  days,
  positive,
  negative,
  peak,
}: {
  days: { day: string; good: number; bad: number }[]
  positive: string
  negative: string
  peak: { good: string; bad: string }
}) => (
  <div className="rounded-[10px] p-[14px]" style={{ background: PANEL }}>
    <div className="relative h-[150px] pl-[30px]">
      {[0, 25, 50, 75, 100].map((offset, index) => (
        <div key={offset} className="absolute inset-x-0" style={{ top: `${offset}%` }}>
          <div className="border-t border-dashed" style={{ borderColor: "rgba(16,24,40,0.14)" }} />
          <span
            className="absolute -top-[5px] -left-[30px] w-[26px] text-right text-[7.5px]"
            style={{ color: MUTED }}
          >
            {["20k", "15k", "10k", "5k", "0"][index]}
          </span>
        </div>
      ))}

      <div className="absolute inset-0 left-[30px] flex items-end justify-around">
        {days.map((entry, index) => (
          <div key={entry.day} className="relative flex items-end gap-[4px]">
            {index === 4 ? (
              <div className="absolute -top-[26px] left-[2px] whitespace-nowrap">
                <p className="text-[7.5px] font-semibold" style={{ color: GREEN }}>
                  {peak.good}
                </p>
                <p className="text-[7.5px] font-semibold" style={{ color: RED }}>
                  {peak.bad}
                </p>
              </div>
            ) : null}
            <div
              className="w-[9px] rounded-[2px]"
              style={{ height: entry.good, background: positive }}
            />
            <div
              className="w-[9px] rounded-[2px]"
              style={{ height: entry.bad, background: negative }}
            />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-[8px] flex justify-around pl-[30px]">
      {days.map((entry) => (
        <span key={entry.day} className="text-[8.5px] font-medium" style={{ color: BODY }}>
          {entry.day}
        </span>
      ))}
    </div>
  </div>
)

/**
 * A titled total with its own bar chart — the dashboard's main unit.
 *
 * The figure on the left and the bars on the right are one object in the
 * product: the total is the sum of what the chart shows, and reading either
 * without the other tells you nothing. `positive` is the only thing that
 * varies between instances, and it varies for a reason — the platform colours
 * each acquisition channel differently and keeps refusals red throughout.
 */
const ChartBlock = ({
  title,
  note,
  total,
  amount,
  accepted,
  refused,
  acceptedAmount,
  refusedAmount,
  days,
  peak,
  positive,
}: {
  title: string
  note: string
  total: string
  amount: string
  accepted: string
  refused: string
  acceptedAmount: string
  refusedAmount: string
  days: { day: string; good: number; bad: number }[]
  peak: { good: string; bad: string }
  positive: string
}) => (
  <>
    <div className="flex items-baseline gap-[14px]">
      <CardTitle title={title} />
      <p className="text-[9.5px] italic" style={{ color: BODY }}>
        {note}
      </p>
    </div>

    <div className="mt-[14px] grid grid-cols-[168px_1fr] gap-[18px]">
      <div>
        <p className="text-[9.5px]" style={{ color: BODY }}>
          {total}
        </p>
        <p
          className="mt-[2px] text-[34px] font-bold leading-none tracking-[-0.04em]"
          style={{ color: PURPLE }}
        >
          <span className="align-top text-[19px]">R$ </span>
          {amount}
        </p>
        <div className="my-[13px] h-px" style={{ background: HAIRLINE }} />
        <div className="space-y-[5px]">
          <div className="flex items-baseline gap-[9px]">
            <span className="text-[10.5px] font-bold" style={{ color: positive }}>
              {acceptedAmount}
            </span>
            <span className="text-[9.5px]" style={{ color: BODY }}>
              {accepted}
            </span>
          </div>
          <div className="flex items-baseline gap-[9px]">
            <span className="text-[10.5px] font-bold" style={{ color: RED }}>
              {refusedAmount}
            </span>
            <span className="text-[9.5px]" style={{ color: BODY }}>
              {refused}
            </span>
          </div>
        </div>
      </div>

      <PairedBars days={days} positive={positive} negative={RED} peak={peak} />
    </div>
  </>
)

type GaugeRow = { figure: string; label: Localized; color: string }

/**
 * A named total, split. The platform puts two of these side by side in the
 * right rail of every dashboard, which is the only reason it is a component.
 */
const GaugeCard = ({
  title,
  note,
  segments,
  rows,
  action,
}: {
  title: string
  note: string
  segments: { value: number; color: string }[]
  rows: GaugeRow[]
  action: string
}) => {
  const { pick } = useLocale()

  return (
    <Card className="px-[14px] py-[13px]">
      <CardTitle title={title} note={note} />
      <div className="mt-[10px]">
        <Gauge segments={segments} />
      </div>
      <div className="mt-[8px] space-y-[3px]">
        {rows.map((row) => (
          <div key={row.label.en} className="flex items-baseline gap-[8px]">
            <span className="w-[54px] shrink-0 text-[9.5px] font-bold" style={{ color: row.color }}>
              {row.figure}
            </span>
            <span className="text-[9px]" style={{ color: BODY }}>
              {pick(row.label)}
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-[11px] flex items-center justify-center rounded-[8px] py-[7px] text-[9.5px] font-medium"
        style={{ background: PURPLE_WASH, color: PURPLE }}
      >
        {action}
      </div>
    </Card>
  )
}

/* ──────────────────────────────  yBOOKING  ──────────────────────────────── */

const booking = {
  date: {
    pt: "Quinta-feira, 18 de Setembro de 2025.",
    en: "Thursday, 18 September 2025.",
  } satisfies Localized,
  nav: [
    { icon: ChartColumn, label: { pt: "Dashboard", en: "Dashboard" } satisfies Localized },
    { icon: Receipt, label: { pt: "Comercial", en: "Commercial" } satisfies Localized, group: true },
    { icon: Percent, label: { pt: "Vendas", en: "Sales" } satisfies Localized, group: true },
    {
      icon: Handshake,
      label: { pt: "Agentes/Parceiros", en: "Agents/Partners" } satisfies Localized,
      group: true,
    },
    { icon: CreditCard, label: { pt: "Faturamento", en: "Billing" } satisfies Localized },
    { icon: Tags, label: { pt: "Tarifário", en: "Rate plans" } satisfies Localized, group: true },
    { icon: ClipboardList, label: { pt: "Cadastros", en: "Records" } satisfies Localized, group: true },
  ] as NavItem[],
  title: { pt: "Dashboard", en: "Dashboard" } satisfies Localized,
  kpis: [
    {
      value: "2.14K",
      label: { pt: "Acessos ao site", en: "Site visits" } satisfies Localized,
      delta: "+18%",
      up: true,
      icon: Globe,
      tint: BLUE,
    },
    {
      value: "1.68K",
      label: { pt: "Pesquisas no site", en: "Site searches" } satisfies Localized,
      delta: "+11%",
      up: true,
      icon: Search,
      tint: AMBER,
    },
    {
      value: "184",
      label: { pt: "Carrinhos", en: "Carts" } satisfies Localized,
      delta: "-6%",
      up: false,
      icon: ShoppingCart,
      tint: RED,
    },
    {
      value: "47",
      label: { pt: "Reservas", en: "Bookings" } satisfies Localized,
      delta: "+9%",
      up: true,
      icon: BedDouble,
      tint: GREEN,
    },
    {
      value: "196k",
      label: { pt: "Receita total", en: "Total revenue" } satisfies Localized,
      delta: "+4%",
      up: true,
      icon: Banknote,
      tint: PURPLE,
    },
  ],
  chart: {
    title: { pt: "Reservas do Site", en: "Site bookings" } satisfies Localized,
    note: {
      pt: "Reservas por dia realizadas no site no período selecionado.",
      en: "Bookings per day made through the website in the selected period.",
    } satisfies Localized,
    total: { pt: "Total de Reservas", en: "Total bookings" } satisfies Localized,
    amount: "124.8k",
    accepted: { pt: "Efetivadas", en: "Confirmed" } satisfies Localized,
    refused: { pt: "Negadas", en: "Declined" } satisfies Localized,
    acceptedAmount: "R$ 96.4k",
    refusedAmount: "R$ 28.4k",
    days: [
      { day: "12", good: 96, bad: 42 },
      { day: "13", good: 74, bad: 63 },
      { day: "14", good: 128, bad: 21 },
      { day: "15", good: 88, bad: 52 },
      { day: "16", good: 82, bad: 34 },
      { day: "17", good: 136, bad: 74 },
      { day: "18", good: 108, bad: 18 },
    ],
    peak: { good: "R$ 18.402,60", bad: "R$ 4.187,15" },
  },
  ownChart: {
    title: { pt: "Reservas Particular", en: "Direct bookings" } satisfies Localized,
    note: {
      pt: "Reservas por dia realizadas pelo yBooking no período selecionado.",
      en: "Bookings per day made through yBooking in the selected period.",
    } satisfies Localized,
    total: { pt: "Total de Reservas", en: "Total bookings" } satisfies Localized,
    amount: "71.2k",
    acceptedAmount: "R$ 54.8k",
    refusedAmount: "R$ 16.4k",
    days: [
      { day: "12", good: 84, bad: 38 },
      { day: "13", good: 61, bad: 71 },
      { day: "14", good: 132, bad: 24 },
      { day: "15", good: 79, bad: 58 },
      { day: "16", good: 92, bad: 41 },
      { day: "17", good: 124, bad: 82 },
      { day: "18", good: 116, bad: 15 },
    ],
    peak: { good: "R$ 12.940,80", bad: "R$ 3.512,40" },
  },
  bookings: {
    title: { pt: "Reservas", en: "Bookings" } satisfies Localized,
    note: {
      pt: "Os três meses mais reservados no período selecionado.",
      en: "The three most booked months in the selected period.",
    } satisfies Localized,
    rows: [
      { figure: "52/38%", label: { pt: "Janeiro/2026", en: "January/2026" } satisfies Localized, color: GREEN },
      { figure: "27/19%", label: { pt: "Dezembro/2025", en: "December/2025" } satisfies Localized, color: BLUE },
      { figure: "14/10%", label: { pt: "Julho/2026", en: "July/2026" } satisfies Localized, color: AMBER },
    ],
  },
  searches: {
    title: { pt: "Pesquisas", en: "Searches" } satisfies Localized,
    note: {
      pt: "Os três meses mais pesquisados no período selecionado.",
      en: "The three most searched months in the selected period.",
    } satisfies Localized,
    rows: [
      { figure: "812/26%", label: { pt: "Janeiro/2026", en: "January/2026" } satisfies Localized, color: GREEN },
      { figure: "405/13%", label: { pt: "Julho/2026", en: "July/2026" } satisfies Localized, color: BLUE },
      { figure: "231/7%", label: { pt: "Abril/2026", en: "April/2026" } satisfies Localized, color: AMBER },
    ],
    report: { pt: "ver relatório", en: "view report" } satisfies Localized,
    most: { pt: "Mês mais buscado:", en: "Most searched month:" } satisfies Localized,
    mostValue: { pt: "Janeiro/2026", en: "January/2026" } satisfies Localized,
  },
  performance: {
    title: { pt: "Desempenho de Vendas", en: "Sales performance" } satisfies Localized,
    note: {
      pt: "Total de vendas EFETIVADA x NEGADAS no período.",
      en: "Total CONFIRMED vs DECLINED sales in the period.",
    } satisfies Localized,
    goodTotal: "R$ 96.400,00",
    badTotal: "R$ 28.400,00",
    rows: [
      { icon: CreditCard, good: "R$ 52.180,00", bad: "R$ 11.900,00" },
      { icon: BedDouble, good: "R$ 24.700,00", bad: "R$ 8.300,00" },
      { icon: QrCode, good: "R$ 13.420,00", bad: "R$ 5.100,00" },
      { icon: Boxes, good: "R$ 6.100,00", bad: "R$ 3.100,00" },
    ],
    legend: [
      { icon: CreditCard, label: { pt: "Cartão", en: "Card" } satisfies Localized },
      { icon: BedDouble, label: { pt: "Check-in", en: "Check-in" } satisfies Localized },
      { icon: QrCode, label: { pt: "Pix", en: "Pix" } satisfies Localized },
      { icon: Boxes, label: { pt: "Múltiplos", en: "Multiple" } satisfies Localized },
    ],
  },
  payments: {
    title: { pt: "Meios de Pagamento", en: "Payment methods" } satisfies Localized,
    note: {
      pt: "Ranking de vendas por meio de pagamento.",
      en: "Sales ranking by payment method.",
    } satisfies Localized,
    columns: [
      { pt: "Meio de Pagamento", en: "Payment method" } satisfies Localized,
      { pt: "Valor", en: "Amount" } satisfies Localized,
      { pt: "Percentual", en: "Share" } satisfies Localized,
    ],
    groups: [
      {
        name: { pt: "Cartão", en: "Card" } satisfies Localized,
        value: "R$ 62.842,40",
        share: "65%",
        rows: [
          { name: "Mastercard", value: "R$ 27.318,90", share: "28%" },
          { name: "Visa", value: "R$ 21.106,40", share: "22%" },
          { name: "Elo", value: "R$ 9.284,60", share: "10%" },
          { name: { pt: "Outros", en: "Others" } satisfies Localized, value: "R$ 5.132,50", share: "5%" },
        ],
      },
      { name: { pt: "Check-in", en: "Check-in" } satisfies Localized, value: "R$ 24.700,00", share: "20%" },
      { name: "Pix", value: "R$ 13.420,00", share: "11%" },
      { name: { pt: "Múltiplos", en: "Multiple" } satisfies Localized, value: "R$ 6.100,00", share: "4%" },
    ],
  },
}

export const StudioBooking = () => {
  const { pick } = useLocale()
  const { chart, ownChart, bookings, searches, performance, payments } = booking

  return (
    <StudioShell
      module="yBooking"
      tint={MODULE.booking}
      nav={booking.nav}
      active={0}
      date={booking.date}
      licensee="VILA MARE"
    >
      <div className="flex items-center gap-[26px]">
        <p className="text-[19px] font-bold tracking-[-0.02em]" style={{ color: PURPLE }}>
          {pick(booking.title)}
        </p>
        <PeriodFilters />
      </div>

      <div className="mt-[16px] grid grid-cols-5 gap-[12px]">
        {booking.kpis.map((kpi) => (
          <Card key={kpi.label.en} className="px-[13px] py-[12px]">
            <div className="flex items-start justify-between">
              <p className="text-[21px] font-bold tracking-[-0.03em]" style={{ color: INK }}>
                {kpi.value}
              </p>
              <span
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
                style={{ background: `${kpi.tint}1F` }}
              >
                <kpi.icon size={13} strokeWidth={2.2} style={{ color: kpi.tint }} />
              </span>
            </div>
            <p className="mt-[2px] text-[10px]" style={{ color: BODY }}>
              {pick(kpi.label)}
            </p>
            <p className="mt-[7px] text-[8.5px]" style={{ color: MUTED }}>
              <span className="font-bold" style={{ color: kpi.up ? GREEN : RED }}>
                {kpi.delta}
              </span>{" "}
              {pick({ pt: "vs última semana", en: "vs last week" })}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-[12px] grid grid-cols-[1fr_248px] gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <ChartBlock
            title={pick(chart.title)}
            note={pick(chart.note)}
            total={pick(chart.total)}
            amount={chart.amount}
            accepted={pick(chart.accepted)}
            refused={pick(chart.refused)}
            acceptedAmount={chart.acceptedAmount}
            refusedAmount={chart.refusedAmount}
            days={chart.days}
            peak={chart.peak}
            positive={GREEN}
          />

          <div className="my-[16px] h-px" style={{ background: HAIRLINE }} />

          {/*
            The same chart again, for the bookings the platform took itself
            rather than the ones the website sent it. Two charts rather than one
            is the product's decision and a load-bearing one: the split between
            channels is what the whole rate-plan module is steered by.
          */}
          <ChartBlock
            title={pick(ownChart.title)}
            note={pick(ownChart.note)}
            total={pick(ownChart.total)}
            amount={ownChart.amount}
            accepted={pick(chart.accepted)}
            refused={pick(chart.refused)}
            acceptedAmount={ownChart.acceptedAmount}
            refusedAmount={ownChart.refusedAmount}
            days={ownChart.days}
            peak={ownChart.peak}
            positive={BLUE}
          />
        </Card>

        <div className="space-y-[12px]">
          <GaugeCard
            title={pick(searches.title)}
            note={pick(searches.note)}
            segments={[
              { value: 34, color: GREEN },
              { value: 38, color: BLUE },
              { value: 18, color: AMBER },
              { value: 10, color: RED },
            ]}
            rows={searches.rows}
            action={pick(searches.report)}
          />

          <GaugeCard
            title={pick(bookings.title)}
            note={pick(bookings.note)}
            segments={[
              { value: 42, color: GREEN },
              { value: 30, color: BLUE },
              { value: 20, color: AMBER },
              { value: 8, color: RED },
            ]}
            rows={bookings.rows}
            action={pick(searches.report)}
          />

          <div className="rounded-[12px] px-[14px] py-[13px]" style={{ background: PURPLE }}>
            <p className="text-[9.5px] text-white/75">{pick(searches.most)}</p>
            <p className="mt-[3px] text-[15px] font-bold tracking-[-0.02em] text-white">
              {pick(searches.mostValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(performance.title)} note={pick(performance.note)} />

          <div className="mt-[13px] flex h-[30px] overflow-hidden rounded-[6px]">
            <div className="flex-[77]" style={{ background: GREEN }} />
            <div className="flex-[23]" style={{ background: RED }} />
          </div>
          <div className="mt-[5px] flex items-baseline justify-between">
            <div>
              <p className="text-[10.5px] font-bold" style={{ color: GREEN }}>
                {performance.goodTotal}
              </p>
              <p className="text-[8.5px]" style={{ color: BODY }}>
                {pick(booking.chart.accepted)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10.5px] font-bold" style={{ color: RED }}>
                {performance.badTotal}
              </p>
              <p className="text-[8.5px]" style={{ color: BODY }}>
                {pick(booking.chart.refused)}
              </p>
            </div>
          </div>

          <div className="mt-[11px] grid grid-cols-2 gap-x-[16px]">
            <div className="space-y-[8px] pr-[16px]" style={{ borderRight: `1px solid ${HAIRLINE}` }}>
              {performance.rows.map((row, index) => (
                <div key={index} className="flex items-center gap-[8px]">
                  <row.icon size={13} strokeWidth={2} style={{ color: INK }} />
                  <span className="text-[10px] font-medium" style={{ color: GREEN }}>
                    {row.good}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-[8px]">
              {performance.rows.map((row, index) => (
                <div key={index} className="flex items-center justify-end gap-[8px]">
                  <span className="text-[10px] font-medium" style={{ color: RED }}>
                    {row.bad}
                  </span>
                  <row.icon size={13} strokeWidth={2} style={{ color: INK }} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[13px] flex items-center justify-center gap-[16px]">
            {performance.legend.map((item) => (
              <div key={item.label.en} className="flex items-center gap-[5px]">
                <item.icon size={12} strokeWidth={2} style={{ color: INK }} />
                <span className="text-[8.5px]" style={{ color: BODY }}>
                  {pick(item.label)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(payments.title)} note={pick(payments.note)} />

          <div className="mt-[13px] overflow-hidden rounded-[8px]" style={{ background: PANEL }}>
            <div className="grid grid-cols-[1fr_100px_74px] px-[12px] py-[8px]">
              {payments.columns.map((column) => (
                <span key={column.en} className="text-[9px]" style={{ color: BODY }}>
                  {pick(column)}
                </span>
              ))}
            </div>
            <div className="bg-white px-[12px] py-[10px]">
              {payments.groups.map((group, index) => (
                <div key={index} className={index ? "mt-[9px]" : undefined}>
                  <div className="grid grid-cols-[1fr_100px_74px]">
                    <span className="text-[10px] font-semibold" style={{ color: INK }}>
                      {typeof group.name === "string" ? group.name : pick(group.name)}
                    </span>
                    <span className="text-[10px]" style={{ color: INK }}>
                      {group.value}
                    </span>
                    <span className="text-[10px]" style={{ color: INK }}>
                      {group.share}
                    </span>
                  </div>
                  {group.rows?.map((row) => (
                    <div
                      key={typeof row.name === "string" ? row.name : row.name.en}
                      className="mt-[4px] grid grid-cols-[1fr_100px_74px] italic"
                    >
                      <span className="pl-[12px] text-[9.5px]" style={{ color: BODY }}>
                        {typeof row.name === "string" ? row.name : pick(row.name)}
                      </span>
                      <span className="text-[9.5px]" style={{ color: BODY }}>
                        {row.value}
                      </span>
                      <span className="text-[9.5px]" style={{ color: BODY }}>
                        {row.share}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </StudioShell>
  )
}

/* ────────────────────────────────  yCRM  ────────────────────────────────── */

const crm = {
  date: {
    pt: "Quinta-feira, 18 de Setembro de 2025.",
    en: "Thursday, 18 September 2025.",
  } satisfies Localized,
  nav: [
    { icon: ChartColumn, label: { pt: "Dashboard", en: "Dashboard" } satisfies Localized },
    { icon: CalendarDays, label: { pt: "Agenda de Disparos", en: "Send schedule" } satisfies Localized },
    { icon: Users, label: { pt: "Lead's", en: "Leads" } satisfies Localized, group: true },
    { icon: Mail, label: { pt: "Newsletter", en: "Newsletter" } satisfies Localized, group: true },
    { icon: Smartphone, label: { pt: "SMS", en: "SMS" } satisfies Localized, group: true },
    {
      icon: MessageCircle,
      label: { pt: "Whatsapp", en: "Whatsapp" } satisfies Localized,
      group: true,
      children: [
        { pt: "Campanhas", en: "Campaigns" } satisfies Localized,
        { pt: "Whatsapp Automáticos", en: "Automated Whatsapp" } satisfies Localized,
        { pt: "Templates", en: "Templates" } satisfies Localized,
      ],
    },
    { icon: Link2, label: { pt: "Encurtador de Link's", en: "Link shortener" } satisfies Localized },
    { icon: FileText, label: { pt: "Relatórios", en: "Reports" } satisfies Localized, group: true },
  ] as NavItem[],
  title: { pt: "Campanhas Whatsapp", en: "Whatsapp campaigns" } satisfies Localized,
  search: { pt: "Pesquisar", en: "Search" } satisfies Localized,
  filters: [
    { pt: "Ativos", en: "Active" } satisfies Localized,
    { pt: "Inativos", en: "Inactive" } satisfies Localized,
    { pt: "Todos", en: "All" } satisfies Localized,
  ],
  folders: { pt: "Pastas", en: "Folders" } satisfies Localized,
  root: { pt: "Principal", en: "Root" } satisfies Localized,
  tree: [
    { label: { pt: "Campanhas 2024", en: "Campaigns 2024" } satisfies Localized, depth: 1 },
    { label: { pt: "Campanhas 2025", en: "Campaigns 2025" } satisfies Localized, depth: 1 },
    { label: { pt: "Setembro", en: "September" } satisfies Localized, depth: 2, open: true },
    { label: { pt: "Outubro", en: "October" } satisfies Localized, depth: 2 },
    { label: { pt: "Novembro", en: "November" } satisfies Localized, depth: 2 },
    { label: { pt: "Dezembro", en: "December" } satisfies Localized, depth: 2 },
    { label: { pt: "Campanhas 2026", en: "Campaigns 2026" } satisfies Localized, depth: 1 },
  ],
  newFolder: { pt: "Nome da pasta", en: "Folder name" } satisfies Localized,
  newCampaign: { pt: "+ Campanha", en: "+ Campaign" } satisfies Localized,
  legend: [
    { label: { pt: "Enviado", en: "Sent" } satisfies Localized, color: GREEN },
    { label: { pt: "Rascunho", en: "Draft" } satisfies Localized, color: BLUE },
    { label: { pt: "Agendado", en: "Scheduled" } satisfies Localized, color: AMBER },
  ],
  columns: [
    { pt: "Campanha", en: "Campaign" } satisfies Localized,
    { pt: "Data/Hora Envio", en: "Send date/time" } satisfies Localized,
  ],
  campaigns: [
    { name: "Wpp Setembro 1", state: 0, when: "12/09/2025 - 09:30" },
    { name: "Wpp Setembro 2", state: 0, when: "19/09/2025 - 14:00" },
    { name: "Wpp Reveillon Teaser", state: 2, when: "26/09/2025 - 11:15" },
    { name: "Wpp Outubro Rosa", state: 1, when: "-" },
    { name: "Wpp Feriado Prolongado", state: 2, when: "03/10/2025 - 08:45" },
    { name: "Wpp Semana do Cliente", state: 0, when: "05/10/2025 - 16:30" },
    { name: "Wpp Day Use Novembro", state: 2, when: "10/10/2025 - 09:00" },
    { name: "Wpp Black Friday Teaser", state: 1, when: "-" },
    { name: "Wpp Black Friday", state: 2, when: "24/11/2025 - 07:30" },
    { name: "Wpp Ceia de Natal", state: 1, when: "-" },
    { name: "Wpp Reveillon Pacotes", state: 2, when: "01/12/2025 - 10:00" },
    { name: "Wpp Retorno de Hóspede", state: 0, when: "08/12/2025 - 15:45" },
    { name: "Wpp Alta Temporada", state: 2, when: "15/12/2025 - 08:00" },
  ],
}

/**
 * The second module, in a second window — the case study's actual argument.
 *
 * Nothing in the shell changes between this and yBooking: same rail, same top
 * bar, same licensee. Only the navigation and the page differ. Showing that
 * twice is the only way to demonstrate a modular platform; one screenshot of
 * one module is indistinguishable from one bespoke app.
 */
export const StudioCrm = () => {
  const { pick } = useLocale()

  return (
    <StudioShell
      module="yCRM"
      tint={MODULE.crm}
      nav={crm.nav}
      active={5}
      activeChild={0}
      date={crm.date}
      licensee="VILA MARE"
    >
      <div className="flex items-center gap-[24px]">
        <p className="text-[19px] font-bold tracking-[-0.02em]" style={{ color: PURPLE }}>
          {pick(crm.title)}
        </p>

        <div
          className="flex w-[210px] items-center gap-[8px] rounded-[8px] bg-white px-[12px] py-[8px]"
          style={{ border: `1px solid ${HAIRLINE}` }}
        >
          <span className="flex-1 text-[10px]" style={{ color: MUTED }}>
            {pick(crm.search)}
          </span>
          <Search size={13} strokeWidth={2.2} style={{ color: BODY }} />
        </div>

        <div className="flex items-center gap-[18px]">
          {crm.filters.map((filter, index) => (
            <div key={filter.en} className="flex items-center gap-[7px]">
              <span
                className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px]"
                style={{
                  background: index === 0 ? PURPLE : "#FFFFFF",
                  border: index === 0 ? "none" : `1.5px solid ${MUTED}`,
                }}
              >
                {index === 0 ? (
                  <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                    <path
                      d="M2 5.2 4 7.3 8 2.9"
                      stroke="#FFFFFF"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                ) : null}
              </span>
              <span className="text-[10.5px]" style={{ color: INK }}>
                {pick(filter)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[16px] grid grid-cols-[320px_1fr] gap-[18px]">
        <Card className="px-[14px] py-[13px]">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              {pick(crm.folders)}
            </p>
            <span
              className="flex h-[24px] w-[24px] items-center justify-center rounded-[7px]"
              style={{ background: PURPLE_WASH }}
            >
              <FolderPlus size={13} strokeWidth={2.2} style={{ color: PURPLE }} />
            </span>
          </div>

          <div className="mt-[13px] space-y-[9px]">
            <div className="flex items-center gap-[9px]">
              <Folder size={14} strokeWidth={2} style={{ color: INK }} />
              <span className="text-[11px] font-medium" style={{ color: INK }}>
                {pick(crm.root)}
              </span>
            </div>

            {crm.tree.map((node) => (
              <div
                key={node.label.en}
                className="flex items-center gap-[9px]"
                style={{ paddingLeft: node.depth * 18 }}
              >
                <Folder
                  size={14}
                  strokeWidth={2}
                  style={{ color: node.open ? PURPLE : INK }}
                />
                <span
                  className="flex-1 text-[11px] font-medium"
                  style={{ color: node.open ? PURPLE : INK }}
                >
                  {pick(node.label)}
                </span>
                <span
                  className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px]"
                  style={{ background: GREEN }}
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                    <path
                      d="M2 5.2 4 7.3 8 2.9"
                      stroke="#FFFFFF"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </div>
            ))}

            {/* The folder being created, mid-flow. It is in the reference and it
                is worth keeping: it shows the tree is editable in place. */}
            <div
              className="ml-[36px] flex items-center gap-[9px] rounded-[8px] px-[11px] py-[9px]"
              style={{ border: `1px solid ${HAIRLINE}` }}
            >
              <span className="flex-1 text-[10.5px]" style={{ color: MUTED }}>
                {pick(crm.newFolder)}
              </span>
              <span
                className="flex h-[17px] w-[17px] items-center justify-center rounded-full"
                style={{ background: GREEN }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path
                    d="M2 5.2 4 7.3 8 2.9"
                    stroke="#FFFFFF"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Card>

        <div>
          <div className="flex items-center justify-between">
            <div
              className="flex items-center justify-center rounded-[8px] px-[26px] py-[11px]"
              style={{ background: PURPLE }}
            >
              <span className="text-[11.5px] font-semibold text-white">
                {pick(crm.newCampaign)}
              </span>
            </div>

            <div className="flex items-center gap-[16px]">
              {crm.legend.map((item) => (
                <div key={item.label.en} className="flex items-center gap-[6px]">
                  <span
                    className="h-[11px] w-[11px] rounded-full"
                    style={{ border: `2px solid ${item.color}` }}
                  />
                  <span className="text-[9.5px]" style={{ color: BODY }}>
                    {pick(item.label)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Card className="mt-[13px]">
            <div
              className="grid grid-cols-[1fr_150px_96px] px-[16px] py-[12px]"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              {crm.columns.map((column) => (
                <span
                  key={column.en}
                  className="text-[11px] font-semibold"
                  style={{ color: INK }}
                >
                  {pick(column)}
                </span>
              ))}
              <span />
            </div>

            {crm.campaigns.map((campaign) => (
              <div
                key={campaign.name}
                className="grid grid-cols-[1fr_150px_96px] items-center px-[16px] py-[11px]"
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <div className="flex items-center gap-[9px]">
                  <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#25D366]">
                    <MessageCircle size={10} strokeWidth={2.6} className="text-white" />
                  </span>
                  <span className="text-[11px] font-medium" style={{ color: INK }}>
                    {campaign.name}
                  </span>
                  <span
                    className="h-[10px] w-[10px] shrink-0 rounded-full"
                    style={{ border: `2px solid ${crm.legend[campaign.state].color}` }}
                  />
                </div>
                <span className="text-[10.5px]" style={{ color: BODY }}>
                  {campaign.when}
                </span>
                <div className="flex items-center justify-end gap-[10px]">
                  <Copy size={13} strokeWidth={2} style={{ color: BLUE }} />
                  <ClipboardList size={13} strokeWidth={2} style={{ color: BLUE }} />
                  <span
                    className="flex h-[15px] w-[15px] items-center justify-center rounded-[4px]"
                    style={{ background: GREEN }}
                  >
                    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                      <path
                        d="M2 5.2 4 7.3 8 2.9"
                        stroke="#FFFFFF"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </StudioShell>
  )
}

/* ───────────────  OTHER PRODUCTS, RUNNING ON THE SAME SHELL  ───────────── */

/**
 * Two more modules, and the reason they live in this file.
 *
 * The operations portal behind the Yago apps and the back office behind the
 * Porto Seguro Shopping app are not separate systems — they are Y-Studio with a
 * different module switched on, which is exactly what the captures in
 * /docs/projetos show: the same rail, the same top bar, the same licensee chip.
 * Putting them next to `StudioBooking` says that; filing them under their own
 * products would quietly claim three shells where there is one.
 */

const yago = {
  date: {
    pt: "Quinta-feira, 18 de Setembro de 2025.",
    en: "Thursday, 18 September 2025.",
  } satisfies Localized,
  nav: [
    { icon: ChartColumn, label: { pt: "Dashboard", en: "Dashboard" } satisfies Localized },
    { icon: BedDouble, label: { pt: "Mapa de Ocupação", en: "Occupancy map" } satisfies Localized },
    { icon: UtensilsCrossed, label: { pt: "Gastronomia", en: "Dining" } satisfies Localized, group: true },
    { icon: Sailboat, label: { pt: "Experiências", en: "Experiences" } satisfies Localized, group: true },
    { icon: ConciergeBell, label: { pt: "Solicitações", en: "Requests" } satisfies Localized },
    { icon: ClipboardList, label: { pt: "Cadastros Gerais", en: "Records" } satisfies Localized, group: true },
    { icon: FileText, label: { pt: "Relatórios", en: "Reports" } satisfies Localized, group: true },
    { icon: Award, label: { pt: "Avaliações", en: "Reviews" } satisfies Localized, group: true },
  ] as NavItem[],
  title: { pt: "Dashboard", en: "Dashboard" } satisfies Localized,
  nps: { pt: "NPS Estimado", en: "Estimated NPS" } satisfies Localized,
  npsValue: "74",
  satisfaction: { pt: "Índice de Satisfação Geral", en: "Overall satisfaction" } satisfies Localized,
  satisfactionValue: "91%",
  surveys: { pt: "Pesquisas Realizadas", en: "Surveys completed" } satisfies Localized,
  surveysValue: "1.867",
  excellent: { pt: "Excelente", en: "Excellent" } satisfies Localized,
  veryGood: { pt: "Muito Bom", en: "Very good" } satisfies Localized,
  qualitative: {
    title: { pt: "Avaliação Qualitativa", en: "Qualitative rating" } satisfies Localized,
    note: { pt: "Análise da satisfação do hóspede.", en: "Guest satisfaction, broken down." } satisfies Localized,
    legend: [
      { label: { pt: "Excelente", en: "Excellent" } satisfies Localized, color: GREEN },
      { label: { pt: "Muito bom", en: "Very good" } satisfies Localized, color: "#7DC98F" },
      { label: { pt: "Regular", en: "Fair" } satisfies Localized, color: AMBER },
      { label: { pt: "Ruim", en: "Poor" } satisfies Localized, color: RED },
    ],
    groups: [
      { label: { pt: "ACOMODAÇÕES", en: "ROOMS" } satisfies Localized, parts: [74, 14, 6, 6] },
      { label: { pt: "LIMPEZA", en: "CLEANLINESS" } satisfies Localized, parts: [80, 13, 4, 3] },
      { label: { pt: "CHECK-IN", en: "CHECK-IN" } satisfies Localized, parts: [38, 16, 32, 14] },
      { label: { pt: "ALIMENTOS E BEBIDAS", en: "FOOD AND DRINK" } satisfies Localized, parts: [66, 18, 6, 10] },
    ],
  },
  cloud: {
    title: { pt: "Nuvem de Palavras", en: "Word cloud" } satisfies Localized,
    note: {
      pt: "Análise de textos e sentimentos, com as palavras mais usadas.",
      en: "Text and sentiment analysis, by most-used word.",
    } satisfies Localized,
    /* size and tone are the data here: how often the word appears, and whether
       it appears in praise or in complaint. */
    words: [
      { text: { pt: "ATENDIMENTO", en: "SERVICE" } satisfies Localized, size: 21, color: GREEN },
      { text: { pt: "conforto", en: "comfort" } satisfies Localized, size: 18, color: AMBER },
      { text: { pt: "EXCELÊNCIA", en: "EXCELLENCE" } satisfies Localized, size: 24, color: GREEN },
      { text: { pt: "LIMPEZA", en: "CLEANLINESS" } satisfies Localized, size: 17, color: GREEN },
      { text: { pt: "demora", en: "delay" } satisfies Localized, size: 11, color: RED },
      { text: { pt: "VISTA", en: "VIEW" } satisfies Localized, size: 15, color: GREEN },
      { text: { pt: "wi-fi", en: "wi-fi" } satisfies Localized, size: 12, color: AMBER },
      { text: { pt: "HÓSPEDE", en: "GUEST" } satisfies Localized, size: 16, color: "#7DC98F" },
      { text: { pt: "piscina", en: "pool" } satisfies Localized, size: 13, color: GREEN },
      { text: { pt: "café da manhã", en: "breakfast" } satisfies Localized, size: 11, color: BODY },
      { text: { pt: "DELICIOSO", en: "DELICIOUS" } satisfies Localized, size: 16, color: AMBER },
      { text: { pt: "recepção", en: "front desk" } satisfies Localized, size: 12, color: "#7DC98F" },
      { text: { pt: "QUALIDADE", en: "QUALITY" } satisfies Localized, size: 13, color: GREEN },
      { text: { pt: "governança", en: "housekeeping" } satisfies Localized, size: 11, color: BODY },
      { text: { pt: "mosquito", en: "mosquito" } satisfies Localized, size: 10, color: RED },
      { text: { pt: "equipe", en: "the team" } satisfies Localized, size: 12, color: "#7DC98F" },
      { text: { pt: "SEGURANÇA", en: "SAFETY" } satisfies Localized, size: 11, color: BODY },
      { text: { pt: "restaurante", en: "restaurant" } satisfies Localized, size: 13, color: GREEN },
      { text: { pt: "estadia", en: "the stay" } satisfies Localized, size: 11, color: BODY },
      { text: { pt: "climatização", en: "air con" } satisfies Localized, size: 10, color: AMBER },
    ],
  },
  sectors: {
    title: { pt: "Desempenho por Setor/Depto", en: "Performance by department" } satisfies Localized,
    note: {
      pt: "Análise da satisfação com os setores/deptos.",
      en: "Guest satisfaction by department.",
    } satisfies Localized,
    rows: [
      { label: { pt: "ALIMENTOS E BEBIDAS", en: "FOOD AND DRINK" } satisfies Localized, score: "9,2", value: 92 },
      { label: { pt: "GOVERNANÇA", en: "HOUSEKEEPING" } satisfies Localized, score: "9,4", value: 94 },
      { label: { pt: "RECEPÇÃO", en: "FRONT DESK" } satisfies Localized, score: "8,6", value: 86 },
      { label: { pt: "LAZER", en: "LEISURE" } satisfies Localized, score: "7,8", value: 78 },
      { label: { pt: "MANUTENÇÃO", en: "MAINTENANCE" } satisfies Localized, score: "6,4", value: 64 },
    ],
  },
  feedback: {
    title: { pt: "Feedbacks", en: "Feedback" } satisfies Localized,
    note: { pt: "Comentários recentes de hóspedes.", en: "Recent guest comments." } satisfies Localized,
    rows: [
      {
        date: "17/09/2025",
        badge: { pt: "EXCELENTE", en: "EXCELLENT" } satisfies Localized,
        tone: GREEN,
        text: {
          pt: "A equipe da recepção resolveu o late check-out em minutos. Impecável.",
          en: "The front desk sorted our late check-out in minutes. Impeccable.",
        } satisfies Localized,
      },
      {
        date: "16/09/2025",
        badge: { pt: "MUITO BOM", en: "VERY GOOD" } satisfies Localized,
        tone: "#7DC98F",
        text: {
          pt: "Quartos ótimos, mas o wi-fi na ala sul oscila à noite.",
          en: "Great rooms, though the wi-fi in the south wing drops at night.",
        } satisfies Localized,
      },
      {
        date: "16/09/2025",
        badge: { pt: "EXCELENTE", en: "EXCELLENT" } satisfies Localized,
        tone: GREEN,
        text: {
          pt: "O jantar no Terrazza foi o ponto alto da viagem.",
          en: "Dinner at Terrazza was the highlight of the trip.",
        } satisfies Localized,
      },
      {
        date: "15/09/2025",
        badge: { pt: "RUIM", en: "POOR" } satisfies Localized,
        tone: RED,
        text: {
          pt: "Demora de duas horas para atender o chamado de manutenção.",
          en: "Two hours to answer the maintenance request.",
        } satisfies Localized,
      },
    ],
  },
  seeMore: { pt: "ver mais", en: "see more" } satisfies Localized,
}

/** The panel behind the guest and staff apps: what the resort sees. */
export const StudioYago = () => {
  const { pick } = useLocale()

  return (
    <StudioShell
      module="Yago"
      tint={MODULE.yago}
      nav={yago.nav}
      active={7}
      date={yago.date}
      licensee="VILA MARE"
    >
      <div className="flex items-center gap-[26px]">
        <p className="text-[19px] font-bold tracking-[-0.02em]" style={{ color: PURPLE }}>
          {pick(yago.title)}
        </p>
        <PeriodFilters />
      </div>

      <div className="mt-[16px] grid grid-cols-3 gap-[12px]">
        <Card className="flex items-center justify-between px-[16px] py-[14px]">
          <div>
            <p className="text-[28px] font-bold tracking-[-0.03em]">{yago.npsValue}</p>
            <p className="mt-[2px] text-[10px]" style={{ color: BODY }}>
              {pick(yago.nps)}
            </p>
          </div>
          <div className="w-[104px]">
            <Gauge
              segments={[
                { value: 18, color: RED },
                { value: 22, color: AMBER },
                { value: 60, color: GREEN },
              ]}
            />
          </div>
        </Card>

        <Card className="flex items-center justify-between px-[16px] py-[14px]">
          <div>
            <p className="text-[28px] font-bold tracking-[-0.03em]">{yago.satisfactionValue}</p>
            <p className="mt-[2px] max-w-[110px] text-[10px] leading-tight" style={{ color: BODY }}>
              {pick(yago.satisfaction)}
            </p>
          </div>
          <div className="flex items-center gap-[9px]">
            {/* A donut, not a gauge: this figure is a whole split in two, not a
                position on a scale. */}
            <svg width="52" height="52" viewBox="0 0 42 42" aria-hidden="true">
              <circle cx="21" cy="21" r="15" fill="none" stroke="#7DC98F" strokeWidth="11" />
              <circle
                cx="21"
                cy="21"
                r="15"
                fill="none"
                stroke={GREEN}
                strokeWidth="11"
                strokeDasharray="70 24"
                transform="rotate(-90 21 21)"
              />
            </svg>
            <div className="space-y-[4px]">
              {[
                { label: pick(yago.excellent), color: GREEN },
                { label: pick(yago.veryGood), color: "#7DC98F" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-[5px]">
                  <span
                    className="h-[8px] w-[8px] rounded-[2px]"
                    style={{ background: item.color }}
                  />
                  <span className="text-[8.5px]" style={{ color: BODY }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-between px-[16px] py-[14px]">
          <div>
            <p className="text-[28px] font-bold tracking-[-0.03em]">{yago.surveysValue}</p>
            <p className="mt-[2px] text-[10px]" style={{ color: BODY }}>
              {pick(yago.surveys)}
            </p>
          </div>
          <span
            className="flex h-[46px] w-[46px] items-center justify-center rounded-full"
            style={{ background: "#E7F6EC" }}
          >
            <Users size={20} strokeWidth={1.9} style={{ color: GREEN }} />
          </span>
        </Card>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <div className="flex items-start justify-between">
            <CardTitle title={pick(yago.qualitative.title)} note={pick(yago.qualitative.note)} />
            <div className="flex shrink-0 items-center gap-[9px] pt-[2px]">
              {yago.qualitative.legend.map((item) => (
                <div key={item.label.en} className="flex items-center gap-[4px]">
                  <span
                    className="h-[8px] w-[8px] rounded-[2px]"
                    style={{ background: item.color }}
                  />
                  <span className="text-[8px]" style={{ color: BODY }}>
                    {pick(item.label)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Four stacked bars, each one whole. The point of the panel is the
              shape of the split, not any single figure — check-in is visibly
              the department in trouble without a number being printed. */}
          <div className="mt-[16px] grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
            {yago.qualitative.groups.map((group) => (
              <div key={group.label.en}>
                <p className="text-[9.5px] font-bold tracking-[0.02em]" style={{ color: INK }}>
                  {pick(group.label)}
                </p>
                <div className="mt-[7px] flex h-[26px] overflow-hidden rounded-[4px]">
                  {group.parts.map((part, index) => (
                    <div
                      key={index}
                      style={{
                        flexGrow: part,
                        background: yago.qualitative.legend[index].color,
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-[16px] flex items-center justify-center rounded-[8px] py-[7px] text-[9.5px] font-medium"
            style={{ background: PURPLE_WASH, color: PURPLE }}
          >
            {pick(yago.seeMore)}
          </div>
        </Card>

        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(yago.sectors.title)} note={pick(yago.sectors.note)} />
          <div className="mt-[14px] space-y-[11px]">
            {yago.sectors.rows.map((row) => (
              <div key={row.label.en} className="flex items-center gap-[12px]">
                <span
                  className="w-[152px] shrink-0 text-[9.5px] font-bold tracking-[0.02em]"
                  style={{ color: INK }}
                >
                  {pick(row.label)}
                </span>
                <div className="h-[14px] flex-1 overflow-hidden rounded-[4px] bg-[#EEF0F7]">
                  <div
                    className="h-full rounded-[4px]"
                    style={{
                      width: `${row.value}%`,
                      background: row.value >= 90 ? GREEN : row.value >= 80 ? "#7DC98F" : AMBER,
                    }}
                  />
                </div>
                <span className="w-[22px] shrink-0 text-[9.5px]" style={{ color: BODY }}>
                  {row.score}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-[14px] flex items-center justify-center rounded-[8px] py-[7px] text-[9.5px] font-medium"
            style={{ background: PURPLE_WASH, color: PURPLE }}
          >
            {pick(yago.seeMore)}
          </div>
        </Card>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(yago.cloud.title)} note={pick(yago.cloud.note)} />
          <div className="mt-[14px] flex flex-wrap items-baseline justify-center gap-x-[10px] gap-y-[4px]">
            {yago.cloud.words.map((word) => (
              <span
                key={word.text.en}
                className="font-semibold leading-[1.25] tracking-[-0.01em]"
                style={{ fontSize: word.size, color: word.color }}
              >
                {pick(word.text)}
              </span>
            ))}
          </div>
        </Card>

        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(yago.feedback.title)} note={pick(yago.feedback.note)} />
          <div className="mt-[14px] space-y-[10px]">
            {yago.feedback.rows.map((row, index) => (
              <div key={index} className="flex items-start gap-[11px]">
                <span className="w-[62px] shrink-0 text-[9.5px] font-semibold" style={{ color: INK }}>
                  {row.date}
                </span>
                <span
                  className="w-[74px] shrink-0 rounded-[5px] px-[7px] py-[4px] text-center text-[8px] font-bold text-white"
                  style={{ background: row.tone }}
                >
                  {pick(row.badge)}
                </span>
                <span className="flex-1 text-[9.5px] italic leading-[1.4]" style={{ color: BODY }}>
                  {pick(row.text)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </StudioShell>
  )
}

const commerce = {
  date: {
    pt: "Quinta-feira, 18 de Setembro de 2025.",
    en: "Thursday, 18 September 2025.",
  } satisfies Localized,
  nav: [
    { icon: ChartColumn, label: { pt: "Dashboard", en: "Dashboard" } satisfies Localized },
    { icon: ClipboardList, label: { pt: "Cadastros Gerais", en: "Records" } satisfies Localized, group: true },
    { icon: Boxes, label: { pt: "Estoque", en: "Stock" } satisfies Localized, group: true },
    { icon: ShoppingCart, label: { pt: "Pedidos", en: "Orders" } satisfies Localized },
    { icon: Percent, label: { pt: "Vendas", en: "Sales" } satisfies Localized, group: true },
  ] as NavItem[],
  title: { pt: "Dashboard", en: "Dashboard" } satisfies Localized,
  shopLabel: { pt: "Lojista:", en: "Retailer:" } satisfies Localized,
  shop: "IL DIVINO",
  kpis: [
    {
      value: "3.42K",
      label: { pt: "Acessos ao Marketplace", en: "Marketplace visits" } satisfies Localized,
      delta: "+21%",
      up: true,
      icon: Globe,
      tint: BLUE,
    },
    {
      value: "2.18K",
      label: { pt: "Acessos à página da loja", en: "Store page visits" } satisfies Localized,
      delta: "+14%",
      up: true,
      icon: Search,
      tint: AMBER,
    },
    {
      value: "216",
      label: { pt: "Pedidos da loja", en: "Store orders" } satisfies Localized,
      delta: "+7%",
      up: true,
      icon: ShoppingCart,
      tint: RED,
    },
    {
      value: "58",
      label: { pt: "Vendas", en: "Sales" } satisfies Localized,
      delta: "-3%",
      up: false,
      icon: Receipt,
      tint: GREEN,
    },
    {
      value: "37.6k",
      label: { pt: "Receita total da loja", en: "Total store revenue" } satisfies Localized,
      delta: "+12%",
      up: true,
      icon: Banknote,
      tint: PURPLE,
    },
  ],
  chart: {
    title: { pt: "Vendas Realizadas", en: "Sales made" } satisfies Localized,
    note: { pt: "Vendas realizadas no período.", en: "Sales made in the period." } satisfies Localized,
    total: { pt: "Total de Vendas", en: "Total sales" } satisfies Localized,
    amount: "37.6k",
    accepted: { pt: "Efetivadas", en: "Settled" } satisfies Localized,
    refused: { pt: "Não efetivadas", en: "Unsettled" } satisfies Localized,
    acceptedAmount: "R$ 34.1k",
    refusedAmount: "R$ 3.5k",
    days: [
      { day: "12", good: 108, bad: 34 },
      { day: "13", good: 86, bad: 51 },
      { day: "14", good: 142, bad: 19 },
      { day: "15", good: 94, bad: 44 },
      { day: "16", good: 76, bad: 28 },
      { day: "17", good: 130, bad: 62 },
      { day: "18", good: 118, bad: 16 },
    ],
    peak: { good: "R$ 4.128,60", bad: "R$ 812,40" },
  },
  top: {
    title: { pt: "Mais vendidos", en: "Best sellers" } satisfies Localized,
    note: { pt: "Os três produtos mais vendidos da loja.", en: "The store's three best sellers." } satisfies Localized,
    rows: [
      { figure: "88/31%", label: { pt: "Quinta do Cais Alvarinho", en: "Quinta do Cais Alvarinho" } satisfies Localized, color: GREEN },
      { figure: "71/25%", label: { pt: "Ribera del Sol Rosé", en: "Ribera del Sol Rosé" } satisfies Localized, color: BLUE },
      { figure: "63/22%", label: { pt: "Valle Antiguo Reserva", en: "Valle Antiguo Reserva" } satisfies Localized, color: AMBER },
    ],
    report: { pt: "ver relatório", en: "view report" } satisfies Localized,
    best: { pt: "Produto mais buscado:", en: "Most searched product:" } satisfies Localized,
    bestValue: { pt: "Casa Bruma BRUT", en: "Casa Bruma BRUT" } satisfies Localized,
  },
  performance: {
    title: { pt: "Desempenho de Vendas", en: "Sales performance" } satisfies Localized,
    note: {
      pt: "Total de vendas EFETIVADA x NEGADAS no período.",
      en: "Total SETTLED vs DECLINED sales in the period.",
    } satisfies Localized,
    goodTotal: "R$ 34.100,00",
    badTotal: "R$ 3.500,00",
    rows: [
      { icon: CreditCard, good: "R$ 19.480,00", bad: "R$ 1.900,00" },
      { icon: Receipt, good: "R$ 8.260,00", bad: "R$ 840,00" },
      { icon: QrCode, good: "R$ 4.310,00", bad: "R$ 470,00" },
      { icon: Boxes, good: "R$ 2.050,00", bad: "R$ 290,00" },
    ],
    legend: [
      { icon: CreditCard, label: { pt: "Crédito", en: "Credit" } satisfies Localized },
      { icon: Receipt, label: { pt: "Débito", en: "Debit" } satisfies Localized },
      { icon: QrCode, label: { pt: "Pix", en: "Pix" } satisfies Localized },
      { icon: Boxes, label: { pt: "Múltiplos", en: "Multiple" } satisfies Localized },
    ],
    settled: { pt: "Efetivadas", en: "Settled" } satisfies Localized,
    declined: { pt: "Negadas", en: "Declined" } satisfies Localized,
  },
  payments: {
    title: { pt: "Meios de Pagamento", en: "Payment methods" } satisfies Localized,
    note: {
      pt: "Ranking de vendas por meio de pagamento.",
      en: "Sales ranking by payment method.",
    } satisfies Localized,
    columns: [
      { pt: "Meio de Pagamento", en: "Payment method" } satisfies Localized,
      { pt: "Valor", en: "Amount" } satisfies Localized,
      { pt: "Percentual", en: "Share" } satisfies Localized,
    ],
    groups: [
      {
        name: { pt: "Crédito", en: "Credit" } satisfies Localized,
        value: "R$ 19.480,00",
        share: "57%",
        rows: [
          { name: "Mastercard", value: "R$ 8.960,00", share: "26%" },
          { name: "Visa", value: "R$ 7.420,00", share: "22%" },
          { name: { pt: "Outros", en: "Others" } satisfies Localized, value: "R$ 3.100,00", share: "9%" },
        ],
      },
      { name: { pt: "Débito", en: "Debit" } satisfies Localized, value: "R$ 8.260,00", share: "24%" },
      { name: "Pix", value: "R$ 4.310,00", share: "13%" },
      { name: { pt: "Múltiplos", en: "Multiple" } satisfies Localized, value: "R$ 2.050,00", share: "6%" },
    ],
  },
}

/** The back office behind the marketplace app: what the retailer sees. */
export const StudioCommerce = () => {
  const { pick } = useLocale()

  return (
    <StudioShell
      module="yCommerce"
      tint={MODULE.commerce}
      nav={commerce.nav}
      active={0}
      date={commerce.date}
      licensee="PORTO SEGURO"
    >
      <div className="flex items-center gap-[26px]">
        <p className="text-[19px] font-bold tracking-[-0.02em]" style={{ color: PURPLE }}>
          {pick(commerce.title)}
        </p>
        <PeriodFilters />
        <div className="ml-auto flex items-center gap-[9px]">
          <span className="text-[9.5px]" style={{ color: BODY }}>
            {pick(commerce.shopLabel)}
          </span>
          <span
            className="rounded-[6px] bg-white px-[8px] py-[5px] text-[8px] font-bold tracking-[0.08em]"
            style={{ color: "#A04717" }}
          >
            {commerce.shop}
          </span>
        </div>
      </div>

      <div className="mt-[16px] grid grid-cols-5 gap-[12px]">
        {commerce.kpis.map((kpi) => (
          <Card key={kpi.label.en} className="px-[13px] py-[12px]">
            <div className="flex items-start justify-between">
              <p className="text-[21px] font-bold tracking-[-0.03em]" style={{ color: INK }}>
                {kpi.value}
              </p>
              <span
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full"
                style={{ background: `${kpi.tint}1F` }}
              >
                <kpi.icon size={13} strokeWidth={2.2} style={{ color: kpi.tint }} />
              </span>
            </div>
            <p className="mt-[2px] text-[10px]" style={{ color: BODY }}>
              {pick(kpi.label)}
            </p>
            <p className="mt-[7px] text-[8.5px]" style={{ color: MUTED }}>
              <span className="font-bold" style={{ color: kpi.up ? GREEN : RED }}>
                {kpi.delta}
              </span>{" "}
              {pick({ pt: "vs última semana", en: "vs last week" })}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-[12px] grid grid-cols-[1fr_248px] gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <ChartBlock
            title={pick(commerce.chart.title)}
            note={pick(commerce.chart.note)}
            total={pick(commerce.chart.total)}
            amount={commerce.chart.amount}
            accepted={pick(commerce.chart.accepted)}
            refused={pick(commerce.chart.refused)}
            acceptedAmount={commerce.chart.acceptedAmount}
            refusedAmount={commerce.chart.refusedAmount}
            days={commerce.chart.days}
            peak={commerce.chart.peak}
            positive={GREEN}
          />
        </Card>

        <div className="space-y-[12px]">
          <GaugeCard
            title={pick(commerce.top.title)}
            note={pick(commerce.top.note)}
            segments={[
              { value: 31, color: GREEN },
              { value: 25, color: BLUE },
              { value: 22, color: AMBER },
              { value: 22, color: RED },
            ]}
            rows={commerce.top.rows}
            action={pick(commerce.top.report)}
          />

          <div className="rounded-[12px] px-[14px] py-[13px]" style={{ background: PURPLE }}>
            <p className="text-[9.5px] text-white/75">{pick(commerce.top.best)}</p>
            <p className="mt-[3px] text-[15px] font-bold tracking-[-0.02em] text-white">
              {pick(commerce.top.bestValue)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[12px]">
        <Card className="px-[16px] py-[15px]">
          <CardTitle
            title={pick(commerce.performance.title)}
            note={pick(commerce.performance.note)}
          />

          <div className="mt-[13px] flex h-[30px] overflow-hidden rounded-[6px]">
            <div className="flex-[91]" style={{ background: GREEN }} />
            <div className="flex-[9]" style={{ background: RED }} />
          </div>
          <div className="mt-[5px] flex items-baseline justify-between">
            <div>
              <p className="text-[10.5px] font-bold" style={{ color: GREEN }}>
                {commerce.performance.goodTotal}
              </p>
              <p className="text-[8.5px]" style={{ color: BODY }}>
                {pick(commerce.performance.settled)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10.5px] font-bold" style={{ color: RED }}>
                {commerce.performance.badTotal}
              </p>
              <p className="text-[8.5px]" style={{ color: BODY }}>
                {pick(commerce.performance.declined)}
              </p>
            </div>
          </div>

          <div className="mt-[11px] grid grid-cols-2 gap-x-[16px]">
            <div
              className="space-y-[8px] pr-[16px]"
              style={{ borderRight: `1px solid ${HAIRLINE}` }}
            >
              {commerce.performance.rows.map((row, index) => (
                <div key={index} className="flex items-center gap-[8px]">
                  <row.icon size={13} strokeWidth={2} style={{ color: INK }} />
                  <span className="text-[10px] font-medium" style={{ color: GREEN }}>
                    {row.good}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-[8px]">
              {commerce.performance.rows.map((row, index) => (
                <div key={index} className="flex items-center justify-end gap-[8px]">
                  <span className="text-[10px] font-medium" style={{ color: RED }}>
                    {row.bad}
                  </span>
                  <row.icon size={13} strokeWidth={2} style={{ color: INK }} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[13px] flex items-center justify-center gap-[16px]">
            {commerce.performance.legend.map((item) => (
              <div key={item.label.en} className="flex items-center gap-[5px]">
                <item.icon size={12} strokeWidth={2} style={{ color: INK }} />
                <span className="text-[8.5px]" style={{ color: BODY }}>
                  {pick(item.label)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="px-[16px] py-[15px]">
          <CardTitle title={pick(commerce.payments.title)} note={pick(commerce.payments.note)} />

          <div className="mt-[13px] overflow-hidden rounded-[8px]" style={{ background: PANEL }}>
            <div className="grid grid-cols-[1fr_100px_74px] px-[12px] py-[8px]">
              {commerce.payments.columns.map((column) => (
                <span key={column.en} className="text-[9px]" style={{ color: BODY }}>
                  {pick(column)}
                </span>
              ))}
            </div>
            <div className="bg-white px-[12px] py-[10px]">
              {commerce.payments.groups.map((group, index) => (
                <div key={index} className={index ? "mt-[9px]" : undefined}>
                  <div className="grid grid-cols-[1fr_100px_74px]">
                    <span className="text-[10px] font-semibold" style={{ color: INK }}>
                      {typeof group.name === "string" ? group.name : pick(group.name)}
                    </span>
                    <span className="text-[10px]" style={{ color: INK }}>
                      {group.value}
                    </span>
                    <span className="text-[10px]" style={{ color: INK }}>
                      {group.share}
                    </span>
                  </div>
                  {group.rows?.map((row) => (
                    <div
                      key={typeof row.name === "string" ? row.name : row.name.en}
                      className="mt-[4px] grid grid-cols-[1fr_100px_74px] italic"
                    >
                      <span className="pl-[12px] text-[9.5px]" style={{ color: BODY }}>
                        {typeof row.name === "string" ? row.name : pick(row.name)}
                      </span>
                      <span className="text-[9.5px]" style={{ color: BODY }}>
                        {row.value}
                      </span>
                      <span className="text-[9.5px]" style={{ color: BODY }}>
                        {row.share}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </StudioShell>
  )
}
