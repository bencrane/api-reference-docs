# MCMIS Vehicle Inspection Data Set Dictionary

**Source:** FMCSA MCMIS Vehicle Inspection File Data Dictionary  
**Revision:** 5  
**Date:** October 15, 2025  
**Pages:** 84  

---

## Overview

This document defines the data structure for the **Motor Carrier Management Information System (MCMIS)** Vehicle Inspection data set. MCMIS is operated by the Federal Motor Carrier Safety Administration (FMCSA) and contains comprehensive safety data on interstate and intrastate commercial carriers.

The data set captures every roadside or facility inspection of commercial motor vehicles (trucks, buses, etc.) conducted under the Motor Carrier Safety Assistance Program (MCSAP). It tracks the inspection itself, the vehicle units inspected, any violations found, special studies, and citation outcomes.

---

## Data Model — 5 Tables

The data set is organized into five relational tables, all linked by `INSPECTION_ID`:

```
VEHICLE INSPECTION FILE (1 record per inspection)
    │
    ├── INSPECTIONS PER UNIT (1 record per vehicle unit in the inspection)
    │
    ├── VEHICLE INSPECTIONS AND VIOLATIONS (1 record per violation found)
    │
    ├── SPECIAL STUDIES (1 record per study data point)
    │
    └── INSPECTIONS AND CITATIONS (1 record per citation outcome)
```

---

## Table 1: Vehicle Inspection File

This is the **primary inspection-level table** with 63 active fields. Each row represents a single inspection event.

### Key Identifiers

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `INSPECTION_ID` | 8 | N | Unique inspection record ID |
| `DOT_NUMBER` | 8 | N | USDOT number assigned to the carrier |
| `REPORT_STATE` | 2 | A/N | State that uploaded the inspection |
| `REPORT_NUMBER` | 10 | A/N | Inspection report number (format: `SS########`) |

### Inspection Details

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `INSP_DATE` | 8 | A/N | Inspection date (`YYYYMMDD`) |
| `INSP_START_TIME` | 4 | A/N | Start time in military format (`HHMM`; `9999` = unknown) |
| `INSP_END_TIME` | 4 | A/N | End time in military format |
| `REGISTRATION_DATE` | 8 | A/N | Date correction of defects was registered |
| `INSP_LEVEL_ID` | 8 | N | Inspection level (see Inspection Levels below) |
| `INSP_FACILITY` | 1 | A/N | `F` = Fixed, `R` = Roadside, `Null` = N/A |
| `POST_ACC_IND` | 1 | A/N | `Y` if conducted after an accident |

### Location Fields

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `REGION` | 2 | A/N | FHWA/FMCSA region code (1, 3–10) |
| `LOCATION` | 6 | A/N | State-assigned location code |
| `LOCATION_DESC` | 30 | A/N | Physical location description |
| `COUNTY_CODE_STATE` | 2 | A/N | State abbreviation for county |
| `COUNTY_CODE` | 3 | A/N | FIPS county code |
| `SERVICE_CENTER` | 2 | A/N | `MW` = Midwest, `EA` = East, `SH` = South, `WE` = West |

### Status & Processing

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `CI_STATUS_CODE` | 1 | A/N | Inspection status (see Status Codes below) |
| `CENSUS_SOURCE_ID` | 8 | N | USDOT verification method (1–5) |
| `PEN_CEN_MATCH` | 1 | A/N | ASPEN carrier match indicator |
| `FINAL_STATUS_DATE` | 13 | N | Date/time status code was changed |
| `TRANSACTION_CODE` | 1 | A/N | `A` = Add, `C` = Change |
| `TRANSACTION_DATE` | 13 | N | Date/time transaction was entered |

### Violation Totals

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `VIOL_TOTAL` | 3 | N | Total violations |
| `OOS_TOTAL` | 3 | N | Total out-of-service violations |
| `DRIVER_VIOL_TOTAL` | 3 | N | Total driver violations |
| `DRIVER_OOS_TOTAL` | 3 | N | Total driver OOS violations |
| `VEHICLE_VIOL_TOTAL` | 3 | N | Total vehicle violations |
| `VEHICLE_OOS_TOTAL` | 3 | N | Total vehicle OOS violations |
| `HAZMAT_VIOL_TOTAL` | 3 | N | Total hazmat violations |
| `HAZMAT_OOS_TOTAL` | 3 | N | Total hazmat OOS violations |

### HazMat & Enforcement

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `HAZMAT_PLACARD_REQ` | 1 | A/N | Hazmat placards required (`Y`/`N`/`Null`) |
| `CARGO_TANK` | 3 | A/N | Cargo tank type code (from ASPEN) |
| `SHIPPER_NAME` | 120 | A/N | Shipping company name |
| `SHIPPING_PAPER_NUMBER` | 15 | A/N | Shipping paper number or "NONE" |
| `ALCOHOL_CONTROL_SUB` | 1 | A/N | Alcohol/controlled substance check performed |
| `DRUG_INTRDCTN_SEARCH` | 1 | A/N | Drug interdiction search performed |
| `DRUG_INTRDCTN_ARRESTS` | 2 | N | Number of drug interdiction arrests |
| `SIZE_WEIGHT_ENF` | 1 | A/N | Size/weight enforcement action |
| `TRAFFIC_ENF` | 1 | A/N | Traffic enforcement action |
| `LOCAL_ENF_JURISDICTION` | 1 | A/N | Conducted by local jurisdiction |

### Carrier Information (from Carrier Table)

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `INSP_CARRIER_NAME` | 120 | A/N | Carrier name |
| `INSP_CARRIER_STREET` | 50 | A/N | Street address |
| `INSP_CARRIER_CITY` | 25 | A/N | City |
| `INSP_CARRIER_STATE` | 2 | A/N | State |
| `INSP_CARRIER_ZIP_CODE` | 10 | A/N | ZIP code |
| `INSP_COLONIA` | 25 | A/N | Mexican Colonia (for MX carriers) |
| `DOCKET_NUMBER` | 8 | N | MC/MX/FF docket number |
| `INSP_INTERSTATE` | 1 | A/N | Interstate commerce (`Y`/`N`) |
| `INSP_CARRIER_STATE_ID` | 12 | A/N | State-assigned carrier ID |

### SafetyNet & System Fields

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `SNET_VERSION_NUMBER` | 7 | A/N | SafetyNet version (`#.#.#.#`) |
| `SNET_SEARCH_DATE` | 13 | N | SafetyNet search datetime |
| `SNET_SEQUENCE_ID` | 10 | N | SafetyNet sequence ID |
| `SNET_INPUT_DATE` | 13 | N | SafetyNet input datetime |
| `UPLOAD_DATE` | 13 | N | Upload datetime |
| `UPLOAD_FIRST_BYTE` | 1 | A/N | Upload census first byte |
| `UPLOAD_DOT_NUMBER` | 8 | A/N | Uploaded USDOT number |
| `UPLOAD_SEARCH_INDICATOR` | 1 | A/N | `M` = Manual, `Null` |
| `CENSUS_SEARCH_DATE` | 13 | N | Census search datetime |
| `SOURCE_OFFICE` | 7 | A/N | Office that sent the inspection |
| `MCMIS_ADD_DATE` | 13 | N | Date added to MCMIS |
| `GROSS_COMB_VEH_WT` | 6 | A/N | Gross combined vehicle weight (lbs) |
| `CHANGE_DATE` | 13 | N | Last updated datetime |

### Removed Fields

The following fields were removed in this revision and no longer appear in the data: `INSP_CONFIDENCE_LEVEL`, `PENFIELD2`, `PENFIELD3`, `DEFECT_VER`, `OOS_DEFECT_VER`, `VIOL_NOT_SENT`, `OOS_NOT_SENT`, `ORIG_REPORT_STATE`, `ORIG_REPORT_NUMBER`, `ORIG_REPORT_DATE`, `ORIG_REPORT_TIME`, `INSP_CARRIER_ID`, `PREFIX`.

---

## Table 2: Inspections Per Unit

Each row represents one **vehicle unit** inspected within an inspection (a single inspection can have up to 6 units, e.g., tractor + trailer(s)). Contains 12 fields.

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `CHANGE_DATE` | 13 | N | Last updated datetime |
| `INSPECTION_ID` | 8 | N | Links to main inspection table |
| `INSP_UNIT_ID` | 9 | N | Unique unit ID |
| `INSP_UNIT_TYPE_ID` | 8 | N | Vehicle unit type code (1–15, see Unit Types below) |
| `INSP_UNIT_NUMBER` | 1 | N | Unit sequence (1–6) |
| `INSP_UNIT_MAKE` | 10 | A/N | Manufacturer |
| `INSP_UNIT_COMPANY` | 15 | A/N | Carrier-assigned unit number |
| `INSP_UNIT_LICENSE` | 12 | A/N | License plate number |
| `INSP_UNIT_LICENSE_STATE` | 2 | A/N | License plate state |
| `INSP_UNIT_VEHICLE_ID_NUMBER` | 17 | A/N | VIN |
| `INSP_UNIT_DECAL` | 1 | A/N | CVSA decal issued (`Y`/`N`/`U`) |
| `INSP_UNIT_DECAL_NUMBER` | 8 | A/N | CVSA decal number |

---

## Table 3: Vehicle Inspections and Violations

Each row represents one **violation** found during an inspection. Contains 12 fields.

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `CHANGE_DATE` | 13 | N | Last updated datetime |
| `INSPECTION_ID` | 8 | N | Links to main inspection table |
| `INSP_VIOLATION_ID` | 9 | N | Unique violation ID |
| `SEQ_NO` | 3 | N | Violation sequence number |
| `PART_NO` | 3 | A/N | Violation code part number (FMCSR/HMR ref) |
| `PART_NO_SECTION` | 40 | A/N | Violation code section number |
| `INSP_VIOL_UNIT` | 1 | A/N | Unit with violation (`D` = driver, `C` = co-driver, `1-6` = vehicle unit) |
| `INSP_UNIT_ID` | 9 | N | Unit ID link |
| `INSP_VIOLATION_CATEGORY_ID` | 8 | N | Violation category (1–99, see categories below) |
| `OUT_OF_SERVICE_INDICATOR` | 1 | A/N | OOS result (`Z` = Driver Yes, `Y` = Yes, `N` = No) |
| `DEFECT_VERIFICATION_ID` | 8 | N | How defect was resolved (1–4, 99) |
| `CITATION_NUMBER` | 15 | A/N | Citation number |

### Defect Verification Codes

| Code | Description |
|------|-------------|
| 1 | A – Repaired at scene |
| 2 | B – Towed/Escorted to repair service |
| 3 | N – Non-OOS / Driver Non-OOS |
| 4 | D – Other |
| 99 | U – Unknown/Unverified |

---

## Table 4: Special Studies

Each row captures data collected as part of an ad-hoc **special study** associated with an inspection. Contains 5 fields.

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `CHANGE_DATE` | 13 | N | Last updated datetime |
| `INSPECTION_ID` | 8 | N | Links to main inspection table |
| `INSP_STUDY_ID` | 8 | N | Unique study ID |
| `STUDY` | 40 | A/N | Study data collected |
| `SEQ_NO` | 3 | N | Sequence number (indicates study field 1–5) |

---

## Table 5: Inspections and Citations

Each row represents a **citation outcome** linked to a specific violation. Contains 6 active fields.

| Field | Length | Type | Description |
|-------|--------|------|-------------|
| `CHANGE_DATE` | 13 | N | Last updated datetime |
| `INSPECTION_ID` | 8 | N | Links to main inspection table |
| `VIOSEQNUM` | 8 | N | Violation sequence number |
| `ADJSEQ` | 8 | N | Adjusted violation sequence number |
| `CITATION_CODE` | 8 | N | Citation code |
| `CITATION_RESULT` | 100 | A/N | Result of the citation |

### Removed Fields

Several fields were removed from the old `INSP_VIOL_CITATION` and `INSP_CITATION_CODE` tables including `CHALLENGEID`, `CITATIONRESULT`, `RESULTDATE`, `COMMENTS`, `CHANGESOURCE`, `UPLOADDATE`, `ADDDATE`, `ADDUSER`, `CHANGE_DATE` (citation code), and `CHANGE_BY_USER`.

---

## Violation Categories

Violations are grouped into three defect groups plus an invalid category.

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

### HazMat Violations (Categories 31–39)

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

## Reference: Inspection Levels

| Level | Name | Description |
|-------|------|-------------|
| 1 | Full (Level I) | Most comprehensive — includes under-vehicle brake measurement and hours-of-service log examination |
| 2 | Walk-Around (Level II) | Like Full but without climbing under the vehicle |
| 3 | Driver-Only (Level III) | Only driver-related aspects (CDL, medical cert, HOS) |
| 4 | Special Study (Level IV) | Ad-hoc examination of particular items for a specific study |
| 5 | Terminal (Level V) | Examination at carrier terminal facilities, usually walk-around technique |
| 99 | Invalid | Invalid inspection level |

## Reference: Status Codes (`CI_STATUS_CODE`)

| Code | Meaning |
|------|---------|
| U | Unprocessed |
| T | To Census Search |
| C | Complete |
| D | Duplicate |
| N | Nonmatch |
| H | FMCSA hold |
| I | Intrastate |
| P | Potential Resolution |
| X | Non-motor carrier |

## Reference: FMCSA Regions

| Region | States |
|--------|--------|
| 1 | CT, ME, MA, NH, NY, NJ, RI, VT, PR, VI |
| 3 | DE, DC, MD, PA, VA, WV |
| 4 | AL, GA, FL, MS, NC, SC, TN, KY |
| 5 | IL, IN, MI, OH, MN, WI |
| 6 | AR, LA, NM, OK, TX |
| 7 | IA, KS, MO, NE |
| 8 | CO, MT, ND, SD, UT, WY |
| 9 | AZ, CA, NV, HI, GU, AS |
| 10 | AK, ID, OR, WA |

## Reference: Unit Type Codes

| Code | Abbrev | Type |
|------|--------|------|
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

## Reference: Census Source IDs

| Code | Method |
|------|--------|
| 1 | Matchware |
| 2 | Manual Census Search |
| 3 | Matching Algorithm |
| 4 | Pen-Based (not used on Crashes) |
| 5 | SafetyNet Uploaded and not changed |

## Reference: State Abbreviations & County Codes

The full document includes all US state abbreviations (pages 12–13) and a complete FIPS county code listing by state covering all 50 states, DC, Puerto Rico, and the US Virgin Islands (pages 14–84). These are standard FIPS codes and are included in the accompanying JSON file's reference data section.

---

## Glossary of Key Terms

- **CVSA** — Commercial Vehicle Safety Alliance; organization dedicated to improving uniformity of CMV safety enforcement across US, Canada, and Mexico.
- **FMCSA** — Federal Motor Carrier Safety Administration; the DOT administration responsible for CMV safety standards.
- **FMCSR** — Federal Motor Carrier Safety Regulations (Title 49 CFR, Subtitle B, Chapter III).
- **HMR** — Hazardous Materials Regulations (Title 49 CFR, Subtitle B, Chapter I).
- **MCMIS** — Motor Carrier Management Information System; the FMCSA's computerized safety data system.
- **MCSAP** — Motor Carrier Safety Assistance Program; federal program providing funds to states for CMV safety activities.
- **OOS** — Out-of-Service; a violation requiring the vehicle or driver to be removed from service until corrected.
- **SafetyNet** — State-based information system used to store and process carrier safety data before transfer to MCMIS.
- **ASPEN** — Electronic inspection software used by inspectors in the field.
- **USDOT Number** — Unique ID assigned to all interstate commercial carriers regulated by FMCSA.