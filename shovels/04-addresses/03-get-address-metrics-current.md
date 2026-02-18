# Shovels.ai - Addresses - Get Address Metrics Current

## Endpoint

```
GET /v2/addresses/{geo_id}/metrics/current
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/addresses/{geo_id}/metrics/current?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Filter by the specified geolocation ID. |

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| tag | string | Yes | — | Filter by tag |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

Current metrics for the address.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | AddressesMetricsCurrentRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### AddressesMetricsCurrentRead Example

```json
{
  "geo_id": "MDEyMzQ1Njc4OWFiY2RlZg==",
  "tag": "solar",
  "permit_count": 42,
  "contractor_count": 15,
  "avg_construction_duration": 60,
  "avg_approval_duration": 14,
  "total_job_value": 12500000,
  "avg_inspection_pass_rate": 85,
  "permit_active_count": 25,
  "permit_in_review_count": 17
}
```

### Notes

- Returns current address metrics (no date range required, unlike the monthly endpoint).
- Includes additional fields `permit_active_count` and `permit_in_review_count` not present in the monthly metrics.