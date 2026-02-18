# Shovels.ai - Contractors - Search Contractors

## Endpoint

```
GET /v2/contractors/search
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/contractors/search?size=50&include_tallies=true' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| permit_from | string\<date\> | Yes | — | Return permits that started on or after the specified date. Includes all permits with the earliest date (file, issue, or start date) on or after this date. Format: YYYY-MM-DD |
| permit_to | string\<date\> | Yes | — | Return permits that started on or before the specified date. Includes all permits with the latest date (file, issue, or end date) on or before this date. Format: YYYY-MM-DD |
| geo_id | string | Yes | — | Filter by the geolocation ID: address, city, zip code, county, etc. |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |
| include_tallies | boolean | No | true | Include tag and status tallies in response. Set to false to omit tally computation for faster response times when tallies are not needed. |
| permit_q | string \| null | No | — | Substring to search for in permit description (case-insensitive). Matches anywhere in the text, including partial words. Max length: 50 |
| permit_status | string[] | No | — | Filter by one or more statuses: final, in_review, inactive, active. Max array length: 4 |
| permit_min_approval_duration | integer \| null | No | — | Filter by the minimum permit approval duration in days. |
| permit_min_construction_duration | integer \| null | No | — | Filter by the minimum project construction duration in days. |
| permit_min_inspection_pr | integer \| null | No | — | Filter by the minimum inspection pass rate. |
| permit_min_job_value | integer \| null | No | — | Filter by the minimum job value. |
| permit_min_fees | integer \| null | No | — | Filter by minimum permit fees. |
| permit_tags | string[] \| null | No | — | Filter by one or more tags. Use '-' prefix to exclude tags. Example: `?permit_tags=solar&permit_tags=-roofing` (has solar, not roofing). |
| property_type | string \| null | No | — | Filter by property type: residential, commercial, industrial, agricultural, vacant land, exempt, miscellaneous, office, recreational. |
| property_min_market_value | integer \| null | No | — | Minimum assessed market value of the property. |
| property_min_building_area | integer \| null | No | — | Minimum total building area in sq ft. |
| property_min_lot_size | integer \| null | No | — | Minimum size of the property lot in sq ft. |
| property_min_story_count | integer \| null | No | — | Minimum number of property stories. |
| property_min_unit_count | integer \| null | No | — | Minimum number of property units. |
| contractor_classification_derived | string[] \| null | No | — | Filter by derived contractor classifications. Use '-' prefix to exclude. Example: `?classification_derived=electrical&classification_derived=-hvac`. Returns results containing ALL specified classifications. Possible values: concrete_and_paving, demolition_and_excavation, electrical, fencing_and_glazing, framing_and_carpentry, general_building_contractor, general_engineering_contractor, hvac, landscaping_and_outdoor_work, other, plumbing, roofing, specialty_trades. |
| contractor_name | string \| null | No | — | Filter by contractor's name or part of their name. |
| contractor_website | string \| null | No | — | Filter by contractor's website. Don't include the http(s):// prefix. |
| contractor_min_total_job_value | integer \| null | No | — | Minimum lifetime job value of the contractor. |
| contractor_min_total_permits_count | integer \| null | No | — | Minimum lifetime permits count. |
| contractor_min_inspection_pr | integer \| null | No | — | Minimum lifetime inspection pass rate. Value must be integer between 0 and 100, inclusive. |
| contractor_license | string \| null | No | — | Filter by the contractor's license. |

## Response (200)

Schema for paginated contractors details response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | ContractorsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### ContractorsRead Example

```json
{
  "id": "e79c3393ad",
  "license": "961870",
  "name": "CA SUNRISE CONSTRUCTION SOLUTION INC.",
  "business_name": "CA SUNRISE CONSTRUCTION SOLUTION INC.",
  "business_type": "Corporation",
  "classification": "CFC",
  "license_issue_date": "2018-05-15",
  "license_exp_date": "2024-05-15",
  "license_act_date": "2018-05-15",
  "primary_phone": "(425) 507-4300",
  "primary_email": "atobar.casunrise@gmail.com",
  "phone": "(425) 270-9678,(425) 281-6152",
  "email": "atobar.casunrise@gmail.com,david@calsunrise.com",
  "dba": "SUNRISE SOLAR",
  "sic": "1731",
  "naics": "238210",
  "linkedin_url": "https://linkedin.com/company/ca-sunrise-constr",
  "revenue": "$1M-$5M",
  "employee_count": "10-49",
  "primary_industry": "Solar Installation",
  "review_count": 42,
  "rating": 4.8,
  "status_tally": {
    "final": 754,
    "active": 81,
    "in_review": 2,
    "inactive": 313
  },
  "tag_tally": {
    "hvac": 27,
    "solar": 39,
    "roofing": 1,
    "pool_and_hot_tub": 1,
    "heat_pump": 267,
    "electrical": 1110,
    "new_construction": 20
  },
  "permit_count": 1150,
  "avg_job_value": 1500000,
  "total_job_value": 172500000,
  "avg_construction_duration": 45,
  "avg_inspection_pass_rate": 85,
  "address": {
    "street_no": "2800",
    "street": "COTTONWOOD DR",
    "city": "SAN BRUNO",
    "zip_code": "94066",
    "state": "CA",
    "address_id": "asd8a8b19",
    "latlng": [37.37619, -121.869064]
  }
}
```

### Notes

- Returns contractors doing work within the given location area filtered by type of work.
- Multiple parameters are treated as AND queries.
- The `permit_q` parameter uses full-text search with English stemming (e.g., 'installing' matches 'install'). Multi-word queries use AND semantics (e.g., 'solar panel' finds permits mentioning both words).
- Contractors are ordered by the start date of the most recent permit on which they worked.
- Set `include_tallies=false` for faster response times when tallies are not needed.