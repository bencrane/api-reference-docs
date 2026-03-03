# VoiceDrop.ai - Ringless Voicemails - Upload Static Audio

## POST - Upload Static Audio

```
POST https://api.voicedrop.ai/v1/upload-static-audio
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Request Body

**Form Data**

| Field | Value |
|---|---|
| `file` | *(audio file)* |

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/upload-static-audio' \
--form 'file=@"diVmP39ab/VoiceDrop.ai Audio Sample - 5s.mp3"'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "message": {
    "recording_url": "https://voicedrop-ai.s3.amazonaws.com/converted_audio_files/e23af61b-7aee-49ad-8f45-49a76fe3f67d_VoiceDrop_converted_a23c3d41-bb0b-4d11-8a54-9802ea33d714.mp3"
  }
}
```