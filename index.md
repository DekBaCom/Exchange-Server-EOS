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
    <a href="{% link docs/checklist.md %}" class="btn btn-primary" style="padding: 0.8rem 2rem; border-radius: 50px; font-weight: 700;">Get Started</a>
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
    <a href="{% link docs/implement.md %}#option-1-microsoft-365-exchange-online" class="btn btn-primary">View Cloud Guide</a>
    <button class="btn" style="color: #fff; margin-left: 1rem;" data-next="q1">Start Over</button>
  </div>

  <!-- Result: On-Prem -->
  <div class="wizard-step" id="q2-onprem">
    <p class="wizard-q">On-Premises Recommendation</p>
    <p style="color: var(--slate-300); margin-bottom: 2rem;">Upgrade to <strong>Exchange Server Subscription Edition (SE)</strong> for data sovereignty.</p>
    <a href="{% link docs/implement.md %}#option-2-exchange-server-subscription-edition" class="btn btn-primary">View Upgrade Guide</a>
    <button class="btn" style="color: #fff; margin-left: 1rem;" data-next="q1">Start Over</button>
  </div>
</div>

<div class="calc-box">
  <div style="display: flex; justify-content: space-between; align-items: baseline;">
    <h3 style="margin: 0; color: var(--slate-900);">TCO Estimator</h3>
    <span style="font-size: 1.5rem; font-weight: 800; color: var(--blue-600);"><span id="calc-user-val">500</span> Users</span>
  </div>
  <input type="range" class="calc-slider" min="10" max="5000" step="10" value="500">
  <div style="text-align: center; margin-top: 1rem;">
    <p style="color: var(--slate-500); margin: 0;">5-Year Total Cost of Ownership</p>
    <h2 style="margin: 0.5rem 0; color: var(--blue-700); font-size: 3rem !important; border: none !important;" id="calc-result-val">$400,000</h2>
    <a href="{% link docs/tco.md %}" style="font-size: 0.8rem; font-weight: 700;">View Detailed TCO Analysis →</a>
  </div>
</div>

---

## Navigate the Guide

{% include nav_grid.html %}
