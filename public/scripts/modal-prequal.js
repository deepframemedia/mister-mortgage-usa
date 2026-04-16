/* ============================================================
   MODAL-PREQUAL.JS — Pre-qualification multi-step modal
   ============================================================ */

var modalStep = 1;
var modalAnswers = {};
var totalSteps = 11;

var modalSteps = [
  {
    q: 'Are you interested in purchasing or refinancing?',
    qEs: '¿Está interesado en comprar o refinanciar?',
    options: [
      { label: 'Purchase a Home',   labelEs: 'Comprar una Propiedad' },
      { label: 'Refinance a Home',  labelEs: 'Refinanciar mi Hogar' },
      { label: 'Use my Equity',     labelEs: 'Usar mi Capital' }
    ]
  },
  {
    q: 'What is the approximate purchase price of the new property?',
    qEs: '¿Cuál es el precio aproximado de la nueva propiedad?',
    options: [
      { label: '$200,000 - $500,000',  labelEs: '$200,000 - $500,000' },
      { label: '$500,000 - $750,000',  labelEs: '$500,000 - $750,000' },
      { label: 'More than $750,000',   labelEs: 'Más de $750,000' },
      { label: "I don't know",         labelEs: 'No lo sé' }
    ]
  },
  {
    q: 'Do you have savings for the down payment?',
    qEs: '¿Tiene ahorros para el pago inicial?',
    options: [
      { label: 'Yes', labelEs: 'Sí' },
      { label: 'No',  labelEs: 'No' }
    ]
  },
  {
    q: 'How much do you have for a down payment?',
    qEs: '¿Cuánto tiene para el pago inicial?',
    options: [
      { label: 'Less than $5,000',    labelEs: 'Menos de $5,000' },
      { label: '$5,000 - $20,000',    labelEs: '$5,000 - $20,000' },
      { label: 'More than $20,000',   labelEs: 'Más de $20,000' }
    ]
  },
  {
    q: 'What is your total annual household income?',
    qEs: '¿Cuál es el ingreso familiar anual total?',
    options: [
      { label: 'Less than $30,000',    labelEs: 'Menos de $30,000' },
      { label: '$30,000 - $50,000',    labelEs: '$30,000 - $50,000' },
      { label: '$50,000 - $75,000',    labelEs: '$50,000 - $75,000' },
      { label: '$75,000 - $100,000',   labelEs: '$75,000 - $100,000' },
      { label: 'Greater than $100,000',labelEs: 'Más de $100,000' },
      { label: "I don't know",         labelEs: 'No lo sé' }
    ]
  },
  {
    q: 'What is your credit score?',
    qEs: '¿Cuál es su puntuación de crédito?',
    options: [
      { label: 'Excellent 740+',  labelEs: 'Excelente 740+' },
      { label: 'Good 700-739',    labelEs: 'Bueno 700-739' },
      { label: 'Average 660-699', labelEs: 'Promedio 660-699' },
      { label: 'Fair 600-659',    labelEs: 'Regular 600-659' },
      { label: 'Poor < 600',      labelEs: 'Bajo < 600' }
    ]
  },
  {
    q: 'Have you filed for bankruptcy or had a property foreclosed in the past two years?',
    qEs: '¿Ha declarado bancarrota o ha tenido una propiedad embargada en los últimos dos años?',
    options: [
      { label: 'Yes', labelEs: 'Sí' },
      { label: 'No',  labelEs: 'No' }
    ]
  },
  {
    q: 'Employment Status',
    qEs: 'Situación Laboral',
    options: [
      { label: 'Employed',      labelEs: 'Empleado' },
      { label: 'Self-Employed', labelEs: 'Independiente / Cuenta Propia' },
      { label: 'Unemployed',    labelEs: 'Desempleado' }
    ]
  },
  {
    q: 'Residency Status',
    qEs: 'Estatus Migratorio',
    options: [
      { label: 'U.S. Citizen',                  labelEs: 'Ciudadano Estadounidense' },
      { label: 'Permanent Resident Alien',       labelEs: 'Residente Permanente' },
      { label: 'Non-Permanent Resident Alien',   labelEs: 'Residente No Permanente' },
      { label: 'Foreign Nationals',              labelEs: 'Extranjero' },
      { label: 'ITIN',                           labelEs: 'ITIN' },
      { label: 'Other',                          labelEs: 'Otro' }
    ]
  },
  {
    q: 'Would you like to schedule an appointment with one of our agents?',
    qEs: '¿Desea programar una cita con uno de nuestros agentes?',
    options: [
      { label: 'Yes', labelEs: 'Sí' },
      { label: 'No',  labelEs: 'No' }
    ]
  },
  { q: 'contact' }
];

function getLang() {
  var btn = document.getElementById('lang-toggle');
  return (btn && btn.dataset.currentLang === 'es') ? 'es' : 'en';
}

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
  var lang = getLang();
  var html = '';

  if (data.q === 'contact') {
    var isEs = lang === 'es';
    html  = '<div class="modal-step-label">' + (isEs ? 'Paso' : 'Step') + ' ' + modalStep + ' ' + (isEs ? 'de' : 'of') + ' ' + totalSteps + '</div>';
    html += '<div class="modal-question">' + (isEs ? '¡Ya casi! Conectémosle con un experto.' : "Almost there! Let's connect you with an expert.") + '</div>';
    html += '<form class="modal-form" onsubmit="submitPrequal(event)">';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>' + (isEs ? 'Nombre Completo *' : 'Full Name *') + '</label><input type="text" name="fname" placeholder="' + (isEs ? 'Nombre Apellido' : 'First Last') + '" required /></div>';
    html += '</div>';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>' + (isEs ? 'Correo Electrónico *' : 'Email *') + '</label><input type="email" name="email" placeholder="email@example.com" required /></div>';
    html += '</div>';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>' + (isEs ? 'Teléfono *' : 'Phone *') + '</label><input type="tel" name="phone" placeholder="(305) 000-0000" required /></div>';
    html += '</div>';
    html += '<div class="modal-form-row">';
    html += '<div class="form-group"><label>' + (isEs ? 'Idioma preferido *' : 'Preferred Language *') + '</label>';
    html += '<select name="language" required><option value="">' + (isEs ? 'Seleccione...' : 'Select...') + '</option>';
    html += '<option value="Spanish">' + (isEs ? 'Español' : 'Spanish') + '</option>';
    html += '<option value="English">' + (isEs ? 'Inglés' : 'English') + '</option>';
    html += '</select></div>';
    html += '</div>';
    html += '<div class="form-group" style="margin-top:.5rem;">';
    html += '<label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.78rem;font-weight:400;cursor:pointer;">';
    html += '<input type="checkbox" name="sms_consent" style="margin-top:2px;flex-shrink:0;" required />';
    html += '<span>' + (isEs
      ? 'Acepto recibir notificaciones SMS, alertas y comunicaciones de marketing de Mister Mortgage USA. La frecuencia varía. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar en cualquier momento.'
      : 'I Consent to Receive SMS Notifications, Alerts & Occasional Marketing Communication from Mister Mortgage USA. Message frequency varies. Message & data rates may apply. Text HELP to (305) 615-1515. Reply STOP to unsubscribe.')
      + '</span></label>';
    html += '</div>';
    html += '<div class="modal-nav" style="margin-top:1rem;">';
    html += '<button type="button" class="modal-btn-back" onclick="prevStep()">← ' + (isEs ? 'Atrás' : 'Back') + '</button>';
    html += '<button type="submit" class="modal-btn-next">' + (isEs ? 'Obtener Consulta Gratis →' : 'Get My Free Consultation →') + '</button>';
    html += '</div></form>';
  } else {
    var q = (lang === 'es' && data.qEs) ? data.qEs : data.q;
    html  = '<div class="modal-step-label">' + (lang === 'es' ? 'Paso' : 'Step') + ' ' + modalStep + ' ' + (lang === 'es' ? 'de' : 'of') + ' ' + totalSteps + '</div>';
    html += '<div class="modal-question">' + q + '</div>';
    var cols = data.options.length > 3 ? '' : ' cols-1';
    html += '<div class="modal-options' + cols + '">';
    data.options.forEach(function(opt) {
      var label = (lang === 'es' && opt.labelEs) ? opt.labelEs : opt.label;
      var sel = modalAnswers[modalStep] === opt.label ? ' selected' : '';
      html += '<button class="modal-option' + sel + '" onclick="selectOption(this, \'' + opt.label.replace(/'/g, "\\'") + '\')">' + label + '</button>';
    });
    html += '</div>';
    html += '<div class="modal-nav">';
    if (modalStep > 1) html += '<button class="modal-btn-back" onclick="prevStep()">← ' + (lang === 'es' ? 'Atrás' : 'Back') + '</button>';
    else html += '<div></div>';
    html += '<button class="modal-btn-next" onclick="nextStep()">' + (lang === 'es' ? 'Siguiente →' : 'Next →') + '</button>';
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
  // Skip step 4 (down payment amount) if user has no savings
  if (modalStep === 3 && modalAnswers[3] === 'No') {
    modalStep = 5;
  } else {
    modalStep++;
  }
  renderModalStep();
}

function prevStep() {
  if (modalStep === 5 && modalAnswers[3] === 'No') {
    modalStep = 3;
  } else {
    modalStep--;
  }
  if (modalStep < 1) modalStep = 1;
  renderModalStep();
}

function submitPrequal(e) {
  e.preventDefault();
  var lang = getLang();
  document.getElementById('modal-progress').style.width = '100%';
  document.getElementById('modal-content').innerHTML =
    '<div class="modal-success">' +
      '<div class="modal-success-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' +
      '<h3>' + (lang === 'es' ? '¡Todo Listo!' : "You're All Set!") + '</h3>' +
      '<p>' + (lang === 'es'
        ? '¡Gracias! Un experto de Mister Mortgage USA le contactará en las próximas 24 horas para hablar sobre sus opciones.<br><br><strong>Llámenos cuando quiera: <a href="tel:3056151515" style="color:var(--red)">(305) 615-1515</a></strong>'
        : 'Thank you! A Mister Mortgage USA loan expert will contact you within 24 hours to discuss your options.<br><br><strong>Call us anytime: <a href="tel:3056151515" style="color:var(--red)">(305) 615-1515</a></strong>') +
      '</p>' +
    '</div>';
  gsap.from('.modal-success', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
  setTimeout(closePrequalModal, 5000);
}
