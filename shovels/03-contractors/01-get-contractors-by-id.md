# Shovels.ai - Contractors - Get Contractors by ID

## Endpoint

```
GET /v2/contractors
```

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/contractors \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string[] | Yes | Filter by the contractor ID. Max array length: 50 |
| cursor | string \| null | No | Cursor for pagination |

## Response (200)

Schema for paginated contractors details response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | ContractorsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### Notes

- Returns contractors by their IDs.
- Multiple `id` query parameters can be provided in the same API call.
- Results are paginated using cursor-based pagination.