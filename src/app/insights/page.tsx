import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import JournalIndex from "@/components/journal/JournalIndex";
import {revoraPages} from "@/lib/revora-content";
export const dynamic="force-dynamic";
export const metadata={title:"Insights & guides",description:"Practical garment-care insights from the PEZVO journal.",alternates:{canonical:"/insights"}};
export default async function Insights(){const pages=await revoraPages().catch(()=>[]);return <><PageHeader kicker="PEZVO INSIGHTS" lead="A little knowledge." accent="A longer wardrobe life." sub="Explore thoughtful guides and practical garment-care ideas."/><section className="pz-section"><div className="pz-container">{pages.length?pages.map(p=><article key={p.id} className="pz-contact-block"><h2><Link href={`/insights/${p.slug}`}>{p.title}</Link></h2><p>{p.description}</p></article>):<JournalIndex/>}</div></section></>;}
