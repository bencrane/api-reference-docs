# SMS Intrastate Non-Hazmat — Pass/Property Data Definition

**Source:** `SMS_C_PassProperty_Readme_Data_Definition_Rev03_2025-04-17.txt`

---

## Overview

This data file is produced by FMCSA's **Safety Measurement System (SMS)**. It is calculated from monthly snapshots of input data and contains summary safety results for all **active Intrastate Non-Hazmat motor carriers** transporting property and/or passengers.

- **Format:** Comma-delimited (CSV)
- **Granularity:** One row per carrier
- **Measurement period:** 24 months (rolling)

---

## Field Reference

### Carrier Identifier

| Field | Description |
|---|---|
| `DOT_NUMBER` | US DOT Number of the motor carrier (Intrastate Non-Hazmat only) |

### Inspection Totals

These fields summarize overall inspection activity over the 24-month measurement window.

| Field | Description |
|---|---|
| `INSP_TOTAL` | Total number of inspections |
| `DRIVER_INSP_TOTAL` | Total number of driver inspections |
| `DRIVER_OOS_INSP_TOTAL` | Driver inspections with at least one Driver Out-of-Service violation |
| `VEHICLE_INSP_TOTAL` | Total number of vehicle inspections |
| `VEHICLE_OOS_INSP_TOTAL` | Vehicle inspections with at least one Vehicle Out-of-Service violation |

### BASIC Categories

FMCSA groups safety violations into **Behavior Analysis and Safety Improvement Categories (BASICs)**. Each BASIC below includes three fields:

- **`*_INSP_W_VIOL`** — Count of inspections with at least one violation in this BASIC
- **`*_MEASURE`** — Roadside Performance Measure value (a weighted score reflecting violation severity and frequency)
- **`*_AC`** — Acute/Critical Indicator (`Y` = flagged from an investigation within the previous 12 months)

#### Unsafe Driving

| Field | Description |
|---|---|
| `UNSAFE_DRIV_INSP_W_VIOL` | Inspections with an Unsafe Driving violation |
| `UNSAFE_DRIV_MEASURE` | Roadside Performance Measure value |
| `UNSAFE_DRIV_AC` | Acute/Critical Indicator |

#### Hours-of-Service (HOS) Compliance

| Field | Description |
|---|---|
| `HOS_DRIV_INSP_W_VIOL` | Inspections with an HOS violation |
| `HOS_DRIV_MEASURE` | Roadside Performance Measure value |
| `HOS_DRIV_AC` | Acute/Critical Indicator |

#### Driver Fitness

| Field | Description |
|---|---|
| `DRIV_FIT_INSP_W_VIOL` | Inspections with a Driver Fitness violation |
| `DRIV_FIT_MEASURE` | Roadside Performance Measure value |
| `DRIV_FIT_AC` | Serious Violation Indicator |

#### Controlled Substances and Alcohol

| Field | Description |
|---|---|
| `CONTR_SUBST_INSP_W_VIOL` | Inspections with a Controlled Substances/Alcohol violation |
| `CONTR_SUBST_MEASURE` | Roadside Performance Measure value |
| `CONTR_SUBST_AC` | Acute/Critical Indicator |

#### Vehicle Maintenance

| Field | Description |
|---|---|
| `VEH_MAINT_INSP_W_VIOL` | Inspections with a Vehicle Maintenance violation |
| `VEH_MAINT_MEASURE` | Roadside Performance Measure value |
| `VEH_MAINT_AC` | Acute/Critical Indicator |

---

## Key Concepts

- **Out-of-Service (OOS):** A violation severe enough that the driver or vehicle is prohibited from operating until the issue is corrected.
- **BASIC Measure:** A weighted score that accounts for the number, severity, and recency of violations. Higher values indicate worse safety performance.
- **Acute/Critical (AC) Flag:** Indicates the carrier was flagged during a compliance investigation in the past 12 months for serious safety issues in that BASIC category.
- **Intrastate Non-Hazmat:** Carriers operating only within a single state and not transporting hazardous materials. These carriers fall under a distinct SMS scoring segment.

---

## Notes

- All inspection counts and measures cover a **rolling 24-month window** and are recalculated with each monthly snapshot.
- The `*_AC` fields are binary flags (`Y` or blank/null) and reflect investigation findings, not roadside inspection data alone.
- This file does **not** include the HM (Hazardous Materials) or Crash Indicator BASICs, which appear in other SMS data files.