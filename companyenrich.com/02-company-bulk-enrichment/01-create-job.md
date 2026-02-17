# Company Bulk Enrichment - Create Job

## Endpoint

```
POST https://api.companyenrich.com/companies/enrich/bulk
```

**Cost:** 1 credit per domain successfully enriched (charged on completion)

Creates an asynchronous bulk enrichment job for up to 10,000 domains. Returns a job ID immediately. The webhook URL will be called with a notification when processing completes.

Use the status endpoint to track progress and retrieve results.

---

## Body Parameters

| Parameter     | Type           | Required | Description |
|---------------|----------------|----------|-------------|
| `domains`     | string[]       | Yes      | List of domains to enrich. Length between 1 and 10,000. |
| `webhook_url` | uri \| null    | No       | Webhook URL to receive notification when processing completes. |

## Headers

| Header          | Type   | Default            | Allowed Values                                 |
|-----------------|--------|--------------------|------------------------------------------------|
| `accept`        | string | `application/json` | `application/json`, `application/problem+json` |
| `content-type`  | string | —                  | `application/json`                             |
| `Authorization` | string | —                  | `Bearer <API_KEY>`                             |

---

## Example Request

```bash
curl --request POST \
     --url https://api.companyenrich.com/companies/enrich/bulk \
     --header 'Authorization: Bearer <API_KEY>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{
       "domains": ["example.com", "another.com"],
       "webhook_url": "https://yourapp.com/webhook"
     }'
```

---

## Response Codes

| Status | Description          |
|--------|----------------------|
| 200    | OK                   |
| 400    | Bad Request          |
| 401    | Unauthorized         |
| 402    | Payment Required     |
| 422    | Unprocessable Entity |
| 429    | Too Many Requests    |

---

## 200 Response Body

| Field               | Type  | Description |
|---------------------|-------|-------------|
| `job_id`            | uuid  | Unique identifier for the bulk enrichment job |
| `status`            | enum  | Current status: `pending`, `processing`, `completing`, `completed`, `failed` |
| `total_domains`     | int32 | Total number of unique domains to be enriched |
| `estimated_credits` | int32 | Estimated credit cost for the enrichment job |

---

## Example Response

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "total_domains": 0,
  "estimated_credits": 0
}
```