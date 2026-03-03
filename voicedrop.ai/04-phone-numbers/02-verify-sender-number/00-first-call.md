# VoiceDrop.ai - Phone Numbers - Verify Sender Number - First Call

## POST - First Call

```
POST https://api.voicedrop.ai/v1/sender-numbers/verify
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
  "phone_number": "7865555555",
  "method": "sms"
}
```

**Parameters**

| Field | Description |
|---|---|
| `phone_number` | The phone number to verify |
| `method` | Delivery method for the verification code. Must be `"call"` or `"sms"` |

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/verify' \
--header 'Content-Type: application/json' \
--data '{
    "phone_number": "7865555555",
    "method": "sms"
}'
```

---

## Example Response

No response body - this request does not return any response body.