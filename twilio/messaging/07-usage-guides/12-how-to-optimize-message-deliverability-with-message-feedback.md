# How to Optimize Message Deliverability with Message Feedback

In this guide you will learn when, why and how to send Message Feedback to report the outcome of whether the recipient of a message performed a specific tracked user action.

Message Feedback:

- Allows Twilio to optimize message deliverability.
- Supports gathering of Messaging Insights on the conversion of One-Time Passwords (OTP) and similar tracked user actions performed by the message recipient.

## Before you begin

### When should you use Message Feedback?

Message Feedback is intended for use cases where sending a message leads to a trackable user action performed by the message recipient. The primary use case is the sending of messages with one-time passwords (OTP) and similar authentication or account verification codes (PINs) in two-factor or multi-factor authentication (2FA or MFA) scenarios.

In these cases, there are consistently occurring trackable user actions which are uniquely identifiable, so they can be traced back to a specific sent Message and its Message Feedback subresource.

Examples of such trackable user actions include:

- A user receives a message with a one-time verification code and enters it into a website or app for 2FA/MFA.
- A user receives a message with a temporary password and uses it to reset the account password.
- A user receives a message and replies to it with a call or message.
- A user clicks on a unique link contained in the message.

### Why should you send Message Feedback?

Sending messages nationally or internationally is not a one-size-fits-all operation. Message deliverability varies by geography, involved carriers, use case, and even for individual customers. Twilio uses a mix of automated algorithms and manual adjustments to ensure the best possible message deliverability for customers.

By providing Message Feedback you serve two related purposes:

1. You complement the delivery status data automatically captured by Twilio and involved carriers throughout the message lifecycle with valuable information about the actual performance of user actions by the message recipient. This additional information allows Twilio to further optimize message deliverability both in the aggregate and for your account specifically.

2. You provide the very data that allow the real-time Messaging Insights OTP Conversion Report in the Console to be compiled. This report is a conversion funnel analysis tool covering messages tracked with feedback from sending, through successful delivery to confirmed user action performance.

## How to submit Message Feedback

Submitting Message Feedback to Twilio is a four-step process:

1. Send a Message with ProvideFeedback enabled
2. Store Message SID retrievable in response to the tracked user action
3. Track the user action performed in response to Message receipt
4. Send Message Feedback to confirm the tracked user action was performed

> **Info**
> As the use case details of your tracked user action may differ, the following step-by-step instructions focus on the correct usage of the Message resource and its Message Feedback subresource.
>
> For illustration purposes, the following steps assume that:
> - You send a message to the recipient (user) containing a URL with a unique confirmation id as a query parameter.
> - The tracked user action is the opening of the URL by the message recipient.
> - You implemented a means of retrieving the unique Message SID for a sent confirmation message on the basis of the confirmation id query parameter.

### Step 1: Send a Message with ProvideFeedback enabled

Create a new Message with the ProvideFeedback parameter set to True to send the message underlying the uniquely trackable user action.

ProvideFeedback must be set to True at time of Message creation so that:

- Twilio starts capturing the necessary data to track delivery performance from Message creation and sending to the expected confirmation that the tracked user action was performed.
- Incorporating the gathered information in the Message Insights OTP Conversion Report immediately.
- You can send Message Feedback in Step 4 to confirm the actual performance of the tracked user action.

> **Warning**
> We recommend using the ProvideFeedback parameter only on OTP messages to ensure a clean set of OTP-related data in the OTP Conversion report.

#### Send the Message for which to provide Feedback

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
    body="Open to confirm: https://www.example.com/confirm?id=1234567890",
    from_="+15557122661",
    provide_feedback=True,
    to="+15558675310",
)

print(message.body)
```

#### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Open to confirm: https://www.example.com/confirm?id=1234567890",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15557122661",
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

### Step 2: Store Message SID retrievable in response to the tracked user action

Store the Message SID of the Message created in Step 1 such that you can retrieve it on the basis of the uniquely identifiable user action you are tracking.

For purposes of the illustrative scenario, the Message SID must be stored and retrievable on the basis of the unique id query parameter value contained in the URL sent with the Step 1 message.

### Step 3: Track the user action performed in response to Message receipt

Track the performance of the unique user action performed in response to the successful receipt of the Message sent in Step 1.

For purposes of the illustrative scenario, you know the tracked user action has been performed, when your backend route handler for the URL sent in Step 1 is called with the unique confirmation id as a query parameter.

### Step 4: Send Message Feedback to confirm the tracked user action was performed

Once you determine that the unique tracked user action in Step 3 has been performed by the message recipient, you:

1. Retrieve the unique Message SID of the specific Message underlying the tracked user action.
2. Update the Message Feedback for the Message with Outcome parameter value confirmed to report to Twilio that the tracked user action was performed.

> **Info**
> Update the Message Feedback even if the Message is received with a delay once the conditions for confirmation are met. This ensures the Messaging Insights are current and message delivery optimizations are based on complete information.
>
> Do not update the Message Feedback if the tracked user action is not performed, this will result in the Message Feedback resource's outcome status correctly remaining unconfirmed.

#### Send Message Feedback to confirm performance of the tracked user action

```python
import os
from flask import Flask
from twilio import Client

import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)


@app.route("/confirm", methods=['GET'])
def incoming_sms():
    # unique_id = request.values.get('id', None)
    # Use a unique id associated with your user to figure out the Message Sid
    # of the message that prompted this action
    message_sid = 'SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

    # Get your Account Sid and Auth Token from twilio.com/console
    # To set up environmental variables, see http://twil.io/secure
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']

    client = Client(account_sid, auth_token)
    client.messages(message_sid).feedback.create(outcome="confirmed")

    return ('Thank you!', 200)


if __name__ == "__main__":
    app.run(debug=True)
```

#### Output

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "message_sid": "SM6d4d807e10f24d83a1ab01da10ccc0f5",
  "outcome": "confirmed",
  "date_created": "Fri, 02 Sep 2016 18:19:59 +0000",
  "date_updated": "Fri, 02 Sep 2016 18:42:40 +0000",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/SMS/Messages/SM6d4d807e10f24d83a1ab01da10ccc0f5/Feedback.json"
}
```

## What's next?

Now that you have learned why, when and how to provide Message Feedback, you may wish to check out the following:

- View your reported Message Feedback information in the Console to help you monitor and understand your message deliverability.
- Looking for step-by-step instructions on tracking the delivery of your sent messages based on Twilio- and carrier-captured status data? Follow our guide to Tracking the Message Status of Outbound Messages in the programming language of your choice.