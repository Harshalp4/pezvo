import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BusinessEnquiryForm from "@/components/pezvo/BusinessEnquiryForm";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "PEZVO for business", description: "Discuss garment and linen care for your business, residential community or team with PEZVO in Navi Mumbai.", alternates: { canonical: "/business" } };
export default function Business() {
  return <>
    <PageHeader kicker="PEZVO FOR BUSINESS" lead="Great care." accent="Good for business." sub="For teams, hospitality and residential communities. Let’s discuss the care your business needs." image="/media/pezvo-atelier-droplet.webp" />
    <section className="pz-section"><div className="pz-container pz-content-grid pz-contact-enquiries">
      <div><p className="pz-eyebrow">A LITTLE MORE CARE, AT EVERY SCALE</p><h2>Your care needs.<br /><em>A personal conversation.</em></h2><p>From a team’s uniforms to a guest’s fresh linen, good care makes a difference. Share your volume, location and schedule so we can discuss the right arrangement.</p><p>For hotels, salons, offices, residential communities and larger personal orders.</p><a className="pz-text-link" href={whatsappLink("Hi PEZVO, I’d like to discuss garment care for my business.")} target="_blank" rel="noopener noreferrer">Talk on WhatsApp ↗</a></div>
      <BusinessEnquiryForm initialType="Commercial care" />
    </div></section>
  </>;
}
