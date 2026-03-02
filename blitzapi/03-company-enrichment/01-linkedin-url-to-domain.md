# LinkedIn URL to Domain

> **Cost: 0.5 Credits (on success)**

Extract the primary verified email domain pattern associated with a Company LinkedIn URL.

## Endpoint

```
POST /v2/enrichment/linkedin-to-domain
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `company_linkedin_url` | string | Yes | `"https://www.linkedin.com/company/blitz-api"` |

### Example Request

```json
{
  "company_linkedin_url": "https://www.linkedin.com/company/blitz-api"
}
```

## Responses

### 200 - OK

```json
{
  "found": true,
  "email_domain": "blitz-agency.com"
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