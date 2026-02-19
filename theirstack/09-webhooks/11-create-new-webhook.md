# TheirStack - Webhooks - Create New Webhook

## Webhooks

### Create New Webhook

Create a new webhook to listen to events from a saved search.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v0/webhooks`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Request Body

`application/json`

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `url` | `string` (uri, 1-2083 chars) | Yes | — | URL of the webhook |
| `search_id` | `integer` | Yes | — | ID of the search that the webhook is listening to. |
| `description` | `string` (nullable) | No | — | Description of the webhook |
| `listening_start_time` | `string` (date-time, nullable) | No | — | Date when the webhook started listening for events. If null, the webhook will listen to all events matching the search query regardless of when they occurred. |
| `trigger_once_per_company` | `boolean` | No | `false` | Only for webhook type='job.new'. If true, Company A with 5 jobs → 1 event triggered. If false, Company A with 5 jobs → 5 events triggered. |

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
curl -X POST "https://api.theirstack.com/v0/webhooks" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/webhook",
    "search_id": 123
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