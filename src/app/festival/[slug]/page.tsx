import PageHeader from "@/components/ui/PageHeader";
import {SignatureServices,Closing} from "@/components/pezvo/Sections";
import {getServices} from "@/lib/api";
export const metadata={title:"Care for your festive favourites",description:"Thoughtful PEZVO garment care for special occasions. Discuss your garments and deadline with our team."};
export default async function Festival(){const {services}=await getServices();return <><PageHeader kicker="FOR THE MOMENTS THAT MATTER" lead="Your festive favourites." accent="Beautifully cared for." sub="From cherished silks to celebration-ready outfits. Tell us what needs care and when you need it, and our team will confirm the details." image="/gallery/wedding-cream.webp"/><SignatureServices services={services}/><Closing/></>;}
