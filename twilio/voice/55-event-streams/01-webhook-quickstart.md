# Webhook Quickstart




You can use webhooks as a sink for Event Streams. This guide will show you how to create a webhook Sink, subscribe to events, and validate the webhook signature.


(information)
Info
Webhook connection overrides are not supported in Event Streams.
For more information, see the following resources:

How to validate Twilio Event Streams webhooks in Java

How to validate Twilio Event Streams webhooks in PHP

Validating Signatures from Twilio.
Create a Sink Instance





Install and set up the Twilio CLI for your account.

To create a new Webhook Sink, run the following command:



Copy code block
twilio api:events:v1:sinks:create --description *SINK_DESCRIPTION* \
--sink-configuration '{"destination":"${your webhook endpoint}","method":"${POST or GET}"}' \
--sink-type webhook


Copy code block
twilio api:events:v1:sinks:create --description <add sink description here> \
--sink-configuration '{"destination":"${your webhook endpoint}","method":"${POST or GET}"}' \
--sink-type webhook

(information)
Info
If Twilio can't deliver events to your Sink because of a problem with the Sink, Twilio sends error notifications through Twilio Debugger. After the first error about Sink failure, we will continue to notify you every 20 minutes. The notification will include the Sink ID and error details. The maximum timeout for a webhook Sink response is 5 seconds.
Subscribe to Twilio Events





Now that you have created a Webhook Sink, you can subscribe to one or more events. Below are some of the available events. To see a full list of available events, see the Event Types navigation menu.

Event type	Schema version
com.twilio.voice.insights.call-summary.partial	1
com.twilio.voice.insights.call-summary.predicted-complete	1
com.twilio.voice.insights.call-summary.complete	1
You can subscribe to any of these events by making an API call. This is done with the following command. The new subscription is configured to read the event-types from the --types argument — you'll need the event type and schema version from the table above. The event-types you specify in the --types argument will be sent to the Sink specified by the --sink-sid argument. Use the Sink SID of the Sink you created above.



Copy code block
twilio api:events:v1:subscriptions:create --description <description> \
  --sink-sid <sink id DGxxx> \
  --types '{"type": "<event_type>","schema_version": <version>}'
For instance, to subscribe to all call summary events, you would run:



Copy code block
twilio api:events:v1:subscriptions:create \
  --description "Subscription on 3 call_summary events" \
  --sink-sid <sink id DGxxx> \
  --types '{"type":"com.twilio.voice.insights.call-summary.partial","schema_version":1}' \
  --types '{"type":"com.twilio.voice.insights.call-summary.predicted-complete","schema_version":1}' \
  --types '{"type":"com.twilio.voice.insights.call-summary.complete","schema_version":1}'
Validate the webhook signature





You must ensure that the HTTP requests to your web application are coming from Twilio and not a malicious third party.

Twilio provides libraries to validate requests.

To validate Event Streams requests, the URL must match the destination of your Sink with any additional query parameters you received:



Copy code block
url = SINK_URL + "?"+ request.getQueryString()
validator.validate(url, rawBody, signature)
Read and parse the data





Data is sent to the webhook sinks. The body of each webhook is a JSON array of CloudEvents

. Currently, the array contains only one event. However, you should iterate through the array to future-proof your implementation.

Here's an example of a Voice Insights Call Summary Predicted Complete event:



Copy code block
{
"specversion": "1.0",
"type": "com.twilio.voice.insights.call-summary.predicted-complete",
"source": "/v1/Voice/CA00000000000000000000000000000000/Summary",
"id": "EZ00000000000000000000000000000000",
"dataschema": "https://events-schemas.twilio.com/VoiceInsights.CallSummary/1",
"datacontenttype": "application/json",
"time": "2020-07-23T22:56:33.000Z",
"data": "{\"call_sid\":\"CA00000000000000000000000000000000\",\"account_sid\":\"AC00000000000000000000000000000000\",\"parent_call_sid\":\"\",\"parent_account_sid\":\"\",\"start_time\":\"2020-07-23T22:56:28Z\",\"end_time\":\"2020-07-23T22:56:33Z\",\"duration\":0,\"connect_duration\":0,\"call_type\":\"client\",\"call_state\":\"canceled\",\"from\":{\"caller\":\"+55555555\",\"callee\":\"\",\"carrier\":\"MEGA:CORP\",\"connection\":\"landline\",\"number_prefix\":\"5555\",\"location\":{\"lat\":0.0,\"lon\":-0.0},\"city\":\"\",\"country_code\":\"US\",\"country_subdivision\":\"\",\"ip_address\":\"\",\"sdk\":null},\"to\":{\"caller\":\"\",\"callee\":\"client:SOMECLIENT\",\"carrier\":\"\",\"connection\":\"twilio_sdk\",\"number_prefix\":\"\",\"location\":null,\"city\":\"\",\"country_code\":\"\",\"country_subdivision\":\"\",\"ip_address\":\"\",\"sdk\":null},\"processing_state\":\"partial\",\"processing_version\":1,\"sip_edge\":null,\"carrier_edge\":null,\"sdk_edge\":null,\"client_edge\":null,\"tags\":[],\"attributes\":null,\"properties\":{\"q850_cause\":0,\"last_sip_response_num\":0,\"pdd_ms\":0,\"route_id\":\"\",\"media_region\":\"unknown_realm\",\"signaling_region\":\"unknown_realm\",\"twilio_media_ip\":\"\",\"twilio_signaling_ip\":\"\",\"external_media_ip\":\"\",\"external_signaling_ip\":\"\",\"sip_call_id\":\"\",\"user_agent\":\"\",\"selected_region\":\"unknown_realm\",\"region\":\"unknown_realm\",\"trunk_sid\":\"\",\"disconnected_by\":\"unknown_disconnected_by\",\"direction\":\"outbound_api\",\"settings\":null}}"
}
The data field should meet its schema, which is the Voice Insights Call Summary schema

 in this case.