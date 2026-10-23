/* Adapted from React Bits AccordionGallery; MIT + Commons Clause.
 * See vendor/react-bits-LICENSE.txt. Uses the site's existing GSAP runtime. */
"use strict";
window.addEventListener('DOMContentLoaded',()=>{
 if(!window.gsap)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const mobile=matchMedia('(max-width:620px)');
 document.querySelectorAll('#portfolio .project-list').forEach((list,group)=>{
  const rows=[...list.querySelectorAll('.project-row')];
  const items=rows.map(row=>{const button=row.querySelector('[data-project]');const image=button.querySelector('img');return{button,src:image.src,alt:image.alt,title:button.querySelector('strong').textContent,subtitle:button.querySelector('small').textContent,apk:row.querySelector('.apk-link')};});
  const shell=document.createElement('div');shell.className='project-accordion';if(group)shell.setAttribute('data-mini','');
  const gallery=document.createElement('div');gallery.className='accordion-gallery';gallery.setAttribute('role','group');gallery.setAttribute('aria-label',group?'Mini projects':'Featured projects');shell.append(gallery);
  const panels=items.map((item,i)=>{
   const panel=document.createElement('button');panel.type='button';panel.className='ag-panel';panel.setAttribute('aria-label',item.title+' — select or view project');panel.title=item.title;
   panel.innerHTML='<span class="ag-panel__frame"><span class="ag-panel__media"><img draggable="false" loading="lazy"></span><span class="ag-panel__overlay" aria-hidden="true"></span></span><span class="ag-panel__number" aria-hidden="true"></span><span class="ag-panel__label" aria-hidden="true"><span class="ag-panel__bar"></span><span class="ag-panel__text"></span></span>';
   panel.querySelector('img').src=item.src;panel.querySelector('img').alt=item.alt;panel.querySelector('.ag-panel__text').textContent=item.title;panel.querySelector('.ag-panel__number').textContent=String(i+1).padStart(2,'0');gallery.append(panel);return panel;
  });
  const meta=document.createElement('div');meta.className='ag-project-meta';meta.innerHTML='<div class="ag-project-copy" aria-live="polite" aria-atomic="true"><strong></strong><small></small></div><div class="ag-project-actions"><button type="button" class="ag-details">View project details <span aria-hidden="true">↗</span></button><a class="ag-apk" download hidden>Download APK ↗</a></div>';shell.append(meta);
  const hint=document.createElement('p');hint.className='ag-hint';hint.textContent='Hover or select a panel to explore. Use arrow keys to move between projects.';shell.append(hint);
  list.before(shell);list.classList.add('accordion-source');
  let active=0,tl=null,resizeFrame=0;
  function layout(animate=true){
   const vertical=mobile.matches,count=items.length,ratio=vertical ? .55 : .58;
   const total=vertical?gallery.clientHeight:gallery.clientWidth;
   const size=Math.max(140,(total-10*(count-1))*ratio);
   gallery.style.setProperty('--ag-media-size',size+'px');
   const grow=(ratio*(count-1))/(1-ratio);const duration=animate && !reduced.matches ? .65 : 0;
   tl?.kill();tl=gsap.timeline();
   panels.forEach((panel,i)=>{
    const selected=i===active;panel.classList.toggle('ag-panel--active',selected);panel.setAttribute('aria-pressed',String(selected));
    tl.to(panel,{flexGrow:selected?grow:1,rotateY:vertical?0:(selected?0:i<active?6:-6),rotateX:0,duration,ease:'power3.out'},0);
    const shift=Math.max(-1.5,Math.min(1.5,active-i))*.5*size*.06;
    tl.to(panel.querySelector('.ag-panel__media'),{xPercent:-50,yPercent:-50,x:vertical?0:selected?0:shift,y:vertical?(selected?0:shift):0,'--ag-gray':selected?0:1,'--ag-dim':selected?0:.35,duration,ease:'power3.out'},0);
    tl.to([panel.querySelector('.ag-panel__bar'),panel.querySelector('.ag-panel__text')],{opacity:selected?1:0,x:selected?0:-14,duration,ease:'power3.out',stagger:reduced.matches?0:.04},0);
   });
   const item=items[active];meta.querySelector('strong').textContent=item.title;meta.querySelector('small').textContent=item.subtitle;
   const apk=meta.querySelector('.ag-apk');apk.hidden=!item.apk;if(item.apk)apk.href=item.apk.href;
  }
  function select(i,focus=false){if(active!==i){active=i;layout();}if(focus)panels[i].focus({preventScroll:true});}
  panels.forEach((panel,i)=>{
   let selectedAtPress=false;

   panel.addEventListener('pointerdown',()=>{selectedAtPress=active===i;});
   panel.addEventListener('focus',()=>select(i));
   panel.addEventListener('click',e=>{if(e.detail===0||selectedAtPress)items[i].button.click();else select(i);});
   panel.addEventListener('keydown',e=>{
    let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=(i+1)%items.length;else if(['ArrowLeft','ArrowUp'].includes(e.key))next=(i-1+items.length)%items.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=items.length-1;
    if(next!==undefined){e.preventDefault();select(next,true);}
   });
  });
  let lastPointer=null;
  gallery.addEventListener('pointermove',event=>{
   if(event.pointerType!=='mouse'||mobile.matches)return;
   const moved=!lastPointer||Math.abs(event.clientX-lastPointer.x)+Math.abs(event.clientY-lastPointer.y)>1;
   lastPointer={x:event.clientX,y:event.clientY};
   if(!moved)return;
   const panel=event.target.closest('.ag-panel');const index=panels.indexOf(panel);if(index>=0)select(index);
  },{passive:true});
  gallery.addEventListener('pointerleave',()=>{lastPointer=null;});
  meta.querySelector('.ag-details').addEventListener('click',()=>items[active].button.click());
  const observer=new ResizeObserver(()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>layout(false));});observer.observe(gallery);
  mobile.addEventListener('change',()=>layout(false));reduced.addEventListener('change',()=>layout(false));
  layout(false);
 });
});
