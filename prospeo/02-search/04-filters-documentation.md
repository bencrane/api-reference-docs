# Search Filters Documentation

Complete reference for all filters available in the `/search-person` and `/search-company` endpoints.

## Enum Values

Many filters require values from predefined lists:

| Enum | Description |
|------|-------------|
| Departments | Person departments |
| Seniorities | Person seniority levels |
| Industries | Company industries (256 values) |
| Employee ranges | Company size ranges |
| Funding stages | Company funding stages |
| Technologies | Company tech stack (4,946 values) |
| NAICS codes | Industry classification codes |
| SIC codes | Standard industrial codes |
| MX providers | Email providers (107 values) |

## Quick Reference

### Person Filters (only `/search-person`)

| Filter | Type | Description | Enum Values |
|--------|------|-------------|-------------|
| `person_name` | IncludeExclude | Filter by person's name | — |
| `person_name_or_job_title` | string | Quick search across name and job title | — |
| `person_job_title` | JobTitleFilter | Filter by job title with boolean search | Search Suggestions API |
| `person_department` | IncludeExclude | Filter by department | Departments |
| `person_seniority` | IncludeExclude | Filter by seniority level | Seniorities |
| `person_location_search` | IncludeExclude | Filter by person's location | Search Suggestions API |
| `person_contact_details` | ContactDetailsFilter | Filter by email/mobile availability | — |
| `person_duplicate_control` | DuplicateControlFilter | Control duplicate records | — |
| `max_person_per_company` | integer | Limit results per company | — |
| `person_year_of_experience` | Range | Filter by years of experience | — |
| `person_time_in_current_role` | Range | Filter by months in current role | — |
| `person_time_in_current_company` | Range | Filter by months at current company | — |
| `person_job_change` | JobChangeFilter | Filter by recent job changes | — |

### Company Filters (both `/search-person` and `/search-company`)

| Filter | Type | Description | Enum Values |
|--------|------|-------------|-------------|
| `company` | CompanyFilter | Filter by company name or website | — |
| `company_location_search` | IncludeExclude | Filter by company HQ location | Search Suggestions API |
| `company_headcount_range` | array | Filter by predefined employee ranges | Employee ranges |
| `company_headcount_custom` | Range | Custom employee count range | — |
| `company_industry` | IncludeExclude | Filter by industry | Industries |
| `company_keywords` | KeywordsFilter | Filter by company keywords | — |
| `company_attributes` | AttributesFilter | Filter by company attributes | — |
| `company_naics` | IncludeExclude | Filter by NAICS codes | NAICS codes |
| `company_sics` | IncludeExclude | Filter by SIC codes | SIC codes |
| `company_revenue` | RevenueFilter | Filter by revenue range | — |
| `company_type` | string | Filter by company type | — |
| `company_funding` | FundingFilter | Filter by funding details | Funding stages |
| `company_technology` | IncludeExclude | Filter by technologies used | Technologies |
| `company_founded` | FoundedFilter | Filter by founding year | — |
| `company_headcount_growth` | HeadcountGrowthFilter | Filter by headcount growth % | Departments |
| `company_job_posting_hiring_for` | array | Filter by job posting titles | — |
| `company_job_posting_quantity` | Range | Filter by number of job postings | — |
| `company_headcount_by_department` | array | Filter by department headcount | Departments |
| `company_email_provider` | array | Filter by email provider | MX providers |

## Global Constraints

| Constraint | Value |
|------------|-------|
| Max total filter values across all filters | 20,000 |
| Max include/exclude items per filter | 500 (unless otherwise specified) |
| Max page number | 1,000 |
| Results per page | 25 (fixed) |

> You cannot perform a search solely with exclude filters. You must have at least one positive filter.

---

## Person Filters

### person_name

Filter by person's first name, last name, or full name.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 500 items. Each: 1-100 characters |
| `exclude` | array of strings | Max 500 items. Each: 1-100 characters |

```json
{
    "person_name": {
        "include": ["John Smith", "Jane Doe"],
        "exclude": ["Bob Wilson"]
    }
}
```

### person_name_or_job_title

Quick search filter that matches across both person name and job title fields.

| Type | Constraints |
|------|-------------|
| string | Free text search term |

```json
{
    "person_name_or_job_title": "Kevin"
}
```

### person_job_title

Filter by job title with support for exact match, contains match, or advanced boolean search.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 100 items. Each: 2-100 characters |
| `exclude` | array of strings | Max 100 items. Each: 2-100 characters |
| `match_only_exact_job_titles` | boolean | Default: `true`. When `false`, uses contains matching |
| `boolean_search` | string | Max 500 terms, max 5 parenthesis depth, each term 3-100 chars |

> `boolean_search` cannot be combined with `include`/`exclude`. Use one or the other.

```json
{
    "person_job_title": {
        "include": ["CEO", "Chief Executive Officer"],
        "exclude": ["Intern"],
        "match_only_exact_job_titles": true
    }
}
```

#### Boolean Search Syntax

| Syntax | Meaning | Example |
|--------|---------|---------|
| `term` | Contains matching | `manager` matches "Project Manager", "Manager" |
| `"term"` | Exact matching (double quotes) | `"Manager"` matches only "Manager" exactly |
| `'term'` | Contains with spaces (single quotes) | `'vice president'` matches titles containing "vice president" |
| `!term` | Exclude | `!intern` excludes titles containing "intern" |
| `AND` | Both conditions must match | `CEO AND founder` |
| `OR` | Either condition matches | `CEO OR CTO` |
| `()` | Grouping | `(engineer OR developer) AND senior` |

> You cannot mix AND/OR at the same level without parentheses. Use parentheses to group conditions.

### person_department

Filter by functional department. See Departments for valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 500 items. Must be valid Department value |
| `exclude` | array of strings | Max 500 items. Must be valid Department value |

```json
{
    "person_department": {
        "include": ["Sales", "Marketing"],
        "exclude": ["Human Resources"]
    }
}
```

### person_seniority

Filter by seniority level. See Seniorities for valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 11 items. Must be valid Seniority value |
| `exclude` | array of strings | Max 11 items. Must be valid Seniority value |

```json
{
    "person_seniority": {
        "include": ["C-Suite", "Vice President", "Director"],
        "exclude": ["Intern", "Entry"]
    }
}
```

### person_location_search

Filter by person's location. Values must be obtained from the Search Suggestions API.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 100 items. Each: 1-200 characters. Must be valid location |
| `exclude` | array of strings | Max 100 items. Each: 1-200 characters. Must be valid location |

```json
{
    "person_location_search": {
        "include": ["United States", "New York, United States"],
        "exclude": ["Texas, United States"]
    }
}
```

### person_contact_details

Filter by availability of verified email or mobile.

| Field | Type | Valid Values | Description |
|-------|------|-------------|-------------|
| `email` | array of strings | `["VERIFIED"]` | Filter for verified emails |
| `mobile` | array of strings | `["VERIFIED", "UNAVAILABLE"]` | Filter for mobile status |
| `operator` | string | `"OR"`, `"AND"` | Combine conditions. Default: `"OR"` |
| `hide_people_with_details_already_revealed` | boolean | `true`, `false` | Hide already revealed contacts |

```json
{
    "person_contact_details": {
        "email": ["VERIFIED"],
        "mobile": ["VERIFIED"],
        "operator": "OR",
        "hide_people_with_details_already_revealed": false
    }
}
```

### person_duplicate_control

Control duplicate handling for search results. Allows hiding people based on existing lists and export history.

> For detailed configuration, use the dashboard UI to build settings and export the JSON payload.

### max_person_per_company

Limit the number of people returned per company.

| Type | Constraints |
|------|-------------|
| integer | 1-100 |

```json
{
    "max_person_per_company": 5
}
```

### person_year_of_experience

Filter by total years of professional experience.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 0-60 years |
| `max` | integer | 0-60 years. Must be ≥ min |

```json
{
    "person_year_of_experience": {
        "min": 5,
        "max": 15
    }
}
```

### person_time_in_current_role

Filter by months in current job role.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 0-600 months |
| `max` | integer | 0-600 months. Must be ≥ min |

```json
{
    "person_time_in_current_role": {
        "min": 6,
        "max": 24
    }
}
```

### person_time_in_current_company

Filter by months at current company.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 0-600 months |
| `max` | integer | 0-600 months. Must be ≥ min |

```json
{
    "person_time_in_current_company": {
        "min": 12,
        "max": 60
    }
}
```

### person_job_change

Filter by recent job changes.

| Field | Type | Valid Values | Description |
|-------|------|-------------|-------------|
| `timeframe_days` | integer | 30, 60, 90, 180, 270, 365 | Days since job change |
| `only_promotion` | boolean | `true`, `false` | Filter for promotions only |
| `only_new_company` | boolean | `true`, `false` | Filter for company changes only |

> `only_promotion` and `only_new_company` cannot both be `true`.

```json
{
    "person_job_change": {
        "timeframe_days": 90,
        "only_promotion": false,
        "only_new_company": true
    }
}
```

---

## Company Filters

### company

Filter by company name or website.

| Field | Type | Constraints |
|-------|------|-------------|
| `names.include` | array of strings | Total names + websites ≤ 500 |
| `names.exclude` | array of strings | Max 500 items |
| `websites.include` | array of strings | Valid domain format, no subdomains |
| `websites.exclude` | array of strings | Max 500 items |

> Website values should be root domains only (e.g., `google.com`, not `www.google.com`).

```json
{
    "company": {
        "names": {
            "include": ["Google", "Microsoft"],
            "exclude": ["Amazon"]
        },
        "websites": {
            "include": ["google.com", "microsoft.com"],
            "exclude": []
        }
    }
}
```

### company_location_search

Filter by company HQ location. Values must be from Search Suggestions API.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 100 items. Must be valid location |
| `exclude` | array of strings | Max 100 items. Must be valid location |

```json
{
    "company_location_search": {
        "include": ["United States", "San Francisco, California, United States"],
        "exclude": ["China"]
    }
}
```

### company_headcount_range

Filter by predefined employee count ranges. See Employee ranges for valid values.

> Cannot be used together with `company_headcount_custom`.

```json
{
    "company_headcount_range": ["51-100", "101-200", "201-500"]
}
```

### company_headcount_custom

Filter by custom employee count range.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 1-999,998 |
| `max` | integer | 1-999,999. Must be ≥ min |

> Cannot be used together with `company_headcount_range`.

```json
{
    "company_headcount_custom": {
        "min": 100,
        "max": 5000
    }
}
```

### company_industry

Filter by industry. See Industries for all 256 valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 500 items. Must be valid Industry value |
| `exclude` | array of strings | Max 500 items. Must be valid Industry value |

```json
{
    "company_industry": {
        "include": ["Software Development", "IT Services and IT Consulting"],
        "exclude": ["Construction"]
    }
}
```

### company_keywords

Filter by keywords found in company data.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Total include + exclude ≤ 20. Each: 3-50 characters |
| `exclude` | array of strings | Total include + exclude ≤ 20. Each: 3-50 characters |
| `include_all` | boolean | If `true`, ALL include keywords must match (AND logic) |
| `include_company_description` | boolean | Search in company description |
| `include_company_description_seo` | boolean | Search in SEO description |

> At least one keyword must be provided.

```json
{
    "company_keywords": {
        "include": ["saas", "b2b", "enterprise"],
        "exclude": ["consumer"],
        "include_all": false,
        "include_company_description": true,
        "include_company_description_seo": true
    }
}
```

### company_attributes

Filter by company attributes (boolean flags).

| Field | Type | Description |
|-------|------|-------------|
| `b2b` | boolean or null | Company is B2B |
| `demo` | boolean or null | Offers demo |
| `freetrial` | boolean or null | Offers free trial |
| `downloadable` | boolean or null | Has downloadable product |
| `mobileapps` | boolean or null | Has mobile apps |
| `onlinereviews` | boolean or null | Has online reviews |
| `pricing` | boolean or null | Shows pricing on website |

```json
{
    "company_attributes": {
        "b2b": true,
        "demo": true,
        "freetrial": false,
        "downloadable": null,
        "mobileapps": null,
        "onlinereviews": null,
        "pricing": true
    }
}
```

### company_naics

Filter by NAICS codes. See NAICS codes for valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of integers | Max 100 items. Each: 1-999,999 |
| `exclude` | array of integers | Max 100 items. Each: 1-999,999 |

```json
{
    "company_naics": {
        "include": [541511, 541512],
        "exclude": [236220]
    }
}
```

### company_sics

Filter by SIC codes. See SIC codes for valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of integers | Max 100 items. Each: 1-999,999 |
| `exclude` | array of integers | Max 100 items. Each: 1-999,999 |

```json
{
    "company_sics": {
        "include": [7371, 7372],
        "exclude": [1521]
    }
}
```

### company_revenue

Filter by company revenue range.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | string | Must be valid Revenue Range value |
| `max` | string | Must be valid Revenue Range value. Must be ≥ min |
| `include_unknown_revenue` | boolean | Include companies with unknown revenue |

```json
{
    "company_revenue": {
        "min": "10M",
        "max": "500M",
        "include_unknown_revenue": false
    }
}
```

### company_type

Filter by company type.

| Type | Valid Values |
|------|-------------|
| string | `"Private"`, `"Public"`, `"Non Profit"`, `"Other"` |

```json
{
    "company_type": "Private"
}
```

### company_funding

Filter by funding information. See Funding stages for valid stage values.

| Field | Type | Constraints |
|-------|------|-------------|
| `stage` | array of strings | Max 500 items. Must be valid Funding Stage |
| `funding_date` | integer | Days since last funding: 30, 60, 90, 180, 270, 365 |
| `last_funding.min` | string | Must be valid Revenue Range value |
| `last_funding.max` | string | Must be valid Revenue Range value. Must be ≥ min |
| `total_funding.min` | string | Must be valid Revenue Range value |
| `total_funding.max` | string | Must be valid Revenue Range value. Must be ≥ min |

```json
{
    "company_funding": {
        "stage": ["Series A", "Series B", "Series C"],
        "funding_date": 365,
        "last_funding": {
            "min": "1M",
            "max": "100M"
        },
        "total_funding": {
            "min": "5M",
            "max": "500M"
        }
    }
}
```

### company_technology

Filter by technologies used. See Technologies for all 4,946 valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `include` | array of strings | Max 20 items. Must be valid Technology value |
| `exclude` | array of strings | Max 20 items. Must be valid Technology value |

```json
{
    "company_technology": {
        "include": ["Salesforce", "HubSpot", "AWS"],
        "exclude": ["Azure"]
    }
}
```

### company_founded

Filter by company founding year.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 1900 - current year |
| `max` | integer | 1900 - current year. Must be ≥ min |
| `include_unknown_founded` | boolean | Include companies with unknown founding year. Default: `true` |

```json
{
    "company_founded": {
        "min": 2010,
        "max": 2020,
        "include_unknown_founded": true
    }
}
```

### company_headcount_growth

Filter by headcount growth percentage over a time period.

| Field | Type | Constraints |
|-------|------|-------------|
| `timeframe_month` | integer | 3, 6, 12, or 24 |
| `min` | integer | -100 to 10,000 (percentage) |
| `max` | integer | -100 to 10,000 (percentage). Must be ≥ min |
| `departments` | array of strings | Max 10 items. Must be valid Headcount Growth Department values |

```json
{
    "company_headcount_growth": {
        "timeframe_month": 12,
        "min": 10,
        "max": 100,
        "departments": ["Sales", "Technical"]
    }
}
```

### company_job_posting_hiring_for

Filter by job titles the company is actively hiring for.

| Type | Constraints |
|------|-------------|
| array of strings | Max 500 items. Each: 1-200 characters |

```json
{
    "company_job_posting_hiring_for": ["Software Engineer", "Sales Manager", "Product Manager"]
}
```

### company_job_posting_quantity

Filter by number of active job postings.

| Field | Type | Constraints |
|-------|------|-------------|
| `min` | integer | 0-5,000 |
| `max` | integer | 0-5,000 |

```json
{
    "company_job_posting_quantity": {
        "min": 10,
        "max": 100
    }
}
```

### company_headcount_by_department

Filter by headcount in specific departments. Max 10 department filters. See Departments for valid values.

| Field | Type | Constraints |
|-------|------|-------------|
| `department` | string | Must be valid Department value |
| `min` | integer | 0-100,000 |
| `max` | integer | 0-100,000 |

```json
{
    "company_headcount_by_department": [
        {
            "department": "Sales",
            "min": 10,
            "max": 100
        },
        {
            "department": "Engineering & Technical",
            "min": 50,
            "max": null
        }
    ]
}
```

### company_email_provider

Filter by the company's email provider. See MX providers for all 107 valid values.

```json
{
    "company_email_provider": ["Google", "Microsoft"]
}
```

---

## Enum Values Reference

### Seniority Values

C-Suite, Director, Entry, Founder/Owner, Head, Intern, Manager, Partner, Senior, Vice President

### Employee Range Values

1-10, 11-20, 21-50, 51-100, 101-200, 201-500, 501-1000, 1001-2000, 2001-5000, 5001-10000, 10000+

### Revenue Range Values (lowest to highest)

<100K, 100K, 500K, 1M, 5M, 10M, 25M, 50M, 100M, 250M, 500M, 1B, 5B, 10B+

### Company Type Values

Private, Public, Non Profit, Other

### Funding Stage Values

Angel, Convertible note, Corporate round, Debt financing, Equity crowdfunding, Grant, Initial coin offering, Non equity assistance, Post IPO debt, Post IPO equity, Post IPO secondary, Pre seed, Private equity, Product crowdfunding, Secondary market, Seed, Series A, Series B, Series C, Series D, Series E-J, Series unknown, Undisclosed

### Top-Level Department Values

C-Suite, Consulting, Design, Education & Coaching, Engineering & Technical, Finance, Human Resources, Information Technology, Legal, Marketing, Medical & Health, Operations, Product, Sales

### Headcount Growth Department Values

Administrative, Consulting, Customer service, Design / UI / UX, Education, Finance, General management, HR, Legal, Marketing, Medical, Operations, Product, Project management, Real estate, Research, Sales, Technical, Trades

### Other Enums (extensive lists)

| Enum | Count |
|------|-------|
| Industries | 256 values |
| Technologies | 4,946 values |
| NAICS codes | Extensive list |
| SIC codes | Extensive list |
| MX providers | 107 values |

## Forbidden Filters (blocked for public API)

| Filter | Blocked For |
|--------|-------------|
| `company_intent` | Both `/search-person` and `/search-company` |
| `company.company_oids` | `/search-company` |
| `company.temp_matching_oids` | `/search-company` |
| `company.company_list_oids` | `/search-company` |

---

## Complete Example Requests

### Search People by Job Title, Seniority, and Company

```json
{
    "filters": {
        "person_job_title": {
            "include": ["CEO", "CTO", "VP Engineering"],
            "match_only_exact_job_titles": false
        },
        "person_seniority": {
            "include": ["C-Suite", "Vice President"]
        },
        "company": {
            "names": {
                "include": ["Microsoft", "Google", "Apple"]
            }
        },
        "person_location_search": {
            "include": ["United States"]
        }
    },
    "page": 1
}
```

### Search People with Boolean Job Title Search

```json
{
    "filters": {
        "person_job_title": {
            "boolean_search": "(CEO OR CTO OR \"Chief Technology Officer\") AND !Intern"
        },
        "company_industry": {
            "include": ["Software Development", "IT Services and IT Consulting"]
        },
        "company_headcount_range": ["101-200", "201-500", "501-1000"]
    },
    "page": 1
}
```

### Search Companies by Industry, Size, and Funding

```json
{
    "filters": {
        "company_industry": {
            "include": ["Software Development", "IT Services and IT Consulting"]
        },
        "company_headcount_range": ["101-200", "201-500", "501-1000"],
        "company_funding": {
            "stage": ["Series A", "Series B", "Series C"],
            "funding_date": 365
        },
        "company_location_search": {
            "include": ["United States"]
        },
        "company_revenue": {
            "min": "10M",
            "max": "500M"
        }
    },
    "page": 1
}
```

### Search Companies by Technology and Growth

```json
{
    "filters": {
        "company_technology": {
            "include": ["Salesforce", "HubSpot"]
        },
        "company_headcount_growth": {
            "timeframe_month": 12,
            "min": 20,
            "max": 200
        },
        "company_job_posting_quantity": {
            "min": 10
        }
    },
    "page": 1
}
```

*Last updated on January 13, 2026*