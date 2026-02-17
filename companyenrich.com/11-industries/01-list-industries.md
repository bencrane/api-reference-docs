# Industries - List Industries

**GET** `https://api.companyenrich.com/industries`

Obtain a list of all company industries.

---

## Headers

| Header | Type | Default |
|---|---|---|
| `accept` | string (enum) | `application/json` |

Allowed: `application/json`, `application/problem+json`

---

## Responses

### 200 OK

#### Response Body (array of objects)

| Field | Type | Description |
|---|---|---|
| `name` | string (required) | Name of the industry |
| `naicsCodes` | array of int32s (required) | NAICS code prefixes associated with the industry |

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
     --url https://api.companyenrich.com/industries \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
[
  {
    "name": "string",
    "naicsCodes": [
      0
    ]
  }
]
```