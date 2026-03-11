# FMCSA Dataset Description and Data Definitions — Select Datasets

**Source:** U.S. Department of Transportation, Federal Motor Carrier Safety Administration  
**Catalog:** [DOT Open Data Catalog](https://data.transportation.gov)  
**Pages:** 15  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines the schema and field-level data definitions for **16 FMCSA datasets** published on the DOT Open Data Catalog. The datasets cover carrier/broker/freight forwarder registration, operating authority, insurance policies, BOC3 process agents, insurance history, rejected insurance forms, and authority revocations.

The 16 datasets are organized as **8 pairs** — each pair consists of a "Daily Difference" version and a "Full/Baseline" version.

---

## Dataset Naming Convention

**[Dataset Name]** — the "Daily Difference" dataset. Contains only records that have been updated or added since the previous run. In some cases it also includes all other records for the same entity for completeness, or records where a related update triggered inclusion.

**[Dataset Name] – All With History** — the "Full" or "Baseline" dataset. Contains all records including historical values as of the latest update.

---

## Dataset Pairs

| # | Daily Diff | Full/Baseline | Topic |
|---|-----------|---------------|-------|
| 1–2 | Carrier | Carrier– All With History | Carrier census, authority, insurance summary |
| 3–4 | Insur | Insur– All With History | Active/pending individual insurance policies |
| 5–6 | ActPendInsur | ActPendInsur– All With History | Active/pending insurance policy dates and limits |
| 7–8 | AuthHist | AuthHist– All With History | Authority grant/revoke history |
| 9–10 | BOC3 | BOC3– All With History | BOC3 process agents |
| 11–12 | InsHist | InsHist– All With History | Previous (cancelled/replaced) insurance policies |
| 13–14 | Rejected | Rejected– All With History | Rejected insurance forms |
| 15–16 | Revocation | Revocation– All With History | Revoked operating authorities |

---

## 1. Carrier Dataset (43 fields)

Records for all carriers, brokers, and freight forwarders with active, inactive, or pending authorities (common or contract). Includes DOT number, docket number, census data, authority statuses, insurance summary, and addresses.

**Key fields:**

- **Docket Number** (Text 8) — Unique FMCSA number for for-hire motor carriers, formatted as MC000000, FF000000, or MX000000.
- **USDOT Number** (Text 8) — Official FMCSA registration number for all interstate motor carriers.
- **MX Type** (Text 1) — Distinguishes Mexican carriers: X = OP-1 (operate throughout US), Z = OP-2 (commercial zones only).
- **RFC Number** (Text 17) — Mexican Government registration code.
- **Authority fields** (fields 5–13) — Three authority types (common, contract, broker) each with current status (A/I/N), pending application status (Y/N), and revocation status (Y/N).
- **Commodity flags** (fields 14–18) — Y/N flags for Property, Passenger, Household Goods, Private Check, and Enterprise Check.
- **Insurance summary** (fields 19–24) — BI&PD required amount, BI&PD on file amount (both in thousands), plus Y/N flags for Cargo and Bond/Surety required and on file.
- **Address Status** (Text 1) — Y = deliverable, N = undeliverable.
- **DBA Name** (Text 60) and **Legal Name** (Text 120).
- **Company Business Address** (fields 28–35) — PO Box/Street, Colonia, City, State, Country, Zip, Telephone, Fax.
- **Company Mailing Address** (fields 36–43) — Same structure as business address.

---

## 2. Insur Dataset (9 fields)

Active or pending individual insurance policies linked to entities by docket number. Entities can hold multiple policies, resulting in multiple records per entity.

**Important:** In the daily difference version, policy removals appear as blank records (all fields empty or "00000" except docket number).

**Key fields:**

- **Insurance Type** (Text 1) — 1 = BI&PD, 2 = Cargo, 3 = Bond, 4 = Trust Fund. Dollar amounts in fields 4–5 only apply to type 1; for types 2–4, amounts will be 0.
- **BI&PD Class** (Text 1) — P = Primary, E = Excess, 1 = Full Security Limits Under Section 1043.2(b)(1), 2 = Full Security Limits Under Section 1043.2(b)(2).
- **BI&PD Maximum Dollar Limit** and **BI&PD Underlying Dollar Limit** (Text 5 each) — amounts in thousands.
- **Policy Number** (Text 25), **Effective Date** (Text 10).
- **Form Code** (Text 3) — 34 = Cargo, 82 = BI&PD, 83 = Cargo, 84 = Property Broker's Surety Bond, 85 = Property Broker's Trust Fund Agreement, 91/91X = BI&PD variants.
- **Insurance Company Name** (Text 45) — note that the administering branch may have a different name.

---

## 3. ActPendInsur Dataset (11 fields)

Implementation dates for active or pending insurance policies: posted date, effective date, and cancel effective date. Also includes insurance company name, BI&PD limits, and DOT/docket numbers.

**Key fields:**

- **Posted Date** (Text 10) — Date FMCSA received the policy.
- **BI&PD Underlying Limit** and **BI&PD Maximum Limit** (Text 5 each) — amounts in thousands. Only populated for form codes 91, 91X, and 82; will be 0 for form codes 34, 83, 84, 85.
- **Effective Date** (Text 10) and **Cancel Effective Date** (Text 10).

---

## 4. AuthHist Dataset (9 fields)

History of each authority granted to a carrier/broker/freight forwarder, tracking from original action (e.g., "granted") through final action (e.g., "revoked"). Multiple authorities per entity means multiple records.

**Key fields:**

- **Sub Number** (Text 4) — Action sequence number; not commonly used.
- **Operating Authority Type** (VARCHAR 128).
- **Original Authority Action Description** (Text 60) and **Original Authority Action Served Date** (Text 10) — the starting authority action and when it was executed.
- **Final Authority Action Description** (Text 60), **Final Authority Decision Date** (Text 10), and **Final Authority Served Date** (Text 10) — the final action, when it was decided, and when it became effective.

---

## 5. BOC3 Dataset (9 fields)

BOC3 agent records. Each carrier/broker/freight forwarder must hire a BOC3 agent for legal representation to obtain operating authority; some entities act as their own agent.

**Key fields:**

- **Company Name** (Text 60) — Process agent company name.
- **Attention to or Title** (Text 45) — Process agent company contact.
- **Address fields** — Street/PO Box (Text 35), City (Text 30), State (Text 2), Country (Text 3), Zip Code (Text 10).

Note: The source document skips field #3 in its numbering.

---

## 6. InsHist Dataset (16 fields)

Previous insurance policies — records of policies that were cancelled, replaced, had a name change, or were transferred. All information relates to the policy being ended, **not** the subsequent replacement policy.

**Key fields:**

- **Cancellation Method** (Text 12) — "cancelled", "replaced", "name change", or "transferred".
- **Cancel/Replace/Name Change/Transfer Form** (Text 6) — The form that executed the action. Cancellation codes: 35 (BMC Cancellation), 36 (BMC Surety Bond Cancellation), 85C (BMC Cancellation for Trust Funds). Replacement uses the same form codes as field 3. Name change = "NC", Transferred = "TR".
- **Insurance Type Indicator** (Text 1) — blank = BIPD, asterisk (*) = Not BIPD.
- **Insurance Class Code** (Text 1) — P = primary, E = excess.
- **BI&PD Underlying Limit Amount** (Text 10) — When class code is E, this represents the value of the primary insurance.
- **BI&PD Max Coverage Amount** (Text 10) — Maximum dollar amount covered, in thousands.
- **Specific Cancellation Method** (Text 10) — TERM/CANCL = cancellation executed by FMCSA, Term/REPL = replacement by new policy submission.
- **Insurance Company Branch** (Text 2) and **Insurance Company Name** (Text 45).

Note: The source document skips field #16 in its numbering.

---

## 7. Rejected Dataset (15 fields)

Insurance forms rejected by FMCSA, including policy details, rejection date, and rejection reason.

**Key fields:**

- **Form Code (Insurance or Cancel)** (Text 3) — Includes both insurance form codes (34, 82, 83, 84, 85, 91/91X) and cancellation form codes (35, 36, 85C).
- **Insurance Type Code** (Text 1) — blank = BI&PD, asterisk = Not BI&PD.
- **Underlying Limit Amount** (Text 10) and **Maximum Coverage Amount** (Text 10) — amounts in thousands.
- **Rejected Date** (Text 10) — Date the submitted form was rejected.
- **Rejected Reason** (Text 300) — Free-text explanation of why the form was rejected (e.g., "Policy is already cancelled").
- **Minimum Coverage Amount** (Text 5) — Minimum insurance required for the entity, in thousands.

Note: The source document skips field #12 in its numbering.

---

## 8. Revocation Dataset (6 fields)

Authorities revoked by FMCSA for carriers, brokers, and freight forwarders.

**Key fields:**

- **Operating Authority Registration Type** (VARCHAR 128) — common, contract, or broker.
- **Serve Date** (Text 10) — Date the first revocation letter was sent.
- **Revocation Type** (Text 60) — The type of revocation action.
- **Effective Date** (Text 10) — Date the revocation takes effect.

---

## Shared Reference: Form Codes

Form codes appear across the Insur, ActPendInsur, InsHist, and Rejected datasets:

| Code | Description |
|------|-------------|
| 34 | Cargo |
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 85C | BMC Cancellation for Trust Funds |
| 91 | BI&PD |
| 91X | BI&PD/Primary or BI&PD/Excess |

---

## Shared Reference: Docket Number Prefixes

| Prefix | Entity Type |
|--------|-------------|
| MC | Motor Carrier |
| FF | Freight Forwarder |
| MX | Mexican Carrier |

---

## Key Relationships

All datasets are linked through **Docket Number** (the primary entity identifier for for-hire carriers). Several datasets also carry **USDOT Number** as a secondary identifier. The Insur dataset notably links only via Docket Number (no USDOT), while ActPendInsur, AuthHist, BOC3, InsHist, Rejected, and Revocation all carry both identifiers.

The Carrier dataset is the master entity record. Insurance-related datasets (Insur, ActPendInsur, InsHist, Rejected) provide detailed policy-level records. AuthHist and Revocation track the lifecycle of operating authorities. BOC3 tracks the legal process agents.

---

## Disclaimer

All datasets are provided by FMCSA as a public service for informational purposes only. Data represents a snapshot at time of generation and is constantly changing. It does not constitute legal advice, and FMCSA bears no liability for damage or loss arising from use of or reliance on this data.