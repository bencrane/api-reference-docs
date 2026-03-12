# API Reference - Conferences Participants subresource - Participants

onferences Participants subresource




Participants is a subresource of Conferences and represents a participant who is either connecting to, or actively connected to, a Conference that is not in completed status. This means that the Participants endpoint will not return results for participants whose call has ended, whose associated conference has ended, or whose call has been modified to use new TwiML; i.e. this resource does not return historical participant logs. For post-call participant details, use the Participants resource of the Voice Insights API.

The Participants subresource allows you to:

Manipulate a conference's current participants by muting or removing them from the conference.
List of all the participants in an active conference.
Get information about a particular participant in an active conference.
Add participants to a conference.

(information)
Info
Tracking updates to all conference participants over the course of a conference can be done by using the Conference's statusCallback webhook.
Participant Properties





Property nameTypeRequiredPIIDescriptionChild properties
accountSid
SID<AC>
Optional
Not PII
The SID of the Account that created the Participant resource.

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
The SID of the Call the Participant resource is associated with.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
label
string
Optional
Not PII
The user-specified label of this participant, if one was given when the participant was created. This may be used to fetch, update or delete the participant.

callSidToCoach
SID<CA>
Optional
Not PII
The SID of the participant who is being coached. The participant being coached is the only participant who can hear the participant who is coaching.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
coaching
boolean
Optional
Not PII
Whether the participant is coaching another call. Can be: true or false. If not present, defaults to false unless call_sid_to_coach is defined. If true, call_sid_to_coach must be defined.

conferenceSid
SID<CF>
Optional
Not PII
The SID of the conference the participant is in.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
dateCreated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that the resource was created specified in RFC 2822

 format.

dateUpdated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that the resource was last updated specified in RFC 2822

format.

endConferenceOnExit
boolean
Optional
Not PII
Whether the conference ends when the participant leaves. Can be: true or false and the default is false. If true, the conference ends and all other participants drop out when the participant leaves.

muted
boolean
Optional
Not PII
Whether the participant is muted. Can be true or false.

hold
boolean
Optional
Not PII
Whether the participant is on hold. Can be true or false.

startConferenceOnEnter
boolean
Optional
Not PII
Whether the conference starts when the participant joins the conference, if it has not already started. Can be: true or false and the default is true. If false and the conference has not started, the participant is muted and hears background music until another participant starts the conference.

status
enum<string>
Optional
Not PII
The status of the participant's call in a session. Can be: queued, connecting, ringing, connected, complete, or failed.

Possible values:
queued
connecting
ringing
connected
complete
failed
queueTime
string
Optional
Not PII
The wait time in milliseconds before participant's call is placed. Only available in the response to a create participant request.

uri
string
Optional
Not PII
The URI of the resource, relative to https://api.twilio.com.

Create a Participant





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json

Creates a Participant subresource with either a ConferenceSid or FriendlyName initiates an outbound call and adds a new participant to the active Conference with that ConferenceSid or FriendlyName.

If an active conference does not exist with your FriendlyName, we create a new conference with that name and add the participant.

If a conference specified by ConferenceSid is not active, the request fails.


(information)
Calls Per Second (CPS)
By default, each account is granted one CPS for calls created via POST requests to the /Participants endpoint. Inbound calls and <Dial> calls are not limited by CPS. Accounts with an approved Business Profile

 can update their CPS up to 30 in the Twilio Console. In aggregate, calls are executed at the rate defined by the CPS. Individual calls may not execute at the anticipated rate — you may see individual seconds with more or fewer CPS, especially for inconsistent traffic — but over a month, the call execution rate will average the CPS rate set for that account.

(error)
Danger
Do not use personally identifiable information (PII) such as phone numbers, email addresses, a person's name, or any other sensitive information when assigning a FriendlyName to your conferences.
Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that will create the resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
conferenceSid
string
required
Not PII
The SID of the participant's conference.

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
from
string<endpoint>
required
Not PII
The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in E.164 format (e.g., +16175551212). Client identifiers are formatted client:name. If using a phone number, it must be a Twilio number or a Verified outgoing caller id for your account. If the to parameter is a phone number, from must also be a phone number. If to is sip address, this value of from should be a username portion to be used to populate the P-Asserted-Identity header that is passed to the SIP endpoint.

to
string<endpoint>
required
Not PII
The phone number, SIP address, Client, TwiML App identifier that received this call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as sip:name@company.com. Client identifiers are formatted client:name. TwiML App identifiers are formatted app:<APP_SID>. Custom parameters may also be specified.

statusCallback
string<uri>
Optional
Not PII
The URL we should call using the status_callback_method to send status information to your application.

statusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call status_callback. Can be: GET and POST and defaults to POST.

Possible values:
GET
POST
statusCallbackEvent
array[string]
Optional
Not PII
The conference state changes that should generate a call to status_callback. Can be: initiated, ringing, answered, and completed. Separate multiple values with a space. The default value is completed.

label
string
Optional
Not PII
A label for this participant. If one is supplied, it may subsequently be used to fetch, update or delete the participant.

timeout
integer
Optional
Not PII
The number of seconds that we should allow the phone to ring before assuming there is no answer. Can be an integer between 5 and 600, inclusive. The default value is 60. We always add a 5-second timeout buffer to outgoing calls, so value of 10 would result in an actual timeout that was closer to 15 seconds.

record
boolean
Optional
Not PII
Whether to record the participant and their conferences, including the time between conferences. Can be true or false and the default is false.

muted
boolean
Optional
Not PII
Whether the agent is muted in the conference. Can be true or false and the default is false.

beep
string
Optional
Not PII
Whether to play a notification beep to the conference when the participant joins. Can be: true, false, onEnter, or onExit. The default value is true.

startConferenceOnEnter
boolean
Optional
Not PII
Whether to start the conference when the participant joins, if it has not already started. Can be: true or false and the default is true. If false and the conference has not started, the participant is muted and hears background music until another participant starts the conference.

endConferenceOnExit
boolean
Optional
Not PII
Whether to end the conference when the participant leaves. Can be: true or false and defaults to false.

waitUrl
string<uri>
Optional
Not PII
The URL that Twilio calls using the wait_method before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting wait_url to ''. For more details on the allowable verbs within the waitUrl, see the waitUrl attribute in the <Conference> TwiML instruction.

waitMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call wait_url. Can be GET or POST and the default is POST. When using a static audio file, this should be GET so that we can cache the file.

Possible values:
GET
POST
earlyMedia
boolean
Optional
Not PII
Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. Can be: true or false and defaults to true.

maxParticipants
integer
Optional
Not PII
The maximum number of participants in the conference. Can be a positive integer from 2 to 250. The default value is 250.

conferenceRecord
string
Optional
Not PII
Whether to record the conference the participant is joining. Can be: true, false, record-from-start, and do-not-record. The default value is false.

conferenceTrim
string
Optional
Not PII
Whether to trim leading and trailing silence from the conference recording. Can be: trim-silence or do-not-trim and defaults to trim-silence.

conferenceStatusCallback
string<uri>
Optional
Not PII
The URL we should call using the conference_status_callback_method when the conference events in conference_status_callback_event occur. Only the value set by the first participant to join the conference is used. Subsequent conference_status_callback values are ignored.

conferenceStatusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call conference_status_callback. Can be: GET or POST and defaults to POST.

Possible values:
GET
POST
conferenceStatusCallbackEvent
array[string]
Optional
Not PII
The conference state changes that should generate a call to conference_status_callback. Can be: start, end, join, leave, mute, hold, modify, speaker, and announcement. Separate multiple values with a space. Defaults to start end.

recordingChannels
string
Optional
Not PII
The recording channels for the final recording. Can be: mono or dual and the default is mono.

recordingStatusCallback
string<uri>
Optional
Not PII
The URL that we should call using the recording_status_callback_method when the recording status changes.

recordingStatusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use when we call recording_status_callback. Can be: GET or POST and defaults to POST.

Possible values:
GET
POST
sipAuthUsername
string
Optional
Not PII
The SIP username used for authentication.

sipAuthPassword
string
Optional
Not PII
The SIP password for authentication.

region
string
Optional
Not PII
The region

 where we should mix the recorded audio. Can be:us1, us2, ie1, de1, sg1, br1, au1, or jp1.

conferenceRecordingStatusCallback
string<uri>
Optional
Not PII
The URL we should call using the conference_recording_status_callback_method when the conference recording is available.

conferenceRecordingStatusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call conference_recording_status_callback. Can be: GET or POST and defaults to POST.

Possible values:
GET
POST
recordingStatusCallbackEvent
array[string]
Optional
Not PII
The recording state changes that should generate a call to recording_status_callback. Can be: started, in-progress, paused, resumed, stopped, completed, failed, and absent. Separate multiple values with a space, ex: 'in-progress completed failed'.

conferenceRecordingStatusCallbackEvent
array[string]
Optional
Not PII
The conference recording state changes that generate a call to conference_recording_status_callback. Can be: in-progress, completed, failed, and absent. Separate multiple values with a space, ex: 'in-progress completed failed'

coaching
boolean
Optional
Not PII
Whether the participant is coaching another call. Can be: true or false. If not present, defaults to false unless call_sid_to_coach is defined. If true, call_sid_to_coach must be defined.

callSidToCoach
SID<CA>
Optional
Not PII
The SID of the participant who is being coached. The participant being coached is the only participant who can hear the participant who is coaching.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
jitterBufferSize
string
Optional
Not PII
Jitter buffer size for the connecting participant. Twilio will use this setting to apply Jitter Buffer before participant's audio is mixed into the conference. Can be: off, small, medium, and large. Default to large.

byoc
SID<BY>
Optional
Not PII
The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that byoc is only meaningful when to is a phone number; it will otherwise be ignored. (Beta)

Pattern:
^BY[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callerId
string
Optional
Not PII
The phone number, Client identifier, or username portion of SIP address that made this call. Phone numbers are in E.164 format (e.g., +16175551212). Client identifiers are formatted client:name. If using a phone number, it must be a Twilio number or a Verified outgoing caller id for your account. If the to parameter is a phone number, callerId must also be a phone number. If to is sip address, this value of callerId should be a username portion to be used to populate the From header that is passed to the SIP endpoint.

callReason
string
Optional
Not PII
The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta)

recordingTrack
string
Optional
Not PII
The audio track to record for the call. Can be: inbound, outbound or both. The default is both. inbound records the audio that is received by Twilio. outbound records the audio that is sent from Twilio. both records the audio that is received and sent by Twilio.

timeLimit
integer
Optional
Not PII
The maximum duration of the call in seconds. Constraints depend on account and configuration.

machineDetection
string
Optional
Not PII
Whether to detect if a human, answering machine, or fax has picked up the call. Can be: Enable or DetectMessageEnd. Use Enable if you would like us to return AnsweredBy as soon as the called party is identified. Use DetectMessageEnd, if you would like to leave a message on an answering machine. For more information, see Answering Machine Detection.

machineDetectionTimeout
integer
Optional
Not PII
The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with AnsweredBy of unknown. The default timeout is 30 seconds.

machineDetectionSpeechThreshold
integer
Optional
Not PII
The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400.

machineDetectionSpeechEndThreshold
integer
Optional
Not PII
The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200.

machineDetectionSilenceTimeout
integer
Optional
Not PII
The number of milliseconds of initial silence after which an unknown AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000.

amdStatusCallback
string<uri>
Optional
Not PII
The URL that we should call using the amd_status_callback_method to notify customer application whether the call was answered by human, machine or fax.

amdStatusCallbackMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use when calling the amd_status_callback URL. Can be: GET or POST and the default is POST.

Possible values:
GET
POST
trim
string
Optional
Not PII
Whether to trim any leading and trailing silence from the participant recording. Can be: trim-silence or do-not-trim and the default is trim-silence.

callToken
string
Optional
Not PII
A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call.

clientNotificationUrl
string<uri>
Optional
Not PII
The URL that we should use to deliver push call notification.

callerDisplayName
string
Optional
Not PII
The name that populates the display name in the From header. Must be between 2 and 255 characters. Only applicable for calls to sip address.

Create a Participant for an active Conference





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createParticipant() {
  const participant = await client
    .conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create({
      beep: "onEnter",
      earlyMedia: true,
      from: "+15017122661",
      label: "customer",
      record: true,
      statusCallback: "https://myapp.com/events",
      statusCallbackEvent: ["ringing"],
      to: "+15558675310",
    });

  console.log(participant.accountSid);
}

createParticipant();
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "label": "customer",
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "queued",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": "1000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Custom Parameters






(warning)
Warning
Only applies to Twilio Voice Client IDs, SIP endpoints, or TwiML applications.
Custom parameters can be passed to the specified Client ID, SIP endpoint, or TwiML application in the to field using query string notation. For example: client:alice?mycustomparam1=foo&mycustomparam2=bar.

Retrieve a Participant





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json

Returns a Participant from an active Conference, specified by the Conference SID and the Participant's Call SID

 or label.


(warning)
Warning
The Participant subresource only manages active participants of in-progress Conferences.

If you want to get a list of all Participants over the course of a Conference, use the Conference's statusCallback to receive webhooks for each participant joining the conference and store the details in your application.
Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Participant resource to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
conferenceSid
SID<CF>
required
Not PII
The SID of the conference with the participant to fetch.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
string
required
Not PII
The Call SID or label of the participant to fetch. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.

Retrieve a Participant





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .fetch();

  console.log(participant.accountSid);
}

fetchParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": true,
  "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Retrieve a Participant by label





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .fetch();

  console.log(participant.label);
}

fetchParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "customer",
  "label": "customer",
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": true,
  "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Retrieve a list of Participants





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json

Returns the list of active Participants in the Conference identified by ConferenceSid.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Participant resources to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
conferenceSid
SID<CF>
required
Not PII
The SID of the conference with the participants to read.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Query parameters





Property nameTypeRequiredPIIDescription
muted
boolean
Optional
Not PII
Whether to return only participants that are muted. Can be: true or false.

hold
boolean
Optional
Not PII
Whether to return only participants that are on hold. Can be: true or false.

coaching
boolean
Optional
Not PII
Whether to return only participants who are coaching another call. Can be: true or false.

pageSize
integer<int64>
Optional
Not PII
How many resources to return in each list page. The default is 50, and the maximum is 1000.

Minimum:
1
Maximum:
1000
page
integer
Optional
Not PII
The page index. This value is simply for client state.

Minimum:
0
pageToken
string
Optional
Not PII
The page token. This is provided by the API.

Retrieve a list of Participants





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listParticipant() {
  const participants = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants.list({
      muted: true,
      limit: 20,
    });

  participants.forEach((p) => console.log(p.accountSid));
}

listParticipant();
Response



Copy response
{
  "participants": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Sat, 19 Feb 2011 21:07:19 +0000",
      "date_updated": "Sat, 19 Feb 2011 21:07:19 +0000",
      "end_conference_on_exit": false,
      "muted": true,
      "hold": false,
      "status": "connected",
      "start_conference_on_enter": true,
      "coaching": true,
      "call_sid_to_coach": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "queue_time": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Sat, 19 Feb 2011 21:07:19 +0000",
      "date_updated": "Sat, 19 Feb 2011 21:07:19 +0000",
      "end_conference_on_exit": false,
      "muted": true,
      "hold": false,
      "status": "connected",
      "start_conference_on_enter": true,
      "coaching": false,
      "call_sid_to_coach": null,
      "queue_time": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=1&PageToken=PACPbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json?Muted=true&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "start": 0,
  "end": 1
}
Update a Participant





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json

Updates the status of a Participant in an active Conference.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Participant resources to update.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
conferenceSid
SID<CF>
required
Not PII
The SID of the conference with the participant to update.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
string
required
Not PII
The Call SID or label of the participant to update. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.

Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
muted
boolean
Optional
Not PII
Whether the participant should be muted. Can be true or false. true will mute the participant, and false will un-mute them. Anything value other than true or false is interpreted as false.

hold
boolean
Optional
Not PII
Whether the participant should be on hold. Can be: true or false. true puts the participant on hold, and false lets them rejoin the conference.

holdUrl
string<uri>
Optional
Not PII
The URL we call using the hold_method for music that plays when the participant is on hold. The URL may return an MP3 file, a WAV file, or a TwiML document that contains <Play>, <Say>, <Pause>, or <Redirect> verbs.

holdMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call hold_url. Can be: GET or POST and the default is GET.

Possible values:
GET
POST
announceUrl
string<uri>
Optional
Not PII
The URL we call using the announce_method for an announcement to the participant. The URL may return an MP3 file, a WAV file, or a TwiML document that contains <Play>, <Say>, <Pause>, or <Redirect> verbs.

announceMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call announce_url. Can be: GET or POST and defaults to POST.

Possible values:
GET
POST
waitUrl
string<uri>
Optional
Not PII
The URL that Twilio calls using the wait_method before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document. The default value is the URL of our standard hold music. If you do not want anything to play while waiting for the conference to start, specify an empty string by setting wait_url to ''. For more details on the allowable verbs within the waitUrl, see the waitUrl attribute in the <Conference> TwiML instruction.

waitMethod
enum<http-method>
Optional
Not PII
The HTTP method we should use to call wait_url. Can be GET or POST and the default is POST. When using a static audio file, this should be GET so that we can cache the file.

Possible values:
GET
POST
beepOnExit
boolean
Optional
Not PII
Whether to play a notification beep to the conference when the participant exits. Can be: true or false.

endConferenceOnExit
boolean
Optional
Not PII
Whether to end the conference when the participant leaves. Can be: true or false and defaults to false.

coaching
boolean
Optional
Not PII
Whether the participant is coaching another call. Can be: true or false. If not present, defaults to false unless call_sid_to_coach is defined. If true, call_sid_to_coach must be defined.

callSidToCoach
SID<CA>
Optional
Not PII
The SID of the participant who is being coached. The participant being coached is the only participant who can hear the participant who is coaching.

Pattern:
^CA[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Update a Participant: Mute a participant





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({ muted: true });

  console.log(participant.accountSid);
}

updateParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": true,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Update a Participant: Mute a participant by label





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .update({ muted: true });

  console.log(participant.label);
}

updateParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "customer",
  "label": "customer",
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": true,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Place a participant on hold with music





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({
      hold: true,
      holdUrl: "http://www.myapp.com/hold_music",
    });

  console.log(participant.accountSid);
}

updateParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": true,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Update a Participant: Make an announcement to the participant





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateParticipant() {
  const participant = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .update({ announceUrl: "http://www.myapp.com/announce" });

  console.log(participant.accountSid);
}

updateParticipant();
Response



Copy response
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CallSid",
  "label": null,
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "Fri, 18 Feb 2011 21:07:19 +0000",
  "date_updated": "Fri, 18 Feb 2011 21:07:19 +0000",
  "end_conference_on_exit": false,
  "muted": false,
  "hold": false,
  "status": "connected",
  "start_conference_on_enter": true,
  "coaching": false,
  "call_sid_to_coach": null,
  "queue_time": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Delete a Participant





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json

Deletes the Participant subresource to remove the participant from the conference. Returns HTTP 204 (No Content) with no body if the participant was successfully removed from the conference.

Path parameters





Property nameTypeRequiredPIIDescription
accountSid
SID<AC>
required
Not PII
The SID of the Account that created the Participant resources to delete.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
conferenceSid
SID<CF>
required
Not PII
The SID of the conference with the participants to delete.

Pattern:
^CF[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
callSid
string
required
Not PII
The Call SID or label of the participant to delete. Non URL safe characters in a label must be percent encoded, for example, a space character is represented as %20.

Delete a Participant





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteParticipant() {
  await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("CallSid")
    .remove();
}

deleteParticipant();
Delete a Participant by label





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteParticipant() {
  await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("customer")
    .remove();
}

deleteParticipant();
Tips and best practices





Long audio files for conference announcements delay playback. For example, a 25-minute file can take about 13–15 seconds to begin after you send the API request.
Conference announcements that are 30 minutes or longer can trigger a request timeout and cause the announcement to fail. When this happens, the conference and all calls stay connected, but participants hear "An application error has occurred." The 30-minute limit is approximate. Factors such as file size, HTTP method, and your server's processing or response time can also cause timeouts.
For announcements longer than 30 minutes, divide the audio into shorter segments and play them sequentially.
What's next?





Explore Voice Insights with its Conference Insights Event Stream and Conference Insights REST API which allow you to see conference parameters, investigate participant event timelines, and understand detected quality issues.