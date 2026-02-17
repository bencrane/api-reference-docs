# Jobs - Job Industry

> Use this API to retrieve the Industry ID, which can then be used in the Jobs Finder API to filter jobs by Industry.

**Free Endpoint** — No credits charged. Cache results locally.

---

## Endpoint Details

**GET** `/v1/jobs/industries`

---

## Common Industries

| Industry      | Examples                    |
| ------------- | --------------------------- |
| Technology    | Software, SaaS, IT services |
| Finance       | Banking, fintech, insurance |
| Healthcare    | Medical, biotech, pharma    |
| Manufacturing | Industrial, production      |
| Retail        | E-commerce, brick & mortar  |
| Marketing     | Agencies, adtech            |
| Education     | EdTech, schools, training   |
| Real Estate   | Property, construction      |

---

## Response

Returns an array of industry objects.

| Field  | Type    | Description   |
| ------ | ------- | ------------- |
| `id`   | integer | Industry ID   |
| `name` | string  | Industry name |

### Example Response

```json
[
  { "id": 22, "name": "Accounting" },
  { "id": 318, "name": "Administration of Justice" },
  { "id": 297, "name": "Administrative and Support Services" },
  { "id": 8, "name": "Advertising Services" },
  { "id": 245, "name": "Agricultural Chemical Manufacturing" }
]
```

---

## Workflow: Target Your ICP

1. **Get Industry ID** — Find your target industry ID from this endpoint.
2. **Find Hiring Companies** — Use Jobs Finder with `company_industry_id`.
3. **Research Companies** — Use Company Search for full details.
4. **Find Contacts** — Use Role Finder for decision makers.

---

## Related Endpoints

- **Jobs Finder** (`/v1/jobs/jobs-finder`) — Use `company_industry_id` to filter results.
- **Company Types** (`/v1/jobs/company-types`) — Filter by company size.

---

## Error Responses

| Status | Code                     | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| 401    | `missing_authentication` | Missing `X-API-Key` header            |
| 401    | `invalid_api_key`        | Invalid or expired API key            |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |