# Shovels.ai - Counties - Get County Metrics Current

## Get County Metrics Current

Returns current county metrics.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/counties/{geo_id}/metrics/current`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Filter by the specified county ID. |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| property_type | string | Yes | — | Filter by property type |
| tag | string | Yes | — | Filter by tag |
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: `1 <= x <= 100` |

### Example Request

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/counties/{geo_id}/metrics/current?size=50' \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

Current metrics for the county. Schema for cursor-paginated county current metrics response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | CountiesMetricsCurrentRead · object[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

#### Item Attributes (CountiesMetricsCurrentRead)

| Field | Type | Description |
|-------|------|-------------|
| geo_id | string | County geographic identifier |
| tag | string | Tag filter applied |
| permit_count | integer | Number of permits |
| contractor_count | integer | Number of contractors |
| avg_construction_duration | integer | Average construction duration |
| avg_approval_duration | integer | Average approval duration |
| total_job_value | integer | Total job value |
| avg_inspection_pass_rate | integer | Average inspection pass rate |
| permit_active_count | integer | Number of active permits |
| permit_in_review_count | integer | Number of permits in review |
| property_type | string | Property type filter |

### Example Response (200)

```json
{
  "items": [
    {
      "geo_id": "MDEyMzQ1Njc4OWFiY2RlZg==",
      "tag": "solar",
      "permit_count": 250,
      "contractor_count": 85,
      "avg_construction_duration": 90,
      "avg_approval_duration": 25,
      "total_job_value": 125000000,
      "avg_inspection_pass_rate": 78,
      "permit_active_count": 160,
      "permit_in_review_count": 90,
      "property_type": "commercial"
    }
  ],
  "size": 1
}
```