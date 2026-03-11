# MCMIS Crash File Data Dictionary — Explainer

**Source:** FMCSA (Federal Motor Carrier Safety Administration)  
**Revision:** 5  
**Date:** November 4, 2025  
**Pages:** 71

---

## What This Document Is

The MCMIS (Motor Carrier Management Information System) Crash File Data Dictionary defines every field in the FMCSA's crash records database. This is the schema reference for crash data reported by states to the federal government involving commercial motor vehicles (trucks and buses). Every crash record involving a CMV that meets federal or state reporting thresholds ends up in this system.

If you're working with MCMIS crash file extracts — whether for safety analysis, carrier scoring, insurance underwriting, or regulatory compliance — this dictionary tells you exactly what each column means, its data type, allowed values, and formatting rules.

---

## File Structure Overview

Each crash record contains **59 active data elements** (fields #1–59), organized into several logical groups:

### Record-Level Identifiers (Fields 1–2)
- **CHANGE_DATE** — Timestamp of last update (`YYYYMMDD HHMM` military time)
- **CRASH_ID** — Unique 8-digit numeric ID for each crash record

### Report Information (Fields 3–7)
These fields capture who reported the crash and when/where it happened:
- **REPORT_STATE** — 2-letter state abbreviation of the reporting state
- **REPORT_NUMBER** — State-designated unique report number (state abbreviation + 10 characters, no spaces)
- **REPORT_DATE** / **REPORT_TIME** — When the crash occurred (`YYYYMMDD` and `HHMM` military)
- **REPORT_SEQ_NO** — Sequence number identifying which CMV in a multi-vehicle crash (starts at 1, increments per vehicle)

### Carrier Identification (Fields 8–10)
- **DOT_NUMBER** — The carrier's USDOT number (aka census number). This is the primary key linking a crash to a specific motor carrier in the MCMIS census database
- **CI_STATUS_CODE** — Processing status: `C` (Complete), `H` (FMCSA Hold), `I` (Intrastate), `N` (Non-Match), `P` (Potential Resolution), `T` (Sent to Census Search), `U` (Initial Upload), `X` (Non Motor Carrier)
- **FINAL_STATUS_DATE** — Date the status was set to a terminal value (C, N, H, or I)

### Crash Location (Fields 11–15)
- **LOCATION** — Street address or highway number (up to 50 chars)
- **CITY_CODE** — 5-digit FIPS PUB 55-3 municipality code (can be blank)
- **CITY** — Municipality name (up to 25 chars)
- **STATE** — 2-letter state where crash occurred
- **COUNTY_CODE** — 3-digit geographic code for the county (see County Codes appendix)

### Vehicle & Road Conditions (Fields 16–28)
This is the richest section — describes the vehicle involved, the road, and environmental conditions:

- **TRUCK_BUS_IND** — `T` (Truck) or `B` (Bus)
- **TRAFFICWAY_ID** — Road division type (1=Two-way undivided, 2=Two-way divided unprotected, 3=Two-way divided with barrier, 4=One-way, 98=Not reported, 99=Unknown)
- **ACCESS_CONTROL_ID** — Highway access control level (1=Full, 2=Partial, 3=None)
- **ROAD_SURFACE_CONDITION_ID** — Surface conditions from Dry (1) through Ice (6) to Unknown (9)
- **CARGO_BODY_TYPE_ID** — 16 possible cargo body types from Bus to Logging to Intermodal
- **GVW_RATING_ID** — Gross vehicle weight class: ≤10K lbs (1), 10K–26K (2), >26K (3)
- **VEHICLE_IDENTIFICATION_NUMBER** — 17-character VIN
- **VEHICLE_LICENSE_NUMBER** / **VEHICLE_LIC_STATE** — Plate info
- **VEHICLE_HAZMAT_PLACARD** — Y/N for hazmat placard displayed
- **WEATHER_CONDITION_ID** — Weather at time of crash (9 values from clear to unknown)
- **VEHICLE_CONFIGURATION_ID** — 12 configuration types from Passenger Car (with HM placard) through Tractor/Triple to Unknown Heavy Truck
- **LIGHT_CONDITION_ID** — Lighting conditions (Daylight, Dark-Lighted, Dawn, Dusk, etc.)

### Crash Severity (Fields 29–36)
- **HAZMAT_RELEASED** — Y/N for hazmat cargo release
- **AGENCY** — Investigating/reporting agency name
- **VEHICLES_IN_ACCIDENT** — Total vehicles involved (all types, not just CMVs)
- **FATALITIES** — Deaths at scene
- **INJURIES** — Persons transported for immediate medical attention
- **TOW_AWAY** — Y/N if any vehicle was towed from scene
- **FEDERAL_RECORDABLE** — Y/N. A crash is federally recordable if: at least one fatality, OR at least one injury requiring off-scene medical treatment, OR a vehicle was towed
- **STATE_RECORDABLE** — Y/N per state-specific criteria

### Upload & Processing Metadata (Fields 37–45)
These are system/processing fields:
- **SNET_VERSION_NUMBER** / **SNET_SEQUENCE_ID** — SafetyNet versioning
- **TRANSACTION_CODE** — `A` (Add) or `C` (Change)
- **TRANSACTION_DATE** — When the transaction occurred
- **UPLOAD_FIRST_BYTE** — First character of the uploaded DOT number (`0` = valid, `F` = federal, `S` = state)
- **UPLOAD_DOT_NUMBER** — Remainder of uploaded DOT number (used with UPLOAD_FIRST_BYTE for carrier matching)
- **UPLOAD_SEARCH_INDICATOR** — Y or blank (was a DOT number search performed?)
- **UPLOAD_DATE** / **ADD_DATE** — System timestamps

### Carrier Detail (Fields 46–58)
These come from the **Crash Carrier Table** and describe the carrier entity:
- **CRASH_CARRIER_ID** — Carrier record ID
- **CRASH_CARRIER_NAME** — Carrier name (up to 120 chars)
- **CRASH_CARRIER_STREET** / **CITY** / **CITY_CODE** / **STATE** / **ZIP_CODE** — Full carrier address
- **CRASH_COLONIA** — Mexican Colonia (for cross-border carriers)
- **DOCKET_NUMBER** — MC/MX docket number
- **CRASH_CARRIER_INTERSTATE** — `Y` (Interstate), `N` (Intrastate), `X` (Non Motor Carrier)
- **NO_ID_FLAG** — Flag when no census number is available
- **STATE_NUMBER** / **STATE_ISSUING_NUMBER** — State-level census number and issuing state

### Crash Events (Field 59)
- **CRASH_EVENT_SEQ_ID_DESC** — This is a concatenated, variable-length field containing event sequences. Format: `SEQ_NO:EVENT_ID:EVENT_DESC` with multiple events joined by semicolons (`;`). There are 22 defined event types ranging from "Non collision ran off road" (1) through "Collision involving motor vehicle in transport" (13) to "Other" (98).

---

## Removed Fields

Six fields were removed from the current file version:
- **CENSUS_SEARCH_DATE** — Formerly on the Crash Master Table
- **CRASH_ID** (from Crash Carrier Table) — Redundant
- **CARRIER_SOURCE_CODE** — How the carrier name was identified (Side of Vehicle, Shipping Papers, Driver, Log Book)
- **PREFIX** — MC, MX, FF or Null
- **CRASH_EVENT_ID** / **CRASH_ID** (from Crash Event Table) — Replaced by the concatenated CRASH_EVENT_SEQ_ID_DESC field

---

## Key Concepts for Working With This Data

**Federally Recordable vs. State Recordable:** Not all crashes in the file meet federal thresholds. Filter on `FEDERAL_RECORDABLE = 'Y'` if you only want crashes that meet the FMCSA definition (fatality, injury requiring medical transport, or tow-away).

**Carrier Match Status:** The `CI_STATUS_CODE` field is critical for data quality. Only `C` (Complete) records have been definitively matched to a carrier. `N` (Non-Match) and `P` (Potential Resolution) records may not link to the correct DOT number.

**Multi-Vehicle Crashes:** Use `REPORT_SEQ_NO` to identify which CMV record you're looking at within a multi-vehicle crash. `VEHICLES_IN_ACCIDENT` gives the total count across all vehicle types.

**CRASH_EVENT_SEQ_ID_DESC Parsing:** This is the trickiest field to work with. It's a semicolon-delimited string of colon-delimited triplets. Example: `1:13:Collision involving motor vehicle in transport;2:3:Non collision overturn (rollover)`. You'll need to split on `;` first, then `:` within each event.

---

## Glossary Highlights

| Term | Definition |
|------|-----------|
| **FMCSA** | Federal Motor Carrier Safety Administration — the USDOT agency overseeing CMV safety |
| **MCMIS** | Motor Carrier Management Information System — the central database for carrier safety data |
| **USDOT Number** | Unique ID assigned to all interstate commercial carriers regulated by FMCSA |
| **SafetyNet** | State-based system that standardizes and validates data before transfer to MCMIS |
| **Federally Recordable** | Crash with a fatality, injury requiring off-scene medical care, or a tow-away |
| **OOS Violation** | Out-of-Service violation requiring immediate removal from operation |
| **CVSA** | Commercial Vehicle Safety Alliance — US/Canada/Mexico enforcement standards org |
| **FMCSR** | Federal Motor Carrier Safety Regulations (49 CFR, Subtitle B, Chapter III) |
| **HMR** | Hazardous Materials Regulations (49 CFR, Subtitle B, Chapter I) |
| **Potential Resolution** | Crash record that doesn't match a regulated entity in FMCSA's registration system |

---

## Reference Tables

### State Abbreviations
Standard 2-letter US state/territory abbreviations are used throughout, plus three special codes: `OT` (Other), `UK` (Unknown), and `ZZ` (Unknown).

### County Codes
The document includes a comprehensive FIPS-based county code table covering all 50 US states, DC, Puerto Rico, and the US Virgin Islands. The codes are 1–3 digit numeric values unique within each state. The full table spans pages 12–71 of the original PDF (approximately 3,200+ county entries). These are included in summary form in the companion JSON.

---

## Companion JSON File

The `mcmis_crash_file_data_dictionary.json` file contains the same information in a machine-readable format with all 59 data elements, their types, lengths, allowed values, definitions, and the glossary of MCMIS terms. Use the JSON for programmatic schema validation, documentation generation, or building data pipelines against MCMIS crash file extracts.