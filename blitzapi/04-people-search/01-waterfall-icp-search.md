# Waterfall ICP Search

> **Cost: 1 Credit per result**

Find decision-makers using a hierarchical search logic (e.g., search for C-Level; if not found, cascade to VP level).

## Endpoint

```
POST /v2/search/waterfall-icp-keyword
```

**Base URL:** `https://api.blitz-api.ai`

## Authentication

| Method | Location | Header Name |
|--------|----------|-------------|
| API Key | Header | `x-api-key` |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `company_linkedin_url` | string | Yes | LinkedIn company page URL |
| `cascade` | array | Yes | Array of cascade objects defining hierarchical search tiers |
| `max_results` | number | No | Maximum number of results to return |

### Cascade Object

| Field | Type | Description |
|-------|------|-------------|
| `include_title` | string[] | Job titles to match |
| `exclude_title` | string[] | Job titles to exclude |
| `location` | string[] | Location filter (use `"WORLD"` for global, or country codes like `"US"`, `"CA"`) |
| `include_headline_search` | boolean | Whether to also search LinkedIn headlines |

### Example Request

```json
{
  "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
  "cascade": [
    {
      "include_title": ["Marketing Director", "Head Marketing", "Chief Marketing Officer"],
      "exclude_title": ["assistant", "intern", "product", "junior"],
      "location": ["WORLD"],
      "include_headline_search": false
    },
    {
      "include_title": ["Marketing Manager", "Head Growth", "Growth manager"],
      "exclude_title": ["junior", "assistant", "intern", "hacker"],
      "location": ["WORLD"],
      "include_headline_search": false
    },
    {
      "include_title": ["Communication Director", "Brand Director", "Content Director"],
      "exclude_title": ["junior", "assistant", "intern", "UX", "UI", "Design"],
      "location": ["WORLD"],
      "include_headline_search": false
    },
    {
      "include_title": ["Communication Manager", "Brand Manager", "Content Manager"],
      "exclude_title": ["junior", "assistant", "intern"],
      "location": ["WORLD"],
      "include_headline_search": false
    },
    {
      "include_title": ["Communication", "marketing", "growth", "brand"],
      "exclude_title": ["junior", "assistant", "intern", "product"],
      "location": ["US", "CA"],
      "include_headline_search": true
    },
    {
      "include_title": ["CEO", "founder", "cofounder", "owner", "General Director"],
      "exclude_title": ["junior", "assistant", "intern"],
      "location": ["WORLD"],
      "include_headline_search": false
    }
  ],
  "max_results": 10
}
```

## Responses

### 200 - OK

```json
{
  "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
  "max_results": 6,
  "results_length": 6,
  "results": [
    {
      "person": {
        "first_name": "Melissa",
        "last_name": "Rumor",
        "full_name": "Melissa Rumor",
        "nickname": null,
        "civility_title": null,
        "headline": "Growth & Marketing Manager B2B...",
        "about_me": "At Welcome to the Jungle, we make work actually exciting...",
        "location": {
          "city": "Paris",
          "state_code": null,
          "country_code": "FR",
          "continent": "Europe"
        },
        "linkedin_url": "https://www.linkedin.com/in/melissa-rumor",
        "connections_count": 500,
        "profile_picture_url": "https://media.licdn.com/dms/image/...",
        "experiences": [
          {
            "job_title": "Growth Marketing Manager Welcome to the Jungle (France)",
            "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
            "company_linkedin_id": "0e1c06c9-ad2f-56fe-b36b-f0927aeb261d",
            "job_description": null,
            "job_start_date": "2025-06-01",
            "job_end_date": null,
            "job_is_current": true,
            "job_location": {
              "city": "Paris",
              "state_code": null,
              "country_code": "FR"
            }
          }
        ],
        "education": [
          {
            "degree": "DUT techniques de commercialisation",
            "end_date": "2020-01-01",
            "linkedin_url": "https://www.linkedin.com/school/upecofficiel",
            "organization": "Université Paris-Est Créteil (UPEC)",
            "start_date": "2018-01-01"
          }
        ],
        "skills": [],
        "certifications": []
      },
      "icp": 2,
      "ranking": 1,
      "what_matched": [
        {
          "value": "Growth Marketing Manager Welcome to the Jungle (France)",
          "key": "job_title"
        }
      ]
    }
  ]
}
```

#### Result Fields

| Field | Description |
|-------|-------------|
| `person` | Full person profile (same schema as other enrichment endpoints) |
| `icp` | Which cascade tier matched (1-indexed) |
| `ranking` | Result ranking position |
| `what_matched` | Array showing which fields matched and the matched values |

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