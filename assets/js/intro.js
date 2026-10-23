"use strict";
(() => {
 const root=document.documentElement,overlay=document.querySelector('.entry-intro');
 if(!root.classList.contains('intro-pending')){overlay?.remove();return;}
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const profile=document.querySelector('.identity-card'),tile=overlay.querySelector('.entry-tile');
 const cardTarget=()=>{
  const stage=profile.querySelector('.lanyard-stage');
  if(stage?.dataset.cardBounds){const b=JSON.parse(stage.dataset.cardBounds);return {left:b.left,top:b.top,width:b.right-b.left,height:b.bottom-b.top};}
  const r=profile.querySelector('.lanyard-fallback')?.getBoundingClientRect();
  return r?.width?r:profile.getBoundingClientRect();
 };
 const animations=new Set();let finished=false;
 const initialSize={width:innerWidth,height:innerHeight};root.dataset.introState='opening';
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const play=(element,frames,options)=>{const animation=element.animate(frames,options);animations.add(animation);return animation.finished.catch(()=>{}).finally(()=>animations.delete(animation));};
 const finish=(reveal=false)=>{
  if(finished)return;finished=true;root.dataset.introState=reveal?'complete':'skipped';
  animations.forEach(animation=>animation.cancel());animations.clear();
  root.classList.remove('intro-pending','intro-reveal-profile');overlay.remove();
  window.removeEventListener('portfolio-intro-skip',skip);window.removeEventListener('resize',resize);document.removeEventListener('keydown',escape);motion.removeEventListener('change',reduce);
  if(reveal&&!motion.matches){document.querySelectorAll('.floating-nav,main').forEach(element=>element.animate([{opacity:0},{opacity:1}],{duration:650,easing:'ease-out'}));}
  window.dispatchEvent(new Event('resize'));
  window.ScrollTrigger?.refresh();
  window.dispatchEvent(new Event('portfolio-intro-complete'));
 };
 const skip=()=>finish(false),escape=event=>{if(event.key==='Escape')skip();else if(event.key==='Tab'){event.preventDefault();overlay.querySelector('.intro-skip').focus({preventScroll:true});}};
 const resize=()=>{if(Math.abs(innerWidth-initialSize.width)>8||Math.abs(innerHeight-initialSize.height)>8)skip();};
 const reduce=()=>{if(motion.matches)skip();};
 overlay.querySelector('.intro-skip').addEventListener('click',skip);
 window.addEventListener('portfolio-intro-skip',skip);window.addEventListener('resize',resize);document.addEventListener('keydown',escape);motion.addEventListener('change',reduce);
 overlay.querySelector('.intro-skip').focus({preventScroll:true});
 (async()=>{
  try{
   await Promise.race([Promise.all([document.fonts.ready,profile.querySelector('img').decode().catch(()=>{})]),wait(750)]);
   if(finished)return;
   const anchor=({journey:'resume',experience:'resume',projects:'portfolio',tools:'skills'})[location.hash.slice(1)]||location.hash.slice(1);
   window.ScrollTrigger?.refresh();
   if(anchor&&anchor!=='home')document.getElementById(anchor)?.scrollIntoView({behavior:'instant',block:'start'});
   else window.scrollTo({top:0,behavior:'instant'});
   window.dispatchEvent(new Event('portfolio-intro-position'));
   await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
   if(finished)return;
   const cardSize=cardTarget();
   tile.style.width=cardSize.width+'px';tile.style.height=cardSize.height+'px';tile.style.minHeight='0';
   overlay.querySelector('.entry-caption').style.top=`calc(50% + ${cardSize.height/2+22}px)`;
   await play(tile,[{opacity:0,transform:'translateY(18px) rotateZ(-4deg) scale(.94)'},{opacity:1,transform:'none'}],{duration:450,easing:'cubic-bezier(.2,.65,.25,1)',fill:'forwards'});
   if(finished)return;
   overlay.querySelectorAll('code>span').forEach((line,i)=>play(line,[{opacity:0},{opacity:1}],{duration:260,delay:i*35,fill:'both'}));
   await wait(1150);if(finished)return;
   const target=cardTarget(),origin=tile.getBoundingClientRect();
   root.dataset.introTarget=JSON.stringify(target);
   const x=target.left+target.width/2-origin.left-origin.width/2,y=target.top+target.height/2-origin.top-origin.height/2;
   const sx=target.width/origin.width,sy=target.height/origin.height;
   overlay.classList.add('is-docking');root.dataset.introState='docking';
   await play(tile,[{transform:'translate3d(0,0,0) rotateY(0deg) rotateZ(0deg) scale(1)'},{transform:`translate3d(${x*.24}px,${y*.12}px,0) rotateY(-180deg) rotateZ(-5deg) scale(.9)`,offset:.38},{transform:`translate3d(${x}px,${y}px,0) rotateY(-360deg) rotateZ(0deg) scale(${sx},${sy})`}],{duration:1050,easing:'cubic-bezier(.65,0,.2,1)',fill:'forwards'});
   if(finished)return;
   root.classList.add('intro-reveal-profile');root.dataset.introState='revealing';
   await Promise.all([play(profile,[{opacity:0},{opacity:1}],{duration:450,easing:'ease-out',fill:'forwards'}),play(tile,[{opacity:1},{opacity:0}],{duration:420,easing:'ease-out',fill:'forwards'})]);
   finish(true);
  }catch(error){console.warn('Portfolio intro skipped:',error);finish(false);}
 })();
})();
