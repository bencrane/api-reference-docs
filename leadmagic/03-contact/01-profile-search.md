# Contact - Profile Search

> Retrieve comprehensive professional profile information including work history, education, certifications, and more.

## Overview

Retrieve comprehensive professional profile data including work experience, education, certifications, and social metrics.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/profile-search
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric         | Value                         |
|----------------|-------------------------------|
| **Cost**       | **1 credit** per profile      |
| **No Results** | **FREE** if profile not found |

Profile data includes work history, education, certifications, and company enrichment — all for 1 credit.

## Rate Limits

### Per-Endpoint Limit

| Metric              | Value               |
|---------------------|---------------------|
| **Requests/Minute** | 500                 |
| **Burst Capacity**  | ~8 requests/second  |

> This endpoint has a lower per-minute limit due to data complexity. Gateway limits still apply.

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
curl -X POST 'https://api.leadmagic.io/v1/people/profile-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"profile_url": "linkedin.com/in/johndoe"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/profile-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    profile_url: 'linkedin.com/in/johndoe',
    extended_response: true  // Include profile image
  })
});
const profile = await response.json();
console.log(`${profile.full_name} - ${profile.professional_title}`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/profile-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'profile_url': 'linkedin.com/in/johndoe',
        'extended_response': True
    }
)
profile = response.json()
print(f"{profile['full_name']} - {profile['professional_title']}")
```

---

## Request Parameters

| Parameter           | Type    | Required | Default | Description                                         |
|---------------------|---------|----------|---------|-----------------------------------------------------|
| `profile_url`       | string  | Yes      | —       | Professional profile URL or username. Accepts full URLs or just the username. |
| `extended_response` | boolean | No       | false   | Include profile image URL in the response.          |
| `skip_cache`        | boolean | No       | false   | Bypass cache to fetch fresh data.                   |

---

## Response Fields

### Core Fields

| Field                | Type   | Required | Description                              |
|----------------------|--------|----------|------------------------------------------|
| `profile_url`        | string | Yes      | Professional profile URL                 |
| `first_name`         | string | No       | First name                               |
| `last_name`          | string | No       | Last name                                |
| `full_name`          | string | No       | Full name                                |
| `professional_title` | string | No       | Current job title/headline               |
| `bio`                | string | No       | Profile summary                          |
| `location`           | string | No       | Geographic location                      |
| `country`            | string | No       | Country                                  |
| `followers_range`    | string | No       | Social follower range (e.g., "45K-50K")  |
| `credits_consumed`   | number | Yes      | Credits used (1 if found, 0 if not)      |
| `message`            | string | Yes      | Human-readable status message            |

### Current Employment

| Field              | Type   | Description            |
|--------------------|--------|------------------------|
| `company_name`     | string | Current company name   |
| `company_industry` | string | Current company industry |
| `company_website`  | string | Current company website |

### Tenure Statistics

| Field                 | Type   | Description                    |
|-----------------------|--------|--------------------------------|
| `total_tenure_years`  | string | Total career tenure in years   |
| `total_tenure_months` | string | Total career tenure in months  |
| `total_tenure_days`   | string | Total career tenure in days    |

### Work Experience (array)

Each entry contains:

| Field              | Type   | Description                                    |
|--------------------|--------|------------------------------------------------|
| `position_title`   | string | Job title                                      |
| `company_name`     | string | Company name                                   |
| `employment_period`| string | Employment period (e.g., "Jan 2022 - Present") |
| `company_website`  | string | Company website (when available)               |
| `company_logo_url` | string | Company logo URL (when available)              |

### Education (array)

Each entry contains:

| Field              | Type   | Description        |
|--------------------|--------|--------------------|
| `institution_name` | string | School/university  |
| `degree`           | string | Degree earned      |
| `attendance_period`| string | Attendance period  |

### Certifications (array)

Each entry contains:

| Field                  | Type   | Description            |
|------------------------|--------|------------------------|
| `certification_name`   | string | Certification name     |
| `issuing_organization` | string | Issuing organization   |
| `issue_date`           | string | Date issued            |

### Honors (array)

Each entry contains:

| Field         | Type   | Description       |
|---------------|--------|-------------------|
| `title`       | string | Honor/award title |
| `description` | string | Details           |

### Example Response

```json
{
  "profile_url": "linkedin.com/in/johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "professional_title": "VP of Sales at TechCorp",
  "company_name": "TechCorp Inc",
  "company_industry": "Technology",
  "location": "San Francisco, CA",
  "country": "United States",
  "followers_range": "10K-15K",
  "total_tenure_years": "12",
  "bio": "Sales leader with 12+ years experience...",
  "work_experience": [
    {
      "position_title": "VP of Sales",
      "company_name": "TechCorp Inc",
      "employment_period": "Jan 2022 - Present"
    }
  ],
  "education": [
    {
      "institution_name": "Stanford University",
      "degree": "MBA",
      "attendance_period": "2010 - 2012"
    }
  ],
  "credits_consumed": 1,
  "message": "Profile found."
}
```

---

## Success Messages

| Message                                | Meaning                             | Cost     |
|----------------------------------------|-------------------------------------|----------|
| `Profile found.`                       | Full profile data returned          | 1 credit |
| `Profile not found or not accessible.` | Profile doesn't exist or is private | FREE     |

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

### Extended Response for Images

Set `extended_response: true` to include profile photo URLs for your CRM or outreach tools.

### Handle Private Profiles

Some profiles are private and will return limited data. Check for null fields and handle gracefully.

### Chain with Other Endpoints

Use Profile Search to verify a person, then Email Finder or Mobile Finder for contact info.

---

## Use Cases

- **Sales Research** — Research prospects before outreach. Identify decision-makers and personalize your pitch.
- **Recruiting** — Enrich candidate profiles. Verify work history and identify qualified candidates.
- **Marketing Personas** — Build detailed buyer personas. Segment audiences by role and seniority.