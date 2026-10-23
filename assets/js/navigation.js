"use strict";
(() => {
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const surface=document.querySelector('.portfolio-shell,.resume-page');
 let leaving=false,animation;
 const enter=()=>{
  leaving=false;animation?.cancel();
  if(surface&&!motion.matches&&!document.documentElement.classList.contains('intro-pending'))animation=surface.animate([{opacity:0},{opacity:1}],{duration:650,easing:'cubic-bezier(.2,.65,.25,1)'});
 };
 enter();
 motion.addEventListener('change',()=>{if(motion.matches)animation?.cancel();});
 window.addEventListener('pageshow',event=>{if(event.persisted)enter();});
 document.addEventListener('click',async event=>{
  const link=event.target.closest('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||!/^https?:$/.test(url.protocol)||/\.(pdf|apk|zip)$/i.test(url.pathname))return;
  const path=value=>value.replace(/\/$/,'')||'/';
  if(path(url.pathname)===path(location.pathname)&&url.search===location.search)return;
  if(leaving){event.preventDefault();return;}
  if(!surface||motion.matches)return;
  event.preventDefault();leaving=true;animation?.cancel();
  animation=surface.animate([{opacity:1},{opacity:0}],{duration:260,easing:'ease-in',fill:'forwards'});
  try{await animation.finished;}catch{}
  try{sessionStorage.setItem('portfolio-internal-navigation','1');}catch{}
  location.assign(url.href);
 });
})();
