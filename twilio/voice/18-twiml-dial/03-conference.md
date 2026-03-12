TwiML™ Voice: <Conference>




The <Dial> verb's <Conference> noun allows you to connect to a conference room. Much like how the <Number> noun allows you to connect to another phone number, the <Conference> noun allows you to connect to a named conference room and talk with the other callers who have also connected to that room. Conference is commonly used as a container for calls when implementing hold, transfer, and barge.

Twilio offers a globally distributed, low latency conference system that hosts your conferences in the region closest to the majority of your participants and has a maximum participant capacity of 250. It has a per-participant-per-minute price in addition to standard voice minute pricing. Learn more about Conference pricing

.

Customizable Features





The name of the room is up to you and is namespaced to your account. This means that any caller who joins room1234 via your account will end up in the same conference room, but callers connecting through different accounts would not.


(warning)
Warning
For compliance reasons, do not use personal data (also known as personally identifiable information), such as phone numbers, email addresses, or a person's name, or any other sensitive information when naming the conferences
By default, Twilio conference rooms enable a number of useful features that can be enabled or disabled based on your particular needs:

Conferences will not start until at least two participants join.
While waiting, customizable background music is played.
When participants join and leave, notification sounds are played to inform the other participants.
Events can be configured to alert your application to state changes in a conference
Receive a webhook when a participant speaks or stops speaking
You can configure or disable each of these features based on your particular needs.

Noun Attributes





The <Conference> noun supports the following attributes that modify its behavior:

Attribute Name	Allowed Values	Default Value
muted	true, false	false
beep	true, false, onEnter, onExit	true
startConferenceOnEnter	true, false	true
endConferenceOnExit	true, false	false
participantLabel	a label for the conference participant	None
jitterBufferSize	small, medium, large, `off	large
waitUrl	relative or absolute URL	default classical playlist

waitMethod	GET, POST	POST
maxParticipants	positive integer <= 250	250
record	do-not-record or record-from-start	do-not-record
region	us1, ie1, de1, sg1, br1, au1, jp1	None
trim	trim-silence or do-not-trim	trim-silence
coach	A Call SID	None
statusCallbackEvent	start, end, join, leave, mute, hold, modify, speaker, announcement	None
statusCallback	relative or absolute URL	None
statusCallbackMethod	GET, POST	POST if waitUrl is specified, otherwise GET to Twilio's default classical playlist

recordingStatusCallback	relative or absolute URL	None
recordingStatusCallbackMethod	GET, POST	POST
recordingStatusCallbackEvent	in-progress, completed, absent	completed
eventCallbackUrl	relative or absolute URL	None
muted





The muted attribute lets you specify whether a participant can speak on the conference. If this attribute is set to true, the participant will only be able to listen to people on the conference. This attribute defaults to false.

To change a conference participant's muted attribute during a call, use the Conference Participant API.

beep





The beep attribute lets you specify whether a notification beep is played to the conference when a participant joins or leaves the conference. Defaults to true.

Value	Behavior
true	Default. Plays a beep both when a participant joins and when a participant leaves.
false	Disables beeps for when participants both join and exit.
onEnter	Only plays a beep when a participant joins. The beep will not be played when the participant exits.
onExit	Will not play a beep when a participant joins; only plays a beep when the participant exits.
startConferenceOnEnter





This attribute tells a conference to start when this participant joins the conference, if it is not already started. This is true by default. If this is false and the participant joins a conference that has not started, they are muted and hear background music until a participant joins where startConferenceOnEnter is true. This is useful for implementing moderated conferences.

endConferenceOnExit





If a participant has this attribute set to true, then when that participant leaves, the conference ends and all other participants drop out. This defaults to false. This is useful for implementing moderated conferences that bridge two calls and allow either call leg to continue executing TwiML if the other hangs up.

participantLabel





A unique label for the participant which will be added into the conference as a result of executing the TwiML. The label provided here can be used subsequently to read or update participant attributes using the Twilio REST API. The participantLabel must be unique across all participants in the conference, and there is a max limit of 128 characters.


(warning)
Warning
If a participant with the same label already exists in the conference, 16025 error notification will be reported, and visible on Twilio Console

. The call will not be added into the conference and instead continue to the next TwiML verb.
jitterBufferSize





The jitterBufferSize attribute lets you set the jitter buffer behavior for a conference participant. Twilio Conference uses a jitter buffer to smooth out irregularity in media packet arrival times when mixing audio for conference participants. This buffer results in fewer audio artifacts, but introduces a fixed delay for the audio of each participant.

Setting the jitterBufferSize value to small will create a 20ms buffer that results in average latency of ~150ms - ~200ms on a stream with max jitter of ~20ms.

Setting the value to medium will create a 40ms buffer that results in average latency of ~200ms - ~360ms on a stream with max jitter of ~20ms.

The large setting, which is the default jitter buffer behavior, will create a 60ms buffer that results in average latency between ~300ms - ~1000ms on a stream with max jitter of ~20ms.

Spikes of extremely high jitter can result in the maximum latency exceeding the average latency by as much as 50%.

The off setting completely disables the buffer and packets with relatively low jitter ( <=20ms) will be completely dropped, but Twilio will add no extra latency when mixing.

The buffer value is a participant-level setting, the value for participant A does not apply to participant B.

waitUrl





The waitUrl attribute specifies a URL that will be played before the conference has started. The URL may return an MP3 file, a WAV file, or a TwiML document.

Once the TwiML document located at the waitUrl runs out of verbs to execute, silence will be played. If you want to loop the hold music or TwiML document, you can add a <Redirect> verb at the end of the document. The url in the <Redirect> verb is relative to the current URL, so if you leave the URL blank within the <Redirect> verb, the document will be looped indefinitely.

The following verbs are supported in the TwiML document located at the waitUrl:

Verb	Description
<Play>	Plays a file to the caller.
<Say>	Say something to the caller using Twilio text-to-speech.
<Pause>	Pauses for a specified duration.
<Redirect>	Redirect to another TwiML document (or the same document to loop instructions).
If the request to your waitUrl fails, the Conference will not be fully established. To avoid the call being disconnected, you can either add additional TwiML after the initial <Dial> <Conference>, or programmatically provide fallback behavior via the action callback.

If no waitUrl is specified, Twilio will use its own default classical playlist

 which contains a selection of nice Creative Commons classical music.

Here's a list of S3 buckets we've assembled with other genres of music for you to choose from:

Bucket	Twimlet URL
com.twilio.music.classical

https://twimlets.com/holdmusic?Bucket=com.twilio.music.classical

com.twilio.music.ambient

https://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient

com.twilio.music.electronica

https://twimlets.com/holdmusic?Bucket=com.twilio.music.electronica

com.twilio.music.guitars

https://twimlets.com/holdmusic?Bucket=com.twilio.music.guitars

com.twilio.music.rock

https://twimlets.com/holdmusic?Bucket=com.twilio.music.rock

com.twilio.music.soft-rock

https://twimlets.com/holdmusic?Bucket=com.twilio.music.soft-rock

If you do not wish anything to play while waiting for the conference to start, specify the empty string (set waitUrl to '').

waitMethod





This attribute indicates which HTTP method to use when requesting waitUrl. It defaults to POST if you specify a waitUrl. If you have not specified a waitUrl, Twilio will make a GET request to the default classical playlist

. Be sure to use GET if you are directly requesting static audio files such as WAV or MP3 files so that Twilio properly caches the files.

maxParticipants





This attribute indicates the maximum number of participants allowed in a named conference room. The limit is 250 participants.

record





The record attribute lets you record an entire <Conference>. When set to record-from-start, the recording begins when the first two participants are bridged. The hold music is never recorded. If a recordingStatusCallback URL is given, Twilio will make a request to the specified URL with recording details when the recording is available to access.


(warning)
Warning
The use of the record attribute is subject to the same obligations and requirements as Recordings resource and the <Record> TwiML verb. For workflows subject to PCI or the Health Insurance Portability and the Accountability Act (HIPAA), see the applicable documentation.
region





The region attribute specifies the region where Twilio should mix the conference. Specifying a value for region overrides Twilio's automatic region selection logic and should only be used if you are confident you understand where your conferences should be mixed. Twilio sets the region parameter from the first participant that specifies the parameter and will ignore the parameter from subsequent participants.

trim





The trim attribute lets you specify whether to trim leading and trailing silence from your audio files. trim defaults to trim-silence, which removes any silence at the beginning or end of your recording. This may cause the duration of the recording to be slightly less than the duration of the call.

coach





Coach accepts a call SID of a call that is currently connected to an in-progress conference. Specifying a call SID that does not exist or is no longer connected to the conference will result in the call failing to the action URL and throwing a 13240 error.

statusCallbackEvent





The statusCallbackEvent attribute allows you to specify which conference state changes should generate a Webhook to the URL specified in the statusCallback attribute. The available values are start, end, join, leave, mute, hold, modify, speaker, and announcement. To specify multiple values separate them with a space. Events are set by the first Participant to join the conference, subsequent statusCallbackEvents will be ignored. If you specify conference events you can see a log of the events fired for a given conference in the conference logs in the console

.

Event	Description
start	The conference has begun and audio is being mixed between all participants. This occurs when there are at least two participants in the conference, and at least one of the participants has startConferenceOnEnter="true".
end	The last participant has left the conference or a participant with endConferenceOnExit="true" leaves the conference.
join	A participant has joined the conference.
leave	A participant has left the conference.
mute	A participant has been muted or unmuted.
hold	A participant has been held or unheld.
modify	At least one of a participant's attributes has been modified: BeepOnExit, EndConferenceOnExit, Coaching, WaitUrl
speaker	A participant has started or stopped speaking.
announcement	A participant or conference announcement has ended or failed. Currently, the announcement-fail event will only be sent if there is an internal Twilio error. We are working to add more failures to the announcement-fail event to allow developers to debug the issue.
statusCallback





The statusCallback attribute takes a URL as an argument. Conference events specified in the statusCallbackEvent parameter will be sent to this URL.


(warning)
Warning
The statusCallback URL is set by the first Participant to join the conference, subsequent setting of the statusCallback will be ignored.
The parameters contained in the events requests are detailed below.

statusCallbackMethod





The HTTP method Twilio should use when requesting the above URL. Defaults to POST

Request Parameters

Twilio will pass the following parameters with its request to the statusCallback URL. For participant announcement events, Twilio will pass additional participant-related request parameters if the participant being announced to is still present in the conference.

Parameter	Example	Sent On
ConferenceSid	CFe08c870b500f6e44a9ad184defd1f391	Sent on: All
FriendlyName	MyConf	Sent on: All
AccountSid	ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX	Sent on: All
SequenceNumber	1	Sent on: All
Timestamp	Thu, 1 Jun 2017 20:48:32 +0000	Sent on: All
StatusCallbackEvent	conference-end conference-start participant-leave participant-join participant-mute participant-unmute participant-hold participant-unhold participant-modify participant-speech-start participant-speech-stop announcement-end announcement-fail	Sent on: join leave start end mute hold modify speaker announcement
CallSid	CA25e16e9a716a4a1786a7c83f58e30482	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
Muted	true, false	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
Hold	true, false	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
Coaching	true, false	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
EndConferenceOnExit	true, false	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
StartConferenceOnEnter	true, false	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
ParticipantLabel	customer	Sent on: join leave mute hold modify speaker announcement (for participant announcements)
CallSidEndingConference	Call SID of the participant who ended the conference (if applicable)	Sent on: end
ParticipantLabelEndingConference	Label of the participant who ended the conference (if applicable)	Sent on: end
ReasonConferenceEnded	conference-ended-via-api last-participant-kicked last-participant-left participant-with-end-conference-on-exit-kicked participant-with-end-conference-on-exit-left	Sent on: end
Reason	A message indicating why the conference ended	Sent on: end
ReasonAnnouncementFailed	A message indicating why the announcement failed	Sent on: announcement
AnnounceUrl	The URL used for the announcement	Sent on: announcement
ParticipantCallStatus	The call status of the participant. Will be one of: no-answer busy in-progress failed canceled completed	Sent on: participant-leave
ReasonParticipantLeft	The reason the participant left the conference. Will be one of: conference_ended_via_api moderator_ended_conference participant_updated_via_api participant_hung_up participant_add_failed	Sent on: participant-leave
EventName *	conference-record-end	Sent on: conference-record-end
RecordingUrl *	https://api.twilio.com/2010-04-01/Accounts/AC123/Recordings/RE234

Sent on: conference-record-end
Duration *	6	Sent on: conference-record-end
RecordingFileSize *	90786	Sent on: conference-record-end

(warning)
Warning
All conference-record-end parameters above have been deprecated in favor of recordingStatusCallback, which is the preferred approach to receive recording related information. Providing a recordingStatusCallback will result in no conference-record-end callbacks.
recordingStatusCallback





The recordingStatusCallback attribute takes a relative or absolute URL as an argument.

If a conference recording was requested via the record attribute and a recordingStatusCallback URL is given, Twilio will make a GET or POST request to the specified URL when the recording is available to access.

Request Parameters

Twilio will pass the following parameters with its request to the recordingStatusCallback URL:

Parameter	Description
AccountSid	The unique identifier of the Account responsible for this recording.
ConferenceSid	A unique identifier for the conference associated with the recording.
RecordingSid	The unique identifier for the recording.
RecordingUrl	The URL of the recorded audio.
RecordingStatus	The status of the recording. Possible values are: in-progress, completed,absent.
RecordingDuration	The length of the recording, in seconds
RecordingChannels	The number of channels in the final recording file as an integer. Only 1 channel is supported for Conference recordings.
RecordingStartTime	The timestamp of when the recording started.
RecordingSource	The initiation method used to create this recording. Conference is returned for Conference recordings.
recordingStatusCallbackMethod





This attribute indicates which HTTP method to use when requesting recordingStatusCallback. It defaults to POST.

recordingStatusCallbackEvent





This attribute allows you to specify which recording status changes should generate a webhook to the URL specified in the recordingStatusCallback attribute. The available values are in-progress, completed, absent. To specify multiple values separate them with a space. Default is completed.

Details on the status change events below:

Parameter	Description
in-progress	The recording has started
completed	The recording is complete and available for access
absent	The recording is absent and not accessible

(information)
Info
To pause or resume conference recordings, see the Recording API Docs.
eventCallbackUrl






(warning)
Warning
This attribute is deprecated. Use recordingStatusCallback instead. When a recordingStatusCallback value is provided, Twilio does not send any HTTP requests to the eventCallbackUrl.
The 'eventCallbackUrl' attribute takes a URL as an argument. When the conference ends, Twilio will make a POST request to this URL with the conference-record-end event parameters of statusCallback.

Examples





Example 1: Conference





By default, the first caller to execute this TwiML would join the conference room named Room 1234 and listen to the default waiting music. When the next caller executed this TwiML, they would join the same conference room and the conference would start. The default background music ends, the notification beep is played and all parties can communicate.

Conference example





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference('Room 1234')
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference>Room 1234</Conference>
  </Dial>
</Response>
Example 2: A Moderated Conference





First, you can drop a number of people into the conference, specifying that the conference shouldn't yet start:

A Moderated Conference





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference('moderated-conference-room', start_conference_on_enter=False)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference startConferenceOnEnter="false">
      moderated-conference-room
    </Conference>
  </Dial>
</Response>
Each person will hear hold music while they wait. When the "moderator" or conference organizer calls in, you can specify that the conference should begin:

A Moderated Conference (begin on enter)





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference(
    'moderated-conference-room',
    start_conference_on_enter=True,
    end_conference_on_exit=True
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference startConferenceOnEnter="true" endConferenceOnExit="true">
      moderated-conference-room
    </Conference>
  </Dial>
</Response>
Also note that since the moderator has "endConferenceOnExit='true'" set, then when the moderator hangs up, the conference will end and each participant's <Dial> will complete.

Example 3: Join an Evented Conference





This code will put you into a conference where events will be fired on the start, end, join, leave, mute, and hold state changes of the participant and conference.

Join an Evented Conference





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference(
    'EventedConf',
    status_callback='https://myapp.com/events',
    status_callback_event='start end join leave mute hold'
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference statusCallback="https://myapp.com/events" 
                statusCallbackEvent="start end join leave mute hold">
      EventedConf
    </Conference>
  </Dial>
</Response>
Example 4: Join a Conference Muted





This code allows participants to join the conference room muted. They can hear what unmuted participants are saying but no one can hear them. The muted attribute can be enabled or disabled in realtime via the REST API.

Join a Conference Muted





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference('SimpleRoom', muted=True)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference muted="true">SimpleRoom</Conference>
  </Dial>
</Response>
Example 5: Bridging Calls





Sometimes you just want to bridge two calls together without any of the bells and whistles. With this minimal conferencing attribute setup, no background music or beeps are played, participants can speak right away as they join, and the conference ends right away if either participant hangs up. This is useful for cases like bridging two existing calls, much like you would with a Dial.

Bridging Calls





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference(
    'NoMusicNoBeepRoom',
    beep=False,
    wait_url='http://your-webhook-host.com',
    start_conference_on_enter=True,
    end_conference_on_exit=True
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference beep="false" 
                waitUrl="http://your-webhook-host.com"
                startConferenceOnEnter="true"
                endConferenceOnExit="true">
      NoMusicNoBeepRoom
    </Conference>
  </Dial>
</Response>
Example 6: Call on Hold





Call on Hold





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference('Customer Waiting Room', beep=False)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference beep="false">
      Customer Waiting Room
    </Conference>
  </Dial>
</Response>
This code puts the first caller into a waiting room, where they'll hear music. It's as if they're on hold, waiting for an agent or operator to help them.

Then, when the operator or agent is ready to talk to them... their call would execute:

Call on Hold (end on exit)





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference(
    'Customer Waiting Room', beep=False, end_conference_on_exit=True
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference beep="false" endConferenceOnExit="true">
      Customer Waiting Room
    </Conference>
  </Dial>
</Response>
This code would join the operator with the person who was holding. Because the conference starts when they enter, the wonderful hold music the first person was hearing will stop, and the two people will begin talking. Because "beep='false'", the caller won't hear a ding when the agent answers, which is probably appropriate for this use case. When the operator hangs up, then 'endConferenceOnExit' will cause the conference to end.

Example 7: Combining with Dial attributes





Because Conference is an element of Dial, you can still use all the Dial attributes in combination with Conference (with the exception of callerId and timeout, which have no effect). You can set a timeLimit, after which you'll be removed from the conference. You can turn on hangupOnStar, which lets you leave a conference by pressing the * key. You can specify an action, so that after you leave the conference room Twilio will submit to the action and your web server can respond with new TwiML and continue your call.

Combining with Dial attributes





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial(
    action='handleLeaveConference.php',
    method='POST',
    hangup_on_star=True,
    time_limit=30
)
dial.conference('LoveTwilio')
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial action="handleLeaveConference.php" 
        method="POST"
        hangupOnStar="true"
        timeLimit="30">
    <Conference>LoveTwilio</Conference>
  </Dial>
</Response>
Example 8: Recording a Conference





This code allows you to record an entire conference starting when the first two participants are bridged and will send a recordingStatusCallback when the conference recording is available for access.

Recording a Conference





Report code block


Copy code block
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.conference(
    'LoveTwilio',
    record='record-from-start',
    recording_status_callback='www.myexample.com'
)
response.append(dial)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Conference record="record-from-start"
                recordingStatusCallback="www.myexample.com">
      LoveTwilio
    </Conference>
  </Dial>
</Response>