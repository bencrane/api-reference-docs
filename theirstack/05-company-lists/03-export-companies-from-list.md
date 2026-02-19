# TheirStack - Company Lists - Export Companies From List

Export companies from a list to a CSV or XLSX file.

```
GET https://api.theirstack.com/v0/company_lists/{list_id}/companies/export
```

## Authorization

```
Authorization: Bearer <token>
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `list_id` | integer | Yes | The ID of the company list. |

## Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `file_format` | string | `"csv"` | Export format: `csv` or `xlsx`. |
| `limit` | integer (≥1) | `25` | Number of results per page. |
| `page` | integer (≥0) | `0` | Page number. Required when using page-based pagination. |
| `offset` | integer (≥0) | `0` | Number of results to skip. Required for offset-based pagination. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/company_lists/0/companies/export" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
{
  "url": "string"
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