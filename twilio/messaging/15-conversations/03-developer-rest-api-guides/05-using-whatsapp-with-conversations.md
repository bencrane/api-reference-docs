# Using WhatsApp with Conversations

WhatsApp is increasingly the world's #1 conversational messaging platform as well as an absolutely critical engagement tool across South America, Middle East, Africa and many parts of Europe and Asia. Twilio Conversations supports WhatsApp out of the box and can help you address a number of patterns:

- **Delivery Coordination:** Let your drivers reach out to the customer to make sure the last 100 yards of each delivery are successful.
- **Clienteling:** Allow your employees to have long-term relationships (e.g. personal shoppers, wealth managers, or real estate agents) with your customers without using their personal devices.
- **Masked Communication:** Facilitate communication between your employees and your customers without sharing private numbers.

This guide will show you how to set up a few common patterns that pair WhatsApp with other channels.

## Prerequisites

> ℹ️ **Info:** WhatsApp onboarding generally takes 1-2 weeks. WhatsApp has a thorough vetting process that requires business verification in the Meta Business Manager in order to protect the WhatsApp ecosystem.
>
> We advise planning accordingly when setting up your WhatsApp Sender for Twilio. For more information, see Register WhatsApp senders using Self Sign-up or WhatsApp Tech Provider Program.

WhatsApp is a highly-regulated channel, requiring documentation and approval from Meta to get your business started. See Register WhatsApp senders using Self Sign-up or WhatsApp Tech Provider Program.

## Get your WhatsApp templates approved

> ℹ️ **Info:** The last section of the tutorial uses templates to initiate contact between two separate WhatsApp participants. If you follow the steps chronologically, you will still be able to complete the tutorial because you will have opted into the WhatsApp's 24-hour window. However, the screenshots will looks lightly different from what you see in the WhatsApp interface.

Depending on your use-case, you may need to secure some approved WhatsApp templates. This is specifically required if you want to send a message to a new user on WhatsApp, or send a message more than 24 hours after the last response.

> **Note:** If your use case can function such that you always receive WhatsApp messages first from your customers, you can skip the template registration step.

Now, you're ready to go!

---

## Cross-Channel Masking: Connecting WhatsApp to SMS

SMS is the easiest channel to connect to WhatsApp in a Twilio Conversation. To do this we'll use:

- A Twilio SMS-capable phone number (hereafter "TWI-SMS-NUMBER")
- Your Twilio WhatsApp number (hereafter "TWI-WA-NUMBER")
- The Twilio CLI

We recommend the Twilio CLI for experimenting, but these guides will work in any language in Twilio. Pick your favorite on the right and follow along.

Let's get down to it; our SMS-to-WhatsApp conversation will take four steps to set up.

### Step 1. Create a Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation = client.conversations.v1.conversations.create(
    friendly_name="SMS-to-WhatsApp Example"
)

print(conversation.sid)
```

**Response:**

```json
{
  "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "SMS-to-WhatsApp Example",
  "unique_name": "unique_name",
  "attributes": "{ \"topic\": \"feedback\" }",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "state": "inactive",
  "timers": {
    "date_inactive": "2015-12-16T22:19:38Z",
    "date_closed": "2015-12-16T22:28:38Z"
  },
  "bindings": {},
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "messages": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "webhooks": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "export": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Export"
  }
}
```

### Step 2: Create the WhatsApp Participant

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = client.conversations.v1.conversations(
    "CHxxxx"
).participants.create(
    messaging_binding_address="whatsapp:YOUR_WHATSAPP_NUMBER",
    messaging_binding_proxy_address="whatsapp:TWI_WA_NUMBER",
)

print(participant.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHxxxx",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 3: Create the SMS Participant

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = client.conversations.v1.conversations(
    "CHxxxx"
).participants.create(
    messaging_binding_address="YOUR_SMS_NUMBER",
    messaging_binding_proxy_address="TWI_SMS_NUMBER",
)

print(participant.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHxxxx",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 4: Send a message from WhatsApp

Because you've set up this conversation to proxy with SMS, you'll see the messages flowing back and forth automatically between your two channels.

> **Note:** The WhatsApp user kicks off this conversation by sending the first message. By starting from an inbound WhatsApp message, we've avoided any need to use WhatsApp Templates to start the Conversation. These messages and media will flow just fine for the next 24 hours.

---

## Masked Communication: Connecting Two WhatsApp Participants

When you connect two WhatsApp participants, you'll have to solve two business problems:

1. **Who is speaking with whom?**
   This is probably the bread-and-butter of your business idea: if you're a two-sided marketplace, you're probably connecting a buyer and a seller (or a passenger and a rider). The buyer is the most critical personality: the brand they see in WhatsApp is important and must establish enough trust to proceed with the conversation. When you create your WhatsApp Business Profile, keep that buyer personality in mind first.

2. **How will you get opt-in from both participants?**
   Unsolicited outbound messages to WhatsApp are highly restricted. Until your customer replies, you can only send messages conforming to approved templates. In this scenario, both sides are on WhatsApp, so we will need to use one of those templates to get the conversation moving.

We'll start by setting up the Conversation and later show how to use templates to improve the customer experience.

### Setting Up the Conversation

We'll need the following to set up our WhatsApp-to-WhatsApp Conversation:

- A Twilio WhatsApp number; we'll call this "TWI_WA_NUMBER." You could use more than one, but it's not necessary.
- Two consumer WhatsApp accounts. Choose yourself and a friend who won't mind. These are typically your personal device numbers.
- The Twilio CLI.

> ⚠️ **Warning:** If you're going through this guide in chronological order and re-using your WhatsApp numbers to test out all of the use cases, you should remove the previous Conversation first. Each number pair (twilio+personal) can only appear in one conversation at a time.

```bash
twilio api:conversations:v1:conversations:remove --sid CHxxxx
```

With that, connecting two WhatsApp participants in a Conversation will take five steps:

### Step 1: Create the Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation = client.conversations.v1.conversations.create()

print(conversation.sid)
```

**Response:**

```json
{
  "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "unique_name": "unique_name",
  "attributes": "{ \"topic\": \"feedback\" }",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "state": "inactive",
  "timers": {
    "date_inactive": "2015-12-16T22:19:38Z",
    "date_closed": "2015-12-16T22:28:38Z"
  },
  "bindings": {},
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "messages": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "webhooks": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks",
    "export": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Export"
  }
}
```

### Steps 2 and 3: Add two different WhatsApp Participants

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = client.conversations.v1.conversations(
    "CHxxxx"
).participants.create(
    messaging_binding_address="whatsapp:YOUR_WHATSAPP_NUMBER",
    messaging_binding_proxy_address="whatsapp:TWI_WA_NUMBER",
)

print(participant.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHxxxx",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 4: Send a message from one side

From your phone, send the first message in WhatsApp. Send the message to your TWI_WA_NUMBER (not directly to your friend's number.)

### Step 5: Send a message from the other side

Have your good-natured friend send a message to your TWI_WA_NUMBER (not directly to your phone number).

Congratulations, it's working!

… Mostly. You may notice that after steps four and five, you have two different conversations ongoing. After this awkward introduction, everything proceeds as expected, but that's not the professional experience we want.

In this scenario, both WhatsApp-based parties must reply before the Twilio can send outbound messages to both parties. Receiving an incoming message from both Conversation participants kicks off the "24-hour session" in which Twilio can send outbound free-form WhatsApp messages.

---

## Starting More Professionally: Using Template Messages

> ⚠️ **Warning:** WhatsApp templates need to be submitted and approved before they are effective. Before you proceed to below, learn how to create WhatsApp templates and submit them for approval. Once your templates are approved, use the appropriate body text in the steps below.
>
> **Note:** Without approved WhatsApp templates, these outbound messages will be swallowed by the system.
>
> If you have followed the tutorial chronologically, you can complete the tutorial because you and your good-natured friend have opted into receiving WhatsApp messages for 24 hours. However, the screenshots will differ from what you see in the WhatsApp interface.

Let's carry the example above a little further, and use approved WhatsApp Template Messages to make it happen. We're going to pick two template messages that we've already gotten approved:

- A templated message that our food courier will understand
- A templated message that will invite the customer to opt into the contact.

```
TEMPLATE 1:
Hello {{1}}, your food delivery is almost there but {{2}} (your rider) needs help finding your door. Are you willing to chat with them?

TEMPLATE 2:
Your customer has agreed to chat over WhatsApp to get this delivery sorted. You're now connected. Say hello!
```

We'll send these messages one after another, waiting for a response from the first before sending the second.

### Step 6: Invite the Customer to Engage

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations("CHxxxx").messages.create(
    author="whatsapp:COURIER_WA_NUMBER",
    body="Hello Robert, your food delivery is almost there but Alicia (your rider) needs help finding your door. Are you willing to chat with them?",
)

print(message.account_sid)
```

**Response:**

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHxxxx",
  "body": "Hello Robert, your food delivery is almost there but Alicia (your rider) needs help finding your door. Are you willing to chat with them?",
  "media": null,
  "author": "whatsapp:COURIER_WA_NUMBER",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{ \"importance\": \"high\" }",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
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

The following is what the customer will see after you send the first templated message as the courier/rider.

You'll notice when you do this that the customer receives a message, but the courier does not. We're using the rules of WhatsApp's 24-hour opt-in window in our favor: securing one participant's opt-in (from the customer) before we reach out to the other (the courier).

In the picture above, you notice that we included an automated reply: "Great! Just a moment…" This picture is a step ahead. To actually execute this — and at the same time to opt-in our courier — we're going to need a Twilio function and a Conversations webhook.

### Create a Twilio Function to send the templates

Let's start with the former.

First, navigate to the Twilio Functions section of the Console and click on "Configure." Confirm that the version listed for the twilio NPM module is up-to-date, such as 3.66.1 or higher.

Next, create a Twilio Function in the console with the following code, which will set us up to capture the onMessageAdded event.

```javascript
exports.handler = function (context, event, callback) {
  const customer = event.Author;
  let thisConversation = context
    .getTwilioClient()
    .conversations.v1.conversations.get(event.ConversationSid);

  // This system message will reach the customer, but our rider
  // will still need to be opted-in.
  let justAMoment = thisConversation.messages.create({
    body: "Great! Just a moment while we connect you…",
  });

  // Use Template #2 for the rider.
  let riderOptIn = thisConversation.messages.create({
    author: customer,
    body: "Your customer has agreed to chat over WhatsApp to get this delivery sorted. You're now connected. Say hello!",
  });

  // Remove all scoped webhooks; we only want this once.
  let webhooks = [];
  thisConversation.webhooks.each((hook) => webhooks.push(hook.remove()));

  // Critically important: wait for the messages to resolve.
  Promise.all([justAMoment, riderOptIn, ...webhooks]).finally(() =>
    callback(null)
  );
};
```

To power this, we'll add a Conversation Scoped webhook that we can remove later.

### Step 7: Set up a Conversation Scoped Webhook to field the reply

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = client.conversations.v1.conversations("CHxxxx").webhooks.create(
    target="webhook",
    configuration_url="http://funny-dunkin-3838.twil.io/customer-optin",
    configuration_method="get",
    configuration_filters=["onMessageAdded"],
)

print(webhook.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHxxxx",
  "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "target": "webhook",
  "configuration": {
    "url": "https://example.com",
    "method": "get",
    "filters": [
      "onMessageSent",
      "onConversationDestroyed"
    ]
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Now let's start again by sending the initial opt-in message to test the whole flow.

With all this setup, we've created the ideal experience for two-sided WhatsApp Conversations. Notice how system messaging manages expectations while we're still opting-in the second party. And after the initial setup, notice that we're not forwarding messages one-by-one among the parties: all of that happens automatically via Twilio Conversations platform. It only ends if/when you DELETE the conversation later on.

> **Note:** Our templates fit neatly in WhatsApp's guidelines: they are not promotional, but rather they facilitate an active transaction. By following these patterns, your business could benefit from the same pattern.

---

## What's Next

Ready to learn more about Conversations and WhatsApp? Learn more with the following resources:

- Send WhatsApp Notification Messages with Templates
- Register WhatsApp senders using Self Sign-up
- WhatsApp Tech Provider Program
- The Conversations API Reference
- The Conversations Scoped Webhook Resource