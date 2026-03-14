# Conversation Participant Resource

Each Participant in a Conversation represents one real (probably human) participant in a Conversation.

Creating a Participant joins them with the conversation, and the connected person will receive all subsequent messages.

Deleting a participant removes them from the conversation. They will receive no new messages after that point, but their previous messages will remain in the conversation.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can interact with Conversation Participant resources in the default Conversation Service instance via a "shortened" URL that does not include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you do not need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Conversations/CHxx/Participants
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Participants
```

## Participant Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique ID of the Account responsible for this participant. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `conversation_sid` | SID\<CH\> | Optional | Not PII | The unique ID of the Conversation for this participant. Pattern: `^CH[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `sid` | SID\<MB\> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^MB[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `identity` | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversations SDK to communicate. Limited to 256 characters. |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `messaging_binding` | object | Optional | PII MTL: 30 days | Information about how this participant exchanges messages with the conversation. A JSON parameter consisting of type and address fields of the participant. |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this participant. |
| `last_read_message_index` | integer | Optional | Not PII | Index of last "read" message in the Conversation for the Participant. |
| `last_read_timestamp` | string | Optional | Not PII | Timestamp of last "read" message in the Conversation for the Participant. |

---

## Add a Conversation Participant (SMS)

```
POST https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Participants
```

Adding a new participant to an ongoing conversation immediately allows them to see all subsequent communications. The same person (i.e., a single personal phone number) can be part of any number of conversations concurrently, as long as the address they are in contact with (the ProxyAddress) is unique.

To create a Conversation Participant by SMS, you must enter:
- Their phone number as the `messaging_binding.address`
- Your Twilio number as the `messaging_binding.proxy_address`

To create a Conversation Participant by Chat, you must enter the Chat User Identity as the `identity` parameter.

> We recommend following the standard URI specification and avoid the following reserved characters `! * ' ( ) ; : @ & = + $ , / ? % # [ ]` for values such as identity and friendly name.

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this participant. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `identity` | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversations SDK to communicate. Limited to 256 characters. |
| `messaging_binding_address` | string | Optional | Not PII | The address of the participant's device, e.g. a phone or WhatsApp number. Together with the Proxy address, this determines a participant uniquely. This field (with proxy_address) is only null when the participant is interacting from an SDK endpoint (see the 'identity' field). |
| `messaging_binding_proxy_address` | string | Optional | Not PII | The address of the Twilio phone number (or WhatsApp number) that the participant is in contact with. This field, together with participant address, is only null when the participant is interacting from an SDK endpoint (see the 'identity' field). |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `messaging_binding_projected_address` | string | Optional | Not PII | The address of the Twilio phone number that is used in Group MMS. Communication mask for the Conversation participant with Identity. |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Create Conversation Participant (SMS)

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
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).participants.create(
    messaging_binding_address="+15558675310",
    messaging_binding_proxy_address="<Your Twilio Number>",
)

print(participant.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

### Example: Create Conversation Participant (Chat)

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
).participants.create(identity="<Chat User Identity>")

print(participant.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "<Chat User Identity>",
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": null,
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

---

## Fetch a ConversationParticipant resource

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Participants/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this participant. |
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. Alternatively, you can pass a Participant's identity rather than the SID. |

### Example: Fetch Conversation Participant by SID

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conversations.v1.conversations("CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "identity": null,
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

You can also fetch a Conversation Participant by their identity. Pass their identity as the value for the sid argument.

### Example: Fetch Conversation Participant by identity

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participant = (
    client.conversations.v1.conversations("ConversationSid")
    .participants("alice")
    .fetch()
)

print(participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "alice",
  "identity": "alice",
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

---

## Read multiple ConversationParticipant resources

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Participants
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for participants. |

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Min: 1, Max: 100 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List Conversation Participant(s)

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participants = client.conversations.v1.conversations(
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).participants.list(limit=20)

for record in participants:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "participants"
  },
  "participants": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": null,
      "attributes": "{ \"role\": \"driver\" }",
      "messaging_binding": {
        "type": "sms",
        "address": "+15558675310",
        "proxy_address": "+15017122661"
      },
      "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "last_read_message_index": null,
      "last_read_timestamp": null
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "IDENTITY",
      "attributes": "{ \"role\": \"driver\" }",
      "messaging_binding": null,
      "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "last_read_message_index": null,
      "last_read_timestamp": null
    }
  ]
}
```

---

## Update a ConversationParticipant resource

```
POST https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Participants/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this participant. |
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `messaging_binding_proxy_address` | string | Optional | Not PII | The address of the Twilio phone number that the participant is in contact with. 'null' value will remove it. |
| `messaging_binding_projected_address` | string | Optional | Not PII | The address of the Twilio phone number that is used in Group MMS. 'null' value will remove it. |
| `identity` | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversations SDK to communicate. Limited to 256 characters. |
| `last_read_message_index` | integer | Optional | Not PII | Index of last "read" message in the Conversation for the Participant. |
| `last_read_timestamp` | string | Optional | Not PII | Timestamp of last "read" message in the Conversation for the Participant. |

### Example: Update Conversation Participant

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation_participant = (
    client.conversations.v1.conversations("ConversationSid")
    .participants("Sid")
    .update(date_updated=datetime(2019, 5, 15, 13, 37, 35))
)

print(conversation_participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "Sid",
  "identity": null,
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2019-05-15T13:37:35Z",
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

### Example: Update attributes for a Conversation Participant

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation_participant = (
    client.conversations.v1.conversations("ConversationSid")
    .participants("Sid")
    .update(attributes=json.dumps({"role": "driver"}))
)

print(conversation_participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "Sid",
  "identity": null,
  "attributes": "{\"role\": \"driver\"}",
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

---

## Delete a ConversationParticipant resource

```
DELETE https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Participants/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this participant. |
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. |

### Example: Delete Conversation Participant

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
).participants("MBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```