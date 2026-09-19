import {
  AGUIAR_CANVAS,
  AGUIAR_WIDTH,
  AguiarAdmin,
  AguiarApp,
  AguiarPortal,
} from "@/components/screens/AguiarOne"
import {
  ShoppingCart,
  ShoppingHome,
  ShoppingOrderCard,
  ShoppingPromoCard,
} from "@/components/screens/Shopping"
import {
  DESKTOP_WIDTH,
  StudioBooking,
  StudioCommerce,
  StudioCrm,
  StudioYago,
} from "@/components/screens/Studio"
import {
  VEZ_CANVAS,
  VEZ_WIDTH,
  VezAdmin,
  VezClient,
  VezPortal,
  VezQueueCard,
  VezRequestCard,
  VezStore,
} from "@/components/screens/Vez"
import {
  YagoReservation,
  YagoReservationCard,
  YagoStaffTickets,
  YagoTicketCard,
} from "@/components/screens/Yago"
import type { Stage } from "./CaseStage"

export const STAGES: Record<string, Stage> = {
  yago: {
    windows: [
      { url: "app.y-studio.com/yago", width: DESKTOP_WIDTH, screen: <StudioYago /> },
    ],
    phones: [<YagoReservation key="guest" />, <YagoStaffTickets key="staff" />],
    cards: [<YagoReservationCard key="reservation" />, <YagoTicketCard key="ticket" />],
  },

  "y-studio": {
    windows: [
      { url: "app.y-studio.com/booking", width: DESKTOP_WIDTH, screen: <StudioBooking /> },
      { url: "app.y-studio.com/crm", width: DESKTOP_WIDTH, screen: <StudioCrm /> },
    ],
  },

  "porto-seguro-shopping": {
    windows: [
      { url: "app.y-studio.com/commerce", width: DESKTOP_WIDTH, screen: <StudioCommerce /> },
    ],
    phones: [<ShoppingHome key="store" />, <ShoppingCart key="bag" />],
    cards: [<ShoppingPromoCard key="promo" />, <ShoppingOrderCard key="order" />],
  },

  "aguiar-one": {
    windows: [
      {
        url: "app.aguiarone.com.br/dashboard",
        width: AGUIAR_WIDTH,
        screen: <AguiarPortal />,
        background: AGUIAR_CANVAS,
      },
      {
        url: "admin.aguiarone.com.br",
        width: AGUIAR_WIDTH,
        screen: <AguiarAdmin />,
        background: AGUIAR_CANVAS,
        span: "sm:w-[46%]",
      },
    ],
    phones: [<AguiarApp key="shop" />],
  },

  vez: {
    windows: [
      { url: "app.vez.com.br", width: VEZ_WIDTH, screen: <VezPortal />, background: VEZ_CANVAS },
      { url: "admin.vez.com.br", width: VEZ_WIDTH, screen: <VezAdmin />, background: VEZ_CANVAS },
    ],
    phones: [<VezClient key="customer" />, <VezStore key="business" />],
    cards: [<VezQueueCard key="queue" />, <VezRequestCard key="request" />],
  },
}
