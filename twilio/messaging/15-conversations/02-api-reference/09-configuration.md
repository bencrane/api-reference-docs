# Configuration Resource

The Twilio Conversations' Configuration resource represents settings applied at the account level, across all Conversation Services.

## Configuration Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account responsible for this configuration. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `default_chat_service_sid` | SID\<IS\> | Optional | Not PII | The SID of the default Conversation Service used when creating a conversation. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `default_messaging_service_sid` | SID\<MG\> | Optional | Not PII | The SID of the default Messaging Service used when creating a conversation. Pattern: `^MG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `default_inactive_timer` | string | Optional | Not PII | Default ISO8601 duration when conversation will be switched to inactive state. Minimum value for this timer is 1 minute. |
| `default_closed_timer` | string | Optional | Not PII | Default ISO8601 duration when conversation will be switched to closed state. Minimum value for this timer is 10 minutes. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this global configuration. |
| `links` | object\<uri-map\> | Optional | Not PII | Contains absolute API resource URLs to access the webhook and default service configurations. |

---

## Fetch a Configuration resource

```
GET https://conversations.twilio.com/v1/Configuration
```

### Example: Fetch a Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration = client.conversations.v1.configuration().fetch()

print(configuration.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_inactive_timer": "PT1M",
  "default_closed_timer": "PT10M",
  "url": "https://conversations.twilio.com/v1/Configuration",
  "links": {
    "service": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
    "webhooks": "https://conversations.twilio.com/v1/Configuration/Webhooks"
  }
}
```

---

## Update a Configuration resource

```
POST https://conversations.twilio.com/v1/Configuration
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `default_chat_service_sid` | SID\<IS\> | Optional | Not PII | The SID of the default Conversation Service to use when creating a conversation. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `default_messaging_service_sid` | SID\<MG\> | Optional | Not PII | The SID of the default Messaging Service to use when creating a conversation. Pattern: `^MG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `default_inactive_timer` | string | Optional | Not PII | Default ISO8601 duration when conversation will be switched to inactive state. Minimum value for this timer is 1 minute. |
| `default_closed_timer` | string | Optional | Not PII | Default ISO8601 duration when conversation will be switched to closed state. Minimum value for this timer is 10 minutes. |

### Example: Update a Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration = client.conversations.v1.configuration().update(
    default_chat_service_sid="ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(configuration.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_chat_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "default_inactive_timer": "PT1M",
  "default_closed_timer": "PT10M",
  "url": "https://conversations.twilio.com/v1/Configuration",
  "links": {
    "service": "https://conversations.twilio.com/v1/Services/ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Configuration",
    "webhooks": "https://conversations.twilio.com/v1/Configuration/Webhooks"
  }
}
```