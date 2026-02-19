# TheirStack - Catalog - Get Geographic Locations

Search for geographic locations by name or ID to retrieve standardized location data. The returned location data can be used with the Job Search and Company Search endpoints. This endpoint does not consume API credits.

Location data is sourced from GeoNames.

```
GET https://api.theirstack.com/v0/catalog/locations
```

## Authorization

```
Authorization: Bearer <token>
```

## Examples

Search for locations by name:

```bash
curl "https://api.theirstack.com/v0/catalog/locations?name=Paris" \
  --header "Authorization: Bearer YOUR_API_KEY"
```

Retrieve location details by ID:

```bash
curl "https://api.theirstack.com/v0/catalog/locations?id=2968815" \
  --header "Authorization: Bearer YOUR_API_KEY"
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `id` | integer \| array\<integer\> (nullable) | — | The IDs of the locations. |
| `name` | string (nullable) | — | Search value to filter locations by name. |
| `country_code` | string (nullable) | — | Country code to filter all returned locations. |
| `feature_code` | string \| array\<string\> (nullable) | — | GeoNames feature code(s) to filter by location type (e.g., `PPL` = populated place, `ADM1` = first-order admin division). See https://www.geonames.org/export/codes.html |
| `offset` | integer (≥0) | `0` | The offset of the results. |
| `limit` | integer (1–100000) | `5` | The limit of the results. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/catalog/locations" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
[
  {
    "id": 5128581,
    "name": "New York",
    "admin1_name": "New York",
    "country_code": "US",
    "feature_code": "PPL",
    "feature_name": "city",
    "display_name": "string",
    "country_name": "string"
  }
]
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |