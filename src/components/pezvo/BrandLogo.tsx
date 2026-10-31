import Image from "next/image";

/** The supplied artwork stays intact; only its isolated gold emblem moves. */
export default function BrandLogo({ priority = false, footer = false }: { priority?: boolean; footer?: boolean }) {
  const sizes = footer ? "(max-width: 640px) 180px, 200px" : "(max-width: 640px) 137px, (max-width: 1100px) 155px, 178px";
  return <span className="pz-brand-logo">
    <Image className="pz-logo-wordmark" src="/brand/pezvo-logo-droplet.webp" alt="PEZVO — Freshness, Delivered." width={2022} height={778} sizes={sizes} priority={priority} />
    <Image className="pz-logo-drop-layer" src="/brand/pezvo-logo-droplet.webp" alt="" aria-hidden="true" width={2022} height={778} sizes={sizes} priority={priority} />
    <svg className="pz-logo-water-motion" viewBox="0 0 2022 778" fill="none" aria-hidden="true" focusable="false">
      <ellipse className="pz-logo-ripple" cx="1833" cy="147" rx="77" ry="27" stroke="#c99a54" strokeWidth="7" />
      <ellipse className="pz-logo-ripple pz-logo-ripple-delayed" cx="1833" cy="147" rx="77" ry="27" stroke="#d9af68" strokeWidth="5" />
    </svg>
  </span>;
}
