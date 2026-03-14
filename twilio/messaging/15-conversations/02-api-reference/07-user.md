# Conversations User Resource

In Conversations, Users are Participants with privileges such as the ability to edit and delete Messages.

Every Conversation Participant who connects with a Chat SDK (browser or mobile) is backed by a User. Participants over SMS or other non-chat channel, in contrast, do not have a corresponding User. Attached to the User is:

- The **Role** assigned to the User, which determines their permissions in your application
- A JSON blob of arbitrary **Attributes**, which you can use to store profile information for display in your application
- **Online/Offline status**, determined by whether the User is presently connected through a frontend SDK
- The **Identity** string, which uniquely identifies a user in each Conversation Service

> We recommend following the standard URI specification and avoid the following reserved characters `! * ' ( ) ; : @ & = + $ , / ? % # [ ]` for values such as identity and friendly name.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can interact with User resources in the default Conversation Service instance via a "shortened" URL that does not include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you do not need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Users/
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call:

```
GET /v1/Services/<Service SID, ISXXX...>/Users/
```

## User Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<US\> | Optional | Not PII | The unique string that we created to identify the User resource. Pattern: `^US[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the User resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `chat_service_sid` | SID\<IS\> | Optional | Not PII | The SID of the Conversation Service the User resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a service-level Role assigned to the user. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `identity` | string | Optional | PII MTL: 30 days | The application-defined string that uniquely identifies the resource's User within the Conversation Service. This value is often a username or an email address, and is case-sensitive. |
| `friendly_name` | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| `attributes` | string | Optional | PII MTL: 30 days | The JSON Object string that stores application-specific data. If attributes have not been set, {} is returned. |
| `is_online` | boolean | Optional | Not PII | Whether the User is actively connected to this Conversations Service and online. This value is only returned by Fetch actions that return a single resource and null is always returned by a Read action. This value is null if the Service's reachability_enabled is false, if the User has never been online for this Conversations Service, even if the Service's reachability_enabled is true. |
| `is_notifiable` | boolean | Optional | Not PII | Whether the User has a potentially valid Push Notification registration (APN or GCM) for this Conversations Service. If at least one registration exists, true; otherwise false. This value is only returned by Fetch actions that return a single resource and null is always returned by a Read action. This value is null if the Service's reachability_enabled is false, and if the User has never had a notification registration, even if the Service's reachability_enabled is true. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this user. |
| `links` | object\<uri-map\> | Optional | Not PII | |

---

## Create a Conversations User

```
POST https://conversations.twilio.com/v1/Users
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `identity` | string | required | PII MTL: 30 days | The application-defined string that uniquely identifies the resource's User within the Conversation Service. This value is often a username or an email address, and is case-sensitive. |
| `friendly_name` | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| `attributes` | string | Optional | PII MTL: 30 days | The JSON Object string that stores application-specific data. If attributes have not been set, {} is returned. |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a service-level Role to assign to the user. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Create a User

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user = client.conversations.v1.users.create(identity="RedgrenGrumbholdt")

print(user.sid)
```

### Response

```json
{
  "sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "RedgrenGrumbholdt",
  "friendly_name": "name",
  "attributes": "{ \"duty\": \"tech\" }",
  "is_online": true,
  "is_notifiable": null,
  "date_created": "2019-12-16T22:18:37Z",
  "date_updated": "2019-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "user_conversations": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations"
  }
}
```

---

## Fetch a specific User Resource

```
GET https://conversations.twilio.com/v1/Users/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the User resource to fetch. This value can be either the sid or the identity of the User resource to fetch. |

### Example: Fetch a User

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user = client.conversations.v1.users("Sid").fetch()

print(user.sid)
```

### Response

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "admin",
  "friendly_name": "name",
  "attributes": "{ \"duty\": \"tech\" }",
  "is_online": true,
  "is_notifiable": null,
  "date_created": "2019-12-16T22:18:37Z",
  "date_updated": "2019-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "user_conversations": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations"
  }
}
```

---

## Read multiple ConversationUser resources

```
GET https://conversations.twilio.com/v1/Users
```

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Min: 1, Max: 50 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List multiple Users

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

users = client.conversations.v1.users.list(limit=20)

for record in users:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Users?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Users?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "users"
  },
  "users": [
    {
      "sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "admin",
      "friendly_name": "name",
      "attributes": "{ \"duty\": \"tech\" }",
      "is_online": true,
      "is_notifiable": null,
      "date_created": "2019-12-16T22:18:37Z",
      "date_updated": "2019-12-16T22:18:38Z",
      "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "user_conversations": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations"
      }
    },
    {
      "sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "role_sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "identity": "agent0034",
      "friendly_name": "John from customs",
      "attributes": "{ \"duty\": \"agent\" }",
      "is_online": false,
      "is_notifiable": null,
      "date_created": "2020-03-24T20:38:21Z",
      "date_updated": "2020-03-24T20:38:21Z",
      "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "user_conversations": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations"
      }
    }
  ]
}
```

---

## Update a ConversationUser resource

```
POST https://conversations.twilio.com/v1/Users/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the User resource to update. This value can be either the sid or the identity of the User resource to update. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| `attributes` | string | Optional | PII MTL: 30 days | The JSON Object string that stores application-specific data. If attributes have not been set, {} is returned. |
| `role_sid` | SID\<RL\> | Optional | Not PII | The SID of a service-level Role to assign to the user. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Update a User

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

user = client.conversations.v1.users("Sid").update(
    friendly_name="new name", role_sid="RLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(user.sid)
```

### Response

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "role_sid": "RLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "identity": "admin",
  "friendly_name": "new name",
  "attributes": "{ \"duty\": \"tech\", \"team\": \"internals\" }",
  "is_online": true,
  "is_notifiable": null,
  "date_created": "2019-12-16T22:18:37Z",
  "date_updated": "2019-12-16T22:18:38Z",
  "url": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "user_conversations": "https://conversations.twilio.com/v1/Users/USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conversations"
  }
}
```

---

## Delete a User resource

```
DELETE https://conversations.twilio.com/v1/Users/{Sid}
```

### Headers

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_webhook_enabled` | enum\<string\> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the User resource to delete. This value can be either the sid or the identity of the User resource to delete. |

### Example: Delete a User

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.users("Sid").delete()
```