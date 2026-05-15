---
layout: default
title: Home
nav_order: 1
description: "Comprehensive guide for Exchange Server End of Support — migration planning, risk, TCO, and licensing."
permalink: /
---

<!-- ╔══════════════════════════════════╗
     ║ HERO SECTION                     ║
     ╚══════════════════════════════════╝ -->
<div class="hero">
  <h1>Exchange Server<br>End of Support</h1>
  <p class="hero-sub">
    Exchange Server 2016 &amp; 2019 support ended Oct 14, 2025.
    Migrate now to secure your organization — a comprehensive guide for IT decision-makers.
  </p>
  <div style="display: flex; gap: 1rem;">
    <a href="/Exchange-Server-EOS/{% link docs/checklist.md %}" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 50px; font-weight: 700;">Get Started</a>
    <a href="#wizard" class="btn" style="color: #fff; border: 1px solid rgba(255,255,255,0.3); padding: 0.8rem 2rem; border-radius: 50px;">Path Wizard</a>
  </div>
</div>

<!-- ╔══════════════════════════════════╗
     ║ STATS GRID                       ║
     ╚══════════════════════════════════╝ -->
<div class="stats-grid">
  <div class="stat-card">
    <span class="stat-value">Oct '25</span>
    <span class="stat-label">Support Ended</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">2016/19</span>
    <span class="stat-label">Versions Impacted</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">3</span>
    <span class="stat-label">Migration Paths</span>
  </div>
  <div class="stat-card">
    <span class="stat-value">100%</span>
    <span class="stat-label">Critical Liability</span>
  </div>
</div>

<h2 id="wizard">Find Your Migration Path</h2>
<div class="wizard-container">
  <!-- Step 1 -->
  <div class="wizard-step active" id="q1">
    <p class="wizard-q">Where do you want to host your mail infrastructure?</p>
    <div class="wizard-opts">
      <div class="wizard-opt" data-next="q2-cloud">
        <strong>☁️ Cloud First</strong>
        <p style="font-size: 0.8rem; margin: 0.5rem 0 0;">Migrate to Microsoft 365 / Exchange Online.</p>
      </div>
      <div class="wizard-opt" data-next="q2-onprem">
        <strong>🏢 On-Premises</strong>
        <p style="font-size: 0.8rem; margin: 0.5rem 0 0;">Upgrade to Exchange Server SE.</p>
      </div>
    </div>
  </div>

  <!-- Result: Cloud -->
  <div class="wizard-step" id="q2-cloud">
    <p class="wizard-q">Cloud Recommendation</p>
    <p style="color: var(--slate-300); margin-bottom: 2rem;">Migrating to <strong>Microsoft 365</strong> offers the lowest TCO and best security posture.</p>
    <a href="/Exchange-Server-EOS/{% link docs/implement.md %}#option-1-microsoft-365-exchange-online" class="btn btn-primary">View Cloud Guide</a>
    <button class="btn" style="color: #fff; margin-left: 1rem;" data-next="q1">Start Over</button>
  </div>

  <!-- Result: On-Prem -->
  <div class="wizard-step" id="q2-onprem">
    <p class="wizard-q">On-Premises Recommendation</p>
    <p style="color: var(--slate-300); margin-bottom: 2rem;">Upgrade to <strong>Exchange Server Subscription Edition (SE)</strong> for data sovereignty.</p>
    <a href="/Exchange-Server-EOS/{% link docs/implement.md %}#option-2-exchange-server-subscription-edition" class="btn btn-primary">View Upgrade Guide</a>
    <button class="btn" style="color: #fff; margin-left: 1rem;" data-next="q1">Start Over</button>
  </div>
</div>

<div class="calc-box">
  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
    <h3 style="margin: 0; color: var(--slate-900);">TCO Estimator</h3>
    <span style="font-size: 1.4rem; font-weight: 800; color: var(--blue-600);"><span id="calc-user-val">500</span> Users</span>
  </div>
  <p style="font-size: 0.85rem; color: var(--slate-500); margin: 0 0 0.75rem;">Drag to set user count — see 5-year cost for all migration paths</p>
  <input type="range" class="calc-slider" id="calc-slider" min="50" max="5000" step="50" value="500">

  <div class="calc-mini-cards" id="calcCards">
    <div class="calc-mini-card" style="border-left: 4px solid #dc2626;">
      <div class="calc-mini-name">On-Premises</div>
      <div class="calc-mini-value" id="calc-onprem">$453,400</div>
    </div>
    <div class="calc-mini-card" style="border-left: 4px solid #16a34a;">
      <div class="calc-mini-name">Exchange Online P2</div>
      <div class="calc-mini-value" id="calc-eop2">$399,000</div>
    </div>
    <div class="calc-mini-card" style="border-left: 4px solid #2563eb;">
      <div class="calc-mini-name">Microsoft 365 E3</div>
      <div class="calc-mini-value" id="calc-m365">$1,263,000</div>
    </div>
    <div class="calc-mini-card" style="border-left: 4px solid #d97706;">
      <div class="calc-mini-name">Exchange SE</div>
      <div class="calc-mini-value" id="calc-se">$665,000</div>
    </div>
  </div>

  <div style="text-align: center; margin-top: 1rem;">
    <a href="/Exchange-Server-EOS/{% link docs/tco-estimator.md %}" style="font-size: 0.9rem; font-weight: 700; color: var(--blue-600);">Open Full TCO Estimator with Charts & Export →</a>
  </div>
</div>

<script>
(function() {
  var slider = document.getElementById('calc-slider');
  var userVal = document.getElementById('calc-user-val');

  function fmt(n) {
    return '$' + Math.round(n).toLocaleString('en-US');
  }

  function calcTCO(users) {
    var fte = 80000;
    // On-Premises
    var op1 = 40000 + 12000 + 1400 + 76*users + 8000 + 12000 + fte*0.2 + 18000 + 6000;
    var op2 = 8000 + 12000 + fte*0.2 + 18000 + 4000;
    var onprem = op1 + op2 * 4;
    // Exchange Online P2
    var ep1 = 8*users*12 + 2*users*12 + 40000 + fte*0.25 + 5000;
    var ep2 = 8*users*12 + 2*users*12 + fte*0.25 + 1000;
    var eop2 = ep1 + ep2 * 4;
    // M365 E3
    var mp1 = 36*users*12 + 50000 + fte*0.25 + 20000 + 10000;
    var mp2 = 36*users*12 + fte*0.25 + 5000 + 2000;
    var m365 = mp1 + mp2 * 4;
    // Exchange SE
    var sp1 = 40000 + 12000 + 24000 + 40*users + 8000 + 10000 + fte*0.25 + 18000 + 8000 + 25000;
    var sp2 = 5000 + 24000 + 40*users + 8000 + 10000 + fte*0.25 + 18000 + 5000;
    var se = sp1 + sp2 * 4;
    return { onprem: onprem, eop2: eop2, m365: m365, se: se };
  }

  function update() {
    var users = parseInt(slider.value);
    userVal.textContent = users.toLocaleString('en-US');
    var t = calcTCO(users);
    document.getElementById('calc-onprem').textContent = fmt(t.onprem);
    document.getElementById('calc-eop2').textContent   = fmt(t.eop2);
    document.getElementById('calc-m365').textContent   = fmt(t.m365);
    document.getElementById('calc-se').textContent     = fmt(t.se);
  }

  if (slider) {
    slider.addEventListener('input', update);
    update();
  }
})();
</script>

---

## Navigate the Guide

{% include nav_grid.html %}
