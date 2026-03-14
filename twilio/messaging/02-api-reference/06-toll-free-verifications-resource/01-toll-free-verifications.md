# Toll-free verification resource

The Verification resource records your request to verify a toll-free number to comply with US and Canadian federal regulations for SMS messaging. The verification process is called toll-free verification (TFV).

Toll-free phone numbers for the US and Canada use the North American Numbering Plan (NANP). NANP toll-free numbers begin with 800, 888, 877, 866, 855, 844, or 833. To use these numbers to send SMS messages, your organization must comply with federal regulations. For the toll-free number to be compliant, provide data on how you plan to use your phone number to send texts.

To verify that a toll-free number meets these regulations, use this resource. To learn how to use this resource, see Get started with toll-free verification using the API.

## Verification Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<HH\> | Optional | Not PII | The unique string to identify Tollfree Verification. Pattern: `^HH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The SID of the Account that created the Tollfree Verification resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `customer_profile_sid` | SID\<BU\> | Optional | Not PII | Customer's Profile Bundle BundleSid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `trust_product_sid` | SID\<BU\> | Optional | Not PII | Tollfree TrustProduct Bundle BundleSid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `date_created` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was created specified in ISO 8601 format. |
| `date_updated` | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in ISO 8601 format. |
| `regulated_item_sid` | SID\<RA\> | Optional | Not PII | The SID of the Regulated Item. Pattern: `^RA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `business_name` | string | Optional | Not PII | The name of the business or organization using the Tollfree number. |
| `business_street_address` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_street_address2` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_city` | string | Optional | Not PII | The city of the business or organization using the Tollfree number. |
| `business_state_province_region` | string | Optional | Not PII | The state/province/region of the business or organization using the Tollfree number. |
| `business_postal_code` | string | Optional | Not PII | The postal code of the business or organization using the Tollfree number. |
| `business_country` | string | Optional | Not PII | The country of the business or organization using the Tollfree number. |
| `business_website` | string | Optional | Not PII | The website of the business or organization using the Tollfree number. |
| `business_contact_first_name` | string | Optional | Not PII | The first name of the contact for the business or organization using the Tollfree number. |
| `business_contact_last_name` | string | Optional | Not PII | The last name of the contact for the business or organization using the Tollfree number. |
| `business_contact_email` | string | Optional | Not PII | The email address of the contact for the business or organization using the Tollfree number. |
| `business_contact_phone` | string\<phone-number\> | Optional | Not PII | The E.164 formatted phone number of the contact for the business or organization using the Tollfree number. |
| `notification_email` | string | Optional | Not PII | The email address to receive the notification about the verification result. |
| `use_case_categories` | array[enum\<string\>] | Optional | Not PII | The category of the use case for the Tollfree Number. List as many as are applicable. Possible values: `TWO_FACTOR_AUTHENTICATION`, `ACCOUNT_NOTIFICATIONS`, `CUSTOMER_CARE`, `CHARITY_NONPROFIT`, `DELIVERY_NOTIFICATIONS`, `FRAUD_ALERT_MESSAGING`, `EVENTS`, `HIGHER_EDUCATION`, `K12`, `MARKETING`, `POLLING_AND_VOTING_NON_POLITICAL`, `POLITICAL_ELECTION_CAMPAIGNS`, `PUBLIC_SERVICE_ANNOUNCEMENT`, `SECURITY_ALERT` |
| `use_case_summary` | string | Optional | Not PII | Use this to further explain how messaging is used by the business or organization. |
| `production_message_sample` | string | Optional | Not PII | An example of message content, i.e. a sample message. |
| `opt_in_image_urls` | array[string] | Optional | Not PII | Link to an image that shows the opt-in workflow. Multiple images allowed and must be a publicly hosted URL. |
| `opt_in_type` | enum\<string\> | Optional | Not PII | Describe how a user opts-in to text messages. Possible values: `VERBAL`, `WEB_FORM`, `PAPER_FORM`, `VIA_TEXT`, `MOBILE_QR_CODE`, `IMPORT`, `IMPORT_PLEASE_REPLACE` |
| `message_volume` | string | Optional | Not PII | Estimate monthly volume of messages from the Tollfree Number. |
| `additional_information` | string | Optional | Not PII | Additional information to be provided for verification. |
| `tollfree_phone_number_sid` | SID\<PN\> | Optional | Not PII | The SID of the Phone Number associated with the Tollfree Verification. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `tollfree_phone_number` | string\<phone-number\> | Optional | Not PII | The E.164 formatted toll-free phone number associated with the verification. |
| `status` | enum\<string\> | Optional | Not PII | The compliance status of the Tollfree Verification record. Possible values: `PENDING_REVIEW`, `IN_REVIEW`, `TWILIO_APPROVED`, `TWILIO_REJECTED` |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the Tollfree Verification resource. |
| `rejection_reason` | string | Optional | Not PII | The rejection reason given when a Tollfree Verification has been rejected. |
| `error_code` | integer | Optional | Not PII | The error code given when a Tollfree Verification has been rejected. |
| `edit_expiration` | string\<date-time\> | Optional | Not PII | The date and time when the ability to edit a rejected verification expires. |
| `edit_allowed` | boolean | Optional | Not PII | If a rejected verification is allowed to be edited/resubmitted. Some rejection reasons allow editing and some do not. |
| `business_registration_number` | string | Optional | Not PII | A legally recognized business registration number |
| `business_registration_authority` | enum\<string\> | Optional | Not PII | The organizational authority for business registrations. Required for all business types except SOLE_PROPRIETOR. Possible values: `EIN`, `CBN`, `CRN`, `PROVINCIAL_NUMBER`, `VAT`, `ACN`, `ABN`, `BRN`, `SIREN`, `SIRET`, `NZBN`, `USt-IdNr`, `CIF`, `NIF`, `CNPJ`, `UID`, `NEQ`, `OTHER` |
| `business_registration_country` | string | Optional | Not PII | Country business is registered in |
| `business_type` | enum\<string\> | Optional | Not PII | The type of business, valid values are PRIVATE_PROFIT, PUBLIC_PROFIT, NON_PROFIT, SOLE_PROPRIETOR, GOVERNMENT. Required field. Possible values: `PRIVATE_PROFIT`, `PUBLIC_PROFIT`, `SOLE_PROPRIETOR`, `NON_PROFIT`, `GOVERNMENT` |
| `business_registration_phone_number` | string | Optional | Not PII | The E.164 formatted number associated with the business. |
| `doing_business_as` | string | Optional | Not PII | Trade name, sub entity, or downstream business name of business being submitted for verification |
| `opt_in_confirmation_message` | string | Optional | Not PII | The confirmation message sent to users when they opt in to receive messages. |
| `help_message_sample` | string | Optional | Not PII | A sample help message provided to users. |
| `privacy_policy_url` | string\<uri\> | Optional | Not PII | The URL to the privacy policy for the business or organization. |
| `terms_and_conditions_url` | string\<uri\> | Optional | Not PII | The URL of the terms and conditions for the business or organization. |
| `age_gated_content` | boolean | Optional | Not PII | Indicates if the content is age gated. |
| `opt_in_keywords` | array[string] | Optional | Not PII | List of keywords that users can send to opt in or out of messages. |
| `rejection_reasons` | array | Optional | Not PII | A list of rejection reasons and codes describing why a Tollfree Verification has been rejected. |
| `resource_links` | | Optional | Not PII | The URLs of the documents associated with the Tollfree Verification resource. |
| `external_reference_id` | string | Optional | Not PII | An optional external reference ID supplied by customer and echoed back on status retrieval. |
| `vetting_id` | string | Optional | Not PII | Max length: 500 |
| `vetting_provider` | enum\<string\> | Optional | Not PII | The third-party political vetting provider. Possible values: `CAMPAIGN_VERIFY` |
| `vetting_id_expiration` | string\<date-time\> | Optional | Not PII | |

## Allowed enum values

The following tables list the allowed values for enum fields used in TFV requests.

### UseCaseCategories

An array field. List as many categories as applicable.

| Value | Description |
|-------|-------------|
| `TWO_FACTOR_AUTHENTICATION` | Two-factor authentication |
| `ACCOUNT_NOTIFICATIONS` | Account notifications |
| `CUSTOMER_CARE` | Customer care |
| `CHARITY_NONPROFIT` | Charity / nonprofit |
| `DELIVERY_NOTIFICATIONS` | Delivery notifications |
| `FRAUD_ALERT_MESSAGING` | Fraud alert messaging |
| `EVENTS` | Events |
| `HIGHER_EDUCATION` | Higher education |
| `K12` | K-12 education |
| `MARKETING` | Marketing |
| `POLLING_AND_VOTING_NON_POLITICAL` | Polling and voting (non-political) |
| `POLITICAL_ELECTION_CAMPAIGNS` | Political election campaigns |
| `PUBLIC_SERVICE_ANNOUNCEMENT` | Public service announcement |
| `SECURITY_ALERT` | Security alert |

### BusinessRegistrationAuthority

| Value | Description |
|-------|-------------|
| `EIN` | Employer Identification Number (US) |
| `CBN` | Canadian Business Number (Canada) |
| `CRN` | Company Registration Number |
| `PROVINCIAL_NUMBER` | Provincial Number (Canada) |
| `VAT` | Value Added Tax Number |
| `ACN` | Australian Company Number |
| `ABN` | Australian Business Number |
| `BRN` | Business Registration Number (Hong Kong) |
| `SIREN` | Systeme d'Identification du Repertoire des Entreprises (France) |
| `SIRET` | Systeme d'Identification du Repertoire des Etablissements (France) |
| `NZBN` | New Zealand Business Number |
| `USt-IdNr` | Umsatzsteuer-Identifikationsnummer (Germany) |
| `CIF` | Certificado de Identificacion Fiscal (Spain) |
| `NIF` | Numero de Identificacion Fiscal (Spain/Portugal) |
| `CNPJ` | Cadastro Nacional da Pessoa Juridica (Brazil) |
| `UID` | Unternehmens-Identifikationsnummer (Switzerland/Austria) |
| `NEQ` | Numero d'entreprise du Quebec (Quebec, Canada) |
| `OTHER` | Other |

### MessageVolume

Estimated monthly volume of messages.

| Value |
|-------|
| 10 |
| 100 |
| 1,000 |
| 10,000 |
| 100,000 |
| 250,000 |
| 500,000 |
| 750,000 |
| 1,000,000 |
| 5,000,000 |
| 10,000,000+ |

---

## Submit a TFV request

```
POST https://messaging.twilio.com/v1/Tollfree/Verifications
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `business_name` | string | required | Not PII | The name of the business or organization using the Tollfree number. |
| `business_website` | string | required | Not PII | The website of the business or organization using the Tollfree number. |
| `notification_email` | string | required | Not PII | The email address to receive the notification about the verification result. |
| `use_case_categories` | array[enum\<string\>] | required | Not PII | The category of the use case for the Tollfree Number. List as many as are applicable. |
| `use_case_summary` | string | required | Not PII | Use this to further explain how messaging is used by the business or organization. |
| `production_message_sample` | string | required | Not PII | An example of message content, i.e. a sample message. |
| `opt_in_image_urls` | array[string] | required | Not PII | Link to an image that shows the opt-in workflow. Multiple images allowed and must be a publicly hosted URL. |
| `opt_in_type` | enum\<string\> | required | Not PII | Describe how a user opts-in to text messages. Possible values: `VERBAL`, `WEB_FORM`, `PAPER_FORM`, `VIA_TEXT`, `MOBILE_QR_CODE`, `IMPORT`, `IMPORT_PLEASE_REPLACE` |
| `message_volume` | string | required | Not PII | Estimate monthly volume of messages from the Tollfree Number. |
| `tollfree_phone_number_sid` | SID\<PN\> | required | Not PII | The SID of the Phone Number associated with the Tollfree Verification. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `customer_profile_sid` | SID\<BU\> | Optional | Not PII | Customer's Profile Bundle BundleSid. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `business_street_address` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_street_address2` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_city` | string | Optional | Not PII | The city of the business or organization using the Tollfree number. |
| `business_state_province_region` | string | Optional | Not PII | The state/province/region of the business or organization using the Tollfree number. |
| `business_postal_code` | string | Optional | Not PII | The postal code of the business or organization using the Tollfree number. |
| `business_country` | string | Optional | Not PII | The country of the business or organization using the Tollfree number. |
| `additional_information` | string | Optional | Not PII | Additional information to be provided for verification. |
| `business_contact_first_name` | string | Optional | Not PII | The first name of the contact for the business or organization using the Tollfree number. |
| `business_contact_last_name` | string | Optional | Not PII | The last name of the contact for the business or organization using the Tollfree number. |
| `business_contact_email` | string | Optional | Not PII | The email address of the contact for the business or organization using the Tollfree number. |
| `business_contact_phone` | string\<phone-number\> | Optional | Not PII | The E.164 formatted phone number of the contact for the business or organization using the Tollfree number. |
| `external_reference_id` | string | Optional | Not PII | An optional external reference ID supplied by customer and echoed back on status retrieval. |
| `business_registration_number` | string | Optional | Not PII | A legally recognized business registration number. Required for all business types except SOLE_PROPRIETOR. |
| `business_registration_authority` | enum\<string\> | Optional | Not PII | The organizational authority for business registrations. Required for all business types except SOLE_PROPRIETOR. |
| `business_registration_country` | string | Optional | Not PII | The country where the business is registered. Required for all business types except SOLE_PROPRIETOR. |
| `business_type` | enum\<string\> | Optional | Not PII | The type of business, valid values are PRIVATE_PROFIT, PUBLIC_PROFIT, NON_PROFIT, SOLE_PROPRIETOR, GOVERNMENT. Required field. |
| `business_registration_phone_number` | string | Optional | Not PII | The E.164 formatted number associated with the business. |
| `doing_business_as` | string | Optional | Not PII | Trade name, sub entity, or downstream business name of business being submitted for verification |
| `opt_in_confirmation_message` | string | Optional | Not PII | The confirmation message sent to users when they opt in to receive messages. |
| `help_message_sample` | string | Optional | Not PII | A sample help message provided to users. |
| `privacy_policy_url` | string | Optional | Not PII | The URL to the privacy policy for the business or organization. |
| `terms_and_conditions_url` | string | Optional | Not PII | The URL to the terms and conditions for the business or organization. |
| `age_gated_content` | boolean | Optional | Not PII | Indicates if the content is age gated. |
| `opt_in_keywords` | array[string] | Optional | Not PII | List of keywords that users can text in to opt in to receive messages. |
| `vetting_provider` | enum\<string\> | Optional | Not PII | The third-party political vetting provider. Possible values: `CAMPAIGN_VERIFY` |
| `vetting_id` | string | Optional | Not PII | The unique ID of the vetting |

Submitting a TFV request requires a Trust Hub Customer Profile.

### Submit a TFV request with an existing Customer Profile

If you have a Customer Profile, the following API request submits one TFV request associated with your Customer Profile SID.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications.create(
    customer_profile_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    business_name="Owl, Inc.",
    business_website="http://www.example.com",
    notification_email="support@example.com",
    use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
    use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
    production_message_sample="lorem ipsum",
    opt_in_image_urls=[
        "https://example.com/images/image1.jpg",
        "https://example.com/images/image2.jpg",
    ],
    opt_in_type="VERBAL",
    message_volume="10",
    additional_information="see our privacy policy here www.example.com/privacypolicy",
    tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    external_reference_id="abc123xyz567",
)

print(tollfree_verification.sid)
```

**Response:**

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": null,
  "trust_product_sid": null,
  "business_name": "Owl, Inc.",
  "status": "PENDING_REVIEW",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.example.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@company.com",
  "business_contact_phone": "+11231231234",
  "notification_email": "support@example.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
  "production_message_sample": "lorem ipsum",
  "opt_in_image_urls": [
    "https://example.com/images/image1.jpg",
    "https://example.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "10",
  "additional_information": "see our privacy policy here www.example.com/privacypolicy",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {},
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": "abc123xyz567",
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "business_type": "PRIVATE_PROFIT",
  "business_registration_phone_number": "+13023334444",
  "doing_business_as": "Toms Widgets",
  "age_gated_content": false,
  "help_message_sample": "For help, reply HELP or visit our website.",
  "opt_in_confirmation_message": "Thank you for opting in!",
  "opt_in_keywords": [
    "START"
  ],
  "privacy_policy_url": "https://www.example.com/privacy",
  "terms_and_conditions_url": "https://www.example.com/terms",
  "tollfree_phone_number": "+18003334444",
  "vetting_id": null,
  "vetting_id_expiration": null,
  "vetting_provider": null
}
```

### Submit a TFV request without an existing Customer Profile

If you don't have a Trust Hub Customer Profile, the following API request creates a Customer Profile and submits one TFV request for that profile.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications.create(
    business_name="Owl, Inc.",
    business_street_address="123 Main Street",
    business_street_address2="Suite 101",
    business_city="Anytown",
    business_state_province_region="AA",
    business_postal_code="11111",
    business_country="US",
    business_website="http://www.example.com",
    business_contact_first_name="firstname",
    business_contact_last_name="lastname",
    business_contact_email="email@example.com",
    business_contact_phone="+1231231234",
    notification_email="support@example.com",
    use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
    use_case_summary="This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop",
    production_message_sample="lorem ipsum",
    opt_in_image_urls=[
        "https://example.com/images/image1.jpg",
        "https://example.com/images/image2.jpg",
    ],
    opt_in_type="VERBAL",
    message_volume="10",
    additional_information="see our privacy policy here www.example.com/privacypolicy",
    tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    external_reference_id="abc123xyz567",
)

print(tollfree_verification.sid)
```

**Response:**

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": null,
  "customer_profile_sid": null,
  "trust_product_sid": null,
  "status": "PENDING_REVIEW",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_name": "Owl, Inc.",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.example.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@example.com",
  "business_contact_phone": "+1231231234",
  "notification_email": "support@example.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop",
  "production_message_sample": "lorem ipsum",
  "opt_in_image_urls": [
    "https://example.com/images/image1.jpg",
    "https://example.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "10",
  "additional_information": "see our privacy policy here www.example.com/privacypolicy",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {},
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": "abc123xyz567",
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "business_type": "PRIVATE_PROFIT",
  "business_registration_phone_number": "+13023334444",
  "doing_business_as": "Toms Widgets",
  "age_gated_content": false,
  "help_message_sample": "For help, reply HELP or visit our website.",
  "opt_in_confirmation_message": "Thank you for opting in!",
  "opt_in_keywords": [
    "START"
  ],
  "privacy_policy_url": "https://www.example.com/privacy",
  "terms_and_conditions_url": "https://www.example.com/terms",
  "tollfree_phone_number": "+18003334444",
  "vetting_id": null,
  "vetting_id_expiration": null,
  "vetting_provider": null
}
```

---

## Retrieve a TFV request

```
GET https://messaging.twilio.com/v1/Tollfree/Verifications/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<HH\> | required | Not PII | A unique string identifying a Tollfree Verification. Pattern: `^HH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Retrieve a TFV request

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(tollfree_verification.sid)
```

**Response:**

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_name": "Owl, Inc.",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.company.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@company.com",
  "business_contact_phone": "+11231231234",
  "notification_email": "support@company.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop",
  "production_message_sample": "lorem ipsum",
  "opt_in_image_urls": [
    "https://testbusiness.com/images/image1.jpg",
    "https://testbusiness.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "2000",
  "additional_information": "see our privacy policy here www.johnscoffeeshop.com/privacypolicy",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "TWILIO_APPROVED",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {
    "customer_profile": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "trust_product": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": "abc123xyz567",
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "business_type": "PRIVATE_PROFIT",
  "business_registration_phone_number": "+13023334444",
  "doing_business_as": "Toms Widgets",
  "age_gated_content": false,
  "help_message_sample": "For help, reply HELP or visit our website.",
  "opt_in_confirmation_message": "Thank you for opting in!",
  "opt_in_keywords": [
    "START"
  ],
  "privacy_policy_url": "https://www.example.com/privacy",
  "terms_and_conditions_url": "https://www.example.com/terms",
  "tollfree_phone_number": "+18003334444",
  "vetting_id": null,
  "vetting_id_expiration": null,
  "vetting_provider": null
}
```

---

## Retrieve a list of TFV requests

```
GET https://messaging.twilio.com/v1/Tollfree/Verifications
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `tollfree_phone_number_sid` | SID\<PN\> | Optional | Not PII | The SID of the Phone Number associated with the Tollfree Verification. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `status` | enum\<string\> | Optional | Not PII | The compliance status of the Tollfree Verification record. Possible values: `PENDING_REVIEW`, `IN_REVIEW`, `TWILIO_APPROVED`, `TWILIO_REJECTED` |
| `external_reference_id` | string | Optional | Not PII | Customer supplied reference id for the Tollfree Verification record. |
| `include_sub_accounts` | boolean | Optional | Not PII | Whether to include Tollfree Verifications from sub accounts in list response. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |
| `trust_product_sid` | array[string] | Optional | Not PII | The trust product sids / tollfree bundle sids of tollfree verifications |

### Retrieve a list of TFV requests

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(tollfree_verification.sid)
```

---

## Update a TFV request

```
POST https://messaging.twilio.com/v1/Tollfree/Verifications/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<HH\> | required | Not PII | The unique string to identify Tollfree Verification. Pattern: `^HH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `business_name` | string | Optional | Not PII | The name of the business or organization using the Tollfree number. |
| `business_website` | string | Optional | Not PII | The website of the business or organization using the Tollfree number. |
| `notification_email` | string | Optional | Not PII | The email address to receive the notification about the verification result. |
| `use_case_categories` | array[enum\<string\>] | Optional | Not PII | The category of the use case for the Tollfree Number. List as many as are applicable. |
| `use_case_summary` | string | Optional | Not PII | Use this to further explain how messaging is used by the business or organization. |
| `production_message_sample` | string | Optional | Not PII | An example of message content, i.e. a sample message. |
| `opt_in_image_urls` | array[string] | Optional | Not PII | Link to an image that shows the opt-in workflow. Multiple images allowed and must be a publicly hosted URL. |
| `opt_in_type` | enum\<string\> | Optional | Not PII | Describe how a user opts-in to text messages. Possible values: `VERBAL`, `WEB_FORM`, `PAPER_FORM`, `VIA_TEXT`, `MOBILE_QR_CODE`, `IMPORT`, `IMPORT_PLEASE_REPLACE` |
| `message_volume` | string | Optional | Not PII | Estimate monthly volume of messages from the Tollfree Number. |
| `business_street_address` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_street_address2` | string | Optional | Not PII | The address of the business or organization using the Tollfree number. |
| `business_city` | string | Optional | Not PII | The city of the business or organization using the Tollfree number. |
| `business_state_province_region` | string | Optional | Not PII | The state/province/region of the business or organization using the Tollfree number. |
| `business_postal_code` | string | Optional | Not PII | The postal code of the business or organization using the Tollfree number. |
| `business_country` | string | Optional | Not PII | The country of the business or organization using the Tollfree number. |
| `additional_information` | string | Optional | Not PII | Additional information to be provided for verification. |
| `business_contact_first_name` | string | Optional | Not PII | The first name of the contact for the business or organization using the Tollfree number. |
| `business_contact_last_name` | string | Optional | Not PII | The last name of the contact for the business or organization using the Tollfree number. |
| `business_contact_email` | string | Optional | Not PII | The email address of the contact for the business or organization using the Tollfree number. |
| `business_contact_phone` | string\<phone-number\> | Optional | Not PII | The E.164 formatted phone number of the contact for the business or organization using the Tollfree number. |
| `edit_reason` | string | Optional | Not PII | Describe why the verification is being edited. If the verification was rejected because of a technical issue, such as the website being down, and the issue has been resolved this parameter should be set to something similar to 'Website fixed'. |
| `business_registration_number` | string | Optional | Not PII | A legally recognized business registration number |
| `business_registration_authority` | enum\<string\> | Optional | Not PII | The organizational authority for business registrations. Required for all business types except SOLE_PROPRIETOR. |
| `business_registration_country` | string | Optional | Not PII | Country business is registered in |
| `business_type` | enum\<string\> | Optional | Not PII | The type of business, valid values are PRIVATE_PROFIT, PUBLIC_PROFIT, NON_PROFIT, SOLE_PROPRIETOR, GOVERNMENT. Required field. |
| `business_registration_phone_number` | string | Optional | Not PII | The E.164 formatted number associated with the business. |
| `doing_business_as` | string | Optional | Not PII | Trade name, sub entity, or downstream business name of business being submitted for verification |
| `opt_in_confirmation_message` | string | Optional | Not PII | The confirmation message sent to users when they opt in to receive messages. |
| `help_message_sample` | string | Optional | Not PII | A sample help message provided to users. |
| `privacy_policy_url` | string | Optional | Not PII | The URL to the privacy policy for the business or organization. |
| `terms_and_conditions_url` | string | Optional | Not PII | The URL to the terms and conditions for the business or organization. |
| `age_gated_content` | boolean | Optional | Not PII | Indicates if the content is age gated. |
| `opt_in_keywords` | array[string] | Optional | Not PII | List of keywords that users can text in to opt in to receive messages. |
| `vetting_provider` | enum\<string\> | Optional | Not PII | The third-party political vetting provider. Possible values: `CAMPAIGN_VERIFY` |
| `vetting_id` | string | Optional | Not PII | The unique ID of the vetting |

### Update a TFV request

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    edit_reason="Updated the ProductionMessageSample",
    use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
    use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
    production_message_sample="Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
    opt_in_image_urls=[
        "https://example.com/images/image1.jpg",
        "https://example.com/images/image2.jpg",
    ],
    opt_in_type="VERBAL",
    message_volume="1,000",
    additional_information="See our privacy policy at www.example.com/privacypolicy",
)

print(tollfree_verification.sid)
```

**Response:**

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": null,
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": null,
  "status": "PENDING_REVIEW",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_name": "Owl, Inc.",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.company.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@company.com",
  "business_contact_phone": "+11231231234",
  "notification_email": "support@company.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
  "production_message_sample": "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
  "opt_in_image_urls": [
    "https://example.com/images/image1.jpg",
    "https://example.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "1,000",
  "additional_information": "See our privacy policy at www.example.com/privacypolicy",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {},
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": null,
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "business_type": "PRIVATE_PROFIT",
  "business_registration_phone_number": "+13023334444",
  "doing_business_as": "Toms Widgets",
  "age_gated_content": false,
  "help_message_sample": "For help, reply HELP or visit our website.",
  "opt_in_confirmation_message": "Thank you for opting in!",
  "opt_in_keywords": [
    "START"
  ],
  "privacy_policy_url": "https://www.example.com/privacy",
  "terms_and_conditions_url": "https://www.example.com/terms",
  "tollfree_phone_number": "+18003334444",
  "vetting_id": null,
  "vetting_id_expiration": null,
  "vetting_provider": null
}
```

---

## Delete a TFV request

```
DELETE https://messaging.twilio.com/v1/Tollfree/Verifications/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID\<HH\> | required | Not PII | The unique string to identify Tollfree Verification. Pattern: `^HH[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a TFV request

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```