# Service Configuration Resource

The Configuration Resource represents all of the configuration settings for a Conversation Service, such as the default roles assigned to Users.

## Configuration Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | Optional | Not PII | The unique string that we created to identify the Service configuration resource. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| default_conversation_creator_role_sid | SID<RL> | Optional | Not PII | The conversation-level role assigned to a conversation creator when they join a new conversation. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| default_conversation_role_sid | SID<RL> | Optional | Not PII | The conversation-level role assigned to users when they are added to a conversation. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| default_chat_service_role_sid | SID<RL> | Optional | Not PII | The service-level role assigned to users when they are added to the service. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this service configuration. |
| links | object<uri-map> | Optional | Not PII | Contains an absolute API resource URL to access the push notifications configuration of this service. |
| reachability_enabled | boolean | Optional | Not PII | Whether the Reachability Indicator is enabled for this Conversations Service. The default is false. |

## Fetch a ServiceConfiguration resource

```
GET https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Configuration
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Service configuration resource to fetch. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .configuration()
    .fetch()
)

print(configuration.chat_service_sid)
```

### Response

```json
{
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_conversation_creator_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_conversation_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_chat_service_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "reachability_enabled": false,
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
  "links": {
    "notifications": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Notifications",
    "webhooks": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Webhooks"
  }
}
```

## Update a ServiceConfiguration resource

```
POST https://conversations.twilio.com/v1/Services/{ChatServiceSid}/Configuration
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| chat_service_sid | SID<IS> | required | Not PII | The SID of the Service configuration resource to update. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| default_conversation_creator_role_sid | SID<RL> | Optional | Not PII | The conversation-level role assigned to a conversation creator when they join a new conversation. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| default_conversation_role_sid | SID<RL> | Optional | Not PII | The conversation-level role assigned to users when they are added to a conversation. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| default_chat_service_role_sid | SID<RL> | Optional | Not PII | The service-level role assigned to users when they are added to the service. See Conversation Role for more info about roles. Pattern: `^RL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| reachability_enabled | boolean | Optional | Not PII | Whether the Reachability Indicator is enabled for this Conversations Service. The default is false. |

### Update a Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service_configuration = (
    client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .configuration()
    .update(
        default_conversation_creator_role_sid="RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    )
)

print(service_configuration.chat_service_sid)
```

### Response

```json
{
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_conversation_creator_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_conversation_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_chat_service_role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "reachability_enabled": false,
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
  "links": {
    "notifications": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Notifications",
    "webhooks": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration/Webhooks"
  }
}
```