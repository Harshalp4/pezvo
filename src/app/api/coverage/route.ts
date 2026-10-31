import {NextResponse} from "next/server";
export async function GET(req:Request){
 const pin=new URL(req.url).searchParams.get("pincode")||"";
 if(!/^\d{6}$/.test(pin))return NextResponse.json({serviceable:false,name:null,message:"Enter a valid 6-digit pincode."},{status:400});
 const base=(process.env.NEXT_PUBLIC_PEZVO_API_BASE_URL||"").replace(/\/$/,"");
 if(base){try{const res=await fetch(`${base}/api/service-zones/check/${pin}`,{cache:"no-store",signal:AbortSignal.timeout(10000)});const body=await res.json();if(body?.data&&typeof body.data.serviceable==="boolean")return NextResponse.json(body.data);}catch{/* No definitive answer from a stale local catalogue. */}}
 return NextResponse.json({serviceable:false,name:null,message:"Live availability is unavailable. Please call our team to confirm pickup in your area."},{status:503});
}
