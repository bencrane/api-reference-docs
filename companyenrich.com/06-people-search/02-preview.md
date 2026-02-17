# People Search - Preview

**POST** `https://api.companyenrich.com/people/search/preview`

**Cost:** FREE - No credits deducted

**Requirements:** Requires Scale plans

> **Notice:** Returns top 10 results only.

Preview search for people based on given criteria. This endpoint returns the top 10 results for free, perfect for previewing search results before running a full search.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
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
| `position` | string \| null | The job position/title of the person |
| `seniority` | enum | The seniority level of the person |
| `department` | enum | The department of the person |
| `image_url` | string \| null | The image URL of the person |

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
     --url https://api.companyenrich.com/people/search/preview \
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
      "position": "string",
      "image_url": "string"
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```