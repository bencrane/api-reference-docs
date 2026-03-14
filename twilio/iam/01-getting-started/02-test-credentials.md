# Test Credentials

Twilio provides test credentials you can use to exercise parts of the REST API without incurring charges.

You use test credentials the same way you use your live credentials, except that you can't sign in to the Twilio CLI with them. When you authenticate with test credentials, Twilio doesn't charge your account, update the state of your account, or connect to real phone numbers. You can therefore simulate buying a phone number or sending an SMS without affecting production data.

To protect production data, requests that use test credentials can't interact with resources in your live account. For example, a request made with test credentials can't specify a live account phone number as the From phone number.

## Find your test credentials

To find your test credentials:

1. Log in to the Twilio Console.
2. In the top-right corner, click the Admin, then click Account management.
3. In the left navigation, click API keys & tokens.
4. Scroll down to the Test credentials section and retrieve your test Account SID and Test auth Token.

## Supported resources

As of now, test credentials can interact with the following resources:

- **Buying phone numbers:** `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/IncomingPhoneNumbers`
- **Sending SMS messages:** `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Messages`
- **Making calls:** `POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Calls`
- **Lookup:** `GET https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}`

Requests to any other resource with test credentials return a 403 Forbidden status code. Additional resources might be supported in the future.

> **Warning:** SMS messages and calls sent by using test credentials don't trigger status callbacks. Learn more about status callbacks for outbound SMS and status callbacks for Voice.

## Magic input

When you make an API request with test credentials, Twilio validates the input exactly as it does for live credentials. In some cases, request validity depends on Twilio's current state. For example, buying a phone number that has already been purchased returns an error.

To write automated tests that expect specific errors, use magic input values. For instance, the magic phone number `+15005550000`, when sent as the PhoneNumber parameter in a POST to IncomingPhoneNumbers, always returns the "number unavailable" error.

Magic inputs depend on the endpoint you're testing and are detailed below.

> **Note:** You can't use magic input values with live credentials. Only test credentials work with magic input values.

---

## Test buying a number

You can test the phone numbers API without provisioning a number or incurring charges by using your test credentials.

Send a POST request to the standard phone-number purchase endpoint, authenticating with your test credentials and using your TestAccountSid in the URL:

```
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/IncomingPhoneNumbers
```

### Parameters

All standard phone-number purchase parameters work with test credentials. The following magic input values generate success and failure cases.

#### PhoneNumber

| Value | Description | Error code |
|-------|-------------|------------|
| +15005550000 | Phone number is unavailable. | 21422 |
| +15005550001 | Phone number is invalid. | 21421 |
| +15005550006 | Phone number is valid and available. | No error |

#### AreaCode

| Value | Description | Error code |
|-------|-------------|------------|
| 533 | No available phone numbers in this area code. | 21452 |
| 500 | At least one number is available in this area code. | No error |

### Example 1: Purchase a number successfully

Using your test credentials, provision a number successfully by purchasing the magic number +15005550006. Any additional parameters, such as VoiceUrl or StatusCallback, are echoed in the response.

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
    phone_number="+15005550006",
    voice_url="http://demo.twilio.com/docs/voice.xml",
)

print(incoming_phone_number.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
  "phone_number": "+15005550006",
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
  "voice_url": "http://demo.twilio.com/docs/voice.xml",
  "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_receive_mode": "voice",
  "status": "in-use",
  "type": "local"
}
```

### Example 2: Attempt to purchase an unavailable number

Using your test credentials, attempt to purchase an unavailable number by passing the magic number +15005550000.

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
    phone_number="+15005550000"
)

print(incoming_phone_number.account_sid)
```

### Example 3: Attempt to buy an invalid number

Using your test credentials, specify an invalid number as input. Very short or very long strings fail validation.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

incoming_phone_number = client.incoming_phone_numbers.create(phone_number="33")

print(incoming_phone_number.account_sid)
```

---

## Test sending an SMS

You can test the Messages API without sending an SMS or incurring charges by using your test credentials.

Send a POST request to the standard SMS endpoint, authenticating with your test credentials and using your TestAccountSid in the URL:

```
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Messages
```

### Parameters

All standard outbound SMS parameters work, except for MessagingServiceSid. The following magic input values generate success and failure cases.

#### From

Your test credentials don't have access to verified From phone numbers in your live account. Use the following magic numbers:

| Value | Description | Error code |
|-------|-------------|------------|
| +15005550001 | Phone number is invalid. | 21212 |
| +15005550007 | Number is not owned by your account or is not SMS-capable. | 21606 |
| +15005550008 | SMS message queue for this number is full. | 21611 |
| +15005550006 | Number passes all validation. | No error |
| All others | Number is not owned by your account or is not SMS-capable. | 21606 |

#### To

| Value | Description | Error code |
|-------|-------------|------------|
| +15005550001 | Phone number is invalid. | 21211 |
| +15005550002 | Twilio can't route to this number. | 21612 |
| +15005550003 | Account lacks international permissions to send SMS to this number. | 21408 |
| +15005550004 | Number is blocked for your account. | 21610 |
| +15005550009 | Number can't receive SMS messages. | 21614 |
| All others | Number is validated normally. | Input-dependent |

### Example 1: Send an SMS successfully

Using your test credentials, send an SMS by using the magic number +15005550006 as the From number and any valid phone number as the To number.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="All in the game, yo", from_="+15005550006", to="+5571981265131"
)

print(message.body)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "All in the game, yo",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15005550006",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+5571981265131",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Example 2: Attempt to send a message to a non-mobile number

Using your test credentials, attempt to send a message to a non-mobile number by passing the magic number +15005550009 as the To number.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="Hey Mr Nugget, you the bomb!", from_="+15005550006", to="+15005550009"
)

print(message.body)
```

### Example 3: Attempt to send a message with an empty SMS body

Using your test credentials, attempt to send a message with an empty SMS body. No magic numbers are required; the validation error is raised normally.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="", from_="+15005550006", to="+14108675310"
)

print(message.body)
```

---

## Test making a call

You can test the Calls API without placing a real call or incurring charges by using your test credentials. Because no call is placed, Twilio doesn't request the URL specified in the Url parameter and no TwiML is executed.

Send a POST request to the standard outbound call endpoint, authenticating with your test credentials and using your TestAccountSid in the URL:

```
POST https://api.twilio.com/2010-04-01/Accounts/{TestAccountSid}/Calls
```

### Parameters

All standard outbound call parameters work. The following magic input values generate success and failure cases.

#### From

Use the following magic numbers as the From phone number:

| Value | Description | Error code |
|-------|-------------|------------|
| +15005550001 | Phone number is invalid. | 21212 |
| +15005550006 | Valid From number for your account. | No error |
| All others | Number isn't verified for your account. | 21210 |

#### To

| Value | Description | Error code |
|-------|-------------|------------|
| +15005550001 | Phone number is invalid. | 21217 |
| +15005550002 | Twilio can't route to this number. | 21214 |
| +15005550003 | Account lacks international permissions to call this number. | 21215 |
| +15005550004 | Number is blocked for your account. | 21216 |
| All others | Number is validated normally. | Input-dependent |

### Example 1: Make a call successfully

Using your test credentials, enqueue an outgoing call successfully by using the magic number +15005550006 as the From number and any valid phone number as the To number.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14108675310",
    from_="+15005550006",
)

print(call.sid)
```

**Response:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15005550006",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14108675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Example 2: Attempt to call an international number without permissions

Using your test credentials, attempt to call an international number in a country without permissions enabled by passing the magic number +15005550003 as the To number.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    url="http://demo.twilio.com/docs/voice.xml",
    to="+15005550003",
    from_="+15005550006",
)

print(call.sid)
```

---

## Test Lookup

For details on testing Lookup with test credentials, see Magic Numbers for Lookup.