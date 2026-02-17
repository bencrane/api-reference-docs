# Company - Company Funding

> Provide the Company Domain or Company Name and get back the complete funding details of the company.

## Overview

Discover comprehensive funding data for companies including investment rounds, funding amounts, investor information, and leadership details.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/companies/company-funding
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                             |
|----------------|-----------------------------------|
| **Cost**       | **4 credits** per company         |
| **No Results** | **FREE** if no funding data found |

Includes detailed funding history, investor lists, and CEO/founder information.

## Rate Limits

### Per-Endpoint Limit

| Metric              | Value                |
|---------------------|----------------------|
| **Requests/Minute** | 3,000                |
| **Burst Capacity**  | ~50 requests/second  |

### Gateway Limits (Account-Wide)

| Tier            | RPM    | Daily     |
|-----------------|--------|-----------|
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

## Response Time

| Metric           | Value     |
|------------------|-----------|
| **Median (P50)** | ~600ms    |
| **P95**          | ~1,800ms  |
| **P99**          | ~3,500ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/companies/company-funding' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "stripe.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/companies/company-funding', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'stripe.com' })
});
const data = await response.json();
console.log(`Total Funding: ${data.financialInfo.formattedFunding}`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/companies/company-funding',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'stripe.com'}
)
data = response.json()
print(f"Total Funding: {data.get('financialInfo', {}).get('formattedFunding', 'Unknown')}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                        |
|------------------|--------|----------|------------------------------------|
| `company_domain` | string | No*      | Company website domain (preferred).|
| `company_name`   | string | No*      | Company name.                      |

> **Required:** You must provide either `company_domain` or `company_name` (or both).

---

## Response Fields

### `basicInfo` (object)

| Field            | Type    | Description                                    |
|------------------|---------|------------------------------------------------|
| `companyName`    | string  | Official company name                          |
| `shortName`      | string  | Short/common company name                      |
| `description`    | string  | Company description                            |
| `founded`        | string  | Year founded                                   |
| `headquarters`   | object  | HQ with `city`, `state`, `country`, `fullAddress` |
| `primaryDomain`  | string  | Primary website domain                         |
| `phone`          | string  | Company phone number                           |
| `status`         | string  | Company status                                 |
| `followers`      | integer | Social follower count                          |
| `ownership`      | string  | Ownership type (Private, Public, etc.)         |

### `financialInfo` (object)

| Field              | Type    | Description                              |
|--------------------|---------|------------------------------------------|
| `revenue`          | integer | Estimated annual revenue (raw)           |
| `formattedRevenue` | string  | Human-readable revenue (e.g., "178M")    |
| `totalFunding`     | integer | Total funding raised (raw)               |
| `formattedFunding` | string  | Human-readable funding (e.g., "584M")    |
| `lastFundingRound` | object  | Most recent round with `round`, `date`, `amount` |

### `fundingHistory` (array)

Each entry contains:

| Field       | Type   | Description                              |
|-------------|--------|------------------------------------------|
| `round`     | string | Round type (Series A, B, C, etc.)        |
| `date`      | string | Date of the round (ISO format)           |
| `amount`    | string | Amount raised (formatted)                |
| `investors` | array  | List of investor names in this round     |

### `companySize` (object)

| Field            | Type    | Description                          |
|------------------|---------|--------------------------------------|
| `employees`      | integer | Employee count                       |
| `employeeRange`  | string  | Employee range (e.g., "1,000 - 5,000") |
| `employeeGrowth` | string  | Growth rate                          |

### `leadership` (object)

#### `leadership.ceo` (object)

| Field         | Type   | Description          |
|---------------|--------|----------------------|
| `firstName`   | string | CEO first name       |
| `lastName`    | string | CEO last name        |
| `designation` | string | CEO title            |
| `b2b_profile` | string | CEO profile URL      |
| `twitter`     | string | CEO Twitter/X URL    |

### `industryAndSectors` (object)

| Field             | Type  | Description                      |
|-------------------|-------|----------------------------------|
| `industrySectors` | array | Specific industry sectors        |
| `industries`      | array | Broad industry categories        |
| `technologyStack` | string| Technology stack info            |

### `topCompetitors` (array)

Each entry contains:

| Field          | Type   | Description                          |
|----------------|--------|--------------------------------------|
| `name`         | string | Competitor name                      |
| `revenue`      | string | Competitor revenue                   |
| `employees`    | string | Competitor employee count            |
| `totalFunding` | string | Competitor total funding             |
| `headquarters` | object | HQ with `city`, `state`, `country`, `fullAddress` |
| `founded`      | string | Founded date                         |
| `ownership`    | string | Ownership type                       |
| `website`      | string | Competitor website                   |

### `acquisitions` (array)

Each entry contains:

| Field             | Type   | Description                  |
|-------------------|--------|------------------------------|
| `companyName`     | string | Acquired company name        |
| `acquisitionDate` | string | Date of acquisition          |
| `description`     | string | Description of acquired company |
| `source`          | string | Source URL for the acquisition |

### `socialMedia` (array)

Each entry contains:

| Field      | Type   | Description                       |
|------------|--------|-----------------------------------|
| `platform` | string | Platform name (twitter, facebook, b2b_profile) |
| `url`      | string | Profile URL                       |

### `news` (array)

Each entry contains:

| Field    | Type   | Description       |
|----------|--------|-------------------|
| `title`  | string | News headline     |
| `source` | string | Publication name  |
| `date`   | string | Publication date  |

### `pressReleases` (array)

Each entry contains:

| Field    | Type   | Description            |
|----------|--------|------------------------|
| `title`  | string | Press release title    |
| `source` | string | Distribution source    |
| `date`   | string | Release date           |

### `keyHighlights` (array)

Each entry contains:

| Field    | Type   | Description                              |
|----------|--------|------------------------------------------|
| `type`   | string | Highlight type (partnership, award, etc.) |
| `text`   | string | Highlight description                    |
| `date`   | string | Date                                     |
| `src`    | string | Source URL                               |
| `source` | string | Source name                              |

### Other Fields

| Field              | Type    | Description                    |
|--------------------|---------|--------------------------------|
| `summarySection`   | string  | Human-readable company summary |
| `credits_consumed` | integer | Credits used (4 if found, 0 if not) |

---

### Example Response

```json
{
  "basicInfo": {
    "companyName": "Stripe Inc",
    "shortName": "Stripe",
    "description": "Online payment processing platform.",
    "founded": "2010",
    "headquarters": {
      "city": "San Francisco",
      "state": "California",
      "country": "USA",
      "fullAddress": "San Francisco, California, USA"
    },
    "primaryDomain": "stripe.com",
    "ownership": "Private"
  },
  "financialInfo": {
    "revenue": 14000000000,
    "formattedRevenue": "14B",
    "totalFunding": 8700000000,
    "formattedFunding": "8.7B",
    "lastFundingRound": {
      "round": "Series I",
      "date": "2023-03-15T00:00:00.000Z",
      "amount": 600000000
    }
  },
  "fundingHistory": [
    {
      "round": "Series I",
      "date": "2023-03-15T00:00:00.000Z",
      "amount": "$600,000,000",
      "investors": ["Andreessen Horowitz", "Founders Fund", "Sequoia Capital"]
    }
  ],
  "companySize": {
    "employees": 8000,
    "employeeRange": "5,000 - 10,000"
  },
  "leadership": {
    "ceo": {
      "firstName": "Patrick",
      "lastName": "Collison",
      "designation": "CEO & Co-Founder",
      "b2b_profile": "patrickcollison"
    }
  },
  "topCompetitors": [
    {
      "name": "Square",
      "revenue": "$18B",
      "employees": "12000",
      "website": "https://squareup.com"
    }
  ],
  "credits_consumed": 4
}
```

---

## Success Messages

| Message                                   | Meaning                      | Cost      |
|-------------------------------------------|------------------------------|-----------|
| `Funding data found.`                     | Full funding data returned   | 4 credits |
| `No funding data found for this company.` | No funding records available | FREE      |

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

### Target Recently Funded Companies

Companies with recent funding have budget and are actively investing in growth.

### Track Investor Portfolios

Companies backed by the same investors often have similar needs.

### Use for Lead Scoring

Funding stage and amount are strong signals for company budget and growth trajectory.

---

## Use Cases

- **Sales Prioritization** — Prioritize outreach to recently funded companies with budget.
- **Market Intelligence** — Track funding trends in your target market.
- **Lead Scoring** — Score leads based on funding stage and amount.
- **Account Research** — Understand financial position before outreach.