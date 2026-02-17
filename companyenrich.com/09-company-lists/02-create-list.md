# Company Lists - Create List

**POST** `https://api.companyenrich.com/lists/companies`

**Cost:**
- For search: 1 credit per company returned. 1 credit if no results are found.
- For similar: 5 credits per company returned. 5 credits if no results are found.

Creates a new list based on a search or similar company request. Up to first 5,000 results can be selected to be added to the list. If no companies are found, the list is not created.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `name` | string (required) | The name of the list |
| `count` | int32 (required) | The number of companies to add to the list |
| `search` | object \| null | The company search input. Either Search or Similar must be provided, but not both |
| `similar` | object \| null | The similar company search input. Either Search or Similar must be provided, but not both |

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
curl --request POST \
     --url https://api.companyenrich.com/lists/companies \
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