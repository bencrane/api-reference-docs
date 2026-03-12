TwiML™ Voice: <ConversationRelay>





(information)
Legal notice
ConversationRelay, including the <ConversationRelay> TwiML noun and API, uses artificial intelligence or machine learning technologies. By enabling or using any features or functionalities within Programmable Voice that Twilio identifies as using artificial intelligence or machine learning technology, you acknowledge and agree to certain terms. Your use of these features or functionalities is subject to the terms of the Predictive and Generative AI or ML Features Addendum

.

ConversationRelay isn't compliant with the Payment Card Industry (PCI)

and doesn't support Voice workflows that are subject to PCI.

ConversationRelay is a HIPAA Eligible Service when configured properly. For healthcare applications subject to HIPAA, ensure you have a signed Business Associate Agreement (BAA) with Twilio and follow HIPAA compliance guidelines.

(information)
Info
Before using ConversationRelay, you need to complete the onboarding steps and agree to the Predictive and Generative AI/ML Features Addendum. See the ConversationRelay Onboarding Guide for more details.
The <ConversationRelay> TwiML noun under the <Connect> verb routes a call to the ConversationRelay service, providing advanced AI-powered voice interactions. ConversationRelay handles the complexities of live, synchronous voice calls, such as speech-to-text (STT) and text-to-speech (TTS) conversions, session management, and low-latency communication with your application. This approach allows your system to focus on processing conversational AI logic and sending back responses effectively.

In a typical setup, <ConversationRelay> connects to your AI application through a WebSocket, allowing real-time and event-based interaction. Your application receives transcribed caller speech in structured messages and sends responses as text, which ConversationRelay converts to speech and plays back to the caller. This setup is commonly used for customer service, virtual assistants, and other scenarios that require real-time, AI-based voice interactions.

<ConversationRelay> attributes





The <ConversationRelay> noun supports the following attributes:

Attribute name	Description	Default value	Required
url	The URL of your WebSocket server. The URL must begin with wss://.		Required
welcomeGreeting	The message Twilio plays to the caller after answering a call. For example, Hello! How can I help you today?		Optional
welcomeGreetingInterruptible	Controls what interruptions from the caller are permitted during the welcome greeting. The value can be none, dtmf, speech, or any.	any	Optional
language	The language of STT and TTS. Setting this attribute is the same as setting both ttsLanguage and transcriptionLanguage.	en-US	Optional
ttsLanguage	The language code to use for TTS when the text token message doesn't specify a lang. This overrides the language attribute.		Optional
ttsProvider	The provider for TTS. Available choices are Google, Amazon, and ElevenLabs.	ElevenLabs	Optional
voice	The voice used for TTS. Options vary based on the ttsProvider. For details, refer to the Twilio TTS voices. Additional voices are available for ConversationRelay.	UgBBYS2sOqTuMpoF3BR0 (ElevenLabs), en-US-Journey-O (Google), Joanna-Neural (Amazon)	Optional
transcriptionLanguage	The language to use for STT. This overrides the language attribute.		Optional
transcriptionProvider	The provider for STT. Available choices are Google and Deepgram.	Deepgram (or Google for accounts that used ConversationRelay before September 12, 2025).	Optional
speechModel	The speech model used for STT. Choices vary based on the transcriptionProvider. Refer to the provider's documentation for an accurate list.	telephony (Google), nova-3-general (for Deepgram languages that support it) or nova-2-general (Deepgram, other languages)	Optional
deepgramSmartFormat	Specifies whether to use Deepgram's Smart Format

 feature when Deepgram is your transcriptionProvider. Smart Format automatically reformats transcription output for readability, converting dates, times, currency, numbers, addresses, and other entities into their conventional written forms. Values can be true or false.	true	Optional
interruptible	Specifies if caller speech can interrupt TTS playback. Values can be none, dtmf, speech, or any. For backward compatibility, Boolean values are also accepted: true = any and false = none.	any	Optional
interruptSensitivity	The sensitivity of the agent's speech to interruptions from the caller. Value can be low, medium, or high.	high	Optional
dtmfDetection	Specifies whether the system sends Dual-tone multi-frequency (DTMF) keypresses over the WebSocket. Set to true to turn on DTMF events.		Optional
reportInputDuringAgentSpeech	Specifies whether your application receives prompts and DTMF events while the agent is speaking. Values can be none, dtmf, speech, or any. Note: The default value for this attribute has changed. The default was any before May 2025 and it's now none.	none	Optional
preemptible	Specifies if the TTS of the current talk cycle can allow text tokens from the subsequent talk cycle to interrupt.	false	Optional
hints	A comma-separated list of words or phrases that may appear in the speech. See Hints to learn more about this attribute.		Optional
debug	A space-separated list of options that you can use to subscribe to debugging messages. Options are debugging, speaker-events, and tokens-played. The debugging option provides general debugging information. speaker-events will notify your application about agentSpeaking and clientSpeaking events. tokens-played will provide messages about what's just been played over TTS.		Optional
elevenlabsTextNormalization	Specifies whether or not to apply text normalization while using the ElevenLabs TTS provider. Options are on, auto, or off. auto has the same effect as off for ConversationRelay voice calls.	off	Optional
intelligenceService	A Conversational Intelligence Service SID or unique name for persisting conversation transcripts and running Language Operators for virtual agent observability. Please see this guide for more details.		Optional
Nested elements





For more granular configuration, you can nest elements in <ConversationRelay>.

<Language> element





The <Language> element maps a language code to a set of text-to-speech and speech-to-text settings. Add one <Language> element for each language that the session may use.


(information)
Info
Adding the <Language> element doesn't set it as the text-to-speech or speech-to-text language. See Language settings to learn about how to set or change the TTS or STT language in a session.
Attributes

Attribute name	Description of attributes	Default value	Required
code	The language code (for example, en-US) that applies to both STT and TTS. Can be multi for automatic language detection.		Required
ttsProvider	The provider for TTS. Choices are Google, Amazon, and ElevenLabs. If code is multi, then must be ElevenLabs.	Inherited from <ConversationRelay>	Optional
voice	The voice used for TTS. Choices vary based on the ttsProvider.	Inherited from <ConversationRelay>	Optional
transcriptionProvider	The provider for STT. Choices are Google and Deepgram. If code is multi, then must be Deepgram.	Inherited from <ConversationRelay>	Optional
speechModel	The speech model used for STT. Choices vary based on the transcriptionProvider.	Inherited from <ConversationRelay>	Optional
Example

Connect a Programmable Voice call to Twilio's ConversationRelay service.





Report code block


Copy code block
from twilio.twiml.voice_response import Connect, ConversationRelay, Language, VoiceResponse

response = VoiceResponse()
connect = Connect()
conversationrelay = ConversationRelay(
    url='wss://mywebsocketserver.com/websocket')
conversationrelay.language(
    code='sv-SE',
    tts_provider='amazon',
    voice='Elin-Neural',
    transcription_provider='google',
    speech_model='long')
conversationrelay.language(
    code='en-US', tts_provider='google', voice='en-US-Journey-O')
connect.append(conversationrelay)
response.append(connect)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <ConversationRelay url="wss://mywebsocketserver.com/websocket">
      <Language code="sv-SE" ttsProvider="amazon" voice="Elin-Neural" transcriptionProvider="google" speechModel="long"/>
      <Language code="en-US" ttsProvider="google" voice="en-US-Journey-O" />
    </ConversationRelay>
  </Connect>
</Response>
<Parameter> element





The <Parameter> element allows you to send custom parameters from the TwiML directly into the initial "setup" message sent over the WebSocket. These parameters appear under the customParameters field in the JSON message.

Example

Connect a Programmable Voice call to Twilio's ConversationRelay service.





Report code block


Copy code block
from twilio.twiml.voice_response import Connect, ConversationRelay, Parameter, VoiceResponse

response = VoiceResponse()
connect = Connect()
conversationrelay = ConversationRelay(
    url='wss://mywebsocketserver.com/websocket')
conversationrelay.parameter(name='foo', value='bar')
conversationrelay.parameter(name='hint', value='Annoyed customer')
connect.append(conversationrelay)
response.append(connect)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <ConversationRelay url="wss://mywebsocketserver.com/websocket">
      <Parameter name="foo" value="bar"/>
      <Parameter name="hint" value="Annoyed customer"/>
    </ConversationRelay>
  </Connect>
</Response>
Resulting setup message



Copy code block
{
  "type": "setup",
  "sessionId": "VX00000000000000000000000000000000",
  "callSid": "CA00000000000000000000000000000000",
  "...": "...",
  "customParameters": {
    "foo": "bar",
    "hint": "Annoyed customer"
  }
}
Generating TwiML for <ConversationRelay>





Connect a Programmable Voice call to Twilio's ConversationRelay service.





Report code block


Copy code block
from twilio.twiml.voice_response import Connect, ConversationRelay, VoiceResponse

response = VoiceResponse()
connect = Connect(action='https://myhttpserver.com/connect_action')
connect.conversation_relay(
    url='wss://mywebsocketserver.com/websocket',
    welcome_greeting='Hi! Ask me anything!')
response.append(connect)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect action="https://myhttpserver.com/connect_action">
    <ConversationRelay url="wss://mywebsocketserver.com/websocket" welcomeGreeting="Hi! Ask me anything!" />
  </Connect>
</Response>
action (optional): The URL that Twilio will request when the <Connect> verb ends.
url (required): The URL of your WebSocket server (must use the wss:// protocol).
welcomeGreeting (optional): The message played to the caller after we answer the call and establish the WebSocket connection.
When the TwiML execution is complete, Twilio will make a callback to the action URL with call information and the return parameters from ConversationRelay.

Language settings





Setting the text-to-speech language





You can set the text-to-speech language in four ways:

The value of the language attribute on the <ConversationRelay> noun
The value of the ttsLanguage attribute on the <ConversationRelay> noun
The ttsLanguage value in the last switch language message that your app sent to Twilio
The lang value in the text token message your app sent to Twilio
Later items on this list override earlier items on the list. For example, if you set the text-to-speech language to sv-SE in the text token message and en-US in the ttsLanguage attribute of the <ConversationRelay> noun, the TTS language is sv-SE for that token.

Setting the speech-to-text language





You can set the speech-to-text language in three ways. Later items on this list override earlier items on the list.

The value of the language attribute on the <ConversationRelay> noun
The value of the transcriptionLanguage attribute on the <ConversationRelay> noun
The transcriptionLanguage value in the last switch language message that your app sent to Twilio
Sessions with more than one language





If your session could have more than one language, use the <Language> noun to configure the speech model, transcription provider, text-to-speech provider, and voice for each language. Add one <Language> noun for each language that you support.

The attributes of the <Language> noun override attributes of the parent <ConversationRelay> noun.

During the session, you can send a switch language message to change the active language for STT or TTS, or specify a lang directly in the text token message your app sends to Twilio for TTS.

Automatic language detection





If you want Twilio to detect the language spoken by the caller, you can specify multi as the active STT language for the session. See Setting the speech-to-text language for setting the STT language. When Twilio sends a prompt message to your application, the lang will include the detected language. When using multi, lang will only include the primary language tag in the BCP-47, for example "lang"="en" not "lang"="en-US".

When using multi for STT, the transcriptionProvider must be Deepgram and the speechModel must be nova-2-general or nova-3-general.

If you want Twilio to detect the language sent in the text token message from your app for TTS, you can specify multi as the active TTS language for the session. See Setting the text-to-speech language for setting the TTS language. If you specify multi as the lang in the text token message to Twilio, ElevenLabs will detect the language from the token and use that language for TTS.

When using multi for TTS, the ttsProvider must be ElevenLabs.

Other defaults





ConversationRelay generally uses default values when you don't specify a speech model, voice, or provider. For example, if you set the ttsProvider attribute without the voice attribute, the system uses a default voice for that text-to-speech provider.

ConversationRelay sends an error message to your app and disconnects the call when you've specified an invalid combination of transcriptionProvider and speechModel or of ttsProvider and voice.

Result of TwiML execution





<Connect> action URL callback





When an action URL is specified in the <Connect> verb, ConversationRelay will make a request to that URL when the <Connect> verb ends. The request includes call information and session details.

Example payloads

Session ended by application example



Copy code block
{
  "AccountSid": "AC00000000000000000000000000000000",
  "CallSid": "CA00000000000000000000000000000000",
  "CallStatus": "in-progress",
  "From": "client:caller",
  "To": "test:conversationrelay",
  "Direction": "inbound",
  "ApplicationSid": "AP00000000000000000000000000000000",
  "SessionId": "VX00000000000000000000000000000000",
  "SessionStatus": "ended",
  "SessionDuration": "25",
  "HandoffData": "{\"reason\": \"The caller requested to talk to a real person\"}"
}
Error occurred during session example



Copy code block
{
  "AccountSid": "AC00000000000000000000000000000000",
  "CallSid": "CA00000000000000000000000000000000",
  "CallStatus": "in-progress",
  "From": "client:caller",
  "To": "test:conversationrelay",
  "Direction": "inbound",
  "ApplicationSid": "AP00000000000000000000000000000000",
  "SessionId": "VX00000000000000000000000000000000",
  "SessionStatus": "failed",
  "SessionDuration": "10",
  "ErrorCode": "39001",
  "ErrorMessage": "Network connection to WebSocket server failed."
}
Session completed normally (caller hung up) example



Copy code block
{
  "AccountSid": "AC00000000000000000000000000000000",
  "CallSid": "CA00000000000000000000000000000000",
  "CallStatus": "completed",
  "From": "client:caller",
  "To": "test:conversationrelay",
  "Direction": "inbound",
  "ApplicationSid": "AP00000000000000000000000000000000",
  "SessionId": "VX00000000000000000000000000000000",
  "SessionStatus": "completed",
  "SessionDuration": "35"
}
Hints





Use the hints attribute of <ConversationRelay> to help accurately transcribe phrases that may appear in the speech. Hints could include brand names, industry-specific terms, or other expressions that you think the call is likely to contain. Adding a phrase to hints could increase the likelihood that it will be recognized by your speech-to-text provider. Separate each hint with a comma and capitalize proper nouns (like brand names) in the way that they're normally written.

Example







Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <ConversationRelay url="wss://YOUR_SERVER_URL" 
      interruptible="true" 
      welcomeGreeting="Hi! How can I help you today?"
      hints="TwiML,ConversationRelay,JavaScript,XML,Code Exchange"
      >
    <!-- other elements -->
    </ConversationRelay>
  </Connect>
</Response>
AI nutrition facts





ConversationRelay, including the <ConversationRelay> TwiML nouns and APIs, use artificial intelligence or machine learning technologies.

Our AI Nutrition Facts for ConversationRelay

 provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. The below AI Nutrition Label details the ConversationRelay AI qualities. For more information and the glossary regarding the AI Nutrition Facts Label, refer to our AI Nutrition Facts page

.

Deepgram AI nutrition facts





AI Nutrition Facts
ConversationRelay (STT and TTS) - Programmable Voice - Deepgram
Description
Generate speech to text in real-time through a WebSocket API in Programmable Voice.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Automatic Speech Recognition
Base Model
Deepgram Nova2
Trust Ingredients
Base Model Trained with Customer Data
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Customer Data is Shared with Model Vendor
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Training Data Anonymized
N/A
Base Model is not trained using any Customer Data.
Data Deletion
N/A
Customer Data is not stored or retained in the Base Model.
Human in the Loop
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Data Retention
N/A
Compliance
Logging & Auditing
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Guardrails
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Input/Output Consistency
Yes
Customer is responsible for human review.
Other Resources
Learn more about this label at nutrition-facts.ai
Learn more about this label at nutrition-facts.ai

Google AI nutrition facts





AI Nutrition Facts
ConversationRelay (STT and TTS) - Programmable Voice - Google AI
Description
Generate speech to text in real-time and convert text into natural-sounding speech through a WebSocket API in Programmable Voice.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Generative and Predictive - Automatic Speech Recognition and Text-to-Speech
Base Model
Google Speech-to-Text; Google Text-to-Speech
Trust Ingredients
Base Model Trained with Customer Data
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Customer Data is Shared with Model Vendor
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Training Data Anonymized
N/A
Base Model is not trained using any Customer Data.
Data Deletion
N/A
Customer Data is not stored or retained in the Base Model.
Human in the Loop
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Data Retention
N/A
Compliance
Logging & Auditing
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Guardrails
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Input/Output Consistency
Yes
Customer is responsible for human review.
Other Resources
Learn more about this label at nutrition-facts.ai
Learn more about this label at nutrition-facts.ai

Amazon AI nutrition facts





AI Nutrition Facts
ConversationRelay (STT and TTS) - Programmable Voice - Amazon AI
Description
Convert text into natural sounding speech through a websocket API in Programmable Voice.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Generative and Predictive
Base Model
Amazon Polly Text-to-Speech
Trust Ingredients
Base Model Trained with Customer Data
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Customer Data is Shared with Model Vendor
No
ConversationRelay uses the Default Base Model provided by the Model Vendor. The Base Model is not trained using Customer Data.
Training Data Anonymized
N/A
Base Model is not trained using any Customer Data.
Data Deletion
N/A
Customer Data is not stored or retained in the Base Model.
Human in the Loop
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Data Retention
N/A
Compliance
Logging & Auditing
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Guardrails
Yes
Customer can view and listen to the input and output in the customer's own terminal.
Input/Output Consistency
Yes
Customer is responsible for human review.
Other Resources
Learn more about this label at nutrition-facts.ai
Learn more about this label at nutrition-facts.ai

ElevenLabs nutrition facts





AI Nutrition Facts
ConversationRelay (STT and TTS) - Programmable Voice - ElevenLabs
Description
Convert text into a human-sounding voice using speech synthesis technology from ElevenLabs.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Predictive
Base Model
ElevenLabs Text-To-Speech: Flash 2 and Flash 2.5
Trust Ingredients
Base Model Trained with Customer Data
No
The Base Model is not trained using any Customer Data.
Customer Data is Shared with Model Vendor
No
Programmable Voice uses the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data.
Training Data Anonymized
N/A
Base Model is not trained using any Customer Data.
Data Deletion
N/A
The Base Model is not trained using any Customer Data.
Human in the Loop
Yes
Customers can view text input and listen to the audio output.
Data Retention
Customer can review TwiML logs, including <Say> Logs, to debug and troubleshoot for up to 30 days.
Compliance
Logging & Auditing
Yes
Customers can view text input and listen to the audio output.
Guardrails
Yes
Customers can view text input and listen to the audio output.
Input/Output Consistency
Yes
Customer is responsible for human review.
Other Resources
Learn more about this label at nutrition-facts.ai
Learn more about this label at nutrition-facts.ai