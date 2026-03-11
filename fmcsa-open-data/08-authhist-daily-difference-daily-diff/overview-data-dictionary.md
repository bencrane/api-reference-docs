# FMCSA Dataset Description and Data Definitions

## Overview

This document describes **16 datasets** published by the **Federal Motor Carrier Safety Administration (FMCSA)** on the U.S. Department of Transportation's Open Data Catalog at [data.transportation.gov](https://data.transportation.gov). These datasets cover carriers, brokers, and freight forwarders regulated by FMCSA — including their authority status, insurance policies, BOC3 agents, insurance history, rejected filings, and revocations.

All datasets are targeted to be **updated daily by 9:30 AM US Eastern Time**.

---

## Naming Conventions

Each dataset comes in two variants:

- **`[Name]`** — The "Daily Difference" version. Contains only records that have been updated or added since the previous day's run. In some cases it also includes related records for completeness. In the Insur dataset specifically, policy removals appear as blank records (all fields empty or zeroed except the docket number).

- **`[Name] – All With History`** — The "Full/Baseline" version. Contains all records including historical values as of the latest update. This is the complete snapshot.

---

## Dataset #1: Carrier

**Variants:** `Carrier`, `Carrier– All With History`

This is the master entity dataset. It contains one record per carrier, broker, or freight forwarder that has active, inactive, or pending authority (common or contract). It's the richest single dataset, spanning 43 fields across identity, authority status, insurance requirements, insurance on file, and both business and mailing addresses.

### Key fields and what they tell you

**Identity:** Each entity is identified by a **Docket Number** (MC/FF/MX prefix + 6 digits) and a **USDOT Number**. Mexican carriers get an additional **MX Type** code (X = operate throughout US, Z = commercial zones only) and an **RFC Number** (Mexican government registration).

**Authority status (fields 5–13):** Three authority types — Common, Contract, and Broker — each tracked with three flags: active/inactive/none status, pending application (Y/N), and revocation status (Y/N). This gives you a complete picture of where an entity stands in terms of operating authority.

**Cargo type flags (fields 14–18):** Boolean flags for Property, Passenger, Household Goods, Private, and Enterprise — indicating what the entity is authorized or registered to carry.

**Insurance requirements vs. on file (fields 19–24):** The dataset shows both what's *required* and what's *actually on file* for BI&PD insurance (dollar amounts in thousands), Cargo insurance (Y/N), and Bond/Surety (Y/N). This is the quickest way to spot compliance gaps — if `BIPD Required` > `BIPD on File`, or if a required flag is Y but the on-file flag is N, there's a potential issue.

**Address and contact (fields 25–43):** Both business and mailing addresses are included, each with street, colonia (for Mexican addresses), city, state, country, zip, phone, and fax. Field 25 (`Address Status`) flags whether the business address is deliverable (Y) or undeliverable (N).

**Company names (fields 26–27):** Both DBA name (up to 60 chars) and Legal Name (up to 120 chars).

---

## Dataset #2: Insur

**Variants:** `Insur`, `Insur– All With History`

Individual active or pending insurance policies, linked to entities by docket number. An entity can have multiple policies, so there are typically multiple rows per docket number.

### Key fields

- **Insurance Type** — 1 (BI&PD), 2 (Cargo), 3 (Bond), 4 (Trust Fund)
- **BI&PD Class** — Primary (P), Excess (E), or full security limits under Section 1043.2(b)(1) or (b)(2)
- **BI&PD Maximum Dollar Limit** and **Underlying Dollar Limit** — Both in thousands. Only populated for Insurance Type 1 (BI&PD); for types 2–4 these show 0.
- **Policy Number**, **Effective Date**, **Insurance Company Name**
- **Form Code** — Maps to the type of filing (34=Cargo, 82=BI&PD, 83=Cargo, 84=Broker Surety Bond, 85=Broker Trust Fund, 91/91X=BI&PD variants)

### Important note on daily difference behavior

In the daily difference variant, when a policy is *removed*, the record appears with all fields blank or zeroed except the docket number. This is how you detect cancellations/removals in the delta feed.

---

## Dataset #3: ActPendInsur

**Variants:** `ActPendInsur`, `ActPendInsur– All With History`

Focuses on the **lifecycle dates** of active/pending insurance policies: when FMCSA received it (Posted Date), when it took effect (Effective Date), and when it's scheduled to cancel (Cancel Effective Date). Also includes BI&PD limits and the insurance company name.

This dataset adds the **USDOT Number** alongside the Docket Number (unlike Insur which only has docket). It also includes both identifiers, making it useful for cross-referencing.

### Amount fields note

BI&PD amounts (fields 8–9) are only populated for form codes 91, 91X, and 82. For cargo/bond/trust (34, 83, 84, 85), amounts will be 0.

---

## Dataset #4: AuthHist

**Variants:** `AuthHist`, `AuthHist– All With History`

The **authority history** for each entity — what authorities were granted and what happened to them over time. Each row represents one authority action with an original action (e.g., "granted") and a final action (e.g., "revoked"), along with the dates for each.

An entity can have multiple authority grants/revocations over its lifetime, so expect multiple rows per docket number. The **Sub Number** field is an action sequence number but is rarely used.

---

## Dataset #5: BOC3

**Variants:** `BOC3`, `BOC3– All With History`

Every entity that holds or seeks operating authority must designate a **BOC3 process agent** — a legal representative for service of process. This dataset lists each entity's BOC3 agent with their company name, contact, and full address.

Some entities serve as their own BOC3 agent. The field numbering skips #3 in the source document (jumps from 2 to 4), which appears to be an artifact of the original dataset structure.

---

## Dataset #6: InsHist

**Variants:** `InsHist`, `InsHist– All With History`

**Historical insurance records** — policies that have been cancelled, replaced, transferred, or had a name change. This is the companion to the Insur dataset; while Insur shows current active/pending policies, InsHist shows what came before.

### Critical distinction

All data in this dataset refers to the policy being cancelled/replaced/changed — **not** the subsequent replacement policy (if any). If you need to track the full lifecycle of an entity's insurance, you need to join InsHist with Insur/ActPendInsur.

### Cancellation methods and form codes

- **Cancellation Method (field 4):** cancelled, replaced, name change, or transferred
- **Cancel/Replace/Name Change/Transfer Form (field 5):** The specific form that executed the action. For cancellations: 35 (BMC Cancellation), 36 (BMC Surety Bond Cancellation), 85C (Trust Fund Cancellation). For replacements: uses the same form codes as field 3. For name changes: "NC". For transfers: "TR".
- **Specific Cancellation Method (field 15):** More granular — TERM/CANCL means FMCSA executed the cancellation; Term/REPL means a new policy submission triggered the replacement.

### Insurance amounts

Fields 12–13 (BI&PD Underlying Limit and Max Coverage) are only populated for form codes 91, 91X, and 82. For cargo, bond, and trust fund form codes (34, 83, 84, 85), these will be 0.

The field numbering skips #16 in the source document (jumps from 15 to 17).

---

## Dataset #7: Rejected

**Variants:** `Rejected`, `Rejected– All With History`

Insurance forms that FMCSA **rejected** — meaning the filing was submitted but not accepted. Includes the reason for rejection (up to 300 characters, e.g., "Policy is already cancelled"), the date of rejection, and full details of the associated policy.

This dataset includes both insurance form codes and cancellation form codes in field 3, since both insurance filings and cancellation filings can be rejected.

The field numbering skips #12 in the source document (jumps from 11 to 13).

---

## Dataset #8: Revocation

**Variants:** `Revocation`, `Revocation– All With History`

Records of operating authorities that FMCSA has **revoked**. Simpler than most other datasets — just 6 fields covering the entity identifiers, the type of authority revoked (common, contract, or broker), the serve date (when the first revocation letter was sent), the revocation type, and the effective date.

---

## Shared Reference Codes

Several code systems are reused across multiple datasets:

### Form Codes (insurance filing types)
| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91 | BI&PD / BI&PD Primary |
| 91X | BI&PD Excess |

### Cancellation Form Codes
| Code | Meaning |
|------|---------|
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 85C | BMC Cancellation for Trust Funds |

### Docket Number Prefixes
| Prefix | Entity Type |
|--------|-------------|
| MC | Motor Carrier |
| FF | Freight Forwarder |
| MX | Mexican Carrier |

---

## How the Datasets Relate to Each Other

The **Docket Number** is the primary key that links across all datasets. The **USDOT Number** is present in most (but not all) datasets — notably absent from the Insur dataset, which only has Docket Number.

A typical entity's data spans multiple datasets:

1. **Carrier** — master record with authority status, insurance compliance summary, and address
2. **Insur** / **ActPendInsur** — current active/pending insurance policy details
3. **InsHist** — historical insurance policies (cancelled, replaced, etc.)
4. **AuthHist** — full authority grant/revocation timeline
5. **BOC3** — legal process agent information
6. **Rejected** — any insurance filings that were rejected
7. **Revocation** — any authority revocation actions

---

## Disclaimer

These datasets are provided by FMCSA as a public service for informational purposes only. They represent point-in-time snapshots and are constantly changing. The data does not constitute legal advice or a legal contract.