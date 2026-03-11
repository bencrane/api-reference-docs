# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)  
**Catalog URL:** [https://data.transportation.gov](https://data.transportation.gov)  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines 16 FMCSA datasets published on the DOT's Open Data Catalog. These datasets cover carriers, brokers, and freight forwarders — specifically their operating authorities, insurance policies, BOC3 process agents, insurance history, rejected insurance forms, and authority revocations.

Every dataset comes in two variants:

- **Daily Difference** (`[Dataset Name]`) — Only records updated or added since the previous run. May include related records for completeness.
- **Full / Baseline** (`[Dataset Name] – All With History`) — All records including historical values as of the latest update.

---

## Dataset 1: Carrier

**Variants:** `Carrier` / `Carrier – All With History`

Contains records for all carriers/brokers/freight forwarders with active, inactive, or pending authorities (common or contract). Each record includes the DOT number, docket number, entity census data, authority status, and insurance filing status.

### Key Fields (43 total)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier (MC/FF/MX prefix) |
| 2 | USDOT Number | Text 8 | Official registration number for interstate carriers |
| 3 | MX Type | Text 1 | X = OP-1 (full US), Z = OP-2 (commercial zones only) |
| 4 | RFC Number | Text 17 | Mexican government registration code |
| 5–7 | Common / Contract / Broker Authority | Text 1 each | A = Active, I = Inactive, N = No Authority |
| 8–10 | Pending Common / Contract / Broker Authority | Text 1 each | Y = Pending, N = Not Pending |
| 11–13 | Common / Contract / Broker Authority Revocation | Text 1 each | Y = In Revocation, N = Not |
| 14 | Property | Text 1 | Y/N — Property carrier |
| 15 | Passenger | Text 1 | Y/N — Passenger carrier |
| 16 | Household Goods | Text 1 | Y/N — Household goods carrier |
| 17 | Private Check | Text 1 | Y/N |
| 18 | Enterprise Check | Text 1 | Y/N |
| 19 | BIPD Required | Text 5 | BI&PD insurance required (in thousands) |
| 20 | Cargo Required | Text 1 | Y/N |
| 21 | Bond/Surety Required | Text 1 | Y/N |
| 22 | BIPD on File | Text 5 | BI&PD insurance on file (in thousands) |
| 23 | Cargo on File | Text 1 | Y/N |
| 24 | Bond/Surety on File | Text 1 | Y/N |
| 25 | Address Status | Text 1 | Y = Deliverable, N = Undeliverable |
| 26 | DBA Name | Text 60 | "Doing Business As" name |
| 27 | Legal Name | Text 120 | Company legal name |
| 28–35 | Business Address | Various | PO Box/Street, Colonia, City, State, Country, Zip, Phone, Fax |
| 36–43 | Mailing Address | Various | PO Box/Street, Colonia, City, State, Country, Zip, Phone, Fax |

---

## Dataset 2: Insur

**Variants:** `Insur` / `Insur – All With History`

Active or pending individual insurance policies for carriers/brokers/freight forwarders, linked by docket number. Entities can hold multiple policies, so multiple records per entity are common.

**Important:** The daily difference variant shows policy removals as blank records (all fields empty or "00000" except docket number).

### Key Fields (9 total)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | Insurance Type | Text 1 | 1 = BI&PD, 2 = Cargo, 3 = Bond, 4 = Trust Fund |
| 3 | BI&PD Class | Text 1 | P = Primary, E = Excess, 1 = Section 1043.2(b)(1), 2 = Section 1043.2(b)(2) |
| 4 | BI&PD Maximum Dollar Limit | Text 5 | Max liability (in thousands) |
| 5 | BI&PD Underlying Dollar Limit | Text 5 | Underlying limit (in thousands) |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Effective Date | Text 10 | Policy effective date |
| 8 | Form Code | Text 3 | 34/83 = Cargo, 82 = BI&PD, 84 = Surety Bond, 85 = Trust Fund, 91/91X = BI&PD variants |
| 9 | Insurance Company Name | Text 45 | Insurer name |

**Note:** For Insurance Type 1 (BI&PD), amounts are in fields 4 and 5. For Types 2–4, those fields will be 0.

---

## Dataset 3: ActPendInsur

**Variants:** `ActPendInsur` / `ActPendInsur – All With History`

Implementation dates for active or pending insurance policies: posted date, effective date, and cancel effective date. Also includes insurer name, BI&PD limits, and carrier identifiers.

### Key Fields (11 total)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 3 | Form Code | Text 3 | Same codes as Insur dataset |
| 4 | Insurance Type Description | Text 21 | Description of form/class |
| 5 | Insurance Company Name | Text 45 | Insurer name |
| 6 | Policy Number | Text 25 | Policy identifier |
| 7 | Posted Date | Text 10 | Date FMCSA received the policy |
| 8 | BI&PD Underlying Limit | Text 5 | Underlying limit (in thousands) |
| 9 | BI&PD Maximum Limit | Text 5 | Max limit (in thousands) |
| 10 | Effective Date | Text 10 | Policy effective date |
| 11 | Cancel Effective Date | Text 10 | Date policy is effectively cancelled |

**Note:** BI&PD amounts only populated for Form Codes 91, 91X, and 82. All others show 0.

---

## Dataset 4: AuthHist

**Variants:** `AuthHist` / `AuthHist – All With History`

History of each authority granted to a carrier/broker/freight forwarder. Tracks the original action (e.g., "granted") and the final action (e.g., "revoked") with their respective dates. Multiple authorities per entity = multiple records.

### Key Fields (9 total)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 3 | Sub Number | Text 4 | Action sequence number (rarely used) |
| 4 | Operating Authority Type | VARCHAR 128 | Type of operating authority |
| 5 | Original Authority Action Description | Text 60 | Starting authority action |
| 6 | Original Authority Action Served Date | Text 10 | Date original action executed |
| 7 | Final Authority Action Description | Text 60 | Final authority action |
| 8 | Final Authority Decision Date | Text 10 | Date final action determined |
| 9 | Final Authority Served Date | Text 10 | Date final action became effective |

---

## Dataset 5: BOC3

**Variants:** `BOC3` / `BOC3 – All With History`

BOC3 process agent records. Every carrier/broker/freight forwarder must designate a BOC3 agent for legal representation to obtain operating authority. Some entities serve as their own agent.

### Key Fields (9 total — note: field #3 is skipped in source)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 4 | Company Name | Text 60 | Process agent company name |
| 5 | Attention to or Title | Text 45 | Process agent contact |
| 6 | Street or PO Box | Text 35 | Agent address street |
| 7 | City | Text 30 | Agent address city |
| 8 | State | Text 2 | Agent address state |
| 9 | Country | Text 3 | Agent address country |
| 10 | Zip Code | Text 10 | Agent address zip code |

---

## Dataset 6: InsHist

**Variants:** `InsHist` / `InsHist – All With History`

Historical (previous) insurance policies. Tracks how each policy ended: cancelled, replaced, name change, or transferred. Contains the policy details at the time of termination — **not** the replacement policy.

### Key Fields (17 total — note: field #16 is skipped in source)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 3 | Form Code | Text 3 | Standard insurance form codes |
| 4 | Cancellation Method | Text 12 | cancelled / replaced / name change / transferred |
| 5 | Cancel/Replace/NC/TR Form | Text 6 | Form that executed the action (35, 36, 85C for cancels; NC, TR for others) |
| 6 | Insurance Type Indicator | Text 1 | Space = BIPD, * = Not BIPD |
| 7 | Insurance Type Description | Text 12 | Description of form/class |
| 8 | Policy Number | Text 25 | Policy identifier |
| 9 | Minimum Coverage Amount | Text 5 | Minimum required (in thousands) |
| 10 | Insurance Class Code | Text 1 | P = Primary, E = Excess |
| 11 | Effective Date | Text 10 | Policy effective date |
| 12 | BI&PD Underlying Limit Amount | Text 10 | Underlying limit (in thousands); for Excess, equals primary insurance value |
| 13 | BI&PD Max Coverage Amount | Text 10 | Max covered amount (in thousands) |
| 14 | Cancel Effective Date | Text 10 | Date policy effectively cancelled |
| 15 | Specific Cancellation Method | Text 10 | TERM/CANCL = FMCSA cancelled, Term/REPL = replaced by new policy |
| 17 | Insurance Company Branch | Text 2 | Branch number |
| 18 | Insurance Company Name | Text 45 | Insurer name |

**Note:** BI&PD amounts only populated for Form Codes 91, 91X, and 82. All others show 0.

---

## Dataset 7: Rejected

**Variants:** `Rejected` / `Rejected – All With History`

Insurance forms rejected by FMCSA, with the rejection date and reason (e.g., "Policy is already cancelled").

### Key Fields (15 total — note: field #12 is skipped in source)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 3 | Form Code | Text 3 | Insurance or cancellation form code (includes 35, 36, 85C cancellation codes) |
| 4 | Insurance Type Description | Text 12 | Insurance type for the rejected form |
| 5 | Policy Number | Text 25 | Policy identifier |
| 6 | Received Date | Text 10 | Date FMCSA received the form |
| 7 | Insurance Class Code | Text 1 | P = Primary, E = Excess (when available) |
| 8 | Insurance Type Code | Text 1 | Space = BI&PD, * = Not BI&PD |
| 9 | Underlying Limit Amount | Text 10 | Underlying limit (in thousands) |
| 10 | Maximum Coverage Amount | Text 10 | Max covered (in thousands) |
| 11 | Rejected Date | Text 10 | Date form was rejected |
| 13 | Insurance Branch | Text 2 | Branch number |
| 14 | Company Name | Text 45 | Insurer name |
| 15 | Rejected Reason | Text 300 | Reason for rejection |
| 16 | Minimum Coverage Amount | Text 5 | Minimum required (in thousands) |

---

## Dataset 8: Revocation

**Variants:** `Revocation` / `Revocation – All With History`

Authorities revoked by FMCSA. Covers the entity identifiers, authority type, revocation type, and key dates.

### Key Fields (6 total)

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier |
| 2 | USDOT Number | Text 8 | Interstate registration number |
| 3 | Operating Authority Registration Type | VARCHAR 128 | Common, contract, or broker |
| 4 | Serve Date | Text 10 | Date first revocation letter sent |
| 5 | Revocation Type | Text 60 | Type of revocation action |
| 6 | Effective Date | Text 10 | Date revocation is effective |

---

## Common Reference Codes

### Form Codes (used across Insur, ActPendInsur, InsHist, Rejected)

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91, 91X | BI&PD / BI&PD Primary / BI&PD Excess |

### Cancellation Form Codes (InsHist, Rejected)

| Code | Meaning |
|------|---------|
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 85C | BMC Cancellation for Trust Funds |
| NC | Name Change |
| TR | Transferred |

### Authority Status Codes (Carrier)

| Code | Meaning |
|------|---------|
| A | Holds Active Authority |
| I | Inactive Authority |
| N | No Authority |

### Docket Number Prefixes

| Prefix | Entity Type |
|--------|-------------|
| MC | Motor Carrier |
| FF | Freight Forwarder |
| MX | Mexican Carrier |

---

## Disclaimer

These datasets are provided as a public service by FMCSA. They are point-in-time snapshots and are constantly changing. All information is for informational purposes only — it is not a legal contract and should not be treated as legal advice. FMCSA accepts no liability for any damage or loss arising from use of or reliance on this data.