# Shovels.ai - Contractors - Get Filtered Metrics by Contractor ID

## Endpoint

```
GET /v2/contractors/{id}/metrics
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/contractors/{id}/metrics?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Filter by the specified contractor ID. |

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

Contractor monthly metrics.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | ContractorsMetricsMonthlyRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### ContractorsMetricsMonthlyRead Example

```json
{
  "property_type": "residential",
  "date": "2022-01-01",
  "tag": "solar",
  "permit_count": 10,
  "avg_job_value": 1000000,
  "total_job_value": 10000000,
  "avg_construction_duration": 100,
  "avg_inspection_pass_rate": 95
}
```

### Notes

- Returns contractor monthly metrics filtered by contractor ID, property type, and tags.
- Metrics include permit count, average job value, total job value, average construction duration, and average inspection pass rate.