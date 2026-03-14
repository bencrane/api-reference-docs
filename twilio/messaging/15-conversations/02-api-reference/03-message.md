# Conversation Message Resource

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can interact with Conversation Message resources in the default Conversation Service instance via a "shortened" URL that does not include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you do not need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Conversations/CHxx/Messages
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations/CHxx/Messages
```

## Message Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique ID of the Account responsible for this message. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `conversation_sid` | SID\<CH\> | Optional | Not PII | The unique ID of the Conversation for this message. Pattern: `^CH[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `sid` | SID\<IM\> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `index` | integer | Optional | Not PII | The index of the message within the Conversation. Indices may skip numbers, but will always be in order of when the message was received. Default: 0 |
| `author` | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| `body` | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| `media` | array | Optional | PII MTL: 30 days | An array of objects that describe the Message's media, if the message contains media. Each object contains these fields: content_type with the MIME type of the media, filename with the name of the media, sid with the SID of the Media resource, and size with the media object's file size in bytes. If the Message has no media, this value is null. |
| `attributes` | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `participant_sid` | SID\<MB\> | Optional | Not PII | The unique ID of messages's author participant. Null in case of system sent message. Pattern: `^MB[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource API URL for this message. |
| `delivery` | object | Optional | Not PII | An object that contains the summary of delivery statuses for the message to non-chat participants. |
| `links` | object\<uri-map\> | Optional | Not PII | Contains an absolute API resource URL to access the delivery & read receipts of this message. |
| `content_sid` | SID\<HX\> | Optional | Not PII | The unique ID of the multi-channel Rich Content template. Pattern: `^HX[0-9a-fA-F]{32}$` Min/Max length: 34 |

---

## Create a ConversationMessage resource

```
POST https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this message. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `author` | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| `body` | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| `attributes` | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `media_sid` | SID\<ME\> | Optional | Not PII | The Media SID to be attached to the new Message. Pattern: `^ME[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `content_sid` | SID\<HX\> | Optional | Not PII | The unique ID of the multi-channel Rich Content template, required for template-generated messages. Note that if this field is set, Body and MediaSid parameters are ignored. Pattern: `^HX[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `content_variables` | string | Optional | Not PII | A structurally valid JSON string that contains values to resolve Rich Content template variables. |
| `subject` | string | Optional | Not PII | The subject of the message, can be up to 256 characters long. |

### Example: Create a Conversation Message

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
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).messages.create(author="smee", body="Ahoy there!")

print(message.sid)
```

### Response

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "body": "Ahoy there!",
  "media": null,
  "author": "smee",
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

---

## Fetch a ConversationMessage resource

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this message. |
| `sid` | SID\<IM\> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Fetch a Conversation Message

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
    client.conversations.v1.conversations("ConversationSid")
    .messages("IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(message.account_sid)
```

### Response

```json
{
  "sid": "IMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "delivery_receipts": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
    "channel_metadata": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
  }
}
```

---

## List all Conversation Message(s)

```
GET https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for messages. |

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `order` | enum\<string\> | Optional | Not PII | The sort order of the returned messages. Can be: `asc` (ascending) or `desc` (descending), with `asc` as the default. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Min: 1, Max: 100 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List all Conversation Messages

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.conversations.v1.conversations(
    "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).messages.list(limit=20)

for record in messages:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "messages"
  },
  "messages": [
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "delivery_receipts": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Receipts",
        "channel_metadata": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelMetadata"
      }
    },
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "body": "Cake is my favorite!",
      "media": null,
      "author": "cake_lover",
      "participant_sid": "MBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": "{ \"importance\": \"high\" }",
      "date_created": "2016-03-24T20:38:21Z",
      "date_updated": "2016-03-24T20:38:21Z",
      "index": 5,
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
    },
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "index": 9,
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
  ]
}
```

---

## Fetch the latest Conversation Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

messages = client.conversations.v1.conversations(
    "ConversationSid"
).messages.list(order="desc", limit=20)

for record in messages:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 2,
    "first_page_url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?Order=desc&PageSize=2&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages?Order=desc&PageSize=2&Page=0",
    "next_page_url": null,
    "key": "messages"
  },
  "messages": [
    {
      "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
      "index": 9,
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
  ]
}
```

---

## Update a ConversationMessage resource

```
POST https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this message. |
| `sid` | SID\<IM\> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `author` | string | Optional | PII MTL: 30 days | The channel specific identifier of the message's author. Defaults to system. |
| `body` | string | Optional | PII MTL: 30 days | The content of the message, can be up to 1,600 characters long. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. null if the message has not been edited. |
| `attributes` | string | Optional | PII MTL: 30 days | A string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `subject` | string | Optional | Not PII | The subject of the message, can be up to 256 characters long. |

### Example: Update a Conversation Message

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation_message = (
    client.conversations.v1.conversations("ConversationSid")
    .messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(author="regretfulUser", body="I take back what I said")
)

print(conversation_message.account_sid)
```

### Response

```json
{
  "sid": "IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conversation_sid": "ConversationSid",
  "body": "I take back what I said",
  "media": null,
  "author": "regretfulUser",
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

---

## Delete a ConversationMessage resource

```
DELETE https://conversations.twilio.com/v1/Conversations/{ConversationSid}/Messages/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conversation_sid` | string | required | Not PII | The unique ID of the Conversation for this message. |
| `sid` | SID\<IM\> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IM[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Delete a Conversation Message

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
).messages("IMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```