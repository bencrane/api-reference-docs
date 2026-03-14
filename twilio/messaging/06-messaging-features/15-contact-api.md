# Contact API

**ℹ️ Pilot**

Contacts API only supports SMS.

Customers using Twilio's Compliance Toolkit obtain default access at this time.

This Pilot is available for early adopter customers to test and provide feedback.

**⚠️ Legal:** Contacts API is currently available as a limited Pilot release and the information contained in this document is subject to change. Some features are not yet implemented and others may be changed before the product is declared as Generally Available. As a Pilot release, Consent Management API is made available to a limited number of Customers for testing purposes. Pilot products are not covered by the Twilio Support Terms or the Twilio Service Level Agreement.

Contact API is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

The Twilio Contact API helps manage and synchronize user profile information.

If you use Compliance Toolkit, the Contact API enables you to provide the known ZIP code of your end users for more accurate quiet hours enforcement.

- By default, Compliance Toolkit infers the time zone from the phone number's area code.
- When available, Compliance Toolkit prefers the stored zip_code value to determine a user's local time.

## Rate limits

Bulk Upsert Contacts API provides a built-in rate limit of 100 requests per minute. If you reach this limit, you will start receiving HTTP 429 "Too Many Requests" responses.

## Timeouts

Contact API has a timeout value of 3 seconds. However, its 99th percentile is within 1 second.

## Contact API Response Properties

These properties are returned in the JSON response output.

| Property name | Type | Required | Description |
|---------------|------|----------|-------------|
| items | array | Optional | A list of objects where each object represents the result of processing a correlation_id. Each object contains the following fields: correlation_id, a unique 32-character UUID that maps the response to the original request; error_code, an integer where 0 indicates success and any non-zero value represents an error; and error_messages, an array of strings describing specific validation errors encountered. If the request is successful, the error_messages array will be empty. |

## Upsert Contacts in Bulk

```
POST https://accounts.twilio.com/v1/Contacts/Bulk
```

Creates up to 25 contacts for an authenticated account. If a contact already exists, it will be upserted—updated to match the requested object.

Every contact object should be associated with a unique correlation_id, allowing you to track each individual request within the bulk operation.

If any issues arise during the processing of a contact object, the error will be returned and mapped specifically to that contact's correlation_id. This allows you to pinpoint and address issues for individual contacts.

For detailed information on possible failures and how to resolve them, refer to error code 30647, which provides guidance on common errors such as incorrect phone number format, missing required fields, and other validation issues.

### Request body parameters

Encoding type: application/x-www-form-urlencoded

| Property name | Type | Required | Description |
|---------------|------|----------|-------------|
| items | array | required | A list of objects where each object represents a contact's details. Each object includes the following fields: contact_id, which must be a string representing phone number in E.164 format; correlation_id, a unique 32-character UUID that maps the response to the original request; country_iso_code, a string representing the country using the ISO format (e.g., US for the United States); and zip_code, a string representing the postal code. |

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

bulk_contact = client.accounts.v1.bulk_contacts.create(
    items=[
        {
            "contact_id": "+19999999999",
            "correlation_id": "ad388b5a46b33b874b0d41f7226db2eh",
            "country_iso_code": "US",
            "zip_code": "12345",
        },
        {
            "contact_id": "+19",
            "correlation_id": "02520cfa6c432f0e3ec3a38c122d428a",
            "country_iso_code": "US",
            "zip_code": "12345",
        },
    ]
)

print(bulk_contact.items)
```

### Response

```json
{
  "items": [
    {
      "contact_id": "+19999999999",
      "correlation_id": "ad388b5a46b33b874b0d41f7226db2eh",
      "country_iso_code": "US",
      "zip_code": "12345"
    },
    {
      "contact_id": "+19",
      "correlation_id": "02520cfa6c432f0e3ec3a38c122d428a",
      "country_iso_code": "US",
      "zip_code": "12345"
    }
  ]
}
```