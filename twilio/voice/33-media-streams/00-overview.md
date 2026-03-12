Media Streams - Overview




Media Streams provides access to the raw audio from a Programmable Voice call by streaming it over WebSockets to a destination you specify. This enables use cases such as real-time transcriptions, sentiment analysis, voice authentication, and more. You can also stream raw audio into a Twilio Voice call from another application, enabling conversational Interactive Voice Response (IVR) or real-time interactions with an AI chatbot.


(information)
Support for Twilio Regions
You can use Media Streams in the Ireland (IE1) and Australia (AU1) Regions. To set up Media Streams with these regions, follow the guides for non-US outbound and inbound calls. The default region remains US1.
To get started with Media Streams, first make sure you're familiar with making and receiving voice calls with Twilio. If this is your first time building with Twilio Programmable Voice, complete one of the Voice quickstarts.

Before you build with Media Streams, decide whether you need a unidirectional or bidirectional stream. The sections below explain the differences between each option and provide links to helpful docs and resources.

Unidirectional Media Streams





In a unidirectional Media Stream, your WebSocket application receives the call's audio but can't send audio back to Twilio for playback.

With unidirectional Media Streams, you can receive the inbound audio track (the audio that is incoming to Twilio), the outbound audio track (the audio that Twilio is generating on the call), or both tracks.

DTMF isn't supported with unidirectional streams.

Start a unidirectional stream with the <Start><Stream> TwiML verb or through the Stream resource REST API.

If you use TwiML for the stream, Twilio executes <Start><Stream>, which initiates the audio stream with your WebSocket server, and then executes the next TwiML instruction you provide.

You can stop a unidirectional Media Stream using <Stop><Stream> or via the Stream resource.

Resources for unidirectional Media Streams





Use the following resources to build your unidirectional Media Streams application:

<Stream> TwiML Reference
Stream Resource API Reference
WebSocket Messages
Learn about the format and contents of the WebSocket messages that Twilio sends to your server
Sample applications are available in the following languages:

Node.js

Python

Java

Bidirectional Media Streams





Bidirectional Media Streams are those in which your WebSocket application both receives audio from Twilio and can send audio to Twilio, which is then played on the Call. An example use case for bidirectional Media Streams is to facilitate a real-time voice conversation with an AI assistant.

With bidirectional Media Streams, you can only receive the inbound track.

DTMF is supported with bidirectional Media Streams only in the inbound direction, from Twilio toward your media server. Sending DTMF outbound from your media server toward Twilio is not supported.

To start a bidirectional Media Stream, use <Connect><Stream>. These TwiML instructions block subsequent TwiML instructions unless the WebSocket connection is disconnected.

You can't use the Stream resource to start a bidirectional Media Stream.

You can stop a bidirectional Media Stream by closing the WebSocket connection from your server or by ending the Call.

Resources for bidirectional Media Streams





Check out the following resources to help you build your bidirectional Media Streams application:

<Stream> TwiML Reference
WebSocket Messages
The "Send WebSocket messages to Twilio" section covers how to send audio back to Twilio.
Basic bidirectional stream sample application

Limits





For unidirectional Streams, you can stream up to four tracks at a time on a Call.

For bidirectional Streams, you can have only one Stream per Call.

Each Media Stream is associated with one WebSocket connection.

Communicate with Twilio's media servers





Your Media Streams application must be able to communicate with Twilio.

Configure your firewall rules to allow secure WebSocket connections (TCP port 443) from Twilio to your WebSocket servers from any public IP address.

You must also configure your application to validate the X-Twilio-Signature header. This is how your application verifies that a Media Stream is coming from an authentic Twilio source. Learn more on the General Usage - Security page.

Next steps





Explore these resources to learn more about Media Streams:

<Stream> TwiML Reference
WebSocket Messages
Learn about the format and contents of the WebSocket messages that Twilio sends to your server, as well as the messages your application can send back to Twilio.
Stream Resource API Reference
Sample application GitHub repo