# TheirStack - Account - Get Credits Consumption

Get the API records returned per day.

```
GET https://api.theirstack.com/v0/teams/credits_consumption
```

## Authorization

```
Authorization: Bearer <token>
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `start_datetime` | string (nullable, date-time) | — | Start datetime in ISO format (e.g., `2023-01-01T00:00:00`). |
| `end_datetime` | string (nullable, date-time) | — | End datetime in ISO format (e.g., `2023-01-01T23:59:59`). |
| `timezone` | string | `"UTC"` | IANA timezone string (e.g., `Europe/Madrid`, `America/New_York`). |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/teams/credits_consumption" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
[
  {
    "period_start": "2019-08-24T14:15:22Z",
    "api_credits_consumed": 0,
    "ui_credits_consumed": 0
  }
]
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |