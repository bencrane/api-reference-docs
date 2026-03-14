# Participant

Each service-scoped Participant in a Conversation represents one real (probably human) participant in a non-default, service-scoped Conversation.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID (ISxx) and the Conversation SID (CHxx) in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages
```

## Service-Scoped Conversation Participant Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this participant. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this participant. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<MB> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| identity | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversation SDK to communicate. Limited to 256 characters. |
| attributes | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set {} will be returned. |
| messaging_binding | object | Optional | PII MTL: 30 days | Information about how this participant exchanges messages with the conversation. A JSON parameter consisting of type and address fields of the participant. |
| role_sid | SID<RL> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time> | Optional | Not PII | The date on which this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date on which this resource was last updated. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this participant. |
| last_read_message_index | integer | Optional | Not PII | Index of last "read" message in the Conversation for the Participant. |
| last_read_timestamp | string | Optional | Not PII | Timestamp of last "read" message in the Conversation for the Participant. |

---

## Create a Service-Scoped Participant resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Participants
```

Creating a Participant joins them to the Conversation, and the connected person will receive all subsequent messages.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this participant. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| identity | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversation SDK to communicate. Limited to 256 characters. |
| messaging_binding_address | string | Optional | Not PII | The address of the participant's device, e.g. a phone or WhatsApp number. Together with the Proxy address, this determines a participant uniquely. This field (with proxy_address) is only null when the participant is interacting from an SDK endpoint (see the identity field). |
| messaging_binding_proxy_address | string | Optional | Not PII | The address of the Twilio phone number (or WhatsApp number) that the participant is in contact with. This field, together with participant address, is only null when the participant is interacting from an SDK endpoint (see the identity field). |
| date_created | string<date-time> | Optional | Not PII | The date on which this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date on which this resource was last updated. |
| attributes | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set {} will be returned. |
| messaging_binding_projected_address | string | Optional | Not PII | The address of the Twilio phone number that is used in Group MMS. |
| role_sid | SID<RL> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a Participant

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .participants.create()
)

print(participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "null",
  "attributes": "{ \"role\": \"driver\" }",
  "messaging_binding": {
    "type": "sms",
    "address": "+15558675310",
    "proxy_address": "+15017122661"
  },
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

---

## Fetch a Service-Scoped Participant resource

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Participants/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this participant. |
| sid | string | required | Not PII | A 34 character string that uniquely identifies this resource. Alternatively, you can pass a Participant's identity rather than the SID. |

### Fetch a Service-Scoped Participant resource by SID

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .participants("Sid")
    .fetch()
)

print(participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

You can also fetch a Service-Scoped Conversation Participant by their identity. Pass their identity as the value for the sid argument.

### Fetch a Service-Scoped Participant resource by identity

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .participants("alice")
    .fetch()
)

print(participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

---

## Read multiple Service-Scoped Participant resources

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Participants
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for participants. |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Minimum: 1, Maximum: 100 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Participants

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

participants = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .participants.list(limit=20)
)

for record in participants:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "participants"
  },
  "participants": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "last_read_message_index": null,
      "last_read_timestamp": null
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "IDENTITY",
      "attributes": "{ \"role\": \"driver\" }",
      "messaging_binding": null,
      "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "last_read_message_index": null,
      "last_read_timestamp": null
    }
  ]
}
```

---

## Update a Service-Scoped Participant resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Participants/{Sid}
```

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this participant. |
| sid | string | required | Not PII | A 34 character string that uniquely identifies this resource. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| date_created | string<date-time> | Optional | Not PII | The date on which this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date on which this resource was last updated. |
| identity | string | Optional | PII MTL: 30 days | A unique string identifier for the conversation participant as Conversation User. This parameter is non-null if (and only if) the participant is using the Conversation SDK to communicate. Limited to 256 characters. |
| attributes | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set {} will be returned. |
| role_sid | SID<RL> | Optional | Not PII | The SID of a conversation-level Role to assign to the participant. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| messaging_binding_proxy_address | string | Optional | Not PII | The address of the Twilio phone number that the participant is in contact with. 'null' value will remove it. |
| messaging_binding_projected_address | string | Optional | Not PII | The address of the Twilio phone number that is used in Group MMS. 'null' value will remove it. |
| last_read_message_index | integer | Optional | Not PII | Index of last "read" message in the Conversation for the Participant. |
| last_read_timestamp | string | Optional | Not PII | Timestamp of last "read" message in the Conversation for the Participant. |

### Update a Participant

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

service_conversation_participant = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .participants("Sid")
    .update(date_created=datetime(2009, 7, 6, 20, 30, 0))
)

print(service_conversation_participant.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
  "date_created": "2009-07-06T20:30:00Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "last_read_message_index": null,
  "last_read_timestamp": null
}
```

---

## Delete a Service-Scoped Conversation Participant resource

```
DELETE https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Participants/{Sid}
```

Deleting a participant removes them from the Conversation; they will receive no new messages after that point.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this participant. |
| sid | string | required | Not PII | A 34 character string that uniquely identifies this resource. |

### Delete a Participant

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.services(
    "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).conversations("ConversationSid").participants("Sid").delete()
```