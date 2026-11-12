import { Component, type ReactNode } from 'react'
// SECTION: global error handling. Rule: say what happened and what to do next.
export class ErrorBoundary extends Component<{ children: ReactNode }, { err?: Error }> {
  state: { err?: Error } = {}
  static getDerivedStateFromError(err: Error) { return { err } }
  render() {
    if (!this.state.err) return this.props.children
    return (<section className="panel placeholder"><h1>Something broke on this screen</h1>
      <p>{this.state.err.message}</p><p>Reload the page. If it repeats, add it to docs/BUGLOG.md.</p>
      <button onClick={() => location.reload()}>Reload</button></section>)
  }
}
