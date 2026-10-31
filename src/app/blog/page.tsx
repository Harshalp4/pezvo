import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import JournalIndex from "@/components/journal/JournalIndex";
export const metadata: Metadata = { title: "Care Journal | Garment care, explained", description: "Practical guides to sarees, blazers, monsoon storage and choosing garment care in Navi Mumbai.", alternates: { canonical: "/blog" } };
export default function BlogPage() {
  return <><PageHeader kicker="THE CARE JOURNAL" lead="Know your clothes." accent="Care for them well." sub="Thoughtful reads for the pieces you wear every day, and the ones you keep for special days." image="/gallery/dryclean-rack.webp"/><section className="section"><div className="wrap"><JournalIndex/></div></section></>;
}
