# Contact - Mobile Finder

> Find a person's mobile phone number using their profile URL or email address.

## Overview

Find mobile phone numbers for direct outreach campaigns. Perfect for sales teams who need direct contact with decision-makers.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/mobile-finder
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                          |
|----------------|--------------------------------|
| **Cost**       | **5 credits** per mobile found |
| **No Results** | **FREE** if no mobile found    |

You only pay when a mobile number is successfully found. No-result lookups are always free.

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
| **Median (P50)** | ~300ms    |
| **P95**          | ~1,000ms  |
| **P99**          | ~2,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/mobile-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"profile_url": "linkedin.com/in/johndoe"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/mobile-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    profile_url: 'linkedin.com/in/johndoe',
    work_email: 'john@company.com'  // Optional: improves match rate
  })
});
const data = await response.json();
if (data.mobile_number) {
  console.log(`Found: ${data.mobile_number}`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/mobile-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'profile_url': 'linkedin.com/in/johndoe',
        'work_email': 'john@company.com'
    }
)
data = response.json()
print(f"Mobile: {data.get('mobile_number', 'Not found')}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                                                  |
|------------------|--------|----------|--------------------------------------------------------------|
| `profile_url`    | string | No*      | Professional profile URL or username. Most accurate identifier. |
| `work_email`     | string | No*      | Professional email address. Improves match rate when combined with `profile_url`. |
| `personal_email` | string | No*      | Personal email address. Alternative identifier.              |

> **Required:** You must provide at least one identifier: `profile_url`, `work_email`, or `personal_email`. Profile URL provides the highest match rate. Combine with email for best results.

---

## Response Fields

| Field              | Type   | Required | Description                                       |
|--------------------|--------|----------|---------------------------------------------------|
| `profile_url`      | string | No       | The profile URL used for lookup                   |
| `email`            | string | No       | The email used for lookup (if provided)           |
| `mobile_number`    | string | No       | Mobile phone number found (null if not found)     |
| `credits_consumed` | number | Yes      | Credits used (5 if found, 0 if not)               |
| `message`          | string | Yes      | Human-readable status message                     |

### Example Response

```json
{
  "profile_url": "linkedin.com/in/johndoe",
  "mobile_number": "+1-555-123-4567",
  "credits_consumed": 5,
  "message": "Mobile number found."
}
```

---

## Success Messages

| Message                                    | Meaning                             | Cost      |
|--------------------------------------------|-------------------------------------|-----------|
| `Mobile number found.`                     | Phone number successfully retrieved | 5 credits |
| `No mobile number found for this contact.` | No phone data available             | FREE      |

---

## Error Responses

### 400 — Bad Request

Missing required fields or invalid format.

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

### Combine Multiple Identifiers

Provide both profile URL and email when available for the highest match rate.

### Respect Contact Preferences

Mobile numbers are personal data. Use responsibly and respect opt-out requests.

### Verify Before Large Campaigns

Test a sample before running large batches to ensure quality for your use case.

### Use for High-Value Outreach

Mobile outreach has higher response rates but use sparingly for important contacts.

---

## Use Cases

- **Sales Outreach** — Reach decision-makers directly with SMS or calls.
- **Account-Based Marketing** — Build complete contact profiles for target accounts.
- **Recruiter Outreach** — Contact candidates directly for high-priority roles.
- **Customer Success** — Reach customers quickly for urgent support issues.