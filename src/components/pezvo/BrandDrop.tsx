/** Small, decorative companion to PEZVO's approved droplet-and-ripples emblem. */
export default function BrandDrop({ className = "" }: { className?: string }) {
  return <svg className={`pz-brand-drop ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
    <path d="M20 3C17.5 8.7 12.5 15.1 12.5 20.2a7.5 7.5 0 0 0 15 0C27.5 15.1 22.5 8.7 20 3Z" fill="currentColor" />
    <path d="M10.5 23.5C5.7 24.8 3 26.7 3 28.8 3 33.4 10.6 37 20 37s17-3.6 17-8.2c0-2.1-2.7-4-7.5-5.3M11 29.4c2.1 1.3 5.3 2.1 9 2.1s6.9-.8 9-2.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>;
}
