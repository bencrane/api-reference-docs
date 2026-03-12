# ConnectionPolicyTarget Resource

The ConnectionPolicyTarget resource describes the individual URI entries that make up the BYOC Origination ConnectionPolicies list.

## Target Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Target resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| connection_policy_sid | SID<NY> | Optional | Not PII | The SID of the Connection Policy that owns the Target. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<NE> | Optional | Not PII | The unique string that we created to identify the Target resource. Pattern: `^NE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| target | string<uri> | Optional | PII MTL: 30 days | The SIP address you want Twilio to route your calls to. This must be a sip: schema. sips is NOT supported. |
| priority | integer | Optional | Not PII | The relative importance of the target. Can be an integer from 0 to 65535, inclusive, and the default is 10. The lowest number represents the most important target. Default: 0 |
| weight | integer | Optional | Not PII | The value that determines the relative share of the load the Target should receive compared to other Targets with the same priority. Can be an integer from 1 to 65535, inclusive, and the default is 10. Targets with higher values receive more load than those with lower ones with the same priority. Default: 0 |
| enabled | boolean | Optional | Not PII | Whether the target is enabled. The default is true. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in RFC 2822 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the resource. |

## Create a ConnectionPolicyTarget resource

```
POST https://voice.twilio.com/v1/ConnectionPolicies/{ConnectionPolicySid}/Targets
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| connection_policy_sid | SID<NY> | required | Not PII | The SID of the Connection Policy that owns the Target. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| target | string<uri> | required | PII MTL: 30 days | The SIP address you want Twilio to route your calls to. This must be a sip: schema. sips is NOT supported. |
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |
| priority | integer | Optional | Not PII | The relative importance of the target. Can be an integer from 0 to 65535, inclusive, and the default is 10. The lowest number represents the most important target. |
| weight | integer | Optional | Not PII | The value that determines the relative share of the load the Target should receive compared to other Targets with the same priority. Can be an integer from 1 to 65535, inclusive, and the default is 10. Targets with higher values receive more load than those with lower ones with the same priority. |
| enabled | boolean | Optional | Not PII | Whether the Target is enabled. The default is true. |

### Create a Target

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

target = client.voice.v1.connection_policies(
    "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).targets.create(target="https://www.example.com")

print(target.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "target": "https://www.example.com",
  "priority": 1,
  "weight": 20,
  "enabled": true,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:36Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets/NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a ConnectionPolicyTarget resource

```
GET https://voice.twilio.com/v1/ConnectionPolicies/{ConnectionPolicySid}/Targets/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| connection_policy_sid | SID<NY> | required | Not PII | The SID of the Connection Policy that owns the Target. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<NE> | required | Not PII | The unique string that we created to identify the Target resource to fetch. Pattern: `^NE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Target

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

target = (
    client.voice.v1.connection_policies("NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .targets("NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(target.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "target": "sip:sip-box.com:1234",
  "priority": 1,
  "weight": 20,
  "enabled": true,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets/NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple ConnectionPolicyTarget resources

```
GET https://voice.twilio.com/v1/ConnectionPolicies/{ConnectionPolicySid}/Targets
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| connection_policy_sid | SID<NY> | required | Not PII | The SID of the Connection Policy from which to read the Targets. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple Targets

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

targets = client.voice.v1.connection_policies(
    "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).targets.list(limit=20)

for record in targets:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "targets"
  },
  "targets": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "target": "sip:sip-box.com:1234",
      "priority": 1,
      "weight": 20,
      "enabled": true,
      "date_created": "2020-03-18T23:31:36Z",
      "date_updated": "2020-03-18T23:31:37Z",
      "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets/NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a ConnectionPolicyTarget resource

```
POST https://voice.twilio.com/v1/ConnectionPolicies/{ConnectionPolicySid}/Targets/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| connection_policy_sid | SID<NY> | required | Not PII | The SID of the Connection Policy that owns the Target. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<NE> | required | Not PII | The unique string that we created to identify the Target resource to update. Pattern: `^NE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | A descriptive string that you create to describe the resource. It is not unique and can be up to 255 characters long. |
| target | string<uri> | Optional | PII MTL: 30 days | The SIP address you want Twilio to route your calls to. This must be a sip: schema. sips is NOT supported. |
| priority | integer | Optional | Not PII | The relative importance of the target. Can be an integer from 0 to 65535, inclusive. The lowest number represents the most important target. |
| weight | integer | Optional | Not PII | The value that determines the relative share of the load the Target should receive compared to other Targets with the same priority. Can be an integer from 1 to 65535, inclusive. Targets with higher values receive more load than those with lower ones with the same priority. |
| enabled | boolean | Optional | Not PII | Whether the Target is enabled. |

### Update a Target

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connection_policy_target = (
    client.voice.v1.connection_policies("NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .targets("NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(friendly_name="FriendlyName")
)

print(connection_policy_target.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "connection_policy_sid": "NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "target": "sip:sip-updated.com:4321",
  "priority": 2,
  "weight": 10,
  "enabled": false,
  "date_created": "2020-03-18T23:31:36Z",
  "date_updated": "2020-03-18T23:31:37Z",
  "url": "https://voice.twilio.com/v1/ConnectionPolicies/NYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Targets/NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a ConnectionPolicyTarget resource

```
DELETE https://voice.twilio.com/v1/ConnectionPolicies/{ConnectionPolicySid}/Targets/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| connection_policy_sid | SID<NY> | required | Not PII | The SID of the Connection Policy that owns the Target. Pattern: `^NY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<NE> | required | Not PII | The unique string that we created to identify the Target resource to delete. Pattern: `^NE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a Target

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
).targets("NEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```