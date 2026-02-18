# Real-Time Finance Data - Market Trends

Get the latest market trends and relevant news. Supported trends: Most Active, Gainers, Losers, Crypto, Currencies and Climate Leaders.

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| trend_type | string (enum) | Yes | — | Trend type. Values: `MARKET_INDEXES`, `MOST_ACTIVE`, `GAINERS`, `LOSERS`, `CRYPTO`, `CURRENCIES`, `CLIMATE_LEADERS` |
| country | string | No | "us" | The country for which to get trends, specified as a 2-letter country code - see ISO 3166. |
| language | string | No | "en" | The language to use for the results, specified as a 2-letter language code - see ISO 639-1. |

## Response

**200** - Successful Response (`application/json`)

## Example Request

```bash
curl 'https://api.openwebninja.com/realtime-finance-data/market-trends?trend_type=MARKET_INDEXES&country=us&language=en' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

## Example Response (200)

```json
{
  "status": "OK",
  "request_id": "dcac100e-400e-4d07-85f7-5b71c6c2873d",
  "data": {
    "trends": [
      {
        "symbol": ".INX:INDEXSP",
        "type": "index",
        "name": "S&P 500",
        "price": 6198.01,
        "change": -6.9404,
        "change_percent": -0.1119,
        "previous_close": 6204.95,
        "last_update_utc": "2025-07-01 20:36:01",
        "exchange_open": "2025-07-02 09:30:00",
        "exchange_close": "2025-07-02 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "google_mid": "/m/016yss"
      },
      {
        "symbol": ".DJI:INDEXDJX",
        "type": "index",
        "name": "Dow Jones Industrial Average",
        "price": 44494.94,
        "change": 400.1719,
        "change_percent": 0.9075,
        "previous_close": 44094.77,
        "last_update_utc": "2025-07-01 20:36:01",
        "exchange_open": "2025-07-02 09:30:00",
        "exchange_close": "2025-07-02 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "google_mid": "/m/0cqyw"
      },
      {
        "symbol": ".IXIC:INDEXNASDAQ",
        "type": "index",
        "name": "Nasdaq Composite",
        "price": 20202.889,
        "change": -166.8457,
        "change_percent": -0.8191,
        "previous_close": 20369.734,
        "last_update_utc": "2025-07-01 21:15:59",
        "exchange_open": "2025-07-02 09:30:00",
        "exchange_close": "2025-07-02 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "google_mid": "/m/02853rl"
      },
      {
        "symbol": "RUT:INDEXRUSSELL",
        "type": "index",
        "name": "Russell 2000 Index",
        "price": 2197.5393,
        "change": 22.5039,
        "change_percent": 1.0346,
        "previous_close": 2175.0354,
        "last_update_utc": "2025-07-01 20:30:11",
        "exchange_open": "2025-07-02 09:30:00",
        "exchange_close": "2025-07-02 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "google_mid": "/m/04zvfw"
      },
      {
        "symbol": "OSPTX:INDEXTSI",
        "type": "index",
        "name": "S&P/TSX Composite Index",
        "price": 26857.11,
        "change": 164.7891,
        "change_percent": 0.6174,
        "previous_close": 26692.32,
        "last_update_utc": "2025-06-30 20:27:29",
        "exchange_open": "2025-07-02 09:30:00",
        "exchange_close": "2025-07-02 16:00:00",
        "timezone": "America/Toronto",
        "utc_offset_sec": -14400,
        "google_mid": "/m/0602km"
      },
      {
        "symbol": "IBOV:INDEXBVMF",
        "type": "index",
        "name": "IBOVESPA",
        "price": 139549.44,
        "change": 694.8438,
        "change_percent": 0.5004,
        "previous_close": 138854.6,
        "last_update_utc": "2025-07-02 08:36:10",
        "exchange_open": "2025-07-02 10:00:00",
        "exchange_close": "2025-07-02 16:56:00",
        "timezone": "America/Sao_Paulo",
        "utc_offset_sec": -10800,
        "google_mid": "/m/04xjcr"
      }
    ],
    "news": [
      {
        "article_title": "Japan Stock Market May Spin Its Wheels On Wednesday",
        "article_url": "https://www.nasdaq.com/articles/japan-stock-market-may-spin-its-wheels-wednesday",
        "source": "Nasdaq",
        "post_time_utc": "2025-07-01 23:15:00",
        "stocks_in_news": [
          {
            "symbol": "NI225:INDEXNIKKEI",
            "type": "index",
            "name": "Nikkei 225"
          }
        ]
      },
      {
        "article_title": "Dow jumps 400 points, S&P 500 closes flat to start new quarter as investors rotate out of tech",
        "article_url": "https://www.cnbc.com/2025/06/30/stock-market-today-live-updates.html",
        "source": "CNBC",
        "post_time_utc": "2025-07-01 07:25:00",
        "stocks_in_news": [
          {
            "symbol": ".INX:INDEXSP",
            "type": "index",
            "name": "S&P 500"
          }
        ]
      }
    ]
  }
}
```
