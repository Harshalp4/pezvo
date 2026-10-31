import {notFound} from "next/navigation";
import Link from "next/link";
import {revoraPages} from "@/lib/revora-content";
export const dynamic = "force-dynamic";
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const page=(await revoraPages()).find(p=>p.slug===slug);if(!page)return {};return {title:page.title,description:page.description,alternates:{canonical:"/insights/"+page.slug},openGraph:{title:page.title,description:page.description}};}
export default async function Insight({params}:Props){const {slug}=await params;const page=(await revoraPages()).find(p=>p.slug===slug);if(!page)notFound();return <article style={{maxWidth:820,margin:"auto",padding:"100px 24px"}}><Link href="/insights">← All guides</Link><h1 style={{fontSize:42,lineHeight:1.2,fontWeight:700,margin:"28px 0"}}>{page.title}</h1><p style={{fontSize:20,lineHeight:1.6}}>{page.description}</p><div style={{whiteSpace:"pre-wrap",lineHeight:1.85,marginTop:32}}>{page.body}</div><Link href={(process.env.REVORA_LEAD_INTAKE_URL && page.campaignId ? "/enquire?campaign="+encodeURIComponent(page.campaignId)+"&article="+encodeURIComponent(page.slug) : "/contact")} style={{display:"inline-block",marginTop:32,textDecoration:"underline"}}>Speak to our team →</Link></article>;}
