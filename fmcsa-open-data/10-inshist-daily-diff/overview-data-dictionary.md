# FMCSA Dataset Description and Data Definitions

## Overview

This document describes **16 datasets** published by the **Federal Motor Carrier Safety Administration (FMCSA)** on the U.S. Department of Transportation's Open Data Catalog at [data.transportation.gov](https://data.transportation.gov).

These datasets provide public information about motor carriers, brokers, and freight forwarders regulated by the FMCSA — covering their registration, operating authority, insurance policies, legal agents, and enforcement actions.

All datasets are targeted to update **daily by 9:30 AM US Eastern Time**.

---

## Naming Convention

Each dataset comes in two variants:

- **`[Name]`** — The "Daily Difference" version. Contains only records that have been updated or added since the previous day's run. In some cases it also includes all related records for completeness (e.g., all insurance records for a carrier when only one changed). In the Insur dataset, removals appear as blank records (all fields empty or "00000" except the docket number).

- **`[Name] – All With History`** — The "Full/Baseline" version. Contains every record including historical values, as of the latest update.

---

## Dataset #1: Carrier

**Variants:** `Carrier`, `Carrier – All With History`

The core entity-level dataset. Contains one record per carrier/broker/freight forwarder that has active, inactive, or pending operating authorities (common or contract).

### What it covers

- **Identification:** Docket Number (MC/FF/MX format), USDOT Number, MX Type (for Mexican carriers), RFC Number
- **Authority Status:** Active, Inactive, or No Authority flags for Common, Contract, and Broker authority types
- **Pending Applications:** Whether applications are pending for each authority type
- **Revocation Status:** Whether each authority type is currently in revocation
- **Carrier Type Flags:** Property, Passenger, Household Goods, Private Check, Enterprise Check
- **Insurance Requirements & Filing Status:** BI&PD required amount (in thousands) and on-file amount, plus Y/N flags for Cargo and Bond/Surety required and on file
- **Address Status:** Whether the company address is deliverable (Y) or undeliverable (N)
- **Entity Names:** DBA Name (up to 60 chars) and Legal Name (up to 120 chars)
- **Business Address:** Street/PO Box, Colonia, City, State, Country, Zip, Phone, Fax
- **Mailing Address:** Same fields as business address (separate set)

### Total fields: 43

### Key notes

- Insurance amounts (BIPD Required, BIPD on File) are in **thousands of dollars**.
- The MX Type field only applies to Mexican carriers: `X` = can operate throughout the US, `Z` = commercial zones only.
- Authority status uses a simple A/I/N code: Active, Inactive, No Authority.

---

## Dataset #2: Insur

**Variants:** `Insur`, `Insur – All With History`

Individual insurance policy records for active or pending policies. Linked to entities by docket number. A single entity can have **multiple insurance policies**, so expect multiple rows per docket.

### What it covers

- **Docket Number** — links back to the Carrier dataset
- **Insurance Type:** 1=BI&PD, 2=Cargo, 3=Bond, 4=Trust Fund
- **BI&PD Class:** Primary, Excess, or Full Security Limits under specific sections
- **BI&PD Amounts:** Maximum Dollar Limit and Underlying Dollar Limit (in thousands) — only populated for Insurance Type 1; Types 2/3/4 show 0
- **Policy Number, Effective Date**
- **Form Code:** 34=Cargo, 82=BI&PD, 83=Cargo, 84=Property Broker's Surety Bond, 85=Trust Fund Agreement, 91/91X=BI&PD variants
- **Insurance Company Name** (may differ from the administering branch)

### Total fields: 9

### Key notes

- In the daily difference version, **policy removals** appear as blank records — only the docket number is populated; everything else is empty or "00000".
- Dollar amounts only apply to BI&PD policies (Insurance Type 1). For Cargo, Bond, and Trust Fund types, the amount fields are zero.

---

## Dataset #3: ActPendInsur

**Variants:** `ActPendInsur`, `ActPendInsur – All With History`

Focuses on the **lifecycle dates** of active or pending insurance policies: when FMCSA received it (Posted Date), when it took effect (Effective Date), and when it was cancelled (Cancel Effective Date).

### What it covers

- **Docket Number, USDOT Number**
- **Form Code** with same value set as Insur
- **Insurance Type Description** — human-readable description of the form/class
- **Insurance Company Name, Policy Number**
- **Posted Date** — when FMCSA received the policy
- **BI&PD Underlying Limit and Maximum Limit** (in thousands) — only for form codes 91/91X/82; other codes show 0
- **Effective Date, Cancel Effective Date**

### Total fields: 11

### Key notes

- This is the best dataset for tracking **insurance timing**: when policies were filed, activated, and cancelled.
- Combines identifiers from both the Carrier and Insur datasets (has both docket and USDOT numbers).

---

## Dataset #4: AuthHist

**Variants:** `AuthHist`, `AuthHist – All With History`

The **authority history** for each entity. Tracks every operating authority ever granted, from the original action (e.g., "granted") through the final action (e.g., "revoked"). Multiple authorities per entity = multiple records.

### What it covers

- **Docket Number, USDOT Number**
- **Sub Number** — action sequence number (not commonly used)
- **Operating Authority Type**
- **Original Authority Action Description** — the starting action (e.g., "granted")
- **Original Authority Action Served Date** — when that action was executed
- **Final Authority Action Description** — the ending action (e.g., "revoked")
- **Final Authority Decision Date** — when the final action was determined
- **Final Authority Served Date** — when the final action became effective

### Total fields: 9

### Key notes

- This is the historical audit trail for authority grants and revocations.
- The "Final" fields may be empty if the authority is still in its original state.

---

## Dataset #5: BOC3

**Variants:** `BOC3`, `BOC3 – All With History`

BOC-3 process agent filings. Every carrier, broker, or freight forwarder must designate a process agent (BOC-3 agent) to represent them in legal matters as a condition of obtaining operating authority. Some entities serve as their own agent.

### What it covers

- **Docket Number, USDOT Number**
- **Process Agent Info:** Company Name, Attention/Title, Street/PO Box, City, State, Country, Zip Code

### Total fields: 10 (note: field #3 is skipped in the source document)

### Key notes

- Useful for identifying the legal service agent for any given carrier.
- Self-representation is allowed, so the agent name may match the carrier's own company name.

---

## Dataset #6: InsHist

**Variants:** `InsHist`, `InsHist – All With History`

**Historical insurance policy records** — specifically, policies that have been cancelled, replaced, had a name change, or been transferred. This is NOT the current/subsequent policy; it documents the policy that was ended.

### What it covers

- **Docket Number, USDOT Number**
- **Form Code** (same values as Insur/ActPendInsur)
- **Cancellation Method:** cancelled, replaced, name change, or transferred
- **Cancel/Replace/Name Change/Transfer Form:** The specific form used — cancellation forms (35, 36, 85C), replacement form codes matching field 3, or NC/TR codes
- **Insurance Type Indicator:** blank=BIPD, `*`=Not BIPD
- **Insurance Type Description**
- **Policy Number**
- **Minimum Coverage Amount** — the required minimum for the entity type (in thousands)
- **Insurance Class Code:** P=Primary, E=Excess
- **Effective Date** of the policy
- **BI&PD Underlying Limit Amount** (in thousands) — when class is Excess, this represents the primary insurance value
- **BI&PD Max Coverage Amount** (in thousands)
- **Cancel Effective Date**
- **Specific Cancellation Method:** TERM/CANCL (FMCSA-executed cancellation) or Term/REPL (replaced by new policy)
- **Insurance Company Branch number and Name**

### Total fields: 18 (note: field #16 is skipped in the source document)

### Key notes

- Critical distinction: this dataset shows the **departing** policy, not the replacement. To find the new policy, cross-reference with the Insur or ActPendInsur datasets.
- The "Specific Cancellation Method" field provides more granularity than the general "Cancellation Method" — distinguishing FMCSA-initiated cancellations from policy replacements.
- Dollar amounts only apply to BI&PD form codes (91, 91X, 82).

---

## Dataset #7: Rejected

**Variants:** `Rejected`, `Rejected – All With History`

Insurance forms that FMCSA **rejected**. Contains the policy details, rejection date, and the reason for rejection (e.g., "Policy is already cancelled").

### What it covers

- **Docket Number, USDOT Number**
- **Form Code** — expanded set that includes both insurance and cancellation form codes (34, 35, 36, 82, 83, 84, 85, 85C, 91/91X)
- **Insurance Type Description**
- **Policy Number**
- **Received Date** — when FMCSA got the form
- **Insurance Class Code:** P=Primary, E=Excess (when available)
- **Insurance Type Code:** blank=BI&PD, `*`=Not BI&PD
- **Underlying Limit Amount, Maximum Coverage Amount** (in thousands)
- **Rejected Date** — when FMCSA rejected the form
- **Insurance Branch, Company Name**
- **Rejected Reason** — free text up to 300 characters explaining why
- **Minimum Coverage Amount** (in thousands)

### Total fields: 16 (note: field #12 is skipped in the source document)

### Key notes

- The **Rejected Reason** field (up to 300 chars) is the most valuable field here — it tells you exactly why a filing was rejected.
- This dataset spans both insurance filings and cancellation filings (note the form code set includes 35, 36, 85C cancellation forms).

---

## Dataset #8: Revocation

**Variants:** `Revocation`, `Revocation – All With History`

Records of operating authorities that FMCSA has **revoked**. Includes the entity, authority type, revocation reason, and key dates.

### What it covers

- **Docket Number, USDOT Number**
- **Operating Authority Registration Type:** common, contract, or broker
- **Serve Date** — when the first revocation letter was sent
- **Revocation Type** — the type/reason for revocation (up to 60 chars)
- **Effective Date** — when the revocation takes effect

### Total fields: 6

### Key notes

- This is the enforcement action dataset — shows which carriers lost their operating authority and why.
- Cross-reference with the Carrier dataset's revocation flags (fields 11-13) to see current revocation status.

---

## Relationships Between Datasets

The datasets are interconnected primarily through **Docket Number** and **USDOT Number**:

- **Carrier** is the master entity table (one row per entity)
- **Insur** and **ActPendInsur** provide current/active insurance detail
- **InsHist** provides historical (cancelled/replaced) insurance detail
- **Rejected** shows failed insurance filings
- **AuthHist** tracks the full authority lifecycle
- **Revocation** captures enforcement-driven authority losses
- **BOC3** links to legal process agents

A typical analytical workflow would start with the Carrier dataset to identify entities of interest, then join to the other datasets by Docket Number for deeper policy, authority, or enforcement detail.

---

## Content Disclaimer

These datasets are provided as a public service by FMCSA. The data represents a point-in-time snapshot and is constantly changing. It is for informational purposes only, does not constitute a legal contract, and is not offered as legal advice. FMCSA is not liable for any damage or loss from use of or reliance on this data.