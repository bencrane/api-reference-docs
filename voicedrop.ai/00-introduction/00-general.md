# VoiceDrop.ai - API Reference

The VoiceDrop API provides comprehensive programmatic access to our AI-powered ringless voicemail platform, enabling developers to build sophisticated communication workflows with minimal effort. Integrate powerful voice capabilities directly into your applications with our reliable, scalable API services.

---

## Key Capabilities

### Campaign Management
- Create, schedule, and monitor voice campaigns with advanced parameters
- Control delivery rates, timing, and campaign status in real-time
- Export campaign analytics and delivery reports programmatically

### AI Voice Technology
- Generate lifelike AI voice clones from short audio recordings
- Convert text to speech with natural-sounding personalization
- Access pre-made voice profiles or create custom voice designs

### Message Delivery
- Send individual or bulk ringless voicemails with customizable scripts
- Personalize messages dynamically with recipient variables
- Implement conditional logic for message selection and delivery

### Number Management
- Verify sender numbers through automated validation processes
- Validate recipient phone numbers with detailed carrier information
- Access DNC list functionality and compliance safeguards

### System Integration
- Webhook support for delivery status notifications
- Comprehensive user and account management
- Seamless integration with existing CRM and marketing systems

---

## Technical Implementation

Our RESTful API uses straightforward API key authentication and returns standardized JSON responses, making integration quick and reliable. The API provides consistent response codes and detailed error messages to simplify development and troubleshooting.

Whether you're creating a custom CRM integration, building a marketing automation platform, or implementing voice capabilities in your SaaS product, our API provides the robust foundation you need.

---

## Getting Started

Sign up for a free trial at [app.voicedrop.ai/signup](https://app.voicedrop.ai/signup) to receive your API credentials and begin development immediately. Our comprehensive documentation includes code examples in multiple languages to accelerate your implementation.

---

## Support and Resources

| Channel | Details |
|---|---|
| Email | contact@voicedrop.ai |
| Live Chat | Available on our website and platform |
| Developer Docs | Detailed endpoint references and implementation guides |

---

## Authorization

**API Key Authentication**

| Key | Value |
|---|---|
| `auth-key` | `{{auth-key}}` |

---

## Endpoints

### GET — Call Logs

```
GET https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/logs
```

**Query Parameters**

| Parameter | Example | Description |
|---|---|---|
| `number` | `5555555` | Number you own to view its log |
| `start_date` | `2025-07-01` | Start date for filtering logs. Max range: 31 days |
| `end_date` | `2025-08-01` | End date for filtering logs. Max range: 31 days |
| `limit` | `50` | Max logs per page. Limit: 100 |
| `cursor` | — | Used for pagination when logs exceed the limit |
| `duration` | — | Filter logs ≥ specified duration. Omit or set to `0` for all logs |

**Example Request**

```bash
curl --location 'https://api.voicedrop.ai/v1/sender-numbers/owned-numbers/logs?number=17865555555&start_date=2025-10-01&end_date=2025-10-30&limit=50'
```

**Example Response — 200 OK**

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

---

### GET — User Profile

```
GET https://api.voicedrop.ai/v1/profile
```

**Example Request**

```bash
curl --location 'https://api.voicedrop.ai/v1/profile'
```

**Example Response — 200 OK**

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

---

## Do Not Call (DNC) List

This endpoint manages your Do Not Call list. Add numbers to ensure compliance by preventing communication with contacts who have opted out.

### POST — Add Number to DNC

```
POST https://api.voicedrop.ai/v1/add-to-dnc-list
```

**Request Body**

```json
{"phone": "7865555555"}
```

**Example Request**

```bash
curl --location 'https://api.voicedrop.ai/v1/add-to-dnc-list' \
--data '{"phone": "7865555555"}'
```

**Example Response — 200 OK**

```json
{
  "status": "success",
  "message": "Number added to the DNC list: 7865555555"
}
```