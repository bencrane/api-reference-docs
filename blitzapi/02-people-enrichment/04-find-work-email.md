# Find Work Email

> **Cost: 1 Credit (on success)**

Find verified work email addresses (including catch-all status) for a specific person using their LinkedIn profile URL.

## Endpoint

```
POST /v2/enrichment/email
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
  "email": "antoine@blitz-agency.com",
  "all_emails": [
    {
      "email": "antoine@blitz-agency.com",
      "job_order_in_profile": 1,
      "company_linkedin_url": "https://www.linkedin.com/company/blitz-api",
      "email_domain": "blitz-agency.com"
    }
  ]
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