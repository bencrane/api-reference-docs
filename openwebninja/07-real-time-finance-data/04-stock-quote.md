# Real-Time Finance Data - Stock Quote

Get stock market quote. Supports all stock types: stock, index, mutual fund and futures.

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| symbol | string | Yes | — | Stock symbol / ticker, specified with or without exchange symbol. **Batching:** up to 100 symbols are supported in a single request (separated by comma). **Note:** every 10 symbols will be charged as a single request - for example, sending 78 symbols will be counted & charged as 8 requests. |
| language | string | No | "en" | The language to use for the results, specified as a 2-letter language code - see ISO 639-1. |

## Response

**200** - Successful Response (`application/json`)

## Example Request

```bash
curl 'https://api.openwebninja.com/realtime-finance-data/stock-quote?language=en' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

## Example Response (200)

```json
{
  "status": "OK",
  "request_id": "93e28af7-b9e9-434d-a032-63877bb69f7b",
  "data": {
    "symbol": "AAPL:NASDAQ",
    "name": "Apple Inc",
    "type": "stock",
    "price": 207.82,
    "open": 206.665,
    "high": 210.1865,
    "low": 206.1401,
    "volume": 66821,
    "previous_close": 205.17,
    "change": 2.65,
    "change_percent": 1.2916,
    "pre_or_post_market": 209.33,
    "pre_or_post_market_change": 1.51,
    "pre_or_post_market_change_percent": 0.7266,
    "last_update_utc": "2025-07-02 09:27:47"
  }
}
```
