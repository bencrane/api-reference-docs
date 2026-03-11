# SMS Interstate Passenger Carriers Only — Data Definition

**Source File:** `SMS_AB_Pass_Readme_Data_Definition_Rev03_2025-04-17`
**Revision:** Rev03 | **Date:** 2025-04-17

---

## Overview

This file contains **FMCSA SMS summary results** specifically for **interstate and intrastate hazmat passenger (bus) motor carriers**. Unlike the broader PassProperty files, this one includes **percentile rankings** and **alert status indicators** — the actual intervention-triggering flags that determine which carriers get prioritized for enforcement.

The file is **comma-delimited (CSV)** with **one carrier per row**. The measurement period covers **24 months**.

---

## How This Differs from the PassProperty Files

| Feature | PassProperty (AB/C) | Pass — This File |
|---|---|---|
| Carrier scope | All property and/or passenger carriers | Passenger (bus) carriers only |
| Fields per BASIC | 3 (violations, measure, AC) | **6** (+ percentile, roadside alert, overall BASIC alert) |
| Percentile ranking | Not included | Included |
| Alert indicators | Not included | Included |

This is the file you need if you want to know whether a passenger carrier is **flagged for intervention**.

---

## Carrier Identifier

| Field | Description |
|---|---|
| **DOT_NUMBER** | US DOT Number. Interstate and Intrastate Hazmat passenger carriers only. |

---

## Inspection Totals (24-Month Window)

| Field | Description |
|---|---|
| **INSP_TOTAL** | Total inspections across all types. |
| **DRIVER_INSP_TOTAL** | Inspections that included a driver component. |
| **DRIVER_OOS_INSP_TOTAL** | Driver inspections with at least one Driver OOS violation. |
| **VEHICLE_INSP_TOTAL** | Inspections that included a vehicle component. |
| **VEHICLE_OOS_INSP_TOTAL** | Vehicle inspections with at least one Vehicle OOS violation. |

---

## BASIC-Level Scores & Alerts

Each BASIC now includes **6 fields** with this pattern:

| Suffix | What It Is |
|---|---|
| **_INSP_W_VIOL** | Count of inspections with at least one violation in this BASIC. |
| **_MEASURE** | Roadside Performance Measure — the weighted score. |
| **_PCT** | Roadside Performance **Percentile** — where this carrier ranks against its peer group (0–100). |
| **_RD_ALERT** | Roadside Alert — `Y` if the percentile is **over the intervention threshold**. |
| **_AC** | Acute/Critical Indicator — `Y` if an investigation in the prior 12 months found acute/critical violations. |
| **_BASIC_ALERT** | Overall BASIC Alert — `Y` if the carrier triggers on **either** roadside percentile OR acute/critical. This is the combined flag. |

### Unsafe Driving

| Field | Description |
|---|---|
| **UNSAFE_DRIV_INSP_W_VIOL** | Inspections with at least one Unsafe Driving violation. |
| **UNSAFE_DRIV_MEASURE** | Roadside Performance Measure value. |
| **UNSAFE_DRIV_PCT** | Roadside Performance Percentile. |
| **UNSAFE_DRIV_RD_ALERT** | `Y` = over intervention threshold. |
| **UNSAFE_DRIV_AC** | `Y` = Acute/Critical from investigation within prior 12 months. |
| **UNSAFE_DRIV_BASIC_ALERT** | `Y` = overall alert (percentile over threshold and/or serious violation). |

### Hours-of-Service (HOS) Compliance

| Field | Description |
|---|---|
| **HOS_DRIV_INSP_W_VIOL** | Inspections with at least one HOS violation. |
| **HOS_DRIV_MEASURE** | Roadside Performance Measure value. |
| **HOS_DRIV_PCT** | Roadside Performance Percentile. |
| **HOS_DRIV_RD_ALERT** | `Y` = over intervention threshold. |
| **HOS_DRIV_AC** | Acute/Critical indicator. |
| **HOS_DRIV_BASIC_ALERT** | Overall BASIC alert. |

### Driver Fitness

| Field | Description |
|---|---|
| **DRIV_FIT_INSP_W_VIOL** | Inspections with at least one Driver Fitness violation. |
| **DRIV_FIT_MEASURE** | Roadside Performance Measure value. |
| **DRIV_FIT_PCT** | Roadside Performance Percentile. |
| **DRIV_FIT_RD_ALERT** | `Y` = over intervention threshold. |
| **DRIV_FIT_AC** | Acute/Critical indicator. |
| **DRIV_FIT_BASIC_ALERT** | Overall BASIC alert. |

### Controlled Substances and Alcohol

| Field | Description |
|---|---|
| **CONTR_SUBST_INSP_W_VIOL** | Inspections with at least one Controlled Substances/Alcohol violation. |
| **CONTR_SUBST_MEASURE** | Roadside Performance Measure value. |
| **CONTR_SUBST_PCT** | Roadside Performance Percentile. |
| **CONTR_SUBST_RD_ALERT** | `Y` = over intervention threshold. |
| **CONTR_SUBST_AC** | Acute/Critical indicator. |
| **CONTR_SUBST_BASIC_ALERT** | Overall BASIC alert. |

### Vehicle Maintenance

| Field | Description |
|---|---|
| **VEH_MAINT_INSP_W_VIOL** | Inspections with at least one Vehicle Maintenance violation. |
| **VEH_MAINT_MEASURE** | Roadside Performance Measure value. |
| **VEH_MAINT_PCT** | Roadside Performance Percentile. |
| **VEH_MAINT_RD_ALERT** | `Y` = over intervention threshold. |
| **VEH_MAINT_AC** | Acute/Critical indicator. |
| **VEH_MAINT_BASIC_ALERT** | Overall BASIC alert. |

---

## How Alerts Work

The alert logic is layered:

1. **Roadside Alert (_RD_ALERT)** fires when a carrier's percentile exceeds the FMCSA intervention threshold for that BASIC. Thresholds vary by BASIC and are generally stricter for passenger carriers than for property carriers.

2. **Acute/Critical (_AC)** fires independently based on investigation findings — this catches carriers that may have low roadside activity but had serious violations found during compliance reviews or investigations.

3. **Overall BASIC Alert (_BASIC_ALERT)** is the OR of the two above. If either the roadside percentile is over threshold OR the carrier has an acute/critical flag, the overall alert triggers. This is the field that drives FMCSA prioritization.

---

## BASICs Not Included

Same as the other summary files — **Crash Indicator** and **HM Compliance** are in separate data files.