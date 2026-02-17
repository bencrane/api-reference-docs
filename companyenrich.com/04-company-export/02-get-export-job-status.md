# Company Export - Get Export Job

**GET** `https://api.companyenrich.com/companies/search/async/{jobId}`

**Cost:** FREE - No credits deducted

Returns the current status of a search export job. Once completed, includes the `results_url` to download the export results.

---

## Path Params

| Parameter | Type | Description |
|---|---|---|
| `jobId` | uuid (required) | The unique identifier of the export job |

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
| `job_id` | uuid | Unique identifier for the search export job |
| `status` | enum | Current status of the job (pending, processing, completing, completed, failed) |
| `requested_count` | int32 | Number of companies requested for export |
| `total_matching` | int32 | Total number of companies matching the search criteria |
| `exported_count` | int32 | Number of companies exported in the results |
| `credits_charged` | int32 | Total credits charged for this job |
| `created_at` | date-time | Timestamp when the job was created |
| `started_at` | date-time \| null | Timestamp when the job started processing |
| `completed_at` | date-time \| null | Timestamp when the job completed |
| `results_url` | string \| null | URL to download the search export results (available when completed) |
| `error_message` | string \| null | Error message if the job failed |

### Error Responses

| Status | Description |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 402 | Payment Required |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |

---

## Example Request

```shell
curl --request GET \
     --url https://api.companyenrich.com/companies/search/async/jobId \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json'
```

## Example Response

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "requested_count": 0,
  "total_matching": 0,
  "exported_count": 0,
  "credits_charged": 0,
  "created_at": "2026-02-17T02:04:03.743Z",
  "started_at": "2026-02-17T02:04:03.743Z",
  "completed_at": "2026-02-17T02:04:03.743Z",
  "results_url": "string",
  "error_message": "string"
}
```