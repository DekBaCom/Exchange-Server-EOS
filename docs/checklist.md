---
layout: default
title: Checklist
nav_order: 2
description: "Phased migration checklist covering assessment, planning, implementation, and post-migration validation."
---

# Migration Readiness Checklist
{: .no_toc }

Use this phased checklist to guide your Exchange Server migration project from initial assessment through post-migration cleanup. Click any checkbox to track progress — your selections are saved automatically in the browser.
{: .fs-6 .fw-300 }

<div class="checklist-toolbar" id="checklistToolbar">
  <div class="checklist-progress-wrap">
    <span class="checklist-progress-text" id="checklistProgress">Loading checklist…</span>
    <div class="checklist-bar-track">
      <div class="checklist-bar-fill" id="checklistBarFill" style="width:0%"></div>
    </div>
  </div>
  <div class="checklist-btn-wrap">
    <button class="checklist-btn" onclick="resetChecklist()">↺ Reset</button>
    <button class="checklist-btn checklist-btn-csv" onclick="exportChecklistCSV()">📥 Export CSV</button>
    <button class="checklist-btn checklist-btn-excel" onclick="exportChecklistExcel()">📊 Export Excel</button>
  </div>
</div>

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Phase 1 — Current State Assessment

Complete this phase before choosing a migration path. Decisions made here drive all downstream planning.

### Server Inventory

- [ ] Document all Exchange Server versions and editions in use
- [ ] Record server hardware specifications (CPU, RAM, disk, network)
- [ ] Identify server roles (Mailbox, Edge Transport, DAG membership)
- [ ] Capture OS version and patch level for each server
- [ ] List all installed Exchange Cumulative Updates (CUs)
- [ ] Document Database Availability Group (DAG) topology
- [ ] Identify co-located workloads on Exchange servers

### Mailbox Audit

- [ ] Export full mailbox inventory (size, item count, last logon)
- [ ] Identify shared mailboxes, room/equipment mailboxes, and discovery mailboxes
- [ ] Locate inactive and soft-deleted mailboxes
- [ ] Audit mailbox archive sizes and archive policies
- [ ] Identify users with mailboxes over 50 GB (cloud migration impact)
- [ ] Review public folder usage and size
- [ ] Document distribution groups, dynamic distribution groups, and mail-enabled security groups

### Mail Flow & Connectors

- [ ] Map all Send Connectors and Receive Connectors
- [ ] Document SMTP relay configurations (applications, printers, scanners)
- [ ] Identify third-party anti-spam/anti-malware gateways
- [ ] Review accepted domains and email address policies
- [ ] Document mail flow rules (transport rules)
- [ ] Audit journal rules and compliance archive settings

### Client & Integration Assessment

- [ ] Identify all Outlook versions in use across the organization
- [ ] Locate mobile device users (ActiveSync, Outlook Mobile)
- [ ] Document Outlook on the Web (OWA) usage patterns
- [ ] Identify third-party applications authenticating to Exchange
  - ERP and CRM systems using SMTP relay
  - Line-of-business applications with Exchange Web Services (EWS)
  - Monitoring tools with mailbox access
- [ ] Review MAPI/CDO-based legacy applications
- [ ] Document any applications using Basic Authentication

### DNS & Certificates

- [ ] Audit all Exchange-related DNS records (Autodiscover, MX, SPF, DKIM, DMARC)
- [ ] Review SSL/TLS certificate expiry dates and subject alternative names (SANs)
- [ ] Document certificate authority (CA) used — internal vs. public
- [ ] Verify certificate coverage for all Exchange namespaces

---

## Phase 2 — Migration Planning

{: .important }
Do not begin technical implementation until Phase 2 is complete. Decisions here are expensive to reverse mid-migration.

### Migration Path Selection

- [ ] Review [migration options]({% link docs/implement.md %}) and select primary path
- [ ] Confirm cloud readiness (internet bandwidth, latency, licensing budget)
- [ ] Validate data-sovereignty and compliance requirements
- [ ] Obtain executive and stakeholder sign-off on migration strategy
- [ ] Identify any regulatory constraints (GDPR, HIPAA, FedRAMP, ISO 27001)

### Project Planning

- [ ] Define project sponsor, project manager, and technical leads
- [ ] Establish migration steering committee
- [ ] Build detailed project plan with milestones and dependencies
- [ ] Define pilot group (10–50 representative users)
- [ ] Create mailbox migration waves (prioritized by department and risk)
- [ ] Schedule migration during low-activity windows
- [ ] Define rollback criteria and rollback procedure for each wave
- [ ] Establish communication plan for end users and IT

### Licensing & Procurement

- [ ] Validate current Exchange Server license compliance
- [ ] Obtain Microsoft 365 or Exchange SE license quotes
- [ ] Purchase licenses with sufficient lead time before migration
- [ ] Assign licenses to pilot users in advance of testing
- [ ] Review Software Assurance entitlements (if applicable)

### Infrastructure Preparation

- [ ] Assess Active Directory health (schema version, replication, domain functional level)
- [ ] Verify AD Connect/Entra Connect is deployed for hybrid identity (if using Microsoft 365)
- [ ] Confirm DNS delegation for Autodiscover in hybrid mode
- [ ] Evaluate internet egress capacity for cloud migration workloads
- [ ] Plan network firewall rules for hybrid connector (if applicable)

---

## Phase 3 — Pre-Migration Preparation

### Environment Setup

- [ ] Deploy test/staging environment for migration validation
- [ ] Configure Microsoft 365 tenant (if migrating to cloud)
  - [ ] Verify domain ownership in Microsoft 365 admin center
  - [ ] Configure Entra ID Connect (formerly Azure AD Connect) sync
  - [ ] Enable and configure Exchange Hybrid Configuration Wizard
- [ ] Deploy Exchange Server SE (if staying on-premises)
  - [ ] Prepare new server hardware or virtual machines
  - [ ] Install and configure Exchange SE in coexistence mode
- [ ] Validate hybrid mail flow end-to-end in test environment

### Security & Compliance Baseline

- [ ] Enable Modern Authentication on current Exchange if not already active
- [ ] Disable Basic Authentication for migrating users
- [ ] Configure multi-factor authentication (MFA) for pilot users
- [ ] Review and update Conditional Access policies (if using Entra ID)
- [ ] Confirm data loss prevention (DLP) policies transfer or equivalent exists in target

### Backup & Recovery

- [ ] Verify full backup of all Exchange databases
- [ ] Test mailbox restore from backup in test environment
- [ ] Document recovery time objective (RTO) and recovery point objective (RPO)
- [ ] Retain Exchange backups for at least 90 days post-migration

### User & Help Desk Readiness

- [ ] Prepare user communication template (announce migration dates)
- [ ] Train help desk on expected support tickets (Outlook profile, Autodiscover issues)
- [ ] Create FAQ document for end users
- [ ] Set up dedicated migration support channel (Teams, ticketing queue)
- [ ] Run pilot user briefing session

---

## Phase 4 — Migration Execution

### Pilot Wave (Week 1–2)

- [ ] Migrate pilot group (IT staff and volunteer early adopters)
- [ ] Validate Autodiscover connectivity for all client types
- [ ] Confirm mobile device ActiveSync provisioning
- [ ] Test calendar sharing and free/busy information
- [ ] Validate mail flow (internal, external, relays)
- [ ] Verify public folder access if retained
- [ ] Confirm archive mailbox access
- [ ] Collect and review pilot feedback before proceeding

### Production Waves

- [ ] Execute migration waves per approved schedule
- [ ] Monitor migration queue and throughput daily
- [ ] Resolve any failed migrations before proceeding to next wave
- [ ] Update help desk on wave completion and expected tickets
- [ ] Validate each wave with spot-check user calls

### Mail Flow Cutover

- [ ] Update MX records to point to Microsoft 365 (Exchange Online Protection) or new server
- [ ] Update SPF, DKIM, and DMARC DNS records
- [ ] Verify inbound mail delivery to all migrated mailboxes
- [ ] Validate outbound mail signing and DMARC alignment
- [ ] Monitor mail flow for 48 hours post-MX change
- [ ] Update SMTP relay configurations for applications/devices

---

## Phase 5 — Post-Migration & Cleanup

### Validation & Sign-Off

- [ ] Confirm 100% of mailboxes are migrated and verified
- [ ] Run post-migration user satisfaction survey
- [ ] Validate all application integrations are functional
- [ ] Confirm compliance archive and journaling is operational
- [ ] Obtain formal business sign-off on migration completion

### Decommissioning

- [ ] Remove legacy Exchange servers from DAG (if applicable)
- [ ] Uninstall Exchange from legacy servers following Microsoft guidance
  - Note: Do not delete Exchange servers from AD without proper uninstall
- [ ] Reclaim server hardware or decommission VMs
- [ ] Remove or archive legacy Exchange backup jobs
- [ ] Update CMDB and infrastructure documentation
- [ ] Cancel unused on-premises Exchange-related licenses or subscriptions

### Documentation

- [ ] Update network diagrams to reflect new mail infrastructure
- [ ] Document new MX, SPF, DKIM, DMARC configuration
- [ ] Record new admin procedures for Exchange Online or Exchange SE
- [ ] Archive migration project documentation for audit purposes

{: .note }
Keep legacy Exchange servers accessible (but offline or isolated) for at least 30 days post-migration to handle edge cases such as delayed mail delivery, legal hold review, or rollback needs.

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script>
(function () {
  var STORAGE_KEY = 'eos-checklist-v1';

  function init() {
    var checkboxes = Array.from(document.querySelectorAll('input.task-list-item-checkbox'));
    if (!checkboxes.length) return;

    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}

    checkboxes.forEach(function (cb, i) {
      cb.removeAttribute('disabled');
      if (saved[i]) cb.checked = true;
      cb.addEventListener('change', function () {
        saveState(checkboxes);
        updateProgress(checkboxes);
      });
    });

    updateProgress(checkboxes);
  }

  function saveState(checkboxes) {
    var state = {};
    checkboxes.forEach(function (cb, i) { if (cb.checked) state[i] = 1; });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function updateProgress(checkboxes) {
    var total = checkboxes.length;
    var done = checkboxes.filter(function (cb) { return cb.checked; }).length;
    var pct = total ? Math.round(done / total * 100) : 0;
    var textEl = document.getElementById('checklistProgress');
    var fillEl = document.getElementById('checklistBarFill');
    if (textEl) textEl.textContent = done + ' / ' + total + ' completed (' + pct + '%)';
    if (fillEl) fillEl.style.width = pct + '%';
  }

  function getItemText(li) {
    return Array.from(li.childNodes)
      .filter(function (n) { return n.nodeType === 3; })
      .map(function (n) { return n.textContent.trim(); })
      .filter(function (t) { return t.length > 0; })
      .join(' ');
  }

  function buildRows() {
    var rows = [['Phase', 'Section', 'Task', 'Status']];
    var currentPhase = '';
    var currentSection = '';
    var els = Array.from(document.querySelectorAll('h2, h3, li.task-list-item'));
    els.forEach(function (el) {
      if (el.closest('details')) return;
      var tag = el.tagName;
      if (tag === 'H2') {
        currentPhase = el.textContent.replace(/\s+/g, ' ').trim();
      } else if (tag === 'H3') {
        currentSection = el.textContent.replace(/\s+/g, ' ').trim();
      } else {
        var cb = el.querySelector(':scope > input[type="checkbox"]');
        if (!cb) return;
        var text = getItemText(el);
        rows.push([currentPhase, currentSection, text, cb.checked ? 'Completed' : 'Pending']);
      }
    });
    return rows;
  }

  window.resetChecklist = function () {
    if (!confirm('Reset all checkboxes to unchecked?')) return;
    var checkboxes = Array.from(document.querySelectorAll('input.task-list-item-checkbox'));
    checkboxes.forEach(function (cb) { cb.checked = false; });
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    updateProgress(checkboxes);
  };

  window.exportChecklistCSV = function () {
    var rows = buildRows();
    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\r\n');
    var bom = '﻿'; // UTF-8 BOM for Excel compatibility
    var blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Exchange-Migration-Checklist.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  window.exportChecklistExcel = function () {
    if (typeof XLSX === 'undefined') {
      alert('Excel library not loaded — please try Export CSV instead.');
      return;
    }
    var rows = buildRows();
    var ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 32 }, { wch: 26 }, { wch: 65 }, { wch: 12 }];
    // Bold header row
    var headerRange = XLSX.utils.decode_range(ws['!ref']);
    for (var c = headerRange.s.c; c <= headerRange.e.c; c++) {
      var cellAddr = XLSX.utils.encode_cell({ r: 0, c: c });
      if (ws[cellAddr]) {
        ws[cellAddr].s = { font: { bold: true }, fill: { fgColor: { rgb: 'D0E4F7' } } };
      }
    }
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Migration Checklist');
    XLSX.writeFile(wb, 'Exchange-Migration-Checklist.xlsx');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
