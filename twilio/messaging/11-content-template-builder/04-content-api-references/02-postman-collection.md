# Postman Collection

## Content Template Builder

**Collection Last Updated:** 10/30/2023

Import this Postman collection to quickly test and explore the Content Template Builder API.

### Download Options

- **Local file:** [Content_Template_Builder.postman_collection.json](./Content_Template_Builder.postman_collection.json)
- **Twilio Docs:** [Download from Twilio](https://docs-resources.prod.twilio.com/documents/Content_Template_Builder.postman_collection.json)

### How to Import

1. Open Postman
2. Click **Import** in the top left
3. Drag the JSON file or paste the download URL
4. Configure authentication (see below)

### Authentication Setup

All requests use Basic Auth:
- **Username:** Your Twilio Account SID
- **Password:** Your Twilio Auth Token

Set these at the collection level or per-request.

---

## Collection Contents

The collection contains **16 requests** organized into content creation and management operations.

### Content Creation Endpoints

All creation requests POST to `https://content.twilio.com/v1/Content`

| Request | Type | Description |
|---------|------|-------------|
| Create twilio/text | `twilio/text` | Simple SMS with variable substitution |
| Create twilio/media | `twilio/media` | Messages with image/media attachments |
| Create twilio/location | `twilio/location` | Geographic coordinates with labels |
| Create twilio/list-picker | `twilio/list-picker` | Multi-option selection menus |
| Create twilio/quick-reply | `twilio/quick-reply` | Fast-response action buttons |
| Create twilio/call-to-action | `twilio/call-to-action` | URL and phone number action buttons |
| Create twilio/card | `twilio/card` | Rich formatted content cards |
| Create whatsapp/card | `whatsapp/card` | WhatsApp-specific rich cards with header/footer |
| Create whatsapp/authentication | `whatsapp/authentication` | OTP/2FA message templates |

### Management Endpoints

| Request | Method | Endpoint | Description |
|---------|--------|----------|-------------|
| Send content template | POST | `/2010-04-01/Accounts/{AccountSid}/Messages.json` | Send a templated message via Messaging API |
| Submit to WhatsApp for Approval | POST | `/v1/Content/{ContentSid}/ApprovalRequests/whatsapp` | Submit template for WhatsApp approval |
| Get WhatsApp Approval Status | GET | `/v1/Content/{ContentSid}/ApprovalRequests` | Check approval status |
| Get Content | GET | `/v1/Content/{ContentSid}` | Retrieve a specific template |
| Get Content and Approvals | GET | `/v1/ContentAndApprovals/{ContentSid}` | Get template with approval info |
| Get All Content | GET | `/v1/Content?PageSize=500` | List all templates (paginated) |
| Delete Content | DELETE | `/v1/Content/{ContentSid}` | Delete a specific template |

---

## Sample Request Bodies

### twilio/text

```json
{
    "friendly_name": "boarding_notification",
    "language": "en",
    "variables": {
        "1": "name",
        "2": "11"
    },
    "types": {
        "twilio/text": {
            "body": "Hi {{1}}, \n Your flight will depart from gate {{2}}."
        }
    }
}
```

### twilio/list-picker

```json
{
    "friendly_name": "owl_sale_list",
    "language": "en",
    "variables": {
        "1": "end_date"
    },
    "types": {
        "twilio/list-picker": {
            "body": "Owl Air Flash Sale! Hurry! Sale ends on {{1}}!",
            "button": "Select a destination",
            "items": [
                {
                    "item": "SFO to NYC for $299",
                    "description": "Owl Air Flight 1337 to LGA",
                    "id": "SFO1337_postbackpayload1"
                },
                {
                    "item": "OAK to Denver for $149",
                    "description": "Owl Air Flight 5280 to DEN",
                    "id": "OAK5280_postbackpayload2"
                }
            ]
        }
    }
}
```

### twilio/call-to-action

```json
{
    "friendly_name": "flight_notification",
    "language": "en",
    "variables": {
        "1": "flight_number",
        "2": "arrival_city",
        "3": "departure_time",
        "4": "gate_number",
        "5": "url_suffix"
    },
    "types": {
        "twilio/call-to-action": {
            "body": "Owl Air: We will see you soon! Flight {{1}} to {{2}} departs at {{3}} from Gate {{4}}.",
            "actions": [
                {
                    "type": "URL",
                    "title": "Check Flight Status",
                    "url": "https://owlair.com/{{5}}"
                },
                {
                    "type": "PHONE_NUMBER",
                    "title": "Call Support",
                    "phone": "+18005551234"
                }
            ]
        }
    }
}
```

### whatsapp/authentication

```json
{
    "friendly_name": "whatsapp_otp",
    "language": "en",
    "types": {
        "whatsapp/authentication": {
            "add_security_recommendation": true,
            "code_expiration_minutes": "30",
            "actions": [
                {
                    "type": "COPY_CODE",
                    "copy_code_text": "Copy Code"
                }
            ]
        }
    }
}
```

---

## Placeholder Variables

Before executing requests, replace these placeholders:

| Placeholder | Replace With |
|-------------|--------------|
| `YOUR_ASID` | Your Account SID (starts with `AC`) |
| `YOUR_CONTENT_SID` | Content template SID (starts with `HX`) |
| `YOUR_MESSAGING_SERVICE` | Messaging Service SID (starts with `MG`) |
| `YOUR_SENDER` | Your phone number in E.164 format |
| Basic Auth username | Your Account SID |
| Basic Auth password | Your Auth Token |
