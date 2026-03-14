# Message Scheduling

**Part of the Twilio Engagement Suite**

The Message Scheduling feature comes with the Twilio Engagement Suite. To learn more about Engagement Suite pricing, see RCS, SMS, MMS, or WhatsApp pricing.

The Programmable Messaging API lets you schedule Rich Communication Services (RCS), Short Messaging Services (SMS), Multimedia Messaging Services (MMS), and WhatsApp messages. Scheduled messages can be sent at a fixed time in the future.

The Engagement Suite includes Message Scheduling. Message scheduling comes at no cost and Twilio only charges for messages sent.

## Prerequisites

- Understand how to send outgoing, non-scheduled messages with Messaging Services.

For WhatsApp messaging, create, configure, and get approved:

- A WhatsApp sender in your Messaging Service's Sender Pool
- A WhatsApp templates

## Schedule an outgoing message

Twilio defines a scheduled message as a Message resource where set Status to scheduled.

To send a scheduled message using the Programmable Messaging API, create a Message resource with two parameters set: ScheduleType and SendAt.

### Parameters

A scheduled message requires all of the following parameters.

| Parameter | Type | Description | Accepted value | Example |
|-----------|------|-------------|----------------|---------|
| ScheduleType | String | The indicator that the message scheduled or not. | fixed | fixed |
| SendAt | String | The date and time when the message gets sent. Messages must be scheduled between 15 minutes and 35 days before this value. Twilio must receive the POST request for this message in that range. | Timestamp expressed in ISO-8601 format. | 2021-11-30T20:36:27Z |
| MessagingServiceSid | String | The Messaging Service SID that sends the message. Without this parameter, Twilio treats the message as a non-scheduled and sends it. | A 32-hexadecimal-digit ID that starts with MG. | MGX{32} |
| Body | String | The content of the scheduled message as text. Use this parameter, MediaUrl, or ContentSid, but not all at once. | The text body of the message up to 1600 characters long. | "This is a scheduled message." |
| MediaUrl | String | The content of the scheduled message as a URL. Use this parameter, Body, or ContentSid, but not all at once. | A URL referencing the content of the media received in the Message. | |
| ContentSid | String | The content of the scheduled message as an Content SID. Use this parameter, MediaUrl, or Body, but not all at once. Required to send templates created using the Content Template Builder. | A 32-hexadecimal-digit ID that starts with HX. String field used to identify the preconfigured content. | HXX{32} |
| To | String | The intended recipient's phone number or channel address. | Number expressed in the E.164 format. Preface with whatsapp: for WhatsApp recipients. | +15558885333 or whatsapp:+15558675310 |

### Create a scheduled message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="This is a scheduled message",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="+15558675310",
    send_at=datetime(2021, 11, 30, 20, 36, 27),
    schedule_type="fixed",
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is a scheduled message",
  "date_created": "Mon, 29 Nov 2021 22:40:10 +0000",
  "date_sent": null,
  "date_updated": "Mon, 29 Nov 2021 22:40:10 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "0",
  "price": null,
  "price_unit": null,
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Response

Your POST request response indicates whether or not your message scheduled successfully.

- A valid POST request returns a 201 (scheduled) HTTP status code.
- An invalid POST request returns a 400 HTTP status code.

A scheduled Message resource returns a `"status": "scheduled"`. To check the message status, review the response body of the response from the POST request or fetch the Message resource.

Scheduled messages don't return a status callback event.

In case you need to cancel the message, save the sid property from the scheduled Message resource response.

#### Example of the Message response with status and sid

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is a scheduled message",
  "date_created": "Mon, 29 Nov 2021 22:40:10 +0000",
  "date_sent": null,
  "date_updated": "Mon, 29 Nov 2021 22:40:10 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "0",
  "price": null,
  "price_unit": null,
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "scheduled",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}
```

## Send-time failures

A scheduled message can succeed at creation, but the message fails at the SendAt time. The following sections cover two of these cases.

### User-opt outs

User opt-outs don't cancel scheduled messages. Scheduled messages to users who have opted out fail at the SendAt time. If a user opts out of receiving messages, you can cancel the remaining scheduled messages to that user.

### WhatsApp template validation failures

WhatsApp requires apps use pre-registered templates for their business-initiated notifications, except in reply to a user-initiated message. Pre-registered templates get validated at the SendAt time, not when you create the Message resource. Messages that don't use a pre-approved WhatsApp template fail at send time.

To learn more, see Twilio WhatsApp API.

## Cancel a scheduled message

To cancel a scheduled message, update the Message resource and set the Status to canceled.

A canceled status callback event returns when a Message resource's status transitions to canceled.

### Cancel a scheduled message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    status="canceled"
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello World!",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": null,
  "date_updated": "Fri, 24 May 2019 18:18:28 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": "USD",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "canceled",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

## Maximum number of scheduled messages

Each Account and Subaccount can schedule up to 1,000,000 messages at any given time. Subaccount limits don't consume the parent Account's allocation.

## Additional resources

- "Message Scheduling FAQs" Help Center article
- How to Send SMS Messages with Messaging Services
- Message Resource API Documentation