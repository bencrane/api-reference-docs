# Geo - Search States

**POST** `https://api.companyenrich.com/geo/states`

Searches states by name or country codes. Returns up to 100 states per page.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `query` | string \| null | Search query for state name |
| `countryCodes` | array of strings \| null | Country codes to filter by |
| `page` | int32 | Page number |

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
| `id` | int32 | The ID of the state |
| `name` | string | The name of the state |
| `code` | string \| null | The ISO 3166-2 code of the state |
| `latitude` | float \| null | The latitude of the state |
| `longitude` | float \| null | The longitude of the state |

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
     --url https://api.companyenrich.com/geo/states \
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
      "code": "string",
      "latitude": 0,
      "longitude": 0
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```