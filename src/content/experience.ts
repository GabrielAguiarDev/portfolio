import type { Localized } from "@/i18n/useLocale"

/**
 * Professional experience.
 *
 * `period` is `null` wherever the dates were not available. A null period
 * renders nothing rather than a guess — fill them in and they appear.
 */
export type Role = {
  id: string
  title: Localized
  company: string
  /** TODO: fill in, e.g. { pt: "2023 — hoje", en: "2023 — present" }. */
  period: Localized | null
  /** The one line that says what this role actually was. */
  summary: Localized
  responsibilities: Localized[]
  /** What changed because I was there. */
  highlights: Localized[]
  stack: string[]
  /** The lead role gets the editorial spread; the others are compact. */
  featured?: boolean
}

export const ROLES: Role[] = [
  {
    id: "mobile",
    title: { pt: "Desenvolvedor Mobile", en: "Mobile Developer" },
    company: "YaaYoo — Fusion Thinking",
    period: null, // TODO: add the period for this role
    summary: {
      pt: "Responsável pelo desenvolvimento mobile e pelo ciclo completo dos aplicativos, do planejamento à publicação nas lojas.",
      en: "Responsible for mobile development and the apps' full cycle, from planning through to store release.",
    },
    responsibilities: [
      {
        pt: "Aplicativos Android e iOS em React Native e TypeScript.",
        en: "Android and iOS apps in React Native and TypeScript.",
      },
      {
        pt: "Arquitetura da aplicação com MVVM e Clean Architecture.",
        en: "Application architecture using MVVM and Clean Architecture.",
      },
      {
        pt: "Integração com APIs, estado compartilhado e cache de rede.",
        en: "API integration, shared state and network caching.",
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
        pt: "Ownership completo do app: nenhuma etapa do ciclo dependia de outra pessoa.",
        en: "Full ownership of the app: no stage of the cycle depended on someone else.",
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
    featured: true,
  },
  {
    id: "frontend",
    title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    company: "YaaYoo — Fusion Thinking",
    period: null, // TODO: add the period for this role
    summary: {
      pt: "Aplicações web do ecossistema Y-Studio — Booking, CRM, CMS e portais internos.",
      en: "Web applications across the Y-Studio ecosystem — Booking, CRM, CMS and internal portals.",
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
  {
    id: "freelance",
    title: { pt: "Projetos Web Freelancer", en: "Freelance Web Projects" },
    company: "Freelance",
    period: null, // TODO: add the period for this role
    summary: {
      pt: "Sites e aplicações web sob demanda, com atenção a usabilidade, navegação e identidade visual consistente.",
      en: "Websites and web apps on demand, with attention to usability, navigation and a consistent visual identity.",
    },
    responsibilities: [
      {
        pt: "Do briefing à entrega, incluindo a interface e o deploy.",
        en: "From brief to delivery, interface and deployment included.",
      },
    ],
    highlights: [],
    stack: ["React", "TypeScript", "CSS"],
  },
]
