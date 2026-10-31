"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, RotateCcw, Check } from "lucide-react";
import type { Service } from "@/lib/types";
import { useCallbackModal } from "../CallbackProvider";

const ITEMS = [
  {name:"Shirt",photo:"shirt",service:"Dry Clean"},
  {name:"Saree",photo:"saree-normal",service:"Dry Clean"},
  {name:"Blazer",photo:"blazer",service:"Dry Clean"},
  {name:"Home linen",photo:"bedsheet",service:"Home Linen"},
  {name:"Shoes",photo:"shoes",service:"Shoe Cleaning"},
  {name:"Leather",photo:"leather",service:"Leather Care"},
  {name:"Soft toy",photo:"soft-toy",service:"Soft Toy Cleaning"},
  {name:"Carpet / sofa",photo:"sofa",service:"Carpet & Sofa"},
];
export default function CareFinder({ services }: { services: Service[] }) {
  const [item, setItem] = useState("");
  const [concern, setConcern] = useState("");
  const {open} = useCallbackModal();
  const selected = ITEMS.find(i=>i.name===item);
  const serviceName = selected?.name === "Shirt" && concern === "Creases only" ? "Steam Press" : selected?.service;
  const service = services.find(s=>s.name===serviceName);
  return <section className="section finder-band" id="care-finder"><div className="wrap">
    <div className="section-heading-row"><div><p className="care-eyebrow">FIND YOUR CARE</p><h2 className="related-heading">What needs a little attention?</h2></div>{item && <button type="button" className="journal-read" onClick={()=>{setItem("");setConcern("");}}><RotateCcw size={16} aria-hidden="true"/> Start again</button>}</div>
    <div className="finder-layout"><div>
      <fieldset><legend>01 / Choose your item</legend><div className="finder-items">{ITEMS.map(i=><button type="button" key={i.name} aria-pressed={item===i.name} onClick={()=>{setItem(i.name);setConcern("");}}><span className="finder-item-photo"><Image src={`/pricing/${i.photo}.webp`} alt="" fill sizes="80px" className="object-contain"/></span><span>{i.name}</span>{item===i.name && <Check className="finder-check" size={15} aria-hidden="true"/>}</button>)}</div></fieldset>
      <fieldset disabled={!item} className="finder-concerns"><legend>02 / What would you like help with?</legend><div className="care-filters">{["Cleaning", ...(item === "Shirt" ? ["Creases only"] : []), "A stain / delicate detail", "Not sure"].map(c=><button type="button" key={c} aria-pressed={concern===c} onClick={()=>setConcern(c)}>{c}</button>)}</div></fieldset>
    </div><div className="finder-result" aria-live="polite" aria-atomic="true">{selected && concern && service ? <>
      <p className="care-eyebrow">A GOOD PLACE TO START</p><h3>{service.name}</h3><p>{concern === "Creases only" ? "For a clean shirt that needs finishing. Pressing does not replace cleaning." : "The team will check the care label, construction and condition before confirming the right treatment."}</p>
      <p className="finder-return">Timing confirmed with your pickup.<small>Specialist treatments may take longer.</small></p>
      <Link className="journal-read" href={`/pricing?service=${encodeURIComponent(service.name)}`}>See item prices <ArrowUpRight size={17} aria-hidden="true"/></Link>
      <button className="finder-book" type="button" onClick={()=>open({source:`care-finder:${item}:${concern}`, service:service.name})}>Discuss my {item.toLowerCase()} <ArrowUpRight size={17} aria-hidden="true"/></button><small>Guidance, not a diagnosis or a guaranteed stain-removal result. Exact price confirmed after assessment.</small>
    </> : <><p className="care-eyebrow">CONSIDERED CARE</p><h3>Every piece is different.</h3><p>Start with your garment and what it needs. We will point you towards a service, with the final treatment confirmed by the team.</p><Link className="journal-read" href="/blog/dry-cleaning-or-steam-press">Cleaning or pressing? <ArrowUpRight size={17} aria-hidden="true"/></Link></>}</div></div>
  </div></section>;
}
