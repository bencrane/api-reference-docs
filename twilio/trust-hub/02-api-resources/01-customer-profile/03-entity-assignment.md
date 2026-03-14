# CustomerProfileEntityAssignment Resource

## EntityAssignment Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<BV\> | Optional | Not PII | The unique string that we created to identify the Item Assignment resource. Pattern: `^BV[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `customer_profile_sid` | SID\<BU\> | Optional | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the Item Assignment resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `object_sid` | SID | Optional | Not PII | The SID of an object bag that holds information of the different items. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the Identity resource. |

---

## Create a new Assigned Item

```
POST https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/EntityAssignments
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

**Encoding type:** `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `object_sid` | SID | required | Not PII | The SID of an object bag that holds information of the different items. Pattern: `^[a-zA-Z]{2}[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Create an EntityAssignment

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
```

### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ccaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch specific Assigned Item Instance

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/EntityAssignments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<BV\> | required | Not PII | The unique string that we created to identify the Identity resource. Pattern: `^BV[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Fetch an EntityAssignment

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = (
    client.trusthub.v1.customer_profiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customer_profiles_entity_assignments("BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(customer_profiles_entity_assignment.sid)
```

### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve a list of all Assigned Items for an account

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/EntityAssignments
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `object_type` | string | Optional | Not PII | A string to filter the results by (EndUserType or SupportingDocumentType) machine-name. This is useful when you want to retrieve the entity-assignment of a specific end-user or supporting document. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Min: 1, Max: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Min: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List multiple EntityAssignments

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignments = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.list(limit=20)

for record in customer_profiles_entity_assignments:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

---

## Remove an Assignment Item Instance

```
DELETE https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/EntityAssignments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<BV\> | required | Not PII | The unique string that we created to identify the Identity resource. Pattern: `^BV[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Delete an EntityAssignment

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
).customer_profiles_entity_assignments(
    "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```