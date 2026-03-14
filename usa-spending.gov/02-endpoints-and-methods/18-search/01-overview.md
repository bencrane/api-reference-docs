# Search

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/search/new_awards_over_time/` | POST | Returns a list of time periods with the new awards in the appropriate period within the provided time range |
| `/api/v2/search/spending_by_award/` | POST | Returns the fields of the filtered awards |
| `/api/v2/search/spending_by_award_count/` | POST | Returns the number of awards in each award type (Contracts, IDV, Loans, Direct Payments, Grants, and Other) |
| `/api/v2/search/spending_by_category/` | POST | Returns data grouped in preset units to support the various data visualizations on USAspending.gov's Advanced Search page |
| `/api/v2/search/spending_by_category/awarding_agency/` | POST | Returns data grouped by Awarding Agency |
| `/api/v2/search/spending_by_category/awarding_subagency/` | POST | Returns data grouped by Awarding Subagency |
| `/api/v2/search/spending_by_category/cfda/` | POST | Returns data grouped by CFDA |
| `/api/v2/search/spending_by_category/country/` | POST | Returns data grouped by Country |
| `/api/v2/search/spending_by_category/county/` | POST | Returns data grouped by County |
| `/api/v2/search/spending_by_category/district/` | POST | Returns data grouped by Congressional District |
| `/api/v2/search/spending_by_category/federal_account/` | POST | Returns data grouped by Federal Account |
| `/api/v2/search/spending_by_category/funding_agency/` | POST | Returns data grouped by Funding Agency |
| `/api/v2/search/spending_by_category/funding_subagency/` | POST | Returns data grouped by Funding Subagency |
| `/api/v2/search/spending_by_category/naics/` | POST | Returns data grouped by NAICS |
| `/api/v2/search/spending_by_category/psc/` | POST | Returns data grouped by PSC |
| `/api/v2/search/spending_by_category/recipient` | POST | Returns data grouped by Recipient |
| `/api/v2/search/spending_by_category/recipient_duns/` | POST | Returns data grouped by Recipient DUNS |
| `/api/v2/search/spending_by_category/state_territory/` | POST | Returns data grouped by State Territory |
| `/api/v2/search/spending_by_category/defc/` | POST | Returns data grouped by DEFC |
| `/api/v2/search/spending_by_geography/` | POST | Returns spending by state code, county code, or congressional district code |
| `/api/v2/search/spending_by_subaward_grouped/` | POST | Returns the award id, number of Subawards, total Subaward obligations, and the award generated internal id |
| `/api/v2/search/spending_by_transaction/` | POST | Returns awards where a certain subset of fields match against search term |
| `/api/v2/search/spending_by_transaction_count/` | POST | Returns counts of awards where a certain subset of fields match against search term |
| `/api/v2/search/spending_by_transaction_grouped/` | POST | Returns transaction information grouped by their prime award matching against search terms |
| `/api/v2/search/spending_over_time/` | POST | Returns transaction aggregated amounts for Spending Over Time visualizations |
| `/api/v2/search/transaction_spending_summary/` | POST | Returns the number of transactions and the sum of federal action obligations for prime awards given a set of filters |
