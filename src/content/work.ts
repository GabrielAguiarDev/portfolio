import type { Localized } from "@/i18n/useLocale"


export type Layout = "stage" | "gallery"

export type Beat = {
  label: Localized
  value: Localized
}

export type Figure = {
  src?: string
  frame?: "phone" | "browser"
  url?: string
  caption?: Localized
  alt?: Localized
}

export type Surface = {
  kind: "web" | "mobile"
  platforms?: string[]
  name: Localized
  purpose: Localized
  audience: Localized
}

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

export type Context = {
  company: string
  kind: "employment" | "freelance"
}

export type Project = {
  id: string
  name: string
  sector: Localized
  kind: Localized
  headline: Localized
  summary: Localized
  role: Localized
  context: Context
  year: string | null
  beats: Beat[]
  stack: string[]
  surfaces: Surface[]
  status: "live" | "building"
  brand: {
    from: string
    to: string
    ink: string
    surface?: string
  }
  logo?: string
  layout: Layout
  figures?: Figure[]
  draft?: boolean
}

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
    year: null,
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
    layout: "stage",
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
    year: null,
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
    surfaces: [
      {
        kind: "web",
        name: { pt: "Booking", en: "Booking" },
        purpose: {
          pt: "Reservas, tarifário, promoções, parceiros e faturamento.",
          en: "Reservations, rate plans, promotions, partners and billing.",
        },
        audience: { pt: "Comercial e recepção", en: "Sales and front desk" },
      },
      {
        kind: "web",
        name: { pt: "CRM", en: "CRM" },
        purpose: {
          pt: "Base de leads e campanhas por e-mail, SMS, RCS e WhatsApp.",
          en: "The lead base, and campaigns by email, SMS, RCS and WhatsApp.",
        },
        audience: { pt: "Marketing do hotel", en: "Hotel marketing" },
      },
      {
        kind: "web",
        name: { pt: "CMS", en: "CMS" },
        purpose: {
          pt: "O site inteiro editado pelo hotel — páginas, imagens, cores e SEO.",
          en: "The whole website, edited by the hotel — pages, images, colours and SEO.",
        },
        audience: { pt: "Marketing do hotel", en: "Hotel marketing" },
      },
      {
        kind: "web",
        name: { pt: "CX", en: "CX" },
        purpose: {
          pt: "Pesquisas de satisfação, indicadores e nuvem de palavras por setor.",
          en: "Satisfaction surveys, indicators and a word cloud per department.",
        },
        audience: { pt: "Qualidade", en: "Quality" },
      },
      {
        kind: "web",
        name: { pt: "Chat", en: "Chat" },
        purpose: {
          pt: "Atendimento, fluxo de conversa e treino do robô.",
          en: "Live support, conversation flow and training the bot.",
        },
        audience: { pt: "Atendimento", en: "Support" },
      },
      {
        kind: "web",
        name: { pt: "Commerce", en: "Commerce" },
        purpose: {
          pt: "A operação por trás do app do marketplace: catálogo, estoque, pedidos, entregadores e cupons.",
          en: "The operation behind the marketplace app: catalogue, stock, orders, couriers and coupons.",
        },
        audience: { pt: "Lojistas do shopping", en: "Shopping centre retailers" },
      },
      {
        kind: "web",
        name: { pt: "Media", en: "Media" },
        purpose: {
          pt: "Agendamento de publicações no Facebook e Instagram.",
          en: "Scheduling posts to Facebook and Instagram.",
        },
        audience: { pt: "Marketing do hotel", en: "Hotel marketing" },
      },
      {
        kind: "web",
        name: { pt: "Storage", en: "Storage" },
        purpose: {
          pt: "Inventário, contagem, requisições e processos de almoxarifado.",
          en: "Inventory, stock counts, requisitions and stockroom processes.",
        },
        audience: { pt: "Suprimentos", en: "Supply" },
      },
      {
        kind: "web",
        name: { pt: "Yago", en: "Yago" },
        purpose: {
          pt: "A operação por trás do app do hóspede: gastronomia, experiências, lazer, solicitações.",
          en: "The operation behind the guest app: dining, experiences, leisure, requests.",
        },
        audience: { pt: "Operação do resort", en: "Resort operations" },
      },
    ],
    status: "live",
    brand: { from: "#5F33B4", to: "#8B5CF6", ink: "#F5F1FF" },
    logo: "/y-studio.png",
    layout: "stage",
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
    year: null,
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
    brand: { from: "#9A4922", to: "#70765D", ink: "#F6E9D8", surface: "#f6e9d8" },
    logo: "/porto-seguro-shopping-icon.svg",
    layout: "stage",
  },

  {
    id: "aguiar-one",
    name: "Aguiar One",
    sector: { pt: "Varejo", en: "Retail" },
    kind: {
      pt: "Gestão de vendas e caixa para o varejo local",
      en: "Sales and cash management for local retail",
    },
    headline: {
      pt: "Registre a venda, veja o lucro, feche o caixa.",
      en: "Log the sale, see the profit, close the drawer.",
    },
    summary: {
      pt: "Vendas, custos, estoque e caixa no mesmo lugar. Cada loja liga só os módulos que usa e vê o resultado do dia sem abrir planilha — e acima delas há um console que administra a plataforma inteira.",
      en: "Sales, costs, stock and the cash drawer in one place. Each shop switches on only the modules it uses and sees the day's result without opening a spreadsheet — and above them sits a console that runs the whole platform.",
    },
    role: {
      pt: "Produto inteiro, sozinho — da conversa com o cliente à arquitetura, portal, admin, app e banco",
      en: "The whole product, alone — from the client conversation through architecture, portal, admin, app and database",
    },
    context: { company: "Freelance", kind: "freelance" },
    year: null,
    beats: [
      {
        label: { pt: "O problema", en: "The problem" },
        value: {
          pt: "Loja pequena fechando o dia na planilha, sem saber o lucro real.",
          en: "A small shop closing its day in a spreadsheet, with no idea of its real profit.",
        },
      },
      {
        label: { pt: "O que construí", en: "What I built" },
        value: {
          pt: "Vendas, caixa, produtos, estoque, custos e relatórios como módulos, e o console que administra as lojas.",
          en: "Sales, cash drawer, products, stock, costs and reports as modules, and the console that administers the shops.",
        },
      },
      {
        label: { pt: "Minha responsabilidade", en: "What I owned" },
        value: {
          pt: "Tudo. Levantamento com o cliente, arquitetura, escolha de stack, as três superfícies e o banco.",
          en: "All of it. Discovery with the client, architecture, stack choice, all three surfaces and the database.",
        },
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "TypeScript", "Supabase", "Turborepo", "pnpm"],
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
      {
        kind: "web",
        name: { pt: "Landing page", en: "Landing page" },
        purpose: {
          pt: "Apresentar a plataforma e conduzir o lojista até o cadastro.",
          en: "Presenting the platform and guiding shop owners into sign-up.",
        },
        audience: { pt: "Lojistas interessados", en: "Prospective shop owners" },
      },
    ],
    status: "live",
    brand: { from: "#3E7E9C", to: "#1B3A4B", ink: "#F2F7F9", surface: "#FFFFFF" },
    logo: "/aguiar-one.png",
    layout: "stage",
    figures: [],
  },
  {
    id: "vez",
    name: "VEZ",
    sector: { pt: "Serviços", en: "Services" },
    kind: {
      pt: "Marketplace de agendamentos de serviços",
      en: "A booking marketplace for local services",
    },
    headline: {
      pt: "Quem tem horário livre agora, na sua cidade.",
      en: "Who has a slot free right now, in your city.",
    },
    summary: {
      pt: "Barbearias, salões, clínicas e petshops de uma cidade em um app só. O cliente acha o serviço, vê quem tem horário e agenda — ou entra numa fila de espera digital; o estabelecimento controla agenda, equipe, regras e financeiro pelo app e pelo portal. Busca por IA, pagamento integrado com split e cobrança por mensalidade ou por comissão.",
      en: "A city's barbers, salons, clinics and pet shops in one app. Customers find the service, see who has a slot and book — or join a digital waiting queue; the business runs its diary, team, rules and finances from the app and the portal. AI-driven search, integrated payment with split, and billing by subscription or by commission.",
    },
    role: {
      pt: "Produto inteiro, sozinho — do levantamento com o cliente à arquitetura, stack, cinco superfícies e banco",
      en: "The whole product, alone — from discovery through architecture, stack, five surfaces and the database",
    },
    context: { company: "Freelance", kind: "freelance" },
    year: null,
    beats: [
      {
        label: { pt: "O problema", en: "The problem" },
        value: {
          pt: "Agendar serviço na cidade é ligar para cada loja para descobrir quem tem horário.",
          en: "Booking a local service means ringing every shop to find out who has a slot.",
        },
      },
      {
        label: { pt: "O que construí", en: "What I built" },
        value: {
          pt: "Busca por disponibilidade, fila de espera digital, agenda e financeiro do estabelecimento, e o console da plataforma.",
          en: "Availability search, a digital waiting queue, the shop's diary and finances, and the platform console.",
        },
      },
      {
        label: { pt: "Minha responsabilidade", en: "What I owned" },
        value: {
          pt: "Tudo. Arquitetura, escolha de stack, as cinco superfícies, o banco e o modelo de monetização.",
          en: "All of it. Architecture, stack choice, all five surfaces, the database and the monetisation model.",
        },
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "TypeScript", "Supabase", "Turborepo", "pnpm"],
    surfaces: [
      {
        kind: "mobile",
        platforms: ["iOS", "Android"],
        name: { pt: "App do cliente", en: "Customer app" },
        purpose: {
          pt: "Achar o serviço, ver quem tem horário e agendar ou entrar na fila.",
          en: "Find the service, see who is free, and book or join the queue.",
        },
        audience: { pt: "Quem agenda", en: "People booking" },
      },
      {
        kind: "mobile",
        platforms: ["iOS", "Android"],
        name: { pt: "App do estabelecimento", en: "Business app" },
        purpose: {
          pt: "O dia como ele acontece: fila, atendimento em curso e as decisões pendentes.",
          en: "The day as it happens: the queue, who is in the chair, and the decisions pending.",
        },
        audience: { pt: "Quem atende", en: "People serving" },
      },
      {
        kind: "web",
        name: { pt: "Portal do estabelecimento", en: "Business portal" },
        purpose: {
          pt: "Agenda, equipe, serviços, regras de horário e financeiro.",
          en: "Diary, team, services, scheduling rules and finances.",
        },
        audience: { pt: "Dono do estabelecimento", en: "Business owner" },
      },
      {
        kind: "web",
        name: { pt: "Portal administrativo", en: "Admin console" },
        purpose: {
          pt: "Aprovações, cidades, cotas de mensalidade, suporte e financeiro da plataforma.",
          en: "Approvals, cities, subscription quotas, support and the platform's finances.",
        },
        audience: { pt: "Operação da plataforma", en: "Platform operations" },
      },
      {
        kind: "web",
        name: { pt: "Landing page", en: "Landing page" },
        purpose: {
          pt: "Onde o estabelecimento descobre a plataforma e entra nela.",
          en: "Where a business finds the platform and signs up.",
        },
        audience: { pt: "Estabelecimentos", en: "Businesses" },
      },
    ],
    status: "building",
    brand: { from: "#EE6C4C", to: "#B8412A", ink: "#FFF4F0", surface: "#FFFFFF" },
    logo: "/vez.svg",
    layout: "stage",
    figures: [],
  },
]

export function sectorNamesOf(projects: Project[]): Localized[] {
  const seen = new Map<string, Localized>()
  for (const project of projects) {
    if (!seen.has(project.sector.en)) seen.set(project.sector.en, project.sector)
  }
  return [...seen.values()]
}

export function liveSurfacesOf(projects: Project[]): number {
  return projects
    .filter((project) => project.status === "live")
    .reduce((total, project) => total + project.surfaces.length, 0)
}

export const PUBLISHED_PROJECTS = PROJECTS.filter((project) => !project.draft)

export function findProject(id: string | undefined): Project | undefined {
  return PROJECTS.find((project) => project.id === id)
}

export function nextProject(id: string): Project | undefined {
  const list = PUBLISHED_PROJECTS
  const index = list.findIndex((project) => project.id === id)
  if (index === -1) return list[0]
  return list[(index + 1) % list.length]
}

if (import.meta.env.DEV) {
  const drafts = PROJECTS.filter((project) => project.draft).map((project) => project.id)

  if (drafts.length) {
    console.warn(
      `[portfolio] Draft case studies in src/content/work.ts: ${drafts.join(", ")}. ` +
        `They render placeholder copy, are hidden from the index in a production ` +
        `build and carry noindex, until you fill them in and remove \`draft: true\`. ` +
        `When you do, add the URL to public/sitemap.xml in the same commit — that ` +
        `file lists only what is indexable, and a noindex page submitted in a ` +
        `sitemap is reported as an error against the whole file.`,
    )
  }

  const undated = PROJECTS.filter((project) => project.year === null).map((project) => project.id)

  if (undated.length) {
    console.warn(`[portfolio] Projects with no \`year\` set: ${undated.join(", ")}.`)
  }
}
