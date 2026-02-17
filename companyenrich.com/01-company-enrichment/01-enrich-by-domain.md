# Company Enrichment - Enrich by Domain

## Endpoint

```
GET https://api.companyenrich.com/companies/enrich
```

**Cost:** 1 credit per call

Enriches a company using its domain name as lookup parameter. Each domain is mapped to a unique company, making domain lookups fast and reliable. This is the preferred way to enrich a company.

If the domain name cannot be enriched, the API returns a `404` error.

---

## Query Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `domain`  | string | Yes      | The domain to look up |

## Headers

| Header          | Type   | Default            | Allowed Values                                  |
|-----------------|--------|--------------------|-------------------------------------------------|
| `accept`        | string | `application/json` | `application/json`, `application/problem+json`  |
| `Authorization` | string | —                  | `Bearer <API_KEY>`                              |

---

## Example Request

```bash
curl --request GET \
     --url 'https://api.companyenrich.com/companies/enrich?domain=example.com' \
     --header 'Authorization: Bearer <API_KEY>' \
     --header 'accept: application/json'
```

---

## Response Codes

| Status | Description          |
|--------|----------------------|
| 200    | OK                   |
| 400    | Bad Request          |
| 401    | Unauthorized         |
| 402    | Payment Required     |
| 404    | Not Found            |
| 422    | Unprocessable Entity |
| 429    | Too Many Requests    |

---

## 200 Response Body

### Top-Level Fields

| Field            | Type              | Required | Description |
|------------------|-------------------|----------|-------------|
| `id`             | uuid              | Yes      | Unique identifier of the company |
| `name`           | string \| null    | No       | Name of the company |
| `domain`         | string \| null    | No       | Primary domain name |
| `website`        | uri \| null       | No       | Website URL |
| `type`           | enum              | No       | Type of the company |
| `industry`       | string \| null    | No       | Main industry |
| `industries`     | string[] \| null  | No       | Associated industries |
| `categories`     | array \| null     | No       | Categories from most to least specific |
| `employees`      | enum              | No       | Range of number of employees |
| `revenue`        | enum              | No       | Range of annual revenue (USD) |
| `description`    | string \| null    | No       | Company description |
| `keywords`       | string[] \| null  | No       | Search keywords |
| `technologies`   | string[] \| null  | No       | Associated technologies |
| `subsidiaries`   | string[] \| null  | No       | Associated subsidiaries |
| `founded_year`   | int32 \| null     | No       | Year the company was founded |
| `naics_codes`    | string[] \| null  | No       | Associated NAICS codes |
| `location`       | object \| null    | No       | Location information |
| `financial`      | object \| null    | No       | Financial information |
| `socials`        | object            | No       | Social URLs |
| `page_rank`      | float \| null     | No       | Page rank |
| `logo_url`       | string \| null    | No       | Logo URL |
| `seo_description`| string \| null    | No       | SEO description |
| `updated_at`     | date-time         | No       | Last updated timestamp |

### `location` Object

| Field         | Type           | Description |
|---------------|----------------|-------------|
| `country`     | object \| null | Country information (`code`, `name`, `latitude`, `longitude`) |
| `state`       | object \| null | State information (`id`, `name`, `code`, `latitude`, `longitude`) |
| `city`        | object \| null | City information (`id`, `name`, `latitude`, `longitude`) |
| `address`     | string \| null | Street address |
| `postal_code` | string \| null | Postal code |
| `phone`       | string \| null | Phone number |

### `financial` Object

| Field            | Type              | Description |
|------------------|-------------------|-------------|
| `stock_symbol`   | string \| null    | Stock symbol |
| `stock_exchange`  | string \| null   | Stock exchange |
| `total_funding`  | int64 \| null     | Total funding amount |
| `funding_stage`  | string \| null    | Current funding stage |
| `funding_date`   | date-time \| null | Last funding date |
| `funding`        | object[] \| null  | Array of funding rounds |

#### `funding[]` Object

| Field    | Type              | Description |
|----------|-------------------|-------------|
| `date`   | date-time \| null | Funding date |
| `amount` | string \| null    | Funding amount |
| `type`   | string \| null    | Funding type |
| `url`    | string \| null    | Source URL |
| `from`   | string \| null    | Investor/source |

### `socials` Object

| Field            | Type           | Description |
|------------------|----------------|-------------|
| `linkedin_url`   | uri \| null    | LinkedIn URL |
| `linkedin_id`    | string \| null | LinkedIn ID |
| `twitter_url`    | uri \| null    | Twitter URL |
| `facebook_url`   | uri \| null    | Facebook URL |
| `instagram_url`  | uri \| null    | Instagram URL |
| `angellist_url`  | uri \| null    | AngelList URL |
| `crunchbase_url` | uri \| null    | Crunchbase URL |
| `youtube_url`    | uri \| null    | YouTube URL |
| `github_url`     | uri \| null    | GitHub URL |
| `g2_url`         | uri \| null    | G2 URL |

---

## Example Response

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "domain": "string",
  "website": "string",
  "industry": "string",
  "industries": ["string"],
  "categories": [null],
  "description": "string",
  "keywords": ["string"],
  "technologies": ["string"],
  "subsidiaries": ["string"],
  "founded_year": 0,
  "naics_codes": ["string"],
  "location": {
    "country": {
      "code": "string",
      "name": "string",
      "latitude": 0,
      "longitude": 0
    },
    "state": {
      "id": 0,
      "name": "string",
      "code": "string",
      "latitude": 0,
      "longitude": 0
    },
    "city": {
      "id": 0,
      "name": "string",
      "latitude": 0,
      "longitude": 0
    },
    "address": "string",
    "postal_code": "string",
    "phone": "string"
  },
  "financial": {
    "stock_symbol": "string",
    "stock_exchange": "string",
    "total_funding": 0,
    "funding_stage": "string",
    "funding_date": "2026-02-17T00:16:33.225Z",
    "funding": [
      {
        "date": "2026-02-17T00:16:33.225Z",
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
  "updated_at": "2026-02-17T00:16:33.225Z"
}
```