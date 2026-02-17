# Ads - B2B Search Ads

> Search for B2B professional network ads by company domain or name.

Perfect for understanding B2B advertising strategies and competitive positioning.

---

## Endpoint Details

**POST** `/v1/ads/b2b-ads-search`

### Pricing

| Metric          | Value                      |
| --------------- | -------------------------- |
| **Cost**        | **0.2 credits** per search |
| **Calculation** | 5 searches = 1 credit      |
| **No Results**  | **FREE** if no ads found   |

Very cost-effective for B2B ad intelligence at just 0.2 credits per search.

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
curl -X POST 'https://api.leadmagic.io/v1/ads/b2b-ads-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "salesforce.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/ads/b2b-ads-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'salesforce.com' })
});
const data = await response.json();
console.log(`Found ${data.ads?.length || 0} B2B ads`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/ads/b2b-ads-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'salesforce.com'}
)
data = response.json()
print(f"Found {len(data.get('ads', []))} B2B ads")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                          |
| ---------------- | ------ | -------- | ------------------------------------ |
| `company_domain` | string | No*      | Company website domain (preferred).  |
| `company_name`   | string | No*      | Company name.                        |

> **Note:** You must provide either `company_domain` or `company_name` (or both).

---

## Response

| Field              | Type    | Required | Description                            |
| ------------------ | ------- | -------- | -------------------------------------- |
| `message`          | string  | Yes      | Human-readable status message          |
| `ads`              | array   | Yes      | Array of ad objects                    |
| `ads_count`        | integer | No       | Number of ads returned                 |
| `credits_consumed` | number  | Yes      | Credits used (0.2 if found, 0 if not)  |

### Ad Object

| Field       | Type   | Description                             |
| ----------- | ------ | --------------------------------------- |
| `content`   | string | Ad copy/headline                        |
| `link`      | string | Ad Library ID (use with B2B Ad Details) |

### Example Response

```json
{
  "message": "B2B Ads retrieved successfully",
  "credits_consumed": 2,
  "ads_count": 2,
  "ads": [
    {
      "content": "Start your day knowing what deals you need to focus on instead of opening up a dozen tabs in your CRM.",
      "link": "633872143"
    },
    {
      "content": "Start your day knowing what deals you need to focus on instead of opening up a dozen tabs in your CRM.",
      "link": "633865353"
    }
  ]
}
```

---

## Success Messages

| Message                          | Meaning               | Cost        |
| -------------------------------- | --------------------- | ----------- |
| `Ads found.`                     | B2B Ads data returned | 0.2 credits |
| `No ads found for this company.` | No B2B Ads found      | FREE        |

---

## Best Practices

- **Get full ad details** — Use the `link` field with B2B Ad Details endpoint for complete creative data.
- **Analyze B2B messaging** — B2B ads reveal competitor positioning and value propositions.
- **See how target accounts advertise** — Understand how your prospects market to their customers.

---

## Use Cases

- **Competitive Intelligence** — Monitor competitor B2B advertising strategies.
- **Messaging Research** — Study B2B value propositions and positioning.
- **Account Research** — See how target accounts advertise to their customers.
- **Market Analysis** — Analyze B2B advertising trends in your industry.

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