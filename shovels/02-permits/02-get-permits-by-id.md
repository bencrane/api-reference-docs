# Shovels.ai - Permits - Get Permits by ID

## Endpoint

```
GET /v2/permits
```

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/permits \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string[] | Yes | Filter by the permit's ID. Max array length: 50 |

## Response (200)

Schema for paginated permits details response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | PermitsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### Notes

- Returns a list of permits records for given IDs.
- Results are paginated using cursor-based pagination.
- The PermitsRead object schema is the same as documented in [Search Permits](Shovels_Permits_Search_Permits.md).