import { BrowserRouter, Route, Routes } from "react-router-dom"

import Index from "./pages/Index"
import NotFound from "./pages/NotFound"

/**
 * The portfolio is a single static page, so the app shell stays deliberately
 * bare: no query client, no toast provider, no theme provider. Every provider
 * that isn't earning its place is JavaScript the visitor downloads before the
 * first pixel of the hero.
 */
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
)

export default App
