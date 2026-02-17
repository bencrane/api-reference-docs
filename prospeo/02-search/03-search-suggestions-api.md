# Search Suggestions API

This endpoint retrieves suggestions for job titles or locations to use in search filters for the Search Person or Search Company APIs.

Use this to find valid values for `person_location`, `company_location`, or `person_job_title` filters.

> **This endpoint is FREE and does not consume any credits.**

## Rate Limit

Special rate limit: **15 requests/second** per account (same across all plans).

## Endpoint

| | |
|---|---|
| **URL** | `https://api.prospeo.io/search-suggestions` |
| **Method** | `POST` |
| **Headers** | `X-KEY: your_api_key` / `Content-Type: application/json` |

## Parameters

You must provide **exactly one** of the following. Providing both or neither will result in an error.

| Parameter | Example | Description |
|-----------|---------|-------------|
| `location_search` *(optional)* | `united states` | Search query for location suggestions. Minimum 2 characters. |
| `job_title_search` *(optional)* | `software engineer` | Search query for job title suggestions. Minimum 2 characters. |

## Example Requests

**Location search:**

```bash
curl --location 'https://api.prospeo.io/search-suggestions' \
--header 'X-KEY: your_api_key' \
--header 'Content-Type: application/json' \
--data '{
    "location_search": "united states"
}'
```

**Job title search:**

```bash
curl --location 'https://api.prospeo.io/search-suggestions' \
--header 'X-KEY: your_api_key' \
--header 'Content-Type: application/json' \
--data '{
    "job_title_search": "software engineer"
}'
```

## Response: Location Search

```json
{
    "error": false,
    "location_suggestions": [
        {"name": "United States", "type": "COUNTRY"},
        {"name": "California, United States", "type": "STATE"},
        {"name": "Los Angeles, California, United States", "type": "CITY"},
        {"name": "Greater Los Angeles Area", "type": "ZONE"}
    ],
    "job_title_suggestions": null
}
```

### Location Types

| Type | Description | Examples |
|------|-------------|----------|
| `COUNTRY` | Countries | "United States", "France", "Germany" |
| `STATE` | States, provinces, or regions | "California", "Ontario", "Bavaria" |
| `CITY` | Cities | "New York", "Paris", "Tokyo" |
| `ZONE` | Metropolitan or greater areas | "Greater Toronto Area", "San Francisco Bay Area" |

## Response: Job Title Search

```json
{
    "error": false,
    "location_suggestions": null,
    "job_title_suggestions": [
        "software engineer",
        "senior software engineer",
        "software engineering manager",
        "software developer",
        "lead software engineer"
    ]
}
```

Returns up to 25 results, ordered by popularity (most common titles first).

## Response Details

| Property | Type | Description |
|----------|------|-------------|
| `error` | boolean | `false` if successful, `true` if error (with `error_code`). |
| `location_suggestions` | list \| null | Location suggestions when using `location_search`. Each item has `name` and `type`. `null` when searching job titles. |
| `job_title_suggestions` | list \| null | Job title suggestions when using `job_title_search`. Plain strings. `null` when searching locations. |

## Error Codes

| HTTP Code | `error_code` | Meaning |
|-----------|-------------|---------|
| `400` | `INVALID_REQUEST` | Must provide exactly one of `location_search` or `job_title_search`, and query must be ≥ 2 characters. |
| `401` | `INVALID_API_KEY` | Invalid API key — check `X-KEY` header. |
| `429` | `RATE_LIMITED` | Rate limit hit (15 req/sec). |
| `400` | `INTERNAL_ERROR` | Server-side error — contact support. |