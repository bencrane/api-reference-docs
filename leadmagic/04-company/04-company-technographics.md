# Company - Company Technographics

> Get detailed technology stack information for any company by providing their domain.

Discover the technology stack and tools used by a company. Essential for technology-focused sales and competitive analysis.

---

## Endpoint Details

**POST** `/v1/companies/company-technographics`

### Pricing

| Metric         | Value                          |
| -------------- | ------------------------------ |
| **Cost**       | **1 credit** per company       |
| **No Results** | **FREE** if no tech data found |

Identifies marketing tools, analytics, hosting, CRM, and more from website analysis.

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
| **Median (P50)** | ~500ms    |
| **P95**          | ~1,500ms  |
| **P99**          | ~3,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/companies/company-technographics' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "stripe.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/companies/company-technographics', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'stripe.com' })
});
const data = await response.json();
console.log(`Found ${data.technologies?.length || 0} technologies`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/companies/company-technographics',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'stripe.com'}
)
data = response.json()
print(f"Technologies: {data.get('technologies', [])}")
```

---

## Request Parameters

| Parameter        | Type   | Required | Description                        |
| ---------------- | ------ | -------- | ---------------------------------- |
| `company_domain` | string | Yes      | Company website domain to analyze. |

---

## Response

| Field              | Type   | Required | Description                        |
| ------------------ | ------ | -------- | ---------------------------------- |
| `company_domain`   | string | Yes      | The domain analyzed                |
| `technologies`     | array  | Yes      | Array of detected technologies     |
| `categories`       | object | No       | Technologies grouped by category   |
| `credits_consumed` | number | Yes      | Credits used (1 if found, 0 if not)|
| `message`          | string | Yes      | Human-readable status message      |

### Technology Object

| Field      | Type   | Description                              |
| ---------- | ------ | ---------------------------------------- |
| `name`     | string | Technology name                          |
| `category` | string | Category (Analytics, CRM, Hosting, etc.) |
| `website`  | string | Technology vendor website                |
| `icon`     | string | Technology logo URL                      |

### Example Response

```json
{
  "company_domain": "stripe.com",
  "technologies": [
    {
      "name": "Google Analytics",
      "category": "Analytics",
      "website": "google.com/analytics"
    },
    {
      "name": "Cloudflare",
      "category": "CDN",
      "website": "cloudflare.com"
    },
    {
      "name": "React",
      "category": "JavaScript Framework",
      "website": "react.dev"
    }
  ],
  "categories": {
    "Analytics": ["Google Analytics", "Segment"],
    "CDN": ["Cloudflare"],
    "JavaScript Framework": ["React"]
  },
  "credits_consumed": 1,
  "message": "Technologies found."
}
```

---

## Success Messages

| Message                                  | Meaning                  | Cost     |
| ---------------------------------------- | ------------------------ | -------- |
| `Technologies found.`                    | Tech stack data returned | 1 credit |
| `No technologies found for this domain.` | No tech data available   | FREE     |

---

## Common Categories

| Category                 | Examples                              |
| ------------------------ | ------------------------------------- |
| **Analytics**            | Google Analytics, Mixpanel, Amplitude |
| **CRM**                  | Salesforce, HubSpot, Pipedrive        |
| **Marketing Automation** | Marketo, Pardot, Mailchimp            |
| **CDN**                  | Cloudflare, Fastly, Akamai            |
| **Hosting**              | AWS, Google Cloud, Azure              |
| **E-commerce**           | Shopify, Magento, WooCommerce         |
| **Chat/Support**         | Intercom, Drift, Zendesk              |

---

## Best Practices

- **Target complementary tech** — If they use Salesforce CRM, they might need your Salesforce integration.
- **Identify displacement opportunities** — Find companies using competitor products for targeted messaging.
- **Validate tech fit** — Ensure prospects have compatible tech before outreach.

---

## Use Cases

- **Sales Targeting** — Find companies using complementary or competitive technologies.
- **Integration Sales** — Target companies with tech your product integrates with.
- **Market Research** — Analyze technology adoption trends in your market.
- **Lead Qualification** — Score leads based on tech stack compatibility.

---

## Error Responses

| Status | Code                     | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| 400    | `validation_error`       | Missing or invalid `company_domain`  |
| 401    | `missing_authentication` | Missing `X-API-Key` header           |
| 401    | `invalid_api_key`        | Invalid or expired API key           |
| 402    | `insufficient_credits`   | Not enough credits                   |
| 404    | `resource_not_found`     | Resource not found                   |
| 429    | `rate_limit_exceeded`    | Too many requests — check `Retry-After` header |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |