# TheirStack - Search Endpoints - Technographics

This endpoint lists the technologies used by a company. For each technology, it returns the confidence level (`low`, `medium`, `high`), the number of jobs that mention the technology, and the first and last dates it was mentioned. You must specify `company_domain`, `company_name`, or `company_linkedin_url`.

It consumes 3 API credits per company lookup, regardless of the number of technologies returned. It doesn't consume credits if there is no response.

```
POST https://api.theirstack.com/v1/companies/technologies
```

## Authorization

```
Authorization: Bearer <token>
```

## Request Body (application/json)

### Company Identifiers

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `company_id` | string (nullable) | — | Match by TheirStack Company ID. Internal/temporary — use `company_domain` or `company_linkedin_url` for deduplication. |
| `company_name` | string (nullable) | — | Exact company name match, case-sensitive. |
| `company_domain` | string (nullable) | — | Exact domain match. Accepts full URLs and emails. |
| `company_linkedin_url` | string (nullable) | — | Exact LinkedIn URL match. |
| `company_name_or` | array\<string\> | `[]` | **(deprecated)** Use `company_name` instead. |

### Pagination & Ordering

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `order_by` | array | `[{"desc":true,"field":"confidence"},{"desc":true,"field":"jobs"}]` | List of column objects for ordering results. |
| `offset` | integer (nullable, ≥0) | — | Number of results to skip. Required for offset-based pagination. |
| `page` | integer (nullable, ≥0) | — | Page number. Required when using page-based pagination. |
| `limit` | integer (nullable, ≥1) | — | Number of results per page. |
| `include_total_results` | boolean (nullable) | `false` | Include `total_results` in response. Slows down responses. |

### Technology Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `technology_slug_or` | array\<string\> | `[]` | Technologies mentioned in jobs. Case-sensitive slugs. |
| `technology_category_slug_or` | array\<string\> | `[]` | Filter by technology category slugs. |
| `technology_parent_category_slug_or` | array\<string\> | `[]` | Filter by technology parent category slugs. |
| `confidence_or` | array\<string\> | `[]` | Filter by confidence: `low`, `medium`, `high`. |

### Ranking & Occurrence Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `max_rank` | integer (nullable) | — | Max rank within category. Rank 1 = most used technology in its category for this company. |
| `min_jobs` | integer (nullable) | — | Minimum number of jobs mentioning the technology. |
| `max_jobs` | integer (nullable) | — | Maximum number of jobs mentioning the technology. |
| `min_relative_occurrence` | number (nullable) | — | Minimum `relative_occurrence_within_category`. Higher values = higher probability of actual usage. |

### Date Filters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `first_date_found_gte` | string (nullable, date) | — | First mention on or after this date (YYYY-MM-DD). |
| `first_date_found_lte` | string (nullable, date) | — | First mention on or before this date (YYYY-MM-DD). |
| `last_date_found_gte` | string (nullable, date) | — | Last mention on or after this date (YYYY-MM-DD). |
| `last_date_found_lte` | string (nullable, date) | — | Last mention on or before this date (YYYY-MM-DD). |

## Example Request

Technologies used by google.com:

```bash
curl -X POST "https://api.theirstack.com/v1/companies/technologies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "company_domain": "google.com"
  }'
```

## Response (200)

```json
{
  "data": [
    {
      "technology": {
        "name": "PostgreSQL",
        "category": "Relational Database",
        "slug": "kafka",
        "category_slug": "message-queue",
        "parent_category": "Data Stores",
        "parent_category_slug": "data-stores",
        "logo": "string",
        "logo_thumbnail": "string"
      },
      "confidence": "low",
      "jobs": 54,
      "jobs_last_7_days": 0,
      "jobs_last_30_days": 0,
      "jobs_last_180_days": 0,
      "first_date_found": "2019-08-24",
      "last_date_found": "2019-08-24",
      "rank_within_category": 0,
      "relative_occurrence_within_category": 0,
      "theirstack_score": 0,
      "company_name": "Google"
    }
  ],
  "metadata": {
    "total_results": 2034,
    "truncated_results": 0,
    "truncated_companies": 0,
    "total_companies": 1045
  }
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