# Ads - Meta Ads Search

> Search for Meta (Facebook/Instagram) Ads by company domain or name.

Analyze social media advertising strategies and creative approaches.

---

## Endpoint Details

**POST** `/v1/ads/meta-ads-search`

### Pricing

| Metric          | Value                      |
| --------------- | -------------------------- |
| **Cost**        | **0.2 credits** per search |
| **Calculation** | 5 searches = 1 credit      |
| **No Results**  | **FREE** if no ads found   |

Very cost-effective for social ad intelligence at just 0.2 credits per search.

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
curl -X POST 'https://api.leadmagic.io/v1/ads/meta-ads-search' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"company_domain": "airbnb.com"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/ads/meta-ads-search', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ company_domain: 'airbnb.com' })
});
const data = await response.json();
console.log(`Found ${data.ads?.length || 0} Meta ads`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/ads/meta-ads-search',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'company_domain': 'airbnb.com'}
)
data = response.json()
print(f"Found {len(data.get('ads', []))} Meta ads")
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

Each ad object contains detailed Meta Ad Library data including:

| Field                | Type   | Description                                    |
| -------------------- | ------ | ---------------------------------------------- |
| `adArchiveID`        | string | Meta Ad Library archive ID                     |
| `advertiser_name`    | string | Advertiser display name (via `pageName`)       |
| `pageID`             | string | Facebook page ID                               |
| `startDate`          | integer| Unix timestamp when ad started                 |
| `endDate`            | integer| Unix timestamp when ad ended (if applicable)   |
| `isActive`           | boolean| Whether the ad is currently running            |
| `publisherPlatform`  | array  | Platforms (e.g., `["facebook", "instagram"]`)  |
| `snapshot`           | object | Full creative details (body, images, videos, links, CTA) |
| `format`             | string | Ad format (Text, Image, Video, etc.)           |

### Snapshot Object (key fields)

| Field          | Type   | Description                    |
| -------------- | ------ | ------------------------------ |
| `body`         | object | Ad copy/text markup            |
| `images`       | array  | Image URLs and dimensions      |
| `videos`       | array  | Video URLs (if video ad)       |
| `link_url`     | string | Landing page URL               |
| `caption`      | string | Display URL/caption            |
| `cta_text`     | string | Call-to-action button text     |
| `title`        | string | Ad headline                    |

### Example Response (simplified)

```json
{
  "message": "Meta Ads retrieved successfully",
  "credits_consumed": 0.2,
  "ads_count": 1,
  "ads": [
    {
      "adArchiveID": "618153827656899",
      "pageName": "Airbnb",
      "pageID": "105549201674375",
      "isActive": true,
      "startDate": 1741248000,
      "publisherPlatform": ["facebook", "instagram"],
      "snapshot": {
        "title": "Book unique homes",
        "body": { "markup": { "__html": "Book unique homes and experiences..." } },
        "images": [
          {
            "original_image_url": "https://scontent.xx.fbcdn.net/...",
            "resized_image_url": "https://scontent.xx.fbcdn.net/..."
          }
        ],
        "link_url": "https://airbnb.com/...",
        "cta_text": "Book now",
        "caption": "airbnb.com"
      },
      "format": "Text"
    }
  ]
}
```

---

## Success Messages

| Message                          | Meaning                | Cost        |
| -------------------------------- | ---------------------- | ----------- |
| `Ads found.`                     | Meta Ads data returned | 0.2 credits |
| `No ads found for this company.` | No Meta Ads found      | FREE        |

---

## Best Practices

- **Analyze visual creative** — Meta ads are highly visual. Study image styles and video formats.
- **Note platform targeting** — See which platforms (Facebook vs Instagram) competitors prioritize.
- **Track seasonal campaigns** — Monitor how competitors adjust messaging for seasons and events.

---

## Use Cases

- **Creative Inspiration** — Study competitor visual styles and messaging.
- **Competitive Intelligence** — Monitor competitor social ad strategies.
- **Market Research** — Analyze social advertising trends in your industry.
- **Campaign Planning** — Inform your own social ad strategy with competitor insights.

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