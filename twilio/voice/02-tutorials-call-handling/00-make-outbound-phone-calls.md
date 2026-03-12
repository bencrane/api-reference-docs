# Make outbound phone calls

In this tutorial, you'll learn how to make and manage outbound phone calls with Twilio Programmable Voice and your preferred programming language. You'll use the Calls resource in the Twilio Voice API.

## Complete the prerequisites

- Python
- Node.js
- PHP
- C# (.NET Core)
- Java
- Go
- Ruby

1. Install Python.
2. Install the Twilio Python SDK. To install using pip, run:

```
pip install twilio
```

3. Sign up for Twilio and get a phone number:
   - Sign up for Twilio.
   - To get a phone that has voice capabilities, do either of the following in the Twilio Console:
     - In the Account Dashboard, click Get a phone number.
     - In the navigation menu, go to Phone Numbers > Manage > Buy a number.
   - In the Account Dashboard, copy your Account SID and Auth Token and paste them in a temporary local file for use later in this quickstart.

## Make an outbound call

- Python
- Node.js
- PHP
- C# (.NET Core)
- Java
- Go
- Ruby

1. Create and open a new file called make_call.py anywhere on your machine and paste in the following code:

### Make an outbound call with TwiML

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
    twiml="<Response><Say>Ahoy, World</Say></Response>",
    to="+14158675309",
    from_="+14158675308",
)

print(call.sid)
```

To learn all of the API response values that you can return with print(), see the response for Create a call in the API documentation. Precede the response value with call. (for example: print(call.sid) returns the sid value).

2. Set the environment variables for your Account SID and Auth Token.

> **Warning: Improve security with API keys**
> To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see Why you should use API keys.

**On Mac or Linux:**

Run the following commands to add your credentials as environment variables in a twilio.env file and source them. Replace ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX with your Account SID and replace your_auth_token with your Auth Token.

```
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
source ./twilio.env
```

If you're committing code with git, run the following command to add the twilio.env file to .gitignore to avoid uploading your credentials in plain text:

```
echo "twilio.env" >> .gitignore
```

**On Windows command line (cmd.exe):**

Run the following commands. Replace ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX with your Account SID and replace your_auth_token with your Auth Token.

```
set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_AUTH_TOKEN=your_auth_token
```

Learn more about storing your Twilio credentials safely.

3. In the make_call.py file, do the following:
   - Replace the value for to with the recipient phone number in E.164 format.
   - Replace the value for from with your Twilio phone number in E.164 format.
   - Replace the value for twiml with your desired TwiML instructions.

4. To use a hosted TwiML URL, replace twiml with url and set the value to the URL that hosts your TwiML instructions. For example:

```
url="http://demo.twilio.com/docs/voice.xml"
```

The following voice.xml file is hosted at http://demo.twilio.com/docs/voice.xml uses the <Say> and the <Play> TwiML tags to read a message and play an MP3 file for the user.

**voice.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
        <Play>http://demo.twilio.com/docs/classic.mp3</Play>
    </Response>
</xml>
```

5. To use a TwiML application to handle calls, replace twiml with application_sid and set the value to your TwiML application's SID. You can create and configure applications on the TwiML Apps page in the Twilio Console.

```
application_sid="<YOUR_TWIML_APP_SID>"
```

When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

> **Warning**
> The application_sid take precedence over the twiml and url parameters and ignores the following parameters: method, fallback_url, fallback_method, status_callback, status_callback_method. Twilio expects that your application handles all of this information. Learn more about the Calls resource.

6. Save your changes and run this command from your terminal in the directory that contains make_call.py:

```
python make_call.py
```

After a few moments, you receive a call from your Twilio number.

## Manage your outbound call

Optionally, you can configure additional parameters when making outbound calls to customize call behavior. Below are some common use cases.

### Send digits

To dial an extension, set the SendDigits parameter to the sequence of digits to send after the call connects.

- You can include any digit (0-9), A, B, C, D, #, or *.
- To add pauses, use w for a half-second pause or W for a one-second pause between digits.

Learn more about the request body parameters.

#### Make an outbound call and send digits

```javascript
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    method: "GET",
    sendDigits: "1234#",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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
  "from": "+14158675308",
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
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Receive call status updates

To receive the outcome of calls, set the StatusCallback parameter to your status callback URL. After Twilio completes your call, it'll make an asynchronous request to the URL. If you don't provide a StatusCallback URL, Twilio will end the call without sending any status updates to your application.

- To specify the HTTP request method Twilio should use when making requests to the StatusCallback URL, set the StatusCallbackMethod parameter to either GET or POST. The default is POST.
- To specify which call progress events should trigger a request to your StatusCallback URL, set the StatusCallbackEvent parameter to either initiated, ringing, answered, or completed. To specify multiple values, separate them with a space. The default is completed.

Learn more about the StatusCallback and StatusCallbackEvent parameters.

> **Warning**
> The StatusCallback URL must contain a valid hostname. You can't use underscores.

#### Set StatusCallback on an outbound call

```javascript
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    method: "GET",
    statusCallback: "https://www.myapp.com/events",
    statusCallbackEvent: ["completed"],
    statusCallbackMethod: "POST",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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
  "from": "+14158675308",
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
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Record your call

> **Warning**
> Recording a call is subject to the same obligations and requirements as the Recordings resource and the <Record> TwiML verb. For workflows subject to PCI or the Health Insurance Portability and the Accountability Act (HIPAA), see the applicable documentation.

To record your outbound call, set the Record parameter and set its value to true. You can also configure the following optional parameters to manage your call recordings:

- To receive the recording and other information about the call, set the RecordingStatusCallback parameter to a URL that Twilio will request when the recording is available.
- To specify the HTTP request method Twilio should use when making requests to the RecordingStatusCallback URL, set the RecordingStatusCallbackMethod parameter to either GET or POST. The default is POST.
- To specify which recording status changes should trigger a request to your RecordingStatusCallback URL, set the RecordingStatusCallbackEvent parameter to either completed, absent, or in-progress. To specify multiple values, separate them with a space.

Learn more about the RecordingStatusCallback and RecordingStatusCallbackEvent parameters.

To programmatically pause, resume, or stop recordings, see the Recordings resource and How to record phone calls.

#### Record an outbound call

```javascript
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    record: true,
    recordingStatusCallback:
      "https://www.example.com/recording-status-callback",
    recordingStatusCallbackEvent: ["completed", "in-progress"],
    recordingStatusCallbackMethod: "POST",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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
  "from": "+14158675308",
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
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

## What's next?

After Twilio completes your call, it'll make an asynchronous request to your status callback URL. From here, it's up to you to decide what to do next. For example, you can trigger another event like send an SMS to the phone number you just called with a follow-up message, or try to place the call again if the call status returns failed.

- Learn more about the Calls resource and all of its parameters to customize your outbound calls.
- Add voice capabilities to your web application with the Voice JavaScript SDK or Twilio's mobile client SDKs for your Android or iOS applications.
- View more Voice tutorials to learn how to build interactive voice response (IVR) systems, call recording, and more.

## Need some help?

We all do sometimes; code is hard. Get help now from our support team, or lean on the wisdom of the crowd by browsing the Twilio tag on Stack Overflow.

---

Terms of service
Privacy Policy
Copyright © 2026 Twilio Inc.