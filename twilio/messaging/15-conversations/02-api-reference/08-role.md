# Role Resource

In Twilio Conversations, the Role Resource represents what a User can do within the Service and individual Conversations. Roles are scoped to either a Service or a Conversation.

**Users** are assigned a Role at the Service level. This determines what they can do within the chat Service instance, such as create and destroy Conversations within the Service.

**Participants** are assigned a Role at the Conversation level. This determines what they are able to do within a particular Conversation, such as invite Participants to be members of the Conversation, post Messages, and remove other Participants from the Conversation.

See [Permission Values](#permission-values) for information about the permissions that can be assigned in each scope.

> **Warning: Do not use Personally Identifiable Information (PII) for the friendlyName field**
>
> Avoid using a person's name, home address, email, phone number, or other PII in the friendlyName field. Use some form of pseudonymized identifier, instead.
>
> You can learn more about how we process your data in our privacy policy.

## API Base URL

All URLs in the reference documentation use the following base URL:

```
https://conversations.twilio.com/v1
```

### Using the shortened base URL

Using the REST API, you can interact with Role resources in the default Conversation Service instance via a "shortened" URL that does not include the Conversation Service instance SID ("ISXXX..."). If you are only using one Conversation Service (the default), you do not need to include the Conversation Service SID in your URL, e.g.

```
GET /v1/Roles/
```

For Conversations applications that build on more than one Conversation Service instance, you will need to specify the Conversation Service SID in the REST API call.

```
GET /v1/Services/<Service SID, ISXXX...>/Roles/
```

## Role Properties

Each Role resource contains these properties.

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<RL\> | Optional | Not PII | The unique string that we created to identify the Role resource. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the Role resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `chat_service_sid` | SID\<IS\> | Optional | Not PII | The SID of the Conversation Service the Role resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `friendly_name` | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| `type` | enum\<string\> | Optional | Not PII | The type of role. Can be: `conversation` for Conversation roles or `service` for Conversation Service roles. |
| `permissions` | array[string] | Optional | Not PII | An array of the permissions the role has been granted. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this user role. |

---

## Create a Role resource

```
POST https://conversations.twilio.com/v1/Roles
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | required | PII MTL: 30 days | A descriptive string that you create to describe the new resource. It can be up to 64 characters long. |
| `type` | enum\<string\> | required | Not PII | The type of role. Can be: `conversation` for Conversation roles or `service` for Conversation Service roles. |
| `permission` | array[string] | required | Not PII | A permission that you grant to the new role. Only one permission can be granted per parameter. To assign more than one permission, repeat this parameter for each permission value. The values for this parameter depend on the role's type. |

### Example: Create a Role

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

role = client.conversations.v1.roles.create(
    permission=["addParticipant"],
    type="conversation",
    friendly_name="FriendlyName",
)

print(role.sid)
```

### Response

```json
{
  "sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "type": "conversation",
  "permissions": [
    "sendMessage",
    "leaveConversation",
    "editOwnMessage",
    "deleteOwnMessage"
  ],
  "date_created": "2016-03-03T19:47:15Z",
  "date_updated": "2016-03-03T19:47:15Z",
  "url": "https://conversations.twilio.com/v1/Roles/RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch a Role resource

```
GET https://conversations.twilio.com/v1/Roles/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<RL\> | required | Not PII | The SID of the Role resource to fetch. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Fetch a Role

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

role = client.conversations.v1.roles(
    "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(role.sid)
```

### Response

```json
{
  "sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Conversation Role",
  "type": "conversation",
  "permissions": [
    "sendMessage",
    "leaveConversation",
    "editOwnMessage",
    "deleteOwnMessage"
  ],
  "date_created": "2016-03-03T19:47:15Z",
  "date_updated": "2016-03-03T19:47:15Z",
  "url": "https://conversations.twilio.com/v1/Roles/RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple Role resources

```
GET https://conversations.twilio.com/v1/Roles
```

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Min: 1, Max: 50 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List multiple Roles

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

roles = client.conversations.v1.roles.list(limit=20)

for record in roles:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Roles?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Roles?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "roles"
  },
  "roles": [
    {
      "sid": "RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Conversation Role",
      "type": "conversation",
      "permissions": [
        "sendMessage",
        "leaveConversation",
        "editOwnMessage",
        "deleteOwnMessage"
      ],
      "date_created": "2016-03-03T19:47:15Z",
      "date_updated": "2016-03-03T19:47:15Z",
      "url": "https://conversations.twilio.com/v1/Roles/RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

---

## Update a Role resource

```
POST https://conversations.twilio.com/v1/Roles/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<RL\> | required | Not PII | The SID of the Role resource to update. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `permission` | array[string] | required | Not PII | A permission that you grant to the role. Only one permission can be granted per parameter. To assign more than one permission, repeat this parameter for each permission value. Note that the update action replaces all previously assigned permissions with those defined in the update action. To remove a permission, do not include it in the subsequent update action. The values for this parameter depend on the role's type. |

### Example: Update a Conversation Role

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

role = client.conversations.v1.roles("New_Chat_Service_SID").update(
    permission=["Permission"]
)

print(role.sid)
```

### Response

```json
{
  "sid": "New_Chat_Service_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Conversation Role",
  "type": "conversation",
  "permissions": [
    "sendMessage",
    "leaveConversation",
    "editOwnMessage",
    "deleteOwnMessage"
  ],
  "date_created": "2016-03-03T19:47:15Z",
  "date_updated": "2016-03-03T19:47:15Z",
  "url": "https://conversations.twilio.com/v1/Roles/RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete a Role resource

```
DELETE https://conversations.twilio.com/v1/Roles/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<RL\> | required | Not PII | The SID of the Role resource to delete. Pattern: `^RL[0-9a-fA-F]{32}$` Min/Max length: 34 |

### Example: Delete a Role

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.roles("RLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

---

## Permission Values

### Service-scope permissions

These are the available permissions entries for roles where `type = service`.

| Permission | Enables User to: |
|------------|------------------|
| `addParticipant` | Add other users as Participants of a Conversation |
| `createConversation` | Create new Conversations |
| `deleteAnyMessage` | Delete any Message in the Service |
| `deleteConversation` | Delete Conversations |
| `editAnyMessage` | Edit any Message in the Service |
| `editAnyMessageAttributes` | Edit any Message attributes in the Service |
| `editAnyUserInfo` | Edit other User's User Info properties |
| `editConversationAttributes` | Update the optional attributes metadata field on a Conversation |
| `editConversationName` | Change the name of a Conversation |
| `editOwnMessage` | Edit their own Messages in the Service |
| `editOwnMessageAttributes` | Edit the own Message attributes in the Service |
| `editOwnUserInfo` | Edit their own User Info properties |
| `joinConversation` | Join Conversations |
| `removeParticipant` | Remove Participants from a Conversation |

### Conversation-scope permissions

These are the available permissions entries for roles where `type = conversation`.

| Permission | Enables User to: |
|------------|------------------|
| `addParticipant` | Add other users as Participants of a Conversation |
| `deleteAnyMessage` | Delete any Message in the Service |
| `deleteOwnMessage` | Delete their own Messages in the Service |
| `deleteConversation` | Delete Conversations |
| `editAnyMessage` | Edit any Message in the Service |
| `editAnyMessageAttributes` | Edit any Message attributes in the Service |
| `editAnyUserInfo` | Edit other User's User Info properties |
| `editConversationAttributes` | Update the optional attributes metadata field on a Conversation |
| `editConversationName` | Change the name of a Conversation |
| `editOwnMessage` | Edit their own Messages in the Service |
| `editOwnMessageAttributes` | Edit the own Message attributes in the Service |
| `editOwnUserInfo` | Edit their own User Info properties |
| `leaveConversation` | Leave a Conversation |
| `removeParticipant` | Remove Participants from a Conversation |
| `sendMediaMessage` | Send media Messages to Conversations |
| `sendMessage` | Send Messages to Conversations |