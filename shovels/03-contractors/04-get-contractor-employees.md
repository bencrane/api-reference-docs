# Shovels.ai - Contractors - Get Contractor Employees

## Endpoint

```
GET /v2/contractors/{id}/employees
```

```bash
curl --request GET \
  --url 'https://api.shovels.ai/v2/contractors/{id}/employees?size=50' \
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
| cursor | string \| null | No | — | Cursor for pagination |
| size | integer | No | 50 | Required range: 1 <= x <= 100 |

## Response (200)

A list of employees associated with the contractor.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| items | Employees[] | Yes | The list of items returned in the response following given criteria. |
| size | integer | Yes | The number of items returned in the response. |
| next_cursor | string \| null | Yes | The cursor for retrieving the next page of results. |

### Employees Example

```json
{
  "id": "aa145cd32c95f69b95e9233f6a957a32",
  "contractor_id": "8wKHB2ZNf",
  "name": "John Smith",
  "street_no": "123",
  "street": "Oak Avenue",
  "city": "San Francisco",
  "zip_code": "94105",
  "zip_code_ext": "1234",
  "state": "CA",
  "phone": "(415) 555-0123",
  "email": "john.smith@personal.com",
  "business_email": "j.smith@company.com",
  "linkedin_url": "https://linkedin.com/in/johnsmith",
  "homeowner": "Y",
  "gender": "M",
  "age_range": "35-44",
  "is_married": true,
  "has_children": true,
  "income_range": "$120,000 to $149,999",
  "net_worth": "$150,000 to $249,999",
  "job_title": "Senior Solar Installation Technician",
  "seniority_level": "Senior",
  "department": "Installation"
}
```

### Notes

- Returns a paginated list of employees for a specific contractor.
- Employee records include personal demographics, contact info, and professional details (job title, seniority, department).