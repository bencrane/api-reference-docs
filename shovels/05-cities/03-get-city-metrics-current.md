# Shovels.ai - Cities - Get City Metrics Current

## Endpoint

```
GET /v2/cities/{geo_id}/metrics/current
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/cities/{geo_id}/metrics/current?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Filter by the specified city ID. |

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| property_type | string | Yes | — | Filter by property type |
| tag | string | Yes | — | Filter by tag |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

Current metrics for the city.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | CitiesMetricsCurrentRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### CitiesMetricsCurrentRead Example

```json
{
  "geo_id": "MDEyMzQ1Njc4OWFiY2RlZg==",
  "tag": "solar",
  "permit_count": 1234,
  "contractor_count": 78,
  "avg_construction_duration": 45,
  "avg_approval_duration": 7,
  "total_job_value": 987654321,
  "avg_inspection_pass_rate": 90,
  "permit_active_count": 345,
  "permit_in_review_count": 56,
  "property_type": "residential"
}
```

### Notes

- Returns current city metrics (no date range required, unlike the monthly endpoint).
- Includes `permit_active_count` and `permit_in_review_count` fields not present in the monthly metrics.