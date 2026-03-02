# Find Mobile & Direct Phone

> **Cost: 5 Credits (on success)**

Locate a verified mobile or direct business line for a specific person using their LinkedIn profile URL.

## Endpoint

```
POST /v2/enrichment/phone
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `person_linkedin_url` | string | Yes | `"https://www.linkedin.com/in/antoine-blitz-5581b7373"` |

### Example Request

```json
{
  "person_linkedin_url": "https://www.linkedin.com/in/antoine-blitz-5581b7373"
}
```

## Responses

### 200 - OK

```json
{
  "found": true,
  "phone": "+1234567890"
}
```

### 401 - Unauthorized

```json
{
  "message": "Missing API key, please provide a valid API key in the 'x-api-key' header"
}
```

### 402 - Payment Required

```json
{
  "message": "Insufficient credits balance"
}
```

### 500 - Internal Server Error

```json
{
  "success": false,
  "message": "this is a controlled error. created at 2025-07-11T10:20:00.000Z"
}
```