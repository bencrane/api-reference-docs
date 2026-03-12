# Hosted Number Order Resource

> **Info:** The Hosted Phone Numbers API is currently under development, and this documentation is for existing users. A new version will soon be released as a generally available (GA) product. Be aware that the API path `https://preview.twilio.com/HostedNumbers/HostedNumberOrders` will change with the GA release. You will be informed about the timeline and given time to update accordingly.

The Hosted Number Orders product allows an account to request for their phone numbers to be hosted on Twilio for SMS. Start the Hosted Number onboarding process by sending a POST to the list resource, which will create a new request to host a phone number, or move the Hosted Number Order along the onboarding process by updating the status of the Hosted Number Orders Instance Resource. Upon creation of a Hosted Number Order instance resource, a corresponding IncomingPhoneNumbers instance resource will also be created. Currently, Twilio only has the ability to onboard landline or toll-free US & Canada numbers that are not currently SMS enabled.

After the number's ownership has been verified, the user will then need to create a new Authorization Document that is electronically signed, giving Twilio permission to route SMS to and from Twilio's network. To see how to interact with the Authorization Documents resource, please visit the Public API reference.

Once the process is completed, users will be able to answer phone calls on their existing infrastructure and leverage the same number identity for two-way SMS on Twilio's platform.

## HostedNumberOrder Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<HR> | Optional | Not PII | A 34 character string that uniquely identifies this HostedNumberOrder. Pattern: `^HR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| account_sid | SID<AC> | Optional | Not PII | A 34 character string that uniquely identifies the account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| incoming_phone_number_sid | SID<PN> | Optional | Not PII | A 34 character string that uniquely identifies the IncomingPhoneNumber resource that represents the phone number being hosted. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| signing_document_sid | SID<PX> | Optional | Not PII | A 34 character string that uniquely identifies the Authorization Document the user needs to sign. Pattern: `^PX[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| phone_number | string<phone-number> | Optional | Not PII | Phone number to be hosted. This must be in E.164 format, e.g., +16175551212 |
| capabilities | object<phone-number-capabilities> | Optional | Not PII | Set of booleans describing the capabilities hosted on Twilio's platform. SMS is currently only supported. |
| friendly_name | string | Optional | PII MTL: 30 days | A 64 character string that is a human-readable text that describes this resource. |
| unique_name | string | Optional | PII MTL: 30 days | Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID. |
| status | enum<string> | Optional | Not PII | Status of this resource. It can hold one of the values: 1. Twilio Processing 2. Received, 3. Pending LOA, 4. Carrier Processing, 5. Completed, 6. Action Required, 7. Failed. Possible values: `twilio-processing`, `received`, `pending-verification`, `verified`, `pending-loa`, `carrier-processing`, `testing`, `completed`, `failed`, `action-required` |
| failure_reason | string | Optional | Not PII | A message that explains why a hosted_number_order went to status "action-required" |
| date_created | string<date-time> | Optional | Not PII | The date this resource was created, given as GMT RFC 2822 format. |
| date_updated | string<date-time> | Optional | Not PII | The date that this resource was updated, given as GMT RFC 2822 format. |
| verification_attempts | integer | Optional | Not PII | The number of attempts made to verify ownership of the phone number that is being hosted. Default: 0 |
| email | string | Optional | PII MTL: 30 days | Email of the owner of this phone number that is being hosted. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | A list of emails that LOA document for this HostedNumberOrder will be carbon copied to. |
| url | string<uri> | Optional | Not PII | The URL of this HostedNumberOrder. |
| verification_type | enum<string> | Optional | Not PII | The type of ownership verification required to move the number to a verified state. The verification methods are phone-call or phone-bill. Possible values: `phone-call`, `phone-bill` |
| verification_document_sid | SID<RI> | Optional | Not PII | A 34 character string that uniquely identifies the Identity Document resource that represents the document for verifying ownership of the number to be hosted. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| extension | string | Optional | Not PII | A numerical extension to be used when making the ownership verification call. |
| call_delay | integer | Optional | Not PII | A value between 0-30 specifying the number of seconds to delay initiating the ownership verification call. Default: 0 |
| verification_code | string | Optional | Not PII | A verification code provided in the response for a user to enter when they pick up the phone call. |
| verification_call_sids | array[string] | Optional | Not PII | A list of 34 character strings that are unique identifiers for the calls placed as part of ownership verification. |

## Status Values

| Status | Description |
|--------|-------------|
| twilio-processing | Twilio is processing your request and will either send to the failed status if the number is not eligible to be hosted, or move the number to received status. |
| received | Twilio has received the HostedNumberOrder request and determined that the phone number in the request can be hosted on Twilio's platform. |
| pending-verification | Twilio is awaiting the Hosted Number Order to be verified by the end-user by picking up the phone and listening to a security token. The verification code is valid for 10 minutes. Subsequent calls to the API within the expiration time will send the same verification code. There can be a max of three verification attempts before the status changes to action_required. |
| verified | Twilio has confirmed with a security token that the person answering the phone has verified their request for Hosted SMS. |
| pending-loa | LOA for the HostedNumberOrder has been generated, but the document has not yet been signed by the email recipient specified on the HostedNumberOrder. |
| carrier-processing | LOA for the HostedNumberOrder has been signed, and the phone number has been submitted to Twilio's underlying provider/carrier to enable the specified capabilities. |
| testing | The phone number is undergoing capability testing for the capabilities specified in this order. |
| completed | HostedNumberOrder onboarding has completed and the phone number is ready for use. |
| action-required | HostedNumberOrder onboarding encountered a failure. An operations specialist will investigate the failure. |
| failed | The Hosted Number Order failed because the number is currently SMS enabled or has been idle for more than 30 days. At this point, it is no longer possible to re-submit the request for the failed Hosted Number Order. However, a new Hosted Number Order can be created for the same phone number once SMS registration has been deactivated on the phone number or the previous Hosted Number Order has failed due to being idle. |

## HostedNumberOrders Status Callback

When a Hosted Number Order changes status, Twilio will make an asynchronous HTTP request to the StatusCallback URL if you provided one in your API request. By capturing this request, you can determine when the Hosted Number Order changes status.

The Hosted Number Orders status callback request passes the parameters listed in the table below:

| Parameter | Description |
|-----------|-------------|
| Status | The new status of the Hosted Number Order |
| HostedNumberOrderSid | The unique sid of the Hosted Number Order |
| PhoneNumber | The +E.164 format of the Hosted Number Order |

---

## Create a HostedNumberOrder resource

```
POST https://preview.twilio.com/HostedNumbers/HostedNumberOrders
```

Creates a new Hosted Number Order for the specified capability. Currently, only SMS is a supported capability.

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| phone_number | string<phone-number> | required | Not PII | The number to host in +E.164 format |
| sms_capability | boolean | required | Not PII | Used to specify that the SMS capability will be hosted on Twilio's platform. |
| account_sid | SID<AC> | Optional | Not PII | This defaults to the AccountSid of the authorization the user is using. This can be provided to specify a subaccount to add the HostedNumberOrder to. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | PII MTL: 30 days | A 64 character string that is a human readable text that describes this resource. |
| unique_name | string | Optional | PII MTL: 30 days | Optional. Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | Optional. A list of emails that the LOA document for this HostedNumberOrder will be carbon copied to. |
| sms_url | string<uri> | Optional | Not PII | The URL that Twilio should request when somebody sends an SMS to the phone number. This will be copied onto the IncomingPhoneNumber resource. |
| sms_method | enum<http-method> | Optional | Not PII | The HTTP method that should be used to request the SmsUrl. Must be either GET or POST. This will be copied onto the IncomingPhoneNumber resource. Possible values: `GET`, `POST` |
| sms_fallback_url | string<uri> | Optional | Not PII | A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by SmsUrl. This will be copied onto the IncomingPhoneNumber resource. |
| sms_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that should be used to request the SmsFallbackUrl. Must be either GET or POST. This will be copied onto the IncomingPhoneNumber resource. Possible values: `GET`, `POST` |
| status_callback_url | string<uri> | Optional | Not PII | Optional. The Status Callback URL attached to the IncomingPhoneNumber resource. |
| status_callback_method | enum<http-method> | Optional | Not PII | Optional. The Status Callback Method attached to the IncomingPhoneNumber resource. Possible values: `GET`, `POST` |
| sms_application_sid | SID<AP> | Optional | Not PII | Optional. The 34 character sid of the application Twilio should use to handle SMS messages sent to this number. If a SmsApplicationSid is present, Twilio will ignore all of the SMS urls above and use those set on the application. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | Optional. A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| email | string | Optional | PII MTL: 30 days | Optional. Email of the owner of this phone number that is being hosted. |
| verification_type | enum<string> | Optional | Not PII | The type of ownership verification required to move the number to a verified state. The verification methods are phone-call or phone-bill. Possible values: `phone-call`, `phone-bill` |
| verification_document_sid | SID<RI> | Optional | Not PII | Optional. The unique sid identifier of the Identity Document that represents the document for verifying ownership of the number to be hosted. Required when VerificationType is phone-bill. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create Hosted Number Order

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_order = client.preview.hosted_numbers.hosted_number_orders.create(
    phone_number="+15017122661", sms_capability=True
)

print(hosted_number_order.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 0,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test@twilio.com",
  "extension": null,
  "failure_reason": "",
  "friendly_name": null,
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+15017122661",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": null,
  "status": "received",
  "unique_name": null,
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 0,
  "verification_call_sids": null,
  "verification_code": null,
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

---

## Fetch a HostedNumberOrder resource

```
GET https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}
```

Returns a single, existing Hosted Number Orders instance resource specified by the requested Hosted Number Orders instance resource SID.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<HR> | required | Not PII | A 34 character string that uniquely identifies this HostedNumberOrder. Pattern: `^HR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a HostedNumberOrder

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_order = client.preview.hosted_numbers.hosted_number_orders(
    "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(hosted_number_order.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "aaa@twilio.com",
    "bbb@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test@twilio.com",
  "extension": "5105",
  "failure_reason": "",
  "friendly_name": "friendly_name",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "received",
  "unique_name": "foobar",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 0,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

---

## Read multiple HostedNumberOrder resources

```
GET https://preview.twilio.com/HostedNumbers/HostedNumberOrders
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| status | enum<string> | Optional | Not PII | The Status of this HostedNumberOrder. One of received, pending-verification, verified, pending-loa, carrier-processing, testing, completed, failed, or action-required. Possible values: `twilio-processing`, `received`, `pending-verification`, `verified`, `pending-loa`, `carrier-processing`, `testing`, `completed`, `failed`, `action-required` |
| phone_number | string<phone-number> | Optional | Not PII | An E164 formatted phone number hosted by this HostedNumberOrder. |
| incoming_phone_number_sid | SID<PN> | Optional | Not PII | A 34 character string that uniquely identifies the IncomingPhoneNumber resource created by this HostedNumberOrder. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| friendly_name | string | Optional | PII MTL: 30 days | A human readable description of this resource, up to 64 characters. |
| unique_name | string | Optional | PII MTL: 30 days | Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID. |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List multiple HostedNumberOrders

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_orders = client.preview.hosted_numbers.hosted_number_orders.list(
    limit=20
)

for record in hosted_number_orders:
    print(record.sid)
```

**Response:**

```json
{
  "meta": {
    "first_page_url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders?Status=completed&FriendlyName=example&PhoneNumber=%2B19193608000&UniqueName=something123&IncomingPhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "key": "items",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders?Status=completed&FriendlyName=example&PhoneNumber=%2B19193608000&UniqueName=something123&IncomingPhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0"
  },
  "items": []
}
```

---

## Update a HostedNumberOrder resource

```
POST https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}
```

Tries to update a single, existing Hosted Number Orders instance resource's properties and returns the updated resource representation if successful. The returned response is identical to that returned above when fetching.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<HR> | required | Not PII | A 34 character string that uniquely identifies this HostedNumberOrder. Pattern: `^HR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A 64 character string that is a human readable text that describes this resource. |
| unique_name | string | Optional | PII MTL: 30 days | Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID. |
| email | string | Optional | PII MTL: 30 days | Email of the owner of this phone number that is being hosted. |
| cc_emails | array[string] | Optional | PII MTL: 30 days | Optional. A list of emails that LOA document for this HostedNumberOrder will be carbon copied to. |
| status | enum<string> | Optional | Not PII | Status of this resource. Possible values: `twilio-processing`, `received`, `pending-verification`, `verified`, `pending-loa`, `carrier-processing`, `testing`, `completed`, `failed`, `action-required` |
| verification_code | string | Optional | Not PII | A verification code that is given to the user via a phone call to the phone number that is being hosted. |
| verification_type | enum<string> | Optional | Not PII | The type of ownership verification required to move the number to a verified state. The verification methods are phone-call or phone-bill. Possible values: `phone-call`, `phone-bill` |
| verification_document_sid | SID<RI> | Optional | Not PII | Optional. The unique sid identifier of the Identity Document that represents the document for verifying ownership of the number to be hosted. Required when VerificationType is phone-bill. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| extension | string | Optional | Not PII | Digits to dial after connecting the verification call. |
| call_delay | integer | Optional | Not PII | The number of seconds, between 0 and 60, to delay before initiating the verification call. Defaults to 0. |

### Update Friendly Name of Hosted Number Order

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_numbers_hosted_number_order = (
    client.preview.hosted_numbers.hosted_number_orders(
        "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).update(friendly_name="My important hosted number order")
)

print(hosted_numbers_hosted_number_order.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test+hosted@twilio.com",
  "extension": "1234",
  "failure_reason": "",
  "friendly_name": "My important hosted number order",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "pending-loa",
  "unique_name": "new unique name",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 1,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

### Prove Ownership with Phone Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_numbers_hosted_number_order = (
    client.preview.hosted_numbers.hosted_number_orders(
        "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).update(verification_type="phone-call", status="pending-verification")
)

print(hosted_numbers_hosted_number_order.sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test+hosted@twilio.com",
  "extension": "1234",
  "failure_reason": "",
  "friendly_name": "new friendly name",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "pending-verification",
  "unique_name": "new unique name",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 1,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

### Ownership Verification

Ownership Verification is a security measure to host the number with Twilio for SMS to ensure the authenticity of the request.

---

## Delete a HostedNumberOrder resource

```
DELETE https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}
```

Cancels the Hosted Number Order, and consequently, deletes the corresponding Incoming Phone Number.

> **Warning:** You can only issue the DELETE request when the HostedNumberOrder status is in received, pending-verification, verified or pending-loa. If the Hosted Number Order is completed, you can off-board the Twilio platform by issuing a DELETE request to the corresponding IncomingPhoneNumbers. If the Hosted Number Order is in a failed state due to either current SMS enablement or idle timeout, a new Hosted Number Order can be created. The Hosted Number Order will keep failing if SMS enablement is not removed from the number.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<HR> | required | Not PII | A 34 character string that uniquely identifies this HostedNumberOrder. Pattern: `^HR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a HostedNumberOrder

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.preview.hosted_numbers.hosted_number_orders(
    "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```