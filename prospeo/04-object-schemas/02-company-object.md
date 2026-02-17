# Company Object Schema

The company object is present in most responses (`/enrich`, `/search`) and represents a company.

Any property can be `null` if no data is available. High-level properties (such as `location`) can also be `null` — access nested keys with null-checks.

## Top-Level Properties

| Property | Type | Description |
|----------|------|-------------|
| `company_id` | string | Unique identifier in Prospeo's system. |
| `name` | string | Company name. |
| `website` | string | URL of the main website. |
| `domain` | string | Root domain extracted from website (e.g., `prospeo.io`). |
| `other_websites` | array of strings | Additional websites/domains linked to the company. |
| `description` | string | Social-network company description. |
| `description_seo` | string | SEO description as found on Google. |
| `description_ai` | string | AI-generated summary. |
| `type` | string | Legal type: `Private`, `Public`, `Non profit`, `Other`. |
| `industry` | string | Main industry. |
| `employee_count` | integer | Estimated headcount. |
| `employee_range` | string | Bucketed range (e.g., "1000-5000"). |
| `location` | object | Registered HQ or primary location. See below. |
| `sic_codes` | array of strings | Standard Industrial Classification codes. |
| `naics_codes` | array of strings | NAICS codes. |
| `email_tech` | object | Email infrastructure details. See below. |
| `linkedin_url` | string | Public LinkedIn page. |
| `twitter_url` | string | Twitter page. |
| `facebook_url` | string | Facebook page. |
| `instagram_url` | string | Instagram page. |
| `youtube_url` | string | YouTube page. |
| `crunchbase_url` | string | Crunchbase page. |
| `phone_hq` | object | HQ phone data (usually landline). See below. |
| `founded` | integer | Year the company was founded. |
| `revenue_range` | object | Numeric min/max annual revenue in USD. See below. |
| `revenue_range_printed` | string | Human-readable revenue range (e.g., "$5B-10B+"). |
| `keywords` | array of strings | Self-reported keywords describing the company. |
| `logo_url` | string | Prospeo-hosted logo URL. Format: `https://prospeo-static-assets.s3.us-east-1.amazonaws.com/company_logo/{id}.jpg` |
| `attributes` | object | Company attribute flags. See below. |
| `funding` | object | Funding information. See below. |
| `technology` | object | Technology stack. See below. |
| `job_postings` | object | Active job postings. See below. |

## Location Details (`location`)

| Key | Type | Description |
|-----|------|-------------|
| `country` | string | Full country name. |
| `country_code` | string | Alpha-2 code. |
| `state` | string | State / province / region. |
| `city` | string | City name. |
| `raw_address` | string | Self-reported unstructured company address. |

## Email Tech Details (`email_tech`)

| Key | Type | Description |
|-----|------|-------------|
| `domain` | string | Main domain used for emails. |
| `mx_provider` | string | Mail-exchange provider. |
| `catch_all_domain` | boolean | `true` if the domain accepts all email addresses (catch-all). |

## Phone HQ Details (`phone_hq`)

| Key | Type | Description |
|-----|------|-------------|
| `phone_hq` | string | E.164 formatted phone (e.g., `+12345678900`). |
| `phone_hq_national` | string | National format (e.g., `234 567 8900`). |
| `phone_hq_international` | string | International format (e.g., `+1 234 567 8900`). |
| `phone_hq_country_code` | string | Alpha-2 code. |
| `phone_hq_country` | string | Full country name. |

## Revenue Range Details (`revenue_range`)

| Key | Type | Description |
|-----|------|-------------|
| `min` | number | Lower-bound annual revenue in USD. |
| `max` | number | Upper-bound annual revenue in USD. |

## Attribute Flags (`attributes`)

| Key | Type | Description |
|-----|------|-------------|
| `has_demo` | boolean | Offers demo. `null` if unknown. |
| `has_free_trial` | boolean | Offers free trial. `null` if unknown. |
| `has_downloadable` | boolean | Offers downloadable app/software. `null` if unknown. |
| `has_mobile_apps` | boolean | Has a mobile app. `null` if unknown. |
| `has_online_reviews` | boolean | Has online reviews. `null` if unknown. |
| `has_pricing` | boolean | Has a public pricing page. `null` if unknown. |

## Funding Details (`funding`)

| Key | Type | Description |
|-----|------|-------------|
| `count` | integer | Number of recorded funding rounds. |
| `total_funding` | integer | Aggregate capital raised (USD). |
| `total_funding_printed` | string | Human-readable total (e.g., "$1M"). |
| `latest_funding_date` | datetime | Date of most recent round. |
| `latest_funding_stage` | string | Stage of most recent round (e.g., Series A). |
| `funding_events` | array of objects | Individual rounds. See below. |

### Funding Event (object inside `funding_events`)

| Key | Type | Description |
|-----|------|-------------|
| `amount` | integer | Amount raised (USD). |
| `amount_printed` | string | Human-readable amount (e.g., "$1M"). |
| `raised_at` | datetime | Date of this funding event. |
| `stage` | string | Stage (e.g., Series A). |
| `link` | string | Public Crunchbase page for this event. |

## Technology Details (`technology`)

| Key | Type | Description |
|-----|------|-------------|
| `count` | integer | Total detected technologies. |
| `technology_names` | array of strings | Simple list of tech names. |
| `technology_list` | array of objects | Complete list with `name` (string) and `category` (string). |

## Job Postings Details (`job_postings`)

| Key | Type | Description |
|-----|------|-------------|
| `active_count` | integer | Number of currently open roles. |
| `active_titles` | array of strings | Job titles of current openings. |

## JSON Example

```json
{
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
```

*Last updated on January 13, 2026*