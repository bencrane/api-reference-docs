ConversationRelay - Onboarding




Twilio's ConversationRelay extends voice interactions by integrating real-time speech recognition and synthesis into your applications. You can use this service to create flexible and responsive conversational experiences.

This guide walks you through the process of integrating your Twilio application with the ConversationRelay service.

Prerequisites





Complete these prerequisite steps before starting the integration process:

Set up your Twilio account





Ensure you have a Twilio account set up and log into the Twilio Console

.

Configure WebSocket server





Set up a WebSocket server to handle communication with ConversationRelay.

You can set up a WebSocket server using various frameworks and programming languages, such as Node.js with Fastify

, Python with FastAPI

, or others that support WebSocket protocols.

Note: Ensure your WebSocket server is accessible via a wss:// URL.

WebSocket security with signature validation

ConversationRelay includes an X-Twilio-Signature header in the initial WebSocket handshake request. This signature allows you to validate that requests are genuinely coming from Twilio, following the same verification mechanism used for standard Twilio webhooks.

To validate this signature:

Extract the X-Twilio-Signature header from the incoming WebSocket connection request.
Use your Twilio auth token and the request URL to validate this signature.
Only accept connections with valid signatures to prevent spoofed requests.
For detailed implementation guidance, refer to Twilio's webhook security documentation.

Integrate Twilio with ConversationRelay





Once you've completed the prerequisites, follow these steps to integrate your Twilio application with ConversationRelay.

Configuration steps in the Twilio Console





Log in to your Twilio Console

.
Navigate to the Voice section, select General under Settings, and turn on the Predictive and Generative AI/ML Features Addendum in order to use ConversationRelay.
Navigate to the Voice section and select TwiML Apps under Manage.
Create a new TwiML App or select an existing one.
In the TwiML App settings, configure the Voice URL to point to your application's endpoint (for example, https://yourserver.com/voice) where Twilio can retrieve the TwiML containing the <ConversationRelay> instructions.
Save your changes.
Configure ConversationRelay in your application






(warning)
Warning
Ensure your WebSocket server is properly configured to handle incoming messages from ConversationRelay. If not, you may encounter connection errors.
After configuring your TwiML App, update your application to handle ConversationRelay interactions:

Use the <Connect><ConversationRelay> TwiML noun to route calls to the ConversationRelay service.
Specify the WebSocket URL and any additional attributes needed for your use case.
Example TwiML:



Copy code block
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect action="https://myhttpserver.com/connect_action">
    <ConversationRelay url="wss://mywebsocketserver.com/websocket" welcomeGreeting="Hi! Ask me anything!" />
  </Connect>
</Response>
Develop your application with ConversationRelay





Once you've integrated ConversationRelay, you can enhance your application with advanced voice capabilities. Consider the following features:

Real-time speech recognition





Use ConversationRelay's real-time speech recognition to process caller input and respond dynamically.

Text-to-speech synthesis





Use ConversationRelay to convert text responses into natural-sounding speech, providing a seamless conversational experience.

For optimal speech quality, apply proper text normalization techniques (such as writing out numbers as words or spelling out abbreviations). See the ConversationRelay documentation for detailed text normalization best practices.

Custom parameters





Pass custom parameters to ConversationRelay to tailor interactions based on specific use cases.

Next steps





Learn more about building applications with ConversationRelay by exploring the following tutorials:

Integrate OpenAI with Twilio Voice Using ConversationRelay

Building Voice Bots with Twilio's ConversationRelay

ConversationRelay Application and Architecture for Voice AI Applications Built on AWS