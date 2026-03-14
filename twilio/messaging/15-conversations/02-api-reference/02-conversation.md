# Conversation Resource

A Conversation is a unique message thread that contains Participants and the Messages they have sent.

> **Warning: Don't use Personally Identifiable Information (PII) for the friendlyName field**
>
> Avoid using a person's name, home address, email address, phone number, or other PII in the friendlyName field. Instead, use a pseudonymized identifier.
>
> You can learn more about how we process your data in our privacy policy.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can interact with Conversation resources in the default Conversation Service instance via a "shortened" URL that doesn't include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you don't need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Conversations
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/ISxx/Conversations
```

## Conversation Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique ID of the Account responsible for this conversation. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `chat_service_sid` | SID\<IS\> | Optional | Not PII | The unique ID of the Conversation Service this conversation belongs to. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `messaging_service_sid` | SID\<MG\> | Optional | Not PII | The unique ID of the Messaging Service this conversation belongs to. Pattern: `^MG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `sid` | SID\<CH\> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^CH[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `friendly_name` | string | Optional | PII MTL: 30 days | The human-readable name of this conversation, limited to 256 characters. Optional. |
| `unique_name` | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the resource. It can be used to address the resource in place of the resource's sid in the URL. |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `state` | enum\<string\> | Optional | Not PII | Current state of this conversation. Can be either `initializing`, `active`, `inactive` or `closed` and defaults to `active`. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `timers` | object | Optional | Not PII | Timer date values representing state update for this conversation. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this conversation. |
| `links` | object\<uri-map\> | Optional | Not PII | Contains absolute URLs to access the participants, messages and webhooks of this conversation. |
| `bindings` | null | Optional | Not PII | |

---

## Create a Conversation resource

```
POST https://conversations.twilio.com/v1/Conversations
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | PII MTL: 30 days | The human-readable name of this conversation, limited to 256 characters. Optional. |
| `unique_name` | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the resource. It can be used to address the resource in place of the resource's sid in the URL. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `messaging_service_sid` | SID\<MG\> | Optional | Not PII | The unique ID of the Messaging Service this conversation belongs to. Pattern: `^MG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `state` | enum\<string\> | Optional | Not PII | Current state of this conversation. Can be either `initializing`, `active`, `inactive` or `closed` and defaults to `active`. |
| `timers_inactive` | string | Optional | Not PII | ISO8601 duration when conversation will be switched to inactive state. Minimum value for this timer is 1 minute. |
| `timers_closed` | string | Optional | Not PII | ISO8601 duration when conversation will be switched to closed state. Minimum value for this timer is 10 minutes. |
| `bindings_email_address` | string | Optional | Not PII | The default email address that will be used when sending outbound emails in this conversation. |
| `bindings_email_name` | string | Optional | Not PII | The default name that will be used when sending outbound emails in this conversation. |

### Example: Create Conversation

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
    friendly_name="Friendly Conversation"
)

print(conversation.sid)
```

### Response

```json
{
  "sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Friendly Conversation",
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

---

## Fetch a Conversation resource

```
GET https://conversations.twilio.com/v1/Conversations/{Sid}
```

You can fetch a Conversation by providing your account credentials and the conversation SID (provided when the Conversation is created).

The most valuable part of the Conversation resource itself is the attributes key, which includes metadata attached to the conversation from the moment of its creation.

The other relevant parts of a Conversation include its Participants (the entities who are currently conversing) and the Messages they've sent. Both of these are linked directly from the top-level url key.

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. Can also be the unique_name of the Conversation. |

### Example: Fetch Conversation

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

### Response

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

---

## Read multiple Conversation resources

```
GET https://conversations.twilio.com/v1/Conversations
```

Returns a list of conversations sorted by recent message activity.

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `start_date` | string | Optional | Not PII | Specifies the beginning of the date range for filtering Conversations based on their creation date. Conversations that were created on or after this date will be included in the results. The date must be in ISO8601 format, specifically starting at the beginning of the specified date (YYYY-MM-DDT00:00:00Z), for precise filtering. This parameter can be combined with other filters. If this filter is used, the returned list is sorted by latest conversation creation date in descending order. |
| `end_date` | string | Optional | Not PII | Defines the end of the date range for filtering conversations by their creation date. Only conversations that were created on or before this date will appear in the results. The date must be in ISO8601 format, specifically capturing up to the end of the specified date (YYYY-MM-DDT23:59:59Z), to ensure that conversations from the entire end day are included. This parameter can be combined with other filters. If this filter is used, the returned list is sorted by latest conversation creation date in descending order. |
| `state` | enum\<string\> | Optional | Not PII | State for sorting and filtering list of Conversations. Can be `active`, `inactive` or `closed`. Possible values: `initializing`, `inactive`, `active`, `closed` |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Min: 1, Max: 100 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: Read multiple Conversation resources

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

### Response

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

---

## Update a Conversation resource

```
POST https://conversations.twilio.com/v1/Conversations/{Sid}
```

The core definition of any Conversation can be modified on the fly. Update a Conversation to attach metadata that you extract on the fly (e.g. "customer-loyalty-status": "gold", or "aml-risk-level": "heightened"), or to correct mistakes.

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. Can also be the unique_name of the Conversation. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | PII MTL: 30 days | The human-readable name of this conversation, limited to 256 characters. Optional. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `attributes` | string | Optional | PII MTL: 30 days | An optional string metadata field you can use to store any data you wish. The string value must contain structurally valid JSON if specified. Note that if the attributes are not set "{}" will be returned. |
| `messaging_service_sid` | SID\<MG\> | Optional | Not PII | The unique ID of the Messaging Service this conversation belongs to. Pattern: `^MG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `state` | enum\<string\> | Optional | Not PII | Current state of this conversation. Can be either `initializing`, `active`, `inactive` or `closed` and defaults to `active`. |
| `timers_inactive` | string | Optional | Not PII | ISO8601 duration when conversation will be switched to inactive state. Minimum value for this timer is 1 minute. |
| `timers_closed` | string | Optional | Not PII | ISO8601 duration when conversation will be switched to closed state. Minimum value for this timer is 10 minutes. |
| `unique_name` | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the resource. It can be used to address the resource in place of the resource's sid in the URL. |
| `bindings_email_address` | string | Optional | Not PII | The default email address that will be used when sending outbound emails in this conversation. |
| `bindings_email_name` | string | Optional | Not PII | The default name that will be used when sending outbound emails in this conversation. |

### Example: Update Conversation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation = client.conversations.v1.conversations("Sid").update(
    friendly_name="Important Customer Question"
)

print(conversation.friendly_name)
```

### Response

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
  "friendly_name": "Important Customer Question",
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

---

## Delete a Conversation resource

```
DELETE https://conversations.twilio.com/v1/Conversations/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | A 34 character string that uniquely identifies this resource. Can also be the unique_name of the Conversation. |

### Example: Delete Conversation

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