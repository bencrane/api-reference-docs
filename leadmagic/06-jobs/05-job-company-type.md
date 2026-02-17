# Jobs - Job Company Type

> Use this API to retrieve the Company Type ID, which can then be used in the Jobs Finder API to filter jobs by Company Type.

**Free Endpoint** — No credits charged. Cache results locally.

---

## Endpoint Details

**GET** `/v1/jobs/company-types`

---

## Common Types

| Type           | Description                |
| -------------- | -------------------------- |
| Startup        | Early-stage companies      |
| Small Business | SMBs (<50 employees)       |
| Mid-Market     | Growing companies (50-500) |
| Enterprise     | Large corporations (500+)  |
| Public         | Publicly traded            |
| Private        | Private companies          |
| Non-Profit     | Non-profit organizations   |
| Government     | Government agencies        |

Target startups for fast-moving buyers, or enterprise for larger deal sizes.

---

## Response

Returns an array of company type objects.

| Field  | Type    | Description       |
| ------ | ------- | ----------------- |
| `id`   | integer | Company type ID   |
| `name` | string  | Company type name |

---

## Related Endpoints

- **Jobs Finder** (`/v1/jobs/jobs-finder`) — Use `company_type_id` to filter results.
- **Industries** (`/v1/jobs/industries`) — Filter by industry sector.

---

## Error Responses

| Status | Code                     | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| 401    | `missing_authentication` | Missing `X-API-Key` header            |
| 401    | `invalid_api_key`        | Invalid or expired API key            |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |