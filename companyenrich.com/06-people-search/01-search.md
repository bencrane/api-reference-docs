# People Search - Search

**POST** `https://api.companyenrich.com/people/search`

**Cost:** 2 credits per person returned. 2 credits minimum if no results are found.

> **Notice:** Up to 10,000 results can be returned from this endpoint (`page * pageSize` cannot exceed 10,000). If you need more results, please use the scroll endpoint.

Searches people based on given criteria using page-based pagination.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `page` | int32 (1–1,000,000) | The page number to return. Must be greater than 0 |
| `pageSize` | int32 (1–100) | The number of results to return in each page. Must be between 1 and 100 |
| `companyFilter` | object \| null | The filters to be applied on the companies to find people for |
| `positionQuery` | string \| null | The search query to apply on the person's current job position/title |
| `exclude` | object \| null | Exclusion filters to apply on the people. If a person matches any of the filters here, it will be excluded from the results |
| `countries` | array of strings \| null | The 2 letter country codes to filter by |
| `domains` | array of strings \| null | The domains to find people for. Up to 100 domains are allowed |
| `seniority` | array \| null | The seniorities to filter by |
| `department` | array \| null | The departments to filter by |

### companyFilter Object

| Parameter | Type | Description |
|---|---|---|
| `query` | string \| null | The search query to apply on the company name and domain |

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
| `page` | int32 | The current page number. 1-indexed |
| `totalPages` | int32 | The total number of pages |
| `totalItems` | int32 | The total number of items in the list |

#### Item Object

| Field | Type | Description |
|---|---|---|
| `id` | int64 (required) | The unique identifier of the person |
| `name` | string \| null | The full name of the person |
| `location` | object \| null | The location information of the person |
| `first_name` | string \| null | The first name of the person |
| `last_name` | string \| null | The last name of the person |
| `socials` | object | The social URLs of the person |
| `experiences` | array of objects | The work experiences of the person |
| `position` | string \| null | The job position/title of the person |
| `seniority` | enum | The seniority level of the person |
| `department` | enum | The department of the person |
| `image_url` | string \| null | The image URL of the person |

#### Location Object

| Field | Type |
|---|---|
| `country` | object \| null (code, name, latitude, longitude) |
| `address` | string \| null |

#### Socials Object

| Field | Type |
|---|---|
| `linkedin_url` | string \| null |

#### Experience Object (type: "company")

| Field | Type |
|---|---|
| `type` | "company" |
| `company` | object (id, name, domain, logo_url) |
| `startDate` | date |
| `endDate` | date |
| `isCurrent` | boolean |
| `isMatched` | boolean |
| `position` | string |

#### Experience Object (type: "unknown")

| Field | Type |
|---|---|
| `type` | "unknown" |
| `companyName` | string |
| `startDate` | date |
| `endDate` | date |
| `isCurrent` | boolean |
| `isMatched` | boolean |
| `position` | string |

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
     --url https://api.companyenrich.com/people/search \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

## Example Response

```json
{
  "items": [
    {
      "id": 0,
      "name": "string",
      "location": {
        "country": {
          "code": "string",
          "name": "string",
          "latitude": 0,
          "longitude": 0
        },
        "address": "string"
      },
      "first_name": "string",
      "last_name": "string",
      "socials": {
        "linkedin_url": "string"
      },
      "experiences": [
        {
          "type": "company",
          "company": {
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "name": "string",
            "domain": "string",
            "logo_url": "string"
          },
          "startDate": "2026-02-17",
          "endDate": "2026-02-17",
          "isCurrent": true,
          "isMatched": true,
          "position": "string"
        },
        {
          "type": "unknown",
          "companyName": "string",
          "startDate": "2026-02-17",
          "endDate": "2026-02-17",
          "isCurrent": true,
          "isMatched": true,
          "position": "string"
        }
      ],
      "position": "string",
      "image_url": "string"
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```