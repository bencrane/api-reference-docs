# People - Role Finder

> Provide the company name or domain and the required job title, and retrieve the corresponding person.

Find a person at a company by their job title. Perfect for ABM campaigns targeting specific roles like "VP of Sales" or "Head of Marketing".

---

## Endpoint Details

**POST** `/v1/people/role-finder`

### Pricing

| Metric         | Value                          |
| -------------- | ------------------------------ |
| **Cost**       | **2 credits** per person found |
| **No Results** | **FREE** if no match found     |

Returns the first matching person. For multiple results, use Employee Finder with filters.

### Rate Limits

**Per-Endpoint Limit**

| Metric              | Value                |
| ------------------- | -------------------- |
| **Requests/Minute** | 1,000                |
| **Burst Capacity**  | ~17 requests/second  |

**Gateway Limits (Account-Wide)**

| Tier            | RPM    | Daily     |
| --------------- | ------ | --------- |
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

### Response Time

| Metric           | Value     |
| ---------------- | --------- |
| **Median (P50)** | ~600ms    |
| **P95**          | ~2,000ms  |
| **P99**          | ~4,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/role-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "job_title": "VP of Sales",
    "company_domain": "company.com"
  }'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/role-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    job_title: 'VP of Sales',
    company_domain: 'company.com'
  })
});
const data = await response.json();
if (data.profile_url) {
  console.log(`Found: ${data.first_name} ${data.last_name}`);
}
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/role-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'job_title': 'VP of Sales',
        'company_domain': 'company.com'
    }
)
data = response.json()
print(f"Found: {data.get('full_name', 'Not found')}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                                                                 |
| ---------------- | ------ | -------- | --------------------------------------------------------------------------- |
| `job_title`      | string | Yes      | The job title to search for. Matches partial titles (e.g., "Sales" matches "VP of Sales"). |
| `company_domain` | string | No*      | Company website domain (preferred). More accurate than company_name.        |
| `company_name`   | string | No*      | Company name. Use if domain is not available.                               |

> **Note:** You must provide either `company_domain` or `company_name` (or both).

---

## Response

| Field              | Type   | Required | Description                                      |
| ------------------ | ------ | -------- | ------------------------------------------------ |
| `first_name`       | string | No       | First name of the person found                   |
| `last_name`        | string | No       | Last name of the person found                    |
| `full_name`        | string | No       | Full name of the person found                    |
| `profile_url`      | string | No       | Professional profile URL                         |
| `job_title`        | string | No       | Actual job title (may differ slightly from query) |
| `company_name`     | string | No       | Company name                                     |
| `company_website`  | string | No       | Company website domain                           |
| `credits_consumed` | number | Yes      | Credits used (2 if found, 0 if not)              |
| `message`          | string | Yes      | Human-readable status message                    |

### Example Response

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "profile_url": "linkedin.com/in/johndoe",
  "job_title": "VP of Sales",
  "company_name": "Company Inc",
  "company_website": "company.com",
  "credits_consumed": 2,
  "message": "Role Found"
}
```

---

## Success Messages

| Message                                   | Meaning                         | Cost      |
| ----------------------------------------- | ------------------------------- | --------- |
| `Role Found`                              | Person with matching role found | 2 credits |
| `No matching role found at this company.` | No matching role exists         | FREE      |

---

## Best Practices

- **Use domain over company name** — Domain lookups are more accurate. `salesforce.com` always finds Salesforce, while "Salesforce" might match subsidiaries.
- **Be flexible with titles** — Try variations: "VP Sales", "VP of Sales", "Head of Sales" may all work depending on how the person lists their title.
- **Chain with Email Finder** — After finding a person, use Email Finder with their name and company to get their email.

---

## Use Cases

- **ABM Campaigns** — Target specific roles at key accounts for personalized outreach.
- **Competitive Intelligence** — Find your counterpart at competitor companies.
- **Partner Outreach** — Find the right person to discuss partnerships.
- **Recruiting** — Identify potential candidates by role at target companies.

---

## Error Responses

| Status | Code                     | Description                                      |
| ------ | ------------------------ | ------------------------------------------------ |
| 400    | `validation_error`       | Missing or invalid parameters                    |
| 401    | `missing_authentication` | Missing `X-API-Key` header                       |
| 401    | `invalid_api_key`        | Invalid or expired API key                       |
| 402    | `insufficient_credits`   | Not enough credits                               |
| 404    | `resource_not_found`     | Resource not found                               |
| 429    | `rate_limit_exceeded`    | Too many requests — check `Retry-After` header   |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds            |