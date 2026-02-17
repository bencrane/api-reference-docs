# Icypeas API — Lead Database: Find Companies

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Available Filters

| Filter Name | Description | Type | Example | Constraints |
|-------------|-------------|------|---------|-------------|
| `name` | The company name | Include/Exclude | `{ "include": ["icypeas", "bell security solutions inc."], "exclude": ["apple"] }` | Open text field. |
| `lid` | The LinkedIn company public ID | Include/Exclude | `{ "include": ["google"] }` | The ID found at the end of URLs like `https://www.linkedin.com/company/google`. |
| `urn` | The LinkedIn company URN (numerical ID) | Include/Exclude | `{ "exclude": ["1527"] }` | Numerical ID only. |
| `type` | The company type | Include/Exclude | `{ "include": ["Privately Held"], "exclude": ["Public Company"] }` | Available types: Privately Held, Sole Proprietorship, Self-Employed, Partnership, Public Company, Nonprofit, Educational Institution, Government Agency. |
| `industry` | The company industry | Include/Exclude | `{ "include": ["Real Estate"] }` | See Icypeas for full list of available industries. |
| `location` | The company headquarters' location | Include/Exclude | `{ "include": ["US"] }` | City, country, state. For best results use alpha-2 country codes (IN, FR, US, etc.). |
| `headcount` | The company headcount | Range | `{ ">": 10 }` | Range of integers. See Range Specs below. |
| `keyword` | Searches across entire company profile (name, description, specialties, etc.) | Include/Exclude | `{ "include": ["Higher education"] }` | Open text field. |
| `domain` | The company website or domain | Include/Exclude | `{ "include": ["icypeas.com"] }` | Strongly advised to use the web domain, not a formatted URL (i.e. `icypeas.com` instead of `https://www.icypeas.com`). |

## Query Examples

### All companies named icypeas or apple

```json
{
  "query": {
    "name": { "include": ["icypeas", "apple"] }
  }
}
```

### All privately held companies with more than 10 employees

```json
{
  "query": {
    "type": { "include": ["Privately Held"] },
    "headcount": { ">": 10 }
  }
}
```

### All companies excluding self-employed in real estate

```json
{
  "query": {
    "type": { "exclude": ["Self-Employed"] },
    "industry": { "include": ["Real Estate"] }
  }
}
```

### Specific company by public ID

```json
{
  "query": {
    "lid": { "include": ["google"] }
  }
}
```

### Specific company by numerical URN

```json
{
  "query": {
    "urn": { "include": ["1527"] }
  }
}
```

---

## Count Companies

Use this route to assess the number of companies matching a query. This route is free.

### Endpoint

```
POST https://app.icypeas.com/api/find-companies/count
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
| `total` | number | The number of companies matching the query. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Find Companies

Use this route to retrieve results for your query. The route is paginated.

### Endpoint

```
POST https://app.icypeas.com/api/find-companies
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | object | Yes | A valid query using the available filters above. |
| `pagination` | object | No | Used to retrieve more companies beyond the first page. |

### `pagination` Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | string | Yes | A valid pagination token from a previous response. |
| `size` | number | No | Number of companies per page (1–200). Default: 100. |

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