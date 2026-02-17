# Icypeas API — Scrape Data: Find Company URLs

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Single Company URL Search

### Endpoint

```
POST https://app.icypeas.com/api/url-search/company
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `companyOrDomain` | string | Yes | The company name or its domain name (or website). |

### Example Request

```json
{
  "companyOrDomain": "nec technologies"
}
```

### Responses

| Code | Description |
|------|-------------|
| 200 | Company URL found |
| 200 | Company URL not found |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Bulk Company URL Search

### Endpoint

```
POST https://app.icypeas.com/api/url-search
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Should always be `company`. |
| `data` | array | Yes | An array containing companies' information. Max 50 companies per request. |

### `data` Array Items

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `companyOrDomain` | string | Yes | The company name or its domain name (or website). |

### Example Request

```json
{
  "type": "company",
  "data": [
    {
      "companyOrDomain": "nec technologies"
    },
    {
      "companyOrDomain": "icypessaezeaze"
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
      "result": "https://www.linkedin.com/in/nec-technologies"
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
| `data[].status` | string | `FOUND` when the company was found, `NOT_FOUND` when not. |
| `data[].result` | string | The company URL, or an empty string if not found. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |