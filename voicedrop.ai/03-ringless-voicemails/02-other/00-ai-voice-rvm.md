# VoiceDrop.ai - Ringless Voicemails - AI Voice RVM

## POST - AI Voice RVM

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
  "voice_clone_id": "L55l0kg8l7A29b4jYXXX",
  "script": "This is a test script.",
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
    "voice_clone_id": "L55l0kg8l7A29b4jYXXX",
    "script": "This is a test script.",
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