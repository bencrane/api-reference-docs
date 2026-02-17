# Enrich by Properties

**POST** `https://api.companyenrich.com/companies/enrich`

**Cost:** 1 credit per call

Enriches a company using its properties.

You need to provide at least one of the following properties:

- Domain
- Name
- LinkedinUrl
- TwitterUrl
- FacebookUrl
- InstagramUrl

Best match is used to determine the company in case of ambiguity.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `name` | string \| null | The name of the company to enrich |
| `linkedinUrl` | uri \| null | The LinkedIn URL of the company to enrich |
| `twitterUrl` | uri \| null | The Twitter URL of the company to enrich |
| `facebookUrl` | uri \| null | The Facebook URL of the company to enrich |
| `instagramUrl` | uri \| null | The Instagram URL of the company to enrich |
| `youTubeUrl` | uri \| null | The YouTube URL of the company to enrich |

## Headers

| Header | Type | Default |
|---|---|---|
| `accept` | string (enum) | `application/json` |

Allowed: `application/json`, `application/problem+json`

---

## Responses

### 200 OK

#### Response Body (object)

| Field | Type | Description |
|---|---|---|
| `id` | uuid (required) | The unique identifier of the company |
| `name` | string \| null | The name of the company |
| `domain` | string \| null | The primary domain name of the company |
| `website` | uri \| null | The website URL of the company |
| `type` | enum | The type of the company |
| `industry` | string \| null | The main industry of the company |
| `industries` | array of strings \| null | The industries associated with the company |
| `categories` | array \| null | The categories of the company from most to least specific |
| `employees` | enum | The range of number of employees of the company |
| `revenue` | enum | The range of annual revenue of the company in USD |
| `description` | string \| null | The description of the company |
| `keywords` | array of strings \| null | The search keywords of the company |
| `technologies` | array of strings \| null | The technologies associated with the company |
| `subsidiaries` | array of strings \| null | The subsidiaries associated with the company |
| `founded_year` | int32 \| null | The year the company was founded |
| `naics_codes` | array of strings \| null | The NAICS codes associated with the company |

#### Location Object (object | null)

| Field | Type | Description |
|---|---|---|
| `country` | object \| null | The origin country information of the company |
| `state` | object \| null | The state information of the company |
| `city` | object \| null | The city information of the company |
| `address` | string \| null | |
| `postal_code` | string \| null | |
| `phone` | string \| null | |

#### Financial Object (object | null)

| Field | Type | Description |
|---|---|---|
| `stock_symbol` | string \| null | |
| `stock_exchange` | string \| null | |
| `total_funding` | int64 \| null | |
| `funding_stage` | string \| null | |
| `funding_date` | date-time \| null | |
| `funding` | array of objects \| null | |

**Funding Object:**

| Field | Type |
|---|---|
| `date` | date-time \| null |
| `amount` | string \| null |
| `type` | string \| null |
| `url` | string \| null |
| `from` | string \| null |

#### Socials Object

| Field | Type | Description |
|---|---|---|
| `linkedin_url` | uri \| null | The LinkedIn URL of the company |
| `linkedin_id` | string \| null | The LinkedIn ID of the company |
| `twitter_url` | uri \| null | The Twitter URL of the company |
| `facebook_url` | uri \| null | The Facebook URL of the company |
| `instagram_url` | uri \| null | The Instagram URL of the company |
| `angellist_url` | uri \| null | The AngelList URL of the company |
| `crunchbase_url` | uri \| null | The Crunchbase URL of the company |
| `youtube_url` | uri \| null | The YouTube URL of the company |
| `github_url` | uri \| null | The GitHub URL of the company |
| `g2_url` | uri \| null | The G2 URL of the company |

#### Additional Fields

| Field | Type | Description |
|---|---|---|
| `page_rank` | float \| null | The page rank of the company |
| `logo_url` | string \| null | The logo URL of the company |
| `seo_description` | string \| null | The SEO description of the company |
| `updated_at` | date-time | The last updated timestamp of the company |

### Error Responses

| Status | Description |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 402 | Payment Required |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |

---

## Example Request

```shell
curl --request POST \
     --url https://api.companyenrich.com/companies/enrich \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

## Example Response

```json
{
  "location": {
    "latitude": 0,
    "longitude": 0,
    "address": "string",
    "postal_code": "string",
    "phone": "string"
  },
  "financial": {
    "stock_symbol": "string",
    "stock_exchange": "string",
    "total_funding": 0,
    "funding_stage": "string",
    "funding_date": "2026-02-17T01:41:11.850Z",
    "funding": [
      {
        "date": "2026-02-17T01:41:11.850Z",
        "amount": "string",
        "type": "string",
        "url": "string",
        "from": "string"
      }
    ]
  },
  "socials": {
    "linkedin_url": "string",
    "linkedin_id": "string",
    "twitter_url": "string",
    "facebook_url": "string",
    "instagram_url": "string",
    "angellist_url": "string",
    "crunchbase_url": "string",
    "youtube_url": "string",
    "github_url": "string",
    "g2_url": "string"
  },
  "page_rank": 0,
  "logo_url": "string",
  "seo_description": "string",
  "updated_at": "2026-02-17T01:41:11.850Z"
}
```