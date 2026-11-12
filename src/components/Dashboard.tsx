import { useEffect, useRef } from 'react'
// SECTION: MVP dashboard. Starfield (canvas) + orbit rings (CSS) around the OmniSpace title.
export function Dashboard() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current!, g = c.getContext('2d')!
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0
    const stars = Array.from({ length: 160 }, () => ({ a: Math.random() * 6.283, r: Math.random(), s: 0.0008 + Math.random() * 0.002 }))
    const fit = () => { w = c.width = c.clientWidth; h = c.height = c.clientHeight }
    const tick = () => {
      g.clearRect(0, 0, w, h); const m = Math.max(w, h) / 2
      for (const s of stars) {
        if (!calm) s.r += s.s * (0.4 + s.r * 2)
        if (s.r > 1) { s.r = 0.02; s.a = Math.random() * 6.283 }
        const d = s.r * m, x = w / 2 + Math.cos(s.a) * d, y = h / 2 + Math.sin(s.a) * d
        g.fillStyle = `rgba(196,181,253,${Math.min(1, s.r * 1.4)})`; g.fillRect(x, y, 1 + s.r * 1.6, 1 + s.r * 1.6)
      }
      raf = requestAnimationFrame(tick)
    }
    fit(); addEventListener('resize', fit); tick()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', fit) }
  }, [])
  return (<div className="hero"><canvas ref={ref} />
    <div className="orbit o1" /><div className="orbit o2" /><div className="orbit o3" />
    <h1 className="brand">OmniSpace</h1></div>)
}
