# ConnectionPolicy Resource

The ConnectionPolicies resource describes a list of URI Entries that are used to route Origination traffic to a PSTN Carrier over a BYOC Trunk.

## ConnectionPolicy Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Connection Policy resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<NY> | Optional | Not PII | The unique string that we created to identify the Connection Policy resource. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in RFC 2822 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the resource. |
| links | object<uri-map> | Optional | Not PII | The URLs of related resources. |

## Create a ConnectionPolicy resource

```
POST https://voice.twilio.com/v1/ConnectionPolicies
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |

### Create a ConnectionPolicy

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connection_policy = client.voice.v1.connection_policies.create()

print(connection_policy.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:36Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "targets": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets"
  }
}
```

## Fetch a ConnectionPolicy resource

```
GET https://voice.twilio.com/v1/ConnectionPolicies/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<NY> | required | Not PII | The unique string that we created to identify the Connection Policy resource to fetch. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a ConnectionPolicy

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connection_policy = client.voice.v1.connection_policies(
    "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(connection_policy.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "targets": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets"
  }
}
```

## Read multiple ConnectionPolicy resources

```
GET https://voice.twilio.com/v1/ConnectionPolicies
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple ConnectionPolicys

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connection_policies = client.voice.v1.connection_policies.list(limit=20)

for record in connection_policies:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://voice.twilio.com/v1/ConnectionPolicies?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/ConnectionPolicies?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "connection_policies"
  },
  "connection_policies": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "date_created": "2020-03-18T23:31:36Z",
      "date_updated": "2020-03-18T23:31:37Z",
      "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "targets": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets"
      }
    }
  ]
}
```

## Update a ConnectionPolicy resource

```
POST https://voice.twilio.com/v1/ConnectionPolicies/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<NY> | required | Not PII | The unique string that we created to identify the Connection Policy resource to update. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |

### Update a ConnectionPolicy

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connection_policy = client.voice.v1.connection_policies(
    "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(connection_policy.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "targets": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets"
  }
}
```

## Delete a ConnectionPolicy resource

```
DELETE https://voice.twilio.com/v1/ConnectionPolicies/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<NY> | required | Not PII | The unique string that we created to identify the Connection Policy resource to delete. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a ConnectionPolicy

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.voice.v1.connection_policies(
    "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```