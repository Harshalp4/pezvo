"use client";
import { useState } from "react";
export default function EnquiryForm(){
 const [sent,setSent]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');
 const [eventKey]=useState(()=>typeof crypto!=='undefined'?crypto.randomUUID():'');
 async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setBusy(true);setError('');const form=new FormData(event.currentTarget);const query=new URLSearchParams(window.location.search);
 try{const response=await fetch('/api/revora-enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({eventKey,name:form.get('name'),email:form.get('email'),interest:form.get('interest'),companyWebsite:form.get('companyWebsite'),followUpConsent:form.get('consent')==='on',campaignId:query.get('campaign'),content:query.get('article')})});const result=await response.json();if(!response.ok)throw new Error(result.error);setSent(true);}catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}}
 if(sent)return <p role="status">Your enquiry has been received. Thank you.</p>;
 const input={display:'block',width:'100%',padding:'12px',border:'1px solid #c8cbd8',borderRadius:'8px',marginTop:'6px',color:'#073d4b',background:'#fff'};
 return <form onSubmit={submit} style={{display:'grid',gap:'20px',maxWidth:600}}>
 <label>Your name<input name="name" required maxLength={180} autoComplete="name" style={input}/></label>
 <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" style={input}/></label>
 <label>How can we help?<textarea name="interest" required maxLength={1000} rows={4} style={input}/></label>
 <div aria-hidden="true" style={{position:'absolute',left:-10000}}><label>Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off"/></label></div>
 <label style={{display:'flex',gap:10,alignItems:'start'}}><input type="checkbox" name="consent"/>I agree to be contacted about this enquiry.</label>
 <p style={{fontSize:13}}>Your details are used to handle your enquiry. <a href="/privacy">Privacy policy</a></p>
 {error&&<p role="alert">{error}</p>}<button disabled={busy} type="submit" style={{background:'#073d4b',color:'#fff',padding:14,borderRadius:8,border:0}}>{busy?'Sending…':'Send enquiry'}</button>
 </form>;
}
