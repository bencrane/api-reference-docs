# TheirStack - Company Lists - Get List

```
GET https://api.theirstack.com/v0/company_lists/{list_id}
```

## Authorization

```
Authorization: Bearer <token>
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `list_id` | integer | Yes | The ID of the company list. |

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/company_lists/0" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
{
  "name": "string",
  "id": 0,
  "created_at": "2019-08-24T14:15:22Z",
  "deletable": true,
  "companies_count": 0,
  "user_id": 0,
  "type": "REVEALED_COMPANIES",
  "webhook_id": 0
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