---
layout: default
title: Implementation
nav_order: 3
description: "Migration implementation guide covering Microsoft 365, Exchange Server SE, and Hybrid deployment options."
---

# Implementation Guide
{: .no_toc }

Detailed technical guidance for each Exchange Server migration path.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Migration Options Overview

| Criteria | Microsoft 365 | Exchange Server SE | Hybrid |
|:---|:---:|:---:|:---:|
| Infrastructure ownership | Cloud | On-premises | Both |
| Hardware required | No | Yes | Yes (limited) |
| Subscription cost | Per user/month | Per server + CAL | Both apply |
| Data sovereignty | Microsoft datacenters | Your datacenter | Split |
| Migration complexity | Medium | Medium | High |
| Long-term maintenance | Low | Medium | High |
| Best suited for | Cloud-ready orgs | Compliance-constrained orgs | Large/phased migrations |

{: .note }
Most organizations choose Microsoft 365 for long-term operational simplicity. Exchange Server SE is the right choice when data must remain on-premises by regulation or policy.

---

## Option 1 — Microsoft 365 (Exchange Online)
{: #option-1-microsoft-365-exchange-online }

Exchange Online is Microsoft's cloud-hosted email service, included in Microsoft 365 subscriptions. It eliminates Exchange Server infrastructure while providing enterprise-grade security, compliance, and availability.

### Migration Methods

#### Cutover Migration
Move all mailboxes at once. Ideal for organizations with fewer than **150 mailboxes** and a short migration window.

**Process:**
1. Create migration batch in Microsoft 365 Admin Center
2. Microsoft 365 synchronizes mailbox content from on-premises Exchange
3. Schedule final sync and DNS cutover during a maintenance window
4. Update MX records and retire on-premises Exchange

**Pros:** Simple, no coexistence required  
**Cons:** All users impacted simultaneously; limited rollback

---

#### Staged Migration
Migrate users in batches while maintaining coexistence. Works with Exchange 2003/2007 (IMAP-based) or later.

**Process:**
1. Configure directory synchronization with Entra ID Connect
2. Create CSV-based migration batches
3. Migrate in waves — complete one before starting the next
4. Update MX records after all users are migrated

**Pros:** Controlled pace, lower risk  
**Cons:** Requires directory sync; no shared free/busy during migration

---

#### Hybrid Migration (Recommended for 150+ Mailboxes)
Full hybrid coexistence using the Exchange Hybrid Configuration Wizard .

**Prerequisites:**
- Exchange Server 2016 CU23+ or Exchange Server 2019 CU13+
- Entra ID Connect (Azure AD Connect) deployed and syncing ([Entra ID hybrid identity](https://learn.microsoft.com/en-us/entra/identity/hybrid/whatis-hybrid-identity))
- Valid public SSL certificate covering hybrid namespaces
- Outbound HTTPS to Microsoft 365 endpoints
- MX record can remain on-premises during migration

**Process:**
1. Run the **Hybrid Configuration Wizard** (HCW) from Exchange Admin Center 
2. Configure Hybrid Agent (modern hybrid) or direct publishing 
3. Migrate mailboxes using `New-MigrationBatch` in Exchange Online PowerShell ([PowerShell cmdlet reference](https://learn.microsoft.com/powershell/module/exchange/new-migrationbatch))
4. Validate each batch before proceeding
5. After all users are migrated, update MX and decommission on-premises Exchange 

```powershell
# Example: Create a migration batch in Exchange Online PowerShell
New-MigrationBatch -Name "Wave1-Finance" `
    -SourceEndpoint $endpoint `
    -CSVData ([System.IO.File]::ReadAllBytes("C:\Migration\Wave1.csv")) `
    -TargetDeliveryDomain "contoso.mail.onmicrosoft.com" `
    -AutoStart `
    -AutoComplete
```

---

#### IMAP Migration
For non-Exchange mail systems or legacy Exchange (2003). Migrates only email — no calendar, contacts, or tasks.

{: .warning }
IMAP migration is not recommended for Exchange-to-Exchange migrations. Use cutover or hybrid instead.

---

### Microsoft 365 Implementation Checklist

1. **Tenant preparation**
   - Verify domains in Microsoft 365 admin center ([Domain verification](https://learn.microsoft.com/en-us/microsoft-365/admin/setup/add-domain))
   - Configure Entra ID Connect for identity sync ([Entra ID Connect](https://learn.microsoft.com/en-us/entra/identity/hybrid/whatis-hybrid-identity))
   - Assign Exchange Online licenses to users

2. **Hybrid configuration** (if using hybrid migration)
   - Download and run the Hybrid Configuration Wizard 
   - Configure inbound and outbound hybrid mail flow connectors 
   - Validate free/busy sharing between on-premises and cloud 

3. **Migration execution**
   - Migrate pilot group first (IT staff)
   - Monitor via Exchange Admin Center > Migration
   - Use `Get-MigrationBatch` and `Get-MigrationUser` for status

4. **Cutover**
   - Update MX records (TTL reduction 48h before)
   - Update SPF record to include `include:spf.protection.outlook.com`
   - Configure DKIM signing in Microsoft 365 Defender portal
   - Set DMARC policy to `p=quarantine` or `p=reject`

5. **Decommission**
   - Follow Microsoft's published Exchange Server decommission guide
   - Do not delete Exchange server objects from Active Directory directly

---

## Option 2 — Exchange Server Subscription Edition
{: #option-2-exchange-server-subscription-edition }

Exchange Server SE is Microsoft's current on-premises Exchange offering ([Exchange Server SE docs](https://learn.microsoft.com/en-us/exchange/new-features/new-features)). Released **June 11, 2025** (RTM is code-equivalent to Exchange Server 2019 CU15), it replaces the perpetual-license model with an annual subscription.

{: .highlight }
**Exchange SE RTM = Exchange Server 2019 CU15** — Organizations already running Exchange 2019 CU14 or CU15 can perform an **in-place upgrade** on the same server hardware.

### Key Characteristics

- **Subscription-based licensing** — Annual server + CAL subscriptions replace perpetual licenses
- **In-place upgrade from Exchange 2019 CU14/CU15** — Upgrade without reinstallation or hardware replacement
- **Windows Server Core support** — Can be installed on Windows Server Core (no GUI required)
- **TLS 1.2/1.3 enforced by default** — TLS 1.0/1.1 disabled out of the box
- **Modern Authentication on-premises** — Native support via ADFS 2019+ without additional connectors
- **DocParser replaces Oracle OIT** — Built-in document parsing without Oracle Outside In Technology dependency
- **Scale improvements** — Supports up to 256 GB RAM and 48 CPU cores per server
- **Feature Flighting** — Microsoft can remotely enable/disable features without CU deployment
- **Improved search infrastructure** — Upgraded Big Funnel search engine

### Upgrade Paths

| Source Version | Path to Exchange SE | In-Place? |
|:---|:---|:---:|
| Exchange Server 2019 CU14 or CU15 | Direct in-place upgrade to Exchange SE | ✅ Yes |
| Exchange Server 2019 (older CU) | Update to CU14/CU15 first, then in-place upgrade to SE | ✅ Yes (2 steps) |
| Exchange Server 2016 | Install Exchange SE on new server, move mailboxes | ❌ No |
| Exchange Server 2013 | Install Exchange SE on new server, move mailboxes | ❌ No |

{: .important }
Exchange 2016 **cannot** upgrade in-place to Exchange SE. You must: (1) deploy a new Exchange SE server into the existing org, (2) move mailboxes to the new server, then (3) decommission Exchange 2016. There is **no direct path** from Exchange 2016 to Exchange SE — an intermediate Exchange 2019 step is optional but not required if deploying Exchange SE fresh.

### Exchange SE System Requirements

| Component | Requirement |
|:---|:---|
| Operating System | Windows Server 2022 (recommended) or Windows Server 2019 |
| Windows Server Core | Supported (Exchange SE first version to support this) |
| RAM | 128 GB minimum recommended; up to 256 GB supported |
| CPU | Up to 48 cores supported |
| .NET Framework | .NET Framework 4.8 |
| Active Directory | AD forest functional level 2016 or higher |

### Exchange SE Implementation Steps

**For Exchange 2019 CU14/CU15 → Exchange SE (In-Place Upgrade):**

1. Verify server meets hardware requirements (Windows Server 2019/2022, .NET 4.8)
2. Confirm Exchange 2019 is on CU14 or CU15 (`Get-ExchangeDiagnosticInfo` or check EAC)
3. Run Exchange SE setup in the organization (Setup.exe)
4. At the Ready to Install screen, confirm `/Mode:Upgrade` is listed
5. Validate all services and connectors post-upgrade
6. Update SSL certificates if expiring

```powershell
# Verify current Exchange version before upgrading
Get-Command exsetup.exe | ForEach {$_.FileVersionInfo}

# After upgrade — confirm Exchange SE version
Get-ExchangeDiagnosticInfo -Server $env:COMPUTERNAME -Process EdgeTransport -Component VariantConfiguration -Settings Identity
```

**For Exchange 2016 → Exchange SE (New Server):**

1. Prepare new server with Windows Server 2022 (optionally Windows Server Core)
2. Install Exchange SE prerequisites (.NET 4.8, Visual C++ 2012/2013 redistributable, UCMA 4.0)
3. Run Exchange SE setup to join the existing Exchange organization
4. Configure client access namespaces to match existing URLs
5. Move mailbox databases to new Exchange SE server
6. Move mailboxes with `New-MoveRequest`

```powershell
# Move all mailboxes from Exchange 2016 to new Exchange SE server
Get-Mailbox -Server OldEX2016 | New-MoveRequest -TargetDatabase "SE-DB01"

# Monitor move requests
Get-MoveRequest | Get-MoveRequestStatistics | 
    Select DisplayName, Status, PercentComplete
```

7. Update load balancer or DNS to point to Exchange SE
8. Decommission Exchange 2016 servers (follow Microsoft's decommission guide — do not remove AD objects manually)

---

## Option 3 — Hybrid Deployment
{: #option-3-hybrid-deployment }

A long-term hybrid deployment maintains Exchange servers on-premises while hosting a subset of users in Exchange Online . This is not the same as a hybrid migration (which is temporary coexistence while migrating). Long-term hybrid suits organizations with:

- Regulatory requirements keeping specific mailboxes on-premises
- Subsidiaries or departments with different compliance profiles
- Applications that require on-premises Exchange for EWS or MAPI access

### Hybrid Architecture

```
On-Premises Active Directory ←→ Entra ID Connect ←→ Microsoft Entra ID
         ↕                                                    ↕
  Exchange Server SE  ←── Hybrid Connector ───→  Exchange Online
  (On-premises users)                           (Cloud users)
```

### Long-Term Hybrid Requirements

- At minimum one Exchange server on-premises (for hybrid management)
- Exchange Hybrid License  (free from Microsoft for a single Exchange SE server used only for hybrid management)
- Entra ID Connect running and healthy
- Valid SSL certificate for hybrid namespaces
- Ongoing maintenance of on-premises Exchange server

{: .warning }
Long-term hybrid is operationally complex. Unless you have a genuine requirement to keep mailboxes on-premises, a full migration to Microsoft 365 or Exchange SE is simpler to manage.

---

## Recommended Migration Timeline

| Week | Activity |
|:---:|:---|
| 1–2 | Assessment and environment inventory |
| 3–4 | Migration path selection and licensing procurement |
| 5–6 | Infrastructure preparation and hybrid configuration |
| 7–8 | Pilot migration (IT staff) and validation |
| 9–14 | Production waves (phased by department) |
| 15 | MX cutover and final validation |
| 16–18 | Decommission legacy servers and project close |

{: .note }
Timeline varies significantly by organization size, complexity, and chosen migration method. Large organizations with thousands of mailboxes should plan for 6–12 months.
