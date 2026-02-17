# Company Enrichment - Autocomplete

## Endpoint

```
GET https://api.companyenrich.com/companies/autocomplete
```

**Cost:** FREE — No credits deducted

Returns a list of companies matching the given partial domain name. Useful for autocompleting domain names in your application. Up to 10 companies are returned per request.

---

## Query Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `query`   | string | Yes      | The query to autocomplete |

## Headers

| Header          | Type   | Default            | Allowed Values                                 |
|-----------------|--------|--------------------|------------------------------------------------|
| `accept`        | string | `application/json` | `application/json`, `application/problem+json` |
| `Authorization` | string | —                  | `Bearer <API_KEY>`                             |

---

## Example Request

```bash
curl --request GET \
     --url 'https://api.companyenrich.com/companies/autocomplete?query=goog' \
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
| 422    | Unprocessable Entity |
| 429    | Too Many Requests    |

---

## 200 Response Body

Returns an **array of objects** (up to 10).

| Field     | Type           | Required | Description |
|-----------|----------------|----------|-------------|
| `domain`  | string         | Yes      | The domain of the company |
| `name`    | string \| null | No       | The name of the company |
| `logoUrl` | string \| null | No       | The URL to the company logo |

---

## Example Response

```json
[
  {
    "domain": "string",
    "name": "string",
    "logoUrl": "string"
  }
]
```