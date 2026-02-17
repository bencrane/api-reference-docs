# Email - B2B Social to Email

> Provide a B2B Profile URL and get back the work email of the person.

## Overview

Convert a professional profile URL into a verified work email address. The reverse of Email to Profile. Every email found is automatically validated for deliverability.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/b2b-profile-to-email
```

> **Note:** The OpenAPI spec uses `/v1/people/b2b-profile-email` as the path.

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                         |
|----------------|-------------------------------|
| **Cost**       | **5 credits** per email found |
| **No Results** | **FREE** if no email found    |

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
| **Median (P50)** | ~500ms    |
| **P95**          | ~1,500ms  |
| **P99**          | ~3,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/b2b-profile-to-email' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"profile_url": "linkedin.com/in/johndoe"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/b2b-profile-to-email', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ profile_url: 'linkedin.com/in/johndoe' })
});
const data = await response.json();
if (data.email) {
  console.log(`Email: ${data.email}`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/b2b-profile-to-email',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'profile_url': 'linkedin.com/in/johndoe'}
)
data = response.json()
print(f"Email: {data.get('email', 'Not found')}")
```

---

## Request Parameters

| Parameter     | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `profile_url` | string | Yes      | Professional profile URL or username. |

---

## Response Fields

| Field              | Type   | Required | Description                                   |
|--------------------|--------|----------|-----------------------------------------------|
| `email`            | string | No       | Work email address found (null if not found)  |
| `profile_url`      | string | Yes      | The profile URL used for lookup               |
| `credits_consumed` | number | Yes      | Credits used (5 if found, 0 if not)           |
| `message`          | string | Yes      | Human-readable status message                 |

### Example Response

```json
{
  "email": "john.doe@company.com",
  "profile_url": "linkedin.com/in/johndoe",
  "credits_consumed": 5,
  "message": "Email found."
}
```

---

## Success Messages

| Message                            | Meaning                           | Cost      |
|------------------------------------|-----------------------------------|-----------|
| `Email found.`                     | Work email successfully retrieved | 5 credits |
| `No email found for this profile.` | No work email available           | FREE      |

---

## Error Responses

### 400 — Bad Request

Missing required fields or invalid format.

### 401 — Unauthorized

Missing or invalid API key.

### 402 — Payment Required

Insufficient credits. Add credits at https://app.leadmagic.io/billing.

### 404 — Not Found

Profile doesn't exist, is not accessible, or was not found in the database.

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

### Clean Profile URLs

Remove tracking parameters from profile URLs for best results. Just the base URL works.

### Just the Username Works

You can pass just `johndoe` and it will resolve to the full profile.

### Compare with Email Finder

If you have the person's name and company, Email Finder (1 credit) may be more cost-effective than this endpoint (5 credits).

---

## Use Cases

- **Profile Prospecting** — Found someone's profile? Get their work email instantly.
- **Sales Navigator Export** — Convert exported profile lists into actionable email lists.
- **Event Follow-up** — Got connections at an event? Get their emails.
- **Inbound Lead Enrichment** — Visitor shared their profile? Get their work contact.