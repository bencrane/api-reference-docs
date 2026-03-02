# Domain to LinkedIn URL

> **Cost: 1 Credit (on success)**

Retrieve the official LinkedIn Company Page URL associated with a corporate website domain.

## Endpoint

```
POST /v2/enrichment/domain-to-linkedin
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `domain` | string | Yes | `"https://www.blitz-agency.com"` |

### Example Request

```json
{
  "domain": "https://www.blitz-agency.com"
}
```

## Responses

### 200 - OK

```json
{
  "found": true,
  "company_linkedin_url": "https://www.linkedin.com/company/blitz-api"
}
```

### 402 - Payment Required

```json
{
  "message": "Insufficient credits balance"
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