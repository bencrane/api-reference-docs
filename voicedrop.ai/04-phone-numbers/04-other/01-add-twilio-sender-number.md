# VoiceDrop.ai - Phone Numbers - Other - Add Twilio Sender Number

## POST - Add Twilio Sender Number

```
POST https://api.voicedrop.ai/v1/sender-numbers/verify/twilio
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
  "phone_number": "7865555555"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/verify/twilio' \
--header 'Content-Type: application/json' \
--data '{
    "phone_number": "7865555555"
}'
```

---

## Example Response

No response body - this request does not return any response body.