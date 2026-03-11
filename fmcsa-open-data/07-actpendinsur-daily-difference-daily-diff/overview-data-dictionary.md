# FMCSA Dataset Description and Data Definitions

**Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)
**Data Catalog:** [https://data.transportation.gov](https://data.transportation.gov)
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document defines 16 FMCSA datasets published on the DOT's Open Data Catalog. These datasets cover carrier/broker/freight forwarder registration, operating authority, insurance policies, BOC3 agents, insurance history, rejected forms, and authority revocations.

---

## Naming Conventions

Every dataset comes in two variants:

- **`[Dataset Name]`** — "Daily Difference" dataset. Contains only records updated or added since the previous run. In some cases, it includes all related records for the entity for completeness.
- **`[Dataset Name] – All With History`** — "Full/Baseline" dataset. Contains all records including historical values as of the latest update.

---

## Dataset 1: Carrier

**Variants:** `Carrier` | `Carrier – All With History`

Contains records for all carriers, brokers, and freight forwarders with active, inactive, or pending common/contract authorities. This is the core entity-level dataset with 43 fields covering:

- **Identity:** Docket Number (MC/FF/MX format), USDOT Number, MX Type (Mexican carrier designation), RFC Number
- **Authority Status:** Common, Contract, and Broker authority (Active/Inactive/None), plus pending application flags and revocation flags for each
- **Carrier Type Flags:** Property, Passenger, Household Goods, Private Check, Enterprise Check
- **Insurance Requirements vs. On-File:** BIPD required amount vs. on file amount (in thousands), Cargo required/on file, Bond/Surety required/on file
- **Entity Info:** DBA Name (60 chars), Legal Name (120 chars), Address Status (deliverable Y/N)
- **Business Address:** PO Box/Street, Colonia, City, State, Country, Zip, Telephone, Fax
- **Mailing Address:** Same structure as business address (fields 36–43)

**Key detail:** Dollar amounts for BIPD are in thousands. The Address Status field indicates whether USPS considers the address deliverable.

---

## Dataset 2: Insur

**Variants:** `Insur` | `Insur – All With History`

Contains active or pending individual insurance policy records, linked to entities by docket number. A single entity can have multiple policies (multiple rows).

**9 fields:**
- Docket Number, Insurance Type (1=BI&PD, 2=Cargo, 3=Bond, 4=Trust Fund), BI&PD Class (Primary/Excess/Section 1043.2 variants), Max Dollar Limit, Underlying Dollar Limit, Policy Number, Effective Date, Form Code, Insurance Company Name

**Important notes:**
- Only Insurance Type 1 (BI&PD) has dollar amounts populated in fields 4 and 5. Types 2-4 show 0.
- The daily difference variant shows policy removals as blank records (only docket number populated, rest empty/zeros).
- Form codes: 34=Cargo, 82=BI&PD, 83=Cargo, 84=Property Broker's Surety Bond, 85=Property Broker's Trust Fund, 91/91X=BI&PD variants.

---

## Dataset 3: ActPendInsur

**Variants:** `ActPendInsur` | `ActPendInsur – All With History`

Focuses on the **implementation timeline** of active/pending insurance policies — the posted date (when FMCSA received it), effective date, and cancel effective date.

**11 fields:**
- Docket Number, USDOT Number, Form Code, Insurance Type Description, Insurance Company Name, Policy Number, Posted Date, BI&PD Underlying Limit, BI&PD Maximum Limit, Effective Date, Cancel Effective Date

**Important notes:**
- Dollar amounts only apply to Form Codes 91, 91X, and 82 (BI&PD). For codes 34, 83, 84, and 85, limit fields show 0.
- This is the dataset to use when tracking **when** insurance was posted, went active, or was cancelled.

---

## Dataset 4: AuthHist

**Variants:** `AuthHist` | `AuthHist – All With History`

Tracks the **full lifecycle** of each operating authority granted to an entity — from original action (e.g., "granted") through final action (e.g., "revoked").

**9 fields:**
- Docket Number, USDOT Number, Sub Number (sequence, rarely used), Operating Authority Type, Original Authority Action Description, Original Authority Action Served Date, Final Authority Action Description, Final Authority Decision Date, Final Authority Served Date

**Key detail:** Multiple rows per entity possible since a single carrier can hold multiple authority types with separate histories.

---

## Dataset 5: BOC3

**Variants:** `BOC3` | `BOC3 – All With History`

Records for BOC3 process agents — every entity must hire a BOC3 agent for legal representation to obtain operating authority. Some entities act as their own agent.

**9 fields (note: #3 is skipped in original):**
- Docket Number, USDOT Number, Company Name, Attention to/Title, Street or PO Box, City, State, Country, Zip Code

**Key detail:** This dataset is useful for identifying the registered agent and their physical address for each carrier.

---

## Dataset 6: InsHist

**Variants:** `InsHist` | `InsHist – All With History`

Historical insurance policy records — specifically for policies that were **cancelled, replaced, name-changed, or transferred**. All data relates to the outgoing policy, not the replacement.

**16 fields (note: #16 is skipped in original numbering):**
- Docket Number, USDOT Number, Form Code, Cancellation Method, Cancel/Replace/Name Change/Transfer Form, Insurance Type Indicator (space=BIPD, asterisk=not BIPD), Insurance Type Description, Policy Number, Minimum Coverage Amount, Insurance Class Code (P/E), Effective Date, BI&PD Underlying Limit Amount, BI&PD Max Coverage Amount, Cancel Effective Date, Specific Cancellation Method (TERM/CANCL or Term/REPL), Insurance Company Branch, Insurance Company Name

**Cancellation form codes:**
- 35 = BMC Cancellation Form
- 36 = BMC Surety Bond Cancellation Form
- 85C = BMC Cancellation for Trust Funds
- NC = Name Change
- TR = Transferred

**Key detail:** The Specific Cancellation Method distinguishes between FMCSA-initiated cancellations (TERM/CANCL) and replacements triggered by new policy submissions (Term/REPL).

---

## Dataset 7: Rejected

**Variants:** `Rejected` | `Rejected – All With History`

Insurance forms that FMCSA rejected, along with the rejection reason (e.g., "Policy is already cancelled").

**15 fields (note: #12 is skipped in original numbering):**
- Docket Number, USDOT Number, Form Code (includes both insurance and cancellation form codes), Insurance Type Description, Policy Number, Received Date, Insurance Class Code, Insurance Type Code, Underlying Limit Amount, Maximum Coverage Amount, Rejected Date, Insurance Branch, Company Name, Rejected Reason (up to 300 chars), Minimum Coverage Amount

**Key detail:** The Form Code field here includes cancellation form codes (35, 36, 85C) in addition to the standard insurance form codes, since cancellation forms can also be rejected.

---

## Dataset 8: Revocation

**Variants:** `Revocation` | `Revocation – All With History`

Records of operating authorities that FMCSA has revoked.

**6 fields:**
- Docket Number, USDOT Number, Operating Authority Registration Type (common/contract/broker), Serve Date (when first revocation letter was sent), Revocation Type, Effective Date

**Key detail:** The Serve Date is when the entity was notified; the Effective Date is when the revocation took effect.

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
| 91, 91X | BI&PD, BI&PD/Primary, BI&PD/Excess |

Additional codes in InsHist and Rejected:

| Code | Meaning |
|------|---------|
| 35 | BMC Cancellation Form |
| 36 | BMC Surety Bond Cancellation Form |
| 85C | BMC Cancellation for Trust Funds |

---

## Common Reference: Docket Number Format

All datasets use Docket Number as the primary entity identifier in one of three formats:
- **MC000000** — Motor Carrier
- **FF000000** — Freight Forwarder
- **MX000000** — Mexican Carrier

The USDOT Number is the official FMCSA registration number for all interstate motor carriers and appears as a secondary identifier in most datasets.

---

## Disclaimer

FMCSA provides these datasets as a public service. The data is a point-in-time snapshot, constantly changing, provided for informational purposes only, and does not constitute legal advice or a legal contract. FMCSA assumes no liability for damages resulting from use of this data.