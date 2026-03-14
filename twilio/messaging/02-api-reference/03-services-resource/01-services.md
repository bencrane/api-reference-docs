# Services resource

> **Public Beta:** The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the Twilio Console is Generally Available.
>
> Public Beta products are not covered by a Twilio SLA.
>
> The resources for sending Messages with a Messaging Service are Generally Available.

When sending a message with a Messaging Service, you can improve message performance by enabling the included features.

Developers can associate phone numbers, short codes, and alpha sender IDs to an instance of a Messaging Service. The Service handles all inbound and outbound behaviors for the phone numbers and shortcodes.

**Twilio Console:** You can manage your Messaging Services through the Twilio Console when logged in.

## Messaging Services Resource

The Services resource represents a set of configurable behavior for sending and receiving Messages.

### Subresources

The Services resource also has PhoneNumbers, ShortCodes, and AlphaSenders subresources for managing the phone numbers, short codes, and alpha sender IDs associated with the Service.

- PhoneNumbers
- ShortCodes
- AlphaSenders

### Resource URI

All URLs in this documentation use the following base URL:

```
https://messaging.twilio.com/v1
```

## Service Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<MG\> | Optional | Not PII | The unique string that we created to identify the Service resource. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the Service resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `friendly_name` | string | Optional | Not PII | The string that you assigned to describe the resource. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `inbound_request_url` | string\<uri\> | Optional | Not PII | The URL we call using inbound_method when a message is received by any phone number or short code in the Service. When this property is null, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the inbound_request_url defined for the Messaging Service. |
| `inbound_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we use to call inbound_request_url. Can be GET or POST. Possible values: `GET`, `POST` |
| `fallback_url` | string\<uri\> | Optional | Not PII | The URL that we call using fallback_method if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the fallback_url defined for the Messaging Service. |
| `fallback_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we use to call fallback_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `status_callback` | string\<uri\> | Optional | Not PII | The URL we call to pass status updates about message delivery. |
| `sticky_sender` | boolean | Optional | Not PII | Whether to enable Sticky Sender on the Service instance. |
| `mms_converter` | boolean | Optional | Not PII | Whether to enable the MMS Converter for messages sent through the Service instance. |
| `smart_encoding` | boolean | Optional | Not PII | Whether to enable Smart Encoding for messages sent through the Service instance. |
| `scan_message_content` | enum\<string\> | Optional | Not PII | Reserved. Possible values: `inherit`, `enable`, `disable` |
| `fallback_to_long_code` | boolean | Optional | Not PII | [OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures. |
| `area_code_geomatch` | boolean | Optional | Not PII | Whether to enable Area Code Geomatch on the Service Instance. |
| `synchronous_validation` | boolean | Optional | Not PII | Reserved. |
| `validity_period` | integer | Optional | Not PII | How long, in seconds, messages sent from the Service are valid. Can be an integer from 1 to 36,000. Default value is 36,000. Default: 0 |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the Service resource. |
| `links` | object\<uri-map\> | Optional | Not PII | The absolute URLs of related resources. |
| `usecase` | string | Optional | Not PII | A string that describes the scenario in which the Messaging Service will be used. Possible values are notifications, marketing, verification, discussion, poll, undeclared. |
| `us_app_to_person_registered` | boolean | Optional | Not PII | Whether US A2P campaign is registered for this Service. |
| `use_inbound_webhook_on_number` | boolean | Optional | Not PII | A boolean value that indicates either the webhook url configured on the phone number will be used or inbound_request_url/fallback_url url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the inbound_request_url/fallback_url defined for the Messaging Service. |

---

## Create a Service

```
POST https://messaging.twilio.com/v1/Services
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | required | Not PII | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| `inbound_request_url` | string\<uri\> | Optional | Not PII | The URL we call using inbound_method when a message is received by any phone number or short code in the Service. When this property is null, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the inbound_request_url defined for the Messaging Service. |
| `inbound_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we should use to call inbound_request_url. Can be GET or POST and the default is POST. Possible values: `GET`, `POST` |
| `fallback_url` | string\<uri\> | Optional | Not PII | The URL that we call using fallback_method if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the fallback_url defined for the Messaging Service. |
| `fallback_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we should use to call fallback_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `status_callback` | string\<uri\> | Optional | Not PII | The URL we should call to pass status updates about message delivery. |
| `sticky_sender` | boolean | Optional | Not PII | Whether to enable Sticky Sender on the Service instance. |
| `mms_converter` | boolean | Optional | Not PII | Whether to enable the MMS Converter for messages sent through the Service instance. |
| `smart_encoding` | boolean | Optional | Not PII | Whether to enable Smart Encoding for messages sent through the Service instance. |
| `scan_message_content` | enum\<string\> | Optional | Not PII | Reserved. Possible values: `inherit`, `enable`, `disable` |
| `fallback_to_long_code` | boolean | Optional | Not PII | [OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures. |
| `area_code_geomatch` | boolean | Optional | Not PII | Whether to enable Area Code Geomatch on the Service Instance. |
| `validity_period` | integer | Optional | Not PII | How long, in seconds, messages sent from the Service are valid. Can be an integer from 1 to 36,000. Default value is 36,000. |
| `synchronous_validation` | boolean | Optional | Not PII | Reserved. |
| `usecase` | string | Optional | Not PII | A string that describes the scenario in which the Messaging Service will be used. Possible values are notifications, marketing, verification, discussion, poll, undeclared. |
| `use_inbound_webhook_on_number` | boolean | Optional | Not PII | A boolean value that indicates either the webhook url configured on the phone number will be used or inbound_request_url/fallback_url url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the inbound_request_url/fallback_url defined for the Messaging Service. |

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

service = client.messaging.v1.services.create(friendly_name="FriendlyName")

print(service.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "FriendlyName",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": "https://www.example.com",
  "fallback_method": "GET",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "smart_encoding": false,
  "mms_converter": true,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "area_code_geomatch": true,
  "validity_period": 600,
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a Service

```
GET https://messaging.twilio.com/v1/Services/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<MG\> | required | Not PII | The SID of the Service resource to fetch. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

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

service = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(service.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "My Service!",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": null,
  "fallback_method": "POST",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "mms_converter": true,
  "smart_encoding": false,
  "fallback_to_long_code": true,
  "area_code_geomatch": true,
  "validity_period": 600,
  "scan_message_content": "inherit",
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of Services

```
GET https://messaging.twilio.com/v1/Services
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

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

services = client.messaging.v1.services.list(limit=20)

for record in services:
    print(record.sid)
```

**Response:**

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "services",
    "url": "https://messaging.twilio.com/v1/Services?PageSize=20&Page=0"
  },
  "services": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "My Service!",
      "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:12:31Z",
      "date_updated": "2015-07-30T20:12:33Z",
      "sticky_sender": true,
      "mms_converter": true,
      "smart_encoding": false,
      "fallback_to_long_code": true,
      "area_code_geomatch": true,
      "validity_period": 600,
      "scan_message_content": "inherit",
      "synchronous_validation": true,
      "inbound_request_url": "https://www.example.com/",
      "inbound_method": "POST",
      "fallback_url": null,
      "fallback_method": "POST",
      "status_callback": "https://www.example.com",
      "usecase": "marketing",
      "us_app_to_person_registered": false,
      "use_inbound_webhook_on_number": false,
      "links": {
        "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
        "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
        "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
        "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
        "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
        "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
        "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
        "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
      },
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

---

## Update a Service

```
POST https://messaging.twilio.com/v1/Services/{Sid}
```

You may specify one or more of the optional parameters above to update the Service's respective properties. Parameters not specified in your request are not updated.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<MG\> | required | Not PII | The SID of the Service resource to update. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | Not PII | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| `inbound_request_url` | string\<uri\> | Optional | Not PII | The URL we call using inbound_method when a message is received by any phone number or short code in the Service. When this property is null, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the inbound_request_url defined for the Messaging Service. |
| `inbound_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we should use to call inbound_request_url. Can be GET or POST and the default is POST. Possible values: `GET`, `POST` |
| `fallback_url` | string\<uri\> | Optional | Not PII | The URL that we call using fallback_method if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the use_inbound_webhook_on_number field is enabled then the webhook url defined on the phone number will override the fallback_url defined for the Messaging Service. |
| `fallback_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we should use to call fallback_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `status_callback` | string\<uri\> | Optional | Not PII | The URL we should call to pass status updates about message delivery. |
| `sticky_sender` | boolean | Optional | Not PII | Whether to enable Sticky Sender on the Service instance. |
| `mms_converter` | boolean | Optional | Not PII | Whether to enable the MMS Converter for messages sent through the Service instance. |
| `smart_encoding` | boolean | Optional | Not PII | Whether to enable Smart Encoding for messages sent through the Service instance. |
| `scan_message_content` | enum\<string\> | Optional | Not PII | Reserved. Possible values: `inherit`, `enable`, `disable` |
| `fallback_to_long_code` | boolean | Optional | Not PII | [OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures. |
| `area_code_geomatch` | boolean | Optional | Not PII | Whether to enable Area Code Geomatch on the Service Instance. |
| `validity_period` | integer | Optional | Not PII | How long, in seconds, messages sent from the Service are valid. Can be an integer from 1 to 36,000. Default value is 36,000. |
| `synchronous_validation` | boolean | Optional | Not PII | Reserved. |
| `usecase` | string | Optional | Not PII | A string that describes the scenario in which the Messaging Service will be used. Possible values are notifications, marketing, verification, discussion, poll, undeclared. |
| `use_inbound_webhook_on_number` | boolean | Optional | Not PII | A boolean value that indicates either the webhook url configured on the phone number will be used or inbound_request_url/fallback_url url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the inbound_request_url/fallback_url defined for the Messaging Service. |

### Update a Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(service.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "sticky_sender": false,
  "mms_converter": true,
  "smart_encoding": false,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "synchronous_validation": true,
  "area_code_geomatch": true,
  "validity_period": 600,
  "inbound_request_url": "https://www.example.com",
  "inbound_method": "POST",
  "fallback_url": null,
  "fallback_method": "POST",
  "status_callback": "https://www.example.com",
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete a Service

```
DELETE https://messaging.twilio.com/v1/Services/{Sid}
```

When a Service is deleted, all phone numbers and short codes in the Service are returned to your Account.

> **Warning:** If you are using a Messaging Service for A2P 10DLC, you should not delete the Messaging Service. Doing so deletes the A2P 10DLC Campaign, which immediately halts all US A2P 10DLC messaging. A new Campaign and Messaging Service must be created and re-registered. This process can take several days.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<MG\> | required | Not PII | The SID of the Service resource to delete. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

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

client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```