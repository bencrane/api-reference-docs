# EndUserType Resource

## EndUserType Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<OY\> | Optional | Not PII | The unique string that identifies the End-User Type resource. Pattern: `^OY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `friendly_name` | string | Optional | Not PII | A human-readable description that is assigned to describe the End-User Type resource. Examples can include first name, last name, email, business name, etc. |
| `machine_name` | string | Optional | Not PII | A machine-readable description of the End-User Type resource. Examples can include first_name, last_name, email, business_name, etc. |
| `fields` | array | Optional | Not PII | The required information for creating an End-User. The required fields will change as regulatory needs change and will differ for businesses and individuals. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the End-User Type resource. |

---

## Fetch a Specific End-User Type Instance

```
GET https://trusthub.twilio.com/v1/EndUserTypes/{Sid}
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | string | required | Not PII | The unique string that identifies the End-User Type resource. |

### Example: Fetch an EndUserType

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user_type = client.trusthub.v1.end_user_types("Sid").fetch()

print(end_user_type.sid)
```

### Response

```json
{
  "url": "https://trusthub.twilio.com/v1/EndUserTypes/OYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "fields": [
    {
      "machine_name": "last_name",
      "friendly_name": "Last Name",
      "constraint": "String"
    },
    {
      "machine_name": "email",
      "friendly_name": "Email",
      "constraint": "String"
    },
    {
      "machine_name": "first_name",
      "friendly_name": "First Name",
      "constraint": "String"
    },
    {
      "machine_name": "business_title",
      "friendly_name": "Business Title",
      "constraint": "String"
    },
    {
      "machine_name": "phone_number",
      "friendly_name": "Phone Number",
      "constraint": "String"
    },
    {
      "machine_name": "job_position",
      "friendly_name": "Job Position",
      "constraint": "String"
    }
  ],
  "machine_name": "authorized_representative_1",
  "friendly_name": "Authorized Representative one",
  "sid": "Sid"
}
```

---

## Retrieve a List of All End-User Types

```
GET https://trusthub.twilio.com/v1/EndUserTypes
```

### Query Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List Multiple EndUserTypes

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user_types = client.trusthub.v1.end_user_types.list(limit=20)

for record in end_user_types:
    print(record.sid)
```

### Response

```json
{
  "end_user_types": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/EndUserTypes?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/EndUserTypes?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "end_user_types"
  }
}
```
