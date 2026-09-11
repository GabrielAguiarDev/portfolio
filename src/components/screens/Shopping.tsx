import type { ReactNode } from "react"
import {
  ChevronLeft,
  CircleUserRound,
  Grid2x2,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Tags,
  Trash2,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { HomeIndicator, Screen, ScrollFade, StatusBar } from "./chrome"
import { Fragment } from "./fragments"

/**
 * Porto Seguro Shopping, rebuilt from the product's own screens.
 *
 * The app is the shopping centre's official marketplace, and each retailer
 * inside it gets its own storefront — the one these screens are taken from
 * sells wine. That detail matters more than it looks: the case study claims
 * many stores in one app, and a storefront this specific (countries, vintages,
 * bottles sold per SKU) is only possible because the catalogue belongs to the
 * retailer rather than to the mall.
 *
 * Structure, chrome and palette are the product's. Every label, vintage, price
 * and unit count is invented, and the bottles are drawn rather than
 * photographed — there is no product photography to ship here, and a stand-in
 * silhouette is the honest substitute.
 */

const INK = "#111111"
const BODY = "#3F3F3F"
const MUTED = "#8A8A8A"
const LINE = "#E4E4E4"
/** The storefront's own copper, off the retailer's wordmark. */
const COPPER = "#A04717"
/** The panel every total and price footer sits on. */
const PANEL = "#E9E9E9"
const DISCOUNT = "#E0313B"

/* ─────────────────────────────  DRAWN ASSETS  ───────────────────────────── */

type Country = "br" | "pt" | "it" | "fr" | "es" | "cl"

/**
 * The country a bottle comes from, drawn rather than loaded.
 *
 * Origin is the storefront's primary axis — it is the first filter on the home
 * screen and a chip on every single product — so these are content, not
 * decoration. Six flags of flat geometry cost nothing; six flag images would
 * be six requests inside a case study that has to stay light.
 */
const FLAGS: Record<Country, ReactNode> = {
  br: (
    <>
      <span className="absolute inset-0 bg-[#009B3A]" />
      <span className="absolute left-1/2 top-1/2 h-[62%] w-auto -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#FEDF00] [aspect-ratio:1]" />
      <span className="absolute left-1/2 top-1/2 h-[32%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#002776] [aspect-ratio:1]" />
    </>
  ),
  pt: (
    <>
      <span className="absolute inset-y-0 left-0 w-[40%] bg-[#006600]" />
      <span className="absolute inset-y-0 right-0 w-[60%] bg-[#DA291C]" />
      <span className="absolute left-[40%] top-1/2 h-[52%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.2px] border-[#FFE900] bg-[#006600] [aspect-ratio:1]" />
    </>
  ),
  it: (
    <>
      <span className="absolute inset-y-0 left-0 w-1/3 bg-[#009246]" />
      <span className="absolute inset-y-0 left-1/3 w-1/3 bg-white" />
      <span className="absolute inset-y-0 right-0 w-1/3 bg-[#CE2B37]" />
    </>
  ),
  fr: (
    <>
      <span className="absolute inset-y-0 left-0 w-1/3 bg-[#002395]" />
      <span className="absolute inset-y-0 left-1/3 w-1/3 bg-white" />
      <span className="absolute inset-y-0 right-0 w-1/3 bg-[#ED2939]" />
    </>
  ),
  es: (
    <>
      <span className="absolute inset-0 bg-[#AA151B]" />
      <span className="absolute inset-x-0 top-1/4 h-1/2 bg-[#F1BF00]" />
    </>
  ),
  cl: (
    <>
      <span className="absolute inset-0 bg-white" />
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[#D52B1E]" />
      <span className="absolute left-0 top-0 h-1/2 w-[36%] bg-[#0039A6]" />
      <span className="absolute left-[18%] top-[25%] h-[18%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-full bg-white [aspect-ratio:1]" />
    </>
  ),
}

const Flag = ({ country, className }: { country: Country; className?: string }) => (
  <span className={cn("relative block overflow-hidden", className)} aria-hidden="true">
    {FLAGS[country]}
  </span>
)

type BottleStyle = {
  glass: string
  capsule: string
  label: string
  ink: string
}

/** The six bottle treatments the catalogue actually needs. */
const BOTTLES: Record<string, BottleStyle> = {
  sparkling: { glass: "#26331F", capsule: "#C8A24A", label: "#F2EDE0", ink: "#26331F" },
  champagne: { glass: "#2F2C1B", capsule: "#D8B24A", label: "#E8C05A", ink: "#4A3B12" },
  white: { glass: "#63722F", capsule: "#8FBF4A", label: "#F6F3E7", ink: "#3F4A1C" },
  rose: { glass: "#E4A9AE", capsule: "#C98D93", label: "#FCF4F4", ink: "#8A5A5F" },
  red: { glass: "#241216", capsule: "#7A1B22", label: "#EFE7D8", ink: "#241216" },
  amber: { glass: "#8E7B45", capsule: "#C9B27A", label: "#F8F4E9", ink: "#5A4B22" },
}

/**
 * A bottle, drawn to the proportions of a 750ml Bordeaux.
 *
 * Stands in for product photography. It is deliberately a silhouette with a
 * blank label rather than an attempt at a specific wine — a drawn imitation of
 * a real producer's bottle would be a worse kind of placeholder than an
 * obvious one.
 */
const Bottle = ({ variant, className }: { variant: keyof typeof BOTTLES; className?: string }) => {
  const style = BOTTLES[variant]

  return (
    <svg viewBox="0 0 48 162" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`glass-${variant}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={style.glass} stopOpacity="0.82" />
          <stop offset="34%" stopColor={style.glass} />
          <stop offset="72%" stopColor={style.glass} stopOpacity="0.9" />
          <stop offset="100%" stopColor={style.glass} stopOpacity="0.68" />
        </linearGradient>
      </defs>

      <path
        d="M19 12h10v40c0 6 9 12 9 28v72a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6V80c0-16 9-22 9-28V12Z"
        fill={`url(#glass-${variant})`}
      />
      <rect x="18" y="6" width="12" height="22" rx="2" fill={style.capsule} />
      <rect x="18" y="24" width="12" height="3" fill="rgba(0,0,0,0.18)" />
      <rect x="11" y="96" width="26" height="40" rx="1.5" fill={style.label} />
      <rect x="14" y="104" width="20" height="2.6" rx="1.3" fill={style.ink} opacity="0.7" />
      <rect x="16" y="111" width="16" height="2" rx="1" fill={style.ink} opacity="0.45" />
      <rect x="14" y="126" width="20" height="2" rx="1" fill={style.ink} opacity="0.35" />
      {/* The single highlight that stops the silhouette reading as a flat shape. */}
      <rect x="14" y="60" width="3" height="80" rx="1.5" fill="white" opacity="0.16" />
    </svg>
  )
}

/* ────────────────────────────────  CHROME  ──────────────────────────────── */

/**
 * The retailer's wordmark.
 *
 * A storefront inside the mall's app carries the shop's identity, not the
 * mall's — which is exactly the structural point of the product, and why this
 * belongs in the top bar while "Porto Seguro Shopping" is relegated to the
 * footer band.
 */
const StoreMark = () => (
  <div className="flex items-center gap-[5px]">
    <svg width="17" height="15" viewBox="0 0 20 18" fill="none" aria-hidden="true">
      <path
        d="M10 1.4c2.6 0 4.6 1 6.2 2.6 1.4 1.4 2.2 3 2.4 4.2-1.6-.6-3-.6-4.4-.2 1 1.2 1.4 2.6 1.2 4.2-1.2-1-2.6-1.6-4.2-1.6l-1.2 5.8H9L7.8 10.6c-1.6 0-3 .6-4.2 1.6-.2-1.6.2-3 1.2-4.2-1.4-.4-2.8-.4-4.4.2.2-1.2 1-2.8 2.4-4.2C4.4 2.4 6.4 1.4 10 1.4Z"
        fill={COPPER}
      />
    </svg>
    <div className="leading-none">
      <p className="text-[13px] font-semibold italic tracking-[-0.02em]" style={{ color: COPPER }}>
        il DiVino
      </p>
      <p
        className="mt-[1.5px] text-[4.5px] font-semibold tracking-[0.32em]"
        style={{ color: COPPER }}
      >
        WINE BAR
      </p>
    </div>
  </div>
)

const TopBar = ({
  bagCount,
  showBrowse = false,
}: {
  bagCount?: number
  showBrowse?: boolean
}) => (
  <div
    className="flex h-[46px] shrink-0 items-center justify-between px-[16px]"
    style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}
  >
    <StoreMark />
    <div className="flex items-center gap-[13px]" aria-hidden="true">
      {showBrowse ? <Grid2x2 size={16} strokeWidth={1.8} style={{ color: INK }} /> : null}
      <MapPin size={16} strokeWidth={1.8} style={{ color: INK }} />
      <div className="relative">
        <ShoppingBag size={16} strokeWidth={1.8} style={{ color: INK }} />
        {bagCount ? (
          <span
            className="absolute -bottom-[4px] -right-[4px] flex h-[11px] w-[11px] items-center justify-center rounded-full text-[6.5px] font-bold text-white"
            style={{ background: INK }}
          >
            {bagCount}
          </span>
        ) : null}
      </div>
      <CircleUserRound size={16} strokeWidth={1.8} style={{ color: INK }} />
    </div>
  </div>
)

/** The band that says whose marketplace this storefront is inside. */
const MallFooter = () => {
  const { pick } = useLocale()

  return (
    <div className="shrink-0 pb-[2px] pt-[7px]">
      <p
        className="text-center text-[6.5px] font-semibold tracking-[0.26em]"
        style={{ color: BODY }}
      >
        {pick({ pt: "MARKETPLACE OFICIAL", en: "OFFICIAL MARKETPLACE" })}
      </p>
      <p
        className="mt-[3px] text-center text-[9px] font-bold tracking-[0.06em]"
        style={{ color: COPPER }}
      >
        PORTO SEGURO
        <span className="ml-[3px] text-[6px] font-semibold tracking-[0.2em]">SHOPPING</span>
      </p>
    </div>
  )
}

/** "Vendido 88 unidades" — the storefront puts it under every single title. */
const SoldCount = ({ units, size = 8 }: { units: number; size?: number }) => {
  const { pick } = useLocale()

  return (
    <div className="flex items-center gap-[4px]">
      <ShoppingBag size={size + 1} strokeWidth={1.9} style={{ color: MUTED }} />
      <span className="text-[8px]" style={{ color: MUTED }}>
        {pick({ pt: `Vendido ${units} unidades`, en: `${units} units sold` })}
      </span>
    </div>
  )
}

/**
 * A price, in the two forms the storefront uses.
 *
 * With `was` it is the discount form: struck original, percentage off, then
 * "Por" and the price. Without, just the price. The "un" suffix is on both,
 * because everything in the catalogue is sold by the bottle.
 */
const Price = ({
  price,
  was,
  off,
  scale = 1,
}: {
  price: string
  was?: string
  off?: string
  scale?: number
}) => {
  const { pick } = useLocale()

  return (
    <div>
      {was ? (
        <p className="flex items-baseline gap-[4px]" style={{ fontSize: 8 * scale }}>
          <span style={{ color: BODY }}>{pick({ pt: "De", en: "Was" })}</span>
          <span className="line-through" style={{ color: BODY }}>
            {was}
          </span>
          <span className="font-semibold" style={{ color: DISCOUNT }}>
            ({off})
          </span>
        </p>
      ) : null}
      <p className="flex items-baseline gap-[3px]">
        {was ? (
          <span style={{ fontSize: 8 * scale, color: BODY }}>
            {pick({ pt: "Por", en: "Now" })}
          </span>
        ) : null}
        <span
          className="font-bold tracking-[-0.02em]"
          style={{ fontSize: 13 * scale, color: INK }}
        >
          {price}
        </span>
        <span style={{ fontSize: 7 * scale, color: BODY }}>un</span>
      </p>
    </div>
  )
}

const SectionHead = ({ title }: { title: string }) => {
  const { pick } = useLocale()

  return (
    <div className="flex items-baseline justify-between">
      <p className="text-[14.5px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
        {title}
      </p>
      <span className="text-[6.5px] font-semibold tracking-[0.16em]" style={{ color: BODY }}>
        {pick({ pt: "VER TODOS", en: "SEE ALL" })}
      </span>
    </div>
  )
}

/* ─────────────────────────────  THE CATALOGUE  ──────────────────────────── */

const catalogue = {
  countries: [
    { code: "br" as Country, label: { pt: "Brasil", en: "Brazil" } satisfies Localized },
    { code: "fr" as Country, label: { pt: "França", en: "France" } satisfies Localized },
    { code: "it" as Country, label: { pt: "Itália", en: "Italy" } satisfies Localized },
    { code: "pt" as Country, label: { pt: "Portugal", en: "Portugal" } satisfies Localized },
    { code: "es" as Country, label: { pt: "Espanha", en: "Spain" } satisfies Localized },
    { code: "cl" as Country, label: { pt: "Chile", en: "Chile" } satisfies Localized },
  ],
  offers: [
    {
      name: "Casa Bruma Espumante BRUT DOC",
      country: "it" as Country,
      bottle: "sparkling" as const,
      units: 58,
      price: "R$ 148,00",
      was: "R$ 168,00",
      off: "-12%",
    },
    {
      name: "Maison Clairval BRUT CHAMPAGNE",
      country: "fr" as Country,
      bottle: "champagne" as const,
      units: 31,
      price: "R$ 592,00",
    },
  ],
  bestSellers: [
    {
      name: "Quinta do Cais Alvarinho MM DOC, 2024",
      country: "pt" as Country,
      bottle: "white" as const,
      units: 88,
      price: "R$ 298,00",
    },
    {
      name: "Ribera del Sol Rosé RIOJA DOC, 2023",
      country: "es" as Country,
      bottle: "rose" as const,
      units: 71,
      price: "R$ 164,00",
    },
    {
      name: "Valle Antiguo Reserva Ribera DO, 2018",
      country: "es" as Country,
      bottle: "red" as const,
      units: 63,
      price: "R$ 356,00",
    },
    {
      name: "Monteluce Isolano BIANCO ETNA DOC, 2022",
      country: "it" as Country,
      bottle: "amber" as const,
      units: 45,
      price: "R$ 442,00",
    },
  ],
}

const home = {
  hero: {
    country: "br" as Country,
    flag: { pt: "BRASIL", en: "BRAZIL" } satisfies Localized,
    brand: "Terra Alta",
    body: {
      pt: "Desperte seus sentidos,\nviva a experiência",
      en: "Wake up your senses,\nlive the experience",
    } satisfies Localized,
  },
  countries: { pt: "Países", en: "Countries" } satisfies Localized,
  offers: { pt: "Ofertas Especiais", en: "Special Offers" } satisfies Localized,
  bestSellers: { pt: "Mais Vendidos", en: "Best Sellers" } satisfies Localized,
}

/**
 * The storefront.
 *
 * Everything on it is addressed by origin first and price second, which is the
 * catalogue's own logic and the reason the country rail sits above the offers
 * rather than inside a filter sheet.
 */
export const ShoppingHome = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <StatusBar />
      <TopBar showBrowse />

      <ScrollFade>
        <div className="px-[16px] pt-[11px]">
          <div
            className="relative h-[128px] overflow-hidden rounded-[10px]"
            style={{ background: "linear-gradient(112deg,#3B0C0E 0%,#5F1416 46%,#8A1E22 100%)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_88%_20%,rgba(255,255,255,0.16),transparent_58%)]" />

            {/* The producer's bottles, angled into the corner the way the
                storefront's own campaign art does. */}
            <div className="absolute -bottom-[8px] right-[10px] flex items-end gap-[2px]">
              <Bottle variant="red" className="h-[102px] w-[30px] opacity-90" />
              <Bottle variant="red" className="h-[118px] w-[34px]" />
              <Bottle variant="red" className="h-[96px] w-[28px] opacity-85" />
            </div>

            <div className="absolute left-[13px] top-[12px] flex items-center gap-[5px]">
              <Flag country={home.hero.country} className="h-[10px] w-[14px] rounded-[2px]" />
              <span className="text-[6.5px] font-semibold tracking-[0.18em] text-white/85">
                {pick(home.hero.flag)}
              </span>
            </div>

            <div className="absolute bottom-[26px] left-[13px]">
              <p className="text-[14.5px] font-bold tracking-[-0.02em] text-white">
                {home.hero.brand}
              </p>
              <p className="mt-[4px] whitespace-pre-line text-[9px] leading-[1.4] text-white/85">
                {pick(home.hero.body)}
              </p>
            </div>

            <div className="absolute bottom-[12px] left-[13px] flex items-center gap-[4px]">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-[2px] rounded-full"
                  style={{
                    width: dot === 0 ? 16 : 10,
                    background: dot === 0 ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-[16px] pt-[14px]">
          <SectionHead title={pick(home.countries)} />
          <div className="mt-[10px] flex gap-[10px]">
            {catalogue.countries.map((country) => (
              <div key={country.code} className="flex w-[46px] shrink-0 flex-col items-center">
                <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#F1F1F1]">
                  <Flag country={country.code} className="h-[24px] w-[24px] rounded-full" />
                </span>
                <span
                  className="mt-[5px] text-[8.5px] font-semibold"
                  style={{ color: INK }}
                >
                  {pick(country.label)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[16px] pt-[14px]">
          <SectionHead title={pick(home.offers)} />
          <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
            {catalogue.offers.map((offer) => (
              <div key={offer.name}>
                <div
                  className="relative flex h-[104px] items-end justify-center rounded-[8px] bg-gradient-to-b from-white to-[#FAFAFA]"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <Flag
                    country={offer.country}
                    className="absolute left-[7px] top-[7px] h-[13px] w-[19px] rounded-[2px]"
                  />
                  <Bottle variant={offer.bottle} className="mb-[7px] h-[86px] w-[25px]" />
                </div>
                <p
                  className="mt-[7px] text-[9.5px] font-medium leading-[1.3]"
                  style={{ color: INK }}
                >
                  {offer.name}
                </p>
                <div className="mt-[4px]">
                  <SoldCount units={offer.units} />
                </div>
                <div className="mt-[5px]">
                  <Price price={offer.price} was={offer.was} off={offer.off} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[16px] pt-[14px]">
          <SectionHead title={pick(home.bestSellers)} />
          <div className="mt-[10px] space-y-[10px]">
            {catalogue.bestSellers.map((wine) => (
              <div key={wine.name} className="flex items-center gap-[11px]">
                <div
                  className="relative flex h-[68px] w-[56px] shrink-0 items-end justify-center rounded-[8px] bg-gradient-to-b from-white to-[#FAFAFA]"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <Flag
                    country={wine.country}
                    className="absolute left-[5px] top-[5px] h-[10px] w-[14px] rounded-[2px]"
                  />
                  <Bottle variant={wine.bottle} className="mb-[5px] h-[54px] w-[16px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9.5px] font-medium leading-[1.3]" style={{ color: INK }}>
                    {wine.name}
                  </p>
                  <div className="mt-[3px]">
                    <SoldCount units={wine.units} />
                  </div>
                  <div className="mt-[3px]">
                    <Price price={wine.price} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollFade>

      <MallFooter />
      <HomeIndicator />
    </Screen>
  )
}

/* ── The product ───────────────────────────────────────────────────────────── */

const product = {
  name: "Quinta do Cais Alvarinho MM DOC, 2024",
  country: "pt" as Country,
  bottle: "white" as const,
  units: 88,
  price: "R$ 298,00",
  was: "R$ 338,00",
  off: "-12%",
  producer: { pt: "Grupo Quinta do Cais", en: "Quinta do Cais Group" } satisfies Localized,
  description: { pt: "Descrição", en: "Description" } satisfies Localized,
  body: {
    pt: "Aromas intensos, cítricos e florais, com notas de frutas tropicais. Apresenta boa acidez e termina com notas minerais num longo final de boca.",
    en: "Intense citrus and floral aromas with tropical fruit notes. Good acidity, closing on minerals through a long finish.",
  } satisfies Localized,
  pairing: {
    pt: "Harmonização: frutos do mar, peixes grelhados, camarão e ceviche.",
    en: "Pairs with: seafood, grilled fish, prawns and ceviche.",
  } satisfies Localized,
  add: { pt: "ADICIONAR À SACOLA", en: "ADD TO BAG" } satisfies Localized,
}

/**
 * The product page — where the sale is actually decided.
 *
 * The price block and the button are pinned to the bottom rather than sitting
 * at the end of the copy, which is the product's own decision and the right
 * one: the description runs long enough that a reader would otherwise have to
 * scroll back up to buy.
 */
export const ShoppingProduct = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <StatusBar />
      <TopBar />

      <div className="flex h-[32px] shrink-0 items-center px-[16px]">
        <ChevronLeft size={19} strokeWidth={2.2} style={{ color: INK }} />
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="px-[16px]">
          <div
            className="relative flex h-[204px] items-center justify-center rounded-[10px] bg-gradient-to-b from-white to-[#FAFAFA]"
            style={{ border: `1px solid ${LINE}` }}
          >
            <Flag
              country={product.country}
              className="absolute left-[10px] top-[10px] h-[16px] w-[23px] rounded-[3px]"
            />
            <Bottle variant={product.bottle} className="h-[164px] w-[48px]" />
            <div className="absolute bottom-[10px] left-1/2 flex -translate-x-1/2 items-center gap-[5px]">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="h-[4px] w-[4px] rounded-full"
                  style={{ background: dot === 0 ? INK : "#D4D4D4" }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="px-[16px] pt-[13px]">
          <p
            className="text-[15px] font-bold leading-[1.25] tracking-[-0.02em]"
            style={{ color: INK }}
          >
            {product.name}
          </p>
          <div className="mt-[5px]">
            <SoldCount units={product.units} />
          </div>

          <p className="mt-[13px] text-[11.5px] font-bold" style={{ color: INK }}>
            {pick(product.description)}
          </p>
          <p className="mt-[6px] text-[9.5px] leading-[1.5]" style={{ color: BODY }}>
            {pick(product.body)}
          </p>
          <p className="mt-[8px] text-[9.5px] leading-[1.5]" style={{ color: BODY }}>
            {pick(product.pairing)}
          </p>

          <div className="mt-[13px] flex flex-col items-center">
            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#F1F1F1]">
              <Tags size={14} strokeWidth={1.9} style={{ color: BODY }} />
            </span>
            <p
              className="mt-[5px] max-w-[110px] text-center text-[8.5px] font-bold leading-[1.3]"
              style={{ color: INK }}
            >
              {pick(product.producer)}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex shrink-0 items-center justify-between px-[16px] py-[11px]"
        style={{ background: PANEL }}
      >
        <Price price={product.price} was={product.was} off={product.off} scale={1.05} />
        <div className="flex items-center gap-[6px] rounded-[7px] px-[13px] py-[9px]" style={{ background: INK }}>
          <ShoppingBag size={13} strokeWidth={1.9} className="text-white" />
          <span className="max-w-[62px] text-[8.5px] font-bold leading-[1.2] text-white">
            {pick(product.add)}
          </span>
        </div>
      </div>

      <MallFooter />
      <HomeIndicator />
    </Screen>
  )
}

/* ── The bag ───────────────────────────────────────────────────────────────── */

const cart = {
  timer: { pt: "Tempo restante:", en: "Time remaining:" } satisfies Localized,
  clock: "17m42s",
  title: { pt: "Carrinho", en: "Bag" } satisfies Localized,
  addMore: { pt: "Adicionar mais produtos", en: "Add more products" } satisfies Localized,
  total: { pt: "Total Sacola", en: "Bag total" } satisfies Localized,
  amount: "R$ 726,00",
  review: { pt: "REVISAR PEDIDO", en: "REVIEW ORDER" } satisfies Localized,
  items: [
    {
      name: "Quinta do Cais Alvarinho MM DOC, 2024",
      country: "pt" as Country,
      bottle: "white" as const,
      price: "R$ 298,00",
      quantity: 1,
    },
    {
      name: "Pardal Vinho Verde DOC",
      country: "pt" as Country,
      bottle: "white" as const,
      price: "R$ 92,00",
      quantity: 1,
      /** Mid-swipe, with the delete action exposed. */
      swiped: true,
    },
    {
      name: "Monteluce Superior Branco DOURO D.O.C., 2023",
      country: "it" as Country,
      bottle: "amber" as const,
      price: "R$ 336,00",
      was: "R$ 372,00",
      off: "-10%",
      quantity: 1,
    },
  ],
}

/**
 * The bag, held under a countdown.
 *
 * The copper timer bar is the screen's most consequential detail and the one
 * that would be easiest to leave out: a reservation on stock the retailer only
 * holds for a few minutes. It changes what the screen *is* — not a saved list,
 * a claim with an expiry — so it stays.
 *
 * The middle row is drawn mid-swipe with its delete action exposed. A cart
 * screenshot with three tidy rows says nothing about how you remove one.
 */
export const ShoppingCart = () => {
  const { pick } = useLocale()

  return (
    <Screen className="bg-white">
      <StatusBar />
      <TopBar bagCount={3} />

      <div
        className="flex h-[22px] shrink-0 items-center justify-center gap-[4px]"
        style={{ background: COPPER }}
      >
        <span className="text-[8.5px] text-white">{pick(cart.timer)}</span>
        <span className="text-[9.5px] font-bold text-white">{cart.clock}</span>
      </div>

      <div className="flex h-[30px] shrink-0 items-center px-[16px]">
        <ChevronLeft size={19} strokeWidth={2.2} style={{ color: INK }} />
      </div>

      <p
        className="shrink-0 px-[16px] text-[19px] font-bold tracking-[-0.03em]"
        style={{ color: INK }}
      >
        {pick(cart.title)}
      </p>

      <div className="min-h-0 flex-1 overflow-hidden pt-[12px]">
        {cart.items.map((item) => (
          <div key={item.name} className="relative overflow-hidden">
            {item.swiped ? (
              <div
                className="absolute inset-y-[4px] right-0 flex w-[54px] items-center justify-center rounded-l-[10px]"
                style={{ background: "#DD2E44" }}
              >
                <Trash2 size={17} strokeWidth={2} className="text-white" />
              </div>
            ) : null}

            <div
              className="flex items-center gap-[11px] px-[16px] py-[9px]"
              style={{ transform: item.swiped ? "translateX(-46px)" : undefined }}
            >
              <div
                className="relative flex h-[66px] w-[54px] shrink-0 items-end justify-center rounded-[8px] bg-gradient-to-b from-white to-[#FAFAFA]"
                style={{ border: `1px solid ${LINE}` }}
              >
                <Flag
                  country={item.country}
                  className="absolute left-[5px] top-[5px] h-[10px] w-[14px] rounded-[2px]"
                />
                <Bottle variant={item.bottle} className="mb-[5px] h-[52px] w-[16px]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[9.5px] font-medium leading-[1.3]" style={{ color: INK }}>
                  {item.name}
                </p>
                <div className="mt-[4px]">
                  <Price price={item.price} was={item.was} off={item.off} />
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-[7px]">
                <span
                  className="flex h-[17px] w-[17px] items-center justify-center rounded-full"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  <Minus size={9} strokeWidth={2.4} style={{ color: MUTED }} />
                </span>
                <span className="text-[10px] font-medium" style={{ color: INK }}>
                  {item.quantity}
                </span>
                <span
                  className="flex h-[17px] w-[17px] items-center justify-center rounded-full"
                  style={{ border: `1px solid ${INK}` }}
                >
                  <Plus size={9} strokeWidth={2.4} style={{ color: INK }} />
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-[12px]">
          <div
            className="flex items-center justify-center rounded-full px-[20px] py-[9px]"
            style={{ border: `1px solid ${INK}` }}
          >
            <span className="text-[9.5px] font-bold" style={{ color: INK }}>
              {pick(cart.addMore)}
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex shrink-0 items-center justify-between rounded-t-[16px] px-[16px] py-[13px]"
        style={{ background: PANEL }}
      >
        <div>
          <p className="text-[8.5px]" style={{ color: BODY }}>
            {pick(cart.total)}
          </p>
          <p className="mt-[2px] flex items-baseline gap-[3px]">
            <span className="text-[16px] font-bold tracking-[-0.03em]" style={{ color: INK }}>
              {cart.amount}
            </span>
            <span className="text-[7px]" style={{ color: BODY }}>
              un
            </span>
          </p>
        </div>

        <div
          className="flex items-center gap-[7px] rounded-full px-[15px] py-[10px]"
          style={{ background: INK }}
        >
          <ShoppingBag size={13} strokeWidth={1.9} className="text-white" />
          <span className="max-w-[54px] text-[8.5px] font-bold leading-[1.2] text-white">
            {pick(cart.review)}
          </span>
        </div>
      </div>

      <MallFooter />
      <HomeIndicator />
    </Screen>
  )
}

/* ───────────────────────  FRAGMENTS, OUTSIDE A PHONE  ────────────────────── */

/**
 * The two moments the app exists to own, and the two a storefront screenshot
 * cannot show: the push that brings somebody back, and the state of an order
 * once the shop has stopped being a website and become a delivery.
 */
export const ShoppingPromoCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint={`linear-gradient(135deg, ${COPPER}, #5F1416)`}
      mark={<Tags size={8} strokeWidth={2.6} className="text-white" />}
      eyebrow={pick({ pt: "OFERTA", en: "OFFER" })}
      badge="24h"
      badgeBg="#F5E3D6"
      badgeInk={COPPER}
      title={pick({ pt: "Casa Bruma BRUT com 12% off", en: "12% off Casa Bruma BRUT" })}
      body={pick({
        pt: "il DiVino · termina amanhã às 23h59",
        en: "il DiVino · ends tomorrow at 11:59pm",
      })}
    />
  )
}

export const ShoppingOrderCard = () => {
  const { pick } = useLocale()

  return (
    <Fragment
      tint={`linear-gradient(135deg, #44403C, ${INK})`}
      mark={<ShoppingBag size={8} strokeWidth={2.6} className="text-white" />}
      eyebrow={pick({ pt: "PEDIDO #2481", en: "ORDER #2481" })}
      badge={pick({ pt: "A caminho", en: "On its way" })}
      badgeBg="#CFE8D6"
      badgeInk="#2F7A45"
      title={pick({ pt: "Chega hoje, entre 18h e 20h", en: "Arrives today, 6–8pm" })}
      body={pick({ pt: "3 itens · 2 lojas · R$ 726,00", en: "3 items · 2 stores · R$ 726.00" })}
    />
  )
}
