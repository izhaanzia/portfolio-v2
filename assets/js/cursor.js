"use strict";
(() => {
 const allowed=matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
 let aura=null,frame=0,last=0,x=0,y=0,targetX=0,targetY=0,visible=false;
 const hide=()=>{visible=false;cancelAnimationFrame(frame);frame=last=0;aura?.classList.remove('is-visible','is-pressed');};
 const tick=time=>{
  const delta=Math.min(time-(last||time-16.7),48);last=time;
  const ease=1-Math.exp(-delta/65);
  x+=(targetX-x)*ease;y+=(targetY-y)*ease;
  aura.style.transform=`translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
  if(Math.abs(targetX-x)+Math.abs(targetY-y)>.1)frame=requestAnimationFrame(tick);
  else{frame=last=0;}
 };
 const move=event=>{
  if(!allowed.matches||event.pointerType!=='mouse')return;
  if(!aura){aura=document.createElement('div');aura.className='cursor-aura';aura.setAttribute('aria-hidden','true');document.body.append(aura);}
  targetX=event.clientX;targetY=event.clientY;
  if(!visible){x=targetX;y=targetY;visible=true;aura.style.transform=`translate3d(${x}px,${y}px,0)`;aura.classList.add('is-visible');}
  const target=event.target;
  aura.classList.toggle('is-interactive',!!target.closest('a,button,summary,[role="button"],[data-profile],select,label'));
  aura.classList.toggle('is-editing',!!target.closest('input,textarea,[contenteditable="true"]'));
  aura.style.opacity=target.closest('input,textarea,[contenteditable="true"]')?'0':'';
  if(!frame)frame=requestAnimationFrame(tick);
 };
 document.addEventListener('pointermove',move,{passive:true});
 document.addEventListener('pointerdown',()=>{if(visible)aura?.classList.add('is-pressed');},{passive:true});
 document.addEventListener('pointerup',()=>aura?.classList.remove('is-pressed'),{passive:true});
 document.documentElement.addEventListener('pointerleave',hide);
 window.addEventListener('blur',hide);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();});
 allowed.addEventListener('change',hide);
})();
