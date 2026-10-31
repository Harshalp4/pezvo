"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { HERO_SCENES } from "@/lib/hero-scenes";
import Action from "./Action";
export default function CinematicHero() {
  const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false),[focused,setFocused]=useState(false);
  const [visible,setVisible]=useState(false),[hidden,setHidden]=useState(false),[reduce,setReduce]=useState(true),[blocked,setBlocked]=useState(false);
  const [progress,setProgress]=useState(0);
  const section=useRef<HTMLElement>(null),video=useRef<HTMLVideoElement>(null),elapsed=useRef(0),touch=useRef<{x:number;y:number}|null>(null);
  // Interacting with the carousel holds the scene, but must not freeze its film.
  // Only the pause control, reduced motion or an invisible hero stops playback.
  const playing=visible&&!hidden&&!reduce&&!paused;
  const rotating=playing&&!hover&&!focused;
  const scene=HERO_SCENES[active];
  const choose=useCallback((index:number)=>{setActive((index+HERO_SCENES.length)%HERO_SCENES.length);elapsed.current=0;setProgress(0);setBlocked(false);},[]);
  useEffect(()=>{
    const query=window.matchMedia("(prefers-reduced-motion: reduce)"); const motion=()=>setReduce(query.matches);motion();query.addEventListener("change",motion);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.15});if(section.current)observer.observe(section.current);
    const visibility=()=>setHidden(document.hidden);visibility();document.addEventListener("visibilitychange",visibility);
    return()=>{query.removeEventListener("change",motion);observer.disconnect();document.removeEventListener("visibilitychange",visibility);};
  },[]);
  useEffect(()=>{
    if(!rotating)return;
    let last=performance.now();const timer=window.setInterval(()=>{const now=performance.now();elapsed.current+=now-last;last=now;setProgress(Math.min(100,elapsed.current/scene.duration*100));if(elapsed.current>=scene.duration)choose(active+1);},80);
    return()=>window.clearInterval(timer);
  },[rotating,active,scene.duration,choose]);
  useEffect(()=>{
    const element=video.current;if(!element)return;
    let cancelled=false;
    if(playing){
      element.play().then(()=>{if(!cancelled)setBlocked(false);}).catch(error=>{
        // Switching scenes or pausing cancels an outstanding play request.
        // That is not an autoplay failure and must not show a stale retry button.
        if(!cancelled&&error.name!=="AbortError")setBlocked(true);
      });
    }else element.pause();
    return()=>{cancelled=true;element.pause();};
  },[playing,active]);
  return <section ref={section} className="pz-hero" aria-roledescription="carousel" aria-label="The PEZVO care experience"
    onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
    onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false);}}
    onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}}
    onTouchEnd={e=>{if(!touch.current)return;const x=e.changedTouches[0].clientX-touch.current.x,y=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(x)>60&&Math.abs(x)>Math.abs(y))choose(active+(x<0?1:-1));touch.current=null;}}>
    {HERO_SCENES.map((item,i)=><div key={item.label} className={`pz-hero-scene ${active===i?"is-active":""}`} aria-hidden={active!==i}>
      <Image src={item.poster} alt="" fill priority={i===0} sizes="100vw" style={{objectPosition:item.position}} />
      {i===active&&item.video&&!reduce&&<video ref={video} src={item.video} poster={item.poster} muted playsInline loop preload="auto" aria-hidden="true" style={{objectPosition:item.position}} />}
    </div>)}
    <div className="pz-hero-shade"/>
    <div className="pz-hero-top"><span>PREMIUM LAUNDRY & DRY CLEANING</span><span className="pz-hero-place"><i/> NAVI MUMBAI</span></div>
    <div className="pz-hero-copy" key={active} aria-live={!rotating?"polite":"off"}>
      <p className="pz-eyebrow">{scene.eyebrow}</p>
      <h1>{scene.headline}<br/><em>{scene.accent}</em></h1>
      <p className="pz-hero-description">{scene.description}</p>
      <div className="pz-hero-actions">{scene.href?<Link className="pz-button pz-button-light" href={scene.href}>{scene.cta}<ArrowUpRight size={18}/></Link>:<Action light source={`hero-${active+1}`}>{scene.cta}</Action>}<a href="#the-pezvo-way" className="pz-hero-secondary">The PEZVO way <ArrowDown size={16}/></a></div>
    </div>
    <div className="pz-hero-control-row"><p><span className="pz-gold">✦</span> Freshness, Delivered.</p><div className="pz-hero-arrows">
      {blocked&&scene.video&&<button className="pz-play-film" onClick={()=>{video.current?.play().then(()=>setBlocked(false)).catch(()=>setBlocked(true));}}>Play film</button>}
      <button aria-label="Previous scene" onClick={()=>choose(active-1)}><ArrowLeft size={17}/></button>
      <button aria-label={paused?"Resume hero motion":"Pause hero motion"} onClick={()=>{setPaused(!paused);if(paused){setFocused(false);setHover(false);}}}>{paused?<Play size={15}/>:<Pause size={15}/>}</button>
      <button aria-label="Next scene" onClick={()=>choose(active+1)}><ArrowRight size={17}/></button>
    </div></div>
    <div className="pz-hero-progress" style={{gridTemplateColumns:`repeat(${HERO_SCENES.length}, minmax(0, 1fr))`}}>{HERO_SCENES.map((item,i)=><button key={item.label} className={i===active?"is-active":""} aria-label={`Show scene ${i+1}: ${item.label}`} aria-current={i===active?"true":undefined} onClick={()=>choose(i)}><span className="pz-track"><span style={{width:i===active?`${progress}%`:i<active?"100%":"0%"}}/></span><span className="pz-scene-index">0{i+1}</span><span>{item.label}</span></button>)}</div>
  </section>;
}
