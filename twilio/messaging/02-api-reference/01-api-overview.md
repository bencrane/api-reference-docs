# Messaging API Overview

With the Programmable Messaging REST API, you can add messaging capabilities to your application.

## Base URLs

To ensure data privacy, Twilio serves its APIs over HTTPS.

Messaging-related APIs use three base URLs:

### Twilio API base URL

The following API resources that process SMS messages point to the Base URL of `https://api.twilio.com/2010-04-01`:

- Messages resource
- Feedback subresource
- Media subresource

The following API resources that manage Messaging Services point to `https://messaging.twilio.com/v1`:

- Services resource
- PhoneNumbers subresource
- Shortcodes subresource
- AlphaSenders subresource
- DestinationAlphaSenders subresource
- ChannelSenders subresource

The following API resources that report on deactivated phone numbers and process toll-free verification requests also point to `https://messaging.twilio.com/v1`:

- Deactivations resource
- Verifications resource

The API resource that reports on per-country SMS pricing points to the `https://pricing.twilio.com/v1` base URL.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports HTTP Basic authentication. Use your API key as the username and your API key secret as the password. You can create an API key either in the Twilio Console or using the API.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the Twilio Console.

Learn more about Twilio API authentication.

Here's an example of authenticating with the API:

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts \
     -u $TWILIO_API_KEY:$TWILIO_API_KEY_SECRET
```

## Use the Programmable Messaging API

> **Info:** Twilio monitors messages to prevent content violating the Acceptable Use Policy (AUP). This helps to ensure that Twilio Messaging is seen as a trustworthy, high engagement channel and will not slow down the delivery of messages.
>
> If a message you send has violated the AUP, it will be returned and you will receive an error code which identifies the necessary changes you need to make before sending it again.

### Send messages

To send an outbound message, send a POST request to the Messages resource.

- To send media messages, use the `MediaUrl` parameter in the request.
- To schedule an outbound Message to be sent in the future, use the `ScheduleType` and `SendAt` parameters in the request.
- To send messages with shortened links, use the `ShortenUrls` parameter in the request.
  - **Note:** This feature is available only if you use a Messaging Service.

To learn more about how to receive and reply to messages, see Receive and Reply to Messages Guide.

### Fetch, list, update, and delete messages

Use the Messages resources to fetch, list, and delete Messages associated with your account.

Redact messages by updating a Message resource.

### Fetch, list, and delete media

Twilio creates a Media subresource when an incoming or outgoing Message resource contains media.

You can fetch, list, and delete Media subresources.

### Manage your short codes

Fetch, list, and update your Account's short codes with the ShortCodes subresource.

### Track message feedback

Track user-reported outcomes of Messages with the Feedback subresource.

### Manage your Messaging Services

Create, fetch, read, update, and delete Messaging Services with the Services resource.

Manage your Messaging Services' senders with the following subresources:

- ShortCodes subresource
- AlphaSenders subresource
- DestinationAlphaSenders subresource
- PhoneNumbers subresource
- ChannelSenders subresource

### Check SMS pricing by country

Check inbound and outbound SMS message pricing with the Messaging Countries subresources of the Pricing API.

### Retrieve a list of deactivated US phone numbers

Fetch a list of all US phone numbers that were deactivated on a given day with the Deactivations resource.

### Verify that your toll-free number complies with regulations

Demonstrate that your toll-free number complies with US and Canadian SMS regulations. Submit, update, or delete toll-free verification (TFV) requests with the Verifications resource.

## Additional resources

- SMS developer quickstart
- For inspiration, read the Twilio Blog on building messaging applications with various languages and tools.
- Get started with toll-free verification.
- For help troubleshooting your Programmable Messaging application, check out the docs on Debugging Common Issues and Debugging Tools.
- Learn more about Twilio's Global Infrastructure, which allows you to control where your application's Twilio-related data is routed, processed, and stored.