# API Reference - OutgoingCallerIds resource

OutgoingCallerIds resource




The OutgoingCallerIds resource represents the set of verified phone numbers for an account. Each OutgoingCallerId represents a single verified number that you can use as a caller ID when making outgoing calls, either via the REST API or within the TwiML <Dial> verb.

OutgoingCallerIds properties





Property	Description
Sid	A 34 character string that uniquely identifies this resource.
DateCreated	The date that this resource was created, given in RFC 2822

 format.
DateUpdated	The date that this resource was last updated, given in RFC 2822

 format.
FriendlyName	A human-readable descriptive text for this resource, up to 64 characters long. By default, the FriendlyName is a nicely formatted version of the phone number.
AccountSid	The unique ID of the Account responsible for this Caller ID.
PhoneNumber	The incoming phone number. Formatted with a '+' and country code for example, +16175551212 (E.164

 format).
Uri	The URI for this resource, relative to https://api.twilio.com.
Retrieve an OutgoingCallerId





Retrieve an OutgoingCallerId





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchOutgoingCallerId() {
  const outgoingCallerId = await client
    .outgoingCallerIds("PNe905d7e6b410746a0fb08c57e5a186f3")
    .fetch();

  console.log(outgoingCallerId.sid);
}

fetchOutgoingCallerId();
Response



Copy response
{
  "sid": "PNe905d7e6b410746a0fb08c57e5a186f3",
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "(415) 867-5309",
  "phone_number": "+141586753096",
  "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
  "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Update an OutgoingCallerId





Updates the caller ID and returns the updated resource if successful.

Optional parameters





You can update only one field:

Parameter	Description
FriendlyName	A human readable description of a Caller ID, with maximum length of 64 characters. Defaults to a nicely formatted version of the phone number.
Update Outgoing Caller ID





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateOutgoingCallerId() {
  const outgoingCallerId = await client
    .outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659")
    .update({ friendlyName: "My Second Line" });

  console.log(outgoingCallerId.sid);
}

updateOutgoingCallerId();
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
  "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
  "friendly_name": "My Second Line",
  "phone_number": "+141586753096",
  "sid": "PNe536d32a3c49700934481addd5ce1659",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
The response format is identical to the HTTP GET response documented above.

Delete an OutgoingCallerId





Deletes the caller ID from the account. Returns an HTTP 204 response if successful, with no body.

Delete Outgoing Caller ID





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteOutgoingCallerId() {
  await client.outgoingCallerIds("PNe536d32a3c49700934481addd5ce1659").remove();
}

deleteOutgoingCallerId();
Retrieve a list of OutgoingCallerIds





Returns a list of OutgoingCallerIds, each representing a caller ID phone number that is valid for the account. The list includes paging information.

Filters





The following GET query string parameters allow you to limit the list returned. Parameters are case-sensitive:

Parameter	Description
PhoneNumber	Only show the OutgoingCallerId that exactly matches this phone number.
FriendlyName	Only show the OutgoingCallerId that exactly matches this name.
Retrieve a list of OutgoingCallerIds for an account





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listOutgoingCallerId() {
  const outgoingCallerIds = await client.outgoingCallerIds.list({ limit: 20 });

  outgoingCallerIds.forEach((o) => console.log(o.sid));
}

listOutgoingCallerId();
Response



Copy response
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "outgoing_caller_ids": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
      "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
      "friendly_name": "(415) 867-5309",
      "phone_number": "+141586753096",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0"
}
Retrieve a list of OutgoingCallerIds for a phone number





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listOutgoingCallerId() {
  const outgoingCallerIds = await client.outgoingCallerIds.list({
    phoneNumber: "+14158675310",
    limit: 20,
  });

  outgoingCallerIds.forEach((o) => console.log(o.sid));
}

listOutgoingCallerId();
Response



Copy response
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "outgoing_caller_ids": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Fri, 21 Aug 2009 00:11:24 +0000",
      "date_updated": "Fri, 21 Aug 2009 00:11:24 +0000",
      "friendly_name": "(415) 867-5309",
      "phone_number": "+141586753096",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json?PageSize=50&Page=0"
}
Add an OutgoingCallerId to your account





Adds an OutgoingCallerId to your account. If the request is successful, the response contains a validation code.

After you make this request, Twilio places a verification call to the provided phone number. To finish adding the OutgoingCallerId, the person who answers the call must enter the validation code. To learn more, see Verifying Caller IDs at Scale.


(information)
Info
The verification call is in English. Other languages aren't supported.
The following parameters are accepted:

Required parameters





Parameter	Description
PhoneNumber	The phone number to verify. Should be formatted with a '+' and country code for example, +16175551212 (E.164

 format). Twilio will also accept unformatted US numbers for example, (415) 555-1212 or 415-555-1212.
Optional parameters





Parameter	Description
FriendlyName	A human readable description for the new caller ID with maximum length 64 characters. Defaults to a nicely formatted version of the number.
CallDelay	The number of seconds, between 0 and 60, to delay before initiating the verification call. Defaults to 0.
Extension	Digits to dial after connecting the verification call.
StatusCallback	A URL that Twilio will request when the verification call ends to notify your app if the verification process was successful or not. See StatusCallback parameter below. Note: The StatusCallback URL is limited to 1,000 characters.
StatusCallbackMethod	The HTTP method Twilio should use when requesting the above URL. Defaults to POST.
This will create a new CallerID validation request within Twilio, which initiates a call to the phone number provided and listens for a validation code. The validation request is represented in the response by the following properties:

Response properties





Property	Description
AccountSid	The unique ID of the Account to which the Validation Request belongs.
PhoneNumber	The incoming phone number being validated, formatted with a '+' and country code e.g., +16175551212 (E.164

 format).
FriendlyName	The friendly name you provided, if any.
ValidationCode	The 6-digit validation code that must be entered via the phone to validate this phone number for Caller ID.
CallSid	The unique ID of the Call created for this validation attempt.
StatusCallback parameter





After the verification call ends, Twilio makes an asynchronous HTTP request to the StatusCallback URL if you provided one in your API request. By capturing this request, you can determine when the call ended and whether or not the number called was successfully verified.

Twilio passes the same parameters to your application in its asynchronous request to the StatusCallback URL as it does in a typical status callback request. The full list of parameters and descriptions of each are in the TwiML Voice: Twilio's Request documentation.

The verification status callback request also passes these additional parameters:

Parameter	Description
VerificationStatus	Describes whether or not the person called correctly entered the validation code. Possible values are success or failed.
OutgoingCallerIdSid	If the verification process was successful, the SID value of the newly-created OutgoingCallerId resource for the verified number.
Example





Here are a typical request and response. Typically, you would present the validation code from the response to the user who is trying to verify their phone number. Adding an Outgoing Caller ID via the API has the same result as verifying a number

 via the Twilio console.





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createValidationRequest() {
  const validationRequest = await client.validationRequests.create({
    friendlyName: "My Home Phone Number",
    phoneNumber: "+14158675310",
  });

  console.log(validationRequest.accountSid);
}

createValidationRequest();
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My Home Phone Number",
  "phone_number": "+14158675310",
  "validation_code": "111111"
}