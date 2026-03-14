# SupportingDocumentType Resource

## SupportingDocumentType Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<OY> | Optional | Not PII | The unique string that identifies the Supporting Document Type resource. Pattern: `^OY[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | A human-readable description of the Supporting Document Type resource. |
| machine_name | string | Optional | Not PII | The machine-readable description of the Supporting Document Type resource. |
| fields | array | Optional | Not PII | The required information for creating a Supporting Document. The required fields will change as regulatory needs change and will differ for businesses and individuals. |
| url | string<uri> | Optional | Not PII | The absolute URL of the Supporting Document Type resource. |

---

## Fetch a specific Supporting Document Type Instance

```
GET https://trusthub.twilio.com/v1/SupportingDocumentTypes/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | string | required | Not PII | The unique string that identifies the Supporting Document Type resource. |

### Fetch a SupportingDocumentType

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document_type = client.trusthub.v1.supporting_document_types(
    "Sid"
).fetch()

print(supporting_document_type.sid)
```

### Response

```json
{
  "url": "https://trusthub.twilio.com/v1/SupportingDocumentTypes/OYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "fields": [
    {
      "machine_name": "first_name",
      "friendly_name": "First Name",
      "constraint": "String"
    },
    {
      "machine_name": "last_name",
      "friendly_name": "Last Name",
      "constraint": "String"
    },
    {
      "machine_name": "business_name",
      "friendly_name": "Business Name",
      "constraint": "String"
    }
  ],
  "machine_name": "government_issued_proof_of_authorized_representative",
  "friendly_name": "Government Issued Identity certifying proof of being an authorized representative of a company",
  "sid": "Sid"
}
```

---

## Retrieve a list of all Supporting Document Types

```
GET https://trusthub.twilio.com/v1/SupportingDocumentTypes
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple SupportingDocumentTypes

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document_types = client.trusthub.v1.supporting_document_types.list(
    limit=20
)

for record in supporting_document_types:
    print(record.sid)
```

### Response

```json
{
  "supporting_document_types": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/SupportingDocumentTypes?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/SupportingDocumentTypes?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "supporting_document_types"
  }
}
```