# CustomerProfileChannelEndpointAssignment Resource

## ChannelEndpointAssignment Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RA> | Optional | Not PII | The unique string that we created to identify the Item Assignment resource. Pattern: `^RA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| customer_profile_sid | SID<BU> | Optional | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Item Assignment resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| channel_endpoint_type | string | Optional | Not PII | The type of channel endpoint. eg: phone-number |
| channel_endpoint_sid | SID | Optional | Not PII | The SID of an channel endpoint. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the Identity resource. |

---

## Create a new Assigned Item

```
POST https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/ChannelEndpointAssignments
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| customer_profile_sid | SID<BU> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| channel_endpoint_type | string | required | Not PII | The type of channel endpoint. eg: phone-number |
| channel_endpoint_sid | SID | required | Not PII | The SID of an channel endpoint. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_channel_endpoint_assignment = (
    client.trusthub.v1.customer_profiles(
        "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).customer_profiles_channel_endpoint_assignment.create(
        channel_endpoint_type="ChannelEndpointType",
        channel_endpoint_sid="ccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    )
)

print(customer_profiles_channel_endpoint_assignment.sid)
```

### Response

```json
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "ccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_type": "ChannelEndpointType",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch specific Assigned Item Instance

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/ChannelEndpointAssignments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| customer_profile_sid | SID<BU> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<RA> | required | Not PII | The unique string that we created to identify the resource. Pattern: `^RA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_channel_endpoint_assignment = (
    client.trusthub.v1.customer_profiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customer_profiles_channel_endpoint_assignment(
        "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    )
    .fetch()
)

print(customer_profiles_channel_endpoint_assignment.sid)
```

### Response

```json
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of all Assigned Items for an account

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/ChannelEndpointAssignments
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| customer_profile_sid | SID<BU> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| channel_endpoint_sid | SID | Optional | Not PII | The SID of an channel endpoint. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| channel_endpoint_sids | string | Optional | Not PII | comma separated list of channel endpoint sids |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_channel_endpoint_assignments = (
    client.trusthub.v1.customer_profiles(
        "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

---

## Remove an Assignment Item Instance

```
DELETE https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/ChannelEndpointAssignments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| customer_profile_sid | SID<BU> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<RA> | required | Not PII | The unique string that we created to identify the resource. Pattern: `^RA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_channel_endpoint_assignment(
    "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```