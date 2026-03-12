# Client-side SDKs. - Voice SDK Call Message Events

Voice SDK Call Message Events




Voice SDK Call Message Events Feature Overview





The Call Message Events feature allows your client-side and server-side applications to communicate via custom ("user-defined") messages during a Voice SDK call. The feature leverages the existing signaling connection, so you don't need to set up your own communication channel between your client-side and server-side applications.

Two Twilio REST API Resources are used for server-side implementation:

The UserDefinedMessage Resource, which allows your server-side application to send messages to the Voice SDK end user during an active Call
The UserDefinedMessageSubscription Resource, which allows your server-side application to subscribe to messages sent from the Voice SDK for an active Call
The JavaScript, iOS, Android, and React Native SDKs provide the following functionality for the client-side implementation of Call Message Events:

JavaScript SDK
iOS SDK
Android SDK
React Native SDK
Method

call.sendMessage()

Events

Call messageSent event

Call messageReceived event

Requirements





In order to implement the Call Message Events feature, you must use supported versions of the SDKs.

Client-Side SDK	Minimum Version Required
Voice JavaScript SDK	v2.2.0
Voice iOS SDK	v6.5.0
Voice Android SDK	v6.4.0
Voice React Native SDK	v1.0.0
SDK	Minimum Version Required
Node.js	v3.83.1
Java	v9.1.1
C#	v5.81.1
Python	v7.15.1
PHP	v6.43.1
Go	v1.1.1
Twilio CLI	v5.2.2
A note on "active" Calls





The Call Message Events feature works only for active Calls.

Client side

From the perspective of the SDK, a Call is active when both the signaling and media connections are established.

Select language/platform below to see how to active Calls are defined in the SDK.

JavaScript SDK
iOS SDK
Android SDK
React Native SDK
The Call is active and ready for sending and receiving messages when the Call instance's status is "open" or "ringing".

The status of the Call is retrieved via the call.status() method.

The Call instance's accept event is emitted when the Call state transitions to open.

The Call instance's ringing event is emitted when the Call state transitions to ringing.

Server side

From the server side perspective, an "active" Call is a Call Resource with a CallStatus value of either in-progress or ringing.

The status for a Call Resource can be retrieved from the body of status callback requests or by fetching a Call Resource via API.

Send messages from server, receive messages in the SDK





The general flow of sending a message from the server side to the SDK is as follows:

An SDK end user answers or places a Call and the Call is currently active.
The server-side application makes a POST request to the Call's UserDefinedMessages endpoint. This request contains the message to be sent.
The SDK receives the message.
Required setup for server to SDK messaging





Prepare your server-side application to send messages to the SDK

You must have some way of retrieving the Call SID on your server side. One way to do this is with the statusCallback and statusCallbackEvent attributes in your <Client> and <Number> TwiML, in conjunction with an endpoint that handles status callback requests from Twilio.

Prepare your client-side application to receive messages

Add logic to your client-side application that handles incoming messages.

Select your Voice SDK language/platform below to see an example of receiving messages in the SDK.

JavaScript SDK
iOS SDK
Android SDK
React Native SDK


Copy code block
call.on("messageReceived", (message) => {
  console.log(JSON.stringify(message.content));
  //the voiceEventSid can be used for tracking the message
  console.log('voiceEventSid: ', message.voiceEventSid);
})
Send a message from the server to the SDK

Once a Call is active, send a message by sending a POST request to the Call's UserDefinedMessages endpoint. The message content is passed in the Content parameter as a JSON string.

Send a message to the SDK





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_defined_message = client.calls(
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).user_defined_messages.create(
    content=json.dumps({"key1": "Hello from the server side."})
)

print(user_defined_message.account_sid)
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "KXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Wed, 18 Dec 2019 20:02:01 +0000"
}

(information)
Info
Be sure you're using the correct Call SID when creating a subscription.

If the SDK end user (the recipient of the message) made an outgoing call, you must subscribe to the parent Call SID.

If the SDK end user (the recipient of the message) accepted an incoming call, you must subscribe to the child Call SID.

Learn more about Call legs and the SDKs on the Voice SDK Overview page.
Receive messages in the SDK

Provided that the message was sent successfully from the server side, the SDK will receive the message. See the code samples above for SDK-specific handling of incoming messages.

Send messages from the SDK to the server side





In order to receive messages on your server from the SDK, you need to set up a subscription to the Call's messages. In the subscription, you specify where Twilio should send the messages. Once a subscription is created, the SDK end-user can send messages that Twilio will then send in an HTTP request to your server-side application.

The general flow of sending a message from the SDK to the server side is as follows:

An SDK end user answers or places a Call and the Call is currently active.
The server-side application makes a POST request to the Call's UserDefinedMessageSubscriptions endpoint.
The call.sendMessage() method is invoked in the SDK.
The endpoint specified in the UserDefinedMessageSubscription request receives the message from Twilio.
Required setup for SDK to server messaging





Prepare your server-side application to receive messages from the SDK

Before you can receive any messages from the SDK, you need to set up an HTTP endpoint where Twilio will send messages. Your endpoint must be able to accept application/json. This endpoint's URL is used as the Callback parameter when subscribing to a Call's messages.
You must have some way of retrieving the Call SID on your server side. One way to do this is with the statusCallback and statusCallbackEvent attributes in your <Client> and <Number> TwiML, in conjunction with an endpoint that handles status callback requests from Twilio.
Prepare your client-side application to send messages

Add logic to your client-side application that:

constructs a valid message object
invokes the call.sendMessage() method during an active call
handles the success/failure of a message sending attempt
Select your Voice SDK language/platform below to see an example of sending a message from the SDK to the server side.

JavaScript SDK
iOS SDK
Android SDK
React Native SDK


Copy code block
// Errors related to Call Message Events are emitted by the Device instance.
device.on("error", function (twilioError) {
  console.error(twilioError);
});

// a Call is active

// add listener for 'messageSent' event
call.on("messageSent", () => {
  console.log("Message sent.")
});

// create the Call Message
const callMessage = { 
  content: { key1: 'This is a messsage from the parent call' },
  messageType: 'user-defined-message', 
  contentType: "application/json"
}

// send the message
// the voiceEventSid can be used for tracking the message
sendMessageButton.onclick = () => {
  console.log('Sending message.')
  const voiceEventSid = call.sendMessage(callMessage)
}
You can only send messages during an active Call. If you have any UI elements that your SDK end user interacts with (e.g. a "Send Message" button), make sure that sending messages is only enabled during an active Call.

Subscribe to an active Call's messages

Once a Call is active, your server-side must set up a subscription to a Call's messages by making a POST request to the Call's UserDefinedMessageSubscription Resource.

The Callback parameter specifies your endpoint that will receive messages from Twilio.

Subscribe to a Call's Messages





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_defined_message_subscription = client.calls(
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).user_defined_message_subscriptions.create(
    callback="https://www.example.com/your-endpoint-that-can-receive-messages",
    method="POST",
)

print(user_defined_message_subscription.account_sid)
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ZYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Wed, 18 Dec 2019 20:02:01 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions/ZYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}

(information)
Info
Be sure you're using the correct Call SID when creating a subscription.

If the SDK end user (who is sending messages that you wish to receive) made an outgoing call, you must subscribe to the parent Call SID.

If the SDK end user (who is sending messages that you wish to receive) accepted an incoming call, you must subscribe to the child Call SID.

Learn more about Call legs and the SDKs on the Voice SDK Overview page.
Send a message from the SDK

Once a subscription has been set up, the SDK can now invoke the call.sendMessage() event.

Receive the message on the server side

If a subscription was created and then the SDK sent a message successfully, your Callback endpoint will receive the request from Twilio. The message from the SDK is contained in the Content property of the request.

See an example of the Twilio's request to the Callback endpoint below, followed by a description of the parameters in the request.



Copy code block
{
  ContentType: 'application/json',
  Content: '{"key1":"This is a messsage from the SDK"}',
  SequenceNumber: '1',
  CallSid: 'CA0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  Timestamp: 'Fri, 2 Dec 2022 22:02:49 +0000',
  AccountSid: 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  Sid: 'KXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
}
Parameter	Description
ContentType	The Content-Type of the request. (Currently, Twilio only supports application/json.)
Content	The message sent from the SDK as a JSON string.
SequenceNumber	The order in which the messages were sent, starting from 0.
CallSid	The SID of the Call Resource this message is associated with
Timestamp	The timestamp when Twilio sent this message, given as UTC in RFC 2822 format.
AccountSid	The Twilio Account SID associated with the message.
Sid	A unique identifier for this message. This can be used for internal logging/tracking.