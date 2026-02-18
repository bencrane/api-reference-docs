# Real-Time Finance Data - Search

Find stocks, indices, mutual funds, futures, currency / forex / crypto using a free-form query or symbol as seen on Google Finance - https://www.google.com/finance.

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| query | string | Yes | — | Free-form search query. |
| language | string | No | "en" | The language to use for the results, specified as a 2-letter language code - see ISO 639-1. |

## Response

**200** - Successful Response (`application/json`)

## Example Request

```bash
curl 'https://api.openwebninja.com/realtime-finance-data/search?language=en' \
  --header 'x-api-key: YOUR_SECRET_TOKEN'
```

## Example Response (200)

```json
{
  "status": "OK",
  "request_id": "e10d54fc-1285-4e34-88c2-730728d1592d",
  "data": {
    "stock": [
      {
        "symbol": "AAPL:NASDAQ",
        "name": "Apple Inc",
        "type": "stock",
        "price": 207.82,
        "change": 2.65,
        "change_percent": 1.2916,
        "previous_close": 205.17,
        "last_update_utc": "2025-07-02 09:03:42",
        "country_code": "US",
        "exchange": "NASDAQ",
        "exchange_open": "2025-07-01 09:30:00",
        "exchange_close": "2025-07-01 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "currency": "USD",
        "google_mid": "/m/07zmbvf"
      },
      {
        "symbol": "APLE:NYSE",
        "name": "Apple Hospitality REIT Inc",
        "type": "stock",
        "price": 11.91,
        "change": 0.23,
        "change_percent": 1.9692,
        "previous_close": 11.68,
        "last_update_utc": "2025-07-02 08:33:20",
        "country_code": "US",
        "exchange": "NYSE",
        "exchange_open": "2025-07-01 09:30:00",
        "exchange_close": "2025-07-01 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "currency": "USD",
        "google_mid": "/g/11bwqbl2lq"
      },
      {
        "symbol": "0R2V:LON",
        "name": "Apple Inc",
        "type": "stock",
        "price": 209.31,
        "change": 1.28,
        "change_percent": 0.6153,
        "previous_close": 208.03,
        "last_update_utc": "2025-07-02 09:03:40",
        "country_code": "GB",
        "exchange": "LON",
        "exchange_open": "2025-07-02 08:00:00",
        "exchange_close": "2025-07-02 16:30:00",
        "timezone": "Europe/London",
        "utc_offset_sec": 3600,
        "currency": "USD",
        "google_mid": "/g/11g02v7mfx"
      },
      {
        "symbol": "APC:ETR",
        "name": "Apple Inc",
        "type": "stock",
        "price": 177.72,
        "change": 1.18,
        "change_percent": 0.6684,
        "previous_close": 176.54,
        "last_update_utc": "2025-07-02 08:47:54",
        "country_code": "DE",
        "exchange": "ETR",
        "exchange_open": "2025-07-02 09:00:00",
        "exchange_close": "2025-07-02 17:30:00",
        "timezone": "Europe/Berlin",
        "utc_offset_sec": 7200,
        "currency": "EUR",
        "google_mid": "/g/11f102cqtm"
      },
      {
        "symbol": "MSFT:NASDAQ",
        "name": "Microsoft Corp",
        "type": "stock",
        "price": 492.05,
        "change": -5.36,
        "change_percent": -1.0776,
        "previous_close": 497.41,
        "last_update_utc": "2025-07-02 09:04:21",
        "country_code": "US",
        "exchange": "NASDAQ",
        "exchange_open": "2025-07-01 09:30:00",
        "exchange_close": "2025-07-01 16:00:00",
        "timezone": "America/New_York",
        "utc_offset_sec": -14400,
        "currency": "USD",
        "google_mid": "/m/07zln_9"
      },
      {
        "symbol": "AAPL:BMV",
        "name": "Apple Inc",
        "type": "stock",
        "price": 3899.99,
        "change": 28.6001,
        "change_percent": 0.7388,
        "previous_close": 3871.39,
        "last_update_utc": "2025-07-01 21:00:01",
        "country_code": "MX",
        "exchange": "BMV",
        "exchange_open": "2025-07-01 08:30:00",
        "exchange_close": "2025-07-01 15:00:00",
        "timezone": "America/Mexico_City",
        "utc_offset_sec": -21600,
        "currency": "MXN",
        "google_mid": "/g/11bbrs9b72"
      }
    ],
    "ETF": [],
    "index": [],
    "mutual_fund": [
      {
        "symbol": "APPLX:MUTF",
        "name": "Appleseed Fund Investor Share",
        "type": "mutual_fund",
        "price": 15.86,
        "change": 0.11,
        "change_percent": 0.6984,
        "previous_close": 15.86,
        "last_update_utc": "2025-07-01 00:00:00",
        "currency": "USD",
        "google_mid": "/g/1ywbqxm3g"
      },
      {
        "symbol": "APPIX:MUTF",
        "name": "Appleseed Fund Institutional Share",
        "type": "mutual_fund",
        "price": 15.97,
        "change": 0.1,
        "change_percent": 0.6301,
        "previous_close": 15.97,
        "last_update_utc": "2025-07-01 00:00:00",
        "currency": "USD",
        "google_mid": "/g/1ywbr0sf1"
      }
    ],
    "currency": [],
    "futures": []
  }
}
```
