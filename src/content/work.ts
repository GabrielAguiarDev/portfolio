import type { Localized } from "@/i18n/useLocale"

/**
 * Selected work.
 *
 * Every claim here traces back to something the product actually does. There
 * are no invented metrics: the "facts" strip carries verifiable specifics
 * (platforms, stack, role) instead of numbers nobody can check.
 *
 * Each project owns a page at `/work/<id>`, and the home page carries only the
 * index. The `id` is therefore a public URL — changing one breaks a link that
 * may already be shared, so `useHashScroll` keeps the legacy `/#<id>` deep
 * links working by redirecting them.
 *
 * `figures` is the hook for real captures. Leave a figure's `src` undefined and
 * the frame renders the interface drawn in code for that project. Drop a file
 * in /public/screens and set `src` to swap in the real thing.
 */

export type Layout = "showcase" | "immersive" | "constellation" | "gallery"

export type Beat = {
  label: Localized
  value: Localized
}

/**
 * One device or window in a case study's composition.
 *
 * The bespoke layouts consume figures positionally and fall back to the screen
 * they draw in code. `gallery` renders whatever it is given, in order, which is
 * what lets a project exist before anyone has drawn a screen for it.
 */
export type Figure = {
  /** Capture path, relative to /public. Undefined → the coded screen. */
  src?: string
  /** Chrome drawn around it. Defaults to a phone. */
  frame?: "phone" | "browser"
  /** Address bar contents. Only read when `frame` is "browser". */
  url?: string
  /** Shown under the figure. Layouts that don't caption ignore this. */
  caption?: Localized
  /** Alt text for a real capture. Falls back to the project name. */
  alt?: Localized
}

/**
 * One addressable piece of a product.
 *
 * Every project here turned out to be a system rather than an app: a panel the
 * staff work in, an app the customer holds, a second app for the people serving
 * that customer, an admin nobody outside the company ever sees. Describing any
 * of them as "an app" was throwing away the most substantial thing about the
 * work, and the one that backs the claim the rest of the page makes, that the
 * surface is the least durable decision in a product. Hard to argue that while
 * showing one surface.
 *
 * `audience` is the field that makes a system legible. Two panels look
 * identical in a screenshot and are completely different products once you know
 * one is for a shop owner and the other for the person running the platform.
 */
export type Surface = {
  /** Decides the badge's default label and, later, the frame drawn around it. */
  kind: "web" | "mobile"
  /**
   * Overrides the badge. Use it where the specifics are known and worth saying
   * ("iOS · Android"); leave it off and the badge falls back to the kind.
   */
  platforms?: string[]
  /** What this piece is called inside the system. */
  name: Localized
  /** One line on what it does. */
  purpose: Localized
  /** Who actually opens it. */
  audience: Localized
}

/** Every platform a project touches, deduplicated, in a stable order. */
const PLATFORM_ORDER = ["iOS", "Android", "Web"]

export function platformsOf(project: Project): string[] {
  const found = new Set<string>()

  for (const surface of project.surfaces) {
    const labels = surface.platforms ?? (surface.kind === "web" ? ["Web"] : ["Mobile"])
    for (const label of labels) found.add(label)
  }

  const known = PLATFORM_ORDER.filter((label) => found.has(label))
  const rest = [...found].filter((label) => !PLATFORM_ORDER.includes(label))
  return [...known, ...rest]
}

/**
 * Where the work happened.
 *
 * Three of these were built inside an agency and two were delivered for direct
 * clients, and a visitor reading a case study has no way to tell which is which
 * — the screens look the same either way. It is also the distinction a recruiter
 * actively looks for, so it is a field rather than a footnote.
 *
 * Mirrors `RoleKind` in experience.ts on purpose: the same engagement must not
 * describe itself one way in the work grid and another in the experience
 * section.
 */
export type Context = {
  /** Client or employer, as it should read on the page. */
  company: string
  kind: "employment" | "freelance"
}

export type Project = {
  id: string
  name: string
  /**
   * The business this product belongs to.
   *
   * Counted, distinct, in the Impact section, which is what makes the English
   * string the de facto key: two projects in the same business have to word it
   * identically or they count twice. Keep the vocabulary small on purpose.
   */
  sector: Localized
  /** Sits above the name — one line on what the product is. */
  kind: Localized
  /** The headline of the case study. Short, concrete, no marketing froth. */
  headline: Localized
  /** Two or three sentences maximum. */
  summary: Localized
  role: Localized
  context: Context
  /**
   * The year the work shipped, or the span it ran over. `null` renders
   * nothing rather than a guess — see the same convention in experience.ts.
   */
  year: string | null
  /** Answers: what problem / what I built / what I owned. */
  beats: Beat[]
  stack: string[]
  /**
   * The pieces the product is made of.
   *
   * Replaces a hand-written `platforms` list. That list said "iOS, Android" for
   * a project that also had a web panel behind it, and there was nothing to
   * catch the drift because the two facts lived in different places. It is now
   * derived from this one, by `platformsOf`.
   */
  surfaces: Surface[]
  status: "live" | "building"
  /** Brand colours, used only inside this project's own zone. */
  brand: {
    from: string
    to: string
    /** Foreground that stays legible on `from`. */
    ink: string
  }
  logo?: string
  /** How this case study is composed. */
  layout: Layout
  /** The composition's devices and windows, in the order the layout reads them. */
  figures?: Figure[]
  /**
   * The case study has not been written yet.
   *
   * A draft still gets a row and a page — the structure has to be visible to
   * be worked on — but it is marked as unwritten everywhere it appears, kept
   * out of the production index and flagged in the dev console. Following the
   * same rule as profile.ts: an unfilled value renders as obviously unfilled
   * rather than as plausible copy nobody remembers is fake.
   */
  draft?: boolean
}

/** The placeholder every unwritten field carries. Visible on purpose. */
const TBD: Localized = { pt: "— a preencher —", en: "— to be written —" }

export const PROJECTS: Project[] = [
  {
    id: "yago",
    name: "Yago",
    sector: { pt: "Hotelaria", en: "Hospitality" },
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
      pt: "Arquitetura e desenvolvimento mobile — do planejamento ao deploy nas lojas",
      en: "Architecture and mobile development — from planning through to store release",
    },
    context: { company: "YaaYoo — Fusion Thinking", kind: "employment" },
    year: null, // TODO: add the year this shipped, e.g. "2024"
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
    surfaces: [
      {
        kind: "web",
        name: { pt: "Painel de operação", en: "Operations panel" },
        purpose: {
          pt: "Cadastros, operação do dia a dia e relatórios.",
          en: "Records, day to day operations and reporting.",
        },
        audience: { pt: "Operação do resort", en: "Resort operations" },
      },
      {
        kind: "mobile",
        platforms: ["iOS", "Android"],
        name: { pt: "App do hóspede", en: "Guest app" },
        purpose: {
          pt: "Programação, reservas de restaurante, favoritos e notificações.",
          en: "Daily schedule, restaurant booking, favourites and notifications.",
        },
        audience: { pt: "Hóspedes", en: "Guests" },
      },
      {
        kind: "mobile",
        platforms: ["iOS", "Android"],
        name: { pt: "App da equipe", en: "Staff app" },
        purpose: {
          pt: "Atendimento aos hóspedes durante a estadia.",
          en: "Serving guests through their stay.",
        },
        audience: { pt: "Funcionários do resort", en: "Resort staff" },
      },
    ],
    status: "live",
    brand: { from: "#35A8A7", to: "#3758AD", ink: "#F2FBFB" },
    logo: "/yago.png",
    layout: "showcase",
  },
  {
    id: "y-studio",
    name: "Y-Studio",
    sector: { pt: "Hotelaria", en: "Hospitality" },
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
      pt: "Desenvolvimento web — Booking, CRM, CMS e portais internos",
      en: "Web development — Booking, CRM, CMS and internal portals",
    },
    context: { company: "YaaYoo — Fusion Thinking", kind: "employment" },
    year: null, // TODO: add the year this shipped, e.g. "2023 — 2024"
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
    // TODO: the ecosystem has further modules beyond these four. Add them as
    // their own surfaces, and check the wording of each `purpose` below.
    surfaces: [
      {
        kind: "web",
        name: { pt: "Booking", en: "Booking" },
        purpose: {
          pt: "Reservas, disponibilidade e tarifas.",
          en: "Reservations, availability and rates.",
        },
        audience: { pt: "Operação do hotel", en: "Hotel operations" },
      },
      {
        kind: "web",
        name: { pt: "CRM", en: "CRM" },
        purpose: {
          pt: "Base de hóspedes e o relacionamento com ela.",
          en: "The guest base, and the relationship with it.",
        },
        audience: { pt: "Comercial e recepção", en: "Sales and front desk" },
      },
      {
        kind: "web",
        name: { pt: "CMS", en: "CMS" },
        purpose: {
          pt: "Conteúdo que o site publica, editado pelo próprio hotel.",
          en: "The content the website publishes, edited by the hotel itself.",
        },
        audience: { pt: "Marketing do hotel", en: "Hotel marketing" },
      },
      {
        kind: "web",
        name: { pt: "Site de vendas", en: "Sales website" },
        purpose: {
          pt: "Onde a venda entra. Controlado pelos módulos acima, não por um site à parte.",
          en: "Where the sale comes in. Driven by the modules above, not by a separate site.",
        },
        audience: { pt: "Hóspedes", en: "Guests" },
      },
    ],
    status: "live",
    brand: { from: "#5F33B4", to: "#8B5CF6", ink: "#F5F1FF" },
    logo: "/y-studio.png",
    layout: "immersive",
  },
  {
    id: "porto-seguro-shopping",
    name: "Porto Seguro Shopping",
    sector: { pt: "Varejo", en: "Retail" },
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
      pt: "Arquitetura e desenvolvimento mobile — ciclo completo do app",
      en: "Architecture and mobile development — the app's full cycle",
    },
    context: { company: "YaaYoo — Fusion Thinking", kind: "employment" },
    year: null, // TODO: add the year this shipped, e.g. "2025"
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
    surfaces: [
      {
        kind: "web",
        name: { pt: "Sistema de gestão", en: "Management system" },
        purpose: {
          pt: "Cadastro de lojas e produtos, e os relatórios em cima disso.",
          en: "Store and product records, and the reporting on top of them.",
        },
        audience: { pt: "Administração do shopping", en: "Shopping centre administration" },
      },
      {
        kind: "mobile",
        platforms: ["iOS", "Android"],
        name: { pt: "App do cliente", en: "Customer app" },
        purpose: {
          pt: "Vitrine multi-loja, carrinho, checkout e rastreio do pedido.",
          en: "Multi-store storefront, cart, checkout and order tracking.",
        },
        audience: { pt: "Clientes do shopping", en: "Shopping centre customers" },
      },
    ],
    status: "live",
    brand: { from: "#1C1917", to: "#44403C", ink: "#F2EFE9" },
    logo: "/porto-seguro-shopping.webp",
    layout: "constellation",
  },

  /* ───────────────────────────────────────────────────────────────────────────
     DRAFTS — the two freelance projects.

     Structure only. Every `Localized` field below is the visible placeholder,
     not copy: nothing here should ever reach a visitor as if it were true.
     Fill a project in, delete its `draft: true`, give it a real `id` (that is
     the public URL) and it joins the published index on its own.

     Worth deciding as you fill these in: whether either deserves a bespoke
     composition of its own, the way the three above have. `gallery` is the
     honest default while the screens are captures rather than drawings —
     promoting one later is a one-word change to `layout`.
     ─────────────────────────────────────────────────────────────────────── */
  {
    id: "aguiar-one",
    name: "Aguiar One",
    sector: { pt: "Varejo", en: "Retail" },
    kind: TBD, // TODO: one line on what the product is
    headline: TBD, // TODO: the case study's headline
    summary: TBD, // TODO: two or three sentences — the problem, and what it solves
    role: TBD, // TODO: what exactly you did
    // TODO: the client's name. Pairs with the `freelance-1` role in experience.ts
    context: { company: "Freelance", kind: "freelance" },
    year: null, // TODO
    beats: [
      { label: { pt: "O problema", en: "The problem" }, value: TBD },
      { label: { pt: "O que construí", en: "What I built" }, value: TBD },
      { label: { pt: "Minha responsabilidade", en: "What I owned" }, value: TBD },
    ],
    stack: [], // TODO
    surfaces: [
      {
        kind: "web",
        name: { pt: "Sistema de gestão", en: "Management system" },
        purpose: {
          pt: "Onde a loja administra a própria operação.",
          en: "Where the shop runs its own operation.",
        },
        audience: { pt: "Lojista", en: "Shop owner" },
      },
      {
        kind: "web",
        name: { pt: "Admin", en: "Admin" },
        purpose: {
          pt: "Gestão da plataforma inteira, acima das lojas.",
          en: "Running the platform itself, above the shops.",
        },
        audience: { pt: "Gestor da plataforma", en: "Platform manager" },
      },
      {
        kind: "mobile",
        name: { pt: "App do lojista", en: "Shop owner app" },
        purpose: {
          pt: "Consultar informações e fazer alterações direto do celular.",
          en: "Checking information and making changes straight from the phone.",
        },
        audience: { pt: "Lojista", en: "Shop owner" },
      },
    ],
    status: "live",
    brand: { from: "#3F3F46", to: "#71717A", ink: "#FAFAFA" }, // TODO: the real brand colours
    layout: "gallery",
    figures: [], // TODO: add captures once you have them
    draft: true,
  },
  {
    id: "vez",
    name: "VEZ",
    sector: { pt: "Serviços", en: "Services" },
    kind: TBD, // TODO: one line on what the product is
    headline: TBD, // TODO: the case study's headline
    summary: TBD, // TODO: two or three sentences — the problem, and what it solves
    role: TBD, // TODO: what exactly you did
    // TODO: the client's name. Pairs with the `freelance-2` role in experience.ts
    context: { company: "Freelance", kind: "freelance" },
    year: null, // TODO
    beats: [
      { label: { pt: "O problema", en: "The problem" }, value: TBD },
      { label: { pt: "O que construí", en: "What I built" }, value: TBD },
      { label: { pt: "Minha responsabilidade", en: "What I owned" }, value: TBD },
    ],
    stack: [], // TODO
    surfaces: [
      {
        kind: "web",
        name: { pt: "Agendamentos", en: "Scheduling" },
        purpose: {
          pt: "A agenda de serviços de cada loja, barbearia, clínica e afins.",
          en: "The service calendar of each shop: barbers, clinics and the like.",
        },
        audience: { pt: "Lojas", en: "Shops" },
      },
      {
        kind: "web",
        name: { pt: "Gestão da plataforma", en: "Platform management" },
        purpose: {
          pt: "Administração das lojas dentro da plataforma.",
          en: "Administering the shops inside the platform.",
        },
        audience: { pt: "Dono da plataforma", en: "Platform owner" },
      },
      {
        kind: "mobile",
        name: { pt: "App da loja", en: "Shop app" },
        purpose: {
          pt: "Informações e operações da loja pelo celular.",
          en: "The shop's information and operations from a phone.",
        },
        audience: { pt: "Lojas", en: "Shops" },
      },
      {
        kind: "mobile",
        name: { pt: "App do público", en: "Public app" },
        purpose: {
          pt: "Encontrar a loja e marcar o horário.",
          en: "Finding the shop and booking the slot.",
        },
        audience: { pt: "Quem agenda", en: "People booking" },
      },
    ],
    status: "building",
    brand: { from: "#3F3F46", to: "#71717A", ink: "#FAFAFA" }, // TODO: the real brand colours
    layout: "gallery",
    figures: [], // TODO: add captures once you have them
    draft: true,
  },
]

/**
 * The distinct businesses across a set of projects, in the order met.
 *
 * Named rather than counted. As a figure it read "2", which sits badly next to
 * a nine-figure sum and undersells the point besides: the useful thing is not
 * how many businesses, it is *which* ones, because "hospitality, retail and
 * services" says something a number cannot.
 */
export function sectorNamesOf(projects: Project[]): Localized[] {
  const seen = new Map<string, Localized>()
  for (const project of projects) {
    if (!seen.has(project.sector.en)) seen.set(project.sector.en, project.sector)
  }
  return [...seen.values()]
}

/** Web systems and apps running in production, across a set of projects. */
export function liveSurfacesOf(projects: Project[]): number {
  return projects
    .filter((project) => project.status === "live")
    .reduce((total, project) => total + project.surfaces.length, 0)
}

/** Case studies fit to be read, indexed and shared. */
export const PUBLISHED_PROJECTS = PROJECTS.filter((project) => !project.draft)

export function findProject(id: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.id === id)
}

/** The project after this one, wrapping around. Drafts are never a destination. */
export function nextProject(id: string): Project | undefined {
  const list = PUBLISHED_PROJECTS
  const index = list.findIndex((project) => project.id === id)
  if (index === -1) return list[0]
  return list[(index + 1) % list.length]
}

/**
 * Dev-only reminder, matching the one in profile.ts — the nudge reaches the
 * person who can act on it and never the visitor.
 */
if (import.meta.env.DEV) {
  const drafts = PROJECTS.filter((project) => project.draft).map((project) => project.id)

  if (drafts.length) {
    console.warn(
      `[portfolio] Draft case studies in src/content/work.ts: ${drafts.join(", ")}. ` +
        `They render placeholder copy, are hidden from the index in a production ` +
        `build and carry noindex, until you fill them in and remove \`draft: true\`.`,
    )
  }

  const undated = PROJECTS.filter((project) => project.year === null).map((project) => project.id)

  if (undated.length) {
    console.warn(`[portfolio] Projects with no \`year\` set: ${undated.join(", ")}.`)
  }
}
