# Shovels.ai - Counties - Get County Details

## Get County Details

Return county details and related location hierarchy.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/counties`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Geolocation ID |

### Example Request

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/counties \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

County-specific details read model.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| geo_id | string | Yes | Geolocation ID |
| name | string | Yes | Formatted entity name |
| state | string | Yes | State abbreviation |
| cities | Cities · object | No | City names mapped to their geo IDs |
| jurisdictions | Jurisdictions · object | No | Jurisdiction names mapped to their geo IDs |
| zipcodes | (string \| null)[] \| null | No | List of zip codes in the county |

### Example Response (200)

```json
{
  "geo_id": "Q291bnR5XzEyMzQ1",
  "name": "SAN FRANCISCO, CA",
  "state": "CA",
  "cities": {
    "SAN FRANCISCO": "Q2l0eV8xMjM0NQ",
    "SAN RAMON": "Q2l0eV8yMzQ1Ng"
  },
  "jurisdictions": {
    "SAN FRANCISCO": "SnVyaXNkaWN0aW9uXzEyMzQ1"
  },
  "zipcodes": [
    "94102",
    "94103",
    "94104"
  ]
}
```