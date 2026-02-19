# TheirStack - Company Lists - Get Companies From List

```
GET https://api.theirstack.com/v0/company_lists/{list_id}/companies
```

## Authorization

```
Authorization: Bearer <token>
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `list_id` | integer | Yes | The ID of the company list. |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `order_by` | string | `"revealed_at"` | Order by field: `revealed_at` or `name`. |
| `order_direction` | string | `"desc"` | Order direction: `asc` or `desc`. |
| `company_name_partial` | string | — | Pass a partial company name to filter the list of companies. |
| `limit` | integer (≥1) | `25` | Number of results per page. |
| `page` | integer (≥0) | `0` | Page number. Required when using page-based pagination. |
| `offset` | integer (≥0) | `0` | Number of results to skip. Required for offset-based pagination. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/company_lists/0/companies" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
[
  {
    "company_name": "string",
    "added_at": "2019-08-24T14:15:22Z",
    "revealed_at": "2019-08-24T14:15:22Z",
    "company_object": {
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
      "technology_names": ["Kafka", "Elasticsearch"]
    }
  }
]
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |