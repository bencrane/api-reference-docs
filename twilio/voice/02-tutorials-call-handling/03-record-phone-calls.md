# How to Record Phone Calls in Python

> **Warning**
> Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. Learn more about the new Console.

In this guide we'll show you how to use Twilio Programmable Voice to record phone calls with your Python web application.

We'll learn how to record both inbound and outbound calls. In both examples we'll use Twilio's Python SDK.

## Set up your web application

Incoming call flow with Twilio, showing HTTP request and response between phone and app.

When a phone number you have bought through Twilio receives an incoming call, Twilio will send an HTTP request to your web application asking for instructions on how to handle the call. Your server will respond with an XML document containing TwiML that instructs Twilio on what to do with the call. Those instructions can direct Twilio to read out a message, play an MP3 file, make a recording and much more.

To start answering phone calls, you must:

- Buy and configure a Twilio-powered phone number capable of making and receiving phone calls, and point it at your web application
- Write a web application to tell Twilio how to handle the incoming call using TwiML
- Make your web application accessible on the Internet so Twilio can make an HTTP request when you receive a call

> **Warning**
> If you are sending SMS messages to the U.S. or Canada, before proceeding further, be aware of updated restrictions on the use of Toll-Free numbers for messaging, including TF numbers obtained by purchasing them. These restrictions do not apply to Voice or other uses outside of SMS messaging. See this support article for details.

## Buy and configure a phone number

In the Twilio Console, you can search for and buy phone numbers in countries around the world. Numbers that have the Voice capability can make and receive voice phone calls from just about anywhere on the planet.

Search results for voice-capable local numbers in area code 651 with pricing and buy options.

Once you purchase a number, you'll need to configure that number to send a request to your web application. This callback mechanism is called a webhook. This can be done in the number's configuration page.

Voice settings with webhook URL for incoming calls and call status changes.

## What is a Webhook?

Webhooks are user-defined HTTP callbacks. They are usually triggered by some event, such as receiving an SMS message or an incoming phone call. When that event occurs, Twilio makes an HTTP request (usually a POST or a GET) to the URL configured for the webhook.

To handle a webhook, you only need to build a small web application that can accept the HTTP requests. Almost all server-side programming languages offer some framework for you to do this. Examples across languages include ASP.NET MVC for C#, Servlets and Spark for Java, Express for Node.js, Django and Flask for Python, and Rails and Sinatra for Ruby. PHP has its own web app framework built in, although frameworks like Laravel, Symfony and Yii are also popular.

Whichever framework and language you choose, webhooks function the same for every Twilio application. They will make an HTTP request to a URI that you provide to Twilio. Your application performs whatever logic you feel necessary - read/write from a database, integrate with another API or perform some computation - then replies to Twilio with a TwiML response with the instructions you want Twilio to perform.

## What is TwiML?

TwiML is the Twilio Markup Language, which is just to say that it's an XML document with special tags defined by Twilio to help you build your SMS and voice applications. TwiML is easier shown than explained. Here's some TwiML you might use to respond to an incoming phone call:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>Thanks for calling!</Say>
</Response>
```

And here's some TwiML you might use to respond to an incoming SMS message:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>We got your message, thank you!</Message>
</Response>
```

Every TwiML document will have the root <Response> element and within that can contain one or more verbs. Verbs are actions you'd like Twilio to take, such as <Say> a greeting to a caller, or send an SMS <Message> in reply to an incoming message. For a full reference on everything you can do with TwiML, refer to our TwiML API Reference.

## Record an inbound call

Now comes the fun part — writing Python that will handle an incoming HTTP request from Twilio!

In this example we'll use the Flask web framework to respond to Twilio's request. We'll then use TwiML to tell Twilio how to handle the call.

### Record part of an incoming call

```python
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/record", methods=['GET', 'POST'])
def record():
    """Returns TwiML which prompts the caller to record a message"""
    # Start our TwiML response
    response = VoiceResponse()

    # Use <Say> to give the caller some instructions
    response.say('Hello. Please leave a message after the beep.')

    # Use <Record> to record the caller's message
    response.record()

    # End the call with <Hangup>
    response.hangup()

    return str(response)

if __name__ == "__main__":
    app.run()
```

This code is generating the \<Record> TwiML verb, check the documentation for additional options and configuration. You can find all recordings in your console. In addition, you can make use of callbacks to be notified when a recording is ready for use.

## Record an outgoing call

Next up, we'll record an outgoing call by writing a little Python. First, we'll need to retrieve the credentials for our Twilio account.

### Retrieve your Twilio account credentials

First, you'll need to get your Twilio account credentials. They consist of your AccountSid and your Auth Token. They can be found on the home page of the console.

Twilio Console Dashboard showing account SID and auth token.

### Make and record an outbound call

Just pass an extra argument, record, to the client.calls.create method and Twilio will record the entire phone call.

#### Record an outbound call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    record=True,
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14155551212",
    from_="+15017122661",
)

print(call.sid)
```

**Response**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15017122661",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14155551212",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

Once the call is complete, you can listen to your recordings in your Twilio Console or access them directly through Twilio's REST API.

You can also receive a Webhook request when your recording is ready by passing a RecordingStatusCallback URL with your client.calls.create command. Twilio will send a request to the URL you specified, and that request will include a link to the recording's audio file: look for the RecordingUrl field.

Learn more about the RecordingStatusCallback parameter.

## What's next?

We just learned to record inbound and outbound phone calls using Twilio Programmable voice and Python. If you'd like to learn more about how you can use Twilio and Python, check out these handy guides:

- Gather User Input via Keypad (DTMF Tones) in Python
- Receive and Reply to SMS and MMS Messages in Python
- Track the Message Status of Outbound Messages