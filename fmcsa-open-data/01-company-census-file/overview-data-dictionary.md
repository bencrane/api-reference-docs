# MCMIS Company Census File Data Dictionary

**Revision 8 | January 23, 2026 | 89 Pages**

## Overview

The MCMIS (Motor Carrier Management Information System) Company Census File is a federal database operated by the FMCSA (Federal Motor Carrier Safety Administration) containing comprehensive safety and identification data on interstate and intrastate commercial carriers. Every regulated entity receives a unique USDOT Number used to link inspection, review, and census records.

This data dictionary defines **147 active data elements** across the census file, covering entity identification, addresses, operations, equipment, drivers, cargo, safety ratings, and docket numbers.

---

## Core Identification Fields (Orders 1–5)

**MCS150_DATE** (8, Numeric, YYYYMMDD) — The date recorded on the MCS-150 form used to update the carrier's record in the registration system.

**ADD_DATE** (8, Numeric, YYYYMMDD) — The date the record was created, reactivated, or systematically updated.

**STATUS_CODE** (1, Alpha) — Current status of the entity in MCMIS: `A` = Active (currently in business and subject to FMCSR/HMR), `I` = Inactive (no longer in business or subject to regulations), `P` = Pending (Mexican-domiciled company applying for U.S. operating authority, still under review).

**DOT_NUMBER** (8, Numeric) — The sequentially-issued USDOT number assigned by MCMIS. Each entity should have only one active census number. This number has no internal coded structure.

**DUN_BRADSTREET_NO** (9, Alphanumeric) — The Dun & Bradstreet corporate registration number.

---

## Entity Type & Operations (Orders 6–9, 33, 52)

**CARSHIP** (4, Alpha) — Identifies the type of operation. Multiple letters may appear for entities with multiple operations:
- `C` = Carrier
- `S` = Shipper Only
- `B` = Broker
- `R` = Registrant (registers vehicles but is not a carrier)
- `F` = Freight Forwarder
- `I` = Intermodal Equipment Provider
- `T` = Cargo Tank

**CARRIER_OPERATION** (1, Alpha) — Identifies the carrier's interstate/intrastate engagement:
- `A` = Interstate
- `B` = Intrastate, Hazardous Material
- `C` = Intrastate, Non-Hazardous Material

**BUSINESS_ORG_ID** (1, Alpha) — Legal structure of the entity (from reviews only): `1` = Individual, `2` = Partnership, `3` = Corporation.

**BUSINESS_ORG_DESC** (11, Alpha) — Text description of the business organization: "Individual", "Partnership", or "Corporation."

**CLASSDEF** (Variable length, Alpha) — Classification category. An entity can have multiple classifications separated by semicolons. Valid values:
- `A` = Authorized For Hire — primary business is transporting property/passengers for compensation
- `B` = Exempt For Hire — transporting commodities not subject to ICC economic regulation
- `C` = Private (Property) — highway transport incidental to primary business
- `D` = Private Passenger (Business) — interstate passenger transport in furtherance of commercial enterprise
- `E` = Private Passenger (Non-Business) — interstate passenger transport not meeting business definition (e.g., church buses)
- `F` = Migrant — transports 3+ migrant workers interstate
- `G` = U.S. Mail
- `H` = Federal Government
- `I` = State Government
- `J` = Local Government
- `K` = Indian Tribe
- `L` = Other Classification (entered with hyphen, e.g., "OTHER-FARMER")

---

## Legal Name & Contact (Orders 17–21, 53–54, 69)

**LEGAL_NAME** (120, Alphanumeric) — The legal name of the entity.

**DBA_NAME** (120, Alphanumeric) — "Doing Business As" trade name, any name other than the legal name.

**PHONE** (13, Alphanumeric) — Office telephone number including area code.

**FAX** (13, Alphanumeric) — Office fax number including area code.

**CELL_PHONE** (13, Alphanumeric) — Cell phone number including area code.

**COMPANY_OFFICER_1** (70, Alpha) — Name and title of the first company representative.

**COMPANY_OFFICER_2** (70, Alpha) — Name and title of the second company representative.

**EMAIL_ADDRESS** (80, Alphanumeric) — The entity's email address.

---

## Physical Address (Orders 6, 55–60, 30–31, 74)

**PHY_OMC_REGION** (2, Numeric) — FMCSA Region in which the principal office resides. Regions and assigned states:

| Region | States |
|--------|--------|
| 01 | CT, ME, MA, NH, NY, NJ, RI, VT, PR, VI |
| 03 | DE, DC, MD, PA, VA, WV |
| 04 | AL, GA, FL, MS, NC, SC, TN, KY |
| 05 | IL, IN, MI, OH, MN, WI |
| 06 | AR, LA, NM, OK, TX |
| 07 | IA, KS, MO, NE |
| 08 | CO, MT, ND, SD, UT, WY |
| 09 | AZ, CA, NV, HI, GU, AS |
| 10 | AK, ID, OR, WA |

**PHY_STREET** (50, Alphanumeric) — Street address of the principal office.

**PHY_CITY** (25, Alphanumeric) — City of the principal office.

**PHY_STATE** (2, Alpha) — Two-letter postal abbreviation for the state.

**PHY_ZIP** (10, Alphanumeric) — ZIP code. May include dash for ZIP+4. Canadian/Mexican addresses may contain "CANADA", "MEXICO", or "CENTRA" in this field.

**PHY_CNTY** (3, Numeric) — Federally-assigned county code within a state. The full county code table spans all 50 states, DC, PR, and VI (pages 19–89 of the original document).

**PHY_COUNTRY** (2, Alpha) — Country code: `US` = United States & Territories, `CA` = Canadian Territories, `MX` = Mexican States, `SA` = Central and South American Nations. Extended codes include BZ (Belize), CR (Costa Rica), DO (Dominican Republic), GB (Great Britain), GT (Guatemala), HN (Honduras), KW (Kuwait), NI (Nicaragua), SV (El Salvador).

**PHY_NATIONALITY_INDICATOR** (1, Alpha) — `U` = US & Territories, `C` = Canadian, `M` = Mexican. No longer used.

**PHY_BARRIO** (25, Alpha) — Mexican neighborhood name for the physical address (Mexican-domiciled entities only).

**UNDELIV_PHY** (1, Alpha) — `U` = Undeliverable, blank = deliverable.

---

## Mailing Address (Orders 29, 32, 61–67)

**CARRIER_MAILING_STREET** (50, Alphanumeric) — Mailing address street.

**CARRIER_MAILING_CITY** (25, Alphanumeric) — Mailing address city.

**CARRIER_MAILING_STATE** (2, Alpha) — Mailing address state code.

**CARRIER_MAILING_ZIP** (10, Alphanumeric) — Mailing address ZIP code (same format rules as physical ZIP).

**CARRIER_MAILING_CNTY** (3, Numeric) — Mailing address county code.

**CARRIER_MAILING_COUNTRY** (2, Alpha) — Same country codes as physical address.

**MAIL_NATIONALITY_INDICATOR** (1, Alpha) — `U`/`C`/`M`. No longer used.

**MAIL_BARRIO** (25, Alpha) — Mexican neighborhood for mailing address.

**CARRIER_MAILING_UND_DATE** (8, Numeric, YYYYMMDD) — Date mailing address was identified as undeliverable.

---

## Docket Numbers (Orders 34–39, 145–147)

Three docket number slots are available, each consisting of a prefix and number:

**DOCKET1PREFIX / DOCKET2PREFIX / DOCKET3PREFIX** (2, Alpha) — Prefix values: `MC`, `MX`, `FF`, or NULL. These are federally-assigned Interstate Commerce Operating Authority numbers. The terms "MC number", "MX number", and "FF number" have replaced "ICC number" in general usage.

**DOCKET1 / DOCKET2 / DOCKET3** (6, Numeric) — The docket number itself.

**DOCKET1_STATUS_CODE / DOCKET2_STATUS_CODE / DOCKET3_STATUS_CODE** (1, Alpha) — `A` = Active, `I` = Inactive.

---

## Driver Data (Orders 41, 45–51, 68)

**TOTAL_DRIVERS** (6, Numeric) — Grand total of all drivers (interstate + intrastate).

**DRIVER_INTER_TOTAL** (6, Numeric) — Total interstate drivers.

**TOTAL_INTRASTATE_DRIVERS** (6, Numeric) — Total intrastate drivers.

**INTERSTATE_BEYOND_100_MILES** (5, Numeric) — Interstate drivers operating beyond 100-mile radius.

**INTERSTATE_WITHIN_100_MILES** (5, Numeric) — Interstate drivers operating within 100-mile radius.

**INTRASTATE_BEYOND_100_MILES** (5, Numeric) — Intrastate drivers operating beyond 100-mile radius.

**INTRASTATE_WITHIN_100_MILES** (5, Numeric) — Intrastate drivers operating within 100-mile radius.

**TOTAL_CDL** (5, Numeric) — Total drivers with a Commercial Driver's License.

**AVG_DRIVERS_LEASED_PER_MONTH** (5, Numeric) — Average number of trip-leased drivers per month.

---

## Equipment Units (Orders 23–25, 106–144)

Equipment is tracked across three ownership categories: **Owned**, **Term Leased**, and **Trip Leased**. Each category breaks down into vehicle types with passenger capacity sub-categories for buses, vans, and limos.

### Summary Fields

**TRUCK_UNITS** (8, Numeric) — Total number of trucks.

**POWER_UNITS** (8, Numeric) — Total number of power units.

**BUS_UNITS** (8, Numeric) — Total number of buses.

### Owned Equipment (Orders 106–118)

Fields: OWNTRUCK, OWNTRACT, OWNTRAIL, OWNCOACH, OWNSCHOOL_1_8, OWNSCHOOL_9_15, OWNSCHOOL_16, OWNBUS_16, OWNVAN_1_8, OWNVAN_9_15, OWNLIMO_1_8, OWNLIMO_9_15, OWNLIMO_16 — all 8-digit numeric.

### Term Leased Equipment (Orders 119–131)

Fields: TRMTRUCK, TRMTRACT, TRMTRAIL, TRMCOACH, TRMSCHOOL_1_8, TRMSCHOOL_9_15, TRMSCHOOL_16, TRMBUS_16, TRMVAN_1_8, TRMVAN_9_15, TRMLIMO_1_8, TRMLIMO_9_15, TRMLIMO_16 — all 8-digit numeric.

### Trip Leased Equipment (Orders 132–144)

Fields: TRPTRUCK, TRPTRACT, TRPTRAIL, TRPCOACH, TRPSCHOOL_1_8, TRPSCHOOL_9_15, TRPSCHOOL_16, TRPBUS_16, TRPVAN_1_8, TRPVAN_9_15, TRPLIMO_1_8, TRPLIMO_9_15, TRPLIMO_16 — all 8-digit numeric.

---

## Fleet Size Code (Order 26)

**FLEETSIZE** (1, Alpha) — Total power units represented as a letter code. Power units include trucks, truck tractors, motor coaches, school buses, mini bus/vans, and limousines.

| Code | Power Units | Code | Power Units |
|------|-------------|------|-------------|
| A | 1 | N | 45–55 |
| B | 2–3 | O | 56–75 |
| C | 4–6 | P | 76–100 |
| D | 7–8 | Q | 101–200 |
| E | 9–11 | R | 201–300 |
| F | 12–14 | S | 301–400 |
| G | 15–17 | T | 401–550 |
| H | 18–19 | U | 551–999 |
| I | 20–23 | V | 1,000–2,000 |
| J | 24–28 | W | 2,001–3,000 |
| K | 29–32 | X | 3,001–4,000 |
| L | 33–38 | Y | 4,001–5,000 |
| M | 39–44 | Z | Over 5,000 |

---

## Mileage (Orders 10–12)

**MCS150_MILEAGE** (10, Numeric) — Annual miles reported on form MCS-150.

**MCS150_MILEAGE_YEAR** (4, Numeric, YYYY) — The year of the mileage reported.

**MCS151_MILEAGE** (10, Numeric) — Miles reported from the most current review.

---

## Cargo Classifications (Orders 75–105)

30 cargo type fields, each 1-character Alpha. An `X` indicates the entity transports that cargo type. An entity can transport multiple types.

| Order | Field | Cargo Type |
|-------|-------|------------|
| 75 | CRGO_GENFREIGHT | A. General Freight |
| 76 | CRGO_HOUSEHOLD | B. Household Goods |
| 77 | CRGO_METALSHEET | C. Metal: Sheets, Coils, Rolls |
| 78 | CRGO_MOTOVEH | D. Motor Vehicles |
| 79 | CRGO_DRIVETOW | E. Driveaway/Towaway |
| 80 | CRGO_LOGPOLE | F. Logs, Poles, Beams, Lumber |
| 81 | CRGO_BLDGMAT | G. Building Materials |
| 82 | CRGO_MOBILEHOME | H. Mobile Homes |
| 83 | CRGO_MACHLRG | I. Machinery, Large Objects |
| 84 | CRGO_PRODUCE | J. Fresh Produce |
| 85 | CRGO_LIQGAS | K. Liquids/Gases |
| 86 | CRGO_INTERMODAL | L. Intermodal Containers |
| 87 | CRGO_PASSENGERS | M. Passengers |
| 88 | CRGO_OILFIELD | N. Oilfield Equipment |
| 89 | CRGO_LIVESTOCK | O. Livestock |
| 90 | CRGO_GRAINFEED | P. Grain, Feed, Hay |
| 91 | CRGO_COALCOKE | Q. Coal/Coke |
| 92 | CRGO_MEAT | R. Meat |
| 93 | CRGO_GARBAGE | S. Garbage, Refuse, Trash |
| 94 | CRGO_USMAIL | T. U.S. Mail |
| 95 | CRGO_CHEM | U. Chemicals |
| 96 | CRGO_DRYBULK | V. Commodities Dry Bulk |
| 97 | CRGO_COLDFOOD | W. Refrigerated Food |
| 98 | CRGO_BEVERAGES | X. Beverages |
| 99 | CRGO_PAPERPROD | Y. Paper Products |
| 100 | CRGO_UTILITY | Z. Utility |
| 101 | CRGO_FARMSUPP | AA. Farm Supplies |
| 102 | CRGO_CONSTRUCT | BB. Construction |
| 103 | CRGO_WATERWELL | CC. Water-Well |
| 104 | CRGO_CARGOOTHR | DD. Other |

**CRGO_CARGOOTHR_DESC** (50, Alpha) — Free-text description when "Other" cargo is selected.

---

## Safety Review & Rating (Orders 27–28, 70–73)

**REVIEW_TYPE** (1, Alpha) — Type of the latest review:
- `C` = Compliance Review
- `H` = Shipper Review
- `N` = Non-Ratable Review
- `A` = Safety Audit
- `S` = Safety Review
- `E` = Educational Contact Review
- `U` = Historical Audit Record
- `K` = Automatic Safety Assessment Program Review
- `F` = CTFR Only
- `G` = CR and CTFR
- `I` = Carrier Inactivate
- `J` = CR and Security Contact Review

**REVIEW_ID** (8, Numeric) — Document number assigned by MCMIS to New Entrant reviews (since 2018-07-26).

**REVIEW_DATE** (8, Alphanumeric, YYYYMMDD) — Date the review was completed.

**SAFETY_RATING** (1, Alpha) — Compliance rating:
- `S` = Satisfactory — no evidence of substantial non-compliance
- `C` = Conditional — out of compliance with one or more requirements
- `U` = Unsatisfactory — evidence of substantial non-compliance
- Blank = no review conducted

**SAFETY_RATING_DATE** (8, Alphanumeric, YYYYMMDD) — Date the rating was entered into MCMIS.

**RECORDABLE_CRASH_RATE** (6, Numeric) — Implied decimal format `000.000`. Computed from the latest review: (Total Recordable Accidents x 1,000,000) / Mileage. A value of `000.000` means either no mileage data available or the actual rate is zero. A value of `999.999` means the rate exceeds 10.0.

---

## Hazmat & MCSIP (Orders 42–44)

**HM_Ind** (1, Alpha) — Hazardous materials indicator: `Y` or `N`.

**MCSIPSTEP** (2, Numeric) — Motor Carrier Safety Improvement Process step. Stopped being used in 2010.

**MCSIPDATE** (8, Alphanumeric) — MCSIP date. No longer populated.

---

## Miscellaneous Fields (Orders 7, 13–16, 40)

**SAFETY_INV_TERR** (2, Alpha) — Territory code for the state/county where the entity is domiciled, corresponding to an Officer-in-Charge's responsibility area.

**TOTAL_CARS** (6, Numeric) — Total automobiles used by intrastate entities as commercial vehicles (e.g., courier services, small package delivery).

**MCS150_UPDATE_CODE_ID** (1, Alpha) — Flag indicating the record was updated.

**PRIOR_REVOKE_FLAG** (1, Alpha) — `Y` = USDOT registration has been revoked, `N` = not revoked.

**PRIOR_REVOKE_DOT_NUMBER** (8, Numeric) — The revoked USDOT number.

**POINTNUM** (9, Alphanumeric) — Pointer to the primary record. Contains the USDOT number of the primary record. `P` = Primary, `S` = Secondary.

---

## Removed Fields

The following fields were removed from the census file as they are no longer in use or not available:

- **CLASS** — Classification (1, Alpha)
- **SHPINTER** — Operation / Shipper / Interstate (value D)
- **SHPINTRA** — Operation / Shipper / Intrastate (value E)
- **VEHICLE REGISTRANT** — Operation / Vehicle Registrant (value F)
- **REPPREVRAT** — Preventable Recordable Accident Rate (6, Numeric, format 000.000)

---

## Reference: Glossary of Key Terms

- **Bus**: Motor vehicle designed for commercial transportation of 15+ passengers including driver
- **Fleet Size**: Total power units (truck-tractors + straight trucks) owned/operated by a carrier
- **For-Hire Carrier**: Primary business is transporting property/passengers for compensation
- **Private Carrier**: Highway transport activities are incidental to primary business
- **FMCSR**: Federal Motor Carrier Safety Regulations (Title 49 CFR)
- **HMR**: Hazardous Materials Regulations (Title 49 CFR)
- **MCMIS**: Motor Carrier Management Information System
- **MCSAP**: Motor Carrier Safety Assistance Program (federal funding to states)
- **Out-of-Service (OOS)**: Violation requiring vehicle/driver to be taken off the road until corrected
- **USDOT Number**: Identification number assigned to all interstate commercial carriers regulated by FMCSA
- **SafetyNet**: State-based system for storing/processing commercial carrier safety data before transfer to MCMIS
- **Power Unit**: Self-propelled vehicles including truck-tractors and straight trucks

---

## Reference: County Codes

The original document includes a comprehensive county code table (pages 19–89) covering all counties in all 50 U.S. states, the District of Columbia, Puerto Rico, and the U.S. Virgin Islands. Each county is identified by its two-letter state abbreviation and a federally-assigned numeric code. The complete county code mapping is included in the companion JSON file.