# Geo - Search Cities

**POST** `https://api.companyenrich.com/geo/cities`

Searches cities by name or country codes. Returns up to 100 cities per page.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `query` | string \| null | Search query for city name |
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
| `id` | int32 | The ID of the city |
| `name` | string | The name of the city |
| `latitude` | float \| null | The latitude of the city |
| `longitude` | float \| null | The longitude of the city |

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
     --url https://api.companyenrich.com/geo/cities \
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
      "latitude": 0,
      "longitude": 0
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```