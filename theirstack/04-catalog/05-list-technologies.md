# TheirStack - Catalog - List Technologies

This endpoint lets you list all the technologies we track, search for any given technology and list the technologies within one or several categories. Calls to this endpoint don't cost you credits.

```
GET https://api.theirstack.com/v0/catalog/technologies
```

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name_pattern` | string (nullable) | — | Case-insensitive text to search for in the technology name. |
| `slug` | array\<string\> (nullable) | — | **(deprecated)** Technology slug of a single technology. |
| `slugs` | array\<string\> (nullable) | — | Technology slugs of one or many technologies. |
| `category_pattern` | string (nullable) | — | Case-insensitive text to search for in the technology category (e.g., `data` to find "data tools"). |
| `category_slug` | string (nullable) | — | Technology category slug. |
| `parent_category_slug` | string (nullable) | — | Technology parent category slug. |
| `parent_category_pattern` | string (nullable) | — | Case-insensitive text to search for in the technology parent category name. |
| `page` | integer (≥0) | `0` | Page number. |
| `limit` | integer (≥1) | `25` | Number of results per page. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/catalog/technologies"
```

## Response (200)

```json
[
  {
    "name": "PostgreSQL",
    "category": "Relational Database",
    "slug": "kafka",
    "category_slug": "message-queue",
    "parent_category": "Data Stores",
    "parent_category_slug": "data-stores",
    "logo": "string",
    "logo_thumbnail": "string",
    "one_liner": "Apache Kafka",
    "url": "string",
    "description": "string",
    "jobs": 0,
    "companies": 0,
    "companies_found_last_week": 0
  }
]
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |