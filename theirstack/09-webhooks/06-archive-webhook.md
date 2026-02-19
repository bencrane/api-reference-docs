# TheirStack - Webhooks - Archive Webhook

## Webhooks

### Archive Webhook

Archive a webhook.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `PATCH /v0/webhooks/{webhook_id}/archive`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_id` | `integer` | Yes | ID of the webhook |

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
curl -X PATCH "https://api.theirstack.com/v0/webhooks/123/archive" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
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
```