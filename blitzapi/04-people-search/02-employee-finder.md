# Employee Finder

> **Cost: 1 Credit per result**

Search for specific employees within a company by filtering on job title, department, level, and location.

## Endpoint

```
POST /v2/search/employee-finder
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
| `country_code` | string[] | No | Filter by country codes (e.g. `["US", "FR"]`) |
| `continent` | string[] | No | Filter by continent |
| `sales_region` | string[] | No | Filter by sales region |
| `job_level` | string[] | No | Filter by job level |
| `job_function` | string[] | No | Filter by job function/department |
| `min_connections_count` | number | No | Minimum LinkedIn connections (0–500) |
| `max_results` | number | No | Maximum number of results to return |
| `page` | number | No | Page number for pagination |

### Allowed Values

**continent:** `Africa`, `Antarctica`, `Asia`, `Europe`, `North America`, `Oceania`, `South America`

**sales_region:** `NORAM`, `LATAM`, `EMEA`, `APAC`

**job_level:** `C-Team`, `Director`, `Manager`, `Other`, `Staff`, `VP`

**job_function:** `Advertising & Marketing`, `Art, Culture and Creative Professionals`, `Construction`, `Customer/Client Service`, `Education`, `Engineering`, `Finance & Accounting`, `General Business & Management`, `Healthcare & Human Services`, `Human Resources`, `Information Technology`, `Legal`, `Manufacturing & Production`, `Operations`, `Other`, `Public Administration & Safety`, `Purchasing`, `Research & Development`, `Sales & Business Development`, `Science`, `Supply Chain & Logistics`, `Writing/Editing`

### Example Request

```json
{
  "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
  "country_code": ["US", "FR"],
  "job_level": ["Manager", "Director"],
  "job_function": ["Advertising & Marketing"],
  "min_connections_count": 200,
  "max_results": 3,
  "page": 1
}
```

## Responses

### 200 - OK

```json
{
  "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
  "max_results": 3,
  "results_length": 3,
  "page": 1,
  "total_pages": 82,
  "results": [
    {
      "first_name": "Hélène",
      "last_name": "Pillon",
      "full_name": "Hélène Pillon",
      "nickname": null,
      "civility_title": null,
      "headline": "Journaliste freelance",
      "about_me": "Depuis Marseille, je travaille pour différents médias...",
      "location": {
        "city": null,
        "state_code": null,
        "country_code": "FR",
        "continent": "Europe"
      },
      "linkedin_url": "https://www.linkedin.com/in/h%c3%a9l%c3%a8ne-pillon-2a57155a",
      "connections_count": 361,
      "profile_picture_url": "https://media.licdn.com/dms/image/...",
      "experiences": [
        {
          "job_title": "Journaliste Indépendante",
          "company_linkedin_url": "https://www.linkedin.com/company/wttj-fr",
          "company_linkedin_id": "0e1c06c9-ad2f-56fe-b36b-f0927aeb261d",
          "job_description": "Rédaction de portraits pour le site web",
          "job_start_date": "2019-12-01",
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
  ]
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