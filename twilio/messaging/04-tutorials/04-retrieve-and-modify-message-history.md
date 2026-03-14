# Retrieve and Modify Message History

This guide will show you how you can search, retrieve, and modify the messages you send or receive with Programmable Messaging, using the Message Resource.

A Message resource represents an inbound or outbound message. Twilio creates a Message when any of the following occur:

- You create a Message resource (i.e., send an outbound message) via the REST API
- Twilio executes a `<Message>` TwiML instruction
- Someone sends a message to one of your Twilio numbers or messaging channel addresses

> **Info**
> For step-by-step instructions for sending your first SMS message with Twilio, check out one of the SMS quickstarts.
> 
> For detailed instructions on setting up your local environment to code in all of our supported programming languages, see the Environment Setup section of this Guide.
> 
> Looking to send WhatsApp messages with Twilio? Try one of the WhatsApp quickstarts.
> 
> If you're looking for how to respond to incoming messages, check out the How to Receive and Reply to SMS Messages tutorial.

## Search Previous Messages

When you send an SMS or MMS message via the REST API, using the `<Message>` verb in TwiML, or someone sends a message to one of your Twilio numbers or other channels, Twilio creates a Message instance resource. The Messages list resource represents the set of messages sent from and received by an account.

Retrieving sent and received messages from history can be achieved by querying the Messages list resource. Here you can see how to retrieve all messages from your account:

### List all Messages in your account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.messages.list(limit=20)

for record in messages:
    print(record.body)
```

**Response:**

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

If you'd like to have Twilio narrow down this list of messages for you, you can do so by specifying a To number, From number, and a DateSent. The following example shows passing all three but you can pass any combination of parameters you need. This example filters messages for those sent from a specific number to another specific number on or after a certain date:

### List Messages matching filter criteria

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

messages = client.messages.list(
    to="+15558675310",
    from_="+15017122661",
    date_sent=datetime(2016, 8, 31, 0, 0, 0),
    limit=20,
)

for record in messages:
    print(record.body)
```

**Response:**

```json
{
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=1&PageToken=PAMMc26223853f8c46b4ab7dfaa6abba0a26",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "messages": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "testing",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:50 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:50 +0000",
      "direction": "outbound-api",
      "error_code": null,
      "error_message": null,
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "0",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "SMded05904ccb347238880ca9264e8fe1c",
      "status": "sent",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMded05904ccb347238880ca9264e8fe1c.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "body": "look mom I have media!",
      "date_created": "Fri, 24 May 2019 17:44:46 +0000",
      "date_sent": "Fri, 24 May 2019 17:44:49 +0000",
      "date_updated": "Fri, 24 May 2019 17:44:49 +0000",
      "direction": "inbound",
      "error_code": 30004,
      "error_message": "Message blocked",
      "from": "+12019235161",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "num_media": "3",
      "num_segments": "1",
      "price": "-0.00750",
      "price_unit": "USD",
      "sid": "MMc26223853f8c46b4ab7dfaa6abba0a26",
      "status": "received",
      "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Media.json",
        "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26/Feedback.json"
      },
      "to": "+18182008801",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMc26223853f8c46b4ab7dfaa6abba0a26.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json?To=%2B123456789&From=%2B987654321&DateSent%3E=2008-01-02&PageSize=2&Page=0"
}
```

## Retrieve a Single Message

If you know the message SID (i.e. the message's unique identifier), then you can retrieve that specific message directly.

### Fetch a single Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages("MM800f449d0399ed014aae2bcc0cc2f2ec").fetch()

print(message.body)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "testing",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": "Fri, 24 May 2019 17:18:28 +0000",
  "date_updated": "Fri, 24 May 2019 17:18:28 +0000",
  "direction": "outbound-api",
  "error_code": 30007,
  "error_message": "Carrier violation",
  "from": "+12019235161",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": "-0.00750",
  "price_unit": "USD",
  "sid": "MM800f449d0399ed014aae2bcc0cc2f2ec",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

How might you know the SID? When sending a message using the REST API, you will receive a Message instance resource as the response from Twilio. Using this, you can inspect the Sid property of the resource. Read more about sending messages in our guide on the topic.

When using the `<Message>` verb in TwiML, you will need to specify a webhook URL the action attribute to have Twilio call your webhook when the status of the message changes. Your webhook will be passed a MessageSid parameter identifying the incoming message. Read our guide on tracking message status for more on how to do this.

When receiving a message, your webhook will be passed a MessageSid parameter identifying the incoming message. You can learn more about receiving messages here.

However you obtain the SID, you can immediately request the message using the above code, or, you can save the SID in a database for later recall.

## Delete or Redact Previously Sent Messages

If you want to delete a message from history, you can do so by deleting the Message instance resource.

### Delete a Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messages("MM800f449d0399ed014aae2bcc0cc2f2ec").delete()
```

Perhaps you want to redact the body of the message for security purposes, but you don't want to delete the message from history entirely. Redacting a message is done by posting an empty body to the message resource (i.e., this is a specific use of the Message update call):

### Redact the body of a Message

```python
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/user/account
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

client.messages("MMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX") \
      .update(body="")
```

**Output:**

```json
{
   "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "api_version": "2010-04-01",
   "body": "",
   "error_code": null,
   "error_message": null,
   "num_segments": "1",
   "num_media": "0",
   "date_created": "Mon, 16 Aug 2010 03:45:01 +0000",
   "date_sent": "Mon, 16 Aug 2010 03:45:03 +0000",
   "date_updated": "Mon, 16 Aug 2010 03:45:03 +0000",
   "direction": "outbound-api",
   "from": "+14158141829",
   "price": "-0.02000",
   "sid": "MM800f449d0399ed014aae2bcc0cc2f2ec",
   "status": "sent",
   "to": "+15558675310",
   "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/MM800f449d0399ed014aae2bcc0cc2f2ec.json"
}
```