# Adyntel - TikTok Ad Details

## AD LIBRARIES — TikTok Ad Details

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

The TikTok Ad Details endpoint allows you to see all the details of a specific ad.

> This endpoint requires an `id` that you get from the response of the [TikTok Search](https://docs.adyntel.com/ad-libraries/tiktok-search) endpoint.

---

## API Endpoint

```
POST api.adyntel.com/tiktok_ad_details
```

Get all the details for an ad on TikTok using the ad ID as the starting point.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name    | Type   | Description           | Required |
|---------|--------|-----------------------|----------|
| api_key | string | Adyntel API key       | ✅       |
| email   | string | Adyntel account email | ✅       |
| id      | string | Ad ID from TikTok Search response | ✅ |

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "id": "1816440843906114"
}
```

---

## Example Response

```json
{
    "code": 0,
    "data": {
        "ad": {
            "audit_status": "1",
            "estimated_audience": "100K-200K",
            "first_shown_date": 1732665600000,
            "id": "1816831112281202",
            "image_urls": [
                "https://p21-ad-sg.ibyteimg.com/origin/..."
            ],
            "impression": 0,
            "last_shown_date": 1733702400000,
            "name": "elevateshoes",
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
        },
        "advertiser": {
            "adv_biz_ids": "7401666423417765905",
            "name": "elevateshoes",
            "registry_location": "Germany",
            "sponsor": "elevateshoes",
            "tt_user": null
        },
        "targeting": {
            "age": [
                {
                    "13-17": false,
                    "18-24": true,
                    "25-34": true,
                    "35-44": true,
                    "45-54": true,
                    "55+": true,
                    "region": "AT"
                }
            ],
            "audience": "No",
            "creator_interactions": "",
            "gender": [
                {
                    "female": true,
                    "male": true,
                    "region": "AT",
                    "unknown": true
                }
            ],
            "interest": "",
            "location": {
                "data": [
                    {
                        "impressions": "27K",
                        "region": "AT"
                    },
                    {
                        "impressions": "116K",
                        "region": "DE"
                    }
                ],
                "total_impressions": "100K-200K",
                "total_region": 2
            },
            "target_audience_size": "21.9M-26.8M",
            "video_interactions": ""
        }
    }
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute | Type    | Description                                  |
|-----------|---------|----------------------------------------------|
| code      | integer | Response status code. `0` indicates success. |
| data      | object  | Contains `ad`, `advertiser`, and `targeting`. |

### Ad Object

Same structure as the [TikTok Search](https://docs.adyntel.com/ad-libraries/tiktok-search) ad object, plus returned within the `data.ad` key.

| Attribute          | Type        | Description                                                  |
|--------------------|-------------|--------------------------------------------------------------|
| audit_status       | string      | Audit status code.                                           |
| estimated_audience | string      | Estimated audience reach range.                              |
| first_shown_date   | integer     | Unix timestamp (ms) when the ad was first shown.             |
| id                 | string      | Unique ad identifier.                                        |
| image_urls         | string[]    | Array of image URLs for the ad.                              |
| impression         | integer     | Impression count (may be `0` if not disclosed).              |
| last_shown_date    | integer     | Unix timestamp (ms) when the ad was last shown.              |
| name               | string      | Advertiser name.                                             |
| rejection_info     | any \| null | Rejection details if rejected, otherwise null.               |
| show_mode          | integer     | Display mode identifier.                                     |
| sor_audit_status   | string      | Secondary audit status code.                                 |
| spent              | string      | Spend amount (may be empty if not disclosed).                |
| type               | string      | Ad type identifier.                                          |
| videos             | object[]    | Array of video objects (`cover_img`, `video_url`).           |

### Advertiser Object

| Attribute         | Type           | Description                              |
|-------------------|----------------|------------------------------------------|
| adv_biz_ids       | string         | Advertiser business ID.                  |
| name              | string         | Advertiser name.                         |
| registry_location | string         | Country where the advertiser is registered. |
| sponsor           | string         | Sponsor name.                            |
| tt_user           | string \| null | TikTok username, if available.           |

### Targeting Object

| Attribute            | Type     | Description                                                     |
|----------------------|----------|-----------------------------------------------------------------|
| age                  | object[] | Age targeting per region. Keys are age ranges with boolean values. |
| audience             | string   | Custom audience usage (e.g., `"No"`).                           |
| creator_interactions | string   | Creator interaction targeting criteria.                         |
| gender               | object[] | Gender targeting per region (`female`, `male`, `unknown` booleans). |
| interest             | string   | Interest-based targeting criteria.                              |
| location             | object   | Location targeting with impressions breakdown.                  |
| target_audience_size | string   | Total target audience size range.                               |
| video_interactions   | string   | Video interaction targeting criteria.                           |

### Location Object

| Attribute         | Type     | Description                                  |
|-------------------|----------|----------------------------------------------|
| data              | object[] | Array of region objects with `region` and `impressions`. |
| total_impressions | string   | Total impressions range across all regions.  |
| total_region      | integer  | Number of targeted regions.                  |