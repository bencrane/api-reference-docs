# CustomerProfileEvaluation Resource

## Evaluation Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<EL\> | Optional | Not PII | The unique string that identifies the Evaluation resource. Pattern: `^EL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the customer_profile resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `policy_sid` | SID\<RN\> | Optional | Not PII | The unique string of a policy that is associated to the customer_profile resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `customer_profile_sid` | SID\<BU\> | Optional | Not PII | The unique string that we created to identify the customer_profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `status` | enum\<string\> | Optional | Not PII | The compliance status of the Evaluation resource. Possible values: `compliant`, `noncompliant` |
| `results` | array | Optional | Not PII | The results of the Evaluation which includes the valid and invalid attributes. |
| `date_created` | string\<date-time\> | Optional | Not PII | |
| `url` | string\<uri\> | Optional | Not PII | |

---

## Create a New Evaluation

```
POST https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/Evaluations
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request Body Parameters

**Encoding type:** `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `policy_sid` | SID\<RN\> | required | Not PII | The unique string of a policy that is associated to the customer_profile resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Create an Evaluation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_evaluation = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_evaluations.create(
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_evaluation.sid)
```

### Response

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "noncompliant",
  "date_created": "2020-04-28T18:14:01Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "friendly_name": "Business",
      "object_type": "business",
      "passed": false,
      "failure_reason": "A Business End-User is missing. Please add one to the regulatory bundle.",
      "error_code": 22214,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Please enter in a Business Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Business Registration Number",
          "object_field": "business_registration_number",
          "failure_reason": "The Business Registration Number is missing. Please enter in a Business Registration Number on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Please enter in a First Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Please enter in a Last Name on the Business information.",
          "error_code": 22215
        }
      ],
      "requirement_friendly_name": "Business",
      "requirement_name": "business_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Or, it does not match the Business Name you entered within Business information. Please enter in the Business Name shown on the Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative or make sure both Business Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Name",
      "requirement_name": "business_name_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register showing French address",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register showing French address is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Address sid(s)",
          "object_field": "address_sids",
          "failure_reason": "The Address is missing. Please enter in the address shown on the Excerpt from the commercial register showing French address.",
          "error_code": 22219
        }
      ],
      "requirement_friendly_name": "Business Address (Proof of Address)",
      "requirement_name": "business_address_proof_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis)",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Document Number",
          "object_field": "document_number",
          "failure_reason": "The Document Number is missing. Please enter in the Document Number shown on the Excerpt from the commercial register (Extrait K-bis).",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Registration Number",
      "requirement_name": "business_reg_no_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Or, it does not match the First Name you entered within Business information. Please enter in the First Name shown on the Government-issued ID or make sure both First Name fields use the same exact inputs.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Or, it does not match the Last Name you entered within Business information. Please enter in the Last Name shown on the Government-issued ID or make sure both Last Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Authorized Representative",
      "requirement_name": "name_of_auth_rep_info"
    },
    {
      "friendly_name": "Executed Copy of Power of Attorney",
      "object_type": "power_of_attorney",
      "passed": false,
      "failure_reason": "An Executed Copy of Power of Attorney is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [],
      "requirement_friendly_name": "Power of Attorney",
      "requirement_name": "power_of_attorney_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing on the Governnment-Issued ID.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing on the Government-issued ID",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Person granted the Power of Attorney",
      "requirement_name": "name_in_power_of_attorney_info"
    }
  ]
}
```

---

## Fetch Specific Evaluation Instance

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/Evaluations/{Sid}
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the customer_profile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<EL\> | required | Not PII | The unique string that identifies the Evaluation resource. Pattern: `^EL[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Fetch an Evaluation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_evaluation = (
    client.trusthub.v1.customer_profiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customer_profiles_evaluations("ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(customer_profiles_evaluation.sid)
```

### Response

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "noncompliant",
  "date_created": "2020-04-28T18:14:01Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "friendly_name": "Business",
      "object_type": "business",
      "passed": false,
      "failure_reason": "A Business End-User is missing. Please add one to the regulatory bundle.",
      "error_code": 22214,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Please enter in a Business Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Business Registration Number",
          "object_field": "business_registration_number",
          "failure_reason": "The Business Registration Number is missing. Please enter in a Business Registration Number on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Please enter in a First Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Please enter in a Last Name on the Business information.",
          "error_code": 22215
        }
      ],
      "requirement_friendly_name": "Business",
      "requirement_name": "business_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Or, it does not match the Business Name you entered within Business information. Please enter in the Business Name shown on the Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative or make sure both Business Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Name",
      "requirement_name": "business_name_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register showing French address",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register showing French address is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Address sid(s)",
          "object_field": "address_sids",
          "failure_reason": "The Address is missing. Please enter in the address shown on the Excerpt from the commercial register showing French address.",
          "error_code": 22219
        }
      ],
      "requirement_friendly_name": "Business Address (Proof of Address)",
      "requirement_name": "business_address_proof_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis)",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Document Number",
          "object_field": "document_number",
          "failure_reason": "The Document Number is missing. Please enter in the Document Number shown on the Excerpt from the commercial register (Extrait K-bis).",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Registration Number",
      "requirement_name": "business_reg_no_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Or, it does not match the First Name you entered within Business information. Please enter in the First Name shown on the Government-issued ID or make sure both First Name fields use the same exact inputs.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Or, it does not match the Last Name you entered within Business information. Please enter in the Last Name shown on the Government-issued ID or make sure both Last Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Authorized Representative",
      "requirement_name": "name_of_auth_rep_info"
    },
    {
      "friendly_name": "Executed Copy of Power of Attorney",
      "object_type": "power_of_attorney",
      "passed": false,
      "failure_reason": "An Executed Copy of Power of Attorney is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [],
      "requirement_friendly_name": "Power of Attorney",
      "requirement_name": "power_of_attorney_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing on the Governnment-Issued ID.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing on the Government-issued ID",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Person granted the Power of Attorney",
      "requirement_name": "name_in_power_of_attorney_info"
    }
  ]
}
```

---

## Retrieve a List of Evaluations

```
GET https://trusthub.twilio.com/v1/CustomerProfiles/{CustomerProfileSid}/Evaluations
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_sid` | SID\<BU\> | required | Not PII | The unique string that we created to identify the CustomerProfile resource. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: List Multiple Evaluations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_evaluations = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_evaluations.list(limit=20)

for record in customer_profiles_evaluations:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```
