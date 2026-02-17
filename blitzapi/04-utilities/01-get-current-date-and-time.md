# Get Current Date and Time

> **Cost: 0 Credits**

Retrieve the current server date and time for a specific timezone to synchronize your requests.

## Endpoint

```
POST /v2/utilities/current-date
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `region` | string | Yes | `"America/New_York"` |

### Example Request

```json
{
  "region": "America/New_York"
}
```

## Responses

### 200 - OK

```json
{
  "datetime": "2026-01-08 12:00:00 -05:00",
  "timestamp": 1736385600,
  "timezone": "America/New_York",
  "timezone_name": "(GMT-05:00) New York"
}
```

### 422 - Unprocessable Entity

```json
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Missing required fields"
  }
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "message": "this is a controlled error. created at 2025-07-11T10:20:00.000Z"
}
```