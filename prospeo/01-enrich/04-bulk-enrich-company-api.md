# Bulk Enrich Company API

Enrich up to 50 company records at once while staying blazing-fast.

## How Are Credits Spent?

- **1 credit** per matched company.
- You won't be charged if no results are found.
- You won't be charged if you enrich the same record twice in the lifetime of your account.

## Endpoint

| | |
|---|---|
| **URL** | `https://api.prospeo.io/bulk-enrich-company` |
| **Method** | `POST` |
| **Headers** | `X-KEY: your_api_key` / `Content-Type: application/json` |

## Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `data` *(required)* | See below | The records to enrich (up to 50 at once). |

## Data Parameter

The `data` parameter is a **list** of company objects to enrich. Each object accepts:

| Datapoint | Example | Description |
|-----------|---------|-------------|
| `identifier` *(required)* | `1234abcd` | A random alphanumeric string you generate to reconcile matches in the response. |
| `company_name` *(optional)* | `Deloitte` | The company name. |
| `company_website` *(optional)* | `deloitte.com` | The company website. |
| `company_linkedin_url` *(optional)* | `https://linkedin.com/company/deloitte` | The company's public LinkedIn URL. |
| `company_id` *(optional)* | `cccc7c7da6116a8830a07100` | The `company_id` from a previously enriched company object. |

## Minimum Requirements for Matching

At least one of the above datapoints is required per object.

> **Note #1:** Strongly avoid using only `company_name` — many companies share the same name. Use `company_website` whenever possible.

> **Note #2:** The more datapoints you submit, the better the accuracy.

## Example Request

Identifier `4` contains an invalid property (`full_name`) and will appear in `invalid_datapoints`.

```
POST "https://api.prospeo.io/bulk-enrich-company"
X-KEY: "your_api_key"
Content-Type: "application/json"

{
   "data": [
       {
           "identifier": "1",
           "company_website": "intercom.com"
       },
       {
           "identifier": "2",
           "company_linkedin_url": "https://www.linkedin.com/company/deloitte"
       },
       {
           "identifier": "3",
           "company_name": "Milka"
       },
       {
           "identifier": "4",
           "full_name": "Pinterest"
       }
   ]
}
```

## Response

```json
{
    "error": false,
    "total_cost": 10,
    "not_matched": ["3"],
    "invalid_datapoints": ["4"],
    "matched": [
        {
            "identifier": "1",
            "company": { ... }
        },
        {
            "identifier": "2",
            "company": { ... }
        }
    ]
}
```

## Response Details

| Property | Type | Description |
|----------|------|-------------|
| `error` | boolean | `false` if successful, `true` if error (with `error_code`). |
| `total_cost` | integer | Total credit cost of the request. |
| `matched` | list | All matched company records. |
| `matched.identifier` | string | Your generated identifier for reconciliation. |
| `matched.company` | object | The matched company record. |
| `not_matched` | list | Identifiers that couldn't be matched. |
| `invalid_datapoints` | list | Identifiers that didn't meet minimum matching requirements. |

## Error Codes

| HTTP Code | `error_code` | Meaning |
|-----------|-------------|---------|
| `400` | `INSUFFICIENT_CREDITS` | Not enough credits. |
| `401` | `INVALID_API_KEY` | Invalid API key — check `X-KEY` header. |
| `429` | `RATE_LIMITED` | Rate limit hit for your plan. |
| `400` | `INVALID_REQUEST` | The submitted request is invalid. |
| `400` | `INTERNAL_ERROR` | Server-side error — contact support. |