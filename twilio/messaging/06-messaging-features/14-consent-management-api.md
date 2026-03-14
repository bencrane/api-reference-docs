# Consent Management API

**ℹ️ Pilot**

Consent Management API only supports SMS.

Customers using Twilio's Compliance Toolkit obtain default access.

This Pilot is available for early adopter customers to test and provide feedback.

**⚠️ Legal Warning:** Consent Management API is currently available as a limited Pilot release and the information contained in this document is subject to change. Some features are not yet implemented and others may be changed before the product is declared as Generally Available. As a Pilot release, Consent Management API is made available to a limited number of Customers for testing purposes. Pilot products are not covered by the Twilio Support Terms or the Twilio Service Level Agreement.

Consent Management API is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

Twilio's Consent Management API allows you to bulk manage user consent preferences for SMS messaging. Use it to store or update opt-in, opt-out, and re-opt-in status for your users, along with details about how and when consent was collected.

## Supported Consent Preferences

With this API, you can manage the following user consent states:

| Consent Status | Description |
|----------------|-------------|
| opt in | The user has provided valid consent to receive SMS messages. |
| opt out | The user has revoked consent or replied with STOP-like keywords. |
| re-opt in | Handled as opt-in. The user has opted in again after a prior opt-out. Overrides STOP keyword |

## Rate limits

Twilio limits the Consent Management API to 100 requests per minute. Once you reach this limit, the API returns an HTTP 429 "Too Many Requests" response.

## Timeouts

Consent Management API has a timeout value of three seconds.

## Consent Management API Response Properties

These properties are returned in the JSON response.

| Property name | Type | Required | Description |
|---------------|------|----------|-------------|
| items | array | Optional | A list of objects where each object represents the result of processing a correlation_id. Each object contains the following fields: correlation_id, a unique 32-character UUID that maps the response to the original request; error_code, an integer where 0 indicates success and any non-zero value represents an error; and error_messages, an array of strings describing specific validation errors encountered. If the request is successful, the error_messages array will be empty. |

## Upsert Consents in Bulk

```
POST https://accounts.twilio.com/v1/Consents/Bulk
```

Creates up to 25 consents for an authenticated account. If a consent already exists, it will be updated (via upsert) to match the requested object.

Every Consent object should be associated with a unique correlation_id, allowing you to track each individual request within the bulk operation.

If any issues arise during the processing of a consent object, the error will be returned and mapped specifically to that consent's correlation_id. This allows you to pinpoint and address issues for individual contacts.

For detailed information on possible failures and how to resolve them, refer to error code 30646, which provides guidance on common errors such as incorrect phone number format, missing required fields, and other validation issues.

### Request body parameters

Encoding type: application/x-www-form-urlencoded

| Property name | Type | Required | Description |
|---------------|------|----------|-------------|
| items | array | required | This is a list of objects that describes a contact's opt-in status. Each object contains the following fields: contact_id, which must be a string representing phone number in E.164 format; correlation_id, a unique 32-character UUID used to uniquely map the request item with the response item; sender_id, which can be either a valid messaging service SID or a from phone number; status, a string representing the consent status. Can be one of [opt-in, opt-out]; source, a string indicating the medium through which the consent was collected. Can be one of [website, offline, opt-in-message, opt-out-message, others]; date_of_consent, an optional datetime string field in ISO-8601 format that captures the exact date and time when the user gave or revoked consent. If not provided, it will be empty. |

### Code Example

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

bulk_consent = client.accounts.v1.bulk_consents.create(
    items=[
        {
            "contact_id": "+19999999991",
            "correlation_id": "ad388b5a46b33b874b0d41f7226db2ef",
            "sender_id": "MG00000000000000000000000000000000",
            "date_of_consent": "2025-02-28T10:05:27Z",
            "status": "opt-in",
            "source": "website",
        },
        {
            "contact_id": "+19",
            "correlation_id": "02520cfa6c432f0e3ec3a38c122d428d",
            "sender_id": "12345",
            "date_of_consent": "2025-02-25",
            "status": "opt-out",
            "source": "opt-out-message",
        },
    ]
)

print(bulk_consent.items)
```

### Response

```json
{
  "items": [
    {
      "contact_id": "+19999999991",
      "correlation_id": "ad388b5a46b33b874b0d41f7226db2ef",
      "sender_id": "MG00000000000000000000000000000000",
      "date_of_consent": "2025-02-28T10:05:27Z",
      "status": "opt-in",
      "source": "website"
    },
    {
      "contact_id": "+19",
      "correlation_id": "02520cfa6c432f0e3ec3a38c122d428d",
      "sender_id": "12345",
      "date_of_consent": "2025-02-25",
      "status": "opt-out",
      "source": "opt-out-message"
    }
  ]
}
```

Each item in the response matches the submitted correlation_id. This enables tracing of validation errors for specific contacts. Note: STOP keyword override applies to all messages sent in the US from Short Codes and 10DLC numbers, but not Toll-free numbers. Zipwhip manages opt-out for all US messaging for TF traffic.

## Best Practices

- Always use a unique correlation_id per contact update.
- Store and update the date_of_consent to establish proper consent timelines.
- Use status=opt-in with source to update re-opt-in consent records.
- Ensure contact_id is in proper E.164 format.