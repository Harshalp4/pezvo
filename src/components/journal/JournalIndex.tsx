"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { ARTICLES } from "@/lib/journal";
import ArticleCards from "./ArticleCards";

export default function JournalIndex() {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const filtered = ARTICLES.filter(a => (category === "All stories" || a.category === category) && `${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <><div className="journal-toolbar"><div className="care-filters" aria-label="Story categories">{["All stories", ...Array.from(new Set(ARTICLES.map(a=>a.category)))].map(c=><button key={c} type="button" aria-pressed={c===category} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="journal-search"><Search size={18} aria-hidden="true"/><input aria-label="Search stories" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the journal"/></label></div>
    <p className="journal-count" role="status">{filtered.length} {filtered.length===1 ? "story" : "stories"}</p>
    {filtered.length ? <ArticleCards articles={filtered}/> : <div className="journal-empty"><h2>No stories found.</h2><p>Try a garment name or another category.</p><button className="text-link" onClick={()=>{setCategory("All stories");setQuery("");}}>Clear filters</button></div>}
  </>;
}
