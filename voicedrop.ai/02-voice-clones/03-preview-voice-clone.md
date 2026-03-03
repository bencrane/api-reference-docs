# VoiceDrop.ai - Voice Clones - Preview Voice Clone

## POST — Preview Voice Clone

```
POST https://api.voicedrop.ai/v1/voice-clone/preview
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Request Body

```json
{
  "voice_clone_id": "r8RFssBpPNflg63YZXXX",
  "script": "Hi there! This is a quick test of the audio generation tool. Let's see how natural and clear the voice sounds. The weather's great today - perfect for a short walk or a coffee break!"
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/voice-clone/preview' \
--header 'Content-Type: application/json' \
--data '{"voice_clone_id": "yjsTPbvu6Kve9Hx7tXXX", "script": "This is just a test script, to see how it sounds."}'
```

---

## Example Response — 200 OK

```json
{
  "voice_clone_id": "yjsTPbvu6Kve9Hx7tXXX",
  "recording_url": "https://voicedrop-ai.s3.amazonaws.com/yjsTPbvu6Kve9Hx7tXXX-28568406678914826810.mp3",
  "voice_drop_id": "28568406678914826810"
}
```