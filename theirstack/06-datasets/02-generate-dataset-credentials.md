# TheirStack - Datasets - Generate Dataset Credentials

## Datasets

### Generate Dataset Credentials

Generate credentials to access datasets. By default the credentials are valid for 7 days.

**Base URL:** `https://api.theirstack.com`

**Endpoint:** `POST /v1/datasets/credentials`

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
curl -X POST "https://api.theirstack.com/v1/datasets/credentials" \
  -H "Authorization: Bearer <token>"
```

## Example Response (200)

```json
{
  "access_key_id": "a3f8b2c9d1e4f5a6b7c8d9e0f1a2b3c4",
  "secret_access_key": "7e9a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a",
  "session_token": "ZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmlkV05yWlhRa",
  "expiration": "2025-01-15T14:30:00Z",
  "storage": {
    "bucket_name": "datasets",
    "endpoint_url": "https://example-datasets-url.com",
    "prefixes": [
      "jobs/daily"
    ]
  }
}
```