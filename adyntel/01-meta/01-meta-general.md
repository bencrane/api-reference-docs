# Adyntel - Meta General

## AD LIBRARIES — Meta

You first need to create an account, you can sign up [here](https://adyntel.com) to receive 50 credits to test it out.

The Facebook & Instagram endpoint allows you to find all Facebook and Instagram ads for a given company. It takes a Facebook page or a company domain as input.

Company domain has to be passed in the `company.com` format, meaning all prefixes like `https://` or `www.` need to be removed.

---

## API Endpoint

```
POST api.adyntel.com/facebook
```

See which Facebook or Instagram ads a company is running by providing their website or Facebook page as input.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name                | Type   | Description                                                                                                          | Required |
|---------------------|--------|----------------------------------------------------------------------------------------------------------------------|----------|
| api_key             | string | Adyntel API key                                                                                                      | ✅       |
| email               | string | Adyntel account email                                                                                                | ✅       |
| facebook_url        | string | Facebook page url (needs to start with `https://`). Either this or `company_domain` is required.                     | ⚠️       |
| company_domain      | string | Company website. Either this or `facebook_url` is required.                                                          | ⚠️       |
| webhook_url         | string | Webhook URL where the data will be returned                                                                          |          |
| continuation_token  | string | Token used to grab the next set of ads                                                                               |          |
| media_type          | string | Filter results for a specific type of media. Possible values: `image`, `meme`, `image_and_meme`, `video`            |          |
| country_code        | string | Filter results for a specific country. See possible list of values below.                                            |          |
| active_status       | string | Filters by active, inactive or all ads. Default returns only active ads. Possible values: `inactive`, `all`          |          |

---

## Example Requests

**Using `company_domain`:**

```json
{
    "api_key": "your_api_key",
    "email": "your_email",
    "company_domain": "zoom.com"
}
```

**Using `facebook_url`:**

```json
{
    "api_key": "your_api_key",
    "email": "your_email",
    "facebook_url": "https://facebook.com./zoom"
}
```

**Using webhooks** (works with both `company_domain` and `facebook_url`):

```json
{
    "api_key": "your_api_key",
    "email": "your_email",
    "webhook_url": "your_webhook_url",
    "facebook_url": "https://facebook.com./zoom"
}
```

When using webhooks, the data will be sent to the webhook URL and you will receive a different response:

```json
{
    "chunk_count": 5,
    "message": "Data sent in chunks"
}
```

**Using `continuation_token`:**

You receive this token in the first call you make, but only if there are more ads than we were able to retrieve (usually the first 30 ads). If you use this in your next call, you'll get the next set of ads (next 30) and, if there are more, you'll receive another `continuation_token`. This continues until the last page where the response will have a `null` `continuation_token`.

```json
{
    "api_key": "your_api_key",
    "email": "your_email",
    "company_domain": "monday.com",
    "continuation_token": "q5SkUA7x8o2JxQiyxYGGoDWoyecu46Bxq-5"
}
```

---

## Possible Responses

### 204 — No Content

There are multiple situations in which the response code will be `204` with no message:

- The domain provided returns an HTML response different than 200 (website could not be loaded, not available, domain expired, etc.)
- The domain was scraped but there is no Facebook URL on it
- The Facebook URL was scraped but the page is not publicly available

**You are not charged when you receive this response code.**

### Full Response (with ads)

```json
{
  "active_status": "string",
  "continuation_token": "string | null",
  "country_code": "string",
  "is_result_complete": "boolean",
  "media_types": "string",
  "number_of_ads": "number",
  "page_id": "string",
  "platform": ["string"],
  "results": ["Ad[]"]
}
```

Each ad in the `results` array contains:

```json
{
  "adArchiveID": "string",
  "adid": "string",
  "archiveTypes": [],
  "categories": [0],
  "collationCount": 1,
  "collationID": 0,
  "containsDigitallyCreatedMedia": false,
  "containsSensitiveContent": false,
  "currency": "",
  "endDate": 0,
  "entityType": "string",
  "fevInfo": null,
  "finServAdData": {
    "is_deemed_finserv": false,
    "is_limited_delivery": false
  },
  "gatedType": "string",
  "hasUserReported": false,
  "hiddenSafetyData": false,
  "hideDataStatus": "string",
  "impressionsWithIndex": {
    "impressionsIndex": 0,
    "impressionsText": null
  },
  "isAAAEligible": false,
  "isActive": true,
  "isAdAccountActioned": false,
  "isProfilePage": false,
  "menuItems": [],
  "pageID": "string",
  "pageInfo": null,
  "pageIsDeleted": false,
  "pageName": "string",
  "politicalCountries": [],
  "publisherPlatform": ["string"],
  "reachEstimate": null,
  "reportCount": null,
  "snapshot": {},
  "spend": null,
  "startDate": 0,
  "stateMediaRunLabel": null,
  "totalActiveTime": null
}
```

---

## Example Response

```json
{
  "active_status": "active",
  "continuation_token": null,
  "country_code": "US",
  "is_result_complete": true,
  "media_types": "all",
  "number_of_ads": 3,
  "page_id": "219810892023535",
  "platform": ["facebook", "instagram"],
  "results": [
    [
      {
        "adArchiveID": "1068275031288917",
        "adid": "0",
        "archiveTypes": [],
        "categories": [0],
        "collationCount": 1,
        "collationID": 902561545183873,
        "containsDigitallyCreatedMedia": false,
        "containsSensitiveContent": false,
        "currency": "",
        "endDate": 1732608000,
        "entityType": "person_profile",
        "fevInfo": null,
        "finServAdData": {
          "is_deemed_finserv": false,
          "is_limited_delivery": false
        },
        "gatedType": "eligible",
        "hasUserReported": false,
        "hiddenSafetyData": false,
        "hideDataStatus": "NONE",
        "impressionsWithIndex": {
          "impressionsIndex": -1,
          "impressionsText": null
        },
        "isAAAEligible": false,
        "isActive": true,
        "isAdAccountActioned": false,
        "isProfilePage": false,
        "menuItems": [],
        "pageID": "219810892023535",
        "pageInfo": null,
        "pageIsDeleted": false,
        "pageName": "Lokalise",
        "politicalCountries": [],
        "publisherPlatform": ["facebook", "instagram"],
        "reachEstimate": null,
        "reportCount": null,
        "snapshot": {
          "ad_creative_id": "120212385658810641",
          "body": {
            "markup": {
              "__html": "{{product.brand}}"
            }
          },
          "caption": "fb.me",
          "cards": ["..."],
          "creation_time": 1731410930,
          "cta_text": "Sign up",
          "cta_type": "SIGN_UP",
          "current_page_name": "Lokalise",
          "display_format": "dco",
          "link_url": "http://fb.me/",
          "page_like_count": 2196,
          "page_name": "Lokalise",
          "page_profile_uri": "https://facebook.com/lokalise"
        },
        "spend": null,
        "startDate": 1731398400,
        "stateMediaRunLabel": null,
        "totalActiveTime": null
      }
    ]
  ]
}
```

---

## Response Attributes

| Attribute              | Type              | Description                                                                                      |
|------------------------|-------------------|--------------------------------------------------------------------------------------------------|
| active_status          | string            | Indicates whether the ad campaign is currently active.                                           |
| continuation_token     | string \| null    | Token used for pagination to retrieve the next set of results.                                   |
| country_code           | string            | ISO code of the country where the ads are displayed.                                             |
| is_result_complete     | boolean           | Indicates if the result set is complete or if more data is available.                            |
| media_types            | string            | Types of media included in the ads (images, videos, etc.).                                       |
| number_of_ads          | integer           | Total number of ads returned in the response.                                                    |
| page_id                | string            | Unique identifier for the Facebook page associated with the ads.                                 |
| platform               | string[]          | Platforms where the ads are running (e.g., Facebook, Instagram).                                 |
| results                | object[]          | Contains detailed information about each ad.                                                     |

### Ad Object Attributes

| Attribute                      | Type              | Description                                                                                  |
|--------------------------------|-------------------|----------------------------------------------------------------------------------------------|
| adArchiveID                    | string            | Unique identifier for the ad in the archive.                                                 |
| adid                           | string            | Identifier for the ad itself.                                                                |
| archiveTypes                   | array             | Types of archives associated with the ad.                                                    |
| categories                     | integer[]         | Categories assigned to the ad for classification.                                            |
| collationCount                 | integer           | Number of times this ad has been collated/grouped with others.                               |
| collationID                    | integer           | Identifier for the collation group.                                                          |
| containsDigitallyCreatedMedia  | boolean           | Whether the ad contains digitally created media.                                             |
| containsSensitiveContent       | boolean           | Whether the ad contains sensitive content.                                                   |
| currency                       | string            | Currency used in financial data related to the ad.                                           |
| endDate                        | integer           | Unix timestamp for when the ad campaign ends.                                                |
| entityType                     | string            | Type of entity (e.g., person or business profile).                                           |
| fevInfo                        | object \| null    | Additional info related to Facebook's ad review process.                                     |
| finServAdData                  | object            | Information about financial service advertisements.                                          |
| gatedType                      | string            | Eligibility status for certain features or audiences.                                        |
| hasUserReported                | boolean           | Whether any users have reported this ad.                                                     |
| hiddenSafetyData               | boolean           | Whether there is hidden safety data.                                                         |
| hideDataStatus                 | string            | Status of whether data is hidden from public view.                                           |
| impressionsWithIndex           | object            | Information about ad impressions.                                                            |
| isAAAEligible                  | boolean           | Eligibility for AAA (Audience and Ad Analysis) features.                                     |
| isActive                       | boolean           | Whether the ad is currently active and running.                                              |
| isAdAccountActioned            | boolean           | Whether actions have been taken on this ad by account admins.                                |
| isProfilePage                  | boolean           | Whether the ad is associated with a profile page vs. business page.                          |
| menuItems                      | array             | Menu items associated with this ad's context or placement.                                   |
| pageID                         | string            | Identifier for the Facebook page that owns this ad.                                          |
| pageInfo                       | object \| null    | Additional information about the associated page.                                            |
| pageIsDeleted                  | boolean           | Whether the associated page has been deleted.                                                |
| pageName                       | string            | Name of the Facebook page associated with this ad.                                           |
| politicalCountries             | array             | Countries where this ad is classified as political content.                                  |
| publisherPlatform              | string[]          | Platforms where this ad is published and visible.                                            |
| reachEstimate                  | object \| null    | Estimated reach (audience size/demographics).                                                |
| reportCount                    | integer \| null   | Number of reports filed against this ad.                                                     |
| snapshot                       | object            | Detailed ad creative info (body, images, CTA details).                                       |
| spend                          | object \| null    | Financial spend data for this ad campaign.                                                   |
| startDate                      | integer           | Unix timestamp for when the ad campaign started.                                             |
| stateMediaRunLabel             | string \| null    | Media run state/status label for regulatory purposes.                                        |
| totalActiveTime                | integer \| null   | Total active time duration since start date.                                                 |