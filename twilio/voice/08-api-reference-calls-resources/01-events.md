# API Reference - Calls Resource
## Events

Events subresource
Events is a subresource of __Calls__ and shows all the requests Twilio sent to your application and how your application responded for a specific call. You can access the Call Event resource 15 minutes after a call ends.
Event Properties
Property nameTypeRequiredPIIDescriptionChild properties
request
Optional
__PII MTL: 30 days__
Contains a dictionary representing the request of the call.
response
Optional
__PII MTL: 30 days__
Contains a dictionary representing the call response, including a list of the call events.
`request`
The `request` property represents the __request that Twilio made to your application__. It contains the `url`, `method`, and `parameters`.
(information)
Info
The `parameters` property keys are presented in snake_case format, lower cased and words separated by underscores.
For example, the results from your `AddOns` will be found under the key `add_ons`.
`response`
The `response` property represents what your application sent back to Twilio. It contains `date_created`, `request_duration`, `response_code`, `content_type`, and `response_body`.
You can use this information to ensure you are producing the intended __Voice TwiML__.
Retrieve a list of Events
`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json`
Path parameters
Property nameTypeRequiredPIIDescription
accountSidSID<AC>
required
__Not PII__
The unique SID identifier of the Account.
Pattern: `^AC[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
callSidSID<CA>
required
__Not PII__
The unique SID identifier of the Call.
Pattern: `^CA[0-9a-fA-F]{32}$`Min length: `34`Max length: `34`
Query parameters
Property nameTypeRequiredPIIDescription
pageSizeinteger<int64>
Optional
__Not PII__
How many resources to return in each list page. The default is 50, and the maximum is 1000.
Minimum: `1`Maximum: `1000`
pageinteger
Optional
__Not PII__
The page index. This value is simply for client state.
Minimum: `0`
pageTokenstring
Optional
__Not PII__
The page token. This is provided by the API.
List multiple Events
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
async function listCallEvent() { 
const events = await client 
.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa") 
.events.list({ limit: 20 }); 
events.forEach((e) => console.log(e.request)); 
} 
listCallEvent();
Response
Copy response

```
{

```

"events": [ 
{ 
"request": { 
"method": "POST", 
"url": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json", 
"parameters": { 
"status_callback_method": "POST", 
"twiml": "<Response><Say>Hi!</Say></Response>", 
"trim": "trim-silence", 
"timeout": "55", 
"method": "POST", 
"from": "+987654321", 
"to": "+123456789", 
"account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
"machine_detection_timeout": "0" 
} 
}, 
"response": { 
"response_code": 201, 
"request_duration": 50, 
"content_type": "application/json", 
"response_body": "{\"sid\": \"CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}", 
"date_created": "Tue, 11 Aug 2020 17:44:08 +0000" 
} 
} 
], 
"end": 0, 
"first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json?PageSize=50&Page=0", 
"next_page_uri": null, 
"page": 0, 
"page_size": 50, 
"previous_page_uri": null, 
"start": 0, 
"uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json?PageSize=50&Page=0" 
}