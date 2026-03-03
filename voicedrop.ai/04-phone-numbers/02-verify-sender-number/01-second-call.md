# VoiceDrop.ai - Phone Numbers - Verify Sender Number - Second Call

## POST - Second Call

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
  "code": ""
}
```

**Parameters**

| Field | Description |
|---|---|
| `phone_number` | The phone number being verified |
| `code` | The verification code received via the method selected in the First Call step |

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/verify' \
--header 'Content-Type: application/json' \
--data '{ "phone_number": "7865555555", "code": ""}'
```

---

## Example Response

No response body - this request does not return any response body.