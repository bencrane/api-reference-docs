# TheirStack - Requests - Get Request Count

## Requests

### Get Request Count

Get the number of requests done per day.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v0/requests/count`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Query Parameters

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `start_datetime` | `string` (date-time, nullable) | No | — | Start datetime in ISO format (e.g., 2023-01-01T00:00:00) |
| `end_datetime` | `string` (date-time, nullable) | No | — | End datetime in ISO format (e.g., 2023-01-01T23:59:59) |
| `timezone` | `string` | No | `"UTC"` | IANA timezone string (e.g., 'Europe/Madrid', 'America/New_York') |
| `is_origin_app` | `boolean` (nullable) | No | — | Filter by origin app or api |

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
curl -X GET "https://api.theirstack.com/v0/requests/count" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
[
  {
    "period_start": "2019-08-24T14:15:22Z",
    "number_of_requests": 0
  }
]
```