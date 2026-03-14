# ShortCodes subresource

> **Public Beta:** The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the Twilio Console is Generally Available.
>
> Public Beta products are not covered by a Twilio SLA.
>
> The resources for sending Messages with a Messaging Service are Generally Available.

ShortCodes is a subresource of Services and represents the short codes you have associated to the Service.

When a short code has been added to the Messaging Service, Twilio always prioritizes message delivery with your short code when possible. If the short code cannot be used to reach your user, Twilio performs a Short Code Reroute to sent the message from a long code in your Messaging Service instead.

Inbound messages received on any of short codes associated with a Messaging Service are passed to the inbound request URL of the Service with the TwiML parameters that describe the message.

## ShortCode Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<SC\> | Optional | Not PII | The unique string that we created to identify the ShortCode resource. Pattern: `^SC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the ShortCode resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `service_sid` | SID\<MG\> | Optional | Not PII | The SID of the Service the resource is associated with. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `short_code` | string | Optional | Not PII | The E.164 format of the short code. |
| `country_code` | string | Optional | Not PII | The 2-character ISO Country Code of the number. |
| `capabilities` | array[string] | Optional | Not PII | An array of values that describe whether the number can receive calls or messages. Can be: SMS and MMS. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the ShortCode resource. |

---

## Create a ShortCode

```
POST https://messaging.twilio.com/v1/Services/{ServiceSid}/ShortCodes
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to create the resource under. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `short_code_sid` | SID\<SC\> | required | Not PII | The SID of the ShortCode resource being added to the Service. Pattern: `^SC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a ShortCode for a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_code = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).short_codes.create(short_code_sid="SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(short_code.sid)
```

**Response:**

```json
{
  "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "short_code": "12345",
  "country_code": "US",
  "capabilities": [
    "SMS"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a ShortCode

```
GET https://messaging.twilio.com/v1/Services/{ServiceSid}/ShortCodes/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the ShortCode resource to fetch. |

### Retrieve a ShortCode from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_code = (
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .short_codes("SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(short_code.sid)
```

**Response:**

```json
{
  "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "short_code": "12345",
  "country_code": "US",
  "capabilities": [
    "SMS"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of ShortCodes

```
GET https://messaging.twilio.com/v1/Services/{ServiceSid}/ShortCodes
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to read the resources from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve a list of ShortCodes from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_codes = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).short_codes.list(limit=20)

for record in short_codes:
    print(record.sid)
```

**Response:**

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "short_codes",
    "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes?PageSize=20&Page=0"
  },
  "short_codes": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:12:31Z",
      "date_updated": "2015-07-30T20:12:33Z",
      "short_code": "12345",
      "country_code": "US",
      "capabilities": [
        "SMS"
      ],
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

---

## Delete a ShortCode

```
DELETE https://messaging.twilio.com/v1/Services/{ServiceSid}/ShortCodes/{Sid}
```

> **Warning:** Removing a short code from the Messaging Service does not release the short code from your account. You must cancel the short code from your Account in order to disassociate and delete the short code from your Messaging Service.

Returns a 204 NO CONTENT if the short code was successfully removed from the service.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `service_sid` | SID\<MG\> | required | Not PII | The SID of the Service to delete the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | string | required | Not PII | The SID of the ShortCode resource to delete. |

### Delete a ShortCode from a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").short_codes(
    "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```