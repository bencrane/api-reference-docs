# Shovels.ai - Cities - Search Cities

## Endpoint

```
GET /v2/cities/search
```

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/cities/search \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | The name to search for in the city fields. |

## Response (200)

A list of cities that match the search text.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | GeoEntitiesRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### GeoEntitiesRead Example

```json
{
  "geo_id": "Q2l0eV8xMjM0NQ",
  "name": "SAN FRANCISCO, SAN FRANCISCO, CA",
  "state": "CA"
}
```

### Notes

- Searches for cities based on the provided search term.
- The same GeoEntitiesRead schema is shared across city, county, zip code, and jurisdiction search endpoints.