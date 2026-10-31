import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import CinematicHero from "@/components/pezvo/CinematicHero";
import { Introduction, SignatureServices, Process, Closing } from "@/components/pezvo/Sections";
import CareStory from "@/components/pezvo/CareStory";
import PincodeCheck from "@/components/home/PincodeCheck";
import { getServices, getZones, getTestimonials, fromPrice } from "@/lib/api";
export const revalidate=3600;
export default async function Home(){const [{services,live},{zones},reviews]=await Promise.all([getServices(),getZones(),getTestimonials()]);return <>
<CinematicHero/>
<div className="pz-promise-strip"><span>Considered garment care</span><i>✦</i><span>Pickup at your doorstep</span><i>✦</i><span>Priced by the piece</span><i>✦</i><span>Freshness, Delivered.</span></div>
<Introduction/><SignatureServices services={services}/><Process/><CareStory/>
<section className="pz-section pz-pricing-preview"><div className="pz-container"><div className="pz-section-heading"><div><p className="pz-eyebrow">GOOD CARE. CLEAR PRICES.</p><h2>A little luxury.<br/><em>Without the guesswork.</em></h2></div><div><p>Know what you’re paying for.<br/>Final prices confirmed before cleaning.</p><Link className="pz-text-link" href="/pricing">See the complete rate card <ArrowUpRight size={17}/></Link></div></div><div className="pz-price-list">{services.slice(0,3).map((s,i)=><Link href={`/pricing?service=${encodeURIComponent(s.name)}`} key={s.id}><span className="pz-price-index">0{i+1}</span><h3>{s.name}</h3><span>from <b>₹{fromPrice(s)}</b> / piece</span><ArrowUpRight size={25}/></Link>)}</div>{!live&&<p className="pz-note">Indicative prices from the existing rate card. Please confirm current pricing with our team.</p>}</div></section>
{reviews.length>0&&<section className="pz-section"><div className="pz-container"><p className="pz-eyebrow">FROM OUR CUSTOMERS</p><h2>Care that people<br/><em>come back for.</em></h2><div className="pz-reviews">{reviews.slice(0,3).map((r,i)=><blockquote key={i}><p>“{r.quote}”</p><cite>{r.author}</cite></blockquote>)}</div></div></section>}
<section className="pz-section pz-coverage" id="coverage"><div className="pz-container pz-coverage-grid"><div><p className="pz-eyebrow"><MapPin size={15}/> A LITTLE CLOSER TO YOU</p><h2>Your neighbourhood.<br/><em>Your PEZVO.</em></h2><p>Doorstep garment care across Navi Mumbai.<br/>Check your pincode and let’s take it from there.</p><div className="pz-zone-list">{zones.slice(0,6).map(z=><span key={z.id}>{z.name}</span>)}</div></div><div className="pz-coverage-form"><span className="pz-gold">✦</span><h3>Do we collect near you?</h3><p>Enter your 6-digit pincode.</p><PincodeCheck variant="panel" source="pezvo-home-coverage"/><p className="pz-note">Pickup availability is confirmed by our team.</p></div></div></section><Closing/>
</>;}
