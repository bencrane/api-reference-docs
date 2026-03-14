# Test SMS messaging with the Virtual Phone

The Twilio Virtual Phone simulates a mobile device in the Twilio Console. Use the Virtual Phone to test SMS messaging from your development environment or from the Console.

The Virtual Phone offers these benefits:

- Send SMS messages without toll-free verification, A2P 10DLC registration, or other SMS-related regulatory requirements. Sending messages between your Twilio phone number and the Virtual Phone doesn't require any regulatory compliance.
- Test multiple SMS apps at the same time. Switch between multiple senders, including your Twilio phone numbers and configured Messaging Services.
- Test SMS messaging without going over a carrier network or using a real recipient device.

The Virtual Phone interface displays messages sent to the Virtual Phone's toll-free number: +1 877 780 4236. Twilio filters messages by account, so other users can't see messages you send to the Virtual Phone.

> **Note:** Free trial accounts - You can use your trial account phone number to send SMS messages to the Twilio Virtual Phone. When you sign up for a Twilio free trial account, Twilio assigns you a phone number or directs you to purchase one using your trial balance.

## Test SMS messaging from your development environment

Open the Twilio Console and go to **Messaging > Virtual Phone**.

You can test SMS messaging using the Messaging API and the Virtual Phone in the following ways:

- Send messages between your application and the Virtual Phone.
- Send messages from the command line to the Virtual Phone using curl.
- Send messages from Postman, or other API clients, to the Virtual Phone.

Messages you send to the Virtual Phone with the Messaging API appear in the Virtual Phone interface.

Click **Switch to API Explorer** to view a request that uses the selected Sender type and Phone number or Messaging Service values. To change the format of the request, select your preferred language from the Request box menu. You can choose curl or any language supported by a Twilio SDK.

Switch back to the Virtual Phone view to see the message you sent.

> **Warning:** Don't use your Account SID and Auth Token in production apps. To test on a local machine, you can use your Account SID and Auth token for authentication. For production apps, use API keys for authentication.

## Send an SMS from your application

If your application already sends SMS, select your language, and then copy and paste the sender and Virtual Phone details from the Console into your application code.

To add a pre-formatted SMS request to your application, follow these steps:

1. Go to the Virtual Phone page in the Console.
2. Click **Switch to API Explorer**.
3. Click **Show auth token** in the Request box.
4. Copy the request into your code project and then run your code to send the message.
5. In the Console, click **Switch to Virtual Phone**.
6. Your message displays in the Virtual Phone inbox.

For a step-by-step guide that shows how to send messages between an application and the Virtual Phone, see the SMS developer quickstart.

## Send an SMS with curl

To test sending an SMS message with curl, follow these steps:

1. Go to the Virtual Phone page in the Console.
2. Click **Switch to API Explorer**.
3. Click **Show auth token** in the Request box.
4. Copy the curl command into your terminal and press Enter.
5. In the Console, click **Switch to Virtual Phone**.
6. Your message displays in the Virtual Phone inbox.

## Send an SMS with an API client

To test sending an SMS message with an API client such as Postman, follow these steps:

1. Go to the Virtual Phone page in the Console.
2. In your API client, copy the Virtual Phone number into the `to:` field and your Twilio phone number into the `from` field of the request body.
3. Send the request.
4. In the Console, click **Switch to Virtual Phone**.
5. Your message displays in the Virtual Phone inbox.

For example requests, see the Postman collection for Twilio Messaging.

## Test Messaging Service capabilities and use cases

Use the Virtual Phone to verify how your Messaging Service manages outgoing and incoming messages among sender pool numbers, and to confirm that programmatic features work as expected.

To test inbound SMS use cases for your Messaging Service, such as when a customer reaches out to customer support, use the New Chat feature of the Virtual Phone. You can switch between senders during testing to make sure inbound messages go to the correct sender.

To test SMS messaging with a Messaging Service, follow these steps:

1. Go to the Virtual Phone page in the Console.
2. Select **Messaging Service** as the Sender type, and then select a Messaging Service from the list.
3. The Virtual Phone shows a list of senders in the Messaging Service sender pool that have a message history with the Virtual Phone.
4. In the Virtual Phone inbox, click **New Chat**.
5. The Virtual Phone shows a list of all the SMS-capable senders in the Messaging Service sender pool.
6. Select a sender from the list.
7. Send a message from the Virtual Phone to the sender.
8. The Virtual Phone displays all the messages between the sender and the Virtual Phone.

## Receive and reply to messages from the Virtual Phone

You can use the Virtual Phone to test receiving messages in your application and sending replies. For an example of receiving and replying to an inbound SMS message, see the SMS developer quickstart.

## Test SMS messaging from the Twilio Console

Open the Twilio Console and go to **Messaging > Try it out > Send an SMS**.

The Send an SMS page provides sender options and SMS testing tools, including the Virtual Phone interface:

- **Send to Virtual Phone:** Send a message to the Virtual Phone from one of your Twilio numbers, either directly or with a Messaging Service.
- **Send to personal number:** Send a message to a personal mobile number from one of your Twilio numbers, either directly or with a Messaging Service.

> **Warning:** Personal number limitations - All country-specific phone number regulations apply. If you have a trial account, Twilio limits recipients to phone numbers that you verified in your account.

- **API Explorer:** Displays the SDK code to send the SMS message with the Twilio API using the values in the Send to Virtual Phone or Send to personal number form. After you send the SMS from the form, the API Explorer displays the response. You can't edit API Explorer content directly, but you can change the request language from the menu in the Request box.
- **Virtual Phone:** Displays messages sent to the Virtual Phone number in a simulated mobile device. You can also respond to the sender from the Virtual Phone interface.

### Send to Virtual Phone

Send an SMS to the Twilio Virtual Phone:

1. Leave the To box unchanged. Messages are sent only to the Virtual Phone number.
2. Choose the Sender type, and then select a Twilio Phone number or a Messaging Service.
3. Type your message in the Message field.
4. Click **Send an SMS**.
5. A banner displays either a success or an error message. To learn more about errors, click Messaging Logs.

The API Explorer displays the SDK code to send the SMS message with the Twilio API using the values you provide in the Send to Virtual Phone form. The response includes an HTTP status code and the response body in JSON format. For complete examples that show how to send and receive SMS messages from the Virtual Phone, see the SMS developer quickstart.

To see and respond to the message in the Virtual Phone interface, click **Virtual Phone**.

## Next steps

- Try the SMS developer quickstart or SMS no-code quickstart.
- Learn how to make API requests to Twilio.
- Explore all the Messaging channels that Twilio supports.