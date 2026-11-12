// SECTION: placeholder line-art icon (SVG). Replace per-key later. No emoji anywhere.
export function Icon({ name, size = 20 }: { name?: string; size?: number }) {
  return (<svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden data-icon={name}>
    <circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></svg>)
}
