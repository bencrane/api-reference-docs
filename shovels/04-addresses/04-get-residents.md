# Shovels.ai - Addresses - Get Residents

## Endpoint

```
GET /v2/addresses/{geo_id}/residents
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/addresses/{geo_id}/residents?size=50' \
  --header 'X-API-Key: <api-key>'
```

## Authorization

| Name | Type | Location | Required |
|------|------|----------|----------|
| X-API-Key | string | header | Yes |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| geo_id | string | Yes | Address geo ID |

## Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

Residents for a given address geo ID.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | ResidentsRead[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### ResidentsRead Example

```json
{
  "name": "John Doe",
  "personal_emails": "john.doe@example.com",
  "phone": "(978) 314-5196",
  "linkedin_url": "https://www.linkedin.com/in/john-doe/",
  "net_worth": "$750,000 to $999,999",
  "income_range": "$150,000 to $299,999",
  "is_homeowner": true,
  "street_no": "123",
  "street": "Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001"
}
```

### Notes

- Returns residents for a given address geo ID.
- Results are paginated using cursor-based pagination.
- Resident records include contact info, financial demographics (net worth, income range), and homeownership status.