# TheirStack - Catalog - Get Jobs And Companies Per Job Country Code

This endpoint will return all the country codes and the number of jobs whose location's country code is the given one, and the number of companies with jobs in that country. Calls to this endpoint don't cost you credits.

```
GET https://api.theirstack.com/v0/catalog/jobs_companies_per_job_country_code
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `country` | string (nullable) | — | Name of a country. Will return the country matching their name in English. |
| `page` | integer (≥0) | `0` | Page number. |
| `limit` | integer (≥1) | `25` | Number of results per page. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/catalog/jobs_companies_per_job_country_code"
```

## Response (200)

```json
{
  "data": [
    {
      "iso2": "string",
      "country": "string",
      "num_jobs": 0,
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