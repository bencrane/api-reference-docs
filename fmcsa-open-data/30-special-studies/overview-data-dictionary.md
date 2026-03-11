# MCMIS Vehicle Inspection Data Set Dictionary

**Revision 5 — October 15, 2025 — 84 pages**

This document is the official data dictionary for the MCMIS (Motor Carrier Management Information System) Vehicle Inspection dataset maintained by FMCSA. It defines every field across six database tables, along with reference lookups for violation categories, FMCSA regions, state abbreviations, and FIPS county codes.

---

## What Is MCMIS?

MCMIS is the computerized system operated by the Federal Motor Carrier Safety Administration (FMCSA) containing comprehensive safety data on interstate and intrastate commercial carriers. Two core components are the Motor Carrier Inspection Database and the Motor Carrier Census Database. Every inspection conducted under the Motor Carrier Safety Assistance Program (MCSAP) flows through SafetyNet into MCMIS, where it is linked to the carrier's USDOT number.

---

## Database Tables

The dataset is organized into six tables, all joined through `INSPECTION_ID`.

### 1. Vehicle Inspection File Table (63 active fields)

This is the primary inspection record. It contains everything about a single roadside or terminal inspection event: who was inspected (carrier identity via USDOT number), where and when it happened, the inspection level performed, violation totals by category, and all the processing/upload metadata that tracks the record through SafetyNet into MCMIS.

Key fields include:

- **INSPECTION_ID** (8, N) — Unique inspection record identifier. The primary key linking all other tables.
- **DOT_NUMBER** (8, N) — The carrier's USDOT number from the Census database.
- **REPORT_STATE** (2, A/N) — State that uploaded the inspection (usually where it was conducted).
- **REPORT_NUMBER** (10, A/N) — Formatted as `SS########` where SS is the state abbreviation or `US` for federal inspections.
- **INSP_DATE** (8, A/N) — Inspection date in `YYYYMMDD` format.
- **INSP_START_TIME / INSP_END_TIME** (4, A/N) — Military time (`HHMM`). Midnight = 2400, unknown = 9999.
- **REGION** (2, A/N) — FHWA/FMCSA region code (1, 3–10). See region mapping below.
- **CI_STATUS_CODE** (1, A/N) — Processing status: U (Unprocessed), T (To Census Search), C (Complete), D (Duplicate), N (Nonmatch), H (FMCSA hold), I (Intrastate), P (Potential Resolution), X (Non-motor carrier).
- **INSP_LEVEL_ID** (8, N) — 1=Full, 2=Walk-Around, 3=Driver-Only, 4=Special Study, 5=Terminal, 99=Invalid.
- **SERVICE_CENTER** (2, A/N) — MW (Midwest), EA (East), SH (South), WE (West).
- **CENSUS_SOURCE_ID** (8, N) — How the USDOT number was verified: 1=Matchware, 2=Manual, 3=Algorithm, 4=Pen-Based, 5=SafetyNet uploaded unchanged.
- **INSP_FACILITY** (1, A/N) — F (Fixed), R (Roadside), Null (N/A).

**Violation totals** are broken out across three defect groups: driver, vehicle, and hazmat. Each has a total violations count and a total out-of-service (OOS) count, plus a grand total across all groups:

- `VIOL_TOTAL` / `OOS_TOTAL` — Grand totals.
- `DRIVER_VIOL_TOTAL` / `DRIVER_OOS_TOTAL` — Driver violations.
- `VEHICLE_VIOL_TOTAL` / `VEHICLE_OOS_TOTAL` — Vehicle violations.
- `HAZMAT_VIOL_TOTAL` / `HAZMAT_OOS_TOTAL` — Hazmat violations.

**Carrier identity fields** (sourced from the Carrier Table) include `INSP_CARRIER_NAME`, `INSP_CARRIER_STREET`, `INSP_CARRIER_CITY`, `INSP_CARRIER_STATE`, `INSP_CARRIER_ZIP_CODE`, `INSP_COLONIA` (for Mexican-domiciled carriers), `DOCKET_NUMBER` (MC/MX/FF number), `INSP_INTERSTATE` (Y/N), and `INSP_CARRIER_STATE_ID`.

**Enforcement and situational flags** cover alcohol/controlled substance checks (`ALCOHOL_CONTROL_SUB`), drug interdiction searches and arrests (`DRUG_INTRDCTN_SEARCH`, `DRUG_INTRDCTN_ARRESTS`), size/weight enforcement (`SIZE_WEIGHT_ENF`), traffic enforcement (`TRAFFIC_ENF`), local enforcement jurisdiction (`LOCAL_ENF_JURISDICTION`), and post-accident indicator (`POST_ACC_IND`).

**Processing metadata** tracks the lifecycle of the record: `TRANSACTION_CODE` (A=Add, C=Change), `TRANSACTION_DATE`, `UPLOAD_DATE`, `SNET_INPUT_DATE`, `CENSUS_SEARCH_DATE`, `MCMIS_ADD_DATE`, `FINAL_STATUS_DATE`, `CHANGE_DATE`, and various SafetyNet identifiers.

14 fields have been **removed** from the legacy schema, including `INSP_CONFIDENCE_LEVEL`, `PENFIELD2`, `PENFIELD3`, `DEFECT_VER`, `OOS_DEFECT_VER`, original report fields, and the old carrier table's `INSP_CARRIER_ID` and `PREFIX`.

---

### 2. Inspections Per Unit Table (12 fields)

Each inspection can involve up to 6 vehicle units (e.g., a tractor pulling two trailers). This table stores one row per unit per inspection.

- **INSP_UNIT_ID** (9, N) — Unique unit identifier.
- **INSP_UNIT_TYPE_ID** (8, N) — Vehicle type code (1–15). Maps to: 1=Bus, 2=Dolly Converter, 3=Full Trailer, 4=Limousine, 5=Motor Carrier, 6=Other, 7=Pole Trailer, 8=School Bus, 9=Semi Trailer, 10=Straight Truck, 11=Truck Tractor, 12=Van, 13=Unknown, 14=Intermodal Chassis, 15=Crib Log Trailer.
- **INSP_UNIT_NUMBER** (1, N) — Sequential position of the unit (1–6).
- **INSP_UNIT_MAKE** (10, A/N) — Vehicle manufacturer.
- **INSP_UNIT_COMPANY** (15, A/N) — Carrier's assigned unit number.
- **INSP_UNIT_LICENSE** (12, A/N) — License plate number.
- **INSP_UNIT_LICENSE_STATE** (2, A/N) — Plate issuing state.
- **INSP_UNIT_VEHICLE_ID_NUMBER** (17, A/N) — VIN.
- **INSP_UNIT_DECAL / INSP_UNIT_DECAL_NUMBER** — Whether a CVSA decal was issued and its number.

---

### 3. Vehicle Inspections and Violations Table (12 fields)

One row per violation per inspection. This is where individual regulatory citations are recorded.

- **INSP_VIOLATION_ID** (9, N) — Unique violation identifier.
- **SEQ_NO** (3, N) — Violation sequence number within the inspection.
- **PART_NO** (3, A/N) — Part number of the cited regulation (references FMCSR or HMR).
- **PART_NO_SECTION** (40, A/N) — Section number of the cited regulation.
- **INSP_VIOL_UNIT** (1, A/N) — Which unit or driver had the violation: D (driver), C (co-driver), or 1–6 (vehicle unit number).
- **INSP_VIOLATION_CATEGORY_ID** (8, N) — Maps to the violation categories (1–99). See below.
- **OUT_OF_SERVICE_INDICATOR** (1, A/N) — Z (Driver OOS), Y (Vehicle OOS), N (not OOS).
- **DEFECT_VERIFICATION_ID** (8, N) — How the defect was resolved: 1=Repaired at scene, 2=Towed/escorted, 3=Non-OOS, 4=Other, 99=Unknown.
- **CITATION_NUMBER** (15, A/N) — The citation number if one was issued.

---

### 4. Special Studies Table (5 fields)

Captures data from ad-hoc research studies conducted during inspections. Each study can have up to 5 sequence entries. Fields: `INSPECTION_ID`, `INSP_STUDY_ID`, `STUDY` (40 char freetext), `SEQ_NO`.

---

### 5. Inspections and Citations Table (6 active fields)

Links violations to their citation outcomes. Fields: `INSPECTION_ID`, `VIOSEQNUM` (violation sequence), `ADJSEQ` (adjusted sequence), `CITATION_CODE`, and `CITATION_RESULT` (up to 100 chars describing the outcome).

10 fields have been **removed** from the legacy schema, including `CHALLENGEID`, old `CITATIONRESULT`, `RESULTDATE`, `COMMENTS`, `CHANGESOURCE`, `UPLOADDATE`, `ADDDATE`, `ADDUSER`, and citation code table audit fields.

---

## Violation Categories

Violations are classified into three defect groups, each with numbered categories:

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

| Region | States / Territories |
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

Note: There is no Region 2.

---

## Inspection Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | Full | Most comprehensive — includes under-vehicle brake measurement and HOS log review. Also called the North American Standard Inspection. |
| 2 | Walk-Around | Like Full but without under-vehicle checks. |
| 3 | Driver-Only | Examines only driver licensing, medical certification, and HOS compliance. |
| 4 | Special Study | Ad-hoc examination for a specific research purpose. |
| 5 | Terminal | Conducted at carrier facilities, generally vehicle-focused using Walk-Around technique. |
| 99 | Invalid | Invalid inspection level. |

---

## Key Glossary Terms

- **CVSA** — Commercial Vehicle Safety Alliance. Organization of US, Canadian, and Mexican jurisdictions focused on uniform CMV safety enforcement.
- **FMCSA** — Federal Motor Carrier Safety Administration. The USDOT agency responsible for commercial motor vehicle safety.
- **FMCSR** — Federal Motor Carrier Safety Regulations (49 CFR, Subtitle B, Chapter III).
- **HMR** — Hazardous Materials Regulations (49 CFR, Subtitle B, Chapter I).
- **MCSAP** — Motor Carrier Safety Assistance Program. Federal funding program for state CMV enforcement.
- **SafetyNet** — State-based information system for storing/processing carrier safety data. Ensures standardized data format and edit checks before upload to MCMIS.
- **OOS (Out-of-Service)** — A violation requiring the vehicle or driver to be removed from service until corrected.
- **USDOT Number** — Unique identification number assigned to interstate commercial carriers by FMCSA.
- **Docket Number** — MC, MX, or FF number assigned by FMCSA (formerly ICC) to carriers.

---

## Vehicle Configurations

The dataset tracks these common configurations: Bus, Straight Truck, Tractor (power unit only), Tractor-Trailer/Single, Tractor-Trailer/Double, and Tractor-Trailer/Triple.

---

## County Codes

The document includes a comprehensive FIPS county code reference for all 50 US states, DC, Puerto Rico, and the US Virgin Islands. County codes are used in the `COUNTY_CODE` field and are state-specific (the same numeric code can appear in different states). The `COUNTY_CODE_STATE` field identifies which state's county code set applies.

---

## Data Type Reference

Throughout the dictionary, field types are coded as:

- **N** — Numeric
- **A/N** — Alphanumeric

Date/time fields consistently use `YYYYMMDD HHMM` format (military time, space-separated). Date-only fields use `YYYYMMDD`. Time-only fields use `HHMM`.

---

## Table Relationships

All tables join on `INSPECTION_ID`. The Vehicle Inspection File table is the parent; Inspections Per Unit, Violations, Special Studies, and Citations are child tables. The Violations table also links to Inspections Per Unit via `INSP_UNIT_ID`. The Citations table links to Violations via `VIOSEQNUM`.

```
Vehicle Inspection File (INSPECTION_ID)
├── Inspections Per Unit (INSPECTION_ID, INSP_UNIT_ID)
├── Violations (INSPECTION_ID, INSP_VIOLATION_ID, INSP_UNIT_ID)
│   └── Citations (INSPECTION_ID, VIOSEQNUM)
└── Special Studies (INSPECTION_ID, INSP_STUDY_ID)
```