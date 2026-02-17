# Enrich Person API

This endpoint allows you to enrich a person with their complete accurate B2B profile data, email address and mobile.

> **Tip:** When possible, use the Bulk Enrich Person endpoint instead for faster response time. It allows you to enrich up to 50 persons at once.

## How Are Credits Spent?

- Enriching a person record costs **1 credit** per match (person data + company data + free email).
- Enriching a person record with a mobile costs **10 credits** per match.
- You can control when you spend credits: only for verified email, only for records with a mobile, etc.
- You won't be charged if no results are found.
- You won't be charged if you enrich the same record twice in the lifetime of your account.

## Endpoint

| | |
|---|---|
| **URL** | `https://api.prospeo.io/enrich-person` |
| **Method** | `POST` |
| **Headers** | `X-KEY: your_api_key` / `Content-Type: application/json` |

## Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `only_verified_email` *(optional)* | `true` | Only return records with a verified email. Default is `false`. |
| `enrich_mobile` *(optional)* | `true` | Enrich the mobile (if it exists). |
| `only_verified_mobile` *(optional)* | `true` | Only return records with a mobile. Default is `false`. If `true`, `enrich_mobile` will automatically be `true`. |
| `data` *(required)* | See below | The person to enrich. |

## Data Parameter

The `data` parameter contains the datapoints to identify the person:

| Datapoint | Example | Description |
|-----------|---------|-------------|
| `first_name` *(optional)* | `Roger` | The first name of the person |
| `last_name` *(optional)* | `Sterling` | The last name of the person |
| `full_name` *(optional)* | `Roger Sterling` | The full name of the person |
| `linkedin_url` *(optional)* | `https://www.linkedin.com/in/roger-sterling` | The person's public LinkedIn URL |
| `email` *(optional)* | `roger.sterling@deloitte.com` | The work email of the person |
| `company_name` *(optional)* | `Deloitte` | The company name |
| `company_website` *(optional)* | `deloitte.com` | The company website |
| `company_linkedin_url` *(optional)* | `https://linkedin.com/company/deloitte` | The company's public LinkedIn URL |
| `person_id` *(optional)* | `6f745841665155f554e5f` | ID of the person from the Search Person API |

## Minimum Requirements for Matching

At minimum, one of the following combinations is required:

- `first_name` + `last_name` + any of (`company_name` / `company_website` / `company_linkedin_url`)
- `full_name` + any of (`company_name` / `company_website` / `company_linkedin_url`)
- `linkedin_url`
- `email`
- `person_id` (enrich from Search Person API)

> **Note #1:** Strongly avoid using only `company_name` for matching — many companies share the same name. Use `company_website` whenever possible.

> **Note #2:** The more datapoints you submit, the better the accuracy. Submit everything you have.

## Enrich Records from Search API

Use the `person_id` from Search Person API results to enrich records via this endpoint. This will identify the person and enrich per your options (`only_verified_email`, `only_verified_mobile`, `enrich_mobile`).

## Example Request

```
POST "https://api.prospeo.io/enrich-person"
X-KEY: "your_api_key"
Content-Type: "application/json"

{
   "data": {
       "first_name": "Eva",
       "last_name": "Kiegler",
       "company_name": "Intercom",
       "company_website": "intercom.com",
       "company_linkedin_url": "https://www.linkedin.com/company/intercom"
   }
}
```

## Response

Each response contains a `person` and `company` object. The `company` object contains the detail of the current company the lead works at. If the lead has no current job, this field can be `null`. When a field is unavailable, it will be `null`.

```json
{
    "error": false,
    "free_enrichment": false,
    "person": {
        "person_id": "aaaacd817619fba3d254cd64",
        "first_name": "Eoghan",
        "last_name": "Mccabe",
        "full_name": "Eoghan Mccabe",
        "linkedin_url": "https://www.linkedin.com/in/eoghanmccabe",
        "current_job_title": "CEO, chairman, and co-founder",
        "current_job_key": null,
        "headline": "CEO and founder at Intercom, building Fin.ai",
        "linkedin_member_id": null,
        "last_job_change_detected_at": null,
        "job_history": [
            {
                "title": "CEO, chairman, and co-founder",
                "company_name": "Intercom",
                "logo_url": "9ded0364-c88a-4789-9d39-2a15ed239edb.jpg",
                "current": true,
                "start_year": 2022,
                "start_month": 10,
                "end_year": null,
                "end_month": null,
                "duration_in_months": 39,
                "departments": ["Founder", "Chief Executive"],
                "seniority": "C-Suite",
                "company_id": "cccc7c7da6116a8830a07100",
                "job_key": "82981650"
            },
            {
                "title": "Chairman and co-founder",
                "company_name": "Intercom",
                "logo_url": "9ded0364-c88a-4789-9d39-2a15ed239edb.jpg",
                "current": false,
                "start_year": 2020,
                "start_month": 7,
                "end_year": 2022,
                "end_month": 10,
                "duration_in_months": 27,
                "departments": ["Founder"],
                "seniority": "Founder/Owner",
                "company_id": "cccc7c7da6116a8830a07100",
                "job_key": "23054356"
            },
            {
                "title": "CEO and co-founder",
                "company_name": "Intercom",
                "logo_url": "9ded0364-c88a-4789-9d39-2a15ed239edb.jpg",
                "current": false,
                "start_year": 2011,
                "start_month": 8,
                "end_year": 2020,
                "end_month": 7,
                "duration_in_months": 107,
                "departments": ["Founder", "Chief Executive"],
                "seniority": "C-Suite",
                "company_id": "cccc7c7da6116a8830a07100",
                "job_key": "68686694"
            },
            {
                "title": "CEO",
                "company_name": "Exceptional",
                "logo_url": "2588d75e-d2e7-4fb1-bf31-35cafd119ec0.jpg",
                "current": false,
                "start_year": 2008,
                "start_month": 10,
                "end_year": 2011,
                "end_month": 7,
                "duration_in_months": 33,
                "departments": ["Chief Executive"],
                "seniority": "C-Suite",
                "company_id": "ccccd431f3dfa7e88993bb18",
                "job_key": "80900834"
            },
            {
                "title": "CEO",
                "company_name": "Contrast",
                "logo_url": "d4bbee3f-7128-436d-a474-fcac68b989e4.jpg",
                "current": false,
                "start_year": 2007,
                "start_month": 12,
                "end_year": 2011,
                "end_month": 7,
                "duration_in_months": 43,
                "departments": ["Chief Executive"],
                "seniority": "C-Suite",
                "company_id": "ccccf3e7f023592ee266a9d8",
                "job_key": "72014547"
            }
        ],
        "mobile": {
            "status": "VERIFIED",
            "revealed": false,
            "mobile": "+1 415-3**-****",
            "mobile_national": "(415) 3**-****",
            "mobile_international": "+1 415-3**-****",
            "mobile_country": "United States",
            "mobile_country_code": "US"
        },
        "email": {
            "status": "VERIFIED",
            "revealed": true,
            "email": "eoghan.*****@intercom.com",
            "verification_method": "BOUNCEBAN",
            "email_mx_provider": "Google"
        },
        "location": {
            "country": "United States",
            "country_code": "US",
            "state": "California",
            "city": "San Francisco",
            "time_zone": "America/Los_Angeles",
            "time_zone_offset": -7.0
        },
        "skills": []
    },
    "company": {
        "company_id": "cccc7c7da6116a8830a07100",
        "name": "Intercom",
        "website": "https://intercom.com",
        "domain": "intercom.io",
        "other_websites": [],
        "description": "Intercom is the only complete AI-first customer service platform...",
        "description_seo": "Intercom is the complete AI-first customer service solution...",
        "description_ai": "Intercom is an AI-first customer service solution...",
        "type": "Private",
        "industry": "Software Development",
        "employee_count": 1822,
        "employee_range": "1001-2000",
        "location": {
            "country": "United States",
            "country_code": "US",
            "state": "California",
            "city": "San Francisco",
            "raw_address": "55 2nd Street, 4th Floor, San Francisco, California 94105, US"
        },
        "sic_codes": ["737"],
        "naics_codes": [],
        "email_tech": {
            "domain": "intercom.io",
            "mx_provider": "Google"
        },
        "linkedin_url": "https://www.linkedin.com/company/intercom",
        "twitter_url": "https://x.com/intercom",
        "facebook_url": "https://www.facebook.com/intercominc",
        "crunchbase_url": "https://www.crunchbase.com/organization/intercom",
        "instagram_url": "https://www.instagram.com/intercom",
        "youtube_url": "https://www.youtube.com/c/@intercominc",
        "phone_hq": {
            "phone_hq": "+14156733820",
            "phone_hq_national": "(415) 673-3820",
            "phone_hq_international": "+14156733820",
            "phone_hq_country": "United States",
            "phone_hq_country_code": "US"
        },
        "linkedin_id": null,
        "founded": 2011,
        "revenue_range": {
            "min": 100000000,
            "max": 250000000
        },
        "revenue_range_printed": "100M",
        "keywords": [
            "Customer Support", "Live Chat", "Marketing Automation",
            "Customer Relationship Management", "Customer Experience",
            "Customer Engagement", "Customer Service", "Mobile",
            "Customer Feedback", "AI", "Helpdesk", "CX",
            "Chat Bots", "Customer Communication",
            "Support Automation", "Shared Inbox"
        ],
        "logo_url": "https://prospeo-static-assets.s3.us-east-1.amazonaws.com/company_logo/9ded0364-c88a-4789-9d39-2a15ed239edb.jpg",
        "attributes": {
            "is_b2b": true,
            "has_demo": false,
            "has_free_trial": true,
            "has_downloadable": false,
            "has_mobile_apps": false,
            "has_online_reviews": true,
            "has_pricing": true
        },
        "funding": {
            "count": 2,
            "total_funding": 125000000,
            "total_funding_printed": "$125.0M",
            "latest_funding_date": "2021-01-01T00:00:00",
            "latest_funding_stage": "Series unknown",
            "funding_events": [
                {
                    "amount": null,
                    "amount_printed": null,
                    "raised_at": "2021-01-01T00:00:00",
                    "stage": "Series unknown",
                    "link": "https://www.crunchbase.com/funding_round/intercom-series-unknown--6ce20dfb"
                },
                {
                    "amount": 125000000,
                    "amount_printed": "$125,000,000",
                    "raised_at": "2018-04-27T00:00:00",
                    "stage": "Series D",
                    "link": "https://www.crunchbase.com/funding_round/intercom-series-d--15490ce6"
                }
            ]
        },
        "technology": {
            "count": 43,
            "technology_names": [
                "6sense", "theTradeDesk", "Amazon SES",
                "Contentful", "Node.js", "Tailwind CSS"
            ],
            "technology_list": [
                { "name": "6sense", "category": "Marketing automation" },
                { "name": "theTradeDesk", "category": "Advertising" },
                { "name": "Amazon SES", "category": "Email" },
                { "name": "Contentful", "category": "CMS" }
            ]
        },
        "job_postings": {
            "active_count": 3,
            "active_titles": [
                "account executive, senior midmarket",
                "senior product engineer",
                "senior recruiting coordinator"
            ]
        }
    }
}
```

## Response Details

| Property | Type | Description |
|----------|------|-------------|
| `error` | boolean | `false` if successful, `true` if error (with `error_code` property). |
| `free_enrichment` | boolean | `true` if you enriched this record before (no charge). `false` if new enrichment or new mobile reveal. |
| `person` | object | The matched person record. |
| `company` | object | The current company of the matched person. |

## Error Codes

| HTTP Code | `error_code` | Meaning |
|-----------|-------------|---------|
| `400` | `NO_MATCH` | Couldn't match data to a person record. Also returned if `only_verified_email` was used but no verified email exists, or `only_verified_mobile` but no mobile exists. |
| `400` | `INVALID_DATAPOINTS` | Submitted datapoints don't meet minimum matching requirements. |
| `400` | `INSUFFICIENT_CREDITS` | Not enough credits to perform the request. |
| `401` | `INVALID_API_KEY` | Invalid API key — check your `X-KEY` header. |
| `429` | `RATE_LIMITED` | Rate limit hit for your current plan. |
| `400` | `INVALID_REQUEST` | The submitted request is invalid. |
| `400` | `INTERNAL_ERROR` | Server-side error — contact support. |