"use strict";
// Damped spring rotation; the outer hit area stays still to avoid hover jitter.
(() => {
 const enabled=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion: no-preference)');
 const controllers=[...document.querySelectorAll('#portfolio .project-row')].map(stage=>{
  const card=stage.querySelector('.tilt-card');
  let x=0,y=0,vx=0,vy=0,tx=0,ty=0,frame=0,last=0;
  const tick=time=>{
   const dt=Math.min((time-(last||time-16.7))/1000,.032);last=time;
   vx+=((tx-x)*180-vx*20)*dt;vy+=((ty-y)*180-vy*20)*dt;x+=vx*dt;y+=vy*dt;
   card.style.setProperty('--tilt-x',x.toFixed(3)+'deg');card.style.setProperty('--tilt-y',y.toFixed(3)+'deg');
   if(Math.abs(tx-x)+Math.abs(ty-y)+Math.abs(vx)+Math.abs(vy)>.025)frame=requestAnimationFrame(tick);
   else{frame=0;last=0;if(!stage.classList.contains('is-tilting'))card.style.removeProperty('will-change');}
  };
  const run=()=>{if(!frame){last=0;frame=requestAnimationFrame(tick);}};
  const move=event=>{
   if(!enabled.matches||event.pointerType!=='mouse')return;
   const r=stage.getBoundingClientRect(),px=Math.max(0,Math.min(1,(event.clientX-r.left)/r.width)),py=Math.max(0,Math.min(1,(event.clientY-r.top)/r.height));
   tx=-(py-.5)*11;ty=(px-.5)*11;stage.classList.add('is-tilting');card.style.willChange='transform';
   card.style.setProperty('--shine-x',(px*100).toFixed(1)+'%');card.style.setProperty('--shine-y',(py*100).toFixed(1)+'%');run();
  };
  const leave=()=>{stage.classList.remove('is-tilting');tx=ty=0;run();};
  const reset=()=>{cancelAnimationFrame(frame);frame=last=x=y=vx=vy=tx=ty=0;stage.classList.remove('is-tilting');['--tilt-x','--tilt-y','will-change'].forEach(p=>card.style.removeProperty(p));};
  stage.addEventListener('pointerenter',move);stage.addEventListener('pointermove',move);stage.addEventListener('pointerleave',leave);card.addEventListener('blur',leave);
  return reset;
 });
 enabled.addEventListener('change',()=>controllers.forEach(reset=>reset()));
 window.addEventListener('blur',()=>controllers.forEach(reset=>reset()));
})();
