# TheirStack - Datasets - List Datasets

## Datasets

### List Datasets

Get all the datasets available for your team. Datasets are updated daily. Use this endpoint to get the latest dataset url.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `GET /v1/datasets`

---

## Authorization

- **Type:** Bearer Token
- **Header:** `Authorization: Bearer <token>`

---

## Response Body

| Status | Content Type |
|---|---|
| 200 | `application/json` |
| 400 | `application/json` |
| 402 | `application/json` |
| 422 | `application/json` |
| 500 | `application/json` |

---

## Example Request (cURL)

```bash
curl -X GET "https://api.theirstack.com/v1/datasets" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
[
  {
    "type": "jobs",
    "description": "string",
    "is_accessible": true,
    "options": [
      {
        "id": "string",
        "description": "string",
        "item_type": "file",
        "format": "csv",
        "frequency": "daily",
        "version": "string",
        "is_deprecated": true,
        "dataset_prefix": "string",
        "dataset_url": "string",
        "dictionary_url": "string",
        "sample_dataset_url": "string",
        "last_updated": "2019-08-24T14:15:22Z",
        "size": 0
      }
    ]
  }
]
```