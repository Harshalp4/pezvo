// Server-only adapter shared by the PEZVO and Revora Next-compatible websites.
export type RevoraPage = { id:string; slug:string; title:string; description:string; body:string; campaignId:string|null; publishedAt:string };
export async function revoraPages(): Promise<RevoraPage[]> {
  const value = process.env.REVORA_CONTENT_FEED_URL;
  if (!value) return [];
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Revora content feed requires a configured HTTPS URL');
  const response = await fetch(url, {cache:'no-store',redirect:'error',signal:AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error('Revora content feed unavailable');
  // Bound decoded response size before parsing, including compressed HTTP responses.
  const reader=response.body?.getReader(); if(!reader)throw new Error('Empty feed');
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>2_000_000){await reader.cancel();throw new Error('Feed exceeds 2 MB');}chunks.push(value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  const data=JSON.parse(new TextDecoder().decode(bytes));
  if(data.format!=='plain-text'||!Array.isArray(data.pages))throw new Error('Unsupported Revora content feed');
  return data.pages.filter((p:RevoraPage)=>p&&typeof p.slug==='string'&&/^[a-z0-9][a-z0-9-]{0,100}$/.test(p.slug)&&typeof p.title==='string'&&typeof p.description==='string'&&typeof p.body==='string'&&p.body.length<=100000&&typeof p.publishedAt==='string');
}
