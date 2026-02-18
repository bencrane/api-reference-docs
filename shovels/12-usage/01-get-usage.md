# Shovels.ai - Usage - Get Usage

## Usage

## Get Usage

Get your current credit usage for the rolling 30-day period.

**GET**

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | required |

### Response

**200** — `application/json`

Current credit usage and limit. Response model for credit usage endpoint.

| Field | Type | Description |
|-------|------|-------------|
| credits_used | integer | **required** — Total credits used in the last 30 days. |
| credit_limit | integer \| null | **required** — Monthly credit limit. NULL means unlimited. |

### Example Request

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/usage \
  --header 'X-API-Key: <api-key>'
```

### Example Response

**200**

```json
{
  "credits_used": 123,
  "credit_limit": 123
}
```