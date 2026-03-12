TwiML™ Voice: <Client>




The <Dial> verb's <Client> noun specifies a client identifier to dial. The client identifier may be up to 256 characters.

You can use up to ten <Client> nouns within a <Dial> verb to simultaneously attempt a connection with many clients at once. The first client to accept the incoming connection is connected to the call and the other connection attempts are canceled. If you want to connect with multiple other clients simultaneously, read about the <Conference> noun.


(warning)
Warning
The client identifier should not contain control, space, delimiters, or unwise

 characters. Mobile SDKs cannot include any special characters and must only use alphanumeric characters and underscore.
Noun Attributes





The <Client> noun supports the following attributes that modify its behavior:

Attribute Name	Allowed Values	Default Value
url	Any URL	none
method	GET, POST	POST
statusCallbackEvent	initiated, ringing, answered, completed	none
statusCallback	Any URL	none
statusCallbackMethod	GET, POST	POST
clientNotificationUrl	Any URL	none
url





The url attribute allows you to specify a URL for a TwiML document that will run on the called party's end, after she answers, but before the parties are connected. You can use this TwiML to privately play or say information to the called party, or provide a chance to decline the phone call using <Gather> and <Hangup>. If answerOnBridge attribute is used on <Dial>, the current caller will continue to hear ringing while the TwiML document executes on the other end. TwiML documents executed in this manner are not allowed to contain the <Dial> verb.

method





The method attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the url attribute. The default is POST.

statusCallbackEvent





When dialing out to a Client using <Dial>, an outbound call is initiated. The call transitions from the initiated state to the ringing state when the phone starts ringing. It transitions to the answered state when the call is picked up, and finally to the completed state when the call is over. With statusCallbackEvent, you can subscribe to receive webhooks for the different call progress events: initiated, ringing, answered, or completed for a given call.

The statusCallbackEvent attribute allows you to specify which events Twilio should call a webhook on. To specify multiple events separate them with a space: initiated ringing answered completed. If a statusCallback is provided and no status callback events are specified the completed event will be sent by default.

As opposed to creating an outbound call via the API, outbound calls created using <Dial> are initiated right away and never queued. The following shows a timeline of possible call events that can be returned and the different call statuses that a <Dial> leg may experience:

Timeline of an outbound Dial call showing events: initiated, ringing, answered, completed.

Expand image
Event	Description
initiated	This event is fired when Twilio starts dialing the call.
ringing	This event is fired when the call starts ringing.
answered	This event is fired when the call is answered.
completed	This event is fired when the call is completed, regardless of the termination status: busy, canceled, completed, failed, or no-answer. If no StatusCallbackEvent is specified, completed will be fired by default.
statusCallback





The statusCallback attribute allows you to specify a URL for Twilio to send webhook requests to on each event specified in the statusCallbackEvent attribute. Non-relative URLs must contain a valid hostname (underscores are not permitted).

statusCallbackMethod





The statusCallbackMethod attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the statusCallback attribute. The default is POST.

Status Callback HTTP Parameters





The parameters Twilio passes to your application in its asynchronous request to the StatusCallback URL include all parameters passed in a synchronous request to retrieve TwiML when Twilio receives a call to one of your Twilio numbers. The full list of parameters and descriptions of each are in the TwiML Voice Request documentation.

When the call progress events are fired, the Status Callback request also passes these additional parameters:

Parameter	Description
CallSid	Unique identifier for this call that Twilio generates. To modify the child call, make a POST request to Calls/{CallSid} with a new TwiML URL.
ParentCallSid	A unique identifier for the parent call.
CallStatus	A descriptive status for the call. The value is one of queued, initiated, ringing, in-progress, busy, failed, or no-answer. See the CallStatus section for more details.
CallDuration	The duration in seconds of the just-completed call. Only present in the completed event.
RecordingUrl	The URL of the phone call's recorded audio. This parameter is included only if record is set on the <Dial> and does not include recordings initiated in other ways. RecordingUrl is only present in the completed event.
RecordingSid	The unique ID of the Recording from this call. RecordingSid is only present in the completed event.
RecordingDuration	The duration of the recorded audio (in seconds). RecordingDuration is only present in the completed event. To get a final accurate recording duration after any trimming of silence, use recordingStatusCallback.
Timestamp	The timestamp when the event was fired, given as UTC in RFC 2822

format.
CallbackSource	A string that describes the source of the webhook. This is provided to help disambiguate why the webhook was made. On Status Callbacks, this value is always call-progress-events.
SequenceNumber	The order in which the events were fired, starting from 0. Although events are fired in order, they are made as separate HTTP requests and there is no guarantee they will arrive in the same order.
clientNotificationUrl





To notify your application of a call routing to a client user of the Voice SDK, call this URL. When handling your own push notifications to mobile client users, use this parameter. URLs must contain a valid hostname. This value can't include underscores. Parameter defaults to and only accepts POST.

Custom Parameters





It is possible to include additional key value pairs that will be passed to the Voice SDK device instance (Web or Mobile). You can do this by using the nested <Parameter> TwiML noun.

Send custom parameters to the Voice SDK





Report code block


Copy code block
from twilio.twiml.voice_response import Client, Dial, Identity, Parameter, VoiceResponse

response = VoiceResponse()
dial = Dial()
client = Client()
client.identity('user_jane')
client.parameter(name='FirstName', value='Jane')
client.parameter(name='LastName', value='Doe')
dial.append(client)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Dial>
     <Client>
        <Identity>user_jane</Identity>
        <Parameter name="FirstName" value ="Jane"/>
        <Parameter name="LastName" value ="Doe" />
      </Client>
    </Dial>
</Response>
These custom parameters can retrieved using the SDKs. For the Voice JavaScript SDK, refer to Connection.customParameters, for iOS, refer to TVOConnectOption.params

, and for Android, refer to ConnectOptions.getParams()


Examples





Example 1: Dialing a Voice SDK device





In this example, we want to connect the current call to a client named joey. To connect the call to joey, use a <Dial> verb with a <Client> noun nested inside.

Dialing a Voice SDK device





Report code block


Copy code block
from twilio.twiml.voice_response import Client, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.client('joey')
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Client>joey</Client>
    </Dial>
</Response>
Example 2: Simultaneous dialing





You can use up to ten total <Number> and <Client> nouns within a <Dial> verb to dial multiple <Number>s and <Client>s at the same time. The first person to answer the call will be connected to the caller, while the rest of the call attempts are hung up.

Simultaneous Dialing





Report code block


Copy code block
from twilio.twiml.voice_response import Client, Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial(caller_id='+1888XXXXXXX')
dial.number('858-987-6543')
dial.client('joey')
dial.client('charlie')
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="+1888XXXXXXX">
        <Number>858-987-6543</Number>
        <Client>joey</Client>
        <Client>charlie</Client>
    </Dial>
</Response>
Example 3: Call-progress events





In this case, we want to receive a webhook for each call-progress event when dialing a Voice SDK device using <Dial>.

Call Progress Events





Report code block


Copy code block
from twilio.twiml.voice_response import Client, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.client(
    'joey',
    status_callback_event='initiated ringing answered completed',
    status_callback='https://myapp.com/calls/events',
    status_callback_method='POST'
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Client
         statusCallbackEvent='initiated ringing answered completed'
         statusCallback='https://myapp.com/calls/events'
         statusCallbackMethod='POST'>
             joey
        </Client>
    </Dial>
</Response>