# Company - Company Search

> Search for companies and retrieve comprehensive company intelligence including funding, employees, industry, and more.

## Overview

Find and enrich company data by domain, profile URL, or name. Get comprehensive firmographic data including industry, size, funding, and social profiles.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/companies/company-search
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                          |
|----------------|--------------------------------|
| **Cost**       | **1 credit** per company found |
| **No Results** | **FREE** if no company found   |

Includes extensive firmographic data: industry, size, funding, leadership, social profiles, and more.

## Rate Limits

### Per-Endpoint Limit

| Metric              | Value               |
|---------------------|---------------------|
| **Requests/Minute** | 500                 |
| **Burst Capacity**  | ~8 requests/second  |

> Lower per-minute limit due to data complexity. Use domain for fastest lookups.

### Gateway Limits (Account-Wide)

| Tier            | RPM    | Daily     |
|-----------------|--------|-----------|
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

## Response Time

| Metric           | Value     |
|------------------|-----------|
| **Median (P50)** | ~500ms    |
| **P95**          | ~1,500ms  |
| **P99**          | ~3,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/companies/company-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "company.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/companies/company-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'company.com' })
});
const company = await response.json();
console.log(`${company.companyName} - ${company.industry}`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/companies/company-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'company.com'}
)
company = response.json()
print(f"{company['companyName']} - {company['industry']}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                                            |
|------------------|--------|----------|--------------------------------------------------------|
| `company_domain` | string | No*      | Company website domain (most accurate).                |
| `profile_url`    | string | No*      | Professional company profile URL or slug.              |
| `company_name`   | string | No*      | Company name (less precise, may match similar names).  |

> **Required:** You must provide at least one identifier: `company_domain`, `profile_url`, or `company_name`.

---

## Response Fields

### Core Fields

| Field               | Type    | Description                            |
|---------------------|---------|----------------------------------------|
| `companyName`       | string  | Official company name                  |
| `companyId`         | integer | Unique company identifier              |
| `industry`          | string  | Primary industry                       |
| `description`       | string  | Company description                    |
| `tagline`           | string  | Company tagline                        |
| `employeeCount`     | integer | Exact employee count                   |
| `employeeCountRange`| object  | Employee range with `start` and `end`  |
| `employee_range`    | string  | Human-readable employee range (e.g., "5,000 - 10,000") |
| `websiteUrl`        | string  | Company website URL                    |
| `universalName`     | string  | Universal profile identifier           |
| `credits_consumed`  | number  | Credits used (1 if found, 0 if not)    |
| `message`           | string  | Human-readable status message          |

### Headquarters & Locations

| Field          | Type   | Description                                   |
|----------------|--------|-----------------------------------------------|
| `headquarter`  | object | HQ with `city`, `geographicArea`, `country`, `postalCode`, `line1`, `line2` |
| `locations`    | array  | All office locations with coordinates, each containing `city`, `geographicArea`, `country`, `latitude`, `longitude`, `headquarter` (boolean) |

### Financial Data

| Field                 | Type    | Description                              |
|-----------------------|---------|------------------------------------------|
| `revenue`             | number  | Estimated annual revenue                 |
| `revenue_formatted`   | string  | Human-readable revenue (e.g., "5.1B")   |
| `total_funding`       | string  | Total funding raised (e.g., "9.8B")     |
| `funding_rounds`      | integer | Number of funding rounds completed       |
| `last_funding_round`  | string  | Type of most recent funding round        |
| `last_funding_amount` | number  | Amount raised in most recent round       |
| `last_funding_date`   | string  | Date of most recent funding round        |
| `ownership_status`    | string  | Ownership type (Public, Private, Acquired) |
| `stock_ticker`        | string  | Stock ticker symbol (if publicly traded) |
| `acquisitions_count`  | integer | Number of acquisitions made              |

### Founded

| Field        | Type   | Description                                  |
|--------------|--------|----------------------------------------------|
| `foundedOn`  | object | Object with `year`, `month`, `day` fields    |
| `founded_year`| string | Year the company was founded                |

### Social Profiles

| Field            | Type    | Description                  |
|------------------|---------|------------------------------|
| `followerCount`  | integer | Social follower count        |
| `b2b_profile_url`| string | Professional profile URL     |
| `twitter_url`    | string  | Twitter/X profile URL        |
| `facebook_url`   | string  | Facebook page URL            |
| `logo_url`       | string  | Company logo URL             |

### Additional Data

| Field          | Type  | Description                    |
|----------------|-------|--------------------------------|
| `specialities` | array | List of company specialties    |
| `competitors`  | array | Known competitor company names |
| `hashtag`      | string| Associated hashtag             |

### Example Response

```json
{
  "companyName": "Company Inc",
  "companyId": 12345,
  "industry": "Technology",
  "description": "Enterprise software solutions for B2B companies.",
  "employeeCount": 150,
  "employeeCountRange": {
    "start": 51,
    "end": 200
  },
  "employee_range": "51-200",
  "founded_year": "2015",
  "foundedOn": {
    "year": 2015,
    "month": null,
    "day": null
  },
  "headquarter": {
    "city": "San Francisco",
    "geographicArea": "California",
    "country": "US",
    "postalCode": "94105",
    "line1": "123 Main St"
  },
  "locations": [
    {
      "city": "San Francisco",
      "geographicArea": "California",
      "country": "US",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "headquarter": true
    }
  ],
  "revenue": 25000000,
  "revenue_formatted": "25M",
  "total_funding": "50M",
  "funding_rounds": 3,
  "last_funding_round": "Series B",
  "ownership_status": "Private",
  "followerCount": 25000,
  "b2b_profile_url": "company-inc",
  "twitter_url": "https://twitter.com/companyinc",
  "logo_url": "https://logo.leadmagic.io/company.com",
  "specialities": ["Sales", "Marketing", "ABM"],
  "competitors": ["Competitor A", "Competitor B"],
  "websiteUrl": "https://company.com",
  "credits_consumed": 1,
  "message": "Company found"
}
```

---

## Success Messages

| Message             | Meaning               | Cost     |
|---------------------|-----------------------|----------|
| `Company found`     | Company data returned | 1 credit |
| `Company not found` | No matching company   | FREE     |

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

### Use Domain for Accuracy

Domain lookups are most reliable. Company names can be ambiguous.

### Cache Results

Company data changes slowly. Cache results for 24–48 hours.

### Chain with Other Endpoints

Use with Employee Finder or Role Finder to build complete account profiles.

---

## Use Cases

- **CRM Enrichment** — Enrich account records with firmographic data.
- **Lead Scoring** — Use company size and industry for lead qualification.
- **Market Research** — Analyze target market company profiles.
- **ABM Targeting** — Build target account lists with rich data.