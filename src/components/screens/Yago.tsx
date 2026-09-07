import { Calendar, Heart, Home, UtensilsCrossed, Bell, ChevronRight, Star } from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"

import { HomeIndicator, Screen, StatusBar, TabBar } from "./chrome"

/**
 * Yago's interface, drawn from the feature set the product actually ships:
 * the day's schedule, restaurant reservations, favourites and timed
 * notifications. Nothing here claims to be a screenshot — it is the same
 * information architecture, rendered as live DOM.
 */

const TEAL = "#35A8A7"
const BLUE = "#3758AD"

const copy = {
  greeting: { pt: "Boa tarde,", en: "Good afternoon," } satisfies Localized,
  stay: { pt: "Sua estadia · dia 3 de 6", en: "Your stay · day 3 of 6" } satisfies Localized,
  now: { pt: "Acontecendo agora", en: "Happening now" } satisfies Localized,
  nowTitle: { pt: "Sunset Jazz", en: "Sunset Jazz" } satisfies Localized,
  nowPlace: { pt: "Deck do Mirante · até 20h", en: "Lookout Deck · until 8pm" } satisfies Localized,
  today: { pt: "Programação de hoje", en: "Today's schedule" } satisfies Localized,
  all: { pt: "Ver tudo", en: "See all" } satisfies Localized,
  dine: { pt: "Restaurantes", en: "Dining" } satisfies Localized,
  events: { pt: "Eventos", en: "Events" } satisfies Localized,
  saved: { pt: "Favoritos", en: "Saved" } satisfies Localized,
  tabs: {
    home: { pt: "Início", en: "Home" } satisfies Localized,
    agenda: { pt: "Agenda", en: "Agenda" } satisfies Localized,
    booking: { pt: "Reservas", en: "Booking" } satisfies Localized,
    saved: { pt: "Salvos", en: "Saved" } satisfies Localized,
  },
  schedule: [
    {
      time: "16:00",
      title: { pt: "Aula de mergulho", en: "Diving lesson" } satisfies Localized,
      place: { pt: "Píer sul", en: "South pier" } satisfies Localized,
    },
    {
      time: "18:30",
      title: { pt: "Jantar · Vila Mare", en: "Dinner · Vila Mare" } satisfies Localized,
      place: { pt: "Mesa para 2 · confirmada", en: "Table for 2 · confirmed" } satisfies Localized,
      booked: true,
    },
    {
      time: "21:00",
      title: { pt: "Cinema ao ar livre", en: "Open-air cinema" } satisfies Localized,
      place: { pt: "Jardim central", en: "Central garden" } satisfies Localized,
    },
  ],
}

export const YagoHome = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-[#F6F7F9]">
      <div
        className="shrink-0 pb-[26px]"
        style={{ background: `linear-gradient(160deg, ${TEAL} 0%, ${BLUE} 100%)` }}
      >
        <StatusBar tone="light" />

        <div className="flex items-center justify-between px-[22px] pt-[10px]">
          <div>
            <p className="text-[13px] font-medium text-white/70">{pick(copy.greeting)}</p>
            <p className="mt-[2px] text-[23px] font-semibold tracking-[-0.02em] text-white">
              Gabriel
            </p>
          </div>
          <div className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/15">
            <Bell size={17} className="text-white" strokeWidth={2} />
            <span className="absolute right-[9px] top-[9px] h-[7px] w-[7px] rounded-full border-[1.5px] border-[#2C6BA8] bg-[#FF7A45]" />
          </div>
        </div>

        <p className="mt-[14px] px-[22px] text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
          {pick(copy.stay)}
        </p>
      </div>

      {/* The sheet lifts over the header — the app's signature move. */}
      <div className="-mt-[16px] flex-1 overflow-hidden rounded-t-[22px] bg-[#F6F7F9] px-[18px] pt-[18px]">
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_2px_14px_rgba(16,24,40,0.07)]">
          <div
            className="relative h-[92px]"
            style={{ background: `linear-gradient(120deg, ${BLUE}, ${TEAL})` }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_10%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
            <span className="absolute left-[12px] top-[12px] rounded-full bg-black/25 px-[9px] py-[4px] text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
              {pick(copy.now)}
            </span>
          </div>
          <div className="flex items-center justify-between p-[14px]">
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-[#101828]">
                {pick(copy.nowTitle)}
              </p>
              <p className="mt-[2px] text-[11.5px] text-[#667085]">{pick(copy.nowPlace)}</p>
            </div>
            <Heart size={18} className="text-[#FF5A5F]" fill="#FF5A5F" />
          </div>
        </div>

        <div className="mt-[16px] flex gap-[9px]">
          {[
            { icon: UtensilsCrossed, label: pick(copy.dine) },
            { icon: Calendar, label: pick(copy.events) },
            { icon: Star, label: pick(copy.saved) },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center gap-[7px] rounded-[13px] bg-white py-[13px]"
            >
              <Icon size={17} style={{ color: TEAL }} strokeWidth={2} />
              <span className="text-[10px] font-medium text-[#475467]">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-[20px] flex items-center justify-between">
          <p className="text-[13.5px] font-semibold tracking-[-0.01em] text-[#101828]">
            {pick(copy.today)}
          </p>
          <span className="flex items-center gap-[1px] text-[11px] font-medium" style={{ color: TEAL }}>
            {pick(copy.all)}
            <ChevronRight size={13} />
          </span>
        </div>

        <div className="mt-[10px] space-y-[8px]">
          {copy.schedule.map((item) => (
            <div
              key={item.time}
              className="flex items-center gap-[12px] rounded-[13px] bg-white p-[12px]"
            >
              <div className="w-[38px] shrink-0 text-[12px] font-semibold text-[#101828]">
                {item.time}
              </div>
              <div className="h-[26px] w-px shrink-0 bg-[#EAECF0]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12.5px] font-medium text-[#101828]">
                  {pick(item.title)}
                </p>
                <p className="mt-[1px] truncate text-[10.5px] text-[#667085]">{pick(item.place)}</p>
              </div>
              {item.booked ? (
                <span
                  className="shrink-0 rounded-full px-[7px] py-[3px] text-[8.5px] font-bold uppercase tracking-[0.08em] text-white"
                  style={{ background: TEAL }}
                >
                  OK
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <TabBar
        accent={TEAL}
        items={[
          { icon: <Home size={19} strokeWidth={2} />, label: pick(copy.tabs.home) },
          { icon: <Calendar size={19} strokeWidth={2} />, label: pick(copy.tabs.agenda) },
          { icon: <UtensilsCrossed size={19} strokeWidth={2} />, label: pick(copy.tabs.booking) },
          { icon: <Heart size={19} strokeWidth={2} />, label: pick(copy.tabs.saved) },
        ]}
      />
      <HomeIndicator />
    </Screen>
  )
}

/**
 * The reservation flow — the app's one genuinely transactional screen, and the
 * reason the coded mockup is worth the effort: it shows a real interaction
 * model (date strip → slot grid → party size → confirm), not a pretty surface.
 */
const booking = {
  back: { pt: "Reservar mesa", en: "Book a table" } satisfies Localized,
  place: { pt: "Vila Mare · Frutos do mar", en: "Vila Mare · Seafood" } satisfies Localized,
  when: { pt: "Quando", en: "When" } satisfies Localized,
  time: { pt: "Horário", en: "Time" } satisfies Localized,
  people: { pt: "Pessoas", en: "Party size" } satisfies Localized,
  confirm: { pt: "Confirmar reserva", en: "Confirm reservation" } satisfies Localized,
  free: { pt: "livre", en: "free" } satisfies Localized,
  days: {
    pt: ["SEG", "TER", "QUA", "QUI", "SEX"],
    en: ["MON", "TUE", "WED", "THU", "FRI"],
  },
}

export const YagoBooking = () => {
  const { pick, locale } = useLocale()
  const slots = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30"]

  return (
    <Screen className="bg-white">
      <StatusBar />

      <div className="px-[22px] pt-[6px]">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#98A2B3]">
          {pick(booking.place)}
        </p>
        <h1 className="mt-[6px] text-[24px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#101828]">
          {pick(booking.back)}
        </h1>
      </div>

      <div className="mt-[22px] px-[22px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#98A2B3]">
          {pick(booking.when)}
        </p>
        <div className="mt-[10px] flex gap-[7px]">
          {booking.days[locale].map((day, index) => {
            const selected = index === 2
            return (
              <div
                key={day}
                className="flex flex-1 flex-col items-center gap-[3px] rounded-[12px] py-[10px]"
                style={{
                  background: selected ? BLUE : "#F2F4F7",
                  color: selected ? "#FFFFFF" : "#475467",
                }}
              >
                <span className="text-[8.5px] font-semibold tracking-[0.08em] opacity-70">
                  {day}
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.02em]">{14 + index}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-[22px] px-[22px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#98A2B3]">
          {pick(booking.time)}
        </p>
        <div className="mt-[10px] grid grid-cols-3 gap-[7px]">
          {slots.map((slot, index) => {
            const selected = slot === "19:00"
            const full = index === 1
            return (
              <div
                key={slot}
                className="flex items-center justify-center rounded-[11px] border py-[11px] text-[13px] font-medium tracking-[-0.01em]"
                style={{
                  borderColor: selected ? TEAL : "#EAECF0",
                  background: selected ? `${TEAL}14` : "#FFFFFF",
                  color: full ? "#D0D5DD" : selected ? TEAL : "#344054",
                  textDecoration: full ? "line-through" : "none",
                }}
              >
                {slot}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-[22px] px-[22px]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-[#98A2B3]">
          {pick(booking.people)}
        </p>
        <div className="mt-[10px] flex items-center justify-between rounded-[13px] bg-[#F9FAFB] px-[16px] py-[13px]">
          <span className="text-[14px] font-medium text-[#101828]">2</span>
          <div className="flex gap-[8px]">
            {["–", "+"].map((sign) => (
              <div
                key={sign}
                className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[15px] font-medium text-[#475467] shadow-[0_1px_3px_rgba(16,24,40,0.08)]"
              >
                {sign}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto px-[22px] pb-[10px]">
        <div
          className="flex items-center justify-center rounded-[14px] py-[15px] text-[14px] font-semibold tracking-[-0.01em] text-white"
          style={{ background: `linear-gradient(120deg, ${TEAL}, ${BLUE})` }}
        >
          {pick(booking.confirm)}
        </div>
      </div>
      <HomeIndicator />
    </Screen>
  )
}

/**
 * A push notification, floating free of any phone.
 *
 * Yago's "smart notifications" are the feature hardest to show inside a screen,
 * because their whole point is arriving when the app is closed. So this one
 * renders on its own, over the composition.
 */
export const YagoNotification = () => {
  const { pick } = useLocale()

  const notification = {
    app: { pt: "YAGO", en: "YAGO" } satisfies Localized,
    when: { pt: "agora", en: "now" } satisfies Localized,
    title: { pt: "Sua mesa é daqui a 30 min", en: "Your table is in 30 min" } satisfies Localized,
    body: {
      pt: "Vila Mare · 19:00 · mesa para 2",
      en: "Vila Mare · 7:00pm · table for 2",
    } satisfies Localized,
  }

  return (
    <div className="w-full rounded-[18px] border border-white/12 bg-white/[0.07] p-[14px] backdrop-blur-xl">
      <div className="flex items-center gap-[8px]">
        <div
          className="flex h-[18px] w-[18px] items-center justify-center rounded-[5px]"
          style={{ background: `linear-gradient(135deg, ${TEAL}, ${BLUE})` }}
        />
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/60">
          {pick(notification.app)}
        </span>
        <span className="ml-auto text-[9.5px] text-white/40">{pick(notification.when)}</span>
      </div>
      <p className="mt-[9px] text-[13px] font-semibold leading-tight tracking-[-0.01em] text-white">
        {pick(notification.title)}
      </p>
      <p className="mt-[3px] text-[11.5px] text-white/55">{pick(notification.body)}</p>
    </div>
  )
}
