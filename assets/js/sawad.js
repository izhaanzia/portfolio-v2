"use strict";
const dialog=document.querySelector('[data-dialog]');
const content=document.querySelector('[data-dialog-content]');
const dialogMotion=matchMedia('(prefers-reduced-motion: reduce)');
let dialogAnimation=null;
let dialogClosing=false;
const closeProject=()=>{
 if(!dialog.open||dialogClosing)return;
 if(dialogMotion.matches){dialog.close();return;}
 dialogClosing=true;
 const current=getComputedStyle(dialog);
 const from={opacity:current.opacity,transform:current.transform};
 dialogAnimation?.cancel();
 dialog.dataset.closing='true';
 dialogAnimation=dialog.animate([from,{opacity:0,transform:'translateY(16px) scale(.98)'}],{duration:220,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
 dialogAnimation.finished.then(()=>dialog.close()).catch(()=>{});
};
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 content.replaceChildren(button.closest('.project-row').querySelector('template').content.cloneNode(true));
 dialog.showModal();
 dialog.scrollTop=0;
 if(!dialogMotion.matches)dialogAnimation=dialog.animate([
  {opacity:0,transform:'translateY(28px) scale(.96)'},
  {opacity:1,transform:'translateY(0) scale(1)'}
 ],{duration:460,easing:'cubic-bezier(.16,1,.3,1)'});
}));
document.querySelector('.dialog-close').addEventListener('click',closeProject);
dialog.addEventListener('cancel',event=>{event.preventDefault();closeProject();});
dialog.addEventListener('close',()=>{dialogAnimation?.cancel();dialogAnimation=null;dialogClosing=false;delete dialog.dataset.closing;});
let backdropPressed=false;
dialog.addEventListener('pointerdown',event=>{
 const r=dialog.getBoundingClientRect();
 backdropPressed=event.target===dialog&&(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom);
});
dialog.addEventListener('click',event=>{
 if(backdropPressed&&event.target===dialog)closeProject();
 backdropPressed=false;
});
const profile=document.querySelector('[data-profile]');
const flip=value=>{profile.classList.toggle('flipped',value);profile.setAttribute('aria-pressed',String(value));profile.querySelector('.portrait-front').setAttribute('aria-hidden',String(value));profile.querySelector('.portrait-back').setAttribute('aria-hidden',String(!value));};
profile.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&matchMedia('(hover:hover)').matches)flip(true);});
profile.addEventListener('pointerleave',()=>{if(!profile.matches(':focus-visible'))flip(false);});
profile.addEventListener('focus',()=>{if(profile.matches(':focus-visible'))flip(true);});
profile.addEventListener('blur',()=>flip(false));
profile.addEventListener('click',e=>flip(e.pointerType==='mouse'&&matchMedia('(hover:hover)').matches?true:!profile.classList.contains('flipped')));
profile.addEventListener('keydown',e=>{if(e.key==='Escape')flip(false);});
const pause=document.querySelector('[data-pause]');
pause.addEventListener('click',()=>{const paused=pause.closest('.toolkit').classList.toggle('paused');pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-pressed',String(paused));});
const form=document.querySelector('[data-contact]');
form.addEventListener('submit',event=>{event.preventDefault();if(!form.reportValidity())return;const f=new FormData(form);const subject=encodeURIComponent('Portfolio enquiry: '+f.get('interest'));const body=encodeURIComponent(f.get('message')+'\n\nFrom: '+f.get('name')+'\nEmail: '+f.get('email'));location.href='mailto:izhaanzia@gmail.com?subject='+subject+'&body='+body;document.querySelector('[data-form-status]').textContent='Your email app will open with your message ready to send.';});
document.querySelector('[data-year]').textContent=new Date().getFullYear();
const aliases={journey:'resume',projects:'portfolio',experience:'resume',tools:'skills',thoughts:'certifications',hero:'home',overview:'home'};
function navigateHash(behavior='instant'){if(document.documentElement.classList.contains('intro-pending'))return;const id=aliases[location.hash.slice(1)]||location.hash.slice(1);if(id==='home'){window.scrollTo({top:0,behavior});return;}if(id)document.getElementById(id)?.scrollIntoView({behavior,block:'start'});}
window.addEventListener('hashchange',()=>navigateHash(matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'));
history.scrollRestoration='manual';
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();history.pushState(null,'',link.hash);navigateHash(matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth');}));
window.addEventListener('load',()=>document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>navigateHash()))));
const sections=[...document.querySelectorAll('main>section[id]')];
let frame=0;window.addEventListener('scroll',()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;let current=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<innerHeight*.4)current=section;}document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===current.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{passive:true});


// Establish the initial active menu even before the first scroll.
window.dispatchEvent(new Event("scroll"));

window.addEventListener('portfolio-intro-complete',()=>requestAnimationFrame(()=>requestAnimationFrame(()=>navigateHash())));
