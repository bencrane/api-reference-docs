# SupportingDocument Resource

## SupportingDocument Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RD> | Optional | Not PII | The unique string created by Twilio to identify the Supporting Document resource. Pattern: `^RD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the Document resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| mime_type | string | Optional | Not PII | The image type uploaded in the Supporting Document container. |
| status | enum<string> | Optional | Not PII | The verification status of the Supporting Document resource. Possible values: `DRAFT`, `PENDING_REVIEW`, `REJECTED`, `APPROVED`, `EXPIRED`, `PROVISIONALLY_APPROVED` |
| type | string | Optional | Not PII | The type of the Supporting Document. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the Supporting Documents resource which are listed in the Supporting Document Types. |
| date_created | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| date_updated | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| url | string<uri> | Optional | Not PII | The absolute URL of the Supporting Document resource. |

---

## Create a new Supporting Document

```
POST https://trusthub.twilio.com/v1/SupportingDocuments
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | required | Not PII | The string that you assigned to describe the resource. |
| type | string | required | Not PII | The type of the Supporting Document. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the Supporting Documents resource which are derived Supporting Document Types. |

### Create a SupportingDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document = client.trusthub.v1.supporting_documents.create(
    friendly_name="FriendlyName", type="Type"
)

print(supporting_document.sid)
```

### Response

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "FriendlyName",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "type": "Type",
  "mime_type": null
}
```

---

## Fetch specific Supporting Document Instance

```
GET https://trusthub.twilio.com/v1/SupportingDocuments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RD> | required | Not PII | The unique string created by Twilio to identify the Supporting Document resource. Pattern: `^RD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a SupportingDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document = client.trusthub.v1.supporting_documents(
    "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(supporting_document.sid)
```

### Response

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "Business-profile-physical-address",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "type": "customer_profile_address",
  "mime_type": null
}
```

---

## Retrieve a list of all Supporting Document for an account

```
GET https://trusthub.twilio.com/v1/SupportingDocuments
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple SupportingDocuments

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_documents = client.trusthub.v1.supporting_documents.list(limit=20)

for record in supporting_documents:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/SupportingDocuments?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/SupportingDocuments?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

---

## Update an existing Supporting Document

```
POST https://trusthub.twilio.com/v1/SupportingDocuments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RD> | required | Not PII | The unique string created by Twilio to identify the Supporting Document resource. Pattern: `^RD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| attributes | object | Optional | PII MTL: 30 days | The set of parameters that are the attributes of the Supporting Document resource which are derived Supporting Document Types. |

### Update a SupportingDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document = client.trusthub.v1.supporting_documents(
    "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(supporting_document.sid)
```

### Response

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "FriendlyName",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "type": "customer_profile_address",
  "mime_type": null
}
```

---

## Delete a specific Supporting Document

```
DELETE https://trusthub.twilio.com/v1/SupportingDocuments/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RD> | required | Not PII | The unique string created by Twilio to identify the Supporting Document resource. Pattern: `^RD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a SupportingDocument

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.trusthub.v1.supporting_documents(
    "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```