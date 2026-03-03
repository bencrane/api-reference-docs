# VoiceDrop.ai - Campaigns - Export Delivered RVMs

## GET — Export Delivered RVMs

```
GET https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}/reports
```

---

## Authorization

**API Key** — uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location -g 'https://api.voicedrop.ai/v1/campaigns/{{campaign-id}}/reports'
```

---

## Example Response — 200 OK

```json
{
  "status": "success",
  "message": "Exported succesfully",
  "csv_url": "https://voicedrop-ai.s3.amazonaws.com/1729204600215x102283731818512380-1740084409.2035067.csv"
}
```