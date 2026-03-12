API REFERENCE - DIALING PERMISSIONS - HighRiskSpecialPrefixes subresource

Dialing Permissions - HighRiskSpecialPrefixes subresource
HighRiskSpecialPrefixes is a subresource of __Countries__ and represents a list of high-risk prefixes for a specific country.
HighRiskSpecialPrefixes properties
Property nameTypeRequiredPIIDescriptionChild properties
prefixstring
Optional
__Not PII__
A prefix is a contiguous number range for a block of E.164 numbers that includes the E.164 assigned country code. For example, a North American Numbering Plan prefix like `+1510720`written like `+1(510) 720` matches all numbers inclusive from `+1(510) 720-0000` to `+1(510) 720-9999`.
Retrieve a list of HighRiskSpecialPrefixes
`GET https://voice.twilio.com/v1/DialingPermissions/Countries/{IsoCode}/HighRiskSpecialPrefixes`
Path parameters
Property nameTypeRequiredPIIDescription
isoCodestring<iso-country-code>
required
__Not PII__
The __ISO 3166-1 country code__ to identify the country permissions from which high-risk special service number prefixes are fetched
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
Read multiple DialingPermissions HighRiskSpecialPrefix resources
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
async function listDialingPermissionsHrsPrefixes() { 
const highriskSpecialPrefixes = await client.voice.v1.dialingPermissions 
.countries("LV") 
.highriskSpecialPrefixes.list({ limit: 20 }); 
highriskSpecialPrefixes.forEach((h) => console.log(h.prefix)); 
} 
listDialingPermissionsHrsPrefixes();
Response
Copy response

```
{

```

"content": [ 
{ 
"prefix": "+37181" 
}, 
{ 
"prefix": "+3719000" 
} 
], 
"meta": { 
"first_page_url": "https://voice.twilio.com/v1/DialingPermissions/Countries/LV/HighRiskSpecialPrefixes?PageSize=50&Page=0", 
"key": "content", 
"next_page_url": null, 
"page": 0, 
"page_size": 50, 
"previous_page_url": null, 
"url": "https://voice.twilio.com/v1/DialingPermissions/Countries/LV/HighRiskSpecialPrefixes?PageSize=50&Page=0" 
} 
}