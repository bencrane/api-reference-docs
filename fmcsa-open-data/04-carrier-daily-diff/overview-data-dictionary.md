# FMCSA Carrier Dataset — Daily Difference

## Overview

The **Carrier** dataset is the master entity record published by the **Federal Motor Carrier Safety Administration (FMCSA)** on the U.S. Department of Transportation's Open Data Catalog ([data.transportation.gov](https://data.transportation.gov)).

It contains **one record per carrier, broker, or freight forwarder** — every entity that holds, has held, or has pending operating authority (common, contract, or broker). This is the central dataset in the FMCSA family; all other datasets (Insur, ActPendInsur, AuthHist, BOC3, InsHist, Rejected, Revocation) link back to it via Docket Number.

Each record is a comprehensive snapshot of the entity's identity, authority status, insurance posture, and contact information.

## Daily Difference vs. Full Baseline

- **Carrier (Daily Difference):** Only includes entity records that have been updated or added since the previous day's run. May also include records for entities where a related change occurred in another dataset (e.g., insurance change), provided for completeness.
- **Carrier – All With History (Full Baseline):** Contains all entity records as of the latest update.

## Update Schedule

Updated **daily by 9:30 AM US Eastern Time**.

---

## Field Definitions

The dataset contains **43 fields** organized into logical groups:

---

### Identifiers (Fields 1–4)

#### 1. Docket Number
- **Format:** Text, 8 characters
- **Description:** The unique FMCSA identifier for for-hire motor carriers. Patterns: `MC000000` (motor carrier), `FF000000` (freight forwarder), `MX000000` (Mexican carrier).
- **Usage:** Primary join key across all FMCSA datasets.

#### 2. USDOT Number
- **Format:** Text, 8 characters
- **Description:** The official FMCSA registration number for all interstate motor carriers. While the Docket Number identifies the operating authority, the USDOT Number identifies the physical operating entity.
- **Usage:** Can be used to cross-reference with SAFER, SMS, and other DOT systems.

#### 3. MX Type
- **Format:** Text, 1 character
- **Description:** Only populated for Mexican carriers. Distinguishes the scope of their US operating authority:
  - **X** = OP-1 (authorized to operate throughout the US)
  - **Z** = OP-2 (restricted to commercial zones along the border)

#### 4. RFC Number
- **Format:** Text, 17 characters
- **Description:** The Mexican Government's Registro Federal de Contribuyentes (tax registration code) for Mexican carriers. Only populated for Mexican entities.

---

### Authority Status (Fields 5–7)

These three fields show the **current status** of each authority type the entity may hold.

#### 5. Common Authority
#### 6. Contract Authority
#### 7. Broker Authority

All three share the same value set:
- **A** = Holds Active Authority
- **I** = Inactive Authority
- **N** = No Authority

**Common authority** allows transport of goods/passengers for the general public. **Contract authority** allows transport under specific shipper contracts. **Broker authority** allows arranging transportation without physically carrying goods.

An entity can hold any combination of these three authority types simultaneously.

---

### Pending Authority (Fields 8–10)

#### 8. Pending Common Authority
#### 9. Pending Contract Authority
#### 10. Pending Broker Authority

All three use Y/N values indicating whether an application for the respective authority type is currently pending with FMCSA.

---

### Revocation Flags (Fields 11–13)

#### 11. Common Authority Revocation
#### 12. Contract Authority Revocation
#### 13. Broker Authority Revocation

All three use Y/N values indicating whether the respective authority is **currently in revocation proceedings**. These are summary flags — the detailed revocation records (serve date, revocation type, effective date) are in the **Revocation** dataset.

---

### Operations Type (Fields 14–18)

These flags describe what the entity is authorized or registered to do:

#### 14. Property
- Y/N — Authorized to transport property (freight)

#### 15. Passenger
- Y/N — Authorized to transport passengers

#### 16. Household Goods
- Y/N — Authorized to transport household goods (moving companies)

#### 17. Private Check
- Y/N — Flagged as a private carrier (transports own goods, not for-hire)

#### 18. Enterprise Check
- Y/N — Flagged as an enterprise carrier

---

### Insurance — Required (Fields 19–21)

These fields show what insurance the entity is **required** to maintain based on their authority type and operations:

#### 19. BIPD Required
- **Format:** Text 5 (amount in thousands)
- The required level of Bodily Injury & Property Damage insurance. For example, `00750` means $750,000 is required. The required amount depends on the type of cargo (general freight, hazmat, passenger, etc.).

#### 20. Cargo Required
- Y/N — Whether cargo insurance is required.

#### 21. Bond/Surety Required
- Y/N — Whether a surety bond or trust fund is required (typically for brokers).

---

### Insurance — On File (Fields 22–24)

These fields show what insurance the entity **actually has on file** with FMCSA:

#### 22. BIPD on File
- **Format:** Text 5 (amount in thousands)
- The actual BI&PD insurance amount currently on file. Compare against field #19 (BIPD Required) to check compliance. If BIPD on File < BIPD Required, the entity is under-insured.

#### 23. Cargo on File
- Y/N — Whether cargo insurance is currently on file.

#### 24. Bond/Surety on File
- Y/N — Whether a bond or surety is currently on file.

**Key insight:** Comparing the "Required" fields (#19–21) against the "On File" fields (#22–24) is the fastest way to identify entities with insurance compliance gaps — a primary trigger for revocation proceedings.

---

### Entity Information (Fields 25–27)

#### 25. Address Status
- **Y** = Deliverable (USPS-verified)
- **N** = Undeliverable

#### 26. DBA Name
- **Format:** Text, 60 characters
- The entity's "Doing Business As" trade name.

#### 27. Legal Name
- **Format:** Text, 120 characters
- The entity's full legal/registered name.

---

### Company Business Address (Fields 28–35)

The physical business location of the entity:

| # | Field | Format |
|---|-------|--------|
| 28 | PO Box/Street | Text 50 |
| 29 | Colonia | Text 30 (Mexican addresses) |
| 30 | City | Text 30 |
| 31 | State Code | Text 2 |
| 32 | Country Code | Text 2 |
| 33 | Zip Code | Text 10 |
| 34 | Telephone Number | Text 14 (if on file) |
| 35 | Fax Number | Text 14 (if on file) |

---

### Company Mailing Address (Fields 36–43)

The mailing address for the entity (may differ from business address):

| # | Field | Format |
|---|-------|--------|
| 36 | PO Box/Street | Text 50 |
| 37 | Colonia | Text 30 (Mexican addresses) |
| 38 | City | Text 30 |
| 39 | State Code | Text 2 |
| 40 | Country Code | Text 2 |
| 41 | Zip Code | Text 10 |
| 42 | Telephone Number | Text 14 (if on file) |
| 43 | Fax Number | Text 14 (if on file) |

---

## How Records Relate to Other FMCSA Datasets

The Carrier dataset is the **hub** of the FMCSA data model. Every other dataset links to it:

- **Insur** — Individual active/pending insurance policies. The Carrier's summary insurance flags (#19–24) are the aggregate view; Insur has the policy-level detail.
- **ActPendInsur** — Date details for active/pending policies (posted date, effective date, cancel effective date). Supplements Insur with timing data.
- **InsHist** — Historical/cancelled insurance policies. Shows the full insurance history for the entity.
- **AuthHist** — Full authority lifecycle. Shows how each authority was granted, modified, or revoked over time. The Carrier's authority status fields (#5–7) are the current snapshot; AuthHist has the complete history.
- **BOC3** — Process agent filings. Every entity with operating authority must have a BOC-3 agent on file.
- **Revocation** — Detailed revocation records. The Carrier's revocation flags (#11–13) are summary Y/N indicators; the Revocation dataset has serve dates, revocation types, and effective dates.
- **Rejected** — Insurance filings that FMCSA rejected, with rejection reasons and dates.

All datasets join on **Docket Number** as the primary key. **USDOT Number** is available in most datasets as an alternate identifier.

---

## Practical Use Cases

- **Carrier compliance screening:** Compare BIPD Required vs. BIPD on File, check Cargo and Bond/Surety flags, and verify no authority is in revocation — all from a single record.
- **New authority detection:** Filter the daily diff for entities with Pending Authority = Y and no active authority yet to identify newly applying carriers/brokers.
- **Insurance gap prospecting:** Find entities where BIPD on File < BIPD Required, or where Cargo/Bond Required = Y but On File = N — these are potential insurance sales targets.
- **Revocation monitoring:** Track entities entering revocation (fields #11–13 flipping from N to Y) as early warning signals for authority loss.
- **Geographic analysis:** Use business address fields to map carrier density by state, city, or zip code.
- **Entity enrichment:** The Legal Name, DBA Name, address, and phone fields provide the contact data needed for outreach or CRM enrichment.

---

## Content Disclaimer

This data is provided as a public service by FMCSA to enhance public access to information. The datasets are point-in-time snapshots and are constantly changing. All information is for informational purposes only and does not constitute legal advice or a legal contract. FMCSA is not liable for any damage or loss related to the use of this data.