# TheirStack - Webhooks - Get Webhook Event Count

## Webhooks

### Get Webhook Event Count

Get the total number of events triggered for a specific webhook.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/webhooks/{webhook_id}/events/count`

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
curl -X GET "https://api.theirstack.com/v0/webhooks/123/events/count" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
0
```