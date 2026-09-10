import { RefreshCw } from "lucide-react"

import { useLocale } from "@/i18n/useLocale"

const copy = {
  title: { pt: "Não foi possível carregar esta página", en: "This page couldn't load" },
  body: {
    pt: "Isso normalmente acontece quando o site foi atualizado enquanto esta aba estava aberta. Recarregar resolve.",
    en: "This usually happens when the site was updated while this tab was open. Reloading fixes it.",
  },
  action: { pt: "Recarregar", en: "Reload" },
}

/** What a visitor sees instead of a blank document when a route chunk fails. */
const RouteError = () => {
  const { pick } = useLocale()

  return (
    <main className="relative flex min-h-[100svh] items-center">
      <div className="container">
        <h1 className="display-lg max-w-[16ch] text-balance text-foreground">
          {pick(copy.title)}
        </h1>

        <p className="mt-6 max-w-[46ch] text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          {pick(copy.body)}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="group mt-10 inline-flex h-12 items-center gap-2.5 rounded-full bg-foreground px-6 text-sm font-medium tracking-tight text-background transition-opacity hover:opacity-85"
        >
          <RefreshCw
            size={15}
            className="transition-transform duration-500 group-hover:rotate-180"
            aria-hidden="true"
          />
          {pick(copy.action)}
        </button>
      </div>
    </main>
  )
}

export default RouteError
