# Changelog

# TwiML - Changelog

TwiML Changelog




Changes in the Programmable Voice TwiML functionality will be documented here for your reference.

2024.10.01





Additional changes to Voice TwiML processors have been made.

You can now enable Google Speech-to-Text (STT) V2 as the default speech-to-text provider for <Gather> on your Twilio account.
The speechModel attribute for <Gather> now allows for specifying a provider_model value—specifically that of Deepgram, a newly supported speech recognition provider. See the <Gather> page for more details including supported providers, speech models, and updates to existing attributes.
2024.08.05





Additional changes to Voice TwiML processors have been made.

If your application specifies the <Record> verb's transcribeCallback attribute, then your application also needs to specify transcribe=true in order for Twilio to generate the transcription and send the callback to your application; it is no longer implicit.
2024.07.30





Additional changes to Voice TwiML processors have been made.

Inbound calls that end before moving to the in-progress state now result in the no-answer final call state. Previously these calls resulted in the canceled final call state.
2024.07.22





Additional changes to Voice TwiML processors have been made.

Twilio will no longer normalize alpha character caller IDs for case, and will pass along whatever we receive from the originating carrier; e.g. different carriers may send anonymous or Anonymous for caller ID-withheld calls. Your application will need to gracefully handle changes in string case.
If the <Say> nested inside of a <Gather> verb provides an invalid voice, Twilio will treat this as a failure and hit the fallback URL. Previously, we ignored the invalid TwiML and hit the action URL of the <Gather>.
If your application returns a content-type of text/plain but returns valid TwiML, Twilio will parse this appropriately. Previously, we would read the contents of the response as a <Say> before ending the call. Note that this behavior remains unchanged if the contents in the response are not valid TwiML.
2024.07.09





Additional changes to Voice TwiML processors have been made.

If a <Gather> action URL responds with an HTTP 3xx redirect, Twilio follows this redirect and resends the Digits parameter. Previously, the Digits parameter was not being resent to the redirected URL.
2024.05.30





Additional changes to Voice TwiML processors have been made.

The <Redirect> verb now uses POST as its default HTTP method when the verb is returned from <Conference> waitUrls and <Enqueue> waitUrls with no method attribute. Previously, the default HTTP method was GET.
Called and Caller parameters can now be overridden by the Voice SDK . Previously, only To and From parameters could be overridden when creating a device connection: JavaScript / iOS

 / Android

 / React Native

.
2024.03.20





Additional changes to Voice TwiML processors have been made.

When a call status changes to the final call state, the status callback request is now asynchronous and will no longer wait for responses from webhooks before being emitted. Previously any webhook requests in-flight at the time the call ended would wait to receive a response before the final call status callback would fire, which could lead to race conditions, especially on inbound calls. The final call status callback event will now be emitted as soon as the call ends.
TwiML - 2024.03.11





Additional changes to Voice TwiML processors have been made.

Client ID character limit for <Dial><Client>, POST to /Calls, and POST to /Participants has been increased to 256 characters
Call status sent to an <Enqueue> waitUrl webhook will now be ringing; previously the sent status was in-progress
Call status for an inbound call with an empty <Say> verb will have the same behavior as the <Pause> verb, and the call status sent to any following TwiML documents will be ringing and not in-progress; the overall call status will be determined by the subsequent TwiML verb
Twilio will no longer send request parameters for <Play> media fetch requests
TwiML - 2024.02.09





Additional changes to Voice TwiML processors have been made.

finishOnKey no longer requires a preceding digit to end the <Gather>. This change brings this behavior into alignment with the behavior for <Enqueue> waitUrl.
TwiML - 2024.01.18





Additional changes to Voice TwiML processors have been made.

Incoming call From numbers will no longer contain only digits: For example, an incoming caller ID could be anonymous, unknown, etc.
TwiML webhook requests and <Play> media fetches now use the same redirect behavior as status callbacks and other webhooks. This means that query parameters received at the initial URL will now be persisted to the redirected URL.
TwiML - 2023.06.01





We are beginning to roll out updates to our Voice TwiML processor. Some changes that may impact your call flows are:

Some inbound calls which were previously marked as completed if the first verb was not <Hangup> or <Reject> will now be marked as no-answer or busy as determined by the verb
We will no longer use the same cookies for HTTP webhook requests made between parent and child calls
Cookies will not be shared between TwiML webhook URLs and status callback URLs for a given call SID
Cookies will be collected during standalone <Play> responses, but will not be collected for <Play> verbs nested inside <Gather>
We will now send silent RTP during the <Pause> verb; previously no RTP was sent from Twilio while the <Pause> verb executes
We will now send silent RTP during the <Record> verb; previously no RTP was sent from Twilio while the <Record> verb executes
Parameter overrides for Voice SDK calls can only override the To or From parameters
TwiML - 2022.10.07





Answering machine detection (AMD) can now be enabled when creating child calls using <Dial><Number> and <Dial><Sip>, or when creating a new conference participant via POST to the /Participants API.

AMD will run in the background while the call connects and will return the results of our detection to inform your application when a human or machine answered, or when the voicemail message beep has been detected.

TwiML - 2021.05.13





We are changing the behavior of <Dial>. This could represent a breaking change for some call flows. The changes are:

If a <Dial> action URL is specified, Twilio will make a request to the provided action callback when the parent call is transferred to a new TwiML via call modification
If no <Dial> action URL is specified, the parent call will continue to the next verb in the current TwiML document when the parent call is modified to use new TwiML. Note: in most cases the verb after the <Dial> will not be executed since the call has been modified, but if the next verb is <Redirect> Twilio will make a request to the provided URL.
This change brings Enhanced Programmable SIP Feature enabled accounts behavior in alignment with the behavior of TwiML for non-enabled accounts.

TwiML - 2020.12.09





Functional improvements





The following functional improvements to <Dial> TwiML verb are available:

<Dial> now allows simultaneous or sequential dialing to up to ten <Number>, <Client> or <Sip> endpoints in a single <Dial> command
<Dial> now supports Global Low Latency (GLL) when using <Dial hangupOnStar="true">.
A new action callback parameter DialBridged is added with value returned as true only if the call was bridged with the parent. This is to distinguish the cases where the child call was hung up during screening vs bridged with the parent.
The <Sip> noun now supports the ringTone parameter.
When sending status callbacks for a dialed leg, the geographic data specified in the webhook data will be for the To and From phone numbers of the dialed leg. Previously, the geographic data for the To and From numbers of the parent leg was used in the status callbacks for the dialed leg as well.
Early audio will always be generated for the following scenarios
If simultaneous dialing is used, irrespective of the Early Audio Exception account flag
If the url attribute is present
If the sendDigits attribute is present
Changes that could impact your application





Each dial leg in case of simultaneous and sequential dialing will now have its own call record. Previously only the completed call had a call-record created, which means you couldn't see data or signaling for the legs that were not answered. The new behavior also lets you cancel individual dial legs through the API.
This new behavior should allow for more accurate records.
This new behavior allows for more effective debugging.
<Dial> verb will never be allowed in the TwiML returned by the screening URL.
In case of <Hangup> or <Reject> in screening URL, DialCallStatus will be set to completed, previously it was set to no-answer.
This is a more accurate representation of the call behavior, as the call connects and is rejected by the application
This new behavior allows for more effective debugging.
Cookies set on parent call TwiML responses will not be included in requests made to status callback URLs on child calls
Changes to call status for inbound calls:
With <Dial answerOnBridge="true">, parent call status will be ringing until the screening URL is complete. Previously it was set to in-progress immediately.
Child call status will be ringing until answered and in-progress when screening. Previously it was set to queued until answered.
With <Dial answerOnBridge="true">, the parent call will report a status of no-answer until and unless it is bridged to the child call.
This new behavior should allow for more accurate call tracking in customer applications.
In case of hang up during screening, DialCallStatus will be set to completed. Previously DialCallStatus was set to no-answer.