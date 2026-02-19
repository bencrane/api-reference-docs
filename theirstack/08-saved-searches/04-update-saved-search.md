# TheirStack - Saved Searches - Update Saved Search

## Saved Searches

### Update Saved Search

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `PATCH /v0/saved_searches/{search_id}`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search_id` | `integer` | Yes | The ID of the saved search |

---

## Request Body

`application/json`

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` (nullable) | Name of the saved search |
| `body` | `CompanySearchFilters \| JobSearchFilters \| null` | Filters. CompanySearchFilters if type is 'companies', JobSearchFilters if type is 'jobs' |
| `type` | `string` (nullable) | Type of the saved search. Values: `companies`, `jobs` |
| `is_alert_active` | `boolean` (nullable) | Is the alert active |
| `frequency` | `string` (nullable) | Frequency of email alerts sent. Values: `daily`, `weekly` |
| `emails_subscribed` | `array<string>` (nullable) | Emails subscribed to the saved search alerts. Default: `[]` |

### CompanySearchFilters (body)

| Parameter | Type | Default | Description |
|---|---|---|---|
| `expand_technology_slugs` | `array<string>` | `[]` | Specify technology slugs to include detailed technology usage information for each company. |
| `order_by` | `array<ColumnSortCompanySearch>` | See default | List of column objects for ordering results. |
| `company_name_or` | `array<string>` | `[]` | Only return companies that match these names exactly, case-sensitively. OR filter. |
| `company_name_case_insensitive_or` | `array<string>` | `[]` | Only return companies that match these names exactly, case-insensitively. |
| `company_id_or` | `array<string>` | `[]` | Only return companies that match these IDs exactly. OR filter. |
| `company_domain_or` | `array<string>` | `[]` | Only return companies that match these domains exactly. Accepts full urls and emails. OR filter. |
| `company_domain_not` | `array<string>` | `[]` | Exclude companies matching these domains exactly. |
| `company_name_not` | `array<string>` | `[]` | Exclude companies matching these names exactly, case-sensitively. |
| `company_name_partial_match_or` | `array<string>` | `[]` | Return companies whose name contains any of these substrings, case-insensitively. |
| `company_name_partial_match_not` | `array<string>` | `[]` | Exclude companies whose name contains any of these substrings, case-insensitively. |
| `company_linkedin_url_or` | `array<string>` | `[]` | Return companies whose LinkedIn URL matches any of the slugs passed here. |
| `blur_company_data` | `boolean` | `false` | Enable preview mode to return blurred data without consuming API credits. |
| `property_exists_or` | `array<string>` | `[]` | Return companies that have any of these fields not null. Values: `domain`, `linkedin_url` |
| `property_exists_and` | `array<string>` | `[]` | Return companies that have all of these fields not null. Values: `domain`, `linkedin_url` |
| `offset` | `integer` | `0` | Number of results to skip. |
| `page` | `integer` | `0` | Page number. |
| `limit` | `integer` | `25` | Number of results per page. |
| `cursor` | `string` (nullable) | — | Cursor for pagination. |
| `company_description_pattern_or` | `array<string>` | `[]` | Case-insensitive patterns to match in the company description. OR filter. |
| `company_description_pattern_not` | `array<string>` | `[]` | Case-insensitive patterns to exclude in the company description. |
| `company_description_pattern_accent_insensitive` | `boolean` (nullable) | `false` | Set to True to make company description searches accent insensitive. |
| `min_revenue_usd` | `integer` (nullable) | — | Minimum company revenue, in USD. |
| `max_revenue_usd` | `integer` (nullable) | — | Maximum company revenue, in USD. |
| `min_employee_count` | `integer` (nullable) | — | Minimum number of employees. |
| `max_employee_count` | `integer` (nullable) | — | Maximum number of employees. |
| `min_employee_count_or_null` | `integer` (nullable) | — | Minimum employees; includes companies with no size info. |
| `max_employee_count_or_null` | `integer` (nullable) | — | Maximum employees; includes companies with no size info. |
| `min_funding_usd` | `integer` (nullable) | — | Minimum company funding, in USD. |
| `max_funding_usd` | `integer` (nullable) | — | Maximum company funding, in USD. |
| `funding_stage_or` | `array<string>` | `[]` | Funding stages filter. See API docs for full list of values. |
| `industry_or` | `array<string>` | `[]` | *(deprecated)* Names of industries. Use `industry_id_or` instead. |
| `industry_not` | `array<string>` | `[]` | *(deprecated)* Exclude industries. Use `industry_id_not` instead. |
| `industry_id_or` | `array<integer>` | `[]` | Industry codes (LinkedIn Industry Codes V2). |
| `industry_id_not` | `array<integer>` | `[]` | Industry ids to exclude. |
| `company_tags_or` | `array<string>` | `[]` | Return companies matching any of these keywords. |
| `company_type` | `string` (nullable) | — | Filter by company type. Values: `recruiting_agency`, `direct_employer`, `all` |
| `company_investors_or` | `array<string>` | `[]` | Investors of the company. |
| `company_investors_partial_match_or` | `array<string>` | `[]` | Partial match on investor names. |
| `company_technology_slug_or` | `array<string>` | `[]` | Companies mentioning any of these technologies. |
| `company_technology_slug_and` | `array<string>` | `[]` | Companies mentioning all of these technologies. |
| `company_technology_slug_not` | `array<string>` | `[]` | Exclude companies mentioning any of these technologies. |
| `only_yc_companies` | `boolean` (nullable) | `false` | Only return YC companies. |
| `company_location_pattern_or` | `array<string>` | `[]` | Match company city patterns, case insensitive. |
| `company_country_code_or` | `array<string>` | `[]` | Filter by HQ country code (ISO2). |
| `company_country_code_not` | `array<string>` | `[]` | Exclude by HQ country code (ISO2). |
| `company_list_id_or` | `array<integer>` | `[]` | Return companies in any of these lists. |
| `company_list_id_not` | `array<integer>` | `[]` | Exclude companies in any of these lists. |
| `company_linkedin_url_exists` | `boolean` (nullable) | — | *(deprecated)* Use `property_exists_or` / `property_exists_and` instead. |
| `revealed_company_data` | `boolean` (nullable) | — | *(deprecated)* No effect. |
| `last_funding_round_date_lte` | `string` (nullable, date) | — | Last funding round date on or before. Format: `YYYY-MM-DD` |
| `last_funding_round_date_gte` | `string` (nullable, date) | — | Last funding round date on or after. Format: `YYYY-MM-DD` |
| `include_total_results` | `boolean` | `false` | Calculate and return total_results. WARNING: Significantly slows down responses. |
| `job_filters` | `object` (nullable) | — | Job-level filters (see JobFilters). |
| `tech_filters` | `object` (nullable) | — | Technographic filters (see TechnographicsTechnologyFilters). |

---

## Response Body

| Status | Content Type |
|---|---|
| 200 | `application/json` |
| 400 | `application/json` |
| 402 | `application/json` |
| 422 | `application/json` |
| 500 | `application/json` |

---

## Example Request (cURL)

```bash
curl -X PATCH "https://api.theirstack.com/v0/saved_searches/0" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Example Response (200)

```json
{
  "id": 0,
  "name": "string",
  "type": "companies",
  "body": {
    "expand_technology_slugs": [],
    "order_by": [
      {
        "desc": true,
        "field": "confidence"
      },
      {
        "desc": true,
        "field": "num_jobs_found"
      },
      {
        "desc": true,
        "field": "num_jobs"
      },
      {
        "desc": true,
        "field": "num_jobs"
      },
      {
        "desc": true,
        "field": "employee_count"
      }
    ],
    "company_name_or": [],
    "company_name_case_insensitive_or": [],
    "company_id_or": [],
    "company_domain_or": [],
    "company_domain_not": [],
    "company_name_not": [],
    "company_name_partial_match_or": [],
    "company_name_partial_match_not": [],
    "company_linkedin_url_or": [],
    "blur_company_data": false,
    "property_exists_or": [],
    "property_exists_and": [],
    "offset": 0,
    "page": 0,
    "limit": 25,
    "company_description_pattern_or": [],
    "company_description_pattern_not": [],
    "company_description_pattern_accent_insensitive": null,
    "min_revenue_usd": null,
    "max_revenue_usd": null,
    "min_employee_count": null,
    "max_employee_count": null,
    "min_employee_count_or_null": null,
    "max_employee_count_or_null": null,
    "min_funding_usd": null,
    "max_funding_usd": null,
    "funding_stage_or": [],
    "industry_or": [],
    "industry_not": [],
    "industry_id_or": [],
    "industry_id_not": [],
    "company_tags_or": [],
    "company_type": "recruiting_agency",
    "company_investors_or": [],
    "company_investors_partial_match_or": [],
    "company_technology_slug_or": [],
    "company_technology_slug_and": [],
    "company_technology_slug_not": [],
    "only_yc_companies": false,
    "company_location_pattern_or": [],
    "company_country_code_or": [],
    "company_country_code_not": [],
    "company_list_id_or": [],
    "company_list_id_not": [],
    "company_linkedin_url_exists": null,
    "revealed_company_data": null,
    "last_funding_round_date_lte": null,
    "last_funding_round_date_gte": null,
    "include_total_results": false,
    "job_filters": {
      "job_title_or": [],
      "job_title_not": [],
      "job_title_pattern_and": [],
      "job_title_pattern_or": [],
      "job_title_pattern_not": [],
      "job_country_code_or": [],
      "job_country_code_not": [],
      "posted_at_max_age_days": null,
      "posted_at_gte": null,
      "posted_at_lte": null,
      "discovered_at_max_age_days": null,
      "discovered_at_min_age_days": null,
      "discovered_at_gte": null,
      "discovered_at_lte": null,
      "job_description_pattern_or": [],
      "job_description_pattern_not": [],
      "job_description_pattern_is_case_insensitive": null,
      "job_description_contains_or": [],
      "job_description_contains_not": [],
      "job_description_pattern_case_sensitive_or": [],
      "remote": null,
      "only_jobs_with_reports_to": null,
      "reports_to_exists": null,
      "final_url_exists": null,
      "only_jobs_with_hiring_managers": null,
      "hiring_managers_exists": null,
      "job_id_or": [],
      "job_id_not": [],
      "job_ids": [],
      "job_seniority_or": [],
      "min_salary_usd": null,
      "max_salary_usd": null,
      "job_technology_slug_or": [],
      "job_technology_slug_not": [],
      "job_technology_slug_and": [],
      "job_location_pattern_or": [],
      "job_location_pattern_not": [],
      "job_location_or": [],
      "job_location_not": [],
      "url_domain_or": [],
      "url_domain_not": [],
      "scraper_name_pattern_or": [],
      "easy_apply": null,
      "employment_statuses_or": []
    },
    "tech_filters": {
      "technology_slug_or": [],
      "technology_category_slug_or": [],
      "technology_parent_category_slug_or": [],
      "max_rank": null,
      "min_jobs": null,
      "max_jobs": null,
      "min_relative_occurrence": null,
      "first_date_found_gte": null,
      "first_date_found_lte": null,
      "last_date_found_gte": null,
      "last_date_found_lte": null,
      "confidence_or": []
    }
  },
  "is_alert_active": false,
  "user_id": 0,
  "team_id": 0,
  "created_at": "2019-08-24T14:15:22Z",
  "updated_at": "2019-08-24T14:15:22Z",
  "query": "string",
  "path": "string",
  "querystring_params": {},
  "creator": {
    "id": 0,
    "email": "string",
    "first_name": "string",
    "last_name": "string"
  },
  "is_archived": false,
  "has_active_webhooks": false,
  "frequency": "daily",
  "emails_subscribed": []
}
```