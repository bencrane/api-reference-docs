# IpRecord Resource

The IpRecord resource describe Static IP addresses used to address the BYOC Trunk's Termination SIP Domain via an IP Address instead of an FQDN (Fully Qualified Domain Name).

> **Warning**
> The IP Address used in this resource must be a subset of a Twilio Interconnect connection configured on the same Account.

## IpRecord Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the IP Record resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<IL> | Optional | Not PII | The unique string that we created to identify the IP Record resource. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| ip_address | string | Optional | PII MTL: 30 days | An IP address in dotted decimal notation, IPv4 only. |
| cidr_prefix_length | integer | Optional | Not PII | An integer representing the length of the CIDR prefix to use with this IP address. By default the entire IP address is used, which for IPv4 is value 32. Default: 0 |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the resource. |

## Create an IpRecord resource

```
POST https://voice.twilio.com/v1/IpRecords
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| ip_address | string | required | PII MTL: 30 days | An IP address in dotted decimal notation, IPv4 only. |
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |
| cidr_prefix_length | integer | Optional | Not PII | An integer representing the length of the CIDR prefix to use with this IP address. By default the entire IP address is used, which for IPv4 is value 32. |

### Create an IpRecord

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

ip_record = client.voice.v1.ip_records.create(ip_address="196.215.224.146")

print(ip_record.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "ip_address": "196.215.224.146",
  "cidr_prefix_length": 30,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:36Z",
  "url": "https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch an IpRecord resource

```
GET https://voice.twilio.com/v1/IpRecords/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IL> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to fetch. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an IpRecord

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

ip_record = client.voice.v1.ip_records(
    "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(ip_record.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "ip_address": "10.2.3.4",
  "cidr_prefix_length": 30,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple IpRecord resources

```
GET https://voice.twilio.com/v1/IpRecords
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple IpRecords

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

ip_records = client.voice.v1.ip_records.list(limit=20)

for record in ip_records:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/IpRecords?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "ip_records"
  },
  "ip_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "ip_address": "10.2.3.4",
      "cidr_prefix_length": 30,
      "date_created": "2020-03-18T23:31:36Z",
      "date_updated": "2020-03-18T23:31:37Z",
      "url": "https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update an IpRecord resource

```
POST https://voice.twilio.com/v1/IpRecords/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IL> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to update. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |

### Update an IpRecord

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

ip_record = client.voice.v1.ip_records(
    "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(ip_record.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "ip_address": "10.2.3.4",
  "cidr_prefix_length": 30,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/IpRecords/ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete an IpRecord resource

```
DELETE https://voice.twilio.com/v1/IpRecords/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IL> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to delete. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete an IpRecord

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.voice.v1.ip_records("ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```