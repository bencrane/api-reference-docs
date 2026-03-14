# ShortCodes resource

A short code is a 5 or 6-digit number that can send and receive messages with mobile phones. These high-throughput numbers are perfect for apps that need to send messages to lots of users or need to send time-sensitive messages. You can buy short codes from Twilio or port existing short codes to Twilio.

To send messages from your short code, see the Sending Messages documentation.

## ShortCode Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created this ShortCode resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `api_version` | string | Optional | Not PII | The API version used to start a new TwiML session when an SMS message is sent to this short code. |
| `date_created` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that this resource was created specified in RFC 2822 format. |
| `date_updated` | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that this resource was last updated, specified in RFC 2822 format. |
| `friendly_name` | string | Optional | Not PII | A string that you assigned to describe this resource. By default, the FriendlyName is the short code. |
| `short_code` | string | Optional | Not PII | The short code. e.g., 894546. |
| `sid` | SID\<SC\> | Optional | Not PII | The unique string that that we created to identify this ShortCode resource. Pattern: `^SC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sms_fallback_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we use to call the sms_fallback_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `sms_fallback_url` | string\<uri\> | Optional | Not PII | The URL that we call if an error occurs while retrieving or executing the TwiML from sms_url. |
| `sms_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we use to call the sms_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `sms_url` | string\<uri\> | Optional | Not PII | The URL we call when receiving an incoming SMS message to this short code. |
| `uri` | string | Optional | Not PII | The URI of this resource, relative to https://api.twilio.com. |

---

## Retrieve a ShortCode

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account that created the ShortCode resource(s) to fetch. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<SC\> | required | Not PII | The Twilio-provided string that uniquely identifies the ShortCode resource to fetch. Pattern: `^SC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a ShortCode

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_code = client.short_codes("SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(short_code.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Thu, 01 Apr 2010 00:00:00 +0000",
  "date_updated": "Thu, 01 Apr 2010 00:00:00 +0000",
  "friendly_name": "API_CLUSTER_TEST_SHORT_CODE",
  "short_code": "99990",
  "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "POST",
  "sms_fallback_url": null,
  "sms_method": "POST",
  "sms_url": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## Retrieve a list of ShortCodes

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
```

Returns a list of ShortCodes, each representing a short code within your account. This list includes paging information.

### Filter the list Twilio returns

The following query string parameters allow you to limit the list returned.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account that created the ShortCode resource(s) to read. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | Not PII | The string that identifies the ShortCode resources to read. |
| `short_code` | string | Optional | Not PII | Only show the ShortCode resources that match this pattern. You can specify partial numbers and use '*' as a wildcard for any digit. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve a list of ShortCodes from your Account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_codes = client.short_codes.list(limit=20)

for record in short_codes:
    print(record.account_sid)
```

**Response:**

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "short_codes": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "date_created": "Thu, 01 Apr 2010 00:00:00 +0000",
      "date_updated": "Thu, 01 Apr 2010 00:00:00 +0000",
      "friendly_name": "API_CLUSTER_TEST_SHORT_CODE",
      "short_code": "99990",
      "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_fallback_method": "POST",
      "sms_fallback_url": null,
      "sms_method": "POST",
      "sms_url": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0"
}
```

### Retrieve a list of ShortCodes with an exact match

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_codes = client.short_codes.list(short_code="67898", limit=20)

for record in short_codes:
    print(record.account_sid)
```

**Response:**

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "short_codes": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "date_created": "Thu, 01 Apr 2010 00:00:00 +0000",
      "date_updated": "Thu, 01 Apr 2010 00:00:00 +0000",
      "friendly_name": "API_CLUSTER_TEST_SHORT_CODE",
      "short_code": "99990",
      "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_fallback_method": "POST",
      "sms_fallback_url": null,
      "sms_method": "POST",
      "sms_url": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0"
}
```

### Retrieve a list of ShortCodes resources with a partial match

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_codes = client.short_codes.list(short_code="898", limit=20)

for record in short_codes:
    print(record.account_sid)
```

**Response:**

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "short_codes": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "date_created": "Thu, 01 Apr 2010 00:00:00 +0000",
      "date_updated": "Thu, 01 Apr 2010 00:00:00 +0000",
      "friendly_name": "API_CLUSTER_TEST_SHORT_CODE",
      "short_code": "99990",
      "sid": "SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_fallback_method": "POST",
      "sms_fallback_url": null,
      "sms_method": "POST",
      "sms_url": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json?FriendlyName=friendly_name&ShortCode=short_code&PageSize=50&Page=0"
}
```

---

## Update a ShortCode

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
```

Tries to update the short code's properties. This API call returns the updated resource representation if it is successful. The returned response is identical to that returned when making a GET request.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | required | Not PII | The SID of the Account that created the ShortCode resource(s) to update. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<SC\> | required | Not PII | The Twilio-provided string that uniquely identifies the ShortCode resource to update. Pattern: `^SC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | Not PII | A descriptive string that you created to describe this resource. It can be up to 64 characters long. By default, the FriendlyName is the short code. |
| `api_version` | string | Optional | Not PII | The API version to use to start a new TwiML session. Can be: 2010-04-01 or 2008-08-01. |
| `sms_url` | string\<uri\> | Optional | Not PII | The URL we should call when receiving an incoming SMS message to this short code. |
| `sms_method` | enum\<http-method\> | Optional | Not PII | The HTTP method we should use when calling the sms_url. Can be: GET or POST. Possible values: `GET`, `POST` |
| `sms_fallback_url` | string\<uri\> | Optional | Not PII | The URL that we should call if an error occurs while retrieving or executing the TwiML from sms_url. |
| `sms_fallback_method` | enum\<http-method\> | Optional | Not PII | The HTTP method that we should use to call the sms_fallback_url. Can be: GET or POST. Possible values: `GET`, `POST` |

### Update a ShortCode

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

short_code = client.short_codes("SC6b20cb705c1e8f00210049b20b70fce3").update(
    sms_url="http://demo.twilio.com/docs/sms.xml"
)

print(short_code.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "date_created": "Thu, 01 Apr 2010 00:00:00 +0000",
  "date_updated": "Thu, 01 Apr 2010 00:00:00 +0000",
  "friendly_name": "API_CLUSTER_TEST_SHORT_CODE",
  "short_code": "99990",
  "sid": "SC6b20cb705c1e8f00210049b20b70fce3",
  "sms_fallback_method": "POST",
  "sms_fallback_url": null,
  "sms_method": "POST",
  "sms_url": "http://demo.twilio.com/docs/sms.xml",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes/SCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```