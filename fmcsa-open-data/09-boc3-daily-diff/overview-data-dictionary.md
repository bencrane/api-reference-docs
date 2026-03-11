# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)  
**Data Catalog:** [https://data.transportation.gov](https://data.transportation.gov)  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document describes 16 FMCSA datasets available on the DOT Open Data Catalog. These datasets cover carriers, brokers, and freight forwarders — including their operating authorities, insurance policies, BOC3 process agents, insurance history, rejected insurance forms, and authority revocations.

Each dataset comes in two variants:

- **Daily Difference** (`[Dataset Name]`) — Only records updated or added since the previous run. May include related records for completeness.
- **Full / Baseline** (`[Dataset Name] – All With History`) — All records including historical values as of the latest update.

---

## Dataset #1: Carrier

**Variants:** `Carrier` / `Carrier– All With History`

The core entity dataset. Contains every carrier, broker, and freight forwarder with active, inactive, or pending authorities (common or contract). Each record includes the entity's DOT number, docket number, census information, authority statuses, insurance requirements and amounts on file, and both business and mailing addresses.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Unique FMCSA ID for for-hire motor carriers (MC/FF/MX format) |
| 2 | USDOT Number | Text 8 | Official interstate motor carrier registration number |
| 3 | MX Type | Text 1 | Mexican carrier flag: `X` = operate throughout US, `Z` = commercial zones only |
| 4 | RFC Number | Text 17 | Mexican government registration code |
| 5–7 | Common / Contract / Broker Authority | Text 1 each | `A` = Active, `I` = Inactive, `N` = No Authority |
| 8–10 | Pending Common / Contract / Broker Authority | Text 1 each | `Y` = Application Pending, `N` = No Application Pending |
| 11–13 | Common / Contract / Broker Authority Revocation | Text 1 each | `Y` = In Revocation, `N` = Not in Revocation |
| 14–18 | Freight / Passenger / Household Goods / Private / Enterprise | Text 1 each | `Y` / `N` boolean flags |
| 19 | BIPD Required | Text 5 | Required BI&PD insurance amount (in thousands) |
| 20–21 | Cargo Required / Bond/Surety Required | Text 1 each | `Y` / `N` flags |
| 22 | BIPD on File | Text 5 | BI&PD insurance on file (in thousands) |
| 23–24 | Cargo on File / Bond/Surety on File | Text 1 each | `Y` / `N` flags |
| 25 | Address Status | Text 1 | `Y` = Deliverable, `N` = Undeliverable |
| 26 | DBA Name | Text 60 | "Doing Business As" name |
| 27 | Legal Name | Text 120 | Company legal name |
| 28–35 | Business Address Block | Various | PO Box/Street, Colonia, City, State, Country, Zip, Phone, Fax |
| 36–43 | Mailing Address Block | Various | PO Box/Street, Colonia, City, State, Country, Zip, Phone, Fax |

---

## Dataset #2: Insur (Insurance Policies)

**Variants:** `Insur` / `Insur– All With History`

Active or pending individual insurance policies linked to entities by docket number. Entities can hold multiple policies, so multiple records per entity are common. In the daily difference variant, policy removals appear as blank records (only the docket number is populated; all other fields show empty or "00000" values).

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | Insurance Type | Text 1 | `1` = BI&PD, `2` = Cargo, `3` = Bond, `4` = Trust Fund |
| 3 | BI&PD Class | Text 1 | `P` = Primary, `E` = Excess, `1` / `2` = Full Security Limits under Section 1043.2 |
| 4 | BI&PD Maximum Dollar Limit | Text 5 | Max liability (thousands) |
| 5 | BI&PD Underlying Dollar Limit | Text 5 | Underlying limit (thousands) |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Effective Date | Text 10 | When the policy takes effect |
| 8 | Form Code | Text 3 | `34`/`83` = Cargo, `82`/`91`/`91X` = BI&PD variants, `84` = Surety Bond, `85` = Trust Fund |
| 9 | Insurance Company Name | Text 45 | Insurer name (may differ from administering branch) |

**Note:** Dollar amounts in fields #4 and #5 only apply to Insurance Type 1 (BI&PD). For types 2–4, these fields show 0.

---

## Dataset #3: ActPendInsur (Active/Pending Insurance Details)

**Variants:** `ActPendInsur` / `ActPendInsur– All With History`

Provides the implementation timeline for active or pending insurance policies: when FMCSA received the policy (posted date), when it takes effect, and when it's set to cancel. Also includes insurer name and BI&PD limit amounts.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 3 | Form Code | Text 3 | Same form code system as Insur dataset |
| 4 | Insurance Type Description | Text 21 | Human-readable description of the insurance form/class |
| 5 | Insurance Company Name | Text 45 | Insurer name |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Posted Date | Text 10 | Date FMCSA received the policy |
| 8 | BI&PD Underlying Limit | Text 5 | Underlying limit (thousands) |
| 9 | BI&PD Maximum Limit | Text 5 | Max liability (thousands) |
| 10 | Effective Date | Text 10 | Policy effective date |
| 11 | Cancel Effective Date | Text 10 | Date the policy effectively cancels |

**Note:** BI&PD amounts in #8 and #9 only apply to Form Codes 91, 91X, and 82. For codes 34, 83, 84, and 85, these will be 0.

---

## Dataset #4: AuthHist (Authority History)

**Variants:** `AuthHist` / `AuthHist– All With History`

The full history of each authority ever granted to an entity. Tracks both the original action (e.g., "granted") and the final action (e.g., "revoked"), with corresponding dates. Multiple records per entity are common since entities can hold multiple authorities.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 3 | Sub Number | Text 4 | Action sequence number (not commonly used) |
| 4 | Operating Authority Type | VARCHAR 128 | Type of operating authority |
| 5 | Original Authority Action Description | Text 60 | Starting authority action (e.g., "granted") |
| 6 | Original Authority Action Served Date | Text 10 | Date the original action was executed |
| 7 | Final Authority Action Description | Text 60 | Final authority action (e.g., "revoked") |
| 8 | Final Authority Decision Date | Text 10 | Date the final action was determined |
| 9 | Final Authority Served Date | Text 10 | Date the final action became effective |

---

## Dataset #5: BOC3 (Process Agents)

**Variants:** `BOC3` / `BOC3– All With History`

Every carrier, broker, and freight forwarder must hire a BOC3 process agent to represent them in legal matters in order to obtain operating authority. Some entities act as their own agent. This dataset records each agent's name and address, linked to the represented entity's DOT and docket numbers.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 4 | Company Name | Text 60 | Process agent company name |
| 5 | Attention to or Title | Text 45 | Agent contact person |
| 6 | Street or PO Box | Text 35 | Agent street address |
| 7 | City | Text 30 | Agent city |
| 8 | State | Text 2 | Agent state |
| 9 | Country | Text 3 | Agent country |
| 10 | Zip Code | Text 10 | Agent zip code |

**Note:** Field #3 is skipped in the original schema (no field #3 exists in this dataset).

---

## Dataset #6: InsHist (Insurance History)

**Variants:** `InsHist` / `InsHist– All With History`

Historical insurance policies that have been cancelled, replaced, had a name change, or been transferred. This is a critical distinction: all data here refers to the *old/departing* policy, not the new one that may have replaced it.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 3 | Form Code | Text 3 | Same form code system (34, 82, 83, 84, 85, 91, 91X) |
| 4 | Cancellation Method | Text 12 | How the policy ended: `cancelled`, `replaced`, `name change`, or `transferred` |
| 5 | Cancel/Replace/Name Change/Transfer Form | Text 6 | Form that executed the action. Cancellation codes: `35` (BMC Cancel), `36` (Surety Bond Cancel), `85C` (Trust Fund Cancel). `NC` = Name Change, `TR` = Transfer. |
| 6 | Insurance Type Indicator | Text 1 | Blank = BIPD, `*` = Not BIPD |
| 7 | Insurance Type Description | Text 12 | Human-readable insurance type |
| 8 | Policy Number | Text 25 | Policy identifier |
| 9 | Minimum Coverage Amount | Text 5 | Minimum required insurance (thousands) |
| 10 | Insurance Class Code | Text 1 | `P` = Primary, `E` = Excess |
| 11 | Effective Date | Text 10 | When the policy originally took effect |
| 12 | BI&PD Underlying Limit Amount | Text 10 | Underlying limit (thousands). For excess policies, this is the primary insurance value. |
| 13 | BI&PD Max Coverage Amount | Text 10 | Maximum coverage (thousands) |
| 14 | Cancel Effective Date | Text 10 | Date the policy was effectively cancelled |
| 15 | Specific Cancellation Method | Text 10 | `TERM/CANCL` = cancelled by FMCSA, `Term/REPL` = replaced by new policy |
| 17 | Insurance Company Branch | Text 2 | Insurer branch number |
| 18 | Insurance Company Name | Text 45 | Insurer name |

**Note:** Field #16 is skipped in the original schema. BI&PD amounts in #12 and #13 only apply to Form Codes 91, 91X, and 82.

---

## Dataset #7: Rejected (Rejected Insurance Forms)

**Variants:** `Rejected` / `Rejected– All With History`

Insurance forms that FMCSA rejected, along with the reason (e.g., "Policy is already cancelled"). Useful for tracking compliance issues and submission errors.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 3 | Form Code | Text 3 | Insurance or cancellation form code (includes cancellation-specific codes 35, 36, 85C) |
| 4 | Insurance Type Description | Text 12 | Insurance type of the rejected form |
| 5 | Policy Number | Text 25 | Policy identifier |
| 6 | Received Date | Text 10 | Date FMCSA received the form |
| 7 | Insurance Class Code | Text 1 | `P` = Primary, `E` = Excess (when available) |
| 8 | Insurance Type Code | Text 1 | Blank = BI&PD, `*` = Not BI&PD |
| 9 | Underlying Limit Amount | Text 10 | Underlying limit (thousands) |
| 10 | Maximum Coverage Amount | Text 10 | Max coverage (thousands) |
| 11 | Rejected Date | Text 10 | Date the form was rejected |
| 13 | Insurance Branch | Text 2 | Insurer branch number |
| 14 | Company Name | Text 45 | Insurer name |
| 15 | Rejected Reason | Text 300 | Why FMCSA rejected the form |
| 16 | Minimum Coverage Amount | Text 5 | Minimum required insurance (thousands) |

**Note:** Field #12 is skipped in the original schema.

---

## Dataset #8: Revocation (Authority Revocations)

**Variants:** `Revocation` / `Revocation– All With History`

Authorities that FMCSA has revoked. Tracks which type of authority was revoked, the revocation reason, and key dates.

### Key Fields

| # | Field | Format | What It Means |
|---|-------|--------|---------------|
| 1 | Docket Number | Text 8 | Entity identifier |
| 2 | USDOT Number | Text 8 | DOT registration number |
| 3 | Operating Authority Registration Type | VARCHAR 128 | Common, contract, or broker |
| 4 | Serve Date | Text 10 | Date the first revocation letter was sent |
| 5 | Revocation Type | Text 60 | Type of revocation action |
| 6 | Effective Date | Text 10 | Date the revocation takes effect |

---

## How the Datasets Relate

The **Docket Number** is the primary key that links across all datasets. The **USDOT Number** provides a secondary link. Here's how they connect:

- **Carrier** is the master entity record — use it to look up any carrier/broker/freight forwarder's profile, authorities, and insurance summary.
- **Insur** and **ActPendInsur** provide current/active insurance policy details for entities found in Carrier.
- **InsHist** provides the historical trail of past insurance policies.
- **Rejected** shows any insurance forms that failed FMCSA validation.
- **AuthHist** gives the full authority lifecycle — from granted to revoked/inactive.
- **Revocation** specifically tracks FMCSA-initiated authority revocations.
- **BOC3** identifies the legal process agents representing each entity.

---

## Common Form Codes Reference

These form codes appear across the Insur, ActPendInsur, InsHist, and Rejected datasets:

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 85C | BMC Cancellation for Trust Funds |
| 91 | BI&PD |
| 91X | BI&PD/Primary, BI&PD/Excess |

---

## Disclaimer

These datasets are provided by FMCSA as a public service. The data represents a snapshot at the time of generation and is constantly changing. All information is for informational purposes only and does not constitute legal advice or a legal contract. FMCSA and its employees are not liable for any damage or loss related to use of this data.