# API Reference - Calls Resource
## UserDefinedMessageSubscriptions subresource

UserDefinedMessageSubscriptions subresource
(information)
Info
This feature is in Public Beta.
See the __Voice SDK Call Message Events page__ for more information.
UserDefinedMessageSubscriptions is a subresource of __Calls__ and represents a subscription to user-defined messages sent from the Voice SDK. You must create a UserDefinedMessageSubscriptions subresource in order to receive messages from the Voice SDK.
A UserDefinedMessageSubscription subresource can only be created during an active Call associated with the Voice SDK.
Your Voice SDK application must be configured to send messages. Read more about sending and receiving Voice SDK messages on the __Voice SDK Call Message Events page__.
UserDefinedMessageSubscription Properties
Property nameTypeRequiredPIIDescriptionChild properties
accountSidSID<AC>
Optional
__Not PII__
The SID of the __Account__ that subscribed to the User Defined Messages.
Pattern: `^AC[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
callSidSID<CA>
Optional
__Not PII__
The SID of the __Call__ the User Defined Message Subscription is associated with. This refers to the Call SID that is producing the User Defined Messages.
Pattern: `^CA[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
sidSID<ZY>
Optional
__Not PII__
The SID that uniquely identifies this User Defined Message Subscription.
Pattern: `^ZY[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
dateCreatedstring<date-time-rfc-2822>
Optional
__Not PII__
The date that this User Defined Message Subscription was created, given in RFC 2822 format.
uristring
Optional
__Not PII__
The URI of the User Defined Message Subscription Resource, relative to `https://api.twilio.com`.
Create a UserDefinedMessageSubscription
`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json`
You need to subscribe to a Call's user-defined messages in order to receive messages from the Voice SDK. You do this by creating a UserDefinedMessageSubscription subresource for that Call SID.
You must have an endpoint that can handle `POST` or `GET` requests with a `Content-Type` of `application/json`. You specify this endpoint in the `Callback` parameter when creating your UserDefinedMessageSubscription, and this is where Twilio will send requests containing the messages from the Voice SDK.
Use the appropriate Call SID in the path of your `POST` request. Use the parent Call SID if you wish to send a message to parent Call leg. Use the child Call SID if you wish to send a message to the child Call leg.
See the __Voice SDK Overview page__ for more information on Voice SDK Call legs.
Path parameters
Property nameTypeRequiredPIIDescription
accountSidSID<AC>
required
__Not PII__
The SID of the __Account__ that subscribed to the User Defined Messages.
Pattern: `^AC[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
callSidSID<CA>
required
__Not PII__
The SID of the __Call__ the User Defined Messages subscription is associated with. This refers to the Call SID that is producing the user defined messages.
Pattern: `^CA[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
Request body parameters
Encoding type:`application/x-www-form-urlencoded`
SchemaExample
Property nameTypeRequiredPIIDescriptionChild properties
callbackstring<uri>
required
__Not PII__
The URL we should call using the `method` to send user defined events to your application. URLs must contain a valid hostname (underscores are not permitted).
idempotencyKeystring
Optional
__Not PII__
A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.
methodenum<http-method>
Optional
__Not PII__
The HTTP method Twilio will use when requesting the above `Url`. Either `GET` or `POST`. Default is `POST`.
Possible values:
`GETPOST`
Create a UserDefinedMessageSubscription to receive user-defined messages from the Voice SDK
Node.jsPythonC#JavaGoPHPRubytwilio-clicurl
Report code block
Copy code block

```
// Download the helper library from https://www.twilio.com/docs/node/install

```

const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio"; 
// Find your Account SID and Auth Token at twilio.com/console 
// and set the environment variables. See http://twil.io/secure 
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = twilio(accountSid, authToken); 
async function createUserDefinedMessageSubscription() { 
const userDefinedMessageSubscription = await client 
.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa") 
.userDefinedMessageSubscriptions.create({ 
callback: 
"https://www.example.com/your-endpoint-that-can-receive-messages", 
}); 
console.log(userDefinedMessageSubscription.accountSid); 
} 
createUserDefinedMessageSubscription();
Response
Copy response

```
{

```

"account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"sid": "ZYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"date_created": "Wed, 18 Dec 2019 20:02:01 +0000", 
"uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions/ZYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" 
}