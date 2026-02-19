# TheirStack - Webhooks - Enable / Disable a Webhook

## Webhooks

### Enable/Disable A Webhook

By disabling a webhook, it will stop listening to events. When you enable a webhook, it will process all the events that have not been processed yet since you disabled it.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `PATCH /v0/webhooks/{webhook_id}/status`

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

## Request Body

`application/json`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `is_active` | `boolean` | Yes | — |

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
curl -X PATCH "https://api.theirstack.com/v0/webhooks/123/status" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "is_active": true
  }'
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