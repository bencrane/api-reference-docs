# Contact - Job Change Detector

> Monitor employee transitions and detect when someone has changed jobs.

## Overview

Detect job changes for a professional by monitoring their profile against a specific company. Know instantly when your contacts move companies.

**Base URL:** `https://api.leadmagic.io`

```
POST /v1/people/job-change-detector
```

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Pricing

| Metric   | Value                   |
|----------|-------------------------|
| **Cost** | **3 credits** per check |

Job changes are a prime trigger event. People who just started a new role have budget and authority to make purchasing decisions.

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
| **Median (P50)** | ~700ms    |
| **P95**          | ~2,000ms  |
| **P99**          | ~4,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/job-change-detector' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "profile_url": "linkedin.com/in/johndoe",
    "company_domain": "oldcompany.com"
  }'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/job-change-detector', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    profile_url: 'linkedin.com/in/johndoe',
    company_domain: 'oldcompany.com'
  })
});
const data = await response.json();
if (data.job_changed) {
  console.log(`Job change detected! Now at: ${data.current_company}`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/job-change-detector',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'profile_url': 'linkedin.com/in/johndoe',
        'company_domain': 'oldcompany.com'
    }
)
data = response.json()
if data.get('job_changed'):
    print(f"Job change detected! Now at: {data['current_company']}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                                                     |
|------------------|--------|----------|-----------------------------------------------------------------|
| `profile_url`    | string | Yes      | Professional profile URL or username to monitor.                |
| `company_domain` | string | No*      | Expected company domain to check against (preferred).           |
| `company_name`   | string | No*      | Expected company name to check against.                         |

> **Required:** You must provide either `company_domain` or `company_name` to compare against.

---

## Response Fields

### Core Fields

| Field              | Type    | Required | Description                                    |
|--------------------|---------|----------|------------------------------------------------|
| `job_change_detected` | boolean | Yes   | Whether the person has changed jobs            |
| `status`           | string  | No       | Status enum: `NO_CHANGE`, `JOB_CHANGE_DETECTED`, `NEVER_WORKED_THERE` |
| `summary`          | string  | No       | Human-readable summary of the detection result |
| `employee_name`    | string  | No       | Person's full name                             |
| `expected_company` | string  | No       | The company you were checking against          |
| `current_company`  | string  | No       | Current company name                           |
| `profile_found`    | boolean | No       | Whether the profile was found                  |
| `profile_url`      | string  | No       | The profile URL used for lookup                |
| `credits_consumed` | number  | Yes      | Credits used (always 3)                        |

### Current Position (object)

| Field                | Type    | Description                        |
|----------------------|---------|------------------------------------|
| `title`              | string  | Current job title                  |
| `company`            | string  | Current company name               |
| `start_date`         | string  | When the position started          |
| `days_at_job`        | integer | Days in current role               |
| `tenure_formatted`   | string  | Human-readable tenure (e.g., "3 years") |
| `is_current_position`| boolean | Always true for current position   |

### Tenure Stats (object)

| Field                      | Type    | Description                          |
|----------------------------|---------|--------------------------------------|
| `average_tenure_months`    | integer | Average months per position          |
| `average_tenure_formatted` | string  | Human-readable average tenure        |
| `total_positions`          | integer | Total career positions               |
| `longest_tenure_months`    | integer | Longest position in months           |
| `longest_tenure_formatted` | string  | Human-readable longest tenure        |
| `shortest_tenure_months`   | integer | Shortest position in months          |
| `shortest_tenure_formatted`| string  | Human-readable shortest tenure       |

### Work History (array)

Each entry contains:

| Field      | Type    | Description                                    |
|------------|---------|------------------------------------------------|
| `title`    | string  | Job title                                      |
| `company`  | string  | Company name                                   |
| `duration` | string  | Employment period (e.g., "Sep 2022 - Present") |
| `is_present`| boolean | Whether this is a current position             |

---

### Example Response — No Change

```json
{
  "job_change_detected": false,
  "status": "NO_CHANGE",
  "summary": "No job change detected. Still employed at expected company.",
  "employee_name": "John Doe",
  "expected_company": "Old Company Inc",
  "current_company": "Old Company Inc",
  "current_position": {
    "title": "VP of Sales",
    "company": "Old Company Inc",
    "start_date": "Jan 2022",
    "days_at_job": 1100,
    "tenure_formatted": "3 years",
    "is_current_position": true
  },
  "credits_consumed": 3
}
```

### Example Response — Job Changed

```json
{
  "job_change_detected": true,
  "status": "JOB_CHANGE_DETECTED",
  "summary": "Job change detected. Person has moved to a new company.",
  "employee_name": "John Doe",
  "expected_company": "Old Company Inc",
  "current_company": "New Company Inc",
  "current_position": {
    "title": "Chief Revenue Officer",
    "company": "New Company Inc",
    "start_date": "Mar 2025",
    "days_at_job": 45,
    "tenure_formatted": "2 months",
    "is_current_position": true
  },
  "credits_consumed": 3
}
```

### Example Response — Never Worked There

```json
{
  "job_change_detected": false,
  "status": "NEVER_WORKED_THERE",
  "summary": "Person has never worked at the expected company.",
  "employee_name": "John Doe",
  "expected_company": "Some Company",
  "current_company": "Actual Company Inc",
  "credits_consumed": 3
}
```

---

## Success Messages

| Message                                                       | Meaning                    |
|---------------------------------------------------------------|----------------------------|
| `No job change detected. Still employed at expected company.` | Person still at company    |
| `Job change detected. Person has moved to a new company.`     | Person changed jobs        |
| `Never worked at the expected company.`                       | No employment record found |

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

### Monitor Key Contacts Regularly

Run weekly checks on your top accounts to catch job changes early.

### Act Fast on Changes

Job changers in their first 90 days are 3x more likely to buy. Reach out quickly.

### Follow the Champion

When your champion moves, reach out at their new company — they already know your value.

### Batch Your Checks

Check multiple contacts in parallel to efficiently monitor your database.

---

## Use Cases

- **Champion Tracking** — Follow your product champions when they move to new companies.
- **Churn Prevention** — Know when key contacts leave accounts before renewal conversations.
- **Trigger Campaigns** — Automatically trigger outreach when contacts move to target accounts.
- **CRM Hygiene** — Keep contact records accurate by detecting role changes.