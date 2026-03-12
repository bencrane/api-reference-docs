# Hosted Numbers Public API - Eligibility Resource (Public Beta)

> **Public Beta**
>
> The Eligibility APIs are currently available as a Public Beta product and the information contained in this document is subject to change.
>
> Public Beta products are not covered by a Twilio SLA.

Twilio's Eligibility API allows you to determine if the non-Twilio phone numbers already in your possession can be hosted with Twilio. It's often possible to use your existing phone numbers with Twilio's Messaging Services without changing the voice provider by hosting the messaging capability of those numbers with Twilio.

Determining a number's eligibility is the first step of the hosting process. Using the API, you can check the eligibility of a number or group of numbers before starting the hosting process. If a number cannot be hosted by Twilio, the API will provide a reason and suggest potential next steps.

## Base URL

All URLs referenced in the API documentation have the following base:

```
https://numbers.twilio.com/v1/HostedNumber/Eligibility
```

The API is served over HTTPS. To ensure data privacy, unencrypted HTTP is not supported.

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports HTTP Basic authentication. Use your API key as the username and your API key secret as the password. You can create an API key either in the Twilio Console or using the API.

**Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the Twilio Console.

Learn more about Twilio API authentication.

---

## Create a single eligibility check request

**Resource URL:** `https://numbers.twilio.com/v1/HostedNumber/Eligibility`

To check a single phone number's eligibility, make a POST request to this resource.

See the following code sample for a complete curl request. See the request properties table for all the properties available on this resource.

```bash
curl --location --request POST 'https://numbers.twilio.com/v1/HostedNumber/Eligibility' \
-u "Account_SID:Auth_Token" \
--header 'Content-Type: application/json' \
--data-raw '{
    "friendly_name": "My first eligibility check",
    "phone_numbers": [
        {"phone_number": "+13175787XXX", "hosting_account_sid": "AC264f0af1e323b9a38e513c433828dXXX"}
    ]
}'
```

### Request properties

The resource accepts an array of one object called `phone_numbers`. The object must contain a `phone_number` in E.164 format to check for eligibility. A `phone_numbers` object may also contain a Twilio Account SID (`hosting_account_sid`) belonging to the Twilio Account where you want to host the phone number. If a SID is not provided, the account used to make the request will be used as the hosting Twilio Account. This resource also accepts an optional `friendly_name` property, which allows you to assign a human-readable reference to the eligibility request.

| Parameter | Required | Field Type | Validation | Description |
|-----------|----------|------------|------------|-------------|
| phone_numbers | Yes | Array | Size must equal 1 | An array of one object containing fields: `phone_number`, the number (E.164 format) to check for hosting eligibility. `hosting_account_sid` (optional), the Twilio Account or Subaccount SID where the number will be hosted. If this field is not provided, the authentication Account SID used when making the request will be used as the hosting account. |
| friendly_name | No | String | | Name of the eligibility check. |

### Response properties

The following table provides all the properties that may be returned by the resource.

| Parameter | Description | Possible return values |
|-----------|-------------|------------------------|
| phone_number | Phone number that was checked for hosting eligibility. | |
| hosting_account_sid | Twilio's Account or Subaccount SID where the number would be hosted. | |
| eligibility_status | The number's eligibility to be hosted with Twilio. | `eligible`, `ineligible` |
| eligibility_sub_status | Additional information about why a number cannot be hosted with Twilio. | `country-ineligible`, `number-format-ineligible`, `number-type-ineligible`, `carrier-ineligible`, `already-in-twilio`, `internal-processing-error`, `invalid-phone-number`, `invalid-hosting-account-sid`, `eligible-by-manual-process`, `may-be-eligible-by-manual-process`, `eligible` |
| ineligibility_reason | The primary reason the number cannot be hosted with Twilio. | `eligible-for-hosting`, `country-not-supported`, `number-format-ineligible`, `number-type-ineligible`, `numbers-provider-does-not-allow-twilio-to-host-it`, `already-in-twilio-but-not-in-use`, `already-in-twilio-and-in-hosting-process`, `already-in-twilio-for-both-capabilities`, `already-in-twilio-without-messaging-capability`, `already-in-twilio-owned-by-other-account`, `internal-processing-error`, `invalid-phone-number`, `hosting-account-sid-does-not-belong-to-your-account`, `hosting-account-sid-does-not-exist`, `eligible-for-hosting-by-manual-process`, `missing-provider-data`, `already-hosted-in-twilio`, `support-validation-required-number-without-an-approved-nnid` |
| next_step | Action that customers can take based on the eligibility result. | `none`, `create-hosted-number-order`, `edit-ineligible-number-and-run-eligibility-check-again`, `manage-hosting-order`, `recover-messaging-capability`, `contact-support-ineligible-carrier`, `contact-support-internal-transfer`, `contact-support-ineligible-inventory-status`, `number-type-cannot-be-hosted`, `retry-the-eligibility-check`, `update-hosting-account-sid`, `contact-support-to-manually-host-the-number`, `contact-support-missing-provider-data`, `contact-support-for-manual-process`, `contact-support-to-retire-previous-orders` |
| phone_number_type | The phone number's type. | `toll-free`, `local`, `mobile`, `unknown` |
| iso_country_code | The country to which the number belongs. | |

### Response examples

The following example responses are provided for your reference.

**Eligible number:**

```json
"results": [
    {
        "phone_number": "+1XXXXXXXXXX",
        "next_step": "CREATE_HOSTED_NUMBER_ORDER",
        "phone_number_type": "TOLLFREE",
        "eligibility_sub_status": "ELIGIBLE",
        "eligibility_status": "ELIGIBLE",
        "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "ineligibility_reason": "None",
        "iso_country_code": "USA"
    }
]
```

**Ineligible number (wrong number format):**

```json
"results": [
    {
        "phone_number": "+493333344444544XXX",
        "next_step": "EDIT_INELIGIBLE_NUMBER_AND_RUN_ELIGIBILITY_CHECK_AGAIN",
        "phone_number_type": "UNKNOWN",
        "eligibility_sub_status": "NUMBER_FORMAT_INELIGIBLE",
        "eligibility_status": "INELIGIBLE",
        "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "ineligibility_reason": "NUMBER_FORMAT_INELIGIBLE",
        "iso_country_code": null
    }
]
```

**Ineligible number (number type ineligible):**

```json
"results": [
    {
        "phone_number": "+1XXXXXXXXXX",
        "next_step": "NUMBER_TYPE_CANNOT_BE_HOSTED",
        "phone_number_type": "MOBILE",
        "eligibility_sub_status": "NUMBER_TYPE_INELIGIBLE",
        "eligibility_status": "INELIGIBLE",
        "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "ineligibility_reason": "NUMBER_TYPE_INELIGIBLE",
        "iso_country_code": "US"
    }
]
```

### Error codes

The following table enumerates and describes all the possible error codes within the response body of an HTTP 400: Bad Request.

| Status Code | Error Message | Description |
|-------------|---------------|-------------|
| 21470 | Account SID is required | Account SID is missing or invalid |
| 21470 | Invalid Account SID | Invalid Account SID |
| 21471 | Account not found | Valid Account SID, but account not found |
| 22102 | Phone Number is required | The phone_number field is missing |
| 22102 | Invalid Phone Number | Phone number is invalid |
| 22116 | Invalid Friendly Name | Friendly name is empty or exceeds 128 characters |
| 22124 | Phone number(s) are required | The phone_numbers field is missing |
| 22125 | Phone number(s) cannot exceed the maximum limit allowed | Number of phone numbers cannot exceed one |

---

## Create a bulk eligibility check request

**Resource URL:** `https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk`

To check a set of up to 1,000 phone numbers' eligibility, make a POST request to this resource. After the bulk eligibility check is created, the next step is to get the results for the bulk request.

See the following code sample for a complete curl request. See the request properties table for all the properties available on this resource.

```bash
curl --location --request POST 'https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk' \
-u "Account_SID:Auth_Token" \
--header 'Content-Type: application/json' \
--data-raw '{
    "friendly_name": "My first eligibility check",
    "phone_numbers": [
        {
           "phone_number": "+13175787XXX",
           "hosting_account_sid": "AC264f0af1e323b9a38e513c433828dXXX"
        },
        {
           "phone_number": "+15017122XXX",
           "hosting_account_sid": "AC264f0af1e323b9a38e513c433828dXXX"
        },
        {
           "phone_number": "+18003482XXX"
        }
    ]
}'
```

### Request properties

The resource accepts an array of objects called `phone_numbers`. Each object must contain a `phone_number` in E.164 format to check for eligibility. A `phone_numbers` object may also contain a Twilio Account SID (`hosting_account_sid`) belonging to the Twilio Account where you want to host the phone numbers. If a SID is not provided, the account used to make the request will be used as the hosting Twilio Account. This resource also accepts an optional `friendly_name` property, which allows you to assign a human-readable reference to the eligibility request.

| Parameter | Required | Field Type | Validation | Description |
|-----------|----------|------------|------------|-------------|
| phone_numbers | Yes | Array | 1 ≤ size ≤ 1000 | An array of one to 1,000 objects containing fields: `phone_number`, the number (E.164 format) to check for hosting eligibility. `hosting_account_sid` (optional), the Twilio Account or Subaccount SID where the number will be hosted. If this field is not provided, the authentication Account SID used when making the request will be used as the hosting account. |
| friendly_name | Yes | String | | Name of the eligibility check. |

### Response properties

A POST request to the above resource will return a status and request_id, among other properties. Processing a bulk request may require some time depending on the quantity of numbers to be checked. Once the status of your request is "SUCCESSFUL", you can use the request_id to retrieve the eligibility results for the numbers sent in your bulk request as described in the Get results for a bulk request section of this page.

| Name | Type | Description |
|------|------|-------------|
| status | String | This is the status of the bulk eligibility check request. Return values include: SUCCESSFUL, QUEUED, PROCESSING. |
| date_completed | date_time<ISO8601> | Date the request was completed. It will be null until the eligibility check is completed. |
| url | URL | This is the URL that you can use to GET the results of the request. |
| friendly_name | String | This is the string that you assigned as a friendly name for describing the eligibility check request. |
| results | Object[] | The result set that contains the eligibility check response for each requested number. It will be empty until the eligibility check is completed. |
| request_id | SID<EC> | The SID of the bulk eligibility check. |
| date_created | date_time<ISO8601> | Date the request was created. |

### Response example

```json
{
    "status": "QUEUED",
    "date_completed": null,
    "url": "https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk/Request_ID",
    "friendly_name": "friendly_name",
    "results": [],
    "request_id": "Request_ID",
    "date_created": "2024-03-21T22:06:24Z"
}
```

### Error codes

The following table enumerates and describes all the possible error codes within the response body of an HTTP 400: Bad Request.

| Status Code | Error Message | Description |
|-------------|---------------|-------------|
| 21470 | Account SID is required | Account SID is missing or invalid |
| 21470 | Invalid Account SID | Invalid Account SID |
| 21471 | Account not found | Valid Account SID, but account not found |
| 22102 | Phone Number is required | The phone_number field is missing |
| 22102 | Invalid Phone Number | Phone number is invalid |
| 22116 | Invalid Friendly Name | Friendly name is empty or exceeds 128 characters |
| 22124 | Phone number(s) are required | The phone_numbers field is missing |
| 22125 | Phone number(s) cannot exceed the maximum limit allowed | Number of phone numbers cannot exceed 1000 |
| 22127 | Friendly Name is required | Friendly name is missing |

---

## Get results for a bulk request

**Resource URL:** `https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk/{request_id}`

To retrieve the eligibility results for the phone numbers passed to the Bulk Eligibility resource, make a GET request to this resource with the `request_id` returned by your initial POST request to the Bulk Eligibility resource. Once the status of your initial POST request is "SUCCESSFUL", you will see the eligibility status for each phone number in the response from this resource. Descriptions for each eligibility response property are provided in the below response properties table.

```bash
curl --location --request GET 'https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk/ECXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' \
-u "Account_SID:Auth_Token" \
--header 'Content-Type: application/json'
```

### Response properties

The following table provides all the properties that may be returned by the resource.

| Parameter | Description | Possible return values |
|-----------|-------------|------------------------|
| phone_number | Phone number that was checked for hosting eligibility. | |
| hosting_account_sid | Twilio's Account or Subaccount SID where the number would be hosted. | |
| eligibility_status | The number's eligibility to be hosted with Twilio. | `eligible`, `ineligible` |
| eligibility_sub_status | Additional information about why a number cannot be hosted with Twilio. | `country-ineligible`, `number-format-ineligible`, `number-type-ineligible`, `carrier-ineligible`, `already-in-twilio`, `internal-processing-error`, `invalid-phone-number`, `invalid-hosting-account-sid`, `eligible-by-manual-process`, `may-be-eligible-by-manual-process`, `eligible` |
| ineligibility_reason | The primary reason the number cannot be hosted with Twilio. | `eligible-for-hosting`, `country-not-supported`, `number-format-ineligible`, `number-type-ineligible`, `numbers-provider-does-not-allow-twilio-to-host-it`, `already-in-twilio-but-not-in-use`, `already-in-twilio-and-in-hosting-process`, `already-in-twilio-for-both-capabilities`, `already-in-twilio-without-messaging-capability`, `already-in-twilio-owned-by-other-account`, `internal-processing-error`, `invalid-phone-number`, `hosting-account-sid-does-not-belong-to-your-account`, `hosting-account-sid-does-not-exist`, `eligible-for-hosting-by-manual-process`, `missing-provider-data`, `already-hosted-in-twilio`, `support-validation-required-number-without-an-approved-nnid` |
| next_step | Action that customers can take based on the eligibility result. | `none`, `create-hosted-number-order`, `edit-ineligible-number-and-run-eligibility-check-again`, `manage-hosting-order`, `recover-messaging-capability`, `contact-support-ineligible-carrier`, `contact-support-internal-transfer`, `contact-support-ineligible-inventory-status`, `number-type-cannot-be-hosted`, `retry-the-eligibility-check`, `update-hosting-account-sid`, `contact-support-to-manually-host-the-number`, `contact-support-missing-provider-data`, `contact-support-for-manual-process`, `contact-support-to-retire-previous-orders` |
| phone_number_type | The phone number's type. | `toll-free`, `local`, `mobile`, `unknown` |
| iso_country_code | The country to which the number belongs. | |

### Response examples

The following example responses are provided for your reference.

**Completed:**

```json
{
    "status": "SUCCESSFUL",
    "date_completed": "2024-03-21T22:07:20Z",
    "url": "https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk/Request_ID",
    "friendly_name": "friendly_name",
    "results": [
        {
            "phone_number": "+1XXXXXXXXXX",
            "next_step": "NUMBER_TYPE_CANNOT_BE_HOSTED",
            "phone_number_type": "MOBILE",
            "eligibility_sub_status": "NUMBER_TYPE_INELIGIBLE",
            "eligibility_status": "INELIGIBLE",
            "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "ineligibility_reason": "NUMBER_TYPE_INELIGIBLE",
            "iso_country_code": "US"
        },
        {
            "phone_number": "+493333344444544XXX",
            "next_step": "EDIT_INELIGIBLE_NUMBER_AND_RUN_ELIGIBILITY_CHECK_AGAIN",
            "phone_number_type": "UNKNOWN",
            "eligibility_sub_status": "NUMBER_FORMAT_INELIGIBLE",
            "eligibility_status": "INELIGIBLE",
            "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "ineligibility_reason": "NUMBER_FORMAT_INELIGIBLE",
            "iso_country_code": null
        }
    ],
    "request_id": "Request_ID",
    "date_created": "2024-03-21T22:06:24Z"
}
```

**Processing (not completed yet):**

```json
{
    "status": "PROCESSING",
    "date_completed": null,
    "url": "https://numbers.twilio.com/v1/HostedNumber/Eligibility/Bulk/Request_ID",
    "friendly_name": "friendly_name",
    "results": [
        {
            "phone_number": "+1XXXXXXXXXX",
            "next_step": "NUMBER_TYPE_CANNOT_BE_HOSTED",
            "phone_number_type": "MOBILE",
            "eligibility_sub_status": "NUMBER_TYPE_INELIGIBLE",
            "eligibility_status": "INELIGIBLE",
            "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "ineligibility_reason": "NUMBER_TYPE_INELIGIBLE",
            "iso_country_code": "US"
        },
        {
            "phone_number": "+493333344444544XXX",
            "next_step": "EDIT_INELIGIBLE_NUMBER_AND_RUN_ELIGIBILITY_CHECK_AGAIN",
            "phone_number_type": "UNKNOWN",
            "eligibility_sub_status": "NUMBER_FORMAT_INELIGIBLE",
            "eligibility_status": "INELIGIBLE",
            "hosting_account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "ineligibility_reason": "NUMBER_FORMAT_INELIGIBLE",
            "iso_country_code": null
        }
    ],
    "request_id": "Request_ID",
    "date_created": "2024-03-21T22:06:24Z"
}
```