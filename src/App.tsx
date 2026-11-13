import { useEffect, useRef, useState } from 'react'
import { findByPath } from './core/registry'
import { getGuard, hasUnsaved, markClean } from './core/unsaved'
import { Sidebar } from './components/Sidebar'
import { Placeholder } from './components/Placeholder'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Notices } from './components/Notices'
import { Dialog } from './components/Dialog'
const read = () => location.hash.replace(/^#\/?/, '') || 'dashboard'
export default function App() {
  const [cur, setCur] = useState(read())
  const [pending, setPending] = useState<string | null>(null)
  const curRef = useRef(cur); curRef.current = cur
  // SECTION: navigation guard. Leaving a page with unsaved changes asks first (in-app dialog).
  useEffect(() => {
    const onHash = () => {
      const next = read()
      if (next !== curRef.current && hasUnsaved()) { history.replaceState(null, '', '#/' + curRef.current); setPending(next) } else setCur(next)
    }
    const onUnload = (e: BeforeUnloadEvent) => { if (hasUnsaved()) { e.preventDefault(); e.returnValue = '' } } // browser draws this prompt
    addEventListener('hashchange', onHash); addEventListener('beforeunload', onUnload)
    return () => { removeEventListener('hashchange', onHash); removeEventListener('beforeunload', onUnload) }
  }, [])
  const go = (t: string) => { setPending(null); location.hash = '#/' + t }
  const { mod, trail } = findByPath(cur.split('/'))
  const Page = mod?.page
  return (<div className="shell"><Sidebar cur={cur} /><main>
    <ErrorBoundary key={cur}>{!mod ? <section className="panel placeholder"><h1>Page not found</h1><p>Use the navigation to pick a section.</p></section>
      : Page ? <Page /> : <Placeholder mod={mod} trail={trail} />}</ErrorBoundary></main><Notices />
    {pending && <Dialog title="Leave without saving?" onClose={() => setPending(null)} actions={[
      { label: 'Keep editing', onClick: () => setPending(null) },
      { label: 'Discard and leave', kind: 'danger', onClick: () => { getGuard()?.discard(); markClean(); go(pending) } },
      { label: 'Save and leave', kind: 'primary', onClick: async () => { if (await getGuard()?.save()) { markClean(); go(pending) } else setPending(null) } }]}>
      <p>You changed something on this page and did not save it. Choose what to do with those changes.</p></Dialog>}
  </div>)
}
