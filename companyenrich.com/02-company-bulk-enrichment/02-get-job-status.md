# Company Bulk Enrichment - Get Job Status

## Endpoint

```
GET https://api.companyenrich.com/companies/enrich/bulk/{jobId}
```

**Cost:** FREE — No credits deducted

Returns the current status of a bulk enrichment job. Once completed, includes the `results_url` to download the enrichment results.

---

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `jobId`   | uuid | Yes      | The bulk enrichment job ID |

## Headers

| Header          | Type   | Default            | Allowed Values                                 |
|-----------------|--------|--------------------|------------------------------------------------|
| `accept`        | string | `application/json` | `application/json`, `application/problem+json` |
| `Authorization` | string | —                  | `Bearer <API_KEY>`                             |

---

## Example Request

```bash
curl --request GET \
     --url https://api.companyenrich.com/companies/enrich/bulk/3fa85f64-5717-4562-b3fc-2c963f66afa6 \
     --header 'Authorization: Bearer <API_KEY>' \
     --header 'accept: application/json'
```

---

## Response Codes

| Status | Description          |
|--------|----------------------|
| 200    | OK                   |
| 400    | Bad Request          |
| 401    | Unauthorized         |
| 402    | Payment Required     |
| 404    | Not Found            |
| 422    | Unprocessable Entity |
| 429    | Too Many Requests    |

---

## 200 Response Body

| Field              | Type              | Description |
|--------------------|-------------------|-------------|
| `job_id`           | uuid              | Unique identifier for the bulk enrichment job |
| `status`           | enum              | Current status: `pending`, `processing`, `completing`, `completed`, `failed` |
| `total_domains`    | int32             | Total number of domains in the job |
| `success_count`    | int32             | Number of domains successfully enriched |
| `failed_count`     | int32             | Number of domains that failed enrichment |
| `credits_charged`  | int32             | Total credits charged for this job |
| `created_at`       | date-time         | Timestamp when the job was created |
| `started_at`       | date-time \| null | Timestamp when the job started processing |
| `completed_at`     | date-time \| null | Timestamp when the job completed |
| `results_url`      | string \| null    | URL to download enrichment results (available when completed) |
| `error_message`    | string \| null    | Error message if the job failed |

---

## Example Response

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "total_domains": 0,
  "success_count": 0,
  "failed_count": 0,
  "credits_charged": 0,
  "created_at": "2026-02-17T00:16:33.225Z",
  "started_at": "2026-02-17T00:16:33.225Z",
  "completed_at": "2026-02-17T00:16:33.225Z",
  "results_url": "string",
  "error_message": "string"
}
```