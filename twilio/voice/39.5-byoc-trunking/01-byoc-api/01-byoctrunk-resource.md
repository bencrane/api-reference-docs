# ByocTrunk Resource

The ByocTrunks resource describes a trunk that can be configured to send/receive traffic to/from a PSTN Carrier.

## ByocTrunk Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the BYOC Trunk resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<BY> | Optional | Not PII | The unique string that that we created to identify the BYOC Trunk resource. Pattern: `^BY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| voice_url | string<uri> | Optional | PII MTL: 30 days | The URL we call using the voice_method when the BYOC Trunk receives a call. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call voice_url. Can be: `GET` or `POST`. |
| voice_fallback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we call when an error occurs while retrieving or executing the TwiML requested from voice_url. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call voice_fallback_url. Can be: `GET` or `POST`. |
| status_callback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we call to pass status parameters (such as call ended) to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call status_callback_url. Either `GET` or `POST`. |
| cnam_lookup_enabled | boolean | Optional | Not PII | Whether Caller ID Name (CNAM) lookup is enabled for the trunk. If enabled, all inbound calls to the BYOC Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See CNAM Lookups for more information. |
| connection_policy_sid | SID<NY> | Optional | Not PII | The SID of the Connection Policy that Twilio will use when routing traffic to your communications infrastructure. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| from_domain_sid | SID<SD> | Optional | Not PII | The SID of the SIP Domain that should be used in the From header of originating calls sent to your SIP infrastructure. If your SIP infrastructure allows users to "call back" an incoming call, configure this with a SIP Domain to ensure proper routing. If not configured, the from domain will default to "sip.twilio.com". Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the resource. |

## Create a ByocTrunk resource

```
POST https://voice.twilio.com/v1/ByocTrunks
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |
| voice_url | string<uri> | Optional | PII MTL: 30 days | The URL we should call when the BYOC Trunk receives a call. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call voice_url. Can be: `GET` or `POST`. |
| voice_fallback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we should call when an error occurs while retrieving or executing the TwiML from voice_url. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call voice_fallback_url. Can be: `GET` or `POST`. |
| status_callback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we should call to pass status parameters (such as call ended) to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call status_callback_url. Can be: `GET` or `POST`. |
| cnam_lookup_enabled | boolean | Optional | Not PII | Whether Caller ID Name (CNAM) lookup is enabled for the trunk. If enabled, all inbound calls to the BYOC Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See CNAM Lookups for more information. |
| connection_policy_sid | SID<NY> | Optional | Not PII | The SID of the Connection Policy that Twilio will use when routing traffic to your communications infrastructure. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| from_domain_sid | SID<SD> | Optional | Not PII | The SID of the SIP Domain that should be used in the From header of originating calls sent to your SIP infrastructure. If your SIP infrastructure allows users to "call back" an incoming call, configure this with a SIP Domain to ensure proper routing. If not configured, the from domain will default to "sip.twilio.com". Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a ByocTrunk

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

byoc_trunk = client.voice.v1.byoc_trunks.create()

print(byoc_trunk.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "voice_url": "https://byoc.example.com/twilio/app",
  "voice_method": "POST",
  "voice_fallback_method": "POST",
  "voice_fallback_url": "https://byoc.example.com/twilio/fallback",
  "status_callback_method": "POST",
  "status_callback_url": "https://byoc.example.com/twilio/status_callback",
  "cnam_lookup_enabled": false,
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "from_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:36Z",
  "url": "https://voice.twilio.com/v1/ByocTrunks/BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a ByocTrunk resource

```
GET https://voice.twilio.com/v1/ByocTrunks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BY> | required | Not PII | The Twilio-provided string that uniquely identifies the BYOC Trunk resource to fetch. Pattern: `^BY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a ByocTrunk

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

byoc_trunk = client.voice.v1.byoc_trunks(
    "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(byoc_trunk.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "voice_url": "https://byoc.example.com/twilio/app",
  "voice_method": "POST",
  "voice_fallback_method": "POST",
  "voice_fallback_url": "https://byoc.example.com/twilio/fallback",
  "status_callback_method": "POST",
  "status_callback_url": "https://byoc.example.com/twilio/status_callback",
  "cnam_lookup_enabled": false,
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "from_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ByocTrunks/BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple ByocTrunk resources

```
GET https://voice.twilio.com/v1/ByocTrunks
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple ByocTrunks

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

byoc_trunks = client.voice.v1.byoc_trunks.list(limit=20)

for record in byoc_trunks:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://voice.twilio.com/v1/ByocTrunks?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/ByocTrunks?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "byoc_trunks"
  },
  "byoc_trunks": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "voice_url": "https://byoc.example.com/twilio/app",
      "voice_method": "POST",
      "voice_fallback_method": "POST",
      "voice_fallback_url": "https://byoc.example.com/twilio/fallback",
      "status_callback_method": "POST",
      "status_callback_url": "https://byoc.example.com/twilio/status_callback",
      "cnam_lookup_enabled": false,
      "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "from_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2020-03-18T23:31:36Z",
      "date_updated": "2020-03-18T23:31:37Z",
      "url": "https://voice.twilio.com/v1/ByocTrunks/BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a ByocTrunk resource

```
POST https://voice.twilio.com/v1/ByocTrunks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BY> | required | Not PII | The Twilio-provided string that uniquely identifies the BYOC Trunk resource to update. Pattern: `^BY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |
| voice_url | string<uri> | Optional | PII MTL: 30 days | The URL we should call when the BYOC Trunk receives a call. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call voice_url. |
| voice_fallback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we should call when an error occurs while retrieving or executing the TwiML requested by voice_url. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call voice_fallback_url. Can be: `GET` or `POST`. |
| status_callback_url | string<uri> | Optional | PII MTL: 30 days | The URL that we should call to pass status parameters (such as call ended) to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call status_callback_url. Can be: `GET` or `POST`. |
| cnam_lookup_enabled | boolean | Optional | Not PII | Whether Caller ID Name (CNAM) lookup is enabled for the trunk. If enabled, all inbound calls to the BYOC Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See CNAM Lookups for more information. |
| connection_policy_sid | SID<NY> | Optional | Not PII | The SID of the Connection Policy that Twilio will use when routing traffic to your communications infrastructure. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| from_domain_sid | SID<SD> | Optional | Not PII | The SID of the SIP Domain that should be used in the From header of originating calls sent to your SIP infrastructure. If your SIP infrastructure allows users to "call back" an incoming call, configure this with a SIP Domain to ensure proper routing. If not configured, the from domain will default to "sip.twilio.com". Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Update a ByocTrunk

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

byoc_trunk = client.voice.v1.byoc_trunks(
    "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(byoc_trunk.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "voice_url": "https://byoc.example.com/twilio_updated/app",
  "voice_method": "GET",
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://byoc.example.com/twilio_updated/fallback",
  "status_callback_method": "GET",
  "status_callback_url": "https://byoc.example.com/twilio_updated/status_callback",
  "cnam_lookup_enabled": true,
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
  "from_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ByocTrunks/BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a ByocTrunk resource

```
DELETE https://voice.twilio.com/v1/ByocTrunks/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BY> | required | Not PII | The Twilio-provided string that uniquely identifies the BYOC Trunk resource to delete. Pattern: `^BY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a ByocTrunk

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.voice.v1.byoc_trunks("BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```