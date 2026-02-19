# TheirStack - Webhooks - Get Aggregated Webhook Event Count

## Webhooks

### Get Aggregated Webhook Event Count

Get the webhook events count aggregated by day with grouping options.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/webhooks/events/count`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `start_datetime` | `string` (date-time) | `"2026-01-20T16:53:54.485418Z"` | Start datetime in ISO format (e.g., 2023-01-01T00:00:00) |
| `end_datetime` | `string` (date-time) | `"2026-02-19T16:53:54.485458Z"` | End datetime in ISO format (e.g., 2023-01-01T23:59:59) |
| `timezone` | `string` | `"UTC"` | IANA timezone string (e.g., 'Europe/Madrid', 'America/New_York') |
| `webhook_id` | `integer` (nullable) | — | Webhook ID |
| `group_by` | `string` | `"status"` | How to group the results. Values: `status`, `webhook_id` |

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
curl -X GET "https://api.theirstack.com/v0/webhooks/events/count" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
[
  {
    "period_start": "2019-08-24T14:15:22Z",
    "number_of_events": 0,
    "status": "IN_PROGRESS",
    "webhook_id": 0,
    "number_of_executions": 0
  }
]
```