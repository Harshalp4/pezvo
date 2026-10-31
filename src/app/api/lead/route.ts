import { NextResponse } from "next/server";
import type { LeadPayload } from "@/lib/types";
const API=(process.env.NEXT_PUBLIC_PEZVO_API_BASE_URL||"").replace(/\/$/,"");
const WEBHOOK=process.env.PEZVO_LEAD_WEBHOOK_URL;
/** Preserves the existing /api/leads payload. Configure a brand-approved backend explicitly. */
export async function POST(req:Request){
 let raw:unknown;try{raw=await req.json();}catch{return NextResponse.json({ok:false,message:"Malformed request."},{status:400});}
 if(!raw||typeof raw!=="object"||Array.isArray(raw))return NextResponse.json({ok:false,message:"Malformed request."},{status:400});
 const body=raw as Record<string,unknown>;
 if(body.hp)return NextResponse.json({ok:true});
 for(const key of ["name","phone","pincode","area","service","preferredSlot","notes","source","utm"]){if(body[key]!==undefined&&typeof body[key]!=="string")return NextResponse.json({ok:false,message:"Invalid form values."},{status:400});}
 const input=body as unknown as LeadPayload;const name=(input.name||"").trim(),phone=(input.phone||"").replace(/\D/g,"");
 if(!name||name.length>120)return NextResponse.json({ok:false,message:"Please enter your name (up to 120 characters)."},{status:400});
 if(!/^\d{10}$/.test(phone))return NextResponse.json({ok:false,message:"Enter a valid 10-digit phone number."},{status:400});
 if(input.pincode&&!/^\d{6}$/.test(input.pincode))return NextResponse.json({ok:false,message:"Enter a valid 6-digit pincode."},{status:400});
 if((input.notes?.length||0)>2000)return NextResponse.json({ok:false,message:"Please keep your note under 2,000 characters."},{status:400});
 if(!API&&!WEBHOOK)return NextResponse.json({ok:false,message:"Online pickup requests are not available yet. Please call our team to arrange your pickup."},{status:503});
 const payload={name,phone,pincode:input.pincode||null,area:input.area||null,service:input.service||null,preferredSlot:input.preferredSlot||null,notes:input.notes||null,source:input.source||"pezvo-site",utm:input.utm||null,hp:""};
 if(API){try{const response=await fetch(`${API}/api/leads`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000),cache:"no-store"});if(response.ok)return NextResponse.json({ok:true,via:"api"});}catch{/* Fall back only to an explicitly configured sink. */}}
 if(WEBHOOK){try{const response=await fetch(WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:`New PEZVO callback request\nName: ${name}\nPhone: +91 ${phone}\nService: ${payload.service||"-"}`,lead:payload}),signal:AbortSignal.timeout(10000),cache:"no-store"});if(response.ok)return NextResponse.json({ok:true,via:"webhook"});}catch{/* Display failure instead of fabricating a booking. */}}
 return NextResponse.json({ok:false,message:"We couldn’t send your request. Please call our team to arrange your pickup."},{status:502});
}
