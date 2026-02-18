# Shovels.ai - Jurisdictions - Get Jurisdiction Details

## Get Jurisdiction Details

Return jurisdiction details and related location hierarchy.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/jurisdictions`

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
  --url https://api.shovels.ai/v2/jurisdictions \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

Jurisdiction-specific details read model.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| geo_id | string | Yes | Geolocation ID |
| name | string | Yes | Formatted entity name |
| state | string | Yes | State abbreviation |
| cities | Cities · object | No | City names mapped to their geo IDs |
| counties | Counties · object | No | County names mapped to their geo IDs |
| zipcodes | (string \| null)[] \| null | No | List of zip codes in the jurisdiction |

### Example Response (200)

```json
{
  "geo_id": "SnVyaXNkaWN0aW9uXzEyMzQ1",
  "name": "SAN FRANCISCO, CA",
  "state": "CA",
  "cities": {
    "SAN FRANCISCO": "Q2l0eV8xMjM0NQ",
    "SAN RAMON": "Q2l0eV8yMzQ1Ng"
  },
  "counties": {
    "SAN FRANCISCO": "Q291bnR5XzEyMzQ1"
  },
  "zipcodes": [
    "94102",
    "94103",
    "94104"
  ]
}
```