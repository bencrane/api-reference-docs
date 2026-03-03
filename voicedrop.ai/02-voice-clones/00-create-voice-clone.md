# VoiceDrop.ai - Voice Clones - Create Voice Clone

## POST — Create Voice Clone

```
POST https://api.voicedrop.ai/v1/voice-clone
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
  "display_name": "My VoiceClone Name",
  "recording_url": "https://6a9ad034b16e6510c0e362ad0a05ef65.cdn.bubble.io/f1708952444857x403244640253007000/Bart-real%20estate.mp3"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/voice-clone' \
--header 'Content-Type: application/json' \
--data '{ 
    "recording_url": "https://voicedrop-ai.s3.amazonaws.com/L55l0kg8l7A29b4jYzTN-94452496093022291198.mp3" 
}'
```

---

## Example Response — 200 OK

```json
{
  "status": "success",
  "message": "9FHGcgC6FaejCdg6RTyt"
}
```