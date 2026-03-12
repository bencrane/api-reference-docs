# TwiML™ Voice: <Gather>

Overview





To collect input during a call, use the <Gather> verb in the TwiML language. This input could include speech, digits pressed on the keypad, or both.


(information)
Speech-to-text provider changes
Between March and June 2025, Twilio is updating the speech models for <Gather> speech-to-text (STT) in waves. If you don't want to change your existing <Gather> speech models, contact support. This update offers you three choices for STT:

Set no speechModel.
Set a generic speechModel and language.
Set a specific STT provider and speech model.
If you don't select a specific STT provider and speech model, Twilio takes the following actions:

Selects the speech-to-text provider and speech model for <Gather>.
Handles failover to an available STT provider should STT provider have an outage.
If you need pricing information, consult Programmable Voice Pricing.
To implement <Gather>, you can try either of the following.

Send a plain TwiML document to Twilio using curl or an API application. At a minimum, nest the <Gather> verb inside the <Response> in the TwiML document. The following example shows this TwiML document.


Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather/>
</Response>
Add a Twilio SDK to your programming language of choice and generate TwiML from your web application.
<Gather> example





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.gather();

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/simple_gather.xml -->
<Response>
    <Gather/>
</Response>
When Twilio executes the instructions in the preceding TwiML document, it performs the <Gather> using the default attribute values.

Twilio pauses and waits for the caller to enter digits on their keypad. At this point, the caller can make one of two choices:

Choice	Caller action	Twilio action
1	Enter digits then the # symbol on the keypad.	Twilio sends these digits as a parameter of a POST request to the URL that hosts this <Gather> TwiML.
2	Do nothing and wait for 5 seconds to pass.	The request includes no more verbs, so Twilio ends the call.
The generic <Gather> TwiML document lacks some capabilities. To expand on what <Gather> can do, you need to add attributes, nest other verbs, or both.

To learn how to customize the <Gather> verb, consult its list of attributes.
To learn how Twilio can read some text or play music for your caller while waiting for their input, consult "Nest other verbs".
<Gather> attributes





The <Gather> verb supports the following attributes. Though this verb requires none of these attributes, including the action attribute prevents undesired looping behavior. A <Gather> tag can include zero or more attributes.

Attribute name	Accepted values	Default value
action	URL (relative or absolute)	current document URL
actionOnEmptyResult	true, false	false
enhanced	true, false
Limited to the phone_call model in Google STT V1.	false
finishOnKey	0-9, #, *, and '' (the empty string)	#
hints	"words, phrases that have many words". Supported class tokens or keywords vary according to your provider and version.	none
input	dtmf, speech, dtmf speech	dtmf
language	Supported languages depend on your chosen speechModel: Google STT V1, Google STT V2

, or Deepgram

.	en-US
method	GET, POST	POST
numDigits	positive integer	unlimited
partialResultCallback	URL (relative or absolute)	none
partialResultCallbackMethod	GET, POST	POST
profanityFilter	true, false	true
speechModel	Generic: default, numbers_and_commands, phone_call, experimental_conversations, experimental_utterances

Google STT V2: googlev2_long, googlev2_short, googlev2_telephony, googlev2_telephony_short

Deepgram: Any	default
speechTimeout	positive integer or auto	timeout value
timeout	positive integer	5
action





When the <Gather> verb ends, if Twilio has received any input from the caller, Twilio sends an HTTP request to this URL. The current call continues using the TwiML document returned from the action URL. If the caller didn't enter any digits or speech, the call flow in the original TwiML document continues, unless actionOnEmptyResult is set to true.

Necessity	Accepted values	Default value
Recommended	Relative or absolute URL	current document URL
If you omit this attribute, Twilio calls the TwiML document making the request. This might lead to unwanted looping behavior.

This request includes Twilio's standard request parameters and the additional parameters below depending on the input received:

If you gathered digits from the caller, Twilio includes the Digits attribute containing the numbers your caller entered.
If you included speech as an input value, Twilio includes SpeechResult and Confidence parameters:
SpeechResult contains the transcribed result of your caller's speech.
Confidence contains a confidence score between 0.0 and 1.0. A higher confidence score means the potential for greater accuracy of the transcription.
Note: Your code shouldn't expect confidence as a required field. Twilio doesn't guarantee its accuracy or presence in any of the results.


(warning)
Warning
If you started or updated a <Call> that included a twiml parameter, the action URLs for <Record>, <Gather>, and <Pay> must be absolute.

The Call Resource API Docs have language-specific examples of creating and updating Calls with TwiML:

To learn how to create a call with a twiml parameter, consult Create a Call Resource.
To learn how to update a call with a twiml parameter, consult Update a Call Resource.
Example 1: <Gather> using default values

You are hosting the following TwiML document at http://example.com/complex_gather.xml.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather>
        <Say>
            Please enter your account number,
            followed by the pound sign
        </Say>
    </Gather>
    <Say>We didn't receive any input. Goodbye!</Say>
</Response>
This TwiML document can follow one of three scenarios:

Scenario	Caller actions	Twilio actions
1	Doesn't press the keypad for five seconds, or enters # before entering any other digits	Says "We didn't receive any input. Goodbye!"
2	Enters a digit while the call says "Please enter your account number..."	<Gather> verb stops speaking. It waits for the caller's action.
3	Enters 12345 then presses #, or allows 5 seconds to pass	Submits the digits and request attribute values to the URL of this TwiML document (http://example.com/complex_gather.xml). Twilio fetches this TwiML document again and executes it. The caller gets stuck in a loop.
To avoid scenario 3, point your action URL to a different URL that hosts a different TwiML document. This new TwiML document handles the remainder of the call.

Example 2: <Gather> using action and method attributes

The following code example adds the action and method attributes to the previous TwiML document.

Complex <Gather> with action and method attributes and nested <Say>





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
const gather = response.gather({
    action: '/process_gather.php',
    method: 'GET'
});
gather.say('Please enter your account number,\nfollowed by the pound sign');
response.say('We didn\'t receive any input. Goodbye!');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/complex_gather.xml -->
<Response>
    <Gather action="/process_gather.php" method="GET">
        <Say>
            Please enter your account number,
            followed by the pound sign
        </Say>
    </Gather>
    <Say>We didn't receive any input. Goodbye!</Say>
</Response>
When the caller enters their input, Twilio sends the request parameters, including the digits, to the /process_gather.php URL.

You can have Twilio read back this input to the caller. To do so, your code /process_gather.php should resemble the following.



Copy code block
<?php
// page located at http://yourserver/process_gather.php
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<Response><Say>You entered " . $_REQUEST['Digits'] . "</Say></Response>";
?>
Return to attributes list

actionOnEmptyResult





The actionOnEmptyResult attribute requires <Gather> to send a webhook, either to the specified action URL or, if action is not set, to the requesting TwiML document, regardless of whether input is received. By default, if <Gather> times out while waiting for input, it continues to the next TwiML instruction.

Necessity	Accepted values	Default value
Optional	true, false	false
Example 1: When <Gather> times out, <Say> executes

In the following TwiML, when <Gather> times out without input, Twilio executes the second <Say> instruction.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather>
        <Say>
            Please enter your account number,
            followed by the pound sign
        </Say>
    </Gather>
    <Say>We didn't receive any input. Goodbye!</Say>
</Response>
Example 2: Force a webhook for a <Gather> action

To force <Gather> to send a webhook to the action URL, write a TwiML document that resembles the following.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather actionOnEmptyResult="true" action="/gather-action">
        <Say>
            Please enter your account number,
            followed by the pound sign
        </Say>
    </Gather>
</Response>
finishOnKey





The finishOnKey attribute specifies the value that your caller presses to submit their digits.

Necessity	Accepted values	Default value
Optional	#, *, single digits 0-9, an empty string ('')	#, the hash or pound sign
If you set this attribute to an empty string, <Gather> captures all caller input. After the call reaches its timeout, Twilio submits the caller's digits to the action URL.

Example 1: Successful <Gather> workflow with finishOnKey set

You set the finishOnKey attribute to a value of #.
When your app is running, your caller enters 1234#.
After the caller presses #, Twilio stops waiting for more input.
Twilio submits Digits=1234 to your action URL. The request doesn't include the #.
Example 2: Failed <Gather> workflow with finishOnKey set

Consider the following TwiML document. In this example, finishOnKey never works, because you never inform the caller to press it.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech dtmf" finishOnKey="#" timeout="5">
    <Say>
      Please say something or press * to access the main menu
    </Say>
  </Gather>
  <Say>We didn't receive any input. Goodbye!</Say>
</Response>
Return to attributes list

hints





The hints attribute specifies a list of words or phrases that Twilio should expect during recognition. Adding hints to your <Gather> improves Twilio's recognition.

Necessity	Accepted values	Default value
Optional	comma-separated list of up to 500 entries	
Entries contain either single words or phrases. Each entry can up to 100 characters in length. Separate each word in a phrase with a space.

Example: hints attribute with four entries

The following example includes four entries as two single words and two phrases.



Copy code block
hints="this is a phrase I expect to hear, keyword, product name, name"
To learn which tokens and keywords your STT provider supports, click the tab for your provider.

Google STT V2
Deepgram
Twilio implemented Google's gV2tokens

 class tokens list.

To add a hint, pass a class token.



Copy code block
hints="$OOV_CLASS_ALPHANUMERIC_SEQUENCE"
Developer using Google STT V1 can use tokens from the gV1tokens

 class tokens list.

Return to attributes list

input





The input attribute specifies which types of input Twilio accepts. The types include dual-tone multi-frequency (DTMF), speech, or both.

Necessity	Accepted values	Default value
Optional	dtmf, speech, dtmf speech	dtmf
Considerations

When this attribute value includes speech, Twilio gathers speech from the caller for a maximum duration of 60 seconds. <Gather> doesn't recognize speaking individual alphanumeric characters like "ABC123".
When you set this attribute value to dtmf speech, Twilio gives precedence to the first input it detects. If Twilio detects speech first, it ignores the finishOnKey attribute.
Example: Accept speech input from caller

The following code example shows a <Gather> that specifies speech input from the caller.

When this TwiML executes, the caller hears the <Say> prompt.
Twilio collects speech input for up to 60 seconds.
Once the caller stops speaking for five seconds, Twilio posts their transcribed speech to your action URL.
Gather speech





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
const gather = response.gather({
    input: 'speech',
    action: '/completed'
});
gather.say('Welcome to Twilio, please tell us why you\'re calling');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/simple_gather.xml -->
<Response>
    <Gather input="speech" action="/completed">
           <Say>Welcome to Twilio, please tell us why you're calling</Say>
        </Gather>
</Response>
Return to attributes list

language





The language attribute specifies the language Twilio should recognize from your caller.

Necessity	Accepted values	Default value
Optional	any value the STT provider supports	en-US
Considerations

This attribute passes through unchanged to the provider.
This attribute value maps to specific languages in the related speechModel.
Google STT V2 models map to the languages specified in its Speech-to-Text V2 supported languages guide

.
Deepgram models map to the languages specified in its Models & Languages Overview guide

.
Google STT V1 models map to any language Twilio supports. Twilio has deprecated Google STT V1 as a language model.
Return to attributes list

method





The method attribute specifies the HTTP verb Twilio should use to request your action URL.

Necessity	Accepted values	Default value
Optional	GET, POST	POST
Return to attributes list

numDigits





The numDigits attribute specifies how many digits you require from callers for this <Gather> instance for DTMF input.

Necessity	Accepted values	Default value
Optional	any positive integer	
Example: Submit data once caller enters numDigits

Twilio asks the caller for their US ZIP Code. The developer expects the value to contain five digits, so they set numDigits="5". Once the caller enters the final digit of 94117, Twilio submits the data to your action URL.

Return to attributes list

partialResultCallback





The partialResultCallback attribute specifies a URL to which Twilio sends requests as it recognizes speech in real time. These requests contain a parameter labeled UnstableSpeechResult which contains partial transcriptions. These transcriptions may change as the speech recognition progresses.

Necessity	Accepted values	Default value
Optional	comma-separated list of up to 500 entries	
The Twilio makes asynchronous webhooks to your partialResultCallback URL. They don't accept any TwiML documents in response. To take more actions based on this partial result, use the REST API to modify the call.

Return to attributes list

partialResultCallbackMethod





The partialResultCallbackMethod attribute specifies the HTTP verb Twilio should use to request your partialResultCallback URL.

Necessity	Accepted values	Default value
Optional	GET, POST	POST
Return to attributes list

profanityFilter





The profanityFilter attribute specifies whether Twilio filters profanity in your speech transcription. Currently, profanityFilter is not supported with the numbers_and_commands generic speech model or with generic models set to Latin American Spanish (all Spanish varieties other than es-ES), Vietnamese, or Swiss German (de-CH).

Necessity	Accepted values	Default value
Optional	true, false	true
When set to true, Twilio replaces all but the initial character in each filtered profane word with asterisks like f***.

Return to attributes list

speechModel





The speechModel attribute specifies which language model to apply to your <Gather> request.

Necessity	Accepted values	Default value
Optional	default, numbers_and_commands, phone_call, experimental_conversations, experimental_utterances, googlev2_long, googlev2_short, googlev2_telephony, googlev2_telephony_short, deepgram_nova-2, deepgram_nova-3	default
Considerations

This attribute requires you to set speechTimeout to a positive integer value. Don't use auto.
If Twilio selects your language model, it can handle failover to another provider. In practice, if Google experiences a failure, Twilio switches STT to Deepgram without any action on your part.
If you want to select the model, you can choose either a generic model or a specific STT model.
Generic speech-to-text models

Generic models include the following values:

Model	Supported languages
default	Any supported here

; see Footnote 1 below
phone_call	en-US, en-GB, en-AU, fr-FR, fr-CA, ja-JP, ru-RU, es-US, es-ES, pt-BR
numbers_and_commands	Use any language supported by Deepgram's nova-2 model, as listed in their
documentation

.	
experimental_conversations	ar-*, da-DK, de-DE, en-AU, en-GB, en-IN, en-US, es-ES, es-US, fi-FI, fr-CA, fr-FR, hi-IN, ja-JP, ko-KR, mk-MK, nl-NL, no-NO, pl-PL, pt-BR, pt-PT, ro-RO, ru-RU, th-TH, tr-TR, uk-UA, vi-VN
experimental_utterances	ar-*, da-DK, de-DE, en-AU, en-GB, en-IN, en-US, es-ES, es-US, fi-FI, fr-CA, fr-FR, hi-IN, ja-JP, ko-KR, mk-MK, nl-NL, no-NO, pl-PL, pt-BR, pt-PT, ro-RO, ru-RU, th-TH, tr-TR, uk-UA, vi-VN
Experimental generic speech-to-text models

These models are now generally available (GA), but Twilio retains the "experimental" naming for backward compatibility with customer applications. Previously, "experimental" models provided access to advanced speech technology and machine learning research, offering higher accuracy in some use cases. Twilio now maps these models to the short and long models of various providers, based on best fit.

Model	Use Case	Example
experimental_utterances	short utterances of a few seconds in length like commands or other single word directed speech	"press 0 or say 'support' to speak with an agent."
experimental_conversations	spontaneous speech and conversations	"tell us why you're calling today."
Specific speech-to-text models

Specific STT models include a variety from Google Speech-to-Text (STT) V2 (googlev2) or Deepgram (deepgram). If the provider has an outage, Twilio doesn't switch providers on your behalf. The following tabs display the accepted model values for each STT provider.

Google STT V2
Deepgram
This attribute expresses its value in the format of googlev2_{model}.

This attribute accepts the following values for Google STT V2 models:

googlev2_long
googlev2_short
googlev2_telephony
googlev2_telephony_short


Copy code block
<Gather input="speech" speechModel="googlev2_telephony">
  <Say>Please tell us why you're calling.</Say>
</Gather>
If Twilio doesn't support your required combination of language and model, it generates an error notification, and the gather fails. To learn why the configuration didn't work, review the notification.

To learn which languages and models that Google STT V2 supports, consult Google's documentation on Speech-to-Text V2 supported languages

.

To improve the accuracy of your speech to text recognition, set this attribute value to the specific language model best suited for your use case.

To find which works model best for your use case, consider exploring all options.

Return to attributes list

speechTimeout





The speechTimeout specifies how long Twilio should wait after a pause in speech before stopping recognition.

Necessity	Accepted values	Default value
Optional	positive integer or auto	timeout value
Considerations

If you set speechTimeout to auto, Twilio stops recognizing speech at the first pause in speech.
This attribute expresses its value in seconds.
After the pause reaches this timeout, Twilio sends the speechResult to your action URL.
If your <Gather> request includes both timeout and speechTimeout, timeout takes precedence for DTMF input and speechTimeout takes precedence for speech.
Return to attributes list

timeout





The timeout attribute specifies how long Twilio should wait for the caller provide input on the call. This includes either pressing another digit or saying another word.

Necessity	Accepted values	Default value
Optional	positive integer or auto	5
Considerations

This attribute expresses its value in seconds.
Before Twilio begins the timeout period, it waits until all nested verbs have executed.
After the pause reaches this timeout, Twilio sends the speechResult to your action URL.
Example: Use timeout with <Gather> in a TwiML document

Consider the following TwiML document. Before submitting the caller's data, Twilio waits three seconds for the caller. This pause gives the caller time to either press another key or say another word.



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech dtmf" timeout="3" numDigits="1">
        <Say>Please press 1 or say sales for sales.</Say>
    </Gather>
</Response>
Return to attributes list

enhanced (Deprecated)





The enhanced attribute specifies that <Gather> should use the premium Google STT V1 model. When transcribing phone conversations, the premium model produces 54% fewer errors compared to the base model.

Necessity	Accepted values	Default value
Deprecated	true, false	false
This attribute has the following limitations:

Applies to only Google STT V1 phone_call model. Twilio ignores the enhanced attribute when set for any other model.
Applies to the following languages: en-GB, en-US, es-ES, es-US, fr-CH, fr-FR, ja-JP, ru-RU.
The following TwiML document uses the premium phone_call model for <Gather>:



Copy code block
<Gather input="speech" enhanced="true" speechModel="phone_call" language="en-GB">
  <Say>Please tell us why you're calling.</Say>
</Gather>
Return to attributes list

Nest other verbs





You can nest the following verbs within <Gather>:

<Pause>
<Play>
<Say>
<Say>





When a <Gather> contains nested <Say> or <Play> verbs, the timeout begins either after the audio completes or when the caller presses their first key. If <Gather> contains multiple <Play> verbs, Twilio retrieves the contents of all files before the <Play> begins.

Example: <Gather> with a nested <Say>

This example shows a <Gather> with a nested <Say>. This TwiML document reads some text to the caller and can accept input from the caller at any time.

Gather speech or DTMF with nested <Say>





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
const gather = response.gather({
    input: 'speech dtmf',
    timeout: 3,
    numDigits: 1
});
gather.say('Please press 1 or say sales for sales.');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Gather input="speech dtmf" timeout="3" numDigits="1">
        <Say>Please press 1 or say sales for sales.</Say>
    </Gather>
</Response>
Cache static media for <Play> verbs





If you use <Play> verbs, consider hosting your media in AWS S3 in the us-east-1, eu-west-1, or ap-southeast-2 regions, depending on the Twilio Region you use. No matter where you host your media files, verify your Cache Control headers. Twilio uses a caching proxy in its webhook pipeline and caches media files with cache headers. Serving media from Twilio's cache can take 10 ms or less. Because Twilio runs a fleet of caching proxies, it may take multiple requests before all proxies have a copy of your file in cache. Twilio does not recommend using an .mp3 file for a nested <Play>. Use a .wav file instead, as transcoding .mp3 files can add delay.

Manage timeouts





When a <Gather> reaches its timeout without any caller input, call control falls to the next verb in your original TwiML document, unless actionOnEmptyResult is set to true.

Example: Include a <Redirect> after <Gather>

To send a request to a URL other than your action URL if <Gather> times out without input, include a <Redirect> after the <Gather>.

<Redirect> after <Gather>





Report code block


Copy code block
const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
const gather = response.gather({
    action: '/process_gather.php',
    method: 'GET'
});
gather.say('Enter something, or not');
response.redirect({
    method: 'GET'
}, '/process_gather.php?Digits=TIMEOUT');

console.log(response.toString());
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/gather_hints.xml -->
<Response>
    <Gather action="/process_gather.php" method="GET">
        <Say>Enter something, or not</Say>
    </Gather>
    <Redirect method="GET">
        /process_gather.php?Digits=TIMEOUT
    </Redirect>
</Response>
With this code, Twilio moves to the next verb in the TwiML document (<Redirect>) when <Gather> times out without input. In this example, Twilio makes a new GET request to /process_gather.php?Digits=TIMEOUT.

Troubleshooting





You might face a few common issues when working with <Gather>:

Problem	Solution
<Gather> doesn't receive caller input from callers who use a VoIP phone.	Some VoIP phones have trouble sending DTMF digits. These phones may use compressed bandwidth-conserving audio protocols. These interfere with the transmission of the digit's signal. Consult your phone's documentation on DTMF problems.
Twilio doesn't send the Digits parameter to your <Gather> URL.	Make sure your application doesn't respond to the action URL with an HTTP 3xx redirect. Twilio follows this redirect, but won't resend the Digits parameter.
Language appendix (deprecated)





This table applied only to Google v1 STT APIs used with Gather 1.0, which is being phased out as customers are migrated to Gather 2.0. Currently supported languages are listed in the generic speech to text models section

and, by provider, in the specific speech models section

. Gather 1.0-available languages are listed below and in this .csv file

.

Note: Language=multi- is only available in Gather 2.0 via the deepgram_nova-3 specific speech model