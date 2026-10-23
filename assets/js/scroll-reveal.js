"use strict";
// Repeatable fades in either scroll direction; content stays readable without JS.
(() => {
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const targets=[...document.querySelectorAll('main h1, main .section-title, .hero-description, .metrics, .feature-card, .project-row, .mini-heading, .tool-row, .toolkit, .skills-details, .experience-row, [data-contact], .resume-intro, .resume-identity, .resume-block, .resume-download')];
 let observer;
 const setup=()=>{
  observer?.disconnect();
  targets.forEach(element=>element.classList.remove('scroll-reveal','reveal-hidden','reveal-pending'));
  if(motion.matches||!('IntersectionObserver' in window))return;
  targets.forEach(element=>{
   const r=element.getBoundingClientRect();
   if(r.bottom<60||r.top>innerHeight-80)element.classList.add('reveal-hidden');
   element.classList.add('scroll-reveal');
  });
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   const visible=entry.isIntersecting&&entry.intersectionRatio>=.12;
   entry.target.classList.toggle('reveal-hidden',!visible&&!entry.target.contains(document.activeElement));
  }),{threshold:[0,.12],rootMargin:'-60px 0px -80px 0px'});
  targets.forEach(element=>observer.observe(element));
 };
 document.addEventListener('focusin',event=>event.target.closest('.scroll-reveal')?.classList.remove('reveal-hidden'));
 motion.addEventListener('change',setup);setup();
})();
