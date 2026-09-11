import type { ReactNode } from "react"
import {
  Banknote,
  Boxes,
  ChartColumn,
  ChevronsLeft,
  Download,
  Grid2x2,
  Headphones,
  LayoutGrid,
  LogOut,
  Moon,
  Package,
  Plus,
  Receipt,
  Settings,
  ShoppingCart,
  Store,
  Tags,
  Users,
  Wallet,
} from "lucide-react"

import { useLocale, type Localized } from "@/i18n/useLocale"
import { cn } from "@/lib/utils"

import { HomeIndicator, Screen, StatusBar } from "./chrome"

/**
 * Aguiar One, rebuilt from the product's own screens.
 *
 * A modular back office for small retail — sales, costs, cash drawer, stock —
 * and the only project here that is a *platform with tenants*: shops run the
 * light portal, and a second, darker console above it runs the shops. That
 * pairing is the case study, so both are drawn.
 *
 * Structure, chrome and palette are the product's. Every shop name, figure and
 * date is invented — the captures in /docs/projetos are reference material.
 */

/** The logical width both consoles are authored against. */
export const AGUIAR_WIDTH = 1180

/** The product's teal. It is the only saturated colour either console uses. */
const TEAL = "#3E7E9C"
const TEAL_WASH = "#E8F1F5"
/** The bronze reserved for closing the drawer — the one irreversible action. */
const BRONZE = "#9A6318"
const NAVY = "#0E1F2B"
const NAVY_SOFT = "#16303F"
/** The ground both consoles' pages sit on. Exported for `Miniature`. */
export const AGUIAR_CANVAS = "#F1F4F6"
const CANVAS = AGUIAR_CANVAS
const INK = "#15242E"
const BODY = "#5A6B75"
const MUTED = "#8DA0AB"
const HAIRLINE = "rgba(21,36,46,0.10)"
const GREEN = "#2F855A"
const AMBER = "#B7791F"

/* ──────────────────────────────  SHARED  ────────────────────────────────── */

const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn("rounded-[12px] bg-white", className)}
    style={{ border: `1px solid ${HAIRLINE}` }}
  >
    {children}
  </div>
)

/**
 * The label over every figure in both consoles.
 *
 * Uppercase, tracked out, with a status dot whose colour is the whole point —
 * it is how a shop owner reads the row without reading the words.
 */
const StatLabel = ({ label, dot }: { label: string; dot: string }) => (
  <div className="flex items-center gap-[7px]">
    <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: dot }} />
    <span className="text-[10.5px]" style={{ color: BODY }}>
      {label}
    </span>
  </div>
)

const Stat = ({
  label,
  dot,
  value,
  note,
  tone = INK,
}: {
  label: string
  dot: string
  value: string
  note: string
  tone?: string
}) => (
  <Card className="px-[16px] py-[14px]">
    <StatLabel label={label} dot={dot} />
    <p className="mt-[8px] text-[25px] font-semibold tracking-[-0.03em]" style={{ color: tone }}>
      {value}
    </p>
    <p className="mt-[8px] text-[10px]" style={{ color: MUTED }}>
      {note}
    </p>
  </Card>
)

type NavGroup = {
  heading: Localized
  items: { icon: typeof Users; label: Localized; badge?: string }[]
}

/* ───────────────────────────  THE SHOP'S PORTAL  ────────────────────────── */

const portal = {
  shop: { initials: "BR", name: "Bella Ração", segment: { pt: "PetShop", en: "Pet shop" } satisfies Localized },
  today: { pt: "Vendas de hoje", en: "Sales today" } satisfies Localized,
  todayValue: "R$ 1.482,90",
  drawer: { pt: "Caixa aberto desde 08:15", en: "Drawer open since 8:15am" } satisfies Localized,
  date: { pt: "quinta-feira, 18 de setembro", en: "Thursday, 18 September" } satisfies Localized,
  newSale: { pt: "Nova venda", en: "New sale" } satisfies Localized,
  title: { pt: "Resumo de hoje", en: "Today at a glance" } satisfies Localized,
  greeting: {
    pt: "Boa tarde — quinta-feira, 18 de setembro",
    en: "Good afternoon — Thursday, 18 September",
  } satisfies Localized,
  nav: [
    {
      heading: { pt: "OPERAÇÃO", en: "OPERATIONS" } satisfies Localized,
      items: [
        { icon: Grid2x2, label: { pt: "Dashboard", en: "Dashboard" } satisfies Localized },
        { icon: ShoppingCart, label: { pt: "Vendas", en: "Sales" } satisfies Localized },
        { icon: Wallet, label: { pt: "Caixa", en: "Cash drawer" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "CATÁLOGO", en: "CATALOGUE" } satisfies Localized,
      items: [
        { icon: Tags, label: { pt: "Produtos", en: "Products" } satisfies Localized },
        { icon: Boxes, label: { pt: "Estoque", en: "Stock" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "GESTÃO", en: "MANAGEMENT" } satisfies Localized,
      items: [
        { icon: Receipt, label: { pt: "Custos", en: "Costs" } satisfies Localized },
        { icon: ChartColumn, label: { pt: "Relatórios", en: "Reports" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "SISTEMA", en: "SYSTEM" } satisfies Localized,
      items: [
        { icon: Settings, label: { pt: "Configurações", en: "Settings" } satisfies Localized },
        { icon: Headphones, label: { pt: "Suporte", en: "Support" } satisfies Localized },
      ],
    },
  ] as NavGroup[],
  stats: [
    {
      label: { pt: "Faturamento hoje", en: "Revenue today" } satisfies Localized,
      dot: GREEN,
      value: "R$ 1.482,90",
      note: { pt: "Em 23 vendas", en: "Across 23 sales" } satisfies Localized,
      tone: GREEN,
    },
    {
      label: { pt: "Custos de hoje", en: "Costs today" } satisfies Localized,
      dot: AMBER,
      value: "R$ 386,40",
      note: { pt: "4 lançamentos", en: "4 entries" } satisfies Localized,
    },
    {
      label: { pt: "Lucro hoje", en: "Profit today" } satisfies Localized,
      dot: TEAL,
      value: "R$ 1.096,50",
      note: { pt: "Margem de 74%", en: "74% margin" } satisfies Localized,
      tone: GREEN,
    },
    {
      label: { pt: "Itens vendidos", en: "Items sold" } satisfies Localized,
      dot: INK,
      value: "61",
      note: { pt: "Em 23 vendas", en: "Across 23 sales" } satisfies Localized,
    },
  ],
  second: [
    {
      label: { pt: "Faturamento do mês", en: "Revenue this month" } satisfies Localized,
      dot: INK,
      value: "R$ 24.318,70",
      note: { pt: "Custos: R$ 7.204,10", en: "Costs: R$ 7,204.10" } satisfies Localized,
    },
    {
      label: { pt: "Caixa", en: "Cash drawer" } satisfies Localized,
      dot: GREEN,
      value: { pt: "Aberto", en: "Open" } satisfies Localized,
      note: { pt: "Troco inicial R$ 200,00", en: "Float R$ 200.00" } satisfies Localized,
    },
  ],
  stock: { pt: "Estoque baixo", en: "Low stock" } satisfies Localized,
  stockValue: { pt: "3 itens", en: "3 items" } satisfies Localized,
  stockNote: { pt: "Repor antes do fim de semana", en: "Restock before the weekend" } satisfies Localized,
  chart: { pt: "Vendas dos últimos 7 dias", en: "Sales, last 7 days" } satisfies Localized,
  chartNote: {
    pt: "Valores em R$ · média R$ 1.190 / dia",
    en: "In R$ · average R$ 1,190 / day",
  } satisfies Localized,
  days: [
    { day: { pt: "SEX", en: "FRI" } satisfies Localized, value: 62, label: "R$ 980" },
    { day: { pt: "SÁB", en: "SAT" } satisfies Localized, value: 96, label: "R$ 1.520" },
    { day: { pt: "DOM", en: "SUN" } satisfies Localized, value: 41, label: "R$ 650" },
    { day: { pt: "SEG", en: "MON" } satisfies Localized, value: 74, label: "R$ 1.170" },
    { day: { pt: "TER", en: "TUE" } satisfies Localized, value: 68, label: "R$ 1.080" },
    { day: { pt: "QUA", en: "WED" } satisfies Localized, value: 88, label: "R$ 1.390" },
    { day: { pt: "QUI", en: "THU" } satisfies Localized, value: 94, label: "R$ 1.482" },
  ],
  recent: { pt: "Últimas vendas", en: "Latest sales" } satisfies Localized,
  recentNote: { pt: "Hoje · 23 vendas", en: "Today · 23 sales" } satisfies Localized,
  recentColumns: [
    { pt: "HORA", en: "TIME" } satisfies Localized,
    { pt: "ITENS", en: "ITEMS" } satisfies Localized,
    { pt: "PAGAMENTO", en: "PAYMENT" } satisfies Localized,
    { pt: "VALOR", en: "AMOUNT" } satisfies Localized,
  ],
  sales: [
    { at: "10:52", what: { pt: "1× Ração premium 15kg", en: "1× Premium dog food 15kg" } satisfies Localized, how: { pt: "Cartão de crédito", en: "Credit card" } satisfies Localized, value: "R$ 189,90" },
    { at: "10:20", what: { pt: "1× Banho & tosa · 1× Shampoo", en: "1× Bath & groom · 1× Shampoo" } satisfies Localized, how: { pt: "Pix", en: "Pix" } satisfies Localized, value: "R$ 102,00" },
    { at: "09:48", what: { pt: "2× Areia higiênica 4kg", en: "2× Cat litter 4kg" } satisfies Localized, how: { pt: "Dinheiro", en: "Cash" } satisfies Localized, value: "R$ 57,00" },
    { at: "09:15", what: { pt: "1× Consulta veterinária", en: "1× Vet consultation" } satisfies Localized, how: { pt: "Cartão de débito", en: "Debit card" } satisfies Localized, value: "R$ 120,00" },
  ],
  shortcuts: { pt: "Atalhos", en: "Shortcuts" } satisfies Localized,
  actions: [
    { code: "NV", label: { pt: "Nova venda", en: "New sale" } satisfies Localized },
    { code: "CU", label: { pt: "Registrar custo", en: "Log a cost" } satisfies Localized },
    { code: "CX", label: { pt: "Fechar caixa", en: "Close drawer" } satisfies Localized },
    { code: "ET", label: { pt: "Ajustar estoque", en: "Adjust stock" } satisfies Localized },
  ],
}

/**
 * The portal a shop actually works in.
 *
 * Leads on "Resumo de hoje" because that is the product's own promise, stated
 * on its marketing page: see the day's result without opening a spreadsheet.
 * Revenue, cost and profit sit on one row for the same reason — a till total
 * on its own is the number that misleads a small shop.
 */
export const AguiarPortal = () => {
  const { pick } = useLocale()

  return (
    <div className="flex" style={{ background: CANVAS, color: INK, width: AGUIAR_WIDTH }}>
      <aside
        className="flex w-[214px] shrink-0 flex-col bg-white pb-[14px]"
        style={{ borderRight: `1px solid ${HAIRLINE}` }}
      >
        <div
          className="flex items-center gap-[10px] px-[16px] py-[14px]"
          style={{ borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <span
            className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] text-[11px] font-bold text-white"
            style={{ background: NAVY }}
          >
            {portal.shop.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-semibold tracking-[-0.01em]">
              {portal.shop.name}
            </p>
            <p className="mt-[1px] text-[9.5px]" style={{ color: MUTED }}>
              {pick(portal.shop.segment)}
            </p>
          </div>
          <ChevronsLeft size={13} strokeWidth={2.2} style={{ color: MUTED }} />
        </div>

        <nav className="mt-[14px] flex-1">
          {portal.nav.map((group, groupIndex) => (
            <div key={group.heading.en} className={groupIndex ? "mt-[16px]" : undefined}>
              <p
                className="px-[18px] pb-[6px] text-[8.5px] font-semibold tracking-[0.16em]"
                style={{ color: MUTED }}
              >
                {pick(group.heading)}
              </p>
              {group.items.map((item, index) => {
                const on = groupIndex === 0 && index === 0
                return (
                  <div
                    key={item.label.en}
                    className="relative mx-[10px] flex items-center gap-[11px] rounded-[9px] px-[10px] py-[9px]"
                    style={{
                      background: on ? TEAL_WASH : "transparent",
                      color: on ? TEAL : INK,
                    }}
                  >
                    {on ? (
                      <span
                        className="absolute -left-[10px] top-1/2 h-[22px] w-[3px] -translate-y-1/2 rounded-r-[2px]"
                        style={{ background: TEAL }}
                      />
                    ) : null}
                    <item.icon size={15} strokeWidth={1.9} className="shrink-0" />
                    <span className="text-[12px] font-medium tracking-[-0.01em]">
                      {pick(item.label)}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        <div
          className="mt-[14px] flex items-center gap-[10px] px-[16px] pt-[12px]"
          style={{ borderTop: `1px solid ${HAIRLINE}` }}
        >
          <span
            className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[10px] font-semibold"
            style={{ background: TEAL_WASH, color: TEAL }}
          >
            G
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11.5px] font-medium">Gabriel</p>
            <p className="text-[9.5px]" style={{ color: MUTED }}>
              {pick({ pt: "Sair", en: "Sign out" })}
            </p>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div
          className="flex items-center gap-[14px] bg-white px-[24px] py-[13px]"
          style={{ borderBottom: `1px solid ${HAIRLINE}` }}
        >
          <span className="text-[11px]" style={{ color: BODY }}>
            {pick(portal.today)}
          </span>
          <span className="text-[17px] font-semibold tracking-[-0.02em]">{portal.todayValue}</span>
          <span
            className="ml-[6px] flex items-center gap-[6px] rounded-full px-[10px] py-[5px] text-[10px]"
            style={{ background: "#E7F4EC", color: GREEN }}
          >
            <span className="h-[6px] w-[6px] rounded-full" style={{ background: GREEN }} />
            {pick(portal.drawer)}
          </span>
          <span className="text-[10.5px]" style={{ color: BODY }}>
            {pick(portal.date)}
          </span>

          <div className="ml-auto flex items-center gap-[10px]">
            <span
              className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]"
              style={{ border: `1px solid ${HAIRLINE}` }}
            >
              <Moon size={14} strokeWidth={1.9} style={{ color: BODY }} />
            </span>
            <span
              className="flex items-center gap-[7px] rounded-[9px] px-[14px] py-[9px]"
              style={{ background: TEAL }}
            >
              <Plus size={13} strokeWidth={2.4} className="text-white" />
              <span className="text-[11.5px] font-semibold text-white">{pick(portal.newSale)}</span>
            </span>
          </div>
        </div>

        <div className="px-[24px] py-[20px]">
          <p className="text-[21px] font-semibold tracking-[-0.03em]">{pick(portal.title)}</p>
          <p className="mt-[3px] text-[11px]" style={{ color: BODY }}>
            {pick(portal.greeting)}
          </p>

          <div className="mt-[16px] grid grid-cols-4 gap-[12px]">
            {portal.stats.map((stat) => (
              <Stat
                key={stat.label.en}
                label={pick(stat.label)}
                dot={stat.dot}
                value={stat.value}
                note={pick(stat.note)}
                tone={stat.tone}
              />
            ))}
          </div>

          <div className="mt-[12px] grid grid-cols-[1fr_1fr_1.4fr] gap-[12px]">
            {portal.second.map((stat) => (
              <Stat
                key={stat.label.en}
                label={pick(stat.label)}
                dot={stat.dot}
                value={typeof stat.value === "string" ? stat.value : pick(stat.value)}
                note={pick(stat.note)}
              />
            ))}
            <Card className="flex items-center justify-between px-[16px] py-[14px]">
              <div>
                <StatLabel label={pick(portal.stock)} dot={AMBER} />
                <p className="mt-[8px] text-[10px]" style={{ color: MUTED }}>
                  {pick(portal.stockNote)}
                </p>
              </div>
              <p className="text-[21px] font-semibold tracking-[-0.02em]" style={{ color: AMBER }}>
                {pick(portal.stockValue)}
              </p>
            </Card>
          </div>

          <div className="mt-[12px] grid grid-cols-[1.9fr_1fr] gap-[12px]">
            <Card className="px-[18px] py-[16px]">
              <div className="flex items-baseline justify-between">
                <p className="text-[14px] font-semibold tracking-[-0.02em]">{pick(portal.chart)}</p>
                <span className="text-[9.5px]" style={{ color: MUTED }}>
                  {pick(portal.chartNote)}
                </span>
              </div>

              <div className="mt-[16px] flex h-[128px] items-end gap-[14px]">
                {portal.days.map((entry, index) => (
                  <div key={entry.day.en} className="flex flex-1 flex-col items-center gap-[7px]">
                    <span className="text-[8.5px] font-medium" style={{ color: MUTED }}>
                      {entry.label}
                    </span>
                    <div
                      className="w-full rounded-t-[4px]"
                      style={{
                        height: entry.value,
                        background: index === portal.days.length - 1 ? TEAL : `${TEAL}4D`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-[8px] flex gap-[14px]">
                {portal.days.map((entry) => (
                  <span
                    key={entry.day.en}
                    className="flex-1 text-center text-[9px] font-medium"
                    style={{ color: BODY }}
                  >
                    {pick(entry.day)}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="px-[18px] py-[16px]">
              <p className="text-[14px] font-semibold tracking-[-0.02em]">
                {pick(portal.shortcuts)}
              </p>
              <div className="mt-[12px] grid grid-cols-2 gap-[10px]">
                {portal.actions.map((action) => (
                  <div
                    key={action.code}
                    className="rounded-[10px] px-[11px] py-[10px]"
                    style={{ border: `1px solid ${HAIRLINE}` }}
                  >
                    <span
                      className="text-[9px] font-bold tracking-[0.08em]"
                      style={{ color: TEAL }}
                    >
                      {action.code}
                    </span>
                    <p className="mt-[6px] text-[10.5px] font-medium">{pick(action.label)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="mt-[12px] px-[18px] py-[16px]">
            <div className="flex items-baseline justify-between">
              <p className="text-[14px] font-semibold tracking-[-0.02em]">{pick(portal.recent)}</p>
              <span className="text-[9.5px]" style={{ color: MUTED }}>
                {pick(portal.recentNote)}
              </span>
            </div>

            <div
              className="mt-[12px] grid grid-cols-[60px_1fr_180px_110px] pb-[7px]"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              {portal.recentColumns.map((column) => (
                <span
                  key={column.en}
                  className="text-[8.5px] font-semibold tracking-[0.12em]"
                  style={{ color: MUTED }}
                >
                  {pick(column)}
                </span>
              ))}
            </div>

            {portal.sales.map((sale) => (
              <div
                key={sale.at}
                className="grid grid-cols-[60px_1fr_180px_110px] items-center py-[9px]"
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <span className="text-[10.5px]" style={{ color: MUTED }}>
                  {sale.at}
                </span>
                <span className="text-[11px] font-medium">{pick(sale.what)}</span>
                <span className="text-[10.5px]" style={{ color: BODY }}>
                  {pick(sale.how)}
                </span>
                <span className="text-[11px] font-semibold">{sale.value}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────  THE PLATFORM CONSOLE  ─────────────────────── */

const admin = {
  title: { pt: "Visão Geral", en: "Overview" } satisfies Localized,
  note: {
    pt: "Resumo da operação do Aguiar One em setembro de 2026",
    en: "Aguiar One's operation in September 2026",
  } satisfies Localized,
  date: "18 set 2026",
  nav: [
    {
      heading: { pt: "GESTÃO", en: "MANAGEMENT" } satisfies Localized,
      items: [
        { icon: LayoutGrid, label: { pt: "Visão Geral", en: "Overview" } satisfies Localized },
        { icon: Users, label: { pt: "Clientes", en: "Customers" } satisfies Localized, badge: "9" },
        { icon: Banknote, label: { pt: "Financeiro", en: "Finance" } satisfies Localized },
        { icon: Headphones, label: { pt: "Suporte", en: "Support" } satisfies Localized, badge: "2" },
      ],
    },
    {
      heading: { pt: "CATÁLOGO", en: "CATALOGUE" } satisfies Localized,
      items: [
        { icon: ChartColumn, label: { pt: "Planos", en: "Plans" } satisfies Localized },
        { icon: Package, label: { pt: "Módulos", en: "Modules" } satisfies Localized },
        { icon: Store, label: { pt: "Vitrine", en: "Storefront" } satisfies Localized },
      ],
    },
    {
      heading: { pt: "SISTEMA", en: "SYSTEM" } satisfies Localized,
      items: [{ icon: Settings, label: { pt: "Configurações", en: "Settings" } satisfies Localized }],
    },
  ] as NavGroup[],
  revenue: { pt: "RECEITA MENSAL", en: "MONTHLY REVENUE" } satisfies Localized,
  revenueValue: "R$ 1.340",
  revenueNote: { pt: "9 clientes cobráveis", en: "9 billable customers" } satisfies Localized,
  stats: [
    {
      label: { pt: "MRR", en: "MRR" } satisfies Localized,
      chip: "9/9",
      value: "R$ 1.340",
      note: { pt: "9 clientes com mensalidade", en: "9 customers on a plan" } satisfies Localized,
      dot: GREEN,
    },
    {
      label: { pt: "CLIENTES ATIVOS", en: "ACTIVE CUSTOMERS" } satisfies Localized,
      chip: "100%",
      value: "9",
      note: { pt: "0 em risco de churn", en: "0 at churn risk" } satisfies Localized,
      dot: "#C05621",
    },
    {
      label: { pt: "NOVOS NO MÊS", en: "NEW THIS MONTH" } satisfies Localized,
      chip: "+2",
      value: "2",
      note: { pt: "Bella Ração e Casa Verde", en: "Bella Ração and Casa Verde" } satisfies Localized,
      dot: MUTED,
    },
    {
      label: { pt: "CHAMADOS ABERTOS", en: "OPEN TICKETS" } satisfies Localized,
      chip: "2",
      value: "2",
      note: { pt: "2 em andamento agora", en: "2 in progress now" } satisfies Localized,
      dot: TEAL,
    },
  ],
  recent: { pt: "Clientes recentes", en: "Recent customers" } satisfies Localized,
  seeAll: { pt: "Ver todos →", en: "See all →" } satisfies Localized,
  columns: [
    { pt: "NEGÓCIO", en: "BUSINESS" } satisfies Localized,
    { pt: "SEGMENTO", en: "SEGMENT" } satisfies Localized,
    { pt: "PLANO", en: "PLAN" } satisfies Localized,
    { pt: "CADASTRO", en: "JOINED" } satisfies Localized,
  ],
  customers: [
    {
      initials: "BR",
      name: "Bella Ração",
      modules: { pt: "8 de 9 módulos ativos", en: "8 of 9 modules active" } satisfies Localized,
      segment: { pt: "PetShop", en: "Pet shop" } satisfies Localized,
      plan: { pt: "Customizado", en: "Custom" } satisfies Localized,
      joined: "21/08/2026",
    },
    {
      initials: "CV",
      name: "Casa Verde",
      modules: { pt: "6 de 9 módulos ativos", en: "6 of 9 modules active" } satisfies Localized,
      segment: { pt: "Hortifrúti", en: "Greengrocer" } satisfies Localized,
      plan: { pt: "Essencial", en: "Essential" } satisfies Localized,
      joined: "04/09/2026",
    },
    {
      initials: "MT",
      name: "Mercado Tavares",
      modules: { pt: "9 de 9 módulos ativos", en: "9 of 9 modules active" } satisfies Localized,
      segment: { pt: "Alimentação", en: "Food" } satisfies Localized,
      plan: { pt: "Completo", en: "Complete" } satisfies Localized,
      joined: "12/09/2026",
    },
    {
      initials: "AT",
      name: "Ateliê da Rosa",
      modules: { pt: "5 de 9 módulos ativos", en: "5 of 9 modules active" } satisfies Localized,
      segment: { pt: "Vestuário", en: "Clothing" } satisfies Localized,
      plan: { pt: "Essencial", en: "Essential" } satisfies Localized,
      joined: "15/09/2026",
    },
    {
      initials: "PS",
      name: "Padaria do Sol",
      modules: { pt: "6 de 9 módulos ativos", en: "6 of 9 modules active" } satisfies Localized,
      segment: { pt: "Alimentação", en: "Food" } satisfies Localized,
      plan: { pt: "Essencial", en: "Essential" } satisfies Localized,
      joined: "16/09/2026",
    },
    {
      initials: "FB",
      name: "Ferragens Bonfim",
      modules: { pt: "7 de 9 módulos ativos", en: "7 of 9 modules active" } satisfies Localized,
      segment: { pt: "Construção", en: "Hardware" } satisfies Localized,
      plan: { pt: "Completo", en: "Complete" } satisfies Localized,
      joined: "17/09/2026",
    },
  ],
  adoption: { pt: "Adoção de módulos", en: "Module adoption" } satisfies Localized,
  adoptionNote: { pt: "Clientes com o módulo ativo", en: "Customers with the module on" } satisfies Localized,
  modules: [
    { label: { pt: "Vendas", en: "Sales" } satisfies Localized, of: 9, on: 9 },
    { label: { pt: "Caixa", en: "Cash drawer" } satisfies Localized, of: 9, on: 9 },
    { label: { pt: "Produtos", en: "Products" } satisfies Localized, of: 9, on: 9 },
    { label: { pt: "Custos", en: "Costs" } satisfies Localized, of: 9, on: 8 },
    { label: { pt: "Estoque", en: "Stock" } satisfies Localized, of: 9, on: 7 },
    { label: { pt: "Relatórios", en: "Reports" } satisfies Localized, of: 9, on: 6 },
    { label: { pt: "App mobile", en: "Mobile app" } satisfies Localized, of: 9, on: 5 },
    { label: { pt: "Suporte", en: "Support" } satisfies Localized, of: 9, on: 9 },
    { label: { pt: "Vitrine pública", en: "Public storefront" } satisfies Localized, of: 9, on: 4 },
    { label: { pt: "Fiado", en: "Store credit" } satisfies Localized, of: 9, on: 3 },
    { label: { pt: "Fiscal / NFC-e", en: "Tax receipts" } satisfies Localized, of: 9, on: 2 },
    { label: { pt: "Fidelidade", en: "Loyalty" } satisfies Localized, of: 9, on: 2 },
  ],
  exportCsv: { pt: "Exportar CSV", en: "Export CSV" } satisfies Localized,
}

/**
 * The console above the shops.
 *
 * The dark shell is the product's own way of saying "you are not in a shop's
 * data any more" — and the reason this project is a platform rather than an
 * app. The module adoption list is the most telling panel on it: it is the
 * modular claim, measured.
 */
export const AguiarAdmin = () => {
  const { pick } = useLocale()

  return (
    <div className="flex" style={{ background: CANVAS, color: INK, width: AGUIAR_WIDTH }}>
      <aside className="flex w-[214px] shrink-0 flex-col pb-[14px]" style={{ background: NAVY }}>
        <div className="flex items-center gap-[9px] px-[16px] py-[15px]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2.5 21 20h-4.4L12 10.4 7.4 20H3l9-17.5Z" fill={TEAL} />
          </svg>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold tracking-[-0.01em] text-white">
              Aguiar <span style={{ color: TEAL }}>One</span>
            </p>
            <p
              className="mt-[1px] text-[7.5px] font-semibold tracking-[0.18em]"
              style={{ color: "#7D97A5" }}
            >
              CONSOLE ADMIN
            </p>
          </div>
        </div>

        <nav className="mt-[10px] flex-1">
          {admin.nav.map((group, groupIndex) => (
            <div key={group.heading.en} className={groupIndex ? "mt-[16px]" : undefined}>
              <p
                className="px-[18px] pb-[6px] text-[8.5px] font-semibold tracking-[0.16em]"
                style={{ color: "#5F7885" }}
              >
                {pick(group.heading)}
              </p>
              {group.items.map((item, index) => {
                const on = groupIndex === 0 && index === 0
                return (
                  <div
                    key={item.label.en}
                    className="relative mx-[10px] flex items-center gap-[11px] rounded-[9px] px-[10px] py-[9px]"
                    style={{ background: on ? NAVY_SOFT : "transparent" }}
                  >
                    {on ? (
                      <span
                        className="absolute -left-[10px] top-1/2 h-[22px] w-[3px] -translate-y-1/2 rounded-r-[2px]"
                        style={{ background: TEAL }}
                      />
                    ) : null}
                    <item.icon
                      size={15}
                      strokeWidth={1.9}
                      className="shrink-0"
                      style={{ color: on ? TEAL : "#9DB2BD" }}
                    />
                    <span
                      className="flex-1 text-[12px] font-medium tracking-[-0.01em]"
                      style={{ color: on ? "#FFFFFF" : "#C7D5DC" }}
                    >
                      {pick(item.label)}
                    </span>
                    {item.badge ? (
                      <span
                        className="rounded-full px-[6px] py-[1px] text-[8.5px] font-semibold"
                        style={{ background: NAVY_SOFT, color: "#9DB2BD" }}
                      >
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                )
              })}
            </div>
          ))}
        </nav>

        <div
          className="mx-[12px] mt-[14px] rounded-[11px] px-[13px] py-[12px]"
          style={{ background: NAVY_SOFT }}
        >
          <p
            className="text-[8.5px] font-semibold tracking-[0.16em]"
            style={{ color: "#7D97A5" }}
          >
            {pick(admin.revenue)}
          </p>
          <p className="mt-[5px] text-[19px] font-semibold tracking-[-0.03em] text-white">
            {admin.revenueValue}
          </p>
          <p className="mt-[3px] text-[9px]" style={{ color: TEAL }}>
            {pick(admin.revenueNote)}
          </p>
        </div>

        <div className="mt-[12px] flex items-center gap-[10px] px-[16px]">
          <span
            className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] text-[9.5px] font-semibold"
            style={{ background: NAVY_SOFT, color: "#C7D5DC" }}
          >
            RA
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-white">Gabriel Aguiar</p>
            <p className="text-[9px]" style={{ color: "#7D97A5" }}>
              {pick({ pt: "Sair", en: "Sign out" })}
            </p>
          </div>
          <LogOut size={13} strokeWidth={1.9} style={{ color: "#7D97A5" }} />
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-[24px] py-[18px]">
        <div className="flex items-start">
          <div>
            <p className="text-[21px] font-semibold tracking-[-0.03em]">{pick(admin.title)}</p>
            <p className="mt-[3px] text-[11px]" style={{ color: BODY }}>
              {pick(admin.note)}
            </p>
          </div>
          <span className="ml-auto text-[10.5px] tracking-[0.04em]" style={{ color: MUTED }}>
            {admin.date}
          </span>
        </div>

        <div className="mt-[16px] grid grid-cols-4 gap-[12px]">
          {admin.stats.map((stat) => (
            <Card key={stat.label.en} className="px-[16px] py-[14px]">
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-semibold tracking-[0.12em]"
                  style={{ color: BODY }}
                >
                  {pick(stat.label)}
                </span>
                <span
                  className="rounded-full px-[7px] py-[2px] text-[8.5px] font-semibold"
                  style={{ background: TEAL_WASH, color: TEAL }}
                >
                  {stat.chip}
                </span>
              </div>
              <p className="mt-[9px] text-[25px] font-semibold tracking-[-0.03em]">{stat.value}</p>
              <div className="mt-[9px]">
                <StatLabel label={pick(stat.note)} dot={stat.dot} />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-[12px] grid grid-cols-[1.35fr_1fr] gap-[12px]">
          <Card className="px-[18px] py-[16px]">
            <div className="flex items-baseline justify-between">
              <p className="text-[14px] font-semibold tracking-[-0.02em]">{pick(admin.recent)}</p>
              <span className="text-[10px] font-medium" style={{ color: TEAL }}>
                {pick(admin.seeAll)}
              </span>
            </div>

            <div
              className="mt-[13px] grid grid-cols-[1.6fr_1fr_0.9fr_0.9fr] pb-[8px]"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              {admin.columns.map((column) => (
                <span
                  key={column.en}
                  className="text-[8.5px] font-semibold tracking-[0.12em]"
                  style={{ color: MUTED }}
                >
                  {pick(column)}
                </span>
              ))}
            </div>

            {admin.customers.map((customer) => (
              <div
                key={customer.name}
                className="grid grid-cols-[1.6fr_1fr_0.9fr_0.9fr] items-center py-[11px]"
                style={{ borderBottom: `1px solid ${HAIRLINE}` }}
              >
                <div className="flex items-center gap-[9px]">
                  <span
                    className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[8px] text-[9px] font-semibold"
                    style={{ background: TEAL_WASH, color: TEAL }}
                  >
                    {customer.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-medium">{customer.name}</p>
                    <p className="text-[9px]" style={{ color: MUTED }}>
                      {pick(customer.modules)}
                    </p>
                  </div>
                </div>
                <span className="text-[10.5px]" style={{ color: BODY }}>
                  {pick(customer.segment)}
                </span>
                <span>
                  <span
                    className="rounded-full px-[8px] py-[3px] text-[9px] font-medium"
                    style={{ background: TEAL_WASH, color: TEAL }}
                  >
                    {pick(customer.plan)}
                  </span>
                </span>
                <span className="text-[10.5px]" style={{ color: BODY }}>
                  {customer.joined}
                </span>
              </div>
            ))}
          </Card>

          <Card className="px-[18px] py-[16px]">
            <p className="text-[14px] font-semibold tracking-[-0.02em]">{pick(admin.adoption)}</p>
            <p className="mt-[3px] text-[10px]" style={{ color: BODY }}>
              {pick(admin.adoptionNote)}
            </p>

            <div className="mt-[13px] space-y-[9px]">
              {admin.modules.map((module) => (
                <div key={module.label.en}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] font-medium">{pick(module.label)}</span>
                    <span className="text-[9.5px]" style={{ color: MUTED }}>
                      {module.on}/{module.of}
                    </span>
                  </div>
                  <div
                    className="mt-[4px] h-[5px] overflow-hidden rounded-full"
                    style={{ background: TEAL_WASH }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(module.on / module.of) * 100}%`, background: TEAL }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-[14px] flex items-center justify-center gap-[7px] rounded-[9px] py-[8px]"
              style={{ border: `1px solid ${HAIRLINE}` }}
            >
              <Download size={12} strokeWidth={2} style={{ color: BODY }} />
              <span className="text-[10.5px] font-medium" style={{ color: BODY }}>
                {pick(admin.exportCsv)}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────  THE SHOP IN A POCKET  ─────────────────────── */

const app = {
  greeting: { pt: "Bom dia, Marina", en: "Good morning, Marina" } satisfies Localized,
  shop: { pt: "Bella Ração · quinta, 18 de setembro", en: "Bella Ração · Thursday 18 September" } satisfies Localized,
  today: { pt: "Vendas de hoje", en: "Sales today" } satisfies Localized,
  amount: "1.482,90",
  counts: {
    sales: { pt: "vendas", en: "sales" } satisfies Localized,
    items: { pt: "itens", en: "items" } satisfies Localized,
    ticket: { pt: "ticket", en: "avg" } satisfies Localized,
  },
  left: { pt: "Sobrou hoje", en: "Left today" } satisfies Localized,
  leftValue: "R$ 1.096,50",
  leftNote: { pt: "depois dos custos", en: "after costs" } satisfies Localized,
  best: { pt: "Mais vendido", en: "Best seller" } satisfies Localized,
  bestValue: { pt: "Ração premium 15kg", en: "Premium dog food 15kg" } satisfies Localized,
  bestNote: { pt: "6 unidades hoje", en: "6 sold today" } satisfies Localized,
  drawer: { pt: "Caixa aberto", en: "Drawer open" } satisfies Localized,
  drawerNote: { pt: "Na gaveta agora: R$ 968,40", en: "In the drawer now: R$ 968.40" } satisfies Localized,
  see: { pt: "Ver", en: "View" } satisfies Localized,
  alert: { pt: "3 produtos precisando de atenção", en: "3 products need attention" } satisfies Localized,
  alertNote: {
    pt: "Sachê gato salmão zerou · coleira antipulgas está baixa",
    en: "Salmon cat pouch is out · flea collar is low",
  } satisfies Localized,
  recent: { pt: "Últimas vendas", en: "Latest sales" } satisfies Localized,
  recentWhen: { pt: "hoje", en: "today" } satisfies Localized,
  sales: [
    {
      at: "10:52",
      what: { pt: "1× Ração premium 15kg", en: "1× Premium dog food 15kg" } satisfies Localized,
      how: { pt: "Cartão de crédito", en: "Credit card" } satisfies Localized,
      value: "R$ 189,90",
    },
    {
      at: "10:20",
      what: { pt: "1× Banho & tosa · 1× Shampoo", en: "1× Bath & groom · 1× Shampoo" } satisfies Localized,
      how: { pt: "Pix", en: "Pix" } satisfies Localized,
      value: "R$ 102,00",
    },
    {
      at: "09:48",
      what: { pt: "2× Areia higiênica 4kg", en: "2× Cat litter 4kg" } satisfies Localized,
      how: { pt: "Dinheiro", en: "Cash" } satisfies Localized,
      value: "R$ 57,00",
    },
  ],
  tabs: [
    { icon: Grid2x2, label: { pt: "Início", en: "Home" } satisfies Localized },
    { icon: Tags, label: { pt: "Produtos", en: "Products" } satisfies Localized },
    { icon: ShoppingCart, label: { pt: "Vender", en: "Sell" } satisfies Localized, primary: true },
    { icon: Wallet, label: { pt: "Caixa", en: "Drawer" } satisfies Localized },
    { icon: Boxes, label: { pt: "Mais", en: "More" } satisfies Localized },
  ],
}

/**
 * The third surface: the same shop, on the counter.
 *
 * Deliberately not a shrunken portal. It answers the two questions a shop owner
 * has while standing at the till — what have I taken today, and what is left
 * after costs — and puts *selling* in the middle of the tab bar as a raised
 * button, because that is the thing being done while the phone is in hand.
 *
 * Its figures agree with the portal's on purpose: same day, same shop, one
 * operation seen from two places. Two surfaces of one product quoting different
 * numbers is the detail that gives away a mockup.
 */
export const AguiarApp = () => {
  const { pick } = useLocale()

  return (
    <Screen style={{ background: CANVAS }}>
      <StatusBar />

      <div className="flex shrink-0 items-start gap-[10px] px-[18px] pt-[2px]">
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-bold tracking-[-0.02em]" style={{ color: INK }}>
            {pick(app.greeting)}
          </p>
          <p className="mt-[2px] truncate text-[10px]" style={{ color: BODY }}>
            {pick(app.shop)}
          </p>
        </div>
        <span
          className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-semibold"
          style={{ color: BODY, border: `1px solid ${HAIRLINE}` }}
        >
          M
        </span>
      </div>

      <div className="min-h-0 flex-1 space-y-[10px] overflow-hidden px-[18px] pt-[12px]">
        <div className="rounded-[14px] bg-white p-[14px]">
          <p className="text-[10.5px]" style={{ color: BODY }}>
            {pick(app.today)}
          </p>
          <p className="mt-[4px] flex items-baseline gap-[4px]">
            <span className="text-[13px] font-medium" style={{ color: BODY }}>
              R$
            </span>
            <span className="text-[28px] font-bold tracking-[-0.04em]" style={{ color: INK }}>
              {app.amount}
            </span>
          </p>
          <div className="my-[11px] h-px" style={{ background: HAIRLINE }} />
          <div className="flex items-baseline gap-[14px] text-[10px]" style={{ color: BODY }}>
            <span>
              <b style={{ color: INK }}>23</b> {pick(app.counts.sales)}
            </span>
            <span>
              <b style={{ color: INK }}>61</b> {pick(app.counts.items)}
            </span>
            <span>
              {pick(app.counts.ticket)} <b style={{ color: INK }}>R$ 64,47</b>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[10px]">
          <div className="rounded-[14px] bg-white p-[13px]">
            <p className="text-[10px]" style={{ color: BODY }}>
              {pick(app.left)}
            </p>
            <p className="mt-[5px] text-[18px] font-bold tracking-[-0.03em]" style={{ color: GREEN }}>
              {app.leftValue}
            </p>
            <p className="mt-[5px] text-[9px]" style={{ color: MUTED }}>
              {pick(app.leftNote)}
            </p>
          </div>
          <div className="rounded-[14px] bg-white p-[13px]">
            <p className="text-[10px]" style={{ color: BODY }}>
              {pick(app.best)}
            </p>
            <p className="mt-[5px] text-[12px] font-bold leading-[1.25]" style={{ color: INK }}>
              {pick(app.bestValue)}
            </p>
            <p className="mt-[5px] text-[9px]" style={{ color: MUTED }}>
              {pick(app.bestNote)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[11px] rounded-[14px] bg-white p-[13px]">
          <Wallet size={17} strokeWidth={1.9} className="shrink-0" style={{ color: TEAL }} />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold" style={{ color: INK }}>
              {pick(app.drawer)}
            </p>
            <p className="mt-[1px] truncate text-[9.5px]" style={{ color: BODY }}>
              {pick(app.drawerNote)}
            </p>
          </div>
          <span className="shrink-0 text-[11px] font-medium" style={{ color: TEAL }}>
            {pick(app.see)}
          </span>
        </div>

        <div className="flex items-start gap-[11px] rounded-[14px] bg-white p-[13px]">
          <span
            className="mt-[1px] flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
            style={{ border: `1.5px solid ${AMBER}`, color: AMBER }}
          >
            !
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold leading-tight" style={{ color: INK }}>
              {pick(app.alert)}
            </p>
            <p className="mt-[3px] text-[9.5px] leading-[1.35]" style={{ color: BODY }}>
              {pick(app.alertNote)}
            </p>
          </div>
        </div>

        <div className="rounded-[14px] bg-white p-[13px]">
          <div className="flex items-baseline justify-between">
            <p className="text-[11.5px] font-semibold" style={{ color: INK }}>
              {pick(app.recent)}
            </p>
            <span className="text-[9.5px]" style={{ color: MUTED }}>
              {pick(app.recentWhen)}
            </span>
          </div>
          <div className="mt-[8px] space-y-[8px]">
            {app.sales.map((sale) => (
              <div key={sale.at} className="flex items-start gap-[10px]">
                <span className="w-[30px] shrink-0 text-[9.5px]" style={{ color: MUTED }}>
                  {sale.at}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10.5px] font-medium" style={{ color: INK }}>
                    {pick(sale.what)}
                  </p>
                  <p className="text-[9px]" style={{ color: MUTED }}>
                    {pick(sale.how)}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] font-semibold" style={{ color: INK }}>
                  {sale.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        The tab bar, with selling raised out of it.

        Four destinations and one *action*: the raised button is not navigation,
        it is the job. A shop owner holding this phone at the counter is almost
        always mid-sale, and burying that behind a tab would be the difference
        between a till and a report.
      */}
      <div
        className="relative flex shrink-0 items-start justify-around bg-white px-[10px] pb-[4px] pt-[10px]"
        style={{ borderTop: `1px solid ${HAIRLINE}` }}
      >
        {app.tabs.map((tab, index) =>
          tab.primary ? (
            <div key={tab.label.en} className="flex w-[56px] flex-col items-center">
              <span
                className="-mt-[24px] flex h-[42px] w-[42px] items-center justify-center rounded-full shadow-[0_6px_14px_rgba(56,122,132,0.35)]"
                style={{ background: TEAL }}
              >
                <tab.icon size={19} strokeWidth={2} className="text-white" />
              </span>
              <span className="mt-[5px] text-[9px] font-medium" style={{ color: TEAL }}>
                {pick(tab.label)}
              </span>
            </div>
          ) : (
            <div key={tab.label.en} className="flex w-[56px] flex-col items-center gap-[4px]">
              <tab.icon
                size={17}
                strokeWidth={1.9}
                style={{ color: index === 0 ? TEAL : MUTED }}
              />
              <span
                className="text-[9px] font-medium"
                style={{ color: index === 0 ? TEAL : MUTED }}
              >
                {pick(tab.label)}
              </span>
            </div>
          ),
        )}
      </div>
      <HomeIndicator />
    </Screen>
  )
}
