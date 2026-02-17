# Adyntel - Meta Ad Search

## AD LIBRARIES — Meta Ad Search

You first need to create an account, you can sign up [here](https://adyntel.com) to receive 50 credits to test it out.

The Meta ad search endpoint allows you to do a search in the ad library. It takes a keyword as an input and you can provide a `country_code` if you want to limit the results of your search.

---

## API Endpoint

```
POST api.adyntel.com/facebook_ad_search
```

Find ads in the ad library based on a keyword.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name         | Type   | Description                              | Required |
|--------------|--------|------------------------------------------|----------|
| api_key      | string | Adyntel API key                          | ✅       |
| email        | string | Adyntel account email                    | ✅       |
| keyword      | string | The keyword you want to use in your search | ✅     |
| country_code | string | To limit results to one specific country |          |

---

## Example Request

**With `country_code`:**

```json
{
    "api_key": "your_api_key",
    "email": "your_email",
    "keyword": "webinar",
    "country_code": "US"
}
```

---

## Full Response (with ads)

The response structure:

```json
{
  "active_status": "all",
  "ad_type": "all",
  "continuation_token": "AQHRpfWC3j0LHeIhUWEz9ASnhiepWqURP9SFHR24o1aI07WYi4PboxWvPMqXbMoIBTS7",
  "country_code": "US",
  "is_result_complete": false,
  "media_types": "all",
  "number_of_ads": 50001,
  "platform": ["ALL"],
  "query": "webinar",
  "results": [
    [
      {
        "adArchiveID": "540995951781259",
        "adid": "0",
        "archiveTypes": [],
        "categories": [0],
        "collationCount": null,
        "collationID": null,
        "containsDigitallyCreatedMedia": false,
        "containsSensitiveContent": false,
        "currency": "",
        "endDate": 1729753200,
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
        "isAAAEligible": true,
        "isActive": false,
        "isAdAccountActioned": false,
        "isProfilePage": false,
        "menuItems": [],
        "pageID": "271789181870",
        "pageInfo": null,
        "pageIsDeleted": false,
        "pageName": "Current Electric",
        "politicalCountries": [],
        "publisherPlatform": ["facebook", "instagram", "audience_network"],
        "reachEstimate": null,
        "regionalRegulationData": {
          "finserv": {
            "is_deemed_finserv": false,
            "is_limited_delivery": false
          },
          "tw_anti_scam": {
            "is_limited_delivery": false
          }
        },
        "reportCount": null,
        "snapshot": {
          "ad_creative_id": "120212710546180071",
          "body": {
            "markup": {
              "__html": "Live Webinar – Unlock the Economic Benefits of Solar Power for Your Commercial Building"
            }
          },
          "caption": "mailchi.mp",
          "cards": [],
          "creation_time": 1727426258,
          "cta_text": "Learn more",
          "cta_type": "LEARN_MORE",
          "current_page_name": "Current Electric",
          "display_format": "image",
          "images": ["..."],
          "link_url": "https://mailchi.mp/99b549ef4050/commercial-solar-webinar",
          "page_like_count": 5559,
          "page_name": "Current Electric",
          "page_profile_uri": "https://facebook.com/CurrentElectricCompany",
          "title": "Boost your commercial value with solar"
        },
        "spend": null,
        "startDate": 1727766000,
        "stateMediaRunLabel": null,
        "targetedOrReachedCountries": [],
        "totalActiveTime": null
      }
    ]
  ],
  "search_type": "keyword_unordered",
  "start_max_date": null,
  "start_min_date": null
}
```

---

## Response Attributes

### Top-Level Fields

| Attribute            | Type           | Description                                                              |
|----------------------|----------------|--------------------------------------------------------------------------|
| active_status        | string         | Filter status used in the search (e.g., `"all"`).                        |
| ad_type              | string         | Type of ads returned (e.g., `"all"`).                                    |
| continuation_token   | string \| null | Token for pagination to retrieve the next set of results.                |
| country_code         | string         | ISO country code used to filter results.                                 |
| is_result_complete   | boolean        | Whether the result set is complete or more data is available.            |
| media_types          | string         | Types of media included in results.                                      |
| number_of_ads        | integer        | Total number of ads matching the search.                                 |
| platform             | string[]       | Platforms included in results (e.g., `["ALL"]`).                         |
| query                | string         | The keyword used in the search.                                          |
| results              | object[]       | Array of ad result objects.                                              |
| search_type          | string         | The type of search performed (e.g., `"keyword_unordered"`).              |
| start_max_date       | string \| null | Maximum start date filter, if applied.                                   |
| start_min_date       | string \| null | Minimum start date filter, if applied.                                   |

### Ad Object Fields

| Attribute                       | Type           | Description                                                          |
|---------------------------------|----------------|----------------------------------------------------------------------|
| adArchiveID                     | string         | Unique identifier for the ad in the archive.                         |
| adid                            | string         | Identifier for the ad.                                               |
| categories                      | integer[]      | Categories assigned to the ad.                                       |
| collationCount                  | integer \| null | Number of times the ad has been collated/grouped.                   |
| collationID                     | integer \| null | Identifier for the collation group.                                 |
| containsDigitallyCreatedMedia   | boolean        | Whether the ad contains digitally created media.                     |
| containsSensitiveContent        | boolean        | Whether the ad contains sensitive content.                           |
| endDate                         | integer        | Unix timestamp for when the ad campaign ends.                        |
| entityType                      | string         | Type of entity (e.g., `"person_profile"`).                           |
| finServAdData                   | object         | Financial service ad information.                                    |
| gatedType                       | string         | Eligibility status for certain features.                             |
| isAAAEligible                   | boolean        | Eligibility for AAA features.                                        |
| isActive                        | boolean        | Whether the ad is currently active.                                  |
| pageID                          | string         | Identifier for the Facebook page.                                    |
| pageName                        | string         | Name of the Facebook page.                                           |
| publisherPlatform               | string[]       | Platforms where the ad is published.                                 |
| regionalRegulationData          | object         | Regional regulation data including finserv and anti-scam info.       |
| snapshot                        | object         | Detailed ad creative info (body, images, CTA, links, etc.).         |
| startDate                       | integer        | Unix timestamp for when the ad campaign started.                     |
| targetedOrReachedCountries      | array          | Countries where the ad was targeted or reached.                      |
| totalActiveTime                 | integer \| null | Total active time duration since start date.                        |

### Snapshot Object Fields

| Attribute           | Type        | Description                                              |
|---------------------|-------------|----------------------------------------------------------|
| ad_creative_id      | string      | Unique identifier for the ad creative.                   |
| body                | object      | Ad body content with HTML markup.                        |
| caption             | string      | Caption/domain shown on the ad.                          |
| cards               | array       | Carousel card data (for multi-card ads).                 |
| creation_time       | integer     | Unix timestamp of ad creation.                           |
| cta_text            | string      | Call-to-action button text.                              |
| cta_type            | string      | Call-to-action type (e.g., `LEARN_MORE`, `SIGN_UP`).    |
| current_page_name   | string      | Current name of the associated page.                     |
| display_format      | string      | Ad display format (e.g., `image`, `dco`).                |
| images              | array       | Array of image objects with original and resized URLs.   |
| link_url            | string      | Destination URL of the ad.                               |
| page_like_count     | integer     | Number of likes on the associated page.                  |
| page_name           | string      | Name of the page running the ad.                         |
| page_profile_uri    | string      | Facebook profile URI of the page.                        |
| title               | string      | Ad title/headline.                                       |
| videos              | array       | Array of video objects (if applicable).                  |

---

## Notes

- The `continuation_token` in the response can be used for pagination (same as the Meta General endpoint).
- The `number_of_ads` field may show a large count (e.g., `50001`) indicating more results are available.
- The `regionalRegulationData` field is unique to the ad search endpoint and contains additional regulatory information not present in the general Meta endpoint.
- The `targetedOrReachedCountries` field is also specific to the ad search response.