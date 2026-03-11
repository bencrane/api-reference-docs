# SMS Interstate Passenger Carriers (AB Pass) — Data Definition

**Source:** FMCSA Safety Measurement System (SMS)
**Revision:** Rev03
**Date:** 2025-04-17

---

## Overview

This dataset contains FMCSA SMS summary results for all **active interstate and intrastate hazmat passenger (bus) motor carriers**. It includes percentile rankings and alert statuses not available in other FMCSA downloads.

**Format:** Comma-delimited (CSV), one carrier per row.
**Measurement Period:** 24 months (rolling).

---

## Carrier Identifier

| Field | Description |
|---|---|
| `DOT_NUMBER` | US DOT Number of the Motor Carrier (Interstate and Intrastate Hazmat only) |

---

## Inspection Totals

These fields capture aggregate inspection counts across the 24-month measurement window.

| Field | Description |
|---|---|
| `INSP_TOTAL` | Total number of inspections |
| `DRIVER_INSP_TOTAL` | Total number of driver inspections |
| `DRIVER_OOS_INSP_TOTAL` | Driver inspections with at least one Driver Out-of-Service violation |
| `VEHICLE_INSP_TOTAL` | Total number of vehicle inspections |
| `VEHICLE_OOS_INSP_TOTAL` | Vehicle inspections with at least one Vehicle Out-of-Service violation |

---

## BASIC Categories

Each BASIC (Behavior Analysis and Safety Improvement Category) follows a consistent six-field pattern:

| Suffix | Meaning |
|---|---|
| `_INSP_W_VIOL` | Number of inspections with at least one violation in this BASIC |
| `_MEASURE` | Roadside Performance Measure value (weighted violation rate) |
| `_PCT` | Roadside Performance Percentile (0–100 ranking against peer group) |
| `_RD_ALERT` | Roadside Performance Over Threshold Indicator (`Y` = over intervention threshold) |
| `_AC` | Acute/Critical Indicator (`Y` = from investigation within previous 12 months) |
| `_BASIC_ALERT` | Overall BASIC Alert (`Y` = percentile over threshold and/or serious violation within previous 12 months) |

---

### Unsafe Driving (`UNSAFE_DRIV_*`)

Covers violations related to unsafe driving behaviors (speeding, reckless driving, improper lane change, etc.).

| Field | Description |
|---|---|
| `UNSAFE_DRIV_INSP_W_VIOL` | Inspections with at least one Unsafe Driving violation |
| `UNSAFE_DRIV_MEASURE` | Roadside Performance Measure value |
| `UNSAFE_DRIV_PCT` | Roadside Performance Percentile |
| `UNSAFE_DRIV_RD_ALERT` | Over Threshold Indicator (`Y` = over intervention threshold) |
| `UNSAFE_DRIV_AC` | Acute/Critical Indicator |
| `UNSAFE_DRIV_BASIC_ALERT` | Overall BASIC Alert Indicator |

---

### Hours-of-Service Compliance (`HOS_DRIV_*`)

Covers violations related to HOS rules (driving beyond allowed hours, logbook falsification, etc.).

| Field | Description |
|---|---|
| `HOS_DRIV_INSP_W_VIOL` | Inspections with at least one HOS violation |
| `HOS_DRIV_MEASURE` | Roadside Performance Measure value |
| `HOS_DRIV_PCT` | Roadside Performance Percentile |
| `HOS_DRIV_RD_ALERT` | Over Threshold Indicator |
| `HOS_DRIV_AC` | Acute/Critical Indicator |
| `HOS_DRIV_BASIC_ALERT` | Overall BASIC Alert Indicator |

---

### Driver Fitness (`DRIV_FIT_*`)

Covers violations related to driver qualifications (licensing, medical certification, experience, etc.).

| Field | Description |
|---|---|
| `DRIV_FIT_INSP_W_VIOL` | Inspections with at least one Driver Fitness violation |
| `DRIV_FIT_MEASURE` | Roadside Performance Measure value |
| `DRIV_FIT_PCT` | Roadside Performance Percentile |
| `DRIV_FIT_RD_ALERT` | Over Threshold Indicator |
| `DRIV_FIT_AC` | Acute/Critical Indicator |
| `DRIV_FIT_BASIC_ALERT` | Overall BASIC Alert Indicator |

---

### Controlled Substances and Alcohol (`CONTR_SUBST_*`)

Covers violations related to drug and alcohol use/testing requirements.

| Field | Description |
|---|---|
| `CONTR_SUBST_INSP_W_VIOL` | Inspections with at least one Controlled Substances/Alcohol violation |
| `CONTR_SUBST_MEASURE` | Roadside Performance Measure value |
| `CONTR_SUBST_PCT` | Roadside Performance Percentile |
| `CONTR_SUBST_RD_ALERT` | Over Threshold Indicator |
| `CONTR_SUBST_AC` | Acute/Critical Indicator |
| `CONTR_SUBST_BASIC_ALERT` | Overall BASIC Alert Indicator |

---

### Vehicle Maintenance (`VEH_MAINT_*`)

Covers violations related to vehicle condition (brakes, tires, lights, cargo securement, etc.).

| Field | Description |
|---|---|
| `VEH_MAINT_INSP_W_VIOL` | Inspections with at least one Vehicle Maintenance violation |
| `VEH_MAINT_MEASURE` | Roadside Performance Measure value |
| `VEH_MAINT_PCT` | Roadside Performance Percentile |
| `VEH_MAINT_RD_ALERT` | Over Threshold Indicator |
| `VEH_MAINT_AC` | Acute/Critical Indicator |
| `VEH_MAINT_BASIC_ALERT` | Overall BASIC Alert Indicator |

---

## Key Concepts

**BASIC:** Behavior Analysis and Safety Improvement Category — the groupings FMCSA uses to evaluate carrier safety performance.

**Measure Value:** A weighted violation rate that accounts for the severity and time-weight of each violation found during roadside inspections.

**Percentile:** A carrier's ranking (0–100) relative to its peer group. Higher percentiles indicate worse performance.

**Intervention Threshold:** The percentile cutoff above which FMCSA considers a carrier for intervention. Varies by BASIC and carrier type.

**Acute/Critical (AC):** Flags carriers with serious violations discovered during FMCSA investigations within the past 12 months.

**Overall BASIC Alert:** Triggered when a carrier's percentile exceeds the intervention threshold OR when a serious violation was found within the previous 12 months.

**Out-of-Service (OOS):** A condition severe enough that the driver or vehicle is immediately prohibited from operating until the issue is corrected.