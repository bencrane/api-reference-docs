# Shovels.ai - Cities - Get City Metrics Monthly

## Endpoint

```
GET /v2/cities/{geo_id}/metrics/monthly
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/cities/{geo_id}/metrics/monthly?size=50' \
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
| metric_from | string\<date\> | Yes | — | Start date for metrics (inclusive) |
| metric_to | string\<date\> | Yes | — | End date for metrics (inclusive) |
| property_type | string | Yes | — | Filter by property type |
| tag | string | Yes | — | Filter by tag |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

Monthly metrics for the city.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | CitiesMetricsMonthlyRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### CitiesMetricsMonthlyRead Example

```json
{
  "geo_id": "MDEyMzQ1Njc4OWFiY2RlZg==",
  "tag": "solar",
  "permit_count": 120,
  "contractor_count": 45,
  "avg_construction_duration": 65,
  "avg_approval_duration": 18,
  "total_job_value": 35000000,
  "avg_inspection_pass_rate": 80,
  "date": "2023-01-01",
  "property_type": "residential"
}
```

### Notes

- Returns monthly city metrics filtered by property type and tag.
- Includes `property_type` field in the response (unlike the address monthly metrics).