# VoiceDrop.ai - Phone Numbers - Owned Numbers - Call Forwarding

## POST - Call Forwarding

```
POST https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/forwarding-profile
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Request Body

```json
{
  "redirect_to": "7865555555",
  "purchased_number": "7865555551"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/forwarding-profile' \
--data '{"redirect_to": "7865555555", "purchased_number": "7865555551"}'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "message": "The purchased number 7865555551 was successfully associated with the redirect number 7865555555"
}
```