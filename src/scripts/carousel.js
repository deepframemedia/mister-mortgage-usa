/* ============================================================
   CAROUSEL.JS — Loan carousel + loan info modal
   Only loaded on the home page.
   ============================================================ */

// ─── LOAN DATA ───
var loanCards = [
  {
    name: 'Fixed Rate Mortgage',
    page: 'loan-fixed',
    icon: '<path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
    desc: 'Lock in your interest rate for the life of your loan and enjoy the same predictable monthly payment for 15 or 30 years. Perfect for buyers who value stability, long-term planning, and protection from rising interest rates.',
    benefits: [
      'Consistent monthly payment — forever',
      'Protection from market rate increases',
      '15-year or 30-year term options',
      'Build equity consistently over time',
      'Competitive rates for qualified buyers'
    ]
  },
  {
    name: 'FHA Home Loan',
    page: 'loan-fha',
    icon: '<path d="M3 10.5L12 3l9 7.5V21H15v-6H9v6H3V10.5z"/>',
    desc: 'Government-backed financing designed to make homeownership accessible. With a down payment as low as 3.5% and flexible credit requirements starting at 580, FHA loans open the door for millions of buyers who may not qualify for conventional financing.',
    benefits: [
      'Down payment as low as 3.5%',
      'Flexible credit score requirements (580+)',
      'Gift funds accepted for down payment',
      'Competitive government-backed rates',
      'Ideal for first-time homebuyers'
    ]
  },
  {
    name: 'VA Home Loan',
    page: 'loan-va',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    desc: 'The ultimate homeownership benefit for those who served our country. VA loans offer eligible military borrowers zero down payment, no monthly PMI, and competitive rates — as a thank you for your service and sacrifice.',
    benefits: [
      'Zero down payment required',
      'No private mortgage insurance (PMI)',
      'Below-market competitive rates',
      'Flexible credit guidelines',
      'Reusable benefit — use multiple times'
    ]
  },
  {
    name: 'USDA Loan',
    page: 'loan-usda',
    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    desc: '100% financing for eligible rural and suburban areas — no down payment required. USDA loans offer below-market rates and no PMI for qualifying buyers. Many areas around South Florida qualify — more than most people realize.',
    benefits: [
      'Zero down payment — 100% financing',
      'No private mortgage insurance',
      'Below-market interest rates',
      'Closing costs can be rolled into loan',
      '30-year fixed rate term'
    ]
  },
  {
    name: 'Jumbo Loan',
    page: 'loan-jumbo',
    icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    desc: 'Tailored financing for high-value properties exceeding conventional loan limits in South Florida\'s luxury market. With access to multiple jumbo lenders, we secure the most competitive rates for purchases up to $5M and beyond.',
    benefits: [
      'Loan amounts up to $5M+',
      'Fixed and adjustable rate options',
      'Primary, second home & investment',
      'Flexible underwriting guidelines',
      'Expert guidance in luxury market'
    ]
  },
  {
    name: 'First-Time Homebuyer',
    page: 'loan-first-time',
    icon: '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    desc: 'Buying your first home is one of life\'s most exciting milestones. We specialize in guiding first-time buyers through every step — from understanding your budget to finding down payment assistance programs to handing you the keys.',
    benefits: [
      'Down payment assistance programs',
      'Free homebuyer education resources',
      'Low down payment options (3%–3.5%)',
      'Dedicated loan officer support',
      'Connection to trusted real estate agents'
    ]
  },
  {
    name: 'Low Down Payment',
    page: 'loan-low-down',
    icon: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>',
    desc: 'Don\'t let a large down payment hold you back. Our low down payment programs let qualified buyers get into their home sooner — with conventional loans from 3% down and access to Florida\'s down payment assistance grants.',
    benefits: [
      'Conventional loans from 3% down',
      'Florida down payment assistance grants',
      'Gift funds accepted from family',
      'Multiple programs to match your situation',
      'Faster path to homeownership'
    ]
  },
  {
    name: 'Rehab Loan (203k)',
    page: 'loan-rehab',
    icon: '<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
    desc: 'The FHA 203(k) Rehab Loan combines your home purchase price and renovation costs into one single mortgage — with just one closing, one payment, and one low interest rate. Buy a fixer-upper and transform it into your dream home.',
    benefits: [
      'Purchase + renovation in one loan',
      'Down payment as low as 3.5%',
      'Covers structural & cosmetic repairs',
      'Single closing saves time & money',
      'Instant equity potential'
    ]
  },
  {
    name: 'Investment Property',
    page: 'loan-investment',
    icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>',
    desc: 'South Florida is one of America\'s top real estate investment markets. Whether you\'re buying your first rental or expanding a portfolio, we offer competitive financing including DSCR loans that qualify on rental income rather than personal income.',
    benefits: [
      'Single & multi-family property options',
      'DSCR loans — qualify on rental income',
      'Vacation home financing available',
      'Portfolio loan options',
      'Expert investor-focused team'
    ]
  },
  {
    name: 'Refinance',
    page: 'loan-refinance',
    icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/>',
    desc: 'Refinancing can lower your monthly payment, reduce your interest rate, shorten your loan term, or unlock your home\'s equity. South Florida homeowners are sitting on significant equity — let us help you put it to work.',
    benefits: [
      'Lower your interest rate',
      'Reduce your monthly payment',
      'Cash-out equity for any purpose',
      'Eliminate mortgage insurance (PMI)',
      'Switch from ARM to fixed rate'
    ]
  }
];

// ─── LOAN INFO MODAL ───
function openLoanModal(idx) {
  var loan  = loanCards[idx];
  var bHTML = loan.benefits.map(function(b) {
    return '<div class="loan-info-benefit"><div class="loan-info-benefit-dot"></div>' + b + '</div>';
  }).join('');

  document.getElementById('loan-modal-content').innerHTML =
    '<div class="loan-info-icon-wrap"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + loan.icon + '</svg></div>' +
    '<div class="loan-info-title">' + loan.name + '</div>' +
    '<div class="loan-info-desc">' + loan.desc + '</div>' +
    '<div class="loan-info-benefits">' + bHTML + '</div>' +
    '<div class="loan-info-actions">' +
      '<a class="btn btn-red" href="#" onclick="closeLoanModal();navigate(\'' + loan.page + '\');return false;">View Full Details &rarr;</a>' +
      '<a class="btn btn-outline" href="#" onclick="closeLoanModal();openPrequalModal();return false;">Apply Now</a>' +
    '</div>';

  document.getElementById('loan-info-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  gsap.from('#loan-info-box', { opacity: 0, y: 30, duration: 0.4, ease: 'power2.out' });
}

function closeLoanModal() {
  document.getElementById('loan-info-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('loan-info-modal').addEventListener('click', function(e) {
  if (e.target === this) closeLoanModal();
});

// ─── CAROUSEL ───
var carouselIndex   = 0;
var carouselTotal   = 10;
var carouselAutoPlay;

function getCarouselVisible() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getMaxIndex() {
  return Math.ceil(carouselTotal / getCarouselVisible()) - 1;
}

function buildCarouselDots() {
  var dots = document.getElementById('carousel-dots');
  if (!dots) return;
  var pages = getMaxIndex() + 1;
  var html  = '';
  for (var i = 0; i < pages; i++) {
    html += '<button class="carousel-dot' + (i === 0 ? ' active' : '') + '" onclick="carouselGoTo(' + i + ')"></button>';
  }
  dots.innerHTML = html;
}

function updateCarouselDots() {
  document.querySelectorAll('.carousel-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === carouselIndex);
  });
}

function carouselGoTo(idx) {
  carouselIndex = Math.max(0, Math.min(idx, getMaxIndex()));
  var track = document.getElementById('loans-track');
  if (!track) return;
  var slide = track.querySelector('.loan-slide');
  if (!slide) return;
  var gap    = 24; // 1.5rem
  var slideW = slide.offsetWidth + gap;
  var offset = carouselIndex * getCarouselVisible() * slideW;
  gsap.to(track, { x: -offset, duration: 0.55, ease: 'power2.inOut' });
  updateCarouselDots();
}

function carouselNext() {
  if (carouselIndex >= getMaxIndex()) { carouselGoTo(0); } else { carouselGoTo(carouselIndex + 1); }
  resetAutoPlay();
}

function carouselPrev() {
  if (carouselIndex <= 0) { carouselGoTo(getMaxIndex()); } else { carouselGoTo(carouselIndex - 1); }
  resetAutoPlay();
}

function resetAutoPlay() {
  clearInterval(carouselAutoPlay);
  carouselAutoPlay = setInterval(carouselNext, 4500);
}

function initCarousel() {
  buildCarouselDots();
  carouselGoTo(0);
  resetAutoPlay();
}

window.addEventListener('resize', function() {
  buildCarouselDots();
  carouselGoTo(carouselIndex);
});

window.addEventListener('load', initCarousel);

// Touch / swipe support
(function() {
  var startX = 0;
  var track  = document.getElementById('loans-track');
  if (!track) return;
  track.parentElement.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  }, { passive: true });
  track.parentElement.addEventListener('touchend', function(e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) { carouselNext(); } else { carouselPrev(); }
    }
  }, { passive: true });
})();
