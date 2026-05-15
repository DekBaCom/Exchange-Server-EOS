// TCO Estimator - Calculation Engine & Visualization
// Exchange Server Migration Path Analysis

class TCOEstimator {
  constructor() {
    this.charts = {};
    this.init();
  }

  init() {
    // Get all input elements
    this.usersInput = document.getElementById('users');
    this.costPerFteInput = document.getElementById('costPerFte');
    this.complexityInputs = document.getElementsByName('complexity');
    this.datacenterToggle = document.getElementById('datacenter');

    // Bind events
    if (this.usersInput) this.usersInput.addEventListener('input', () => this.updateAll());
    if (this.costPerFteInput) this.costPerFteInput.addEventListener('input', () => this.updateAll());
    this.complexityInputs.forEach(input => input.addEventListener('change', () => this.updateAll()));
    if (this.datacenterToggle) this.datacenterToggle.addEventListener('change', () => this.updateAll());

    // Initial render
    this.updateAll();
  }

  getInputs() {
    return {
      users: parseInt(this.usersInput?.value || 500),
      costPerFte: parseInt(this.costPerFteInput?.value || 80000),
      complexity: this.getComplexity(),
      datacenter: this.datacenterToggle?.checked || true
    };
  }

  getComplexity() {
    for (let input of this.complexityInputs) {
      if (input.checked) return input.value;
    }
    return 'medium';
  }

  calculateTCO(inputs) {
    const { users, costPerFte, complexity, datacenter } = inputs;

    // Migration cost adjustments
    const migrationMult = {
      low: 0.7,
      medium: 1.0,
      high: 1.4
    };

    // Base per-user costs (from tco.md)
    const calCostOnPrem = 76; // Exchange CAL per user/year
    const exchangeOnlineP2Cost = 8; // $/user/month
    const m365E3Cost = 36; // $/user/month
    const exchangeSECalCost = 40; // $/user/year

    // ═══ SCENARIO 1: ON-PREMISES (Current Status Quo) ═══
    const onPrem = (() => {
      const hwCost = datacenter ? 40000 : 0;
      const osCost = 12000;
      const exchangeLicense = 1400;
      const calCost = calCostOnPrem * users;
      const antispam = 8000;
      const archiving = 12000;
      const adminTime = (costPerFte * 0.2);
      const dataCenter = datacenter ? 18000 : 0;
      const backup = 6000;

      const yr1 = hwCost + osCost + exchangeLicense + calCost + antispam + archiving + adminTime + dataCenter + backup;
      const yr2_5 = antispam + archiving + adminTime + dataCenter + 4000;
      const total = yr1 + (yr2_5 * 4);

      return {
        name: 'On-Premises (Current)',
        color: '#dc2626',
        total,
        yr1,
        yr2_5,
        years: [yr1, yr1 + yr2_5, yr1 + yr2_5 * 2, yr1 + yr2_5 * 3, yr1 + yr2_5 * 4],
        breakdown: {
          'Hardware': hwCost,
          'OS Licensing': osCost,
          'Exchange License': exchangeLicense,
          'CALs': calCost,
          'Antispam/Malware': antispam,
          'Email Archiving': archiving,
          'IT Admin Time': adminTime,
          'Datacenter': dataCenter,
          'Backup': backup
        }
      };
    })();

    // ═══ SCENARIO 2: EXCHANGE ONLINE PLAN 2 (EMAIL ONLY) ═══
    const exchangeOnlineP2 = (() => {
      const subscription = exchangeOnlineP2Cost * users * 12;
      const defender = 2 * users * 12;
      const migration = 40000 * migrationMult[complexity];
      const adminTime = (costPerFte * 0.25);
      const training = 5000;

      const yr1 = subscription + defender + migration + adminTime + training;
      const yr2_5 = subscription + defender + adminTime + 1000;
      const total = yr1 + (yr2_5 * 4);

      return {
        name: 'Exchange Online Plan 2',
        color: '#16a34a',
        total,
        yr1,
        yr2_5,
        years: [yr1, yr1 + yr2_5, yr1 + yr2_5 * 2, yr1 + yr2_5 * 3, yr1 + yr2_5 * 4],
        breakdown: {
          'Exchange Online Subscription': subscription,
          'Defender for Office 365': defender,
          'Migration Project': migration,
          'IT Admin Time': adminTime,
          'User Training': training
        }
      };
    })();

    // ═══ SCENARIO 3: MICROSOFT 365 E3 (FULL SUITE) ═══
    const m365E3 = (() => {
      const subscription = m365E3Cost * users * 12;
      const migration = 50000 * migrationMult[complexity];
      const adminTime = (costPerFte * 0.5 * 0.5);
      const network = 20000;
      const training = 10000;

      const yr1 = subscription + migration + adminTime + network + training;
      const yr2_5 = subscription + adminTime + 5000 + 2000;
      const total = yr1 + (yr2_5 * 4);

      return {
        name: 'Microsoft 365 E3',
        color: '#2563eb',
        total,
        yr1,
        yr2_5,
        years: [yr1, yr1 + yr2_5, yr1 + yr2_5 * 2, yr1 + yr2_5 * 3, yr1 + yr2_5 * 4],
        breakdown: {
          'M365 E3 Subscription': subscription,
          'Migration Project': migration,
          'IT Admin Time': adminTime,
          'Network Upgrades': network,
          'User Training': training
        }
      };
    })();

    // ═══ SCENARIO 4: EXCHANGE SERVER SE (ON-PREMISES MODERN) ═══
    const exchangeSE = (() => {
      const hwCost = datacenter ? 40000 : 0;
      const osCost = 12000;
      const serverSub = 12000 * 2; // 2 servers
      const calSub = exchangeSECalCost * users;
      const antispam = 8000;
      const archiving = 10000;
      const adminTime = (costPerFte * 0.25);
      const dataCenter = datacenter ? 18000 : 0;
      const backup = 8000;
      const migration = 25000 * migrationMult[complexity];

      const yr1 = hwCost + osCost + serverSub + calSub + antispam + archiving + adminTime + dataCenter + backup + migration;
      const yr2_5 = 5000 + serverSub + calSub + antispam + archiving + adminTime + dataCenter + 5000;
      const total = yr1 + (yr2_5 * 4);

      return {
        name: 'Exchange Server SE',
        color: '#d97706',
        total,
        yr1,
        yr2_5,
        years: [yr1, yr1 + yr2_5, yr1 + yr2_5 * 2, yr1 + yr2_5 * 3, yr1 + yr2_5 * 4],
        breakdown: {
          'Hardware': hwCost,
          'OS Licensing': osCost,
          'Exchange SE Server Subscription': serverSub,
          'CAL Subscriptions': calSub,
          'Antispam/Malware': antispam,
          'Email Archiving': archiving,
          'IT Admin Time': adminTime,
          'Datacenter': dataCenter,
          'Backup/DR': backup,
          'Migration Project': migration
        }
      };
    })();

    return {
      onPrem,
      exchangeOnlineP2,
      m365E3,
      exchangeSE
    };
  }

  updateAll() {
    const inputs = this.getInputs();
    const tco = this.calculateTCO(inputs);

    this.renderStatCards(tco);
    this.renderBarChart(tco);
    this.renderLineChart(tco);
    this.renderCostTable(tco);
    this.renderRecommendation(tco);
  }

  formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  getRank(value, all) {
    const sorted = all.map(v => v.total).sort((a, b) => a - b);
    return sorted.indexOf(value) + 1;
  }

  renderStatCards(tco) {
    const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];
    const container = document.getElementById('statCards');
    if (!container) return;

    container.innerHTML = all.map((option, idx) => {
      const rank = this.getRank(option.total, all);
      return `
        <div class="est-stat-card rank-${rank}">
          <h4>${option.name}</h4>
          <span class="est-stat-value">${this.formatCurrency(option.total)}</span>
          <span class="est-stat-label">5-Year Total</span>
        </div>
      `;
    }).join('');
  }

  renderBarChart(tco) {
    const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    if (this.charts.bar) this.charts.bar.destroy();

    this.charts.bar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: all.map(o => o.name),
        datasets: [{
          label: '5-Year TCO',
          data: all.map(o => o.total),
          backgroundColor: all.map(o => o.color),
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => this.formatCurrency(context.raw)
            }
          }
        },
        scales: {
          x: {
            ticks: {
              callback: (value) => this.formatCurrency(value)
            }
          }
        }
      }
    });
  }

  renderLineChart(tco) {
    const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;

    if (this.charts.line) this.charts.line.destroy();

    this.charts.line = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: all.map(option => ({
          label: option.name,
          data: option.years,
          borderColor: option.color,
          backgroundColor: option.color + '15',
          tension: 0.4,
          fill: true,
          pointRadius: 5,
          pointBackgroundColor: option.color,
          pointBorderColor: '#fff',
          pointBorderWidth: 2
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (context) => {
                return context.dataset.label + ': ' + this.formatCurrency(context.raw);
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => this.formatCurrency(value)
            }
          }
        }
      }
    });
  }

  renderCostTable(tco) {
    const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];
    const container = document.getElementById('costTable');
    if (!container) return;

    const allCategories = new Set();
    all.forEach(opt => Object.keys(opt.breakdown).forEach(cat => allCategories.add(cat)));

    const rows = Array.from(allCategories).map(cat => {
      return `
        <tr>
          <td><strong>${cat}</strong></td>
          ${all.map(opt => `<td class="cost-value">${this.formatCurrency(opt.breakdown[cat] || 0)}</td>`).join('')}
        </tr>
      `;
    }).join('');

    const totalsRow = `
      <tr style="background: #f8fafc; font-weight: 700; border-top: 2px solid #e2e8f0;">
        <td>TOTAL (5-YEAR)</td>
        ${all.map(opt => `<td class="cost-value">${this.formatCurrency(opt.total)}</td>`).join('')}
      </tr>
    `;

    container.innerHTML = `
      <table class="cost-table">
        <thead>
          <tr>
            <th>Category</th>
            ${all.map(opt => `<th>${opt.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${rows}
          ${totalsRow}
        </tbody>
      </table>
    `;
  }

  renderRecommendation(tco) {
    const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];
    const winner = all.reduce((min, curr) => curr.total < min.total ? curr : min);
    const container = document.getElementById('recommendation');
    if (!container) return;

    const savings = all
      .filter(o => o.name !== winner.name)
      .map(o => (o.total - winner.total) / winner.total * 100)
      .reduce((a, b) => Math.max(a, b), 0);

    container.innerHTML = `
      <h4>🎯 Recommended Path</h4>
      <p><span class="recommendation-highlight">${winner.name}</span> offers the best value at <span class="recommendation-highlight">${this.formatCurrency(winner.total)}</span> over 5 years.</p>
      <p style="font-size: 0.85rem; color: #64748b;">This path minimizes total cost of ownership while delivering enterprise-grade email and collaboration capabilities.</p>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TCOEstimator();
});

// Export functions for manual download triggers
function exportCSV() {
  const estimator = window.estimatorInstance;
  if (!estimator) return;

  const inputs = estimator.getInputs();
  const tco = estimator.calculateTCO(inputs);
  const all = [tco.onPrem, tco.exchangeOnlineP2, tco.m365E3, tco.exchangeSE];

  let csv = 'TCO Estimator Report\n';
  csv += `Generated: ${new Date().toLocaleString()}\n`;
  csv += `Users: ${inputs.users}, IT Cost/FTE: $${inputs.costPerFte}\n\n`;

  csv += 'Category,On-Premises,Exchange Online P2,Microsoft 365 E3,Exchange Server SE\n';

  const allCategories = new Set();
  all.forEach(opt => Object.keys(opt.breakdown).forEach(cat => allCategories.add(cat)));

  Array.from(allCategories).forEach(cat => {
    csv += cat;
    all.forEach(opt => csv += `,"$${(opt.breakdown[cat] || 0).toLocaleString()}"`);
    csv += '\n';
  });

  csv += 'TOTAL (5-YEAR)';
  all.forEach(opt => csv += `,"$${opt.total.toLocaleString()}"`);
  csv += '\n';

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `TCO-Estimator-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}

function exportChartPNG() {
  const canvas = document.querySelector('#barChart canvas');
  if (canvas) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `TCO-Chart-${new Date().toISOString().split('T')[0]}.png`;
    link.click();
  }
}

// Store instance globally for export functions
document.addEventListener('DOMContentLoaded', () => {
  window.estimatorInstance = new TCOEstimator();
});
