# Credits

`GET` `https://api.ampleleads.io/v1/credits`

## Request

```bash
curl --request GET \
     --url https://api.ampleleads.io/v1/credits \
     --header 'accept: application/json'
```

## Response

**200**

```json
{
  "success": true,
  "data": {
    "available_credits": 36635
  }
}
```