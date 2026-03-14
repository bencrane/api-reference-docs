# Send and receive RCS messages

On this page, you'll learn how to send RCS messages. All RCS messages are branded and originate from a verified sender by default.

For information about RCS features, see RCS Business Messaging.

---

## Complete the prerequisites

Before you send an RCS message, complete the RCS setup.

---

## Send an RCS message with automatic fallback to SMS or MMS

You can send RCS messages using code that makes HTTP POST requests to the Message resource in the Twilio REST API.

When an RCS sender is in a Messaging Service's Sender Pool, Programmable Messaging defaults to RCS as the first-attempt channel. Programmable Messaging proactively checks whether the recipient's device supports RCS. Messages that can't be delivered over RCS automatically fall back to SMS or MMS, using other senders in the Messaging Service's Sender Pool.

To send an RCS message, follow the steps to send an SMS message. Set the MessagingServiceSid or From field to the Messaging Service SID assigned to the RCS Sender. To find a Messaging Service's SID, check the Sid column on the Messaging Services page in the Twilio Console.

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
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world.",
    to="+155XXXXXXXX",
)

print(message.body)
```

---

## Send an RCS message without automatic fallback to SMS or MMS

You can also send RCS messages without relying on Twilio's automatic fallback. You'll need to implement your own fallback orchestration logic to retry failed RCS attempts on another channel.

### Using a Messaging Service

To turn off fallback when you send an RCS message through a Messaging Service, add the `rcs:` prefix to the recipient phone number in the To field.

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
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="My first RCS message. Hello, world.",
    to="rcs:+155XXXXXXXX",
)

print(message.body)
```

### Without a Messaging Service

To turn off fallback when you send an RCS message without using a Messaging Service, set the RCS Sender ID in the From field and the recipient phone number in the To field.

You can find the RCS Sender ID at the top of the RCS Sender's Settings page in the Twilio Console.

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
    from_="rcs:brand_xyz123_agent",
    body="My first RCS message. Hello, world.",
    to="rcs:+155XXXXXXXX",
)

print(message.body)
```

See RCS Messaging Best Practices and FAQ for information on RCS error codes and using RCS without Twilio's fallback.

---

## Send an RCS message that contains media

To send messages containing RCS-supported media formats and sizes, include the media URL in the RCS API call as shown in the following example. Twilio will fetch the media from the URL provided.

The media URL must be publicly accessible. Twilio cannot fetch media from hidden URLs or URLs that require authentication.

Twilio automatically attempts delivery over RCS. Unsupported media formats may fall back to MMS. Devices that aren't RCS-capable receive the message by MMS in MMS-supported regions, and Picture SMS elsewhere.

Twilio supports combining text and media in a single request for image and video files. The text and media RCS message is automatically packaged as an RCS Rich Card by Twilio for delivery, ensuring you are not billed for two separate messages. When you use a Rich Card, Twilio processes and bills text and media in a single RCS request.

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
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    media_url=[
        "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
    ],
    to="+155XXXXXXXX",
)

print(message.body)
```

---

## Send an RCS message that contains rich content

> **Beta:** If you're interested in sending rich content on RCS without using a Content Template, you can request access to the private beta of the Communications API.

You can create rich content using Content Templates and send that content through RCS. RCS supports the following rich content types:

| RCS Feature | Content Type |
|-------------|--------------|
| Rich Card | twilio/card |
| Chip List | twilio/card |
| Basic Text | twilio/text |
| Media | twilio/media |
| Rich Card Carousel | twilio/carousel |
| Webviews | twilio/card |

For devices that aren't RCS-capable, you can define customized fallback to SMS and MMS in applicable regions by defining multiple types in a Content Template.

To send rich content through RCS:

1. Define your rich content in the API or the Twilio Console.
2. In the API response or in the Twilio Console, find the unique Content SID starting with HX that identifies your rich content.
3. Add the ContentSid and content variables to the Send an RCS message with automatic fallback to SMS or MMS code as shown in the following example.

To learn more about content variables, see Using Variables.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    content_sid="HXXXXXXXXXXXXX",
    content_variables=json.dumps({"1": "Name"}),
    to="+1555XXXXXXX",
)

print(message.body)
```

---

## Receive an RCS message

When users send messages to an RCS Sender, messages are shown on the Programmable Messaging Logs page in the Twilio Console. You can also configure a Messaging Service to send a webhook when it receives an incoming message.

---

## Let customers initiate a chat with an RCS Sender

Your customers can start a chat with an RCS Sender from a deep link URL. You can embed the URL as a button, link, or QR code in an email, app, or website based on your requirements. A fallback phone number is used if users cannot send or receive RCS messages.

### Deep link URL Format

```
sms:+1555XXXXXXX?service_id=brand_xyz123_agent%40rbm.goog&body=Hello%20World
```

| Parameter | Description | Necessity |
|-----------|-------------|-----------|
| +1555XXXXXXX | Fallback number | Required |
| brand_xyz123_agent | RCS Sender ID, excluding rcs: | Required |
| Hello%20World | URL-encoded pre-filled message | Optional |

The RCS Sender ID can be found at the top the RCS Sender's Settings page.

You can also use the Google SMS link creator to generate the deep link and QR code.

---

## Monitor and analyze traffic for RCS messages that you send

After you send RCS messages, you can monitor and analyze your RCS traffic by using Programmable Messaging Logs in the Twilio Console and Messaging Insights. If you don't see a log for your message, you can view errors on the Error Logs page in the Twilio Console.

If Twilio successfully sent the message with RCS, the From field contains `rcs:<SenderId>`. You can view this field in the Programmable Messaging Logs in the Twilio Console, outbound message status callbacks, and Fetch a Message resource request results.

In many regions, RCS tracks delivered and read statuses more reliably than SMS. If you need to A/B test the two channels, consider using other metrics, such as clicks or conversions.