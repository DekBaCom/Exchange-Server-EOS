---
layout: default
title: Architecture & Solutions
nav_order: 8
description: "Visual architecture and solution designs for Exchange Server migration use cases using Mermaid diagrams."
---

# Architecture & Solution Design
{: .no_toc }

Visual representations of the primary migration paths and solution architectures for Exchange Server End of Support.
{: .fs-6 .fw-300 }

<details open markdown="block">
  <summary>Table of contents</summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

---

## Use Case 1: Microsoft 365 / Exchange Online (Cloud First)

The **Cloud First** strategy is recommended for organizations seeking the lowest TCO and a modern, always-up-to-date mail infrastructure. ([Exchange Online documentation](https://learn.microsoft.com/en-us/exchange/exchange-online))

```mermaid
graph TD
    subgraph "On-Premises Infrastructure"
        AD[Active Directory]
        Apps[LOB Apps / Printers]
    end

    subgraph "Microsoft Cloud"
        Entra[Microsoft Entra ID]
        EXO[Exchange Online]
        EOP[Exchange Online Protection]
    end

    AD -- "Entra ID Connect" --> Entra
    Apps -- "SMTP Relay" --> EXO
    Internet((Internet)) -- "MX / SMTP" --> EOP
    EOP --> EXO
    Users[Users / Outlook] -- "Modern Auth / O365" --> EXO
```

### Key Components:
- **Microsoft Entra ID:** Provides identity synchronization and Single Sign-On (SSO) ([Entra ID hybrid identity](https://learn.microsoft.com/en-us/entra/identity/hybrid/whatis-hybrid-identity)).
- **Exchange Online Protection (EOP):** Handles anti-spam and anti-malware filtering ([EOP documentation](https://learn.microsoft.com/en-us/exchange/security/exchange-online-protection-overview)) as the primary entry point.
- **SMTP Relay:** Local devices and applications are updated to relay directly to the cloud ([SMTP authentication](https://learn.microsoft.com/en-us/exchange/clients-and-mobile/smtp-auth)) or via a simplified on-premises relay.

---

## Use Case 2: Hybrid Coexistence (Transitional/Long-Term)

The **Hybrid** architecture is ideal for large organizations that need a phased migration or have specific compliance requirements that keep some mailboxes on-premises. 

```mermaid
graph LR
    subgraph OnPrem["On-Premises"]
        EX19[Exchange Server 2019 / SE]
        LocalMB[(Local Mailboxes)]
    end
    subgraph M365["Microsoft 365"]
        EXO[Exchange Online]
        CloudMB[(Cloud Mailboxes)]
    end
    Internet((Internet)) -->|MX / SMTP| EX19
    Users[Users] --> EX19
    Users --> EXO
    EX19 -->|Hybrid Connector TLS| EXO
    EXO -->|Hybrid Connector TLS| EX19
    EX19 -.->|Cross-Premises Free/Busy| EXO
    EX19 --- LocalMB
    EXO --- CloudMB
```

### Key Components:
- **Hybrid Configuration Wizard (HCW):** Establishes the trust and secure mail flow between environments .
- **Shared Namespace:** Users share the same `@company.com` domain regardless of where their mailbox is located .
- **Cross-Premises Free/Busy:** Allows users to see each other's calendar availability  during the transition.

---

## Use Case 3: On-Premises Modernization (Exchange Server SE)

The **On-Premises** strategy is for organizations that must maintain data sovereignty due to strict regulatory or data residency requirements. ([Exchange Server SE](https://learn.microsoft.com/en-us/exchange))

```mermaid
graph TD
    subgraph Primary["Primary Datacenter"]
        LB1[Load Balancer]
        EXSE1[Exchange SE Server 1]
        EXSE2[Exchange SE Server 2]
        DAG[(Database Availability Group)]
    end
    subgraph Secondary["Secondary Datacenter - DR"]
        EXSE3[Exchange SE Server 3]
    end
    Internet((Internet)) --> LB1
    LB1 --> EXSE1
    LB1 --> EXSE2
    EXSE1 <--> DAG
    EXSE2 <--> DAG
    DAG -.->|Continuous Replication| EXSE3
```

### Key Components:
- **Database Availability Group (DAG):** Provides high availability and continuous replication ([DAG architecture](https://learn.microsoft.com/en-us/exchange/architecture/database-availability-groups)) of mailbox databases.
- **Exchange Server SE:** The subscription-based successor to Exchange 2019 , ensuring a supported on-premises environment.
- **Load Balancer:** Distributes client traffic across multiple servers to ensure service availability ([High availability](https://learn.microsoft.com/en-us/exchange/architecture/high-availability)).
