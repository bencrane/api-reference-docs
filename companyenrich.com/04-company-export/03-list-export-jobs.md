# Company Export - List Export Jobs

**GET** `https://api.companyenrich.com/companies/search/async/jobs`

**Cost:** FREE - No credits deducted

Returns a paginated list of all search export jobs for the authenticated user. Supports optional filtering by job status.

---

## Query Params

| Parameter | Type | Description |
|---|---|---|
| `page` | int32 | Page number (default: 1) |
| `pageSize` | int32 | Number of items per page (default: 20, max: 100) |
| `status` | enum | Filter jobs by status |

Allowed status values: `pending`, `processing`, `completing`, `completed`, `failed`, `null`

## Headers

| Header | Type | Default |
|---|---|---|
| `accept` | string (enum) | `application/json` |

Allowed: `application/json`, `application/problem+json`

---

## Responses

### 200 OK

#### Response Body (object)

| Field | Type | Description |
|---|---|---|
| `items` | array of objects (required) | The items in the list |
| `page` | int32 | The current page number. 1-indexed |
| `totalPages` | int32 | The total number of pages |
| `totalItems` | int32 | The total number of items in the list |

#### Item Object

| Field | Type | Description |
|---|---|---|
| `job_id` | uuid (required) | Unique identifier for the search export job |
| `status` | enum (required) | Current status of the job (pending, processing, completing, completed, failed) |
| `requested_count` | int32 (required) | Number of companies requested for export |
| `total_matching` | int32 (required) | Total number of companies matching the search criteria |
| `exported_count` | int32 (required) | Number of companies exported in the results |
| `credits_charged` | int32 (required) | Total credits charged for this job |
| `created_at` | date-time (required) | Timestamp when the job was created |
| `started_at` | date-time \| null | Timestamp when the job started processing |
| `completed_at` | date-time \| null | Timestamp when the job completed |

### Error Responses

| Status | Description |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 402 | Payment Required |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |

---

## Example Request

```shell
curl --request GET \
     --url https://api.companyenrich.com/companies/search/async/jobs \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "items": [
    {
      "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "requested_count": 0,
      "total_matching": 0,
      "exported_count": 0,
      "credits_charged": 0,
      "created_at": "2026-02-17T02:04:03.743Z",
      "started_at": "2026-02-17T02:04:03.743Z",
      "completed_at": "2026-02-17T02:04:03.743Z"
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```