# VoiceDrop.ai - Phone Numbers - Other - Validate Prospect Numbers

## POST - Validate Prospect Numbers

```
POST https://api.voicedrop.ai/v1/phone-validations
```

---

## Authorization

**API Key** - uses API Key from collection: VoiceDrop API Reference

---

## Headers

| Key | Value |
|---|---|
| `Content-Type` | `application/json` |

---

## Request Body

```json
{
  "prospect_phone_numbers": ["7868323433"]
}
```

---

## Example Request

```bash
curl --location 'https://api.voicedrop.ai/v1/phone-validations' \
--header 'Content-Type: application/json' \
--data '{ "prospect_phone_numbers": ["7865555555"] }'
```

---

## Example Response - 200 OK

```json
{
  "status": "success",
  "phones_validated": [
    {
      "message": "Phone is valid.",
      "success": true,
      "formatted": "+17865555555",
      "local_format": "(786) 555-5555",
      "valid": true,
      "fraud_score": 0,
      "recent_abuse": false,
      "VOIP": false,
      "prepaid": false,
      "risky": false,
      "active": true,
      "carrier": "Verizon Wireless",
      "line_type": "Wireless",
      "country": "US",
      "city": "MIAMI",
      "zip_code": "33132",
      "region": "FL",
      "dialing_code": 1,
      "active_status": "N/A",
      "sms_domain": "vtext.com",
      "associated_email_addresses": {
        "status": "No associated emails found.",
        "emails": []
      },
      "user_activity": "Disabled for performance. Contact support for further assistance.",
      "mnc": "004",
      "mcc": "310",
      "leaked": false,
      "spammer": false,
      "request_id": "V0Kvh9yy8Q",
      "name": "N/A",
      "timezone": "America/New_York",
      "do_not_call": false,
      "accurate_country_code": false,
      "sms_email": "7865555555@vtext.com"
    }
  ]
}
```