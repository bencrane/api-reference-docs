# API REFERENCE - CALLS RESOURCE
## UserDefinedMessages 

UserDefinedMessages subresource
(information)
Info
See the __Voice SDK Call Message Events page__ for more information.
UserDefinedMessages is a subresource of __Calls__ and represents a user-defined message that is sent to a Voice SDK end user during an active call.
A UserDefinedMessage subresource can only be created during an active call associated with the Voice SDK.
Read more about the Voice SDK messaging feature on the __Voice SDK Call Message Events Page__.
UserDefinedMessages properties
Property nameTypeRequiredPIIDescriptionChild properties
accountSidSID<AC>
Optional
__Not PII__
The SID of the __Account__ that created User Defined Message.
Pattern: `^AC[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
callSidSID<CA>
Optional
__Not PII__
The SID of the __Call__ the User Defined Message is associated with.
Pattern: `^CA[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
sidSID<KX>
Optional
__Not PII__
The SID that uniquely identifies this User Defined Message.
Pattern: `^KX[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
dateCreatedstring<date-time-rfc-2822>
Optional
__Not PII__
The date that this User Defined Message was created, given in RFC 2822 format.
Create a UserDefinedMessage
`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json`
Path parameters
Property nameTypeRequiredPIIDescription
accountSidSID<AC>
required
__Not PII__
The SID of the __Account__ that created User Defined Message.
Pattern: `^AC[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
callSidSID<CA>
required
__Not PII__
The SID of the __Call__ the User Defined Message is associated with.
Pattern: `^CA[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
Request body parameters
Encoding type:`application/x-www-form-urlencoded`
SchemaExample
Property nameTypeRequiredPIIDescriptionChild properties
contentstring
required
__Not PII__
The User Defined Message in the form of URL-encoded JSON string.
idempotencyKeystring
Optional
__Not PII__
A unique string value to identify API call. This should be a unique string value per API call and can be a randomly generated.
Send a message from the server side to the Voice SDK by making a `POST` request to an active Call's UserDefinedMessages endpoint.
The content of your message is contained in the `Content` parameter of your request as a stringified JSON object.
Use the appropriate Call SID in the path of your `POST` request. Use the parent Call SID if you wish to send a message to parent Call leg. Use the child Call SID if you wish to send a message to the child Call leg.
See the __Voice SDK Overview page__ for more information on Voice SDK Call legs.
Send a UserDefinedMessage to an SDK end-user
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
async function createUserDefinedMessage() { 
const userDefinedMessage = await client 
.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa") 
.userDefinedMessages.create({ 
content: JSON.stringify({ example_key: "Hello from the server side!" }), 
}); 
console.log(userDefinedMessage.accountSid); 
} 
createUserDefinedMessage();
Response
Copy response

```
{

```

"account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"sid": "KXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"date_created": "Wed, 18 Dec 2019 20:02:01 +0000" 
}
Related resources
Go to the __Voice SDK Call Message Events page__ to learn more.