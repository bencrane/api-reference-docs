# MCMIS Vehicle Inspection Data Set Dictionary

**Source:** MCMIS Vehicle Inspection File Data Dictionary — Revision 5, October 15, 2025 (84 pages)

---

## Overview

This document is the official data dictionary for the **Motor Carrier Management Information System (MCMIS) Vehicle Inspection Data Set**, maintained by the Federal Motor Carrier Safety Administration (FMCSA). It defines every field across five relational tables that store roadside and terminal inspection records for commercial motor vehicles in the United States, its territories, and cross-border carriers from Canada and Mexico.

The dataset is structured as **daily diff files** — incremental change records rather than full snapshots — meaning each row represents a new or modified inspection record since the prior export.

---

## Tables

The dataset contains **five tables**, all linked by `INSPECTION_ID`:

### 1. Vehicle Inspection File (Main Table)

The primary header record for each inspection. Contains **63 active fields** (plus 13 removed/deprecated fields). Key data includes:

- **Identification:** `INSPECTION_ID` (unique key), `DOT_NUMBER` (carrier's USDOT number), `REPORT_NUMBER` (state-assigned report ID formatted as `SS########`).
- **Timing:** `INSP_DATE` (YYYYMMDD), `INSP_START_TIME` / `INSP_END_TIME` (military HHMM; 2400 = midnight, 9999 = unknown).
- **Location:** `REPORT_STATE`, `REGION` (FMCSA regions 1, 3–10), `COUNTY_CODE_STATE` + `COUNTY_CODE` (FIPS), `LOCATION` (state-assigned code), `LOCATION_DESC` (free text up to 30 chars).
- **Inspection metadata:** `INSP_LEVEL_ID` (1=Full, 2=Walk-Around, 3=Driver-Only, 4=Special Study, 5=Terminal, 99=Invalid), `INSP_FACILITY` (F=Fixed, R=Roadside), `CI_STATUS_CODE` (U/T/C/D/N/H/I/P/X lifecycle codes), `SERVICE_CENTER` (MW/EA/SH/WE).
- **Violation tallies:** Six pairs of total + OOS counts covering driver, vehicle, and hazmat violations (`VIOL_TOTAL`, `OOS_TOTAL`, `DRIVER_VIOL_TOTAL`, `DRIVER_OOS_TOTAL`, `VEHICLE_VIOL_TOTAL`, `VEHICLE_OOS_TOTAL`, `HAZMAT_VIOL_TOTAL`, `HAZMAT_OOS_TOTAL`).
- **Carrier info (from Carrier Table):** `INSP_CARRIER_NAME`, full address fields (`_STREET`, `_CITY`, `_STATE`, `_ZIP_CODE`), `DOCKET_NUMBER`, `INSP_INTERSTATE` (Y/N), `INSP_CARRIER_STATE_ID`, `INSP_COLONIA` (Mexican domiciled carriers).
- **Hazmat & enforcement flags:** `HAZMAT_PLACARD_REQ`, `ALCOHOL_CONTROL_SUB`, `DRUG_INTRDCTN_SEARCH`, `DRUG_INTRDCTN_ARRESTS`, `SIZE_WEIGHT_ENF`, `TRAFFIC_ENF`, `LOCAL_ENF_JURISDICTION`, `POST_ACC_IND`.
- **System fields:** `CHANGE_DATE`, `TRANSACTION_CODE` (A=Add, C=Change), `TRANSACTION_DATE`, `UPLOAD_DATE`, `SNET_SEQUENCE_ID`, `SNET_VERSION_NUMBER`, `MCMIS_ADD_DATE`, `SOURCE_OFFICE`, etc.
- **Weight:** `GROSS_COMB_VEH_WT` — gross combined vehicle weight in pounds (up to 6 chars).

### 2. Inspections Per Unit Table

One row per vehicle unit inspected. Contains **12 fields**:

- `INSP_UNIT_ID` — unique unit identifier.
- `INSP_UNIT_TYPE_ID` — coded 1–15 covering Bus, Dolly Converter, Full Trailer, Limousine, Motor Carrier, Other, Pole Trailer, School Bus, Semi Trailer, Straight Truck, Truck Tractor, Van, Unknown, Intermodal Chassis, and Crib Log Trailer.
- `INSP_UNIT_NUMBER` — sequence (1–6) of the unit within the inspection.
- `INSP_UNIT_MAKE` — manufacturer (10 chars).
- `INSP_UNIT_VEHICLE_ID_NUMBER` — VIN (17 chars).
- `INSP_UNIT_LICENSE` / `INSP_UNIT_LICENSE_STATE` — plate number and issuing state.
- `INSP_UNIT_DECAL` / `INSP_UNIT_DECAL_NUMBER` — CVSA decal issuance.

### 3. Vehicle Inspections and Violations Table

One row per violation. Contains **12 fields**:

- `INSP_VIOLATION_ID` — unique violation identifier.
- `SEQ_NO` — violation sequence number within the inspection.
- `PART_NO` + `PART_NO_SECTION` — the FMCSR or HMR regulation code violated.
- `INSP_VIOL_UNIT` — identifies whether violation is against the driver (D), co-driver (C), or vehicle unit (1–6).
- `INSP_VIOLATION_CATEGORY_ID` — maps to one of the 50 violation categories (see below).
- `OUT_OF_SERVICE_INDICATOR` — Z = Driver OOS, Y = Vehicle OOS, N = Not OOS.
- `DEFECT_VERIFICATION_ID` — resolution status: 1=Repaired at scene, 2=Towed to repair, 3=Non-OOS, 4=Other, 99=Unknown.
- `CITATION_NUMBER` — associated citation if issued.

### 4. Special Studies Table

Contains **5 fields** for ad hoc data collection tied to inspections. The `STUDY` field (40 chars) holds special study data, and `SEQ_NO` (1–5) indicates which of up to five study data slots is being used.

### 5. Inspections and Citations Table

Contains **6 active fields** (plus 10 removed). Links violations to citation outcomes:

- `VIOSEQNUM` — violation sequence number.
- `ADJSEQ` — adjusted sequence number.
- `CITATION_CODE` — the citation code issued.
- `CITATION_RESULT` — the outcome/result of the citation (up to 100 chars).

---

## Violation Categories

Violations are grouped into three defect groups, plus an invalid category:

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

## Inspection Levels

| Level | Name | Description |
|-------|------|-------------|
| I | Full | Most comprehensive — extensive vehicle checks including under-vehicle brake measurement, plus hours-of-service log examination. Also called the North American Standard Inspection. |
| II | Walk-Around | Same as Full except no under-vehicle checks (e.g., no climbing underneath to measure brake performance). |
| III | Driver-Only | Examines only driver-related aspects: CDL compliance, medical certifications, waivers, and hours-of-service. |
| IV | Special Study | Ad hoc examination of particular items in support of a specific study or trend verification. |
| V | Terminal | Examination of vehicles at carrier terminal facilities, typically using Walk-Around technique and focusing on vehicle aspects. |
| 99 | Invalid | Invalid or unknown inspection level. |

---

## FMCSA Regions

| Region | States/Territories |
|--------|--------------------|
| 1 | CT, ME, MA, NH, NY, NJ, RI, VT, PR, VI |
| 3 | DE, DC, MD, PA, VA, WV |
| 4 | AL, GA, FL, MS, NC, SC, TN, KY |
| 5 | IL, IN, MI, OH, MN, WI |
| 6 | AR, LA, NM, OK, TX |
| 7 | IA, KS, MO, NE |
| 8 | CO, MT, ND, SD, UT, WY |
| 9 | AZ, CA, NV, HI, GU, AS |
| 10 | AK, ID, OR, WA |

Note: Region 2 does not exist in this schema.

---

## Service Centers

| Code | Region |
|------|--------|
| MW | Midwest |
| EA | East |
| SH | South |
| WE | West |

---

## Key Relationships

All tables are linked through `INSPECTION_ID`. The relational structure is:

- **Vehicle Inspection File** (1) → (many) **Inspections Per Unit** — one inspection can cover multiple vehicle units.
- **Vehicle Inspection File** (1) → (many) **Vehicle Inspections and Violations** — one inspection can have multiple violations.
- **Vehicle Inspections and Violations** (1) → (many) **Inspections and Citations** — one violation can result in multiple citations/adjudications.
- **Vehicle Inspection File** (1) → (many) **Special Studies** — one inspection can be part of multiple studies.
- **Inspections Per Unit** is also linked to **Vehicle Inspections and Violations** via `INSP_UNIT_ID`.

---

## Vehicle Unit Types

| Code | Abbreviation | Description |
|------|-------------|-------------|
| 1 | BU | Bus |
| 2 | DC | Dolly Converter |
| 3 | FT | Full Trailer |
| 4 | LM | Limousine |
| 5 | MC | Motor Carrier |
| 6 | OT | Other |
| 7 | PT | Pole Trailer |
| 8 | SB | School Bus |
| 9 | ST | Semi Trailer |
| 10 | TR | Straight Truck |
| 11 | TT | Truck Tractor |
| 12 | VN | Van |
| 13 | ZZ | Unknown |
| 14 | — | Intermodal Chassis |
| 15 | — | Crib Log Trailer |

---

## Common Vehicle Configurations

- Bus
- Straight Truck
- Tractor (standalone)
- Tractor-Trailer / Single (tractor + 1 trailer)
- Tractor-Trailer / Double (tractor + 2 trailers)
- Tractor-Trailer / Triple (tractor + 3 trailers)

---

## Date/Time Formats

All datetime fields follow: `YYYYMMDD HHMM` in military time (24-hour clock), stored as a 13-character value with a space separator. Time-only fields use `HHMM` (4 chars), where `2400` = midnight and `9999` = time unknown. Date-only fields use `YYYYMMDD` (8 chars).

---

## Data Types

- **N** = Numeric
- **A/N** = Alphanumeric

---

## County Codes

The document includes FIPS county codes for all 50 US states, Washington DC, Puerto Rico, and the US Virgin Islands (pages 14–84 of the source PDF). These are state-specific numeric codes used in the `COUNTY_CODE` field alongside the `COUNTY_CODE_STATE` abbreviation.

---

## Notes on Deprecated Fields

Several fields have been removed from the current schema, indicated in the source document with highlighting. These include legacy fields from the old Inspection Table (`INSP_CONFIDENCE_LEVEL`, `PENFIELD2`, `PENFIELD3`, `DEFECT_VER`, `OOS_DEFECT_VER`, `VIOL_NOT_SENT`, `OOS_NOT_SENT`, original report fields) and from the old Carrier Table (`INSP_CARRIER_ID`, `PREFIX`). The Inspections and Citations Table also had multiple fields removed including `CHALLENGEID`, `CITATIONRESULT`, `RESULTDATE`, `COMMENTS`, and several audit trail fields.