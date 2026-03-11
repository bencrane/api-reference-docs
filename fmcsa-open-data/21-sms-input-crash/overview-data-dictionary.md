# SMS Input — Violation Data Definition

**Revision:** Rev03  
**Date:** 2025-04-17

---

## Overview

This file contains the publicly available violation data used for the current month's **SMS (Safety Measurement System)** calculations. Each row represents a single violation and includes details such as the violation code, description, and various weights used in SMS methodology. An identifier links each violation back to the inspection in which it was cited.

**File format:** Comma-delimited (CSV), one violation per row.

---

## Field Reference

### Unique_ID
Unique identification number for each inspection. This serves as the key linking a violation record back to its parent inspection.

### Insp_Date
The date on which the inspection took place.

### DOT_Number
The unique number assigned to a motor carrier (company) by the U.S. Department of Transportation. This is the primary identifier for the entity being inspected.

### Viol_Code
The code representing the specific violation that was cited during the inspection.

### BASIC_Desc
The name of the **BASIC (Behavior Analysis and Safety Improvement Category)** that the violation falls under. BASICs are the safety categories used by FMCSA's SMS to group related violations (e.g., Unsafe Driving, Hours-of-Service Compliance, Vehicle Maintenance).

### OOS_Indicator
A boolean flag — `TRUE` indicates the violation was identified as an **Out-Of-Service (OOS)** violation, meaning the driver or vehicle was ordered out of service at the time of inspection.

### OOS_Weight
The additional weight assigned to a violation when it is flagged as Out-Of-Service. This amplifies the violation's impact in SMS scoring.

### Severity_Weight
The base severity weight assigned to the violation, reflecting how serious the violation is considered within the SMS methodology.

### Time_Weight
The time-based weight assigned to the violation. More recent violations typically carry higher time weights, meaning they have a greater impact on the carrier's current SMS scores.

### Total_Severity_Wght
The combined total severity weight for the violation. This is the composite score factoring in severity, OOS status, and time weighting.

### Section_Desc
A human-readable description of the specific violation (i.e., what regulation or standard was violated).

### Group_Desc
A higher-level description of the violation group that the specific violation belongs to.

### Viol_Unit
Indicates what unit the violation was cited against:

| Value | Meaning |
|-------|---------|
| `1` | Vehicle main unit |
| `2` | Vehicle secondary unit |
| `D` | Driver |
| `C` | Co-driver |

---

## Context

This dataset is part of the FMCSA's SMS program, which evaluates the safety performance of motor carriers using inspection, violation, and crash data. The violation-level detail in this file feeds directly into BASIC percentile calculations that determine a carrier's safety ratings and prioritization for interventions.