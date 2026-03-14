# Track the Message Status of Outbound Messages

This guide shows you how to use Twilio's status callbacks to track changes of the message status of outbound messages you send with Programmable Messaging.

Message status changes occur throughout the lifecycle of a message from creation, through sending, to delivery, and even read receipt for supporting messaging channels.

> **Info**
> The guide focuses on outbound messages created using the Message Resource of the Programmable Messaging REST API and covers the necessary considerations when using a Messaging Service.

## Before you begin

Before you dive into this guide, make sure you're familiar with the following concepts:

- Know how to send a message by using the Programmable Messaging API. You can follow a Messaging Quickstart in the programming language of your choice.
- Review our guide Outbound Message Status in Status Callbacks to understand for which status changes Twilio sends a status callback request.
- If you send high volumes of messages or schedule messages, learn what a Messaging Service is and how to use one to send a message.
- The status callbacks covered in this guide are Twilio webhooks. Check out our guide to Getting Started with Twilio Webhooks. Find other webhook pages, such as a security guide and FAQ in the Webhooks section of the docs.

Note: The code samples in this guide require some local setup steps. Select your language of choice below to learn how to set up your development environment:

- Node.js
- Python
- C# and ASP.NET MVC
- PHP
- Java
- Ruby
- Go

## How to track outbound message status

Tracking the message status of an outbound message is a two-step process:

1. Set up a status callback endpoint
2. Send a message with status callback URL

---

## Step 1. Set up a status callback endpoint

To track the message status of an outbound message, you must first create an API endpoint that:

- Is served under a publicly accessible URL (the status callback URL)
- Implements a status callback handler for Twilio's message status callback HTTP requests.

> **Warning**
> A status callback URL must contain a valid hostname. Underscores are not allowed.

How you implement your status callback endpoint depends on your use case and technology preferences. This may mean you:

- Create and host a small web application to handle the requests in the programming language and framework of your choice
- Add an additional new endpoint to your existing web application
- Use a serverless framework like Twilio Serverless Functions.

### How are status callback requests sent?

Twilio sends status callback requests as POST requests with the Content-Type set to `application/x-www-form-urlencoded`.

> **Warning**
> The properties included in Twilio's request to the StatusCallback URL vary by messaging channel and event type and are subject to change.
>
> Twilio occasionally adds new properties without advance notice.
>
> When integrating with status callback requests, it is important that your implementation is able to accept and correctly run signature validation on an evolving set of parameters.
>
> Twilio strongly recommends using the signature validation methods provided in the SDKs and not implementing your own signature validation.

In a status callback request, Twilio provides a subset of the standard request properties, and additionally MessageStatus and ErrorCode. These properties are described in the table below.

| Property | Description |
|----------|-------------|
| MessageStatus | The status of the Message resource at the time the status callback request was sent. |
| ErrorCode | If an error occurred (i.e. the MessageStatus is failed or undelivered), this property provides additional information about the failure. |

For example, a status callback request sent when the Message resource for an outbound SMS changes status to sent, may contain the following content:

```
"AccountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
"From": "+15017250604"
"MessageSid": "SM1342fe1b2c904d1ab04f0fc7a58abca9"
"MessageStatus": "sent"
"SmsSid": "SM1342fe1b2c904d1ab04f0fc7a58abca9"
"SmsStatus": "sent"
```

### SMS/MMS

For most SMS/MMS Messages that have a Status of delivered or undelivered, Twilio's request to the StatusCallback URL contains an additional property:

| Property | Description |
|----------|-------------|
| RawDlrDoneDate | This property is a passthrough of the Done Date included in the DLR (Delivery Receipt) that Twilio received from the carrier. The value is in YYMMDDhhmm format: YY is last two digits of the year (00-99), MM is the two-digit month (01-12), DD is the two-digit day (01-31), hh is the two-digit hour (00-23), mm is the two-digit minute (00-59). |

Learn more on the "Addition of RawDlrDoneDate to Delivered and Undelivered Status Webhooks" Changelog page.

### RCS, WhatsApp, and other messaging channels

If the Message resource uses RCS, WhatsApp, or another messaging channel, Twilio's request to the StatusCallback URL contains additional properties. These properties are listed in the table below.

| Property | Description |
|----------|-------------|
| ChannelInstallSid | The Installed Channel SID that was used to send this message |
| ChannelStatusMessage | The error message returned by the underlying messaging channel if Message delivery failed. This property is present only if the Message delivery failed. |
| ChannelPrefix | The channel-specific prefix identifying the messaging channel associated with this Message |
| EventType | This property contains information about post-delivery events. If the channel supports read receipts (currently RCS and WhatsApp), this property's value is READ after the recipient has read the message. |

### Implement a status callback handler (simplified example)

> **Info**
> You may want to explore how status callback requests behave before working through your actual implementation. A lightweight way to accomplish this goal is to use Twilio Serverless Functions and inspect status callbacks in the Console by using the Function Editor's debugging feature.

1. Log into your Twilio Account
2. If you do not already have a suitable Functions and Assets Service in your Console, you can create a new service for your status callback handler endpoint. Let's assume you created a new service under the name `status-callback-prototyping`.
3. From your service go to the Functions Editor to Add a new Function e.g. under the path `/message-status` with the following handler code:

```javascript
// Log Status Callback requests

exports.handler = function(context, event, callback) {
  console.log("Invoked with: ", event);
  return callback(null, "OK");
};
```

4. By default your new serverless function is created as a protected endpoint, which means Twilio Serverless performs signature validation to ensure only valid Twilio requests invoke your handler.
5. Save the new function.
6. Deploy your new serverless function by pressing Deploy All.
7. Change the toggle control above the bottom-right corner logging window to Live logs on.
8. Click on the Copy URL link above the bottom-right logging window to copy the URL for your prototype status callback endpoint into your clipboard. The copied URL would look something like this: `https://status-callback-prototyping-1234.twil.io/message-status`.

You can now use your copied status callback URL in the next step of this guide: Step 2. Send a message with status callback URL.

Once you sent a message, you can inspect the logged status callback request in the bottom-right logging window of the Functions Editor in Console.

Your response to Twilio's status callback request should have an HTTP status code of 200 (OK). No response content is required.

What your status callback handler should do when receiving a status callback request, depends on your use case.

The following simplified web application illustrates how you could log the MessageSid and MessageStatus of outbound messages as they move through their lifecycle.

> **Warning**
> Status callback requests are HTTP requests and are therefore subject to differences in latency caused by changing network conditions.
>
> Status callback requests are sent in accordance with the message status transitions described in the guide Outbound Message Status in Status Callbacks. Some of these status transitions may occur in quick succession.
>
> As a result, there is no guarantee that the status callback requests always arrive at your endpoint in the order they were sent.
>
> You should bear this consideration in mind when implementing your status callback handler.

> **Info**
> Read our guide Best Practices for Messaging Delivery Status Logging for advanced considerations when implementing a production-grade status logging solution.

### Handle a Message status callback request

```python
from flask import Flask, request
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)


@app.route("/message-status", methods=['POST'])
def incoming_sms():
    message_sid = request.values.get('MessageSid', None)
    message_status = request.values.get('MessageStatus', None)
    logging.info('SID: {}, Status: {}'.format(message_sid, message_status))

    return ('', 204)


if __name__ == "__main__":
    app.run(debug=True)
```

---

## Step 2. Send a message with status callback URL

In Step 1 you implemented a status callback handler which is publicly available at your status callback URL.

In this step you learn how to ensure Twilio sends status callback requests to your status callback URL for outbound messages.

How you do this may depend on whether you use a Messaging Service to send messages or not.

### Scenario 1: No Messaging Service

For Twilio to send status callback requests, you need to provide your status callback URL in the StatusCallback parameter of each message for which you want to track the MessageStatus.

To get the following code sample to run, replace these values:

- Replace the From phone number with one of your Twilio numbers
- Replace the To number with your mobile number
- Replace the StatusCallback URL with your status callback URL

#### Send a Message without Messaging Service with a StatusCallback URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="McAvoy or Stewart? These timelines can get so confusing.",
    from_="+15017122661",
    status_callback="http://example.com/MessageStatus",
    to="+15558675310",
)

print(message.body)
```

#### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Scenario 2: Messaging Service used

Messaging Services can be configured to have a service-level Delivery Status Callback. When creating a new Messaging Service in Console, you can specify this service-level Delivery Status Callback in Step 3 - Set up Integrations.

You can use the status callback URL from Step 1 of this guide for this Delivery Status Callback integration. If you do so, you do not have to provide the status callback URL as a message-specific parameter.

Alternatively, you can provide a message-specific status callback URL in the StatusCallback parameter for a message created with the Messaging Service.

Which of these two options is more appropriate depends on your use case.

#### Option 1 - Use Service-level Delivery Status Callback

To get the following code sample to run, replace these values:

- Replace the MessagingServiceSid with the SID of one of your Messaging Services that has a Delivery Status Callback integration configured in Console
- Replace the To number with your mobile number

##### Send a Message using Messaging Service with Delivery Status Callback Integration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="McAvoy or Stewart? These timelines can get so confusing.",
    to="+15558675310",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
)

print(message.body)
```

##### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MG9752274e9e519418a7406176694466fa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

#### Option 2 - Use Message-specific status callback URL

> **Info**
> If your Messaging Service has a service-level Delivery Status Callback configured in the Console and you provide a message-specific StatusCallback URL, Twilio sends status callback requests to the message-specific StatusCallback URL.

To get the following code sample to run, replace these values:

- Replace the MessagingServiceSid with the SID of one of your Messaging Services
- Replace the To number with your mobile number
- Replace the StatusCallback URL with your status callback URL

##### Send a Message using Messaging Service and StatusCallback URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="McAvoy or Stewart? These timelines can get so confusing.",
    to="+15558675310",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
    status_callback="http://example.com/MessageStatus",
)

print(message.body)
```

##### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MG9752274e9e519418a7406176694466fa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## What's next?

Now that you know how to track the message status of your outbound messages, check out the resources below for additional information and related Twilio product documentation:

- Read our guide Best Practices for Messaging Delivery Status Logging for advanced considerations when implementing a production-grade status logging solution.
- Explore our guide How to Optimize Message Deliverability with Message Feedback.
- See how Message Feedback supports the Messaging Insights "One-time Password (OTP) Conversion Report". Learn how to analyze the effectiveness of messages sent to provide two-factor authentication (2FA) or multi-factor authentication (MFA) codes or other one-time passwords for user authentication or account verification.
- Shorten links in messages with your own company-branded domain and track click-through-rates with Link Shortening.