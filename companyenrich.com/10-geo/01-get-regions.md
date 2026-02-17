# Geo - Get Regions

**GET** `https://api.companyenrich.com/geo/regions`

Returns all regions.

---

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

#### Item Object

| Field | Type | Description |
|---|---|---|
| `id` | string | The ID of the region |
| `parentId` | string \| null | The ID of the parent region |
| `name` | string | The name of the region |
| `countries` | array of strings | The countries in the region |

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
curl --request GET \
     --url https://api.companyenrich.com/geo/regions \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "items": [
    {
      "id": "string",
      "parentId": "string",
      "name": "string",
      "countries": [
        "string"
      ]
    }
  ]
}
```