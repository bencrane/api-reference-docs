# TheirStack - Webhooks - Retry Webhook Events

## Webhooks

### Retry Webhook Events

Retry the webhook events. This endpoint is used to retry the webhook events if they failed.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/webhooks/events/retry`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Request Body

`application/json`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_event_ids` | `array<integer>` | Yes | IDs of the webhook events to retry. |

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
curl -X POST "https://api.theirstack.com/v0/webhooks/events/retry" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_event_ids": [
      0
    ]
  }'
```

## Example Response (200)

```json
null
```