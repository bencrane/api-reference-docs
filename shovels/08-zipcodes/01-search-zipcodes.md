# Shovels.ai - Zipcodes - Search Zipcodes

## Search Zipcodes

Searches for zipcodes based on the provided search term.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/zipcodes/search`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| q | string | Yes | — | The code to search for in the zipcodes fields. |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: `1 <= x <= 100` |

### Example Request

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/zipcodes/search?size=50' \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

A list of zipcodes that match the search code. Paginated response for zipcodes.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | Zipcodes · object[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

#### Item Attributes (Zipcodes)

| Field | Type | Description |
|-------|------|-------------|
| geo_id | string | Zipcode value |
| state | string | State abbreviation |

### Example Response (200)

```json
{
  "items": [
    {
      "geo_id": "94705",
      "state": "CA"
    },
    {
      "geo_id": "94704",
      "state": "CA"
    },
    {
      "geo_id": "73301-5678",
      "state": "TX"
    }
  ],
  "size": 3
}
```