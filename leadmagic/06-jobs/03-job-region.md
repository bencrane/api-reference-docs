# Jobs - Job Region

> Use this API to retrieve the region ID, which can then be used in the Jobs Finder API to filter jobs by region.

**Free Endpoint** — No credits charged. Cache results locally.

---

## Endpoint Details

**GET** `/v1/jobs/regions`

---

## Response Fields

| Field  | Type    | Description       |
| ------ | ------- | ----------------- |
| `id`   | integer | Region identifier |
| `name` | string  | Region name       |

Combine `country_id` and `region_id` in Jobs Finder for precise geographic targeting (e.g., California only).

### Example Response

```json
[
  { "id": 1, "name": "Africa" },
  { "id": 2, "name": "Asia/Pacific" },
  { "id": 3, "name": "Europe" },
  { "id": 4, "name": "Middle East" },
  { "id": 5, "name": "North America" },
  { "id": 6, "name": "South America" }
]
```

---

## Related Endpoints

- **Jobs Finder** (`/v1/jobs/jobs-finder`) — Use `region_id` to filter results.
- **Countries** (`/v1/jobs/countries`) — Parent country codes.

---

## Error Responses

| Status | Code                     | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| 401    | `missing_authentication` | Missing `X-API-Key` header            |
| 401    | `invalid_api_key`        | Invalid or expired API key            |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |