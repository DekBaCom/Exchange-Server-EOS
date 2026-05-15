---
layout: default
title: TCO Estimator
nav_order: 9
description: "Interactive Total Cost of Ownership calculator for Exchange Server migration paths. Generate custom reports based on your organization's size and parameters."
---

# TCO Estimator
{: .no_toc }

**Interactive calculator**: Input your organization details and see real-time 5-year cost comparison across all migration paths, with exportable reports and charts.
{: .fs-6 .fw-300 }

---

<div class="estimator-wrapper">
  <div class="estimator-layout">
    
    <!-- INPUT PANEL -->
    <div class="estimator-inputs">
      <h3>⚙️ Estimator Settings</h3>

      <div class="input-group">
        <label for="users">Number of Users</label>
        <div class="slider-container">
          <div class="slider-tooltip" id="usersTooltip">500</div>
          <input type="range" id="users" min="50" max="5000" value="500" step="50" class="slider-with-tooltip">
        </div>
        <div style="margin-top: 0.5rem; font-size: 1.1rem;">
          <span id="usersDisplay">500</span> users
        </div>
      </div>

      <div class="input-group">
        <label for="costPerFte">IT Staff Cost per FTE</label>
        <div class="slider-container">
          <div class="slider-tooltip" id="costPerFteTooltip">$80,000</div>
          <input type="range" id="costPerFte" min="40000" max="200000" value="80000" step="5000" class="slider-with-tooltip">
        </div>
        <div style="margin-top: 0.5rem; font-size: 1.1rem;">
          $<span id="costPerFteDisplay">80,000</span> / year
        </div>
      </div>

      <div class="input-group">
        <label>Migration Complexity</label>
        <div class="radio-group">
          <label class="radio-option">
            <input type="radio" name="complexity" value="low"> Low
            <span style="font-size: 0.8rem; color: #64748b;">(simple setup)</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="complexity" value="medium" checked> Medium
            <span style="font-size: 0.8rem; color: #64748b;">(standard)</span>
          </label>
          <label class="radio-option">
            <input type="radio" name="complexity" value="high"> High
            <span style="font-size: 0.8rem; color: #64748b;">(complex org)</span>
          </label>
        </div>
      </div>

      <div class="input-group">
        <label class="radio-option">
          <input type="checkbox" id="datacenter" checked> Include datacenter costs
          <span style="font-size: 0.8rem; color: #64748b;">power, cooling, space</span>
        </label>
      </div>
    </div>

    <!-- DASHBOARD PANEL -->
    <div class="estimator-dashboard">

      <!-- STAT CARDS -->
      <div class="est-stat-cards" id="statCards">
        <!-- Populated by JavaScript -->
      </div>

      <!-- BAR CHART -->
      <div class="chart-container">
        <div class="chart-title">📊 5-Year TCO Comparison</div>
        <canvas id="barChart"></canvas>
      </div>

      <!-- LINE CHART -->
      <div class="chart-container">
        <div class="chart-title">📈 Year-by-Year Cost Growth</div>
        <canvas id="lineChart"></canvas>
      </div>

      <!-- RECOMMENDATION -->
      <div class="recommendation-box" id="recommendation">
        <!-- Populated by JavaScript -->
      </div>

      <!-- COST BREAKDOWN TABLE -->
      <div class="cost-breakdown">
        <h4>📋 Detailed Cost Breakdown</h4>
        <div id="costTable">
          <!-- Populated by JavaScript -->
        </div>
      </div>

    </div>
  </div>

  <!-- EXPORT BAR -->
  <div class="export-bar">
    <button class="export-btn export-btn-primary" onclick="window.print()">
      🖨 Print / PDF
    </button>
    <button class="export-btn export-btn-secondary" onclick="exportChartPNG()">
      📷 Save Chart PNG
    </button>
    <button class="export-btn export-btn-secondary" onclick="exportCSV()">
      📥 Export CSV
    </button>
  </div>
</div>

---

## How to Use

1. **Adjust user count** — Move the slider to match your organization size
2. **Set IT costs** — Enter your annual IT staffing cost (per FTE)
3. **Select complexity** — Choose migration complexity level
4. **View results** — Charts, tables, and recommendation update automatically
5. **Export** — Download PDF report, PNG charts, or CSV data

---

## Cost Components

### On-Premises (Current)
- Server hardware refresh
- Windows Server & Exchange licenses
- CALs (Client Access Licenses) per user
- Anti-spam, archiving, backups
- Datacenter costs (power, cooling, space)
- IT administration time

### Exchange Online Plan 2
- Per-user subscription ($8/month)
- Microsoft Defender for Office 365
- One-time migration costs
- Minimal ongoing IT effort

### Microsoft 365 E3
- Full enterprise suite ($36/month)
- Teams, SharePoint, Office apps included
- Advanced compliance and security
- Higher per-user cost, broader value

### Exchange Server SE
- Subscription-based on-premises licensing
- New server hardware (if needed)
- CAL subscriptions per user
- Datacenter and backup infrastructure
- Ongoing IT administration

---

## Notes

- **All figures are estimates** based on typical enterprise costs — obtain vendor quotes for precise pricing
- **Hardware costs** assume replacement every 5 years (included by default)
- **Migration complexity** adjusts consultant costs: Low (–30%), Medium (baseline), High (+40%)
- **Datacenter costs** toggle represents power, cooling, colocation, or data center facility space
- **IT staffing** is calculated as a percentage of annual FTE cost allocated to email management

<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script src="{{ '/assets/js/tco-estimator.js' | relative_url }}"></script>
<script>
// Update display values and tooltips as user adjusts sliders
function updateDisplayValues() {
  const usersInput = document.getElementById('users');
  const costPerFteInput = document.getElementById('costPerFte');
  const usersDisplay = document.getElementById('usersDisplay');
  const costPerFteDisplay = document.getElementById('costPerFteDisplay');

  if (usersInput && usersDisplay) {
    usersDisplay.textContent = parseInt(usersInput.value).toLocaleString();
  }
  if (costPerFteInput && costPerFteDisplay) {
    costPerFteDisplay.textContent = parseInt(costPerFteInput.value).toLocaleString();
  }
  
  updateSliderTooltips();
}

// Update slider tooltip positions and values dynamically
function updateSliderTooltips() {
  updateTooltip('users', 'usersTooltip', false);
  updateTooltip('costPerFte', 'costPerFteTooltip', true);
}

// Helper to update individual tooltip
function updateTooltip(sliderId, tooltipId, isCurrency) {
  const slider = document.getElementById(sliderId);
  const tooltip = document.getElementById(tooltipId);
  
  if (!slider || !tooltip) return;
  
  const min = parseInt(slider.min);
  const max = parseInt(slider.max);
  const value = parseInt(slider.value);
  
  // Calculate percentage position (0-100)
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Position tooltip horizontally centered above thumb
  tooltip.style.left = percentage + '%';
  
  // Format and display value
  if (isCurrency) {
    tooltip.textContent = '$' + value.toLocaleString();
  } else {
    tooltip.textContent = value.toLocaleString();
  }
}

// Ensure DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    updateDisplayValues();
    document.getElementById('users').addEventListener('input', updateDisplayValues);
    document.getElementById('costPerFte').addEventListener('input', updateDisplayValues);
  });
} else {
  updateDisplayValues();
  document.getElementById('users').addEventListener('input', updateDisplayValues);
  document.getElementById('costPerFte').addEventListener('input', updateDisplayValues);
}
</script>
