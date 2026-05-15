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

## Software Assurance (SA) — With vs. Without

Whether your organization has active Software Assurance on Exchange 2016/2019 licenses significantly affects your migration options, costs, and timeline.

### How to Check Your SA Status

{: .note }
Log in to the [Microsoft 365 Admin Center](https://admin.microsoft.com) or check with your Microsoft licensing partner / Volume Licensing Service Center (VLSC) to confirm your SA expiry date.

| Check | Where to Look |
|:---|:---|
| SA expiry date | [Microsoft VLSC](https://www.microsoft.com/licensing/servicecenter) → Licenses → Software Assurance |
| Agreement type | Purchase order or Microsoft licensing agreement document |
| Entitlements summary | Contact your Microsoft Account Manager or reseller |

---

### Customers WITH Active Software Assurance

If your Exchange 2016 or 2019 licenses have **active SA at the time Exchange SE releases**, you receive significant benefits:

{: .highlight }
**Key benefit:** Active SA gives you upgrade rights to Exchange Server SE at no additional server license cost.

| What You Get | Details |
|:---|:---|
| Upgrade rights to Exchange SE | Migrate to Exchange SE server without buying new server licenses |
| Step-up rights | Eligible to step up from Standard to Enterprise edition at reduced cost |
| License Mobility | Flexibly reassign licenses across servers within your infrastructure |
| Cold DR rights | Run a passive failover server without extra server license cost |
| Planning & deployment support | Access to Microsoft FastTrack and deployment planning services |

**Migration paths available WITH SA:**

| Path | SA Benefit | Additional Cost |
|:---|:---|:---|
| Upgrade to Exchange Server SE | Server license **free** (upgrade right) | CAL subscriptions + hardware if needed |
| Migrate to Exchange Online / M365 | SA licenses counted toward License Mobility | M365 / EXO subscription per user |
| Hybrid deployment | Exchange Hybrid License available | Only subscription costs |

{: .note }
Even with SA, you still need to purchase **Exchange SE CAL subscriptions** (per user, annual). SA covers the server license upgrade, not user access licenses.

---

### Customers WITHOUT Active Software Assurance

If your SA has lapsed or was never purchased, your options are narrower and typically more expensive.

{: .warning }
Without active SA, you **cannot upgrade** Exchange 2016/2019 server licenses to Exchange SE for free. You must purchase new Exchange SE server subscriptions.

| What You Lose | Impact |
|:---|:---|
| Upgrade rights to Exchange SE | Must buy new Exchange SE server subscription (~$12,000/server/year) |
| Step-up rights | Cannot reduce-cost upgrade between editions |
| Cold DR rights | Passive failover server requires its own license |
| Version coverage | Stuck on Exchange 2016/2019 until a new purchase is made |

**Migration paths available WITHOUT SA:**

| Path | License Requirement | Estimated Cost (500 users) |
|:---|:---|:---|
| Stay on Exchange 2019 (not recommended) | No new licenses needed | Security risk — unsupported after Oct 2025 |
| Purchase Exchange SE fresh | New server subscription + new CAL subscriptions | ~$84,000/year (2 servers + 500 CALs) |
| Migrate to Exchange Online Plan 2 | No Exchange server license needed | ~$48,000–$60,000/year |
| Migrate to Microsoft 365 E3 | No Exchange server license needed | ~$216,000/year (full suite) |

{: .important }
For most organizations **without SA**, migrating to Exchange Online or Microsoft 365 is more cost-effective than purchasing Exchange SE from scratch. The cloud path eliminates server license costs entirely.

---

### SA vs. No-SA Decision Matrix

| Scenario | With Active SA | Without SA |
|:---|:---:|:---:|
| Upgrade to Exchange SE (server license) | Free (upgrade right) | ~$12,000/server/year |
| Exchange SE CAL | Annual subscription required | Annual subscription required |
| Migrate to Exchange Online | Same cost | Same cost |
| Migrate to Microsoft 365 | Same cost | Same cost |
| Recommended path | Exchange SE **or** M365, depending on preference | **Exchange Online / M365** typically more economical |

### Recommended Actions by SA Status

**If you have active SA:**
1. Confirm SA expiry date — ensure it covers the Exchange SE release (2025)
2. Contact your licensing partner to confirm upgrade entitlements
3. Plan upgrade to Exchange SE **or** use SA License Mobility to move to M365
4. If staying on-premises, budget for Exchange SE CAL subscriptions and hardware

**If you do NOT have active SA:**
1. Do not extend investment in on-premises Exchange 2016/2019
2. Get quotes for Exchange Online Plan 2 or Microsoft 365 E3
3. Evaluate total 3–5 year cost: cloud subscription vs. new Exchange SE purchase
4. Begin migration planning immediately — Exchange 2019 reaches end of support **October 14, 2025**

---

## Exchange Server SE Licensing

Exchange Server Subscription Edition (SE) was released **June 11, 2025**, replacing the perpetual licensing model with an **annual subscription**. Exchange SE RTM is code-equivalent to Exchange Server 2019 CU15.

{: .highlight }
**Key licensing advantage of Exchange SE over Exchange 2019:** Subscription inherently includes upgrade rights — no separate Software Assurance purchase required to stay current.

### How Exchange SE Licensing Works

| Component | Description |
|:---|:---|
| Server subscription | Annual fee per Exchange SE server instance (~$12,000/server/year est.) |
| User/Device CAL subscription | Annual fee per user or device accessing Exchange SE (~$40/user/year est.) |
| SA not required | Subscription inherently includes upgrade rights to future versions |
| Downgrade rights | Subscription licenses include rights to run previous versions |
| Windows Server Core | Exchange SE supports deployment on Windows Server Core (no GUI) |

### Exchange SE vs. Legacy CAL Comparison

| Aspect | Exchange 2019 (Perpetual) | Exchange SE (Subscription) |
|:---|:---|:---|
| Payment model | One-time purchase + SA | Annual recurring |
| Upgrade rights | Requires active SA | Included |
| Version lock | Fixed to purchased version | Always current version |
| Cold DR server | Requires additional license | Included per Microsoft terms |
| Budget predictability | Variable (hardware refresh cycles) | Predictable annual cost |
| TLS enforcement | Configurable | TLS 1.2/1.3 enforced by default |
| Modern Auth on-premises | Optional configuration | Native via ADFS 2019+ |

{: .note }
Organizations with active Software Assurance on Exchange 2019 may be eligible for step-up or migration credits to Exchange SE. Confirm entitlements with your Microsoft licensing partner.

### Exchange SE In-Place Upgrade Eligibility

| Current State | Upgrade Path |
|:---|:---|
| Exchange 2019 CU14 or CU15 | In-place upgrade to Exchange SE on same hardware |
| Exchange 2019 CU13 or older | Update to CU14/CU15 first, then in-place upgrade |
| Exchange 2016 | Deploy Exchange SE on new server; move mailboxes (no in-place path) |

{: .important }
There is **no direct in-place upgrade from Exchange 2016 to Exchange SE**. Exchange 2016 customers must deploy a new Exchange SE server and migrate mailboxes.

---

## Microsoft 365 Licensing

Microsoft 365 bundles Exchange Online with the broader Microsoft productivity platform ([Microsoft 365 plans](https://microsoft.com/microsoft-365/business/microsoft-365-business-basic)). Choose the plan based on organizational size and feature requirements.

### Business Plans (Up to 300 Users)

Prices verified from [Microsoft 365 Business plans](https://www.microsoft.com/en-us/microsoft-365/business/compare-all-plans) (annual subscription, paid yearly).

| Plan | Confirmed Price | Exchange Storage | Key Inclusions |
|:---|---:|:---:|:---|
| [Microsoft 365 Business Basic](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-basic) | $6.00/user/mo | 50 GB | Exchange Online, Teams, SharePoint, OneDrive (1 TB), web Office apps |
| [Microsoft 365 Business Standard](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-standard) | $12.50/user/mo | 50 GB | Business Basic + desktop Office apps |
| Microsoft 365 Business Premium | ~$22/user/mo | 50 GB + archive | Standard + Intune, Entra ID P1, Defender for Business |

### Enterprise Plans (Unlimited Users)

{: .note }
Microsoft offers two enterprise plan families: **Office 365** (productivity apps + email only) and **Microsoft 365** (Office 365 + Intune + Windows + advanced security). For email-only migrations, Office 365 plans may suffice. For full enterprise governance, Microsoft 365 E3/E5 is recommended.

**Office 365 Enterprise (productivity + email focus):**

| Plan | Confirmed Price | Exchange Storage | Key Inclusions |
|:---|---:|:---:|:---|
| [Office 365 E1](https://www.microsoft.com/en-us/microsoft-365/enterprise/compare-office-365-plans) | $10.00/user/mo | 50 GB | Exchange Online Plan 1, Teams, SharePoint, web Office apps |
| Office 365 E3 | $23.00/user/mo | Unlimited + archive | E1 + desktop Office apps, advanced compliance |
| Office 365 E5 | $38.00/user/mo | Unlimited + archive | E3 + Defender for O365 P2, Power BI Pro, advanced compliance |

**Microsoft 365 Enterprise (full platform with device & security management):**

| Plan | Price (est.) | Exchange Storage | Key Inclusions |
|:---|---:|:---:|:---|
| Microsoft 365 E3 | ~$36/user/mo | Unlimited + archive | Office 365 E3 + Intune, Entra ID P1, Windows 11 Enterprise |
| Microsoft 365 E5 | ~$57/user/mo | Unlimited + archive | M365 E3 + Defender for O365 P2, [Purview eDiscovery Premium](https://learn.microsoft.com/en-us/microsoft-365/compliance/overview-ediscovery-20), Power BI Pro |
| [Microsoft 365 F3 (Frontline)](https://www.microsoft.com/en-us/microsoft-365/enterprise/f3) | $8.00/user/mo | 2 GB | Email + Teams for frontline/shift workers |

### Exchange Online Standalone Plans

If you only need email (no Teams, no Office apps), standalone Exchange Online plans are available. Prices confirmed from [Exchange Online plans comparison](https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans).

| Plan | Confirmed Price | Storage | Features |
|:---|---:|:---:|:---|
| [Exchange Online Plan 1](https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans) | $4.00/user/mo | 50 GB | Email, calendar, contacts, 1 TB OneDrive |
| [Exchange Online Plan 2](https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans) | $8.00/user/mo | Unlimited + archive | Plan 1 + unlimited archiving, Litigation Hold, DLP |
| Exchange Online Kiosk | ~$2/user/mo | 2 GB | Basic email for kiosk/shared device users |

### Add-On Licenses Relevant to Email

| Add-On | Price (est.) | Purpose |
|:---|---:|:---|
| Microsoft Defender for Office 365 Plan 1 | ~$2/user/mo | Anti-phishing, safe links, safe attachments |
| Microsoft Defender for Office 365 Plan 2 | ~$5/user/mo | Plan 1 + threat investigation, attack simulation |
| Microsoft 365 Backup | ~$0.15/GB/mo | Native backup for Exchange Online, OneDrive, SharePoint |
| Purview Information Protection P1 | Included in E3 | Sensitivity labels, encryption |
| [Purview eDiscovery Premium](https://learn.microsoft.com/en-us/microsoft-365/compliance/overview-ediscovery-20) | Included in E5 | Advanced legal hold and case management |

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
| [Core CAL Suite](https://microsoft.com/licensing/licensing-programs/core-cal-suite) | Exchange Standard CAL included |
| [Enterprise CAL Suite](https://microsoft.com/licensing/licensing-programs/enterprise-cal-suite) | Exchange Enterprise CAL included |
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
A: Yes. Microsoft offers substantially discounted and free Microsoft 365 plans for eligible nonprofits and educational institutions through the [Microsoft 365 Nonprofit Program](https://microsoft.com/nonprofits/microsoft-365) and [Microsoft 365 Education Program](https://microsoft.com/education/products/microsoft-365). Some plans are free for eligible organizations.

**Q: What is the minimum commitment for Microsoft 365?**  
A: Annual subscriptions offer the lowest per-user pricing. Month-to-month subscriptions are available at a 20% premium. Enterprise Agreements typically require a 3-year commitment with a 250-seat minimum.

---

## Document References

The following Microsoft documentation was used as the primary source for this page. All pricing is as of the published date on each linked page — confirm current pricing directly with Microsoft or a licensed partner.

| Topic | Microsoft Source |
|:---|:---|
| Exchange Online plan comparison & pricing | [Compare Exchange Online plans](https://www.microsoft.com/en-us/microsoft-365/exchange/compare-microsoft-exchange-online-plans) |
| Microsoft 365 Business Basic | [M365 Business Basic](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-basic) |
| Microsoft 365 Business Standard | [M365 Business Standard](https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-standard) |
| Office 365 Enterprise plan comparison | [Compare Office 365 Enterprise](https://www.microsoft.com/en-us/microsoft-365/enterprise/compare-office-365-plans) |
| Microsoft 365 Frontline F3 | [M365 F3 Frontline](https://www.microsoft.com/en-us/microsoft-365/enterprise/f3) |
| Exchange Server SE new features | [What's new in Exchange SE](https://learn.microsoft.com/en-us/exchange/new-features/new-features) |
| Exchange SE licensing & subscription model | [Exchange Server SE](https://learn.microsoft.com/en-us/exchange) |
| Exchange SE in-place upgrade blog | [Upgrading to Exchange Server SE](https://techcommunity.microsoft.com/blog/exchange/upgrading-your-organization-from-current-versions-to-exchange-server-se/4241305) |
| Volume Licensing Service Center (SA check) | [Microsoft VLSC](https://www.microsoft.com/licensing/servicecenter) |
| Microsoft 365 Nonprofit Program | [M365 for Nonprofits](https://www.microsoft.com/en-us/nonprofits/microsoft-365) |
