# SMS All Interstate & Intrastate Hazmat — Pass/Property Data Definition

**Source File:** `SMS_AB_PassProperty_Readme_Data_Definition_Rev03_2025-04-17`
**Revision:** Rev03 | **Date:** 2025-04-17

---

## Overview

This file contains **FMCSA carrier-level SMS summary results** for all active **interstate motor carriers** and **intrastate hazmat motor carriers** that transport **property and/or passengers**. The data is calculated from monthly snapshots of the SMS input data files.

The file is **comma-delimited (CSV)** with **one carrier per row**. The measurement period covers **24 months** of inspection data.

---

## Carrier Identifier

| Field | Description |
|---|---|
| **DOT_NUMBER** | US DOT Number of the motor carrier. Scope is limited to interstate and intrastate hazmat carriers only. |

---

## Inspection Totals (24-Month Window)

These fields summarize the carrier's overall inspection activity and Out-of-Service (OOS) rates across the measurement period.

| Field | Description |
|---|---|
| **INSP_TOTAL** | Total number of inspections across all types. |
| **DRIVER_INSP_TOTAL** | Total number of inspections that included a driver component. |
| **DRIVER_OOS_INSP_TOTAL** | Number of driver inspections where at least one Driver OOS violation was found. |
| **VEHICLE_INSP_TOTAL** | Total number of inspections that included a vehicle component. |
| **VEHICLE_OOS_INSP_TOTAL** | Number of vehicle inspections where at least one Vehicle OOS violation was found. |

The ratio of OOS inspections to total inspections gives you the carrier's **OOS rate** — a quick measure of how often inspections uncover serious enough problems to pull a driver or vehicle off the road.

---

## BASIC-Level Scores

For each BASIC (Behavior Analysis and Safety Improvement Category), the file provides three fields:

1. **Inspections with Violations** — count of inspections where at least one violation in that BASIC was found
2. **Measure** — the Roadside Performance Measure value (the weighted score used to rank carriers within their peer group)
3. **Acute/Critical (AC) Indicator** — flags whether an investigation in the prior 12 months found acute or critical violations (`Y` = yes)

### Unsafe Driving

| Field | Description |
|---|---|
| **UNSAFE_DRIV_INSP_W_VIOL** | Inspections with at least one Unsafe Driving violation. |
| **UNSAFE_DRIV_MEASURE** | Roadside Performance Measure value for Unsafe Driving. |
| **UNSAFE_DRIV_AC** | Acute/Critical indicator (`Y` = flagged from investigation within prior 12 months). |

Covers violations like speeding, reckless driving, improper lane change, and failure to use a seatbelt.

### Hours-of-Service (HOS) Compliance

| Field | Description |
|---|---|
| **HOS_DRIV_INSP_W_VIOL** | Inspections with at least one HOS violation. |
| **HOS_DRIV_MEASURE** | Roadside Performance Measure value for HOS Compliance. |
| **HOS_DRIV_AC** | Acute/Critical indicator. |

Covers violations related to driving beyond allowed hours, falsifying logs, and failing to maintain required records of duty status.

### Driver Fitness

| Field | Description |
|---|---|
| **DRIV_FIT_INSP_W_VIOL** | Inspections with at least one Driver Fitness violation. |
| **DRIV_FIT_MEASURE** | Roadside Performance Measure value for Driver Fitness. |
| **DRIV_FIT_AC** | Serious Violation indicator. |

Covers violations such as operating without a valid CDL, lacking proper endorsements, or failing medical qualification requirements.

### Controlled Substances and Alcohol

| Field | Description |
|---|---|
| **CONTR_SUBST_INSP_W_VIOL** | Inspections with at least one Controlled Substances/Alcohol violation. |
| **CONTR_SUBST_MEASURE** | Roadside Performance Measure value for Controlled Substances and Alcohol. |
| **CONTR_SUBST_AC** | Acute/Critical indicator. |

Covers violations related to use or possession of controlled substances, alcohol use, and failure to comply with drug/alcohol testing requirements.

### Vehicle Maintenance

| Field | Description |
|---|---|
| **VEH_MAINT_INSP_W_VIOL** | Inspections with at least one Vehicle Maintenance violation. |
| **VEH_MAINT_MEASURE** | Roadside Performance Measure value for Vehicle Maintenance. |
| **VEH_MAINT_AC** | Acute/Critical indicator. |

Covers violations like brake defects, tire issues, lighting problems, and other mechanical deficiencies.

---

## How the Measure Value Works

The **Roadside Performance Measure** is the weighted score FMCSA uses to rank a carrier against its safety peer group. It factors in the severity of each violation, how recently it occurred (time weighting), and whether violations triggered Out-of-Service orders. A higher measure value indicates worse safety performance. Carriers are then ranked into percentiles within their peer group — those above intervention thresholds may be prioritized for enforcement action.

---

## BASICs Not Included in This File

Note that this file covers **5 of the 7 BASICs**. The two not present here are:

- **Crash Indicator** — handled in a separate crash-specific data file
- **HM Compliance (Hazardous Materials)** — handled in a separate hazmat-specific data file