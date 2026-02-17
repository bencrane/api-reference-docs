# Company Lists - Delete List

**DELETE** `https://api.companyenrich.com/lists/companies/{id}`

Deletes a list and all its entries.

---

## Path Params

| Parameter | Type | Description |
|---|---|---|
| `id` | uuid (required) | The unique identifier of the list |

## Headers

| Header | Type | Default |
|---|---|---|
| `accept` | string (enum) | `application/json` |

Allowed: `application/json`, `application/problem+json`

---

## Responses

### 200 OK

**Response Body:** `boolean`

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
curl --request DELETE \
     --url https://api.companyenrich.com/lists/companies/id \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
true
```