# TheirStack - Catalog - Get Industries

This endpoint lets you list all the industries and their codes, see how many jobs and companies we have per industry and search for an industry. Calls to this endpoint don't cost you credits.

Our industries catalogue comes from LinkedIn Industry Codes V2.

```
GET https://api.theirstack.com/v0/catalog/industries
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `industry` | string (nullable) | `""` | Name of an industry, case-insensitive. Will return industries that contain the given string in their name, hierarchy, or description. |
| `page` | integer (≥0) | `0` | Page number. |
| `limit` | integer (≥1) | `25` | Number of results per page. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/catalog/industries"
```

## Response (200)

```json
{
  "data": [
    {
      "industry_id": 0,
      "industry": "string",
      "hierarchy": "string",
      "description": "string",
      "parent_id": 0,
      "companies": 0,
      "jobs": 0
    }
  ],
  "metadata": {
    "total_results": 2034
  }
}
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 422 | Validation error |