import { ArrowLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import { useLocale } from "@/i18n/useLocale"

const copy = {
  title: { pt: "Página não encontrada", en: "Page not found" },
  body: {
    pt: "O endereço que você abriu não existe neste site.",
    en: "The address you opened doesn't exist on this site.",
  },
  back: { pt: "Voltar ao início", en: "Back to home" },
}

const NotFound = () => {
  const { pathname } = useLocation()
  const { pick } = useLocale()

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-[radial-gradient(60%_100%_at_50%_0%,rgba(248,107,39,0.08),transparent_70%)]"
      />

      <div className="container">
        <p className="eyebrow">404</p>

        <h1 className="display-xl mt-6 max-w-[12ch] text-balance text-foreground">
          {pick(copy.title)}
        </h1>

        <p className="mt-7 max-w-[42ch] text-pretty text-base leading-relaxed text-muted-foreground">
          {pick(copy.body)}
        </p>

        <p className="mt-3 font-mono text-xs text-muted-foreground/70">{pathname}</p>

        <Link
          to="/"
          className="group mt-10 inline-flex h-12 items-center gap-2.5 rounded-full bg-foreground px-6 text-sm font-medium tracking-tight text-background transition-opacity hover:opacity-85"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          {pick(copy.back)}
        </Link>
      </div>
    </main>
  )
}

export default NotFound
