# Migrating to Conversations from Programmable Chat

So, you've decided to build with the Twilio Conversations API. If you've already built applications with Twilio Programmable Chat, many of the concepts, resources, and metaphors in Conversations are already familiar to you.

For existing customers, the good news is that the Conversations API is built on the Programmable Chat foundation, and most of your existing messaging and user data is going to be made available automatically, with no data migration required. However, there are a few key changes you'll want to make to your application in order to migrate as smoothly as possible.

> **Working on a Flex Application?**
> Good news, you can stop here! Flex applications don't need to be migrated to Conversations today. The Chat API will continue to work for Flex applications beyond the scheduled EOL.

## Conceptual differences between Conversations and Programmable Chat

Twilio Conversations and Programmable Chat share many of the same concepts and even method calls, but in order to support cross-channel messaging, there are a handful of key differences to keep in mind as you build.

### Conversations is multichannel

In Conversations, chat becomes one of many "channels" for communication. A channel in Conversations is not a resource; it is the method by which a Participant joins a Conversation, such as SMS, WhatsApp, or chat.

Unlike in Programmable Chat, in Conversations, you can build messaging experiences that connect users from multiple channels. For example, a customer on their phone can send SMS messages that a customer service agent receives through a web chat interface on their computer. On the other hand, you can build single-channel Conversations, such as Conversations between only chat Participants or SMS Participants.

To add SMS or WhatsApp Participants to a Conversation that was previously a Chat Channel, you will need to update the Conversation with a Messaging Service SID. A Messaging Service is a Messaging Resource that is required to enable the usage of Conversations Webhooks and bundle multiple sender types together.

### Chat Services become Conversation Services

As part of this migration, Programmable Chat Services become "Conversation Services." You can fetch these Services through the REST API with the same Service SIDs (ISXXX…) and Conversations (CHXXX…), just like before.

As with Programmable Chat, you can use any number of Services in Conversations. The same rules apply: the data is not shared between Services.

For convenience, Twilio Conversations introduces a single "default" Service that appears in the REST API at the account level, linked to your Account SID (ACXXX…) If your app only relies on a single Conversation Service instance, you could choose that Service as the default. In order to set your migrated service as the default, accessible via the REST API at the account level, select it from the "Default Conversations Service" list in Developer Console, or switch the DefaultChatServiceSid parameter using the Configuration API resource. To separate your Conversations by use case, you can also create sub-accounts.

You can read more about Conversations Services in our guide to Conversations Fundamentals.

### All Conversations are private

All Conversations are private; this is a change from the concept of public vs. private Channels in Twilio Chat.

Public Chat Channels do not exist in the Conversations API. This means that existing public Chat Channels are not visible in Conversations. Please plan accordingly. If there are any public Chat Channels that you wish to use in Conversations, you can migrate them to Conversations using this API.

If you no longer need public Channels in Conversations, you can leave them; public Channels won't be visible in Conversations.

### Invite Permission are not available in Conversations

Roles in Conversations do not have the inviteMember permission from a Chat Role. However, a Conversation Participant with sufficient permissions can add another Participant to a Conversation.

## Vocabulary changes between Programmable Chat and Conversations

Please be aware of the following vocabulary changes in your migration from Programmable Chat to Conversations:

| Programmable Chat | Conversations |
|-------------------|---------------|
| Channels | Conversations |
| Members | Participants |
| Messages | Messages |
| Users | Users |
| Roles | Roles |
| Chat Service | Conversation Service |

## What happens to my data when I move to Twilio Conversations?

Most customer data from Programmable Chat (such as Services, Channels, Users, and Roles) are available in Conversations automatically.

For example, Programmable Chat Channels become Conversations. You can retrieve them by making a GET request to the Conversations resource or fetching a single Conversation by its SID. Conveniently, the Conversation SID is the same as the Chat Channel SID; it will look like CHXXX...

If you are building a chat-only Conversations (not connecting SMS Participants, for example), all of your data is already available in Conversations. There is no migration required.

To learn more about migrating from Twilio Programmable Messaging to Conversations, please see our guide about Inbound Message Handling and Autocreation.

### Read all Conversations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversations = client.conversations.v1.conversations.list(limit=20)

for record in conversations:
    print(record.account_sid)
```

#### Response

```json
{
  "conversations": [
    {
      "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Home Repair Visit",
      "unique_name": null,
      "attributes": "{ \"topic\": \"feedback\" }",
      "date_created": "2015-12-16T22:18:37Z",
      "date_updated": "2015-12-16T22:18:38Z",
      "state": "active",
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
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "conversations"
  }
}
```

### Fetch a single Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation = client.conversations.v1.conversations(
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(conversation.account_sid)
```

#### Response

```json
{
  "sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My First Conversation",
  "unique_name": "first_conversation",
  "attributes": "{ \"topic\": \"feedback\" }",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "state": "active",
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

## Updating your application code for Conversations

### Move from Programmable Chat Channels to Conversations

Your existing Channels in Programmable Chat will migrate to Twilio Conversations; all Channels are visible in Conversations.

However, there are two things to keep in mind:

- Public Chat Channels will not be visible or available through the Conversations REST API because all Conversations are private.
- Before you can include non-chat Participants (SMS or WhatsApp), you'll need to attach a Messaging Service SID to the newly migrated Conversation.

### Upgrade to the Conversations SDK

If you are currently building with one of the Chat SDKs (JavaScript, Android, or iOS), update your dependency file by replacing it with the corresponding version of the Conversations SDK:

- JavaScript SDK
- iOS SDK
- Android SDK

### Use server-side SDK versions that include the Conversations resources

To access the Conversations REST API, make sure that you update our server-side SDKs to at least these versions:

- Python 6.45.3
- NodeJS 3.49.3
- Java 7.55.3
- PHP 6.10.3
- Ruby 5.40.3
- C# 5.47.1

### Referencing renamed features

As mentioned above, some features in Chat have been renamed in Conversations. For example, rather than referencing a Channel, Conversations calls the equivalent resource a Conversation.

In your application code, we suggest the following adjustments:

- Instead of ChatClient, you should import and refer to a ConversationsClient when you use one of the client-side SDKs (JavaScript, iOS, and Android)
- Wherever you used to refer to Channels, you should refer to Conversations (REST API).
- Where you had a Chat Member object, you will now have a Conversations Participant object (REST API)

## Available features in Programmable Chat and Conversations

| Feature | Chat | Conversations |
|---------|------|---------------|
| In-App chat functionality - Build chat-based experiences for the browser and mobile using our SDKs | ✅ | ✅ |
| Public Channels/Conversations - A public Channel is seen and can be joined by non-members. All Conversations are private; the Participant must be a part of Conversation to view the messages. | ✅ | No |
| Invites - With this feature participants are asked to join a conversation and must approve the request before being added. | ✅ | No |
| Multichannel Messaging - Conversations supports cross-channel messaging over SMS, MMS, chat, and WhatsApp | No | ✅ |
| Delivery Receipts - Status of the Message: sent, delivered, read, failed, undelivered. These are rendered in Messaging Insights and via webhook for troubleshooting and understanding message engagement. | No | ✅ |
| States & Timers - State of the conversation: active, inactive and closed. Timers are set to automatically transition from state to state. These features allow employees to focus on active threads and limit the number of unused conversations. | No | ✅ |
| Group MMS ("Group Texting") - Supports a native group texting conversation of up to four participants using MMS. This feature is only available in the US and Canada. | No | ✅ |
| Multiple Services Support - Businesses may wish to use multiple Services for different use cases or, in the case of ISVs developing on Conversations, a different Service for each organization. | ✅ | ✅ |
| Push (+ related bindings and credentials) - This feature allows chat participants to be notified with mobile push notifications. | ✅ | ✅ |
| Reachability - Reachability indicates the availability of a chat participant. Participants can toggle between available and unavailable for message routing purposes. | ✅ | ✅ |
| Consumption Horizon (now "Read Horizon and Read Status") - The Conversations API will automatically synchronize "read" status among participants. This replaces Chat's "consumption horizon", and adds automatic read statuses from channels that provide them, like WhatsApp. | ✅ | ✅ |
| Unread Message Counts - Programmable Chat displays the number of unread messages per channel. The Conversations API displays the number of Conversations with unread messages. | ✅ | ✅ |
| Per-Service Webhook Configuration - Conversations allows one webhook target to be assigned globally for your account, as well as unique per-Conversation webhooks. Chat had scoped webhooks and per-service webhook targets (no global option). | ✅ | ✅ |

## What's next?

With Twilio Conversations, you can still build the Programmable Chat experiences that your end users know and love...but with more features and the ability to connect participants over SMS, WhatsApp, and chat.

After migrating, take a look at the following documentation to build more feature-rich Conversations today:

- Using WhatsApp with Conversations
- Group Texting in Conversations
- The Conversations Quickstart
- Using States & Timers in Conversations