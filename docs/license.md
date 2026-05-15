---
layout: default
title: Licensing
nav_order: 7
description: "Exchange Server licensing guide covering Exchange SE, Microsoft 365 plans, CALs, and licensing recommendations."
---

# Licensing Guide
{: .no_toc }

Understanding your licensing options for Exchange Server migration and the Microsoft 365 ecosystem.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

{: .important }
Licensing prices and terms change frequently. All figures below are indicative estimates based on publicly available MSRP. Actual costs depend on your agreement type (Open, EA, CSP, MPSA), volume, and geography. Always obtain a formal quote from Microsoft or a licensed partner.

---

## Exchange Server Traditional Licensing (Legacy)

Exchange Server 2016 and 2019 use a **Server + Client Access License (CAL)** model under perpetual licensing.

### Server Licenses

| Product | License Type | Approx. MSRP |
|:---|:---:|---:|
| Exchange Server 2019 Standard | Perpetual | ~$709 |
| Exchange Server 2019 Enterprise | Perpetual | ~$3,609 |

**Standard vs. Enterprise:**

| Feature | Standard | Enterprise |
|:---|:---:|:---:|
| Mailbox databases | Up to 5 | Up to 100 |
| Database Availability Group | Supported | Supported |
| Journaling | Per-database | Per-database |
| Archiving | Requires Enterprise CAL | Requires Enterprise CAL |
| Data Loss Prevention | Requires Enterprise CAL | Requires Enterprise CAL |

### Client Access Licenses (CALs)

Every user or device that accesses Exchange Server requires a CAL.

| CAL Type | Approx. MSRP (per user) | Included Features |
|:---|---:|:---|
| Exchange Standard CAL | ~$76 | Basic email, calendar, contacts |
| Exchange Enterprise CAL | ~$176 | Standard + archiving, DLP, unified messaging, IRM |

{: .note }
You need either a Standard CAL or an Enterprise CAL per user, not both. The Enterprise CAL includes all Standard CAL rights.

### Software Assurance

Software Assurance (SA) on perpetual licenses provided:
- Rights to upgrade to new versions
- Step-up licenses between editions
- Cold failover server rights
- 24/7 problem resolution support

{: .warning }
If your Software Assurance has lapsed, you may not have rights to upgrade from Exchange 2016/2019 to Exchange SE without purchasing new licenses. Check your SA expiry date.

---

## Exchange Server SE Licensing

Exchange Server Subscription Edition (SE) replaces the perpetual model with an **annual subscription**.

### How Exchange SE Licensing Works

| Component | Description |
|:---|:---|
| Server subscription | Annual fee per Exchange SE server instance |
| User/Device CAL subscription | Annual fee per user or device accessing Exchange SE |
| SA not required | Subscription inherently includes upgrade rights |
| Downgrade rights | Subscription licenses include rights to run previous versions |

### Exchange SE vs. Legacy CAL Comparison

| Aspect | Exchange 2019 (Perpetual) | Exchange SE (Subscription) |
|:---|:---|:---|
| Payment model | One-time purchase + SA | Annual recurring |
| Upgrade rights | Requires active SA | Included |
| Version lock | Fixed to purchased version | Always current version |
| Cold DR server | Requires additional license | Included per Microsoft terms |
| Budget predictability | Variable (hardware refresh cycles) | Predictable annual cost |

{: .note }
Organizations with active Software Assurance on Exchange 2019 may be eligible for step-up or migration credits to Exchange SE. Confirm entitlements with your Microsoft licensing partner.

---

## Microsoft 365 Licensing

Microsoft 365 bundles Exchange Online with the broader Microsoft productivity platform. Choose the plan based on organizational size and feature requirements.

### Business Plans (Up to 300 Users)

| Plan | Price (est.) | Exchange Storage | Key Inclusions |
|:---|---:|:---:|:---|
| Microsoft 365 Business Basic | ~$6/user/mo | 50 GB | Exchange Online, Teams, SharePoint, OneDrive (1 TB), web Office apps |
| Microsoft 365 Business Standard | ~$12.50/user/mo | 50 GB | Business Basic + desktop Office apps |
| Microsoft 365 Business Premium | ~$22/user/mo | 50 GB + archive | Standard + Intune, Entra ID P1, Defender for Business |

### Enterprise Plans (Unlimited Users)

| Plan | Price (est.) | Exchange Storage | Key Inclusions |
|:---|---:|:---:|:---|
| Microsoft 365 E1 | ~$10/user/mo | 50 GB | Exchange Online Plan 1, Teams, SharePoint, web Office apps |
| Microsoft 365 E3 | ~$36/user/mo | Unlimited + archive | E1 + desktop Office, Compliance (Purview), Intune, Entra ID P1 |
| Microsoft 365 E5 | ~$57/user/mo | Unlimited + archive | E3 + Defender for O365 P2, Purview eDiscovery Premium, Power BI Pro |
| Microsoft 365 F3 (Frontline) | ~$8/user/mo | 2 GB | Email + Teams for frontline/shift workers |

### Exchange Online Standalone Plans

If you only need email (no Teams, no Office apps), standalone Exchange Online plans are available:

| Plan | Price (est.) | Storage | Features |
|:---|---:|:---:|:---|
| Exchange Online Plan 1 | ~$4/user/mo | 50 GB | Email, calendar, contacts, 1 TB OneDrive |
| Exchange Online Plan 2 | ~$8/user/mo | Unlimited + archive | Plan 1 + unlimited archiving, Litigation Hold, DLP |
| Exchange Online Kiosk | ~$2/user/mo | 2 GB | Basic email for kiosk/shared device users |

### Add-On Licenses Relevant to Email

| Add-On | Price (est.) | Purpose |
|:---|---:|:---|
| Microsoft Defender for Office 365 Plan 1 | ~$2/user/mo | Anti-phishing, safe links, safe attachments |
| Microsoft Defender for Office 365 Plan 2 | ~$5/user/mo | Plan 1 + threat investigation, attack simulation |
| Microsoft 365 Backup | ~$0.15/GB/mo | Native backup for Exchange Online, OneDrive, SharePoint |
| Purview Information Protection P1 | Included in E3 | Sensitivity labels, encryption |
| Purview eDiscovery Premium | Included in E5 | Advanced legal hold and case management |

---

## License Comparison: Which Plan Is Right?

| Scenario | Recommended License |
|:---|:---|
| Small org (< 300 users), email only, tight budget | Microsoft 365 Business Basic or Exchange Online Plan 1 |
| Small org needing Office desktop apps | Microsoft 365 Business Standard |
| Small org needing advanced security | Microsoft 365 Business Premium |
| Enterprise, email + Teams + compliance | Microsoft 365 E3 |
| Enterprise with advanced security and eDiscovery | Microsoft 365 E5 |
| Frontline / shift workers (kiosk) | Microsoft 365 F3 |
| On-premises required, current version | Exchange Server SE |
| Hybrid (some on-prem, some cloud) | Exchange Online Plan 2 + Exchange SE hybrid license |

---

## Exchange Hybrid License

Organizations maintaining an on-premises Exchange server purely for hybrid management (not hosting mailboxes) qualify for the **Exchange Hybrid License** — a free license from Microsoft.

**Eligibility requirements:**
- Organization must have active Microsoft 365 / Exchange Online subscriptions
- The on-premises Exchange server must be used only for hybrid configuration purposes
- No production mailboxes hosted on the hybrid server

To obtain the Exchange Hybrid License, contact Microsoft or your licensing partner.

---

## CAL Suite Licensing

For organizations already licensing Microsoft 365 or Windows via CAL Suites:

| Suite | Exchange Entitlement |
|:---|:---|
| Microsoft 365 Business Premium CAL | Exchange Online Plan 1 included |
| Core CAL Suite | Exchange Standard CAL included |
| Enterprise CAL Suite | Exchange Enterprise CAL included |
| Microsoft 365 Enterprise Suite | Exchange Online Plan 2 included |

---

## Licensing FAQs

**Q: Do I need a CAL to access Exchange Online?**  
A: No. Exchange Online is licensed per user via Microsoft 365 or Exchange Online subscriptions — there are no CALs.

**Q: Can I use my existing Exchange perpetual licenses if I migrate to Exchange SE?**  
A: Organizations with active Software Assurance may have step-up rights. Those without active SA will need to purchase Exchange SE subscriptions. Confirm with a Microsoft licensing partner.

**Q: What happens to my Exchange 2019 licenses after I migrate to Exchange Online?**  
A: Perpetual licenses remain legally yours, but have no further use once Exchange servers are decommissioned. They cannot be transferred to another organization under standard Microsoft terms.

**Q: Is there a nonprofit or education discount for Microsoft 365?**  
A: Yes. Microsoft offers substantially discounted and free Microsoft 365 plans for eligible nonprofits and educational institutions through the Microsoft 365 Nonprofit and Microsoft 365 Education programs. Some plans are free for eligible organizations.

**Q: What is the minimum commitment for Microsoft 365?**  
A: Annual subscriptions offer the lowest per-user pricing. Month-to-month subscriptions are available at a 20% premium. Enterprise Agreements typically require a 3-year commitment with a 250-seat minimum.
