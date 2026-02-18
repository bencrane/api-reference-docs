# Shovels.ai - Jurisdictions - Search Jurisdictions

## Search Jurisdictions

Searches for jurisdictions based on the provided search term.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/jurisdictions/search`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | The name to search for in the jurisdiction fields. |

### Example Request

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/jurisdictions/search \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

A list of jurisdictions that match the search text. Paginated response for geographical entities.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | GeoEntitiesRead · object[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

#### Item Attributes (GeoEntitiesRead)

| Field | Type | Description |
|-------|------|-------------|
| geo_id | string | Unique geographic identifier |
| name | string | Jurisdiction name with state |
| state | string | State abbreviation |

### Example Response (200)

```json
{
  "items": [
    {
      "geo_id": "Q2l0eV8xMjM0NQ",
      "name": "Sanford, FL",
      "state": "FL"
    },
    {
      "geo_id": "A2l0eV8xMjM0NQ",
      "name": "Abilene, TX",
      "state": "TX"
    },
    {
      "geo_id": "B2l0eV8xMjM0NQ",
      "name": "Albany, CA",
      "state": "CA"
    }
  ],
  "size": 3
}
```