# TheirStack - Webhooks - Test Webhook URL

## Webhooks

### Test Webhook Url

This endpoint is used to test the webhook before creating it. It will send a test event to the webhook URL.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/webhooks/test`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Request Body

`application/json`

| Parameter | Type | Required | Description |
|---|---|---|---|
| `url` | `string` (uri, 1-2083 chars) | Yes | — |
| `event_type` | `string` | Yes | Values: `job_new`, `company_new` |

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
curl -X POST "https://api.theirstack.com/v0/webhooks/test" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "http://example.com",
    "event_type": "job_new"
  }'
```

## Example Response (200)

```json
{
  "status": 0,
  "message": "string"
}
```