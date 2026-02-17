# Icypeas API — Scrape Data: Find Profile URLs

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Single Profile URL Search

### Endpoint

```
POST https://app.icypeas.com/api/url-search/profile
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstname` | string | Yes | First name of your prospect. |
| `lastname` | string | Yes | Last name of your prospect. |
| `companyOrDomain` | string | No (required if `jobTitle` is empty) | The company name or its domain name (or website). |
| `jobTitle` | string | No (required if `companyOrDomain` is empty) | The job title of your prospect. |

### Example Request

```json
{
  "firstname": "Marc",
  "lastname": "Lachabody",
  "companyOrDomain": "nec technologies"
}
```

### Responses

| Code | Description |
|------|-------------|
| 200 | URL found |
| 200 | URL not found |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Bulk Profile URL Search

### Endpoint

```
POST https://app.icypeas.com/api/url-search
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Should always be `profile`. |
| `data` | array | Yes | An array containing profiles' information. Max 50 profiles per request. |

### `data` Array Items

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `firstname` | string | Yes | First name of your prospect. |
| `lastname` | string | Yes | Last name of your prospect. |
| `companyOrDomain` | string | No (required if `jobTitle` is empty) | The company name or its domain name (or website). |
| `jobTitle` | string | No (required if `companyOrDomain` is empty) | The job title of your prospect. |

### Example Request

```json
{
  "type": "profile",
  "data": [
    {
      "firstname": "Marc",
      "lastname": "Lachabody",
      "companyOrDomain": "nec technologies"
    },
    {
      "firstname": "Katrina",
      "lastname": "Larenkova",
      "companyOrDomain": "apple"
    }
  ]
}
```

### Response — 200 Success

```json
{
  "success": true,
  "data": [
    {
      "searchId": "#YOUR_SEARCH_ID_1#",
      "status": "FOUND",
      "result": "https://www.linkedin.com/in/my-profile"
    },
    {
      "searchId": "#YOUR_SEARCH_ID_2#",
      "status": "NOT_FOUND",
      "result": ""
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` means the search succeeded (no error raised). |
| `data` | array | Array of result objects. |
| `data[].searchId` | string | The ID of each search item (for fetching results later). |
| `data[].status` | string | `FOUND` when the profile was found, `NOT_FOUND` when not. |
| `data[].result` | string | The profile URL, or an empty string if not found. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |