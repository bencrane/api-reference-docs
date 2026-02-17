# Jobs - List All Jobs

**GET** `https://api.companyenrich.com/jobs`

**Cost:** FREE - No credits deducted

Returns a paginated list of all jobs (bulk enrichment, etc.) for the authenticated user. Supports optional filtering by job status and type.

---

## Query Params

| Parameter | Type | Description |
|---|---|---|
| `page` | int32 | Page number (default: 1) |
| `pageSize` | int32 | Number of items per page (default: 20, max: 100) |
| `status` | enum | Filter jobs by status |
| `type` | string | Filter jobs by type (bulk_enrichment, etc.) |

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
| `id` | uuid (required) | Unique identifier for the job |
| `type` | string (required) | The type of job (bulk_enrichment, etc.) |
| `status` | string (required) | Current status of the job (pending, processing, completed, failed) |
| `title` | string (required) | Human-readable title of the job |
| `created_at` | date-time (required) | Timestamp when the job was created |
| `started_at` | date-time \| null | Timestamp when the job started processing |
| `completed_at` | date-time \| null | Timestamp when the job completed |
| `credits_charged` | int32 (required) | Total credits charged for this job |
| `error_message` | string \| null | Error message if the job failed |

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
     --url https://api.companyenrich.com/jobs \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "items": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "type": "string",
      "status": "string",
      "title": "string",
      "created_at": "2026-02-17T01:41:11.850Z",
      "started_at": "2026-02-17T01:41:11.850Z",
      "completed_at": "2026-02-17T01:41:11.850Z",
      "credits_charged": 0,
      "error_message": "string"
    }
  ],
  "page": 0,
  "totalPages": 0,
  "totalItems": 0
}
```