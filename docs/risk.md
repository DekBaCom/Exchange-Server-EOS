---
layout: default
title: Risk Assessment
nav_order: 6
description: "Risk identification and mitigation strategies for Exchange Server end of support scenarios."
---

# Risk Assessment
{: .no_toc }

Identifying, categorizing, and mitigating risks associated with Exchange Server end of support and migration.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Risk Matrix

Use this framework to prioritize risks by **likelihood** (how probably the risk event occurs) and **impact** (how severely it affects the organization).

| | **Low Impact** | **Medium Impact** | **High Impact** | **Critical Impact** |
|:---:|:---:|:---:|:---:|:---:|
| **Very Likely** | Monitor | Mitigate | Mitigate urgently | Treat immediately |
| **Likely** | Accept | Monitor | Mitigate | Mitigate urgently |
| **Unlikely** | Accept | Accept | Monitor | Mitigate |
| **Rare** | Accept | Accept | Accept | Monitor |

---

## Risk Register

### R01 — Unpatched Vulnerability Exploitation

| Attribute | Detail |
|:---|:---|
| Category | Security |
| Likelihood | **Very Likely** (active threat actors target Exchange) |
| Impact | **Critical** (full mailbox access, lateral movement, ransomware) |
| Treatment | **Treat Immediately** |

**Description:** With no security patches after EOS, any new Exchange vulnerability is permanently exploitable. Exchange has historically been one of the highest-priority targets for nation-state and criminal threat actors.

**Mitigations:**
- Restrict all Exchange internet-facing endpoints to VPN or trusted IPs immediately
- Deploy a Web Application Firewall (WAF) with Exchange-aware signatures
- Enable attack surface reduction rules via Windows Defender
- Monitor Exchange audit logs daily for anomalous access patterns
- Accelerate migration as top organizational priority

---

### R02 — Ransomware via Exchange

| Attribute | Detail |
|:---|:---|
| Category | Security / Business Continuity |
| Likelihood | **Likely** |
| Impact | **Critical** |
| Treatment | **Treat Immediately** |

**Description:** Unpatched Exchange servers are commonly used as initial access vectors for ransomware groups. A compromised Exchange server provides credentials, email content, and a foothold for lateral movement.

**Mitigations:**
- Implement network segmentation (Exchange in a DMZ or isolated segment)
- Enable immutable backups (air-gapped or cloud-hosted) for all Exchange data
- Deploy endpoint detection and response (EDR) on Exchange servers
- Enable Windows Event Log forwarding to a SIEM
- Test incident response plan for Exchange compromise scenario

---

### R03 — Regulatory Non-Compliance

| Attribute | Detail |
|:---|:---|
| Category | Compliance / Legal |
| Likelihood | **Likely** |
| Impact | **High** |
| Treatment | **Mitigate** |

**Description:** Running unsupported software that processes personal data may violate GDPR, HIPAA, PCI DSS, PDPA, and other regulations. Regulators increasingly scrutinize patch management as a data security control.

**Mitigations:**
- Document the risk formally and obtain CISO/DPO acceptance if migration is delayed
- Implement compensating controls (WAF, network isolation, monitoring)
- Engage legal counsel to assess regulatory exposure in your jurisdiction
- Accelerate migration timeline with documented milestones for regulators

---

### R04 — Data Breach — Mailbox Content Exposure

| Attribute | Detail |
|:---|:---|
| Category | Security / Legal |
| Likelihood | **Likely** (if R01 is realized) |
| Impact | **Critical** (GDPR fine up to 4% global revenue; reputational damage) |
| Treatment | **Mitigate** |

**Description:** Exchange mailboxes contain sensitive business information, personal data, and credentials. A breach of Exchange mailbox content triggers notification obligations, regulatory investigations, and civil liability.

**Mitigations:**
- Encrypt mailbox databases at rest (BitLocker on Windows Server)
- Implement mailbox audit logging and retention
- Review and restrict who has Full Access to mailboxes
- Enable multi-factor authentication for all admin accounts

---

### R05 — Loss of Vendor Support During Incident

| Attribute | Detail |
|:---|:---|
| Category | Operational |
| Likelihood | **Likely** (incidents occur; support will be unavailable) |
| Impact | **High** |
| Treatment | **Mitigate** |

**Description:** After EOS, Microsoft will not assist with Exchange Server issues. A critical mail flow failure or data corruption event requires resolution without vendor support, increasing mean time to recovery (MTTR).

**Mitigations:**
- Maintain internal Exchange expertise (documentation, runbooks)
- Engage a qualified Exchange partner for support contracts if available
- Ensure a tested disaster recovery procedure is current
- Maintain Exchange database backups with tested restore procedures

---

### R06 — Migration Disruption to Business Operations

| Attribute | Detail |
|:---|:---|
| Category | Business Continuity |
| Likelihood | **Likely** (some disruption is normal during migration) |
| Impact | **Medium** |
| Treatment | **Monitor** |

**Description:** Email migrations cause user-facing disruptions including Outlook profile reconnection, mobile device re-provisioning, and calendar access issues during hybrid coexistence. Help desk volumes spike significantly.

**Mitigations:**
- Pilot with IT staff before involving end users
- Migrate in waves during off-hours or low-activity periods
- Pre-communicate to users: when it happens, what to expect, who to call
- Staff help desk surge support during and after each wave
- Define a rollback trigger (e.g., >20% failure rate) and rollback procedure

---

### R07 — Application Integration Failures

| Attribute | Detail |
|:---|:---|
| Category | Technical / Operational |
| Likelihood | **Likely** (most organizations have SMTP-reliant apps) |
| Impact | **High** (broken workflows, missed alerts, compliance gaps) |
| Treatment | **Mitigate** |

**Description:** Applications using Basic Authentication, EWS, MAPI, or on-premises SMTP relay will break when Exchange is migrated or decommissioned without updating their configuration.

**Mitigations:**
- Complete full application inventory (see [Checklist]({% link docs/checklist.md %}))
- Test each application integration in a staging environment before go-live
- Update SMTP relay configurations to use authenticated SMTP via Microsoft 365 or a relay service
- Plan application modernization for EWS and Basic Auth-dependent apps
- Define post-migration validation test for every critical application

---

### R08 — Data Loss During Migration

| Attribute | Detail |
|:---|:---|
| Category | Data Integrity |
| Likelihood | **Unlikely** (with proper procedures) |
| Impact | **High** |
| Treatment | **Monitor** |

**Description:** Migration errors, interrupted jobs, or misconfigured endpoints can result in mailbox items failing to migrate without notification. The risk is low with properly executed migrations but non-zero.

**Mitigations:**
- Run full mailbox backup immediately before migration
- Use `Get-MigrationUser` to review any "Failed" status items post-migration
- Set migration completion notification alerts
- Perform per-user item count validation after each migration batch
- Keep source mailboxes accessible for 30 days post-migration

---

### R09 — License Procurement Delays

| Attribute | Detail |
|:---|:---|
| Category | Project / Financial |
| Likelihood | **Unlikely** (for well-planned projects) |
| Impact | **Medium** |
| Treatment | **Monitor** |

**Description:** Procurement processes for Microsoft 365 licensing, especially in public sector or highly regulated organizations, can take weeks to months. Delays block migration start.

**Mitigations:**
- Begin licensing procurement in Phase 2 (Planning) — do not wait for Phase 3
- Use Microsoft 365 trial licenses for pilot users while procurement is in progress
- Identify licensing approvers early and include them in the project steering committee

---

### R10 — Talent and Skills Gap

| Attribute | Detail |
|:---|:---|
| Category | Operational |
| Likelihood | **Likely** |
| Impact | **Medium** |
| Treatment | **Monitor** |

**Description:** Microsoft 365 administration requires different skills than on-premises Exchange. Internal IT staff may lack Microsoft 365, PowerShell (Exchange Online module), Entra ID, or Purview compliance experience.

**Mitigations:**
- Identify skill gaps via assessment before migration begins
- Provide targeted training (Microsoft Learn, MS-203 certification for Exchange admins)
- Engage a Microsoft Partner for knowledge transfer during migration
- Document new admin procedures for ongoing operations

---

## Risk Summary by Priority

| Risk | Category | Priority |
|:---|:---|:---:|
| R01 — Unpatched Vulnerability | Security | Critical |
| R02 — Ransomware | Security | Critical |
| R04 — Data Breach | Security / Legal | Critical |
| R03 — Regulatory Non-Compliance | Compliance | High |
| R05 — No Vendor Support | Operational | High |
| R07 — Application Failures | Technical | High |
| R08 — Data Loss | Data Integrity | High |
| R06 — Migration Disruption | Business Continuity | Medium |
| R09 — License Delays | Project | Medium |
| R10 — Skills Gap | Operational | Medium |

---

## Governance Recommendations

1. **Escalate to executive leadership** — Frame EOS as a business risk, not an IT issue. Email availability and security affect every employee.

2. **Formally accept or mitigate each risk** — Document which risks are accepted (with rationale) and which are mitigated. This protects the organization in audits.

3. **Set a migration deadline** — Without a fixed target date, migrations drift. Aim to complete before the first anniversary of EOS (October 2026 at the latest).

4. **Review quarterly** — Risk likelihood changes as threat landscape evolves. Reassess the register every quarter until migration is complete.
