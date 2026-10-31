import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ARTICLES, articleMinutes } from "@/lib/journal";
import ArticleCards from "@/components/journal/ArticleCards";
import { site } from "@/lib/site";

export function generateStaticParams() { return ARTICLES.map(a=>({slug:a.slug})); }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }): Promise<Metadata> {
  const {slug}=await params; const a=ARTICLES.find(a=>a.slug===slug); if(!a) return {};
  return {title:a.title,description:a.excerpt,alternates:{canonical:`/blog/${a.slug}`},openGraph:{title:a.title,description:a.excerpt,type:"article",images:[`${site.url}${a.image}`]}};
}
export default async function ArticlePage({ params }: { params: Promise<{slug:string}> }) {
  const {slug}=await params; const a=ARTICLES.find(a=>a.slug===slug); if(!a) notFound();
  return <><article className="section article-page"><div className="wrap">
    <Link className="journal-read" href="/blog"><ArrowLeft size={17} aria-hidden="true"/> All stories</Link>
    <header className="article-heading"><div className="journal-meta"><span>{a.category}</span><span>{articleMinutes(a)} min read</span></div><h1>{a.title}</h1><p>{a.excerpt}</p></header>
    <div className="article-cover"><Image src={a.image} alt={a.alt} fill priority sizes="(max-width:700px) 100vw, 1200px" className={a.image.includes("/pricing/")?"object-contain":"object-cover"}/></div>
    <div className="article-layout"><aside><p className="eyebrow">IN THIS STORY</p><nav aria-label="Article contents">{a.sections.map((s,i)=><a key={s.title} href={`#part-${i+1}`}>{s.title}</a>)}</nav></aside><div className="article-body"><p className="article-takeaway">{a.takeaway}</p>{a.sections.map((s,i)=><section key={s.title} id={`part-${i+1}`}><h2>{s.title}</h2><p>{s.body}</p></section>)}<p className="article-note">General care guidance. Always follow your garment's care label; the appropriate treatment depends on its fabric, construction and condition.</p><div className="article-next"><h2>Find the care your piece needs.</h2><Link className="journal-read" href={`/services?service=${encodeURIComponent(a.service)}`}>Explore {a.service.toLowerCase()} <ArrowUpRight size={18} aria-hidden="true"/></Link></div></div></div>
  </div></article><section className="section bg-surface-alt"><div className="wrap"><h2 className="related-heading">A little more wardrobe wisdom.</h2><ArticleCards articles={ARTICLES.filter(p=>p.slug!==slug).slice(0,3)}/></div></section></>;
}
