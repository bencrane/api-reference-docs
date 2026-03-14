# CustomerProfile Resource

## CustomerProfile Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BU> | Optional | Not PII | The unique string that we created to identify the Customer-Profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Customer-Profile resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| policy_sid | SID<RN> | Optional | Not PII | The unique string of a policy that is associated to the Customer-Profile resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| status | enum<string> | Optional | Not PII | The verification status of the Customer-Profile resource. Possible values: `draft`, `pending-review`, `in-review`, `twilio-rejected`, `twilio-approved` |
| valid_until | string<date-time> | Optional | Not PII | The date and time in GMT in ISO 8601 format when the resource will be valid until. |
| email | string | Optional | Not PII | The email address that will receive updates when the Customer-Profile resource changes status. |
| status_callback | string<uri> | Optional | Not PII | The URL we call to inform your application of status changes. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the Customer-Profile resource. |
| links | object<uri-map> | Optional | Not PII | The URLs of the Assigned Items of the Customer-Profile resource. |
| errors | array | Optional | Not PII | The error codes associated with the rejection of the Customer-Profile. |

---

## Create a CustomerProfile resource

```
POST https://trusthub.twilio.com/v1/CustomerProfiles
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | required | Not PII | The string that you assigned to describe the resource. |
| email | string | required | Not PII | The email address that will receive updates when the Customer-Profile resource changes status. |
| policy_sid | SID<RN> | required | Not PII | The unique string of a policy that is associated to the Customer-Profile resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status_callback | string<uri> | Optional | Not PII | The URL we call to inform your application of status changes. |

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

customer_profile = client.trusthub.v1.customer_profiles.create(
    email="secondary@example.com",
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status_callback="http://www.example.com",
)

print(customer_profile.sid)
```

### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "secondary@example.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

---

## Fetch a CustomerProfile resource

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BU> | required | Not PII | The unique string that we created to identify the Customer-Profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

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

customer_profile = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(customer_profile.sid)
```

### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "valid_until": null,
  "email": "email",
  "status_callback": "http://www.example.com",
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": [
    {
      "code": 18601
    }
  ]
}
```

---

## Retrieve multiple CustomerProfile resources

```
GET https://trusthub.twilio.com/v1/CustomerProfiles
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| status | enum<string> | Optional | Not PII | The verification status of the Customer-Profile resource. Possible values: `draft`, `pending-review`, `in-review`, `twilio-rejected`, `twilio-approved` |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| policy_sid | SID<RN> | Optional | Not PII | The unique string of a policy that is associated to the Customer-Profile resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
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

customer_profiles = client.trusthub.v1.customer_profiles.list(
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    limit=20,
)

for record in customer_profiles:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

---

## Update a CustomerProfile resource

```
POST https://trusthub.twilio.com/v1/CustomerProfiles/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BU> | required | Not PII | The unique string that we created to identify the Customer-Profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| status | enum<string> | Optional | Not PII | The verification status of the Customer-Profile resource. Possible values: `draft`, `pending-review`, `in-review`, `twilio-rejected`, `twilio-approved` |
| status_callback | string<uri> | Optional | Not PII | The URL we call to inform your application of status changes. |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| email | string | Optional | Not PII | The email address that will receive updates when the Customer-Profile resource changes status. |

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

customer_profile = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    status_callback="http://www.example.com",
    friendly_name="friendly_name",
    email="notification@email.com",
)

print(customer_profile.sid)
```

### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

---

## Delete a CustomerProfile resource

```
DELETE https://trusthub.twilio.com/v1/CustomerProfiles/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<BU> | required | Not PII | The unique string that we created to identify the Customer-Profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

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
).delete()
```