# Shovels.ai - Jurisdictions - Get Jurisdiction Metrics Current

## Get Jurisdiction Metrics Current

Returns current jurisdiction metrics.

**Method:** `GET`

**URL:** `https://api.shovels.ai/v2/jurisdictions/{geo_id}/metrics/current`

### Authorizations

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Filter by the specified jurisdiction ID. |

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
  --url 'https://api.shovels.ai/v2/jurisdictions/{geo_id}/metrics/current?size=50' \
  --header 'X-API-Key: <api-key>'
```

### Response

**200** - `application/json`

Current metrics for the jurisdiction. Schema for cursor-paginated jurisdiction current metrics response.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | JurisdictionsMetricsCurrentRead · object[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

#### Item Attributes (JurisdictionsMetricsCurrentRead)

| Field | Type | Description |
|-------|------|-------------|
| geo_id | string | Jurisdiction geographic identifier |
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
      "permit_count": 180,
      "contractor_count": 60,
      "avg_construction_duration": 75,
      "avg_approval_duration": 21,
      "total_job_value": 75000000,
      "avg_inspection_pass_rate": 82,
      "permit_active_count": 120,
      "permit_in_review_count": 60,
      "property_type": "residential"
    }
  ],
  "size": 1
}
```