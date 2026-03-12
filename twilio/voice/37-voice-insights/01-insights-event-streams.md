Voice Insights - Voice Insights Event Streams
Don't get us wrong, REST APIs are great; however, at scale and across potentially dozens of endpoints for a given application to interact with, the venerable HTTP REST API starts to show its age a little bit.
__Event Streams__ is an API that allows you to tap into a unified event stream and have it piped directly into your data infrastructure using modern technologies like Amazon Kinesis.
For __Voice Insights__ the event stream emits events following the pattern `com.twilio.voice.insights.*` and comprises event streams for Call Insights and Conference Insights as shown below.
Event StreamDescription__Call Insights Event Stream__Event stream to consume call summaries, call metrics and call insights events.__Conference Insights Event Stream__Event stream to consume conference summaries and conference participant summaries.
For more information about Event Streams, see __our docs__.