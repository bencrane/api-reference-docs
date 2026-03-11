# FMCSA InsHist Dataset — Data Definitions & Reference

**Source:** FMCSA Dataset Description and Data Definitions — Select Datasets on DOT's Open Data Catalog  
**Catalog URL:** https://data.transportation.gov  
**Update Frequency:** Daily by 9:30 AM US Eastern Time

---

## Overview

The **InsHist** dataset contains historical insurance policy records for carriers, brokers, and freight forwarders registered with FMCSA. Every record represents a **previous** (no longer active) insurance policy — one that has been cancelled, replaced, had a name change, or been transferred. This is not the current/subsequent policy.

There are two variants:

- **InsHist** — "Daily Difference" dataset. Only includes records updated or added since the previous day's run.
- **InsHist – All With History** — "Full / Baseline" dataset. Contains all historical insurance records as of the latest update.

---

## Important Note

All insurance information in this dataset relates to the policy that was **cancelled, replaced, or existed prior to a name change**. It does **not** represent the subsequent (replacement) policy, if one exists.

---

## Field Definitions

### Identifiers

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 1 | Docket Number | Text 8 | Unique FMCSA identifier for for-hire motor carriers. Formats: `MC000000`, `FF000000`, or `MX000000`. |
| 2 | USDOT Number | Text 8 | Official FMCSA registration number for all interstate motor carriers. |

### Policy Type & Form

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 3 | Form Code | Text 3 | Identifies the insurance form type. See code table below. |
| 6 | Insurance Type Indicator | Text 1 | Blank space = BI&PD; `*` = Not BI&PD (Cargo, Surety, or Trust Fund). |
| 7 | Insurance Type Description | Text 12 | Human-readable description corresponding to the Form Code. |

**Form Code values:**

| Code | Meaning |
|------|---------|
| 34 | Cargo |
| 82 | BI&PD |
| 83 | Cargo |
| 84 | Property Broker's Surety Bond |
| 85 | Property Broker's Trust Fund Agreement |
| 91 / 91X | BI&PD, BI&PD/Primary, BI&PD/Excess |

### Cancellation Details

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 4 | Cancellation Method | Text 12 | How the policy ended: `cancelled`, `replaced`, `name change`, or `transferred`. |
| 5 | Cancel/Replace/Name Change/Transfer Form | Text 6 | The form that executed the action. Cancellation codes: `35` (BMC Cancellation), `36` (BMC Surety Bond Cancellation), `85C` (BMC Cancellation for Trust Funds). Replacement codes match the Form Code values in field #3. Name change = `NC`, Transfer = `TR`. |
| 14 | Cancel Effective Date | Text 10 | Date the policy is effectively cancelled. |
| 15 | Specific Cancellation Method | Text 10 | Granular method: `TERM/CANCL` (cancelled by FMCSA) or `Term/REPL` (replaced by a new policy submission). |

### Policy Details

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 8 | Policy Number | Text 25 | Insurance policy specific identifier. |
| 10 | Insurance Class Code | Text 1 | For BI&PD form codes: `P` = Primary, `E` = Excess. |
| 11 | Effective Date | Text 10 | Effective date of the insurance policy. |

### Coverage Amounts

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 9 | Minimum Coverage Amount | Text 5 | Minimum insurance amount required for the entity, in thousands. |
| 12 | BI&PD Underlying Limit Amount | Text 10 | Amount in thousands. When class code is `E`, this is the value of the primary insurance. |
| 13 | BI&PD Max Coverage Amount | Text 10 | Maximum dollar amount covered by the policy, in thousands. |

> **Note:** Fields #12 and #13 are only meaningful for Form Codes 91, 91X, and 82 (BI&PD policies). For Form Codes 34, 83, 84, and 85, these fields will show `0`.

### Insurance Company

| # | Field | Format | Description |
|---|-------|--------|-------------|
| 17 | Insurance Company Branch | Text 2 | Branch number of the insurance company. |
| 18 | Insurance Company Name | Text 45 | Name of the insurance company. |

---

## Key Relationships

- **Docket Number** links InsHist records to the carrier/broker/freight forwarder entity across other FMCSA datasets (Carrier, Insur, ActPendInsur, etc.).
- **USDOT Number** is the universal registration identifier and can be used for cross-referencing with DOT census data.
- A single entity can have **many** InsHist records — one per historical policy event.

---

## Practical Usage Notes

- To find a carrier's full insurance timeline, query InsHist by Docket Number and sort by Effective Date and Cancel Effective Date.
- To identify carriers that recently lost coverage, look at Cancel Effective Date and Cancellation Method = `cancelled` with Specific Cancellation Method = `TERM/CANCL`.
- To detect policy churn (frequent replacements), filter for Cancellation Method = `replaced` and count occurrences per Docket Number.
- The gap between field #16 (which does not exist in the numbering — the PDF skips from 15 to 17) is an artifact of the source document's numbering.

---

## Content Disclaimer

This data is provided as a public service by FMCSA to enhance public access to information. It is a point-in-time snapshot, constantly changing, and is for informational purposes only. It does not constitute legal advice or a legal contract.