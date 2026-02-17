# Adyntel - TikTok Search

## AD LIBRARIES — TikTok Search

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

The TikTok Search endpoint allows you to search for ads on TikTok using a keyword.

---

## API Endpoint

```
POST api.adyntel.com/tiktok_search
```

Execute a search for ads on TikTok using a keyword as the starting point.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name         | Type   | Description                                        | Required |
|--------------|--------|----------------------------------------------------|----------|
| api_key      | string | Adyntel API key                                    | ✅       |
| email        | string | Adyntel account email                              | ✅       |
| keyword      | string | Your search query                                  | ✅       |
| country_code | string | Limit search to a single country (see codes below) |          |

### Country Codes

Mostly European countries are supported. US is **not** currently available as a filter.

```
AT|BE|BG|CH|CY|CZ|DE|DK|EE|ES|FI|FR|GB|GR|HR|HU|IE|IS|IT|LI|LT|LU|LV|MT|NL|NO|PL|PT|RO|SE|SI|SK|ALL
```

Case-insensitive. If you omit `country_code`, results are global across all countries in no special order.

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "keyword": "toys",
    "country_code": "DE"
}
```

---

## Example Response

```json
{
    "code": 0,
    "data": [
        {
            "audit_status": "1",
            "estimated_audience": "1K-10K",
            "first_shown_date": 1732233600000,
            "id": "1816440843906114",
            "image_urls": [
                "https://p21-ad-sg.ibyteimg.com/origin/tos-alisg-p-0051c001-sg/..."
            ],
            "impression": 0,
            "last_shown_date": 1734307200000,
            "name": "Moose Toys",
            "rejection_info": null,
            "show_mode": 1,
            "sor_audit_status": "1",
            "spent": "",
            "type": "2",
            "videos": [
                {
                    "cover_img": "https://p21-ad-sg.ibyteimg.com/origin/...",
                    "video_url": "https://library.tiktok.com/api/v1/cdn/..."
                }
            ]
        }
    ],
    "has_more": true,
    "search_id": "20241217165105DC1A2559407258D5E6B3",
    "total": 1000
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute | Type     | Description                                          |
|-----------|----------|------------------------------------------------------|
| code      | integer  | Response status code. `0` indicates success.         |
| data      | object[] | Array of ad objects.                                 |
| has_more  | boolean  | Whether additional pages of results are available.   |
| search_id | string  | Search session ID (used for pagination).             |
| total     | integer  | Total number of matching ads found.                  |

### Ad Object Fields

| Attribute        | Type           | Description                                                  |
|------------------|----------------|--------------------------------------------------------------|
| audit_status     | string         | Audit status code (e.g., `"1"` for approved).                |
| estimated_audience | string       | Estimated audience reach range (e.g., `"1K-10K"`, `"200K-300K"`). |
| first_shown_date | integer        | Unix timestamp (ms) when the ad was first shown.             |
| id               | string         | Unique ad identifier.                                        |
| image_urls       | string[]       | Array of image URLs associated with the ad.                  |
| impression       | integer        | Impression count (may be `0` if not disclosed).              |
| last_shown_date  | integer        | Unix timestamp (ms) when the ad was last shown.              |
| name             | string         | Advertiser name.                                             |
| rejection_info   | any \| null    | Rejection details if the ad was rejected, otherwise null.    |
| show_mode        | integer        | Display mode identifier.                                     |
| sor_audit_status | string         | Secondary audit status code.                                 |
| spent            | string         | Spend amount (may be empty string if not disclosed).         |
| type             | string         | Ad type identifier (e.g., `"2"`).                            |
| videos           | object[]       | Array of video objects for the ad creative.                  |

### Video Object Fields

| Attribute | Type   | Description                        |
|-----------|--------|------------------------------------|
| cover_img | string | URL to the video cover/thumbnail.  |
| video_url | string | URL to the video creative content. |