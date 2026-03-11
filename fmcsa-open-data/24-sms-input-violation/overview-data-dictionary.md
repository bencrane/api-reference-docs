# SMS Input — Violation Data Definition

**Source File:** `SMS-Input_Violation_Readme_Data_Definition_Rev03_2025-04-17`
**Revision:** Rev03 | **Date:** 2025-04-17

---

## Overview

This file contains the publicly available **violation data** used for the current month's **SMS (Safety Measurement System)** calculations. Each row represents a single violation cited during a roadside inspection. The data links each violation back to its parent inspection and includes the violation code, description, and all weighting factors used in SMS methodology.

The file is **comma-delimited (CSV)** with one violation per row.

---

## Field Reference

### Identifiers & Context

| Field | Description |
|---|---|
| **Unique_ID** | Unique identification number for each inspection. Links the violation back to the inspection record. |
| **Insp_Date** | Date the inspection took place. |
| **DOT_Number** | Unique number assigned to a motor carrier by the Department of Transportation. |
| **Viol_Code** | The specific code identifying the violation. |

### BASIC Category

| Field | Description |
|---|---|
| **BASIC_Desc** | The name of the BASIC (Behavior Analysis and Safety Improvement Category) the violation falls under. BASICs are the safety categories used by FMCSA to group violations (e.g., Unsafe Driving, Hours-of-Service Compliance, Vehicle Maintenance). |

### Out-of-Service (OOS) Information

| Field | Description |
|---|---|
| **OOS_Indicator** | Boolean flag — `TRUE` means the violation was severe enough to place the vehicle or driver Out-of-Service (i.e., prohibited from operating until the condition is corrected). |
| **OOS_Weight** | The additional weight applied to the violation when it triggers an OOS designation. |

### Severity & Time Weighting

These fields are central to how SMS scores are calculated:

| Field | Description |
|---|---|
| **Severity_Weight** | A numeric weight reflecting how serious the violation is. Higher values indicate more dangerous violations. |
| **Time_Weight** | A numeric weight based on how recently the violation occurred. More recent violations carry higher time weights. |
| **Total_Severity_Wght** | The combined total severity weight for the violation (factors in severity, OOS, and time weighting). |

### Violation Details

| Field | Description |
|---|---|
| **Section_Desc** | Full text description of the specific violation. |
| **Group_Desc** | Description of the broader violation group the violation belongs to. |

### Violation Unit

| Field | Description |
|---|---|
| **Viol_Unit** | Indicates what entity the violation was cited against. |

**Valid values for Viol_Unit:**

| Value | Meaning |
|---|---|
| `1` | Vehicle — main unit |
| `2` | Vehicle — secondary unit |
| `D` | Driver |
| `C` | Co-driver |

---

## How This Data Fits Into SMS

The FMCSA's Safety Measurement System uses inspection and violation data to assess motor carrier safety performance. Each violation's **severity weight** is adjusted by a **time weight** (recent = heavier) and an **OOS weight** (if applicable) to produce the **Total Severity Weight**. These are then aggregated at the carrier level (by DOT Number) within each BASIC to produce SMS percentile rankings that determine a carrier's safety rating and intervention priority.