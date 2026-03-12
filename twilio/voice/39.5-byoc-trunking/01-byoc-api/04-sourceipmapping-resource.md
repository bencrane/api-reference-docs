# SourceIpMapping Resource

The SourceIpMappings resource describes the publicly-routable Static IP addresses that can be used to receive Termination traffic from a BYOC Carrier.

> **Info**
> This resource requires that the Account has a Twilio Interconnect connection configured.

## SourceIpMapping Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IB> | Optional | Not PII | The unique string that we created to identify the IP Record resource. Pattern: `^IB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| ip_record_sid | SID<IL> | Optional | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to map from. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sip_domain_sid | SID<SD> | Optional | Not PII | The SID of the SIP Domain that the IP Record is mapped to. Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the resource. |

## Create a SourceIpMapping resource

```
POST https://voice.twilio.com/v1/SourceIpMappings
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| ip_record_sid | SID<IL> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to map from. Pattern: `^IL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sip_domain_sid | SID<SD> | required | Not PII | The SID of the SIP Domain that the IP Record should be mapped to. Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a SourceIpMapping

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

source_ip_mapping = client.voice.v1.source_ip_mappings.create(
    ip_record_sid="ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    sip_domain_sid="SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(source_ip_mapping.sid)
```

### Response

```json
{
  "sid": "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "ip_record_sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sip_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:36Z",
  "url": "https://voice.twilio.com/v1/SourceIpMappings/IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a SourceIpMapping resource

```
GET https://voice.twilio.com/v1/SourceIpMappings/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IB> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to fetch. Pattern: `^IB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a SourceIpMapping

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

source_ip_mapping = client.voice.v1.source_ip_mappings(
    "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(source_ip_mapping.sid)
```

### Response

```json
{
  "sid": "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "ip_record_sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sip_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/SourceIpMappings/IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple SourceIpMapping resources

```
GET https://voice.twilio.com/v1/SourceIpMappings
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple SourceIpMappings

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

source_ip_mappings = client.voice.v1.source_ip_mappings.list(limit=20)

for record in source_ip_mappings:
    print(record.sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://voice.twilio.com/v1/SourceIpMappings?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/SourceIpMappings?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "source_ip_mappings"
  },
  "source_ip_mappings": [
    {
      "sid": "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "ip_record_sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sip_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2020-03-18T23:31:36Z",
      "date_updated": "2020-03-18T23:31:37Z",
      "url": "https://voice.twilio.com/v1/SourceIpMappings/IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a SourceIpMapping resource

```
POST https://voice.twilio.com/v1/SourceIpMappings/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IB> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to update. Pattern: `^IB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sip_domain_sid | SID<SD> | required | Not PII | The SID of the SIP Domain that the IP Record should be mapped to. Pattern: `^SD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Update a SourceIpMapping

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

source_ip_mapping = client.voice.v1.source_ip_mappings(
    "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(sip_domain_sid="SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(source_ip_mapping.sid)
```

### Response

```json
{
  "sid": "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "ip_record_sid": "ILaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sip_domain_sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/SourceIpMappings/IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a SourceIpMapping resource

```
DELETE https://voice.twilio.com/v1/SourceIpMappings/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IB> | required | Not PII | The Twilio-provided string that uniquely identifies the IP Record resource to delete. Pattern: `^IB[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a SourceIpMapping

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.voice.v1.source_ip_mappings(
    "IBaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```