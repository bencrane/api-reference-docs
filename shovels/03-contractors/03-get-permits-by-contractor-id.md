# Shovels.ai - Contractors - Get Permits by Contractor ID

## Endpoint

```
GET /v2/contractors/{id}/permits
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/contractors/{id}/permits?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Filter by the specified contractor ID. |

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

A list of permits associated with the contractor and grouped by address.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | PermitsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### Notes

- Retrieves all permits associated with a single contractor.
- Results are grouped by address.
- The PermitsRead object schema is the same as documented in [Search Permits](Shovels_Permits_Search_Permits.md).