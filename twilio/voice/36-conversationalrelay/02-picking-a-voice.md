ConversationRelay  - Picking a voice




Picking a voice for your ConversationRelay application is an important step towards creating an engaging user experience. Twilio supports text-to-speech voices from Google, Amazon Polly, and ElevenLabs. Text-to-Speech (TTS) voice quality varies significantly by provider and voice type. While generative voices often offer higher fidelity and more natural-sounding responses, they can introduce additional latency and process TTS at a slower rate.

Google and Amazon Polly voices





For voices from Google or Amazon (including generative options), refer to our Twilio TTS Voices documentation. Each provider offers a variety of languages and styles, enabling you to tailor your application's voice experience to your specific needs.

How to use Google and Amazon Polly voices





Browse the available voices in the Available voices and languages table. Test them using the Twilio Console to find the one that best fits your application's requirements.
Copy the voice ID from the table (for example, en-US-Wavenet-D).
Configure the <ConversationRelay> noun in TwiML: Set ttsProvider to Google or Amazon and use the copied voice ID in the voice attribute.
ElevenLabs voices





ElevenLabs uses the Flash 2.5 model by default for text-to-speech. Use the interface below to search and filter through a wide selection of ElevenLabs voices by language, accent, age, and more. Each voice entry includes a voice ID that you can copy and paste into your <ConversationRelay> configuration.

How to use ElevenLabs voices





Search or filter: Pick a voice using the tool below that matches your requirements.
Copy the voice ID: From the search results, copy the voice ID (for example, NYC9WEgkq1u4jiqBseQ9).
Configure the <ConversationRelay> noun: In your TwiML, set ttsProvider="ElevenLabs" and use the copied voice ID in the voice attribute.
Pick an audio model (optional): The voices from ElevenLabs use the Flash 2.5 model

 by default. Other models are available and could improve the quality or performance of your application depending on your use case. You can use a different model by appending a hyphen to the voice ID followed by the model ID. The supported model IDs include flash_v2, turbo_v2_5, turbo_v2 and the default, flash_v2_5. Some models only work with a specific set of languages. You can learn about the strengths and the supported languages of each model on the ElevenLabs website

.
Customize your ElevenLabs voice (recommended): You can adjust the speed and other characteristics of your chosen ElevenLabs voice. To do that, add a hyphen to the end of the voice attribute followed by an underscore-separated string with values for speed, stability, and similarity respectively. The speed should be a value between 0.7 and 1.2 and the stability and similarity values can range from 0.0 to 1.0.
For example, a voice attribute of XrExE9yKIg1WjnnlVkGX-1.2_0.6_0.8 will set the speed to 1.2, the stability to 0.6, and the similarity to 0.8. See the ElevenLabs documentation

 to learn more about how these settings affect your application's voice.
Example:



Copy code block
<Connect>
  <ConversationRelay url="wss://example.com/websocket" ttsProvider="ElevenLabs" voice="NYC9WEgkq1u4jiqBseQ9-turbo_v2_5-0.8_0.8_0.6" ... />
</Connect>


Filter

Press Delete or Backspace to remove. Press Enter to toggle selection.


Language


Accent


Category


Age


Gender


Tag
20 results of 4111

Play audio

Cristina Campos
CaJslL1xziwefCeTNzHv


Copy VoiceID
latin american
young
es
female
conversational
Middle aged mexican female with a friendly conversational tone. Great for live conversations.

Play audio

Young Jamal
6OzrBCQf8cjERkYgzSg8


Copy VoiceID
american
young
en
male
social_media
Young Black African American voice. Perfect for casual conversation and social media voice overs to add spice into your creations.

Play audio

Norah – Warm Latina Voice
kcQkGnn0HAT2JRDQ4Ljp


Copy VoiceID
latin american
young
es
female
conversational
Excels at delivering warm, professional, and natural-sounding interactions. Norah is a young Latin American voice tailored for customer service and conversational AI. Her clear tone, friendly cadence, and neutral accent make her ideal for virtual assistants, help desks, and automated support systems. Whether guiding users or handling client inquiries, Norah adds a human touch to every interaction.

Play audio

Raju - Top Customer Care Voice
eyVoIoi3vo6sJoHOKgAc


Copy VoiceID
standard
young
hi
male
conversational
Raju's voice is already loved by more than 100k users and has been widely used for various conversational use cases. Therefore, we decided to record Raju again and create a dataset specifically tailored for customer care, sales agents, and similar applications. So, if you need a voice for chatbots or any other AI agent where a natural and conversational tone is essential, Raju's voice is the perfect choice for you.

Play audio

Simran - Friendly Personal Assistant
kFCe7jyOkkYKzOgpe2u0


Copy VoiceID
standard
young
hi
female
conversational
Simran delivers a clear, friendly, and reliable voice built for personal assistant experiences. Ideal for virtual assistants, smart devices, and apps similar to Alexa, Google Assistant, and Siri. She can answer phone calls on your behalf, handle IVR interactions, reminders, navigation, onboarding, FAQs, productivity tools, and smart home systems. Her calm, conversational tone suits consumer apps, SaaS platforms, AI companions, and customer-facing assistants.

Play audio

Zara – The Warm, Real-World Conversationalist
jqcCZkN6Knx8BJ5TBdYR


Copy VoiceID
american
young
en
female
social_media
Zara is a female voice, 20s–30s, blends warmth, clarity, and confident expression. Ideal for creators and brands who want their content to feel real, relatable, and human. Trained across multiple formats including storytelling, ads, social media, tutorials, and casual dialogue, Zara adapts seamlessly to your tone. Whether guiding, selling, or narrating, Zara builds trust, relatability, and connection from the very first word. Friendly, grounded, expressive - ready to elevate your content.

Play audio

Fernando Martinez
dlGxemPxFMTY7iXagmOj


Copy VoiceID
latin american
middle_aged
es
male
narrative_story
Middle aged casual male voice. Ideal for narrations.

Play audio

Mark - Natural Conversations
UgBBYS2sOqTuMpoF3BR0


Copy VoiceID
american
young
en
male
conversational
A casual, young-adult speaking in a natural manner. Perfect for Conversational AI.

Play audio

Jessica Anne Bogart - Conversations
g6xIsTj2HwM6VR4iXFCw


Copy VoiceID
american
middle_aged
en
female
conversational
Friendly and Conversational Female voice. Articulate, Confident and Helpful. Works well for Conversations.

Play audio

Hope - upbeat and clear
tnSpp4vdxKPjI9w0GnoV


Copy VoiceID
american
young
en
female
social_media

Play audio

Samara X
19STyYD15bswVz51nqLf


Copy VoiceID
british
middle_aged
en
female
social_media
An elegant yet relaxed British accent female voice that is warm, clear, trustworthy, thoughtful and engaging. Ideal for international projects that educate, explain, motivate or inspire.

Play audio

Hope- Your conversational bestie
uYXf8XasLslADfZ2MB4u


Copy VoiceID
american
young
en
female
conversational
A voice that sounds like a genuine conversation — natural mmms, ahhs, chuckles, and pauses make her perfectly imperfect, like chatting with a close friend or thoughtful AI therapist. Perfect for any AI assistant, best friend, therapist, audiobook or podcast!

Play audio

Hope - natural conversations
OYTbf65OHHFELVut7v2H


Copy VoiceID
american
young
en
female
conversational

Play audio

Christopher
G17SuINrv2H9FC6nvetn


Copy VoiceID
british
middle_aged
en
male
narrative_story
British male narrator, English, well-spoken, gentle and trustworthy voice. Great for audiobooks, podcasts and voiceovers.

Play audio

Jon - Warm & Grounded Storyteller
MFZUKuGQUsGJPQjTS4wC


Copy VoiceID
american
middle_aged
en
male
narrative_story
A warm, trustworthy American voice with a mature and grounded tone. Ideal for narration and commercials. It carries an intelligent and calm presence, making it perfect for delivering messages with clarity.

Play audio

Raquel pro v1
1eHrpOW5l98cxiSRjbzJ


Copy VoiceID
peninsular
young
es
female
conversational
Young Spanish female voice. Good for conversation.

Play audio

Ana-Rita
wJqPPQ618aTW29mptyoc


Copy VoiceID
british
young
en
female
narrative_story
A Young British Female Voice, Smooth, Expressive, Good for Book Narration.

Play audio

James - Husky & Engaging
EkK5I93UQWFDigLMpZcX


Copy VoiceID
american
middle_aged
en
male
narrative_story
A slightly husky and bassy voice with a standard American accent. Modulated, controlled, and direct and perfect for audiobooks, captivating narrations, or storytelling, or other professional voiceover work.

Play audio

Monika Sogam
2zRM7PkgwBPiau2jvVXc


Copy VoiceID
indian
young
en
female
social_media
Indian English accent voice for social media videos and audiobooks

Play audio

Adam - Brooding, Dark, Tough American
IRHApOXLvnW57QJPQH2P


Copy VoiceID
american
middle_aged
en
male
characters_animation
A tough hero, weathered by years of experience. American accent.
1
2
3
4
5
…
50
Page 1 of 50


Default voice settings





If you don't explicitly specify the voice attribute in your <ConversationRelay> configuration, ConversationRelay automatically applies a default voice based on the language setting (as defined by the language or ttsLanguage attribute) and the selected TTS provider (default is ElevenLabs). Below is the complete list of default voice settings:

Language	Voice ID	TTS provider	Speech model	Transcription provider
bg-BG	AB9XsbSA4eLG12t2myjN	ElevenLabs	long	Google
cs-CZ	uYFJyGaibp4N2VwYQshk	ElevenLabs	long	Google
da-DK	ygiXC2Oa1BiHksD3WkJZ	ElevenLabs	long	Google
de-DE	FTNCalFNG5bRnkkaP5Ug	ElevenLabs	telephony	Google
en-AU	9Ft9sm9dzvprPILZmLJl	ElevenLabs	telephony	Google
en-GB	Fahco4VZzobUeiPqni1S	ElevenLabs	telephony	Google
en-IN	mCQMfsqGDT6IDkEKR20a	ElevenLabs	long	Google
en-US	UgBBYS2sOqTuMpoF3BR0	ElevenLabs	telephony	Google
es-ES	6xftrpatV0jGmFHxDjUv	ElevenLabs	telephony	Google
es-US	CaJslL1xziwefCeTNzHv	ElevenLabs	telephony	Google
fi-FI	6xPz2opT0y5qtoRh1U1Y	ElevenLabs	long	Google
fr-CA	IPgYtHTNLjC7Bq7IPHrm	ElevenLabs	telephony	Google
fr-FR	a5n9pJUnAhX4fn7lx3uo	ElevenLabs	telephony	Google
hi-IN	IvLWq57RKibBrqZGpQrC	ElevenLabs	long	Google
hu-HU	TumdjBNWanlT3ysvclWh	ElevenLabs	long	Google
id-ID	1k39YpzqXZn52BgyLyGO	ElevenLabs	long	Google
it-IT	uScy1bXtKz8vPzfdFsFw	ElevenLabs	telephony	Google
ja-JP	3JDquces8E8bkmvbh6Bc	ElevenLabs	telephony	Google
kn-IN	kn-IN-Standard-A	Google	long	Google
ko-KR	uyVNoMrnUku1dZyVEXwD	ElevenLabs	telephony	Google
ml-IN	ml-IN-Standard-A	Google	long	Google
mr-IN	mr-IN-Standard-A	Google	long	Google
nl-BE	s7Z6uboUuE4Nd8Q2nye6	ElevenLabs	telephony	Google
nl-NL	UNBIyLbtFB9k7FKW8wJv	ElevenLabs	telephony	Google
pl-PL	W0sqKm1Sfw1EzlCH14FQ	ElevenLabs	long	Google
pt-BR	CstacWqMhJQlnfLPxRG4	ElevenLabs	telephony	Google
pt-PT	TsZfI8Nbn2Xd7ArC76n9	ElevenLabs	telephony	Google
ro-RO	OlBp4oyr3FBAGEAtJOnU	ElevenLabs	long	Google
ru-RU	AB9XsbSA4eLG12t2myjN	ElevenLabs	long	Google
sv-SE	4xkUqaR9MYOJHoaC1Nak	ElevenLabs	long	Google
ta-IN	ZhJ5LanYnCmLKQUXvsV7	ElevenLabs	long	Google
te-IN	te-IN-Standard-A	Google	long	Google
th-TH	th-TH-Standard-A	Google	long	Google
tr-TR	IuRRIAcbQK5AQk1XevPj	ElevenLabs	long	Google
uk-UA	nCqaTnIbLdME87OuQaZY	ElevenLabs	long	Google
vi-VN	foH7s9fX31wFFH2yqrFa	ElevenLabs	long	Google
Our internal configuration defines these default settings and updates them periodically. Refer to the Twilio Twilio TTS Voices documentation for a complete and current list of supported languages, default voices, and detailed settings.