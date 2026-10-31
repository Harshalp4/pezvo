import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, ShieldCheck } from "lucide-react";
import RateCard from "@/components/pezvo/RateCard";
import { Closing } from "@/components/pezvo/Sections";
import { getServices } from "@/lib/api";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Pricing — clear care, by the piece",
  description: "Find your garment in PEZVO’s visual care catalogue. Explore prices for dry cleaning, steam pressing, shoes, leather and household fabrics.",
  alternates: { canonical: "/pricing" },
};
export const revalidate = 3600;

export default async function Pricing({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const [{ service }, { services, live }] = await Promise.all([searchParams, getServices()]);
  return <>
    <section className="pz-price-intro">
      <div className="pz-container pz-price-intro-grid">
        <div className="pz-price-intro-copy"><p className="pz-eyebrow"><span className="pz-gold" aria-hidden="true">✦</span> THE PEZVO CARE MENU</p><h1>Good care.<br /><em>Beautifully priced.</em></h1><p>From your Monday shirt to your most-loved silk.<br className="pz-price-desktop-break" /> Find the right care, with a clear price for every piece.</p><a href="#care-catalogue" className="pz-text-link">Explore the collection <ArrowDown size={17} aria-hidden="true" /></a></div>
        <div className="pz-price-still-life" aria-hidden="true">
          <div className="pz-price-shirt"><Image src="/pricing/shirt.webp" alt="" fill sizes="(max-width: 640px) 45vw, 260px" priority /><span>THE EVERYDAY</span></div>
          <div className="pz-price-silk"><Image src="/pricing/saree-navvari.webp" alt="" fill sizes="(max-width: 640px) 25vw, 165px" priority /></div>
          <div className="pz-price-shoes"><Image src="/pricing/shoes.webp" alt="" fill sizes="(max-width: 640px) 28vw, 185px" priority /></div>
          <span className="pz-price-still-caption">For everything you love.</span>
          <span className="pz-price-spark" aria-hidden="true">✦</span>
        </div>
      </div>
    </section>
    <div className="pz-price-assurances"><div className="pz-container"><p><Check size={16} aria-hidden="true" /> Clear prices, by the piece</p><p><ShieldCheck size={16} aria-hidden="true" /> Confirmed before cleaning</p><p><Check size={16} aria-hidden="true" /> No online payment to book</p></div></div>
    <section className="pz-price-collection"><div className="pz-container">
      {!live && <p className="pz-pricing-notice">Indicative prices. Our team will confirm current rates and availability when you book.</p>}
      <RateCard services={services} initialService={service} />
      <p className="pz-pricing-units">Garments are priced per piece. Carpet and sofa-cover units are shown with each item.</p>
    </div></section>
    <Closing />
  </>;
}
