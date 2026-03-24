/* ============================================================
   MODAL-PREQUAL.JS — Pre-qualification multi-step modal
   ============================================================ */

var modalStep = 1;
var modalAnswers = {};
var totalSteps = 7;

var modalSteps = [
  {
    q: 'What are you looking to do?',
    options: [
      { label: 'Purchase a Home',    sub: 'Buy a new property' },
      { label: 'Refinance My Home',  sub: 'Improve my current mortgage' }
    ]
  },
  {
    q: 'What type of property?',
    options: [
      { label: 'Primary Residence',    sub: 'I will live here full-time' },
      { label: 'Investment Property',  sub: 'Rental / income-generating' },
      { label: 'Vacation Home',        sub: 'Second home / seasonal use' },
      { label: 'Multi-Family',         sub: '2–4 unit property' }
    ]
  },
  {
    q: 'Estimated property value?',
    options: [
      { label: 'Under $300K',       sub: '' },
      { label: '$300K – $500K',     sub: '' },
      { label: '$500K – $800K',     sub: '' },
      { label: '$800K – $1.2M',     sub: '' },
      { label: 'Over $1.2M',        sub: '' }
    ]
  },
  {
    q: 'Estimated down payment?',
    options: [
      { label: 'Less than 3.5%',  sub: 'Min for FHA loans' },
      { label: '3.5% – 10%',      sub: 'Low down payment' },
      { label: '10% – 20%',       sub: 'Standard range' },
      { label: 'Over 20%',        sub: 'Avoid PMI' }
    ]
  },
  {
    q: 'How would you describe your credit?',
    options: [
      { label: 'Excellent',       sub: '740+ credit score' },
      { label: 'Good',            sub: '700–739 credit score' },
      { label: 'Fair',            sub: '660–699 credit score' },
      { label: 'Below Average',   sub: 'Under 660' }
    ]
  },
  {
    q: 'What is your employment status?',
    options: [
      { label: 'Employed (W-2)',   sub: 'Traditional employee' },
      { label: 'Self-Employed',    sub: 'Business owner / freelance' },
      { label: 'Retired',          sub: 'On pension or fixed income' },
      { label: 'Other',            sub: 'Investor / other income' }
    ]
  },
  { q: 'contact' }
];

function openPrequalModal() {
  modalStep    = 1;
  modalAnswers = {};
  document.getElementById('prequal-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderModalStep();
  gsap.from('#modal-box', { opacity: 0, y: 30, duration: 0.4, ease: 'power2.out' });
}

function closePrequalModal() {
  document.getElementById('prequal-modal').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('prequal-modal').addEventListener('click', function(e) {
  if (e.target === this) closePrequalModal();
});

function renderModalStep() {
  var pct  = ((modalStep - 1) / totalSteps) * 100;
  document.getElementById('modal-progress').style.width = pct + '%';
  var data = modalSteps[modalStep - 1];
  var html = '';

  if (data.q === 'contact') {
    html  = '<div class="modal-step-label">Step ' + modalStep + ' of ' + totalSteps + '</div>';
    html += '<div class="modal-question">Almost there! Let\'s connect you with an expert.</div>';
    html += '<form class="modal-form" onsubmit="submitPrequal(event)">';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>First Name *</label><input type="text" name="fname" placeholder="John" required /></div>';
    html += '<div class="form-group"><label>Last Name *</label><input type="text" name="lname" placeholder="Doe" required /></div>';
    html += '</div>';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>Phone *</label><input type="tel" name="phone" placeholder="(305) 000-0000" required /></div>';
    html += '<div class="form-group"><label>Email *</label><input type="email" name="email" placeholder="john@email.com" required /></div>';
    html += '</div>';
    html += '<div class="modal-nav" style="margin-top:1rem;">';
    html += '<button type="button" class="modal-btn-back" onclick="prevStep()">← Back</button>';
    html += '<button type="submit" class="modal-btn-next">Get My Free Consultation →</button>';
    html += '</div></form>';
  } else {
    html  = '<div class="modal-step-label">Step ' + modalStep + ' of ' + totalSteps + '</div>';
    html += '<div class="modal-question">' + data.q + '</div>';
    var cols = data.options.length > 3 ? '' : ' cols-1';
    html += '<div class="modal-options' + cols + '">';
    data.options.forEach(function(opt) {
      var sel = modalAnswers[modalStep] === opt.label ? ' selected' : '';
      html += '<button class="modal-option' + sel + '" onclick="selectOption(this, \'' + opt.label.replace(/'/g, "\\'") + '\')">' + opt.label;
      if (opt.sub) html += '<span>' + opt.sub + '</span>';
      html += '</button>';
    });
    html += '</div>';
    html += '<div class="modal-nav">';
    if (modalStep > 1) html += '<button class="modal-btn-back" onclick="prevStep()">← Back</button>';
    else html += '<div></div>';
    html += '<button class="modal-btn-next" onclick="nextStep()">Next →</button>';
    html += '</div>';
  }

  document.getElementById('modal-content').innerHTML = html;
  gsap.from('#modal-content', { opacity: 0, x: 20, duration: 0.3, ease: 'power2.out' });
}

function selectOption(el, val) {
  document.querySelectorAll('#modal-content .modal-option').forEach(function(b) { b.classList.remove('selected'); });
  el.classList.add('selected');
  modalAnswers[modalStep] = val;
}

function nextStep() {
  if (!modalAnswers[modalStep]) {
    gsap.to('#modal-content', { x: -6, duration: 0.05, yoyo: true, repeat: 5, ease: 'power2.inOut' });
    return;
  }
  // Skip step 4 (down payment) if refinancing
  if (modalStep === 3 && modalAnswers[1] === 'Refinance My Home') {
    modalStep = 5;
  } else {
    modalStep++;
  }
  renderModalStep();
}

function prevStep() {
  if (modalStep === 5 && modalAnswers[1] === 'Refinance My Home') {
    modalStep = 3;
  } else {
    modalStep--;
  }
  if (modalStep < 1) modalStep = 1;
  renderModalStep();
}

function submitPrequal(e) {
  e.preventDefault();
  document.getElementById('modal-progress').style.width = '100%';
  document.getElementById('modal-content').innerHTML =
    '<div class="modal-success">' +
      '<div class="modal-success-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' +
      '<h3>You\'re All Set!</h3>' +
      '<p>Thank you! A Mister Mortgage USA loan expert will contact you within 24 hours to discuss your options.<br><br>' +
      '<strong>Call us anytime: <a href="tel:3056151515" style="color:var(--red)">(305) 615-1515</a></strong></p>' +
    '</div>';
  gsap.from('.modal-success', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
  setTimeout(closePrequalModal, 5000);
}
