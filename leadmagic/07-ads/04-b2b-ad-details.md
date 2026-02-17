# Ads - B2B Ad Details

> Get detailed information about a specific B2B advertisement using its URL or ID.

Includes full creative content, video data, targeting, and performance metrics.

---

## Endpoint Details

**POST** `/v1/ads/b2b-ads-details`

### Pricing

| Metric         | Value                    |
| -------------- | ------------------------ |
| **Cost**       | **2 credits** per ad     |
| **No Results** | **FREE** if ad not found |

Use the ad ID from B2B Ads Search to get complete details.

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
| **Median (P50)** | ~500ms    |
| **P95**          | ~1,500ms  |
| **P99**          | ~3,000ms  |

---

## Quick Example

### cURL

```bash
curl -X POST 'https://api.leadmagic.io/v1/ads/b2b-ads-details' \
  -H 'X-API-Key: YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"ad_url": "633872143"}'
```

### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/ads/b2b-ads-details', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ad_url: '633872143'
  })
});
const data = await response.json();
console.log(`Ad headline: ${data.ad_details?.heading}`);
```

### Python

```python
import requests

response = requests.post(
    'https://api.leadmagic.io/v1/ads/b2b-ads-details',
    headers={'X-API-Key': 'YOUR_API_KEY'},
    json={'ad_url': '633872143'}
)
data = response.json()
print(f"Ad headline: {data.get('ad_details', {}).get('heading', 'N/A')}")
```

---

## Request Parameters

| Parameter | Type   | Required | Description                                                  |
| --------- | ------ | -------- | ------------------------------------------------------------ |
| `ad_url`  | string | Yes      | The Ad Library URL or ID (from B2B Ads Search `link` field). |

Get the `ad_url` from the `link` field in B2B Ads Search results.

---

## Response

| Field              | Type   | Required | Description                          |
| ------------------ | ------ | -------- | ------------------------------------ |
| `message`          | string | Yes      | Human-readable status message        |
| `credits_consumed` | number | Yes      | Credits used (2 if found, 0 if not)  |
| `ad_details`       | object | No       | Detailed ad information              |

### Ad Details Object

| Field                    | Type   | Description                                  |
| ------------------------ | ------ | -------------------------------------------- |
| `ads_type`               | string | Ad type (Video Ad, Image Ad, etc.)           |
| `content`                | string | Full ad copy/body text                       |
| `heading`                | string | Ad headline                                  |
| `sub_heading`            | string | Ad sub-headline (nullable)                   |
| `image`                  | string | Image URL (nullable)                         |
| `cta`                    | object | Call-to-action (`button_text`, `link`)        |
| `video`                  | object | Video data (`video_thumbnail`, `data_sources`)|
| `total_impressions`      | string | Total impression count (nullable)            |
| `country_impressions`    | array  | Impressions by country                       |
| `targeting_language`     | string | Target language (nullable)                   |
| `targeting_location`     | string | Target location (nullable)                   |
| `organization`           | object | Advertiser info (`b2b_profile`, `advertiser`)|
| `about_ad_paying_entity` | string | Who paid for the ad                          |
| `availability_duration`  | string | How long ad has been running (nullable)      |

### Video Object

| Field             | Type   | Description                          |
| ----------------- | ------ | ------------------------------------ |
| `video_thumbnail` | string | Thumbnail image URL                  |
| `data_sources`    | array  | Video files with `type`, `src`, `bitrate` |

### Example Response

```json
{
  "message": "Ad details retrieved successfully",
  "credits_consumed": 2,
  "ad_details": {
    "ads_type": "Video Ad",
    "content": "Start your day knowing what deals you need to focus on instead of opening up a dozen tabs in your CRM.",
    "heading": "Discover how our platform drives better sales outcomes",
    "sub_heading": null,
    "image": null,
    "cta": {
      "button_text": "Learn more",
      "link": "https://leadmagic.io/why-leadmagic/"
    },
    "video": {
      "video_thumbnail": "https://media.licdn.com/dms/image/...",
      "data_sources": [
        {
          "type": "video/mp4",
          "src": "https://dms.licdn.com/playlist/vid/...",
          "bitrate": 6284199
        }
      ]
    },
    "total_impressions": null,
    "country_impressions": [],
    "targeting_language": null,
    "targeting_location": null,
    "organization": {
      "b2b_profile": "10454372",
      "advertiser": "LeadMagic"
    },
    "about_ad_paying_entity": "Paid for by LeadMagic Inc."
  }
}
```

---

## Success Messages

| Message                    | Meaning                     | Cost      |
| -------------------------- | --------------------------- | --------- |
| `Ad details found.`        | Full ad data returned       | 2 credits |
| `Ad not found.`            | Ad doesn't exist or expired | FREE      |

---

## Workflow

1. **Search for Ads** — Use B2B Ads Search to find ads for a company.
2. **Get Ad IDs** — Extract the `link` field from search results.
3. **Fetch Details** — Use this endpoint to get full creative and targeting data.
4. **Analyze** — Study messaging, targeting, and creative approaches.

---

## Best Practices

- **Batch strategically** — Only fetch details for the most relevant ads from search results.
- **Study targeting** — Targeting data reveals which audiences competitors prioritize.
- **Download video content** — Video URLs allow you to analyze video ad creative in detail.

---

## Use Cases

- **Creative Analysis** — Study complete ad creative including video content.
- **Targeting Intelligence** — Understand competitor audience targeting strategies.
- **Performance Benchmarks** — Use impression data to benchmark ad performance.
- **Competitive Reports** — Build detailed competitive advertising reports.

---

## Error Responses

| Status | Code                     | Description                                      |
| ------ | ------------------------ | ------------------------------------------------ |
| 400    | `validation_error`       | Missing or invalid `ad_url`                      |
| 401    | `missing_authentication` | Missing `X-API-Key` header                       |
| 401    | `invalid_api_key`        | Invalid or expired API key                       |
| 402    | `insufficient_credits`   | Not enough credits                               |
| 404    | `resource_not_found`     | Ad not found                                     |
| 429    | `rate_limit_exceeded`    | Too many requests — check `Retry-After` header   |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds            |