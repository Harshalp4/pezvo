import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Action from "@/components/pezvo/Action";
import BusinessEnquiryForm from "@/components/pezvo/BusinessEnquiryForm";
import PincodeCheck from "@/components/home/PincodeCheck";
import { site, whatsappLink } from "@/lib/site";
import { getZones } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact & service areas",
  description: "Talk to PEZVO about bulk laundry, commercial garment and linen care, or a personal pickup in Navi Mumbai.",
  alternates: { canonical: "/contact" },
};

export default async function Contact() {
  const { zones, live } = await getZones();
  return <>
    <PageHeader kicker="LET’S TALK" lead="Good care starts" accent="with a conversation." sub="A favourite piece. A larger order. Care for your business. Tell us what you need — we’re here to help, 9am–9pm, every day." />
    <section className="pz-section">
      <div className="pz-container pz-contact-enquiries">
        <div>
          <div className="pz-contact-block"><h2>CALL OUR TEAM</h2><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a><a href={`tel:${site.phoneAlt}`}>{site.phoneAltDisplay}</a></div>
          <div className="pz-contact-block"><h2>CHAT WITH US</h2><a href={whatsappLink("Hi PEZVO, I’d like to enquire about garment care.")} target="_blank" rel="noopener noreferrer">Start a WhatsApp conversation ↗</a>{site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}</div>
          <div className="pz-contact-block"><h2>VISIT THE TEAM</h2><address>{site.address.line1}<br />{site.address.line2}<br />{site.address.locality}, {site.city} {site.address.pincode}</address><a className="pz-text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.full)}`} target="_blank" rel="noopener noreferrer">Find us on Maps ↗</a></div>
          <div className="pz-contact-callback"><h2>Just a few favourites?</h2><p>For your everyday laundry or a personal pickup, request a callback from our team.</p><Action source="contact">Request a callback</Action></div>
        </div>
        <BusinessEnquiryForm />
      </div>
    </section>
    <section className="pz-section pz-coverage" id="coverage"><div className="pz-container pz-coverage-grid"><div><p className="pz-eyebrow">YOUR NEIGHBOURHOOD. YOUR PEZVO.</p><h2>A fresh start,<br /><em>closer to home.</em></h2><div className="pz-zone-list">{zones.map(z => <span key={z.id}>{z.name} · {z.pincode}</span>)}</div>{!live && <p className="pz-note">Areas shown from the existing service catalogue. Please confirm current pickup availability.</p>}</div><div className="pz-coverage-form"><h3>Do we collect near you?</h3><p>Enter your 6-digit pincode.</p><PincodeCheck variant="panel" source="contact-coverage" /></div></div></section>
  </>;
}
