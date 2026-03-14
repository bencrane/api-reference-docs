# Address Configuration Resource

The Address Configuration resource manages the configurations related to a unique address within the Conversations product, allowing you to specify which addresses should auto-create a Conversation upon receiving an inbound message.

The unique address must be a single address (i.e. a WhatsApp or SMS phone number) that belongs to your Twilio Account.

The configuration can optionally include automatically attaching a Conversation-scoped Webhook to the auto-created conversations.

## AddressConfiguration Properties

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<IG\> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^IG[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique ID of the Account the address belongs to. Pattern: `^AC[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `type` | string | Optional | Not PII | Type of Address, value can be `whatsapp` or `sms`. |
| `address` | string | Optional | PII MTL: 30 days | The unique address to be configured. The address can be a whatsapp address or phone number. |
| `friendly_name` | string | Optional | Not PII | The human-readable name of this configuration, limited to 256 characters. Optional. |
| `auto_creation` | object | Optional | Not PII | Auto Creation configuration for the address. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date that this resource was created. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date that this resource was last updated. |
| `url` | string\<uri\> | Optional | Not PII | An absolute API resource URL for this address configuration. |
| `address_country` | string | Optional | Not PII | An ISO 3166-1 alpha-2n country code which the address belongs to. This is currently only applicable to short code addresses. |

---

## Create an AddressConfiguration resource

```
POST https://conversations.twilio.com/v1/Configuration/Addresses
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `type` | enum\<string\> | required | Not PII | Type of Address, value can be `whatsapp` or `sms`. Possible values: `sms`, `whatsapp`, `messenger`, `gbm`, `email`, `rcs`, `apple`, `chat` |
| `address` | string | required | PII MTL: 30 days | The unique address to be configured. The address can be a whatsapp address or phone number. |
| `friendly_name` | string | Optional | Not PII | The human-readable name of this configuration, limited to 256 characters. Optional. |
| `auto_creation_enabled` | boolean | Optional | Not PII | Enable/Disable auto-creating conversations for messages to this address. |
| `auto_creation_type` | enum\<string\> | Optional | Not PII | Possible values: `webhook`, `studio`, `default` |
| `auto_creation_conversation_service_sid` | SID\<IS\> | Optional | Not PII | Conversation Service for the auto-created conversation. If not set, the conversation is created in the default service. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `auto_creation_webhook_url` | string | Optional | Not PII | For type webhook, the url for the webhook request. |
| `auto_creation_webhook_method` | enum\<string\> | Optional | Not PII | Possible values: `get`, `post` |
| `auto_creation_webhook_filters` | array[string] | Optional | Not PII | The list of events, firing webhook event for this Conversation. Values can be any of the following: `onMessageAdded`, `onMessageUpdated`, `onMessageRemoved`, `onConversationUpdated`, `onConversationStateUpdated`, `onConversationRemoved`, `onParticipantAdded`, `onParticipantUpdated`, `onParticipantRemoved`, `onDeliveryUpdated` |
| `auto_creation_studio_flow_sid` | SID\<FW\> | Optional | Not PII | For type studio, the studio flow SID where the webhook should be sent to. Pattern: `^FW[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `auto_creation_studio_retry_count` | integer | Optional | Not PII | For type studio, number of times to retry the webhook request. |
| `address_country` | string | Optional | Not PII | An ISO 3166-1 alpha-2n country code which the address belongs to. This is currently only applicable to short code addresses. |

### Example: Create Address Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

address_configuration = client.conversations.v1.address_configurations.create(
    type="sms",
    address="+37256123457",
    friendly_name="My Test Configuration",
    auto_creation_enabled=True,
    auto_creation_type="webhook",
    auto_creation_conversation_service_sid="ISXXXXXXXXXXXXXXXXXXXXXX",
    auto_creation_webhook_url="https://example.com",
    auto_creation_webhook_method="get",
    auto_creation_webhook_filters=["onParticipantAdded", "onMessageAdded"],
)

print(address_configuration.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address": "+37256123457",
  "type": "sms",
  "friendly_name": "My Test Configuration",
  "address_country": "CA",
  "auto_creation": {
    "enabled": true,
    "type": "webhook",
    "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "webhook_url": "https://example.com",
    "webhook_method": "POST",
    "webhook_filters": [
      "onParticipantAdded",
      "onMessageAdded"
    ]
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch an AddressConfiguration resource

```
GET https://conversations.twilio.com/v1/Configuration/Addresses/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the Address Configuration resource. This value can be either the sid or the address of the configuration. |

### Example: Fetch Address Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

address_configuration = client.conversations.v1.address_configurations(
    "IGXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(address_configuration.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "IGXXXXXXXXXXXXXXXXXXXXXXXX",
  "address": "+37256123457",
  "type": "sms",
  "friendly_name": "My Test Configuration",
  "address_country": "CA",
  "auto_creation": {
    "enabled": true,
    "type": "webhook",
    "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "webhook_url": "https://example.com",
    "webhook_method": "POST",
    "webhook_filters": [
      "onParticipantAdded",
      "onMessageAdded"
    ]
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple AddressConfiguration resources

```
GET https://conversations.twilio.com/v1/Configuration/Addresses
```

### Query parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `type` | string | Optional | Not PII | Filter the address configurations by its type. This value can be one of: `whatsapp`, `sms`. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 50. Min: 1, Max: 50 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List Address Configurations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

address_configurations = client.conversations.v1.address_configurations.list(
    limit=20
)

for record in address_configurations:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://conversations.twilio.com/v1/Configuration/Addresses?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://conversations.twilio.com/v1/Configuration/Addresses?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "address_configurations"
  },
  "address_configurations": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "address": "+37256123457",
      "type": "sms",
      "friendly_name": "My Test Configuration",
      "address_country": "CA",
      "auto_creation": {
        "enabled": true,
        "type": "webhook",
        "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "webhook_url": "https://example.com",
        "webhook_method": "POST",
        "webhook_filters": [
          "onParticipantAdded",
          "onMessageAdded"
        ]
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "address": "+37256123458",
      "type": "sms",
      "friendly_name": "Studio Test Configuration",
      "address_country": "US",
      "auto_creation": {
        "enabled": false,
        "type": "studio",
        "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "studio_flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "studio_retry_count": 3
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac",
      "address": "+37256123459",
      "type": "sms",
      "friendly_name": "Default Test Configuration",
      "address_country": "NG",
      "auto_creation": {
        "enabled": true,
        "type": "default"
      },
      "date_created": "2016-03-24T21:05:50Z",
      "date_updated": "2016-03-24T21:05:50Z",
      "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac"
    }
  ]
}
```

---

## Update an AddressConfiguration resource

```
POST https://conversations.twilio.com/v1/Configuration/Addresses/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the Address Configuration resource. This value can be either the sid or the address of the configuration. |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | Not PII | The human-readable name of this configuration, limited to 256 characters. Optional. |
| `auto_creation_enabled` | boolean | Optional | Not PII | Enable/Disable auto-creating conversations for messages to this address. |
| `auto_creation_type` | enum\<string\> | Optional | Not PII | Possible values: `webhook`, `studio`, `default` |
| `auto_creation_conversation_service_sid` | SID\<IS\> | Optional | Not PII | Conversation Service for the auto-created conversation. If not set, the conversation is created in the default service. Pattern: `^IS[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `auto_creation_webhook_url` | string | Optional | Not PII | For type webhook, the url for the webhook request. |
| `auto_creation_webhook_method` | enum\<string\> | Optional | Not PII | Possible values: `get`, `post` |
| `auto_creation_webhook_filters` | array[string] | Optional | Not PII | The list of events, firing webhook event for this Conversation. Values can be any of the following: `onMessageAdded`, `onMessageUpdated`, `onMessageRemoved`, `onConversationUpdated`, `onConversationStateUpdated`, `onConversationRemoved`, `onParticipantAdded`, `onParticipantUpdated`, `onParticipantRemoved`, `onDeliveryUpdated` |
| `auto_creation_studio_flow_sid` | SID\<FW\> | Optional | Not PII | For type studio, the studio flow SID where the webhook should be sent to. Pattern: `^FW[0-9a-fA-F]{32}$` Min/Max length: 34 |
| `auto_creation_studio_retry_count` | integer | Optional | Not PII | For type studio, number of times to retry the webhook request. |

### Example: Update Address Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

configuration_address = client.conversations.v1.address_configurations(
    "IGXXXXXXXXXXXXXXXXXXXXXXX"
).update(
    friendly_name="My Test Configuration Updated",
    auto_creation_enabled=False,
    auto_creation_type="studio",
    auto_creation_studio_flow_sid="FWXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    auto_creation_studio_retry_count=3,
)

print(configuration_address.sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "IGXXXXXXXXXXXXXXXXXXXXXXX",
  "address": "+37256123457",
  "type": "sms",
  "friendly_name": "My Test Configuration Updated",
  "address_country": "CA",
  "auto_creation": {
    "enabled": false,
    "type": "studio",
    "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "studio_flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "studio_retry_count": 3
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:51Z",
  "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete an AddressConfiguration resource

```
DELETE https://conversations.twilio.com/v1/Configuration/Addresses/{Sid}
```

### Path parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The SID of the Address Configuration resource. This value can be either the sid or the address of the configuration. |

### Example: Delete Address Configuration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.conversations.v1.address_configurations("IGXXXXXXXXXXXXXXXXXXX").delete()
```