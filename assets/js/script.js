'use strict';

const links = document.querySelectorAll('[data-nav-link]');
const sections = document.querySelectorAll('.main-content > [data-page]');
function setActiveSection(id) {
  links.forEach(link => {
    const active = link.dataset.navLink === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function handleHash() {
  const alias = {projects: 'portfolio', hero: 'home'};
  const hash = location.hash.slice(1) || 'home';
  const id = alias[hash] || hash;
  const target = document.getElementById(id);
  setActiveSection(id === 'mini-projects' ? 'portfolio' : id);
  if (hash === 'mini-projects') filterProjects('all');
  if (target && location.hash) target.scrollIntoView({block: 'start', behavior: 'instant'});
}
window.addEventListener('hashchange', handleHash);
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
  if (visible.length) setActiveSection(visible[0].target.id);
}, {rootMargin: '-10% 0px -65% 0px', threshold: 0});
sections.forEach(section => sectionObserver.observe(section));
// Keep the active link accurate while the long résumé timeline is pinned.
let navigationFrame = 0;
window.addEventListener('scroll', () => {
  if (navigationFrame) return;
  navigationFrame = requestAnimationFrame(() => {
    navigationFrame = 0;
    const marker = (document.querySelector('.studio-topbar')?.offsetHeight || 0) + 100;
    const current = [...sections].find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    });
    if (current) setActiveSection(current.id);
  });
}, {passive: true});
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const projectSelect = document.querySelector('[data-project-select]');
function filterProjects(category) {
  document.querySelectorAll('[data-filter-item]').forEach(project => {
    project.hidden = category !== 'all' && project.dataset.category !== category;
  });
  filterButtons.forEach(button => {
    const selected = button.textContent.toLowerCase() === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  projectSelect.value = category;
  document.querySelectorAll('[data-project-group]').forEach(group => {
    group.hidden = [...group.querySelectorAll('[data-filter-item]')].every(project => project.hidden);
  });
}
filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.textContent.toLowerCase())));
projectSelect.addEventListener('change', () => filterProjects(projectSelect.value));

const form = document.querySelector('[data-form]');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry from ${fields.get('fullname')}`);
  const body = encodeURIComponent(`${fields.get('message')}\n\nFrom: ${fields.get('fullname')}\nEmail: ${fields.get('email')}`);
  window.location.href = `mailto:izhaanzia@gmail.com?subject=${subject}&body=${body}`;
  form.querySelector('[role="status"]').textContent = 'Your email app will open a draft. If it does not open, email izhaanzia@gmail.com directly.';
});
document.querySelector('#year').textContent = new Date().getFullYear();

requestAnimationFrame(handleHash);


const projectDialog = document.querySelector('[data-project-dialog]');
const projectDetails = document.querySelector('[data-project-details]');
document.querySelectorAll('[data-project-open]').forEach(button => {
  button.addEventListener('click', () => {
    const template = button.closest('[data-filter-item]').querySelector('template');
    projectDetails.replaceChildren(template.content.cloneNode(true));
    projectDialog.showModal();
  });
});
document.querySelector('[data-project-close]').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => {
  if (event.target === projectDialog) {
    const bounds = projectDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) projectDialog.close();
  }
});

const toolkitToggle = document.querySelector('[data-toolkit-toggle]');
if (toolkitToggle) toolkitToggle.addEventListener('click', () => {
  const paused = toolkitToggle.closest('.studio-toolkit').classList.toggle('is-paused');
  toolkitToggle.setAttribute('aria-pressed', String(paused));
  toolkitToggle.setAttribute('aria-label', `${paused ? 'Resume' : 'Pause'} toolkit animation`);
  toolkitToggle.innerHTML = `${paused ? 'Play' : 'Pause'} <span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
});
