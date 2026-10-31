import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import {Process,Closing} from "@/components/pezvo/Sections";
import CareStory from "@/components/pezvo/CareStory";
export const metadata:Metadata={title:"How PEZVO works — from your doorstep and back",description:"Request a pickup, confirm your garment-care needs and let PEZVO handle cleaning, finishing and delivery.",alternates:{canonical:"/how-it-works"}};
export default function How(){return <><PageHeader kicker="EFFORTLESS, FROM START TO FINISH" lead="A little less laundry." accent="A lot more living." sub="Tell us what needs care. Our team confirms the details, collects your garments and brings them back beautifully finished."/><Process/><CareStory/><Closing/></>;}
