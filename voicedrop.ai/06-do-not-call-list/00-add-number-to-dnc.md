# VoiceDrop.ai - Do-Not-Call List - Add Number to DNC

## POST - Add Number to DNC

```
POST https://api.voicedrop.ai/v1/add-to-dnc-list
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Request Body

```json
{
  "phone": "7865555555"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/add-to-dnc-list' \
--data '{"phone": "7865555555"}'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "message": "Number added to the DNC list: 7865555555"
}
```