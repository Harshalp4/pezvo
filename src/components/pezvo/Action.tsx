"use client";
import { ArrowUpRight } from "lucide-react";
import { useCallbackModal } from "../CallbackProvider";
export default function Action({children="Book a pickup",source="pezvo",light=false}: {children?:React.ReactNode;source?:string;light?:boolean}) {const {open}=useCallbackModal();return <button className={`pz-button ${light?"pz-button-light":""}`} onClick={()=>open({source})}>{children}<ArrowUpRight size={18}/></button>;}
