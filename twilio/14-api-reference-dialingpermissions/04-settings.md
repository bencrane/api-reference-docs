API REFERENCE - DIALING PERMISSIONS - Settings

Dialing Permissions - Settings resource
Represents the subaccount's inheritance settings for voice dialing permissions.
DialingPermissions Settings properties
Property nameTypeRequiredPIIDescriptionChild properties
dialingPermissionsInheritanceboolean
Optional
__Not PII__
`true` if the sub-account will inherit voice dialing permissions from the Master Project; otherwise `false`.
urlstring<uri>
Optional
__Not PII__
The absolute URL of this resource.
Retrieve DialingPermissions Settings
`GET https://voice.twilio.com/v1/Settings`
Retrieve a DialingPermissions Settings resource
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
async function fetchDialingPermissionsSettings() { 
const setting = await client.voice.v1.dialingPermissions.settings().fetch(); 
console.log(setting.dialingPermissionsInheritance); 
} 
fetchDialingPermissionsSettings();
Response
Copy response

```
{

```

"dialing_permissions_inheritance": true, 
"url": "https://voice.twilio.com/v1/Settings" 
}
Update DialingPermissions Settings
`POST https://voice.twilio.com/v1/Settings`
Request body parameters
Encoding type:`application/x-www-form-urlencoded`
SchemaExample
Property nameTypeRequiredPIIDescriptionChild properties
dialingPermissionsInheritanceboolean
Optional
__Not PII__
`true` for the sub-account to inherit voice dialing permissions from the Master Project; otherwise `false`.
Update a DialingPermissions Settings resource
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
async function updateDialingPermissionsSettings() { 
const setting = await client.voice.v1.dialingPermissions 
.settings() 
.update({ dialingPermissionsInheritance: false }); 
console.log(setting.dialingPermissionsInheritance); 
} 
updateDialingPermissionsSettings();
Response
Copy response

```
{

```

"dialing_permissions_inheritance": false, 
"url": "https://voice.twilio.com/v1/Settings" 
}