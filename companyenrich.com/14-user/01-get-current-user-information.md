# User - Get Current User Information

**GET** `https://api.companyenrich.com/me`

**Cost:** FREE - No credits deducted

Returns information about the authenticated user, including their API key, credit balance, and account capabilities. This endpoint requires authentication via an API key in the Authorization header.

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

| Field | Type | Required |
|---|---|---|
| `userId` | uuid | yes |
| `credits` | object | yes |
| `capabilities` | object | yes |

#### Credits Object

| Field | Type | Required |
|---|---|---|
| `used` | int32 | yes |
| `total` | int32 | yes |

#### Capabilities Object

| Field | Type | Required |
|---|---|---|
| `lists` | boolean | yes |
| `previews` | boolean | yes |
| `companySearchLimit` | int32 | yes |
| `companySearchAsyncLimit` | int32 | yes |
| `peopleSearchLimit` | int32 | yes |

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
     --url https://api.companyenrich.com/me \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "credits": {
    "used": 0,
    "total": 0
  },
  "capabilities": {
    "lists": true,
    "previews": true,
    "companySearchLimit": 0,
    "companySearchAsyncLimit": 0,
    "peopleSearchLimit": 0
  }
}
```