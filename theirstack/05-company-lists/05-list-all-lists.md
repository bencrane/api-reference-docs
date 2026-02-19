# TheirStack - Company Lists - List All Lists

Get all the lists for the current user.

```
GET https://api.theirstack.com/v0/company_lists
```

## Authorization

```
Authorization: Bearer <token>
```

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/company_lists" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
[
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