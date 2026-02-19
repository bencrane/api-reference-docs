# TheirStack - Catalog - List Technology Subcategories

Returns a list of technology subcategories with their technologies. Behavior: returns all subcategories if no parameters are provided; returns all subcategories for a specific parent category if only `category_slug` is provided; returns a specific subcategory if both `category_slug` and `subcategory_slug` are provided.

```
GET https://api.theirstack.com/v1/catalog/technologies/subcategories
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `subcategory_slug` | string (nullable) | — | Subcategory slug to filter by a specific subcategory. Must be used together with `category_slug`. |
| `category_slug` | string (nullable) | — | Parent category slug. If provided with `subcategory_slug`, returns only that specific subcategory. If provided alone, returns all subcategories for that parent category. |
| `num_technologies_per_category` | integer | `5` | Number of technologies per category to include in the response. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v1/catalog/technologies/subcategories?subcategory_slug=account-reconciliation&category_slug=finance-and-accounting"
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
      "number_of_companies": 0,
      "technologies": [
        {
          "name": "string",
          "logo": "string",
          "slug": "string"
        }
      ],
      "category_slug": "string"
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