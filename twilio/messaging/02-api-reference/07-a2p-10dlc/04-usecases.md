# A2P 10DLC - Usecases subresource

> **Warning:** This API reference supplements the ISV API onboarding guides. Don't use this API resource without following the appropriate guide, or you might experience delays in registration and unintended fees.

Usecases is a subresource of UsAppToPerson (Usa2p) and provides a list of possible A2P 10DLC use cases that a specific brand can use when creating an A2P 10DLC Campaign.

---

## Retrieve a list of A2P 10DLC use cases

```
GET https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/Compliance/Usa2p/Usecases
```

This request returns a list of possible A2P 10DLC use cases for a given Messaging Service and A2P 10DLC brand.

You need to provide one of the code values when creating a Usa2p resource.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Messaging Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `brand_registration_sid` | SID\<BN\> | Optional | Not PII | The unique string to identify the A2P brand. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Retrieve A2P 10DLC use cases for a brand

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person_usecase = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person_usecases.fetch(
    brand_registration_sid="BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(us_app_to_person_usecase.us_app_to_person_usecases)
```

**Response:**

```json
{
  "us_app_to_person_usecases": [
    {
      "code": "2FA",
      "name": "Two-Factor authentication (2FA)",
      "description": "Two-Factor authentication, one-time use password, password reset",
      "post_approval_required": false
    },
    {
      "code": "ACCOUNT_NOTIFICATION",
      "name": "Account Notification",
      "description": "All reminders, alerts, and notifications. (Examples include: flight delayed, hotel booked, appointment reminders.)",
      "post_approval_required": false
    },
    {
      "code": "AGENTS_FRANCHISES",
      "name": "Agents and Franchises",
      "description": "For brands that have multiple agents, franchises or offices in the same brand vertical, but require individual localised numbers per agent/location/office.",
      "post_approval_required": true
    },
    {
      "code": "CHARITY",
      "name": "Charity",
      "description": "Includes:  5013C Charity\nDoes not include: Religious organizations",
      "post_approval_required": false
    },
    {
      "code": "PROXY",
      "name": "Proxy",
      "description": "Peer-to-peer app-based group messaging with proxy/pooled numbers (For example: GroupMe)\nSupporting personalized services and non-exposure of personal numbers for enterprise or A2P communications. (Examples include: Uber and AirBnb.)",
      "post_approval_required": true
    },
    {
      "code": "CUSTOMER_CARE",
      "name": "Customer Care",
      "description": "All customer care messaging, including account management and support",
      "post_approval_required": false
    },
    {
      "code": "DELIVERY_NOTIFICATION",
      "name": "Delivery Notification",
      "description": "Information about the status of the delivery of a product or service",
      "post_approval_required": false
    },
    {
      "code": "EMERGENCY",
      "name": "Emergency",
      "description": "Notification services designed to support public safety / health during natural disasters, armed conflicts, pandemics and other national or regional emergencies",
      "post_approval_required": true
    },
    {
      "code": "FRAUD_ALERT",
      "name": "Fraud Alert Messaging",
      "description": "Fraud alert notification",
      "post_approval_required": false
    },
    {
      "code": "HIGHER_EDUCATION",
      "name": "Higher Education",
      "description": "For campaigns created on behalf of Colleges or Universities and will also include School Districts etc that fall outside of any \"free to the consumer\" messaging model",
      "post_approval_required": false
    },
    {
      "code": "K12_EDUCATION",
      "name": "K-12 Education",
      "description": "Campaigns created for messaging platforms that support schools from grades K-12 and distance learning centers. This is not for Post-Secondary schools.",
      "post_approval_required": true
    },
    {
      "code": "LOW_VOLUME",
      "name": "Low Volume Mixed",
      "description": "Low throughput, any combination of use-cases. Examples include:  test, demo accounts",
      "post_approval_required": false
    },
    {
      "code": "MARKETING",
      "name": "Marketing",
      "description": "Any communication with marketing and/or promotional content",
      "post_approval_required": false
    },
    {
      "code": "MIXED",
      "name": "Mixed",
      "description": "Mixed messaging reserved for specific consumer service industry",
      "post_approval_required": false
    },
    {
      "code": "POLITICAL",
      "name": "Political",
      "description": "Part of organized effort to influence decision making of specific group. All campaigns to be verified",
      "post_approval_required": false
    },
    {
      "code": "POLLING_VOTING",
      "name": "Polling and voting",
      "description": "Polling and voting",
      "post_approval_required": false
    },
    {
      "code": "PUBLIC_SERVICE_ANNOUNCEMENT",
      "name": "Public Service Announcement",
      "description": "An informational message that is meant to raise the audience awareness about an important issue",
      "post_approval_required": false
    },
    {
      "code": "SECURITY_ALERT",
      "name": "Security Alert",
      "description": "A notification that the security of a system, either software or hardware, has been compromised in some way and there is an action you need to take",
      "post_approval_required": false
    },
    {
      "code": "SOCIAL",
      "name": "Social",
      "description": "Communication within or between closed communities (For example: influencers alerts)",
      "post_approval_required": true
    },
    {
      "code": "SWEEPSTAKE",
      "name": "Sweepstake",
      "description": "Sweepstake",
      "post_approval_required": true
    }
  ]
}
```

## Use Case Reference

| Code | Name | Description | Post Approval Required |
|------|------|-------------|------------------------|
| `2FA` | Two-Factor authentication (2FA) | Two-Factor authentication, one-time use password, password reset | No |
| `ACCOUNT_NOTIFICATION` | Account Notification | All reminders, alerts, and notifications. (Examples include: flight delayed, hotel booked, appointment reminders.) | No |
| `AGENTS_FRANCHISES` | Agents and Franchises | For brands that have multiple agents, franchises or offices in the same brand vertical, but require individual localised numbers per agent/location/office. | Yes |
| `CHARITY` | Charity | Includes: 5013C Charity. Does not include: Religious organizations | No |
| `PROXY` | Proxy | Peer-to-peer app-based group messaging with proxy/pooled numbers (For example: GroupMe). Supporting personalized services and non-exposure of personal numbers for enterprise or A2P communications. (Examples include: Uber and AirBnb.) | Yes |
| `CUSTOMER_CARE` | Customer Care | All customer care messaging, including account management and support | No |
| `DELIVERY_NOTIFICATION` | Delivery Notification | Information about the status of the delivery of a product or service | No |
| `EMERGENCY` | Emergency | Notification services designed to support public safety / health during natural disasters, armed conflicts, pandemics and other national or regional emergencies | Yes |
| `FRAUD_ALERT` | Fraud Alert Messaging | Fraud alert notification | No |
| `HIGHER_EDUCATION` | Higher Education | For campaigns created on behalf of Colleges or Universities and will also include School Districts etc that fall outside of any "free to the consumer" messaging model | No |
| `K12_EDUCATION` | K-12 Education | Campaigns created for messaging platforms that support schools from grades K-12 and distance learning centers. This is not for Post-Secondary schools. | Yes |
| `LOW_VOLUME` | Low Volume Mixed | Low throughput, any combination of use-cases. Examples include: test, demo accounts | No |
| `MARKETING` | Marketing | Any communication with marketing and/or promotional content | No |
| `MIXED` | Mixed | Mixed messaging reserved for specific consumer service industry | No |
| `POLITICAL` | Political | Part of organized effort to influence decision making of specific group. All campaigns to be verified | No |
| `POLLING_VOTING` | Polling and voting | Polling and voting | No |
| `PUBLIC_SERVICE_ANNOUNCEMENT` | Public Service Announcement | An informational message that is meant to raise the audience awareness about an important issue | No |
| `SECURITY_ALERT` | Security Alert | A notification that the security of a system, either software or hardware, has been compromised in some way and there is an action you need to take | No |
| `SOCIAL` | Social | Communication within or between closed communities (For example: influencers alerts) | Yes |
| `SWEEPSTAKE` | Sweepstake | Sweepstake | Yes |