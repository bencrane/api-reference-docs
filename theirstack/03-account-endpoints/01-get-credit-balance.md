# TheirStack - Account - Get Credit Balance

Get your current credits balance.

```
GET https://api.theirstack.com/v0/billing/credit-balance
```

## Authorization

```
Authorization: Bearer <token>
```

## Example Request

```bash
curl -X GET "https://api.theirstack.com/v0/billing/credit-balance" \
  -H "Authorization: Bearer <token>"
```

## Response (200)

```json
{
  "ui_credits": 0,
  "used_ui_credits": 0,
  "api_credits": 0,
  "used_api_credits": 0
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