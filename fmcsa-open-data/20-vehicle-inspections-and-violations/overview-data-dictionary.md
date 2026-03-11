# MCMIS Vehicle Inspection Data Set Dictionary

**Revision 5 — October 15, 2025 — 84 Pages**

This document is the official data dictionary for the MCMIS (Motor Carrier Management Information System) Vehicle Inspection data set, maintained by FMCSA. It defines every field across five relational tables, all violation category codes, a full glossary of commercial vehicle safety terms, and FIPS county code reference data for every U.S. state and territory.

---

## Overview

MCMIS is the computerized system operated by the Federal Motor Carrier Safety Administration (FMCSA) containing comprehensive safety data on interstate and intrastate commercial carriers. The Vehicle Inspection data set captures structured records from roadside and terminal inspections of commercial motor vehicles and their drivers. Data flows from the field into **SafetyNet** (a state-based information system), passes through edit checks, and is electronically transferred to MCMIS in a standard format.

The data set is organized into **five tables**, linked primarily by `INSPECTION_ID`:

1. **Vehicle Inspection File Table** — The master inspection record (63 active fields).
2. **Inspections Per Unit Table** — Vehicle unit details per inspection (12 fields).
3. **Vehicle Inspections and Violations Table** — Individual violations per inspection (12 fields).
4. **Special Studies Table** — Ad hoc study data attached to inspections (5 fields).
5. **Inspections and Citations Table** — Citation details linked to violations (6 active fields).

---

## 1. Vehicle Inspection File Table

This is the primary table. Each row represents a single inspection event. It contains 63 active fields and 13 removed/deprecated fields. Key identifiers and their roles:

### Core Identifiers

- **INSPECTION_ID** (N, 8) — Unique ID for the inspection record. The primary key that links all child tables.
- **DOT_NUMBER** (N, 8) — The USDOT number assigned to the carrier in the Census database. Each motor carrier should have only one active census number; numbers are issued sequentially.
- **REPORT_NUMBER** (A/N, 10) — Format is `SS########` where `SS` is the two-letter state abbreviation (or `US` for federal inspections) followed by 8 alphanumeric characters.
- **REPORT_STATE** (A/N, 2) — The state that uploaded the inspection (usually where it was conducted).

### Date/Time Fields

All datetime fields use the format `YYYYMMDD HHMM` in 24-hour military time, separated by a space.

- **CHANGE_DATE** (N, 13) — Last update timestamp.
- **INSP_DATE** (A/N, 8) — Inspection date (`YYYYMMDD` only).
- **INSP_START_TIME** / **INSP_END_TIME** (A/N, 4) — Start and end times in `HHMM`. Midnight = `2400`, Unknown = `9999`.
- **REGISTRATION_DATE** (A/N, 8) — Date the correction-of-defects certificate was registered.
- **FINAL_STATUS_DATE** (N, 13) — Timestamp when `CI_STATUS_CODE` was last changed.
- **TRANSACTION_DATE**, **UPLOAD_DATE**, **CENSUS_SEARCH_DATE**, **SNET_INPUT_DATE**, **MCMIS_ADD_DATE** — Various processing pipeline timestamps.

### Geographic Fields

- **REGION** (A/N, 2) — FHWA/FMCSA region (1, 3–10; there is no Region 2):
  - Region 1: CT, ME, MA, NH, NY, NJ, RI, VT, PR, VI
  - Region 3: DE, DC, MD, PA, VA, WV
  - Region 4: AL, GA, FL, MS, NC, SC, TN, KY
  - Region 5: IL, IN, MI, OH, MN, WI
  - Region 6: AR, LA, NM, OK, TX
  - Region 7: IA, KS, MO, NE
  - Region 8: CO, MT, ND, SD, UT, WY
  - Region 9: AZ, CA, NV, HI, GU, AS
  - Region 10: AK, ID, OR, WA
- **LOCATION** (A/N, 6) — State-assigned code for the physical inspection location.
- **LOCATION_DESC** (A/N, 30) — Free-text description of the location.
- **COUNTY_CODE_STATE** (A/N, 2) — State abbreviation for the county where inspection occurred.
- **COUNTY_CODE** (A/N, 3) — FIPS county code. See the full county code appendix (pages 14–84 of the source PDF).
- **SERVICE_CENTER** (A/N, 2) — `MW` (Midwest), `EA` (East), `SH` (South), `WE` (West).

### Inspection Classification

- **CI_STATUS_CODE** (A/N, 1) — Inspection processing status:
  - `U` = Unprocessed, `T` = To Census Search, `C` = Complete, `D` = Duplicate, `N` = Nonmatch, `H` = FMCSA Hold, `I` = Intrastate, `P` = Potential Resolution, `X` = Non-motor carrier.
- **INSP_LEVEL_ID** (N, 8) — Inspection level:
  - `1` = Full (Level I, North American Standard), `2` = Walk-Around (Level II), `3` = Driver-Only (Level III), `4` = Special Study (Level IV), `5` = Terminal (Level V), `99` = Invalid.
- **INSP_FACILITY** (A/N, 1) — `F` = Fixed facility, `R` = Roadside, `Null` = N/A.
- **CENSUS_SOURCE_ID** (N, 8) — How the USDOT number was verified: `1` = Matchware, `2` = Manual Census Search, `3` = Matching Algorithm, `4` = Pen-Based, `5` = SafetyNet Uploaded (unchanged).

### Cargo & Hazmat

- **SHIPPER_NAME** (A/N, 120) — Name of the shipping company.
- **SHIPPING_PAPER_NUMBER** (A/N, 15) — Unique number on shipping papers, or `NONE`.
- **CARGO_TANK** (A/N, 3) — Three-character cargo tank type indicator (from ASPEN).
- **HAZMAT_PLACARD_REQ** (A/N, 1) — `Y`/`N`/`Null`. Required if a hazmat code is entered.

### Enforcement Flags

- **ALCOHOL_CONTROL_SUB** (A/N, 1) — Was an alcohol/controlled substance check done? `Y`/`N`/`U`.
- **DRUG_INTRDCTN_SEARCH** (A/N, 1) — Drug interdiction search performed? `Y`/`N`/`U`.
- **DRUG_INTRDCTN_ARRESTS** (N, 2) — Count of drug interdiction arrests.
- **SIZE_WEIGHT_ENF** (A/N, 1) — Conducted with size/weight enforcement? `Y`/`N`/`U`.
- **TRAFFIC_ENF** (A/N, 1) — Conducted with traffic enforcement? `Y`/`N`/`U`.
- **LOCAL_ENF_JURISDICTION** (A/N, 1) — Conducted by local jurisdiction? `Y`/`N`/`U`.
- **POST_ACC_IND** (A/N, 1) — Post-accident inspection? `Y`/`N`/`Null`.

### Violation Totals

These six pairs provide the total count of violations and out-of-service (OOS) violations, broken out by defect group:

| Field | Description |
|-------|-------------|
| VIOL_TOTAL / OOS_TOTAL | All violations / all OOS |
| DRIVER_VIOL_TOTAL / DRIVER_OOS_TOTAL | Driver violations / driver OOS |
| VEHICLE_VIOL_TOTAL / VEHICLE_OOS_TOTAL | Vehicle violations / vehicle OOS |
| HAZMAT_VIOL_TOTAL / HAZMAT_OOS_TOTAL | Hazmat violations / hazmat OOS |

All are numeric, max length 3.

### Processing / Pipeline Fields

- **SNET_VERSION_NUMBER** (A/N, 7) — SafetyNet version (`#.#.#.#`).
- **SNET_SEARCH_DATE** (N, 13) — SafetyNet search timestamp.
- **SNET_SEQUENCE_ID** (N, 10) — SafetyNet sequence ID.
- **TRANSACTION_CODE** (A/N, 1) — `A` = Add to MCMIS, `C` = Change existing record.
- **UPLOAD_FIRST_BYTE** (A/N, 1) — Upload census first byte.
- **UPLOAD_DOT_NUMBER** (A/N, 8) — USDOT number as uploaded.
- **UPLOAD_SEARCH_INDICATOR** (A/N, 1) — `M` = Manual, `Null` otherwise.
- **PEN_CEN_MATCH** (A/N, 1) — ASPEN carrier match indicator: `B`, `I`, `N`, `P`, `Q`, `Y`, or `Null`.
- **SOURCE_OFFICE** (A/N, 7) — Office that sent the inspection.
- **GROSS_COMB_VEH_WT** (A/N, 6) — Gross combined vehicle weight in pounds.

### Carrier Information (from Carrier Table)

Fields 55–63 are pulled from the linked Carrier Table:

- **INSP_CARRIER_NAME** (A/N, 120) — Legal name of the carrier (individual, partnership, or corporation).
- **INSP_CARRIER_STREET** (A/N, 50), **INSP_CARRIER_CITY** (A/N, 25), **INSP_CARRIER_STATE** (A/N, 2), **INSP_CARRIER_ZIP_CODE** (A/N, 10) — Principal place of business address.
- **INSP_COLONIA** (A/N, 25) — Mexican Colonia (for Mexican-domiciled carriers).
- **DOCKET_NUMBER** (N, 8) — MC, MX, or FF number assigned by FMCSA or the former ICC.
- **INSP_INTERSTATE** (A/N, 1) — Interstate commerce? `Y`/`N`.
- **INSP_CARRIER_STATE_ID** (A/N, 12) — State-assigned carrier ID.

### Removed/Deprecated Fields

13 fields have been removed from the old inspection and carrier tables, including `INSP_CONFIDENCE_LEVEL`, `PENFIELD2`, `PENFIELD3`, `DEFECT_VER`, `OOS_DEFECT_VER`, `VIOL_NOT_SENT`, `OOS_NOT_SENT`, `ORIG_REPORT_STATE`, `ORIG_REPORT_NUMBER`, `ORIG_REPORT_DATE`, `ORIG_REPORT_TIME`, `INSP_CARRIER_ID`, and `PREFIX`.

---

## 2. Inspections Per Unit Table

Each row represents a single vehicle unit within an inspection. An inspection may have multiple units (e.g., a tractor-trailer combination = 2 units).

- **INSPECTION_ID** (N, 8) — Links back to the master inspection.
- **INSP_UNIT_ID** (N, 9) — Unique unit identifier.
- **INSP_UNIT_TYPE_ID** (N, 8) — Vehicle unit type code:
  - 1=Bus, 2=Dolly Converter, 3=Full Trailer, 4=Limousine, 5=Motor Carrier, 6=Other, 7=Pole Trailer, 8=School Bus, 9=Semi Trailer, 10=Straight Truck, 11=Truck Tractor, 12=Van, 13=Unknown, 14=Intermodal Chassis, 15=Crib Log Trailer.
- **INSP_UNIT_NUMBER** (N, 1) — Sequence of the unit within the inspection (1–6).
- **INSP_UNIT_MAKE** (A/N, 10) — Manufacturer.
- **INSP_UNIT_COMPANY** (A/N, 15) — Carrier-assigned unit number.
- **INSP_UNIT_LICENSE** (A/N, 12) — License plate number.
- **INSP_UNIT_LICENSE_STATE** (A/N, 2) — Issuing state for the plate.
- **INSP_UNIT_VEHICLE_ID_NUMBER** (A/N, 17) — VIN.
- **INSP_UNIT_DECAL** (A/N, 1) — CVSA decal issued? `Y`/`N`/`U`.
- **INSP_UNIT_DECAL_NUMBER** (A/N, 8) — Decal number.

---

## 3. Vehicle Inspections and Violations Table

Each row is a single violation found during an inspection.

- **INSPECTION_ID** (N, 8) — Links to the master inspection.
- **INSP_VIOLATION_ID** (N, 9) — Unique violation identifier.
- **SEQ_NO** (N, 3) — Violation sequence number.
- **PART_NO** (A/N, 3) — FMCSR/HMR part number of the cited violation.
- **PART_NO_SECTION** (A/N, 40) — Section number of the cited violation.
- **INSP_VIOL_UNIT** (A/N, 1) — Which unit had the violation: `D` = Driver, `C` = Co-driver, `1`–`6` = vehicle unit number.
- **INSP_UNIT_ID** (N, 9) — Links to the unit in the Inspections Per Unit table.
- **INSP_VIOLATION_CATEGORY_ID** (N, 8) — Category number (1–99). See Violation Categories below.
- **OUT_OF_SERVICE_INDICATOR** (A/N, 1) — `Z` = Driver OOS, `Y` = Vehicle OOS, `N` = Not OOS, `Null`.
- **DEFECT_VERIFICATION_ID** (N, 8) — How the defect was resolved: `1` = Repaired at scene, `2` = Towed/escorted to repair, `3` = Non-OOS, `4` = Other, `99` = Unknown/Unverified.
- **CITATION_NUMBER** (A/N, 15) — Citation number if issued.

---

## 4. Special Studies Table

Captures ad hoc data for targeted FMCSA studies attached to inspections.

- **INSPECTION_ID** (N, 8) — Links to the master inspection.
- **INSP_STUDY_ID** (N, 8) — Unique study identifier.
- **STUDY** (A/N, 40) — The collected study data.
- **SEQ_NO** (N, 3) — Indicates whether data is in Study field 1, 2, 3, 4, or 5.

---

## 5. Inspections and Citations Table

Links citation outcomes to specific violations.

- **INSPECTION_ID** (N, 8) — Links to the master inspection.
- **VIOSEQNUM** (N, 8) — Violation sequence number.
- **ADJSEQ** (N, 8) — Adjusted violation sequence number.
- **CITATION_CODE** (N, 8) — Citation code.
- **CITATION_RESULT** (A/N, 100) — Result/outcome of the citation.

Several fields were removed from the old `INSP_VIOL_CITATION` and `INSP_CITATION_CODE` tables, including `CHALLENGEID`, `CITATIONRESULT`, `RESULTDATE`, `COMMENTS`, `CHANGESOURCE`, `UPLOADDATE`, `ADDDATE`, `ADDUSER`, and old `CHANGE_DATE`/`CHANGE_BY_USER` fields.

---

## Violation Categories

Violations are organized into three defect groups plus an invalid category. The `INSP_VIOLATION_CATEGORY_ID` field in the Violations table references these numbers.

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

## Glossary of Key Terms

- **CVSA** — Commercial Vehicle Safety Alliance. Organization of U.S., Canadian, and Mexican states/provinces dedicated to uniform CMV safety enforcement.
- **FMCSA** — Federal Motor Carrier Safety Administration. The DOT administration responsible for CMV safety standards.
- **FMCSR** — Federal Motor Carrier Safety Regulations. Title 49 CFR, Subtitle B, Chapter III.
- **HMR** — Hazardous Materials Regulations. Title 49 CFR, Subtitle B, Chapter I.
- **MCSAP** — Motor Carrier Safety Assistance Program. Federal program funding state CMV safety activities.
- **SafetyNet** — State-based information system for processing carrier safety data before upload to MCMIS.
- **ASPEN** — The electronic inspection software used by roadside inspectors.
- **OOS (Out-of-Service)** — A violation requiring the vehicle or driver to be removed from service until the issue is corrected.
- **USDOT Number** — Unique ID assigned to all interstate commercial carriers regulated by FMCSA.
- **Docket Number** — MC, MX, or FF number assigned by FMCSA or the former ICC.
- **Full Inspection (Level I)** — Most comprehensive type, includes under-vehicle brake measurement and HOS log review.
- **Walk-Around (Level II)** — Like Level I but without climbing under the vehicle.
- **Driver-Only (Level III)** — Examines only driver licensing, medical certs, and HOS.
- **Special Study (Level IV)** — Ad hoc examination for targeted research.
- **Terminal (Level V)** — Examination at carrier terminal facilities, usually Walk-Around technique focusing on vehicle aspects.
- **Single** — Tractor + one trailer.
- **Double** — Tractor + two trailers.
- **Triple** — Tractor + three trailers.
- **Straight Truck** — Power unit and cargo box are non-detachable.

---

## Table Relationships

```
Vehicle Inspection File (INSPECTION_ID) ──┐
    │                                      │
    ├── Inspections Per Unit (INSPECTION_ID, INSP_UNIT_ID)
    │       │
    │       └── Referenced by Violations table via INSP_UNIT_ID
    │
    ├── Vehicle Inspections & Violations (INSPECTION_ID, INSP_VIOLATION_ID)
    │       │
    │       └── Inspections & Citations (INSPECTION_ID, VIOSEQNUM, ADJSEQ)
    │
    └── Special Studies (INSPECTION_ID, INSP_STUDY_ID)
```

---

## Data Type Key

- **N** = Numeric
- **A/N** = Alphanumeric (may contain letters, numbers, or special characters)

---

## County Codes Reference

The source document (pages 14–84) contains the complete FIPS county code listing for all 50 U.S. states, Puerto Rico, the U.S. Virgin Islands, and Washington D.C. These codes are used in the `COUNTY_CODE` field paired with the `COUNTY_CODE_STATE` field to identify the specific county where an inspection occurred. The JSON companion file does not include the full county listing due to volume (3,000+ entries); refer to the source PDF for the complete reference.

---

## State Abbreviations

Standard two-letter USPS abbreviations for all 50 states plus: `DC` (District of Columbia), `PR` (Puerto Rico), `VI` (U.S. Virgin Islands), `OT` (Other), `UK`/`ZZ` (Unknown).