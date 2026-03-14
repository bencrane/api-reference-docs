# Call Resource

A Call resource represents a connection between a telephone and Twilio.

Using this resource, you can initiate a call, fetch information about a completed call, fetch a list of calls made to and from your account, redirect or end a call that is in progress, and delete records of past calls from your account.

An inbound call occurs when a person calls one of your Twilio phone numbers, client connections, or SIP-enabled endpoints. An outbound call happens when you initiate a call from a Twilio phone number to an outside phone number, client, or SIP domain.

You can initiate an outbound call by sending an HTTP POST request to the Calls resource. Calls are rate limited at the account level by Calls Per Second (CPS). Calls beyond your account's CPS limit will be queued and will execute at the CPS rate.

The queue_time parameter provides an estimate for how long before the call is executed. You can reduce queue_time by increasing the CPS value on your account.

> **Calls Per Second (CPS)**
> By default, each account is granted one CPS for calls created via POST requests to the /Calls endpoint. Inbound calls and `<Dial>` calls are not limited by CPS.
>
> Accounts with an approved Business Profile can update their CPS up to 5 in the Twilio Console.
>
> In aggregate, calls are executed at the rate defined by the CPS. Individual calls may not execute at the anticipated rate — you may see individual seconds with more or fewer CPS, especially for inconsistent traffic — but over a month, the call execution rate will average the CPS rate set for that account or trunk.

You can also initiate a call from an active call (e.g., forwarding to another number or dialing into a conference) by including TwiML's `<Dial>` verb in your TwiML application. However, the only way to initiate a call directly from Twilio is with an API request.

> **Info**
> Are you looking for step-by-step instructions for making your first call with Twilio using the SDKs? Check out our server-side quickstart for Programmable Voice.

---

## Call Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<CA> | Optional | Not PII | The unique string that we created to identify this Call resource. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time-rfc-2822> | Optional | Not PII | The date and time in UTC that this resource was created specified in RFC 2822 format. |
| date_updated | string<date-time-rfc-2822> | Optional | Not PII | The date and time in UTC that this resource was last updated, specified in RFC 2822 format. |
| parent_call_sid | SID<CA> | Optional | Not PII | The SID that identifies the call that created this leg. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created this Call resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| to | string | Optional | PII MTL: 120 days | The phone number, SIP address, Client identifier or SIM SID that received this call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as name@company.com. Client identifiers are formatted client:name. SIM SIDs are formatted as sim:sid. |
| to_formatted | string | Optional | PII MTL: 120 days | The phone number, SIP address or Client identifier that received this call. Formatted for display. Non-North American phone numbers are in E.164 format (e.g., +442071838750). |
| from | string | Optional | PII MTL: 120 days | The phone number, SIP address, Client identifier or SIM SID that made this call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as name@company.com. Client identifiers are formatted client:name. SIM SIDs are formatted as sim:sid. |
| from_formatted | string | Optional | PII MTL: 120 days | The calling phone number, SIP address, or Client identifier formatted for display. Non-North American phone numbers are in E.164 format (e.g., +442071838750). |
| phone_number_sid | SID<PN> | Optional | Not PII | If the call was inbound, this is the SID of the IncomingPhoneNumber resource that received the call. If the call was outbound, it is the SID of the OutgoingCallerId resource from which the call was placed. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | The status of this call. Can be: queued, ringing, in-progress, canceled, completed, failed, busy or no-answer. See Call Status Values below for more information. Possible values: queued, ringing, in-progress, completed, busy, failed, no-answer, canceled |
| start_time | string<date-time-rfc-2822> | Optional | Not PII | The start time of the call, given as UTC in RFC 2822 format. Empty if the call has not yet been dialed. |
| end_time | string<date-time-rfc-2822> | Optional | Not PII | The time the call ended, given as UTC in RFC 2822 format. Empty if the call did not complete successfully. |
| duration | string | Optional | Not PII | The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls. |
| price | string | Optional | Not PII | The charge for this call, in the currency associated with the account. Populated after the call is completed. May not be immediately available. The price associated with a call only reflects the charge for connectivity. Charges for other call-related features such as Answering Machine Detection, Text-To-Speech, and SIP REFER are not included in this value. |
| price_unit | string<currency> | Optional | Not PII | The currency in which Price is measured, in ISO 4127 format (e.g., USD, EUR, JPY). Always capitalized for calls. |
| direction | string | Optional | Not PII | A string describing the direction of the call. Can be: inbound for inbound calls, outbound-api for calls initiated via the REST API or outbound-dial for calls initiated by a `<Dial>` verb. Using Elastic SIP Trunking, the values can be trunking-terminating for outgoing calls from your communications infrastructure to the PSTN or trunking-originating for incoming calls to your communications infrastructure from the PSTN. |
| answered_by | string | Optional | Not PII | Either human or machine if this call was initiated with answering machine detection. Empty otherwise. |
| api_version | string | Optional | Not PII | The API version used to create the call. |
| forwarded_from | string | Optional | PII MTL: 120 days | The forwarding phone number if this call was an incoming call forwarded from another number (depends on carrier supporting forwarding). Otherwise, empty. |
| group_sid | SID<GP> | Optional | Not PII | The Group SID associated with this call. If no Group is associated with the call, the field is empty. Pattern: `^GP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| caller_name | string | Optional | PII MTL: 120 days | The caller's name if this call was an incoming call to a phone number with caller ID Lookup enabled. Otherwise, empty. |
| queue_time | string | Optional | Not PII | The wait time in milliseconds before the call is placed. |
| trunk_sid | SID<TK> | Optional | Not PII | The unique identifier of the trunk resource that was used for this call. The field is empty if the call was not made using a SIP trunk or if the call is not terminated. Pattern: `^TK[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| uri | string | Optional | Not PII | The URI of this resource, relative to https://api.twilio.com. |
| subresource_uris | object<uri-map> | Optional | Not PII | A list of subresources available to this call, identified by their URIs relative to https://api.twilio.com. |

---

## Call Status Values

The following are the possible values for the Status parameter:

| Status | Description |
|--------|-------------|
| queued | The call is ready and waiting in line before dialing. |
| ringing | The call is currently ringing. |
| in-progress | The call was answered and is currently in progress. |
| canceled | The call was hung up while it was queued or ringing. |
| completed | The call was answered and has ended normally. |
| busy | The caller received a busy signal. |
| no-answer | There was no answer or the call was rejected. |
| failed | The call could not be completed as dialed, most likely because the provided number was invalid. |

> **Notice about completed calls**
> A completed call indicates that a connection was established, and audio data was transferred. This can occur when a call is answered by a person, an IVR phone tree menu, or even a voicemail. Completed calls, regardless of the outcome, are charged against your project balance.

---

## Create a Call

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls.json
```

Calls can be made via the REST API to phone numbers, SIP addresses, or client identifiers. To place a new outbound call, make an POST request to the Calls resource.

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that will create the resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request Body Parameters

**Encoding type:** application/x-www-form-urlencoded

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| to | string<endpoint> | required | PII MTL: 120 days | The phone number, SIP address, or client identifier to call. |
| from | string<endpoint> | required | PII MTL: 120 days | The phone number or client identifier to use as the caller id. If using a phone number, it must be a Twilio number or a Verified outgoing caller id for your account. If the to parameter is a phone number, From must also be a phone number. |
| method | enum<http-method> | Optional | Not PII | The HTTP method we should use when calling the url parameter's value. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| fallback_url | string<uri> | Optional | Not PII | The URL that we call using the fallback_method if an error occurs when requesting or executing the TwiML at url. If an application_sid parameter is present, this parameter is ignored. |
| fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to request the fallback_url. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| status_callback | string<uri> | Optional | Not PII | The URL we should call using the status_callback_method to send status information to your application. If no status_callback_event is specified, we will send the completed status. If an application_sid parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted). |
| status_callback_event | array[string] | Optional | Not PII | The call progress events that we will send to the status_callback URL. Can be: initiated, ringing, answered, and completed. If no event is specified, we send the completed status. If you want to receive multiple events, specify each one in a separate status_callback_event parameter. See the code sample for monitoring call progress. If an application_sid is present, this parameter is ignored. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use when calling the status_callback URL. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| send_digits | string | Optional | Not PII | The string of keys to dial after connecting to the number, with a maximum length of 32 digits. Valid digits in the string include any digit (0-9), 'A', 'B', 'C', 'D', '#', and '*'. You can also use 'w' to insert a half-second pause and 'W' to insert a one-second pause. For example, to pause for one second after connecting and then dial extension 1234 followed by the # key, set this parameter to W1234#. Be sure to URL-encode this string because the '#' character has special meaning in a URL. If both SendDigits and MachineDetection parameters are provided, then MachineDetection will be ignored. |
| timeout | integer | Optional | Not PII | The integer number of seconds that we should allow the phone to ring before assuming there is no answer. The default is 60 seconds and the maximum is 600 seconds. For some call flows, we will add a 5-second buffer to the timeout value you provide. For this reason, a timeout value of 10 seconds could result in an actual timeout closer to 15 seconds. You can set this to a short time, such as 15 seconds, to hang up before reaching an answering machine or voicemail. |
| record | boolean | Optional | Not PII | Whether to record the call. Can be true to record the phone call, or false to not. The default is false. The recording_url is sent to the status_callback URL. |
| recording_channels | string | Optional | Not PII | The number of channels in the final recording. Can be: mono or dual. The default is mono. mono records both legs of the call in a single channel of the recording file. dual records each leg to a separate channel of the recording file. The first channel of a dual-channel recording contains the parent call and the second channel contains the child call. |
| recording_status_callback | string | Optional | Not PII | The URL that we call when the recording is available to be accessed. |
| recording_status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use when calling the recording_status_callback URL. Can be: GET or POST and the default is POST. Possible values: GET, POST |
| sip_auth_username | string | Optional | Not PII | The username used to authenticate the caller making a SIP call. |
| sip_auth_password | string | Optional | Not PII | The password required to authenticate the user account specified in sip_auth_username. |
| machine_detection | string | Optional | Not PII | Whether to detect if a human, answering machine, or fax has picked up the call. Can be: Enable or DetectMessageEnd. Use Enable if you would like us to return AnsweredBy as soon as the called party is identified. Use DetectMessageEnd, if you would like to leave a message on an answering machine. If send_digits is provided, this parameter is ignored. For more information, see Answering Machine Detection. |
| machine_detection_timeout | integer | Optional | Not PII | The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with AnsweredBy of unknown. The default timeout is 30 seconds. |
| recording_status_callback_event | array[string] | Optional | Not PII | The recording status events that will trigger calls to the URL specified in recording_status_callback. Can be: in-progress, completed and absent. Defaults to completed. Separate multiple values with a space. |
| trim | string | Optional | Not PII | Whether to trim any leading and trailing silence from the recording. Can be: trim-silence or do-not-trim and the default is trim-silence. |
| caller_id | string | Optional | Not PII | The phone number, SIP address, or Client identifier that made this call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as name@company.com. |
| machine_detection_speech_threshold | integer | Optional | Not PII | The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine. Possible Values: 1000-6000. Default: 2400. |
| machine_detection_speech_end_threshold | integer | Optional | Not PII | The number of milliseconds of silence after speech activity at which point the speech activity is considered complete. Possible Values: 500-5000. Default: 1200. |
| machine_detection_silence_timeout | integer | Optional | Not PII | The number of milliseconds of initial silence after which an unknown AnsweredBy result will be returned. Possible Values: 2000-10000. Default: 5000. |
| async_amd | string | Optional | Not PII | Select whether to perform answering machine detection in the background. Default, blocks the execution of the call until Answering Machine Detection is completed. Can be: true or false. |
| async_amd_status_callback | string<uri> | Optional | Not PII | The URL that we should call using the async_amd_status_callback_method to notify customer application whether the call was answered by human, machine or fax. |
| async_amd_status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use when calling the async_amd_status_callback URL. Can be: GET or POST and the default is POST. Possible values: GET, POST |
| byoc | SID<BY> | Optional | Not PII | The SID of a BYOC (Bring Your Own Carrier) trunk to route this call with. Note that byoc is only meaningful when to is a phone number; it will otherwise be ignored. (Beta) Pattern: `^BY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| call_reason | string | Optional | Not PII | The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Beta) |
| call_token | string | Optional | Not PII | A token string needed to invoke a forwarded call. A call_token is generated when an incoming call is received on a Twilio number. Pass an incoming call's call_token value to a forwarded call via the call_token parameter when creating a new call. A forwarded call should bear the same CallerID of the original incoming call. |
| recording_track | string | Optional | Not PII | The audio track to record for the call. Can be: inbound, outbound or both. The default is both. inbound records the audio that is received by Twilio. outbound records the audio that is generated from Twilio. both records the audio that is received and generated by Twilio. |
| time_limit | integer | Optional | Not PII | The maximum duration of the call in seconds. Constraints depend on account and configuration. |
| client_notification_url | string<uri> | Optional | Not PII | The URL that we should use to deliver push call notification. |
| url | string<uri> | required if Twiml or ApplicationSid is not passed | Not PII | The absolute URL that returns the TwiML instructions for the call. We will call this URL using the method when the call connects. For more information, see the Url Parameter section in Making Calls. |
| twiml | string<twiml> | required if Url or ApplicationSid is not passed | Not PII | TwiML instructions for the call Twilio will use without fetching Twiml from url parameter. If both twiml and url are provided then twiml parameter will be ignored. Max 4000 characters. |
| application_sid | SID<AP> | required if Url or Twiml is not passed | Not PII | The SID of the Application resource that will handle the call, if the call will be handled by an application. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |


# Call Resource - Part 2

> **Warning**
> The use of the record attribute is subject to the same obligations and requirements as the Recordings resource and the `<Record>` TwiML verb. For workflows subject to PCI or the Health Insurance Portability and the Accountability Act (HIPAA), see the applicable documentation.

---

## Create a Call with TwiML

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    twiml="<Response><Say>Ahoy there!</Say></Response>",
    to="+15558675310",
    from_="+15552223214",
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15552223214",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+15558675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Create a Call with a URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    url="http://demo.twilio.com/docs/voice.xml",
    to="+15558675310",
    from_="+15017122661",
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15017122661",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+15558675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Create a Call and specify a StatusCallback URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    method="GET",
    status_callback="https://www.myapp.com/events",
    status_callback_method="POST",
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14155551212",
    from_="+18668675310",
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+18668675310",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14155551212",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Create a Call and specify a StatusCallbackEvent

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    method="GET",
    status_callback="https://www.myapp.com/events",
    status_callback_event=["initiated", "answered"],
    status_callback_method="POST",
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14155551212",
    from_="+18668675310",
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+18668675310",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14155551212",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## StatusCallback

After completing an outbound call, Twilio will make an asynchronous HTTP request to the StatusCallback URL you specified in your request (if any).

### Parameters sent to your StatusCallback URL

When Twilio sends its asynchronous request to your StatusCallback URL, it includes all of the following parameters:

| Parameter | Description |
|-----------|-------------|
| CallSid | A unique identifier for this call, generated by Twilio. |
| AccountSid | Your Twilio account ID. It is 34 characters long, and always starts with the letters AC. |
| From | The phone number or client identifier of the party that initiated the call. Phone numbers use E.164 formatting, meaning they start with a + and country code, e.g. +16175551212. Client identifiers begin with the client: URI scheme; for example, on a call from a client named 'charlie' the From parameter will be client:charlie. |
| To | The phone number or client identifier of the called party. Phone numbers use E.164 formatting, meaning they start with a + and country code, e.g. +16175551212. Client identifiers begin with the client: URI scheme; for example, for a call to a client named 'joey', the To parameter will be client:joey. |
| CallStatus | A descriptive status for the call. The value is one of the following: queued, initiated, ringing, in-progress, completed, busy, failed or no-answer. |
| ApiVersion | The version of the Twilio API used to handle this call. For incoming calls, this is determined by the API version set on the dialed number. For outgoing calls, this is the version used in the REST API request of the outgoing call. |
| Direction | A string describing the direction of the call: inbound for inbound calls, outbound-api for calls initiated via the REST API, outbound-dial for calls initiated by a `<Dial>` verb. |
| ForwardedFrom | This parameter may be set when Twilio receives a forwarded call. The carrier who forwards the call determines the contents of the parameter. Not all carriers support passing this information. Some carriers provide this information when making a direct call to a Twilio number. |
| CallerName | This parameter is set when the IncomingPhoneNumber that received the call has set its VoiceCallerIdLookup value to true. Learn about Lookup pricing. |
| ParentCallSid | A unique identifier for the call that created this leg. If this is the first leg of a call, this parameter is not included. |

---

## StatusCallbackEvent

If you specify any call progress events in the StatusCallbackEvent parameter, Twilio will make an asynchronous request to the StatusCallback URL you provided in your POST request.

### Call Progress Events

| Event | Description |
|-------|-------------|
| initiated | Twilio removes your call from the queue and starts dialing. |
| ringing | The call starts ringing. |
| answered | The call is answered. If this event is specified, Twilio will send an in-progress status. |
| completed | The call is completed, regardless of the termination status (which can be busy, cancelled, completed, failed, or no-answer). If no StatusCallbackEvent is specified, completed is fired by default. |

### Additional Parameters for StatusCallback Events

When these events occur, Twilio's StatusCallback request will also include these additional parameters:

| Parameter | Description |
|-----------|-------------|
| CallStatus | A descriptive status for the call. The value is one of queued, initiated, ringing, in-progress, busy, failed, or no-answer. For more details, see the CallStatus values in our TwiML introduction. |
| Duration | The duration in minutes of the just-completed call; calls are billed by the minute. Only present in the completed event. |
| CallDuration | The duration in seconds of the just-completed call. Only present in the completed event. |
| SipResponseCode | The final SIP code for the call. For example, a number that was unreachable will return 404. If the Timeout value was reached before the call connected, this code will be 487. |
| RecordingUrl | The URL of the phone call's recorded audio. This parameter is included only if Record=true is set on the REST API request and does not include recordings initiated in other ways. RecordingUrl is only present in the completed event. The recording file may not yet be accessible when the Status Callback is sent. Note: Use RecordingStatusCallback for reliable notification on when the recording is available for access. |
| RecordingSid | The unique ID of the Recording from this call. RecordingSid is only present with the completed event. |
| RecordingDuration | The duration of the recorded audio (in seconds). RecordingDuration is only present in the completed event. To get a final accurate recording duration after any trimming of silence, use RecordingStatusCallback. |
| Timestamp | The timestamp when the event fired, given as UTC in RFC 2822 format. |
| CallbackSource | A string that describes the source of the webhook. This is provided to help disambiguate why the webhook was made. On Status Callbacks, this value is always call-progress-events. |
| SequenceNumber | The order in which the events were fired, starting from 0. Although events are fired in order, they are made as separate HTTP requests, and there is no guarantee they will arrive in the same order. |

> **Info**
> You can use the StatusCallback and StatusCallbackEvent features to track the call status of Programmable Voice calls only.

> **Info**
> To learn more about the StatusCallbackEvent parameter and what you can expect from Twilio during and after an outbound call, see Make outbound phone calls.

---

## RecordingStatusCallback

If you requested a recording of your outbound call and you specified a RecordingStatusCallback URL, Twilio will make a GET or POST request to that URL when the recording is available.

### Parameters sent to your RecordingStatusCallback URL

Twilio will pass along the following parameters to your RecordingStatusCallback URL:

| Parameter | Description |
|-----------|-------------|
| AccountSid | The unique identifier of the Account responsible for this recording. |
| CallSid | A unique identifier for the call associated with the recording. CallSid will always refer to the parent leg of a two-leg call. |
| RecordingSid | The unique identifier for the recording. |
| RecordingUrl | The URL of the recorded audio. |
| RecordingStatus | The status of the recording. Possible values are: in-progress, completed, absent. |
| RecordingDuration | The length of the recording, in seconds. |
| RecordingChannels | The number of channels in the final recording file as an integer. Possible values are 1, 2. |
| RecordingStartTime | The timestamp of when the recording started. |
| RecordingSource | The initiation method used to create this recording. For recordings initiated when Record=true is set on the REST API, OutboundAPI will be returned. |
| RecordingTrack | The audio track recorded. Possible values are inbound, outbound, or both. |

---

## RecordingStatusCallbackEvent

Just as you can specify call progress events with StatusCallbackEvent, you can also specify which recording status changes should trigger a callback to your application.

### Available Recording Status Values

| Parameter | Description |
|-----------|-------------|
| in-progress | The recording has started. |
| completed | The recording is complete and available for access. |
| absent | The recording is absent and inaccessible. |

This parameter defaults to completed. To specify multiple values, separate them with a space.

> **Info**
> To pause, resume, or stop recordings, see the Recordings subresource.

---

## Retrieve a Call

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
```

This API call returns a Call resource of an individual call, identified by its CallSid. This resource is eventually consistent.

> **Warning**
> To get real-time call status updates, we recommend using the StatusCallbackEvent or the TwiML `<Dial>` verb statusCallbackEvent attribute for the case of child calls.
>
> # Call Resource - Part 3

## Retrieve a Call - Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the Call resource(s) to fetch. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<CA> | required | Not PII | The SID of the Call resource to fetch. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

---

## Retrieve a Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": "machine_start",
  "api_version": "2010-04-01",
  "caller_name": "callerid",
  "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
  "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
  "direction": "outbound-api",
  "duration": "4",
  "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
  "forwarded_from": "calledvia",
  "from": "+13051416799",
  "from_formatted": "(305) 141-6799",
  "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
  "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
  "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
  "price": "-0.200",
  "price_unit": "USD",
  "sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+13051913581",
  "to_formatted": "(305) 191-3581",
  "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Recordings

You can access the Recordings subresource on any given Call.

The following will return a list of all of the recordings generated with a given call (identified by its CallSid):

```
/2010-04-01/Accounts/{YourAccountSid}/Calls/{CallSid}/Recordings
```

Learn more about the Recordings resource.

---

## Retrieve a List of Calls

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls.json
```

Return a list of phone calls made to and from an account, identified by its AccountSid.

The following query string parameters allow you to filter and limit the list returned to you by the REST API. These parameters are case-sensitive.

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the Call resource(s) to read. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| to | string<phone-number> | Optional | PII MTL: 120 days | Only show calls made to this phone number, SIP address, Client identifier or SIM SID. |
| from | string<phone-number> | Optional | PII MTL: 120 days | Only include calls from this phone number, SIP address, Client identifier or SIM SID. |
| parent_call_sid | SID<CA> | Optional | Not PII | Only include calls spawned by calls with this SID. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | The status of the calls to include. Can be: queued, ringing, in-progress, canceled, completed, failed, busy, or no-answer. Possible values: queued, ringing, in-progress, completed, busy, failed, no-answer, canceled |
| start_time | string<date-time> | Optional | Not PII | Only include calls that started on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that started on this date. |
| start_time_before | string<date-time> | Optional | Not PII | Only include calls that started before this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that started before this date. |
| start_time_after | string<date-time> | Optional | Not PII | Only include calls that started on or after this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that started on or after this date. |
| end_time | string<date-time> | Optional | Not PII | Only include calls that ended on this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that ended on this date. |
| end_time_before | string<date-time> | Optional | Not PII | Only include calls that ended before this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that ended before this date. |
| end_time_after | string<date-time> | Optional | Not PII | Only include calls that ended on or after this date. Specify a date as YYYY-MM-DD in UTC, for example: 2009-07-06, to read only calls that ended on or after this date. |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

---

## Retrieve a List of Calls

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(limit=20)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "human",
      "api_version": "2010-04-01",
      "caller_name": "callerid2",
      "date_created": "Fri, 18 Oct 2019 16:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 16:01:00 +0000",
      "direction": "inbound",
      "duration": "3",
      "end_time": "Fri, 18 Oct 2019 16:03:00 +0000",
      "forwarded_from": "calledvia2",
      "from": "+13051416798",
      "from_formatted": "(305) 141-6798",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeee",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeee",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeee",
      "price": "-0.100",
      "price_unit": "JPY",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
      "start_time": "Fri, 18 Oct 2019 16:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Recordings.json",
        "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Payments.json",
        "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Events.json",
        "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Siprec.json",
        "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Streams.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/Transcriptions.json",
        "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessageSubscriptions.json",
        "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0/UserDefinedMessages.json"
      },
      "to": "+13051913580",
      "to_formatted": "(305) 191-3580",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=1&PageToken=PACAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0"
}
```

---

## Retrieve a List of Calls and Filter by Start Date

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(
    status="completed", start_time=datetime(2009, 7, 6, 0, 0, 0), limit=20
)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&StartTime=2008-01-02&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&StartTime=2008-01-02&PageSize=2&Page=0"
}
```

---

## Retrieve a List of Calls and Filter by 'After Start' Date

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(
    status="completed", start_time_after=datetime(2009, 7, 6, 0, 0, 0), limit=20
)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&StartTime=2008-01-02&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&StartTime=2008-01-02&PageSize=2&Page=0"
}
```

---

## Retrieve a List of Calls and Filter by a Period of Time

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(
    status="in-progress",
    start_time_before=datetime(2009, 7, 6, 0, 0, 0),
    start_time_after=datetime(2009, 7, 4, 0, 0, 0),
    limit=20,
)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=in-progress&StartTimeBefore=2009-07-06&StartTimeAfter=2009-07-04&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=in-progress&StartTimeBefore=2009-07-06&StartTimeAfter=2009-07-04&PageSize=2&Page=0"
}
```

---

## Retrieve a List of Calls and Filter by Call Status and Phone Number

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(to="+15558675310", status="busy", limit=20)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?To=%2B15558675310&Status=busy&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?To=%2B15558675310&Status=busy&PageSize=2&Page=0"
}
```

---

## Retrieve a List of Calls and Filter by Calls Made from a Specific Device

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

calls = client.calls.list(from_="client:charlie", limit=20)

for record in calls:
    print(record.sid)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
      "status": "completed",
      "subresource_uris": {
        "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?From=client%3Acharlie&PageSize=2&Page=0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?From=client%3Acharlie&PageSize=2&Page=0"
}
```

---

## CSV Export

> **Info**
> You can append a `.csv` extension to any resource URI to get CSV (Comma Separated Values) representation. Specifying CSV may be especially useful for call logs. Try this:

```
GET /2010-04-01/Accounts/{AccountSid}/Calls.csv
```

Learn more about API response formats.

# Call Resource - Part 4

## Paging

If you are using the Twilio REST API, the list returned to you includes paging information.

If you plan to request more records than will fit on a single page, you can use the provided `nextpageuri` rather than incrementing through pages by page number.

Using `nextpageuri` for paging ensures that your next request will pick up where you left off. This can help keep you from retrieving duplicate data if you are actively making or receiving calls.

> **Info**
> All of the Twilio SDKs handle paging automatically. You do not need to explicitly request individual pages when using an SDK to fetch lists of resources.

---

## Update a Call

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
```

Updating a Call allows you to modify an active call.

Real-time call modification allows you to interrupt an in-progress call and terminate it or have it begin processing TwiML from either a new URL or from the TwiML provided with modification. Call modification is useful for any application where you want to change the behavior of a running call asynchronously, e.g., hold music, call queues, transferring calls, or forcing a hangup.

By sending an HTTP POST request to a specific Call instance, you can redirect a call that is in progress or you can terminate a call.

> **Info**
> For step-by-step guidance on modifying in-progress calls, check out the tutorial Modify Calls in Progress in your web language of choice.

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the Call resource(s) to update. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<CA> | required | Not PII | The Twilio-provided string that uniquely identifies the Call resource to update. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request Body Parameters

**Encoding type:** application/x-www-form-urlencoded

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| url | string<uri> | Optional | Not PII | The absolute URL that returns the TwiML instructions for the call. We will call this URL using the method when the call connects. For more information, see the Url Parameter section in Making Calls. |
| method | enum<http-method> | Optional | Not PII | The HTTP method we should use when calling the url. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| status | enum<string> | Optional | Not PII | Possible values: canceled, completed |
| fallback_url | string<uri> | Optional | Not PII | The URL that we call using the fallback_method if an error occurs when requesting or executing the TwiML at url. If an application_sid parameter is present, this parameter is ignored. |
| fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to request the fallback_url. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| status_callback | string<uri> | Optional | Not PII | The URL we should call using the status_callback_method to send status information to your application. If no status_callback_event is specified, we will send the completed status. If an application_sid parameter is present, this parameter is ignored. URLs must contain a valid hostname (underscores are not permitted). |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use when requesting the status_callback URL. Can be: GET or POST and the default is POST. If an application_sid parameter is present, this parameter is ignored. Possible values: GET, POST |
| twiml | string<twiml> | Optional | Not PII | TwiML instructions for the call Twilio will use without fetching Twiml from url. Twiml and url parameters are mutually exclusive. |
| time_limit | integer | Optional | Not PII | The maximum duration of the call in seconds. Constraints depend on account and configuration. |

---

## Update a Call in Progress with TwiML

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    twiml="<Response><Say>Ahoy there</Say></Response>"
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Update a Call in Progress with URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    method="POST", url="http://demo.twilio.com/docs/voice.xml"
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Update a Call: End the Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    status="completed"
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Parent and Child Calls

When you redirect an active call to another phone number, Twilio creates an entirely new Call instance for that new phone number. The original call is the parent call, and any additional number dialed establishes a child call. Parent and child calls will have uniquely identifying Call SIDs.

Note that any parent call currently executing a `<Dial>` is considered in-progress by Twilio. Even if you've re-directed your initial call to a new number, the parent call is still active, and thus you must use `Status=completed` to end it.

---

## Update the StatusCallback of an Active Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    url="https://example.com/twiml",
    status_callback="https://example.com/status-changed",
)

print(call.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

> **Warning**
> To update a StatusCallback on a Call, it is required to set the Url in the same statement.

---

## Delete a Call

```
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
```

This will delete a call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.

If successful, this DELETE returns an HTTP 204 (No Content) with no body.

DELETE on a call record will also delete any associated call events, but will not delete associated recordings and transcription records.

> **Warning**
> Note that an error will occur if you attempt to remove a call record for a call that is actively in progress.

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the Call resource(s) to delete. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<CA> | required | Not PII | The Twilio-provided Call SID that uniquely identifies the Call resource to delete. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

> **Danger**
> Note: For calls less than 13 months old, resources deleted from this endpoint will also be deleted in Log Archives. Calls older than 13 months can only be deleted via the Bulk Export API.

---

## Delete a Call Resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```

# Call Resource - Part 5

## Call Resource Retention

You are able to retrieve resources via `GET` to the `/Calls` endpoint for 13 months after the resource is created. Records older than thirteen months can only be retrieved via Bulk Export.

We provide a Bulk Export utility in **Console** and via **API**. Bulk Export will generate S3 files containing one day of data per file and deliver the download link via webhook, email, or Console.

---

## What's Next?

Explore **Voice Insights** with its **Call Insights Event Stream** and **Call Insights REST API** which allow you to see call parameters, investigate call metrics and event timelines, and understand detected quality issues.