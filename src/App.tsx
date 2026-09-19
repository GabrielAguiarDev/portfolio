import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import RouteError from "./components/layout/RouteError"
import RouteErrorBoundary from "./components/layout/RouteErrorBoundary"
import { useRouteScroll } from "./hooks/useRouteScroll"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"

const WorkDetail = lazy(() => import("./pages/WorkDetail"))

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
