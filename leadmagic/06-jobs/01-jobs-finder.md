# Jobs - Jobs Finder

> Search and filter job listings across companies. Find open positions to identify hiring signals, target growing companies, or research market demand.

---

## Endpoint Details

**POST** `/v1/jobs/jobs-finder`

### Pricing

| Metric         | Value                         |
| -------------- | ----------------------------- |
| **Cost**       | **1 credit** per job returned |
| **No Results** | **FREE** if no jobs found     |

Companies with open positions are actively investing and growing — perfect timing for sales outreach.

### Rate Limits

**Per-Endpoint Limit**

| Metric              | Value               |
| ------------------- | ------------------- |
| **Requests/Minute** | 100                 |
| **Burst Capacity**  | ~2 requests/second  |

Lower per-minute limit due to complex search operations. Batch your searches efficiently.

**Gateway Limits (Account-Wide)**

| Tier            | RPM    | Daily     |
| --------------- | ------ | --------- |
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

### Response Time

| Metric           | Value     |
| ---------------- | --------- |
| **Median (P50)** | ~800ms    |
| **P95**          | ~2,500ms  |
| **P99**          | ~5,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/jobs/jobs-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "job_title": "Sales Director",
    "country_id": "US",
    "posted_within": 14
  }'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/jobs/jobs-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    job_title: 'Sales Director',
    country_id: 'US',
    posted_within: 14
  })
});
const { results, total_count } = await response.json();
console.log(`Found ${total_count} jobs`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/jobs/jobs-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'job_title': 'Sales Director',
        'country_id': 'US',
        'posted_within': 14
    }
)
data = response.json()
print(f"Found {data['total_count']} jobs")
```

---

## Request Parameters

All fields are optional — combine them to filter results.

### Company Filters

| Parameter             | Type    | Description                                                        |
| --------------------- | ------- | ------------------------------------------------------------------ |
| `company_name`        | string  | Company name to search                                             |
| `company_website`     | string  | Company domain                                                     |
| `company_type_id`     | integer | Company type ID (see reference endpoints)                          |
| `company_industry_id` | integer | Industry ID (see reference endpoints)                              |
| `min_employees`       | integer | Minimum company size                                               |
| `max_employees`       | integer | Maximum company size                                               |

### Job Filters

| Parameter          | Type    | Description                                          |
| ------------------ | ------- | ---------------------------------------------------- |
| `job_title`        | string  | Title keyword search                                 |
| `job_description`  | string  | Description keyword search                           |
| `experience_level` | string  | Level: `entry`, `mid`, `senior`, `executive`         |
| `job_type_id`      | integer | Job type ID (see reference endpoints)                |
| `has_remote`       | boolean | Filter for remote work options                       |

### Location Filters

| Parameter    | Type    | Description                                           |
| ------------ | ------- | ----------------------------------------------------- |
| `location`   | string  | City or region name                                   |
| `city_name`  | string  | Specific city                                         |
| `country_id` | string  | Country code (US, UK, etc.)                           |
| `region_id`  | integer | State/region ID (see reference endpoints)             |

### Date Filters

| Parameter       | Type    | Description                                     |
| --------------- | ------- | ----------------------------------------------- |
| `posted_within` | integer | Days since posting (e.g., 14 for last 2 weeks)  |
| `posted_after`  | string  | Posted on or after (YYYY-MM-DD)                  |
| `posted_before` | string  | Posted on or before (YYYY-MM-DD)                 |

### Pagination

| Parameter  | Type    | Default | Description                    |
| ---------- | ------- | ------- | ------------------------------ |
| `page`     | integer | 1       | Page number                    |
| `per_page` | integer | 20      | Results per page (max: 50)     |

---

## Response

| Field              | Type    | Required | Description                      |
| ------------------ | ------- | -------- | -------------------------------- |
| `total_count`      | integer | Yes      | Total jobs matching filters      |
| `page`             | integer | Yes      | Current page                     |
| `per_page`         | integer | Yes      | Results per page                 |
| `total_pages`      | integer | Yes      | Total pages available            |
| `credits_consumed` | integer | Yes      | Credits used (1 per job returned)|
| `results`          | array   | Yes      | Array of job listings            |

### Job Object

| Field                     | Type    | Description                   |
| ------------------------- | ------- | ----------------------------- |
| `title`                   | string  | Job title                     |
| `company.name`            | string  | Company name                  |
| `company.website_url`     | string  | Company website               |
| `company.b2b_profile_url` | string  | Company profile URL           |
| `location`                | string  | Job location                  |
| `types`                   | array   | Job types (Full-time, etc.)   |
| `experience_level`        | string  | Entry, Mid, Senior, Executive |
| `has_remote`              | boolean | Remote work available         |
| `published`               | string  | Posted date                   |
| `description`             | string  | Full job description          |
| `application_url`         | string  | Apply link                    |
| `salary_min`              | string  | Minimum salary (nullable)     |
| `salary_max`              | string  | Maximum salary (nullable)     |
| `salary_currency`         | string  | Salary currency (nullable)    |

### Example Response

```json
{
  "total_count": 142,
  "page": 1,
  "per_page": 20,
  "total_pages": 8,
  "credits_consumed": 20,
  "results": [
    {
      "title": "VP of Sales",
      "company": {
        "name": "TechCorp Inc",
        "website_url": "https://techcorp.com",
        "b2b_profile_url": "https://linkedin.com/company/techcorp"
      },
      "location": "San Francisco, CA",
      "types": ["Full-time"],
      "experience_level": "Executive",
      "has_remote": true,
      "published": "2024-01-28",
      "description": "Leading enterprise sales team...",
      "application_url": "https://techcorp.com/careers/vp-sales"
    }
  ]
}
```

---

## Reference Endpoints

Get valid filter IDs from these endpoints (all free, no credits):

| Endpoint                              | Description          |
| ------------------------------------- | -------------------- |
| `/v1/reference/job-country`           | Get country IDs      |
| `/v1/reference/job-regions`           | Get region/state IDs |
| `/v1/reference/job-types`             | Get job type IDs     |
| `/v1/reference/job-company-types`     | Get company type IDs |
| `/v1/reference/job-industry`          | Get industry IDs     |

---

## Best Practices

- **Filter by `posted_within`** — Use `posted_within: 14` to focus on companies actively hiring right now.
- **Target your buyer's role** — Companies hiring for your buyer's role have active budget and immediate need.
- **Chain with Role Finder** — After finding hiring companies, use Role Finder to find decision makers.
- **Use pagination wisely** — Start with `per_page: 20` and paginate. Don't request large pages you won't use.

---

## Use Cases

- **Sales Intelligence** — Companies hiring for your buyer persona have active budget.
- **ABM Targeting** — Find companies hiring roles that need your product.
- **Market Research** — Analyze hiring trends across industries.
- **Recruiting** — Discover open positions matching candidate profiles.

---

## Error Responses

| Status | Code                     | Description                                      |
| ------ | ------------------------ | ------------------------------------------------ |
| 400    | `validation_error`       | Missing or invalid parameters                    |
| 401    | `missing_authentication` | Missing `X-API-Key` header                       |
| 401    | `invalid_api_key`        | Invalid or expired API key                       |
| 402    | `insufficient_credits`   | Not enough credits                               |
| 429    | `rate_limit_exceeded`    | Too many requests — check `Retry-After` header   |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds            |