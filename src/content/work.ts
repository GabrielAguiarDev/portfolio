import type { Localized } from "@/i18n/useLocale"

/**
 * Selected work.
 *
 * Every claim here traces back to something the product actually does. There
 * are no invented metrics: the "facts" strip carries verifiable specifics
 * (platforms, stack, role) instead of numbers nobody can check.
 *
 * `screenshot` is the hook for real captures. Leave it undefined and the phone
 * renders `screens` — the interface drawn in code from the feature list below.
 * Drop a file in /public/screens and set the path to swap in the real thing.
 */

export type Layout = "showcase" | "immersive" | "constellation"

export type Beat = {
  label: Localized
  value: Localized
}

export type Project = {
  id: string
  name: string
  /** Sits above the name — one line on what the product is. */
  kind: Localized
  /** The headline of the case study. Short, concrete, no marketing froth. */
  headline: Localized
  /** Two or three sentences maximum. */
  summary: Localized
  role: Localized
  /** Answers: what problem / what I built / what I owned. */
  beats: Beat[]
  stack: string[]
  platforms: string[]
  status: "live" | "building"
  /** Brand colours, used only inside this project's own zone. */
  brand: {
    from: string
    to: string
    /** Foreground that stays legible on `from`. */
    ink: string
  }
  logo?: string
  /** How this case study is composed. Each project gets a different one. */
  layout: Layout
  /** Optional real screenshots, in the order the layout consumes them. */
  screenshots?: string[]
}

export const PROJECTS: Project[] = [
  {
    id: "yago",
    name: "Yago",
    kind: {
      pt: "Mordomo digital para resorts",
      en: "Digital concierge for resorts",
    },
    headline: {
      pt: "Toda a estadia do hóspede em um só lugar.",
      en: "A guest's entire stay, in one place.",
    },
    summary: {
      pt: "Hóspedes de resort perdem tempo procurando horário de restaurante, programação do dia e como reservar uma mesa. O Yago concentra tudo isso no telefone e avisa a pessoa na hora certa.",
      en: "Resort guests waste their stay hunting for restaurant hours, the day's schedule and how to book a table. Yago pulls all of it onto the phone and surfaces it at the right moment.",
    },
    role: {
      pt: "Desenvolvimento mobile — do planejamento ao deploy nas lojas",
      en: "Mobile development — from planning through to store release",
    },
    beats: [
      {
        label: { pt: "O problema", en: "The problem" },
        value: {
          pt: "Informação da estadia espalhada entre recepção, cartazes e papel.",
          en: "Stay information scattered across the front desk, signage and paper.",
        },
      },
      {
        label: { pt: "O que construí", en: "What I built" },
        value: {
          pt: "Programação, reservas de restaurante, favoritos e notificações inteligentes.",
          en: "Daily schedule, restaurant booking, favourites and smart notifications.",
        },
      },
      {
        label: { pt: "Minha responsabilidade", en: "What I owned" },
        value: {
          pt: "Arquitetura, telas, integração com a API, testes, builds e publicação.",
          en: "Architecture, screens, API integration, testing, builds and release.",
        },
      },
    ],
    stack: ["React Native", "TypeScript", "Expo", "React Navigation", "TanStack Query", "Firebase"],
    platforms: ["iOS", "Android"],
    status: "live",
    brand: { from: "#35A8A7", to: "#3758AD", ink: "#F2FBFB" },
    logo: "/yago.png",
    layout: "showcase",
  },
  {
    id: "y-studio",
    name: "Y-Studio",
    kind: {
      pt: "Ecossistema modular para hospitalidade",
      en: "Modular platform for hospitality",
    },
    headline: {
      pt: "Um sistema. Módulos que cada hotel liga do seu jeito.",
      en: "One system. Modules each hotel switches on its own way.",
    },
    summary: {
      pt: "Gestão hoteleira, CRM, CMS, chat e experiência do hóspede funcionando como peças de um mesmo produto — cada operação monta a configuração que precisa, sem virar um sistema à parte.",
      en: "Hotel management, CRM, CMS, chat and guest experience running as parts of one product — each operation assembles the configuration it needs without forking into a separate system.",
    },
    role: {
      pt: "Desenvolvimento frontend — Booking, CRM, CMS e portais internos",
      en: "Frontend development — Booking, CRM, CMS and internal portals",
    },
    beats: [
      {
        label: { pt: "O problema", en: "The problem" },
        value: {
          pt: "Cada operação hoteleira usando ferramentas desconectadas entre si.",
          en: "Every hotel operation running on tools that don't talk to each other.",
        },
      },
      {
        label: { pt: "O que construí", en: "What I built" },
        value: {
          pt: "Interfaces de Booking, CRM, CMS e portais internos em Next.js.",
          en: "Booking, CRM, CMS and internal portal interfaces in Next.js.",
        },
      },
      {
        label: { pt: "Minha responsabilidade", en: "What I owned" },
        value: {
          pt: "Componentização compartilhada entre módulos e performance das telas.",
          en: "A component layer shared across modules, and screen performance.",
        },
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    platforms: ["Web"],
    status: "live",
    brand: { from: "#5F33B4", to: "#8B5CF6", ink: "#F5F1FF" },
    logo: "/y-studio.png",
    layout: "immersive",
  },
  {
    id: "porto-seguro-shopping",
    name: "Porto Seguro Shopping",
    kind: {
      pt: "Comércio de múltiplas lojas no celular",
      en: "Multi-store commerce on the phone",
    },
    headline: {
      pt: "Um shopping inteiro dentro de um aplicativo.",
      en: "An entire shopping centre inside one app.",
    },
    summary: {
      pt: "Promoções, produtos e serviços de lojas diferentes em uma vitrine só. O cliente compra pelo app e acompanha o pedido do pagamento até a entrega.",
      en: "Promotions, products and services from different stores in a single storefront. Customers buy in the app and follow the order from payment to delivery.",
    },
    role: {
      pt: "Desenvolvimento mobile — arquitetura e ciclo completo do app",
      en: "Mobile development — architecture and the app's full cycle",
    },
    beats: [
      {
        label: { pt: "O problema", en: "The problem" },
        value: {
          pt: "Lojistas sem canal digital e clientes sem visibilidade do pedido.",
          en: "Retailers without a digital channel, customers without order visibility.",
        },
      },
      {
        label: { pt: "O que construí", en: "What I built" },
        value: {
          pt: "Vitrine multi-loja, carrinho, checkout e rastreio de pedido.",
          en: "Multi-store storefront, cart, checkout and order tracking.",
        },
      },
      {
        label: { pt: "Minha responsabilidade", en: "What I owned" },
        value: {
          pt: "Estado compartilhado do carrinho e o fluxo de pagamento à entrega.",
          en: "Shared cart state and the payment-to-delivery flow.",
        },
      },
    ],
    stack: ["React Native", "TypeScript", "Zustand", "TanStack Query", "Jest"],
    platforms: ["iOS", "Android"],
    status: "building",
    brand: { from: "#1C1917", to: "#44403C", ink: "#F2EFE9" },
    logo: "/porto-seguro-shopping.webp",
    layout: "constellation",
  },
]
