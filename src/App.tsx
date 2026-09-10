import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import RouteError from "./components/layout/RouteError"
import RouteErrorBoundary from "./components/layout/RouteErrorBoundary"
import { useRouteScroll } from "./hooks/useRouteScroll"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"

/**
 * The portfolio is a static site, so the app shell stays deliberately bare: no
 * query client, no toast provider, no theme provider. Every provider that isn't
 * earning its place is JavaScript the visitor downloads before the first pixel
 * of the hero.
 *
 * The case-study pages are the one code split. They pull in the phone and
 * browser frames and the three products' interfaces — all of it drawn in code,
 * all of it substantial — and a visitor who never opens a project should never
 * pay for any of it.
 */
const WorkDetail = lazy(() => import("./pages/WorkDetail"))

/**
 * Owns scroll position across route changes. Mounted here rather than in
 * `PageShell` so it also covers NotFound, which renders its own shell.
 *
 * It must stay rendered BEFORE <Routes/>. React commits a parent's deletions
 * before recursing into its children, so only as a preceding sibling does its
 * layout-effect cleanup run early enough to read the outgoing page's scroll
 * position before that page's DOM is removed. Move it after <Routes/> and Back
 * silently starts landing at the top of every page. See useRouteScroll.ts.
 */
const RouteScroll = () => {
  useRouteScroll()
  return null
}

const App = () => (
  <BrowserRouter>
    <RouteScroll />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route
        path="/work/:id"
        element={
          <RouteErrorBoundary fallback={<RouteError />}>
            {/* No spinner: the chunk is small and local, and a flash of loading
                state is worse than a beat of nothing. The scroll reset has
                already put the viewport at the top by the time it resolves. */}
            <Suspense fallback={null}>
              <WorkDetail />
            </Suspense>
          </RouteErrorBoundary>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
