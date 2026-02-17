# Companies Similar - Scroll

**POST** `https://api.companyenrich.com/companies/similar/scroll`

**Cost:** 5 credits per company returned. 5 credits if no results are found.

Finds similar companies to the given company by id or domain. The POST route allows specifying further filtering parameters. At most 100 companies are returned per request.

You can request the next page of results by using the `cursor` parameter. The cursor is a string that encodes the current position in the result set. If no cursor is provided, the first page of results is returned. You can then use the `next_cursor` parameter to get the next page of results.

This allows you to scroll over the results without having to keep track of the current page number and also allows paginating into more than 10,000 results.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `pageSize` | int32 (1–100) | The number of results to return in each page. Must be between 1 and 100 |
| `cursor` | string \| null | The cursor to use for pagination. Used for cursor-based pagination. If set, Page will be ignored |
| `domains` | array of strings (1–10) | The domains to find similar companies for. Up to 10 domains are allowed |
| `similarityWeight` | double (-1 to 1) | The similarity weight to apply to the results. Default 0. Larger values prioritize more similar companies, smaller values prioritize more established companies |
| `exclude` | object \| null | Exclusion filters to apply on the companies. If a company matches any of the filters here, it will be excluded from the results |
| `query` | string \| null | The search query to apply on the company name and domain |
| `foundedYear` | object \| null | Founded year min and max values to filter by |
| `fundingAmount` | object \| null | The funding amount range to filter by |
| `fundingYear` | object \| null | The range of funding years |
| `categoryOperator` | enum | The operator to apply on the category filters. Defaults to And. Allowed: `And`, `Or`, `null` |
| `keywordsOperator` | enum | The operator to apply on the keywords filters. Defaults to And. Allowed: `And`, `Or`, `null` |
| `technologiesOperator` | enum | The operator to apply on the technologies filters. Defaults to And. Allowed: `And`, `Or`, `null` |
| `require` | array \| null | The features that must exist for the company |
| `regions` | array of strings \| null | The region IDs to filter by |
| `countries` | array of strings \| null | The 2 letter country codes to filter by |
| `states` | array of int32s \| null | The state IDs to filter by |
| `cities` | array of int32s \| null | The city IDs to filter by |
| `type` | array \| null | The list of company types to filter by |
| `category` | array \| null | The list of company categories to filter by |
| `employees` | array \| null | The list of employee counts to filter by |
| `revenue` | array \| null | The list of revenue ranges to filter by |
| `naicsCode` | array of int32s \| null | The NAICS codes to filter by. Can be 2 to 6 digit codes. In case of a 2–5 digit code, all 6 digit codes under it will be included |
| `keywords` | array of strings \| null | The keywords to filter by |
| `technologies` | array of strings \| null | The technologies to filter by |
| `fundingRounds` | array \| null | The funding rounds to filter by |

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
| `items` | array of objects (required) | The items in the list |
| `metadata` | object \| null | The additional metadata for the list |
| `nextCursor` | string \| null | The cursor for the next page |
| `previousCursor` | string \| null | The cursor for the previous page |
| `totalItems` | int32 | The total number of items in the list |
| `startIndex` | int32 \| null | The index of the first item in the entire result set |

#### Metadata Object

| Field | Type | Description |
|---|---|---|
| `scores` | object (required) | The match score for each company mapped by id. Score is between 0 and 1. 1 is a perfect match. Has additional fields |
| `totalMatching` | int32 | The total number of companies matching the search query, disregarding any pagination limits. Greater or equal to totalItems |

#### Item Object

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
| `location` | object \| null | The location information of the company |
| `financial` | object \| null | The financial information of the company |
| `socials` | object | The social URLs of the company |
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
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |

---

## Example Request

```shell
curl --request POST \
     --url https://api.companyenrich.com/companies/similar/scroll \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

## Example Response

```json
{
  "items": [
    {
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
      "updated_at": "2026-02-17T02:04:03.743Z"
    }
  ],
  "metadata": {
    "scores": {
      "additionalProp": 0
    },
    "totalMatching": 0
  },
  "nextCursor": "string",
  "previousCursor": "string",
  "totalItems": 0,
  "startIndex": 0
}
```