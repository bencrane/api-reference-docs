# Adyntel - Google General

## AD LIBRARIES — Google

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

The Google endpoint allows you to find all Google ads for a given company. It takes a company domain as input.

Company domain has to be passed in the `company.com` format, meaning all prefixes like `https://` or `www.` need to be removed.

---

## API Endpoint

```
POST api.adyntel.com/google
```

See which Google ads a company is running by providing their website as input.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name           | Type   | Description                                                          | Required |
|----------------|--------|----------------------------------------------------------------------|----------|
| api_key        | string | Adyntel API key                                                      | ✅       |
| email          | string | Adyntel account email                                                | ✅       |
| company_domain | string | Company website                                                      | ✅       |
| media_type     | string | Filter results by media type. Possible values: `text`, `image`, `video`. |          |

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "company_domain": "tesla.com"
}
```

---

## Example Response

```json
{
    "ads": [
        {
            "advertiser_id": "AR14106713362364628993",
            "advertiser_name": "Lokalise Inc",
            "creative_id": "CR10126761610920853505",
            "format": "Text",
            "last_seen": "2024-11-26",
            "original_url": "https://adstransparency.google.com/advertiser/AR14106713362364628993/creative/CR10126761610920853505?region=anywhere",
            "start": "2023-06-09",
            "variants": [
                {
                    "content": "<img src=\"https://tpc.googlesyndication.com/archive/simgad/5566462839056439897\" height=\"219\" width=\"380\">",
                    "height": 219,
                    "width": 380
                }
            ]
        }
    ],
    "continuation_token": "CgoAP7znYM4M741jEhC5uHJ9RUHfrfEeRagAAAAAGgj8+Kf/9OzEaA==",
    "country_code": "anywhere"
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute          | Type           | Description                                                |
|--------------------|----------------|------------------------------------------------------------|
| ads                | object[]       | Array of ad objects.                                       |
| continuation_token | string \| null | Token for pagination to retrieve the next page of results. |
| country_code       | string         | Country/region filter applied to the results.              |

### Ad Object Fields

| Attribute       | Type     | Description                                                                 |
|-----------------|----------|-----------------------------------------------------------------------------|
| advertiser_id   | string   | Google Ads Transparency advertiser ID.                                      |
| advertiser_name | string   | Name of the advertiser.                                                     |
| creative_id     | string   | Unique identifier for the creative.                                         |
| format          | string   | Ad format type: `Text`, `Image`, or `Video`.                                |
| last_seen       | string   | Date the ad was last seen (YYYY-MM-DD).                                     |
| original_url    | string   | Link to the ad in Google Ads Transparency Center.                           |
| start           | string   | Date the ad first appeared (YYYY-MM-DD).                                    |
| variants        | object[] | Array of creative variants for the ad.                                      |

### Variant Object Fields

| Attribute | Type           | Description                                                                                      |
|-----------|----------------|--------------------------------------------------------------------------------------------------|
| content   | string         | HTML img tag for Text/Image ads, or a Google display ads preview URL for Video ads.              |
| height    | integer \| null | Height of the creative in pixels. Null for Video format.                                        |
| width     | integer \| null | Width of the creative in pixels. Null for Video format.                                         |