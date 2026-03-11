# SMS Input — Inspection Data Definition

**Source:** `SMS-Input_Inspection_Readme_Data_Definition_Rev03_2025-04-17.txt`  
**Revision:** Rev03 | **Date:** 2025-04-17  
**Format:** CSV (comma delimited) — One inspection per row

---

## Overview

Publicly available inspection data used for the current month's SMS calculations. Contains identifying information for each inspection including U.S. DOT#, Report Number, Inspection Date, State, and Vehicle Information. Also includes relationship of each inspection to SMS BASIC information and violation counts by BASIC.

---

## Field Reference (39 fields)

### Inspection Identification

| Field | Type | Description |
|-------|------|-------------|
| `Unique_ID` | string | Unique identification number for each inspection |
| `Report_Number` | string | Unique report number of the inspection |
| `Report_State` | string | State abbreviation indicating the state the inspector is from. 'US' means federal inspectors. |
| `DOT_Number` | string | Unique number assigned to a company by the DOT |
| `Insp_Date` | date | The date of the inspection |
| `Insp_level_ID` | integer | ID indicating the level of inspection: 1 - Full, 2 - Walk-around, 3 - Driver-Only, 4 - Special Study, 5 - Terminal, 6 - Radioactive Materials |
| `County_code_State` | string | State abbreviation indicating where the inspection occurred |
| `Time_Weight` | number | Time weight of the inspection |

### Out-Of-Service Totals

| Field | Type | Description |
|-------|------|-------------|
| `Driver_OOS_Total` | integer | Number of Out-Of-Service violations related to Driver |
| `Vehicle_OOS_Total` | integer | Number of Out-Of-Service violations related to vehicle |
| `Total_Hazmat_Sent` | integer | Number of violations related to Hazardous Materials |
| `OOS_Total` | integer | Total number of Out-Of-Service violations |
| `Hazmat_OOS_Total` | integer | Total number of Out-Of-Service violations related to Hazardous Materials |
| `Hazmat_Placard_req` | boolean | TRUE means the hazmat placard is required |

### Primary Unit Information

| Field | Type | Description |
|-------|------|-------------|
| `Unit_Type_Desc` | string | Description of the type of the main unit |
| `Unit_Make` | string | Description of the make of the main unit |
| `Unit_License` | string | License plate of the main unit |
| `Unit_License_State` | string | License state of the main unit |
| `VIN` | string | Vehicle Identification Number of the main unit |
| `Unit_Decal_Number` | string | Decal number of the main unit |

### Secondary Unit Information

| Field | Type | Description |
|-------|------|-------------|
| `Unit_Type_Desc2` | string | Description of the type of the secondary unit |
| `Unit_Make2` | string | Description of the make of the secondary unit |
| `Unit_License2` | string | License plate of the secondary unit |
| `Unit_License_State2` | string | License state of the secondary unit |
| `VIN2` | string | Vehicle Identification Number of the secondary unit |
| `Unit_Decal_Number2` | string | Decal number of the secondary unit |

### BASIC Inspection Flags

| Field | Type | Description |
|-------|------|-------------|
| `Unsafe_Insp` | boolean | TRUE means the inspection is identified as relevant to the Unsafe Driving BASIC |
| `Fatigued_Insp` | boolean | TRUE means the inspection is identified as relevant to the Hours-of-Service Compliance BASIC |
| `Dr_Fitness_Insp` | boolean | TRUE means the inspection is identified as relevant to the Driver Fitness BASIC |
| `Subt_Alcohol_Insp` | boolean | TRUE means the inspection is identified as relevant to the Controlled Substances/Alcohol BASIC |
| `Vh_Maint_Insp` | boolean | TRUE means the inspection is identified as relevant to the Vehicle Maintenance BASIC |
| `HM_Insp` | boolean | TRUE means the inspection is identified as relevant to the Hazardous Materials Compliance BASIC |

### BASIC Violation Counts

| Field | Type | Description |
|-------|------|-------------|
| `BASIC_Viol` | integer | Total number of BASIC violations |
| `Unsafe_Viol` | integer | Number of Unsafe Driving BASIC violations |
| `Fatigued_Viol` | integer | Number of Hours-of-Service Compliance BASIC violations |
| `Dr_Fitness_Viol` | integer | Number of Driver Fitness BASIC violations |
| `Subt_Alcohol_Viol` | integer | Number of Controlled Substances/Alcohol BASIC violations |
| `Vh_Maint_Viol` | integer | Number of Vehicle Maintenance BASIC violations |
| `HM_Viol` | integer | Number of Hazardous Materials Compliance BASIC violations |

---

## Inspection Levels Reference

| ID | Level |
|----|-------|
| 1 | Full |
| 2 | Walk-around |
| 3 | Driver-Only |
| 4 | Special Study |
| 5 | Terminal |
| 6 | Radioactive Materials |

---

## BASIC Categories

Each inspection can be flagged as relevant to one or more BASICs (Behavior Analysis and Safety Improvement Categories):

- **Unsafe Driving** — `Unsafe_Insp` / `Unsafe_Viol`
- **Hours-of-Service Compliance** — `Fatigued_Insp` / `Fatigued_Viol`
- **Driver Fitness** — `Dr_Fitness_Insp` / `Dr_Fitness_Viol`
- **Controlled Substances/Alcohol** — `Subt_Alcohol_Insp` / `Subt_Alcohol_Viol`
- **Vehicle Maintenance** — `Vh_Maint_Insp` / `Vh_Maint_Viol`
- **Hazardous Materials Compliance** — `HM_Insp` / `HM_Viol`