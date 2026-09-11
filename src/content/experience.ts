import type { Localized, Tag } from "@/i18n/useLocale"

/**
 * Professional experience.
 *
 * `period` is `null` wherever the dates were not available. A null period
 * renders nothing rather than a guess — fill them in and they appear.
 *
 * Every role is set the same way. There used to be a lead role with a full
 * editorial spread and the rest as compact sidebars, which said the mobile work
 * was the story and the web work was a footnote. That was true when there was
 * one product to talk about; across mobile, web and commissioned work it had
 * become an argument against the point the page itself makes — that the surface
 * is the least durable decision in a product. So the emphasis is gone and the
 * roles are simply listed, most recent first.
 */

/**
 * What the working relationship actually was.
 *
 * A reader cannot tell employment from commissioned work, and the two say
 * different things about what a person is able to do. Only the one that is not
 * obvious from the company name is labelled on the page.
 */
export type RoleKind = "employment" | "freelance"

export type Role = {
  id: string
  title: Localized
  /**
   * Who the work was for.
   *
   * A `Tag` rather than a plain string, the same way toolkit chips are: an
   * employer is a proper noun that reads identically in every language, while a
   * commissioned engagement with no public client name needs a phrase, and a
   * phrase has to be translated. It must not be the word "freelance" — the page
   * already labels the relationship, and repeating it here produces
   * "Freelance · Freelancer" and tells the reader nothing twice.
   */
  company: Tag
  kind: RoleKind
  /** TODO: fill in, e.g. { pt: "2023 — hoje", en: "2023 — present" }. */
  period: Localized | null
  /** The one line that says what this role actually was. */
  summary: Localized
  responsibilities: Localized[]
  /** What changed because I was there. Rendered only when there is something. */
  highlights: Localized[]
  stack: string[]
}

export const ROLES: Role[] = [
  {
    id: "mobile",
    title: { pt: "Desenvolvedor Mobile", en: "Mobile Developer" },
    company: "YaaYoo — Fusion Thinking",
    kind: "employment",
    period: null, // TODO: add the period for this role
    summary: {
      pt: "Responsável pela arquitetura e pelo ciclo completo dos aplicativos: do desenho da estrutura à publicação nas lojas e à manutenção depois disso.",
      en: "Responsible for the architecture and the full cycle of the apps: from designing the structure through to store release and the maintenance after it.",
    },
    responsibilities: [
      {
        pt: "Aplicativos Android e iOS em React Native e TypeScript.",
        en: "Android and iOS apps in React Native and TypeScript.",
      },
      {
        pt: "Definição da arquitetura — camadas, estado e navegação — com MVVM e Clean Architecture.",
        en: "Defining the architecture — layers, state and navigation — with MVVM and Clean Architecture.",
      },
      {
        pt: "Contrato de API, estado compartilhado, cache de rede e tratamento de sessão.",
        en: "The API contract, shared state, network caching and session handling.",
      },
      {
        pt: "Testes automatizados com Jest e React Native Testing Library.",
        en: "Automated tests with Jest and React Native Testing Library.",
      },
      {
        pt: "Pipeline de CI/CD, builds assinados e distribuição.",
        en: "CI/CD pipeline, signed builds and distribution.",
      },
      {
        pt: "Submissão e manutenção na App Store e no Google Play.",
        en: "Submission and maintenance on the App Store and Google Play.",
      },
    ],
    highlights: [
      {
        pt: "Ownership completo: da decisão de arquitetura à revisão na loja, nenhuma etapa dependia de outra pessoa.",
        en: "Full ownership: from the architectural decision to store review, no stage depended on someone else.",
      },
      {
        pt: "Arquitetura pensada para a versão seguinte, não só para a entrega atual.",
        en: "Architecture shaped for the next version, not just the current delivery.",
      },
      {
        pt: "Publicação nas duas lojas conduzida do build à revisão.",
        en: "Release on both stores carried from build through review.",
      },
    ],
    stack: ["React Native", "TypeScript", "Expo", "Jest", "Fastlane", "GitHub Actions"],
  },
  {
    id: "frontend",
    title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    company: "YaaYoo — Fusion Thinking",
    kind: "employment",
    period: null, // TODO: add the period for this role
    summary: {
      pt: "Aplicações web do ecossistema Y-Studio — Booking, CRM, CMS e portais internos, todos partindo da mesma base de componentes.",
      en: "Web applications across the Y-Studio ecosystem — Booking, CRM, CMS and internal portals, all built from the same component base.",
    },
    responsibilities: [
      {
        pt: "Interfaces em Next.js, React e TypeScript.",
        en: "Interfaces in Next.js, React and TypeScript.",
      },
      {
        pt: "Componentização compartilhada entre módulos do produto.",
        en: "A component layer shared across the product's modules.",
      },
      {
        pt: "Foco em performance de renderização e boas práticas.",
        en: "Focus on rendering performance and solid practices.",
      },
    ],
    highlights: [
      {
        pt: "Módulos distintos partindo da mesma base de componentes.",
        en: "Separate modules built from the same component base.",
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },

  /* ───────────────────────────────────────────────────────────────────────────
     The two engagements outside YaaYoo.

     They were one entry — "Projetos Web Freelancer" — which flattened two
     separate deliveries, for two different people, into a single line. Split so
     each can carry its own client, period, scope and stack, which is also what
     lets them pair one-to-one with the two commissioned case studies in
     work.ts: `freelance-1` with `aguiar-one`, `freelance-2` with `vez`.

     Neither names its product here, on purpose. An experience entry answers
     "what is this person able to do on their own"; the case study answers "what
     did it turn out to be". Naming the app in both makes the second one
     redundant and turns a claim about capability into a second product pitch.

     `company` carries the sector rather than a client name — factual, and it
     keeps the two apart on the page. Swap in the real names if the engagements
     are not private.
     ─────────────────────────────────────────────────────────────────────── */
  {
    id: "freelance-1",
    title: { pt: "Desenvolvedor Full-stack — Freelancer", en: "Full-stack Developer — Freelance" },
    // The sector rather than a name: true, useful, and it distinguishes the two
    // engagements. Swap in the client if the work is not private.
    company: { pt: "Varejo local", en: "Local retail" },
    kind: "freelance",
    period: null, // TODO
    summary: {
      pt: "Plataforma de gestão para varejo local, entregue sozinho do levantamento com o cliente até a operação: o portal onde a loja trabalha, o console que administra a plataforma acima dela, o app e o banco.",
      en: "A management platform for local retail, delivered alone from the client conversation through to running it: the portal the shop works in, the console that administers the platform above it, the app and the database.",
    },
    responsibilities: [
      {
        pt: "Levantamento com o cliente e definição de escopo antes de escrever código.",
        en: "Discovery with the client and scoping the work before writing any code.",
      },
      {
        pt: "Escolha de arquitetura e de stack, com a manutenção de uma pessoa só em vista.",
        en: "Choosing the architecture and the stack, with one-person maintenance in mind.",
      },
      {
        pt: "Modelagem do banco e das regras de negócio — venda, custo, caixa e estoque.",
        en: "Modelling the database and the business rules — sales, costs, cash drawer and stock.",
      },
      {
        pt: "Três superfícies: o portal do lojista, o console de administração e o app.",
        en: "Three surfaces: the shop's portal, the administration console and the app.",
      },
      {
        pt: "Deploy, ambiente e o que vem depois de entregar.",
        en: "Deployment, environment, and everything that comes after delivery.",
      },
    ],
    highlights: [
      {
        pt: "Produto inteiro sem equipe: arquitetura, modelo de dados, interface e deploy foram decisões minhas, sem ninguém a quem delegar.",
        en: "A whole product with no team: architecture, data model, interface and deployment were my decisions, with nobody to delegate to.",
      },
      {
        pt: "Desenhado como plataforma multi-loja desde a primeira versão — o console que administra os clientes não foi remendo posterior.",
        en: "Built as a multi-tenant platform from the first version — the console that administers the customers was not bolted on later.",
      },
      {
        pt: "Módulos ligáveis por cliente, para que uma loja pequena não pague a complexidade de uma grande.",
        en: "Modules switched on per customer, so a small shop does not pay for a large one's complexity.",
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "TypeScript", "Supabase", "Turborepo", "pnpm"],
  },
  {
    id: "freelance-2",
    title: { pt: "Desenvolvedor Full-stack — Freelancer", en: "Full-stack Developer — Freelance" },
    company: { pt: "Serviços locais", en: "Local services" },
    kind: "freelance",
    period: null, // TODO
    summary: {
      pt: "Marketplace de agendamentos de uma cidade inteira, entregue sozinho: cinco superfícies, busca conversacional por IA, pagamento integrado com split e cobrança por mensalidade ou por comissão.",
      en: "A city-wide booking marketplace, delivered alone: five surfaces, conversational AI search, integrated payment with split, and billing by subscription or by commission.",
    },
    responsibilities: [
      {
        pt: "Levantamento com o cliente, escopo e o modelo de monetização do produto.",
        en: "Discovery with the client, scope, and the product's monetisation model.",
      },
      {
        pt: "Arquitetura e escolha de stack, com o domínio compartilhado entre app e web num monorepo.",
        en: "Architecture and stack choice, with the domain shared between app and web in a monorepo.",
      },
      {
        pt: "Banco de dados, autenticação e as regras de disponibilidade e fila de espera.",
        en: "Database, authentication, and the availability and waiting-queue rules.",
      },
      {
        pt: "Cinco superfícies: dois aplicativos, dois portais web e a landing page.",
        en: "Five surfaces: two apps, two web portals and the landing page.",
      },
      {
        pt: "Pagamento integrado com split entre plataforma e estabelecimento, e a cobrança recorrente.",
        en: "Integrated payment with a split between platform and business, and the recurring billing.",
      },
      {
        pt: "Busca conversacional por IA sobre o catálogo de serviços e disponibilidade.",
        en: "Conversational AI search across the service catalogue and availability.",
      },
      {
        pt: "Deploy e operação.",
        en: "Deployment and running it.",
      },
    ],
    highlights: [
      {
        pt: "Escopo definido e entregue sem equipe: uma decisão técnica por vez, todas minhas.",
        en: "Scope defined and delivered without a team: one technical decision at a time, all of them mine.",
      },
      {
        pt: "Cinco superfícies partindo de um monorepo, com as regras de negócio compartilhadas entre mobile e web em vez de duplicadas.",
        en: "Five surfaces out of one monorepo, with the business rules shared between mobile and web rather than duplicated.",
      },
      {
        pt: "Fila de espera digital: o produto resolve o problema de quem tem horário *agora*, não só o de marcar para a semana que vem.",
        en: "A digital waiting queue: the product answers who is free *now*, not only how to book for next week.",
      },
      {
        pt: "Duas formas de cobrar — mensalidade e comissão por agendamento — convivendo no mesmo modelo de dados.",
        en: "Two ways of being paid — subscription and commission per booking — living in one data model.",
      },
    ],
    stack: ["React Native", "Expo", "Next.js", "TypeScript", "Supabase", "Turborepo", "pnpm"],
  },
]

/**
 * Dev-only reminder, matching the one in profile.ts — the nudge reaches the
 * person who can act on it and never the visitor.
 */
if (import.meta.env.DEV) {
  const unfilled = ROLES.filter(
    (role) =>
      (typeof role.company === "string" && role.company === "—") ||
      role.stack.length === 0,
  ).map((role) => role.id)

  if (unfilled.length) {
    console.warn(
      `[portfolio] Roles still missing a company or a stack in src/content/experience.ts: ` +
        `${unfilled.join(", ")}.`,
    )
  }
}
