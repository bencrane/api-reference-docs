# Conversation-Scoped Webhook

Service-Scoped Conversation-Scoped Webhooks provide a way to attach a unique monitor, bot, or other integration to each service-scoped Conversation within a non-default Conversation Service.

Each individual service-scoped Conversation can have as many as five such webhooks, as needed for your use case.

Please see the API Reference for the Conversation-Scoped Webhook resource for creating and managing Conversation-Scoped Webhooks within the default Conversation Service.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages
```

## Service-Scoped Conversation-Scoped Webhook Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<WH> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^WH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this conversation. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this webhook. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| target | string | Optional | Not PII | The target of this webhook: `webhook`, `studio`, `trigger` |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this webhook. |
| configuration | object | Optional | Not PII | The configuration of this webhook. Is defined based on target. |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. |

---

## Create a Service-Scoped Conversation-Scoped Webhook resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Webhooks
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this webhook. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| target | enum<string> | required | Not PII | The target of this webhook: `webhook`, `trigger`, `studio` |
| configuration_url | string | Optional | Not PII | The absolute url the webhook request should be sent to. |
| configuration_method | enum<string> | Optional | Not PII | Possible values: `get`, `post` |
| configuration_filters | array[string] | Optional | Not PII | The list of events, firing webhook event for this Conversation. |
| configuration_triggers | array[string] | Optional | Not PII | The list of keywords, firing webhook event for this Conversation. |
| configuration_flow_sid | SID<FW> | Optional | Not PII | The studio flow SID, where the webhook should be sent to. Pattern: `^FW[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| configuration_replay_after | integer | Optional | Not PII | The message index for which and it's successors the webhook will be replayed. Not set by default. |

### Create a Webhook

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .webhooks.create(target="webhook")
)

print(webhook.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch a Service-Scoped Conversation-Scoped Webhook resource

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Webhooks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this webhook. |
| sid | SID<WH> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^WH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Webhook

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .webhooks("WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(webhook.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "target": "studio",
  "configuration": {
    "flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple Service-Scoped Conversation-Scoped Webhook resources

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Webhooks
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this webhook. |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 5, and the maximum is 5. Minimum: 1, Maximum: 5 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Webhooks

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

webhooks = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .webhooks.list(limit=5)
)

for record in webhooks:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 5,
    "first_page_url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks?PageSize=5&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks?PageSize=5&Page=0",
    "next_page_url": null,
    "key": "webhooks"
  },
  "webhooks": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "target": "studio",
      "configuration": {
        "flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

---

## Update a Service-Scoped Conversation-Scoped Webhook resources

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Webhooks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this webhook. |
| sid | SID<WH> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^WH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| configuration_url | string | Optional | Not PII | The absolute url the webhook request should be sent to. |
| configuration_method | enum<string> | Optional | Not PII | Possible values: `get`, `post` |
| configuration_filters | array[string] | Optional | Not PII | The list of events, firing webhook event for this Conversation. |
| configuration_triggers | array[string] | Optional | Not PII | The list of keywords, firing webhook event for this Conversation. |
| configuration_flow_sid | SID<FW> | Optional | Not PII | The studio flow SID, where the webhook should be sent to. Pattern: `^FW[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Update a Webhook

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_conversation_scoped_webhook = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .webhooks("WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(configuration_url="Configuration.Url")
)

print(service_conversation_scoped_webhook.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
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
  "date_updated": "2016-03-24T21:05:51Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete a Service-Scoped, Conversation-Scoped Webhook resource

```
DELETE https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Webhooks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this webhook. |
| sid | SID<WH> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^WH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a Webhook

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
).conversations("ConversationSid").webhooks(
    "WHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```