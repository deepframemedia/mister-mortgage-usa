/* ============================================================
   CALCULATOR.JS — Mortgage calculator logic
   ============================================================ */

var calcTerm = 30;

function setTerm(t) {
  calcTerm = t;
  document.getElementById('btn-30').classList.toggle('active', t === 30);
  document.getElementById('btn-15').classList.toggle('active', t === 15);
  updateCalc();
}

function fmtDollar(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function animateValue(elId, newVal) {
  var el = document.getElementById(elId);
  if (!el) return;
  gsap.to(el, {
    duration: 0.4, ease: 'power2.out', innerText: 0,
    onUpdate: function() { el.textContent = fmtDollar(newVal); }
  });
}

function updateCalc() {
  var price      = parseFloat(document.getElementById('calc-price').value);
  var dpPct      = parseFloat(document.getElementById('calc-dp').value);
  var annualRate = parseFloat(document.getElementById('calc-rate').value);
  var n          = calcTerm * 12;
  var dp         = price * dpPct / 100;
  var principal  = price - dp;
  var r          = annualRate / 100 / 12;
  var monthly    = r > 0 ? principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1) : principal / n;
  var totalCost  = monthly * n;
  var totalInterest = totalCost - principal;

  document.getElementById('lbl-price').textContent    = fmtDollar(price);
  document.getElementById('lbl-dp').textContent       = dpPct.toFixed(1) + '%';
  document.getElementById('lbl-rate').textContent     = annualRate.toFixed(1) + '%';
  document.getElementById('calc-monthly').textContent = fmtDollar(monthly);
  document.getElementById('calc-principal').textContent = fmtDollar(principal);
  document.getElementById('calc-dp-amt').textContent  = fmtDollar(dp);
  document.getElementById('calc-interest').textContent = fmtDollar(totalInterest);
  document.getElementById('calc-total').textContent   = fmtDollar(totalCost);
}

updateCalc();
