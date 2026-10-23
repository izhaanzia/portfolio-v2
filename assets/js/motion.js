'use strict';

// Motion is progressive enhancement: page content is visible before this runs.
(() => {
  const gsap = window.gsap;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tools = document.querySelector('[data-filter-tools]');
  const projects = [...document.querySelectorAll('.work-list .project')];
  tools.hidden = false;
  document.querySelectorAll('[data-work-filter]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-work-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const category = button.dataset.workFilter;
      projects.forEach(project => { project.hidden = category !== 'all' && project.dataset.kind !== category; });
      const visible = projects.filter(project => !project.hidden);
      document.querySelector('.work-count').textContent = `${visible.length} projects`;
      if (gsap && !reduced.matches) {
        gsap.killTweensOf(projects);
        gsap.fromTo(visible, {opacity:0.45, y:12}, {opacity:1, y:0, duration:0.32, stagger:0.05, ease:'power2.out', clearProps:'opacity,transform'});
      }
    });
  });

  // Header progress uses a single scheduled write, with no layout reads in scroll.
  const progress = document.querySelector('.reading-progress');
  let frame = 0;
  let scrollRange = 1;
  const measure = () => { scrollRange = Math.max(1, document.documentElement.scrollHeight - innerHeight); update(); };
  const update = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      progress.style.transform = `scaleX(${Math.min(1, scrollY / scrollRange)})`;
      frame = 0;
    });
  };
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', measure, {passive:true});
  window.addEventListener('load', measure, {once:true});
  new ResizeObserver(measure).observe(document.body);
  measure();

  // Keep keyboard users inside the open mobile navigation.
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  document.addEventListener('keydown', event => {
    if (event.key !== 'Tab' || toggle.getAttribute('aria-expanded') !== 'true') return;
    const focusable = [toggle, ...menu.querySelectorAll('a')];
    const first = focusable[0], last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  if (!gsap) return;
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    // One short, coordinated entrance. Never hide off-screen content.
    if (scrollY < 150 && !location.hash) {
      gsap.timeline({defaults:{ease:'power3.out'}, delay:0.08})
        .from('.name-line > span', {yPercent:30, opacity:0, duration:0.8, stagger:0.09})
        .from('.hero-kicker, .hero-lede, .hero-actions', {y:12, opacity:0, duration:0.55, stagger:0.07}, 0.2)
        .from('.hero-portrait', {y:24, rotation:2, opacity:0, duration:0.9, clearProps:'transform,opacity'}, 0.1);
    }
  });
  // Adapted from ibelick/Spotlight, retrieved through 21st.dev.
  // GSAP quickTo replaces React state + Framer Motion springs in the original.
  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const panel = document.querySelector('.portrait-window');
    const light = panel.querySelector('.spotlight');
    const xTo = gsap.quickTo(light, 'x', {duration:0.35, ease:'power2.out'});
    const yTo = gsap.quickTo(light, 'y', {duration:0.35, ease:'power2.out'});
    let bounds;
    const enter = () => { bounds = panel.getBoundingClientRect(); gsap.to(light,{opacity:1,duration:0.25,overwrite:'auto'}); };
    const move = event => { if (!bounds) return; xTo(event.clientX - bounds.left - 165); yTo(event.clientY - bounds.top - 165); };
    const leave = () => gsap.to(light,{opacity:0,duration:0.25,overwrite:'auto'});
    panel.addEventListener('pointerenter', enter);
    panel.addEventListener('pointermove', move, {passive:true});
    panel.addEventListener('pointerleave', leave);
    return () => {
      panel.removeEventListener('pointerenter', enter);
      panel.removeEventListener('pointermove', move);
      panel.removeEventListener('pointerleave', leave);
      xTo.tween.kill(); yTo.tween.kill();
      gsap.set(light,{clearProps:'all'});
    };
  });
  const dialog = document.getElementById('project-dialog');
  const observer = new MutationObserver(() => {
    if (dialog.open && !reduced.matches) gsap.fromTo(dialog,{opacity:0,y:14},{opacity:1,y:0,duration:0.25,ease:'power2.out',overwrite:true,clearProps:'transform,opacity'});
  });
  observer.observe(dialog,{attributes:true,attributeFilter:['open']});
  window.addEventListener('pagehide', () => { media.revert(); observer.disconnect(); }, {once:true});
})();
