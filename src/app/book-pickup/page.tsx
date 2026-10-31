import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Action from "@/components/pezvo/Action";
import Link from "next/link";
export const metadata:Metadata={title:"Book a pickup",description:"Request your PEZVO garment-care pickup. Our team confirms your service, price and collection time.",alternates:{canonical:"/book-pickup"}};
export default function Booking(){return <><PageHeader kicker="YOUR NEXT FRESH START" lead="Make time for you." accent="We’ll take the laundry." sub="A few details are all it takes to start. Our team confirms your pickup and price with you."/><section className="pz-section"><div className="pz-container"><div className="pz-booking-page"><p>Tell us your name, contact number, service and preferred time. We’ll check availability for your area and arrange the next step.</p><Action source="booking-page">Request my pickup</Action><p>No online payment. Your pickup is confirmed after our team gets in touch.</p><Link className="pz-text-link" href="/pricing">Browse prices first ↗</Link></div></div></section></>;}
