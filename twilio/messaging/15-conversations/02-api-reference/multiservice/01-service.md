# Multiservice - Service

A Conversation Service is the top-level container for other resources in the Twilio Conversations REST API. All other Twilio Conversations resources, such as Conversations, Users, Messages, Bindings, and Credentials belong to a specific Service.

Services allow you to:

- Create multiple, distinct environments (such as dev, stage, and prod) under a single Twilio account
- Scope access to resources through both the REST and client APIs
- Configure different Service instances with specific behaviors

A Service can also send HTTPS requests (webhooks) to URLs that you define to let you know of specific events. See what events you can subscribe to in our webhook reference.

> ⚠️ **Warning:** Do not use Personally Identifiable Information (PII) for the friendlyName field. Avoid using a person's name, home address, email, phone number, or other PII in the friendlyName field. Use some form of pseudonymized identifier, instead.

## Service Defaults in the Twilio Console

You can use the REST API to configure your Conversation Service instances. (See the following examples.)

You can also find the default Conversation Service instance under Defaults in the Conversations Section of the Twilio Console.

You may have created non-default Conversation Service resources to separate messaging traffic, create development environments, etc. To access any non-default Conversation Service resources, the Service Sid (ISXXX) has to be a part of the url, as shown below:

```
https://conversations.twilio.com/v1/Services/ISXXX
https://conversations.twilio.com/v1/Services/ISXXX/Conversations
https://conversations.twilio.com/v1/Services/ISXXX/Conversations/CHXXX/Participants
https://conversations.twilio.com/v1/Services/ISXXX/Conversations/CHXXX/Messages
```

## Service Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The unique ID of the Account responsible for this service. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<IS> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | PII MTL: 30 days | The human-readable name of this service, limited to 256 characters. Optional. |
| date_created | string<date-time> | Optional | Not PII | The date that this resource was created. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was last updated. |
| url | string<uri> | Optional | Not PII | An absolute API resource URL for this service. |
| links | object<uri-map> | Optional | Not PII | Contains absolute API resource URLs to access conversations, users, roles, bindings and configuration of this service. |

---

## Create a Service resource

```
POST https://conversations.twilio.com/v1/Services
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | required | PII MTL: 30 days | The human-readable name of this service, limited to 256 characters. Optional. |

### Create a Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service = client.conversations.v1.services.create(friendly_name="FriendlyName")

print(service.account_sid)
```

### Response

```json
{
  "sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations",
    "users": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users",
    "roles": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Roles",
    "bindings": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Bindings",
    "configuration": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
    "participant_conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ParticipantConversations",
    "conversation_with_participants": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConversationWithParticipants"
  }
}
```

---

## Fetch a Service resource

```
GET https://conversations.twilio.com/v1/Services/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IS> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service = client.conversations.v1.services(
    "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(service.account_sid)
```

### Response

```json
{
  "sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My First Service",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations",
    "users": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users",
    "roles": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Roles",
    "bindings": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Bindings",
    "configuration": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
    "participant_conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ParticipantConversations",
    "conversation_with_participants": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConversationWithParticipants"
  }
}
```

---

## Read multiple Service resources

```
GET https://conversations.twilio.com/v1/Services
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 100. Minimum: 1, Maximum: 100 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Services

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

services = client.conversations.v1.services.list(limit=20)

for record in services:
    print(record.account_sid)
```

### Response

```json
{
  "services": [
    {
      "sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Home Service",
      "date_created": "2015-12-16T22:18:37Z",
      "date_updated": "2015-12-16T22:18:38Z",
      "url": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations",
        "users": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Users",
        "roles": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Roles",
        "bindings": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Bindings",
        "configuration": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
        "participant_conversations": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ParticipantConversations",
        "conversation_with_participants": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConversationWithParticipants"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Services?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Services?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "services"
  }
}
```

---

## Delete a Service resource

```
DELETE https://conversations.twilio.com/v1/Services/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IS> | required | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.services("ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```