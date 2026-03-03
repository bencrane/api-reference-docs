# VoiceDrop.ai - Voice Clones - Delete Voice Clone

## DELETE — Delete Voice Clone

```
DELETE https://api.voicedrop.ai/v1/voice-clone/{{voice_clone_id}}
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location -g --request DELETE 'https://api.voicedrop.ai/v1/voice-clone/{{voice_clone_id}}' \
--data ''
```

---

## Example Response — 200 OK

```json
{
  "status": "success",
  "message": "Voice Clone was succesfully deleted"
}
```