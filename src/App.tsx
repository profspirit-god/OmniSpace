import { useEffect, useState } from 'react'
import { findByPath } from './core/registry'
import { Sidebar } from './components/Sidebar'
import { Placeholder } from './components/Placeholder'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Notices } from './components/Notices'
const read = () => location.hash.replace(/^#\/?/, '') || 'dashboard'
export default function App() {
  const [cur, setCur] = useState(read())
  useEffect(() => { const f = () => setCur(read()); addEventListener('hashchange', f); return () => removeEventListener('hashchange', f) }, [])
  const { mod, trail } = findByPath(cur.split('/'))
  const Page = mod?.page
  return (<div className="shell"><Sidebar cur={cur} /><main>
    <ErrorBoundary key={cur}>{!mod ? <section className="panel placeholder"><h1>Page not found</h1><p>Use the navigation to pick a section.</p></section>
      : Page ? <Page /> : <Placeholder mod={mod} trail={trail} />}</ErrorBoundary></main><Notices /></div>)
}
