# TheirStack - Company Lists - Create Company List

## Company Lists

### Create Company List

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/company_lists`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Request Body

`application/json`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Name of the company list |

---

## Response Body

| Status | Content Type |
|---|---|
| 200 | `application/json` |
| 400 | `application/json` |
| 402 | `application/json` |
| 422 | `application/json` |
| 500 | `application/json` |

---

## Example Request (cURL)

```bash
curl -X POST "https://api.theirstack.com/v0/company_lists" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "string"
  }'
```

## Example Response (200)

```json
{
  "name": "string",
  "id": 0,
  "created_at": "2019-08-24T14:15:22Z",
  "deletable": true,
  "companies_count": 0,
  "user_id": 0,
  "type": "REVEALED_COMPANIES",
  "webhook_id": 0
}
```