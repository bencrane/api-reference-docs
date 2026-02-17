# Account - Check Credits

> Check your current credit balance.

## Overview

Monitor your credit balance programmatically. Use this endpoint to:

- Track usage across your applications
- Set up alerts before running low
- Build internal dashboards

> **Note:** This endpoint is **FREE** — no credits consumed and no rate limiting applied.

---

## Endpoint

```
GET /v1/credits
```

**Base URL:** `https://api.leadmagic.io`

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Quick Example

### cURL

```bash
curl 'https://api.leadmagic.io/v1/credits' \
  -H 'X-API-Key: YOUR_API_KEY'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/credits', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});
const { credits } = await response.json();
console.log(`Available: ${credits} credits`);
```

### Python

```python
import requests

response = requests.get(
    'https://api.leadmagic.io/v1/credits',
    headers={'X-API-Key': 'YOUR_API_KEY'}
)
print(f"Credits: {response.json()['credits']}")
```

---

## Response

### 200 — Success

```json
{
  "credits": 15432.50
}
```

#### Response Fields

| Field     | Type   | Description                 |
|-----------|--------|-----------------------------|
| `credits` | number | Your current credit balance |

### 401 — Unauthorized

Authentication failed. Common causes: missing `X-API-Key` header, invalid or expired API key, malformed API key.

**Missing Authentication:**

```json
{
  "success": false,
  "errors": [
    {
      "type": "https://api.leadmagic.io/errors/missing_authentication",
      "title": "Authentication required. Provide a valid API key in the X-API-Key header (case-insensitive).",
      "status": 401,
      "code": "missing_authentication",
      "docs": "https://docs.leadmagic.io/api-reference/authentication"
    }
  ],
  "meta": {
    "request_id": "ea6e3248-f4d2-437d-bca3-20881b529129",
    "timestamp": "2024-02-01T12:00:00.000Z"
  }
}
```

**Invalid API Key:**

```json
{
  "success": false,
  "errors": [
    {
      "type": "https://api.leadmagic.io/errors/invalid_api_key",
      "title": "Invalid API key. The key does not exist or is incorrect.",
      "status": 401,
      "code": "invalid_api_key",
      "docs": "https://docs.leadmagic.io/api-reference/authentication"
    }
  ],
  "meta": {
    "request_id": "ea6e3248-f4d2-437d-bca3-20881b529129",
    "timestamp": "2024-02-01T12:00:00.000Z"
  }
}
```

---

## Additional Credit Endpoints

| Endpoint                   | Method | Description                                                      |
|----------------------------|--------|------------------------------------------------------------------|
| `GET /v1/credits`          | GET    | Get current credit balance                                       |
| `POST /v1/credits/refresh` | POST   | Force refresh credits from database (use if balance seems stale) |
| `GET /v1/credits/health`   | GET    | Validate API key and check authentication status                 |

---

## Best Practices

### Cache the Response

Don't call this endpoint before every API request. Cache the balance and refresh periodically (e.g., every 5 minutes).

```javascript
let cachedCredits = null;
let lastFetch = 0;
const CACHE_TTL = 60000; // 1 minute

async function getCredits() {
  if (cachedCredits && Date.now() - lastFetch < CACHE_TTL) {
    return cachedCredits;
  }

  const response = await fetch('https://api.leadmagic.io/v1/credits', {
    headers: { 'X-API-Key': apiKey }
  });

  const { credits } = await response.json();
  cachedCredits = credits;
  lastFetch = Date.now();
  return credits;
}
```

### Use Response Headers Instead

Every API response includes an `X-Credits-Remaining` header — use this instead of making a separate call:

```javascript
const response = await fetch(endpoint, options);
const creditsRemaining = response.headers.get('X-Credits-Remaining');
console.log(`Credits after request: ${creditsRemaining}`);
```

### Set Up Alerts

Implement alerts when credits fall below a threshold to avoid service interruptions.

```javascript
const { credits } = await checkCredits();

if (credits < 100) {
  sendCriticalAlert('CRITICAL: Credits below 100!');
} else if (credits < 1000) {
  sendWarning('Low credit balance: ' + credits);
}
```

---

## See Also

- **Analytics API** (`/v1/reference/analytics`) — Real-time dashboard with rate limits, daily/monthly credit consumption history, per-product breakdown with success rates, latency percentiles, and error tracking.