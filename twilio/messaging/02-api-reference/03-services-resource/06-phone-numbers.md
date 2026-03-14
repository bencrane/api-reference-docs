# Messaging - API Reference - Services - PhoneNumbers

> **Public Beta**
> 
> The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the Twilio Console is Generally Available.
> 
> Public Beta products are not covered by a Twilio SLA.
> 
> The resources for sending Messages with a Messaging Service are Generally Available.

PhoneNumbers is a subresource of Services and represents a phone number you have associated to the Service.

When sending a message with your Messaging Service, Twilio will select a phone number from the service for delivery.

Inbound messages received on any phone number associated to a Messaging Service are passed to the inbound request URL of the Service with the TwiML parameters that describe the message.

---

## PhoneNumber Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<PN> | Optional | Not PII | The unique string that we created to identify the PhoneNumber resource. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID<AC> | Optional | Not PII | The SID of the Account that created the PhoneNumber resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `service_sid` | SID<MG> | Optional | Not PII | The SID of the Service the resource is associated with. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `date_created` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `phone_number` | string<phone-number> | Optional | Not PII | The phone number in E.164 format, which consists of a + followed by the country code and subscriber number. |
| `country_code` | string | Optional | Not PII | The 2-character ISO Country Code of the number. |
| `capabilities` | array[string] | Optional | Not PII | An array of values that describe whether the number can receive calls or messages. Can be: Voice, SMS, and MMS. |
| `url` | string<uri> | Optional | Not PII | The absolute URL of the PhoneNumber resource. |

---

## Create a PhoneNumber

```
POST https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers
```

Add a phone number to your Messaging Service.

Each Service can have no more than 400 phone numbers by default. If you think you might need a higher limit, contact Twilio Support about a Messaging Service number limit increase, and include an explanation of your use case.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID<MG> | required | Not PII | The SID of the Service to create the resource under. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `phone_number_sid` | SID<PN> | required | Not PII | The SID of the Phone Number being added to the Service. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Create a PhoneNumber for a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

phone_number = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.create(phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(phone_number.sid)
```

### Response

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "+987654321",
  "country_code": "US",
  "capabilities": [
    "MMS",
    "SMS",
    "Voice"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a PhoneNumber

```
GET https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID<MG> | required | Not PII | The SID of the Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the PhoneNumber resource to fetch. |

### Example: Retrieve a PhoneNumber from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

phone_number = (
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(phone_number.sid)
```

### Response

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "12345",
  "country_code": "US",
  "capabilities": [],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of PhoneNumbers

```
GET https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID<MG> | required | Not PII | The SID of the Service to read the resources from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: Retrieve a list of PhoneNumbers from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

phone_numbers = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.list(limit=20)

for record in phone_numbers:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "phone_numbers",
    "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20&Page=0"
  },
  "phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:12:31Z",
      "date_updated": "2015-07-30T20:12:33Z",
      "phone_number": "+987654321",
      "country_code": "US",
      "capabilities": [],
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

---

## Delete a PhoneNumbers subresource

```
DELETE https://messaging.twilio.com/v1/Services/{ServiceSid}/PhoneNumbers/{Sid}
```

> ⚠️ **Warning**
> 
> Removing a phone number from the Service does not release the number from your account. You must release a phone number from your Account to disassociate and delete the phone number from the Service.

Returns a "204 NO CONTENT" if the phone number was successfully removed from the service.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID<MG> | required | Not PII | The SID of the Service to delete the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the PhoneNumber resource to delete. |

### Example: Delete a Phone Number from a Messaging Service

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
).phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```