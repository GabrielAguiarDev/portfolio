import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Award,
  Brush,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CircleUserRound,
  ConciergeBell,
  Guitar,
  Leaf,
  Lightbulb,
  Menu,
  Plus,
  Sailboat,
  ShoppingBag,
  SquarePen,
  Sprout,
  UtensilsCrossed,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"

import { BuiltBy, HomeIndicator, Screen, ScrollFade, StatusBar } from "./chrome"
import { Fragment } from "./fragments"

/**
 * Yago, rebuilt from the product's own screens.
 *
 * Two apps, not one — which is the fact the case study is actually about. The
 * guest holds the blue app: a grid of everything the resort has switched on,
 * and their own reservations inside it. The staff hold the magenta one: the
 * tickets those guests open, and the state each one is in. Same platform,
 * opposite ends of the same request.
 *
 * The structure, chrome and colour are the product's. Every name, unit number,
 * date and dish is invented — the captures in /docs/projetos are reference
 * material, not content.
 */

const TEAL = "#35A8A7"
const BLUE = "#3758AD"
const INK = "#3F3F3F"
const MUTED = "#7A7A7A"
const LINE = "#E8E8E8"

const STAFF_PLUM = "#370035"
const STAFF = "#AD37A8"

/** Confirmed, resolved. */
const GREEN_BG = "#CCF5CE"
const GREEN_INK = "#2F8F3A"
/** Open, waiting on somebody. */
const AMBER_BG = "#FFE9CC"
const AMBER_INK = "#E86D00"
/** Being handled right now. */
const CYAN_BG = "#B3E3FF"
const CYAN_INK = "#0093E6"

/**
 * The header every screen in both apps wears: a safe-area band in the darker
 * tone, then the bar carrying who is logged in.
 *
 * `unit` is the room in the guest app and the department in the staff app —
 * the same slot, which is why one component covers both.
 */
const AppHeader = ({
  band,
  bar,
  name,
  unit,
  bell = false,
}: {
  band: string
  bar: string
  name: string
  unit: string
  bell?: boolean
}) => (
  <div className="shrink-0" style={{ background: band }}>
    <StatusBar tone="light" />
    <div className="flex h-[66px] items-center gap-[10px] px-[20px]" style={{ background: bar }}>
      <CircleUserRound size={27} strokeWidth={1.6} className="shrink-0 text-white" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-bold leading-tight tracking-[-0.01em] text-white">
          {name}
        </p>
        <p className="mt-[1px] truncate text-[10px] leading-tight text-white/85">{unit}</p>
      </div>
      {bell ? (
        <div className="relative shrink-0" aria-hidden="true">
          {/* Drawn rather than lucide's outline bell: the product's is a solid
              glyph with the unread badge notched into its top-right. */}
          <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
            <path
              d="M7.5 1.2c-2.3 0-4 1.8-4 4v2.6c0 1-.3 2-.9 2.8l-.5.7h10.8l-.5-.7c-.6-.8-.9-1.8-.9-2.8V5.2c0-2.2-1.7-4-4-4Z"
              fill="white"
            />
            <path d="M5.7 13.4a1.9 1.9 0 0 0 3.6 0H5.7Z" fill="white" />
          </svg>
          <span className="absolute -right-[2px] top-[1px] h-[6px] w-[6px] rounded-full bg-[#E01B1B]" />
        </div>
      ) : null}
      <Menu size={19} strokeWidth={2.6} className="shrink-0 text-white" />
    </div>
  </div>
)

/** The screen title row: back arrow, centred title, module glyph. */
const ScreenTitle = ({
  title,
  tone,
  icon: Icon,
}: {
  title: string
  tone: string
  icon?: LucideIcon
}) => (
  <div className="flex h-[40px] shrink-0 items-center px-[20px]">
    <ChevronLeft size={20} strokeWidth={2.6} style={{ color: tone }} />
    <p
      className="flex-1 text-center text-[15.5px] font-semibold tracking-[-0.01em]"
      style={{ color: tone }}
    >
      {title}
    </p>
    <div className="flex w-[20px] justify-end">
      {Icon ? <Icon size={17} strokeWidth={2.2} style={{ color: tone }} /> : null}
    </div>
  </div>
)

/**
 * The segmented control both apps put above a list.
 *
 * The next option is always half off the right edge with a chevron after it.
 * That is the product's own behaviour and the reason the row is worth
 * reproducing exactly: it says the list is filtered, and that there is more
 * filter than fits.
 */
const Segments = ({
  options,
  tone,
  icons,
}: {
  options: string[]
  tone: string
  icons?: [LucideIcon, LucideIcon]
}) => (
  <div className="flex shrink-0 items-center gap-[9px] px-[20px]">
    {options.map((option, index) => {
      const active = index === 0
      const Icon = icons?.[index]
      return (
        <div
          key={option}
          className="flex h-[36px] flex-1 items-center justify-center gap-[7px] rounded-[7px] border"
          style={{
            background: active ? tone : "#FFFFFF",
            borderColor: active ? tone : "#E3E3E3",
            color: active ? "#FFFFFF" : "#4A4A4A",
          }}
        >
          {Icon ? <Icon size={13} strokeWidth={2.2} /> : null}
          <span className="text-[11.5px] font-semibold tracking-[-0.01em]">{option}</span>
        </div>
      )
    })}
    <ChevronRight size={15} strokeWidth={2.6} className="shrink-0" style={{ color: tone }} />
  </div>
)

/** A state pill. Every status in either app is one of these. */
const Badge = ({ label, bg, ink }: { label: string; bg: string; ink: string }) => (
  <span
    className="shrink-0 rounded-full px-[7px] py-[2.5px] text-[8.5px] font-bold leading-[1.35]"
    style={{ background: bg, color: ink }}
  >
    {label}
  </span>
)

/**
 * The banner at the top of a module.
 *
 * In the product this is a photograph of the place, with the module's name
 * burned over it. There is no photograph to ship here, so it is a warm field
 * with the same overlay — which keeps the composition and the type hierarchy
 * of the real screen without pretending to be a picture of anything.
 */
const HeroBanner = ({ from, to, children }: { from: string; to: string; children: ReactNode }) => (
  <div
    className="relative h-[112px] shrink-0 overflow-hidden rounded-[8px]"
    style={{ background: `linear-gradient(118deg, ${from} 0%, ${to} 100%)` }}
  >
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_78%_18%,rgba(255,255,255,0.22),transparent_62%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(0,0,0,0.42)_100%)]" />
    {children}
  </div>
)

/* ─────────────────────────────  GUEST APP  ───────────────────────────────── */

const guest = {
  name: "Marina Duarte",
  unit: { pt: "Apartamento 512", en: "Apartment 512" } satisfies Localized,
  brand: "TERRAZZA",
  brandKind: { pt: "GASTRONOMIA", en: "GASTRONOMIA" } satisfies Localized,
  brandBody: {
    pt: "RESERVE SUA MESA e viva uma noite de sabores autorais à beira-mar.",
    en: "BOOK YOUR TABLE and spend an evening of signature flavours by the sea.",
  } satisfies Localized,
  help: { pt: "Como posso te ajudar?", en: "How can I help you?" } satisfies Localized,
  modules: [
    { icon: ConciergeBell, label: { pt: "Solicitações", en: "Requests" } satisfies Localized },
    { icon: UtensilsCrossed, label: { pt: "Gastronomia", en: "Dining" } satisfies Localized },
    { icon: Sailboat, label: { pt: "Experiências", en: "Experiences" } satisfies Localized },
    { icon: Guitar, label: { pt: "Eventos", en: "Events" } satisfies Localized },
    { icon: CalendarDays, label: { pt: "Lazer", en: "Leisure" } satisfies Localized },
    { icon: ShoppingBag, label: { pt: "Boutique", en: "Boutique" } satisfies Localized },
    { icon: Leaf, label: { pt: "SPA", en: "Spa" } satisfies Localized },
    { icon: Sprout, label: { pt: "ESG", en: "ESG" } satisfies Localized },
    { icon: Lightbulb, label: { pt: "Dicas", en: "Tips" } satisfies Localized },
    { icon: CircleHelp, label: { pt: "Quiz", en: "Quiz" } satisfies Localized },
    { icon: Award, label: { pt: "Avaliações", en: "Reviews" } satisfies Localized },
  ],
}

/**
 * The guest app's home: everything the resort has switched on, as a grid.
 *
 * The fourth row is cropped by the screen's own bottom edge rather than
 * dropped. That is what the product does, and it is the honest way to show
 * eleven modules in a viewport that fits nine — trimming the list to what fits
 * would misrepresent how much of the resort the app actually carries.
 */
export const YagoHome = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <AppHeader band={TEAL} bar={BLUE} name={guest.name} unit={pick(guest.unit)} bell />

      <div className="shrink-0 px-[20px] pt-[15px]">
        <HeroBanner from="#3A1D0B" to="#8A4A18">
          <div className="absolute inset-x-[14px] bottom-[12px]">
            <p className="text-[15px] font-extrabold leading-none tracking-[0.02em] text-white">
              {guest.brand}
            </p>
            <p className="mt-[1px] text-[15px] font-light leading-none tracking-[0.02em] text-white/85">
              {pick(guest.brandKind)}
            </p>
            <p className="mt-[6px] max-w-[210px] text-[9px] font-medium leading-[1.35] text-white/90">
              {pick(guest.brandBody)}
            </p>
          </div>
        </HeroBanner>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-[11px] px-[20px] pt-[14px]">
        {/* The concierge avatar. An illustrated face in the product; here the
            same silhouette, so the row keeps its shape without inventing a
            person's likeness. */}
        <div
          className="relative h-[44px] w-[44px] shrink-0 overflow-hidden rounded-full"
          style={{ background: `linear-gradient(150deg, ${TEAL}, ${BLUE})` }}
          aria-hidden="true"
        >
          <span className="absolute left-1/2 top-[9px] h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-white/85" />
          <span className="absolute left-1/2 top-[25px] h-[20px] w-[26px] -translate-x-1/2 rounded-t-full bg-white/85" />
        </div>
        <p
          className="text-[14px] font-bold tracking-[-0.01em]"
          style={{ color: BLUE }}
        >
          {pick(guest.help)}
        </p>
      </div>

      <ScrollFade className="px-[20px] pt-[16px]">
        <div className="grid grid-cols-3 gap-x-[11px] gap-y-[11px]">
          {guest.modules.map(({ icon: Icon, label }) => (
            <div key={label.en} className="flex flex-col items-center">
              <div className="flex h-[70px] w-full items-center justify-center rounded-[6px] border border-[#E6E6E6] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <Icon size={26} strokeWidth={1.9} style={{ color: BLUE }} />
              </div>
              <span
                className="mt-[6px] text-center text-[10px] font-medium leading-tight"
                style={{ color: INK }}
              >
                {pick(label)}
              </span>
            </div>
          ))}
        </div>
      </ScrollFade>

      <BuiltBy />
      <HomeIndicator />
    </Screen>
  )
}

/* ── Guest: the reservation ────────────────────────────────────────────────── */

const reservation = {
  title: { pt: "Minhas reservas", en: "My reservations" } satisfies Localized,
  segments: {
    pt: ["Gastronomia", "Experiências"],
    en: ["Dining", "Experiences"],
  },
  venue: "Terrazza Gastronomia",
  status: { pt: "Confirmado", en: "Confirmed" } satisfies Localized,
  when: {
    pt: "QUI, 18 de Setembro de 2025 às 20:00h",
    en: "THU, 18 September 2025 at 8:00pm",
  } satisfies Localized,
  holder: "Marina Duarte",
  companion: "Helena Prado",
  cancel: { pt: "Cancelar reserva", en: "Cancel reservation" } satisfies Localized,
  courses: [
    {
      label: { pt: "ENTRADA", en: "STARTER" } satisfies Localized,
      value: { pt: "CARPACCIO DE POLVO", en: "OCTOPUS CARPACCIO" } satisfies Localized,
    },
    {
      label: { pt: "PRINCIPAL", en: "MAIN" } satisfies Localized,
      value: { pt: "RISOTO DE CAMARÃO", en: "PRAWN RISOTTO" } satisfies Localized,
    },
    {
      label: { pt: "SOBREMESA", en: "DESSERT" } satisfies Localized,
      value: { pt: "PETIT GÂTEAU DE CUPUAÇU", en: "CUPUAÇU PETIT GÂTEAU" } satisfies Localized,
    },
    {
      label: { pt: "OBSERVAÇÃO", en: "NOTE" } satisfies Localized,
      value: { pt: "SEM PIMENTA", en: "NO CHILLI" } satisfies Localized,
    },
  ],
}

/**
 * The reservation itself — the app's one transactional screen, and the reason
 * this is the phone the case study leads with.
 *
 * Worth noticing in the real product and kept here: the order is stored per
 * *person*, not per table. The blue bar names whose choices the grey block
 * below belongs to, and the second card is the other cover, still empty.
 */
export const YagoReservation = () => {
  const { pick, locale } = useLocale()

  return (
    <Screen className="bg-white">
      <AppHeader band={TEAL} bar={BLUE} name={guest.name} unit={pick(guest.unit)} bell />

      <div className="pt-[6px]">
        <ScreenTitle title={pick(reservation.title)} tone={BLUE} />
      </div>

      <div className="pt-[6px]">
        <Segments
          options={reservation.segments[locale]}
          tone={BLUE}
          icons={[UtensilsCrossed, Sailboat]}
        />
      </div>

      <div className="mt-[16px] h-px shrink-0" style={{ background: LINE }} />

      <div className="min-h-0 flex-1 overflow-hidden px-[20px] pt-[16px]">
        <div className="flex items-center gap-[9px]">
          <p className="text-[13px] font-bold tracking-[-0.01em]" style={{ color: BLUE }}>
            {reservation.venue}
          </p>
          <Badge label={pick(reservation.status)} bg={GREEN_BG} ink={GREEN_INK} />
        </div>

        <div className="mt-[8px] flex items-center gap-[6px]">
          <CalendarDays size={11} strokeWidth={2.4} style={{ color: BLUE }} />
          <span className="text-[10px] font-medium" style={{ color: INK }}>
            {pick(reservation.when)}
          </span>
        </div>

        <div className="mt-[13px] overflow-hidden rounded-[7px]">
          <div className="flex items-stretch">
            <div
              className="flex min-w-0 flex-1 items-center gap-[8px] px-[11px] py-[10px]"
              style={{ background: BLUE }}
            >
              <CircleUserRound size={17} strokeWidth={1.8} className="shrink-0 text-white" />
              <span className="truncate text-[11.5px] font-bold text-white">
                {reservation.holder}
              </span>
            </div>
            <div
              className="flex w-[38px] shrink-0 items-center justify-center"
              style={{ background: TEAL }}
            >
              <SquarePen size={15} strokeWidth={2.2} className="text-white" />
            </div>
          </div>

          <div className="space-y-[9px] bg-[#EFEFEF] px-[11px] py-[12px]">
            {reservation.courses.map((course) => (
              <div key={course.label.en}>
                <p
                  className="text-[8.5px] font-bold tracking-[0.04em]"
                  style={{ color: TEAL }}
                >
                  {pick(course.label)}
                </p>
                <p className="mt-[2px] text-[10px] font-medium" style={{ color: "#4A4A4A" }}>
                  {pick(course.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[11px] flex items-center gap-[8px] rounded-[7px] border border-[#E0E0E0] px-[11px] py-[10px]">
          <CircleUserRound size={17} strokeWidth={1.8} className="shrink-0" style={{ color: BLUE }} />
          <span className="truncate text-[11.5px] font-medium" style={{ color: INK }}>
            {reservation.companion}
          </span>
        </div>

        <div className="mt-[13px] flex h-[38px] items-center justify-center rounded-[7px] bg-[#FF4C4C]">
          <span className="text-[12px] font-semibold text-white">{pick(reservation.cancel)}</span>
        </div>
      </div>

      <BuiltBy />
      <HomeIndicator />
    </Screen>
  )
}

/* ─────────────────────────────  STAFF APP  ───────────────────────────────── */

const staff = {
  name: "Rafael Menezes",
  unit: { pt: "Governança", en: "Housekeeping" } satisfies Localized,
  banner: { pt: "GOVERNANÇA", en: "HOUSEKEEPING" } satisfies Localized,
  title: { pt: "Chamados", en: "Tickets" } satisfies Localized,
  segments: {
    pt: ["Todos", "Em aberto"],
    en: ["All", "Open"],
  },
  tickets: [
    {
      unit: "UH 512",
      state: { pt: "Em aberto", en: "Open" } satisfies Localized,
      bg: AMBER_BG,
      ink: AMBER_INK,
      when: {
        pt: "QUI, 18 de Setembro de 2025 às 07:40h",
        en: "THU, 18 September 2025 at 7:40am",
      } satisfies Localized,
      guest: "MARINA DUARTE PRADO",
    },
    {
      unit: "UH 236",
      state: {
        pt: "Atendido em 17/09 às 15:20h",
        en: "Resolved 17/09 at 3:20pm",
      } satisfies Localized,
      bg: GREEN_BG,
      ink: GREEN_INK,
      when: {
        pt: "QUA, 17 de Setembro de 2025 às 09:05h",
        en: "WED, 17 September 2025 at 9:05am",
      } satisfies Localized,
      guest: "BRUNO TAVARES LIMA",
    },
    {
      unit: "UH 118",
      state: { pt: "Em atendimento", en: "In progress" } satisfies Localized,
      bg: CYAN_BG,
      ink: CYAN_INK,
      when: {
        pt: "QUI, 18 de Setembro de 2025 às 08:12h",
        en: "THU, 18 September 2025 at 8:12am",
      } satisfies Localized,
      guest: "CAMILA FONSECA REIS",
    },
  ],
  datePlaceholder: "00/00/0000",
}

/**
 * The staff app: the same request, from the side that has to resolve it.
 *
 * Deliberately the second phone in the composition. A guest app on its own is
 * an app; a guest app with the operational half behind it is a system, and the
 * whole argument of this portfolio is that the system is the durable part.
 */
export const YagoStaffTickets = () => {
  const { pick, locale } = useLocale()

  return (
    <Screen className="bg-white">
      <AppHeader band={STAFF_PLUM} bar={STAFF} name={staff.name} unit={pick(staff.unit)} />

      <div className="shrink-0 px-[20px] pt-[15px]">
        <HeroBanner from="#241B14" to="#8A6B4C">
          <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[17px] font-extrabold tracking-[0.02em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {pick(staff.banner)}
          </p>
        </HeroBanner>
      </div>

      <p
        className="shrink-0 pt-[16px] text-center text-[19px] font-bold tracking-[-0.01em]"
        style={{ color: STAFF }}
      >
        {pick(staff.title)}
      </p>

      <div className="flex shrink-0 gap-[10px] px-[20px] pt-[14px]">
        {[0, 1].map((index) => (
          <div
            key={index}
            className="flex h-[36px] flex-1 items-center gap-[7px] rounded-[7px] border px-[10px]"
            style={{ borderColor: `${STAFF}55` }}
          >
            <CalendarDays size={13} strokeWidth={2.2} style={{ color: STAFF }} />
            <span className="flex-1 text-[10.5px]" style={{ color: MUTED }}>
              {staff.datePlaceholder}
            </span>
            <ChevronDown size={13} strokeWidth={2.6} style={{ color: INK }} />
          </div>
        ))}
      </div>

      <div className="pt-[14px]">
        <Segments options={staff.segments[locale]} tone={STAFF} />
      </div>

      <div className="mt-[14px] h-px shrink-0" style={{ background: LINE }} />

      <div className="min-h-0 flex-1 overflow-hidden px-[20px]">
        {staff.tickets.map((ticket) => (
          <div
            key={ticket.unit}
            className="flex items-start gap-[10px] border-b py-[13px]"
            style={{ borderColor: "#F0F0F0" }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-[8px]">
                <p className="text-[12.5px] font-bold tracking-[-0.01em]" style={{ color: STAFF }}>
                  {ticket.unit}
                </p>
                <Badge label={pick(ticket.state)} bg={ticket.bg} ink={ticket.ink} />
              </div>

              <div className="mt-[7px] flex items-center gap-[6px]">
                <CalendarDays size={11} strokeWidth={2.4} style={{ color: STAFF }} />
                <span className="text-[9.5px] font-medium" style={{ color: INK }}>
                  {pick(ticket.when)}
                </span>
              </div>

              <div className="mt-[5px] flex items-center gap-[6px]">
                <CircleUserRound size={11} strokeWidth={2.2} style={{ color: STAFF }} />
                <span className="truncate text-[9.5px] font-medium" style={{ color: INK }}>
                  {ticket.guest}
                </span>
              </div>
            </div>

            <div
              className="mt-[3px] flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border-[1.5px]"
              style={{ borderColor: STAFF }}
            >
              <Plus size={14} strokeWidth={2.6} style={{ color: STAFF }} />
            </div>
          </div>
        ))}
      </div>

      <BuiltBy />
      <HomeIndicator />
    </Screen>
  )
}

/* ───────────────────────  FRAGMENTS, OUTSIDE A PHONE  ─────────────────────── */

/**
 * Two cards that float free of any device in the case study's composition.
 *
 * They are the two halves of one request: the guest's table, confirmed, and the
 * housekeeping ticket somebody on shift has picked up. Showing them outside the
 * frames is what makes the point that this is one platform and not two apps
 * that happen to share a logo — the same event, rendered for two audiences.
 */
export const YagoReservationCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint={`linear-gradient(135deg, ${TEAL}, ${BLUE})`}
      eyebrow={pick({ pt: "RESERVA", en: "RESERVATION" })}
      badge={pick(reservation.status)}
      badgeBg={GREEN_BG}
      badgeInk={GREEN_INK}
      title={reservation.venue}
      body={`${pick(reservation.when)} · ${pick({ pt: "Mesa para 2", en: "Table for 2" })}`}
    />
  )
}

export const YagoTicketCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint={`linear-gradient(135deg, ${STAFF}, ${STAFF_PLUM})`}
      mark={<Brush size={8} strokeWidth={2.6} className="text-white" />}
      eyebrow={pick({ pt: "CHAMADO", en: "TICKET" })}
      badge={pick({ pt: "Em atendimento", en: "In progress" })}
      badgeBg={CYAN_BG}
      badgeInk={CYAN_INK}
      title={pick({
        pt: "UH 512 · Cobertor e toalhas extra",
        en: "UH 512 · Extra blanket and towels",
      })}
      body={pick({ pt: "Responsável: Rafael Menezes", en: "Assigned to: Rafael Menezes" })}
    />
  )
}
