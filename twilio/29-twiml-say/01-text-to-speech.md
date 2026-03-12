Text-to-Speech (TTS)





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

Text-to-Speech (TTS), also known as speech synthesis, converts text into a human-sounding voice. To turn traditional human-to-human interactions into seamless, machine-to-human interactions, developers and business users use TTS.

This replaces recording audio files with human voices to play back in a call. With TTS, you can generate prompts from raw text to respond to events in your application. Regardless of use case, TTS can deliver information over a phone call with greater efficiency.

Get Started with Text-to-Speech





When you provide text, Twilio synthesizes speech in real time and speaks the audio in any call. You can use TTS in TwiML and Twilio Studio.

Use TwiML





To provide plain text that Twilio converts to synthesized speech, use the <Say> verb.


(information)
TwiML Hello World example
When Twilio executes the following TwiML during a call, the caller hears "Hello world!" The synthesized voice the caller hears is the default voice and language of the Twilio Account (configured in the Twilio Console).



Copy code block
<Response>
   <Say>Hello world!</Say>
</Response>
Use the language and voice attributes of the <Say> verb to modify the language, accent, and voice of the synthesized speech.

(information)
Amazon Polly Johanna voice and American English language example
The following TwiML uses Amazon Polly's "Joanna" voice and American English:



Copy code block
<Response>
   <Say language="en-US" voice="Polly.Joanna">Hello. I am Joanna and I speak American English!</Say>
</Response>
<Say> offers different options for voices. Each option offers its own supported set of languages and genders. To customize your application to your needs and preferences, use the Text-to-Speech capabilities.

To start using Text-to-Speech, complete the following steps:

Configure your account-wide text-to-speech Settings

 in the Twilio Console.
Define TTS instructions in a TwiML document with <Say>.
Use Twilio Studio





To design and build applications with little or no code, use Twilio Studio. Studio uses Widgets to represent Twilio's features and functionality.

To add Text-to-Speech capabilities to your application, add the Say/Play Widget.

Configure your account-wide Text-to-Speech settings

 in the Twilio Console.
To include TTS in your Studio Flow, add the Say/Play Widget.
Text-to-Speech voices





You can choose from four types of Twilio Text-to-Speech: Basic, Standard, Neural and Generative. These types differ in their support of the following parameters:

technology used
languages and locales supported
quality of conversation employed
pricing offered
Basic voices





These voices help you learn Text-to-Speech capabilities using <Say>. Don't use them for production applications. These voices lack enough human-like qualities for voice call conversation. Due to their limited purpose, these voices support few languages, but Twilio provides them at no additional cost.

Standard voices





These voices use standard technology in synthesized speech, and produce natural-sounding lifelike voices but might have limited human speech patterns and inflections. These voices speak using Amazon Polly

 and Google Standard

 voices.

Neural voices





These voices use enhanced technology in synthesized speech. They produce higher-quality and more natural-sounding voices than Standard voices. These voices speak using Amazon Polly Neural

 and Google WaveNet

 and Neural2

 voices.

Generative voices






(new)
Public Beta
Generative voices are currently available as a Public Beta product and information contained in this document is subject to change. This means that some of the features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio Service Level Agreement

.
These voices are powered by the latest technology and innovation in synthesized speech to offer the most human-like, emotionally engaged and adaptive context-aware voices by "interpreting" the text-input and adjust speech accordingly (e.g. render context-dependent prosody, tone, emotion, pausing, spelling, dialectal properties, foreign word pronunciation, etc). These synthetic voices are remarkably similar to a human voice, and make them the optimal option for Conversational AI applications and Virtual Agents

. These voices speak using Amazon Polly Generative

 and Google Chirp3-HD

 voices.

Available voices and languages





The following table contains all voices available for each language and locale. You can test the different voices on the Text-to-Speech page

 in the Twilio Console.


(information)
Specify a voice for <Say>
Accepted values for the voice attribute of the <Say> verb are comprised of a voice from the Voice column and its corresponding provider from the Provider column used as prefix, like Polly.Joanna-Generative or Google.en-US-Chirp3-HD-Aoede.

(information)
Specify a voice for <ConversationRelay>
Accepted values for the voice attribute of <ConversationRelay> is a voice from the Voice column (without provider used as prefix), like Joanna-Generative or en-US-Chirp3-HD-Aoede.
Language (Locale)


Type


Gender


Provider


Language (Locale)	Language code	Type	Gender	Provider	Voice
Afrikaans (South Africa)
af-ZA
Standard
Female
Google
af-ZA-Standard-A
Arabic (Gulf)
ar-AE
Neural
Female
Polly
Hala-Neural *
Arabic (Gulf)
ar-AE
Neural
Male
Polly
Zayd-Neural *
Arabic (Standard)
ar-XA
Generative
Female
Google
ar-XA-Chirp3-HD-Aoede
Arabic (Standard)
ar-XA
Generative
Male
Google
ar-XA-Chirp3-HD-Charon
Arabic (Standard)
ar-XA
Generative
Male
Google
ar-XA-Chirp3-HD-Fenrir
Arabic (Standard)
ar-XA
Generative
Female
Google
ar-XA-Chirp3-HD-Kore
Arabic (Standard)
ar-XA
Generative
Female
Google
ar-XA-Chirp3-HD-Leda
Arabic (Standard)
ar-XA
Generative
Male
Google
ar-XA-Chirp3-HD-Orus
Arabic (Standard)
ar-XA
Generative
Male
Google
ar-XA-Chirp3-HD-Puck
Arabic (Standard)
ar-XA
Generative
Female
Google
ar-XA-Chirp3-HD-Zephyr
Arabic (Standard)
ar-XA
Standard
Female
Google
ar-XA-Standard-A
Arabic (Standard)
ar-XA
Standard
Male
Google
ar-XA-Standard-B
Arabic (Standard)
ar-XA
Standard
Male
Google
ar-XA-Standard-C
Arabic (Standard)
ar-XA
Standard
Female
Google
ar-XA-Standard-D
Arabic (Standard)
ar-XA
Neural
Female
Google
ar-XA-Wavenet-A
Arabic (Standard)
ar-XA
Neural
Male
Google
ar-XA-Wavenet-B
Arabic (Standard)
ar-XA
Neural
Male
Google
ar-XA-Wavenet-C
Arabic (Standard)
ar-XA
Neural
Female
Google
ar-XA-Wavenet-D
Arabic (Standard)
arb
Standard
Female
Polly
Zeina
Basque (Spain)
eu-ES
Standard
Female
Google
eu-ES-Standard-B
Bengali (India)
bn-IN
Generative
Female
Google
bn-IN-Chirp3-HD-Aoede
Bengali (India)
bn-IN
Generative
Male
Google
bn-IN-Chirp3-HD-Charon
Bengali (India)
bn-IN
Generative
Male
Google
bn-IN-Chirp3-HD-Fenrir
Bengali (India)
bn-IN
Generative
Female
Google
bn-IN-Chirp3-HD-Kore
Bengali (India)
bn-IN
Generative
Female
Google
bn-IN-Chirp3-HD-Leda
Bengali (India)
bn-IN
Generative
Male
Google
bn-IN-Chirp3-HD-Orus
Bengali (India)
bn-IN
Generative
Male
Google
bn-IN-Chirp3-HD-Puck
Bengali (India)
bn-IN
Generative
Female
Google
bn-IN-Chirp3-HD-Zephyr
Bengali (India)
bn-IN
Standard
Female
Google
bn-IN-Standard-A
Bengali (India)
bn-IN
Standard
Male
Google
bn-IN-Standard-B
Bengali (India)
bn-IN
Standard
Female
Google
bn-IN-Standard-C
Bengali (India)
bn-IN
Standard
Male
Google
bn-IN-Standard-D
Bengali (India)
bn-IN
Neural
Female
Google
bn-IN-Wavenet-A
Bengali (India)
bn-IN
Neural
Male
Google
bn-IN-Wavenet-B
Bengali (India)
bn-IN
Neural
Female
Google
bn-IN-Wavenet-C
Bengali (India)
bn-IN
Neural
Male
Google
bn-IN-Wavenet-D
Bulgarian (Bulgaria)
bg-BG
Standard
Female
Google
bg-BG-Standard-B
Catalan (Spain)
ca-ES
Standard
Female
Google
ca-ES-Standard-B
Catalan (Spain)
ca-ES
Neural
Female
Polly
Arlet-Neural
Chinese Cantonese
yue-CN
Neural
Female
Polly
Hiujin-Neural
Chinese Cantonese (Hong Kong)
yue-HK
Standard
Female
Google
yue-HK-Standard-A
Chinese Cantonese (Hong Kong)
yue-HK
Standard
Male
Google
yue-HK-Standard-B
Chinese Cantonese (Hong Kong)
yue-HK
Standard
Female
Google
yue-HK-Standard-C
Chinese Cantonese (Hong Kong)
yue-HK
Standard
Male
Google
yue-HK-Standard-D
Chinese Mandarin
cmn-CN
Generative
Female
Google
cmn-CN-Chirp3-HD-Aoede
Chinese Mandarin
cmn-CN
Generative
Male
Google
cmn-CN-Chirp3-HD-Charon
Chinese Mandarin
cmn-CN
Generative
Male
Google
cmn-CN-Chirp3-HD-Fenrir
Chinese Mandarin
cmn-CN
Generative
Female
Google
cmn-CN-Chirp3-HD-Kore
Chinese Mandarin
cmn-CN
Generative
Female
Google
cmn-CN-Chirp3-HD-Leda
Chinese Mandarin
cmn-CN
Generative
Male
Google
cmn-CN-Chirp3-HD-Orus
Chinese Mandarin
cmn-CN
Generative
Male
Google
cmn-CN-Chirp3-HD-Puck
Chinese Mandarin
cmn-CN
Generative
Female
Google
cmn-CN-Chirp3-HD-Zephyr
Chinese Mandarin
cmn-CN
Standard
Female
Google
cmn-CN-Standard-A
Chinese Mandarin
cmn-CN
Standard
Male
Google
cmn-CN-Standard-B
Chinese Mandarin
cmn-CN
Standard
Male
Google
cmn-CN-Standard-C
Chinese Mandarin
cmn-CN
Standard
Female
Google
cmn-CN-Standard-D
Chinese Mandarin
cmn-CN
Neural
Female
Google
cmn-CN-Wavenet-A
Chinese Mandarin
cmn-CN
Neural
Male
Google
cmn-CN-Wavenet-B
Chinese Mandarin
cmn-CN
Neural
Male
Google
cmn-CN-Wavenet-C
Chinese Mandarin
cmn-CN
Neural
Female
Google
cmn-CN-Wavenet-D
Chinese Mandarin
cmn-CN
Standard
Female
Polly
Zhiyu
Chinese Mandarin
cmn-CN
Neural
Female
Polly
Zhiyu-Neural
Chinese Mandarin (Taiwan)
cmn-TW
Standard
Female
Google
cmn-TW-Standard-A
Chinese Mandarin (Taiwan)
cmn-TW
Standard
Male
Google
cmn-TW-Standard-B
Chinese Mandarin (Taiwan)
cmn-TW
Standard
Male
Google
cmn-TW-Standard-C
Chinese Mandarin (Taiwan)
cmn-TW
Neural
Female
Google
cmn-TW-Wavenet-A
Chinese Mandarin (Taiwan)
cmn-TW
Neural
Male
Google
cmn-TW-Wavenet-B
Chinese Mandarin (Taiwan)
cmn-TW
Neural
Male
Google
cmn-TW-Wavenet-C
Czech (Czech Republic)
cs-CZ
Standard
Female
Google
cs-CZ-Standard-B
Czech (Czech Republic)
cs-CZ
Neural
Female
Google
cs-CZ-Wavenet-B
Danish (Denmark)
da-DK
Standard
Female
Google
da-DK-Standard-F
Danish (Denmark)
da-DK
Standard
Male
Google
da-DK-Standard-G
Danish (Denmark)
da-DK
Neural
Female
Google
da-DK-Wavenet-F
Danish (Denmark)
da-DK
Neural
Male
Google
da-DK-Wavenet-G
Danish (Denmark)
da-DK
Standard
Male
Polly
Mads
Danish (Denmark)
da-DK
Standard
Female
Polly
Naja
Danish (Denmark)
da-DK
Neural
Female
Polly
Sofie-Neural
Dutch (Belgium)
nl-BE
Standard
Female
Google
nl-BE-Standard-C
Dutch (Belgium)
nl-BE
Standard
Male
Google
nl-BE-Standard-D
Dutch (Belgium)
nl-BE
Neural
Female
Google
nl-BE-Wavenet-C
Dutch (Belgium)
nl-BE
Neural
Male
Google
nl-BE-Wavenet-D
Dutch (Belgium)
nl-BE
Neural
Female
Polly
Lisa-Neural
Dutch (Netherlands)
nl-NL
Generative
Female
Google
nl-NL-Chirp3-HD-Aoede
Dutch (Netherlands)
nl-NL
Generative
Male
Google
nl-NL-Chirp3-HD-Charon
Dutch (Netherlands)
nl-NL
Generative
Male
Google
nl-NL-Chirp3-HD-Fenrir
Dutch (Netherlands)
nl-NL
Generative
Female
Google
nl-NL-Chirp3-HD-Kore
Dutch (Netherlands)
nl-NL
Generative
Female
Google
nl-NL-Chirp3-HD-Leda
Dutch (Netherlands)
nl-NL
Generative
Male
Google
nl-NL-Chirp3-HD-Orus
Dutch (Netherlands)
nl-NL
Generative
Male
Google
nl-NL-Chirp3-HD-Puck
Dutch (Netherlands)
nl-NL
Generative
Female
Google
nl-NL-Chirp3-HD-Zephyr
Dutch (Netherlands)
nl-NL
Standard
Female
Google
nl-NL-Standard-F
Dutch (Netherlands)
nl-NL
Standard
Male
Google
nl-NL-Standard-G
Dutch (Netherlands)
nl-NL
Neural
Female
Google
nl-NL-Wavenet-F
Dutch (Netherlands)
nl-NL
Neural
Male
Google
nl-NL-Wavenet-G
Dutch (Netherlands)
nl-NL
Neural
Female
Polly
Laura-Neural
Dutch (Netherlands)
nl-NL
Standard
Female
Polly
Lotte
Dutch (Netherlands)
nl-NL
Standard
Male
Polly
Ruben
English (Australia)
en-AU
Generative
Female
Google
en-AU-Chirp3-HD-Aoede
English (Australia)
en-AU
Generative
Male
Google
en-AU-Chirp3-HD-Charon
English (Australia)
en-AU
Generative
Male
Google
en-AU-Chirp3-HD-Fenrir
English (Australia)
en-AU
Generative
Female
Google
en-AU-Chirp3-HD-Kore
English (Australia)
en-AU
Generative
Female
Google
en-AU-Chirp3-HD-Leda
English (Australia)
en-AU
Generative
Male
Google
en-AU-Chirp3-HD-Orus
English (Australia)
en-AU
Generative
Male
Google
en-AU-Chirp3-HD-Puck
English (Australia)
en-AU
Generative
Female
Google
en-AU-Chirp3-HD-Zephyr
English (Australia)
en-AU
Neural
Female
Google
en-AU-Neural2-A
English (Australia)
en-AU
Neural
Male
Google
en-AU-Neural2-B
English (Australia)
en-AU
Neural
Female
Google
en-AU-Neural2-C
English (Australia)
en-AU
Neural
Male
Google
en-AU-Neural2-D
English (Australia)
en-AU
Standard
Female
Google
en-AU-Standard-A
English (Australia)
en-AU
Standard
Male
Google
en-AU-Standard-B
English (Australia)
en-AU
Standard
Female
Google
en-AU-Standard-C
English (Australia)
en-AU
Standard
Male
Google
en-AU-Standard-D
English (Australia)
en-AU
Neural
Female
Google
en-AU-Wavenet-A
English (Australia)
en-AU
Neural
Male
Google
en-AU-Wavenet-B
English (Australia)
en-AU
Neural
Female
Google
en-AU-Wavenet-C
English (Australia)
en-AU
Neural
Male
Google
en-AU-Wavenet-D
English (Australia)
en-AU
Standard
Female
Polly
Nicole
English (Australia)
en-AU
Generative
Female
Polly
Olivia-Generative
English (Australia)
en-AU
Neural
Female
Polly
Olivia-Neural
English (Australia)
en-AU
Standard
Male
Polly
Russell
English (India)
en-IN
Generative
Female
Google
en-IN-Chirp3-HD-Aoede
English (India)
en-IN
Generative
Male
Google
en-IN-Chirp3-HD-Charon
English (India)
en-IN
Generative
Male
Google
en-IN-Chirp3-HD-Fenrir
English (India)
en-IN
Generative
Female
Google
en-IN-Chirp3-HD-Kore
English (India)
en-IN
Generative
Female
Google
en-IN-Chirp3-HD-Leda
English (India)
en-IN
Generative
Male
Google
en-IN-Chirp3-HD-Orus
English (India)
en-IN
Generative
Male
Google
en-IN-Chirp3-HD-Puck
English (India)
en-IN
Generative
Female
Google
en-IN-Chirp3-HD-Zephyr
English (India)
en-IN
Neural
Female
Google
en-IN-Neural2-A
English (India)
en-IN
Neural
Male
Google
en-IN-Neural2-B
English (India)
en-IN
Neural
Male
Google
en-IN-Neural2-C
English (India)
en-IN
Neural
Female
Google
en-IN-Neural2-D
English (India)
en-IN
Standard
Female
Google
en-IN-Standard-A
English (India)
en-IN
Standard
Male
Google
en-IN-Standard-B
English (India)
en-IN
Standard
Male
Google
en-IN-Standard-C
English (India)
en-IN
Standard
Female
Google
en-IN-Standard-D
English (India)
en-IN
Standard
Female
Google
en-IN-Standard-E
English (India)
en-IN
Standard
Male
Google
en-IN-Standard-F
English (India)
en-IN
Neural
Female
Google
en-IN-Wavenet-A
English (India)
en-IN
Neural
Male
Google
en-IN-Wavenet-B
English (India)
en-IN
Neural
Male
Google
en-IN-Wavenet-C
English (India)
en-IN
Neural
Female
Google
en-IN-Wavenet-D
English (India)
en-IN
Neural
Female
Google
en-IN-Wavenet-E
English (India)
en-IN
Neural
Male
Google
en-IN-Wavenet-F
English (India)
en-IN
Standard
Female
Polly
Aditi *
English (India)
en-IN
Generative
Female
Polly
Kajal-Generative
English (India)
en-IN
Neural
Female
Polly
Kajal-Neural *
English (India)
en-IN
Standard
Female
Polly
Raveena
English (Ireland)
en-IE
Neural
Female
Polly
Niamh-Neural
English (New Zealand)
en-NZ
Neural
Female
Polly
Aria-Neural
English (South African)
en-ZA
Generative
Female
Polly
Ayanda-Generative
English (South African)
en-ZA
Neural
Female
Polly
Ayanda-Neural
English (UK)
en-GB
Generative
Female
Google
en-GB-Chirp3-HD-Aoede
English (UK)
en-GB
Generative
Male
Google
en-GB-Chirp3-HD-Charon
English (UK)
en-GB
Generative
Male
Google
en-GB-Chirp3-HD-Fenrir
English (UK)
en-GB
Generative
Female
Google
en-GB-Chirp3-HD-Kore
English (UK)
en-GB
Generative
Female
Google
en-GB-Chirp3-HD-Leda
English (UK)
en-GB
Generative
Male
Google
en-GB-Chirp3-HD-Orus
English (UK)
en-GB
Generative
Male
Google
en-GB-Chirp3-HD-Puck
English (UK)
en-GB
Generative
Female
Google
en-GB-Chirp3-HD-Zephyr
English (UK)
en-GB
Neural
Female
Google
en-GB-Neural2-N
English (UK)
en-GB
Neural
Male
Google
en-GB-Neural2-O
English (UK)
en-GB
Standard
Female
Google
en-GB-Standard-N
English (UK)
en-GB
Standard
Male
Google
en-GB-Standard-O
English (UK)
en-GB
Neural
Female
Google
en-GB-Wavenet-N
English (UK)
en-GB
Neural
Male
Google
en-GB-Wavenet-O
English (UK)
en-GB
Basic
Male
Man
English (UK)
en-GB
Standard
Female
Polly
Amy
English (UK)
en-GB
Generative
Female
Polly
Amy-Generative
English (UK)
en-GB
Neural
Female
Polly
Amy-Neural
English (UK)
en-GB
Neural
Male
Polly
Arthur-Neural
English (UK)
en-GB
Standard
Male
Polly
Brian
English (UK)
en-GB
Neural
Male
Polly
Brian-Neural
English (UK)
en-GB
Standard
Female
Polly
Emma
English (UK)
en-GB
Neural
Female
Polly
Emma-Neural
English (UK)
en-GB
Basic
Female
Polly
Woman
English (US)
en-US
Generative
Female
Google
en-US-Chirp3-HD-Aoede
English (US)
en-US
Generative
Male
Google
en-US-Chirp3-HD-Charon
English (US)
en-US
Generative
Male
Google
en-US-Chirp3-HD-Fenrir
English (US)
en-US
Generative
Female
Google
en-US-Chirp3-HD-Kore
English (US)
en-US
Generative
Female
Google
en-US-Chirp3-HD-Leda
English (US)
en-US
Generative
Male
Google
en-US-Chirp3-HD-Orus
English (US)
en-US
Generative
Male
Google
en-US-Chirp3-HD-Puck
English (US)
en-US
Generative
Female
Google
en-US-Chirp3-HD-Zephyr
English (US)
en-US
Neural
Male
Google
en-US-Neural2-A
English (US)
en-US
Neural
Female
Google
en-US-Neural2-C
English (US)
en-US
Neural
Male
Google
en-US-Neural2-D
English (US)
en-US
Neural
Female
Google
en-US-Neural2-E
English (US)
en-US
Neural
Female
Google
en-US-Neural2-F
English (US)
en-US
Neural
Female
Google
en-US-Neural2-G
English (US)
en-US
Neural
Female
Google
en-US-Neural2-H
English (US)
en-US
Neural
Male
Google
en-US-Neural2-I
English (US)
en-US
Neural
Male
Google
en-US-Neural2-J
English (US)
en-US
Standard
Male
Google
en-US-Standard-A
English (US)
en-US
Standard
Male
Google
en-US-Standard-B
English (US)
en-US
Standard
Female
Google
en-US-Standard-C
English (US)
en-US
Standard
Male
Google
en-US-Standard-D
English (US)
en-US
Standard
Female
Google
en-US-Standard-E
English (US)
en-US
Standard
Female
Google
en-US-Standard-F
English (US)
en-US
Standard
Female
Google
en-US-Standard-G
English (US)
en-US
Standard
Female
Google
en-US-Standard-H
English (US)
en-US
Standard
Male
Google
en-US-Standard-I
English (US)
en-US
Standard
Male
Google
en-US-Standard-J
English (US)
en-US
Neural
Male
Google
en-US-Wavenet-A
English (US)
en-US
Neural
Male
Google
en-US-Wavenet-B
English (US)
en-US
Neural
Female
Google
en-US-Wavenet-C
English (US)
en-US
Neural
Male
Google
en-US-Wavenet-D
English (US)
en-US
Neural
Female
Google
en-US-Wavenet-E
English (US)
en-US
Neural
Female
Google
en-US-Wavenet-F
English (US)
en-US
Neural
Female
Google
en-US-Wavenet-G
English (US)
en-US
Neural
Female
Google
en-US-Wavenet-H
English (US)
en-US
Neural
Male
Google
en-US-Wavenet-I
English (US)
en-US
Neural
Male
Google
en-US-Wavenet-J
English (US)
en-US
Basic
Male
Man
English (US)
en-US
Generative
Female
Polly
Danielle-Generative
English (US)
en-US
Neural
Female
Polly
Danielle-Neural
English (US)
en-US
Neural
Male
Polly
Gregory-Neural
English (US)
en-US
Standard
Female
Polly
Ivy
English (US)
en-US
Neural
Female (child)
Polly
Ivy-Neural
English (US)
en-US
Standard
Female
Polly
Joanna
English (US)
en-US
Generative
Female
Polly
Joanna-Generative
English (US)
en-US
Neural
Female
Polly
Joanna-Neural*
English (US)
en-US
Standard
Male
Polly
Joey
English (US)
en-US
Neural
Male
Polly
Joey-Neural
English (US)
en-US
Standard
Male
Polly
Justin
English (US)
en-US
Neural
Male (child)
Polly
Justin-Neural
English (US)
en-US
Standard
Female
Polly
Kendra
English (US)
en-US
Neural
Female
Polly
Kendra-Neural
English (US)
en-US
Standard
Male (child)
Polly
Kevin
English (US)
en-US
Neural
Male (child)
Polly
Kevin-Neural
English (US)
en-US
Standard
Female
Polly
Kimberly
English (US)
en-US
Neural
Female
Polly
Kimberly-Neural
English (US)
en-US
Standard
Male
Polly
Matthew
English (US)
en-US
Generative
Male
Polly
Matthew-Generative
English (US)
en-US
Neural
Male
Polly
Matthew-Neural*
English (US)
en-US
Generative
Female
Polly
Ruth-Generative
English (US)
en-US
Neural
Female
Polly
Ruth-Neural
English (US)
en-US
Standard
Female
Polly
Salli
English (US)
en-US
Neural
Female
Polly
Salli-Neural
English (US)
en-US
Generative
Male
Polly
Stephen-Generative
English (US)
en-US
Neural
Male
Polly
Stephen-Neural
English (US)
en-US
Basic
Female
Polly
Woman
English (Welsh)
en-GB-WLS
Standard
Male
Polly
Geraint
Filipino (Philippines)
fil-PH
Standard
Female
Google
fil-PH-Standard-A
Filipino (Philippines)
fil-PH
Standard
Female
Google
fil-PH-Standard-B
Filipino (Philippines)
fil-PH
Standard
Male
Google
fil-PH-Standard-C
Filipino (Philippines)
fil-PH
Standard
Male
Google
fil-PH-Standard-D
Filipino (Philippines)
fil-PH
Neural
Female
Google
fil-PH-Wavenet-A
Filipino (Philippines)
fil-PH
Neural
Female
Google
fil-PH-Wavenet-B
Filipino (Philippines)
fil-PH
Neural
Male
Google
fil-PH-Wavenet-C
Filipino (Philippines)
fil-PH
Neural
Male
Google
fil-PH-Wavenet-D
Finnish (Finland)
fi-FI
Standard
Female
Google
fi-FI-Standard-B
Finnish (Finland)
fi-FI
Neural
Female
Google
fi-FI-Wavenet-B
Finnish (Finland)
fi-FI
Neural
Female
Polly
Suvi-Neural
French (Belgium)
fr-BE
Neural
Female
Polly
Isabelle-Neural
French (Canada)
fr-CA
Generative
Female
Google
fr-CA-Chirp3-HD-Aoede
French (Canada)
fr-CA
Generative
Male
Google
fr-CA-Chirp3-HD-Charon
French (Canada)
fr-CA
Generative
Male
Google
fr-CA-Chirp3-HD-Fenrir
French (Canada)
fr-CA
Generative
Female
Google
fr-CA-Chirp3-HD-Kore
French (Canada)
fr-CA
Generative
Female
Google
fr-CA-Chirp3-HD-Leda
French (Canada)
fr-CA
Generative
Male
Google
fr-CA-Chirp3-HD-Orus
French (Canada)
fr-CA
Generative
Male
Google
fr-CA-Chirp3-HD-Puck
French (Canada)
fr-CA
Generative
Female
Google
fr-CA-Chirp3-HD-Zephyr
French (Canada)
fr-CA
Neural
Female
Google
fr-CA-Neural2-A
French (Canada)
fr-CA
Neural
Male
Google
fr-CA-Neural2-B
French (Canada)
fr-CA
Neural
Female
Google
fr-CA-Neural2-C
French (Canada)
fr-CA
Neural
Male
Google
fr-CA-Neural2-D
French (Canada)
fr-CA
Standard
Female
Google
fr-CA-Standard-A
French (Canada)
fr-CA
Standard
Male
Google
fr-CA-Standard-B
French (Canada)
fr-CA
Standard
Female
Google
fr-CA-Standard-C
French (Canada)
fr-CA
Standard
Male
Google
fr-CA-Standard-D
French (Canada)
fr-CA
Neural
Female
Google
fr-CA-Wavenet-A
French (Canada)
fr-CA
Neural
Male
Google
fr-CA-Wavenet-B
French (Canada)
fr-CA
Neural
Female
Google
fr-CA-Wavenet-C
French (Canada)
fr-CA
Neural
Male
Google
fr-CA-Wavenet-D
French (Canada)
fr-CA
Standard
Female
Polly
Chantal
French (Canada)
fr-CA
Neural
Female
Polly
Gabrielle-Neural
French (Canada)
fr-CA
Neural
Male
Polly
Liam-Neural
French (France)
fr-FR
Generative
Female
Google
fr-FR-Chirp3-HD-Aoede
French (France)
fr-FR
Generative
Male
Google
fr-FR-Chirp3-HD-Charon
French (France)
fr-FR
Generative
Male
Google
fr-FR-Chirp3-HD-Fenrir
French (France)
fr-FR
Generative
Female
Google
fr-FR-Chirp3-HD-Kore
French (France)
fr-FR
Generative
Female
Google
fr-FR-Chirp3-HD-Leda
French (France)
fr-FR
Generative
Male
Google
fr-FR-Chirp3-HD-Orus
French (France)
fr-FR
Generative
Male
Google
fr-FR-Chirp3-HD-Puck
French (France)
fr-FR
Generative
Female
Google
fr-FR-Chirp3-HD-Zephyr
French (France)
fr-FR
Neural
Female
Google
fr-FR-Neural2-F
French (France)
fr-FR
Neural
Male
Google
fr-FR-Neural2-G
French (France)
fr-FR
Standard
Female
Google
fr-FR-Standard-F
French (France)
fr-FR
Standard
Male
Google
fr-FR-Standard-G
French (France)
fr-FR
Neural
Female
Google
fr-FR-Wavenet-F
French (France)
fr-FR
Neural
Male
Google
fr-FR-Wavenet-G
French (France)
fr-FR
Basic
Male
Man
French (France)
fr-FR
Standard
Female
Polly
Celine
French (France)
fr-FR
Standard
Female
Polly
Céline
French (France)
fr-FR
Standard
Female
Polly
Lea
French (France)
fr-FR
Standard
Female
Polly
Léa
French (France)
fr-FR
Generative
Female
Polly
Lea-Generative
French (France)
fr-FR
Neural
Female
Polly
Lea-Neural
French (France)
fr-FR
Standard
Male
Polly
Mathieu
French (France)
fr-FR
Generative
Male
Polly
Rémi-Generative
French (France)
fr-FR
Neural
Male
Polly
Remi-Neural
French (France)
fr-FR
Basic
Female
Polly
Woman
Galician (Spain)
gl-ES
Standard
Female
Google
gl-ES-Standard-B
German (Austria)
de-AT
Neural
Female
Polly
Hannah-Neural
German (Germany)
de-DE
Generative
Female
Google
de-DE-Chirp3-HD-Aoede
German (Germany)
de-DE
Generative
Male
Google
de-DE-Chirp3-HD-Charon
German (Germany)
de-DE
Generative
Male
Google
de-DE-Chirp3-HD-Fenrir
German (Germany)
de-DE
Generative
Female
Google
de-DE-Chirp3-HD-Kore
German (Germany)
de-DE
Generative
Female
Google
de-DE-Chirp3-HD-Leda
German (Germany)
de-DE
Generative
Male
Google
de-DE-Chirp3-HD-Orus
German (Germany)
de-DE
Generative
Male
Google
de-DE-Chirp3-HD-Puck
German (Germany)
de-DE
Generative
Female
Google
de-DE-Chirp3-HD-Zephyr
German (Germany)
de-DE
Neural
Female
Google
de-DE-Neural2-G
German (Germany)
de-DE
Neural
Male
Google
de-DE-Neural2-H
German (Germany)
de-DE
Standard
Female
Google
de-DE-Standard-G
German (Germany)
de-DE
Standard
Male
Google
de-DE-Standard-H
German (Germany)
de-DE
Neural
Female
Google
de-DE-Wavenet-G
German (Germany)
de-DE
Neural
Male
Google
de-DE-Wavenet-H
German (Germany)
de-DE
Basic
Male
Man
German (Germany)
de-DE
Generative
Male
Polly
Daniel-Generative
German (Germany)
de-DE
Neural
Male
Polly
Daniel-Neural
German (Germany)
de-DE
Standard
Male
Polly
Hans
German (Germany)
de-DE
Standard
Female
Polly
Marlene
German (Germany)
de-DE
Standard
Female
Polly
Vicki
German (Germany)
de-DE
Generative
Female
Polly
Vicki-Generative
German (Germany)
de-DE
Neural
Female
Polly
Vicki-Neural
German (Germany)
de-DE
Basic
Female
Polly
Woman
Greek (Greece)
el-GR
Standard
Female
Google
el-GR-Standard-B
Greek (Greece)
el-GR
Neural
Female
Google
el-GR-Wavenet-B
Gujarati (India)
gu-IN
Generative
Female
Google
gu-IN-Chirp3-HD-Aoede
Gujarati (India)
gu-IN
Generative
Male
Google
gu-IN-Chirp3-HD-Charon
Gujarati (India)
gu-IN
Generative
Male
Google
gu-IN-Chirp3-HD-Fenrir
Gujarati (India)
gu-IN
Generative
Female
Google
gu-IN-Chirp3-HD-Kore
Gujarati (India)
gu-IN
Generative
Female
Google
gu-IN-Chirp3-HD-Leda
Gujarati (India)
gu-IN
Generative
Male
Google
gu-IN-Chirp3-HD-Orus
Gujarati (India)
gu-IN
Generative
Male
Google
gu-IN-Chirp3-HD-Puck
Gujarati (India)
gu-IN
Generative
Female
Google
gu-IN-Chirp3-HD-Zephyr
Gujarati (India)
gu-IN
Standard
Female
Google
gu-IN-Standard-A
Gujarati (India)
gu-IN
Standard
Male
Google
gu-IN-Standard-B
Gujarati (India)
gu-IN
Standard
Female
Google
gu-IN-Standard-C
Gujarati (India)
gu-IN
Standard
Male
Google
gu-IN-Standard-D
Gujarati (India)
gu-IN
Neural
Female
Google
gu-IN-Wavenet-A
Gujarati (India)
gu-IN
Neural
Male
Google
gu-IN-Wavenet-B
Gujarati (India)
gu-IN
Neural
Female
Google
gu-IN-Wavenet-C
Gujarati (India)
gu-IN
Neural
Male
Google
gu-IN-Wavenet-D
Hebrew (Israel)
he-IL
Standard
Female
Google
he-IL-Standard-A
Hebrew (Israel)
he-IL
Standard
Male
Google
he-IL-Standard-B
Hebrew (Israel)
he-IL
Standard
Female
Google
he-IL-Standard-C
Hebrew (Israel)
he-IL
Standard
Male
Google
he-IL-Standard-D
Hebrew (Israel)
he-IL
Neural
Female
Google
he-IL-Wavenet-A
Hebrew (Israel)
he-IL
Neural
Male
Google
he-IL-Wavenet-B
Hebrew (Israel)
he-IL
Neural
Female
Google
he-IL-Wavenet-C
Hebrew (Israel)
he-IL
Neural
Male
Google
he-IL-Wavenet-D
Hindi (India)
hi-IN
Generative
Female
Google
hi-IN-Chirp3-HD-Aoede
Hindi (India)
hi-IN
Generative
Male
Google
hi-IN-Chirp3-HD-Charon
Hindi (India)
hi-IN
Generative
Male
Google
hi-IN-Chirp3-HD-Fenrir
Hindi (India)
hi-IN
Generative
Female
Google
hi-IN-Chirp3-HD-Kore
Hindi (India)
hi-IN
Generative
Female
Google
hi-IN-Chirp3-HD-Leda
Hindi (India)
hi-IN
Generative
Male
Google
hi-IN-Chirp3-HD-Orus
Hindi (India)
hi-IN
Generative
Male
Google
hi-IN-Chirp3-HD-Puck
Hindi (India)
hi-IN
Generative
Female
Google
hi-IN-Chirp3-HD-Zephyr
Hindi (India)
hi-IN
Neural
Female
Google
hi-IN-Neural2-A
Hindi (India)
hi-IN
Neural
Male
Google
hi-IN-Neural2-B
Hindi (India)
hi-IN
Neural
Male
Google
hi-IN-Neural2-C
Hindi (India)
hi-IN
Neural
Female
Google
hi-IN-Neural2-D
Hindi (India)
hi-IN
Standard
Female
Google
hi-IN-Standard-A
Hindi (India)
hi-IN
Standard
Male
Google
hi-IN-Standard-B
Hindi (India)
hi-IN
Standard
Male
Google
hi-IN-Standard-C
Hindi (India)
hi-IN
Standard
Female
Google
hi-IN-Standard-D
Hindi (India)
hi-IN
Standard
Female
Google
hi-IN-Standard-E
Hindi (India)
hi-IN
Standard
Male
Google
hi-IN-Standard-F
Hindi (India)
hi-IN
Neural
Female
Google
hi-IN-Wavenet-A
Hindi (India)
hi-IN
Neural
Male
Google
hi-IN-Wavenet-B
Hindi (India)
hi-IN
Neural
Male
Google
hi-IN-Wavenet-C
Hindi (India)
hi-IN
Neural
Female
Google
hi-IN-Wavenet-D
Hindi (India)
hi-IN
Neural
Female
Google
hi-IN-Wavenet-E
Hindi (India)
hi-IN
Neural
Male
Google
hi-IN-Wavenet-F
Hindi (India)
hi-IN
Standard
Female
Polly
Aditi *
Hindi (India)
hi-IN
Neural
Female
Polly
Kajal-Neural *
Hungarian (Hungary)
hu-HU
Standard
Female
Google
hu-HU-Standard-B
Hungarian (Hungary)
hu-HU
Neural
Female
Google
hu-HU-Wavenet-B
Icelandic (Iceland)
is-IS
Standard
Female
Google
is-IS-Standard-B
Icelandic (Iceland)
is-IS
Standard
Female
Polly
Dora
Icelandic (Iceland)
is-IS
Standard
Female
Polly
Dóra
Icelandic (Iceland)
is-IS
Standard
Male
Polly
Karl
Indonesian (Indonesia)
id-ID
Generative
Female
Google
id-ID-Chirp3-HD-Aoede
Indonesian (Indonesia)
id-ID
Generative
Male
Google
id-ID-Chirp3-HD-Charon
Indonesian (Indonesia)
id-ID
Generative
Male
Google
id-ID-Chirp3-HD-Fenrir
Indonesian (Indonesia)
id-ID
Generative
Female
Google
id-ID-Chirp3-HD-Kore
Indonesian (Indonesia)
id-ID
Generative
Female
Google
id-ID-Chirp3-HD-Leda
Indonesian (Indonesia)
id-ID
Generative
Male
Google
id-ID-Chirp3-HD-Orus
Indonesian (Indonesia)
id-ID
Generative
Male
Google
id-ID-Chirp3-HD-Puck
Indonesian (Indonesia)
id-ID
Generative
Female
Google
id-ID-Chirp3-HD-Zephyr
Indonesian (Indonesia)
id-ID
Standard
Female
Google
id-ID-Standard-A
Indonesian (Indonesia)
id-ID
Standard
Male
Google
id-ID-Standard-B
Indonesian (Indonesia)
id-ID
Standard
Male
Google
id-ID-Standard-C
Indonesian (Indonesia)
id-ID
Standard
Female
Google
id-ID-Standard-D
Indonesian (Indonesia)
id-ID
Neural
Female
Google
id-ID-Wavenet-A
Indonesian (Indonesia)
id-ID
Neural
Male
Google
id-ID-Wavenet-B
Indonesian (Indonesia)
id-ID
Neural
Male
Google
id-ID-Wavenet-C
Indonesian (Indonesia)
id-ID
Neural
Female
Google
id-ID-Wavenet-D
Italian (Italy)
it-IT
Generative
Female
Google
it-IT-Chirp3-HD-Aoede
Italian (Italy)
it-IT
Generative
Male
Google
it-IT-Chirp3-HD-Charon
Italian (Italy)
it-IT
Generative
Male
Google
it-IT-Chirp3-HD-Fenrir
Italian (Italy)
it-IT
Generative
Female
Google
it-IT-Chirp3-HD-Kore
Italian (Italy)
it-IT
Generative
Female
Google
it-IT-Chirp3-HD-Leda
Italian (Italy)
it-IT
Generative
Male
Google
it-IT-Chirp3-HD-Orus
Italian (Italy)
it-IT
Generative
Male
Google
it-IT-Chirp3-HD-Puck
Italian (Italy)
it-IT
Generative
Female
Google
it-IT-Chirp3-HD-Zephyr
Italian (Italy)
it-IT
Neural
Male
Google
it-IT-Neural2-F
Italian (Italy)
it-IT
Standard
Female
Google
it-IT-Standard-A
Italian (Italy)
it-IT
Standard
Female
Google
it-IT-Standard-E
Italian (Italy)
it-IT
Standard
Male
Google
it-IT-Standard-F
Italian (Italy)
it-IT
Neural
Female
Google
it-IT-Wavenet-A
Italian (Italy)
it-IT
Neural
Female
Google
it-IT-Wavenet-E
Italian (Italy)
it-IT
Neural
Male
Google
it-IT-Wavenet-F
Italian (Italy)
it-IT
Basic
Male
Man
Italian (Italy)
it-IT
Neural
Male
Polly
Adriano-Neural
Italian (Italy)
it-IT
Standard
Female
Polly
Bianca
Italian (Italy)
it-IT
Generative
Female
Polly
Bianca-Generative
Italian (Italy)
it-IT
Neural
Female
Polly
Bianca-Neural
Italian (Italy)
it-IT
Standard
Female
Polly
Carla
Italian (Italy)
it-IT
Standard
Male
Polly
Giorgio
Italian (Italy)
it-IT
Basic
Female
Polly
Woman
Japanese (Japan)
ja-JP
Generative
Female
Google
ja-JP-Chirp3-HD-Aoede
Japanese (Japan)
ja-JP
Generative
Male
Google
ja-JP-Chirp3-HD-Charon
Japanese (Japan)
ja-JP
Generative
Male
Google
ja-JP-Chirp3-HD-Fenrir
Japanese (Japan)
ja-JP
Generative
Female
Google
ja-JP-Chirp3-HD-Kore
Japanese (Japan)
ja-JP
Generative
Female
Google
ja-JP-Chirp3-HD-Leda
Japanese (Japan)
ja-JP
Generative
Male
Google
ja-JP-Chirp3-HD-Orus
Japanese (Japan)
ja-JP
Generative
Male
Google
ja-JP-Chirp3-HD-Puck
Japanese (Japan)
ja-JP
Generative
Female
Google
ja-JP-Chirp3-HD-Zephyr
Japanese (Japan)
ja-JP
Standard
Female
Google
ja-JP-Standard-B
Japanese (Japan)
ja-JP
Standard
Male
Google
ja-JP-Standard-C
Japanese (Japan)
ja-JP
Standard
Male
Google
ja-JP-Standard-D
Japanese (Japan)
ja-JP
Neural
Female
Google
ja-JP-Wavenet-B
Japanese (Japan)
ja-JP
Neural
Male
Google
ja-JP-Wavenet-C
Japanese (Japan)
ja-JP
Neural
Male
Google
ja-JP-Wavenet-D
Japanese (Japan)
ja-JP
Neural
Female
Polly
Kazuha-Neural
Japanese (Japan)
ja-JP
Standard
Female
Polly
Mizuki
Japanese (Japan)
ja-JP
Standard
Male
Polly
Takumi
Japanese (Japan)
ja-JP
Neural
Male
Polly
Takumi-Neural
Japanese (Japan)
ja-JP
Neural
Female
Polly
Tomoko-Neural
Kannada (India)
kn-IN
Generative
Female
Google
kn-IN-Chirp3-HD-Aoede
Kannada (India)
kn-IN
Generative
Male
Google
kn-IN-Chirp3-HD-Charon
Kannada (India)
kn-IN
Generative
Male
Google
kn-IN-Chirp3-HD-Fenrir
Kannada (India)
kn-IN
Generative
Female
Google
kn-IN-Chirp3-HD-Kore
Kannada (India)
kn-IN
Generative
Female
Google
kn-IN-Chirp3-HD-Leda
Kannada (India)
kn-IN
Generative
Male
Google
kn-IN-Chirp3-HD-Orus
Kannada (India)
kn-IN
Generative
Male
Google
kn-IN-Chirp3-HD-Puck
Kannada (India)
kn-IN
Generative
Female
Google
kn-IN-Chirp3-HD-Zephyr
Kannada (India)
kn-IN
Standard
Female
Google
kn-IN-Standard-A
Kannada (India)
kn-IN
Standard
Male
Google
kn-IN-Standard-B
Kannada (India)
kn-IN
Standard
Female
Google
kn-IN-Standard-C
Kannada (India)
kn-IN
Standard
Male
Google
kn-IN-Standard-D
Kannada (India)
kn-IN
Neural
Female
Google
kn-IN-Wavenet-A
Kannada (India)
kn-IN
Neural
Male
Google
kn-IN-Wavenet-B
Kannada (India)
kn-IN
Neural
Female
Google
kn-IN-Wavenet-C
Kannada (India)
kn-IN
Neural
Male
Google
kn-IN-Wavenet-D
Korean (South Korea)
ko-KR
Generative
Female
Google
ko-KR-Chirp3-HD-Aoede
Korean (South Korea)
ko-KR
Generative
Male
Google
ko-KR-Chirp3-HD-Charon
Korean (South Korea)
ko-KR
Generative
Male
Google
ko-KR-Chirp3-HD-Fenrir
Korean (South Korea)
ko-KR
Generative
Female
Google
ko-KR-Chirp3-HD-Kore
Korean (South Korea)
ko-KR
Generative
Female
Google
ko-KR-Chirp3-HD-Leda
Korean (South Korea)
ko-KR
Generative
Male
Google
ko-KR-Chirp3-HD-Orus
Korean (South Korea)
ko-KR
Generative
Male
Google
ko-KR-Chirp3-HD-Puck
Korean (South Korea)
ko-KR
Generative
Female
Google
ko-KR-Chirp3-HD-Zephyr
Korean (South Korea)
ko-KR
Neural
Female
Google
ko-KR-Neural2-A
Korean (South Korea)
ko-KR
Neural
Female
Google
ko-KR-Neural2-B
Korean (South Korea)
ko-KR
Neural
Male
Google
ko-KR-Neural2-C
Korean (South Korea)
ko-KR
Standard
Female
Google
ko-KR-Standard-A
Korean (South Korea)
ko-KR
Standard
Female
Google
ko-KR-Standard-B
Korean (South Korea)
ko-KR
Standard
Male
Google
ko-KR-Standard-C
Korean (South Korea)
ko-KR
Standard
Male
Google
ko-KR-Standard-D
Korean (South Korea)
ko-KR
Neural
Female
Google
ko-KR-Wavenet-A
Korean (South Korea)
ko-KR
Neural
Female
Google
ko-KR-Wavenet-B
Korean (South Korea)
ko-KR
Neural
Male
Google
ko-KR-Wavenet-C
Korean (South Korea)
ko-KR
Neural
Male
Google
ko-KR-Wavenet-D
Korean (South Korea)
ko-KR
Standard
Female
Polly
Seoyeon
Korean (South Korea)
ko-KR
Neural
Female
Polly
Seoyeon-Neural
Latvian (Latvia)
lv-LV
Standard
Male
Google
lv-LV-Standard-B
Lithuanian (Lithuania)
lt-LT
Standard
Male
Google
lt-LT-Standard-B
Malay (Malaysia)
ms-MY
Standard
Female
Google
ms-MY-Standard-A
Malay (Malaysia)
ms-MY
Standard
Male
Google
ms-MY-Standard-B
Malay (Malaysia)
ms-MY
Standard
Female
Google
ms-MY-Standard-C
Malay (Malaysia)
ms-MY
Standard
Male
Google
ms-MY-Standard-D
Malay (Malaysia)
ms-MY
Neural
Female
Google
ms-MY-Wavenet-A
Malay (Malaysia)
ms-MY
Neural
Male
Google
ms-MY-Wavenet-B
Malay (Malaysia)
ms-MY
Neural
Female
Google
ms-MY-Wavenet-C
Malay (Malaysia)
ms-MY
Neural
Male
Google
ms-MY-Wavenet-D
Malayalam (India)
ml-IN
Generative
Female
Google
ml-IN-Chirp3-HD-Aoede
Malayalam (India)
ml-IN
Generative
Male
Google
ml-IN-Chirp3-HD-Charon
Malayalam (India)
ml-IN
Generative
Male
Google
ml-IN-Chirp3-HD-Fenrir
Malayalam (India)
ml-IN
Generative
Female
Google
ml-IN-Chirp3-HD-Kore
Malayalam (India)
ml-IN
Generative
Female
Google
ml-IN-Chirp3-HD-Leda
Malayalam (India)
ml-IN
Generative
Male
Google
ml-IN-Chirp3-HD-Orus
Malayalam (India)
ml-IN
Generative
Male
Google
ml-IN-Chirp3-HD-Puck
Malayalam (India)
ml-IN
Generative
Female
Google
ml-IN-Chirp3-HD-Zephyr
Malayalam (India)
ml-IN
Standard
Female
Google
ml-IN-Standard-A
Malayalam (India)
ml-IN
Standard
Male
Google
ml-IN-Standard-B
Malayalam (India)
ml-IN
Standard
Female
Google
ml-IN-Standard-C
Malayalam (India)
ml-IN
Standard
Male
Google
ml-IN-Standard-D
Malayalam (India)
ml-IN
Neural
Female
Google
ml-IN-Wavenet-A
Malayalam (India)
ml-IN
Neural
Male
Google
ml-IN-Wavenet-B
Malayalam (India)
ml-IN
Neural
Female
Google
ml-IN-Wavenet-C
Malayalam (India)
ml-IN
Neural
Male
Google
ml-IN-Wavenet-D
Marathi (India)
mr-IN
Generative
Female
Google
mr-IN-Chirp3-HD-Aoede
Marathi (India)
mr-IN
Generative
Male
Google
mr-IN-Chirp3-HD-Charon
Marathi (India)
mr-IN
Generative
Male
Google
mr-IN-Chirp3-HD-Fenrir
Marathi (India)
mr-IN
Generative
Female
Google
mr-IN-Chirp3-HD-Kore
Marathi (India)
mr-IN
Generative
Female
Google
mr-IN-Chirp3-HD-Leda
Marathi (India)
mr-IN
Generative
Male
Google
mr-IN-Chirp3-HD-Orus
Marathi (India)
mr-IN
Generative
Male
Google
mr-IN-Chirp3-HD-Puck
Marathi (India)
mr-IN
Generative
Female
Google
mr-IN-Chirp3-HD-Zephyr
Marathi (India)
mr-IN
Standard
Female
Google
mr-IN-Standard-A
Marathi (India)
mr-IN
Standard
Male
Google
mr-IN-Standard-B
Marathi (India)
mr-IN
Standard
Female
Google
mr-IN-Standard-C
Marathi (India)
mr-IN
Neural
Female
Google
mr-IN-Wavenet-A
Marathi (India)
mr-IN
Neural
Male
Google
mr-IN-Wavenet-B
Marathi (India)
mr-IN
Neural
Female
Google
mr-IN-Wavenet-C
Norwegian (Norway)
nb-NO
Standard
Female
Google
nb-NO-Standard-F
Norwegian (Norway)
nb-NO
Standard
Male
Google
nb-NO-Standard-G
Norwegian (Norway)
nb-NO
Neural
Female
Google
nb-NO-Wavenet-F
Norwegian (Norway)
nb-NO
Neural
Male
Google
nb-NO-Wavenet-G
Norwegian (Norway)
nb-NO
Neural
Female
Polly
Ida-Neural
Norwegian (Norway)
nb-NO
Standard
Female
Polly
Liv
Polish (Poland)
pl-PL
Generative
Female
Google
pl-PL-Chirp3-HD-Aoede
Polish (Poland)
pl-PL
Generative
Male
Google
pl-PL-Chirp3-HD-Charon
Polish (Poland)
pl-PL
Generative
Male
Google
pl-PL-Chirp3-HD-Fenrir
Polish (Poland)
pl-PL
Generative
Female
Google
pl-PL-Chirp3-HD-Kore
Polish (Poland)
pl-PL
Generative
Female
Google
pl-PL-Chirp3-HD-Leda
Polish (Poland)
pl-PL
Generative
Male
Google
pl-PL-Chirp3-HD-Orus
Polish (Poland)
pl-PL
Generative
Male
Google
pl-PL-Chirp3-HD-Puck
Polish (Poland)
pl-PL
Generative
Female
Google
pl-PL-Chirp3-HD-Zephyr
Polish (Poland)
pl-PL
Standard
Female
Google
pl-PL-Standard-F
Polish (Poland)
pl-PL
Standard
Male
Google
pl-PL-Standard-G
Polish (Poland)
pl-PL
Neural
Female
Google
pl-PL-Wavenet-F
Polish (Poland)
pl-PL
Neural
Male
Google
pl-PL-Wavenet-G
Polish (Poland)
pl-PL
Standard
Female
Polly
Ewa
Polish (Poland)
pl-PL
Standard
Male
Polly
Jacek
Polish (Poland)
pl-PL
Standard
Male
Polly
Jan
Polish (Poland)
pl-PL
Standard
Female
Polly
Maja
Polish (Poland)
pl-PL
Neural
Female
Polly
Ola-Neural
Portuguese (Brazil)
pt-BR
Generative
Female
Google
pt-BR-Chirp3-HD-Aoede
Portuguese (Brazil)
pt-BR
Generative
Male
Google
pt-BR-Chirp3-HD-Charon
Portuguese (Brazil)
pt-BR
Generative
Male
Google
pt-BR-Chirp3-HD-Fenrir
Portuguese (Brazil)
pt-BR
Generative
Female
Google
pt-BR-Chirp3-HD-Kore
Portuguese (Brazil)
pt-BR
Generative
Female
Google
pt-BR-Chirp3-HD-Leda
Portuguese (Brazil)
pt-BR
Generative
Male
Google
pt-BR-Chirp3-HD-Orus
Portuguese (Brazil)
pt-BR
Generative
Male
Google
pt-BR-Chirp3-HD-Puck
Portuguese (Brazil)
pt-BR
Generative
Female
Google
pt-BR-Chirp3-HD-Zephyr
Portuguese (Brazil)
pt-BR
Neural
Female
Google
pt-BR-Neural2-A
Portuguese (Brazil)
pt-BR
Neural
Male
Google
pt-BR-Neural2-B
Portuguese (Brazil)
pt-BR
Neural
Female
Google
pt-BR-Neural2-C
Portuguese (Brazil)
pt-BR
Standard
Male
Google
pt-BR-Standard-B
Portuguese (Brazil)
pt-BR
Standard
Female
Google
pt-BR-Standard-C
Portuguese (Brazil)
pt-BR
Standard
Female
Google
pt-BR-Standard-D
Portuguese (Brazil)
pt-BR
Standard
Male
Google
pt-BR-Standard-E
Portuguese (Brazil)
pt-BR
Neural
Male
Google
pt-BR-Wavenet-B
Portuguese (Brazil)
pt-BR
Neural
Female
Google
pt-BR-Wavenet-C
Portuguese (Brazil)
pt-BR
Neural
Female
Google
pt-BR-Wavenet-D
Portuguese (Brazil)
pt-BR
Neural
Male
Google
pt-BR-Wavenet-E
Portuguese (Brazil)
pt-BR
Standard
Female
Polly
Camila
Portuguese (Brazil)
pt-BR
Neural
Female
Polly
Camila-Neural
Portuguese (Brazil)
pt-BR
Standard
Male
Polly
Ricardo
Portuguese (Brazil)
pt-BR
Neural
Male
Polly
Thiago-Neural
Portuguese (Brazil)
pt-BR
Standard
Female
Polly
Vitoria
Portuguese (Brazil)
pt-BR
Standard
Female
Polly
Vitória
Portuguese (Brazil)
pt-BR
Neural
Female
Polly
Vitoria-Neural
Portuguese (Brazil)
pt-BR
Neural
Female
Polly
Vitória-Neural
Portuguese (Portugal)
pt-PT
Standard
Female
Google
pt-PT-Standard-E
Portuguese (Portugal)
pt-PT
Standard
Male
Google
pt-PT-Standard-F
Portuguese (Portugal)
pt-PT
Neural
Female
Google
pt-PT-Wavenet-E
Portuguese (Portugal)
pt-PT
Neural
Male
Google
pt-PT-Wavenet-F
Portuguese (Portugal)
pt-PT
Standard
Male
Polly
Cristiano
Portuguese (Portugal)
pt-PT
Standard
Female
Polly
Ines
Portuguese (Portugal)
pt-PT
Standard
Female
Polly
Inês
Portuguese (Portugal)
pt-PT
Neural
Female
Polly
Ines-Neural
Portuguese (Portugal)
pt-PT
Neural
Female
Polly
Inês-Neural
Punjabi (India)
pa-IN
Standard
Female
Google
pa-IN-Standard-A
Punjabi (India)
pa-IN
Standard
Male
Google
pa-IN-Standard-B
Punjabi (India)
pa-IN
Standard
Female
Google
pa-IN-Standard-C
Punjabi (India)
pa-IN
Standard
Male
Google
pa-IN-Standard-D
Punjabi (India)
pa-IN
Neural
Female
Google
pa-IN-Wavenet-A
Punjabi (India)
pa-IN
Neural
Male
Google
pa-IN-Wavenet-B
Punjabi (India)
pa-IN
Neural
Female
Google
pa-IN-Wavenet-C
Punjabi (India)
pa-IN
Neural
Male
Google
pa-IN-Wavenet-D
Romanian (Romania)
ro-RO
Standard
Female
Google
ro-RO-Standard-B
Romanian (Romania)
ro-RO
Neural
Female
Google
ro-RO-Wavenet-B
Romanian (Romania)
ro-RO
Standard
Female
Polly
Carmen
Russian (Russia)
ru-RU
Generative
Female
Google
ru-RU-Chirp3-HD-Aoede
Russian (Russia)
ru-RU
Generative
Male
Google
ru-RU-Chirp3-HD-Charon
Russian (Russia)
ru-RU
Generative
Male
Google
ru-RU-Chirp3-HD-Fenrir
Russian (Russia)
ru-RU
Generative
Female
Google
ru-RU-Chirp3-HD-Kore
Russian (Russia)
ru-RU
Generative
Female
Google
ru-RU-Chirp3-HD-Leda
Russian (Russia)
ru-RU
Generative
Male
Google
ru-RU-Chirp3-HD-Orus
Russian (Russia)
ru-RU
Generative
Male
Google
ru-RU-Chirp3-HD-Puck
Russian (Russia)
ru-RU
Generative
Female
Google
ru-RU-Chirp3-HD-Zephyr
Russian (Russia)
ru-RU
Standard
Female
Google
ru-RU-Standard-A
Russian (Russia)
ru-RU
Standard
Male
Google
ru-RU-Standard-B
Russian (Russia)
ru-RU
Standard
Female
Google
ru-RU-Standard-C
Russian (Russia)
ru-RU
Standard
Male
Google
ru-RU-Standard-D
Russian (Russia)
ru-RU
Standard
Female
Google
ru-RU-Standard-E
Russian (Russia)
ru-RU
Neural
Female
Google
ru-RU-Wavenet-A
Russian (Russia)
ru-RU
Neural
Male
Google
ru-RU-Wavenet-B
Russian (Russia)
ru-RU
Neural
Female
Google
ru-RU-Wavenet-C
Russian (Russia)
ru-RU
Neural
Male
Google
ru-RU-Wavenet-D
Russian (Russia)
ru-RU
Neural
Female
Google
ru-RU-Wavenet-E
Russian (Russia)
ru-RU
Standard
Male
Polly
Maxim
Russian (Russia)
ru-RU
Standard
Female
Polly
Tatyana
Slovak (Slovakia)
sk-SK
Standard
Female
Google
sk-SK-Standard-B
Slovak (Slovakia)
sk-SK
Neural
Female
Google
sk-SK-Wavenet-B
Spanish (Mexico)
es-MX
Basic
Male
Man
Spanish (Mexico)
es-MX
Generative
Male
Polly
Andres-Generative
Spanish (Mexico)
es-MX
Neural
Male
Polly
Andres-Neural
Spanish (Mexico)
es-MX
Standard
Female
Polly
Mia
Spanish (Mexico)
es-MX
Generative
Female
Polly
Mía-Generative
Spanish (Mexico)
es-MX
Neural
Female
Polly
Mia-Neural
Spanish (Mexico)
es-MX
Basic
Female
Polly
Woman
Spanish (Spain)
es-ES
Generative
Female
Google
es-ES-Chirp3-HD-Aoede
Spanish (Spain)
es-ES
Generative
Male
Google
es-ES-Chirp3-HD-Charon
Spanish (Spain)
es-ES
Generative
Male
Google
es-ES-Chirp3-HD-Fenrir
Spanish (Spain)
es-ES
Generative
Female
Google
es-ES-Chirp3-HD-Kore
Spanish (Spain)
es-ES
Generative
Female
Google
es-ES-Chirp3-HD-Leda
Spanish (Spain)
es-ES
Generative
Male
Google
es-ES-Chirp3-HD-Orus
Spanish (Spain)
es-ES
Generative
Male
Google
es-ES-Chirp3-HD-Puck
Spanish (Spain)
es-ES
Generative
Female
Google
es-ES-Chirp3-HD-Zephyr
Spanish (Spain)
es-ES
Neural
Male
Google
es-ES-Neural2-G
Spanish (Spain)
es-ES
Neural
Female
Google
es-ES-Neural2-H
Spanish (Spain)
es-ES
Standard
Female
Google
es-ES-Standard-A
Spanish (Spain)
es-ES
Standard
Male
Google
es-ES-Standard-E
Spanish (Spain)
es-ES
Standard
Female
Google
es-ES-Standard-F
Spanish (Spain)
es-ES
Standard
Male
Google
es-ES-Standard-G
Spanish (Spain)
es-ES
Standard
Female
Google
es-ES-Standard-H
Spanish (Spain)
es-ES
Neural
Male
Google
es-ES-Wavenet-E
Spanish (Spain)
es-ES
Neural
Female
Google
es-ES-Wavenet-F
Spanish (Spain)
es-ES
Neural
Male
Google
es-ES-Wavenet-G
Spanish (Spain)
es-ES
Neural
Female
Google
es-ES-Wavenet-H
Spanish (Spain)
es-ES
Basic
Male
Man
Spanish (Spain)
es-ES
Standard
Female
Polly
Conchita
Spanish (Spain)
es-ES
Standard
Male
Polly
Enrique
Spanish (Spain)
es-ES
Standard
Female
Polly
Lucia
Spanish (Spain)
es-ES
Generative
Female
Polly
Lucia-Generative
Spanish (Spain)
es-ES
Neural
Female
Polly
Lucia-Neural
Spanish (Spain)
es-ES
Generative
Male
Polly
Sergio-Generative
Spanish (Spain)
es-ES
Neural
Male
Polly
Sergio-Neural
Spanish (Spain)
es-ES
Basic
Female
Polly
Woman
Spanish (US)
es-US
Generative
Female
Google
es-US-Chirp3-HD-Aoede
Spanish (US)
es-US
Generative
Male
Google
es-US-Chirp3-HD-Charon
Spanish (US)
es-US
Generative
Male
Google
es-US-Chirp3-HD-Fenrir
Spanish (US)
es-US
Generative
Female
Google
es-US-Chirp3-HD-Kore
Spanish (US)
es-US
Generative
Female
Google
es-US-Chirp3-HD-Leda
Spanish (US)
es-US
Generative
Male
Google
es-US-Chirp3-HD-Orus
Spanish (US)
es-US
Generative
Male
Google
es-US-Chirp3-HD-Puck
Spanish (US)
es-US
Generative
Female
Google
es-US-Chirp3-HD-Zephyr
Spanish (US)
es-US
Neural
Female
Google
es-US-Neural2-A
Spanish (US)
es-US
Neural
Male
Google
es-US-Neural2-B
Spanish (US)
es-US
Neural
Male
Google
es-US-Neural2-C
Spanish (US)
es-US
Standard
Female
Google
es-US-Standard-A
Spanish (US)
es-US
Standard
Male
Google
es-US-Standard-B
Spanish (US)
es-US
Standard
Male
Google
es-US-Standard-C
Spanish (US)
es-US
Neural
Female
Google
es-US-Wavenet-A
Spanish (US)
es-US
Neural
Male
Google
es-US-Wavenet-B
Spanish (US)
es-US
Neural
Male
Google
es-US-Wavenet-C
Spanish (US)
es-US
Basic
Male
Man
Spanish (US)
es-US
Standard
Female
Polly
Lupe
Spanish (US)
es-US
Generative
Female
Polly
Lupe-Generative
Spanish (US)
es-US
Neural
Female
Polly
Lupe-Neural
Spanish (US)
es-US
Standard
Male
Polly
Miguel
Spanish (US)
es-US
Generative
Male
Polly
Pedro-Generative
Spanish (US)
es-US
Neural
Male
Polly
Pedro-Neural
Spanish (US)
es-US
Standard
Female
Polly
Penelope
Spanish (US)
es-US
Standard
Female
Polly
Penélope
Spanish (US)
es-US
Basic
Female
Polly
Woman
Swedish (Sweden)
sv-SE
Standard
Female
Google
sv-SE-Standard-F
Swedish (Sweden)
sv-SE
Standard
Male
Google
sv-SE-Standard-G
Swedish (Sweden)
sv-SE
Neural
Female
Google
sv-SE-Wavenet-F
Swedish (Sweden)
sv-SE
Neural
Male
Google
sv-SE-Wavenet-G
Swedish (Sweden)
sv-SE
Standard
Female
Polly
Astrid
Swedish (Sweden)
sv-SE
Neural
Female
Polly
Elin-Neural
Tamil (India)
ta-IN
Generative
Female
Google
ta-IN-Chirp3-HD-Aoede
Tamil (India)
ta-IN
Generative
Male
Google
ta-IN-Chirp3-HD-Charon
Tamil (India)
ta-IN
Generative
Male
Google
ta-IN-Chirp3-HD-Fenrir
Tamil (India)
ta-IN
Generative
Female
Google
ta-IN-Chirp3-HD-Kore
Tamil (India)
ta-IN
Generative
Female
Google
ta-IN-Chirp3-HD-Leda
Tamil (India)
ta-IN
Generative
Male
Google
ta-IN-Chirp3-HD-Orus
Tamil (India)
ta-IN
Generative
Male
Google
ta-IN-Chirp3-HD-Puck
Tamil (India)
ta-IN
Generative
Female
Google
ta-IN-Chirp3-HD-Zephyr
Tamil (India)
ta-IN
Standard
Female
Google
ta-IN-Standard-C
Tamil (India)
ta-IN
Standard
Male
Google
ta-IN-Standard-D
Tamil (India)
ta-IN
Neural
Female
Google
ta-IN-Wavenet-C
Tamil (India)
ta-IN
Neural
Male
Google
ta-IN-Wavenet-D
Telugu (India)
te-IN
Generative
Female
Google
te-IN-Chirp3-HD-Aoede
Telugu (India)
te-IN
Generative
Male
Google
te-IN-Chirp3-HD-Charon
Telugu (India)
te-IN
Generative
Male
Google
te-IN-Chirp3-HD-Fenrir
Telugu (India)
te-IN
Generative
Female
Google
te-IN-Chirp3-HD-Kore
Telugu (India)
te-IN
Generative
Female
Google
te-IN-Chirp3-HD-Leda
Telugu (India)
te-IN
Generative
Male
Google
te-IN-Chirp3-HD-Orus
Telugu (India)
te-IN
Generative
Male
Google
te-IN-Chirp3-HD-Puck
Telugu (India)
te-IN
Generative
Female
Google
te-IN-Chirp3-HD-Zephyr
Telugu (India)
te-IN
Standard
Female
Google
te-IN-Standard-A
Telugu (India)
te-IN
Standard
Male
Google
te-IN-Standard-B
Telugu (India)
te-IN
Standard
Female
Google
te-IN-Standard-C
Telugu (India)
te-IN
Standard
Male
Google
te-IN-Standard-D
Thai (Thailand)
th-TH
Generative
Female
Google
th-TH-Chirp3-HD-Aoede
Thai (Thailand)
th-TH
Generative
Male
Google
th-TH-Chirp3-HD-Charon
Thai (Thailand)
th-TH
Generative
Male
Google
th-TH-Chirp3-HD-Fenrir
Thai (Thailand)
th-TH
Generative
Female
Google
th-TH-Chirp3-HD-Kore
Thai (Thailand)
th-TH
Generative
Female
Google
th-TH-Chirp3-HD-Leda
Thai (Thailand)
th-TH
Generative
Male
Google
th-TH-Chirp3-HD-Orus
Thai (Thailand)
th-TH
Generative
Male
Google
th-TH-Chirp3-HD-Puck
Thai (Thailand)
th-TH
Generative
Female
Google
th-TH-Chirp3-HD-Zephyr
Thai (Thailand)
th-TH
Standard
Female
Google
th-TH-Standard-A
Turkish (Turkey)
tr-TR
Generative
Female
Google
tr-TR-Chirp3-HD-Aoede
Turkish (Turkey)
tr-TR
Generative
Male
Google
tr-TR-Chirp3-HD-Charon
Turkish (Turkey)
tr-TR
Generative
Male
Google
tr-TR-Chirp3-HD-Fenrir
Turkish (Turkey)
tr-TR
Generative
Female
Google
tr-TR-Chirp3-HD-Kore
Turkish (Turkey)
tr-TR
Generative
Female
Google
tr-TR-Chirp3-HD-Leda
Turkish (Turkey)
tr-TR
Generative
Male
Google
tr-TR-Chirp3-HD-Orus
Turkish (Turkey)
tr-TR
Generative
Male
Google
tr-TR-Chirp3-HD-Puck
Turkish (Turkey)
tr-TR
Generative
Female
Google
tr-TR-Chirp3-HD-Zephyr
Turkish (Turkey)
tr-TR
Standard
Female
Google
tr-TR-Standard-A
Turkish (Turkey)
tr-TR
Standard
Male
Google
tr-TR-Standard-B
Turkish (Turkey)
tr-TR
Standard
Female
Google
tr-TR-Standard-C
Turkish (Turkey)
tr-TR
Standard
Female
Google
tr-TR-Standard-D
Turkish (Turkey)
tr-TR
Standard
Male
Google
tr-TR-Standard-E
Turkish (Turkey)
tr-TR
Neural
Female
Google
tr-TR-Wavenet-A
Turkish (Turkey)
tr-TR
Neural
Male
Google
tr-TR-Wavenet-B
Turkish (Turkey)
tr-TR
Neural
Female
Google
tr-TR-Wavenet-C
Turkish (Turkey)
tr-TR
Neural
Female
Google
tr-TR-Wavenet-D
Turkish (Turkey)
tr-TR
Neural
Male
Google
tr-TR-Wavenet-E
Turkish (Turkey)
tr-TR
Neural
Female
Polly
Burcu-Neural
Turkish (Turkey)
tr-TR
Standard
Female
Polly
Filiz
Vietnamese (Vietnam)
vi-VN
Generative
Female
Google
vi-VN-Chirp3-HD-Aoede
Vietnamese (Vietnam)
vi-VN
Generative
Male
Google
vi-VN-Chirp3-HD-Charon
Vietnamese (Vietnam)
vi-VN
Generative
Male
Google
vi-VN-Chirp3-HD-Fenrir
Vietnamese (Vietnam)
vi-VN
Generative
Female
Google
vi-VN-Chirp3-HD-Kore
Vietnamese (Vietnam)
vi-VN
Generative
Female
Google
vi-VN-Chirp3-HD-Leda
Vietnamese (Vietnam)
vi-VN
Generative
Male
Google
vi-VN-Chirp3-HD-Orus
Vietnamese (Vietnam)
vi-VN
Generative
Male
Google
vi-VN-Chirp3-HD-Puck
Vietnamese (Vietnam)
vi-VN
Generative
Female
Google
vi-VN-Chirp3-HD-Zephyr
Vietnamese (Vietnam)
vi-VN
Standard
Female
Google
vi-VN-Standard-A
Vietnamese (Vietnam)
vi-VN
Standard
Male
Google
vi-VN-Standard-B
Vietnamese (Vietnam)
vi-VN
Standard
Female
Google
vi-VN-Standard-C
Vietnamese (Vietnam)
vi-VN
Standard
Male
Google
vi-VN-Standard-D
Vietnamese (Vietnam)
vi-VN
Neural
Female
Google
vi-VN-Wavenet-A
Vietnamese (Vietnam)
vi-VN
Neural
Male
Google
vi-VN-Wavenet-B
Vietnamese (Vietnam)
vi-VN
Neural
Female
Google
vi-VN-Wavenet-C
Vietnamese (Vietnam)
vi-VN
Neural
Male
Google
vi-VN-Wavenet-D
Welsh
cy-GB
Standard
Female
Polly
Gwyneth
Bilingual voices are identified with (*) in the Voice column. At the moment, only Amazon Polly supports this for a limited number of voices. To learn more about the bilingual voices, consult the Amazon Polly documentation

.

Text-to-Speech settings






(information)
Info
The TTS Settings described in this section only apply to the <Say> TwiML verb and <Pay>'s <Prompt> TwiML noun.

Text-to-Speech capabilities in <ConversationRelay> have their own settings and defaults for the voice attribute, which depends on the Provider and Language used. Consult the ConversationRelay documentation for more information.
Set a default voice and language





To define the default voice and language for your account, go to the Text-to-Speech page

 in the Twilio Console.

When you don't set language or voice attributes in your <Say> TwiML verb, it uses the default values.
When you select Default in Studio, it uses the default values.
You can test different voices and messages in this section of the Console.


(information)
Text-to-Speech Default Settings example
Consider that you set the Your default provider to Basic and set the Default voice to Man, en-US as your Default Settings.

With these TTS settings, Twilio uses the Man voice and the en-US (American English) accent and pronunciation when executing the following TwiML:



Copy code block
<Response>
  <Say>Hello. I am a man!</Say>
</Response>
Map a voice for a language





Twilio updates the offered Text-to-Speech voices on a regular basis. To access the latest voices without needing to review and change your code, use the Language Mapping feature. Your application only needs the language and the text. Twilio automatically selects and uses the corresponding voice. You can update these at any time from the Console.

On the Text-to-Speech page

 in the Console, you can set a voice for every locale.

To set a voice for a locale, complete the following steps.

Go to the Text-to-Speech page

 in the Console.
Under the Current Language Mapping heading, click the language and locale you wish to configure. As an example, choose English (British)(en-GB). The Test & Configure Voices By Language modal displays.
From the dropdown menus, select the Provider and Voice you wish to use. As an example, choose Amazon Polly and Emma.
Click Save.
Repeat steps 1 to 4 for other language and voice pairing you want to use.
With these mappings set, you can specify the language without specifying the voice when using the <Say> TwiML verb in your application.


(information)
Set language without voice example
Consider that you configured English (British)(en-GB) to use Amazon Polly Emma voice.

In the following TwiML example, Twilio uses the Amazon Polly Emma voice when executing <Say> with the language attribute set to en-GB. This didn't require a voice attribute.



Copy code block
<Response>
  <Say language="en-GB">Hello. I am Emma!</Say>
</Response>
Override default settings






(information)
Info
The TTS Settings described in this section only apply to the <Say> TwiML verb and <Pay>'s <Prompt> TwiML noun.

Text-to-Speech capabilities in <ConversationRelay> have their own settings and defaults for the voice attribute, which depends on the Provider and Language used. Consult the ConversationRelay documentation for more information.
Override default voices





<Say>'s voice attribute allows you to override any default voice settings that were configured in the Console (i.e. Account-level and Language Mapping defaults).


(information)
Change the voice for a specific call example
Consider that you set the default Text-to-Speech voice to Amazon Polly Salli in your account. You want to use Amazon Polly Joanna for a specific call. To use the Amazon Polly Joanna voice for a specific call, set the <Say>'s voice attribute to Polly.Joanna.

In the following TwiML example, Twilio uses the Amazon Polly Joanna voice instead of Amazon Polly Salli voice when executing <Say>.



Copy code block
<Response>
  <Say voice="Polly.Joanna">Hello. I am Joanna!</Say>
</Response>
To override a Language Mapping's defaults, use the voice attribute.


(information)
Override default language mapping for a specific call
Consider that you set the language mapping for English (British)(en-GB) to Amazon Polly Emma in your account. You want to use Amazon Polly Joanna for a specific call. To use the Amazon Polly Joanna voice for a specific call, set the <Say>'s voice attribute to Polly.Joanna.

In the following TwiML example, Twilio uses the Amazon Polly Joanna voice instead of Amazon Polly Emma voice when executing <Say>.



Copy code block
<Response>
  <Say language="en-GB" voice="Polly.Joanna">Hello. I am Joanna!</Say>
</Response>
Override default languages





<Say>'s language attribute allows you to override any default language settings that were configured in the Console (i.e. Account-level and Language Mapping defaults).


(information)
Language override example
Consider that you set your account's default Text-to-Speech Language to English (US) (en-US). You want to use German for a specific call. To use German, set the <Say>'s language attribute to de-DE.

In the following TwiML example, Twilio uses German (de-DE) language instead of English (US) (en-US) language when executing <Say>.



Copy code block
<Response>
  <Say language="de-DE">Hallo. Ich spreche Deutsch!</Say>
</Response>
Speech Synthesis Markup Language (SSML)






(information)
Info
Basic voices don't support SSML.
To fine-tune synthesized speech, use SSML

 tags. With SSML, you can specify where pauses should be, provide pronunciations for acronyms, abbreviations, dates and times, and increase or decrease the speed of spoken text.

Supported SSML tags






(information)
Info
The SSML specification

 requires a root element: <speak>. You don't need <speak> inside <Say>. Skip <speak> and insert the rest of the SSML inside <Say>.
Twilio supports a subset of SSML tags.

SSML support may differ between Text-to-Speech providers, limited to specific voices, or both. Review the provider-specific SSML documentation and test your application. Use of SSML tags that a Text-to-Speech provider or voice doesn't support may result in error and <Say> instruction failure.

The following table lists supported SSML tags. To verify the correct use of SSML tags, consult the appropriate provider-specific documentation and test your application.

Action	SSML tag	Amazon docs	Google docs
Add a pause	<break>	Amazon

Google

Emphasize words	<emphasis>	Amazon

Google

Specify another language for specific words	<lang>	Amazon

Google

Add a pause between paragraphs	<p>	Amazon

Google

Use phonetic pronunciation	<phoneme>	Amazon

Google

Control volume, speaking rate, and pitch	<prosody>	Amazon

Google

Add a pause between sentences	<s>	Amazon

Google

Control how special types of words are spoken	<say-as>	Amazon

Google

Pronounce acronyms and abbreviations	<sub>	Amazon

Google

Improve pronunciation by specifying parts of speech	<w>	Amazon

Google N/A
SSML Examples





Modify speed and volume of synthesized speech

To control the volume, rate, and pitch of synthesized speech, use the SSML <prosody> tag.



Copy code block
<Response>
  <Say voice="Polly.Joanna">
    Prosody can be used to change the way words sound. The following words are
    <prosody volume="x-loud"> quite a bit louder than the rest of this passage.
    </prosody> Each morning when I wake up, <prosody rate="x-slow">I speak slowly and
    deliberately until I have my coffee.</prosody> I can also change the pitch of my voice
    using prosody. Do you like <prosody pitch="+5%"> speech with a pitch higher,</prosody>
    or <prosody pitch="-10%"> is a lower pitch preferable?</prosody>
  </Say>
</Response>
Read a phone number

To indicate specific categories of text, use the SSML <say-as> tag. This ensures the correct pronunciation with synthesized speech.

Without <say-as>, the voice pronounces a phone number like a number.

This results in pronouncing 4155551212 as four billion, one hundred fifty-five million, five hundred fifty-one thousand, two hundred twelve.

To read the phone number as four one five, five five five, one two one two, use <say-as> as in the following TwiML document.



Copy code block
<Response>
   <Say voice="Polly.Joanna">John's phone number is, <say-as interpret-as="telephone">4155551212</say-as></Say>
</Response>
Generate SSML with Twilio's SDKs

You can generate TwiML with SSML within the <Say> verb using one of Twilio's SDKs for C#

, Java

, Node.js

, PHP

, Python

, Ruby

, or Go

.

The following code sample shows SDK code that generates the following SSML and TwiML:



Copy code block
<Response>
  <Say voice="Polly.Joanna">
    Hi
    <break strength="x-weak" time="100ms"/>
    <emphasis level="moderate">Words to emphasize</emphasis>
    <p>Words to speak</p>
    aaaaaa
    <phoneme alphabet="x-sampa" ph="pɪˈkɑːn">Words to speak</phoneme>
    bbbbbbb
    <prosody pitch="-10%" rate="85%" volume="-6dB">Words to speak</prosody>
    <s>Words to speak</s>
    <say-as interpret-as="spell-out">Words to speak</say-as>
    <sub alias="alias">Words to be substituted</sub>
    <w>Words to speak</w>
  </Say>
</Response>
SSML with SDK Example





Report code block


Copy code block
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
say = Say('Hi', voice='Polly.Joanna')
say.break_(strength='x-weak', time='100ms')
say.emphasis('Words to emphasize', level='moderate')
say.p('Words to speak')
say.append('aaaaaa')
say.phoneme('Words to speak', alphabet='x-sampa', ph='pɪˈkɑːn')
say.append('bbbbbbb')
say.prosody('Words to speak', pitch='-10%', rate='85%', volume='-6dB')
say.s('Words to speak')
say.say_as('Words to speak', interpret_as='spell-out', role='yyyymmdd')
say.sub('Words to be substituted', alias='alias')
say.w('Words to speak')
response.append(say)

print(response)
Output


Copy output
<Response>
  <Say voice="Polly.Joanna">
    Hi
    <break strength="x-weak" time="100ms"/>
    <emphasis level="moderate">Words to emphasize</emphasis>
    <p>Words to speak</p>
    aaaaaa
    <phoneme alphabet="x-sampa" ph="pɪˈkɑːn">Words to speak</phoneme>
    bbbbbbb
    <prosody pitch="-10%" rate="85%" volume="-6dB">Words to speak</prosody>
    <s>Words to speak</s>
    <say-as interpret-as="spell-out">Words to speak</say-as>
    <sub alias="alias">Words to be substituted</sub>
    <w>Words to speak</w>
  </Say>
</Response>
<Say> limitations





Basic voice limitations





Basic voices can process no more than 4,000 characters.
Basic voices don't support SSML tags.
Amazon Polly voice limitations





<Say> can process no more than 3,000 characters excluding SSML.
<Say> doesn't support Amazon-specific SSML tags. These would include <amazon:auto-breath> or <amazon:effect>.
<Say> doesn't support lexicons.
SSML support may vary between Polly and Polly Neural voices.
To review any differences, consult the Amazon Polly SSML documentation

.
Google voice limitations





<Say> can process no more than 5,000 characters, including SSML, newlines and spaces.
As Google includes SSML tags, newlines and spaces in the total character count, they count toward Google billing totals.
<Say> doesn't support Google-specific SSML tags. This includes <par> or <seq>.
SSML support may vary between Standard, WaveNet and Neural2 voices.
To review any differences, consult the Google SSML documentation

.
Pricing





Basic voices





Basic voices are free of charge.

Standard voices





Standard voices (Amazon Polly and Google Standard) pricing starts at $0.0008 per 100 characters. The following volume discounts apply:

Minimum characters	Maximum characters	Price per 100 characters
0	5,000,000	$0.00080
5,000,001	50,000,000	$0.00072
50,000,001	100,000,000	$0.00068
100,000,001		$0.00064
Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0008.


(information)
Standard voices pricing example
You used 546 characters on a call. Twilio charges $0.0040 for the use of Neural voices on that call.

546 rounds down to 500.
500 = 5 blocks (500/100).
5 * 0.0008 = $0.0040.
Neural voices





Neural voices (Amazon Polly Neural, Google WaveNet and Google Neural2) price starts at $0.0032 per 100 characters. The following volume discounts apply:

Minimum characters	Maximum characters	Price per 100 characters
0	5,000,000	$0.0032
5,000,001	50,000,000	$0.0029
50,000,001	100,000,000	$0.0027
100,000,001		$0.0025
Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0032.


(information)
Neural voices pricing example
You used 546 characters on a call. Twilio charges $0.0160 for the use of Neural voices on that call.

546 rounds down to 500.
500 = 5 blocks (500/100).
5 * 0.0032 = $0.016.
Generative voices





Generative voices (Amazon Polly Generative and Google Chirp3-HD) price starts at $0.0032 per 100 characters. The following volume discounts apply:

Minimum characters	Maximum characters	Price per 100 characters
0	5,000,000	$0.013
5,000,001	50,000,000	$0.010
50,000,001	100,000,000	$0.008
100,000,001		$0.006
Twilio rounds usage towards the end of call and prices it in blocks of 100 characters. The minimum charge covers 100 characters or $0.0032.


(information)
Generative voices pricing example
You used 546 characters on a call. Twilio charges $0.065 for the use of Generative voices on that call.

546 rounds down to 500.
500 = 5 blocks (500/100).
5 * 0.013 = $0.065.
AI Nutrition Facts





Amazon Polly Text-to-Speech





AI Nutrition Facts
<Say> - Amazon Polly Text-to-Speech
Description
Convert text into a human-sounding voice using speech synthesis technology from Amazon Polly.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Generative and Predictive
Base Model
Amazon Polly Text-to-Speech: Standard, Neural and Generative
Trust Ingredients
Base Model Trained with Customer Data
No
The Base Model is not trained using Customer Data.
Customer Data is Shared with Model Vendor
No
Programmable Voice uses the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data.
Training Data Anonymized
N/A
The Base Model is not trained using Customer Data.
Data Deletion
N/A
The Base Model is not trained using Customer Data.
Human in the Loop
Yes
Customers can view text input and listen to the audio output.
Data Retention
30 days
Compliance
Logging & Auditing
Yes
Customers can view text input and listen to the audio output.
Guardrails
Yes
Customers can view text input and listen to the audio output.
Input/Output Consistency
Yes
Customers are responsible for human review.
Other Resources
https://www.twilio.com/docs/voice/twiml/say/text-speech
Learn more about this label at nutrition-facts.ai

Google Text-to-Speech





AI Nutrition Facts
<Say> - Google Text-to-Speech
Description
Convert text into a human-sounding voice using speech synthesis technology from Google.
Privacy Ladder Level
N/A
Feature is Optional
Yes
Model Type
Generative and Predictive
Base Model
Google Text-to-Speech: Standard, WaveNet, Neural2 and Chirp3-HD
Trust Ingredients
Base Model Trained with Customer Data
No
The Base Model is not trained using Customer Data.
Customer Data is Shared with Model Vendor
No
Programmable Voice uses the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data.
Training Data Anonymized
N/A
The Base Model is not trained using Customer Data.
Data Deletion
N/A
The Base Model is not trained using Customer Data.
Human in the Loop
Yes
Customers can view text input and listen to the audio output.
Data Retention
30 days
Compliance
Logging & Auditing
Yes
Customers can view text input and listen to the audio output.
Guardrails
Yes
Customers can view text input and listen to the audio output.
Input/Output Consistency
Yes
Customers are responsible for human review.
Other Resources
https://www.twilio.com/docs/voice/twiml/say/text-speech
Learn more about this label at nutrition-facts.ai