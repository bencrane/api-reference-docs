# VoiceDrop.ai - Campaigns - Set Campaign Status

## PATCH — Set Campaign Status

```
PATCH https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Headers

| Key | Value |
|---|---|
| `Content-Type` | `application/json` |

---

## Request Body

```json
{
  "status": "active"
}
```

---

## Example Request

```bash
curl --location -g --request PATCH 'https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}' \
--header 'Content-Type: application/json' \
--data '{
    "status": "active"
}'
```

---

## Example Response — 200 OK

```json
{
  "status": "success",
  "message": "Campaign status was succesfully set to active"
}
```