# Conversation with Participants Resource

The ConversationWithParticipants resource accepts all the details for a conversation and allows up to 10 participants in one request. It is especially helpful for situations where you want to send group texts. It helps prevent issues that might occur with existing conversations when you add participants individually.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can create Conversation with Participants in the default Conversation Service instance via a "shortened" URL that doesn't include the Conversation Service instance SID (ISXXX...). If you are only using one Conversation Service (the default), you don't need to include the Conversation Service SID in your URL, e.g.

```
POST /v1/ConversationWithParticipants
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
POST /v1/Services/ISxx/ConversationWithParticipants
```

## ConversationWithParticipant Properties

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
| `links` | object\<uri-map\> | Optional | Not PII | Contains absolute URLs to access the participants, messages and webhooks of this conversation. |
| `bindings` | null | Optional | Not PII | |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this conversation. |

---

## Create a Conversation with Participants resource

```
POST https://conversations.twilio.com/v1/ConversationWithParticipants
```

This resource behaves differently than most other Conversations API resources. Here's how it works:

1. **Parameter validation:** It validates all conversation and participant parameters and returns various possible conversations errors.

2. **Conversations are created synchronously:** If the request is valid, a conversation will be created and returned in the response. This conversation will be in the state `initializing` while the participants are added. In this state, the conversation cannot be updated.

3. **Participants are added to the conversation asynchronously:** Once all participants are added, the conversation state will be set to `active` and the conversation can be used. Listening to the `onConversationStateUpdated` webhook event or polling the conversations GET endpoint are both acceptable ways to check if the conversation is ready to be used.

4. **System Errors:** If any unexpected errors happen while adding the participants, the conversation state will be set to `closed`. You can view the error logs in the Twilio Console, and in your webhook notifications if you subscribe to them.

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
| `participant` | array[string] | Optional | Not PII | The participant to be added to the conversation in JSON format. The JSON object attributes are as parameters in Participant Resource. The maximum number of participants that can be added in a single request is 10. |

### Example: Create Conversation with Participants

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation_with_participant = client.conversations.v1.conversation_with_participants.create(
    friendly_name="Friendly Conversation",
    participant=[
        '{"messaging_binding": {"address": "<External Participant Number>", "proxy_address": "<Your Twilio Number>"}}',
        '{"identity": "<Chat User Identity>"}',
    ],
)

print(conversation_with_participant.sid)
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
  "links": {
    "participants": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "messages": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "webhooks": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks"
  },
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Example: Create GMMS Conversation with Participants

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conversation_with_participant = client.conversations.v1.conversation_with_participants.create(
    friendly_name="Friendly Conversation",
    participant=[
        '{"messaging_binding": {"address": "<External Participant Number>"}}',
        '{"messaging_binding": {"address": "<External Participant Number>"}}',
        '{"messaging_binding": {"projected_address": "<Your Twilio Number>"}}',
    ],
)

print(conversation_with_participant.sid)
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
  "links": {
    "participants": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "messages": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "webhooks": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks"
  },
  "url": "https://conversations.twilio.com/v1/Conversations/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```