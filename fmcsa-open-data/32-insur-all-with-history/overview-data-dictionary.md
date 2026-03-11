# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)  
**Data Catalog:** [https://data.transportation.gov](https://data.transportation.gov)  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines 16 FMCSA datasets published on DOT's Open Data Catalog. These datasets cover carrier/broker/freight forwarder registration, operating authority, insurance policies, BOC3 process agents, insurance history, rejected forms, and authority revocations.

Each dataset comes in two variants:

- **Daily Difference** (`[Dataset Name]`) — Only records updated or added since the previous run. May include related records for completeness.
- **Full / Baseline** (`[Dataset Name] – All With History`) — All records including historical values as of the latest update.

---

## 1. Carrier

Covers all carriers, brokers, and freight forwarders with active, inactive, or pending common/contract authorities. This is the most comprehensive entity-level dataset — it includes identification (DOT number, docket number), authority status, insurance requirements vs. what's on file, entity type flags, and both business and mailing addresses.

**Key fields (43 total):**

- **Docket Number** (Text 8) — The unique MC/FF/MX number assigned by FMCSA.
- **USDOT Number** (Text 8) — Official registration number for interstate motor carriers.
- **MX Type** (Text 1) — Distinguishes Mexican carriers: `X` = operate throughout US, `Z` = commercial zones only.
- **RFC Number** (Text 17) — Mexican government registration code.
- **Authority fields** (positions 5–13) — Three authority types (Common, Contract, Broker), each with active/inactive status (`A`/`I`/`N`), pending application flag (`Y`/`N`), and revocation flag (`Y`/`N`).
- **Entity type flags** (positions 14–18) — Property, Passenger, Household Goods, Private Check, Enterprise Check — all `Y`/`N`.
- **Insurance requirement vs. on-file** (positions 19–24) — BIPD required amount (in thousands), Cargo required, Bond/Surety required, and corresponding "on file" fields.
- **Address Status** (Text 1) — `Y` = deliverable, `N` = undeliverable.
- **DBA Name** (Text 60) and **Legal Name** (Text 120).
- **Business Address** (positions 28–35) — Street, Colonia, City, State, Country, Zip, Phone, Fax.
- **Mailing Address** (positions 36–43) — Same structure as business address.

---

## 2. Insur

Active or pending individual insurance policies linked to entities by docket number. An entity can hold multiple policies, so expect multiple records per entity.

**Important:** In the daily difference variant, policy removals appear as blank records (all fields empty or `00000` except docket number).

**Key fields (9 total):**

- **Docket Number** (Text 8) — Links to the entity.
- **Insurance Type** (Text 1) — `1` = BI&PD, `2` = Cargo, `3` = Bond, `4` = Trust Fund. Dollar amounts in fields 4–5 only apply to type 1; types 2–4 show 0.
- **BIPD Class** (Text 1) — `P` = Primary, `E` = Excess, `1` = Full Security Limits under Section 1043.2(b)(1), `2` = under Section 1043.2(b)(2).
- **BIPD Maximum Dollar Limit** (Text 5) — In thousands.
- **BIPD Underlying Dollar Limit** (Text 5) — In thousands.
- **Policy Number** (Text 25) — Unique policy identifier.
- **Effective Date** (Text 10).
- **Form Code** (Text 3) — `34` = Cargo, `82` = BI&PD, `83` = Cargo, `84` = Property Broker's Surety Bond, `85` = Trust Fund Agreement, `91`/`91X` = BI&PD variants.
- **Insurance Company Name** (Text 45) — Note: the administering branch may have a different name.

---

## 3. ActPendInsur

Focuses on **dates** associated with active or pending insurance policies: when FMCSA received it (posted date), when it becomes effective, and when it's cancelled. Also carries BI&PD limit amounts and the insurance company name.

**Key fields (11 total):**

- **Docket Number** and **USDOT Number** — Entity identifiers.
- **Form Code** (Text 3) — Same code set as Insur. BI&PD amounts (fields 8–9) only populated for form codes 91, 91X, and 82.
- **Insurance Type Description** (Text 21) — Human-readable label for the form/class.
- **Insurance Company Name** (Text 45).
- **Policy Number** (Text 25).
- **Posted Date** (Text 10) — Date FMCSA received the policy.
- **BIPD Underlying Limit** and **BIPD Maximum Limit** (Text 5 each) — In thousands.
- **Effective Date** (Text 10).
- **Cancel Effective Date** (Text 10) — When the policy cancellation takes effect.

---

## 4. AuthHist

The full **authority history** for each entity — tracking the lifecycle from the original action (e.g., "granted") through the final action (e.g., "revoked"). Multiple authorities per entity = multiple records.

**Key fields (9 total):**

- **Docket Number** and **USDOT Number** — Entity identifiers.
- **Sub Number** (Text 4) — Sequence number; rarely used.
- **Operating Authority Type** (VARCHAR 128) — The type of authority.
- **Original Authority Action Description** (Text 60) — What the starting action was.
- **Original Authority Action Served Date** (Text 10) — When it was executed.
- **Final Authority Action Description** (Text 60) — What the ending action was.
- **Final Authority Decision Date** (Text 10) — When the final action was determined.
- **Final Authority Served Date** (Text 10) — When the final action became effective.

---

## 5. BOC3

Every entity that holds or seeks operating authority must designate a **BOC3 process agent** for legal service. This dataset lists those agents and their contact info. Some entities serve as their own BOC3 agent.

**Key fields (9 total — note position 3 is skipped in the source):**

- **Docket Number** and **USDOT Number** — Entity identifiers.
- **Company Name** (Text 60) — The process agent company.
- **Attention to or Title** (Text 45) — Contact person at the process agent.
- **Address fields** — Street/PO Box (Text 35), City (Text 30), State (Text 2), Country (Text 3), Zip Code (Text 10).

---

## 6. InsHist

**Historical insurance records** — policies that have been cancelled, replaced, had a name change, or were transferred. This dataset captures the **outgoing** policy, not the replacement.

**Key fields (17 total — note position 16 is skipped in the source):**

- **Docket Number** and **USDOT Number**.
- **Form Code** (Text 3) — Same code set as other insurance datasets.
- **Cancellation Method** (Text 12) — `cancelled`, `replaced`, `name change`, or `transferred`.
- **Cancel/Replace/Name Change/Transfer Form** (Text 6) — For cancellations: `35` (BMC Cancellation), `36` (Surety Bond Cancellation), `85C` (Trust Fund Cancellation). For replacements: uses the form codes from field 3. For name changes: `NC`. For transfers: `TR`.
- **Insurance Type Indicator** (Text 1) — Blank = BIPD, `*` = not BIPD.
- **Insurance Type Description** (Text 12).
- **Policy Number** (Text 25).
- **Minimum Coverage Amount** (Text 5) — Required minimum, in thousands.
- **Insurance Class Code** (Text 1) — `P` = Primary, `E` = Excess.
- **Effective Date** (Text 10).
- **BIPD Underlying Limit Amount** (Text 10) — In thousands. For excess policies, this equals the primary insurance value. Only for BI&PD form codes.
- **BIPD Max Coverage Amount** (Text 10) — In thousands. Only for BI&PD form codes.
- **Cancel Effective Date** (Text 10).
- **Specific Cancellation Method** (Text 10) — `TERM/CANCL` = FMCSA-executed cancellation, `Term/REPL` = replaced by new policy.
- **Insurance Company Branch** (Text 2) and **Insurance Company Name** (Text 45).

---

## 7. Rejected

Insurance forms that **FMCSA rejected**, along with the reason (e.g., "Policy is already cancelled"). Useful for tracking compliance issues.

**Key fields (15 total — note positions 12 is skipped in the source):**

- **Docket Number** and **USDOT Number**.
- **Form Code (Insurance or Cancel)** (Text 3) — Expanded code set that includes cancellation forms (35, 36, 85C) in addition to the standard insurance form codes.
- **Insurance Type Description** (Text 12).
- **Policy Number** (Text 25).
- **Received Date** (Text 10) — When FMCSA got the form.
- **Insurance Class Code** (Text 1) — `P`/`E` when available.
- **Insurance Type Code** (Text 1) — Blank = BI&PD, `*` = not BI&PD.
- **Underlying Limit Amount** (Text 10) and **Maximum Coverage Amount** (Text 10) — In thousands.
- **Rejected Date** (Text 10) — When the form was rejected.
- **Insurance Branch** (Text 2) and **Company Name** (Text 45).
- **Rejected Reason** (Text 300) — Free-text explanation of why the form was rejected.
- **Minimum Coverage Amount** (Text 5) — Required minimum, in thousands.

---

## 8. Revocation

Authorities that have been **revoked** by FMCSA. Simple dataset focused on the revocation event itself.

**Key fields (6 total):**

- **Docket Number** and **USDOT Number**.
- **Operating Authority Registration Type** (VARCHAR 128) — Common, contract, or broker.
- **Serve Date** (Text 10) — When the first revocation letter was sent.
- **Revocation Type** (Text 60) — The type of revocation action.
- **Effective Date** (Text 10) — When the revocation takes effect.

---

## Common Reference: Form Codes

These form codes appear across multiple datasets (Insur, ActPendInsur, InsHist, Rejected):

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91 / 91X | BI&PD / BI&PD Primary / BI&PD Excess |

**BI&PD dollar amounts** (underlying limit, maximum limit) are only populated for form codes 82, 91, and 91X. For all other form codes, those fields will be 0.

---

## Common Reference: Cancellation Form Codes (InsHist, Rejected)

| Code | Meaning |
|------|---------|
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 85C | BMC Cancellation for Trust Funds |
| NC | Name Change |
| TR | Transferred |

---

## Disclaimer

These datasets are provided by FMCSA as a public service for informational purposes only. They represent point-in-time snapshots and are constantly changing. The data does not constitute legal advice or a legal contract. FMCSA accepts no liability for damages arising from use of or reliance on this data.