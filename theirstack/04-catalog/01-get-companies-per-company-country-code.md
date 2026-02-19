# TheirStack - Catalog - Get Companies Per Company Country Code

This endpoint will return all country codes and the number of companies whose HQ is in that country. Calls to this endpoint don't cost you credits.

```
GET https://api.theirstack.com/v0/catalog/companies_per_company_country_code
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `country` | string (nullable) | — | Name of a country. Will return the country matching their name in English. |
| `page` | integer (≥0) | `0` | Page number. |
| `limit` | integer (≥1) | `25` | Number of results per page. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/catalog/companies_per_company_country_code"
```

## Response (200)

```json
{
  "data": [
    {
      "iso2": "string",
      "country": "string",
      "num_companies": 0
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
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |