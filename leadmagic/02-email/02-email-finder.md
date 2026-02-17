# Email - Email Finder

> Find a person's work email address using their name and company information.

## Overview

Find professional email addresses from a person's name and company. Every email found is automatically validated for deliverability.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/email-finder
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                        |
|----------------|------------------------------|
| **Cost**       | **1 credit** per email found |
| **No Results** | **FREE** if no email found   |

You only pay when an email is successfully found. No-result lookups are always free.

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

Gateway limits apply across all endpoints. Contact sales@leadmagic.io for custom limits.

## Response Time

| Metric           | Value     |
|------------------|-----------|
| **Median (P50)** | ~500ms    |
| **P95**          | ~2,000ms  |
| **P99**          | ~5,000ms  |

Response times depend on data availability and validation steps.

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/email-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "domain": "company.com"
  }'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/email-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    domain: 'company.com'
  })
});
const data = await response.json();
if (data.email) {
  console.log(`Found: ${data.email} (${data.status})`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/email-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'first_name': 'John',
        'last_name': 'Doe',
        'domain': 'company.com'
    }
)
data = response.json()
if data.get('email'):
    print(f"Found: {data['email']} ({data['status']})")
```

---

## Request Parameters

| Parameter      | Type   | Required | Description                                                        |
|----------------|--------|----------|--------------------------------------------------------------------|
| `first_name`   | string | No*      | Person's first name. Required if `full_name` not provided.         |
| `last_name`    | string | No*      | Person's last name. Required if `full_name` not provided.          |
| `full_name`    | string | No*      | Person's full name. Alternative to `first_name` + `last_name`.     |
| `domain`       | string | No**     | Company website domain (preferred). More accurate than `company_name`. |
| `company_name` | string | No**     | Company name. Use if domain is not available.                      |

> **Required combinations:** You must provide at least one name field (`first_name`, `last_name`, or `full_name`) AND one company field (`domain` or `company_name`).

---

## Response Fields

| Field                  | Type    | Required | Description                                              |
|------------------------|---------|----------|----------------------------------------------------------|
| `email`                | string  | No       | The found email address (null if not found)              |
| `status`               | string  | Yes      | Validation status: `valid`, `valid_catch_all`, `catch_all`, `not_found` |
| `credits_consumed`     | number  | Yes      | Credits used (1 if found, 0 if not)                     |
| `message`              | string  | Yes      | Human-readable status message                            |
| `employment_verified`  | boolean | No       | Whether employment at this company was verified          |

### Deliverability Intelligence

| Field         | Type    | Description                                      |
|---------------|---------|--------------------------------------------------|
| `mx_record`   | string  | Primary MX record                                |
| `mx_provider` | string  | Email provider (Google Workspace, Microsoft 365, etc.) |
| `has_mx`      | boolean | Whether the domain has valid MX records          |

### Company Enrichment (Included Free)

| Field                 | Type   | Description            |
|-----------------------|--------|------------------------|
| `company_name`        | string | Company name           |
| `company_industry`    | string | Company industry       |
| `company_size`        | string | Employee count range   |
| `company_profile_url` | string | Professional profile URL |

### Example Response

```json
{
  "email": "john.doe@company.com",
  "status": "valid",
  "credits_consumed": 1,
  "message": "Valid email found.",
  "first_name": "John",
  "last_name": "Doe",
  "domain": "company.com",
  "mx_provider": "Google Workspace",
  "employment_verified": true,
  "company_name": "Company Inc",
  "company_industry": "Technology"
}
```

---

## Status Codes

### `valid` — 1 credit / Email immediately

Verified by mail server, <1% bounce rate.

### `valid_catch_all` — 1 credit / Safe to email

Engagement data proves validity, <5% bounce.

### `catch_all` — 1 credit / Risky

Domain accepts all emails, couldn't verify specific address.

### `not_found` — FREE / Try alternatives

No email found for this person at this company.

---

## Error Responses

### 400 — Bad Request

Missing required fields, invalid format, or invalid JSON syntax.

### 401 — Unauthorized

Missing or invalid API key.

### 402 — Payment Required

Insufficient credits. Add credits at https://app.leadmagic.io/billing.

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

### Use Domain Over Company Name

Domain lookups are more accurate. `leadmagic.io` will always find the right company, while "LeadMagic" might match similar names.

### Check Employment Verification

The `employment_verified` field tells you if the person was confirmed to work at the company.

### Prioritize by Status

Send to `valid` emails first, then `valid_catch_all`, then consider `catch_all` with caution.

### Handle No Results Gracefully

If not found, try variations: different name spellings, company domain instead of name, etc.

---

## Use Cases

- **Sales Outreach** — Find decision-maker emails for personalized outreach campaigns.
- **Lead Enrichment** — Complete partial lead records with verified email addresses.
- **ABM Campaigns** — Build contact lists for target accounts with verified emails.
- **Recruiting** — Reach passive candidates with verified work emails.