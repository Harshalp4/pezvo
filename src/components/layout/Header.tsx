"use client";
import Link from "next/link";
import BrandLogo from "@/components/pezvo/BrandLogo";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";
import { useCallbackModal } from "../CallbackProvider";
export default function Header() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const { open } = useCallbackModal();
  useEffect(() => { setExpanded(false); }, [pathname]);
  useEffect(() => {
    if (!expanded) return;
    function key(e: KeyboardEvent) { if (e.key === "Escape") { setExpanded(false); trigger.current?.focus(); } }
    document.addEventListener("keydown", key); return () => document.removeEventListener("keydown", key);
  }, [expanded]);
  return <header className="pz-header"><div className="pz-header-inner">
    <Link href="/" aria-label="PEZVO home" className="pz-logo"><BrandLogo priority /></Link>
    <nav aria-label="Main navigation" className="pz-desktop-nav">{NAV_LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
    <button className="pz-button pz-header-book" onClick={() => open({ source: "header" })}>Book a pickup <ArrowUpRight size={17} /></button>
    <button ref={trigger} className="pz-menu-toggle" aria-label={expanded ? "Close menu" : "Open menu"} aria-controls="mobile-menu" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? <X /> : <Menu />}</button>
  </div>{expanded && <nav id="mobile-menu" className="pz-mobile-nav" aria-label="Mobile navigation"><Link href="/" onClick={() => setExpanded(false)}>Home</Link>{NAV_LINKS.map(l => <Link href={l.href} key={l.href} onClick={() => setExpanded(false)}>{l.label}<ArrowUpRight size={18} /></Link>)}<button className="pz-button" onClick={() => { setExpanded(false); open({ source: "mobile-menu" }); }}>Book a pickup <ArrowUpRight size={18}/></button></nav>}</header>;
}
