import { Component, type ErrorInfo, type ReactNode } from "react"

/**
 * Keeps a failed lazy route from taking the whole document with it.
 *
 * The case-study pages arrive in their own chunk. A dynamic import that
 * rejects throws during render, and with no boundary anywhere in the tree React
 * unmounts the root — not a degraded page, a blank document with no way back
 * except a manual reload.
 *
 * The realistic way that happens is a deploy: a visitor has the site open, the
 * build is replaced, they click a project, and the hashed chunk URL their tab
 * remembers no longer exists. Which is why the recovery is a reload rather than
 * a retry — the page they need is the new build, and only a reload will fetch it.
 *
 * This is the same posture the motion runtime already takes (`runtime.ts`: "a
 * failed chunk must not break the page"); this was the one path that didn't
 * honour it.
 */
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
