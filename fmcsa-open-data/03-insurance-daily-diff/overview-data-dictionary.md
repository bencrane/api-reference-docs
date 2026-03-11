# FMCSA Insurance (Insur) Dataset — Daily Difference

## Overview

The **Insur** dataset is published by the **Federal Motor Carrier Safety Administration (FMCSA)** on the U.S. Department of Transportation's Open Data Catalog ([data.transportation.gov](https://data.transportation.gov)).

It contains records for **active or pending individual insurance policies** held by carriers, brokers, and freight forwarders. Each record represents a single insurance policy, and since entities can hold multiple policies simultaneously (e.g., a BI&PD policy plus a cargo policy plus a surety bond), there will often be **multiple records per entity**.

Records are linked to entities via the **Docket Number**.

## Daily Difference vs. Full Baseline

- **Insur (Daily Difference):** Only includes insurance policy records that have been updated or added since the previous day's run. **Policy removals** are represented as "blank" records — the Docket Number is populated but all other fields are empty or show "00000" values. This is how you detect that a policy was dropped.
- **Insur – All With History (Full Baseline):** Contains all active/pending insurance policy records as of the latest update.

## Update Schedule

Updated **daily by 9:30 AM US Eastern Time**.

---

## Field Definitions

The dataset contains **9 fields** per record:

### 1. Docket Number
- **Format:** Text, 8 characters
- **Description:** The unique FMCSA identifier for for-hire motor carriers. Patterns include `MC000000` (motor carrier), `FF000000` (freight forwarder), and `MX000000` (Mexican carrier).
- **Usage:** This is the join key that links insurance records to the entity in the Carrier dataset and across all other FMCSA datasets.

### 2. Insurance Type
- **Format:** Text, 1 character
- **Description:** Identifies the category of insurance policy:
  - **1** = BI&PD (Bodily Injury & Property Damage) — the primary liability coverage required for motor carriers
  - **2** = Cargo — covers damage to goods being transported
  - **3** = Bond — a surety bond, typically required for property brokers
  - **4** = Trust Fund — a trust fund agreement, an alternative to a surety bond for brokers
- **Important:** Only Insurance Type 1 (BI&PD) will have non-zero dollar amounts in fields #4 and #5. For types 2, 3, and 4, those fields will be 0 because they are not BI&PD policies.

### 3. BI&PD Class
- **Format:** Text, 1 character
- **Description:** Classifies the BI&PD insurance policy tier:
  - **P** = Primary coverage
  - **E** = Excess coverage (sits on top of primary)
  - **1** = Full Security Limits Under Section 1043.2(b)(1)
  - **2** = Full Security Limits Under Section 1043.2(b)(2)
- **Context:** Carriers often carry both a primary and excess BI&PD policy. The primary policy covers up to its limit, and the excess policy covers amounts above that threshold. Sections 1043.2(b)(1) and (b)(2) refer to specific regulatory provisions governing required coverage levels.

### 4. BI&PD Maximum Dollar Limit
- **Format:** Text, 5 characters
- **Description:** The maximum dollar amount the insurance company is liable for under this policy, expressed **in thousands**. For example, a value of `01000` means $1,000,000.
- **Applicability:** Only populated for Insurance Type 1 (BI&PD). Will be `00000` for Cargo, Bond, and Trust Fund policies.

### 5. BI&PD Underlying Dollar Limit
- **Format:** Text, 5 characters
- **Description:** The underlying dollar limit for the BI&PD policy, expressed **in thousands**. For excess policies, this represents the threshold above which the excess coverage begins.
- **Applicability:** Only populated for Insurance Type 1 (BI&PD). Will be `00000` for other types.

### 6. Policy Number
- **Format:** Text, 25 characters
- **Description:** The specific identifier for the insurance policy, assigned by the insurance company. Useful for cross-referencing with insurance company records or for tracking policy changes over time.

### 7. Effective Date
- **Format:** Text, 10 characters (date)
- **Description:** The date the insurance policy became effective. This is when coverage began under the policy.

### 8. Form Code
- **Format:** Text, 3 characters
- **Description:** The FMCSA form code that identifies the type of insurance filing:
  - **34** = Cargo
  - **82** = BI&PD
  - **83** = Cargo
  - **84** = Property Broker's Surety Bond
  - **85** = Property Broker's Trust Fund Agreement
  - **91** = BI&PD
  - **91X** = BI&PD/Primary or BI&PD/Excess
- **Note:** Form codes 34 and 83 both represent cargo insurance but via different filing forms. Similarly, 82, 91, and 91X all relate to BI&PD but represent different form variants. The 91X form specifically distinguishes between primary and excess BI&PD coverage.

### 9. Insurance Company Name
- **Format:** Text, 45 characters
- **Description:** The name of the insurance company that issued the policy. Note that the policy may be administered day-to-day by a branch office with a different name than what appears here.

---

## How to Detect Policy Removals (Daily Difference Only)

In the Daily Difference variant, when an insurance policy is removed from an entity, the dataset does **not** simply omit the record. Instead, it includes a "blank" record where only the Docket Number is populated and all other fields are empty or contain placeholder values like `00000`. This is the signal that a previously active policy has been removed.

When consuming the daily diff programmatically, you should check for these blank records and treat them as deletion events.

---

## How Records Relate to Other FMCSA Datasets

The Insur dataset is one of several insurance-related datasets in the FMCSA family:

- **Carrier dataset:** Contains summary-level insurance flags for each entity — fields like `BIPD on File` (Y/N), `Cargo on File` (Y/N), and `Bond/Surety on File` (Y/N) plus the aggregate BIPD amounts required and on file. The Insur dataset provides the **individual policy-level detail** behind those summary flags.
- **ActPendInsur dataset:** Provides additional date information for active/pending policies — specifically the Posted Date (when FMCSA received the filing), the Effective Date, and the Cancel Effective Date. It also includes the USDOT Number, which the Insur dataset does not.
- **InsHist dataset:** Contains **historical** (cancelled/replaced/transferred) insurance policies. If a policy disappears from the Insur dataset, its termination details will appear in InsHist, including the cancellation method and dates.
- **Rejected dataset:** Contains insurance filings that FMCSA rejected, along with the rejection reason and date.

All datasets are linked via **Docket Number**. To get a complete picture of an entity's insurance posture, you'd typically join Insur (current policies) with InsHist (past policies) and ActPendInsur (date details) on Docket Number.

---

## Practical Use Cases

- **Insurance compliance monitoring:** Detect carriers whose BI&PD coverage drops below required minimums by comparing `BIPD Required` from the Carrier dataset against the actual policy limits in this dataset.
- **Insurance broker prospecting:** Identify carriers with expiring or recently removed policies (blank records in daily diff) as potential leads for new coverage.
- **Carrier vetting:** Before engaging a carrier, verify they have current BI&PD, Cargo, and Bond/Surety coverage on file at the required levels.
- **Insurance market intelligence:** Analyze which insurance companies are writing the most policies for motor carriers, and track policy churn over time.
- **Revocation early warning:** Carriers that lose insurance coverage are at risk of authority revocation. Monitoring policy removals in this dataset can provide advance warning before a revocation appears in the Revocation dataset.

---

## Content Disclaimer

This data is provided as a public service by FMCSA to enhance public access to information. The datasets are point-in-time snapshots and are constantly changing. All information is for informational purposes only and does not constitute legal advice or a legal contract. FMCSA is not liable for any damage or loss related to the use of this data.