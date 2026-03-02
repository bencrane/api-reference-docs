# Reverse Email Lookup

> **Cost: 1 Credit (on success)**

Identify a professional and retrieve their full profile starting from a verified work email address.

## Endpoint

```
POST /v2/enrichment/email-to-person
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `email` | string | Yes | `"antoine@blitz-agency.com"` |

### Example Request

```json
{
  "email": "antoine@blitz-agency.com"
}
```

## Responses

### 200 - OK

```json
{
  "found": true,
  "person": {
    "person": {
      "first_name": "Antoine",
      "last_name": "Blitz",
      "full_name": "Antoine Blitz",
      "nickname": null,
      "civility_title": null,
      "headline": "Founder @BlitzAPI — B2B Data APIs for Prospecting, Enrichment & Personalization at Scale | GTME",
      "about_me": "I build developer-first tools for scalable, intelligent B2B prospecting...",
      "location": {
        "city": null,
        "state_code": "NY",
        "country_code": "US",
        "continent": "North America"
      },
      "linkedin_url": "https://www.linkedin.com/in/antoine-blitz-5581b7373",
      "connections_count": 500,
      "profile_picture_url": "https://media.licdn.com/dms/image/...",
      "experiences": [
        {
          "job_title": "Founder Blitzapi",
          "company_linkedin_url": "https://www.linkedin.com/company/blitz-api",
          "company_linkedin_id": "be578414-239f-522e-b2e1-9246e22a52d1",
          "job_description": "We help GTM teams win faster by making high-quality B2B data and intent signals instantly available...",
          "job_start_date": "2025-05-01",
          "job_end_date": null,
          "job_is_current": true,
          "job_location": {
            "city": null,
            "state_code": null,
            "country_code": null
          }
        }
      ],
      "education": [],
      "skills": [],
      "certifications": []
    }
  }
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