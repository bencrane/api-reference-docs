ConversationRelay - Getting and sending WebSocket messages




Twilio communicates with your ConversationRelay application using a WebSocket connection. Your application will receive messages from Twilio with the caller's speech and other call events. You'll control your side of the conversation by sending messages back to Twilio with text tokens, media playback requests, DTMF digits, and other commands.

Getting messages from Twilio





Your WebSocket server must validate incoming messages from Twilio using the X-Twilio-Signature header. For detailed guidance on setting up signature validation, see Configure your WebSocket server. The messages that you receive from Twilio will be one of the following types:

Setup message





ConversationRelay sends this message immediately after establishing the WebSocket connection.



Copy code block
{
  "type": "setup",
  "sessionId": "VX00000000000000000000000000000000",
  "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "parentCallSid": "",
  "callSid": "CA00000000000000000000000000000000",
  "from": "+18005550100",
  "to": "+18005550101",
  "forwardedFrom": "+18005550102",
  "callType": "PSTN",
  "callerName": "",
  "direction": "inbound",
  "callStatus": "RINGING",
  "customParameters" : {
    "callReference": "bar"
  }
}
Prompt message





ConversationRelay sends this message when the caller says something.



Copy code block
{
  "type": "prompt",
  "voicePrompt": "Hi! Can you tell me about life?",
  "lang": "en-US",
  "last": true
}
DTMF message





ConversationRelay sends this message when you turn on DTMF detection and the caller presses a key.



Copy code block
{
  "type": "dtmf",
  "digit": "1"
}
Interrupt message





ConversationRelay sends this message when the caller interrupts TTS playback by speaking.



Copy code block
{
  "type": "interrupt",
  "utteranceUntilInterrupt": "Life is a complex set of",
  "durationUntilInterruptMs": 460
}
Error message





ConversationRelay sends this message when an error occurs during the session.



Copy code block
{
  "type": "error",
  "description": "Invalid message received: { \"foo\" : \"bar\" }"
}
Sending messages to Twilio





ConversationRelay validates the incoming messages that your application sends us. If validation fails then Twilio returns error 64107 with details about the validation failure. A failed validation check does not end the session but the message will not be processed.

Text tokens message





Send text tokens messages to Twilio and ConversationRelay will convert them to speech. We recommend streaming text tokens as soon as they are available, rather than waiting for the entire message to be ready. This reduces latency. Use the last attribute to indicate the final token in the talk cycle.



Copy code block
{
  "type": "text",
  "token": "Hello world!",
  "last": false,
  "interruptible": false,
  "preemptible": false
}
Attribute	Description	Validation rules
type	The type of message you're sending to Twilio.	Required. Must equal text.
token	The text that will be converted to speech and played to the caller. Don't trim LLM tokens; the tokens should have appropriate spaces between them.	Required. Cannot be null.
last	Whether this is the final token in the current message. Defaults to false.	Optional, can be true or false.
lang	The language of the text.	Optional, must be one of the supported languages if included.
interruptible	Whether the caller can interrupt this text. Overrides the interruptible attribute in TwiML.	Optional boolean value.
preemptible	Whether subsequent text or play messages will stop this media playback. Overrides the preemptible attribute in TwiML.	Optional boolean value.
Speech Synthesis Markup Language (SSML)

To fine-tune synthesized speech, you can passthrough SSML

 tags within the token to provide the pronounciation of a word or an acronym, specify where pauses should be, or increase or decrease the speed of spoken text. Supported SSML tags depend on the active ttsProvider for the session.

If the ttsProvider is Google or Amazon, see the Speech Synthesis Markup Language (SSML) documentation for the list of supported tags.

If the ttsProvider is ElevenLabs, the language must be en-US, and only the <phoneme> tag is supported. See the ElevenLabs documentation for guidance on defining phoneme tags

. Example:



Copy code block
{
  "type": "text",
  "token": "Hello from <phoneme alphabet=\"ipa\" ph=\"ˈtwɪlioʊ\">Twilio</phoneme>.",
  "last": false,
  "interruptible": false,
  "preemptible": false
}
Play media message





Request to play media to the caller.



Copy code block
{
  "type": "play",
  "source": "https://api.twilio.com/cowbell.mp3",
  "loop": 1,
  "preemptible": false,
  "interruptible": true
}
Attribute	Description	Validation rules
type	The type of message you're sending to Twilio.	Required. Must equal play.
source	The URL of the media to play.	Required. Must contain a valid URL.
loop	Number of times to play the media. A value of 0 plays it 1,000 times (maximum). Default is 1.	Optional, integer value.
preemptible	If set to true, subsequent text or play messages will stop this media playback. Default is false	Optional boolean value
interruptible	Whether the caller can interrupt this media. Overrides the interruptible attribute in TwiML.	Optional boolean value
Send digits message





Request to send DTMF digits to the caller. ConversationRelay sends digits as per Twilio's <Play> digits attribute.



Copy code block
{
  "type": "sendDigits",
  "digits": "9www4085551212"
}
Attribute	Description	Validation rules
type	The type of message you're sending to Twilio.	Required. Must equal sendDigits.
digits	The DTMF digits to send.	Required. Cannot be null or empty. Must only contain the characters 0-9, w, #, and *.
Switch language message





Change the transcription and TTS language during the session. This affects future TTS and STT sessions.



Copy code block
{
  "type": "language",
  "ttsLanguage": "sv-SE",
  "transcriptionLanguage": "en-US"
}
Attribute	Description	Validation rules
type	The type of message you're sending to Twilio.	Required. Must equal language.
ttsLanguage	The language to use for text-to-speech conversion.	Optional, but either this or transcriptionLanguage must be present. Must be one of the supported languages.
transcriptionLanguage	The language to use for speech-to-text transcription.	Optional, but either this or ttsLanguage must be present. Must be one of the supported languages.
End session message





End the session and return control of the call to Twilio through ConversationRelay.



Copy code block
{
  "type": "end",
  "handoffData": "{\"reasonCode\":\"live-agent-handoff\", \"reason\": \"The caller wants to talk to a real person\"}"
}
Attribute	Description	Validation rules
type	The type of message you're sending to Twilio.	Required. Must equal end.
handoffData	A string containing data to pass back in the action callback.	Optional.
Handling errors





For errors, such as messages that ConversationRelay doesn't understand, we will respond with an error message.

If your WebSocket sends unidentified messages to ConversationRelay and the last 10 messages remain unidentified, we will terminate the connection. The status code will be 1007 with the reason "Too many consecutive malformed messages." In that case, we will report an error 64105 "WebSocket Ended."

Limitations





If the WebSocket disconnects unexpectedly in ConversationRelay, we don't reconnect, and the call disconnects with a failed status.

WebSocket reconnection logic





In the event of a WebSocket connection error in ConversationRelay, implement reconnection logic by initiating a new <Connect><ConversationRelay> request:

Re-establish the connection: If you lose the WebSocket connection, handle the disconnect in your <Connect> element's action URL callback by returning new TwiML containing <Connect><ConversationRelay> to restore the session.
Validate call consistency in ConversationRelay: Ensure the callSid remains the same to confirm continuity of the original call session.
This approach helps maintain session stability and consistency following any connection disruptions.

See also





ConversationRelay overview
TwiML ConversationRelay noun reference