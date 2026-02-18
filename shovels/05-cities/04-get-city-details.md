# Shovels.ai - Cities - Get City Details

## Endpoint

```
GET /v2/cities
```

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/cities \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Geolocation ID |

## Response (200)

City details and related location hierarchy.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| geo_id | string | Yes | Geolocation ID |
| name | string | Yes | Formatted entity name |
| state | string | Yes | State abbreviation |
| counties | Counties object | No | Map of county names to geo IDs |
| jurisdictions | Jurisdictions object | No | Map of jurisdiction names to geo IDs |
| zipcodes | (string \| null)[] \| null | No | List of zip codes in the city |

### Response Example

```json
{
  "geo_id": "Q2l0eV8xMjM0NQ",
  "name": "SAN FRANCISCO, CA",
  "state": "CA",
  "counties": {
    "SAN FRANCISCO": "Q291bnR5XzEyMzQ"
  },
  "jurisdictions": {
    "SAN FRANCISCO": "SnVyaXNkaWN0aW9uXzEyMzQ"
  },
  "zipcodes": [
    "94102",
    "94103",
    "94104",
    "94105"
  ]
}
```

### Notes

- Returns city details and related location hierarchy (counties, jurisdictions, zip codes).
- Unlike other endpoints, this returns a single object rather than a paginated list.