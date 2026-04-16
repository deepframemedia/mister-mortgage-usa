/* ============================================================
   UI.JS — Cursor, scroll reveal, FAQ accordion, contact form
   ============================================================ */

// ─── SCROLL REVEAL ───
function initReveal() {
  const reveals = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
}

window.addEventListener('load', initReveal);
window.addEventListener('scroll', initReveal, { passive: true });
initReveal();

// ─── CUSTOM CURSOR ───
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .loan-card, .team-card, .loan-full-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ─── FAQ ACCORDION ───
function toggleFaq(el) {
  var item = el.parentElement;
  var wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
  if (!wasOpen) item.classList.add('open');
}

// ─── CONTACT FORM ───
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('[type="submit"]');
  btn.textContent = 'Message Sent! ✓';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
