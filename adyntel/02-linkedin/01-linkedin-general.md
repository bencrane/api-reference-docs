# Adyntel - LinkedIn General

## AD LIBRARIES — LinkedIn

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

The LinkedIn endpoint allows you to find all LinkedIn ads for a given company. It takes a company domain as input.

Company domain has to be passed in the `company.com` format, meaning all prefixes like `https://` or `www.` need to be removed.

---

## API Endpoint

```
POST api.adyntel.com/linkedin
```

See which LinkedIn ads a company is running by providing their website as input.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name             | Type   | Description          | Required |
|------------------|--------|----------------------|----------|
| api_key          | string | Adyntel API key      | ✅       |
| email            | string | Adyntel account email | ✅      |
| company_domain   | string | Company website      |          |
| linkedin_page_id | number | LinkedIn Page ID     |          |

> Either `company_domain` or `linkedin_page_id` should be provided.

---

## Example Requests

**Using `company_domain`:**

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "company_domain": "tesla.com"
}
```

**Using `linkedin_page_id`:**

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "linkedin_page_id": "15564"
}
```

You can read more [here](https://docs.adyntel.com/integrations/extracting-linkedin-page-id) about how to find the LinkedIn page ID via Clay.

---

## Example Response

```json
{
    "ads": [
        {
            "ad_id": "560774026",
            "advertiser": {
                "logo_url": "https://media.licdn.com/dms/image/...",
                "name": "Lokalise",
                "promoted": true
            },
            "carousel": null,
            "commentary": {
                "link": null,
                "text": "5 new languages, in a month, and just before the holidays?..."
            },
            "creative_type": "SPONSORED_VIDEO",
            "headline": {
                "description": "Promoted",
                "title": "How Life360 launched in 5 markets in 1 month"
            },
            "image": {
                "alt_text": null,
                "url": "https://media.licdn.com/dms/image/..."
            },
            "raw": null,
            "type": "image",
            "view_details_link": "https://www.linkedin.com/ad-library/detail/560774026"
        }
    ],
    "continuation_token": "560746476-1730975030000",
    "is_last_page": false,
    "page_id": "10917347",
    "total_ads": 585
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute          | Type           | Description                                                    |
|--------------------|----------------|----------------------------------------------------------------|
| ads                | object[]       | Array of ad objects.                                           |
| continuation_token | string \| null | Token for pagination to retrieve the next page of results.     |
| is_last_page       | boolean        | Whether this is the last page of results.                      |
| page_id            | string         | LinkedIn page ID for the company.                              |
| total_ads          | integer        | Total number of ads found for the company.                     |

### Ad Object Fields

| Attribute      | Type           | Description                                                        |
|----------------|----------------|--------------------------------------------------------------------|
| ad_id          | string         | Unique identifier for the ad.                                      |
| advertiser     | object         | Advertiser details (name, logo_url, promoted status).              |
| carousel       | object \| null | Carousel data if the ad is a carousel format, otherwise null.      |
| commentary     | object         | Ad commentary containing text and optional link.                   |
| creative_type  | string         | Type of creative (e.g., `SPONSORED_VIDEO`, `SPONSORED_STATUS_UPDATE`). |
| headline       | object         | Headline with title and description.                               |
| image          | object         | Image data with URL and optional alt_text.                         |
| raw            | any \| null    | Raw ad data, if available.                                         |
| type           | string         | Ad media type (e.g., `"image"`).                                   |
| view_details_link | string      | Direct link to the ad in LinkedIn's ad library.                    |

### Advertiser Object

| Attribute | Type    | Description                          |
|-----------|---------|--------------------------------------|
| logo_url  | string  | URL to the advertiser's logo image.  |
| name      | string  | Advertiser/company name.             |
| promoted  | boolean | Whether the ad is promoted.          |

### Commentary Object

| Attribute | Type           | Description                     |
|-----------|----------------|---------------------------------|
| link      | string \| null | Link included in the commentary.|
| text      | string         | Commentary/body text of the ad. |

### Headline Object

| Attribute   | Type   | Description                              |
|-------------|--------|------------------------------------------|
| description | string | Description text (e.g., `"Promoted"`).   |
| title       | string | Headline title of the ad.                |

### Image Object

| Attribute | Type           | Description                      |
|-----------|----------------|----------------------------------|
| alt_text  | string \| null | Alt text for the image.          |
| url       | string         | URL to the ad image or video cover. |