import type { Localized } from "@/i18n/useLocale"

/**
 * Navigation. `id` doubles as the section's DOM id and scroll target.
 *
 * The order has to match the order the sections appear in the document: the
 * navbar's active marker takes the last item whose top has passed the reading
 * line, which only works if this list is in document order.
 */
export const NAV = [
  { id: "work", label: { pt: "Projetos", en: "Work" } satisfies Localized },
  { id: "ai", label: { pt: "IA", en: "AI" } satisfies Localized },
  { id: "about", label: { pt: "Sobre", en: "About" } satisfies Localized },
  { id: "experience", label: { pt: "Experiência", en: "Experience" } satisfies Localized },
  { id: "contact", label: { pt: "Contato", en: "Contact" } satisfies Localized },
]

export const COPY = {
  nav: {
    cta: { pt: "Vamos conversar", en: "Let's talk" },
    menu: { pt: "Menu", en: "Menu" },
    close: { pt: "Fechar", en: "Close" },
    /** The language toggle, described in the language currently on screen. */
    language: { pt: "Mudar para inglês", en: "Switch to Portuguese" },
  },

  /**
   * Labels only assistive technology ever reads. They are localised for the
   * same reason everything else is: a screen reader set to Portuguese
   * announcing "Skip to content" is the one visitor who cannot skip past it.
   */
  /*
   * Page metadata, read by `useDocumentMeta`.
   *
   * Separate from the hero because the two are read in different places and
   * under different constraints: the hero is the first line of a page someone
   * is already looking at, and this is a paragraph that has to stand alone in a
   * search result, next to nine competitors, describing a person the reader has
   * never heard of.
   */
  meta: {
    home: {
      pt: "Gabriel Aguiar, desenvolvedor de software. Construo aplicativos móveis e plataformas web, trabalhando em todas as etapas: arquitetura, desenvolvimento, testes e publicação. Projetos em produção com usuários reais.",
      en: "Gabriel Aguiar, software developer. I build mobile apps and web platforms, working across every stage: architecture, development, testing and release. Projects in production with real users.",
    },
  },

  a11y: {
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
    sections: { pt: "Seções", en: "Sections" },
    social: { pt: "Redes sociais", en: "Social" },
  },

  /*
   * The hero.
   *
   * Short on purpose, and plain on purpose.
   *
   * It has been through two wrong versions. The first defined itself by
   * negation ("not just the screen"), which spends half a sentence correcting
   * an expectation nobody stated. The second replaced that with a dash and a
   * three-part list, which is the house style of copy written by a machine and
   * reads as such. Both were trying to prove something in the first breath.
   *
   * This one just says what he builds and that he builds all of it. Experience
   * is not a word that appears here, and it does not need to be: naming two
   * kinds of product and claiming every stage of both is a larger claim than
   * any adjective, and the sections below spend the rest of the page backing
   * it up.
   *
   * `lead` is the hero's line only. The page's meta description lives in
   * `meta.home` below, so search results can be fuller than the hero without
   * dragging the hero out to match.
   */
  hero: {
    headline: {
      pt: "Construo aplicativos e plataformas web.",
      en: "I build mobile apps and web platforms.",
    },
    lead: {
      pt: "Trabalho em todas as etapas, da arquitetura até o produto no ar.",
      en: "I work across every stage, from the architecture to the product going live.",
    },
    primary: { pt: "Ver os produtos", en: "See the work" },
    secondary: { pt: "Entrar em contato", en: "Get in touch" },
    scroll: { pt: "Role para explorar", en: "Scroll to explore" },
  },

  work: {
    eyebrow: { pt: "Projetos selecionados", en: "Selected work" },
    title: {
      pt: "Produtos que estão no ar.",
      en: "Products that are out there.",
    },
    lead: {
      pt: "Produtos reais, com usuários reais — mobile, web e um ecossistema inteiro. Cada um pediu um tipo diferente de decisão de arquitetura. Abra qualquer um para ver como foi resolvido.",
      en: "Real products with real users — mobile, web, and one full platform. Each demanded a different kind of architectural decision. Open any of them to see how it was solved.",
    },
    live: { pt: "Em produção", en: "Live" },
    building: { pt: "Em desenvolvimento", en: "In development" },
    stack: { pt: "Stack", en: "Stack" },
    role: { pt: "Meu papel", en: "My role" },
    more: { pt: "Mais projetos no GitHub", en: "More projects on GitHub" },
    /* The last cell of the grid — a way out, not a sixth project. */
    moreKind: { pt: "Repositórios públicos", en: "Public repositories" },

    /* The system section on a case-study page. */
    surfaces: { pt: "O sistema", en: "The system" },
    surfaceCount: { pt: "superfícies", en: "surfaces" },
    surfacesTitle: {
      pt: "Um produto, várias superfícies.",
      en: "One product, several surfaces.",
    },
    surfacesLead: {
      pt: "Cada peça atende uma pessoa diferente e resolve um problema diferente, partindo da mesma base.",
      en: "Each piece serves a different person and solves a different problem, off the same foundation.",
    },
    surfaceAudience: { pt: "Para", en: "For" },

    /* The case-study pages. */
    backToWork: { pt: "Projetos", en: "Work" },
    next: { pt: "Próximo projeto", en: "Next project" },
    /** Where the work happened — employer or client. */
    context: { pt: "Contexto", en: "Context" },
    freelance: { pt: "Freelancer", en: "Freelance" },
    /**
     * Shown wherever a case study exists as structure but has not been
     * written. Deliberately blunt: a placeholder that reads as finished copy
     * is worse than no page at all.
     */
    draft: { pt: "Case em preparação", en: "Case study in progress" },
    noFigures: {
      pt: "As telas deste projeto ainda não foram adicionadas.",
      en: "This project's screens haven't been added yet.",
    },
    draftBody: {
      pt: "Este projeto ainda não foi documentado. O conteúdo abaixo é estrutura, não descrição — nada aqui deve ser lido como informação sobre o produto.",
      en: "This project hasn't been documented yet. What follows is structure, not description — nothing here should be read as information about the product.",
    },
  },

  /**
   * The four pillars the page argues for: structure settled once, one base
   * under every surface, delivery as part of the build, and security treated
   * as design. The working method with AI used to be the fourth pillar; it
   * outgrew a paragraph and now has its own section, so this one went back to
   * the thing it was quietly missing — how the work actually ships.
   */
  foundations: {
    eyebrow: { pt: "Engenharia", en: "Engineering" },
    title: {
      pt: "A arquitetura vem antes da tela.",
      en: "Architecture comes before the screen.",
    },
    lead: {
      pt: "As telas mudam. O que decide se um produto continua barato de evoluir são as escolhas feitas antes de existir qualquer tela — e o método usado para chegar nelas.",
      en: "Screens change. What decides whether a product stays cheap to evolve are the choices made before any screen exists — and the method used to reach them.",
    },

    /**
     * The layers of the diagram, top to bottom. The order is the argument, so
     * it is content rather than a constant inside the component — and the
     * component's plane count is driven by the length of this list.
     */
    layers: [
      {
        label: { pt: "Interface", en: "Interface" },
        note: { pt: "o que se vê", en: "what you see" },
      },
      {
        label: { pt: "Estado", en: "State" },
        note: { pt: "o que a tela sabe", en: "what the screen knows" },
      },
      {
        label: { pt: "Domínio", en: "Domain" },
        note: { pt: "a regra do negócio", en: "the business rule" },
      },
      {
        label: { pt: "Dados", en: "Data" },
        note: { pt: "contrato e cache", en: "contract and cache" },
      },
      {
        label: { pt: "Infra", en: "Infra" },
        note: { pt: "build, release, sessão", en: "build, release, session" },
      },
    ],
    layersCaption: {
      pt: "A tela é a camada de cima: a que muda mais e a que decide menos.",
      en: "The screen is the top layer: the one that changes most and decides least.",
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
          pt: "Uma base, várias superfícies",
          en: "One base, several surfaces",
        },
        body: {
          pt: "App de loja, painel no navegador, integração que ninguém vê — problemas diferentes, mesmas decisões por baixo: navegação, estado, cache e contrato de API. É por isso que eu não me apresento por plataforma.",
          en: "A store app, a browser dashboard, an integration nobody sees — different problems, the same decisions underneath: navigation, state, caching and the API contract. Which is why I don't introduce myself by platform.",
        },
        tools: ["React Native", "Expo", "React", "Next.js", "Node.js"],
      },
      {
        title: {
          pt: "Entregar faz parte de construir",
          en: "Shipping is part of building",
        },
        body: {
          pt: "Build, versionamento e distribuição resolvidos no mesmo esforço que o código. Um produto que só sobe com passo manual não está pronto — está dependente de alguém lembrar.",
          en: "Builds, versioning and distribution settled in the same effort as the code. A product that only ships with a manual step isn't finished — it's dependent on somebody remembering.",
        },
        tools: ["GitHub Actions", "Fastlane", "App Store", "Google Play"],
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
        tools: [
          { pt: "Auth e sessões", en: "Auth & sessions" },
          { pt: "Permissões", en: "Permissions" },
          { pt: "Validação de entrada", en: "Input validation" },
          { pt: "Segredos", en: "Secrets" },
        ],
      },
    ],
  },

  /**
   * The AI section.
   *
   * Deliberately not a list of tools I have installed. The claim is narrower
   * and more useful than "I use AI": that a model is a component like any
   * other — it has a contract, a cost and an attack surface — and that the
   * interesting decisions are the ones around it. Everything asserted here is
   * something practised daily on real work, which is why there is no mention
   * of training, fine-tuning or serving models: that is a different job and
   * claiming it would be the easiest thing on this page to disprove.
   */
  ai: {
    eyebrow: { pt: "Engenharia de IA", en: "AI engineering" },
    title: {
      pt: "Trabalhar com IA também é arquitetura.",
      en: "Working with AI is architecture too.",
    },
    lead: {
      pt: "Um modelo não é mágica: é um componente com contrato, custo e superfície de ataque. Uso IA todos os dias para construir software — e trato as decisões em volta dela com o mesmo cuidado que trato qualquer outra parte do sistema.",
      en: "A model isn't magic: it's a component with a contract, a cost and an attack surface. I use AI every day to build software — and I treat the decisions around it with the same care as any other part of the system.",
    },

    /** Labels for the orchestration diagram. */
    graph: {
      context: ["MCP", "RAG"],
      core: {
        label: { pt: "Orquestrador", en: "Orchestrator" },
        note: { pt: "decide, consolida, decide de novo", en: "decides, consolidates, decides again" },
      },
      specialists: [
        { pt: "Arquitetura", en: "Architecture" },
        { pt: "Segurança", en: "Security" },
        { pt: "Testes", en: "Testing" },
        { pt: "Revisão", en: "Review" },
      ],
      legend: {
        dispatch: { pt: "Delega", en: "Dispatch" },
        report: { pt: "Reporta", en: "Report" },
      },
      caption: {
        pt: "Diagrama: contexto do projeto entra por MCP e RAG, um orquestrador delega para subagentes especializados em arquitetura, segurança, testes e revisão, e cada um reporta de volta para ser avaliado.",
        en: "Diagram: project context arrives through MCP and RAG, an orchestrator delegates to subagents specialised in architecture, security, testing and review, and each reports back to be judged.",
      },
    },

    pillars: [
      {
        title: { pt: "Modelo e contexto", en: "Model and context" },
        body: {
          pt: "O LLM é só a peça; o resultado vem do contexto que chega até ele. Prompt especificado como um contrato — entrada, formato, limite — e contexto recuperado do projeto em vez de adivinhado. É aí que a resposta deixa de ser genérica.",
          en: "The LLM is just the part; the result comes from the context that reaches it. A prompt specified like a contract — input, format, boundaries — and context retrieved from the project instead of guessed. That's where the answer stops being generic.",
        },
        tools: [
          "LLMs",
          { pt: "IA generativa", en: "Generative AI" },
          { pt: "Engenharia de prompt", en: "Prompt engineering" },
          "RAG",
          { pt: "Janela de contexto", en: "Context window" },
        ],
      },
      {
        title: { pt: "Orquestração e especialização", en: "Orchestration and specialisation" },
        body: {
          pt: "Um agente genérico resolve tarefa genérica. O ganho real está em decompor: um orquestrador decide o quê, subagentes especializados executam em paralelo, e o contexto do projeto entra por MCP em vez de ser colado no prompt. O difícil continua sendo decidir, não digitar.",
          en: "A generic agent solves a generic task. The real gain is in decomposing it: an orchestrator decides what, specialised subagents run in parallel, and project context arrives through MCP instead of being pasted into a prompt. The hard part is still deciding, not typing.",
        },
        tools: [
          { pt: "Agentes", en: "Agents" },
          { pt: "Subagentes", en: "Subagents" },
          { pt: "Especialização de agentes", en: "Agent specialization" },
          "MCP",
          "Git worktrees",
        ],
      },
      {
        title: { pt: "Proteções e limites", en: "Guardrails" },
        body: {
          pt: "Todo texto que entra num modelo é entrada não confiável — inclusive o que voltou de uma ferramenta. Prompt injection, segredo vazando dentro do contexto e agente com mais permissão do que precisa são falhas de projeto, e é no projeto que se resolvem.",
          en: "Every piece of text entering a model is untrusted input — including what came back from a tool. Prompt injection, secrets leaking into context and an agent holding more permission than it needs are design failures, and design is where they get solved.",
        },
        tools: [
          // Left in English on purpose: "prompt injection" is the term the
          // OWASP list uses and the one Brazilian engineers say out loud.
          "Prompt injection",
          { pt: "Vazamento de dados e segredos", en: "Data & secret leakage" },
          { pt: "Menor privilégio", en: "Least privilege" },
          { pt: "Revisão humana", en: "Human review" },
        ],
      },
      {
        title: { pt: "Custo e arquitetura de IA", en: "Cost and AI architecture" },
        body: {
          pt: "Token é infraestrutura: tem preço, latência e teto. Escolher o modelo pela tarefa, cachear o que repete, medir o que se gasta — e saber reconhecer quando a resposta certa é não usar IA naquele ponto.",
          en: "Tokens are infrastructure: they have a price, a latency and a ceiling. Pick the model for the task, cache what repeats, measure what you spend — and recognise when the right answer is not to use AI at that point at all.",
        },
        tools: [
          { pt: "Arquitetura de IA", en: "AI architecture" },
          { pt: "Controle de custo", en: "Cost control" },
          { pt: "Roteamento de modelo", en: "Model routing" },
          { pt: "Cache", en: "Caching" },
        ],
      },
    ],
  },

  process: {
    eyebrow: { pt: "Como eu construo", en: "How I build" },
    title: {
      pt: "O código funcionar é o meio do caminho.",
      en: "Working code is the halfway point.",
    },
    lead: {
      pt: "O ciclo completo de um produto, do primeiro desenho até a versão que sobe semana que vem.",
      en: "The full cycle of a product, from the first sketch to the version that ships next week.",
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
          pt: "Implementação em componentes reaproveitáveis, com agentes especializados em paralelo no que é repetitivo.",
          en: "Implementation in reusable components, with specialised agents in parallel on whatever is repetitive.",
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
    eyebrow: { pt: "Impacto", en: "Impact" },
    title: { pt: "O que isso significa na prática.", en: "What that means in practice." },
    /*
     * Three figures, three different questions. There were four, and three of
     * them answered the same one: products built, surfaces built and products
     * live all measured volume, so the row said one thing three times over.
     *
     * How long, how much, how far.
     */
    years: { pt: "Anos de experiência", en: "Years of experience" },
    /*
     * Counts surfaces, not products, and only the ones actually running. Every
     * product here is a system: a panel, an admin, one or two apps. "Apps
     * published" left all of that out and framed the work as mobile, which had
     * stopped being true.
     */
    surfaces: { pt: "Sistemas e apps em produção", en: "Systems and apps in production" },

    /*
     * The weight figures. They answer the question the others cannot: not how
     * much was built, but what it carries. Rendered only once set in
     * profile.ts, so the row never shows a gap where a number should be.
     */
    revenue: {
      pt: "Transacionados nos sistemas em que trabalhei",
      en: "Transacted through systems I worked on",
    },
    installs: { pt: "Instalações dos apps publicados", en: "Installs of the apps shipped" },
    /*
     * The reason the figures above are larger than the grid further up. Said
     * plainly, because "I have done more than this" reads as a boast when it is
     * implied and as a fact when it is stated.
     */
    /*
     * Carries the half of the argument that has no number attached to it, and
     * needs none: what these systems hold up. A count of products says nothing
     * about whether any of them survived the week of the year when everybody
     * arrives at once.
     */
    selection: {
      pt: "Os projetos abertos aqui são uma seleção; parte do que construí é interna e não pode ser mostrada. São sistemas em uso diário, em {sectors}, sustentando operação e receita reais, e que já seguraram campanhas com milhares de acessos simultâneos.",
      en: "The projects opened here are a selection; some of what I have built is internal and cannot be shown. These are systems in daily use across {sectors}, holding up real operations and real revenue, that have already carried campaigns with thousands of concurrent users.",
    },
  },

  experience: {
    eyebrow: { pt: "Experiência", en: "Experience" },
    title: { pt: "Onde eu construí isso.", en: "Where I built it." },
    lead: {
      pt: "Arquitetura e ciclo completo dos produtos que construí — do primeiro desenho à manutenção depois de estarem no ar, dentro de uma agência e para clientes diretos.",
      en: "Architecture and the full cycle of the products I built — from the first sketch to the maintenance after they were live, inside an agency and for direct clients.",
    },
    responsibilities: { pt: "Responsabilidades", en: "Responsibilities" },
    highlights: { pt: "Principais contribuições", en: "Key contributions" },
    /* Only shown where the company name doesn't already say what this was. */
    kindFreelance: { pt: "Freelancer", en: "Freelance" },
  },

  about: {
    eyebrow: { pt: "Sobre", en: "About" },
    title: { pt: "Como eu trabalho.", en: "How I work." },
    body: {
      pt: "Comecei pelo mobile e é onde tenho mais estrada, mas parei de me apresentar por plataforma faz tempo. O que muda de um app de loja para um painel no navegador é a superfície; o que decide se o produto sobrevive é a estrutura por baixo — camadas, estado, contrato de API, quem pode o quê.\n\nIA entrou no meu dia a dia como ferramenta de engenharia, não como autocomplete — e por isso ganhou uma seção própria aqui na página. O resumo é que ela encurta muito o caminho até a solução, mas só se você souber reconhecer a solução certa quando ela aparece: a parte difícil continua sendo decidir, não digitar.\n\nSegurança eu trato no desenho. Não é minha especialidade, é uma responsabilidade: já lidei com o suficiente do que dá errado — token, sessão, permissão, dado confiando em quem não devia — para saber que isso não se resolve numa revisão no fim.\n\nGosto de código que a próxima pessoa entende sem precisar me perguntar nada.",
      en: "I started in mobile and that's where I have the most road behind me, but I stopped introducing myself by platform a while ago. What changes between a store app and a browser dashboard is the surface; what decides whether the product survives is the structure underneath — layers, state, the API contract, who is allowed what.\n\nAI came into my day-to-day as an engineering tool rather than an autocomplete — which is why it has a section of its own on this page. The short version is that it shortens the path to a solution enormously, but only if you can recognise the right one when it shows up: the hard part is still deciding, not typing.\n\nSecurity I handle in the design. It isn't my specialism, it's a responsibility: I've dealt with enough of what goes wrong — tokens, sessions, permissions, data trusting something it shouldn't — to know it doesn't get solved in a review at the end.\n\nI like code the next person can read without having to ask me anything.",
    },
  },

  toolkit: {
    eyebrow: { pt: "Ferramentas", en: "Toolkit" },
    title: { pt: "As ferramentas que eu uso.", en: "Tools I build with." },
    lead: {
      pt: "Agrupadas pela camada do produto a que pertencem. Escolhidas por resolverem um problema específico, não por estarem na moda.",
      en: "Grouped by the layer of the product they belong to. Picked because they solve a specific problem, not because they're fashionable.",
    },
  },

  contact: {
    eyebrow: { pt: "Contato", en: "Contact" },
    title: { pt: "Tem um produto em mente?", en: "Have a product in mind?" },
    lead: {
      pt: "Se você precisa de alguém que decida a arquitetura, construa o produto inteiro e continue cuidando dele depois de estar no ar, me chama.",
      en: "If you need someone to settle the architecture, build the whole product and keep looking after it once it's live, get in touch.",
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
