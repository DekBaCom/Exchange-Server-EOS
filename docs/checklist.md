---
layout: default
title: Checklist
nav_order: 2
description: "Phased migration checklist covering assessment, planning, implementation, and post-migration validation."
---

# Migration Readiness Checklist
{: .no_toc }

Use this phased checklist to guide your Exchange Server migration project from initial assessment through post-migration cleanup. Click any item to track progress — your selections are saved automatically in the browser.
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

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Document all Exchange Server versions and editions in use</label></li>
  <li><label><input type="checkbox" class="eos-task"> Record server hardware specifications (CPU, RAM, disk, network)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify server roles (Mailbox, Edge Transport, DAG membership)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Capture OS version and patch level for each server</label></li>
  <li><label><input type="checkbox" class="eos-task"> List all installed Exchange Cumulative Updates (CUs)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document Database Availability Group (DAG) topology</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify co-located workloads on Exchange servers</label></li>
</ul>

### Mailbox Audit

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Export full mailbox inventory (size, item count, last logon)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify shared mailboxes, room/equipment mailboxes, and discovery mailboxes</label></li>
  <li><label><input type="checkbox" class="eos-task"> Locate inactive and soft-deleted mailboxes</label></li>
  <li><label><input type="checkbox" class="eos-task"> Audit mailbox archive sizes and archive policies</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify users with mailboxes over 50 GB (cloud migration impact)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review public folder usage and size</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document distribution groups, dynamic distribution groups, and mail-enabled security groups</label></li>
</ul>

### Mail Flow &amp; Connectors

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Map all Send Connectors and Receive Connectors</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document SMTP relay configurations (applications, printers, scanners)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify third-party anti-spam/anti-malware gateways</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review accepted domains and email address policies</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document mail flow rules (transport rules)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Audit journal rules and compliance archive settings</label></li>
</ul>

### Client &amp; Integration Assessment

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Identify all Outlook versions in use across the organization</label></li>
  <li><label><input type="checkbox" class="eos-task"> Locate mobile device users (ActiveSync, Outlook Mobile)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document Outlook on the Web (OWA) usage patterns</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify third-party applications authenticating to Exchange (ERP, CRM, EWS, monitoring tools)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review MAPI/CDO-based legacy applications</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document any applications using Basic Authentication</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review line-of-business apps with Exchange Web Services (EWS)</label></li>
</ul>

### DNS &amp; Certificates

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Audit all Exchange-related DNS records (Autodiscover, MX, SPF, DKIM, DMARC)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review SSL/TLS certificate expiry dates and subject alternative names (SANs)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document certificate authority (CA) used — internal vs. public</label></li>
  <li><label><input type="checkbox" class="eos-task"> Verify certificate coverage for all Exchange namespaces</label></li>
</ul>

---

## Phase 2 — Migration Planning

{: .important }
Do not begin technical implementation until Phase 2 is complete. Decisions here are expensive to reverse mid-migration.

### Migration Path Selection

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Review <a href="{% link docs/implement.md %}">migration options</a> and select primary path</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm cloud readiness (internet bandwidth, latency, licensing budget)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate data-sovereignty and compliance requirements</label></li>
  <li><label><input type="checkbox" class="eos-task"> Obtain executive and stakeholder sign-off on migration strategy</label></li>
  <li><label><input type="checkbox" class="eos-task"> Identify any regulatory constraints (GDPR, HIPAA, FedRAMP, ISO 27001)</label></li>
</ul>

### Project Planning

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Define project sponsor, project manager, and technical leads</label></li>
  <li><label><input type="checkbox" class="eos-task"> Establish migration steering committee</label></li>
  <li><label><input type="checkbox" class="eos-task"> Build detailed project plan with milestones and dependencies</label></li>
  <li><label><input type="checkbox" class="eos-task"> Define pilot group (10–50 representative users)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Create mailbox migration waves (prioritized by department and risk)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Schedule migration during low-activity windows</label></li>
  <li><label><input type="checkbox" class="eos-task"> Define rollback criteria and rollback procedure for each wave</label></li>
  <li><label><input type="checkbox" class="eos-task"> Establish communication plan for end users and IT</label></li>
</ul>

### Licensing &amp; Procurement

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Validate current Exchange Server license compliance</label></li>
  <li><label><input type="checkbox" class="eos-task"> Obtain Microsoft 365 or Exchange SE license quotes</label></li>
  <li><label><input type="checkbox" class="eos-task"> Purchase licenses with sufficient lead time before migration</label></li>
  <li><label><input type="checkbox" class="eos-task"> Assign licenses to pilot users in advance of testing</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review Software Assurance entitlements (if applicable)</label></li>
</ul>

### Infrastructure Preparation

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Assess Active Directory health (schema version, replication, domain functional level)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Verify AD Connect/Entra Connect is deployed for hybrid identity (if using Microsoft 365)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm DNS delegation for Autodiscover in hybrid mode</label></li>
  <li><label><input type="checkbox" class="eos-task"> Evaluate internet egress capacity for cloud migration workloads</label></li>
  <li><label><input type="checkbox" class="eos-task"> Plan network firewall rules for hybrid connector (if applicable)</label></li>
</ul>

---

## Phase 3 — Pre-Migration Preparation

### Environment Setup

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Deploy test/staging environment for migration validation</label></li>
  <li><label><input type="checkbox" class="eos-task"> Configure Microsoft 365 tenant — verify domain ownership in admin center</label></li>
  <li><label><input type="checkbox" class="eos-task"> Configure Entra ID Connect (formerly Azure AD Connect) sync</label></li>
  <li><label><input type="checkbox" class="eos-task"> Enable and configure Exchange Hybrid Configuration Wizard</label></li>
  <li><label><input type="checkbox" class="eos-task"> Deploy Exchange Server SE — prepare new server hardware or virtual machines</label></li>
  <li><label><input type="checkbox" class="eos-task"> Install and configure Exchange SE in coexistence mode</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate hybrid mail flow end-to-end in test environment</label></li>
</ul>

### Security &amp; Compliance Baseline

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Enable Modern Authentication on current Exchange if not already active</label></li>
  <li><label><input type="checkbox" class="eos-task"> Disable Basic Authentication for migrating users</label></li>
  <li><label><input type="checkbox" class="eos-task"> Configure multi-factor authentication (MFA) for pilot users</label></li>
  <li><label><input type="checkbox" class="eos-task"> Review and update Conditional Access policies (if using Entra ID)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm data loss prevention (DLP) policies transfer or equivalent exists in target</label></li>
</ul>

### Backup &amp; Recovery

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Verify full backup of all Exchange databases</label></li>
  <li><label><input type="checkbox" class="eos-task"> Test mailbox restore from backup in test environment</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document recovery time objective (RTO) and recovery point objective (RPO)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Retain Exchange backups for at least 90 days post-migration</label></li>
</ul>

### User &amp; Help Desk Readiness

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Prepare user communication template (announce migration dates)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Train help desk on expected support tickets (Outlook profile, Autodiscover issues)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Create FAQ document for end users</label></li>
  <li><label><input type="checkbox" class="eos-task"> Set up dedicated migration support channel (Teams, ticketing queue)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Run pilot user briefing session</label></li>
</ul>

---

## Phase 4 — Migration Execution

### Pilot Wave (Week 1–2)

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Migrate pilot group (IT staff and volunteer early adopters)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate Autodiscover connectivity for all client types</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm mobile device ActiveSync provisioning</label></li>
  <li><label><input type="checkbox" class="eos-task"> Test calendar sharing and free/busy information</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate mail flow (internal, external, relays)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Verify public folder access if retained</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm archive mailbox access</label></li>
  <li><label><input type="checkbox" class="eos-task"> Collect and review pilot feedback before proceeding</label></li>
</ul>

### Production Waves

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Execute migration waves per approved schedule</label></li>
  <li><label><input type="checkbox" class="eos-task"> Monitor migration queue and throughput daily</label></li>
  <li><label><input type="checkbox" class="eos-task"> Resolve any failed migrations before proceeding to next wave</label></li>
  <li><label><input type="checkbox" class="eos-task"> Update help desk on wave completion and expected tickets</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate each wave with spot-check user calls</label></li>
</ul>

### Mail Flow Cutover

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Update MX records to point to Microsoft 365 (Exchange Online Protection) or new server</label></li>
  <li><label><input type="checkbox" class="eos-task"> Update SPF, DKIM, and DMARC DNS records</label></li>
  <li><label><input type="checkbox" class="eos-task"> Verify inbound mail delivery to all migrated mailboxes</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate outbound mail signing and DMARC alignment</label></li>
  <li><label><input type="checkbox" class="eos-task"> Monitor mail flow for 48 hours post-MX change</label></li>
  <li><label><input type="checkbox" class="eos-task"> Update SMTP relay configurations for applications/devices</label></li>
</ul>

---

## Phase 5 — Post-Migration &amp; Cleanup

### Validation &amp; Sign-Off

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Confirm 100% of mailboxes are migrated and verified</label></li>
  <li><label><input type="checkbox" class="eos-task"> Run post-migration user satisfaction survey</label></li>
  <li><label><input type="checkbox" class="eos-task"> Validate all application integrations are functional</label></li>
  <li><label><input type="checkbox" class="eos-task"> Confirm compliance archive and journaling is operational</label></li>
  <li><label><input type="checkbox" class="eos-task"> Obtain formal business sign-off on migration completion</label></li>
</ul>

### Decommissioning

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Remove legacy Exchange servers from DAG (if applicable)</label></li>
  <li><label><input type="checkbox" class="eos-task"> Uninstall Exchange from legacy servers following Microsoft guidance</label></li>
  <li><label><input type="checkbox" class="eos-task"> Do NOT delete Exchange server objects from Active Directory without proper uninstall</label></li>
  <li><label><input type="checkbox" class="eos-task"> Reclaim server hardware or decommission VMs</label></li>
  <li><label><input type="checkbox" class="eos-task"> Remove or archive legacy Exchange backup jobs</label></li>
  <li><label><input type="checkbox" class="eos-task"> Update CMDB and infrastructure documentation</label></li>
  <li><label><input type="checkbox" class="eos-task"> Cancel unused on-premises Exchange-related licenses or subscriptions</label></li>
</ul>

### Documentation

<ul class="eos-checklist">
  <li><label><input type="checkbox" class="eos-task"> Update network diagrams to reflect new mail infrastructure</label></li>
  <li><label><input type="checkbox" class="eos-task"> Document new MX, SPF, DKIM, DMARC configuration</label></li>
  <li><label><input type="checkbox" class="eos-task"> Record new admin procedures for Exchange Online or Exchange SE</label></li>
  <li><label><input type="checkbox" class="eos-task"> Archive migration project documentation for audit purposes</label></li>
</ul>

{: .note }
Keep legacy Exchange servers accessible (but offline or isolated) for at least 30 days post-migration to handle edge cases such as delayed mail delivery, legal hold review, or rollback needs.

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script>
(function () {
  var STORAGE_KEY = 'eos-checklist-v1';

  function init() {
    var checkboxes = Array.from(document.querySelectorAll('input.eos-task'));
    if (!checkboxes.length) return;

    var saved = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) {}

    checkboxes.forEach(function (cb, i) {
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

  function buildRows() {
    var rows = [['Phase', 'Section', 'Task', 'Status']];
    var currentPhase = '';
    var currentSection = '';

    var els = Array.from(document.querySelectorAll('h2, h3, li > label > input.eos-task'));
    els.forEach(function (el) {
      if (el.closest('details')) return;
      var tag = el.tagName;
      if (tag === 'H2') {
        currentPhase = el.textContent.replace(/\s+/g, ' ').trim();
      } else if (tag === 'H3') {
        currentSection = el.textContent.replace(/\s+/g, ' ').trim();
      } else {
        var label = el.closest('label');
        var text = label ? label.textContent.trim() : '';
        rows.push([currentPhase, currentSection, text, el.checked ? 'Completed' : 'Pending']);
      }
    });
    return rows;
  }

  window.resetChecklist = function () {
    if (!confirm('Reset all checkboxes to unchecked?')) return;
    var checkboxes = Array.from(document.querySelectorAll('input.eos-task'));
    checkboxes.forEach(function (cb) { cb.checked = false; });
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    updateProgress(checkboxes);
  };

  window.exportChecklistCSV = function () {
    var rows = buildRows();
    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\r\n');
    var blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Exchange-Migration-Checklist.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  window.exportChecklistExcel = function () {
    if (typeof XLSX === 'undefined') {
      alert('Excel library not loaded. Please try Export CSV instead.');
      return;
    }
    var rows = buildRows();
    var ws = XLSX.utils.aoa_to_sheet(rows);
    ws['!cols'] = [{ wch: 34 }, { wch: 28 }, { wch: 68 }, { wch: 12 }];
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
