import type { Localized } from "@/i18n/useLocale"

/** Navigation. `id` doubles as the section's DOM id and scroll target. */
export const NAV = [
  { id: "work", label: { pt: "Work", en: "Work" } satisfies Localized },
  { id: "about", label: { pt: "About", en: "About" } satisfies Localized },
  { id: "experience", label: { pt: "Experience", en: "Experience" } satisfies Localized },
  { id: "contact", label: { pt: "Contact", en: "Contact" } satisfies Localized },
]

export const COPY = {
  nav: {
    cta: { pt: "Vamos conversar", en: "Let's talk" },
    menu: { pt: "Menu", en: "Menu" },
    close: { pt: "Fechar", en: "Close" },
  },

  hero: {
    headline: {
      pt: "Construo o produto inteiro, não só a tela.",
      en: "I build the whole product, not just the screen.",
    },
    lead: {
      pt: "Arquitetura, mobile e web. Uso IA no fluxo de trabalho para chegar mais rápido na solução certa — e trato segurança como decisão de projeto, não como revisão de última hora.",
      en: "Architecture, mobile and web. I use AI in the workflow to reach the right solution faster — and treat security as a design decision, not a last-minute review.",
    },
    primary: { pt: "Ver os produtos", en: "See the work" },
    secondary: { pt: "Entrar em contato", en: "Get in touch" },
    scroll: { pt: "Role para explorar", en: "Scroll to explore" },
  },

  work: {
    eyebrow: { pt: "Selected work", en: "Selected work" },
    title: {
      pt: "Produtos que estão no ar.",
      en: "Products that are out there.",
    },
    lead: {
      pt: "Três produtos reais, com usuários reais — dois mobile e um ecossistema web. Cada um pediu um tipo diferente de decisão de arquitetura.",
      en: "Three real products with real users — two mobile, one web platform. Each demanded a different kind of architectural decision.",
    },
    live: { pt: "Em produção", en: "Live" },
    building: { pt: "Em desenvolvimento", en: "In development" },
    stack: { pt: "Stack", en: "Stack" },
    role: { pt: "Meu papel", en: "My role" },
    more: { pt: "Mais projetos no GitHub", en: "More projects on GitHub" },
  },

  /**
   * The four pillars the whole page now argues for. Same layout as before, a
   * much wider claim: architecture first, one base across mobile and web, AI
   * as part of the working method, and security treated as design.
   */
  foundations: {
    eyebrow: { pt: "Engineering", en: "Engineering" },
    title: {
      pt: "A arquitetura vem antes da tela.",
      en: "Architecture comes before the screen.",
    },
    lead: {
      pt: "As telas mudam. O que decide se um produto continua barato de evoluir são as escolhas feitas antes de existir qualquer tela — e o método usado para chegar nelas.",
      en: "Screens change. What decides whether a product stays cheap to evolve are the choices made before any screen exists — and the method used to reach them.",
    },
    principles: [
      {
        title: {
          pt: "Estrutura decidida uma vez",
          en: "Structure decided once",
        },
        body: {
          pt: "Camadas, estado e fronteiras definidos no começo. O teste real de uma arquitetura não é a entrega de hoje: é quanto custa a próxima versão.",
          en: "Layers, state and boundaries settled up front. The real test of an architecture isn't today's delivery — it's what the next version costs.",
        },
        tools: ["Clean Architecture", "MVVM", "TypeScript", "Design system"],
      },
      {
        title: {
          pt: "Mobile e web, mesma base",
          en: "Mobile and web, one base",
        },
        body: {
          pt: "Um app de loja e um painel no navegador resolvem problemas diferentes, mas repetem as mesmas decisões: navegação, estado, cache e contrato de API.",
          en: "A store app and a browser dashboard solve different problems, but repeat the same decisions: navigation, state, caching and the API contract.",
        },
        tools: ["React Native", "Expo", "React", "Next.js"],
      },
      {
        title: {
          pt: "IA como método, não atalho",
          en: "AI as method, not shortcut",
        },
        body: {
          pt: "Agentes trabalhando em paralelo em worktrees separadas, contexto real do projeto via MCP e RAG. Acelera o caminho até a solução certa — desde que você saiba reconhecer qual é.",
          en: "Agents working in parallel across separate worktrees, real project context through MCP and RAG. It shortens the path to the right solution — provided you can recognise which one that is.",
        },
        tools: ["MCP", "RAG", "Multi-agent", "Subagents", "Git worktrees"],
      },
      {
        title: {
          pt: "Segurança no desenho",
          en: "Security in the design",
        },
        body: {
          pt: "Autenticação, sessão, permissão e o que nunca deveria sair do servidor. Já vi o suficiente do que dá errado para resolver isso na arquitetura, e não numa revisão no fim.",
          en: "Authentication, session, permission, and what should never leave the server. I've seen enough of what goes wrong to settle it in the architecture rather than in a review at the end.",
        },
        tools: ["Auth & sessions", "Permissions", "Input validation", "Secrets"],
      },
    ],
  },

  process: {
    eyebrow: { pt: "How I build", en: "How I build" },
    title: {
      pt: "O código funcionar é o meio do caminho.",
      en: "Working code is the halfway point.",
    },
    lead: {
      pt: "O ciclo completo de um produto — mobile ou web — do primeiro desenho até a versão que sobe semana que vem.",
      en: "The full cycle of a product — mobile or web — from the first sketch to the version that ships next week.",
    },
    steps: [
      {
        title: { pt: "Problema", en: "Problem" },
        body: {
          pt: "Entender o que precisa ser resolvido antes de escolher qualquer tecnologia.",
          en: "Understand what has to be solved before choosing any technology.",
        },
      },
      {
        title: { pt: "Arquitetura", en: "Architecture" },
        body: {
          pt: "Camadas, estado, navegação e contrato de API. Decidido uma vez, no começo.",
          en: "Layers, state, navigation and the API contract. Decided once, up front.",
        },
      },
      {
        title: { pt: "Superfície de risco", en: "Risk surface" },
        body: {
          pt: "Onde entra dado de fora, quem pode o quê, e o que nunca sai do servidor.",
          en: "Where outside data enters, who is allowed what, and what never leaves the server.",
        },
      },
      {
        title: { pt: "Desenvolvimento", en: "Development" },
        body: {
          pt: "Telas e componentes reaproveitáveis, com agentes trabalhando em paralelo no que é repetitivo.",
          en: "Screens and reusable components, with agents running in parallel on whatever is repetitive.",
        },
      },
      {
        title: { pt: "Testes", en: "Testing" },
        body: {
          pt: "Cobertura no que quebra de verdade: fluxo, estado e regra de negócio.",
          en: "Coverage where things actually break: flows, state and business rules.",
        },
      },
      {
        title: { pt: "CI/CD", en: "CI/CD" },
        body: {
          pt: "Build automatizado, versionamento e distribuição sem passo manual.",
          en: "Automated builds, versioning and distribution with no manual step.",
        },
      },
      {
        title: { pt: "Deploy", en: "Deploy" },
        body: {
          pt: "App Store, Google Play e web. Submissão, revisão e release.",
          en: "App Store, Google Play and web. Submission, review and release.",
        },
      },
      {
        title: { pt: "Evolução", en: "Continuous improvement" },
        body: {
          pt: "A versão seguinte tem que ser fácil de fazer. Esse é o teste real da arquitetura.",
          en: "The next version has to be easy to build. That's the real test of the architecture.",
        },
      },
    ],
  },

  impact: {
    eyebrow: { pt: "Impact", en: "Impact" },
    title: { pt: "O que isso significa na prática.", en: "What that means in practice." },
  },

  experience: {
    eyebrow: { pt: "Experience", en: "Experience" },
    title: { pt: "Onde eu construí isso.", en: "Where I built it." },
    lead: {
      pt: "Responsável pela arquitetura e pelo ciclo completo dos produtos que construí — mobile e web, do primeiro desenho à manutenção.",
      en: "Responsible for the architecture and the full cycle of the products I built — mobile and web, from first sketch to maintenance.",
    },
    responsibilities: { pt: "Responsabilidades", en: "Responsibilities" },
    highlights: { pt: "Principais contribuições", en: "Key contributions" },
  },

  about: {
    eyebrow: { pt: "About", en: "About" },
    title: { pt: "Como eu trabalho.", en: "How I work." },
    body: {
      pt: "Comecei pelo mobile e é onde tenho mais estrada, mas parei de me apresentar por plataforma faz tempo. O que muda de um app de loja para um painel no navegador é a superfície; o que decide se o produto sobrevive é a estrutura por baixo — camadas, estado, contrato de API, quem pode o quê.\n\nUso IA todo dia, e não como autocomplete. Agentes rodando em paralelo em worktrees separadas, contexto real do projeto entrando por MCP e RAG. Isso encurta muito o caminho até a solução — mas só se você souber reconhecer a solução certa quando ela aparece. A parte difícil continua sendo decidir, não digitar.\n\nSegurança eu trato no desenho. Não é minha especialidade, é uma responsabilidade: já lidei com o suficiente do que dá errado — token, sessão, permissão, dado confiando em quem não devia — para saber que isso não se resolve numa revisão no fim.\n\nGosto de código que a próxima pessoa entende sem precisar me perguntar nada.",
      en: "I started in mobile and that's where I have the most road behind me, but I stopped introducing myself by platform a while ago. What changes between a store app and a browser dashboard is the surface; what decides whether the product survives is the structure underneath — layers, state, the API contract, who is allowed what.\n\nI use AI every day, and not as autocomplete. Agents running in parallel across separate worktrees, real project context coming in through MCP and RAG. It shortens the path to a solution enormously — but only if you can recognise the right one when it shows up. The hard part is still deciding, not typing.\n\nSecurity I handle in the design. It isn't my specialism, it's a responsibility: I've dealt with enough of what goes wrong — tokens, sessions, permissions, data trusting something it shouldn't — to know it doesn't get solved in a review at the end.\n\nI like code the next person can read without having to ask me anything.",
    },
  },

  toolkit: {
    eyebrow: { pt: "Toolkit", en: "Toolkit" },
    title: { pt: "Tools I build with.", en: "Tools I build with." },
    lead: {
      pt: "Agrupadas pela camada do produto a que pertencem. Escolhidas por resolverem um problema específico, não por estarem na moda.",
      en: "Grouped by the layer of the product they belong to. Picked because they solve a specific problem, not because they're fashionable.",
    },
  },

  contact: {
    eyebrow: { pt: "Contact", en: "Contact" },
    title: { pt: "Tem um produto em mente?", en: "Have a product in mind?" },
    lead: {
      pt: "Se você precisa de alguém que decida a arquitetura, construa o produto — mobile, web ou os dois — e continue cuidando dele depois, me chama.",
      en: "If you need someone to settle the architecture, build the product — mobile, web or both — and keep looking after it afterwards, get in touch.",
    },
    cta: { pt: "Vamos construir algo", en: "Let's build something" },
    emailPending: {
      pt: "E-mail em breve",
      en: "Email coming soon",
    },
  },

  footer: {
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
    built: {
      pt: "Feito com React, TypeScript e atenção a detalhe.",
      en: "Built with React, TypeScript and attention to detail.",
    },
    top: { pt: "Voltar ao topo", en: "Back to top" },
  },
} as const
