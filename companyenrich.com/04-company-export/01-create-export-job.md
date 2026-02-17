# Company Export - Create Export Job

**POST** `https://api.companyenrich.com/companies/search/async`

**Cost:** 1 credit per company returned (charged on completion)

Creates an asynchronous search export job for up to 50,000 companies. Supports both standard company search and similar-company search. Returns a job ID immediately. The webhook URL will be called with a notification when processing completes.

Use the status endpoint to track progress and retrieve results.

---

## Body Params

| Parameter | Type | Description |
|---|---|---|
| `count` | int32 (required) | The number of companies to export |
| `webhook_url` | uri \| null | The webhook URL to receive the notification when processing completes |
| `search` | object \| null | The company search input. Either Search or Similar must be provided, but not both |
| `similar` | object \| null | The similar company search input. Either Search or Similar must be provided, but not both |

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
| `estimated_credits` | int32 | Estimated credit cost for the export job |

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
curl --request POST \
     --url https://api.companyenrich.com/companies/search/async \
     --header 'Authorization: Bearer GruM436zSC3yW7mC2MfuHn' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
```

## Example Response

```json
{
  "job_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "requested_count": 0,
  "total_matching": 0,
  "estimated_credits": 0
}
```