# Person Object Schema

The person object is present in most responses (`/enrich`, `/search`) and represents a lead with their potential email, mobile, and many more datapoints.

Any property can be `null` if no data is available. High-level properties (such as `location`) can also be `null` — access nested keys with null-checks.

The person object is returned along with its company. See the Company Object Schema for company field details.

> **Note:** When using the Search Person API, `mobile` and `email` will **not** be present. Use the Enrich Person endpoint to reveal those.

## Top-Level Properties

| Property | Type | Description |
|----------|------|-------------|
| `person_id` | string | Unique identifier in Prospeo's system. |
| `first_name` | string | Person's given name. |
| `last_name` | string | Person's family name. |
| `full_name` | string | Person's full name. |
| `linkedin_url` | string | Link to the person's public LinkedIn profile. |
| `headline` | string | Headline summarizing current role and expertise. |
| `current_job_title` | string | Title of the person's current position. |
| `current_job_key` | string | Internal key for the current job. When multiple current jobs exist, this identifies the main one. |
| `skills` | array of strings | List of self-assigned skills. |
| `last_job_change_detected_at` | datetime | When the last job change was detected by Prospeo. |

## Job History (`job_history` array)

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Job title for this role. |
| `company_name` | string | Name of the company. |
| `current` | boolean | `true` if this role is current. Multiple jobs can be current at once. |
| `start_year` | integer | Four-digit year when the role began. |
| `start_month` | integer | Month (1–12) when the role began. Can be `null`. |
| `end_year` | integer | Year when the role ended, or `null` if ongoing. |
| `end_month` | integer | Month when the role ended, or `null` if ongoing. |
| `duration_in_months` | integer | Total duration of the role in months. |
| `departments` | array of strings | Departments assigned to this job. |
| `seniority` | string | Seniority assigned to this job. |
| `company_id` | string | Prospeo's internal company identifier. Can be `null`. |
| `job_key` | string | Prospeo's internal key for this job entry. Use with `current_job_key` to find the main current job. |

## Mobile Details (`mobile` object)

| Property | Type | Description |
|----------|------|-------------|
| `status` | string | `VERIFIED` or `UNAVAILABLE`. |
| `revealed` | boolean | `true` if you revealed and paid for this mobile. |
| `mobile` | string | E.164 formatted number (e.g., `+12345678900`). Only if revealed. |
| `mobile_national` | string | National format (e.g., `234 567 8900`). Only if revealed. |
| `mobile_international` | string | International format (e.g., `+1 234 567 8900`). Only if revealed. |
| `mobile_country_code` | string | ISO 3166-1 alpha-2 country code. Only if revealed. |
| `mobile_country` | string | Full country name. Only if revealed. |

## Email Details (`email` object)

| Property | Type | Description |
|----------|------|-------------|
| `status` | string | `VERIFIED` or `UNAVAILABLE`. |
| `revealed` | boolean | `true` if the email is revealed. |
| `email` | string | The person's email address. Only if revealed. |
| `verification_method` | string | Method used: `SMTP` or `BOUNCEBAN`. |
| `email_mx_provider` | string | MX record provider (e.g., `GOOGLE`). Only if revealed. |

## Location Details (`location` object)

| Property | Type | Description |
|----------|------|-------------|
| `country` | string | Full country name (e.g., "United States"). |
| `country_code` | string | ISO 3166-1 alpha-2 code (e.g., "US"). |
| `state` | string | State or region name. |
| `city` | string | City name. |
| `time_zone` | string | IANA timezone identifier (e.g., "America/Los_Angeles"). |
| `time_zone_offset` | integer | UTC offset in hours (e.g., -8). |

## JSON Example

```json
{
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
}
```

*Last updated on January 13, 2026*