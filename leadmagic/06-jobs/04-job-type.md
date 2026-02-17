# Jobs - Job Type

> Use this API to retrieve the Job Type ID, which can then be used in the Jobs Finder API to filter jobs by Job Type.

**Free Endpoint** — No credits charged. Cache results locally.

---

## Endpoint Details

**GET** `/v1/jobs/job-types`

---

## Common Types

| ID | Type       | Description                   |
| -- | ---------- | ----------------------------- |
| 1  | Full Time  | Standard full-time employment |
| 2  | Part Time  | Part-time positions           |
| 3  | Temporary  | Short-term positions          |
| 4  | Internship | Internship programs           |
| 5  | Freelance  | Freelance work                |
| 6  | Contract   | Temporary/contract work       |

Combine with `experience_level` in Jobs Finder for precise targeting (e.g., "Full-time Senior" roles).

---

## Response

Returns an array of job type objects.

| Field  | Type    | Description      |
| ------ | ------- | ---------------- |
| `id`   | integer | Job type ID      |
| `name` | string  | Job type name    |

### Example Response

```json
[
  { "id": 1, "name": "Full Time" },
  { "id": 2, "name": "Part Time" },
  { "id": 3, "name": "Temporary" },
  { "id": 4, "name": "Internship" },
  { "id": 5, "name": "Freelance" },
  { "id": 6, "name": "Contract" }
]
```

---

## Related Endpoints

- **Jobs Finder** (`/v1/jobs/jobs-finder`) — Use `job_type_id` to filter results.
- **Company Types** (`/v1/jobs/company-types`) — Filter by company size.

---

## Error Responses

| Status | Code                     | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| 401    | `missing_authentication` | Missing `X-API-Key` header            |
| 401    | `invalid_api_key`        | Invalid or expired API key            |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |