import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { articleMinutes, type Article } from "@/lib/journal";

export default function ArticleCards({ articles }: { articles: Article[] }) {
  return <div className="journal-grid">{articles.map(article => <Link className="journal-card" href={`/blog/${article.slug}`} key={article.slug}>
    <div className="journal-photo"><Image src={article.image} alt={article.alt} fill sizes="(max-width:700px) 100vw, 33vw" className={article.image.includes("/pricing/") ? "object-contain" : "object-cover"}/></div>
    <div className="journal-meta"><span>{article.category}</span><span>{articleMinutes(article)} min read</span></div>
    <h3>{article.title}</h3><p>{article.excerpt}</p><span className="journal-read">Read story <ArrowUpRight size={17} aria-hidden="true"/></span>
  </Link>)}</div>;
}
