# Company Enrichment

> **Cost: 1 Credit (on success)**

Enrich a company profile from its LinkedIn URL.

## Endpoint

```
POST /v2/enrichment/company
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
  "company": {
    "linkedin_url": "https://www.linkedin.com/company/blitz-api",
    "linkedin_id": 108037802,
    "name": "Blitzapi",
    "about": "BlitzAPI provides enriched B2B data access through a suite of flexible and high-performance APIs...",
    "specialties": null,
    "industry": "Technology; Information and Internet",
    "type": "Privately Held",
    "size": "1-10",
    "employees_on_linkedin": 3,
    "followers": 6,
    "founded_year": null,
    "hq": {
      "city": "Paris",
      "state": null,
      "postcode": null,
      "country_code": "FR",
      "country_name": "France",
      "region": null,
      "continent": null,
      "street": null
    },
    "domain": "blitz-api.ai",
    "website": "https://blitz-api.ai"
  }
}
```

### 401 - Unauthorized

```json
{
  "success": false,
  "message": "Invalid API key, please provide a valid API key in the 'x-api-key' header"
}
```

### 404 - Not Found

```json
{
  "success": false,
  "message": "Not Found"
}
```

### 429 - Too Many Requests

```json
{
  "success": false,
  "message": "Rate limit exceeded, please try again later"
}
```