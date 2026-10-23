"use strict";
// Flow adapted from the user's recording. All content is readable without JS.
(() => {
 const section=document.querySelector('.career-journey'), gsap=window.gsap, ScrollTrigger=window.ScrollTrigger;
 if(!section || !gsap || !ScrollTrigger) return;
 gsap.registerPlugin(ScrollTrigger);
 const pinFrame=section.closest('.journey-pin');
 const stage=section.querySelector('.journey-stage'), viewport=section.querySelector('.journey-viewport'), track=section.querySelector('.journey-track');
 const items=[...section.querySelectorAll('.journey-step')], controls=section.querySelector('.journey-controls'), foot=section.querySelector('.journey-foot');
 const prev=controls.querySelector('[data-journey-prev]'), next=controls.querySelector('[data-journey-next]'), position=section.querySelector('[data-journey-position]');
 const clamp=value=>Math.max(0,Math.min(1,value));
 const media=gsap.matchMedia();
 let initialAnchorPending = location.hash === '#resume';
 media.add('(min-width: 700px) and (min-height: 780px) and (prefers-reduced-motion: no-preference)',()=>{
  section.classList.add('is-horizontal'); pinFrame.classList.add('is-pinned-journey'); controls.hidden=false; foot.hidden=false;
  let distance=1, width=1, stops=[], active=0;
  const reveals=items.map(item=>gsap.timeline({paused:true})
   .fromTo(item.querySelector('.journey-stem'),{scaleY:0},{scaleY:1,duration:.35,ease:'none'})
   .fromTo(item.querySelector('.journey-marker'),{scale:0},{scale:1,duration:.2,ease:'power2.out'},.2)
   .fromTo(item.querySelector('.journey-copy').children,{opacity:0,y:22},{opacity:1,y:0,duration:.45,stagger:.045,ease:'power2.out'},.28));
  const measure=()=>{
   width=viewport.clientWidth; distance=Math.max(1,track.scrollWidth-width);
   stops=items.map(item=>clamp((item.offsetLeft-width*.25)/distance));
  };
  const render=progress=>{
   const travel=progress*distance; active=0;
   items.forEach((item,index)=>{
    const local=clamp((travel+width*.78-item.offsetLeft)/(width*.38));
    reveals[index].progress(local);
    item.style.setProperty('--line-progress',String(clamp((travel+width*.6-item.offsetLeft)/item.offsetWidth)));
    if(local>.55) active=index;
   });
   const label=`${active+1} / ${items.length}`;
   if(position.textContent!==label) position.textContent=label;
   prev.disabled=progress<.01; next.disabled=progress>.99;
  };
  measure(); const model={progress:0};
  const timeline=gsap.timeline({scrollTrigger:{trigger:pinFrame,pin:pinFrame,start:()=>`top ${96}px`,end:()=>`+=${Math.max(1200,distance*1.3)}`,scrub:.9,invalidateOnRefresh:true,onRefreshInit:measure},onUpdate:()=>render(model.progress)});
  timeline.to(track,{x:()=>-distance,duration:1,ease:'none'},0).to(model,{progress:1,duration:1,ease:'none'},0);
  render(0);
  const seek=direction=>{
   const progress=timeline.scrollTrigger.progress;
   const target=direction>0 ? (stops.find(stop=>stop>progress+.04) ?? 1) : ([0,...stops].reverse().find(stop=>stop<progress-.04) ?? 0);
   const trigger=timeline.scrollTrigger;
   window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*target,behavior:'smooth'});
  };
  const back=()=>seek(-1), forward=()=>seek(1);
  prev.addEventListener('click',back); next.addEventListener('click',forward);
  const pageReady = document.readyState === 'complete' ? Promise.resolve() : new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
  Promise.all([document.fonts.ready,pageReady]).then(()=>{
   if(!section.classList.contains('is-horizontal')) return;
   ScrollTrigger.refresh();
   if(initialAnchorPending && location.hash === '#resume' && !document.documentElement.classList.contains('intro-pending')) {
    initialAnchorPending=false;
    requestAnimationFrame(()=>document.getElementById('resume').scrollIntoView({block:'start',behavior:'instant'}));
   }
  });
  return ()=>{
   prev.removeEventListener('click',back); next.removeEventListener('click',forward);
   reveals.forEach(reveal=>reveal.kill());
   gsap.set(items.flatMap(item=>[item.querySelector('.journey-stem'),item.querySelector('.journey-marker'),...item.querySelector('.journey-copy').children]),{clearProps:'transform,opacity'});
   section.classList.remove('is-horizontal'); pinFrame.classList.remove('is-pinned-journey'); controls.hidden=true; foot.hidden=true;
   items.forEach(item=>item.style.removeProperty('--line-progress'));
  };
 });
})();
