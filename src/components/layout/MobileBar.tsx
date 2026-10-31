"use client";
import { ArrowUpRight } from "lucide-react";
import { useCallbackModal } from "../CallbackProvider";
export default function MobileBar() { const {open}=useCallbackModal(); return <div className="pz-mobile-book"><span>Your wardrobe,<br/><b>in good hands.</b></span><button className="pz-button" onClick={()=>open({source:"mobile-bar"})}>Book a pickup <ArrowUpRight size={17}/></button></div>; }
