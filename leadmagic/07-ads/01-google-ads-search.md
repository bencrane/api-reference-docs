# Ads - Google Ads Search

> Search for Google Ads run by a company to understand their advertising strategy.

Analyze competitor advertising strategies, messaging, and creative approaches.

---

## Endpoint Details

**POST** `/v1/ads/google-ads-search`

### Pricing

| Metric          | Value                      |
| --------------- | -------------------------- |
| **Cost**        | **0.2 credits** per search |
| **Calculation** | 5 searches = 1 credit      |
| **No Results**  | **FREE** if no ads found   |

Very cost-effective for competitive ad intelligence at just 0.2 credits per search.

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
curl -X POST 'https://api.leadmagic.io/v1/ads/google-ads-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "hubspot.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/ads/google-ads-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'hubspot.com' })
});
const data = await response.json();
console.log(`Found ${data.ads?.length || 0} ads`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/ads/google-ads-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'hubspot.com'}
)
data = response.json()
print(f"Found {len(data.get('ads', []))} ads")
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

| Field              | Type   | Required | Description                            |
| ------------------ | ------ | -------- | -------------------------------------- |
| `company_name`     | string | Yes      | Company searched                       |
| `ads`              | array  | Yes      | Array of ad creatives                  |
| `ads_count`        | integer| No       | Number of ads returned                 |
| `credits_consumed` | number | Yes      | Credits used (0.2 if found, 0 if not)  |
| `message`          | string | Yes      | Human-readable status message          |

### Ad Object

| Field             | Type   | Description                              |
| ----------------- | ------ | ---------------------------------------- |
| `advertiser_id`   | string | Google Ads advertiser ID                 |
| `creative_id`     | string | Unique creative ID                       |
| `original_url`    | string | Link to ad in Google Ads Transparency    |
| `variants`        | array  | Ad creative variants (content, dimensions) |
| `start`           | string | Date ad first appeared                   |
| `last_seen`       | string | Date ad was last seen                    |
| `advertiser_name` | string | Advertiser display name                  |
| `format`          | string | Ad format (Text, Image, etc.)            |

### Variant Object

| Field     | Type    | Description              |
| --------- | ------- | ------------------------ |
| `content` | string  | HTML content of the ad   |
| `height`  | integer | Ad height in pixels      |
| `width`   | integer | Ad width in pixels       |

### Example Response

```json
{
  "ads": [
    {
      "advertiser_id": "AR14106062795078369281",
      "creative_id": "CR14003695067076755457",
      "original_url": "https://adstransparency.google.com/advertiser/AR14106062795078369281/creative/CR14003695067076755457?region=anywhere",
      "variants": [
        {
          "content": "<img src=\"https://tpc.googlesyndication.com/archive/simgad/6399633577457746150\" height=\"173\" width=\"380\">",
          "height": 173,
          "width": 380
        }
      ],
      "start": "2024-07-03",
      "last_seen": "2025-03-06",
      "advertiser_name": "LeadMagic Inc",
      "format": "Text"
    }
  ],
  "credits_consumed": 0.2
}
```

---

## Success Messages

| Message                          | Meaning                  | Cost        |
| -------------------------------- | ------------------------ | ----------- |
| `Ads found.`                     | Google Ads data returned | 0.2 credits |
| `No ads found for this company.` | No Google Ads found      | FREE        |

---

## Best Practices

- **Analyze competitor messaging** — Study headlines and descriptions to understand positioning and value props.
- **Find landing page inspiration** — Use final URLs to analyze competitor landing pages.
- **Track ad changes over time** — Regular monitoring reveals A/B tests and strategy shifts.

---

## Use Cases

- **Competitive Intelligence** — Understand competitor ad strategies and messaging.
- **Ad Copy Inspiration** — Find proven messaging patterns in your market.
- **Market Research** — Analyze advertising trends in your industry.
- **Landing Page Analysis** — Discover competitor landing pages and offers.

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