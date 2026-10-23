"use strict";
// Hover, keyboard focus, and taps all expose the same real biography.
document.querySelectorAll('[data-profile-card]').forEach(card => {
 const front = card.querySelector('[data-profile-front]');
 const back = card.querySelector('[data-profile-back]');
 const show = flipped => {
  card.classList.toggle('is-flipped', flipped);
  card.setAttribute('aria-pressed', String(flipped));
  front.setAttribute('aria-hidden', String(flipped));
  back.setAttribute('aria-hidden', String(!flipped));
 };
 card.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) show(true);
 });
 card.addEventListener('pointerleave', () => {
  if (!card.matches(':focus-visible')) show(false);
 });
 card.addEventListener('focus', () => {
  if (card.matches(':focus-visible')) show(true);
 });
 card.addEventListener('blur', () => show(false));
 card.addEventListener('click', event => {
  if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) show(true);
  else show(!card.classList.contains('is-flipped'));
 });
 card.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); show(false); }
 });
});
