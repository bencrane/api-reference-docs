# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)  
**Data Catalog:** [https://data.transportation.gov](https://data.transportation.gov)  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines the schema, scope, and naming conventions for **16 FMCSA datasets** published on the DOT Open Data Catalog. These datasets cover carriers, brokers, and freight forwarders — including their operating authorities, insurance policies, BOC3 agents, insurance history, rejected insurance forms, and authority revocations.

---

## Naming Conventions

Each dataset exists in two variants:

- **`[Dataset Name]`** — The "Daily Difference" dataset. Contains only records that have been updated or added since the prior run. In some cases, it also includes all other records for the same entity for completeness.
- **`[Dataset Name] – All With History`** — The "Full" or "Baseline" dataset. Contains every record (including historical values) as of the latest update.

---

## Dataset #1: Carrier

**Variants:** `Carrier`, `Carrier– All With History`

Contains records for all carriers, brokers, and freight forwarders with active, inactive, or pending authorities (common or contract). The dataset is the broadest of the group — it includes entity census data, authority statuses, insurance requirement and filing summaries, and both business and mailing addresses.

### Key Fields (43 total)

**Identity & Registration (1–4):** Docket Number (MC/FF/MX format), USDOT Number, MX Type (distinguishes Mexican carriers by operating scope), and RFC Number (Mexican government registration).

**Authority Status (5–13):** Three authority types — Common, Contract, and Broker — each with an active/inactive/none status, a pending application flag (Y/N), and a revocation flag (Y/N). This gives you a complete picture of what the entity is authorized to do and whether any of that authorization is under threat.

**Operating Characteristics (14–18):** Boolean flags for Property, Passenger, Household Goods, Private Check, and Enterprise Check.

**Insurance Summary (19–24):** Required vs. on-file amounts for BI&PD (bodily injury & property damage), Cargo, and Bond/Surety. BI&PD amounts are in thousands. Cargo and Bond/Surety are simple Y/N flags.

**Address & Contact (25–43):** Address deliverability status, DBA Name, Legal Name, then two full address blocks (Business and Mailing) each with street, colonia, city, state, country, zip, phone, and fax.

---

## Dataset #2: Insur

**Variants:** `Insur`, `Insur– All With History`

Contains individual active or pending insurance policies. Entities can hold multiple policies, so expect multiple records per docket number. The daily difference variant shows policy *removals* as blank records (all fields empty or zeroed except the docket number).

### Key Fields (9 total)

**Docket Number (1):** Links the policy to the entity.

**Insurance Type (2):** Four types — `1` = BI&PD, `2` = Cargo, `3` = Bond, `4` = Trust Fund. Only type 1 populates the dollar amount fields; types 2–4 will show 0.

**BI&PD Class (3):** Indicates Primary, Excess, or Full Security Limits under Section 1043.2(b)(1) or (b)(2).

**Dollar Limits (4–5):** Maximum and underlying limits for BI&PD, both in thousands.

**Policy Details (6–9):** Policy Number, Effective Date, Form Code (maps to specific insurance/bond types), and Insurance Company Name.

### Form Code Reference (used across multiple datasets)

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91, 91X | BI&PD, BI&PD/Primary, BI&PD/Excess |

---

## Dataset #3: ActPendInsur

**Variants:** `ActPendInsur`, `ActPendInsur– All With History`

Focuses on the *implementation timeline* of active or pending insurance policies. Adds the Posted Date (when FMCSA received it), Effective Date, and Cancel Effective Date — which are not available in the Insur dataset.

### Key Fields (11 total)

Includes Docket Number, USDOT Number, Form Code, Insurance Type Description, Insurance Company Name, Policy Number, Posted Date, BI&PD Underlying Limit, BI&PD Maximum Limit, Effective Date, and Cancel Effective Date.

The same BI&PD-only rule applies: dollar amounts are only meaningful for form codes 91, 91X, and 82.

---

## Dataset #4: AuthHist

**Variants:** `AuthHist`, `AuthHist– All With History`

Tracks the full lifecycle of each operating authority granted to an entity. Each record captures the original action (e.g. "granted") and the final action (e.g. "revoked"), along with three key dates: the original action served date, the final decision date, and the final served date.

### Key Fields (9 total)

Includes Docket Number, USDOT Number, Sub Number (action sequence, rarely used), Operating Authority Type, Original Authority Action Description, Original Authority Action Served Date, Final Authority Action Description, Final Authority Decision Date, and Final Authority Served Date.

A single entity can have multiple authority records — one per authority type or action sequence.

---

## Dataset #5: BOC3

**Variants:** `BOC3`, `BOC3– All With History`

Every entity needs a BOC3 process agent to represent them in legal matters before they can obtain operating authority. Some entities serve as their own agent. This dataset contains the agent's name and full address.

### Key Fields (9 total — note: position 3 is skipped in the source)

Includes Docket Number, USDOT Number, Company Name, Attention to or Title, Street or PO Box, City, State, Country, and Zip Code.

---

## Dataset #6: InsHist

**Variants:** `InsHist`, `InsHist– All With History`

Historical insurance records — specifically, policies that have been cancelled, replaced, undergone a name change, or been transferred. **Important:** all data in this dataset refers to the *prior/outgoing* policy, not the replacement.

### Key Fields (17 total — positions 16 is skipped)

**Identity (1–2):** Docket Number, USDOT Number.

**Policy Type (3):** Form Code — same code table as other datasets.

**Cancellation Info (4–5):** Cancellation Method (cancelled, replaced, name change, transferred) and the specific form used to execute that action. Cancellation forms include BMC form 35, 36, and 85C. Replacements use the same form codes from field 3. Name changes use "NC", transfers use "TR".

**Insurance Details (6–10):** Insurance Type Indicator (space = BIPD, asterisk = not BIPD), Insurance Type Description, Policy Number, Minimum Coverage Amount (in thousands), and Insurance Class Code (P = primary, E = excess).

**Dates & Amounts (11–14):** Effective Date, BI&PD Underlying Limit Amount, BI&PD Max Coverage Amount, and Cancel Effective Date. The underlying limit for excess policies represents the value of the primary insurance.

**Specific Cancellation (15):** More granular method — `TERM/CANCL` means FMCSA executed the cancellation; `Term/REPL` means a new policy submission triggered the replacement.

**Insurance Company (17–18):** Branch number and company name.

---

## Dataset #7: Rejected

**Variants:** `Rejected`, `Rejected– All With History`

Insurance forms that FMCSA rejected. Contains the policy details associated with the form, the rejection date, and the rejection reason (free text, up to 300 characters — e.g. "Policy is already cancelled").

### Key Fields (15 total — position 12 is skipped)

**Identity (1–2):** Docket Number, USDOT Number.

**Form Info (3–5):** Form Code (includes both insurance and cancellation form codes — 34, 35, 36, 82, 83, 84, 85, 85C, 91/91X), Insurance Type Description, and Policy Number.

**Dates (6, 11):** Received Date (when FMCSA got the form) and Rejected Date.

**Insurance Details (7–10):** Insurance Class Code, Insurance Type Code, Underlying Limit Amount, and Maximum Coverage Amount.

**Rejection Details (13–16):** Insurance Branch, Company Name, Rejected Reason (the key field — tells you *why*), and Minimum Coverage Amount.

---

## Dataset #8: Revocation

**Variants:** `Revocation`, `Revocation– All With History`

Tracks authorities that have been revoked by FMCSA. The simplest dataset in the collection — just 6 fields.

### Key Fields (6 total)

Includes Docket Number, USDOT Number, Operating Authority Registration Type (common, contract, or broker), Serve Date (when the first revocation letter was sent), Revocation Type (the type of action taken), and Effective Date (when the revocation takes effect).

---

## Common Identifiers Across All Datasets

Two identifiers appear in nearly every dataset and serve as the primary join keys:

- **Docket Number** (Text 8) — The unique FMCSA number for for-hire motor carriers. Formatted as `MC000000`, `FF000000`, or `MX000000`.
- **USDOT Number** (Text 8) — The official FMCSA registration number for all interstate motor carriers.

---

## Disclaimer

All datasets are provided by FMCSA as a public service for informational purposes only. The data is a point-in-time snapshot and is constantly changing. It does not constitute legal advice or a legal contract. FMCSA accepts no liability for any damage or loss arising from use of this data.