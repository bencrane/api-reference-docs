# TheirStack - Company Lists - Delete Company List

```
DELETE https://api.theirstack.com/v0/company_lists/{list_id}
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
curl -X DELETE "https://api.theirstack.com/v0/company_lists/0" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
null
```

## Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad request |
| 402 | Payment required |
| 422 | Validation error |
| 500 | Internal server error |