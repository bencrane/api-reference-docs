# Shovels.ai - Addresses - Get Address Metrics Monthly

## Endpoint

```
GET /v2/addresses/{geo_id}/metrics/monthly
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/addresses/{geo_id}/metrics/monthly?size=50' \
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
| metric_from | string\<date\> | Yes | — | Start date for metrics (inclusive) |
| metric_to | string\<date\> | Yes | — | End date for metrics (inclusive) |
| tag | string | Yes | — | Filter by tag |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

Successfully retrieved monthly address metrics.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | AddressesMetricsMonthlyRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### AddressesMetricsMonthlyRead Example

```json
{
  "geo_id": "abc123",
  "tag": "all",
  "permit_count": 42,
  "contractor_count": 15,
  "avg_construction_duration": 60,
  "avg_approval_duration": 14,
  "total_job_value": 12500000,
  "avg_inspection_pass_rate": 85,
  "date": "2023-01-01"
}
```

### Notes

- Returns monthly address metrics for a given geolocation ID.
- Metrics include permit count, contractor count, average durations, total job value, and average inspection pass rate.