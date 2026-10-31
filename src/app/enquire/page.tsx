import PageHeader from "@/components/ui/PageHeader";
import EnquiryForm from "./form";
export const metadata={title:"Send an enquiry",description:"Tell the PEZVO team what you need help with.",robots:{index:false,follow:true}};
export default function Enquire(){return <><PageHeader kicker="HERE TO HELP" lead="Tell us a little more." accent="We’re listening." sub="Share a few details so our team can help with the next step."/><section className="pz-section"><div className="pz-container" style={{maxWidth:900}}><EnquiryForm/></div></section></>;}
