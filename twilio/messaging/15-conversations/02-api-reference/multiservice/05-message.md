# Message

Use the Service-scoped Conversation Message resource to interact with messages in Conversations that belong to a non-default, service-scoped Conversation resource.

Please see the Conversation Message Resource API Reference page for Messages that belong to Conversations in the default Conversation Service.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages
```

## Service-Scoped Conversation Message Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this message. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| chat_service_sid | SID<IS> | Optional | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | SID<CH> | Optional | Not PII | The unique ID of the Conversation for this message. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<IM> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| index | integer | Optional | Not PII | The index of the message within the Conversation. Default: 0 |
| author | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| body | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| media | array | Optional | PII MTL: 30 days | An array of objects that describe the Message's media, if the message contains media. Each object contains these fields: content_type with the MIME type of the media, filename with the name of the media, sid with the SID of the Media resource, and size with the media object's file size in bytes. If the Message has no media, this value is null. |
| attributes | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| participant_sid | SID<MB> | Optional | Not PII | The unique ID of messages's author participant. Null in case of system sent message. Pattern: `^MB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| delivery | object | Optional | Not PII | An object that contains the summary of delivery statuses for the message to non-chat participants. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this message. |
| links | object<uri-map> | Optional | Not PII | Contains an absolute API resource URL to access the delivery & read receipts of this message. |
| content_sid | SID<HX> | Optional | Not PII | The unique ID of the multi-channel Rich Content template. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

---

## Create a Service-Scoped Conversation Message resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Messages
```

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| author | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| body | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| attributes | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| media_sid | SID<ME> | Optional | Not PII | The Media SID to be attached to the new Message. Pattern: `^ME[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| content_sid | SID<HX> | Optional | Not PII | The unique ID of the multi-channel Rich Content template, required for template-generated messages. Note that if this field is set, Body and MediaSid parameters are ignored. Pattern: `^HX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| content_variables | string | Optional | Not PII | A structurally valid JSON string that contains values to resolve Rich Content template variables. |
| subject | string | Optional | Not PII | The subject of the message, can be up to 256 characters long. |

### Create a Message

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .messages.create()
)

print(message.account_sid)
```

### Response

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Hello",
  "media": null,
  "author": "message author",
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
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
    "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
  }
}
```

---

## Fetch a Service-Scoped Conversation Message resource

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Messages/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |
| sid | SID<IM> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Message

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
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(message.account_sid)
```

### Response

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
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
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
    "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
  }
}
```

---

## Read all Service-Scoped Conversation Message resources

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Messages
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for messages. |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| order | enum<string> | Optional | Not PII | The sort order of the returned messages. Can be: `asc` (ascending) or `desc` (descending), with `asc` as the default. |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Minimum: 1, Maximum: 100 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Messages

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .messages.list(limit=20)
)

for record in messages:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "messages"
  },
  "messages": [
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "body": "I like pie.",
      "media": null,
      "author": "pie_preferrer",
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
        "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
      }
    },
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "body": "Cake is my favorite!",
      "media": null,
      "author": "cake_lover",
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": "{ \"importance\": \"high\" }",
      "date_created": "2016-03-24T20:38:21Z",
      "date_updated": "2016-03-24T20:38:21Z",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
        "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
      }
    },
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "body": null,
      "media": [
        {
          "sid": "MEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "size": 42056,
          "content_type": "image/jpeg",
          "filename": "car.jpg"
        }
      ],
      "author": "cake_lover",
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": "{ \"importance\": \"high\" }",
      "date_created": "2016-03-24T20:38:21Z",
      "date_updated": "2016-03-24T20:38:21Z",
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
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
        "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
      }
    }
  ]
}
```

---

## Update a Service-Scoped Conversation Message resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Messages/{Sid}
```

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |
| sid | SID<IM> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| author | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| body | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| attributes | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| subject | string | Optional | Not PII | The subject of the message, can be up to 256 characters long. |

### Update a Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_conversation_message = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .conversations("ConversationSid")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(author="Author")
)

print(service_conversation_message.account_sid)
```

### Response

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "Hello",
  "media": null,
  "author": "Author",
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
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "delivery_receipts": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
    "channel_metadata": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
  }
}
```

---

## Delete a Service-Scoped Conversation Message resource

```
DELETE https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Conversations/{ConversationSid}/Messages/{Sid}
```

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Conversation Service the Participant resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| conversation_sid | string | required | Not PII | The unique ID of the Conversation for this message. |
| sid | SID<IM> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a Message

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
).conversations("ConversationSid").messages(
    "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```