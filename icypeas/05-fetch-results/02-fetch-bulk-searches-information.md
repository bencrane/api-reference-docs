# Icypeas API — Fetch Results: Fetch Bulk Searches' Information

## Endpoint

```
POST https://app.icypeas.com/api/search-files/read
```

When you launch a bulk search, a `file` is created by Icypeas. This file allows you to fetch stats about your bulk search and follow its progression.

> **Tips:**
> - This route is paginated. See the Pagination section for details.
> - Maximum 50 files per request.
> - Files are sorted by creation date.
> - Rate limits apply on all routes.

---

## Usage Examples

### Get all files (empty body)

```json
{}
```

### Get only files in progress

```json
{
  "status": "in_progress"
}
```

### Get only completed files

```json
{
  "status": "done"
}
```

### Get a specific file

```json
{
  "file": "kbn5421aeteb0989"
}
```

---

## Body Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | number | No | Number of files to fetch. Default: 10, max: 50. |
| `file` | string | No | File ID to retrieve a specific bulk search. |
| `status` | string | No | Filter by status: `in_progress` or `done`. |
| `next` | boolean | No | Pagination direction: `true` = next page, `false` = previous page. |
| `sorts` | array | No | Pagination array from previous response. Pass to fetch the next page. |


## Example Request

```json
{
  "limit": 2
}
```

---

## Response — 200 Success

```json
{
  "success": true,
  "files": [
    {
      "file": "#FILEID_1#",
      "system": {
        "createdAt": "2023-01-01T12:00:00.000Z",
        "modifiedAt": "2023-01-01T12:00:00.000Z"
      },
      "name": "Last File",
      "found": 250,
      "done": 300,
      "aborted": 0,
      "credits-missing": 0,
      "in-progress": 0,
      "bad-input": 0,
      "total": 300,
      "generationInProgress": true,
      "exported": false,
      "task": "email-verification",
      "finished": true
    },
    {
      "file": "#FILEID_2#",
      "system": {
        "createdAt": "2023-01-01T11:00:00.000Z",
        "modifiedAt": "2023-01-01T11:00:00.000Z"
      },
      "name": "First File",
      "found": 2500,
      "done": 2600,
      "aborted": 0,
      "bad-input": 50,
      "in-progress": 350,
      "credits-missing": 0,
      "total": 3000,
      "generationInProgress": false,
      "exported": false,
      "task": "email-search",
      "finished": false
    }
  ],
  "total": 10,
  "sorts": [
    [1678195083294],
    [1678194871170]
  ]
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether the request was successful. |
| `files` | array | Array of file objects. |
| `files[].file` | string | Unique ID of the file. |
| `files[].system` | object | System information. |
| `files[].system.createdAt` | string | ISO date of creation. |
| `files[].system.modifiedAt` | string | ISO date of last modification. |
| `files[].name` | string | Name of the file. |
| `files[].found` | number | Number of found items in the bulk search. |
| `files[].done` | number | Number of items already processed. |
| `files[].aborted` | number | Number of items cancelled. |
| `files[].credits-missing` | number | Number of items not processed due to insufficient credits. |
| `files[].in-progress` | number | Number of items still being processed. |
| `files[].bad-input` | number | Number of items with bad input. |
| `files[].total` | number | Total number of items in the bulk search. |
| `files[].generationInProgress` | boolean | Whether the file generation is still in progress. |
| `files[].exported` | boolean | Whether the file has been exported. |
| `files[].task` | string | The task type (e.g. `email-search`, `email-verification`). |
| `files[].finished` | boolean | Whether the bulk search is finished. |
| `total` | number | Total number of files. |
| `sorts` | array | Pagination array — pass to next request to fetch the next page. |

### Other Responses

| Code | Description |
|------|-------------|
| 200 | Validation errors |
| 401 | Authentication failed |
| 429 | Rate limit exceeded |