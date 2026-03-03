# VoiceDrop.ai - User - User Profile

## GET - User Profile

```
GET https://api.voicedrop.ai/v1/profile
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/profile'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "all_user_data": {
    "first_name": "Jhon",
    "last_name": "Doe",
    "email": "jhon_doe@email.com",
    "user_id": "1746731567XXXx978761526041269XXX",
    "voice_clones": [
      {
        "id": "9FHGcgC6FaejCdg6RXXX",
        "name": "My VoiceClone Name",
        "recording_url": "https://voicedrop-ai.s3.amazonaws.com/L55l0kg8l7A29b4jYXXX-94452496093022291198.mp3"
      },
      {
        "id": "KgjSC25eZrZwJT4GAXXX",
        "name": "Created from API",
        "recording_url": "https://voicedrop-ai.s3.amazonaws.com/yjsTPbvu6Kve9Hx7tXXX-24203863360397212927.mp3"
      },
      {
        "id": "yjsTPbvu6Kve9Hx7tXXX",
        "name": "Luna",
        "recording_url": "https://6a9ad034b16e6510c0e362ad0a05ef65.cdn.bubble.io/f1742751407XXXx176459376129384450/F%202.mp3"
      }
    ],
    "billing_type": "subscription",
    "subscription": {
      "plan_name": "Growth",
      "next_renewal": 1762468161,
      "voice_units_remaining": "14972.1",
      "subscription_price": "$1.5"
    },
    "verified_phone_numbers": [
      "7865555551",
      "7865555552",
      "7865555553",
      "7865555554",
      "7865555555"
    ]
  }
}
```