ConversationRelay - Overview

ConversationRelay
Twilio's ConversationRelay empowers you to build powerful AI voice experiences for your customers. Let Twilio handle the heavy lifting of speech recognition, text-to-speech, and voice synthesis, so you can focus on building your application.
Get started now
1
TWILIO SERVERS
2
YOUR APP

```
const VoiceResponse = require('twilio').twiml.VoiceResponse;

```

const response = new VoiceResponse(); 
const connect = response.connect({ 
action: 'https://myhttpserver.com/connect_action' 
}); 
connect.conversationRelay({ 
url: 'wss://mywebsocketserver.com/websocket', 
welcomeGreeting: 'Hi! Ask me anything!' 
});
3
ConversationRelay streams your response to the caller using a natural-sounding voice
Take the next steps with ConversationRelay
Guides
Learn more
Understanding your AI models
Guides
After you've completed the __onboarding steps__, you are ready to start building your first application. Tap on one of the below tutorials to get started with building your first ConversationRelay app.
Integrate OpenAI with Twilio Voice Using ConversationRelayBuilding Voice Bots with Twilio's ConversationRelayApplication and Architecture for Voice AI Applications Built on AWSBuild a Voice AI Application With Twilio ConversationRelay and BentoML
Learn more
ConversationRelay is flexible — and there are many ways to build an application that uses it. Tap on the links below to find tutorials and reference documentation for ConversationRelay and related Twilio services.
Reference documentation
* `<ConversationRelay>`__ TwiML reference__
* `<Say>`__ TwiML reference__
* __Getting and sending WebSocket messages__
What others are building
* __simple-conversation-relay on GitHub__
* __Tips for building with Twilio ConversationRelay__
Guides
* __ConversationRelay integration for AI agent observability__
* __Picking a ConversationRelay voice__
* __Best practices for optimizing your ConversationRelay app__
Understanding your AI models
ConversationRelay uses artificial intelligence and machine learning technologies. We want you to understand how these technologies work, what data they use, and how they're trained. That's why we provide __AI Nutrition Facts__ for our AI-powered features. Tap on the name of a provider to learn more about the characteristics of their TTS and STT models.
Deepgram AI
Google AI
Amazon AI
ElevenLabs
Related products
Twilio offers other tools to enhance your voice applications such as adding in-application chat and synchronizing your application's state across devices.
Conversational Intelligence
Unlock the value in every customer interaction with AI-powered transcription and language analysis.
Product documentation
Flex
Build digital engagement for your contact center, sales conversations, and personalized support
Product documentation
Voice
Build unique phone call experiences with one API to make, receive, control, and monitor calls around the globe.
Product documentation