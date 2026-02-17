# Company Lists - Update List

**PUT** `https://api.companyenrich.com/lists/companies/{id}`

Updates a list's properties.

---

## Path Params

| Parameter | Type | Description |
|---|---|---|
| `id` | uuid (required) | The unique identifier of the list |

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `name` | string (required) | The new name for the list |

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
| `id` | uuid | yes |
| `name` | string | yes |
| `createdAt` | date-time | yes |
| `originalCount` | int32 | yes |
| `type` | enum | yes |

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
curl --request PUT \
     --url https://api.companyenrich.com/lists/companies/id \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

## Example Response

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "createdAt": "2026-02-17T01:41:11.850Z",
  "originalCount": 0
}
```