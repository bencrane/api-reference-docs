# Get Website by Keyword

Get company website URL by keyword / company name. Up to 20 keywords are supported in a single query. This endpoint can be used in case you only have a company name and need to get the website domain before scraping emails and contacts from it.

## Body

`application/json`

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keywords` | array (string[]) | Yes | A list of keywords (companies or site names) to search for. |

## Responses

- **200** — Successful Response (`application/json`)

## Request Example

**POST** `/website-url-by-keyword`

```shell
curl https://api.openwebninja.com/website-contacts-scraper/website-url-by-keyword \
  --request POST \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: YOUR_SECRET_TOKEN' \
  --data '{
  "keywords": [
    "rapidapi",
    "wilson sonsini",
    "microsoft"
  ]
}'
```

## Response Example

**STATUS: 200**

```json
{
  "status": "OK",
  "request_id": "d7551760-750e-41af-9fb8-651e0dc9504a",
  "data": {
    "rapidapi": "https://rapidapi.com",
    "wilson sonsini": "https://www.wsgr.com",
    "microsoft": "https://www.microsoft.com"
  }
}
```
