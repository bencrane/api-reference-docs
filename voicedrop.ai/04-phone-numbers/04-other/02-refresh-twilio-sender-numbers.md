# VoiceDrop.ai - Phone Numbers - Other - Refresh Twilio Sender Numbers

## POST - Refresh Twilio Sender Numbers

```
POST https://api.voicedrop.ai/v1/sender-numbers/verify/twilio/refresh
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
  "twilio_account_sid": "{TWILIO_ACCOUNT_SID}",
  "send_status_to_webhook": "{WEBHOOK_ENDPOINT_URL_HERE}"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/verify/twilio/refresh' \
--header 'Content-Type: application/json' \
--data '{
    "twilio_account_sid": "{TWILIO_ACCOUNT_SID}",
    "send_status_to_webhook": "{WEBHOOK_ENDPOINT_URL_HERE}"
}'
```

---

## Example Response

No response body - this request does not return any response body.