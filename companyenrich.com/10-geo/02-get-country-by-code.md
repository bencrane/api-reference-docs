# Geo - Get Country by Code

**GET** `https://api.companyenrich.com/geo/countries/{countryCode}`

Searches a country by its ISO 3166-1 alpha-2 code.

---

## Path Params

| Parameter | Type | Description |
|---|---|---|
| `countryCode` | string (required) | The ISO 3166-1 alpha-2 country code |

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
| `code` | string | The ISO 3166-1 alpha-2 code of the country |
| `name` | string | The name of the country |
| `latitude` | float \| null | The latitude of the country |
| `longitude` | float \| null | The longitude of the country |

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
curl --request GET \
     --url https://api.companyenrich.com/geo/countries/countryCode \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "code": "string",
  "name": "string",
  "latitude": 0,
  "longitude": 0
}
```