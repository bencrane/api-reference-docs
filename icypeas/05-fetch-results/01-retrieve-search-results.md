# Icypeas API — Fetch Results: Retrieve Search Results

## Endpoint

```
POST https://app.icypeas.com/api/bulk-single-searchs/read
```

Each result is stored as a **search item**. A single search produces one search item. A bulk search produces as many search items as rows in your data.

Search items contain:

- The found email(s)
- The status of the search
- The firstname / lastname of the person (if found)
- The level of verification
- And more

> **Tips:**
> - Maximum 100 results per request.
> - The route is paginated — see the Pagination section for details.
> - Rate limits apply on all routes.

---

## Fetch a Single Result Using ID

Every single search returns an `_id`:

```json
{
  "success": true,
  "item": {
    "_id": "kMnquYkBTs8kZM9ND26h",
    "status": "NONE"
  }
}
```

Retrieve the full result by calling the route with that `_id`:

```json
{
  "id": "kMnquYkBTs8kZM9ND26h"
}
```

This also works for fetching a single search item within a bulk search.

---

## Fetch Single Searches

Get all single searches:

```json
{
  "mode": "single"
}
```

Filter by task type (`email-search`, `domain-search`, `email-verification`, etc.):

```json
{
  "mode": "single",
  "type": "email-search"
}
```

> **Tip:** Returned data is sorted by creation date (latest first).

---

## Fetch from a Specific Bulk Search

Every bulk search returns a file ID:

```json
{
  "success": true,
  "file": "kMnquYkBTs8kZM9ND26h",
  "status": "in_progress"
}
```

Retrieve searches from that bulk:

```json
{
  "mode": "bulk",
  "file": "kMnquYkBTs8kZM9ND26h"
}
```

> **Tip:** Returned data is sorted by insertion order, matching your data array.

---

## Fetch All Bulk Searches

```json
{
  "mode": "bulk"
}
```

> **CAUTION:** You cannot use the `type` parameter when using mode `bulk`.

> **Tip:** Returned data is sorted by creation date then order. If you've enqueued many bulk searches concurrently, results will not be grouped together. Use the `file` field to identify which bulk a result belongs to.

---

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `mode` | string | No | Type of searches: `bulk` for bulk searches, `single` for single searches. |
| `id` | string | No | The `_id` of the item you want to fetch. |
| `file` | string | No | The file ID for your bulk. Retrieves only searches for a given bulk. |
| `limit` | number | No | Number of results to fetch. Default: 10, max: 100. |
| `next` | boolean | No | Pagination direction: `true` = next page, `false` = previous page. |
| `sorts` | array | No | Array used for pagination. Pass the `sorts` from the previous response to fetch the next page. |

## Example Request

```json
{
  "mode": "bulk",
  "limit": 50,
  "file": "#FILEID#"
}
```

---

## Response — 200 Success

```json
{
  "success": true,
  "items": [
    {
      "name": "My cool search",
      "user": "#USERID#",
      "file": "#FILEID#",
      "results": {
        "firstname": "Example",
        "lastname": "Email",
        "fullname": "Example Email",
        "gender": "UNKNOWN",
        "emails": [
          {
            "email": "example-email@icypeas.com",
            "certainty": "ultra_sure",
            "mxProvider": "google",
            "mxRecords": ["google.com"]
          }
        ],
        "phones": []
      },
      "order": 0,
      "status": "FOUND",
      "system": {
        "createdAt": "2023-01-01T13:49:49.630Z",
        "modifiedAt": "2023-01-01T13:49:49.630Z"
      },
      "userData": {
        "externalId": "my-custom-id",
        "webhookUrl": "https://www.call-me-when-done.com/my-custom-id"
      },
      "_id": "oSmI5YYBMa6Snk9TvjDA"
    }
  ],
  "total": 2534,
  "sorts": [
    [1679388635082, "xxxx"],
    [1679388543443, "yyyy"]
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful. |
| `items` | array | Array of results. |
| `items[].name` | string | Name of the search (`__icypeas__individual` if single search). |
| `items[].user` | string | User ID linked to this search. |
| `items[].file` | string | File ID (for bulk searches). |
| `items[].results` | object | Object containing the search results. |
| `items[].results.firstname` | string | First name found, if any. |
| `items[].results.lastname` | string | Last name found, if any. |
| `items[].results.fullname` | string | Concatenation of first and last names, if any. |
| `items[].results.emails` | array | Array of found email addresses. |
| `items[].results.emails[].email` | string | Email address found. |
| `items[].results.emails[].certainty` | enum | Degree of certainty. See Useful Information > Certainties. |
| `items[].results.emails[].mxProvider` | enum | MX provider. See Useful Information > MX Providers. |
| `items[].results.emails[].mxRecords` | array | Array of MX record strings. |
| `items[].results.phones` | array | Currently empty. |
| `items[].results.saasServices` | array | Currently empty. |
| `items[].order` | number | Row position in the bulk file (bulk mode). |
| `items[].status` | string | Status of this search. |
| `items[].system` | object | System information. |
| `items[].system.createdAt` | string | ISO date of creation. |
| `items[].system.modifiedAt` | string | ISO date of last modification. |
| `items[].userData` | object | Custom data passed when running the search. |
| `items[].userData.webhookUrl` | string | Custom webhook URL (empty if none provided). |
| `items[].userData.externalId` | string | Custom ID (empty if none provided). |
| `items[]._id` | string | ID of the search. |
| `total` | number | Total number of results. |
| `sorts` | array | Pagination array — pass to next request to fetch the next page. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |