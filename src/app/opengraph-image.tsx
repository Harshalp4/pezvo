import {ImageResponse} from "next/og";
import {readFile} from "node:fs/promises";
import path from "node:path";
export const runtime="nodejs";
export const alt="PEZVO — Freshness, Delivered. Premium Laundry & Dry Cleaning";
export const size={width:1200,height:630};
export const contentType="image/png";
export default async function Image(){const logo=await readFile(path.join(process.cwd(),"public/brand/pezvo-logo.png"));return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",background:"#faf9f6",borderBottom:"18px solid #073d4b"}}><img alt="PEZVO" src={`data:image/png;base64,${logo.toString("base64")}`} width={720} height={281}/><div style={{display:"flex",fontSize:22,color:"#647577",marginTop:34,letterSpacing:4}}>THOUGHTFUL CARE. BEAUTIFULLY FINISHED.</div></div>,size);}
