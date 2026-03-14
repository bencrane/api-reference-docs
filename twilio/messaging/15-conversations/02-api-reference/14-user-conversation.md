# User Conversation Resource

The UserConversation resource lists the Conversations in which a particular User is an active Participant. Use this resource to:

- list a user's conversations, present or historical,
- mute a user's push notifications for specific channels, or
- count a user's unread messages

> **Info:** UnreadMessageCount returns a maximum value of 1000

## Conversation Properties

Each UserConversation resource contains these properties.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this conversation. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this User Conversation. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| unread_messages_count | integer | Optional | Not PII | The number of unread Messages in the Conversation for the Participant. |
| last_read_message_index | integer | Optional | Not PII | The index of the last Message in the Conversation that the Participant has read. |
| participant_sid | SID<MB> | Optional | Not PII | The unique ID of the participant the user conversation belongs to. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| user_sid | SID<US> | Optional | Not PII | The unique string that identifies the User resource. Pattern: `^US[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | PII MTL: 30 days | The human-readable name of this conversation, limited to 256 characters. Optional. |
| conversation_state | enum<string> | Optional | Not PII | The current state of this User Conversation. Possible values: `inactive`, `active`, `closed` |
| timers | object | Optional | Not PII | Timer date values representing state update for this conversation. |
| attributes | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| date_created | string<date-time> | Optional | Not PII | The date that this conversation was created, given in ISO 8601 format. |
| date_updated | string<date-time> | Optional | Not PII | The date that this conversation was last updated, given in ISO 8601 format. |
| created_by | string | Optional | Not PII | Identity of the creator of this Conversation. |
| notification_level | enum<string> | Optional | Not PII | The Notification Level of this User Conversation. Possible values: `default`, `muted` |
| unique_name | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the Conversation resource. It can be used to address the resource in place of the resource's conversation_sid in the URL. |
| url | string<uri> | Optional | Not PII | |
| links | object<uri-map> | Optional | Not PII | Contains absolute URLs to access the participant and conversation of this conversation. |

## Fetch a specific conversation

```
GET https://conversations.twilio.com/v1/Users/{UserSid}/Conversations/{ConversationSid}
```

The `{UserSid}` value can be either the sid or the identity of the User resource and the `{ConversationSid}` value can be either the sid or the unique_name of the Conversation to fetch.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| user_sid | string | required | Not PII | The unique SID identifier of the User resource. This value can be either the sid or the identity of the User resource. |
| conversation_sid | string | required | Not PII | The unique SID identifier of the Conversation. This value can be either the sid or the unique_name of the Conversation resource. |

### Fetch a specific conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_conversation = (
    client.conversations.v1.users("USXXXXXXXXXXXXX")
    .user_conversations("CHXXXXXXXXXXXXX")
    .fetch()
)

print(user_conversation.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXX",
  "unread_messages_count": 100,
  "last_read_message_index": 100,
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "user_sid": "USXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "conversation_state": "inactive",
  "timers": {
    "date_inactive": "2015-12-16T22:19:38Z",
    "date_closed": "2015-12-16T22:28:38Z"
  },
  "attributes": "{}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "created_by": "created_by",
  "notification_level": "default",
  "unique_name": "unique_name",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participant": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "conversation": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## List All of a User's Conversations

```
GET https://conversations.twilio.com/v1/Users/{UserSid}/Conversations
```

The `{UserSid}` value can be either the sid or the identity of the User resource to read UserConversation resources from.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| user_sid | string | required | Not PII | The unique SID identifier of the User resource. This value can be either the sid or the identity of the User resource. |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Min: 1, Max: 50 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List All of a User's Conversations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_conversations = client.conversations.v1.users(
    "USXXXXXXXXXXXXX"
).user_conversations.list(limit=20)

for record in user_conversations:
    print(record.account_sid)
```

### Response

```json
{
  "conversations": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "conversations"
  }
}
```

## Update a specific conversation

```
POST https://conversations.twilio.com/v1/Users/{UserSid}/Conversations/{ConversationSid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| user_sid | string | required | Not PII | The unique SID identifier of the User resource. This value can be either the sid or the identity of the User resource. |
| conversation_sid | string | required | Not PII | The unique SID identifier of the Conversation. This value can be either the sid or the unique_name of the Conversation resource. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| notification_level | enum<string> | Optional | Not PII | The Notification Level of this User Conversation. Possible values: `default`, `muted` |
| last_read_timestamp | string<date-time> | Optional | Not PII | The date of the last message read in conversation by the user, given in ISO 8601 format. |
| last_read_message_index | integer | Optional | Not PII | The index of the last Message in the Conversation that the Participant has read. |

### Update a specific conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_conversation = (
    client.conversations.v1.users("USXXXXXXXXXXXXX")
    .user_conversations("CHXXXXXXXXXXXXX")
    .update(notification_level="default")
)

print(user_conversation.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXX",
  "unread_messages_count": 100,
  "last_read_message_index": 100,
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "user_sid": "USXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "conversation_state": "inactive",
  "timers": {
    "date_inactive": "2015-12-16T22:19:38Z",
    "date_closed": "2015-12-16T22:28:38Z"
  },
  "attributes": "{}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "created_by": "created_by",
  "notification_level": "default",
  "unique_name": "unique_name",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participant": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "conversation": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Set the NotificationLevel for a conversation

```
POST https://conversations.twilio.com/v1/Users/{UserSid}/Conversations/{ConversationSid}
```

The NotificationLevel property expresses whether a user receives pushes for this conversation or not. This can be set separately for each user/conversation pair.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| user_sid | string | required | Not PII | The unique SID identifier of the User resource. This value can be either the sid or the identity of the User resource. |
| conversation_sid | string | required | Not PII | The unique SID identifier of the Conversation. This value can be either the sid or the unique_name of the Conversation resource. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| notification_level | enum<string> | Optional | Not PII | The Notification Level of this User Conversation. Possible values: `default`, `muted` |
| last_read_timestamp | string<date-time> | Optional | Not PII | The date of the last message read in conversation by the user, given in ISO 8601 format. |
| last_read_message_index | integer | Optional | Not PII | The index of the last Message in the Conversation that the Participant has read. |

### Mute Notifications for a Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user_conversation = (
    client.conversations.v1.users("UserSid")
    .user_conversations("ConversationSid")
    .update(notification_level="muted")
)

print(user_conversation.notification_level)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "unread_messages_count": 100,
  "last_read_message_index": 100,
  "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "user_sid": "UserSid",
  "friendly_name": "friendly_name",
  "conversation_state": "inactive",
  "timers": {
    "date_inactive": "2015-12-16T22:19:38Z",
    "date_closed": "2015-12-16T22:28:38Z"
  },
  "attributes": "{}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "created_by": "created_by",
  "notification_level": "muted",
  "unique_name": "unique_name",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participant": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "conversation": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Remove a User from one of their Conversations

```
DELETE https://conversations.twilio.com/v1/Users/{UserSid}/Conversations/{ConversationSid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| user_sid | string | required | Not PII | The unique SID identifier of the User resource. This value can be either the sid or the identity of the User resource. |
| conversation_sid | string | required | Not PII | The unique SID identifier of the Conversation. This value can be either the sid or the unique_name of the Conversation resource. |

### Remove a User from one of their Conversations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.users("USXXXXXXXXXXXXX").user_conversations(
    "CHXXXXXXXXXXXXX"
).delete()
```