# ChannelSenders subresource

> **Public Beta:** The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the Twilio Console is Generally Available.
>
> Public Beta products are not covered by a Twilio SLA.
>
> The resources for sending Messages with a Messaging Service are Generally Available.

ChannelSenders is subresource of Services and represents a channel sender that is associated with a Messaging Service, such as WhatsApp.

When sending a message with your Messaging Service to a channel destination, Twilio will select a channel sender of that corresponding channel from the service for delivery.

See Twilio Channels: A New Way Reach Customers in Apps They Already Use for more information on Twilio Channels.

## ChannelSender Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the ChannelSender resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `messaging_service_sid` | SID\<MG\> | Optional | Not PII | The SID of the Service the resource is associated with. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<XE\> | Optional | Not PII | The unique string that we created to identify the ChannelSender resource. Pattern: `^XE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sender` | string | Optional | Not PII | The unique string that identifies the sender e.g whatsapp:+123456XXXX. |
| `sender_type` | string | Optional | Not PII | A string value that identifies the sender type e.g WhatsApp, Messenger. |
| `country_code` | string | Optional | Not PII | The 2-character ISO Country Code of the number. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the ChannelSender resource. |

---

## Create a ChannelSender

```
POST https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/ChannelSenders
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to create the resource under. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<XE\> | required | Not PII | The SID of the Channel Sender being added to the Service. Pattern: `^XE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a ChannelSender for a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

channel_sender = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).channel_senders.create(sid="XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(channel_sender.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sender": "whatsapp:+12487960483",
  "sender_type": "WhatsApp",
  "country_code": "US",
  "date_created": "2023-07-30T20:12:31Z",
  "date_updated": "2023-07-30T20:12:33Z",
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a ChannelSender

```
GET https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/ChannelSenders/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the ChannelSender resource to fetch. |

### Retrieve a ChannelSender from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

channel_sender = (
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channel_senders("XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(channel_sender.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sender": "whatsapp:+12487960483",
  "sender_type": "WhatsApp",
  "country_code": "US",
  "date_created": "2023-07-30T20:12:31Z",
  "date_updated": "2023-07-30T20:12:33Z",
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of ChannelSenders

```
GET https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/ChannelSenders
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to read the resources from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve a list of ChannelSenders from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

channel_senders = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).channel_senders.list(limit=20)

for record in channel_senders:
    print(record.account_sid)
```

**Response:**

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "senders",
    "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders?PageSize=20&Page=0"
  },
  "senders": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sender": "whatsapp:+12487960483",
      "sender_type": "WhatsApp",
      "country_code": "US",
      "date_created": "2023-07-30T20:12:31Z",
      "date_updated": "2023-07-30T20:12:33Z",
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "sender": "messenger:104794531907950",
      "sender_type": "Messenger",
      "country_code": "US",
      "date_created": "2023-07-30T20:12:31Z",
      "date_updated": "2023-07-30T20:12:33Z",
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
    },
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac",
      "sender": "rcs:ms_dev_ttatqler_agent",
      "sender_type": "RCS",
      "country_code": "US",
      "date_created": "2023-07-30T20:12:31Z",
      "date_updated": "2023-07-30T20:12:33Z",
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders/XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaac"
    }
  ]
}
```

---

## Delete a ChannelSender

```
DELETE https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/ChannelSenders/{Sid}
```

Returns "204 NO CONTENT" if the channel sender was successfully removed from the Service.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to delete the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the Channel Sender resource to delete. |

### Remove a ChannelSender from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).channel_senders("XEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```