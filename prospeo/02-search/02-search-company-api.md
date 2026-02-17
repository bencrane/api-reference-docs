# Search Company API

This endpoint allows you to search against Prospeo's extensive database of 30M+ companies using 20+ filters to build account lists.

Maximum results: 25,000 (1,000 pages × 25 results per page).

## How Are Credits Spent?

- **1 credit** per search request that returns at least one company.
- 25 results per page, so 1 credit = up to 25 results.

## Endpoint

| | |
|---|---|
| **URL** | `https://api.prospeo.io/search-company` |
| **Method** | `POST` |
| **Headers** | `X-KEY: your_api_key` / `Content-Type: application/json` |

## Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `filters` *(required)* | See below | The complete filter configuration. See Filters section below. |
| `page` *(optional)* | `1` | The page to query. Defaults to `1`. |

## How to Build Search Filters

**Option 1: Dashboard UI Helper**

1. Go to the dashboard and build a company search (ensure you're on the company search page).
2. Click `...` in the top-right corner of search results → click **API JSON**.
3. A modal opens with the current search payload.
4. Copy the payload and use it directly in your request.

**Option 2: Filters Documentation** — Refer to the complete Filters Documentation for all available filters and values.

## Example Request

```bash
curl --location 'https://api.prospeo.io/search-company' \
--header 'X-KEY: api-key' \
--header 'Content-Type: application/json' \
--data '{
    "page": 1,
    "filters": {
        "company_industry": {
            "exclude": [
                "Semiconductors",
                "Pet Services"
            ]
        },
        "company_funding": {
            "stage": [
                "Series B",
                "Series C"
            ],
            "funding_date": 365,
            "last_funding": {
                "min": "1M",
                "max": "10M"
            },
            "total_funding": {
                "min": "10M",
                "max": "100M"
            }
        }
    }
}'
```

## Response

Each result contains a `company` object.

```json
{
    "error": false,
    "results": [
        {
            "company": { ... }
        },
        ...
    ],
    "pagination": {
        "current_page": 1,
        "per_page": 25,
        "total_page": 11,
        "total_count": 271
    }
}
```

### Error Response Example

```json
{
    "error": true,
    "error_code": "INVALID_FILTERS",
    "filter_error": "The value `Accountingg` is not supported for the filter `company_industry`."
}
```

## Pagination

Use the `page` parameter to paginate. Maximum is 1,000 pages. Use the `pagination` object in the response to determine how many pages exist.

## Response Details

| Property | Type | Description |
|----------|------|-------------|
| `error` | boolean | `false` if successful, `true` if error (with `error_code`). |
| `results` | list | Current page of results. Up to 25 records per page. |
| `pagination` | object | Pagination info. Use to determine if more pages exist. |

## Error Codes

| HTTP Code | `error_code` | Meaning |
|-----------|-------------|---------|
| `400` | `INVALID_FILTERS` | Filter config not supported. See `filter_error` for details. |
| `400` | `NO_RESULTS` | No results matching your filters. |
| `400` | `INSUFFICIENT_CREDITS` | Not enough credits. |
| `401` | `INVALID_API_KEY` | Invalid API key — check `X-KEY` header. |
| `429` | `RATE_LIMITED` | Rate limit hit for your plan. |
| `400` | `INVALID_REQUEST` | The submitted request is invalid. |
| `400` | `INTERNAL_ERROR` | Server-side error — contact support. |

## Filters

Two ways to understand filter usage:

1. **Filters Documentation** — Complete reference for all filters, types, and accepted values.
2. **Dashboard UI** — Visually build a search and inspect the generated payload.

> **Note:** You cannot perform a search solely with `exclude` filters (for performance reasons).

### API-Only Filters (Not Available in Dashboard)

- `company.websites` — Pre-filter on a list of company websites (max 500)
- `company.names` — Pre-filter on a list of company names (max 500)

```json
{
    "page": 1,
    "filters": {
        "company": {
            "websites": {
                "include": [
                    "deloitte.com",
                    "https://facebook.com/"
                ]
            },
            "names": {
                "include": [
                    "Walmart",
                    "Microsoft"
                ]
            }
        }
    }
}
```

### Dashboard-Only Filters (Not Available via API)

`company_intent`, `company.company_oids`, `company.company_list_oids`, `company.temp_matching_oids`

## ENUM Filter Values

Many filters accept a fixed set of values:

| Filter | Accepted Values |
|--------|----------------|
| `company_industries` | Industries |
| `company_headcount_range` | Employee ranges |
| `company_funding` | Funding stages |
| `company_technology` | Technologies |
| `company_email_provider` | MX providers |
| `company_naics` | NAICS codes |
| `company_sics` | SIC codes |

## Location Filter Values

`company_location` takes string values. Location strings must **exactly match** those available on the dashboard.

Arbitrary strings like `"nyc"` are not accepted.

**Programmatic access:** Use the Search Suggestions API to retrieve valid location values.