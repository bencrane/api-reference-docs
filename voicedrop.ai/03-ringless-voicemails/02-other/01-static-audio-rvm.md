# VoiceDrop.ai - Ringless Voicemails - Static Audio RVM

## POST - Static Audio RVM

```
POST https://api.voicedrop.ai/v1/ringless_voicemail
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
  "recording_url": "https://6a9ad034b16e6510c0e362ad0a05ef65.cdn.bubble.io/f1708952444857x403244640253007000/Bart-real%20estate.mp3",
  "to": "7865555555",
  "from": "7865555550",
  "validate_recipient_phone": false,
  "send_status_to_webhook": "https://example.com/"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/ringless_voicemail' \
--header 'Content-Type: application/json' \
--data '{
    "recording_url": "https://6a9ad034b16e6510c0e362ad0a05ef65.cdn.bubble.io/f1708952444857x403244640253007000/Bart-real%20estate.mp3",
    "to": "7865555555",
    "from": "7865555550",
    "validate_recipient_phone": false,
    "send_status_to_webhook": "https://example.com/"
}'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "message": "Your request has been successfully received and queued for processing. The status and results of the job will be sent to the webhook URL provided in the send_status_to_webhook parameter. Please ensure the webhook is correctly configured to receive updates and verify the job's completion."
}
```