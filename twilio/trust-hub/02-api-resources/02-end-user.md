# EndUser Resource

## EndUser Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IT> | Optional | Not PII | The unique string created by Twilio to identify the End User resource. Pattern: `^IT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the End User resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| type | string | Optional | Not PII | The type of end user of the Bundle resource - can be individual or business. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the End Users resource which are listed in the End User Types. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the End User resource. |

---

## Create an EndUser resource

```
POST https://trusthub.twilio.com/v1/EndUsers
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | required | Not PII | The string that you assigned to describe the resource. |
| type | string | required | Not PII | The type of end user of the Bundle resource - can be individual or business. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the End User resource which are derived End User Types. |

### Create an EndUser

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users.create(
    friendly_name="FriendlyName", type="Type"
)

print(end_user.sid)
```

### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "phone_number": "+11234567890",
    "job_position": "CEO",
    "first_name": "rep1",
    "last_name": "test",
    "business_title": "ceo",
    "email": "foobar@test.com"
  },
  "type": "Type"
}
```

---

## Fetch an EndUser resource

```
GET https://trusthub.twilio.com/v1/EndUsers/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IT> | required | Not PII | The unique string created by Twilio to identify the End User resource. Pattern: `^IT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an EndUser

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users(
    "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(end_user.sid)
```

### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "auth_rep_1",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "phone_number": "+11234567890",
    "job_position": "CEO",
    "first_name": "rep1",
    "last_name": "test",
    "business_title": "ceo",
    "email": "foobar@test.com"
  },
  "type": "authorized_representative_1"
}
```

---

## Read multiple EndUser resources

```
GET https://trusthub.twilio.com/v1/EndUsers
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple EndUsers

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_users = client.trusthub.v1.end_users.list(limit=20)

for record in end_users:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/EndUsers?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/EndUsers?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

---

## Update an EndUser resource

```
POST https://trusthub.twilio.com/v1/EndUsers/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IT> | required | Not PII | The unique string created by Twilio to identify the End User resource. Pattern: `^IT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the End User resource which are derived End User Types. |

### Update an EndUser

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users(
    "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(end_user.sid)
```

### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "phone_number": "+11234567890",
    "job_position": "CEO",
    "first_name": "rep1",
    "last_name": "test",
    "business_title": "ceo",
    "email": "foobar@test.com"
  },
  "type": "authorized_representative_1"
}
```

---

## Delete an EndUser resource

```
DELETE https://trusthub.twilio.com/v1/EndUsers/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<IT> | required | Not PII | The unique string created by Twilio to identify the End User resource. Pattern: `^IT[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete an EndUser

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.trusthub.v1.end_users("ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```