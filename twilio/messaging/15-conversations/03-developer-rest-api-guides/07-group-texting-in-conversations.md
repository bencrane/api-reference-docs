# Group Texting in Conversations

Using Twilio Conversations, you can build rich conversations between more than two parties over multiple channels, such as SMS and Chat.

In high-value interactions, such as buying a house, financial advising, and coordinating deliveries, customers expect communication involving a group of participants to be seamless. Good news! Twilio Conversations natively supports Group MMS for you to build these experiences for your end-users.

In this guide, we'll walk you through creating a Conversation that supports group texting.

## What is Group Texting?

Group texting, or more specifically Group MMS, uses the MMS (Multimedia Messaging Service) protocol to exchange ordinary text messages among a group of three or more people, rather than as a one-to-one interaction.

In a Twilio-powered group texting Conversation, all of the Participants are visible, and each Participant can see the author of each message. In other words, each message can be displayed with the person who sent it to the group text. This is the type of functionality that many users already expect from applications such as WhatsApp, Slack, and iMessage.

Even if you have Participants joining across different channels, Twilio Conversations does all of the message routing and media handling.

## Leveraging Group MMS in Conversations for group texting

If you're operating in the US or Canada (Group MMS only works on +1 numbers), you can send messages from a projected address to create group texts. This number becomes that Participant's address — the projection of that Participant — into a group MMS Conversation.

You can have the following types of Participants in a group text:

- A Participant joining from their native texting experience with a messaging address (their personal mobile number).
- A Chat participant, who has a Chat Identity (like a username) and a projected address (Twilio phone number).
- An unattached Projected Address (Twilio phone number) with no backing Chat Identity. In this case, the projected address acts like a "gateway" number for a customer to participate in the group text.

> **Warning:** Group Texting is only supported on +1 (US+Canada) long code numbers. Toll-free numbers and short codes cannot exchange group texts from Twilio.

> **Info:** There is a limit of 10 total Participants in a Group MMS Conversation.

## Projected Addresses vs. Proxy Addresses

If you have built a one-to-one Conversation (like in our Conversations Quickstart), you are probably familiar with the term proxy address: the Twilio phone number that routes all of the messages to the native SMS conversation. The proxy address "sticks" to the mobile-based participant on SMS. You can think of it as their window into the Conversation, which may include another SMS or Chat participant. Notably, the SMS participant receives all of the messages through one proxy address number and doesn't know how many people it represents.

To set up Group texting with Conversations, you should instead use a projected address to represent every Participant who does not join the Conversation through a native channel such as SMS. You can think of the projected address as the "avatar" of a Chat participant in the MMS conversation. The projected address "sticks" to the Chat participant, so in the group text, every Participant can see who said what by way of the attached phone number. The projected address, often used to represent an employee or company representative, is the number that you might put on your business card, for example.

For example, in the following screenshot, you can see the interaction of three unique Participants:

- The first SMS Participant(1), interacting through the native SMS app on their mobile device.
- The Projected Address(1), representing a Chat participant.
- The second SMS Participant(2), represents a different SMS participant and interacts through the native SMS app on their mobile device.

### Sharing a Projected Address in group texts

You can share one Projected Address between multiple participants in the group text Conversation and update the backing identity as necessary. This functionality supports use cases such as transferring between support agents representing a business in a group text.

For example, let's say you need to create a group text with one Projected Address that will represent your business, staffed by multiple agents on Chat. In this case, you add a standalone Projected Address as a Participant and update it with the identity of the first agent. Later, when that agent escalates the issue to their supervisor, you update the Projected Address to the supervisor's Chat identity. From the end-user's viewpoint, they are still communicating with the same phone number (Projected Address) that represents your business.

### Using standalone Projected Addresses in group texts

A Projected Address that has no backing Chat identity can still be part of your Conversation.

You can use a standalone Projected Address if you want to send and receive messages in the group text Conversation only through the Twilio Conversations REST API. In this case, when you send messages using the REST API, you'll need to specify the projected address itself as the author parameter.

### Conversation autocreation with Group Texting

The Conversations API automatically creates a new Conversation when a group message reaches a projected address and there is no existing Conversation with the same group of Participants.

Please see our guide to inbound messaging handling and autocreation in Conversations for more details.

For example, a real estate agent and prospective homebuyer are chatting one-on-one about prospective homes. The homebuyer, wanting to include their partner in the discussion, sends a message to their partner's mobile number as well as the real estate agent, whose avatar in the Conversation is a projected address/Twilio number. No Conversation yet exists between these three numbers, so this creates a new Conversation with all three numbers as separate Participants. In this newly created Conversation, all members see the original message from the homebuyer to the second homebuyer and the real estate agent as the first message.

## Walkthrough of two Group Texting examples

Now that we've covered the concepts of group texting, let's take a look at how we'd set it up for two common scenarios.

> **Info:** Twilio Conversations is built on top of several Twilio products. It may be useful to pull up a document or sticky note to keep track of the various values that you'll need throughout this documentation. For the examples requiring two SMS Participants, we recommend keeping a friend (or just their phone) handy for testing.

### Get started: Acquire an MMS-capable Twilio Phone Number

If you haven't already done so, you'll want to purchase a Twilio Phone Number to complete the rest of this guide. If you have a Twilio Phone Number already, you can skip to the next section.

In the Twilio console, search for and purchase an available phone number capable of sending MMS. This Phone Number will serve as the projected address for the Chat participant.

## Scenario 1: Set up a group message with one Chat participant and two SMS participants

This is a common scenario in real estate, where the purchase of a single-family home is often a family decision. We will set up group texting for three Participants:

- The real estate agent, chatting from within a dedicated real estate customer relations management application.
- Homebuyer 1, over SMS.
- Homebuyer 2, over SMS.

To do this, you'll need a Twilio Phone Number and you'll need access to the REST API. We have included code samples in supported programming languages, as well as curl and the Twilio CLI, which makes experimenting a snap.

### Step 1: Create the Conversation

First, we need to create the Conversation by making a request to the Twilio REST API.

**Create a Conversation**

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
    friendly_name="Home-buying journey"
)

print(conversation.account_sid)
```

Response:

```json
{
  "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Home-buying journey",
  "unique_name": null,
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "state": "active",
  "timers": {},
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

### Step 2: Add the real estate agent

Now that we have the Conversation, we can add the real estate agent as a Participant. In this guide, we are representing the Chat Participant's messages with the Conversations REST API to get up and running. At the end of this guide, we'll provide links to documentation to get you started on building a custom CRM.

**Add a Chat Participant (Real Estate Agent)**

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
    "ConversationSid"
).participants.create(
    identity="realEstateAgent",
    messaging_binding_projected_address="+15017122661",
)

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "realEstateAgent",
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "projected_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 3: Add the first homebuyer

The Chat participant (the real estate agent) has been added to the Conversation, but it's pretty lonely in there with no clients. Next, we need to add the first homebuyer, who joins via the native texting (SMS) app on their phone.

> **Info:** You only have to specify the SMS participant's own personal phone number in MessagingBinding.Address. When using group texting, you won't need to specify proxy addresses.

**Add an SMS participant (Homebuyer 1)**

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
    "ConversationSid"
).participants.create(messaging_binding_address="+15558675310")

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "address": "+15017122661"
  },
  "role_sid": null,
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 4: Send a 1:1 message

Before our third Participant joins, we can start by sending messages between the two connected Participants. Let's send a message from the agent to the homebuyer using the REST API.

**Send a Conversational Message**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations(
    "ConversationSid"
).messages.create(
    body="Hi there. What did you think of the listing I sent?",
    author="realEstateAgent",
)

print(message.account_sid)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Hi there. What did you think of the listing I sent?",
  "media": null,
  "author": "realEstateAgent",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
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

Once the homebuyer receives the message, you'll be able to verify that from the REST API. Using Conversations Webhooks, you can also capture those responses for whatever you need, such as logging or adding helpful chatbots. If you've built an app out of our Chat SDK, you'll get those messages in real time via Twilio's secure WebSocket gateways.

### Step 5: Add the second homebuyer to the group text

Now it's time to turn this into a true group texting experience by adding the second homebuyer. Just like when we added the first homebuyer to the Conversation, we'll add the second using a REST API call.

**Add a second SMS participant to the group text (Homebuyer 2)**

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
    "ConversationSid"
).participants.create(messaging_binding_address="+15558675310")

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "address": "+15017122661"
  },
  "role_sid": null,
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 6: Send another message

Let's welcome the second homebuyer to the group text with one more message from the real estate agent.

**Send a second Conversational Message**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations(
    "ConversationSid"
).messages.create(
    body="Glad you could join us, homebuyer 2. I really love these granite countertops and think you will as well.",
    author="realEstateAgent",
)

print(message.account_sid)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Glad you could join us, homebuyer 2. I really love these granite countertops and think you will as well.",
  "media": null,
  "author": "realEstateAgent",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
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

Now you can see that all three Participants (the real estate agent and the two homebuyers) are part of the Conversation representing our group text. We've been simulating the Chat participant (the real estate agent) using the REST API. However, notice that you and the second homebuyer (or your friend) can use your native texting application to participate in the Conversation as well. The messages flow freely back and forth.

## Scenario 2: Set up a group message with two Chat and one SMS participants

In the first scenario, we created a group texting Conversation between one real estate agent on Chat participant and two SMS participants.

The second scenario is more common when you have one end-user and two employees, as you may see in financial consultations. For this example, we'll set up a Conversation for:

- The financial advisor, joining from a dedicated application built with Chat.
- The assistant, also chatting from the same application.
- The end-user/client, connecting to the Conversation via SMS.

Because this group text involves two different Chat Participants—the financial advisor and the assistant—we will need two projected addresses, one for each of them. If you haven't already done so, purchase an additional Twilio phone number to use as the second projected address.

### Use one projected address to transfer between agents

In this scenario, we include one assistant on Chat, who is represented with a Projected Address in the Conversation. If you need to transfer seamlessly, you can update the Projected Address's backing Chat identity to the new assistant. The end-user/client will consistently see the same Projected Address (Twilio Phone Number), even if the assistant on Chat changes behind the scenes.

### Optional: Clean up the first Conversation

If you continue to the second example in this guide, you'll need two Twilio Phone Numbers. To free up the number you've already purchased, we can delete the Conversation from the first example.

Alternatively, you can purchase two new Twilio Phone Numbers to use as projected addresses in this second example.

**Delete the Conversation**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.conversations(
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()
```

### Step 1: Create the Conversation

We'll begin this example by making a request to the Twilio REST API to create a new Conversation for the financial consultation.

**Create a Conversation**

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
    friendly_name="Your Wealth Management Options"
)

print(conversation.account_sid)
```

Response:

```json
{
  "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Your Wealth Management Options",
  "unique_name": null,
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "state": "active",
  "timers": {},
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

### Step 2: Add the financial advisor

With the Conversation created, we'll next add the financial advisor. This will be a Chat participant, so we need to assign them a projected address. Use one of your Twilio Phone Numbers for this.

**Add a Chat Participant (Financial Advisor)**

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
    "ConversationSid"
).participants.create(
    identity="YourFinancialAdvisor",
    messaging_binding_projected_address="+15017122661",
)

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "YourFinancialAdvisor",
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "projected_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 3: Add the end-user (the advisee) by SMS

In this example, we will be adding the end-user (the client being advised) to the group texting experience by making another REST API call.

Because this Participant is joining via the native SMS experience on their device, we'll use their mobile number as the Messaging Binding Address.

**Add an SMS Participant (Advisee)**

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
    "ConversationSid"
).participants.create(messaging_binding_address="+141586753093")

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": null,
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "address": "+15017122661"
  },
  "role_sid": null,
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 4: Send a 1:1 message

Before we add our third Participant to the Conversation, we can make sure the two Participants are connected. We'll use the Conversations REST API to send a message from the Chat-based Financial Advisor to the SMS-based advisee.

**Send a Message to the Conversation**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations(
    "ConversationSid"
).messages.create(
    body="Hello, what questions did you have about your portfolio?",
    author="YourFinancialAdvisor",
)

print(message.account_sid)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Hello, what questions did you have about your portfolio?",
  "media": null,
  "author": "YourFinancialAdvisor",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
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

### Step 5: Add the assistant to the group text

It's time to add the assistant to the group text as a Chat participant. Recall that every non-SMS participant needs a projected address to join in on the group texting fun.

> **Info:** In this case, we're adding the projected address with an attached Chat Participant all at once, but you could also create the Conversation with an unattached or "gateway" projected address. When you're reading for the assistant to jump into the group text, you can update the projected address by attaching the assistant's chat identity.

**Add a second Chat Participant (Assistant)**

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
    "ConversationSid"
).participants.create(
    identity="theAssistant", messaging_binding_projected_address="+15017122661"
)

print(participant.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "theAssistant",
  "attributes": "{}",
  "messaging_binding": {
    "type": "sms",
    "projected_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Step 6: Send a group text message

Now that all of the Participants are in our Conversation, we'll send one more message, this time from the assistant to the rest of the group.

**Send another message to the Conversation**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations(
    "ConversationSid"
).messages.create(
    author="theAssistant",
    body="I've just emailed you some documents. Could you please review them?",
)

print(message.account_sid)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "I've just emailed you some documents. Could you please review them?",
  "media": null,
  "author": "theAssistant",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
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

At this point, you should have received a message from two separate Twilio phone numbers, each representing a Chat participant in the group text. It may look like a 1:1 Conversation, but when you send messages back and forth, you can see that all parties are uniquely identified.

- Try sending an SMS back from your personal device as the advisee.
- Send another message from the Financial Advisor using the REST API to see all three Participants in the Conversation.

**Send one more Conversational Message**

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.conversations.v1.conversations(
    "ConversationSid"
).messages.create(
    author="YourFinancialAdvisor",
    body="Excellent. We both look forward to working with you.",
)

print(message.account_sid)
```

Response:

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Excellent. We both look forward to working with you.",
  "media": null,
  "author": "YourFinancialAdvisor",
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "date_created": "2020-07-01T22:18:37Z",
  "date_updated": "2020-07-01T22:18:37Z",
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

## What next?

Twilio Conversations' native support of group MMS allows you to create rich, multi-channel interactions with your users. In this guide, we walked through creating two different group texting scenarios with different ratios of SMS and Chat participants using the projected address.

Now that you can create group texting experiences for your customers, you can also take advantage of the other features in Twilio Conversations:

- Review how to create 1-1 interactions with the Conversations Quickstart.
- Explore the Chat SDKs for building custom applications.
- Connect WhatsApp to Conversations.
- Configure Webhooks to monitor and modify Conversations.