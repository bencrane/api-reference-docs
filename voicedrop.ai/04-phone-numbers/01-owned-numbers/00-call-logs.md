# VoiceDrop.ai - Phone Numbers - Owned Numbers - Call Logs

## GET - Call Logs

```
GET https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/logs
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Query Parameters

| Parameter | Example | Description |
|---|---|---|
| `number` | `5555555` | Number you own to view its log |
| `start_date` | `2025-07-01` | Start date for filtering logs. Max range: 31 days |
| `end_date` | `2025-08-01` | End date for filtering logs. Max range: 31 days |
| `limit` | `50` | Max logs per page. Limit: 100 |
| `cursor` | — | Used for pagination when logs exceed the limit; returned in `pagination` and must be sent in the next request to fetch more results |
| `duration` | — | Filter logs where call duration is >= specified value. Omit or set to `0` to return all logs |

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/logs?number=17865555555&start_date=2025-10-01&end_date=2025-10-30&limit=50'
```

---

## Example Response - 200 OK

```json
{
  "number": "17865555555",
  "start_date": "2025-10-01",
  "end_date": "2025-10-30",
  "redirect_count": 2,
  "call_logs": [
    {
      "timestamp": 1760558416,
      "from": "17865555551",
      "duration": 24
    },
    {
      "timestamp": 1760198557,
      "from": "17865555552",
      "duration": 24
    }
  ],
  "pagination": {
    "cursor": null,
    "has_more": false,
    "limit": 50
  }
}
```