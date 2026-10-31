"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ChevronDown, Grid2X2, Search, Shirt, X } from "lucide-react";
import { fromPrice, rateRows } from "@/lib/api";
import { pricingPhoto, pricingUnit, SERVICE_VISUALS } from "@/lib/pricing-visuals";
import { useCallbackModal } from "@/components/CallbackProvider";
import type { Service } from "@/lib/types";

function selectedService(services: Service[], initial?: string) {
  return initial === "All" || services.some(service => service.name === initial)
    ? initial!
    : services[0]?.name ?? "All";
}

const rupees = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });

export default function RateCard({ services, initialService }: { services: Service[]; initialService?: string }) {
  const [category, setCategory] = useState(() => selectedService(services, initialService));
  const [query, setQuery] = useState("");
  const { open } = useCallbackModal();
  const router = useRouter();

  useEffect(() => {
    setCategory(selectedService(services, initialService));
  }, [initialService, services]);

  const groups = useMemo(() => services
    .filter(service => category === "All" || service.name === category)
    .map(service => ({ service, rows: rateRows(service).filter(row =>
      `${row.name} ${service.name}`.toLowerCase().includes(query.toLowerCase().trim())) }))
    .filter(group => group.rows.length), [services, category, query]);
  const count = groups.reduce((total, group) => total + group.rows.length, 0);

  function chooseService(name: string) {
    setCategory(name);
    setQuery("");
    router.replace(`/pricing?service=${encodeURIComponent(name)}`, { scroll: false });
  }

  return <div className="pz-catalogue" id="care-catalogue">
    <aside className="pz-catalogue-sidebar">
      <p className="pz-eyebrow">CHOOSE YOUR CARE</p>
      <nav className="pz-catalogue-nav" aria-label="Filter prices by service">
        {services.map(service => {
          const visual = SERVICE_VISUALS[service.name];
          return <button type="button" key={service.id} aria-pressed={category === service.name} onClick={() => chooseService(service.name)}>
            <span className="pz-category-photo">{visual
              ? <Image src={`/pricing/${visual.photo}.webp`} alt="" fill sizes="48px" />
              : <Shirt size={22} aria-hidden="true" />}</span>
            <span><strong>{service.name}</strong><small>From ₹{rupees.format(fromPrice(service))}</small></span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>;
        })}
        <button type="button" className="pz-all-care" aria-pressed={category === "All"} onClick={() => chooseService("All")}>
          <span className="pz-category-photo"><Grid2X2 size={20} aria-hidden="true" /></span>
          <span><strong>All services</strong><small>The complete collection</small></span>
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </nav>
      <div className="pz-catalogue-help"><span className="pz-gold" aria-hidden="true">✦</span><p>A special piece?<br /><em>Let’s talk about its care.</em></p><Link href="/contact">Ask the PEZVO team <ArrowUpRight size={15} aria-hidden="true" /></Link></div>
    </aside>

    <div className="pz-catalogue-main">
      <div className="pz-catalogue-tools">
        <div className="pz-mobile-category">
          <label htmlFor="care-category">Choose your care</label>
          <div><select id="care-category" value={category} onChange={event => chooseService(event.target.value)}>{services.map(service => <option key={service.id} value={service.name}>{service.name}</option>)}<option value="All">All services</option></select><ChevronDown size={18} aria-hidden="true" /></div>
        </div>
        <div className="pz-catalogue-search">
          <label htmlFor="rate-search" className="sr-only">Search garments and services</label>
          <Search size={19} aria-hidden="true" />
          <input id="rate-search" type="search" placeholder="Find your piece — shirt, saree, blazer…" value={query} onChange={event => setQuery(event.target.value)} />
          {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={18} aria-hidden="true" /></button>}
        </div>
      </div>
      <div className="pz-catalogue-meta"><p className="pz-eyebrow">THE CARE COLLECTION</p><p role="status" aria-live="polite" aria-atomic="true">{count} {count === 1 ? "item" : "items"}{category === "All" ? " across all services" : ` in ${category}`}</p></div>

      {groups.map(({ service, rows }) => <section key={service.id} className="pz-catalogue-group" aria-labelledby={`care-${service.id}`}>
        <div className="pz-catalogue-heading"><div><h2 id={`care-${service.id}`}>{service.name}</h2><p>{SERVICE_VISUALS[service.name]?.description || service.description}</p></div><span>From <b>₹{rupees.format(fromPrice(service))}</b></span></div>
        <ul className={`pz-item-grid${rows.length === 1 ? " is-single" : rows.length === 2 ? " is-pair" : ""}`}>
          {rows.map(row => {
            const photo = pricingPhoto(row.name);
            return <li key={row.name} className="pz-item-card">
              <div className="pz-item-photo">{photo
                ? <Image src={photo} alt="" fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 300px" />
                : <Shirt size={64} strokeWidth={1} aria-hidden="true" />}</div>
              <div className="pz-item-details"><h3>{row.name}</h3><p className="pz-item-price"><span>₹{rupees.format(row.price)}</span><small>/ {pricingUnit(row.name)}</small></p><button type="button" onClick={() => open({ source: "pricing", service: service.name })} aria-label={`Request ${service.name} pickup for ${row.name}`}>Book pickup <ArrowUpRight size={18} aria-hidden="true" /></button></div>
            </li>;
          })}
        </ul>
      </section>)}
      {groups.length === 0 && <div className="pz-catalogue-empty"><Search size={30} strokeWidth={1} aria-hidden="true" /><h2>No pieces found.</h2><p>Try a different name, or explore the complete care collection.</p><button type="button" className="pz-button" onClick={() => chooseService("All")}>View all services <ArrowUpRight size={17} aria-hidden="true" /></button></div>}
      <div className="pz-catalogue-footnote"><span className="pz-gold" aria-hidden="true">✦</span><p>Every piece is a little different. Final prices are confirmed after inspection, before we begin. Images illustrate garment types.</p></div>
    </div>
  </div>;
}
