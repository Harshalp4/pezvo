import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import RateCard from "@/components/pezvo/RateCard";
import { Closing } from "@/components/pezvo/Sections";
import { getServices } from "@/lib/api";
export const metadata:Metadata={title:"Pricing — clear care, by the piece",description:"Explore PEZVO’s existing garment-care rate card for dry cleaning, steam pressing, shoes, leather and household fabrics. Confirm current prices with our team.",alternates:{canonical:"/pricing"}};
export const revalidate=3600;
export default async function Pricing({searchParams}:{searchParams:Promise<{service?:string}>}){const [{service},{services,live}]=await Promise.all([searchParams,getServices()]);return <><PageHeader kicker="THE PEZVO RATE CARD" lead="Thoughtful care." accent="Transparent prices." sub="Priced by the piece, with attention to the details. Your final price is confirmed after inspection and before cleaning."/><section className="pz-section"><div className="pz-container">{!live&&<p className="pz-preview-note mb-8">These indicative rates come from the existing catalogue snapshot. Our team will confirm current pricing and service availability.</p>}<RateCard services={services} initialService={service}/><p className="pz-note">Garments are priced per piece. Carpet and sofa-cover units are shown with the item. No online payment is taken when requesting a pickup.</p></div></section><Closing/></>;}
