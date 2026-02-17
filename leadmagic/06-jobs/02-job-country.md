# Job Country

> Use this API to retrieve the country ID, which can then be used in the Jobs Finder API to filter jobs by country.

**Free Endpoint** — No credits charged. Cache results locally.

---

## Endpoint Details

**GET** `/v1/jobs/countries`

---

## Common Codes

| Country        | Code |
| -------------- | ---- |
| United States  | `US` |
| United Kingdom | `UK` |
| Canada         | `CA` |
| Germany        | `DE` |
| Australia      | `AU` |
| France         | `FR` |
| India          | `IN` |

---

## Response

Returns an array of country objects.

| Field  | Type   | Description        |
| ------ | ------ | ------------------ |
| `id`   | string | Country code       |
| `name` | string | Country name       |

### Example Response

```json
[
  { "id": "AL", "name": "Albania" },
  { "id": "DZ", "name": "Algeria" },
  { "id": "AD", "name": "Andorra" },
  { "id": "AO", "name": "Angola" },
  { "id": "AG", "name": "Antigua and Barbuda" }
]
```

---

## Related Endpoints

- **Jobs Finder** (`/v1/jobs/jobs-finder`) — Use `country_id` to filter results.
- **Regions** (`/v1/jobs/regions`) — States/provinces within countries.

---

## Error Responses

| Status | Code                     | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| 401    | `missing_authentication` | Missing `X-API-Key` header           |
| 401    | `invalid_api_key`        | Invalid or expired API key           |
| 500    | `INTERNAL_ERROR`         | Server error — retry after 30 seconds |