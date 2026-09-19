import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = { children: ReactNode; fallback: ReactNode }
type State = { failed: boolean }

class RouteErrorBoundary extends Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error("[portfolio] route failed to render", error, info)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default RouteErrorBoundary
