# TheirStack - Company Lists - Remove Companies from List

## Company Lists

### Remove Companies From List

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/company_lists/{list_id}/remove_companies`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `list_id` | `integer` | Yes | — |

---

## Request Body

`application/json`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `company_ids` | `array<string>` | `[]` | Company names to remove from the list |

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
curl -X POST "https://api.theirstack.com/v0/company_lists/0/remove_companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
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