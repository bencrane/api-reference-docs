# Icypeas API — Reverse Email Lookup

## Single Search: Find the Profile URL Behind a Single Email Address

Use this route to find the profile URL behind a single professional email address.

### Endpoint

```
POST https://app.icypeas.com/api/reverse-email-lookup
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | A professional email address. |

### Example Request

```json
{
  "email": "pierre.landoin@icypeas.com"
}
```

### Responses

| Code | Description |
|------|-------------|
| 200 | Input compliant, profile URL found |
| 200 | Input compliant, profile URL not found |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Bulk Search: Find the Profile URLs Behind Many Email Addresses

Use this route to find the profile URLs of many (up to 50 per request) professional email addresses.

### Endpoint

```
POST https://app.icypeas.com/api/reverse-email-lookups
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | array | Yes | An array of professional email addresses. Minimum 2, maximum 50. |

### Example Request

```json
{
  "data": [
    "pierre.landoin@icypeas.com",
    "magnus@icypeas.com"
  ]
}
```

### Response — 200 Success

```json
{
  "success": true,
  "data": [
    {
      "searchId": "RUiDo5sBptEgZPBRAC7O",
      "status": "FOUND",
      "result": "https://www.linkedin.com/in/pierre-baptiste-landoin-icypeas"
    },
    {
      "searchId": "RDiDo5sBptEgZPBRAC81",
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
| `data[].searchId` | string | The ID of the search item (for fetching results later). |
| `data[].status` | string | `FOUND` if the profile URL was found, `NOT_FOUND` otherwise. |
| `data[].result` | string | The profile URL if found, empty string otherwise. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |