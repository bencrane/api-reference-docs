# VoiceDrop.ai - Campaigns - Add Prospects

## POST — Add Prospects

```
POST https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}/prospects
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
  "prospect_phone": "+17865555555",
  "personalization_variables": {
    "first_name": "Jhon"
  }
}
```

---

## Example Request

```bash
curl --location -g 'https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}/prospects' \
--header 'Content-Type: application/json' \
--data '{"prospect_phone": "+17865555555", "personalization_variables": { "first_name": "Jhon"}}'
```

---

## Example Response — 200 OK

```json
{
  "status": "success",
  "message": "Prospect was succesfully added to the campaign",
  "prospect_data": {
    "_status_": "ok",
    "first_name": "Jhon"
  }
}
```