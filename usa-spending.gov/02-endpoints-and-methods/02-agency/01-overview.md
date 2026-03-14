# Agency

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/` | GET | Returns agency overview information for USAspending.gov's Agency Details page for agencies that have ever awarded |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/awards/` | GET | Returns agency summary information, specifically the number of transactions and award obligations for the sub agency section of USAspending.gov's Agency Details page |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/awards/new/count/` | GET | Returns a count of New Awards for the agency in a single fiscal year |
| `/api/v2/agency/awards/count/` | GET | Returns a count of Awards types for agencies in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/budget_function/` | GET | Returns a list of Budget Functions and Budget Subfunctions for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/budget_function/count/` | GET | Returns the count of Budget Functions for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/budgetary_resources/` | GET | Returns budgetary resources and obligations for the agency and fiscal year requested |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/federal_account/` | GET | Returns a list of Federal Accounts and Treasury Accounts for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/federal_account/count/` | GET | Returns the count of Federal Accounts and Treasury Accounts for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/object_class/` | GET | Returns a list of Object Classes for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/object_class/count/` | GET | Returns the count of Object Classes for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/obligations_by_award_category/` | GET | Returns a breakdown of obligations by award category within a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/program_activity/` | GET | Returns a list of Program Activity categories for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/program_activity/count/` | GET | Returns the count of Program Activity categories for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/sub_agency/` | GET | Returns a list of sub-agencies and offices with obligated amounts, transaction counts and new award counts for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/sub_agency/count/` | GET | Returns the number of sub-agencies and offices for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/sub_components/<BUREAU_SLUG>/` | GET | Returns a list of federal_accounts by bureau for the agency in a single fiscal year |
| `/api/v2/agency/<TOPTIER_AGENCY_CODE>/sub_components/` | GET | Returns a list of bureaus for the agency in a single fiscal year |
| `/api/v2/agency/treasury_account/<TREASURY_ACCOUNT_SYMBOL>/object_class/` | GET | Returns a list of Object Classes for the specified Treasury Account Symbol (TAS) |
| `/api/v2/agency/treasury_account/<TREASURY_ACCOUNT_SYMBOL>/program_activity/` | GET | Returns a list of Program Activities for the specified Treasury Account Symbol (TAS) |
