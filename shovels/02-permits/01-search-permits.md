# Shovels.ai - Permits - Search Permits

## Endpoint

```
GET /v2/permits/search
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/permits/search?size=50' \
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
| permit_tags | string[] \| null | No | — | Filter by one or more tags. Use '-' prefix to exclude tags. Example: `?permit_tags=solar&permit_tags=-roofing` (has solar, not roofing). |
| permit_has_contractor | boolean \| null | No | — | Return only records that have a contractor ID. |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |
| permit_q | string \| null | No | — | Substring to search for in permit description (case-insensitive). Matches anywhere in the text, including partial words. Max length: 50 |
| permit_status | string[] | No | — | Filter by one or more statuses: final, in_review, inactive, active. Max array length: 4 |
| permit_min_approval_duration | integer \| null | No | — | Filter by the minimum permit approval duration in days. |
| permit_min_construction_duration | integer \| null | No | — | Filter by the minimum project construction duration in days. |
| permit_min_inspection_pr | integer \| null | No | — | Filter by the minimum inspection pass rate. |
| permit_min_job_value | integer \| null | No | — | Filter by the minimum job value. |
| permit_min_fees | integer \| null | No | — | Filter by minimum permit fees. |
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

Schema for paginated permits details response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | PermitsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### PermitsRead Object

```json
{
  "property_census_tract": "101",
  "property_congressional_district": "1",
  "property_type": "residential",
  "property_type_detail": "single_family_home",
  "property_legal_owner": "OAKLAND HOUSING AUTHORITY",
  "property_owner_type": "private_owner",
  "property_lot_size": 4000,
  "property_building_area": 1000,
  "property_story_count": 1,
  "property_unit_count": 1,
  "property_year_built": 1970,
  "property_assess_market_value": 105000000,
  "id": "caf3b9d5ce317d53",
  "number": "RE2303928",
  "description": "Battery backup",
  "jurisdiction": "Berkeley",
  "job_value": 500000,
  "type": "Re) - electrical - 1 & 2 unit residential (building)",
  "fees": 61960,
  "status": "active",
  "file_date": "2023-10-02",
  "issue_date": "2023-10-11",
  "final_date": "2023-12-11",
  "start_date": "2022-10-19",
  "end_date": "2023-12-11",
  "total_duration": 230,
  "construction_duration": 61,
  "approval_duration": 9,
  "inspection_pass_rate": 85,
  "contractor_id": "KOm4dMLIuT",
  "tags": ["solar", "utilities", "residential", "solar_battery_storage"],
  "address": {
    "street_no": "3360",
    "street": "DWIGHT WAY",
    "city": "OAKLAND",
    "zip_code": "94704",
    "state": "CA",
    "latlng": [37.868443, -122.24374]
  },
  "geo_ids": {
    "address_id": "asd8a8b19",
    "city_id": "KLais31",
    "county_id": "ALa2s33",
    "jurisdiction_id": "BLa2s33"
  }
}
```

### Notes

- Multiple parameters are treated as AND queries.
- Use `contractor_classification_derived` to filter by contractor's derived classifications (ALL specified values required).
- Pagination is cursor-based via the `next_cursor` field in the response.