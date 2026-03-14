# A2P 10DLC - BrandRegistrations resource

> **Warning:** This API reference page supplements the ISV API onboarding guides. Don't use this API resource without following the appropriate guide, or you might experience delays in registration and unintended fees.

A BrandRegistration resource represents an A2P 10DLC Brand. It is a "container" that holds all of the business details required by The Campaign Registry (TCR) to create an A2P 10DLC Brand.

## BrandRegistration Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<BN\> | Optional | Not PII | The unique string to identify Brand Registration. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the Brand Registration resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `customer_profile_bundle_sid` | SID\<BU\> | Optional | Not PII | A2P Messaging Profile Bundle BundleSid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `a2p_profile_bundle_sid` | SID\<BU\> | Optional | Not PII | A2P Messaging Profile Bundle BundleSid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `brand_type` | string | Optional | Not PII | Type of brand. One of: "STANDARD", "SOLE_PROPRIETOR". SOLE_PROPRIETOR is for the low volume, SOLE_PROPRIETOR campaign use case. There can only be one SOLE_PROPRIETOR campaign created per SOLE_PROPRIETOR brand. STANDARD is for all other campaign use cases. Multiple campaign use cases can be created per STANDARD brand. |
| `status` | enum\<string\> | Optional | Not PII | Brand Registration status. One of "PENDING", "APPROVED", "FAILED", "IN_REVIEW", "DELETION_PENDING", "DELETION_FAILED", "SUSPENDED". Possible values: `PENDING`, `APPROVED`, `FAILED`, `IN_REVIEW`, `DELETION_PENDING`, `DELETION_FAILED`, `SUSPENDED` |
| `tcr_id` | string | Optional | Not PII | Campaign Registry (TCR) Brand ID. Assigned only after successful brand registration. |
| `failure_reason` | string | Optional | Not PII | DEPRECATED. A reason why brand registration has failed. Only applicable when status is FAILED. |
| `errors` | array | Optional | Not PII | A list of errors that occurred during the brand registration process. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the Brand Registration resource. |
| `brand_score` | integer | Optional | Not PII | The secondary vetting score if it was done. Otherwise, it will be the brand score if it's returned from TCR. It may be null if no score is available. |
| `brand_feedback` | array[enum\<string\>] | Optional | Not PII | DEPRECATED. Feedback on how to improve brand score. Possible values: `TAX_ID`, `STOCK_SYMBOL`, `NONPROFIT`, `GOVERNMENT_ENTITY`, `OTHERS` |
| `identity_status` | enum\<string\> | Optional | Not PII | When a brand is registered, TCR will attempt to verify the identity of the brand based on the supplied information. Possible values: `SELF_DECLARED`, `UNVERIFIED`, `VERIFIED`, `VETTED_VERIFIED` |
| `russell_3000` | boolean | Optional | Not PII | Publicly traded company identified in the Russell 3000 Index |
| `government_entity` | boolean | Optional | Not PII | Identified as a government entity |
| `tax_exempt_status` | string | Optional | Not PII | Nonprofit organization tax-exempt status per section 501 of the U.S. tax code. |
| `skip_automatic_sec_vet` | boolean | Optional | Not PII | A flag to disable automatic secondary vetting for brands which it would otherwise be done. |
| `mock` | boolean | Optional | Not PII | A boolean that specifies whether brand should be a mock or not. If true, brand will be registered as a mock brand. Defaults to false if no value is provided. |
| `links` | object\<uri-map\> | Optional | Not PII | |

---

## Create a BrandRegistration

```
POST https://messaging.twilio.com/v1/a2p/BrandRegistrations
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `customer_profile_bundle_sid` | SID\<BU\> | required | Not PII | Customer Profile Bundle Sid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `a2p_profile_bundle_sid` | SID\<BU\> | required | Not PII | A2P Messaging Profile Bundle Sid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `brand_type` | string | Optional | Not PII | Type of brand being created. One of: "STANDARD", "SOLE_PROPRIETOR". SOLE_PROPRIETOR is for low volume, SOLE_PROPRIETOR use cases. STANDARD is for all other use cases. |
| `mock` | boolean | Optional | Not PII | A boolean that specifies whether brand should be a mock or not. If true, brand will be registered as a mock brand. Defaults to false if no value is provided. |
| `skip_automatic_sec_vet` | boolean | Optional | Not PII | A flag to disable automatic secondary vetting for brands which it would otherwise be done. |

The sample below shows how to create a BrandRegistration.

The `customer_profile_bundle_sid` is the SID associated with the Secondary Customer Profile. It starts with BU. You can see Secondary Customer Profile SIDs in the Console, or you can list CustomerProfiles via the TrustHub API. Be sure to use the correct Account SID and Auth Token for the request.

The `a2p_profile_bundle_sid` is the SID of the TrustProduct resource associated with the business. It also starts with BU. You can find the appropriate SID by using the TrustHub API to list all of an Account's TrustProducts. Be sure to use the correct Account SID and Auth Token for the request.

### Create a BrandRegistration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registration = client.messaging.v1.brand_registrations.create(
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(brand_registration.sid)
```

**Response:**

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2021-01-28T10:45:51Z",
  "date_updated": "2021-01-28T10:45:51Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": true,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "errors": [],
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

### Create a BrandRegistration and skip secondary vetting

The sample below shows an example of how to use the `skip_automatic_sec_vet` parameter when creating a new BrandRegistration. This is only for registering a Low Volume Standard Brand, 527 political organization, or political organization with a Campaign Verify token.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registration = client.messaging.v1.brand_registrations.create(
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    skip_automatic_sec_vet=True,
)

print(brand_registration.sid)
```

**Response:**

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2021-01-28T10:45:51Z",
  "date_updated": "2021-01-28T10:45:51Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": true,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": true,
  "errors": [],
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

---

## Retrieve a specific BrandRegistration

```
GET https://messaging.twilio.com/v1/a2p/BrandRegistrations/{Sid}
```

This request returns a specific BrandRegistration. You can use this request to check the status of the BrandRegistration.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<BN\> | required | Not PII | The SID of the Brand Registration resource to fetch. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Retrieve a BrandRegistration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registration = client.messaging.v1.brand_registrations(
    "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(brand_registration.sid)
```

**Response:**

```json
{
  "sid": "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "a2p_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": true,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "mock": false,
  "errors": [],
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

---

## Retrieve a list of BrandRegistrations

```
GET https://messaging.twilio.com/v1/a2p/BrandRegistrations
```

This request returns a list of an Account's BrandRegistrations. If working with subaccounts, be sure to use the appropriate Account SID and Auth Token when sending this request.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve a list of BrandRegistrations for an Account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registrations = client.messaging.v1.brand_registrations.list(limit=20)

for record in brand_registrations:
    print(record.sid)
```

**Response:**

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "data",
    "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations?PageSize=50&Page=0"
  },
  "data": [
    {
      "sid": "BN0044409f7e067e279523808d267e2d85",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "customer_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
      "a2p_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
      "date_created": "2021-01-27T14:18:35Z",
      "date_updated": "2021-01-27T14:18:36Z",
      "brand_type": "STANDARD",
      "status": "APPROVED",
      "tcr_id": "BXXXXXX",
      "failure_reason": "Registration error",
      "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
      "brand_score": 42,
      "brand_feedback": [
        "TAX_ID",
        "NONPROFIT"
      ],
      "identity_status": "VERIFIED",
      "russell_3000": true,
      "tax_exempt_status": "501c3",
      "government_entity": false,
      "skip_automatic_sec_vet": false,
      "errors": [],
      "mock": false,
      "links": {
        "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
        "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
      }
    }
  ]
}
```

---

## Update a BrandRegistration

```
POST https://messaging.twilio.com/v1/a2p/BrandRegistrations/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<BN\> | required | Not PII | The SID of the Brand Registration resource to update. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Update a BrandRegistration

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registrations = client.messaging.v1.brand_registrations(
    "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update()

print(brand_registrations.sid)
```

**Response:**

```json
{
  "sid": "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "a2p_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": false,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "errors": [],
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SmsOtp"
  }
}
```