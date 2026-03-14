# Conversations Webhooks

Conversations sends pre-action and post-action webhooks for many events that happen in your application. These webhooks allow you to monitor and react to user actions in your own backend service, in a Function, or in a Studio flow. You can also use these webhooks to store activity logs in a system of record or in a logging server as part of your own application.

> **Info:** Conversations webhooks have a maximum timeout of 5 seconds.

> **Info:** Twilio can send your web application an HTTP request when certain events happen, such as an incoming text message to one of your Twilio phone numbers. These requests are called webhooks, or status callbacks. For more, check out our guide to Getting Started with Twilio Webhooks. Find other webhook pages, such as a security guide and an FAQ in the Webhooks section of the docs.

## Conversations Webhooks vs. Event Streams

Twilio Event Streams supports subscribing to Conversations post-action events. All post-action events are supported, except for onDeliveryUpdated. Event Streams provides a reliable way to consume these events, with up to four hours of queuing if your system is down. Event Streams is the recommended way to consume Conversations events for monitoring or logging use cases. To see a list of available events, see the Event Types navigation menu.

## Configuring Webhook Targets and Filtering

You can configure the global (Account-level) webhook target and service-level webhook target through the Console, or through the REST API.

- For the global webhook target, go to **Conversations > Global webhooks**.
- For the service-level webhook target, select your Conversation Service, then go to **Webhooks**.

> **Note:** The Conversation-scoped webhooks may only be modified via the REST API.

### Webhook Filtering

In addition to configuring the URLs for pre-action and post-action webhooks, you can also choose to send only certain webhooks to your servers. This helps avoid unnecessarily burdening your web application with traffic.

These can also be configured at an account level (globally) or at the service level in the Twilio Console:

- For the global webhook target, go to **Conversations > Global webhooks** and scroll down to Webhook Filtering.
- For the service-level webhook target, select your Conversation Service, then go to **Webhooks**. Scroll down to Webhook Filtering.

## Webhook Action Triggers

Most actions — but not all of them — have both a pre-action and a post-action webhook. The former is fired before the action has been published, and Twilio waits for a response before publishing it. The latter is fired after publication, assuming the action was not rejected by your pre-action webhook response.

The below table enumerates all Conversations webhook actions in corresponding pairs.

| Pre-Action | Post-Action | Description (incl. Post-Action) |
|------------|-------------|--------------------------------|
| onMessageAdd | onMessageAdded | Fires when a new message is posted to a conversation. |
| onMessageRemove | onMessageRemoved | Fires when a message is deleted from a conversation. |
| onMessageUpdate | onMessageUpdated | Fires when a posted message's body or any attribute is changed. |
| onConversationAdd | onConversationAdded | Fires when a new conversation is created. |
| onConversationRemove | onConversationRemoved | Fires when a conversation is removed from the Service. |
| onConversationUpdate | onConversationUpdated | Fires when any attribute of a conversation is changed. |
| onParticipantAdd | onParticipantAdded | Fires when a Participant has joined a Conversation as a Member. |
| onParticipantRemove | onParticipantRemoved | Fires when a User is removed from the set of Conversation Members. |
| onParticipantUpdate | onParticipantUpdated | Fires when any configurable attribute of a User is changed. Will not be fired for reachability events. |
| --- | onConversationStateUpdated | Fires when the state of a Conversation is updated, e.g., from "active" to "inactive" |
| --- | onDeliveryUpdated | Fires when delivery receipt status is updated |
| --- | onUserAdded | Fires when a new user is added |
| onUserUpdate | onUserUpdated | Fires when a user is changed |

## Triggering Webhooks for REST API Events

Upon configuration, only actions from SDK-driven clients (like mobile phones or browsers) or SMS-based Participants will cause webhooks without further action on your part. This includes both Service-level webhooks and Conversation-Scoped Webhooks. This is a default behavior to help avoid infinite feedback loops.

Your Post-Event Webhook target, however, may be an important tool for archiving. In this case, you may also want to enable webhook "echoes" from actions you take on the REST API. To do so, you can add a header `X-Twilio-Webhook-Enabled=true` to any such request. Requests bearing this header will yield webhooks to the configured Post-Event webhook target.

## Using Pre-Action Webhooks to Modify or Reject Changes

In the case of Pre-Action webhooks, Twilio will wait for a response from your service before publishing a result. The arrival, HTTP status code, and content of your response determines how Conversations will proceed.

| Response Status Code | Body | Result |
|---------------------|------|--------|
| HTTP 200 OK | `{}` (or no content) | Conversations will publish the change unmodified. |
| HTTP 200 OK | `{ "body": "modified message" }` (See the list of modifiable fields.) | Conversations will publish the change with modifications as given in the response. All values are optional, and missing fields will be left unmodified from the original event. See below for which fields can be modified for each data type (Conversations or Messages). If modified values fail validation, the error will be returned to the SDK (or REST client) that triggered the event. |
| HTTP 40x (any error condition) | N/A | Conversations will reject the change and no publication will be made. |
| HTTP 50x (any error condition) | N/A | Conversations will reject the change and no publication will be made. |
| (no response or timeout) | | Conversations will publish the change unmodified after a timeout of 5 seconds; your messages will be delayed accordingly. |

### Modifiable Fields

#### Conversation Actions

In response to the `onConversationAdd` and `onConversationUpdate` actions, your Pre-Action Webhook response may modify the following property of the conversation:

- `friendly_name`

An example response modifying a conversation:

```http
HTTP 200 OK
Content-Type: application/json
{
    "friendly_name": "friendly name of conversation"
}
```

#### Message Actions

In response to `onMessageAdd` and `onMessageUpdate` actions, your Pre-Action Webhook response may modify the following properties of the message:

- `body`
- `author`
- `attributes`

An example response modifying a message:

```http
HTTP 200 OK
Content-Type: application/json
{
    "body": "modified message text",
    "author": "modified author name",
    "attributes": "{\"key\" : \"value\"}"
}
```

## Configuring Webhooks with the REST API

Your Conversations service can have global webhooks that apply to every conversation within the service, or you can specify webhooks per conversation.

Post-action webhooks are available for all three types of webhooks (global, service-level and conversation-scoped). Pre-action webhooks are only available for two types of webhooks (global and service-level).

### Retrieve Existing Global Webhook Configuration for a Conversation Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = client.conversations.v1.configuration.webhooks().fetch()

print(webhook.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "pre_webhook_url": "https://example.com/pre",
  "post_webhook_url": "https://example.com/post",
  "method": "GET",
  "filters": [
    "onMessageSend",
    "onConversationUpdated"
  ],
  "target": "webhook",
  "url": "https://conversations.twilio.com/v1/Configuration/Webhooks"
}
```

### Update Global Webhook Configuration for a Conversation Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration_webhook = client.conversations.v1.configuration.webhooks().update(
    filters=["onMessageAdd", "onMessageUpdate", "onMessageRemove"],
    target="webhook",
    pre_webhook_url="https://YOUR_APPLICATION.com/webhook",
    post_webhook_url="https://YOUR_APPLICATION.com/webhook",
    method="POST",
)

print(configuration_webhook.account_sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "pre_webhook_url": "https://YOUR_APPLICATION.com/webhook",
  "post_webhook_url": "https://YOUR_APPLICATION.com/webhook",
  "method": "POST",
  "filters": [
    "onMessageAdd",
    "onMessageUpdate",
    "onMessageRemove"
  ],
  "target": "webhook",
  "url": "https://conversations.twilio.com/v1/Configuration/Webhooks"
}
```

### List the Scoped Webhooks for a Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhooks = client.conversations.v1.conversations(
    "ConversationSid"
).webhooks.list(limit=5)

for record in webhooks:
    print(record.sid)
```

Response:

```json
{
  "meta": {
    "page": 0,
    "page_size": 5,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks?PageSize=5&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks?PageSize=5&Page=0",
    "next_page_url": null,
    "key": "webhooks"
  },
  "webhooks": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "target": "trigger",
      "configuration": {
        "url": "https://example.com",
        "method": "post",
        "filters": [
          "keyword1",
          "keyword2"
        ]
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "target": "studio",
      "configuration": {
        "flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

### Retrieve the Configuration for a Specific Webhook

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = (
    client.conversations.v1.conversations("ConversationSid")
    .webhooks("WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(webhook.sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "target": "studio",
  "configuration": {
    "flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Create New Scoped Webhook Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhook = client.conversations.v1.conversations(
    "ConversationSid"
).webhooks.create(
    target="webhook",
    configuration_filters=["onMessageAdded", "onMessageUpdated"],
    configuration_url="https://YOUR_APPLICATION.com/webhook",
)

print(webhook.sid)
```

Response:

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
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

## Webhook Bodies by Event Type

When Twilio makes an HTTP request to your server, it includes information about the action that triggered the webhook call to your web application. Each action has its own event type.

In addition to the event-specific parameters, each request also contains the following parameters and information:

| Parameter Name | Type | Description |
|---------------|------|-------------|
| AccountSid | string, SID | The Twilio Account SID that the Conversation belongs to |
| EventType | string | The type of action that triggered this webhook event (see details for each event type below) |
| Source | string | The source of the action that created this event - possible values are SDK or API |
| ClientIdentity | string | The identity of the user that performed the action (SDK-originating events only) |

> **Note:** Each HTTP request is issued with the Content-Type header `application/x-www-form-urlencoded`.

## Pre-action Webhooks Request Parameters

### onConversationAdd

You may modify the FriendlyName of this conversation by replying to this webhook with a JSON object that contains the new friendly name.

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationAdd |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by channel creator |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the channel creator |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity |
| MessagingBinding.AuthorAddress | string, optional* | Number of the message author when auto-creating Group MMS |
| MessageBody | string, optional | Initial conversation message string |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |
| State | string | Enumerated type representing state of the conversation |

> **Note:** MessagingBinding.ProxyAddress and MessagingBinding.Address attributes are null if the Conversation is created from the REST API and there are no participants yet. When auto-creating Group MMS Conversation, MessagingBinding.Address is shown as a list of Addresses.

### onConversationRemove

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationRemove |
| ConversationSid | string, SID | Conversation String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the conversation |
| DateUpdated | string, ISO8601 time | The last modification date of the conversation |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| State | string | Enumerated type representing state of the conversation |

### onConversationUpdate

You may modify the FriendlyName of this conversation by replying to this webhook with a JSON object that contains the new friendly name.

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationUpdate |
| ConversationSid | string, SID | Conversation String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the conversation |
| DateUpdated | string, ISO8601 time | The last modification date of the conversation |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| State | string | Enumerated type representing state of the conversation |

### onMessageAdd

Your application may modify the Body and Author parameters in the pre-event webhook. To update these parameters, reply to the webhook with a JSON object that contains the relevant keys and values.

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageAdd |
| ConversationSid | string | Conversation SID identifier for the conversation the message is being added to. |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | string, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onMessageRemove

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageRemove |
| ConversationSid | string | Conversation SID identifier for the conversation the message is being removed from. |
| MessageSid | string | Message sid identifier |
| Index | int | Message index in the messages stream |
| DateCreated | string, ISO8601 time | Creation date of the message |
| DateUpdated | string, ISO8601 time | Last modification date of the message |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | String, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onMessageUpdate

Your application may modify the Body and Author parameters in the pre-event webhook. To update these parameters, reply to the webhook with a JSON object that contains the relevant keys and values.

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageUpdate |
| ConversationSid | string | Conversation SID identifier for the conversation the message is in. |
| MessageSid | string | Message sid identifier |
| Index | int | Message index in the messages stream |
| DateCreated | string, ISO8601 time | Creation date of the message |
| DateUpdated | string, ISO8601 time | Last modification date of the message |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | string, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onParticipantAdd

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantAdd |
| ConversationSid | string, SID | Conversation String Identifier |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of user that is being added to the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onParticipantRemove

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantRemove |
| ConversationSid | string, SID | Conversation String Identifier |
| ParticipantSid | string, SID | Participant String Identifier |
| DateCreated | string, ISO8601 time | Creation date of the participant |
| DateUpdated | string, ISO8601 time | The last modification date of the participant |
| Identity | string, optional (see note) | The Identity of the user being removed from the conversation |
| RoleSid | string | Role of user that is being removed from the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onParticipantUpdate

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantUpdate |
| ConversationSid | string, SID | Conversation String Identifier |
| ParticipantSid | string, SID | Participant String Identifier |
| DateCreated | string, ISO8601 time | Creation date of the participant |
| DateUpdated | string, ISO8601 time | The last modification date of the participant |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of the user that is being added to the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onUserUpdate

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onUserUpdate |
| ChatServiceSid | string, SID | Conversation Service String Identifier |
| UserSid | String, SID | User String Identifier |
| DateUpdated | string, ISO8601 time | User modification date |
| Identity | string, optional (see note) | The Identity of the user being updated |
| RoleSid | string | Role of the user being updated |
| Attributes | string | User metadata, as set by the customer, represented as stringified JSON |
| FriendlyName | string | Friendly name of the User |

## Post Action Webhooks request parameters

### onConversationAdded

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationAdded |
| ConversationSid | string, SID | Conversation Sid identifier |
| DateCreated | string, ISO8601 time | The date of creation of the conversation |
| DateUpdated | string, ISO8601 time | The last modification date of the conversation |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string, optional | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by channel creator |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the channel creator |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity |
| MessagingBinding.AuthorAddress | string, optional* | Number of the message author when auto-creating Group MMS |
| State | string | Enumerated type representing state of the conversation |

### onConversationRemoved

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationRemoved |
| ConversationSid | string, SID | Conversation String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the conversation |
| DateUpdated | string, ISO8601 time | The last modification date of the conversation |
| DateRemoved | string, ISO8601 time | The date the conversation was removed |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string, optional | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| State | string | Enumerated type representing state of the conversation |

### onConversationUpdated

You may modify the FriendlyName of this conversation by replying to this webhook with a JSON object that contains the new friendly name.

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onConversationUpdated |
| ConversationSid | string, SID | Conversation String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the conversation |
| DateUpdated | string, ISO8601 time | The last modification date of the conversation |
| FriendlyName | string, optional | The friendly name of the conversation, if set |
| UniqueName | string, optional | The unique name of the conversation |
| Attributes | string | Conversation metadata as set by the customer, represented as stringified JSON |
| ChatServiceSid | string, SID | Conversation Service SID |
| MessagingServiceSid | string, SID | Messaging Service instance SID |
| State | string | Enumerated type representing state of the conversation |

### onConversationStateUpdated

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | onConversationStateUpdated |
| ChatServiceSid | string, SID | Conversation Service SID |
| StateUpdated | string, ISO8601 time | Modification date of the state |
| StateFrom | String | State that conversation was transitioned from, e.g. "active", "inactive" or "closed". |
| StateTo | String | State that conversation was transitioned to, e.g. "active", "inactive" or "closed". |
| ConversationSid | String, SID | Conversation String Identifier |
| Reason | String | Source of the state change, e.g., "API", "TIMER", "EVENT" |
| MessagingServiceSid | String, SID | Messaging Service SID |

### onMessageAdded

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageAdded |
| ConversationSid | string | Conversation SID identifier for the conversation the message is being added to. |
| MessageSid | string | Message sid identifier |
| MessagingServiceSid | string, SID | The Messaging Service SID attached to the conversation this message is being added to. |
| Index | int | Message index in the messages stream |
| DateCreated | string, ISO8601 time | Creation date of the message |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | string, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onMessageUpdated

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageUpdated |
| ConversationSid | string | Conversation SID identifier for the conversation the message is in. |
| MessageSid | string | Message sid identifier |
| Index | int | Message index in the messages stream |
| DateCreated | string, ISO8601 time | Creation date of the message |
| DateUpdated | string, ISO8601 time | Last modification date of the message |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | string, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onMessageRemoved

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onMessageRemoved |
| ConversationSid | string | Conversation SID identifier for the conversation the message was removed from. |
| MessageSid | string | Message sid identifier |
| Index | int | Message index in the messages stream |
| DateCreated | string, ISO8601 time | Creation date of the message |
| DateUpdated | string, ISO8601 time | Last modification date of the message |
| DateRemoved | string, ISO8601 time | Date that the message was removed from the conversation |
| Body | string | The body of the message |
| Author | string | The author of the message |
| ParticipantSid | string, optional | Participant SID of the message author |
| Attributes | string | Message metadata as set by customer, represented as stringified JSON |
| Media | string, JSON, optional | Stringified JSON array of attached media objects |

### onParticipantAdded

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantAdded |
| ConversationSid | string, SID | Conversation String Identifier |
| ParticipantSid | string, SID | Participant String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the participant |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of user that is being added to the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onParticipantRemoved

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantRemoved |
| ConversationSid | string, SID | Conversation String Identifier |
| ParticipantSid | string, SID | Participant String Identifier |
| DateCreated | string, ISO8601 time | Creation date of the participant |
| DateUpdated | string, ISO8601 time | The last modification date of the participant |
| DateRemoved | string, ISO8601 time | The date the participant was removed |
| Identity | string, optional (see note) | The Identity of the user being removed from the conversation |
| RoleSid | string | Role of user that is being removed from the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onParticipantUpdated

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onParticipantUpdated |
| ConversationSid | string, SID | Conversation String Identifier |
| ParticipantSid | string, SID | Participant String Identifier |
| DateCreated | string, ISO8601 time | Creation date of the participant |
| DateUpdated | string, ISO8601 time | The last modification date of the participant |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of user that is being added to the conversation |
| Attributes | string | Participant metadata as set by the customer, represented as stringified JSON |
| MessagingBinding.ProxyAddress | string, optional (see note) | Twilio Brand phone number used by participant |
| MessagingBinding.Address | string, optional (see note) | Originating phone number of the participant |
| MessagingBinding.ProjectedAddress | string, optional* | The address of the Twilio phone number that is used in Group MMS |
| MessagingBinding.Type | string | Type of the participant, one of: SMS, CHAT, WHATSAPP |
| LastReadMessageIndex | int | Index of last "read" message in the Conversation for the participant |

> **Note:** A Conversation Participant has either the Identity (and MessagingBinding ProjectedAddress for GroupMMS Participant) or MessagingBinding ProxyAddress and Address attributes filled in. In case the added participant is SMS or WhatsApp, Identity is null and both addresses are supplied. If the added participant is Chat-only, the Identity value is provided, and both MessagingBinding addresses (MessagingBinding ProxyAddress and Address) are null.

### onDeliveryUpdated

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | onDeliveryUpdated |
| AccountSid | string, SID | SID of the account that the message belongs to, ACxx |
| ConversationSid | string, SID | Conversation String Identifier, CHxx |
| ChatServiceSid | string, SID | Conversation Service SID, ISxx |
| MessageSid | string, SID | Identifier of Conversation Message, IMxxx |
| DeliveryReceiptSid | string, SID | SID of the Delivery Receipt, DYxx |
| ChannelMessageSid | string, SID | SID of the 'channel' message e.g WAxx for WhatsApp, SMxx for SMS |
| ParticipantSid | string, SID | Participant String Identifier, MBxx |
| Status | string, enum | Status of the message, one of "read", "failed", "delivered", "undelivered", "sent" |
| ErrorCode | integer | Twilio documented numeric error code |
| DateCreated | string, ISO8601 time | Date delivery receipt was created |
| DateUpdated | string, ISO8601 time | Date that delivery receipt was last created |

### onUserAdded

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onUserAdded |
| ChatServiceSid | string, SID | Conversation Service String Identifier |
| UserSid | string, SID | String identifier of newly created User |
| DateCreated | string, ISO8601 time | The date of creation of the User |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of the user that is being added to the conversation |
| Attributes | string | User metadata as set by the customer, represented as stringified JSON |
| FriendlyName | string | Friendly name of the User |

### onUserUpdated

| Parameter Name | Type | Description |
|---------------|------|-------------|
| EventType | string | Always onUserUpdated |
| ChatServiceSid | string, SID | Conversation Service String Identifier |
| UserSid | string, SID | User String Identifier |
| DateCreated | string, ISO8601 time | The date of creation of the User |
| DateUpdated | string, ISO8601 time | User modification date |
| Identity | string, optional (see note) | The Identity of the user being added to the conversation |
| RoleSid | string | Role of the user that was updated |
| Attributes | string | User metadata as set by the customer, represented as stringified JSON |
| FriendlyName | string | Friendly name of the User |
| isOnline | Boolean | Whether the User is actively connected to this Conversations Service and online |
| isNotifiable | Boolean | Whether the User has a potentially valid Push Notification registration (APN or GCM) for this Conversations Service |