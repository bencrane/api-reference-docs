# Event Streams




The Event Streams REST API provides access to a unified stream of every interaction sent or received on Twilio. Event Streams supports streaming events to multiple sinks (destinations), unlike the single-producer-to-single-consumer model. Event Streams provides the following capabilities:

Stream your data to your existing systems by configuring a persistent streaming technology such as Amazon Kinesis

. You can also send events to Segment

 or webhooks.
Consume data from multiple Twilio products with consistent metadata, well-defined and versioned schemas, and control over which events you want delivered.
Queues your events if your system goes down and delivers them when it's back up, with event queuing for up to 4 hours.
Event Streams overview





Twilio logs actions within our platform as events. Use the Event Streams REST API to set up and manage subscriptions to specific events. You can stream events to multiple sinks (destinations).

Event Streams subscriptions and sinks





An Event Streams subscription specifies the event types and schema versions that you want to receive. A sink is the destination for your subscription. You can configure Event Streams to send events to Amazon Kinesis, Segment, or webhooks.

Guaranteed at-least-once delivery





Event Streams guarantees at-least-once delivery of events. Twilio sends each event to your system at least once, and we might send the same event more than once when retrying delivery after a failure. Learn more about delivery retries and dealing with duplicate events.

Asynchronous event delivery





Receiving events in order isn't guaranteed. Event Streams might deliver events out of order, especially when retrying delivery. All events have timestamps that you can use to determine the order of events.

Differences between Event Streams and webhooks





Event Streams is additive and doesn't replace webhooks. Twilio continues to support existing webhooks and add new webhooks for TwiML use cases and for customers who prefer per-channel integrations.

Some Twilio webhooks are informational, while others require a response in Twilio Markup Language (TwiML). The delivery of an event using Event Streams is similar to an informational webhook.

Event Streams isn't a replacement for webhooks that respond with TwiML. Twilio delivers events asynchronously and there is no bi-directional channel to send a response to an event. If you need to take action in response to an event, then you'll need to do so outside of the Event Streams channel and product.

Event Streams has advantages over informational webhooks:

Event Streams provides a consistent format for all data, making it easier to consume when you're using multiple products or a product that's built on top of multiple products, such as Flex and Studio.
Event Streams provides at-least-once delivery of events. If an event isn't delivered, because of an error within Twilio or an error from your server, then Event Streams attempts redelivery.
Event Streams supports Amazon Kinesis and Segment sinks.
Delivery latency





Event Streams usually delivers events within seconds. However, Event Streams focuses on reliable delivery. Thus, Event Streams does not provide any guarantees (SLA or otherwise) regarding latency.

Use traditional webhooks instead of Event Streams if your usecase requires real-time or near-real-time delivery.

Log retention periods





The maximum retention period for application logs through Event Streams is seven days.
The maximum retention period for error logs is 23 days at the account level.
Event Streams for subaccounts





Event Streams supports both ISVs (Independent Software Vendors) and direct customers. You can configure Event Streams for subaccounts, but there is no way to receive events from all subaccounts with a single Event Streams subscription. Instead, create an Event Streams subscription for each subaccount.

Pricing





Event Streams is available at no additional cost. You pay only for the underlying Twilio products that generate the events.

Webhook IP addresses





Webhooks from Event Streams originate from the 35.90.102.128/25 CIDR block.

Webhook authentication





You may specify a username and password in the user info component of the destination URL of webhook sinks.

Webhook sinks that include user credentials use HTTP Basic authentication. HTTP Digest authentication is not supported.
When the sink URL contains user credentials, Event Streams adds the Authorization header to every request, even if the service has not yet returned a 401 Unauthorized response.
Get started with Event Streams





You can start using Event Streams by creating Sink and Subscription resources. The following guides can help you get started with the Event Streams API:

Webhook Quickstart
Amazon Kinesis Quickstart
Segment Quickstart
We also provide SDKs for popular programming languages to help you integrate Event Streams.

Event Streams API resources





To build with Event Streams, use the following API resources:

Event Type resource: the event types that are available through the Event Streams API.
Sink resource: the destinations to deliver the subscribed events to.
Subscription resource: subscribe to specific Twilio events and versions.
Schema resource: the Event Type schemas that define the organization of information within events.
Resource limits





You can have up to 100 Sink resources and 100 Subscription resources per account. Every subaccount can also have up to 100 Sink resources and 100 Subscription resources.