import { prefersReducedMotion } from "@/animation"

import PreviewSkeleton from "./PreviewSkeleton"

/**
 * The one place the preview's screens chunk is named.
 *
 * Split out of `WorkPreview` so the lazy import and its prefetch can be shared
 * without that file exporting anything but a component — which is what Fast
 * Refresh needs in order to hot-reload it.
 *
 * The `catch` is not defensive tidiness, it is the whole safety story. React's
 * `lazy` caches a *rejection* permanently and never retries, and the module map
 * will not re-request a URL that already failed — so a rejected import throws on
 * every subsequent render, forever. The home route has no error boundary above
 * it, which means one failed chunk would unmount the entire page from nothing
 * more than a hover. The realistic trigger is a deploy: a visitor with the page
 * open, a new build, and a hashed chunk URL their tab still remembers.
 *
 * Resolving to the skeleton instead keeps the failure exactly the size it
 * should be — a preview that shows a shape rather than a screen. It is the same
 * posture as the motion runtime's "a failed chunk must not break the page".
 */
export const loadPreviewFigures = () =>
  import("./previewFigures").catch(() => ({ default: PreviewSkeleton }))

/**
 * Starts fetching the interfaces before anything needs them.
 *
 * The chunk behind the preview carries three products' screens. Waiting for a
 * row's own hover means the first project a visitor points at shows the
 * skeleton while ~37kB arrives; firing this when the pointer reaches the list
 * buys the width of the heading — usually enough that the first card is already
 * the real thing. Repeat calls are free: the module cache answers them.
 *
 * Gated on exactly the conditions under which the card can appear at all. A
 * touch pointer fires `pointerenter` before `pointerdown`, so without the first
 * check any thumb landing on the list — to tap a project, or just to start a
 * drag-scroll — would pull the whole chunk on a device that can never render
 * it. The second covers the desktop visitor who has asked for less motion: the
 * preview is switched off for them too, so the bytes would be pure waste.
 */
export const prefetchPreview = () => {
  if (prefersReducedMotion()) return
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return
  void loadPreviewFigures()
}
