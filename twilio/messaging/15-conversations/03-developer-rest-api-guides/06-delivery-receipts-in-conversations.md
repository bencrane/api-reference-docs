# Delivery Receipts in Conversations

With Delivery Receipts in Twilio Conversations, you gain visibility into the messages sent to your Participants in non-Chat channels, specifically SMS and WhatsApp. You can automatically keep track of whether a message in a Conversation has been delivered to a non-Chat Participant.

This guide provides an overview of Delivery Receipts in Conversations as well as how to set them up to keep track of the status of your messages.

## Why use Delivery Receipts in Conversations?

You can use Delivery Receipts to check the Message Status of the Conversations Messages. This information is a quick way to gauge if your messages reach your end users. If the delivery receipt indicates that the message wasn't delivered, you'll know to look into carrier disruptions or issues with mobile connectivity or availability.

Unlike the Message Status of individual SMS and WhatsApp messages, Delivery Receipts in Conversations correlate the Message Status information with your Conversation SID as well as relevant error code information. Rather than tracking individual messages, you can see both aggregated delivery information as well as the most recent status for messages in a particular Conversation.

## What are the possible message statuses?

Delivery Receipts in Conversations support the following message statuses:

- **sent**: Twilio has sent the message
- **delivered**: Twilio has received confirmation of message delivery from the carrier (and, where available, the destination handset). See below for more information.
- **read**: The user has opened the message on their device, and the read status has been reported back to Twilio. This applies only to over-the-top, or OTT, channels, such as WhatsApp.
- **failed**: The message could not be sent.
- **undelivered**: Twilio has received a delivery receipt indicating that the message was not delivered.
- **null**: The message has been created, but it's still within Twilio.

For failed and undelivered statuses, Twilio provides an error code with the reason that the Message was not delivered.

### Delivery Status for SMS Messages in Conversations

> **Note:** SMS statuses received via Delivery Receipts are tentative. (Read more on SMS-specific message statuses.) For SMS, the last possible status is "delivered," which indicates that the carrier has accepted the SMS message as sent from Twilio. If the carrier has not yet accepted the Message, its status remains "sent."

### Delivery Status for WhatsApp Messages in Conversations

Delivery Receipts for WhatsApp messages are more granular. A "delivered" status indicates that the WhatsApp application has accepted the message. Otherwise, the status remains as "sent," for example if the mobile device is off. WhatsApp messages can also have the "read" status, indicating that the recipient has consumed the message on their device.

## How to get Delivery Receipts information in Conversations

There are two ways that you can consume Delivery Receipts information:

### Use the Conversations REST API to get Delivery Receipts

Delivery Receipts information is available at two levels: a summary with aggregated totals for a given Message and a detailed view, broken down by recipient for a given Message.

#### Get a summary of delivery information from the Conversation Message Resource

The Delivery property of the Conversations Message resource contains an aggregated summary delivery information. This provides a high-level overview of the Message Status information for the Conversation, including count breakdowns by status of the Conversational messages.

**Fetch Aggregated Delivery Receipts Information for a Conversation Message**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = (
    client.conversations.v1.conversations("CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(message.delivery)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "body": "Welcome!",
  "media": null,
  "author": "system",
  "participant_sid": null,
  "attributes": "{ \"importance\": \"high\" }",
  "date_created": "2016-03-24T20:37:57Z",
  "date_updated": "2016-03-24T20:37:57Z",
  "index": 0,
  "delivery": {
    "total": 2,
    "sent": "all",
    "delivered": "some",
    "read": "some",
    "failed": "none",
    "undelivered": "none"
  },
  "content_sid": null,
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "delivery_receipts": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
    "channel_metadata": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
  }
}
```

For example, imagine the following sample delivery object returned as part of a fetched Message:

```json
"delivery": {
    "total": 5,
    "sent": "all",
    "delivered": "some",
    "read": "some",
    "failed": "none",
    "undelivered": "none"
}
```

This information indicates that of the five delivery receipts for a given message, the message was sent to all of the Participants. Some messages are delivered, indicating that Twilio has received delivery confirmation from a carrier. The `some` next to `read` indicates that some of the messages--those sent over an OTT channel--have been opened or read by the Participants. No messages have the failed or undelivered status.

For a more granular view of message delivery status, you can make a request to the Receipts resource, described below.

#### Get detailed information from the Receipts Resource

A request to the Delivery Receipt resource returns individual statuses for each Message, by each recipient. This is a more detailed view of Message Status information; it includes Channel SIDs for the Conversation Participants.

**Retrieve detailed Delivery Receipt Information for a Conversation Message**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

delivery_receipts = (
    client.conversations.v1.conversations("ConversationSid")
    .messages("IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .delivery_receipts.list(limit=20)
)

for record in delivery_receipts:
    print(record.account_sid)
```

Response:

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "delivery_receipts"
  },
  "delivery_receipts": [
    {
      "sid": "DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "message_sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_message_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status": "failed",
      "error_code": 3000,
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T20:37:57Z",
      "date_updated": "2016-03-24T20:37:57Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts/DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "sid": "DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "message_sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_message_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status": "failed",
      "error_code": 3000,
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T20:37:57Z",
      "date_updated": "2016-03-24T20:37:57Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts/DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "sid": "DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "message_sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_message_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status": "failed",
      "error_code": 3000,
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T20:37:57Z",
      "date_updated": "2016-03-24T20:37:57Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts/DYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

In the response, `delivery_receipts` is a list of individual statuses for each Message that was sent to an individual recipient or Participant in the Conversation.

For example, if a Chat user is corresponding with one SMS Participant and one WhatsApp Participant, `delivery_receipts` will contain two different objects, one for each Message sent to a specific Participant:

```json
{
   "delivery_receipts" : [
         {
            "sid": "DYXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "message_sid": "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "channel_message_sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "participant_sid": "MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "status": "sent",
            "error_code": null,
            "date_created": "2020-03-23T18:45:17Z",
            "date_updated": "2020-03-23T18:45:17Z"
         },
         {
            "sid": "DYXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "message_sid": "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "channel_message_sid": "WAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "participant_sid": "MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "status": "read",
            "error_code": null,
            "date_created": "2020-03-23T19:45:17Z",
            "date_updated": "2020-03-23T18:45:17Z"
         }
     ]
}
```

In the sample output, we see that for the Message for the SMS Participant (the SMXXX Channel SID), the most recent status is `sent`, meaning that Twilio has passed the message on to the appropriate carrier. However, for the WhatsApp Participant, the most recent status is `read`, indicating that the Participant has consumed the message in their WhatsApp application.

> **Info:** The information returned from the Delivery Receipt resource does not include historic data; the most recent status information overrides the previous status. For example, if a WhatsApp Message has been sent, delivered, and read, a request to this resource will display only the "read" status for that specific message. Likewise, the "undelivered" status of a message overrides the previous "sent" status once the message delivery fails.
>
> To see the dates for all status events (i.e., the changes between sent, delivered, and read statuses), you must set up Webhooks, which we'll cover in the next section.

## What is a Webhook?

Webhooks are user-defined HTTP callbacks. Some event, such as receiving an SMS message or an incoming phone call, triggers them. When that event occurs, Twilio makes an HTTP request (usually a POST or a GET) to the URL configured for the webhook.

To handle a webhook, you only need to build a small web application that can accept the HTTP requests. Most server-side programming languages offer some framework for you to do this. Examples across languages include ASP.NET MVC for C#, Servlets and Spark for Java, Express for Node.js, Django and Flask for Python, and Rails and Sinatra for Ruby. PHP has its own web app framework built in, although frameworks like Laravel, Symfony and Yii are also popular.

Whichever framework and language you choose, webhooks function the same for every Twilio application. They will make an HTTP request to a URI that you provide to Twilio. Your application performs whatever logic you feel necessary - read/write from a database, integrate with another API or perform some computation - then replies to Twilio with a TwiML response with the instructions you want Twilio to perform.

## Set up Webhooks for Delivery Receipts

As mentioned above, the information retrieved via the REST API and the Delivery Receipt Resource displays the last or most recent update for a given Message. However, what if you want automatic updates on a message's status, as it passes through Twilio's systems and onto the carrier or OTT application? For this, you'll set up your webhook URL.

Each Delivery Receipt event that you receive on your webhook URL represents a status change for a given message.

A new post-webhook event called `onDeliveryUpdated` is executed for every delivery receipt notification received by Twilio. For every delivery receipt event, Twilio will send a request to your post-event URL that you have configured for Conversations. (Read more about using Webhooks in Conversations.)

Twilio sends the same information found in the Receipt resource to your post-event URL for every `onDeliveryUpdated` event.

You can turn on webhooks and configure the post-event URL for Delivery Receipts using the Conversations REST API:

**Update the onDeliveryUpdated Webhook URL**

```bash
curl -X POST "https://conversations.twilio.com/v1/Conversations/Webhooks" \
--data-urlencode "PostWebhookUrl=https://www.example.com/postWebhook" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Output:

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "pre_webhook_url": "https://example.com/pre",
  "post_webhook_url": "https://www.example.com/postWebhook",
  "method": "GET",
  "filters": [
    "onConversationUpdated"
  ],
  "target": "webhook",
  "url": "https://conversations.twilio.com/v1/Conversations/Webhooks"
}
```

You can also configure the `onDeliveryUpdated` webhook through the Twilio Console in the Conversations section. (Read more about Conversations Webhooks and how to configure them.)

## Use case examples for Delivery Receipts

Delivery Receipts in Conversations provide visibility into the statuses of messages sent across different channels. Let's look at two common use cases for Delivery Receipts.

### Example 1: An Agent on Chat and an SMS or WhatsApp End User

The primary use case for Delivery Receipts involves an agent on a Chat interface sending messages to an SMS or WhatsApp end user. In this case, the agent on Chat wants to know if their message has been received by the SMS user or read by the WhatsApp (OTT) user.

First, use the aggregated status on the Message resource to get a quick overview of the situation. This aggregated view is often sufficient to see that all of the messages have the delivered status. Twilio works with carriers to ensure a high rate of message deliverability, so you can use `delivered: "all"` as a quick indicator that the messages are reaching your end users successfully.

If necessary, you can take a deeper dive into the Message status for a specific Participant in the Conversation. An example of this would be the aggregated delivery object indicating that only some or none of the messages were delivered.

In this case, you can utilize Webhooks or the Receipts resource to examine individual message statuses. Make a request to the Receipts resource to find the SIDs and error codes for specific Messages that have undelivered or failed statuses.

### Example 2: Tracking non-Chat Message Statuses

It is also possible to track the status of any message sent between non-Chat Participants in a Conversation. In other words, you can use Delivery Receipts to answer the question "Where is the message between two SMS Participants in my Conversation?"

For example, imagine a Conversation between an Agent on Chat and two SMS Participants (end users). You can verify that a message sent from one SMS end user reached the other. These details are available through Webhooks (as a `onDeliveryUpdated` event) or via the Conversations REST API.

## Limitations for Delivery Receipts in Conversations

### No Delivery Receipts for Messages originating from Chat Participants

When a Message is delivered to another Chat Participant, it does not emit any Delivery Receipt information. Therefore, Delivery Receipts information is only available for messages sent to non-Chat (SMS or WhatsApp) Participants.

> **Info:** Because messages sent to Chat Participants do not emit delivery information, the default status for these Messages is always delivered. Thus, messages to Chat Participants do not affect the `all` value in the aggregated deliveries property of a Message Resource.
>
> Messages sent to Chat Participants do not appear in the `delivery_receipts` sub-resource.

### Statuses for SMS Messages are tentative

SMS delivery statuses have limited reliability, and Twilio cannot guarantee against last-leg disruptions from the carrier. This is the same reliability as seen in SMS status callbacks. In most cases, these statuses are accurate.

In addition, SMS statuses in Delivery Receipts do not reveal whether the end user's mobile handset is turned on or off. If the end user's mobile device is switched off, the status of this SMS message is delivered.

Barring any carrier disruptions, the message will be delivered when the end user's handset is switched on and can once again receive messages. For example, a handset would be able to receive messages again upon re-entering a coverage area or turning off Airplane Mode.

## What's Next?

In this guide, we covered using Delivery Receipts to check the status of messages in Conversations.

Check out the following resources to continue building rich conversational experiences for your customers:

- The Conversations Quickstart
- Setting up Webhooks in Conversations
- Configuring WhatsApp and Conversations
- Message Statuses for SMS Messages