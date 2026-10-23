/* BorderGlow by React Bits, adapted to native cards without wrappers.
 * MIT + Commons Clause: vendor/react-bits-LICENSE.txt. */
"use strict";
window.addEventListener('DOMContentLoaded',()=>{
 const enabled=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 const selectors='.identity-card,.feature-card,.ag-panel,.tool-row,.experience-row,.toolkit,.resume-document,.resume-download';
 const controllers=[];
 function mount(card){
  if(card.classList.contains('border-glow-card'))return;
  card.classList.add('border-glow-card');
  if(getComputedStyle(card).position==='static')card.style.position='relative';
  const effects=document.createElement('span');effects.className='border-glow-effects';effects.setAttribute('aria-hidden','true');effects.innerHTML='<span class="bg-border"></span><span class="bg-fill"></span><span class="edge-light"></span>';card.append(effects);
  let frame=0,pointer=null;
  function render(){
   frame=0;if(!pointer||!enabled.matches)return;
   const r=card.getBoundingClientRect(),cx=r.width/2,cy=r.height/2;
   if(!cx||!cy)return;
   const dx=pointer.x-r.left-cx,dy=pointer.y-r.top-cy;
   const proximity=Math.min(1,Math.max(Math.abs(dx)/cx,Math.abs(dy)/cy));
   let angle=Math.atan2(dy,dx)*180/Math.PI+90;if(angle<0)angle+=360;
   card.style.setProperty('--edge-proximity',(proximity*100).toFixed(3));card.style.setProperty('--cursor-angle',angle.toFixed(3)+'deg');card.classList.add('glow-engaged');
  }
  function move(event){if(!enabled.matches||event.pointerType!=='mouse')return;pointer={x:event.clientX,y:event.clientY};if(!frame)frame=requestAnimationFrame(render);}
  function reset(){cancelAnimationFrame(frame);frame=0;pointer=null;card.classList.remove('glow-engaged');}
  card.addEventListener('pointerenter',move,{passive:true});card.addEventListener('pointermove',move,{passive:true});card.addEventListener('pointerleave',reset);controllers.push(reset);
 }
 // Other deferred enhancements create project panels before DOMContentLoaded.
 document.querySelectorAll(selectors).forEach(mount);
 enabled.addEventListener('change',()=>controllers.forEach(reset=>reset()));window.addEventListener('blur',()=>controllers.forEach(reset=>reset()));
});
