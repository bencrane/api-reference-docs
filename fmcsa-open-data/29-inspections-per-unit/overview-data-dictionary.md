# MCMIS Vehicle Inspection Data Set Dictionary

**Source:** FMCSA MCMIS Vehicle Inspection File Data Dictionary
**Revision:** 5 | **Date:** October 15, 2025 | **Pages:** 84

---

## What Is This Document?

This is the official data dictionary for the **Motor Carrier Management Information System (MCMIS) Vehicle Inspection Data Set**, maintained by the **Federal Motor Carrier Safety Administration (FMCSA)**. It defines every field in the inspection database — the schema, field lengths, data types, allowed values, and business definitions for all tables that store commercial motor vehicle (CMV) roadside inspection records across the United States and its territories.

MCMIS is the central federal system that tracks safety data on interstate and intrastate commercial carriers. The inspection dataset within MCMIS captures every driver-vehicle inspection conducted under the Motor Carrier Safety Assistance Program (MCSAP), including violations, out-of-service orders, vehicle unit details, hazmat findings, and citation outcomes.

---

## Database Tables

The dataset is organized into **five tables**, all linked by `INSPECTION_ID` as the primary key.

### 1. Vehicle Inspection File Table (63 active fields)

This is the **header-level inspection record**. One row per inspection event. It captures who was inspected, where, when, the outcome summary, and carrier identification.

**Key fields:**

- **INSPECTION_ID** (8, N) — Unique inspection record identifier. This is the join key across all tables.
- **DOT_NUMBER** (8, N) — The carrier's USDOT number from the MCMIS census. Each carrier should have only one active number; numbers are issued sequentially.
- **REPORT_STATE** (2, A/N) — The state that uploaded the inspection (usually where it was conducted).
- **REPORT_NUMBER** (10, A/N) — Format: `SS########` where `SS` is the state abbreviation (or `US` for federal inspections).
- **INSP_DATE** (8, A/N) — Date of inspection in `YYYYMMDD` format.
- **INSP_START_TIME / INSP_END_TIME** (4, A/N) — Military time `HHMM`. Midnight = `2400`, unknown = `9999`.
- **REGION** (2, A/N) — FHWA/FMCSA region (1, 3–10; there is no Region 2).
- **CI_STATUS_CODE** (1, A/N) — Inspection processing status: `U`=Unprocessed, `T`=To Census Search, `C`=Complete, `D`=Duplicate, `N`=Nonmatch, `H`=FMCSA Hold, `I`=Intrastate, `P`=Potential Resolution, `X`=Non-motor carrier.
- **INSP_LEVEL_ID** (8, N) — Inspection level: `1`=Full (Level I), `2`=Walk-Around (Level II), `3`=Driver-Only (Level III), `4`=Special Study (Level IV), `5`=Terminal (Level V), `99`=Invalid.
- **INSP_FACILITY** (1, A/N) — `F`=Fixed (scale house), `R`=Roadside, Null=N/A.

**Violation summary fields** — These are pre-aggregated totals on the header record:

- `VIOL_TOTAL` / `OOS_TOTAL` — Total violations and total out-of-service violations.
- `DRIVER_VIOL_TOTAL` / `DRIVER_OOS_TOTAL` — Driver-specific counts.
- `VEHICLE_VIOL_TOTAL` / `VEHICLE_OOS_TOTAL` — Vehicle-specific counts.
- `HAZMAT_VIOL_TOTAL` / `HAZMAT_OOS_TOTAL` — Hazmat-specific counts.

**Carrier identification fields** (sourced from the Carrier Table):

- `INSP_CARRIER_NAME` (120) — The entity responsible for the transportation.
- `INSP_CARRIER_STREET`, `INSP_CARRIER_CITY`, `INSP_CARRIER_STATE`, `INSP_CARRIER_ZIP_CODE` — Business address.
- `DOCKET_NUMBER` (8) — MC, MX, or FF number assigned by FMCSA (formerly ICC).
- `INSP_INTERSTATE` (1) — Whether the carrier operates interstate (`Y`/`N`).
- `INSP_CARRIER_STATE_ID` (12) — State-assigned carrier ID.
- `INSP_COLONIA` (25) — Mexican Colonia for Mexico-domiciled carriers.

**Enforcement and special indicator fields:**

- `HAZMAT_PLACARD_REQ` — Whether hazmat placards are required.
- `ALCOHOL_CONTROL_SUB` — Whether an alcohol/controlled substance check was performed.
- `DRUG_INTRDCTN_SEARCH` / `DRUG_INTRDCTN_ARRESTS` — Drug interdiction search and arrest count.
- `SIZE_WEIGHT_ENF` / `TRAFFIC_ENF` / `LOCAL_ENF_JURISDICTION` — Enforcement context flags.
- `POST_ACC_IND` — Whether the inspection was conducted after an accident.
- `GROSS_COMB_VEH_WT` (6) — Total gross weight of the combination vehicle in pounds.

**System/processing fields:**

- `CHANGE_DATE`, `TRANSACTION_DATE`, `UPLOAD_DATE`, `CENSUS_SEARCH_DATE`, `SNET_INPUT_DATE`, `MCMIS_ADD_DATE` — All in `YYYYMMDD HHMM` military time format.
- `TRANSACTION_CODE` — `A`=Add to MCMIS, `C`=Change existing record.
- `CENSUS_SOURCE_ID` — How the USDOT number was verified: `1`=Matchware, `2`=Manual, `3`=Algorithm, `4`=Pen-Based, `5`=SafetyNet uploaded.
- `SERVICE_CENTER` — `MW`=Midwest, `EA`=East, `SH`=South, `WE`=West.

**Removed fields** (13 total) — Legacy fields from older versions of the inspection and carrier tables that are no longer in use, including `INSP_CONFIDENCE_LEVEL`, `PENFIELD2`, `PENFIELD3`, `DEFECT_VER`, and various original report fields.

---

### 2. Inspections Per Unit Table (12 fields)

One row per **vehicle unit** inspected. A single inspection of a tractor-trailer double, for example, would have three rows (tractor + two trailers).

**Key fields:**

- **INSP_UNIT_ID** (9, N) — Unique unit identifier.
- **INSP_UNIT_TYPE_ID** (8, N) — Vehicle type code:
  - `1`=Bus, `2`=Dolly Converter, `3`=Full Trailer, `4`=Limousine, `5`=Motor Carrier, `6`=Other, `7`=Pole Trailer, `8`=School Bus, `9`=Semi Trailer, `10`=Straight Truck, `11`=Truck Tractor, `12`=Van, `13`=Unknown, `14`=Intermodal Chassis, `15`=Crib Log Trailer
- **INSP_UNIT_NUMBER** (1, N) — Sequence number of the unit (1–6).
- **INSP_UNIT_MAKE** (10) — Manufacturer.
- **INSP_UNIT_VEHICLE_ID_NUMBER** (17) — The VIN.
- **INSP_UNIT_LICENSE** (12) / **INSP_UNIT_LICENSE_STATE** (2) — Tag number and issuing state.
- **INSP_UNIT_DECAL** (1) — Whether a CVSA decal was issued (`Y`/`N`/`U`).
- **INSP_UNIT_DECAL_NUMBER** (8) — The decal number.

---

### 3. Vehicle Inspections and Violations Table (12 fields)

One row per **violation** found during an inspection. This is the detail-level violation data.

**Key fields:**

- **INSP_VIOLATION_ID** (9, N) — Unique violation identifier.
- **SEQ_NO** (3, N) — Violation sequence number.
- **PART_NO** (3, A/N) — The part number of the regulation violated (references FMCSR or HMR).
- **PART_NO_SECTION** (40, A/N) — The specific section number violated.
- **INSP_VIOL_UNIT** (1, A/N) — Which unit had the violation: `D`=Driver, `C`=Co-driver, `1`–`6`=Vehicle unit number.
- **INSP_VIOLATION_CATEGORY_ID** (8, N) — Maps to the violation categories (1–99). See the Violation Categories section below.
- **OUT_OF_SERVICE_INDICATOR** (1) — `Z`=Driver OOS, `Y`=Vehicle OOS, `N`=Not OOS.
- **DEFECT_VERIFICATION_ID** (8, N) — How the defect was resolved: `1`=Repaired at scene, `2`=Towed/escorted to repair, `3`=Non-OOS, `4`=Other, `99`=Unknown/Unverified.
- **CITATION_NUMBER** (15) — The citation number if one was issued.

---

### 4. Special Studies Table (5 fields)

Captures data collected during Level IV (Special Study) inspections. These are ad hoc examinations supporting specific research or trend verification.

- **INSP_STUDY_ID** (8) — Unique study identifier.
- **STUDY** (40) — The actual study data collected.
- **SEQ_NO** (3) — Indicates which study field (1–5) this data belongs to.

---

### 5. Inspections and Citations Table (6 active fields)

Links violations to their citation outcomes. Joined via `INSPECTION_ID` and violation sequence numbers.

- **VIOSEQNUM** (8) — Violation sequence number.
- **ADJSEQ** (8) — Adjusted sequence number.
- **CITATION_CODE** (8) — The citation code.
- **CITATION_RESULT** (100) — The result/outcome of the citation.

**Removed fields** (10 total) — Significant cleanup from the old schema: `CHALLENGEID`, old `CITATIONRESULT`, `RESULTDATE`, `COMMENTS`, `CHANGESOURCE`, `UPLOADDATE`, `ADDDATE`, `ADDUSER`, `CHANGE_DATE` (old), `CHANGE_BY_USER`.

---

## Violation Categories

Violations are grouped into three defect groups (driver, vehicle, hazmat) plus an invalid category. Each category has a numeric ID and a short mnemonic code.

### Driver Violations (Categories 1–14, 40–49)

| # | Code | Description |
|---|------|-------------|
| 1 | MEDCRT | Medical Certificate |
| 2 | FLSLOG | False Log Book |
| 3 | LOGVIO | No Log Book / Log Not Current / General Log Violations |
| 4 | 10/15 | 10/15 Hours |
| 5 | 15/20 | 15/20 Hours |
| 6 | 60/70 | 60/70/80 Hours |
| 7 | OTHHOS | All Other Hours-Of-Service |
| 8 | DSQDRV | Disqualified Drivers |
| 9 | DRUGS | Drugs |
| 10 | ALCOHL | Alcohol |
| 11 | SEATBT | Seat Belt |
| 12 | TRFENF | Traffic Enforcement |
| 13 | RADAR | Radar Detectors |
| 14 | OTHDRV | All Other Driver Violations |
| 40 | CTLDEV | Failure to Obey Traffic Control Device |
| 41 | 2CLOSE | Following Too Close |
| 42 | LANCHG | Improper Lane Change |
| 43 | IMPPAS | Improper Passing |
| 44 | RECDRV | Reckless Driving |
| 45 | SPEDNG | Speeding |
| 46 | IMPTRN | Improper Turns |
| 47 | SIZWGT | Size and Weight |
| 48 | RTOWAY | Failure to Yield Right of Way |
| 49 | STAHOS | State/Local Hours of Service |

### Vehicle Violations (Categories 15–30)

| # | Code | Description |
|---|------|-------------|
| 15 | BRKADJ | Brakes, Out of Adjustment |
| 16 | BRKOTH | Brakes, All Other Violations |
| 17 | COUPLR | Coupling Devices |
| 18 | FUEL | Fuel Systems |
| 19 | FRAMES | Frames |
| 20 | LIGHTS | Lighting |
| 21 | STERNG | Steering Mechanism |
| 22 | SUSPEN | Suspension |
| 23 | TIRES | Tires |
| 24 | WHEELS | Wheels, Studs, Clamps, Etc. |
| 25 | LDSECR | Load Securement |
| 26 | WNDSHL | Windshield |
| 27 | EXHST | Exhaust Discharge |
| 28 | EMREQP | Emergency Equipment |
| 29 | PERINS | Periodic Inspection |
| 30 | OTHER | All Other Vehicle Defects |

### Hazmat Violations (Categories 31–39)

| # | Code | Description |
|---|------|-------------|
| 31 | HPAPRS | Shipping Papers |
| 32 | HPLCRD | Improper Placarding |
| 33 | HIMSHP | Accepting Shipment Improperly Marked |
| 34 | HBRACE | Improper Blocking and Bracing |
| 35 | HTEST | No Retest and Inspection (Cargo Tank) |
| 36 | HSHTOF | No Remote Shutoff Control |
| 37 | HSPEC | Use of Non-specification Container |
| 38 | EMGRES | Emergency Response |
| 39 | HOTHR | All Other HM Violations |

### Invalid

| # | Code | Description |
|---|------|-------------|
| 99 | UNKNOWN | Unknown |

---

## FMCSA Regions

There is no Region 2 — the numbering skips from 1 to 3.

| Region | States & Territories |
|--------|---------------------|
| 1 | CT, ME, MA, NH, NY, NJ, RI, VT, PR, VI |
| 3 | DE, DC, MD, PA, VA, WV |
| 4 | AL, GA, FL, MS, NC, SC, TN, KY |
| 5 | IL, IN, MI, OH, MN, WI |
| 6 | AR, LA, NM, OK, TX |
| 7 | IA, KS, MO, NE |
| 8 | CO, MT, ND, SD, UT, WY |
| 9 | AZ, CA, NV, HI, GU, AS |
| 10 | AK, ID, OR, WA |

---

## Key Terminology (Glossary Highlights)

- **MCMIS** — Motor Carrier Management Information System. The central FMCSA database for carrier safety data.
- **MCSAP** — Motor Carrier Safety Assistance Program. Federal program funding state inspection activities.
- **CVSA** — Commercial Vehicle Safety Alliance. US/Canada/Mexico organization for inspection uniformity.
- **SafetyNet** — State-based information system for storing/processing inspection data before upload to MCMIS.
- **ASPEN** — The electronic inspection software used by inspectors in the field.
- **FMCSR** — Federal Motor Carrier Safety Regulations (49 CFR, Subtitle B, Chapter III).
- **HMR** — Hazardous Materials Regulations (49 CFR, Subtitle B, Chapter I).
- **OOS (Out-of-Service)** — A violation severe enough to require the vehicle or driver be removed from service until corrected.
- **USDOT Number** — Unique ID assigned to each interstate commercial carrier for tracking safety records.
- **Docket Number** — MC, MX, or FF number assigned by FMCSA (formerly by the ICC).

**Inspection Levels:**
- **Level I (Full)** — Most comprehensive. Under-vehicle brake measurement + hours-of-service log review.
- **Level II (Walk-Around)** — Similar to Full but no under-vehicle work.
- **Level III (Driver-Only)** — CDL, medical cert, and hours-of-service only.
- **Level IV (Special Study)** — Ad hoc examination for specific research.
- **Level V (Terminal)** — Vehicle examination at the carrier's terminal.

**Vehicle Configurations:** Bus, Straight Truck, Tractor, Tractor-Trailer/Single, Tractor-Trailer/Double, Tractor-Trailer/Triple.

---

## Data Type Reference

- **N** = Numeric
- **A/N** = Alphanumeric
- All datetime fields use `YYYYMMDD HHMM` in military (24-hour) time, separated by a space.
- All date-only fields use `YYYYMMDD`.
- All time-only fields use `HHMM` military time.

---

## Additional Reference Data

The original PDF (pages 12–84) contains complete **FIPS county code** mappings for all 50 US states, the District of Columbia, Puerto Rico, and the US Virgin Islands. These are standard FIPS codes used in the `COUNTY_CODE` field and are paired with the `COUNTY_CODE_STATE` field (2-letter state abbreviation) to uniquely identify the county where each inspection occurred.