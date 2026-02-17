# Email - Personal Email Finder

> Provide a B2B Profile URL and get back the personal emails of the person.

## Overview

Find personal email addresses for professionals using their profile URL. Ideal for reaching people outside of work contexts.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/personal-email-finder
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                         |
|----------------|-------------------------------|
| **Cost**       | **2 credits** per email found |
| **No Results** | **FREE** if no email found    |

Personal emails are harder to find than work emails, hence the higher cost when found.

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
| **Median (P50)** | ~400ms    |
| **P95**          | ~1,500ms  |
| **P99**          | ~3,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/personal-email-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"profile_url": "linkedin.com/in/johndoe"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/personal-email-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ profile_url: 'linkedin.com/in/johndoe' })
});
const data = await response.json();
if (data.personal_email) {
  console.log(`Found: ${data.personal_email}`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/personal-email-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'profile_url': 'linkedin.com/in/johndoe'}
)
data = response.json()
print(f"Personal Email: {data.get('personal_email', 'Not found')}")
```

---

## Request Parameters

| Parameter     | Type   | Required | Description                            |
|---------------|--------|----------|----------------------------------------|
| `profile_url` | string | Yes      | Professional profile URL or username.  |

---

## Response Fields

| Field              | Type   | Required | Description                                    |
|--------------------|--------|----------|------------------------------------------------|
| `profile_url`      | string | Yes      | The profile URL used for lookup                |
| `personal_email`   | string | No       | Personal email address found (null if not found) |
| `name`             | string | No       | Person's full name                             |
| `first_personal_email` | string | No   | First personal email found                     |
| `personal_emails`  | array  | No       | Array of all personal emails found             |
| `credits_consumed` | number | Yes      | Credits used (2 if found, 0 if not)            |
| `message`          | string | Yes      | Human-readable status message                  |

### Example Response

```json
{
  "profile_url": "linkedin.com/in/johndoe",
  "personal_email": "john.doe@gmail.com",
  "credits_consumed": 2,
  "message": "Personal email found."
}
```

---

## Success Messages

| Message                                     | Meaning                      | Cost      |
|---------------------------------------------|------------------------------|-----------|
| `Personal email found.`                     | Email successfully retrieved | 2 credits |
| `No personal email found for this contact.` | No personal email available  | FREE      |

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

### Use for Recruiting Outreach

Personal emails are better for recruiting since candidates may not check work email.

### Respect Privacy Preferences

Personal emails should be used thoughtfully. Ensure compliance with privacy regulations.

### Combine with Work Email

Use both work and personal email channels for important outreach campaigns.

---

## Use Cases

- **Recruiting** — Reach candidates on personal email where they're more likely to respond.
- **Former Employees** — Contact people who've left a company and no longer have work email.
- **Multi-Channel Outreach** — Build complete contact profiles with both work and personal channels.
- **Event Follow-up** — Follow up with conference contacts using personal email.