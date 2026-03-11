# SMS Input — Motor Carrier Census Data Definition

**Source File:** `SMS-Input_Census_Readme_Data_Definition_Rev03_2025-04-17`
**Revision:** Rev03 | **Date:** 2025-04-17

---

## Overview

This file contains **FMCSA registration (census) data** for all active **Interstate** and **Intrastate Hazmat** motor carriers of property and/or passengers. It comes from a CSA monthly data run and serves as the carrier profile backbone — company identity, addresses, contact info, fleet size, mileage, and operation classifications.

The file is **comma-delimited (CSV)** with **one carrier per row**.

---

## Carrier Identity

| Field | Description |
|---|---|
| **DOT_NUMBER** | Unique USDOT Number. Primary key linking to all other SMS files. |
| **LEGAL_NAME** | Legal name of the carrier. |
| **DBA_NAME** | Doing-Business-As name (trade name). |
| **CARRIER_OPERATION** | Operation type code (see below). |
| **HM_FLAG** | `Y`/`N` — whether the carrier meets the placardable Hazardous Materials threshold. |
| **PC_FLAG** | `Y`/`N` — whether the carrier meets the passenger carrier threshold. |

### Carrier Operation Codes

| Code | Meaning |
|---|---|
| **A** | Interstate |
| **B** | Intrastate Hazmat |
| **C** | Intrastate Non-Hazmat |

This code determines which SMS summary file a carrier appears in — `A` and `B` carriers go into the **AB PassProperty** file, while `C` carriers go into the **C PassProperty** file.

---

## Physical Address

| Field | Description |
|---|---|
| **PHY_STREET** | Physical street address. |
| **PHY_CITY** | City. |
| **PHY_STATE** | State. |
| **PHY_ZIP** | Zip code. |
| **PHY_COUNTRY** | Country. |

## Mailing Address

| Field | Description |
|---|---|
| **MAILING_STREET** | Mailing street address. |
| **MAILING_CITY** | City. |
| **MAILING_STATE** | State. |
| **MAILING_ZIP** | Zip code. |
| **MAILING_COUNTRY** | Country. |

---

## Contact Information

| Field | Description |
|---|---|
| **TELEPHONE** | Contact telephone number. |
| **FAX** | Fax number. |
| **EMAIL_ADDRESS** | Contact email address. |

---

## MCS-150 & Mileage Data

The MCS-150 is the biennial update form every carrier must file with FMCSA. It captures fleet size, mileage, and other operational details.

| Field | Description |
|---|---|
| **MCS150_DATE** | Latest date the MCS-150 was filed. |
| **MCS150_MILEAGE** | Vehicle Mileage Traveled (VMT) reported on the MCS-150. |
| **MCS150_MILEAGE_YEAR** | Year the MCS-150 VMT figure covers. |
| **RECENT_MILEAGE** | Most recent VMT based on the best available data source. |
| **RECENT_MILEAGE_YEAR** | Year the recent VMT covers. |
| **VMT_SOURCE_ID** | Source of the recent VMT data (see below). |

### VMT Source Codes

| ID | Source |
|---|---|
| 1 | Census (MCS-150 filing) |
| 2 | Safety Audit |
| 3 | Investigation |

---

## Carrier Profile

| Field | Description |
|---|---|
| **ADD_DATE** | Date the carrier was first added to the MCMIS database. |
| **OIC_STATE** | FMCSA state office with oversight responsibility for this carrier. |
| **NBR_POWER_UNIT** | Number of power units (trucks, tractors) reported. |
| **DRIVER_TOTAL** | Number of drivers reported. |

These two fields — power units and drivers — are key inputs for SMS peer grouping. FMCSA groups carriers by size when calculating percentile rankings.

---

## Operation Classification Flags

A carrier can have **multiple classifications** simultaneously (e.g., both Authorized For Hire and Private Property). Each field is a boolean `TRUE`/blank flag.

| Field | Classification |
|---|---|
| **PRIVATE_ONLY** | Private property + private passenger (business & nonbusiness) but NOT authorized or exempt for hire. |
| **AUTHORIZED_FOR_HIRE** | Authorized For Hire — carrier holds operating authority to haul freight for compensation. |
| **EXEMPT_FOR_HIRE** | Exempt For Hire — carries commodities exempt from operating authority requirements. |
| **PRIVATE_PROPERTY** | Private Property — transports own goods. |
| **PRIVATE_PASSENGER_BUSINESS** | Private Passenger Business — transports passengers for business purposes. |
| **PRIVATE_PASSENGER_NONBUSINESS** | Private Passenger Non-Business — transports passengers for non-business purposes. |
| **MIGRANT** | Migrant carrier — transports migrant workers. |
| **US_MAIL** | Carries U.S. Mail. |
| **FEDERAL_GOVERNMENT** | Federal government carrier. |
| **STATE_GOVERNMENT** | State government carrier. |
| **LOCAL_GOVERNMENT** | Local government carrier. |
| **INDIAN_TRIBE** | Indian Tribe carrier. |
| **OP_OTHER** | Other classification — free-text field manually entered by the carrier into the FMCSA registration system. |

---

## Relationship to Other SMS Files

The Census file is the **master carrier profile** that all other SMS files reference via `DOT_NUMBER`. It provides the carrier identity, size (power units/drivers), and operation type needed to determine peer grouping, which SMS summary file (AB vs C) the carrier belongs to, and the baseline registration context for any safety analysis.