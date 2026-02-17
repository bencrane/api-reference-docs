# Bulk Enrich Person API

Enrich up to 50 person records at once while staying blazing-fast.

## How Are Credits Spent?

Credit spending works the same as the single Enrich Person endpoint and can be controlled the same way (`only_verified_email`, `enrich_mobile`, `only_verified_mobile`). See the Enrich Person credit section for details.

## Endpoint

| | |
|---|---|
| **URL** | `https://api.prospeo.io/bulk-enrich-person` |
| **Method** | `POST` |
| **Headers** | `X-KEY: your_api_key` / `Content-Type: application/json` |

## Parameters

| Parameter | Example | Description |
|-----------|---------|-------------|
| `only_verified_email` *(optional)* | `true` | Only return records with a verified email. Default `false`. |
| `enrich_mobile` *(optional)* | `true` | Enrich the mobile (if it exists). |
| `only_verified_mobile` *(optional)* | `true` | Only return records with a mobile. Default `false`. If `true`, `enrich_mobile` is automatically `true`. |
| `data` *(required)* | See below | The records to enrich (up to 50 at once). |

## Data Parameter

The `data` parameter is a **list** of person objects to enrich. Each object accepts:

| Datapoint | Example | Description |
|-----------|---------|-------------|
| `identifier` *(required)* | `1234abcd` | A random alphanumeric string you generate to reconcile matches in the response. |
| `first_name` *(optional)* | `Roger` | The first name of the person |
| `last_name` *(optional)* | `Sterling` | The last name of the person |
| `full_name` *(optional)* | `Roger Sterling` | The full name of the person |
| `linkedin_url` *(optional)* | `https://www.linkedin.com/in/roger-sterling` | The person's public LinkedIn URL |
| `email` *(optional)* | `roger.sterling@deloitte.com` | The work email of the person |
| `company_name` *(optional)* | `Deloitte` | The company name |
| `company_website` *(optional)* | `deloitte.com` | The company website |
| `company_linkedin_url` *(optional)* | `https://linkedin.com/company/deloitte` | The company's public LinkedIn URL |
| `person_id` *(optional)* | `6f745841665155f554e5f` | ID from the `/search-person` endpoint |

## Minimum Requirements for Matching

Same as the single Enrich Person endpoint:

- `first_name` + `last_name` + any of (`company_name` / `company_website` / `company_linkedin_url`)
- `full_name` + any of (`company_name` / `company_website` / `company_linkedin_url`)
- `linkedin_url`
- `email`
- `person_id`

> **Note:** Parameters like `only_verified_email` apply to **all** objects in the request.

## Enrich Records from Search API

Use the `person_id` from `/search-person` results to enrich records. This will identify the person and enrich per your options (`only_verified_email`, `only_verified_mobile`, `enrich_mobile`).

## Example Request

In this example, identifier `4` does not meet minimum matching requirements and will appear in `invalid_datapoints`. Identifier `7` uses a `person_id` from `/search-person`.

```
POST "https://api.prospeo.io/bulk-enrich-person"
X-KEY: "your_api_key"
Content-Type: "application/json"

{
   "only_verified_email": true,
   "enrich_mobile": true,
   "data": [
       {
           "identifier": "1",
           "full_name": "Eva Kiegler",
           "company_website": "intercom.com"
       },
       {
           "identifier": "2",
           "first_name": "Jonah",
           "last_name": "Stones",
           "linkedin_url": "https://www.linkedin.com/in/jonah-stones",
           "company_name": "Deloitte",
           "company_website": "deloitte.com",
           "company_linkedin_url": "https://www.linkedin.com/company/deloitte"
       },
       {
           "identifier": "3",
           "linkedin_url": "https://www.linkedin.com/in/micah-sanders"
       },
       {
           "identifier": "4",
           "full_name": "Brandon Stering"
       },
       {
           "identifier": "5",
           "email": "nicolas.b@kpmg.com"
       },
       {
           "identifier": "6",
           "full_name": "Nicole Wonda",
           "company_linkedin_url": "https://www.linkedin.com/company/young"
       },
       {
           "identifier": "7",
           "person_id": "6f564548455488874f48e"
       }
   ]
}
```

## Response

```json
{
    "error": false,
    "total_cost": 10,
    "not_matched": ["2", "3"],
    "invalid_datapoints": ["4"],
    "matched": [
        {
            "identifier": "1",
            "person": { ... },
            "company": { ... }
        },
        {
            "identifier": "5",
            "person": { ... },
            "company": { ... }
        },
        {
            "identifier": "6",
            "person": { ... },
            "company": { ... }
        },
        {
            "identifier": "7",
            "person": { ... },
            "company": { ... }
        }
    ]
}
```

## Response Details

| Property | Type | Description |
|----------|------|-------------|
| `error` | boolean | `false` if successful, `true` if error (with `error_code`). |
| `total_cost` | integer | Total credit cost of the request. Varies by matches and `enrich_mobile` option. |
| `matched` | list | All matched records per your requirements. |
| `matched.identifier` | string | Your generated identifier for reconciliation. |
| `matched.person` | object | The matched person record. |
| `matched.company` | object | The current company of the matched person. |
| `not_matched` | list | Identifiers that couldn't be matched given your requirements. |
| `invalid_datapoints` | list | Identifiers that didn't meet minimum matching requirements (matching not attempted). |

## Error Codes

| HTTP Code | `error_code` | Meaning |
|-----------|-------------|---------|
| `400` | `INSUFFICIENT_CREDITS` | Not enough credits. |
| `401` | `INVALID_API_KEY` | Invalid API key — check `X-KEY` header. |
| `429` | `RATE_LIMITED` | Rate limit hit for your plan. |
| `400` | `INVALID_REQUEST` | The submitted request is invalid. |
| `400` | `INTERNAL_ERROR` | Server-side error — contact support. |