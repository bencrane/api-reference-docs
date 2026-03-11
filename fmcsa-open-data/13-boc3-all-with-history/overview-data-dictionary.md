# FMCSA Dataset Description and Data Definitions

> **Source:** U.S. Department of Transportation — Federal Motor Carrier Safety Administration (FMCSA)
> **Catalog:** [DOT Open Data Catalog](https://data.transportation.gov)
> **Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

This document describes **16 datasets** published by FMCSA on the Department of Transportation's Open Data Catalog. These datasets contain registration, authority, insurance, and compliance records for **motor carriers, brokers, and freight forwarders** operating in the United States.

The data is used by regulators, insurance companies, brokers, and third-party services to verify carrier authority status, insurance compliance, and historical operating records.

---

## Naming Conventions

Every dataset comes in two variants:

| Variant | Pattern | What It Contains |
|---------|---------|-----------------|
| **Daily Difference** | `[Dataset Name]` | Only records updated or added since the previous run. May include related records for completeness. |
| **Full / Baseline** | `[Dataset Name] – All With History` | All records including historical values as of the latest update. |

---

## Dataset-by-Dataset Breakdown

### 1. Carrier (43 fields)

The most comprehensive dataset. Contains a record for every carrier/broker/freight forwarder with active, inactive, or pending common or contract authorities.

**What's in it:**

- **Identifiers:** Docket Number (MC/FF/MX format, 8 chars), USDOT Number (8 chars)
- **Mexican carrier fields:** MX Type (X = operate throughout US, Z = commercial zones only), RFC Number (Mexican government registration)
- **Authority status** for Common, Contract, and Broker — each has three sub-fields:
  - Current status: A (Active), I (Inactive), N (None)
  - Pending application: Y/N
  - In revocation: Y/N
- **Cargo type flags:** Property, Passenger, Household Goods (all Y/N)
- **Private Check / Enterprise Check:** Y/N flags
- **Insurance requirements and on-file status:**
  - BIPD Required (amount in thousands) and BIPD on File (amount in thousands)
  - Cargo Required/On File (Y/N)
  - Bond/Surety Required/On File (Y/N)
- **Address status:** Y = Deliverable, N = Undeliverable
- **Entity names:** DBA Name (60 chars), Legal Name (120 chars)
- **Company Business Address:** PO Box/Street, Colonia, City, State, Country, Zip, Phone, Fax
- **Company Mailing Address:** Same structure as business address

**Key insight:** This is the go-to dataset for building a carrier universe. You get authority status, insurance compliance signals, and full contact/address data in a single record per entity.

---

### 2. Insur (9 fields)

Active or pending individual insurance policies for carriers/brokers/freight forwarders. Entities can have **multiple records** (one per policy). Linked to entities via Docket Number.

**What's in it:**

- **Docket Number** as the join key
- **Insurance Type:** 1 = BI&PD, 2 = Cargo, 3 = Bond, 4 = Trust Fund
- **BI&PD Class:** P = Primary, E = Excess, 1 = Full Security Under §1043.2(b)(1), 2 = Full Security Under §1043.2(b)(2)
- **BI&PD Maximum Dollar Limit** and **Underlying Dollar Limit** (both in thousands) — only populated for Insurance Type 1 (BI&PD); types 2/3/4 show 0
- **Policy Number**, **Effective Date**, **Form Code**, **Insurance Company Name**

**Form Code values** (shared across multiple datasets): 34 = Cargo, 82 = BI&PD, 83 = Cargo, 84 = Property Broker's Surety Bond, 85 = Property Broker's Trust Fund Agreement, 91/91X = BI&PD variants

**Daily difference note:** Policy removals appear as blank records — only the docket number is populated; everything else is empty or "00000."

---

### 3. ActPendInsur (11 fields)

Detailed lifecycle dates for active or pending insurance policies: when FMCSA received it (Posted Date), when it takes effect (Effective Date), and when it cancels (Cancel Effective Date).

**What's in it:**

- **Docket Number + USDOT Number** (both identifiers)
- **Form Code** with the same values as above
- **Insurance Type Description** (human-readable label)
- **Insurance Company Name**, **Policy Number**
- **Posted Date** (when FMCSA received the filing)
- **BI&PD Underlying Limit** and **BI&PD Maximum Limit** (in thousands) — only for BI&PD form codes (91, 91X, 82); others show 0
- **Effective Date** and **Cancel Effective Date**

**Key insight:** This is the dataset for tracking insurance policy timing — when coverage starts, when it's scheduled to cancel, and when FMCSA received the filing. Critical for detecting carriers about to lose coverage.

---

### 4. AuthHist (9 fields)

Full history of every authority ever granted to a carrier/broker/freight forwarder. Shows both the original action (e.g., "granted") and the final action (e.g., "revoked"). Multiple records per entity if they hold/held multiple authorities.

**What's in it:**

- **Docket Number + USDOT Number**
- **Sub Number** (action sequence; rarely used)
- **Operating Authority Type** (VARCHAR 128)
- **Original Authority Action Description** + **Served Date** (when the initial action was executed)
- **Final Authority Action Description** + **Decision Date** + **Served Date** (when the final action was determined and became effective)

**Key insight:** Use this to reconstruct the full authority lifecycle of any entity — when they were granted, when/if they were revoked, and the timeline in between.

---

### 5. BOC3 (9 fields)

Records for BOC3 process agents. Every entity must designate a BOC3 agent (or act as their own) to handle legal service of process as a condition of obtaining operating authority.

**What's in it:**

- **Docket Number + USDOT Number**
- **Company Name** of the process agent (60 chars)
- **Attention to or Title** (contact person, 45 chars)
- **Address fields:** Street/PO Box, City, State, Country, Zip Code

**Note:** Field position 3 is skipped in the original schema (jumps from 2 to 4).

**Key insight:** Useful for identifying who represents a carrier legally, and for detecting patterns in which process agent companies service large numbers of carriers.

---

### 6. InsHist (16 fields, positions skip #16)

Historical insurance records — policies that have been **cancelled, replaced, name-changed, or transferred**. All data refers to the outgoing policy, NOT the replacement.

**What's in it:**

- **Docket Number + USDOT Number**
- **Form Code** (same values as other insurance datasets)
- **Cancellation Method:** "cancelled", "replaced", "name change", or "transferred"
- **Cancel/Replace/Name Change/Transfer Form:** The form that executed the action
  - Cancelled: 35 (BMC Cancellation), 36 (BMC Surety Bond Cancellation), 85C (Trust Fund Cancellation)
  - Replaced: Uses same form codes as field 3
  - Name Change: "NC"
  - Transferred: "TR"
- **Insurance Type Indicator:** Space = BIPD, Asterisk (*) = Not BIPD
- **Insurance Type Description**, **Policy Number**
- **Minimum Coverage Amount** (required minimum, in thousands)
- **Insurance Class Code:** P = Primary, E = Excess
- **Effective Date** and **Cancel Effective Date**
- **BI&PD Underlying Limit Amount** (for Excess policies, this is the primary insurance value)
- **BI&PD Max Coverage Amount** (in thousands)
- **Specific Cancellation Method:** TERM/CANCL = cancelled by FMCSA, Term/REPL = replaced by new policy
- **Insurance Company Branch** (2-char code) and **Insurance Company Name**

**Key insight:** This is the churn signal dataset. Track which carriers are constantly replacing policies, which insurers are losing business, and which carriers have had coverage cancelled by FMCSA directly (TERM/CANCL).

---

### 7. Rejected (16 fields, positions skip #12)

Insurance forms that FMCSA rejected. Contains the rejection date and reason.

**What's in it:**

- **Docket Number + USDOT Number**
- **Form Code** (includes both insurance AND cancellation form codes: 34, 35, 36, 82, 83, 84, 85, 85C, 91, 91X)
- **Insurance Type Description**, **Policy Number**
- **Received Date** (when FMCSA got the form)
- **Insurance Class Code** (P/E when available)
- **Insurance Type Code:** Space = BI&PD, Asterisk = Not BI&PD
- **Underlying Limit Amount** and **Maximum Coverage Amount** (in thousands)
- **Rejected Date** (when the form was rejected)
- **Insurance Branch** (2-char) and **Company Name**
- **Rejected Reason** (up to 300 characters — e.g., "Policy is already cancelled")
- **Minimum Coverage Amount** (required minimum, in thousands)

**Key insight:** Rejection records are a compliance signal. Frequent rejections for a carrier may indicate poor administrative practices or intentional non-compliance. The rejection reason text field is particularly valuable for categorizing failure modes.

---

### 8. Revocation (6 fields)

Authorities that FMCSA has revoked. Straightforward and compact.

**What's in it:**

- **Docket Number + USDOT Number**
- **Operating Authority Registration Type:** common, contract, or broker (VARCHAR 128)
- **Serve Date:** When the first revocation letter was sent
- **Revocation Type:** The type of revocation action (60 chars)
- **Effective Date:** When the revocation takes effect

**Key insight:** This is the enforcement action dataset. Revocations are the most severe regulatory outcome, and tracking the gap between serve date and effective date reveals the revocation timeline.

---

## Common Data Patterns Across Datasets

**Docket Number** (Text 8) appears in every dataset and follows the format MC000000, FF000000, or MX000000. This is the primary join key across datasets.

**USDOT Number** (Text 8) appears in most datasets (not in Insur) and is the official registration number for interstate motor carriers.

**Form Code** values are consistent across Insur, ActPendInsur, InsHist, and Rejected: 34 (Cargo), 82 (BI&PD), 83 (Cargo), 84 (Property Broker's Surety Bond), 85 (Property Broker's Trust Fund Agreement), 91/91X (BI&PD variants).

**Dollar amounts** are consistently stored in thousands (e.g., a value of "00750" = $750,000).

**Date fields** are all Text 10, likely in MM/DD/YYYY format.

---

## Disclaimer

FMCSA provides these datasets as a public service. The data is a point-in-time snapshot and is constantly changing. It is for informational purposes only and does not constitute legal advice. FMCSA accepts no liability for damage or loss arising from use of this data.