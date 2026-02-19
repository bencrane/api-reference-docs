# TheirStack - Saved Searches - Archive Saved Search

## Saved Searches

### Archive Saved Search

Archive a saved search.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `PATCH /v0/saved_searches/{search_id}/archive`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search_id` | `integer` | Yes | The ID of the saved search |

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
curl -X PATCH "https://api.theirstack.com/v0/saved_searches/0/archive" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
{
  "property1": "string",
  "property2": "string"
}
```