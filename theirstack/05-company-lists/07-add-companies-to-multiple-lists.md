# TheirStack - Company Lists - Add Companies to Multiple Lists

## Company Lists

### Add Companies To Multiple Lists

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/company_lists/add_companies`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Request Body

`application/json`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `list_ids` | `array<integer>` | `[]` | List ids to add companies to |
| `company_ids` | `array<string>` | `[]` | Company IDs (encrypted slugs) to add to the list |

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
curl -X POST "https://api.theirstack.com/v0/company_lists/add_companies" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Example Response (200)

```json
null
```