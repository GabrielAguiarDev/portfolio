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


const MONITOR = 16 / 10

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
