import { revoraPages } from "@/lib/revora-content";
export async function POST(request: Request) {
  const origin=request.headers.get('origin');
  if(!origin || origin!==new URL(request.url).origin)return Response.json({error:'Please submit from this website.'},{status:403});
  if(Number(request.headers.get('content-length')||0)>12000)return Response.json({error:'Form too large.'},{status:413});
  const endpoint=process.env.REVORA_LEAD_INTAKE_URL, key=process.env.REVORA_LEAD_INTAKE_KEY;
  if(!endpoint||!key)return Response.json({error:'Online enquiries are not configured yet. Please use the contact page.'},{status:503});
  try {
    const target=new URL(endpoint);
    if(target.protocol!=='https:'||target.username||target.password)throw new Error('Invalid intake configuration');
    const raw=await request.text();if(raw.length>12000)return Response.json({error:'Form too large.'},{status:413});
    const body=JSON.parse(raw);
    if(body.companyWebsite)return Response.json({ok:true});
    if(typeof body.name!=='string'||!body.name.trim()||body.name.length>180||typeof body.email!=='string'||body.email.length>254||!/^\S+@\S+\.\S+$/.test(body.email)||typeof body.eventKey!=='string'||! /^[a-f0-9-]{36}$/i.test(body.eventKey)||typeof body.interest!=='string'||body.interest.length>1000)return Response.json({error:'Please check your name, email and message.'},{status:400});
    const campaignId=body.campaignId||process.env.REVORA_DEFAULT_CAMPAIGN_ID;
    const allowed=campaignId && (campaignId===process.env.REVORA_DEFAULT_CAMPAIGN_ID || (await revoraPages()).some(p=>p.campaignId===campaignId));
    if(!allowed)return Response.json({error:'This campaign is unavailable. Please use the contact page.'},{status:400});
    const response=await fetch(target,{method:'POST',redirect:'error',signal:AbortSignal.timeout(10000),headers:{'Content-Type':'application/json','X-Revora-Lead-Key':key},body:JSON.stringify({eventKey:body.eventKey,campaignId,name:body.name.trim(),email:body.email.trim(),phone:null,source:'website',medium:'enquiry-form',content:typeof body.content==='string'?body.content.slice(0,250):null,interest:body.interest,followUpConsent:body.followUpConsent===true,consentText:body.followUpConsent===true?'I agree to be contacted about this enquiry.':null})});
    if(!response.ok)return Response.json({error:response.status===429?'Too many enquiries. Please try again later.':'We could not record your enquiry. Retry or use the contact page.'},{status:response.status===429?429:502});
    return Response.json({ok:true});
  }catch{return Response.json({error:'We could not confirm receipt. Please retry using this form.'},{status:502});}
}
