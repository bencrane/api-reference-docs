# TheirStack - Catalog - List Technology Categories

Returns a list of main technology categories with the number of technologies and companies in each category. Optionally filters to return a specific category if `category_slug` is provided.

```
GET https://api.theirstack.com/v1/catalog/technologies/categories
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `category_slug` | string (nullable) | — | Optional category slug to filter and return only a specific category. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v1/catalog/technologies/categories?category_slug=finance-and-accounting"
```

## Response (200)

```json
{
  "data": [
    {
      "name": "string",
      "slug": "string",
      "description": "string",
      "number_of_technologies": 0,
      "number_of_companies": 0
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

---

*Last updated on 1/27/2026*