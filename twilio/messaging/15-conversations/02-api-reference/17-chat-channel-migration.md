# Chat Channel Migration

A Channel is a Programmable Chat object that is equivalent to a Conversation in the Conversations API.

Please see the Conversation Resource for Conversations that are already available to your Conversations application.

Only 'private' type Channels are automatically migrated to Conversations. For 'public' type Channels, please use this API to migrate them to 'private' type.

## API Base URL

```
https://chat.twilio.com/v3
```

There is only one API endpoint on the v3 Chat API:

```
POST /Services/ISxx/Channels/CHxx
```

## Channel Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<CH> | Optional | Not PII | The unique string that we created to identify the Channel resource. Pattern: `^CH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Channel resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| service_sid | SID<IS> | Optional | Not PII | The SID of the Service the Channel resource is associated with. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| unique_name | string | Optional | PII MTL: 30 days | An application-defined string that uniquely identifies the resource. It can be used to address the resource in place of the resource's sid in the URL. |
| attributes | string | Optional | PII MTL: 30 days | The JSON string that stores application-specific data. If attributes have not been set, {} is returned. |
| type | enum<string> | Optional | Not PII | The visibility of the channel. Can be: `public` or `private`. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| created_by | string | Optional | PII MTL: 30 days | The identity of the User that created the channel. If the Channel was created by using the API, the value is `system`. |
| members_count | integer | Optional | Not PII | The number of Members in the Channel. Default: 0 |
| messages_count | integer | Optional | Not PII | The number of Messages that have been passed in the Channel. Default: 0 |
| messaging_service_sid | SID<MG> | Optional | Not PII | The unique ID of the Messaging Service this channel belongs to. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| url | string<uri> | Optional | Not PII | The absolute URL of the Channel resource. |

---

## Update Channel Type

```
POST https://chat.twilio.com/v3/Services/{ServiceSid}/Channels/{Sid}
```

Use this API to change a Channel's type from public to private. This makes it available in Conversations.

> ℹ️ **Info:** Read the documentation to determine if you need to include a Messaging Service SID in your request.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| x_twilio_webhook_enabled | enum<string> | Optional | Not PII | The X-Twilio-Webhook-Enabled HTTP request header. Possible values: `true`, `false` |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| service_sid | SID<IS> | required | Not PII | The unique SID identifier of the Service. Pattern: `^IS[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | string | required | Not PII | A 34 character string that uniquely identifies this Channel. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| type | enum<string> | Optional | Not PII | The visibility of the channel. Can be: `public` or `private`. |
| messaging_service_sid | SID<MG> | Optional | Not PII | The unique ID of the Messaging Service this channel belongs to. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Migrate public Channel to Conversations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

channel = client.chat.v3.channels(
    "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid"
).update(
    type="private", messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(channel.sid)
```

### Response

```json
{
  "sid": "Sid",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "unique_name": "unique_name",
  "attributes": "{ \"foo\": \"bar\" }",
  "type": "private",
  "date_created": "2015-12-16T22:18:37Z",
  "date_updated": "2015-12-16T22:18:38Z",
  "created_by": "username",
  "members_count": 0,
  "messages_count": 0,
  "url": "https://chat.twilio.com/v3/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```