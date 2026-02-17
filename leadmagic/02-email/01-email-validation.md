# Email - Email Validation

> Validate an email address for deliverability and get company enrichment data.

## Overview

Verify email addresses with industry-leading accuracy. Combines SMTP verification with engagement data for the most reliable results.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/email-validation
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric             | Value                                      |
|--------------------|---------------------------------------------|
| **Cost**           | **0.05 credits** per validation             |
| **Calculation**    | 20 validations = 1 credit                   |
| **Free Results**   | `catch_all` and `unknown` results are free  |
| **RFC Validation** | Non-compliant emails → `invalid` (charged)  |

You only pay for definitive results (`valid`, `invalid`, `valid_catch_all`). Inconclusive results are always free.

> **Warning:** Emails that fail RFC 5321/5322 syntax validation are automatically marked `invalid` and charged 0.05 credits. This includes malformed addresses, invalid characters, and improper formatting.

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
| **Median (P50)** | ~200ms    |
| **P95**          | ~500ms    |
| **P99**          | ~1,000ms  |

Response times vary based on the target mail server's response speed.

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/email-validation' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"email": "john@company.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/email-validation', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'john@company.com' })
});
const data = await response.json();
console.log(data.email_status); // 'valid', 'invalid', 'catch_all', etc.
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/email-validation',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'email': 'john@company.com'}
)
data = response.json()
print(f"Status: {data['email_status']}")
```

---

## Request Parameters

| Parameter | Type   | Required | Description                                          |
|-----------|--------|----------|------------------------------------------------------|
| `email`   | string | Yes      | The email address to validate. Must be properly formatted. |

---

## Response Fields

| Field                  | Type    | Required | Description                                                      |
|------------------------|---------|----------|------------------------------------------------------------------|
| `email`                | string  | Yes      | The validated email address (normalized)                         |
| `email_status`         | string  | Yes      | Validation result: `valid`, `invalid`, `catch_all`, `valid_catch_all`, or `unknown` |
| `credits_consumed`     | number  | Yes      | Credits used (0.05 for definitive results, 0 for inconclusive)   |
| `message`              | string  | Yes      | Human-readable status message                                    |
| `mx_record`            | string  | No       | Primary MX record for the domain                                 |
| `mx_provider`          | string  | No       | Email provider (Google Workspace, Microsoft 365, etc.)           |
| `mx_security_gateway`  | boolean | No       | Whether a security gateway is present                            |

### Company Enrichment (Included Free)

| Field                 | Type    | Description                                       |
|-----------------------|---------|---------------------------------------------------|
| `company_name`        | string  | Company name derived from email domain             |
| `company_industry`    | string  | Company industry                                   |
| `company_size`        | string  | Employee count range                               |
| `company_founded`     | integer | Year founded                                       |
| `company_type`        | string  | Ownership type (private, public, etc.)             |
| `company_profile_url` | string  | Professional profile URL                           |
| `company_location`    | object  | Full location with city, state, country, coordinates |

### Example Response

```json
{
  "email": "john@company.com",
  "email_status": "valid",
  "credits_consumed": 0.05,
  "message": "Email is valid.",
  "mx_record": "aspmx.l.google.com",
  "mx_provider": "Google Workspace",
  "mx_security_gateway": false,
  "company_name": "Company Inc",
  "company_industry": "Technology",
  "company_size": "51-200",
  "company_profile_url": "https://www.linkedin.com/company/company-inc"
}
```

---

## Status Codes

### `valid` — Safe to email (bounce rate <1%)

Email verified by mail server. Costs 0.05 credits.

### `valid_catch_all` — Safe to email (bounce rate <5%)

Catch-all domain with engagement data. Costs 0.05 credits.

### `invalid` — Do NOT email (will bounce)

Mail server confirmed non-existent OR failed RFC validation. Costs 0.05 credits.

### `catch_all` — Risky / Unverifiable

Domain accepts all emails. **FREE** (no charge).

### `unknown` — Risky / Server didn't respond

Couldn't reach mail server. **FREE** (no charge).

---

## RFC Compliance

Emails that don't comply with RFC 5321/5322 standards are automatically marked `invalid` and charged:

| RFC Violation      | Example                 | Result                   |
|--------------------|-------------------------|--------------------------|
| Missing `@` symbol | `johncompany.com`       | `invalid` (0.05 credits) |
| Invalid characters | `john@comp any.com`     | `invalid` (0.05 credits) |
| Missing domain     | `john@`                 | `invalid` (0.05 credits) |
| Double dots        | `john..doe@company.com` | `invalid` (0.05 credits) |
| Invalid TLD        | `john@company`          | `invalid` (0.05 credits) |

RFC validation happens instantly before SMTP verification. This protects you from wasting time on obviously invalid addresses while still charging for the definitive "invalid" result.

---

## Success Messages

| Message                                                                     | Status            | Cost |
|-----------------------------------------------------------------------------|-------------------|------|
| `Email is valid.`                                                           | `valid`           | 0.05 |
| `Email is valid (catch-all domain with engagement data).`                   | `valid_catch_all` | 0.05 |
| `Email is invalid.`                                                         | `invalid`         | 0.05 |
| `Email is invalid (RFC non-compliant format).`                              | `invalid`         | 0.05 |
| `Email is invalid (malformed address).`                                     | `invalid`         | 0.05 |
| `Domain accepts all emails (catch-all). Unable to verify specific address.` | `catch_all`       | FREE |
| `Unable to determine email validity.`                                       | `unknown`         | FREE |

---

## Error Responses

### 400 — Bad Request

```json
{
  "success": false,
  "errors": [
    {
      "type": "https://api.leadmagic.io/errors/validation_error",
      "title": "Request validation failed. Check your input parameters.",
      "status": 400,
      "code": "validation_error",
      "param": ["email"],
      "detail": "Email format is invalid. Expected format: user@domain.com",
      "action": "Provide a valid email address in the 'email' field.",
      "docs": "https://docs.leadmagic.io/api-reference/errors"
    }
  ],
  "meta": {
    "request_id": "ea6e3248-f4d2-437d-bca3-20881b529129",
    "timestamp": "2024-02-01T12:00:00.000Z"
  }
}
```

### 401 — Unauthorized

Missing or invalid API key.

### 402 — Payment Required

Insufficient credits. Add credits at https://app.leadmagic.io/billing.

### 429 — Rate Limit Exceeded

Check the `Retry-After` header for when to retry.

**Rate limit headers returned:**

| Header              | Description                        |
|---------------------|------------------------------------|
| `Retry-After`       | Seconds to wait before retrying    |
| `RateLimit-Limit`   | Maximum requests per minute        |
| `RateLimit-Remaining` | Remaining requests this minute   |
| `RateLimit-Reset`   | Seconds until limit resets         |

### 500 — Internal Server Error

Wait 30 seconds and retry. If the problem persists, contact support@leadmagic.io.

---

## Best Practices

### Pre-validate Format Client-Side

Run basic regex validation before API calls to catch obvious RFC violations and save credits:

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return { email_status: 'invalid', reason: 'malformed' };
}
```

### Handle Catch-All Domains Carefully

For `catch_all` results, consider using Email Finder to verify the specific address exists before adding to campaigns.

### Batch Your Validations

For large lists, batch requests to stay within rate limits. Use response headers to monitor remaining quota:

```javascript
const remaining = response.headers.get('RateLimit-Remaining');
if (remaining < 100) {
  await sleep(1000); // Slow down if approaching limit
}
```

### Use Response Headers for Monitoring

Every response includes `X-Credits-Remaining` so you can track spending without extra API calls.

---

## Use Cases

- **List Cleaning** — Validate email lists before campaigns to reduce bounces and protect sender reputation.
- **Form Validation** — Validate emails at point of capture to ensure data quality from the start.
- **CRM Hygiene** — Regularly validate CRM contacts to maintain deliverability rates.
- **Lead Scoring** — Use validation status as a lead quality signal in your scoring models.