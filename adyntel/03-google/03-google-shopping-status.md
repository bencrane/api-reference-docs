# Adyntel - Google Shopping Status

## AD LIBRARIES — Google Shopping Status

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

Using this endpoint you will get the results for your Google Shopping search.

> You will not be charged for using this endpoint.

---

## API Endpoint

```
POST api.adyntel.com/google_shopping_status
```

Get the results of your Google Shopping search by using the `id` you received as a response from the [Google Shopping](https://docs.adyntel.com/ad-libraries/google-shopping) endpoint.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name    | Type   | Description                                          | Required |
|---------|--------|------------------------------------------------------|----------|
| api_key | string | Adyntel API key                                      | ✅       |
| email   | string | Adyntel account email                                | ✅       |
| id      | string | The job ID received from the Google Shopping endpoint | ✅       |

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "id": "12172142-7717-0066-0000-f1e50ca3d579"
}
```

---

## Example Response

```json
{
    "ads": [
        {
            "advertiser_id": "AR11920289341835837441",
            "creative_id": "CR15157585378866626561",
            "first_shown": "2024-02-27 01:02:34 +00:00",
            "format": "text",
            "last_shown": "2024-12-17 17:07:32 +00:00",
            "preview_image": {
                "height": 173,
                "url": "https://tpc.googlesyndication.com/archive/simgad/9720546471572168024",
                "width": 380
            },
            "preview_url": null,
            "rank_absolute": 1,
            "rank_group": 1,
            "title": "iHerb, LLC",
            "type": "ads_search",
            "url": "https://adstransparency.google.com/advertiser/AR11920289341835837441/creative/CR15157585378866626561?region=US",
            "verified": true
        }
    ]
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute | Type     | Description          |
|-----------|----------|----------------------|
| ads       | object[] | Array of ad objects. |

### Ad Object Fields

| Attribute     | Type           | Description                                                                   |
|---------------|----------------|-------------------------------------------------------------------------------|
| advertiser_id | string         | Google Ads Transparency advertiser ID.                                        |
| creative_id   | string         | Unique identifier for the creative.                                           |
| first_shown   | string         | Timestamp when the ad was first seen (YYYY-MM-DD HH:MM:SS +00:00).           |
| format        | string         | Ad format type: `text` or `image`.                                            |
| last_shown    | string         | Timestamp when the ad was last seen (YYYY-MM-DD HH:MM:SS +00:00).            |
| preview_image | object         | Preview image object with `url`, `height`, and `width`. Values may be null for `image` format ads. |
| preview_url   | string \| null | URL to a Google display ads preview page. Populated for `image` format ads, null for `text`. |
| rank_absolute | integer        | Absolute ranking position of the ad in results.                               |
| rank_group    | integer        | Ranking position within the ad group.                                         |
| title         | string         | Advertiser name/title.                                                        |
| type          | string         | Ad type (e.g., `ads_search`).                                                 |
| url           | string         | Link to the ad in Google Ads Transparency Center.                             |
| verified      | boolean        | Whether the advertiser is verified by Google.                                 |

### Preview Image Object

| Attribute | Type           | Description                                          |
|-----------|----------------|------------------------------------------------------|
| url       | string \| null | URL to the preview image. Null for `image` format ads. |
| height    | integer \| null | Image height in pixels. Null for `image` format ads.  |
| width     | integer \| null | Image width in pixels. Null for `image` format ads.   |