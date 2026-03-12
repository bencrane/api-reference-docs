# Kinesis quickstart




Prerequisites





Before continuing with this quickstart, perform the following tasks.

Install the AWS CLI

.
Configure valid AWS credentials

.
Set the value of the environment variable AWS_DEFAULT_REGION to your desired region if needed.
Install and configure the Twilio CLI for your account.
Download the Twilio Kinesis script.
Install jq

.
Create a Kinesis stream for your Account





The Twilio Kinesis script configures the policies and roles needed to allow Twilio to write to your stream. Run the script and pass the stream name and shard count as arguments.

Copy the script and save it to a file named create_kinesis_stream.sh.
Make this script executable.


Copy code block
chmod 755 create_kinesis_stream.sh
Run the script.
Use the name twilio-events for the Kinesis stream. If you use any other name, change the permission instructions to use your custom name.
Set the number of shards to 1. This makes initial validation easier. You can modify it after the Sink has been set up.
Example of creating a Kinesis stream with shards set to 1



Copy code block
./create_kinesis_stream.sh twilio-events 1 | jq . > twilio-sink.json
To create the Kinesis stream with the specific shard count, the script uses the AWS CLI. It returns a JSON payload with the details you need to create a Sink. In the previous example, the script writes the received data to a file named twilio-sink.json.

Update the Kinesis shard count





To update the shard count of the Kinesis stream after it has been validated, run the following script:

Shard count change script



Copy code block
if [ $# -ne 2 ]; then
  echo
  echo "usage: $0 <stream_name> <shard_count> <scaling_type>"
  echo "<scaling_type> possible values UNIFORM_SCALING"
  echo
  exit 1
fi

# update stream
STREAM_NAME=$1
SHARD_COUNT=$2
SCALING_TYPE=$3

aws kinesis update-shard-count --stream-name $STREAM_NAME --scaling-type $SCALING_TYPE --target-shard-count $SHARD_COUNT
Example of increasing the Kinesis stream shard count to 6



Copy code block
./update_kinesis_shard_count.sh twilio-events 6 UNIFORM_SCALING
Create a Kinesis Sink instance





To create a Kinesis Sink, run this command:

Create a Kinesis Sink example



Copy code block
twilio api:events:v1:sinks:create --description "<add description here>" \
  --sink-configuration '{"arn":"${your kinesis arn}","role_arn":"${your role arn created above}","external_id":"${external id created above}"}' \
  --sink-type kinesis
Test Your Kinesis Sink





To test your sink, send a test message to your Kinesis.

Run the following Twilio CLI command:


Copy code block
twilio api:events:v1:sinks:test:create --sid ${SID}
Download the test message script as cat_kinesis.sh.
Make the script executable.


Copy code block
chmod 755 cat_kinesis.sh
Run the script on your Kinesis stream.


Copy code block
./cat_kinesis.sh twilio-events
The script outputs a test event:


Copy code block
{
  "specversion": "1.0",
  "type": "com.twilio.eventstreams.test-event",
  "source": "Sink",
  "id": "AC1234567890123456789012",
  "dataschema": "https://events-schemas.twilio.com/EventStreams.TestSink/1.json",
  "datacontenttype": "application/json",
  "time": "2020-08-18T21:10:02.113Z",
  "data": "{\"test_id\":\"95001c1e-5b8e-45f5-830d-f9cbf1d16420\"}"
}
If Twilio can't deliver events to your Sink due to a problem with the Sink, errors display in the Twilio Debugger. After the first error about Sink failure, notifications continue in Debugger every 20 minutes. The notification includes the Sink ID and details about the error.

Subscribe to Twilio events





With your Sink tested, you can subscribe to one or more events. The following table lists some of the available events. To review other event types, see the Event Types heading in the side table of contents.

Event Type	Schema Version
com.twilio.voice.insights.call-summary.partial	1
com.twilio.voice.insights.call-summary.predicted-complete	1
com.twilio.voice.insights.call-summary.complete	1
To subscribe to any of these events, make an API call as shown in the following example. The new subscription reads the event-types from the --types argument. Use the event type and schema version from the previous table. The event-types you specify in the --types argument are sent to the Sink specified given in the --sink-sid argument. Use the SID of the Sink you created.

Example Twilio CLI call to your Sink



Copy code block
twilio api:events:v1:subscriptions:create --description <description> \
  --sink-sid "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
  --types '{"type": "<event_type>","schema_version": <version>}'
For instance, to subscribe to all call summary events, you would run:

Subscribe to all call summary events example



Copy code block
twilio api:events:v1:subscriptions:create \
  --description "Subscription on 3 call_summary events" \
  --sink-sid "DGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
  --types '{"type":"com.twilio.voice.insights.call-summary.partial","schema_version":1}' \
  --types '{"type":"com.twilio.voice.insights.call-summary.predicted-complete","schema_version":1}' \
  --types '{"type":"com.twilio.voice.insights.call-summary.complete","schema_version":1}'
Read from your Kinesis stream





You can tail the events coming out of Kinesis with the cat_kinesis.sh script.

Tail the events in the Kinesis stream



Copy code block
./cat_kinesis.sh twilio-events
The script iterates over the specified shards in a stream and requests records from them. All data in the stream has been Base64 encoded. The script decodes it and uses jq so humans can read the output.

Parse the data





Twilio sends the data to Kinesis in the CloudEvents

 format. The SDK encodes into and decodes from Base64 to Kinesis. Depending on how you read the data from Kinesis, you might have to decode the data from Base64.

Voice Insights Call Summary Predicted Complete event



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
The data field should follow the Voice Insights Call Summary schema

.