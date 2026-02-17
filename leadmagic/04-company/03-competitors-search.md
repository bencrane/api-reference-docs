# Company - Competitors Search

> Find competitors of a company by analyzing market position and industry data.

## Overview

Find competitors of a company by analyzing market position and industry data. Essential for competitive intelligence and market research.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/companies/competitors-search
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                            |
|----------------|----------------------------------|
| **Cost**       | **5 credits** per search         |
| **No Results** | **FREE** if no competitors found |

Returns a comprehensive list of competitors with their company profiles.

## Rate Limits

### Per-Endpoint Limit

| Metric              | Value                |
|---------------------|----------------------|
| **Requests/Minute** | 2,000                |
| **Burst Capacity**  | ~33 requests/second  |

### Gateway Limits (Account-Wide)

| Tier            | RPM    | Daily     |
|-----------------|--------|-----------|
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

## Response Time

| Metric           | Value     |
|------------------|-----------|
| **Median (P50)** | ~800ms    |
| **P95**          | ~2,500ms  |
| **P99**          | ~5,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/companies/competitors-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "salesforce.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/companies/competitors-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'salesforce.com' })
});
const data = await response.json();
console.log(`Found ${data.competitors?.length || 0} competitors`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/companies/competitors-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'salesforce.com'}
)
data = response.json()
print(f"Found {len(data.get('competitors', []))} competitors")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                        |
|------------------|--------|----------|------------------------------------|
| `company_domain` | string | No*      | Company website domain (most accurate). |
| `company_url`    | string | No*      | Company profile URL.               |
| `company_name`   | string | No*      | Company name.                      |

> **Required:** You must provide at least one identifier: `company_domain`, `company_url`, or `company_name`.

---

## Response Fields

### Top-Level Fields

| Field              | Type    | Required | Description                          |
|--------------------|---------|----------|--------------------------------------|
| `competitors`      | array   | Yes      | Array of competitor companies        |
| `credits_consumed` | number  | Yes      | Credits used (5 if found, 0 if not)  |
| `message`          | string  | Yes      | Human-readable status message        |

### Competitor Object

Each entry in the `competitors` array contains:

| Field              | Type    | Description                              |
|--------------------|---------|------------------------------------------|
| `name`             | string  | Competitor company name                  |
| `shortDescription` | string  | Brief company description                |
| `founded_year`     | string  | Year founded                             |
| `companyType`      | string  | Ownership type (private, public, etc.)   |
| `hq`               | string  | Headquarters location (e.g., "San Francisco, US") |
| `employeesCount`   | integer | Employee count                           |
| `valuation`        | integer | Company valuation (raw)                  |
| `tags`             | array   | Industry tags with `name`, `slug`, `primary` |
| `twitter_followers`| integer | Twitter follower count                   |
| `growth`           | integer | Growth indicator                         |
| `non_hq_locations` | array   | Other office locations                   |
| `more_locations`   | boolean | Whether additional locations exist       |

### Competitor Financial Metrics (object)

| Field                | Type    | Description                   |
|----------------------|---------|-------------------------------|
| `currency_code`      | string  | Currency (e.g., "USD")        |
| `period`             | string  | Reporting period              |
| `revenue`            | integer | Revenue for the period        |
| `cost_of_goods_sold` | integer | COGS (nullable)               |
| `gross_profit`       | integer | Gross profit (nullable)       |
| `net_income`         | integer | Net income (nullable)         |

### Competitor Operating Metrics (array)

Each entry contains:

| Field                    | Type   | Description                  |
|--------------------------|--------|------------------------------|
| `period`                 | string | Metric period                |
| `value`                  | string | Metric value                 |
| `definition`             | string | What the metric measures     |
| `operating_metric_group` | string | Metric category              |

### Competitor Funding Metrics (object)

| Field           | Type    | Description                     |
|-----------------|---------|---------------------------------|
| `date`          | string  | Time since last funding         |
| `latest`        | integer | Latest funding round amount     |
| `currency_code` | string  | Currency                        |
| `total`         | integer | Total funding raised            |

### Competitor Twitter Engagement (object)

| Field      | Type   | Description                    |
|------------|--------|--------------------------------|
| `handle`   | string | Twitter handle                 |
| `analytics`| array  | Engagement data with `collectedAt`, `tweets`, `following`, `followers`, `avgRetweetsPerTweet`, `avgLikesPerTweet`, etc. |

---

### Example Response

```json
{
  "competitors": [
    {
      "name": "HubSpot",
      "shortDescription": "CRM and marketing platform for growing businesses.",
      "founded_year": "2006",
      "companyType": "public",
      "hq": "Cambridge, US",
      "employeesCount": 7000,
      "valuation": 25000000000,
      "tags": [
        { "name": "Software", "slug": "software", "primary": true }
      ],
      "twitter_followers": 850000,
      "growth": 5,
      "non_hq_locations": ["Dublin, IE", "Berlin, DE", "Sydney, AU"],
      "financial_metrics": {
        "currency_code": "USD",
        "period": "Y, 2023",
        "revenue": 2170000000
      },
      "funding_metrics": {
        "date": "about 10 years",
        "latest": 32000000,
        "currency_code": "USD",
        "total": 100500000
      }
    },
    {
      "name": "Zoho",
      "shortDescription": "Business software suite for organizations.",
      "founded_year": "1996",
      "companyType": "private",
      "hq": "Chennai, IN",
      "employeesCount": 12000
    }
  ],
  "credits_consumed": 5,
  "message": "Competitors found."
}
```

---

## Success Messages

| Message                                  | Meaning                      | Cost      |
|------------------------------------------|------------------------------|-----------|
| `Competitors found.`                     | Competitor list returned     | 5 credits |
| `No competitors found for this company.` | No competitor data available | FREE      |

---

## Error Responses

### 400 — Bad Request

Missing required fields or invalid format.

### 401 — Unauthorized

Missing or invalid API key.

### 402 — Payment Required

Insufficient credits. Add credits at https://app.leadmagic.io/billing.

### 404 — Not Found

Company not found in the database.

### 429 — Rate Limit Exceeded

Check the `Retry-After` header for when to retry.

**Rate limit headers returned:**

| Header               | Description                     |
|----------------------|---------------------------------|
| `Retry-After`        | Seconds to wait before retrying |
| `RateLimit-Limit`    | Maximum requests per minute     |
| `RateLimit-Remaining`| Remaining requests this minute  |
| `RateLimit-Reset`    | Seconds until limit resets      |

### 500 — Internal Server Error

Wait 30 seconds and retry. If the problem persists, contact support@leadmagic.io.

---

## Best Practices

### Use for Displacement Campaigns

Target competitor customers with tailored messaging about switching.

### Expand Your TAM

Use competitor employee counts to estimate total addressable market.

### Chain with Employee Finder

Find key contacts at competitors to understand their go-to-market strategy.

---

## Use Cases

- **Competitive Intelligence** — Understand the competitive landscape for target accounts.
- **Displacement Campaigns** — Identify competitor customers for targeted outreach.
- **Market Analysis** — Analyze market players and their positioning.
- **Sales Battlecards** — Build competitive battlecards with accurate data.