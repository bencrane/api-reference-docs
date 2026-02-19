# TheirStack - Webhooks - List Webhook Events

## Webhooks

### List Webhook Events

List all events triggered for a specific webhook.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/webhooks/{webhook_id}/events`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_id` | `integer` | Yes | ID of the webhook |

---

## Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `status` | `string` (nullable) | — | Status of the webhook events to filter by. Values: `IN_PROGRESS`, `SUCCESS`, `FAILED`, `NOT_TRIGGERED` |
| `offset` | `integer` | `0` | Number of results to skip |
| `limit` | `integer` (1-500) | `25` | Number of results per page |

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
curl -X GET "https://api.theirstack.com/v0/webhooks/123/events" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
[
  {
    "id": 0,
    "webhook_id": 0,
    "job_id": 0,
    "company_name": "string",
    "triggered_at": "2019-08-24T14:15:22Z",
    "status": "IN_PROGRESS",
    "payload": {
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
      "countries": [
        "United States",
        "Canada",
        "Spain",
        "France",
        "Australia"
      ],
      "country": "United States",
      "country_codes": [
        "US",
        "CA",
        "ES",
        "FR",
        "AU"
      ],
      "country_code": "US",
      "cities": [
        "New York",
        "San Francisco",
        "London",
        "Paris",
        "Sydney"
      ],
      "continents": [
        "North America",
        "Europe",
        "Asia",
        "Australia",
        "South America"
      ],
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
      "employment_statuses": [
        "full_time"
      ],
      "easy_apply": true,
      "technology_slugs": [
        "google-firebase",
        "postgresql",
        "jira"
      ],
      "description": "...",
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
        "url_source": "string",
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
      },
      "locations": [
        {
          "admin1_code": "CA",
          "admin1_name": "California",
          "admin2_code": "101",
          "admin2_name": "Sutter",
          "continent": "NA",
          "country_code": "US",
          "country_name": "United States",
          "display_name": "Live Oak, California, United States",
          "feature_code": "PPL",
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
    },
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "response_status_code": 0,
    "response_body": "string"
  }
]
```