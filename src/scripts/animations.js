/* ============================================================
   ANIMATIONS.JS — GSAP / ScrollTrigger animations
   Only loaded on the home page.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

function initGSAP() {
  // Hero animations (only when home page is active)
  if (document.getElementById('page-home') && document.getElementById('page-home').classList.contains('active')) {
    gsap.from('.hero-badge',   { opacity: 0, y: 24, duration: 0.7, delay: 0.2, ease: 'power2.out' });
    gsap.from('.hero-h1',      { opacity: 0, y: 36, duration: 0.8, delay: 0.4, ease: 'power2.out' });
    gsap.from('.hero-sub',     { opacity: 0, y: 20, duration: 0.7, delay: 0.65, ease: 'power2.out' });
    gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.7, delay: 0.85, ease: 'power2.out' });
    gsap.from('.hero-trust',   { opacity: 0, y: 16, duration: 0.7, delay: 1.0,  ease: 'power2.out' });
    gsap.from('.hero-right',   { opacity: 0, x: 48, duration: 1.0, delay: 0.5,  ease: 'power2.out' });
  }

  // Stats counter animation
  gsap.utils.toArray('.stat-num').forEach(function(el) {
    const text = el.textContent;
    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (isNaN(num) || num === 0) return;
    const prefix = text.match(/^[^0-9]*/)[0];
    const suffix = text.match(/[^0-9.]*$/)[0];
    gsap.fromTo(el, { innerText: 0 }, {
      innerText: num,
      duration: 1.8,
      ease: 'power2.out',
      snap: { innerText: num > 100 ? 1 : 0.1 },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: function() {
        el.textContent = prefix + Math.round(parseFloat(el.innerText || 0)) + suffix;
      }
    });
  });

  // Calculator section entrance
  gsap.from('#calculator .section-label', {
    opacity: 0, y: 20, duration: 0.6,
    scrollTrigger: { trigger: '#calculator', start: 'top 80%' }
  });
  gsap.from('#calculator .calc-controls', {
    opacity: 0, x: -40, duration: 0.8, delay: 0.2,
    scrollTrigger: { trigger: '#calculator .calc-grid', start: 'top 80%' }
  });
  gsap.from('#calculator .calc-results', {
    opacity: 0, x: 40, duration: 0.8, delay: 0.3,
    scrollTrigger: { trigger: '#calculator .calc-grid', start: 'top 80%' }
  });
}

window.addEventListener('load', initGSAP);
