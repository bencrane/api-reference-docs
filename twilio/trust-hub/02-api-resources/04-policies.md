# Policies Resource

## Policy Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RN> | Optional | Not PII | The unique string that identifies the Policy resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | Not PII | A human-readable description that is assigned to describe the Policy resource. Examples can include Primary Customer profile policy |
| requirements | object | Optional | Not PII | The SID of an object that holds the policy information |
| url | string<uri> | Optional | Not PII | The absolute URL of the Policy resource. |

---

## Fetch one Policy resource

```
GET https://trusthub.twilio.com/v1/Policies/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<RN> | required | Not PII | The unique string that identifies the Policy resource. Pattern: `^RN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch one Policy resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

policy = client.trusthub.v1.policies(
    "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(policy.sid)
```

### Response

```json
{
  "url": "https://trusthub.twilio.com/v1/Policies/RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "requirements": {
    "end_user": [
      {
        "url": "/EndUserTypes/customer_profile_business_information",
        "fields": [
          "business_type",
          "business_registration_number",
          "business_name",
          "business_registration_identifier",
          "business_identity",
          "business_industry",
          "website_url",
          "business_regions_of_operation",
          "social_media_profile_urls"
        ],
        "type": "customer_profile_business_information",
        "name": "Business Information",
        "requirement_name": "customer_profile_business_information"
      },
      {
        "url": "/EndUserTypes/authorized_representative_1",
        "fields": [
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "business_title",
          "job_position"
        ],
        "type": "authorized_representative_1",
        "name": "Authorized Representative 1",
        "requirement_name": "authorized_representative_1"
      },
      {
        "url": "/EndUserTypes/authorized_representative_2",
        "fields": [
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "business_title",
          "job_position"
        ],
        "type": "authorized_representative_2",
        "name": "Authorized Representative 2",
        "requirement_name": "authorized_representative_2"
      }
    ],
    "supporting_trust_products": [],
    "supporting_document": [
      [
        {
          "description": "Customer Profile HQ Physical Address",
          "type": "document",
          "name": "Physical Business Address",
          "accepted_documents": [
            {
              "url": "/SupportingDocumentTypes/customer_profile_address",
              "fields": [
                "address_sids"
              ],
              "type": "customer_profile_address",
              "name": "Physical Business Address"
            }
          ],
          "requirement_name": "customer_profile_address"
        }
      ]
    ],
    "supporting_customer_profiles": []
  },
  "friendly_name": "Primary Customer Profile of type Business",
  "sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Retrieve multiple Policy resources

```
GET https://trusthub.twilio.com/v1/Policies
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve multiple Policy resources

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

policies = client.trusthub.v1.policies.list(limit=20)

for record in policies:
    print(record.sid)
```

### Response

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/Policies?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/Policies?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```