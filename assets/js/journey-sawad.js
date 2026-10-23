"use strict";
// Native adaptation of Aceternity UI's sticky labels and scroll-following timeline.
(() => {
 const timeline=document.querySelector('.experience-timeline');
 if(!timeline)return;
 const entries=[...timeline.querySelectorAll('.timeline-entry')];
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,observer;
 const clamp=value=>Math.max(0,Math.min(1,value));
 function render(){
  frame=0;
  const rect=timeline.getBoundingClientRect(),height=window.innerHeight;
  const progress=clamp((height*.12-rect.top)/Math.max(1,rect.height-height*.38));
  timeline.style.setProperty('--timeline-progress',String(motion.matches?1:progress));
  let active=entries[0];
  for(const entry of entries)if(entry.getBoundingClientRect().top<height*.48)active=entry;
  entries.forEach(entry=>{entry.classList.toggle('is-active',entry===active);entry.classList.toggle('is-past',entries.indexOf(entry)<entries.indexOf(active));});
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(render);};
 function setup(){
  observer?.disconnect();
  timeline.classList.toggle('timeline-ready',!motion.matches&&'IntersectionObserver' in window);
  entries.forEach(entry=>entry.classList.add('is-visible'));
  if(!motion.matches&&'IntersectionObserver' in window){
   observer=new IntersectionObserver(records=>records.forEach(record=>record.target.classList.toggle('is-visible',record.isIntersecting||record.target.contains(document.activeElement))),{rootMargin:'-90px 0px -24px 0px',threshold:0});
   entries.forEach(entry=>observer.observe(entry));
  }
  render();
 }
 window.addEventListener('scroll',schedule,{passive:true});
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('portfolio-intro-complete',schedule);
 document.addEventListener('focusin',event=>event.target.closest('.timeline-entry')?.classList.add('is-visible'));
 motion.addEventListener('change',setup);
 const resizeObserver=new ResizeObserver(schedule);resizeObserver.observe(timeline);
 setup();
})();
