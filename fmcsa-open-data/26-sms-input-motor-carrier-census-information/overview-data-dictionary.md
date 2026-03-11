# FMCSA SMS Census Data Definition

**Source:** FMCSA Comprehensive Safety Analysis (CSA) Monthly Data Run
**Revision:** Rev03 — April 17, 2025
**File Format:** CSV (comma delimited), one carrier per row

## Overview

This dataset contains FMCSA registration data for all **active Interstate and Intrastate Hazmat Motor Carriers** of property and/or passengers. It is produced as part of the FMCSA's monthly CSA data run and covers carrier identity, physical and mailing addresses, contact information, fleet size, mileage reporting, and detailed operation classification flags.

---

## Field Groups

### 1. Carrier Identification

| Field | Description |
|---|---|
| `DOT_NUMBER` | Unique USDOT Number — the primary identifier for each motor carrier. |
| `LEGAL_NAME` | The carrier's registered legal name. |
| `DBA_NAME` | The carrier's "Doing Business As" name, if different from the legal name. |

### 2. Carrier Classification

| Field | Description | Values |
|---|---|---|
| `CARRIER_OPERATION` | Type of operation the carrier is registered under. | `A` = Interstate, `B` = Intrastate Hazmat, `C` = Intrastate Non-Hazmat |
| `HM_FLAG` | Whether the carrier meets the placardable Hazardous Materials threshold. | `Y` = Yes, `N` = No |
| `PC_FLAG` | Whether the carrier meets the passenger carrier threshold. | `Y` = Yes, `N` = No |

### 3. Physical Address

| Field | Description |
|---|---|
| `PHY_STREET` | Physical street address |
| `PHY_CITY` | Physical city |
| `PHY_STATE` | Physical state |
| `PHY_ZIP` | Physical zip code |
| `PHY_COUNTRY` | Physical country |

### 4. Mailing Address

| Field | Description |
|---|---|
| `MAILING_STREET` | Mailing street address |
| `MAILING_CITY` | Mailing city |
| `MAILING_STATE` | Mailing state |
| `MAILING_ZIP` | Mailing zip code |
| `MAILING_COUNTRY` | Mailing country |

### 5. Contact Information

| Field | Description |
|---|---|
| `TELEPHONE` | Contact telephone number |
| `FAX` | Fax number |
| `EMAIL_ADDRESS` | Contact email address |

### 6. MCS-150 Filing Data

The MCS-150 is a biennial update form that carriers must file with the FMCSA. These fields capture the most recent filing data.

| Field | Description |
|---|---|
| `MCS150_DATE` | Date the most recent MCS-150 form was filed. |
| `MCS150_MILEAGE` | Vehicle Miles Traveled (VMT) as reported on the MCS-150 form. |
| `MCS150_MILEAGE_YEAR` | The year the reported VMT corresponds to. |

### 7. Fleet & Oversight Metadata

| Field | Description |
|---|---|
| `ADD_DATE` | Date the carrier record was first added to the MCMIS database. |
| `OIC_STATE` | The FMCSA state office responsible for oversight of this carrier. |
| `NBR_POWER_UNIT` | Number of power units (trucks/tractors) the carrier reports. |
| `DRIVER_TOTAL` | Total number of drivers the carrier reports. |

### 8. Recent Mileage

These fields provide the most current VMT data available, which may come from a source other than the MCS-150 form.

| Field | Description |
|---|---|
| `RECENT_MILEAGE` | Most recent Vehicle Miles Traveled (VMT). |
| `RECENT_MILEAGE_YEAR` | Year the recent VMT corresponds to. |
| `VMT_SOURCE_ID` | Source of the VMT figure: `1` = Census, `2` = Safety Audit, `3` = Investigation. |

### 9. Operation Classification Flags

These are boolean-style fields (value = `TRUE` when applicable) that describe how the carrier's operation is classified. A single carrier may have multiple flags set to `TRUE`.

| Field | Classification |
|---|---|
| `PRIVATE_ONLY` | Carrier operates as private property, private passenger business, and private passenger nonbusiness — but is **not** authorized or exempt for hire. |
| `AUTHORIZED_FOR_HIRE` | Carrier is authorized for hire. |
| `EXEMPT_FOR_HIRE` | Carrier is exempt for hire. |
| `PRIVATE_PROPERTY` | Private property carrier. |
| `PRIVATE_PASSENGER_BUSINESS` | Private passenger business carrier. |
| `PRIVATE_PASSENGER_NONBUSINESS` | Private passenger non-business carrier. |
| `MIGRANT` | Migrant carrier. |
| `US_MAIL` | U.S. Mail carrier. |
| `FEDERAL_GOVERNMENT` | Federal government carrier. |
| `STATE_GOVERNMENT` | State government carrier. |
| `LOCAL_GOVERNMENT` | Local government carrier. |
| `INDIAN_TRIBE` | Indian Tribe carrier. |
| `OP_OTHER` | Other classification, manually entered by the carrier into the FMCSA registration system. (Free-text, not a boolean flag.) |

---

## Key Notes

- **`DOT_NUMBER`** is the unique primary key for each row.
- **`CARRIER_OPERATION`** distinguishes interstate carriers (`A`) from intrastate hazmat (`B`) and intrastate non-hazmat (`C`) carriers.
- **`PRIVATE_ONLY`** is a derived/composite flag — it is `TRUE` only when the carrier is classified under private property, private passenger business, and private passenger nonbusiness but holds no for-hire authorization or exemption.
- **`OP_OTHER`** is the only operation classification field that is free-text rather than a boolean `TRUE` flag.
- **VMT** can come from three sources (Census, Safety Audit, or Investigation), indicated by `VMT_SOURCE_ID`. The `RECENT_MILEAGE` fields may differ from `MCS150_MILEAGE` if a more recent source is available.