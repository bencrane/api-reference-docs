# Overview - Shovels - Data Dictionary

| FIELD | DESCRIPTION | TYPE | In API and/or Enterprise? | SOURCE |
|-------|-------------|------|---------------------------|--------|
| ADDRESS_ID | The Shovels geo_ID of the contractor address | String | BOTH | Created by Shovels |
| AVG_CONSTRUCTION_DURATION | Average construction duration in days across all permits pulled by the contractor | Integer | API | Created by Shovels |
| AVG_INSPECTION_PASS_RATE | Average inspection pass rate across all permits pulled by the contractor | Integer | API | Created by Shovels |
| AVG_JOB_VALUE | Average job values from the permits pulled by the contractor | Integer | API | Enhanced by Shovels |
| BIZ_NAME | The business name of the contractor | String | BOTH | Provided by jurisdiction |
| BIZ_NAME_2 | The second part of the contractor business name as offered by some authorities | String | EDL | Provided by jurisdiction |
| BIZ_TYPE | The type of business: JointVenture, Corporation, Partnership, Limited Liability, Sole Owner | String | BOTH | Enhanced by Shovels |
| CITY | The city of the contractor's address | String | BOTH | Enhanced by Shovels |
| CLASSIFICATION | The type of licenses issued to the contractor | String | BOTH | Enhanced by Shovels |
| CLASSIFICATION_DERIVED | Standardized classification derived from official classification, pipe-separated. Unique values: concrete_and_paving, demolition_and_excavation, electrical, fencing_and_glazing, framing_and_carpentry, general_building_contractor, general_engineering_contractor, hvac, landscaping_and_outdoor_work, other, plumbing, roofing, and specialty_trades. | String | BOTH | Created by Shovels |
| COUNTY | The county of the contractor's address | String | BOTH | Enhanced by Shovels |
| DBA | "Doing Business As" (DBA) name associated with a contractor or business as recorded on a permit | String | BOTH | Enhanced by Shovels |
| EMAIL | Email addresses associated with a contractor. Emails are separated by commas and ordered by frequency. | String | BOTH | Provided by jurisdiction |
| EMPLOYEE_COUNT | The employee range of the contractor as provided by public social media records: 1 to 10, 11 to 25, 26 to 50, 51 to 100, 101 to 250, 251 to 500, 501 to 1000, 1001 to 5000, 5001 to 10000, 10000+ | String | BOTH | Enhanced by Shovels |
| FIRST_SEEN_DATE | Date contractor first appeared in Shovels data | Date | BOTH | Created by Shovels |
| GROUP_ID | Identifies that a contractor likely shares a common parent company | String | EDL | Enhanced by Shovels |
| ID | The unique persistent Shovels ID that joins to Permits on contractor_id | String | BOTH | Created by Shovels |
| IS_REPRESENTATIVE | Represents the contractor group (GROUP_ID) | String | EDL | Created by Shovels |
| JURISDICTION | The jurisdiction of the contractor's address | String | BOTH | Created by Shovels |
| LATLNG | The latitude and longitude of the contractor's address | String | BOTH | Enhanced by Shovels |
| LICENSE | The ID of the license | String | BOTH | Enhanced by Shovels |
| LICENSE_ACT_DATE | The date the license was activated | Date | BOTH | Enhanced by Shovels |
| LICENSE_EXP_DATE | The expiration date of the license | Date | BOTH | Enhanced by Shovels |
| LICENSE_INACT_DATE | The date the license was inactivated | Date | BOTH | Enhanced by Shovels |
| LICENSE_ISSUE_DATE | The date the license was issued | Date | BOTH | Enhanced by Shovels |
| LICENSE_ISSUE_STATE | The state that issued the license | String | EDL | Enhanced by Shovels |
| LINKEDIN_URL | Contractor business LinkedIn profile URL | String | BOTH | Enhanced by Shovels |
| NAICS | The NAICS code | String | BOTH | Enhanced by Shovels |
| NAME | The person name associated with the contractor business, if available | String | BOTH | Provided by jurisdiction |
| PERMIT_COUNT | Number of permits pulled by the contractor | Integer | API | Enhanced by Shovels |
| PHONE | Phone numbers associated with a contractor. Numbers are separated by commas and ordered by frequency. | String | BOTH | Provided by jurisdiction |
| PRIMARY_EMAIL | The most relevant email address of the contractor, based on the most recent permits (issued in the last year). If multiple exist, the one appearing most frequently is selected. | String | BOTH | Enhanced by Shovels |
| PRIMARY_INDUSTRY | The industry of the contractor as provided by public social media records | String | BOTH | Enhanced by Shovels |
| PRIMARY_PHONE | The most relevant phone number of the contractor, based on the most recent permits (issued in the last year). If multiple exist, the one appearing most frequently is selected. | String | BOTH | Enhanced by Shovels |
| RATING | The 5-star rating on their Google Maps profile | Integer | BOTH | Enhanced by Shovels |
| REVENUE | The revenue range of the contractor as provided by public social media records | String | BOTH | Enhanced by Shovels |
| REVIEW_COUNT | The number of reviews on their Google Maps profile | Integer | BOTH | Enhanced by Shovels |
| SIC | The SIC code | String | BOTH | Enhanced by Shovels |
| STATE | The two-character state code of the contractor's address | String | BOTH | Enhanced by Shovels |
| STATUS | Contractor's license status, derived from the official state license files. Possible values: active, inactive | String | EDL | Enhanced by Shovels |
| STATUS_DETAILED | More specific view of a contractor's license status, derived from official state license data. Only populated for licensed contractors. Possible values: active, inactive, active_conditional, expired, retired, suspended, revoked, pending. | String | EDL | Enhanced by Shovels |
| STATUS_TALLY | The summary of all status counts for contractors' work. Available statuses: active, final, unknown, inactive, in_review. | String | API | Provided by jurisdiction |
| STREET | The name of the street of the contractor's address | String | BOTH | Enhanced by Shovels |
| STREET_NO | The number of the street of the contractor's address | String | BOTH | Enhanced by Shovels |
| TAG_TALLY | The summary of all tag counts for contractors' work. | String | API | Created by Shovels |
| TOTAL_JOB_VALUE | Total job values across all the permits pulled by the contractor | Integer | API | Enhanced by Shovels |
| WEBSITE | The website domain for the contractor's business | String | BOTH | Enhanced by Shovels |
| ZIPCODE | The zip code of the contractor's address | String | BOTH | Enhanced by Shovels |