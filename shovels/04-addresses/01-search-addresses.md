# Shovels.ai - Addresses - Search Addresses

## Endpoint

```
GET /v2/addresses/search
```

```bash
curl --request GET \
  --url https://api.shovels.ai/v2/addresses/search \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| q | string | Yes | The text to search for in the address fields. |

## Response (200)

A list of addresses that match the search text, ordered by relevance and in USPS notation.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | AddressesRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### AddressesRead Example

```json
{
  "street_no": "1232",
  "street": "MARKET ST",
  "city": "SAN FRANCISCO",
  "county": "SAN FRANCISCO",
  "zip_code": "94103",
  "zip_code_ext": "1234",
  "state": "CA",
  "jurisdiction": "SAN FRANCISCO",
  "lat": 37.7749,
  "long": -122.41,
  "geo_id": "1",
  "name": "123 Market St, San Francisco, CA"
}
```

### Notes

- Searches for addresses that have at least one associated permit based on the provided text.
- Results are ordered by relevance.