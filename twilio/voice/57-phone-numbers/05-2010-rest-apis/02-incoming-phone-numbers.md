# IncomingPhoneNumber Resource

An IncomingPhoneNumber instance resource represents a phone number that you provision, port, or host with Twilio.

The IncomingPhoneNumbers list resource represents an account's Twilio phone numbers. You can POST to the list resource to provision a new Twilio number. To find a number to provision, use the subresources of the AvailablePhoneNumbers resource.

You can transfer phone numbers between two Twilio accounts if you're using subaccounts. For details, see Exchanging Numbers Between Subaccounts.

> **Info**
> Provisioning a phone number is a two-step process:
> 1. Find an available phone number to provision by making a GET request to the subresources of the AvailablePhoneNumbers resource.
> 2. Make a POST request to the IncomingPhoneNumbers resource.

> **Warning**
> The order of columns in the CSV can change as we add fields to the API response. Design your application to handle column-order changes.

---

## IncomingPhoneNumber Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created this IncomingPhoneNumber resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | The SID of the Address resource associated with the phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_requirements | enum<string> | Optional | Not PII | Whether the phone number requires an Address registered with Twilio. Can be: none, any, local, or foreign. Possible values: none, any, local, foreign |
| api_version | string | Optional | Not PII | The API version used to start a new TwiML session. |
| beta | boolean | Optional | Not PII | Whether the phone number is new to the Twilio platform. Can be: true or false. |
| capabilities | object<phone-number-capabilities> | Optional | Not PII | The set of Boolean properties that indicate whether a phone number can receive calls or messages. Capabilities are Voice, SMS, and MMS and each capability can be: true or false. |
| date_created | string<date-time-rfc-2822> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string<date-time-rfc-2822> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| friendly_name | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| identity_sid | SID<RI> | Optional | Not PII | The SID of the Identity resource that we associate with the phone number. Some regions require an Identity to meet local regulations. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| phone_number | string<phone-number> | Optional | Not PII | The phone number in E.164 format, which consists of a + followed by the country code and subscriber number. |
| origin | string | Optional | Not PII | The phone number's origin. twilio identifies Twilio-owned phone numbers and hosted identifies hosted phone numbers. |
| sid | SID<PN> | Optional | Not PII | The unique string that that we created to identify this IncomingPhoneNumber resource. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sms_application_sid | SID<AP> | Optional | Not PII | The SID of the application that handles SMS messages sent to the phone number. If an sms_application_sid is present, we ignore all sms_*_url values and use those of the application. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sms_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call sms_fallback_url. Can be: GET or POST. Possible values: GET, POST |
| sms_fallback_url | string<uri> | Optional | Not PII | The URL that we call when an error occurs while retrieving or executing the TwiML from sms_url. |
| sms_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call sms_url. Can be: GET or POST. Possible values: GET, POST |
| sms_url | string<uri> | Optional | Not PII | The URL we call when the phone number receives an incoming SMS message. |
| status_callback | string<uri> | Optional | Not PII | The URL we call using the status_callback_method to send status information to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call status_callback. Can be: GET or POST. Possible values: GET, POST |
| trunk_sid | SID<TK> | Optional | Not PII | The SID of the Trunk that handles calls to the phone number. If a trunk_sid is present, we ignore all of the voice urls and voice applications and use those set on the Trunk. Setting a trunk_sid will automatically delete your voice_application_sid and vice versa. Pattern: `^TK[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| uri | string | Optional | Not PII | The URI of the resource, relative to https://api.twilio.com. |
| voice_receive_mode | enum<string> | Optional | Not PII | Possible values: voice, fax |
| voice_application_sid | SID<AP> | Optional | Not PII | The SID of the application that handles calls to the phone number. If a voice_application_sid is present, we ignore all of the voice urls and use those set on the application. Setting a voice_application_sid will automatically delete your trunk_sid and vice versa. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| voice_caller_id_lookup | boolean | Optional | Not PII | Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: true or false. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call voice_fallback_url. Can be: GET or POST. Possible values: GET, POST |
| voice_fallback_url | string<uri> | Optional | Not PII | The URL that we call when an error occurs retrieving or executing the TwiML requested by url. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method we use to call voice_url. Can be: GET or POST. Possible values: GET, POST |
| voice_url | string<uri> | Optional | Not PII | The URL we call when the phone number receives a call. The voice_url will not be used if a voice_application_sid or a trunk_sid is set. |
| emergency_status | enum<string> | Optional | Not PII | The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. Possible values: Active, Inactive |
| emergency_address_sid | SID<AD> | Optional | Not PII | The SID of the emergency address configuration that we use for emergency calling from this phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| emergency_address_status | enum<string> | Optional | Not PII | The status of address registration with emergency services. A registered emergency address will be used during handling of emergency calls from this number. Possible values: registered, unregistered, pending-registration, registration-failure, pending-unregistration, unregistration-failure |
| bundle_sid | SID<BU> | Optional | Not PII | The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | string | Optional | Not PII | |
| type | string | Optional | Not PII | The phone number type. |

---

## Create an IncomingPhoneNumber Resource

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that will create the resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request Body Parameters

**Encoding type:** application/x-www-form-urlencoded

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| api_version | string | Optional | Not PII | The API version to use for incoming calls made to the new phone number. The default is 2010-04-01. |
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you created to describe the new phone number. It can be up to 64 characters long. By default, this is a formatted version of the new phone number. |
| sms_application_sid | SID<AP> | Optional | Not PII | The SID of the application that should handle SMS messages sent to the new phone number. If an sms_application_sid is present, we ignore all of the sms_*_url urls and use those set on the application. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sms_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call sms_fallback_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| sms_fallback_url | string<uri> | Optional | Not PII | The URL that we should call when an error occurs while requesting or executing the TwiML defined by sms_url. |
| sms_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call sms_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| sms_url | string<uri> | Optional | Not PII | The URL we should call when the new phone number receives an incoming SMS message. |
| status_callback | string<uri> | Optional | Not PII | The URL we should call using the status_callback_method to send status information to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call status_callback. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_application_sid | SID<AP> | Optional | Not PII | The SID of the application we should use to handle calls to the new phone number. If a voice_application_sid is present, we ignore all of the voice urls and use only those set on the application. Setting a voice_application_sid will automatically delete your trunk_sid and vice versa. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| voice_caller_id_lookup | boolean | Optional | Not PII | Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: true or false and defaults to false. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call voice_fallback_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_fallback_url | string<uri> | Optional | Not PII | The URL that we should call when an error occurs retrieving or executing the TwiML requested by url. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call voice_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_url | string<uri> | Optional | Not PII | The URL that we should call to answer a call to the new phone number. The voice_url will not be called if a voice_application_sid or a trunk_sid is set. |
| emergency_status | enum<string> | Optional | Not PII | The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. Possible values: Active, Inactive |
| emergency_address_sid | SID<AD> | Optional | Not PII | The SID of the emergency address configuration to use for emergency calling from the new phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| trunk_sid | SID<TK> | Optional | Not PII | The SID of the Trunk we should use to handle calls to the new phone number. If a trunk_sid is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a trunk_sid will automatically delete your voice_application_sid and vice versa. Pattern: `^TK[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| identity_sid | SID<RI> | Optional | Not PII | The SID of the Identity resource that we should associate with the new phone number. Some regions require an identity to meet local regulations. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | The SID of the Address resource we should associate with the new phone number. Some regions require addresses to meet local regulations. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| voice_receive_mode | enum<string> | Optional | Not PII | Possible values: voice, fax |
| bundle_sid | SID<BU> | Optional | Not PII | The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| phone_number | string<phone-number> | required if AreaCode is not passed | Not PII | The phone number to purchase specified in E.164 format. E.164 phone numbers consist of a + followed by the country code and subscriber number without punctuation characters. For example, +14155551234. |
| area_code | string | required if PhoneNumber is not passed | Not PII | The desired area code for your new incoming phone number. Can be any three-digit, US or Canada area code. We will provision an available phone number within this area code for you. You must provide an area_code or a phone_number. (US and Canada only). |

---

## Provision a Phone Number

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers.create(
    phone_number="+14155552344"
)

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+14155552344",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://example.com",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

---

## Provision a Phone Number with an AddressSid and a BundleSid

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers.create(
    address_sid="ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    phone_number="+14155552344",
)

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+14155552344",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://example.com",
  "bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

---

## Provision a Phone Number with a Voice URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers.create(
    voice_url="https://www.your-voice-url.com/example",
    phone_number="+14155552344",
)

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+14155552344",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://example.com",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://www.your-voice-url.com/example",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

---

## Provision a Phone Number with an SMS URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers.create(
    sms_url="https://www.your-sms-url.com/example", phone_number="+14155552344"
)

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "friendly_name",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+14155552344",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "https://example.com",
  "sms_method": "GET",
  "sms_url": "https://www.your-sms-url.com/example",
  "status_callback": "https://example.com",
  "status_callback_method": "GET",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "https://example.com",
  "voice_method": "GET",
  "voice_url": "https://example.com",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

---

## Fetch an IncomingPhoneNumber Resource

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the IncomingPhoneNumber resource to fetch. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<PN> | required | Not PII | The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to fetch. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an IncomingPhoneNumber

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Active",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

---

## Read Multiple IncomingPhoneNumber Resources

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the IncomingPhoneNumber resources to read. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| beta | boolean | Optional | Not PII | Whether to include phone numbers new to the Twilio platform. Can be: true or false and the default is true. |
| friendly_name | string | Optional | PII MTL: 30 days | A string that identifies the IncomingPhoneNumber resources to read. |
| phone_number | string<phone-number> | Optional | Not PII | The phone numbers of the IncomingPhoneNumber resources to read. You can specify partial numbers and use '*' as a wildcard for any digit. |
| origin | string | Optional | Not PII | Whether to include phone numbers based on their origin. Can be: twilio or hosted. By default, phone numbers of all origin are included. |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

---

## List All IncomingPhoneNumber Resources for Your Account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_numbers = client.incoming_phone_numbers.list(limit=20)

for record in incoming_phone_numbers:
    print(record.account_sid)
```

### Response

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0",
  "incoming_phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "address_requirements": "none",
      "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "beta": null,
      "capabilities": {
        "voice": true,
        "sms": false,
        "mms": true,
        "fax": false
      },
      "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
      "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
      "emergency_status": "Active",
      "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "emergency_address_status": "registered",
      "friendly_name": "(808) 925-5327",
      "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "origin": "origin",
      "phone_number": "+18089255327",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_application_sid": "",
      "sms_fallback_method": "POST",
      "sms_fallback_url": "",
      "sms_method": "POST",
      "sms_url": "",
      "status_callback": "",
      "status_callback_method": "POST",
      "trunk_sid": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_application_sid": "",
      "voice_caller_id_lookup": false,
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_url": null,
      "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "voice_receive_mode": "voice",
      "status": "in-use",
      "type": "local"
    }
  ],
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0"
}
```

---

## Filter IncomingPhoneNumbers with Exact Match

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_numbers = client.incoming_phone_numbers.list(
    phone_number="+14158675310", limit=20
)

for record in incoming_phone_numbers:
    print(record.account_sid)
```

---

## Filter IncomingPhoneNumbers with Partial Match

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_numbers = client.incoming_phone_numbers.list(
    phone_number="867", limit=20
)

for record in incoming_phone_numbers:
    print(record.account_sid)
```

---

## Update an IncomingPhoneNumber Resource

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
```

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the IncomingPhoneNumber resource to update. For more information, see Exchanging Numbers Between Subaccounts. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<PN> | required | Not PII | The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to update. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request Body Parameters

**Encoding type:** application/x-www-form-urlencoded

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | Optional | Not PII | The SID of the Account that created the IncomingPhoneNumber resource to update. For more information, see Exchanging Numbers Between Subaccounts. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| api_version | string | Optional | Not PII | The API version to use for incoming calls made to the phone number. The default is 2010-04-01. |
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you created to describe this phone number. It can be up to 64 characters long. By default, this is a formatted version of the phone number. |
| sms_application_sid | SID<AP> | Optional | Not PII | The SID of the application that should handle SMS messages sent to the number. If an sms_application_sid is present, we ignore all of the sms_*_url urls and use those set on the application. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sms_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call sms_fallback_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| sms_fallback_url | string<uri> | Optional | Not PII | The URL that we should call when an error occurs while requesting or executing the TwiML defined by sms_url. |
| sms_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call sms_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| sms_url | string<uri> | Optional | Not PII | The URL we should call when the phone number receives an incoming SMS message. |
| status_callback | string<uri> | Optional | Not PII | The URL we should call using the status_callback_method to send status information to your application. |
| status_callback_method | enum<http-method> | Optional | Not PII | The HTTP method we should use to call status_callback. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_application_sid | SID<AP> | Optional | Not PII | The SID of the application we should use to handle phone calls to the phone number. If a voice_application_sid is present, we ignore all of the voice urls and use only those set on the application. Setting a voice_application_sid will automatically delete your trunk_sid and vice versa. Pattern: `^AP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| voice_caller_id_lookup | boolean | Optional | Not PII | Whether to lookup the caller's name from the CNAM database and post it to your app. Can be: true or false and defaults to false. |
| voice_fallback_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call voice_fallback_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_fallback_url | string<uri> | Optional | Not PII | The URL that we should call when an error occurs retrieving or executing the TwiML requested by url. |
| voice_method | enum<http-method> | Optional | Not PII | The HTTP method that we should use to call voice_url. Can be: GET or POST and defaults to POST. Possible values: GET, POST |
| voice_url | string<uri> | Optional | Not PII | The URL that we should call to answer a call to the phone number. The voice_url will not be called if a voice_application_sid or a trunk_sid is set. |
| emergency_status | enum<string> | Optional | Not PII | The parameter displays if emergency calling is enabled for this number. Active numbers may place emergency calls by dialing valid emergency numbers for the country. Possible values: Active, Inactive |
| emergency_address_sid | SID<AD> | Optional | Not PII | The SID of the emergency address configuration to use for emergency calling from this phone number. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| trunk_sid | SID<TK> | Optional | Not PII | The SID of the Trunk we should use to handle phone calls to the phone number. If a trunk_sid is present, we ignore all of the voice urls and voice applications and use only those set on the Trunk. Setting a trunk_sid will automatically delete your voice_application_sid and vice versa. Pattern: `^TK[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| voice_receive_mode | enum<string> | Optional | Not PII | Possible values: voice, fax |
| identity_sid | SID<RI> | Optional | Not PII | The SID of the Identity resource that we should associate with the phone number. Some regions require an identity to meet local regulations. Pattern: `^RI[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| address_sid | SID<AD> | Optional | Not PII | The SID of the Address resource we should associate with the phone number. Some regions require addresses to meet local regulations. Pattern: `^AD[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| bundle_sid | SID<BU> | Optional | Not PII | The SID of the Bundle resource that you associate with the phone number. Some regions require a Bundle to meet local Regulations. Pattern: `^BU[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

---

## Update IncomingPhoneNumber to Include an AddressSid and a BundleSid

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    address_sid="ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": true,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "type": "local"
}
```

---

## Update IncomingPhoneNumber to Use a New Voice URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(voice_url="https://www.your-new-voice-url.com/example")

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": true,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": "https://www.your-new-voice-url.com/example",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

---

## Update IncomingPhoneNumber to Use a New SMS URL

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(sms_url="https://www.your-new-sms-url.com/example")

print(incoming_phone_number.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "voice": true,
    "sms": false,
    "mms": true,
    "fax": false
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_address_status": "registered",
  "friendly_name": "(808) 925-5327",
  "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "origin": "origin",
  "phone_number": "+18089255327",
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_application_sid": "",
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "https://www.your-new-sms-url.com/example",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_application_sid": "",
  "voice_caller_id_lookup": true,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null,
  "voice_receive_mode": "voice",
  "status": "in-use",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "local"
}
```

---

## Delete an IncomingPhoneNumber Resource

```
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
```

Deleting an IncomingPhoneNumber releases it from your account. Twilio will no longer answer calls to this number and will stop charging the monthly fee.

Twilio might reclaim and assign the number to another customer, so delete numbers with caution. If you make a mistake, contact Twilio Support. We might be able to give you the number back.

### Path Parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account that created the IncomingPhoneNumber resources to delete. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<PN> | required | Not PII | The Twilio-provided string that uniquely identifies the IncomingPhoneNumber resource to delete. Pattern: `^PN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete an IncomingPhoneNumber

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.incoming_phone_numbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```