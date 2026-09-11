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

/**
 * What each project puts on the stage, and the only place the screens are named.
 *
 * Which two screens carry a product is an editorial call, not something
 * `surfaces` can compute — so it is written down rather than derived. The rule
 * of thumb behind these choices: the console shows what the product *is* (a
 * dense back office with a lot of modules), the phones show what it *does*, and
 * the cards show the moments that happen in neither, which are usually the ones
 * a screenshot cannot reach.
 */
export const STAGES: Record<string, Stage> = {
  yago: {
    windows: [
      { url: "app.y-studio.com/yago", width: DESKTOP_WIDTH, screen: <StudioYago /> },
    ],
    phones: [<YagoReservation key="guest" />, <YagoStaffTickets key="staff" />],
    cards: [<YagoReservationCard key="reservation" />, <YagoTicketCard key="ticket" />],
  },

  // The one product here with no phone in it at all: two modules of one shell,
  // which is the whole argument and needs both windows to be made at all.
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

  // Five surfaces, and the two that carry the product are the two apps: the
  // same appointment is a search result on one and a conflict to resolve on the
  // other. The consoles behind them are what makes it a marketplace rather than
  // a booking form.
  vez: {
    windows: [
      { url: "app.vez.com.br", width: VEZ_WIDTH, screen: <VezPortal />, background: VEZ_CANVAS },
      { url: "admin.vez.com.br", width: VEZ_WIDTH, screen: <VezAdmin />, background: VEZ_CANVAS },
    ],
    phones: [<VezClient key="customer" />, <VezStore key="business" />],
    cards: [<VezQueueCard key="queue" />, <VezRequestCard key="request" />],
  },
}
