# SMS C PassProperty — Data Definition

## Overview

This file is part of the FMCSA Safety Measurement System (SMS). It contains summary safety results for all **active Intrastate Non-Hazmat motor carriers** of property and/or passengers. The data is calculated from monthly snapshots of input data files.

- **Format:** CSV (comma delimited)
- **Granularity:** One row per carrier
- **Measurement Period:** 24 months (rolling)

---

## Fields

### Carrier Identifier

| Field | Type | Description |
|---|---|---|
| `DOT_NUMBER` | Integer | US DOT Number of the Motor Carrier (Intrastate Non-Hazmat only) |

### Inspection Totals

| Field | Type | Description |
|---|---|---|
| `INSP_TOTAL` | Integer | Total inspections over the 24-month measurement period |
| `DRIVER_INSP_TOTAL` | Integer | Total Driver Inspections |
| `DRIVER_OOS_INSP_TOTAL` | Integer | Driver Inspections with at least one Driver Out-of-Service violation |
| `VEHICLE_INSP_TOTAL` | Integer | Total Vehicle Inspections |
| `VEHICLE_OOS_INSP_TOTAL` | Integer | Vehicle Inspections with at least one Vehicle Out-of-Service violation |

### BASIC Categories

Each BASIC (Behavior Analysis and Safety Improvement Category) includes three fields:

1. **`_INSP_W_VIOL`** — Count of inspections with at least one violation in this BASIC
2. **`_MEASURE`** — Roadside Performance Measure value (a weighted score)
3. **`_AC`** — Acute/Critical Indicator (`Y` = flagged from an investigation within the previous 12 months)

#### Unsafe Driving

| Field | Type | Description |
|---|---|---|
| `UNSAFE_DRIV_INSP_W_VIOL` | Integer | Inspections with an Unsafe Driving violation |
| `UNSAFE_DRIV_MEASURE` | Float | Unsafe Driving performance measure value |
| `UNSAFE_DRIV_AC` | String | Acute/Critical indicator (Y/N) |

#### Hours-of-Service (HOS) Compliance

| Field | Type | Description |
|---|---|---|
| `HOS_DRIV_INSP_W_VIOL` | Integer | Inspections with an HOS violation |
| `HOS_DRIV_MEASURE` | Float | HOS performance measure value |
| `HOS_DRIV_AC` | String | Acute/Critical indicator (Y/N) |

#### Driver Fitness

| Field | Type | Description |
|---|---|---|
| `DRIV_FIT_INSP_W_VIOL` | Integer | Inspections with a Driver Fitness violation |
| `DRIV_FIT_MEASURE` | Float | Driver Fitness performance measure value |
| `DRIV_FIT_AC` | String | Serious Violation indicator (Y/N) |

#### Controlled Substances and Alcohol

| Field | Type | Description |
|---|---|---|
| `CONTR_SUBST_INSP_W_VIOL` | Integer | Inspections with a Controlled Substances/Alcohol violation |
| `CONTR_SUBST_MEASURE` | Float | Controlled Substances/Alcohol performance measure value |
| `CONTR_SUBST_AC` | String | Acute/Critical indicator (Y/N) |

#### Vehicle Maintenance

| Field | Type | Description |
|---|---|---|
| `VEH_MAINT_INSP_W_VIOL` | Integer | Inspections with a Vehicle Maintenance violation |
| `VEH_MAINT_MEASURE` | Float | Vehicle Maintenance performance measure value |
| `VEH_MAINT_AC` | String | Acute/Critical indicator (Y/N) |

---

## Notes

- The **Acute/Critical (AC) indicators** flag carriers that had serious or critical violations discovered during FMCSA investigations in the prior 12 months. A `Y` value is a significant red flag.
- **Measure values** are weighted scores that factor in the severity and recency of violations. Higher values indicate worse safety performance.
- **Out-of-Service (OOS)** means a driver or vehicle was found to be in such poor condition during an inspection that it was ordered off the road immediately.
- This file covers **Intrastate Non-Hazmat** carriers only. Separate files exist for Interstate, Hazmat, and other carrier categories.