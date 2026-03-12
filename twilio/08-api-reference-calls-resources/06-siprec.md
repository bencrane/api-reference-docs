# API REFERENCE - CALLS RESOURCE
## Siprec subresource

Siprec subresource




Siprec Properties





Siprec is a subresource of Calls and allows you to start a stream on a phone call and send that stream to one of the available partners via a configured SIPREC Connector

. You can also stop streams started via the <Siprec> TwiML instruction.

Twilio operates as a Session Recording Client (SRC) for SIPREC, while Twilio's partners, such as Gridspace, operate as Session Recording Servers (SRS). Alternatively, you can provision your own SRS using the Twilio SIPREC Connector

.

The SRC sends the SIPREC media to be recorded to the SRS. The SRS is responsible for storing/processing the media.

Twilio forks the audio stream of the current call and sends it in real-time to the configured connector.

There are a maximum of four forked streams allowed per call. By default, <Siprec> uses two forked streams: one for the inbound track and one for the outbound track.

Dual-Tone Multi-Frequency (DTMF) tones aren't sent to the connector.

Any communication issues encountered while streaming media to the partner will be reported in the Twilio Debugger with additional information about the failure.

Property nameTypeRequiredPIIDescriptionChild properties
sid
SID<SR>
Optional
Not PII
The SID of the Siprec resource.

Pattern:
^SR[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
accountSid
SID<AC>
Optional
Not PII
The SID of the Account that created this Siprec resource.

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
The SID of the Call the Siprec resource is associated with.

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
The user-specified name of this Siprec, if one was given when the Siprec was created. This may be used to stop the Siprec.

status
enum<string>
Optional
Not PII
The status - one of stopped, in-progress

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

Configuring a SIPREC Connector





Connectors are configured in Marketplace to ensure that the credentials needed to send the stream to a partner are stored securely. You can install and manage connectors in the Stream Connectors Console page in Marketplace

 or via the Marketplace API using the InstalledAddOns Resource.


(information)
Info
If you'd like to use a specific partner and don't find them in the available Stream Connectors

 list, contact Twilio Support directly with details about your desired partner through the Console

 or Help Center

 to submit a ticket.
Twilio's SIPREC Connector





Configure your SIPREC Connector using the parameters below.

Parameter Name	Description
Installed Add-On SID	The unique identifier for your connector. It's automatically configured when you install a connector.
Unique Name	The unique name to use for your SIPREC Connector. This is the name you will use when initiating the <Siprec> TwiML instruction or using the API.
Use In	Specifies that the connector is available to your Voice Applications.
Session Recording Server	The SIP URI of the server you want to stream the media to. This should be a standard SIP URI. For example, sip:name@example.com:5060.
Credentials Header Name	The SIP header name that your recording service uses to pass the Authorization credentials. For example, X-Auth-Token.
Credentials	The credential token or value for Authorization to be sent to your recording service. This value will be hidden when entered in the text box.
Using Twilio's SIPREC Connector provides some additional SIP features. The SIP URI within the Session Recording Server parameter supports additional parameters: secure which enables Secure Real-time Transport Protocol (SRTP), as well as, edge which allows you to control which Twilio edge your SIPREC connections egress by.

For example, to enable SRTP and set the edge location to the ashburn edge, you would provide populate SIP URI below as the Session Recording Server address:

sip:your-domain.com;secure=true&edge=ashburn

Create a Siprec





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json

Parameter	Type	Description
AccountSid Path	SID<AC>	The SID of the Account that created this Siprec subresource. Not PII
CallSid Path	SID<CA>	The SID of the Call the Siprec subresource is associated with. Not PII
Name Optional	string	The user-specified name of this Siprec subresource, if one was given when the Siprec was created. This may be used to stop the Siprec. Not PII
ConnectorName Optional	string	Unique name used when configuring the connector via Marketplace Add-on. Not PII
Track Optional	string	One of inbound_track, outbound_track, both_tracks. Not PII
StatusCallback Optional	uri	Absolute URL of the status callback. Not PII
StatusCallbackMethod Optional	http_method	The http method for the StatusCallback (one of GET, POST). Not PII
Parameter1.Name Optional	string	Parameter name Not PII
Parameter1.Value Optional	string	Parameter value Not PII
Using the SIPREC status callback





SIPREC is a protocol that enables recording and sending streams to one of the available partners via the SIPREC connector configuration. With the addition of a status callback, you can now get detailed information about the status of a SIPREC session. This feature can be used to quickly detect and troubleshoot any unexpected issues with a SIPREC session, such as an unexpected failure or interruption.

There are two ways to use SIPREC status callback:

From <Siprec> TwiML, for example:



Copy code block
<Start>
<Siprec name="my-first-siprec" connectorName="Gridspace1" statusCallback="https://87b252436d40.ngrok.app" statusCallbackMethod="GET"/>
</Start>
From Start/Stop SIPREC API, for example:



Copy code block
curl -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN -XPOST https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Siprec.json --data-urlencode \
"Name=my-first-siprec" --data-urlencode "ConnectorName=Gridspace1" --data-urlencode "StatusCallback=https://XXXXXXXX.ngrok.app" --data-urlencode "StatusCallbackMethod=GET"
The request to the status callback contains the standard TwiML request parameters and the following parameters:

Parameter	Description
AccountSid	The SID of the Account that created this Siprec subresource. Not PII
CallSid	The SID of the Call the Siprec subresource is associated with. Not PII
SiprecSid	The SID of the Siprec subresource is associated with. Not PII
SiprecName	The Name of the Siprec subresource is associated with. Not PII
SiprecEvent	The Event of the Siprec callback. Values can be: siprec-started, siprec-stopped, siprec-error Not PII
Timestamp	The timestamp of when the Siprec callback was made. Not PII
If an error has occurred, additional parameters SiprecError, SiprecErrorCode will be set as well. These params will provide context on the error that has occurred with the Siprec subresource.

Update a Siprec





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created this Siprec resource.

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
The SID of the Call the Siprec resource is associated with.

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
The SID of the Siprec resource, or the name used when creating the resource

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
Update a Siprec





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateSiprec() {
  const siprec = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .siprec("Sid")
    .update({ status: "stopped" });

  console.log(siprec.sid);
}

updateSiprec();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "Sid",
  "name": null,
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec/SRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}