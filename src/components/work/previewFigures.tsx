import type { ReactNode } from "react"

import Miniature from "@/components/device/Miniature"
import PhoneFrame from "@/components/device/PhoneFrame"
import {
  AGUIAR_CANVAS,
  AGUIAR_WIDTH,
  AguiarApp,
  AguiarPortal,
} from "@/components/screens/AguiarOne"
import { ShoppingHome } from "@/components/screens/Shopping"
import {
  BrowserFrame,
  DESKTOP_WIDTH,
  StudioBooking,
  STUDIO_CANVAS,
  StudioCommerce,
  StudioYago,
} from "@/components/screens/Studio"
import { VEZ_CANVAS, VEZ_WIDTH, VezClient, VezPortal } from "@/components/screens/Vez"
import { YagoHome } from "@/components/screens/Yago"
import type { Project } from "@/content/work"
import { useLocale } from "@/i18n/useLocale"

import PreviewSkeleton from "./PreviewSkeleton"

/**
 * The interfaces the hover preview shows, and the only place they are named.
 *
 * This module is loaded lazily, on the first hover over the work index. That
 * matters: it pulls in the phone frame, the browser frame and four products'
 * screens — the same weight that was deliberately split out of the home page
 * when the case studies moved to their own routes. Paying for it when someone
 * reaches for a project is fine; paying for it on every first paint is not.
 *
 * Each project names its own preview rather than deriving one from `platforms`,
 * because the right figure is an editorial choice — and at card size it is a
 * different choice than at full size.
 */

/**
 * The shape a monitor actually has.
 *
 * A dashboard authored whole is two and a half screens tall, and a browser
 * frame drawn around all of it is a frame no monitor has ever been — in a
 * preview card it reads as a long ribbon rather than as a computer. Cropping to
 * 16:10 shows what a laptop shows: the top of the page, with the rest running
 * past the bottom edge the way it does in the product.
 */
const MONITOR = 16 / 10

/**
 * A desktop console with the app that belongs to it resting on its corner.
 *
 * Three of these products are a system rather than an app: an operations panel
 * the staff work in, and a phone the customer holds. Showing one surface makes
 * a system look like an app, and showing two side by side makes them look like
 * two products. Overlapped, the phone reads as belonging to the window behind
 * it — which is the relationship the case study spends six paragraphs arguing.
 *
 * The phone hangs off the lower-right because that is the quietest region of
 * every one of these dashboards: the rail, the page title and the KPI row all
 * live top-left, and none of them are worth covering.
 */
const PortalWithApp = ({
  url,
  width,
  background,
  portal,
  app,
}: {
  url: string
  width: number
  background: string
  portal: ReactNode
  app: ReactNode
}) => (
  <div className="relative w-full pb-[1.25rem] pr-[0.75rem]">
    <BrowserFrame url={url} className="shadow-[0_18px_40px_-24px_rgba(0,0,0,0.85)]">
      <Miniature width={width} ratio={MONITOR} background={background}>
        {portal}
      </Miniature>
    </BrowserFrame>

    <div className="absolute -bottom-[0.25rem] right-0 w-[4.25rem]">
      <PhoneFrame lit={false}>{app}</PhoneFrame>
    </div>
  </div>
)

const FIGURES: Record<string, ReactNode> = {
  yago: (
    <PortalWithApp
      url="app.y-studio.com/yago"
      width={DESKTOP_WIDTH}
      background={STUDIO_CANVAS}
      portal={<StudioYago />}
      app={<YagoHome />}
    />
  ),
  // Y-Studio is the one product here with no phone in it at all, so it gets the
  // window on its own — at the same monitor proportion as the others.
  "y-studio": (
    <BrowserFrame url="app.y-studio.com/booking">
      <Miniature width={DESKTOP_WIDTH} ratio={MONITOR} background={STUDIO_CANVAS}>
        <StudioBooking />
      </Miniature>
    </BrowserFrame>
  ),
  "porto-seguro-shopping": (
    <PortalWithApp
      url="app.y-studio.com/commerce"
      width={DESKTOP_WIDTH}
      background={STUDIO_CANVAS}
      portal={<StudioCommerce />}
      app={<ShoppingHome />}
    />
  ),
  "aguiar-one": (
    <PortalWithApp
      url="app.aguiarone.com.br/dashboard"
      width={AGUIAR_WIDTH}
      background={AGUIAR_CANVAS}
      portal={<AguiarPortal />}
      app={<AguiarApp />}
    />
  ),
  vez: (
    <PortalWithApp
      url="app.vez.com.br"
      width={VEZ_WIDTH}
      background={VEZ_CANVAS}
      portal={<VezPortal />}
      app={<VezClient />}
    />
  ),
}

/**
 * A real capture always wins over the drawn screen — the moment a project has
 * one, the preview should show the product rather than the illustration of it.
 *
 * The capture's own `frame` decides what is drawn around it, the same way
 * `CaseGallery` reads it. Assuming a phone here would put the first desktop
 * capture anyone drops into `/public/screens` inside a 120px handset — a trap
 * laid directly across the workflow `content/work.ts` documents.
 */
const PreviewFigure = ({ project }: { project: Project }) => {
  const { pick } = useLocale()
  const capture = project.figures?.[0]

  if (capture?.src) {
    const alt = capture.alt ? pick(capture.alt) : project.name

    return capture.frame === "browser" ? (
      <BrowserFrame url={capture.url ?? ""} screenshot={capture.src} alt={alt} />
    ) : (
      <div className="mx-auto w-[7.5rem]">
        <PhoneFrame lit={false} screenshot={capture.src} alt={alt} />
      </div>
    )
  }

  return <>{FIGURES[project.id] ?? <PreviewSkeleton project={project} />}</>
}

export default PreviewFigure
