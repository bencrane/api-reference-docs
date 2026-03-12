TwiML™ Voice: <Say>





(warning)
Legal notice
<Say> and Text-to-Speech (TTS), including the <Say> TwiML verb and API, uses artificial intelligence or machine learning technologies. By enabling or using any features or functionalities within Programmable Voice that Twilio identifies as using artificial intelligence or machine learning technology, you acknowledge and agree to certain terms. Your use of these features or functionalities is subject to the terms of the Predictive and Generative AI or ML Features Addendum

.

Availability of voices

Some features and voices, including third-party voices, in <Say> and Text-to-Speech may be available as alpha, beta, not generally available, limited release, or preview (collectively "Beta"), and information contained in this document is subject to change. This means that some features aren't yet implemented, and others may change before the product becomes Generally Available. Beta products aren't covered by a Twilio Service Level Agreement

.

Use of third-party voices

Third-party voices may change without prior notice. Although Twilio provides access to these third-party voices, control and updates are managed by the third-party vendors. These changes include, but are not limited to, new models that affect how voices sound or the removal of voices from their offering with or without alternative or automatic redirections. For the most up to date technical information regarding such third-party voice functionality, consult the applicable third-party voice vendor product documentation.

Google Text-to-Speech documentation

Amazon Text-to-Speech documentation

The <Say> verb allows your application to programmatically speak dynamic text over a call or conference using Text-to-Speech (TTS) capabilities. <Say> offers different options for voices, each of which has its own supported set of languages, accents, and genders, so you can configure your TwiML according to your needs and preferences.

When Twilio executes <Say>, it synthesizes speech for the text between <Say>'s opening and closing tags.

In the following TwiML sample, Twilio converts plain text to synthesized speech, saying "Hello!" on a voice call.

<Say> using default values





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
response.say('Hello!')

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Hello!</Say>
</Response>
<Say> attributes





The <Say> verb supports the following attributes that modify its behavior:

Attribute	Accepted Values	Default Value
language	Any supported language, e.g. en-UK	en-US (English with United States locale)
voice	
man
woman
Any of the Twilio-supported Amazon Polly Voices. For example, Polly.Joanna-Generative.
Any of the Twilio-supported Google Voices. For example, Google.en-US-Chirp3-HD-Aoede.
man
loop	Any positive integer or zero, e.g. 4	1

(warning)
Warning
Using an invalid combination of voice and language may result in error and <Say> instruction failure. Review the Text-to-Speech page to ensure correct configuration and use of accepted values for voice and language attributes.
language





<Say>'s language attribute allows you to specify the language and locale for the synthesized voice. For example, en-US for English spoken in the United States.

Accepted values for the language attribute of the <Say> verb are comprised of a lowercase language abbreviation and an uppercase locale abbreviation. As an example, the value fr-CA indicates fr the French language and CA indicates the locale, Canada.

To review available languages and locales, consult the "Available voices and languages" section of the Text-to-Speech page. Use the value from the Language code column as the value of your language attribute, like language="en-UK".


(information)
Info
If you use both the language and voice attributes, check that the voice value works with the language. Combinations of voice and language not listed as available may result in an error and <Say> instruction failure.
<Say> using language attribute





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
response.say('Bonjour!', language='fr-FR')

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="fr-FR">Bonjour!</Say>
</Response>
voice





<Say>'s voice attribute allows you to specify the synthesized voice to use when speaking the text, e.g. Polly.Joanna-Generative or Google.en-US-Chirp3-HD-Aoede.

Twilio offers three types of synthesized voices based on technology: Basic, Standard, and Neural.

Twilio provides Basic voices at no cost. These voices accept voice attribute values of man or woman.
Amazon Polly and Google provide Standard, Neural and Generative voices.
To review available voices, consult the "Available voices and languages" section of the Text-to-Speech page.

Accepted values for the voice attribute of the <Say> verb are comprised of a voice from the Voice column and its corresponding provider from the Provider column used as prefix, like Polly.Joanna-Generative or Google.en-US-Chirp3-HD-Aoede.

The default value for voice depends on your account-level Text-to-Speech settings. You find these settings in your Console

 under Develop > Voice > Settings > Text-to-speech.

To override the default Text-to-Speech settings in your account, set the voice attribute for a specific <Say> instruction.

<Say> using voice attribute





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
response.say(
    'Bonjour! Je m\'appelle Mathieu.', voice='Polly.Mathieu', language='fr-FR')

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Mathieu" language="fr-FR">Bonjour! Je m'appelle Mathieu.</Say>
</Response>
loop





<Say>'s loop attribute specifies how many times you'd like the text to be repeated. The default is once (1).

Specifying 0 will cause the <Say> verb to loop until either the call is hung up or 1,000 iterations are performed.

<Say> using loop attribute





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
response.say('Hello!', loop=2)

print(response)
Output


Copy output
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say loop="2">Hello!</Say>
</Response>
Hints and advanced uses





Synthesized speech may pronounce numbers, dates, times, and amounts in an unnatural or incorrect way. Always verify that the generated speech sounds as you expect. You can also use SSML tags to adjust the pronunciation.
Numbers written without spaces are pronounced as a whole number, e.g. <Say>12345</Say> is spoken as "twelve thousand, three hundred forty-five".
Numbers separated by spaces are pronounced as individual numbers, e.g. <Say>1 2 3 4 5</Say> is spoken as "one two three four five."
Commas and periods in synthesized speech are interpreted as natural pauses.
If you want to insert a long pause, try using the <Pause> verb. <Pause> should be placed outside <Say> tags, not nested inside them.
Limits





There is a character limit on the text that <Say> can process, which varies depending on the Text-to-Speech option used. Consult "Limits" section of the Text-to-Speech page for more information.

AI Nutrition Facts





Consult AI Nutrition Facts for Programmable Voice - Text-to-Speech (TTS).