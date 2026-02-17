# Icypeas API — Lead Database: Find People

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Available Filters

| Filter Name | Description | Type | Example | Constraints |
|-------------|-------------|------|---------|-------------|
| `firstname` | First name of a person | Include/Exclude | `{ "include": ["John", "Jane"], "exclude": ["Alice"] }` | Open text field. |
| `lastname` | Last name of a person | Include/Exclude | `{ "include": ["Doe", "Smith"], "exclude": ["Brown"] }` | Open text field. |
| `currentJobTitle` | Current job title | Include/Exclude | `{ "include": ["Software Engineer", "Manager"], "exclude": ["Intern"] }` | Open text field. |
| `pastJobTitle` | Past job title | Include/Exclude | `{ "include": ["Developer", "Analyst"], "exclude": ["Consultant"] }` | Open text field. |
| `currentCompanyName` | Current company name | Include/Exclude | `{ "include": ["Google", "Microsoft"], "exclude": ["Facebook"] }` | Open text field. |
| `pastCompanyName` | Previous company name | Include/Exclude | `{ "include": ["Amazon", "IBM"], "exclude": ["Oracle"] }` | Open text field. |
| `currentCompanyUrn` | URN of current company | Include/Exclude | `{ "include": ["1234", "5678"] }` | Numeric field. Must be valid company URNs. |
| `pastCompanyUrn` | URN of previous company | Include/Exclude | `{ "include": ["3456", "7890"] }` | Numeric field. Must be valid company URNs. |
| `currentCompanyWebsite` | Website/domain of current company | Include/Exclude | `{ "include": ["https://www.icypeas.com", "microsoft.com"] }` | Must be valid websites or domains. |
| `pastCompanyWebsite` | Website/domain of previous company | Include/Exclude | `{ "include": ["https://www.microsoft.com", "google.com"] }` | Must be valid websites or domains. |
| `currentCompanyId` | ID representing the current company | Include/Exclude | `{ "include": ["https://www.icypeas.com", "5678", "icypeas", "https://linkedin.com/company/icypeas"] }` | Supports: domain/website, URN numeric ID, LinkedIn URL, or vanity name. |
| `pastCompanyId` | ID representing the previous company | Include/Exclude | `{ "include": ["https://www.icypeas.com", "5678", "icypeas", "https://linkedin.com/company/icypeas"] }` | Supports: domain/website, URN numeric ID, LinkedIn URL, or vanity name. |
| `school` | School attended | Include/Exclude | `{ "include": ["Stanford", "Harvard"], "exclude": ["MIT"] }` | Open text field. |
| `languages` | Languages spoken | Include/Exclude | `{ "include": ["English", "Spanish"], "exclude": ["French"] }` | Valid language names or alpha-2 language codes. |
| `skills` | Skills possessed | Include/Exclude | `{ "include": ["JavaScript", "Python"], "exclude": ["Java"] }` | Valid skill names. |
| `location` | Location of the person | Include/Exclude | `{ "include": ["New York", "San Francisco"], "exclude": ["Los Angeles"] }` | City, country, state. For best results use alpha-2 country codes (IN, FR, US, etc.). |
| `keyword` | Searches across entire profile (job titles, descriptions, skills, headline, educations, etc.) | Include/Exclude | `{ "include": ["CEO", "Co-Founder"] }` | Open text field. |

## Query Examples

### All people currently employed as CTO in the US

```json
{
  "query": {
    "currentJobTitle": { "include": ["CTO", "Chief Technical Officer"] },
    "location": { "include": ["US"] }
  }
}
```

### All people speaking English in France

```json
{
  "query": {
    "languages": { "include": ["EN"] },
    "location": { "include": ["FR"] }
  }
}
```

### All engineers working at Apple

```json
{
  "query": {
    "currentJobTitle": { "include": ["engineer"] },
    "currentCompanyName": { "include": ["apple"] }
  }
}
```

---

## Count People

Use this route to assess the number of people matching a query. This route is free.

### Endpoint

```
POST https://app.icypeas.com/api/find-people/count
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | object | Yes | A valid query using the available filters above. |

### Response — 200 Success

```json
{
  "success": true,
  "total": 10
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` means the search succeeded. |
| `total` | number | The number of people matching the query. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Find People

Use this route to retrieve results for your query. The route is paginated.

### Endpoint

```
POST https://app.icypeas.com/api/find-people
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | object | Yes | A valid query using the available filters above. |
| `pagination` | object | No | Used to retrieve more people beyond the first page. |

### `pagination` Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | A valid pagination token from a previous response. |
| `size` | number | No | Number of people per page (1–200). Default: 100. |

### Responses

| Code | Description |
|------|-------------|
| 200 | Success |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Pagination

Results are paginated based on the `size` parameter (default 100, min 1, max 200). If a query returns more results than the page size, the response includes a `pagination` object with a `token`.

Pass the returned `pagination` object in your next request to fetch the next page. Each response returns a new token — use the latest one for subsequent requests. Repeat until no more results are returned.

> **CAUTION:**
> - You cannot change the query between your initial request and subsequent paginated requests. Doing so will result in unwanted behavior.
> - Each token has an expiration date and cannot be reused indefinitely.

---

## Include/Exclude Specs

The Include/Exclude field can contain two arrays:

- `include` — values to include in the query
- `exclude` — values to exclude from the query

```json
{
  "currentJobTitle": {
    "include": ["CTO"],
    "exclude": ["Senior engineer"]
  }
}
```

> **CAUTION:** `include` and `exclude` arrays are limited to 200 values per array per field.

---

## Range Specs

The Range field contains comparison operators and numerical values only. Operators: `>` (greater than), `<` (less than), `>=` (greater or equal), `<=` (less or equal).

```json
{
  "headcount": {
    ">=": 10,
    "<": 20
  }
}
```

```json
{
  "headcount": {
    ">": 10,
    "<=": 20
  }
}
```

You are responsible for giving a range that makes sense.