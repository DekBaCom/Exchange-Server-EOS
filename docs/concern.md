---
layout: default
title: Concerns
nav_order: 4
description: "Key concerns for organizations running unsupported Exchange Server — security, compliance, continuity, and technical compatibility."
---

# Key Concerns
{: .no_toc }

Understanding the concerns organizations face when running or migrating from unsupported Exchange Server versions.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Security Concerns

### No Security Patches After End of Support

{: .warning }
After October 14, 2025, Microsoft releases no security fixes for Exchange Server 2016 or 2019. Every vulnerability discovered from that point forward becomes a permanent unpatched risk.

Exchange Server is an attractive target for threat actors because:

- It handles all organizational email — a gold mine for espionage, BEC (Business Email Compromise), and ransomware staging
- It is exposed to the internet (MX, Autodiscover, OWA, EWS endpoints)
- Historical Exchange vulnerabilities (ProxyLogon, ProxyShell, ProxyNotShell) were widely exploited within days of disclosure

### Known Exploit History

| CVE | Year | Severity | Impact |
|:---|:---:|:---:|:---|
| ProxyLogon (CVE-2021-26855) | 2021 | Critical | Pre-auth RCE, mass exploitation |
| ProxyShell (CVE-2021-34473) | 2021 | Critical | Pre-auth RCE |
| ProxyNotShell (CVE-2022-41082) | 2022 | High | Authenticated RCE |
| OWASSRF (CVE-2022-41080) | 2022 | Critical | Server-Side Request Forgery |

New vulnerabilities of this severity will continue to be discovered — and after EOS, will never be patched.

### Recommended Security Mitigations (If Still Running Unsupported)

- Restrict OWA and EWS to VPN-only access immediately
- Enable Windows Defender and keep definition updates active (OS updates are separate from Exchange)
- Deploy a Web Application Firewall (WAF) or Exchange-aware proxy
- Implement network segmentation to isolate Exchange servers
- Enable enhanced monitoring and alerting on Exchange event logs
- Accelerate migration timeline as the top organizational priority

{: .important }
These mitigations reduce risk but do not eliminate it. They are temporary measures only — not a substitute for migration.

---

## Compliance Concerns

### Regulatory Exposure

Many industries operate under regulations that require vendors to provide supported software for data processing systems. Running unsupported Exchange may constitute a compliance violation under:

| Regulation | Region / Sector | Requirement |
|:---|:---|:---|
| GDPR | EU (all sectors) | Appropriate technical measures for data security |
| HIPAA | US (healthcare) | Access controls and audit trails on ePHI |
| PCI DSS | Global (payment card) | Patching and vulnerability management requirements |
| ISO/IEC 27001 | Global | Patch management as part of information security management |
| SOC 2 | US (SaaS/service orgs) | Logical access and change management |
| PDPA (Thailand) | Thailand | Security measures appropriate to risk |

### Audit Implications

Auditors frequently ask:
- "Is all software in your environment under vendor support?"
- "Can you demonstrate a patching cadence for email systems?"
- "What is your vulnerability remediation SLA?"

An unsupported Exchange Server cannot satisfy these questions, potentially leading to audit findings, remediation requirements, or — in regulated industries — fines.

### Legal Hold & eDiscovery

Microsoft 365 provides In-Place Hold and eDiscovery natively. Organizations on unsupported on-premises Exchange must maintain these capabilities themselves without Microsoft's support or tooling improvements.

---

## Data Sovereignty Concerns

Organizations considering migration to Microsoft 365 (Exchange Online) should evaluate:

| Concern | Detail |
|:---|:---|
| Data residency | Microsoft 365 stores data in regional datacenters; verify your region |
| Data access by Microsoft | Microsoft can access data under lawful order (same as cloud providers globally) |
| Government subpoenas | US CLOUD Act applies to Microsoft regardless of data location |
| Multi-geo tenants | Microsoft 365 Multi-Geo allows per-user data location (additional cost) |
| Sovereignty clouds | Microsoft offers GCC, GCC High (US), and national clouds (Germany, China) for strict requirements |

{: .note }
Thailand-based organizations should review Microsoft's data center commitments for the Thailand region, which became available in 2024.

---

## Business Continuity Concerns

### Mail Flow During Migration

Migration creates a window where some users are on Exchange Online and others remain on-premises. During this hybrid coexistence period:

- **Free/busy visibility** — Requires proper hybrid configuration to work across boundaries
- **Meeting forwarding** — Can fail if organizer is on a different system than attendees
- **Mail routing** — Requires consistent hybrid connector configuration
- **Mobile device profiles** — Require re-provisioning as users are migrated

### Acceptable Downtime

Most migration methods result in minimal mailbox downtime — typically an Outlook profile reconnect (seconds to minutes). However, plan for:

- Help desk surge during and after each migration wave (estimate 5–15% of migrated users calling)
- Application-generated email failures if SMTP relay is not updated before or during migration
- Mobile device re-sync of large mailboxes (can take hours on cellular connections)

### Disaster Recovery Changes

Cloud migration changes your DR profile:

| Aspect | On-Premises Exchange | Exchange Online |
|:---|:---|:---|
| RTO | Hours (DAG failover) | Minutes (built-in geo-redundancy) |
| RPO | Last backup | Near zero (continuous replication) |
| Backup ownership | Organization | Microsoft |
| DR testing | Required | Not required (built-in) |

---

## Technical Compatibility Concerns

### Client Version Requirements

| Client | Minimum Supported Version for Exchange Online |
|:---|:---|
| Outlook for Windows | Outlook 2016 (current channel recommended) |
| Outlook for Mac | Outlook 2019 or Microsoft 365 version |
| Outlook Mobile (iOS/Android) | Current version from app store |
| Outlook on the Web | Any modern browser |

{: .warning }
Outlook 2013 is end of life and not supported with Exchange Online. Users on Outlook 2013 must upgrade before or during migration.

### Application Integration Risks

Applications using **Basic Authentication** or **EWS (Exchange Web Services)** require specific attention:

- **Basic Auth** has been deprecated in Exchange Online — applications must be updated to support OAuth 2.0
- **EWS** continues to be supported in Exchange Online but is deprecated for new development; applications should migrate to Microsoft Graph API
- **MAPI/CDO** is not available in Exchange Online — applications using these must be rewritten or replaced
- **PowerShell Remoting** to Exchange is replaced by the Exchange Online PowerShell V3 module

### Third-Party Tool Compatibility

| Category | Common Impact |
|:---|:---|
| Backup software | Backup agents may not support Exchange Online backup natively |
| Email archiving | Third-party archive solutions may require reconfiguration or replacement |
| Fax/print-to-email | SMTP relay configuration must be updated |
| Monitoring tools | WMI-based Exchange monitoring will no longer apply |
| Spam filtering | On-premises gateways become redundant with Exchange Online Protection |

---

## User Experience Concerns

### Change Management

Migrating email is high-visibility and affects every employee. Anticipate:

- Resistance from users accustomed to on-premises mailbox behavior
- Confusion around changes to Outlook profile configuration
- Questions about file attachment storage (OneDrive vs. local)
- Adjusted behavior for offline email (Outlook cached mode differences)

### Training Recommendations

- Produce short video guides (2–3 minutes) for common tasks in Outlook/Exchange Online
- Identify departmental champions to handle first-line questions
- Host optional drop-in sessions during the first two weeks post-migration
- Create a self-service FAQ page on intranet

### Perceived Performance

Some users report email access feeling slower immediately after migration. This is typically due to:
- Outlook re-indexing the local OST file (normal, resolves in 24–48 hours)
- Larger OST cache rebuild for users migrated to Exchange Online unlimited storage
- Network latency to Microsoft 365 if internet egress is not optimized

Ensure split-tunneling or local internet breakout is configured for Microsoft 365 traffic per Microsoft's published network connectivity principles.
