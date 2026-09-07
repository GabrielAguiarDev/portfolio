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
      pt: "Apps que conquistam seu lugar na tela inicial.",
      en: "Apps that earn their place on the home screen.",
    },
    lead: {
      pt: "Especializado em React Native. Levo aplicativos do primeiro commit até a App Store e o Google Play — e continuo cuidando deles depois disso.",
      en: "React Native specialist. I take apps from the first commit to the App Store and Google Play — and keep looking after them from there.",
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
      pt: "Três produtos reais, com usuários reais. Cada um resolveu um problema diferente e me deu um tipo diferente de responsabilidade.",
      en: "Three real products with real users. Each solved a different problem and handed me a different kind of ownership.",
    },
    live: { pt: "Em produção", en: "Live" },
    building: { pt: "Em desenvolvimento", en: "In development" },
    stack: { pt: "Stack", en: "Stack" },
    role: { pt: "Meu papel", en: "My role" },
    more: { pt: "Mais projetos no GitHub", en: "More projects on GitHub" },
  },

  mobile: {
    eyebrow: { pt: "Mobile", en: "Mobile" },
    title: { pt: "Built for mobile.", en: "Built for mobile." },
    lead: {
      pt: "Não é web adaptada para uma tela menor. É um app pensado para o telefone desde a primeira decisão de arquitetura.",
      en: "Not web squeezed into a smaller screen. An app shaped for the phone from the first architectural decision.",
    },
    /** Each one is a real constraint of the platform, paired with the tool that answers it. */
    principles: [
      {
        title: { pt: "Abre rápido ou não abre", en: "It opens fast or not at all" },
        body: {
          pt: "Uma tela que demora três segundos já perdeu a pessoa. Navegação e dados são resolvidos antes da interface aparecer.",
          en: "A screen that takes three seconds has already lost someone. Navigation and data resolve before the interface shows up.",
        },
        tools: ["React Native", "Expo", "React Navigation"],
      },
      {
        title: { pt: "O estado é o produto", en: "State is the product" },
        body: {
          pt: "Carrinho, sessão, cache de rede e dado offline precisam concordar entre si. É onde a maior parte dos bugs de app mora.",
          en: "Cart, session, network cache and offline data have to agree with each other. That's where most app bugs live.",
        },
        tools: ["TanStack Query", "Zustand", "TypeScript"],
      },
      {
        title: { pt: "Quebrar na loja é caro", en: "Breaking in the store is expensive" },
        body: {
          pt: "Uma correção mobile leva dias para chegar no usuário. Por isso teste e pipeline não são opcionais.",
          en: "A mobile fix takes days to reach a user. Which is why tests and a pipeline aren't optional.",
        },
        tools: ["Jest", "Testing Library", "Fastlane"],
      },
      {
        title: { pt: "Publicar faz parte do trabalho", en: "Shipping is part of the job" },
        body: {
          pt: "Assinatura, certificado, versionamento, revisão da Apple. Já passei por isso o suficiente para não ser surpresa.",
          en: "Signing, certificates, versioning, Apple review. I've been through it enough times for it not to be a surprise.",
        },
        tools: ["GitHub Actions", "App Store", "Google Play"],
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
      pt: "O ciclo completo de um aplicativo, do primeiro desenho até a versão que sobe semana que vem.",
      en: "The full cycle of an app, from the first sketch to the version that ships next week.",
    },
    steps: [
      {
        title: { pt: "Ideia", en: "Idea" },
        body: {
          pt: "Entender o que o produto precisa resolver antes de escolher qualquer tecnologia.",
          en: "Understand what the product has to solve before choosing any technology.",
        },
      },
      {
        title: { pt: "Arquitetura", en: "Architecture" },
        body: {
          pt: "Estrutura de pastas, camadas, estado e navegação. Decidido uma vez, no começo.",
          en: "Folder structure, layers, state and navigation. Decided once, up front.",
        },
      },
      {
        title: { pt: "Desenvolvimento", en: "Development" },
        body: {
          pt: "Telas, componentes reaproveitáveis e integração com a API.",
          en: "Screens, reusable components and API integration.",
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
        title: { pt: "App Store & Google Play", en: "App Store & Google Play" },
        body: {
          pt: "Submissão, revisão e release nas duas lojas.",
          en: "Submission, review and release on both stores.",
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
      pt: "Responsável pelo desenvolvimento mobile e pelo ciclo completo dos aplicativos — da arquitetura à loja.",
      en: "Responsible for mobile development and the apps' full cycle — from architecture to the store.",
    },
    responsibilities: { pt: "Responsabilidades", en: "Responsibilities" },
    highlights: { pt: "Principais contribuições", en: "Key contributions" },
  },

  about: {
    eyebrow: { pt: "About", en: "About" },
    title: { pt: "Como eu trabalho.", en: "How I work." },
    body: {
      pt: "Trabalho com mobile porque é onde o produto encosta na vida da pessoa. O app está no bolso dela, precisa abrir na hora, e se travar ela desinstala. Isso muda a forma de decidir tudo — arquitetura, estado, o que carrega primeiro.\n\nMeu trabalho não acaba quando a tela funciona no meu simulador. Acaba quando o build passa, sobe para a loja, e a versão seguinte continua fácil de mexer. Já cuidei do ciclo inteiro de um app: estrutura, integração, teste, pipeline, publicação e o que vem depois.\n\nGosto de código que a próxima pessoa entende sem precisar me perguntar nada.",
      en: "I work on mobile because it's where a product touches someone's actual day. The app is in their pocket, it has to open right now, and if it stutters they delete it. That changes how you decide everything — architecture, state, what loads first.\n\nMy job isn't done when the screen works in my simulator. It's done when the build passes, ships to the store, and the next version is still easy to change. I've carried an app through the whole cycle: structure, integration, tests, pipeline, release, and everything after.\n\nI like code the next person can read without having to ask me anything.",
    },
  },

  toolkit: {
    eyebrow: { pt: "Toolkit", en: "Toolkit" },
    title: { pt: "Tools I build with.", en: "Tools I build with." },
    lead: {
      pt: "Escolhidas por resolverem um problema específico, não por estarem na moda.",
      en: "Picked because they solve a specific problem, not because they're fashionable.",
    },
  },

  contact: {
    eyebrow: { pt: "Contact", en: "Contact" },
    title: { pt: "Tem um produto em mente?", en: "Have a product in mind?" },
    lead: {
      pt: "Se você precisa de alguém que leve um aplicativo da ideia até a loja — e continue cuidando dele —, me chama.",
      en: "If you need someone to take an app from idea to store — and keep looking after it — get in touch.",
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
