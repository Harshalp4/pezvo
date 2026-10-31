import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import {Closing} from "@/components/pezvo/Sections";
export const metadata:Metadata={title:"The care gallery",description:"Explore the PEZVO brand and the details of garment care, from precision pressing to a fresh doorstep delivery.",alternates:{canonical:"/gallery"}};
const photos=[{src:"/media/precision-press.webp",title:"Precision, in every press.",kind:"GARMENT CARE"},{src:"/media/blazer-care.webp",title:"A considered finish.",kind:"SPECIALIST CARE"},{src:"/media/pezvo-atelier-droplet.webp",title:"The PEZVO atelier.",kind:"BRAND CONCEPT"},{src:"/media/pezvo-delivery-droplet.webp",title:"Freshness at your doorstep.",kind:"BRAND CONCEPT"}];
export default function Gallery(){return <><PageHeader kicker="THE CARE GALLERY" lead="A closer look." accent="A little more care." sub="An expression of the PEZVO experience, through garment-care photography and brand concepts."/><section className="pz-section"><div className="pz-container pz-gallery">{photos.map(p=><figure key={p.src}><Image src={p.src} alt={p.title} width={1200} height={900} sizes="(max-width: 640px) 100vw, 50vw"/><figcaption>{p.title}<span>{p.kind}</span></figcaption></figure>)}</div></section><Closing/></>;}
