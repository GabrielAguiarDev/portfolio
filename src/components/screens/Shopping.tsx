import { Check, Home, Package, Search, ShoppingBag, Store, MapPin } from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"

import { HomeIndicator, Screen, StatusBar, TabBar } from "./chrome"

/**
 * Porto Seguro Shopping — the two screens that carry the product's whole idea:
 * many stores in one storefront, and an order you can follow from payment to
 * the door. Both are drawn in code from the documented feature set.
 */

const INK = "#1C1917"
const CREAM = "#F2EFE9"
const ACCENT = "#B45309"

const copy = {
  at: { pt: "Comprando em", en: "Shopping at" } satisfies Localized,
  mall: { pt: "Porto Seguro Shopping", en: "Porto Seguro Shopping" } satisfies Localized,
  search: { pt: "Buscar em 40+ lojas", en: "Search 40+ stores" } satisfies Localized,
  promo: { pt: "Semana de ofertas", en: "Deals week" } satisfies Localized,
  promoBody: {
    pt: "Até 40% off · entrega no mesmo dia",
    en: "Up to 40% off · same-day delivery",
  } satisfies Localized,
  forYou: { pt: "Para você", en: "For you" } satisfies Localized,
  chips: {
    pt: ["Todas", "Moda", "Casa", "Beleza", "Esporte"],
    en: ["All", "Fashion", "Home", "Beauty", "Sport"],
  },
  tabs: {
    home: { pt: "Início", en: "Home" } satisfies Localized,
    search: { pt: "Buscar", en: "Search" } satisfies Localized,
    bag: { pt: "Sacola", en: "Bag" } satisfies Localized,
    orders: { pt: "Pedidos", en: "Orders" } satisfies Localized,
  },
  products: [
    {
      name: { pt: "Tênis Runner", en: "Runner Sneakers" } satisfies Localized,
      store: { pt: "Passo Livre", en: "Passo Livre" } satisfies Localized,
      price: { pt: "R$ 289,90", en: "R$ 289.90" } satisfies Localized,
      was: { pt: "R$ 419,90", en: "R$ 419.90" } satisfies Localized,
      tint: "linear-gradient(140deg,#E7E2D8,#CFC7B8)",
    },
    {
      name: { pt: "Camisa linho", en: "Linen Shirt" } satisfies Localized,
      store: { pt: "Norte Store", en: "Norte Store" } satisfies Localized,
      price: { pt: "R$ 159,00", en: "R$ 159.00" } satisfies Localized,
      tint: "linear-gradient(140deg,#DDE4E6,#BFCBD0)",
    },
  ],
}

export const ShoppingHome = () => {
  const { pick, locale } = useLocale()

  return (
    <Screen style={{ background: CREAM }}>
      <StatusBar />

      <div className="px-[20px] pt-[4px]">
        <div className="flex items-center gap-[5px]">
          <MapPin size={12} style={{ color: ACCENT }} strokeWidth={2.4} />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A8378]">
            {pick(copy.at)}
          </span>
        </div>
        <p className="mt-[3px] text-[19px] font-semibold tracking-[-0.025em]" style={{ color: INK }}>
          {pick(copy.mall)}
        </p>

        <div className="mt-[14px] flex items-center gap-[9px] rounded-[13px] border border-black/[0.07] bg-white px-[13px] py-[11px]">
          <Search size={15} className="text-[#A8A296]" strokeWidth={2.2} />
          <span className="text-[12.5px] text-[#A8A296]">{pick(copy.search)}</span>
        </div>
      </div>

      <div className="mt-[14px] flex gap-[7px] overflow-hidden px-[20px]">
        {copy.chips[locale].map((chip, index) => (
          <div
            key={chip}
            className="shrink-0 rounded-full px-[13px] py-[7px] text-[11.5px] font-medium"
            style={{
              background: index === 0 ? INK : "rgba(0,0,0,0.04)",
              color: index === 0 ? CREAM : "#57534E",
            }}
          >
            {chip}
          </div>
        ))}
      </div>

      <div className="mt-[16px] px-[20px]">
        <div
          className="relative overflow-hidden rounded-[16px] p-[16px]"
          style={{ background: INK }}
        >
          <div className="absolute -right-[30px] -top-[30px] h-[110px] w-[110px] rounded-full bg-[#B45309]/25 blur-2xl" />
          <p className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            {pick(copy.promo)}
          </p>
          <p
            className="mt-[6px] max-w-[180px] text-[15px] font-semibold leading-[1.2] tracking-[-0.02em]"
            style={{ color: CREAM }}
          >
            {pick(copy.promoBody)}
          </p>
        </div>
      </div>

      <div className="mt-[18px] flex-1 overflow-hidden px-[20px]">
        <p className="text-[13px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
          {pick(copy.forYou)}
        </p>

        <div className="mt-[11px] grid grid-cols-2 gap-[11px]">
          {copy.products.map((product) => (
            <div
              key={product.name.en}
              className="overflow-hidden rounded-[14px] bg-white"
            >
              <div className="h-[92px]" style={{ background: product.tint }} />
              <div className="p-[10px]">
                <div className="flex items-center gap-[4px]">
                  <Store size={9} className="text-[#A8A296]" strokeWidth={2.4} />
                  <span className="truncate text-[9px] font-medium uppercase tracking-[0.1em] text-[#A8A296]">
                    {pick(product.store)}
                  </span>
                </div>
                <p className="mt-[4px] truncate text-[12px] font-medium" style={{ color: INK }}>
                  {pick(product.name)}
                </p>
                <div className="mt-[5px] flex items-baseline gap-[5px]">
                  <span className="text-[13px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
                    {pick(product.price)}
                  </span>
                  {product.was ? (
                    <span className="text-[9.5px] text-[#A8A296] line-through">
                      {pick(product.was)}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TabBar
        accent={INK}
        items={[
          { icon: <Home size={19} strokeWidth={2} />, label: pick(copy.tabs.home) },
          { icon: <Search size={19} strokeWidth={2} />, label: pick(copy.tabs.search) },
          { icon: <ShoppingBag size={19} strokeWidth={2} />, label: pick(copy.tabs.bag) },
          { icon: <Package size={19} strokeWidth={2} />, label: pick(copy.tabs.orders) },
        ]}
      />
      <HomeIndicator />
    </Screen>
  )
}

/** Order tracking: the payment-to-delivery flow, which is the app's promise. */
const order = {
  label: { pt: "Pedido", en: "Order" } satisfies Localized,
  eta: { pt: "Chega hoje, até 18h", en: "Arrives today, by 6pm" } satisfies Localized,
  total: { pt: "Total pago", en: "Total paid" } satisfies Localized,
  amount: { pt: "R$ 448,90", en: "R$ 448.90" } satisfies Localized,
  items: { pt: "2 itens · 2 lojas", en: "2 items · 2 stores" } satisfies Localized,
  steps: [
    {
      title: { pt: "Pagamento aprovado", en: "Payment approved" } satisfies Localized,
      at: { pt: "09:12", en: "9:12am" } satisfies Localized,
    },
    {
      title: { pt: "Separado pelas lojas", en: "Picked by the stores" } satisfies Localized,
      at: { pt: "11:40", en: "11:40am" } satisfies Localized,
    },
    {
      title: { pt: "A caminho", en: "Out for delivery" } satisfies Localized,
      at: { pt: "14:05", en: "2:05pm" } satisfies Localized,
      current: true,
    },
    {
      title: { pt: "Entregue", en: "Delivered" } satisfies Localized,
      at: { pt: "—", en: "—" } satisfies Localized,
    },
  ],
}

export const ShoppingOrder = () => {
  const { pick } = useLocale()

  return (
    <Screen style={{ background: CREAM }}>
      <StatusBar />

      <div className="px-[20px] pt-[6px]">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#A8A296]">
          {pick(order.label)} #1042
        </p>
        <p
          className="mt-[6px] text-[22px] font-semibold leading-[1.12] tracking-[-0.03em]"
          style={{ color: INK }}
        >
          {pick(order.eta)}
        </p>
      </div>

      <div className="mt-[24px] px-[20px]">
        {order.steps.map((step, index) => {
          const done = index < 2
          const active = Boolean(step.current)
          const last = index === order.steps.length - 1

          return (
            <div key={step.title.en} className="grid grid-cols-[18px_1fr] gap-x-[13px]">
              <div className="flex flex-col items-center">
                <div
                  className="flex h-[18px] w-[18px] items-center justify-center rounded-full"
                  style={{
                    background: done ? INK : active ? ACCENT : "transparent",
                    border: done || active ? "none" : "1.5px solid #D7D2C7",
                  }}
                >
                  {done ? <Check size={11} strokeWidth={3} color={CREAM} /> : null}
                  {active ? <div className="h-[6px] w-[6px] rounded-full bg-white" /> : null}
                </div>
                {!last ? (
                  <div
                    className="w-[1.5px] flex-1"
                    style={{ background: done ? INK : "#E3DED3", minHeight: 34 }}
                  />
                ) : null}
              </div>

              <div className={last ? "pb-0" : "pb-[16px]"}>
                <p
                  className="text-[13px] font-medium leading-none tracking-[-0.01em]"
                  style={{ color: done || active ? INK : "#A8A296" }}
                >
                  {pick(step.title)}
                </p>
                <p className="mt-[5px] text-[10.5px] text-[#A8A296]">{pick(step.at)}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-auto px-[20px] pb-[12px]">
        <div className="flex items-center justify-between rounded-[15px] bg-white p-[15px]">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.13em] text-[#A8A296]">
              {pick(order.total)}
            </p>
            <p
              className="mt-[3px] text-[18px] font-semibold tracking-[-0.03em]"
              style={{ color: INK }}
            >
              {pick(order.amount)}
            </p>
          </div>
          <span className="text-[10.5px] text-[#A8A296]">{pick(order.items)}</span>
        </div>
      </div>
      <HomeIndicator />
    </Screen>
  )
}

/**
 * Checkout — the middle of the flow, and the screen that makes the
 * constellation tell a whole story: storefront → payment → tracking.
 */
const checkout = {
  title: { pt: "Pagamento", en: "Payment" } satisfies Localized,
  method: { pt: "Cartão · final 4218", en: "Card · ending 4218" } satisfies Localized,
  change: { pt: "Trocar", en: "Change" } satisfies Localized,
  summary: { pt: "Resumo", en: "Summary" } satisfies Localized,
  lines: [
    { label: { pt: "2 itens", en: "2 items" } satisfies Localized, value: "R$ 448,90" },
    { label: { pt: "Entrega", en: "Delivery" } satisfies Localized, value: "R$ 0,00" },
  ],
  total: { pt: "Total", en: "Total" } satisfies Localized,
  pay: { pt: "Pagar agora", en: "Pay now" } satisfies Localized,
  safe: { pt: "Pagamento protegido", en: "Protected payment" } satisfies Localized,
}

export const ShoppingCheckout = () => {
  const { pick } = useLocale()

  return (
    <Screen style={{ background: CREAM }}>
      <StatusBar />

      <div className="px-[20px] pt-[6px]">
        <p
          className="text-[24px] font-semibold leading-[1.1] tracking-[-0.03em]"
          style={{ color: INK }}
        >
          {pick(checkout.title)}
        </p>
      </div>

      <div className="mt-[20px] px-[20px]">
        <div className="flex items-center gap-[12px] rounded-[15px] bg-white p-[14px]">
          <div
            className="flex h-[30px] w-[42px] shrink-0 items-center justify-center rounded-[7px]"
            style={{ background: INK }}
          >
            <div className="flex gap-[3px]">
              <span className="h-[11px] w-[11px] rounded-full bg-white/70" />
              <span className="-ml-[6px] h-[11px] w-[11px] rounded-full" style={{ background: ACCENT }} />
            </div>
          </div>
          <p className="flex-1 text-[12.5px] font-medium" style={{ color: INK }}>
            {pick(checkout.method)}
          </p>
          <span className="text-[11px] font-medium" style={{ color: ACCENT }}>
            {pick(checkout.change)}
          </span>
        </div>
      </div>

      <div className="mt-[16px] px-[20px]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A8A296]">
          {pick(checkout.summary)}
        </p>
        <div className="mt-[10px] space-y-[9px] rounded-[15px] bg-white p-[14px]">
          {checkout.lines.map((line) => (
            <div key={line.label.en} className="flex items-center justify-between">
              <span className="text-[12px] text-[#78716C]">{pick(line.label)}</span>
              <span className="text-[12px] font-medium" style={{ color: INK }}>
                {line.value}
              </span>
            </div>
          ))}
          <div className="h-px bg-black/[0.06]" />
          <div className="flex items-center justify-between">
            <span className="text-[12.5px] font-semibold" style={{ color: INK }}>
              {pick(checkout.total)}
            </span>
            <span className="text-[16px] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              R$ 448,90
            </span>
          </div>
        </div>
      </div>

      <div className="mt-auto px-[20px] pb-[12px]">
        <div
          className="flex items-center justify-center rounded-[14px] py-[15px] text-[14px] font-semibold tracking-[-0.01em]"
          style={{ background: INK, color: CREAM }}
        >
          {pick(checkout.pay)}
        </div>
        <p className="mt-[9px] text-center text-[10px] text-[#A8A296]">{pick(checkout.safe)}</p>
      </div>
      <HomeIndicator />
    </Screen>
  )
}
