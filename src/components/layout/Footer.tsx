import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
export default function Footer() { return <footer className="pz-footer"><div className="pz-container pz-footer-grid">
  <div className="pz-footer-brand"><Link href="/" aria-label="PEZVO home"><Image src="/brand/pezvo-logo-droplet.webp" alt="PEZVO — Freshness, Delivered." width={2022} height={778} sizes="(max-width: 640px) 180px, 200px" /></Link><p>A little more care for your clothes.<br/>A little more time for you.</p><span>PREMIUM LAUNDRY & DRY CLEANING</span></div>
  <div><h2>Explore</h2>{[["Services","/services"],["Pricing","/pricing"],["How it works","/how-it-works"],["The care journal","/blog"]].map(([t,h])=><Link key={h} href={h}>{t}</Link>)}</div>
  <div><h2>PEZVO</h2>{[["Our story","/about"],["The care gallery","/gallery"],["For business","/business"],["Questions & answers","/faq"]].map(([t,h])=><Link key={h} href={h}>{t}</Link>)}</div>
  <div><h2>Let’s talk</h2><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a><a href={whatsappLink("Hi PEZVO, I’d like to enquire about garment care.")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp <ArrowUpRight size={14}/></a><Link href="/contact#coverage">Navi Mumbai, Maharashtra</Link><p className="pz-footer-hours">{site.hours.display}</p>{Object.entries(site.social).filter(([,url])=>url).map(([name,url])=><a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}</a>)}</div>
  </div><div className="pz-container pz-footer-bottom"><p>© {new Date().getFullYear()} PEZVO. All rights reserved.</p><div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of service</Link></div><span>Freshness, Delivered.</span></div></footer>; }
