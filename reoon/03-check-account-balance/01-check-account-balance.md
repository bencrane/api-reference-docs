# REOON - CHECK API CREDITS BALANCE

## Check Account Balance (Remaining Credits)

Use the following GET request to check the current account balance (remaining daily and instant credits).

### GET Request URL (HTTPS)

```
https://emailverifier.reoon.com/api/v1/check-account-balance/?key=<Your_API_Key>
```

Replace `<Your_API_Key>` with your active API key.

### Response (JSON)

```json
{
    "api_status": "active",
    "remaining_daily_credits": 150,
    "remaining_instant_credits": 5000,
    "status": "success"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `api_status` | String | Status of the API key (e.g. `"active"`) |
| `remaining_daily_credits` | Integer | Remaining daily credit balance |
| `remaining_instant_credits` | Integer | Remaining instant credit balance |
| `status` | String | `"success"` if request was successful |