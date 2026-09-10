import type { Localized } from "@/i18n/useLocale"

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
  company: string
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

/** The placeholder every unwritten field carries. Visible on purpose. */
const TBD: Localized = { pt: "— a preencher —", en: "— to be written —" }

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
     lets them pair one-to-one with the two draft case studies in work.ts:
     `freelance-1` with `draft-project-1`, `freelance-2` with `draft-project-2`.

     `company` is left unfilled rather than guessed. Put the client's name in it,
     or a neutral stand-in where the engagement is under NDA.
     ─────────────────────────────────────────────────────────────────────── */
  {
    id: "freelance-1",
    title: { pt: "Desenvolvedor Web — Freelancer", en: "Web Developer — Freelance" },
    company: "—", // TODO: the client's name, or a neutral stand-in if it is under NDA
    kind: "freelance",
    period: null, // TODO
    summary: {
      pt: "Aplicação web sob demanda, do briefing à entrega — interface, integração e deploy.",
      en: "A web application on demand, from brief to delivery — interface, integration and deployment.",
    },
    responsibilities: [
      {
        pt: "Do briefing à entrega, incluindo a interface e o deploy.",
        en: "From brief to delivery, interface and deployment included.",
      },
      TBD, // TODO: what you actually owned on this one
    ],
    highlights: [],
    stack: [], // TODO
  },
  {
    id: "freelance-2",
    title: { pt: "Desenvolvedor Web — Freelancer", en: "Web Developer — Freelance" },
    company: "—", // TODO: the client's name, or a neutral stand-in if it is under NDA
    kind: "freelance",
    period: null, // TODO
    summary: {
      pt: "Aplicação entregue de ponta a ponta — arquitetura, interface, integração e publicação.",
      en: "An application delivered end to end — architecture, interface, integration and release.",
    },
    responsibilities: [
      {
        pt: "Arquitetura e implementação da aplicação, do primeiro desenho ao ar.",
        en: "The application's architecture and implementation, from first sketch to live.",
      },
      TBD, // TODO: what else you owned here — infrastructure, data, deployment
    ],
    highlights: [
      {
        pt: "Escopo definido e entregue sem equipe: uma decisão técnica por vez, todas minhas.",
        en: "Scope defined and delivered without a team: one technical decision at a time, all of them mine.",
      },
    ],
    stack: [], // TODO
  },
]

/**
 * Dev-only reminder, matching the one in profile.ts — the nudge reaches the
 * person who can act on it and never the visitor.
 */
if (import.meta.env.DEV) {
  const unfilled = ROLES.filter(
    (role) => role.company === "—" || role.stack.length === 0,
  ).map((role) => role.id)

  if (unfilled.length) {
    console.warn(
      `[portfolio] Roles still missing a company or a stack in src/content/experience.ts: ` +
        `${unfilled.join(", ")}.`,
    )
  }
}
