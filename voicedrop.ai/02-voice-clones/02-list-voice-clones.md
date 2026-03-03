# VoiceDrop.ai - Voice Clones - List Voice Clones

## GET — List Voice Clones

```
GET https://api.voicedrop.ai/v1/voice-clones
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/voice-clones'
```

---

## Example Response — 200 OK

```json
[
  {
    "id": "7fAamDiWVwAPT8BIJXXX",
    "name": "My First Voice Clone"
  },
  {
    "id": "TG2DyMaxgGBPDOg0YXXX",
    "name": "Jake - American Male"
  }
]
```