# TheirStack - Search Endpoints - Company Search

This endpoint lets you search for companies by technology stack, hiring signals, and firmographics. It returns a list of companies that match the search criteria, along with the jobs and technology objects for each company that match the filters you've passed. It consumes 3 API credits for each company returned in the response.

Useful resources: Preview data mode, Free count mode

The response includes both company data and any matching jobs or technologies based on your filters.

```
POST https://api.theirstack.com/v1/companies/search
```

## Authorization

```
Authorization: Bearer <token>
```

## Request Body (application/json)

### Pagination & Ordering

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `order_by` | array | `[{"desc":true,"field":"confidence"},{"desc":true,"field":"num_jobs_found"},{"desc":true,"field":"num_jobs"},{"desc":true,"field":"employee_count"}]` | List of column objects for ordering results. |
| `offset` | integer (≥0) | `0` | Number of results to skip. Required for offset-based pagination. |
| `page` | integer (≥0) | `0` | Page number. Required when using page-based pagination. |
| `limit` | integer (≥1) | `25` | Number of results per page. |
| `cursor` | string (nullable) | — | Cursor for pagination. |

### Company Identity Filters

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

### Company Description Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_description_pattern_or` | array\<string\> | `[]` | Case-insensitive regex on company description. Match any. |
| `company_description_pattern_not` | array\<string\> | `[]` | Case-insensitive regex to exclude by company description. |
| `company_description_pattern_accent_insensitive` | boolean (nullable) | `false` | Accent-insensitive company description search. |

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
| `last_funding_round_date_lte` | string (nullable, date) | — | Last funding round on or before this date (YYYY-MM-DD). |
| `last_funding_round_date_gte` | string (nullable, date) | — | Last funding round on or after this date (YYYY-MM-DD). |

### Industry & Location

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `industry_id_or` | array\<integer\> | `[]` | LinkedIn Industry Codes V2 or from `/v0/catalog/industries`. |
| `industry_id_not` | array\<integer\> | `[]` | Exclude industries by ID. |
| `industry_or` | array\<string\> | `[]` | **(deprecated)** Use `industry_id_or`. |
| `industry_not` | array\<string\> | `[]` | **(deprecated)** Use `industry_id_not`. |
| `company_country_code_or` | array\<string\> | `[]` | Company HQ country code (ISO2). |
| `company_country_code_not` | array\<string\> | `[]` | Exclude by company HQ country code. |
| `company_location_pattern_or` | array\<string\> | `[]` | Regex on company city. Case-insensitive. |

### Technology & Investors

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_technology_slug_or` | array\<string\> | `[]` | Companies mentioning **any** of these technologies in their jobs. |
| `company_technology_slug_and` | array\<string\> | `[]` | Companies mentioning **all** of these technologies. |
| `company_technology_slug_not` | array\<string\> | `[]` | Companies not mentioning these technologies. |
| `expand_technology_slugs` | array\<string\> | `[]` | Include detailed technology usage info (confidence, ranking, job count) per company in `technologies_found`. |
| `company_investors_or` | array\<string\> | `[]` | Exact investor match. |
| `company_investors_partial_match_or` | array\<string\> | `[]` | Substring match on investor names. |
| `company_tags_or` | array\<string\> | `[]` | Match companies by keywords. |
| `only_yc_companies` | boolean (nullable) | `false` | Only return Y Combinator companies. |

### Other Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_type` | string (nullable) | — | `recruiting_agency`, `direct_employer`, or `all`. |
| `company_list_id_or` | array\<integer\> | `[]` | Companies in any of these lists. |
| `company_list_id_not` | array\<integer\> | `[]` | Companies not in any of these lists. |
| `blur_company_data` | boolean | `false` | Enable preview mode (blurred data, no credits consumed). |
| `property_exists_or` | array\<string\> | `[]` | Return companies where **any** of these fields are not null (`domain`, `linkedin_url`). |
| `property_exists_and` | array\<string\> | `[]` | Return companies where **all** of these fields are not null. |
| `include_total_results` | boolean | `false` | Include `total_results` in response. Slows down responses. |
| `job_filters` | object (nullable) | — | Nested job filter criteria. |
| `tech_filters` | object (nullable) | — | Nested technographics filter criteria. |

### Deprecated Filters

| Parameter | Type | Description |
|-----------|------|-------------|
| `company_linkedin_url_exists` | boolean (nullable) | Use `property_exists_or` / `property_exists_and` instead. |
| `revealed_company_data` | boolean (nullable) | Deprecated, no effect. |

## Example Request

US companies ordered by employee count:

```bash
curl -X POST "https://api.theirstack.com/v1/companies/search" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "order_by": [
      {
        "desc": true,
        "field": "employee_count"
      }
    ],
    "page": 0,
    "limit": 25,
    "company_country_code_or": ["US"]
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
      "id": "google",
      "name": "Google",
      "domain": "google.com",
      "industry": "internet",
      "country": "United States",
      "country_code": "string",
      "employee_count": 7543,
      "logo": "https://example.com/logo.png",
      "num_jobs": 746,
      "num_technologies": 746,
      "possible_domains": [],
      "url": "google.com",
      "industry_id": 0,
      "linkedin_url": "http://www.linkedin.com/company/google",
      "num_jobs_last_30_days": 34,
      "num_jobs_found": 23,
      "yc_batch": "W21",
      "apollo_id": "5b839bd0324d4445051f9a5a",
      "linkedin_id": "string",
      "is_recruiting_agency": true,
      "founded_year": 2019,
      "annual_revenue_usd": 189000000,
      "annual_revenue_usd_readable": "189M",
      "total_funding_usd": 500000,
      "last_funding_round_date": "2020-01-01",
      "last_funding_round_amount_readable": "$1.2M",
      "employee_count_range": "1001-5000",
      "long_description": "Google is a California-based multinational technology company...",
      "seo_description": "string",
      "city": "Mountain View",
      "postal_code": "28040",
      "company_keywords": ["string"],
      "alexa_ranking": 1,
      "publicly_traded_symbol": "GOOG",
      "publicly_traded_exchange": "NASDAQ",
      "investors": ["string"],
      "funding_stage": "angel",
      "has_blurred_data": false,
      "technology_slugs": ["kafka", "elasticsearch"],
      "technology_names": ["Kafka", "Elasticsearch"],
      "technologies_found": [],
      "jobs_found": []
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