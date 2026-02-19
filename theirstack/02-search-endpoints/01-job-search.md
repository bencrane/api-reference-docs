# TheirStack - Search Endpoints - Job Search

This endpoint lets you search for jobs posted on thousands of websites and filter by multiple filters, such as job titles, companies, locations, company attributes, dates and many more. It consumes 1 API credit for each job returned in the response.

You must specify at least one of the following filters, or otherwise your request will fail: `posted_at_max_age_days`, `posted_at_gte`, `posted_at_lte`, `company_domain_or`, `company_linkedin_url_or`, `company_name_or`. This is for performance reasons.

To retrieve jobs from a specific company or a list of companies, you can apply any of the following filters: `company_domain_or`, `company_linkedin_url_or`, `company_name_or`, `company_name_case_insensitive_or`. When using multiple company identifier filters, the endpoint will return jobs from companies that match any of the specified identifiers. Therefore, it is advisable to create a separate request for each company if you intend to use more than one identifier.

This endpoint is used by job seekers and sales/marketing teams to search for jobs filtered by country, job title, technologies, job description, company name, company domain, or date range.

Useful resources: Avoiding getting the same job twice, Fetching jobs periodically, Preview data mode, Free count mode

```
POST https://api.theirstack.com/v1/jobs/search
```

## Authorization

```
Authorization: Bearer <token>
```

## Request Body (application/json)

### Pagination

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `order_by` | array | `[{"desc":true,"field":"date_posted"},{"desc":true,"field":"discovered_at"}]` | **(deprecated)** List of column objects for ordering results. |
| `offset` | integer (≥0) | `0` | Number of results to skip. Required for offset-based pagination. |
| `page` | integer (≥0) | `0` | Page number. Required when using page-based pagination. |
| `limit` | integer (≥1) | `25` | Number of results per page. |
| `cursor` | string (nullable) | — | Cursor for pagination. |

### Job Title Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `job_title_or` | array\<string\> | `[]` | Natural language patterns to match job titles. Case-insensitive. Uses Postgres full text search. |
| `job_title_not` | array\<string\> | `[]` | Natural language patterns to exclude job titles. Case-insensitive. Uses Postgres full text search. |
| `job_title_pattern_and` | array\<string\> | `[]` | Regex patterns to match job titles. Case-insensitive. Jobs must match **all** patterns. |
| `job_title_pattern_or` | array\<string\> | `[]` | Regex patterns to match job titles. Case-insensitive. Jobs matching **any** pattern returned. |
| `job_title_pattern_not` | array\<string\> | `[]` | Regex patterns to exclude job titles. Case-insensitive. |

### Job Location Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `job_country_code_or` | array\<string\> | `[]` | 2-letter ISO country codes. Include jobs from these countries. |
| `job_country_code_not` | array\<string\> | `[]` | 2-letter ISO country codes. Exclude jobs from these countries. |
| `job_location_pattern_or` | array\<string\> | `[]` | Regex patterns to match job locations. Case-insensitive. |
| `job_location_pattern_not` | array\<string\> | `[]` | Regex patterns to exclude job locations. Case-insensitive. |
| `job_location_or` | array\<JobLocationFilter\> | `[]` | Filter jobs by location using JobLocationFilter objects. |
| `job_location_not` | array\<JobLocationFilter\> | `[]` | Exclude jobs by location using JobLocationFilter objects. |

### Date Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `posted_at_max_age_days` | integer (nullable) | — | Date posted max age in days. 0 = today only, 1 = today and yesterday, etc. |
| `posted_at_gte` | string (nullable, date) | — | ISO 8601 date (yyyy-mm-dd). Jobs published on or after this date. |
| `posted_at_lte` | string (nullable, date) | — | ISO 8601 date (yyyy-mm-dd). Jobs published on or before this date. |
| `discovered_at_max_age_days` | integer (nullable) | — | Jobs added to database within N days. 0 = today only. |
| `discovered_at_min_age_days` | integer (nullable) | — | Jobs discovered until N days ago. 1 = until yesterday. |
| `discovered_at_gte` | string (nullable) | — | Jobs discovered on or after this date/datetime (UTC). |
| `discovered_at_lte` | string (nullable) | — | Jobs discovered on or before this date/datetime (UTC). |

### Job Description Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `job_description_pattern_or` | array\<string\> | `[]` | Regex patterns for job descriptions. Case-insensitive. Match any. |
| `job_description_pattern_not` | array\<string\> | `[]` | Regex patterns to exclude from job descriptions. |
| `job_description_pattern_is_case_insensitive` | boolean (nullable) | `true` | **(deprecated)** Use `job_description_pattern_case_sensitive_or` instead. |
| `job_description_contains_or` | array\<string\> | `[]` | Whole-word search in descriptions using word boundaries. Case-insensitive by default (uppercase respected). |
| `job_description_contains_not` | array\<string\> | `[]` | Exclude jobs containing these whole words. |
| `job_description_pattern_case_sensitive_or` | array\<string\> | `[]` | Case-sensitive regex patterns for job descriptions. |

### Job Attribute Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `remote` | boolean (nullable) | — | `true` = remote only, `false` = non-remote only, `null` = all. |
| `job_id_or` | array\<integer\> | `[]` | Get jobs with these IDs only. |
| `job_id_not` | array\<integer\> | `[]` | Exclude jobs with these IDs. |
| `job_ids` | array\<integer\> | `[]` | **(deprecated)** Use `job_id_or` instead. |
| `job_seniority_or` | array\<string\> | `[]` | Filter by seniority: `c_level`, `staff`, `senior`, `junior`, `mid_level`. |
| `min_salary_usd` | number (nullable) | — | Minimum annual salary in USD. |
| `max_salary_usd` | number (nullable) | — | Maximum annual salary in USD. |
| `easy_apply` | boolean (nullable) | — | `true` = direct apply only, `false` = redirect to company site. |
| `employment_statuses_or` | array\<string\> (nullable) | — | Filter by: `full_time`, `part_time`, `temporary`, `internship`, `contract`. |

### Technology Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `job_technology_slug_or` | array\<string\> | `[]` | Jobs mentioning **any** of these technologies. Case-sensitive slugs. |
| `job_technology_slug_not` | array\<string\> | `[]` | Jobs mentioning **none** of these technologies. |
| `job_technology_slug_and` | array\<string\> | `[]` | Jobs mentioning **all** of these technologies. |

### URL / Source Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url_domain_or` | array\<string\> | `[]` | Include jobs by URL domain (e.g., `greenhouse.io`, `workable.com`). |
| `url_domain_not` | array\<string\> | `[]` | Exclude jobs by URL domain. |

### Company Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_name_or` | array\<string\> | `[]` | Exact company name match, case-sensitive. OR logic. |
| `company_name_case_insensitive_or` | array\<string\> | `[]` | Exact company name match, case-insensitive. |
| `company_id_or` | array\<string\> | `[]` | Exact company ID match. OR logic. |
| `company_domain_or` | array\<string\> | `[]` | Exact domain match. Accepts full URLs and emails. OR logic. |
| `company_domain_not` | array\<string\> | `[]` | Exclude companies by domain. |
| `company_name_not` | array\<string\> | `[]` | Exclude companies by exact name, case-sensitive. |
| `company_name_partial_match_or` | array\<string\> | `[]` | Substring match on company name, case-insensitive. |
| `company_name_partial_match_not` | array\<string\> | `[]` | Exclude by substring match on company name. |
| `company_linkedin_url_or` | array\<string\> | `[]` | Match by LinkedIn URL slug or full URL. |
| `company_description_pattern_or` | array\<string\> | `[]` | Case-insensitive regex on company description. Match any. |
| `company_description_pattern_not` | array\<string\> | `[]` | Case-insensitive regex to exclude by company description. |
| `company_description_pattern_accent_insensitive` | boolean (nullable) | `false` | Accent-insensitive company description search. |
| `company_type` | string (nullable) | — | `recruiting_agency`, `direct_employer`, or `all`. |
| `company_list_id_or` | array\<integer\> | `[]` | Companies in any of these lists. |
| `company_list_id_not` | array\<integer\> | `[]` | Companies not in any of these lists. |

### Company Size & Financials

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `min_revenue_usd` | integer (nullable) | — | Minimum company revenue (USD). |
| `max_revenue_usd` | integer (nullable) | — | Maximum company revenue (USD). |
| `min_employee_count` | integer (nullable) | — | Minimum employees. |
| `max_employee_count` | integer (nullable) | — | Maximum employees. |
| `min_employee_count_or_null` | integer (nullable) | — | Minimum employees (includes unknown). |
| `max_employee_count_or_null` | integer (nullable) | — | Maximum employees (includes unknown). |
| `min_funding_usd` | integer (nullable) | — | Minimum funding (USD). |
| `max_funding_usd` | integer (nullable) | — | Maximum funding (USD). |
| `funding_stage_or` | array\<string\> | `[]` | Funding stages (e.g., `seed`, `series_a`, `series_b`, etc.). |
| `last_funding_round_date_lte` | string (nullable, date) | — | Last funding round on or before this date. |
| `last_funding_round_date_gte` | string (nullable, date) | — | Last funding round on or after this date. |

### Company Industry & Location

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `industry_id_or` | array\<integer\> | `[]` | LinkedIn Industry Codes V2 or from `/v0/catalog/industries`. |
| `industry_id_not` | array\<integer\> | `[]` | Exclude industries by ID. |
| `industry_or` | array\<string\> | `[]` | **(deprecated)** Use `industry_id_or`. |
| `industry_not` | array\<string\> | `[]` | **(deprecated)** Use `industry_id_not`. |
| `company_country_code_or` | array\<string\> | `[]` | Company HQ country code (ISO2). |
| `company_country_code_not` | array\<string\> | `[]` | Exclude by company HQ country code. |
| `company_location_pattern_or` | array\<string\> | `[]` | Regex on company city. Case-insensitive. |

### Company Technology & Investors

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_technology_slug_or` | array\<string\> | `[]` | Companies mentioning **any** of these technologies in their jobs. |
| `company_technology_slug_and` | array\<string\> | `[]` | Companies mentioning **all** of these technologies. |
| `company_technology_slug_not` | array\<string\> | `[]` | Companies not mentioning these technologies. |
| `company_investors_or` | array\<string\> | `[]` | Exact investor match. |
| `company_investors_partial_match_or` | array\<string\> | `[]` | Substring match on investor names. |
| `company_tags_or` | array\<string\> | `[]` | Match companies by keywords. |
| `only_yc_companies` | boolean (nullable) | `false` | Only return Y Combinator companies. |

### Other Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `blur_company_data` | boolean | `false` | Enable preview mode (blurred data, no credits consumed). |
| `property_exists_or` | array\<string\> | `[]` | Return jobs where **any** of these fields are not null. |
| `property_exists_and` | array\<string\> | `[]` | Return jobs where **all** of these fields are not null. |
| `include_total_results` | boolean | `false` | Include `total_results` and `total_companies` in response. Slows down responses. |

### Deprecated Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `only_jobs_with_reports_to` | boolean (nullable) | Use `reports_to_exists` instead. |
| `reports_to_exists` | boolean (nullable) | Filter by whether reports-to role is identified. |
| `final_url_exists` | boolean (nullable) | Use `property_exists_or` / `property_exists_and` instead. |
| `only_jobs_with_hiring_managers` | boolean (nullable) | Use `hiring_managers_exists` instead. |
| `hiring_managers_exists` | boolean (nullable) | Use `property_exists_or` / `property_exists_and` instead. |
| `company_linkedin_url_exists` | boolean (nullable) | Use `property_exists_or` / `property_exists_and` instead. |
| `revealed_company_data` | boolean (nullable) | Deprecated, no effect. |
| `scraper_name_pattern_or` | array\<string\> | Regex patterns to match job sources. |

## Example Request

Jobs posted in the US in the last 7 days:

```bash
curl -X POST "https://api.theirstack.com/v1/jobs/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 0,
    "limit": 25,
    "job_country_code_or": ["US"],
    "posted_at_max_age_days": 7
  }'
```

## Response (200)

```json
{
  "metadata": {
    "total_results": 2034,
    "truncated_results": 0,
    "truncated_companies": 0,
    "total_companies": 1045
  },
  "data": [
    {
      "id": 1234,
      "job_title": "Senior Data Engineer",
      "url": "https://example.com/job/1234",
      "date_posted": "2021-01-01",
      "has_blurred_data": false,
      "company": "Google",
      "final_url": "https://carecrafterhealth.com/careers/job-details/MFC286442-4",
      "source_url": "https://www.linkedin.com/jobs/view/1234567890",
      "location": "New York",
      "short_location": "Tulsa, OK",
      "long_location": "Methuen, MA 01844",
      "state_code": "OK",
      "latitude": 37.774929,
      "longitude": -96.726486,
      "postal_code": "01844",
      "remote": true,
      "hybrid": true,
      "salary_string": "$100,000 - $120,000",
      "min_annual_salary": 100000,
      "min_annual_salary_usd": 100000,
      "max_annual_salary": 100000,
      "max_annual_salary_usd": 100000,
      "avg_annual_salary_usd": 100000,
      "salary_currency": "USD",
      "countries": ["United States", "Canada", "Spain", "France", "Australia"],
      "country": "United States",
      "country_codes": ["US", "CA", "ES", "FR", "AU"],
      "country_code": "US",
      "cities": ["New York", "San Francisco", "London", "Paris", "Sydney"],
      "continents": ["North America", "Europe", "Asia", "Australia", "South America"],
      "seniority": "c_level",
      "discovered_at": "2024-01-01T00:00:00",
      "company_domain": "acme.com",
      "hiring_team": [
        {
          "first_name": "John Doe",
          "full_name": "John Doe",
          "image_url": "https://media.licdn.com/dms1234567890",
          "linkedin_url": "https://www.linkedin.com/in/john-doe-1234567890",
          "role": "CEO",
          "thumbnail_url": "https://media.licdn.com/dms1234567890"
        }
      ],
      "reposted": true,
      "date_reposted": "2024-01-01",
      "employment_statuses": ["full_time"],
      "easy_apply": true,
      "technology_slugs": ["google-firebase", "postgresql", "jira"],
      "description": "...",
      "company_object": {
        "id": "google",
        "name": "Google",
        "domain": "google.com",
        "industry": "internet",
        "country": "United States",
        "employee_count": 7543,
        "logo": "https://example.com/logo.png",
        "num_jobs": 746,
        "num_technologies": 746,
        "url": "google.com",
        "linkedin_url": "http://www.linkedin.com/company/google",
        "num_jobs_last_30_days": 34,
        "num_jobs_found": 23,
        "yc_batch": "W21",
        "founded_year": 2019,
        "annual_revenue_usd": 189000000,
        "total_funding_usd": 500000,
        "last_funding_round_date": "2020-01-01",
        "employee_count_range": "1001-5000",
        "long_description": "Google is a California-based multinational technology company...",
        "city": "Mountain View",
        "publicly_traded_symbol": "GOOG",
        "publicly_traded_exchange": "NASDAQ",
        "funding_stage": "angel",
        "has_blurred_data": false,
        "technology_slugs": ["kafka", "elasticsearch"],
        "technology_names": ["Kafka", "Elasticsearch"]
      },
      "locations": [
        {
          "admin1_code": "CA",
          "admin1_name": "California",
          "continent": "NA",
          "country_code": "US",
          "country_name": "United States",
          "display_name": "Live Oak, California, United States",
          "id": 5367315,
          "latitude": 37,
          "longitude": -122,
          "name": "Live Oak",
          "state": "California",
          "state_code": "CA",
          "type": "city"
        }
      ],
      "normalized_title": "string",
      "manager_roles": ["string"],
      "matching_phrases": [],
      "matching_words": []
    }
  ]
}
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |