# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)  
**Catalog:** [DOT Open Data Catalog](https://data.transportation.gov)  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines 16 datasets published by FMCSA on the DOT Open Data Catalog. These datasets cover carrier/broker/freight forwarder registration, operating authority, insurance policies, BOC3 process agents, insurance history, rejected insurance forms, and authority revocations.

Every dataset comes in two variants:

- **Daily Difference** (`[Dataset Name]`) — Only records updated or added since the last run. May include related records for completeness.
- **Full / Baseline** (`[Dataset Name] – All With History`) — All records including historical values as of the latest update.

---

## Dataset #1: Carrier

**Scope:** All carriers, brokers, and freight forwarders with active, inactive, or pending common/contract authorities.

**What's in it:** DOT number, docket number, entity census data, authority statuses (common, contract, broker — including pending and revocation flags), cargo types (property, passenger, household goods), insurance requirements vs. what's on file (BI&PD, cargo, bond/surety), address deliverability, legal name, DBA name, and both business and mailing addresses with phone/fax.

**Key fields (43 total):**

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | MC/FF/MX prefix |
| 2 | USDOT Number | Text 8 | Interstate registration ID |
| 3 | MX Type | Text 1 | X = OP-1 (full US), Z = OP-2 (commercial zones) |
| 5–7 | Common/Contract/Broker Authority | Text 1 each | A = Active, I = Inactive, N = None |
| 8–10 | Pending Authority flags | Text 1 each | Y/N for each authority type |
| 11–13 | Authority Revocation flags | Text 1 each | Y/N for each authority type |
| 14–16 | Property / Passenger / Household Goods | Text 1 each | Y/N |
| 19 | BIPD Required | Text 5 | Amount in thousands |
| 22 | BIPD on File | Text 5 | Amount in thousands |
| 25 | Address Status | Text 1 | Y = Deliverable, N = Undeliverable |
| 26 | DBA Name | Text 60 | — |
| 27 | Legal Name | Text 120 | — |
| 28–35 | Business Address block | Various | Street, city, state, country, zip, phone, fax |
| 36–43 | Mailing Address block | Various | Street, city, state, country, zip, phone, fax |

---

## Dataset #2: Insur

**Scope:** Active or pending individual insurance policies for carriers/brokers/freight forwarders.

**What's in it:** Insurance type (BI&PD, Cargo, Bond, Trust Fund), BI&PD class and dollar limits, policy number, effective date, form code, and insurance company name. Linked to entities by docket number. Entities can have multiple policies.

**Important:** The daily difference version shows policy removals as blank records — everything except the docket number will be empty or "00000".

**Key note on amounts:** Fields 4 and 5 (BI&PD max/underlying limits) only contain meaningful values for Insurance Type 1 (BI&PD). For Cargo, Bond, and Trust Fund types, these fields will show 0.

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | MC/FF/MX prefix |
| 2 | Insurance Type | Text 1 | 1=BI&PD, 2=Cargo, 3=Bond, 4=Trust Fund |
| 3 | BI&PD Class | Text 1 | P=Primary, E=Excess, 1/2=Full Security Limits |
| 4 | BI&PD Max Dollar Limit | Text 5 | In thousands |
| 5 | BI&PD Underlying Dollar Limit | Text 5 | In thousands |
| 6 | Policy Number | Text 25 | — |
| 7 | Effective Date | Text 10 | — |
| 8 | Form Code | Text 3 | 34/83=Cargo, 82/91/91X=BI&PD, 84=Bond, 85=Trust |
| 9 | Insurance Company Name | Text 45 | May differ from administering branch |

---

## Dataset #3: ActPendInsur

**Scope:** Implementation dates for active or pending insurance policies.

**What's in it:** Posted date (when FMCSA received it), effective date, cancel effective date, insurance company name, BI&PD limits, DOT/docket numbers.

**Key note on amounts:** Fields 8 and 9 only have values for BI&PD form codes (91, 91X, 82). For Cargo/Bond/Trust codes (34, 83, 84, 85), amounts will be 0.

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 3 | Form Code | Text 3 | Same code set as Insur |
| 4 | Insurance Type Description | Text 21 | Human-readable description |
| 5 | Insurance Company Name | Text 45 | — |
| 6 | Policy Number | Text 25 | — |
| 7 | Posted Date | Text 10 | When FMCSA received it |
| 8 | BI&PD Underlying Limit | Text 5 | In thousands |
| 9 | BI&PD Maximum Limit | Text 5 | In thousands |
| 10 | Effective Date | Text 10 | — |
| 11 | Cancel Effective Date | Text 10 | — |

---

## Dataset #4: AuthHist

**Scope:** Full history of each authority granted to carriers/brokers/freight forwarders.

**What's in it:** Original authority action (e.g., "granted") with its served date, final authority action (e.g., "revoked") with decision and served dates. An entity can have multiple authority records.

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 3 | Sub Number | Text 4 | Sequence number, rarely used |
| 4 | Operating Authority Type | VARCHAR 128 | — |
| 5 | Original Authority Action Description | Text 60 | Starting action |
| 6 | Original Authority Action Served Date | Text 10 | — |
| 7 | Final Authority Action Description | Text 60 | Final action |
| 8 | Final Authority Decision Date | Text 10 | — |
| 9 | Final Authority Served Date | Text 10 | When it became effective |

---

## Dataset #5: BOC3

**Scope:** BOC3 process agents hired by carriers/brokers/freight forwarders.

**What's in it:** Every entity must designate a BOC3 agent for legal service to obtain operating authority (some entities are their own agent). Contains agent name, contact, and full address.

**Note:** Field #3 is skipped in the original schema (jumps from 2 to 4).

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 4 | Company Name | Text 60 | Agent company name |
| 5 | Attention to or Title | Text 45 | Agent contact |
| 6 | Street or PO Box | Text 35 | — |
| 7 | City | Text 30 | — |
| 8 | State | Text 2 | — |
| 9 | Country | Text 3 | — |
| 10 | Zip Code | Text 10 | — |

---

## Dataset #6: InsHist

**Scope:** Historical (previous) insurance policies — policies that have been cancelled, replaced, renamed, or transferred.

**What's in it:** Cancellation method and form, insurance type, policy number, effective/cancel dates, BI&PD limits, insurance class (primary vs. excess), specific cancellation method (TERM/CANCL vs. Term/REPL), and insurance company info.

**Critical note:** All data in this dataset refers to the policy that *was* cancelled/replaced — NOT the new replacement policy.

**Key note on amounts:** Fields 12 and 13 only have values for BI&PD codes (91, 91X, 82). Other form codes show 0.

**Field #16 is skipped in the original schema (jumps from 15 to 17).**

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 3 | Form Code | Text 3 | Same code set |
| 4 | Cancellation Method | Text 12 | cancelled / replaced / name change / transferred |
| 5 | Cancel/Replace/Name Change/Transfer Form | Text 6 | 35, 36, 85C for cancellations; NC, TR for changes |
| 6 | Insurance Type Indicator | Text 1 | Space = BIPD, * = Not BIPD |
| 7 | Insurance Type Description | Text 12 | — |
| 8 | Policy Number | Text 25 | — |
| 9 | Minimum Coverage Amount | Text 5 | In thousands |
| 10 | Insurance Class Code | Text 1 | P = Primary, E = Excess |
| 11 | Effective Date | Text 10 | — |
| 12 | BI&PD Underlying Limit Amount | Text 10 | In thousands |
| 13 | BI&PD Max Coverage Amount | Text 10 | In thousands |
| 14 | Cancel Effective Date | Text 10 | — |
| 15 | Specific Cancellation Method | Text 10 | TERM/CANCL or Term/REPL |
| 17 | Insurance Company Branch | Text 2 | — |
| 18 | Insurance Company Name | Text 45 | — |

---

## Dataset #7: Rejected

**Scope:** Insurance forms that FMCSA rejected.

**What's in it:** The rejected form's code (can include cancellation form codes like 35, 36, 85C in addition to insurance form codes), policy details, received and rejected dates, and the rejection reason (up to 300 characters, e.g., "Policy is already cancelled").

**Field #12 is skipped in the original schema (jumps from 11 to 13).**

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 3 | Form Code (Insurance or Cancel) | Text 3 | Includes cancel form codes (35, 36, 85C) |
| 4 | Insurance Type Description | Text 12 | — |
| 5 | Policy Number | Text 25 | — |
| 6 | Received Date | Text 10 | When FMCSA got it |
| 7 | Insurance Class Code | Text 1 | P or E, when available |
| 8 | Insurance Type Code | Text 1 | Space = BI&PD, * = Not BI&PD |
| 9 | Underlying Limit Amount | Text 10 | In thousands |
| 10 | Maximum Coverage Amount | Text 10 | In thousands |
| 11 | Rejected Date | Text 10 | — |
| 13 | Insurance Branch | Text 2 | — |
| 14 | Company Name | Text 45 | — |
| 15 | Rejected Reason | Text 300 | Free text reason |
| 16 | Minimum Coverage Amount | Text 5 | In thousands |

---

## Dataset #8: Revocation

**Scope:** Authorities that have been revoked by FMCSA.

**What's in it:** Which entity (DOT/docket), what type of authority was revoked (common, contract, or broker), the serve date (when the first revocation letter was sent), the revocation type, and the effective date.

| # | Field | Format | Notes |
|---|-------|--------|-------|
| 1 | Docket Number | Text 8 | — |
| 2 | USDOT Number | Text 8 | — |
| 3 | Operating Authority Registration Type | VARCHAR 128 | common, contract, or broker |
| 4 | Serve Date | Text 10 | First revocation letter sent |
| 5 | Revocation Type | Text 60 | Type of revocation action |
| 6 | Effective Date | Text 10 | When revocation takes effect |

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
| 91 / 91X | BI&PD / BI&PD Primary / BI&PD Excess |
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 85C | BMC Cancellation for Trust Funds |

### Docket Number Prefixes

| Prefix | Entity Type |
|--------|------------|
| MC | Motor Carrier |
| FF | Freight Forwarder |
| MX | Mexican Carrier |

---

## Disclaimer

These datasets are provided as a public service by FMCSA. They are point-in-time snapshots of constantly changing data, provided for informational purposes only. They do not constitute legal contracts or legal advice, and FMCSA accepts no liability for any damage or loss arising from their use.