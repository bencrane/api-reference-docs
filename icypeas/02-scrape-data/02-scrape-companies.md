# Icypeas API — Scrape Data: Scrape Companies

> **CAUTION:** Rate limits always apply on all routes. Check the dedicated page for more information.

## Single Company Scraping

### Endpoint

```
GET https://app.icypeas.com/api/scrape/company?url=PROFILE_URL
```

### Response — 200 Success (Found)

```json
{
  "success": true,
  "searchId": "#YOUR_SEARCH_ID#",
  "status": "FOUND",
  "result": {
    "name": "NEC Technologies",
    "lid": "nec-technologies",
    "url": "https://www.linkedin.com/company/nec-technologies/",
    "description": "NEC Technologies",
    "urn": "urn:li:fs_salesCompany:1693",
    "address": {
      "streetAddress": "",
      "addressLocality": "Greater Tokyo Area",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": "Japan",
      "addressCountryCode": "JP"
    },
    "numberOfEmployees": 62,
    "industry": "Computer Hardware Manufacturing",
    "website": "https://www.nec.com/",
    "specialties": [],
    "type": "Public Company",
    "deleted": false,
    "foundedYear": "1899",
    "pictureUrl": "https://...",
    "estimatedRevenuRange": {
      "estimatedMaxRevenue": { "amount": 1000, "unit": "BILLION", "currency": "USD" },
      "estimatedMinRevenue": { "amount": 1, "unit": "BILLION", "currency": "USD" }
    },
    "employeeGrowth": [
      { "percentage": 16, "timespan": "SIX_MONTHS" },
      { "percentage": 40, "timespan": "YEAR" },
      { "percentage": 40, "timespan": "TWO_YEAR" }
    ]
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` means the search succeeded (no error raised). |
| `searchId` | string | The ID of the search item (for fetching results later). |
| `status` | string | `FOUND` when the company was found. |
| `result` | object | The company data. |

### Company Result Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Icypeas unique identifier. |
| `name` | string | Company name. |
| `url` | string | LinkedIn company URL. |
| `urn` | string | LinkedIn company URN. |
| `website` | string | Company website. |
| `slogan` | string | Company slogan. |
| `industry` | string | Company industry. |
| `foundedYear` | number | Company founded year (-1 when not known). |
| `specialties` | array | Company specialties (each with `value`). |
| `lid` | string | LinkedIn ID (the `my-linkedin-id` in `https://linkedin.com/company/my-linkedin-id`). |
| `description` | string | Company description. |
| `pictureUrl` | string | Company image URL. |
| `type` | string | Company legal form (LLC, SAS, SARL, GmbH, etc.). |
| `address` | object | Address information. |
| `address.streetAddress` | string | Street address. |
| `address.addressLocality` | string | Address locality. |
| `address.addressRegion` | string | Address region. |
| `address.postalCode` | string | Postal code. |
| `address.addressCountry` | string | Address country. |
| `address.addressCountryCode` | string | Address country code (ISO Alpha 2 or UNK). |
| `deleted` | boolean | Indicates if the company has been deleted. |
| `numberOfEmployees` | number | Number of employees (-1 when not known). |

### `estimatedRevenuRange` Object

| Field | Type | Description |
|-------|------|-------------|
| `estimatedMaxRevenue` | object | Estimation of max revenue. |
| `estimatedMaxRevenue.amount` | number | Amount. |
| `estimatedMaxRevenue.unit` | string | Amount unit (BILLION, MILLION, THOUSAND, etc.). |
| `estimatedMaxRevenue.currency` | string | Amount currency (three letters). |
| `estimatedMinRevenue` | object | Estimation of min revenue. |
| `estimatedMinRevenue.amount` | number | Amount. |
| `estimatedMinRevenue.unit` | string | Amount unit (BILLION, MILLION, THOUSAND, etc.). |
| `estimatedMinRevenue.currency` | string | Amount currency (three letters). |

### `revenue` Object (when known/disclosed)

| Field | Type | Description |
|-------|------|-------------|
| `amount` | number | Amount. |
| `unit` | string | Amount unit (BILLION, MILLION, THOUSAND, etc.). |
| `currency` | string | Amount currency (three letters). |

### `employeeGrowth` Array

| Field | Type | Description |
|-------|------|-------------|
| `percentage` | number | Employee growth percentage. |
| `timespan` | string | Time span (SIX_MONTHS, YEAR, TWO_YEAR, etc.). |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Company not found |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |

---

## Bulk Companies Scraping

### Endpoint

```
POST https://app.icypeas.com/api/scrape
```

### Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Should always be `company`. |
| `data` | array | Yes | An array containing the company URLs to scrape. Max 50 companies per request. |

### Example Request

```json
{
  "type": "company",
  "data": [
    "https://www.linkedin.com/company/nec-technologies",
    "https://www.linkedin.com/company/icypessaezeaze"
  ]
}
```

### Responses

| Code | Description |
|------|-------------|
| 200 | Success (no validation errors) |
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |