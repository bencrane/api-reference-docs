# VoiceDrop.ai - Phone Numbers - Reverse Lookup - Check Job Progress

## GET - Check Job Progress

```
GET https://api.voicedrop.ai/v1/reverse-phone-lookup/{{job_id}}
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location -g 'https://api.voicedrop.ai/v1/reverse-phone-lookup/{{job_id}}'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "message": {
    "job_status": "completed",
    "complete_percentage": 100,
    "success_percentage": 100,
    "success_voice_units_used": "0.20",
    "processed": 4,
    "total": 4,
    "csv_download_url": "https://voicedrop-ai.s3.amazonaws.com/sample_file.csv",
    "results_total": 4,
    "results_shown": 4,
    "results_preview": [
      {
        "phone_number": "7865555550",
        "name": "JOHN MILLER",
        "address": "",
        "created_at": "2025-12-18 01:27:53"
      },
      {
        "phone_number": "7865555551",
        "name": "MICHAEL JOHNSON",
        "address": "1180 SEVEN SEAS DR,LAKE BUENA VISTA,FL,32830",
        "created_at": "2025-12-18 01:27:53"
      },
      {
        "phone_number": "7865555552",
        "name": "DAVID SMITH",
        "address": "",
        "created_at": "2025-12-18 01:27:53"
      },
      {
        "phone_number": "7865555553",
        "name": "ROBERT WILLIAMS",
        "address": "",
        "created_at": "2025-12-18 01:27:53"
      }
    ]
  }
}
```