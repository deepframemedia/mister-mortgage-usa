/* ============================================================
   NAV.JS — Navigation, navbar scroll, mobile menu
   Note: navigate() is for SPA mode — will be replaced with
   real href links when pages are split (Phase 4).
   ============================================================ */

// ─── PAGE NAVIGATION (SPA) ───
function navigate(page) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => { p.classList.remove('active'); });
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    target.classList.remove('page-fade');
    void target.offsetWidth;
    target.classList.add('page-fade');
  }
  document.querySelectorAll('.nav-link[data-page]').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  initReveal();
}

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE MENU ───
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.add('open');
  document.getElementById('mobile-backdrop').classList.add('open');
  document.body.classList.add('menu-open');
});

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('mobile-backdrop').classList.remove('open');
  document.body.classList.remove('menu-open');
}

document.getElementById('mobile-close').addEventListener('click', closeMobileMenu);
document.getElementById('mobile-backdrop').addEventListener('click', closeMobileMenu);
