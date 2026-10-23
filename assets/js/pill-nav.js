/* PillNav by React Bits: native adaptation of the supplied component.
 * MIT + Commons Clause: vendor/react-bits-LICENSE.txt.
 * Existing navigation owns links and aria-current; this layer only adds motion. */
"use strict";
(()=>{
 const nav=document.querySelector('.floating-nav');if(!nav)return;
 const links=[...nav.querySelectorAll('a')];const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 nav.classList.add('pill-nav');
 links.forEach(link=>{
  const face=document.createElement('span');face.className='pn-face';while(link.firstChild)face.append(link.firstChild);
  const fill=document.createElement('span');fill.className='pn-fill';fill.setAttribute('aria-hidden','true');link.append(fill,face);
 });
 const glide=document.createElement('span');glide.className='pn-glide';glide.setAttribute('aria-hidden','true');nav.append(glide);
 let x0=0,x1=0,v0=0,v1=0,alpha=0,frame=0,last=0,press=1,pressVelocity=0,pressing=false;
 let target=null;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function tick(now){
  frame=0;const dt=last?Math.min(.05,(now-last)/1000):1/60;last=now;
  let busy=false;
  if(target){
   const left=target.offsetLeft,right=left+target.offsetWidth;
   if(alpha<.02){x0=left;x1=right;v0=v1=0;}
   if(reduced.matches){x0=left;x1=right;v0=v1=0;alpha=1;press=1;pressVelocity=0;}
   else{
    const direction=Math.sign((left+right-x0-x1)/2),base=520,zeta=1-.55*.3;
    const k0=direction<0?base*1.45:direction>0?base*.75:base;
    const k1=direction>0?base*1.45:direction<0?base*.75:base;
    const steps=Math.ceil(dt/(1/240)),h=dt/steps;
    for(let i=0;i<steps;i++){
     v0+=(-k0*(x0-left)-2*zeta*Math.sqrt(k0)*v0)*h;x0+=v0*h;
     v1+=(-k1*(x1-right)-2*zeta*Math.sqrt(k1)*v1)*h;x1+=v1*h;
    }
    alpha+=(1-alpha)*(1-Math.exp(-dt/.06));
    const pressTarget=pressing?.95:1;pressVelocity+=(-700*(press-pressTarget)-30*pressVelocity)*dt;press+=pressVelocity*dt;
    busy=Math.abs(x0-left)+Math.abs(x1-right)>.1||Math.abs(v0)+Math.abs(v1)>.5||alpha<.999||Math.abs(press-pressTarget)>.001||Math.abs(pressVelocity)>.01;
   }
   const width=Math.max(0,x1-x0),squash=1-clamp((width/Math.max(target.offsetWidth,1)-1)*.3,0,.14);
   glide.style.width=width+'px';glide.style.transform=`translate3d(${x0}px,0,0) scale(${press},${press*squash})`;glide.style.opacity=String(alpha);
  }else{glide.style.opacity='0';alpha=0;}
  if(busy)frame=requestAnimationFrame(tick);else last=0;
 }
 function refresh(){
  target=links.find(link=>link.hasAttribute('aria-current'))||null;
  links.forEach(link=>link.style.setProperty('--pn-fill',(Math.ceil(2*Math.hypot(link.offsetWidth/2,link.offsetHeight))+2)+'px'));
  if(!frame){last=0;frame=requestAnimationFrame(tick);}
 }
 const observer=new MutationObserver(refresh);observer.observe(nav,{subtree:true,attributes:true,attributeFilter:['aria-current']});
 const resize=new ResizeObserver(refresh);resize.observe(nav);
 nav.addEventListener('pointerdown',e=>{if(e.button===0){pressing=true;refresh();}});
 const release=()=>{if(pressing){pressing=false;refresh();}};
 window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);window.addEventListener('blur',release);
 reduced.addEventListener('change',refresh);document.fonts.ready.then(refresh);refresh();
 let revealed=false;
 function reveal(){
  if(revealed||reduced.matches)return;revealed=true;
  const width=nav.offsetWidth,height=nav.offsetHeight;
  nav.animate([{clipPath:`inset(0 ${Math.max(0,width-height)}px 0 0 round ${height/2}px)`},{clipPath:`inset(0 0 0 0 round ${height/2}px)`}],{duration:760,easing:'cubic-bezier(.22,1,.36,1)'});
  links.forEach((link,i)=>link.querySelector('.pn-face').animate([{opacity:0,transform:'translateX(-8px)'},{opacity:1,transform:'translateX(0)'}],{duration:500,delay:100+i*45,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'}));
 }
 if(document.documentElement.classList.contains('intro-pending'))window.addEventListener('portfolio-intro-complete',reveal,{once:true});else requestAnimationFrame(reveal);
})();
