# FMCSA Revocation Dataset — Daily Difference

## Overview

The **Revocation** dataset is published by the **Federal Motor Carrier Safety Administration (FMCSA)** on the U.S. Department of Transportation's Open Data Catalog ([data.transportation.gov](https://data.transportation.gov)).

It contains records of operating authorities that FMCSA has **revoked** from carriers, brokers, and freight forwarders. When an entity loses its authority to operate — typically due to insurance lapses, safety violations, or other regulatory non-compliance — a revocation record is created in this dataset.

## Daily Difference vs. Full Baseline

This document covers the **Daily Difference** variant:

- **Revocation (Daily Difference):** Only includes records that have been updated or added since the previous day's dataset run. In some cases, it may also include related records for the same entity even if the specific revocation data wasn't what changed, provided for completeness.
- **Revocation – All With History (Full Baseline):** Contains the complete set of all revocation records, including historical data, as of the latest update.

## Update Schedule

All FMCSA datasets in this family are targeted for **daily updates by 9:30 AM US Eastern Time**.

---

## Field Definitions

The dataset contains **6 fields** per record:

### 1. Docket Number
- **Format:** Text, 8 characters
- **Description:** The unique FMCSA identifier assigned to for-hire motor carriers. Follows the pattern `MC000000` (motor carrier), `FF000000` (freight forwarder), or `MX000000` (Mexican carrier).
- **Usage:** This is the primary FMCSA "account number" for the entity's operating authority. It links across all FMCSA datasets (Carrier, Insur, ActPendInsur, AuthHist, BOC3, InsHist, Rejected, and Revocation).

### 2. USDOT Number
- **Format:** Text, 8 characters
- **Description:** The official FMCSA registration number assigned to all interstate motor carriers. While the Docket Number identifies the authority, the USDOT Number identifies the physical operating entity.
- **Usage:** Can be used to cross-reference with the Carrier dataset and other DOT/FMCSA systems like SAFER.

### 3. Operating Authority Registration Type
- **Format:** VARCHAR, up to 128 characters
- **Description:** Identifies which type of operating authority was revoked. The three possible authority types are:
  - **Common** — Authority to transport goods or passengers for the general public
  - **Contract** — Authority to transport goods under specific contracts with shippers
  - **Broker** — Authority to arrange transportation of goods without actually carrying them
- **Note:** A single entity can hold multiple authority types, so multiple revocation records may exist for the same Docket/USDOT Number if more than one authority was revoked.

### 4. Serve Date
- **Format:** Text, 10 characters (date)
- **Description:** The date FMCSA sent the **first revocation letter** to the entity. This is when the entity was officially notified that revocation proceedings had begun.
- **Significance:** This marks the start of the revocation process. There is typically a grace period between the serve date and the effective date during which the entity can take corrective action (e.g., reinstating insurance).

### 5. Revocation Type
- **Format:** Text, up to 60 characters
- **Description:** Describes the specific type or reason for the revocation action. Common reasons include insurance non-compliance, failure to maintain a BOC-3 process agent, or safety-related enforcement actions.

### 6. Effective Date
- **Format:** Text, 10 characters (date)
- **Description:** The date the revocation officially takes effect. After this date, the entity no longer holds the specified operating authority and cannot legally operate under it.

---

## How Records Relate to Other FMCSA Datasets

The Revocation dataset is part of a broader family of 16 FMCSA datasets. Key relationships:

- **Carrier dataset:** Contains the master record for each entity including all authority statuses, address, insurance summary flags, and census data. The Carrier dataset's `Common Authority Revocation`, `Contract Authority Revocation`, and `Broker Authority Revocation` flags (Y/N) reflect whether an entity is currently in revocation — the Revocation dataset provides the details (dates, type, reason).
- **AuthHist dataset:** Tracks the full lifecycle of each authority from grant through revocation. If an authority was revoked, the AuthHist record will show the final authority action and dates.
- **InsHist / Insur / ActPendInsur datasets:** Insurance lapses are a primary driver of revocations. These datasets show the insurance policies (current and historical) that may have triggered the revocation.
- **BOC3 dataset:** Failure to maintain a registered process agent (BOC-3 filing) can also lead to authority revocation.

All datasets are linked via **Docket Number** and **USDOT Number**.

---

## Practical Use Cases

- **Insurance brokers/agents:** Monitor which carriers are entering revocation to identify sales opportunities for reinstating coverage.
- **Shippers and freight brokers:** Verify that carriers they work with have not had their authority revoked.
- **Compliance teams:** Track revocation trends across their book of business.
- **Data enrichment:** Combine with Carrier and insurance datasets to build a complete picture of a motor carrier's regulatory health.

---

## Content Disclaimer

This data is provided as a public service by FMCSA to enhance public access to information. The datasets are point-in-time snapshots and are constantly changing. All information is for informational purposes only and does not constitute legal advice or a legal contract. FMCSA is not liable for any damage or loss related to the use of this data.