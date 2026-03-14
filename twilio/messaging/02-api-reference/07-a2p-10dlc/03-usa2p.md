# A2P 10DLC - UsAppToPerson (Usa2p) resource

> **Warning:** This API reference page supplements the ISV API onboarding guides. Don't use this API resource without following the appropriate guide, or you might experience delays in registration and unintended fees.

A UsAppToPerson (Usa2p) resource represents an A2P 10DLC Campaign within a Messaging Service. This resource contains information about the Campaign such as message contents, opt-in and opt-out behavior, and the purpose of the messages.

This resource is part of the A2P 10DLC registration process and is intended only for use by Independent Software Vendors (ISVs).

Not an ISV? Check out the Standard and Low-Volume Brand Onboarding Guide or the Sole Proprietor Brand Onboarding Guide.

## Usa2p Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<QE\> | Optional | Not PII | The unique string that identifies a US A2P Compliance resource `QE2c6890da8086d771620e9b13fadeba0b`. Pattern: `^QE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that the Campaign belongs to. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `brand_registration_sid` | SID\<BN\> | Optional | Not PII | The unique string to identify the A2P brand. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `messaging_service_sid` | SID\<MG\> | Optional | Not PII | The SID of the Messaging Service that the resource is associated with. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `description` | string | Optional | Not PII | A short description of what this SMS campaign does. Min length: 40 characters. Max length: 4096 characters. |
| `message_samples` | array[string] | Optional | Not PII | An array of sample message strings, min two and max five. Min length for each sample: 20 chars. Max length for each sample: 1024 chars. |
| `us_app_to_person_usecase` | string | Optional | Not PII | A2P Campaign Use Case. Examples: [ 2FA, EMERGENCY, MARKETING, SOLE_PROPRIETOR...]. SOLE_PROPRIETOR campaign use cases can only be created by SOLE_PROPRIETOR Brands, and there can only be one SOLE_PROPRIETOR campaign created per SOLE_PROPRIETOR Brand. |
| `has_embedded_links` | boolean | Optional | Not PII | Indicate that this SMS campaign will send messages that contain links. |
| `has_embedded_phone` | boolean | Optional | Not PII | Indicates that this SMS campaign will send messages that contain phone numbers. |
| `subscriber_opt_in` | boolean | Optional | Not PII | A boolean that specifies whether campaign has Subscriber Optin or not. |
| `age_gated` | boolean | Optional | Not PII | A boolean that specifies whether campaign is age gated or not. |
| `direct_lending` | boolean | Optional | Not PII | A boolean that specifies whether campaign allows direct lending or not. |
| `campaign_status` | string | Optional | Not PII | Campaign status. Examples: IN_PROGRESS, VERIFIED, FAILED. |
| `campaign_id` | string | Optional | Not PII | The Campaign Registry (TCR) Campaign ID. |
| `is_externally_registered` | boolean | Optional | Not PII | Indicates whether the campaign was registered externally or not. |
| `rate_limits` | | Optional | Not PII | Rate limit and/or classification set by each carrier, Ex. AT&T or T-Mobile. |
| `message_flow` | string | Optional | Not PII | Details around how a consumer opts-in to their campaign, therefore giving consent to receive their messages. If multiple opt-in methods can be used for the same campaign, they must all be listed. 40 character minimum. 2048 character maximum. |
| `opt_in_message` | string | Optional | Not PII | If end users can text in a keyword to start receiving messages from this campaign, the auto-reply messages sent to the end users must be provided. The opt-in response should include the Brand name, confirmation of opt-in enrollment to a recurring message campaign, how to get help, and clear description of how to opt-out. This field is required if end users can text in a keyword to start receiving messages from this campaign. 20 character minimum. 320 character maximum. |
| `opt_out_message` | string | Optional | Not PII | Upon receiving the opt-out keywords from the end users, Twilio customers are expected to send back an auto-generated response, which must provide acknowledgment of the opt-out request and confirmation that no further messages will be sent. It is also recommended that these opt-out messages include the brand name. This field is required if managing opt out keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). 20 character minimum. 320 character maximum. |
| `help_message` | string | Optional | Not PII | When customers receive the help keywords from their end users, Twilio customers are expected to send back an auto-generated response; this may include the brand name and additional support contact information. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). 20 character minimum. 320 character maximum. |
| `opt_in_keywords` | array[string] | Optional | Not PII | If end users can text in a keyword to start receiving messages from this campaign, those keywords must be provided. This field is required if end users can text in a keyword to start receiving messages from this campaign. Values must be alphanumeric. 255 character maximum. |
| `opt_out_keywords` | array[string] | Optional | Not PII | End users should be able to text in a keyword to stop receiving messages from this campaign. Those keywords must be provided. This field is required if managing opt out keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. 255 character maximum. |
| `help_keywords` | array[string] | Optional | Not PII | End users should be able to text in a keyword to receive help. Those keywords must be provided as part of the campaign registration request. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. 255 character maximum. |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the US App to Person resource. |
| `mock` | boolean | Optional | Not PII | A boolean that specifies whether campaign is a mock or not. Mock campaigns will be automatically created if using a mock brand. Mock campaigns should only be used for testing purposes. |
| `errors` | array | Optional | Not PII | Details indicating why a campaign registration failed. These errors can indicate one or more fields that were incorrect or did not meet review requirements. |

---

## Create a Usa2p resource

```
POST https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/Compliance/Usa2p
```

This request creates a Usa2p resource, which represents an A2P 10DLC Campaign. Creating this resource submits the Campaign for review and incurs fees.

Learn more about the formats and contents of each parameter in the Gather the Required Business Information doc.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_api_version` | string | Optional | Not PII | The version of the Messaging API to use for this request |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Messaging Service to create the resources from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `brand_registration_sid` | SID\<BN\> | required | Not PII | A2P Brand Registration SID. Pattern: `^BN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `description` | string | required | Not PII | A short description of what this SMS campaign does. Min length: 40 characters. Max length: 4096 characters. |
| `message_flow` | string | required | Not PII | Required for all Campaigns. Details around how a consumer opts-in to their campaign, therefore giving consent to receive their messages. If multiple opt-in methods can be used for the same campaign, they must all be listed. 40 character minimum. 2048 character maximum. |
| `message_samples` | array[string] | required | Not PII | An array of sample message strings, min two and max five. Min length for each sample: 20 chars. Max length for each sample: 1024 chars. |
| `us_app_to_person_usecase` | string | required | Not PII | A2P Campaign Use Case. Examples: [ 2FA, EMERGENCY, MARKETING..] |
| `has_embedded_links` | boolean | required | Not PII | Indicates that this SMS campaign will send messages that contain links. |
| `has_embedded_phone` | boolean | required | Not PII | Indicates that this SMS campaign will send messages that contain phone numbers. |
| `opt_in_message` | string | Optional | Not PII | If end users can text in a keyword to start receiving messages from this campaign, the auto-reply messages sent to the end users must be provided. The opt-in response should include the Brand name, confirmation of opt-in enrollment to a recurring message campaign, how to get help, and clear description of how to opt-out. This field is required if end users can text in a keyword to start receiving messages from this campaign. 20 character minimum. 320 character maximum. |
| `opt_out_message` | string | Optional | Not PII | Upon receiving the opt-out keywords from the end users, Twilio customers are expected to send back an auto-generated response, which must provide acknowledgment of the opt-out request and confirmation that no further messages will be sent. It is also recommended that these opt-out messages include the brand name. This field is required if managing opt out keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). 20 character minimum. 320 character maximum. |
| `help_message` | string | Optional | Not PII | When customers receive the help keywords from their end users, Twilio customers are expected to send back an auto-generated response; this may include the brand name and additional support contact information. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). 20 character minimum. 320 character maximum. |
| `opt_in_keywords` | array[string] | Optional | Not PII | If end users can text in a keyword to start receiving messages from this campaign, those keywords must be provided. This field is required if end users can text in a keyword to start receiving messages from this campaign. Values must be alphanumeric. 255 character maximum. |
| `opt_out_keywords` | array[string] | Optional | Not PII | End users should be able to text in a keyword to stop receiving messages from this campaign. Those keywords must be provided. This field is required if managing opt out keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. 255 character maximum. |
| `help_keywords` | array[string] | Optional | Not PII | End users should be able to text in a keyword to receive help. Those keywords must be provided as part of the campaign registration request. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. 255 character maximum. |
| `subscriber_opt_in` | boolean | Optional | Not PII | A boolean that specifies whether campaign has Subscriber Optin or not. |
| `age_gated` | boolean | Optional | Not PII | A boolean that specifies whether campaign is age gated or not. |
| `direct_lending` | boolean | Optional | Not PII | A boolean that specifies whether campaign allows direct lending or not. |
| `privacy_policy_url` | string\<uri\> | Optional | Not PII | The URL of the privacy policy for the campaign. |
| `terms_and_conditions_url` | string\<uri\> | Optional | Not PII | The URL of the terms and conditions for the campaign. |

> **Info:** If you use Twilio's default opt-out or advanced opt-out, you do not need to submit opt-out and help keywords and messages when creating a Campaign. Twilio will automatically complete those fields for you with the default or your advanced opt-out and help messaging.
>
> If you manage opt-out and help yourself, you must pass the opt-out and help parameters when creating a Campaign.

### Create a Usa2p resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).us_app_to_person.create(
    message_samples=[
        "EXPRESS: Denim Days Event is ON. Reply STOP to unsubscribe.",
        "LAST CHANCE: Book your next flight for just 1 (ONE) EUR",
    ],
    message_flow="End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Additionally, end users can also opt-in by texting START to (111) 222-3333 to opt in. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
    brand_registration_sid="BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    description="Description",
    us_app_to_person_usecase="UsAppToPersonUsecase",
    has_embedded_links=False,
    has_embedded_phone=False,
)

print(us_app_to_person.brand_registration_sid)
```

---

## Retrieve a Usa2p resource

```
GET https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/Compliance/Usa2p/{Sid}
```

This request returns a Usa2p resource. The Usa2p resource represents an A2P 10DLC Campaign.

The value of Sid is always the US A2P Compliance resource identifier: `QE2c6890da8086d771620e9b13fadeba0b`.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_api_version` | string | Optional | Not PII | The version of the Messaging API to use for this request |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Messaging Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<QE\> | required | Not PII | The SID of the US A2P Compliance resource to fetch `QE2c6890da8086d771620e9b13fadeba0b`. Pattern: `^QE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Retrieve a US A2P Campaign

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = (
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .us_app_to_person("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(us_app_to_person.brand_registration_sid)
```

You can use this request to check the `campaign_status` of the Campaign represented by this Usa2p resource. Possible statuses are listed below:

- **PENDING** - The Campaign has not yet been viewed by TCR.
- **IN_PROGRESS** - TCR has begun the review process for the Campaign.
- **FAILED** - The Campaign has failed the verification process.
- **VERIFIED** - TCR has approved the Campaign.

If `campaign_status` is FAILED, the `errors` property of the Usa2p resource is populated with a list of reasons why the Campaign was not approved. See the Troubleshooting Campaigns guide for more information.

---

## Retrieve a list of Usa2p resources

```
GET https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/Compliance/Usa2p
```

This request retrieves all Usa2p resources associated with a specific Messaging Service.

### Headers

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `x_twilio_api_version` | string | Optional | Not PII | The version of the Messaging API to use for this request |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Messaging Service to fetch the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Retrieve a list of Usa2p resources for a Messaging Service

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_people = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).us_app_to_person.list(limit=20)

for record in us_app_to_people:
    print(record.brand_registration_sid)
```

**Response:**

```json
{
  "compliance": [
    {
      "sid": "QE2c6890da8086d771620e9b13fadeba0b",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "brand_registration_sid": "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "description": "Send marketing messages about sales to opted in customers.",
      "message_samples": [
        "EXPRESS: Denim Days Event is ON",
        "LAST CHANCE: Book your next flight for just 1 (ONE) EUR"
      ],
      "us_app_to_person_usecase": "MARKETING",
      "has_embedded_links": true,
      "has_embedded_phone": false,
      "subscriber_opt_in": true,
      "age_gated": false,
      "direct_lending": false,
      "campaign_status": "PENDING",
      "campaign_id": "CFOOBAR",
      "is_externally_registered": false,
      "rate_limits": {
        "att": {
          "mps": 600,
          "msg_class": "A"
        },
        "tmobile": {
          "brand_tier": "TOP"
        }
      },
      "message_flow": "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Additionally, end users can also opt-in by texting START to (111) 222-3333 to opt in.",
      "opt_in_message": "Acme Corporation: You are now opted-in. For help, reply HELP. To opt-out, reply STOP",
      "opt_out_message": "You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.",
      "help_message": "Acme Corporation: Please visit www.example.com to get support. To opt-out, reply STOP.",
      "opt_in_keywords": [
        "START"
      ],
      "opt_out_keywords": [
        "STOP"
      ],
      "help_keywords": [
        "HELP"
      ],
      "date_created": "2021-02-18T14:48:52Z",
      "date_updated": "2021-02-18T14:48:52Z",
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/QE2c6890da8086d771620e9b13fadeba0b",
      "mock": false,
      "errors": []
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p?PageSize=20&Page=0",
    "key": "compliance"
  }
}
```

---

## Delete a Usa2p resource

```
DELETE https://messaging.twilio.com/v1/Services/{MessagingServiceSid}/Compliance/Usa2p/{Sid}
```

This request deletes a Usa2p resource.

> **Danger:** Deleting an approved Usa2p resource blocks all A2P 10DLC messaging from the Messaging Service.
>
> You must create a new Usa2p resource and wait for the associated Campaign to be approved by TCR in order to send A2P 10DLC messages from the Messaging Service again. This can take several days.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `messaging_service_sid` | SID\<MG\> | required | Not PII | The SID of the Messaging Service to delete the resource from. Pattern: `^MG[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `sid` | SID\<QE\> | required | Not PII | The SID of the US A2P Compliance resource to delete `QE2c6890da8086d771620e9b13fadeba0b`. Pattern: `^QE[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

The value of Sid is always the US A2P Compliance resource identifier: `QE2c6890da8086d771620e9b13fadeba0b`.

### Delete a Usa2p resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).us_app_to_person("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```