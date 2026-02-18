# Shovels.ai - Counties - Search Counties

## Search Counties

Searches for counties based on the provided search term.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/counties/search`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | The name to search for in the county fields. |

### Example Request

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/counties/search \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

A list of counties that match the search text. Paginated response for geographical entities.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | GeoEntitiesRead · object[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

#### Item Attributes (GeoEntitiesRead)

| Field | Type | Description |
|-------|------|-------------|
| geo_id | string | Unique geographic identifier |
| name | string | County name with state |
| state | string | State abbreviation |

### Example Response (200)

```json
{
  "items": [
    {
      "geo_id": "Q291bnR5XzEyMzQ1",
      "name": "Los Angeles County, CA",
      "state": "CA"
    },
    {
      "geo_id": "A291bnR5XzEyMzQ1",
      "name": "Harris County, TX",
      "state": "TX"
    },
    {
      "geo_id": "B291bnR5XzEyMzQ1",
      "name": "Cook County, IL",
      "state": "IL"
    }
  ],
  "size": 3
}
```