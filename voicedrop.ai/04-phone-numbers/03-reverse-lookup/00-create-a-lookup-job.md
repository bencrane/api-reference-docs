# VoiceDrop.ai - Phone Numbers - Reverse Lookup - Create a Lookup Job

## POST - Create a Lookup Job

```
POST https://api.voicedrop.ai/v1/reverse-phone-lookup
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Headers

| Key | Value |
|---|---|
| `Content-Type` | `application/json` |

---

## Request Body

```json
{
  "prospect_phone_numbers": [
    "7865555550",
    "7865555551",
    "7865555552",
    "7865555553"
  ]
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/reverse-phone-lookup' \
--header 'Content-Type: application/json' \
--data '{
  "prospect_phone_numbers": [
    "7865555550",
    "7865555551",
    "7865555552",
    "7865555553"
  ]
}'
```

---

## Example Response - 202 Accepted

```json
{
  "status": "success",
  "message": {
    "job_id": "7245dbdd-9abd-42f3-a9b2-a11dc625f7xy",
    "job_status": "queued",
    "total_numbers": 4
  }
}
```