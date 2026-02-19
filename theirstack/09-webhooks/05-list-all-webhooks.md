# TheirStack - Webhooks - List All Webhooks

## Webhooks

### List All Webhooks

List all webhooks of your team. It won't return archived webhooks.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/webhooks`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

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
curl -X GET "https://api.theirstack.com/v0/webhooks" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
[
  {
    "url": "https://example.com/webhook",
    "search_id": 123,
    "description": "Webhook for new jobs",
    "listening_start_time": "2024-01-01T00:00:00",
    "trigger_once_per_company": true,
    "id": 0,
    "user_id": 0,
    "team_id": 0,
    "is_active": true,
    "is_archived": true,
    "created_at": "2019-08-24T14:15:22Z",
    "updated_at": "2019-08-24T14:15:22Z",
    "search_name": "string",
    "event_type": "job_new",
    "scanning_frequency": "10m"
  }
]
```