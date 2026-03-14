# Feedback subresource

Feedback is a subresource of Messages and represents the reported outcome of tracking the performance of a user action taken by the recipient of the message.

You can create Feedback to confirm that the recipient of the associated Message performed a tracked user action.

> **Info:** For more information on why, when and how to send Feedback, see our guide How to Optimize Message Deliverability with Message Feedback. It explains what suitable tracked user actions of message recipients are and how they relate to the Message Insights One-time Password (OTP) Conversion Report.

> **Info:** Looking for step-by-step instructions on tracking the delivery of your sent messages based on Twilio- and carrier-captured status data? Follow our guide to Tracking the Message Status of Outbound Messages in the programming language of your choice.

## Feedback Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account associated with this MessageFeedback resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `message_sid` | SID\<SM\|MM\> | Optional | Not PII | The SID of the Message resource associated with this MessageFeedback resource. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `outcome` | enum\<string\> | Optional | Not PII | Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see How to Optimize Message Deliverability with Message Feedback. Possible values: `confirmed`, `unconfirmed` |
| `date_created` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT when this MessageFeedback resource was created, specified in RFC 2822 format. |
| `date_updated` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT when this MessageFeedback resource was last updated, specified in RFC 2822 format. |
| `uri` | string | Optional | Not PII | The URI of the resource, relative to https://api.twilio.com. |

## Outcome Values

The following are the possible values for the Outcome parameter:

| Status | Description |
|--------|-------------|
| `confirmed` | The recipient of a Message performed a tracked user action and confirmation was reported by creating a Feedback subresource with the outcome set to confirmed. For more details see How to Optimize Message Deliverability with Message Feedback. |
| `unconfirmed` | The initial value for a Message created with ProvideFeedback=True. The reported outcome is unconfirmed until a Feedback subresource is created with an outcome property of confirmed. |

---

## Create Feedback

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json
```

> **Warning:** To track and provide Message Feedback for a Message, you must set the ProvideFeedback parameter to true when you first create the Message. Upon Message creation, the outcome of the Message Feedback will then initially be treated as unconfirmed.
>
> For more information on why, when and how to send Message Feedback, see our guide How to Optimize Message Deliverability with Message Feedback.

You can use this action to create Message Feedback confirming the performance of a tracked user action.

Pass the Outcome parameter with value confirmed to update the Message Feedback once the associated Message was received and the message recipient performed the tracked user action based on the received message.

> **Info:** Update the Message Feedback even if the Message is received with a delay once the conditions for confirmation are met. This ensures the Messaging Insights are current and message delivery optimizations are based on complete information.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account associated with the Message resource for which to create MessageFeedback. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `message_sid` | SID\<SM\|MM\> | required | Not PII | The SID of the Message resource for which to create MessageFeedback. Pattern: `^(SM|MM)[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `outcome` | enum\<string\> | Optional | Not PII | Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see How to Optimize Message Deliverability with Message Feedback. Possible values: `confirmed`, `unconfirmed` |

### Create Feedback to confirm the performance of the tracked user action

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

feedback = client.messages(
    "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).feedback.create(outcome="confirmed")

print(feedback.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "message_sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "outcome": "confirmed",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Feedback.json"
}
```

---

## What's next?

Now that you know how to work with the Feedback subresource, you should check out the following:

- View your reported Message Feedback information in the Console to help you monitor and understand your message deliverability.