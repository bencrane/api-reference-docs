# TheirStack - Saved Searches - Get Saved Search

## Saved Searches

### Get Saved Search

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/saved_searches/{search_id}`

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
curl -X GET "https://api.theirstack.com/v0/saved_searches/0" \
  -H "Authorization: Bearer <token>"
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