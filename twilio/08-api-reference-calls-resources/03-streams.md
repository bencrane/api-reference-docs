# API Reference - Calls Resource
## Streams

Streams subresource





(information)
Support for Twilio Regions
You can use Media Streams in the Ireland (IE1) and Australia (AU1) Regions. To set up Media Streams with these regions, follow the guides for non-US outbound and inbound calls. The default region remains US1.
Streams is a subresource of Calls. A Stream subresource represents a live audio stream during a live call.

Creating a Stream subresource creates a unidirectional Media Stream. You can stop a unidirectional Media Stream by updating the status of a Stream subresource, regardless of whether the Stream was created via TwiML (with <Start><Stream>) or via REST API (with the Streams subresource).

Stream Properties





Property nameTypeRequiredPIIDescriptionChild properties
sid
SID<MZ>
Optional
Not PII
The SID of the Stream resource.

Pattern:
^MZ[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
accountSid
SID<AC>
Optional
Not PII
The SID of the Account that created this Stream resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
SID<CA>
Optional
Not PII
The SID of the Call the Stream resource is associated with.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
name
string
Optional
Not PII
The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.

status
enum<string>
Optional
Not PII
The status of the Stream. Possible values are stopped and in-progress.

Possible values:
in-progress
stopped
dateUpdated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that this resource was last updated, specified in RFC 2822

 format.

uri
string
Optional
Not PII
The URI of the resource, relative to https://api.twilio.com.

Create a Stream





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created this Stream resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
SID<CA>
required
Not PII
The SID of the Call the Stream resource is associated with.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
url
string<uri>
required
Not PII
Relative or absolute URL where WebSocket connection will be established.

name
string
Optional
Not PII
The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream.

track
enum<string>
Optional
Not PII
The tracks to be included in the Stream. Possible values are inbound_track, outbound_track, both_tracks. Default value is inbound_track.

Possible values:
inbound_track
outbound_track
both_tracks
statusCallback
string<uri>
Optional
Not PII
Absolute URL to which Twilio sends status callback HTTP requests.

statusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method Twilio uses when sending status_callback requests. Possible values are GET and POST. Default is POST.

Possible values:
GET
POST
parameter1.name
string
Optional
Not PII
Parameter name

parameter1.value
string
Optional
Not PII
Parameter value

parameter2.name
string
Optional
Not PII
Parameter name

parameter2.value
string
Optional
Not PII
Parameter value

parameter3.name
string
Optional
Not PII
Parameter name

parameter3.value
string
Optional
Not PII
Parameter value

parameter4.name
string
Optional
Not PII
Parameter name

parameter4.value
string
Optional
Not PII
Parameter value

parameter5.name
string
Optional
Not PII
Parameter name

parameter5.value
string
Optional
Not PII
Parameter value

parameter6.name
string
Optional
Not PII
Parameter name

parameter6.value
string
Optional
Not PII
Parameter value

parameter7.name
string
Optional
Not PII
Parameter name

parameter7.value
string
Optional
Not PII
Parameter value

parameter8.name
string
Optional
Not PII
Parameter name

parameter8.value
string
Optional
Not PII
Parameter value

parameter9.name
string
Optional
Not PII
Parameter name

parameter9.value
string
Optional
Not PII
Parameter value

parameter10.name
string
Optional
Not PII
Parameter name

parameter10.value
string
Optional
Not PII
Parameter value

parameter11.name
string
Optional
Not PII
Parameter name

parameter11.value
string
Optional
Not PII
Parameter value

parameter12.name
string
Optional
Not PII
Parameter name

parameter12.value
string
Optional
Not PII
Parameter value

parameter13.name
string
Optional
Not PII
Parameter name

parameter13.value
string
Optional
Not PII
Parameter value

parameter14.name
string
Optional
Not PII
Parameter name

parameter14.value
string
Optional
Not PII
Parameter value

parameter15.name
string
Optional
Not PII
Parameter name

parameter15.value
string
Optional
Not PII
Parameter value

parameter16.name
string
Optional
Not PII
Parameter name

parameter16.value
string
Optional
Not PII
Parameter value

parameter17.name
string
Optional
Not PII
Parameter name

parameter17.value
string
Optional
Not PII
Parameter value

parameter18.name
string
Optional
Not PII
Parameter name

parameter18.value
string
Optional
Not PII
Parameter value

parameter19.name
string
Optional
Not PII
Parameter name

parameter19.value
string
Optional
Not PII
Parameter value

parameter20.name
string
Optional
Not PII
Parameter name

parameter20.value
string
Optional
Not PII
Parameter value

parameter21.name
string
Optional
Not PII
Parameter name

parameter21.value
string
Optional
Not PII
Parameter value

parameter22.name
string
Optional
Not PII
Parameter name

parameter22.value
string
Optional
Not PII
Parameter value

parameter23.name
string
Optional
Not PII
Parameter name

parameter23.value
string
Optional
Not PII
Parameter value

parameter24.name
string
Optional
Not PII
Parameter name

parameter24.value
string
Optional
Not PII
Parameter value

parameter25.name
string
Optional
Not PII
Parameter name

parameter25.value
string
Optional
Not PII
Parameter value

parameter26.name
string
Optional
Not PII
Parameter name

parameter26.value
string
Optional
Not PII
Parameter value

parameter27.name
string
Optional
Not PII
Parameter name

parameter27.value
string
Optional
Not PII
Parameter value

parameter28.name
string
Optional
Not PII
Parameter name

parameter28.value
string
Optional
Not PII
Parameter value

parameter29.name
string
Optional
Not PII
Parameter name

parameter29.value
string
Optional
Not PII
Parameter value

parameter30.name
string
Optional
Not PII
Parameter name

parameter30.value
string
Optional
Not PII
Parameter value

parameter31.name
string
Optional
Not PII
Parameter name

parameter31.value
string
Optional
Not PII
Parameter value

parameter32.name
string
Optional
Not PII
Parameter name

parameter32.value
string
Optional
Not PII
Parameter value

parameter33.name
string
Optional
Not PII
Parameter name

parameter33.value
string
Optional
Not PII
Parameter value

parameter34.name
string
Optional
Not PII
Parameter name

parameter34.value
string
Optional
Not PII
Parameter value

parameter35.name
string
Optional
Not PII
Parameter name

parameter35.value
string
Optional
Not PII
Parameter value

parameter36.name
string
Optional
Not PII
Parameter name

parameter36.value
string
Optional
Not PII
Parameter value

parameter37.name
string
Optional
Not PII
Parameter name

parameter37.value
string
Optional
Not PII
Parameter value

parameter38.name
string
Optional
Not PII
Parameter name

parameter38.value
string
Optional
Not PII
Parameter value

parameter39.name
string
Optional
Not PII
Parameter name

parameter39.value
string
Optional
Not PII
Parameter value

parameter40.name
string
Optional
Not PII
Parameter name

parameter40.value
string
Optional
Not PII
Parameter value

parameter41.name
string
Optional
Not PII
Parameter name

parameter41.value
string
Optional
Not PII
Parameter value

parameter42.name
string
Optional
Not PII
Parameter name

parameter42.value
string
Optional
Not PII
Parameter value

parameter43.name
string
Optional
Not PII
Parameter name

parameter43.value
string
Optional
Not PII
Parameter value

parameter44.name
string
Optional
Not PII
Parameter name

parameter44.value
string
Optional
Not PII
Parameter value

parameter45.name
string
Optional
Not PII
Parameter name

parameter45.value
string
Optional
Not PII
Parameter value

parameter46.name
string
Optional
Not PII
Parameter name

parameter46.value
string
Optional
Not PII
Parameter value

parameter47.name
string
Optional
Not PII
Parameter name

parameter47.value
string
Optional
Not PII
Parameter value

parameter48.name
string
Optional
Not PII
Parameter name

parameter48.value
string
Optional
Not PII
Parameter value

parameter49.name
string
Optional
Not PII
Parameter name

parameter49.value
string
Optional
Not PII
Parameter value

parameter50.name
string
Optional
Not PII
Parameter name

parameter50.value
string
Optional
Not PII
Parameter value

parameter51.name
string
Optional
Not PII
Parameter name

parameter51.value
string
Optional
Not PII
Parameter value

parameter52.name
string
Optional
Not PII
Parameter name

parameter52.value
string
Optional
Not PII
Parameter value

parameter53.name
string
Optional
Not PII
Parameter name

parameter53.value
string
Optional
Not PII
Parameter value

parameter54.name
string
Optional
Not PII
Parameter name

parameter54.value
string
Optional
Not PII
Parameter value

parameter55.name
string
Optional
Not PII
Parameter name

parameter55.value
string
Optional
Not PII
Parameter value

parameter56.name
string
Optional
Not PII
Parameter name

parameter56.value
string
Optional
Not PII
Parameter value

parameter57.name
string
Optional
Not PII
Parameter name

parameter57.value
string
Optional
Not PII
Parameter value

parameter58.name
string
Optional
Not PII
Parameter name

parameter58.value
string
Optional
Not PII
Parameter value

parameter59.name
string
Optional
Not PII
Parameter name

parameter59.value
string
Optional
Not PII
Parameter value

parameter60.name
string
Optional
Not PII
Parameter name

parameter60.value
string
Optional
Not PII
Parameter value

parameter61.name
string
Optional
Not PII
Parameter name

parameter61.value
string
Optional
Not PII
Parameter value

parameter62.name
string
Optional
Not PII
Parameter name

parameter62.value
string
Optional
Not PII
Parameter value

parameter63.name
string
Optional
Not PII
Parameter name

parameter63.value
string
Optional
Not PII
Parameter value

parameter64.name
string
Optional
Not PII
Parameter name

parameter64.value
string
Optional
Not PII
Parameter value

parameter65.name
string
Optional
Not PII
Parameter name

parameter65.value
string
Optional
Not PII
Parameter value

parameter66.name
string
Optional
Not PII
Parameter name

parameter66.value
string
Optional
Not PII
Parameter value

parameter67.name
string
Optional
Not PII
Parameter name

parameter67.value
string
Optional
Not PII
Parameter value

parameter68.name
string
Optional
Not PII
Parameter name

parameter68.value
string
Optional
Not PII
Parameter value

parameter69.name
string
Optional
Not PII
Parameter name

parameter69.value
string
Optional
Not PII
Parameter value

parameter70.name
string
Optional
Not PII
Parameter name

parameter70.value
string
Optional
Not PII
Parameter value

parameter71.name
string
Optional
Not PII
Parameter name

parameter71.value
string
Optional
Not PII
Parameter value

parameter72.name
string
Optional
Not PII
Parameter name

parameter72.value
string
Optional
Not PII
Parameter value

parameter73.name
string
Optional
Not PII
Parameter name

parameter73.value
string
Optional
Not PII
Parameter value

parameter74.name
string
Optional
Not PII
Parameter name

parameter74.value
string
Optional
Not PII
Parameter value

parameter75.name
string
Optional
Not PII
Parameter name

parameter75.value
string
Optional
Not PII
Parameter value

parameter76.name
string
Optional
Not PII
Parameter name

parameter76.value
string
Optional
Not PII
Parameter value

parameter77.name
string
Optional
Not PII
Parameter name

parameter77.value
string
Optional
Not PII
Parameter value

parameter78.name
string
Optional
Not PII
Parameter name

parameter78.value
string
Optional
Not PII
Parameter value

parameter79.name
string
Optional
Not PII
Parameter name

parameter79.value
string
Optional
Not PII
Parameter value

parameter80.name
string
Optional
Not PII
Parameter name

parameter80.value
string
Optional
Not PII
Parameter value

parameter81.name
string
Optional
Not PII
Parameter name

parameter81.value
string
Optional
Not PII
Parameter value

parameter82.name
string
Optional
Not PII
Parameter name

parameter82.value
string
Optional
Not PII
Parameter value

parameter83.name
string
Optional
Not PII
Parameter name

parameter83.value
string
Optional
Not PII
Parameter value

parameter84.name
string
Optional
Not PII
Parameter name

parameter84.value
string
Optional
Not PII
Parameter value

parameter85.name
string
Optional
Not PII
Parameter name

parameter85.value
string
Optional
Not PII
Parameter value

parameter86.name
string
Optional
Not PII
Parameter name

parameter86.value
string
Optional
Not PII
Parameter value

parameter87.name
string
Optional
Not PII
Parameter name

parameter87.value
string
Optional
Not PII
Parameter value

parameter88.name
string
Optional
Not PII
Parameter name

parameter88.value
string
Optional
Not PII
Parameter value

parameter89.name
string
Optional
Not PII
Parameter name

parameter89.value
string
Optional
Not PII
Parameter value

parameter90.name
string
Optional
Not PII
Parameter name

parameter90.value
string
Optional
Not PII
Parameter value

parameter91.name
string
Optional
Not PII
Parameter name

parameter91.value
string
Optional
Not PII
Parameter value

parameter92.name
string
Optional
Not PII
Parameter name

parameter92.value
string
Optional
Not PII
Parameter value

parameter93.name
string
Optional
Not PII
Parameter name

parameter93.value
string
Optional
Not PII
Parameter value

parameter94.name
string
Optional
Not PII
Parameter name

parameter94.value
string
Optional
Not PII
Parameter value

parameter95.name
string
Optional
Not PII
Parameter name

parameter95.value
string
Optional
Not PII
Parameter value

parameter96.name
string
Optional
Not PII
Parameter name

parameter96.value
string
Optional
Not PII
Parameter value

parameter97.name
string
Optional
Not PII
Parameter name

parameter97.value
string
Optional
Not PII
Parameter value

parameter98.name
string
Optional
Not PII
Parameter name

parameter98.value
string
Optional
Not PII
Parameter value

parameter99.name
string
Optional
Not PII
Parameter name

parameter99.value
string
Optional
Not PII
Parameter value

Create a Stream during a live call in order to start a new unidirectional media stream. Twilio sends the call's forked audio stream to the url specified in this request.

A sample request is shown below.

Create a unidirectional Stream on a live call





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createStream() {
  const stream = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .streams.create({
      name: "My Media Stream",
      url: "wss://example.com/a-websocket-server",
    });

  console.log(stream.sid);
}

createStream();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "My Media Stream",
  "status": "in-progress",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Custom parameters





You can also create a unidirectional media stream with custom parameters.

Twilio sends these custom parameters to your WebSocket server in the start WebSocket message. Learn more on the WebSocket Messages page.

Use the parameter[x].name and parameter[x].value parameters to specify key-value pairs. For example, parameter1.name is the key and parameter1.value is the value of a key-value pair. You can provide up to 99 key-value pairs (parameter99.name and parameter99.value).

An example request is shown below.

Create a unidirectional Stream with custom parameters





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createStream() {
  const stream = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .streams.create({
      name: "My Media Stream",
      "parameter1.name": "agent_name",
      "parameter1.value": "Mary",
      "parameter2.name": "Department",
      "parameter2.value": "sales",
      url: "wss://example.com/a-websocket-server",
    });

  console.log(stream.sid);
}

createStream();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "My Media Stream",
  "status": "in-progress",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Stop a Stream





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json

To stop a live unidirectional media stream, update the Stream subresource's status to stopped.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created this Stream resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
SID<CA>
required
Not PII
The SID of the Call the Stream resource is associated with.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
string
required
Not PII
The SID or the name of the Stream resource to be stopped

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
status
enum<string>
required
Not PII
Possible values:
stopped
An example request is shown below.

Stop a unidirectional Stream





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateStream() {
  const stream = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("Sid")
    .update({ status: "stopped" });

  console.log(stream.sid);
}

updateStream();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "Sid",
  "name": null,
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
You can also use the Stream name (if provided when creating the Stream) to stop the Stream. The example below shows how to stop a Stream with a name of myStream.

Stop a unidirectional Stream by name





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateStream() {
  const stream = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("myStream")
    .update({ status: "stopped" });

  console.log(stream.sid);
}

updateStream();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "myStream",
  "name": "myStream",
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}