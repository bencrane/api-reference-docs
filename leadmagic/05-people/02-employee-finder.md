# People - Employee Finder

> Find employees at a company. Returns a list of employees with their profiles, titles, and more.

---

## Endpoint Details

**POST** `/v1/people/employee-finder`

### Pricing

| Metric          | Value                                  |
| --------------- | -------------------------------------- |
| **Cost**        | **0.05 credits** per employee returned |
| **Calculation** | 20 employees = 1 credit               |
| **No Results**  | **FREE** if no employees found         |

One of the most cost-effective endpoints. Get 20 employees for just 1 credit.

### Rate Limits

**Per-Endpoint Limit**

| Metric              | Value                |
| ------------------- | -------------------- |
| **Requests/Minute** | 3,000                |
| **Burst Capacity**  | ~50 requests/second  |

**Gateway Limits (Account-Wide)**

| Tier            | RPM    | Daily     |
| --------------- | ------ | --------- |
| **Standard**    | 5,000  | 500,000   |
| **High Volume** | 10,000 | 1,000,000 |

### Response Time

| Metric           | Value     |
| ---------------- | --------- |
| **Median (P50)** | ~400ms    |
| **P95**          | ~1,200ms  |
| **P99**          | ~2,500ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/people/employee-finder' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "company_domain": "company.com",
    "limit": 10
  }'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/employee-finder', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    company_domain: 'company.com',
    limit: 10
  })
});
const data = await response.json();
console.log(`Found ${data.employees?.length || 0} employees`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/people/employee-finder',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={
        'company_domain': 'company.com',
        'limit': 10
    }
)
data = response.json()
print(f"Found {len(data.get('employees', []))} employees")
```

---

## Request Parameters

| Parameter        | Type    | Required | Description                                          |
| ---------------- | ------- | -------- | ---------------------------------------------------- |
| `company_domain` | string  | No*      | Company website domain (preferred). More accurate than company_name. |
| `company_name`   | string  | No*      | Company name. Use if domain is not available.        |
| `limit`          | integer | No       | Maximum number of employees to return. Default: 20.  |

> **Note:** You must provide either `company_domain` or `company_name` (or both).

---

## Response

| Field              | Type    | Required | Description                                              |
| ------------------ | ------- | -------- | -------------------------------------------------------- |
| `employees`        | array   | No       | Array of employee objects                                |
| `total_count`      | integer | No       | Total employees found (may be more than returned if limit is set) |
| `credits_consumed` | number  | Yes      | Credits used (0.05 per employee returned)                |
| `message`          | string  | Yes      | Human-readable status message                            |

### Employee Object

| Field         | Type   | Description              |
| ------------- | ------ | ------------------------ |
| `first_name`  | string | First name               |
| `last_name`   | string | Last name                |
| `full_name`   | string | Full name                |
| `profile_url` | string | Professional profile URL |
| `job_title`   | string | Current job title        |
| `location`    | string | Geographic location      |

### Example Response

```json
{
  "employees": [
    {
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "profile_url": "linkedin.com/in/johndoe",
      "job_title": "VP of Sales",
      "location": "San Francisco, CA"
    },
    {
      "first_name": "Jane",
      "last_name": "Smith",
      "full_name": "Jane Smith",
      "profile_url": "linkedin.com/in/janesmith",
      "job_title": "Marketing Director",
      "location": "New York, NY"
    }
  ],
  "total_count": 150,
  "credits_consumed": 0.1,
  "message": "Employees found."
}
```

---

## Success Messages

| Message                                | Meaning                    | Cost          |
| -------------------------------------- | -------------------------- | ------------- |
| `Employees found.`                     | Employee list returned     | 0.05/employee |
| `No employees found for this company.` | No employee data available | FREE          |

---

## Best Practices

- **Start with small limits** — Start with `limit: 10` to test the results before requesting larger batches.
- **Chain with Email Finder** — Use the returned names with Email Finder to get contact information.
- **Filter by role client-side** — Get a larger batch and filter by `job_title` in your application for specific roles.

---

## Use Cases

- **Account Mapping** — Build org charts for target accounts.
- **ABM Campaigns** — Find multiple stakeholders for multi-threaded outreach.
- **Competitive Intelligence** — Analyze competitor team structures.
- **Recruiting Pipeline** — Build candidate pipelines from target companies.

---

## Error Responses

| Status | Code                     | Description                                      |
| ------ | ------------------------ | ------------------------------------------------ |
| 400    | `validation_error`       | Missing or invalid parameters                    |
| 401    | `missing_authentication` | Missing `X-API-Key` header                       |
| 401    | `invalid_api_key`        | Invalid or expired API key                       |
| 402    | `insufficient_credits`   | Not enough credits                               |
| 429    | `rate_limit_exceeded`    | Too many requests — check `Retry-After` header   |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds            |