TwiML™ Voice: <WhatsApp>




The <Dial> verb's <WhatsApp> noun lets you set up VoIP sessions to clients using the WhatsApp

 consumer application. With this feature, you can send a call to any WhatsApp endpoint, after first establishing consent using a WhatsApp message template. Set up your TwiML to use the <WhatsApp> noun within the <Dial> verb to connect a Voice call to a WhatsApp client. If you are unfamiliar with WhatsApp Business Calling, or want more information on how Twilio works with WhatsApp, see the Twilio WhatsApp Business Platform documentation.

Basic usage





The TwiML example below shows the basic TwiML syntax of <Dial><WhatsApp>.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="whatsapp:+558551234567">
        <WhatsApp>+555551234567</WhatsApp>
    </Dial>
</Response>

(information)
Info
All WhatsApp calls must use a callerId set to a registered, Voice-activated WhatsApp sender in the format whatsapp:{sender} on the originating Twilio account.
<WhatsApp> attributes





The <WhatsApp> noun supports the following attributes that modify its behavior:

Attribute name	Allowed values	Default value
url	Any URL	none
method	GET, POST	POST
statusCallbackEvent	initiated, ringing, answered, completed	none
statusCallback	Any URL	none
statusCallbackMethod	GET, POST	POST
WhatsApp destination numbers specified in the noun should be formatted in E.164 format with a + and country code, for example: +16175551212.

url attribute





The url attribute allows you to specify a URL that will return a TwiML response to be run on the called party's end, after they answer, but before the parties are connected.

You can use this TwiML to privately <Play> or <Say> information to the called party. You could also provide a chance to decline the phone call using <Gather> and <Hangup>. The url attribute doesn't support any other TwiML verbs.

If the answerOnBridge attribute is used on <Dial>, the current caller will continue to hear ringing while the TwiML document executes on the other end. TwiML documents executed in this manner are not allowed to contain the <Dial> verb.

method attribute





The method attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the url attribute. The default is POST.

statusCallbackEvent attribute





When dialing out to a number using <Dial>, an outbound call is initiated. The call transitions from the initiated state to the ringing state when the phone starts ringing. It transitions to the answered state when the call is picked up, and finally to the completed state when the call is over.

With statusCallbackEvent, you can subscribe to receive webhooks for the different call progress events for a given call: initiated, ringing, answered, or completed. Non-relative URLs must contain a valid hostname. Underscores aren't permitted.

The statusCallbackEvent attribute allows you to specify which events Twilio should trigger a webhook on. To specify multiple events, separate them with a space: initiated ringing answered completed. If a statusCallback is provided and no statusCallbackEvent events are specified, the completed event will be sent by default.

As opposed to creating an outbound call via the API, outbound calls created using <Dial> are initiated right away and never queued. The following shows a timeline of possible call events that can be returned and the different call statuses that a <Dial> leg may experience:

Timeline of an outbound Dial call showing events: initiated, ringing, answered, completed.

Expand image
Event	Description
initiated	The initiated event is fired when Twilio starts dialing the call.
ringing	The ringing event is fired when the call starts ringing.
answered	The answered event is fired when the call is answered.
completed	The completed event is fired when the call is completed, regardless of the termination status: busy, canceled, completed, failed, or no-answer. If no statusCallbackEvent is specified, completed will be fired by default.
statusCallback attribute





The statusCallback attribute allows you to specify a URL for Twilio to send webhook requests to on each event specified in the statusCallbackEvent attribute.

statusCallbackMethod attribute





The statusCallbackMethod attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the statusCallback attribute. The default is POST.

Status callback HTTP parameters





The parameters Twilio passes to your application in its asynchronous request to the statusCallback URL include all parameters passed in a synchronous request to retrieve TwiML when Twilio receives a call to one of your Twilio numbers. The full list of parameters and descriptions of each are in the TwiML Voice Request documentation.

When the call progress events are fired, the statusCallback request also passes these additional parameters:

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
SequenceNumber	The order in which the events were fired, starting from 0. Although events are fired in order, they are made as separate HTTP requests, and there is no guarantee they will arrive in the same order.