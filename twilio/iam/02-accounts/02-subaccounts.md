# REST API: Subaccounts

Subaccounts in Twilio are accounts owned by your main account. Using a subaccount, you can segment each of your customers' use of Twilio and keep it separate from all the rest. This will allow you to manage the activity and resources of each customer independently.

> **Important Notes**
> - A main account can only have up to 1000 subaccounts by default. If you need more subaccounts, contact support.
> - By default, Twilio deletes closed subaccounts 30 days after closure.

---

## Billing

Twilio bills all subaccount usage directly to your main account. You'll have one Twilio balance for all subaccounts. If your main Twilio account is ever suspended, your subaccounts will also be suspended.

---

## Authentication

You can use your main account credentials (AccountSid and AuthToken) to access the Twilio REST API for your main account. You can also access v2010 API resources for any of your subaccounts. You may also use a subaccount's AccountSid and AuthToken to access the resources of that subaccount. You can't use a subaccount's credentials to access resources in your main Twilio account or any other subaccounts.

If you're authenticating with the SDKs, pass in your main Account SID and main Auth Token as the first two credentials. Pass the appropriate Subaccount SID as the third parameter.

> **Danger**
> When performing CRUD operations within a subaccount, use the subaccount SID and auth token. Alternatively, you can generate API Keys at the subaccount level for authentication.

> **Warning**
> Main account API Keys are only available to access main account resources. Access to subaccount resources will be denied.

> **Warning**
> Your main account credentials will allow you to access resources for any of your subaccounts that fall under the v2010 REST API. However, resources on subdomains, such as studio.twilio.com and taskrouter.twilio.com, must be accessed directly using subaccount credentials (API Keys or subaccount SID + subaccount auth token).

There are many ways to determine if a resource lives on its own subdomain or under v2010. One example method is to find the API Reference page for the resource, such as the Workspace resource. Observe the returned URL value in the example payloads. If the URL begins with `https://SOME-SUBDOMAIN.twilio.com`, then you must access that resource using subaccount-specific credentials. If you do the same for some other resource, such as the Messaging resource, and see that URI begins with `/2010-04-01`, then it can be safely accessed using either your main account or subaccount credentials.

---

## International

We are working on ways to help our customers minimize the risk of fraudulent international calls and provide ways for Twilio subaccounts to dial certain international destinations. If you have any questions, contact support.

---

## Permissions

Subaccounts use the main account's voice and SMS messaging permissions.

---

## Creating Subaccounts

To create a subaccount, make an HTTP POST request to your Accounts list resource URI:

```
/2010-04-01/Accounts
```

If successful, Twilio responds with a representation of the new Account resource.

### POST parameters

#### Optional parameters

Include the following optional parameters in your request to create a subaccount:

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A human readable description of the account to create, defaults to SubAccount Created at {YYYY-MM-DD HH:MM meridian} |

The FriendlyName property is useful for organizing accounts and linking them back to information in your system. For example, you may want to create subaccounts where the FriendlyName is the primary key of the customer in your application's database.

### Example: Create a subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts.create(friendly_name="Submarine")

print(account.auth_token)
```

### Response

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "Submarine",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## Get started with subaccounts

Subaccounts are a great way to segment your Twilio usage and act on behalf of your customers, agents, or employees.

If you're running a hosted service that relies on Twilio you can create a Twilio subaccount for each customer that signs up. Then if a customer closes their account with your service, you can deactivate the associated Twilio subaccount.

Subaccounts allow you to use the Twilio REST API just as you would for a single account. A subaccount can have its phone numbers and caller IDs, applications, and SIP Domains. You can manage a subaccount's calls, messages, recordings, and transcriptions without affecting other subaccounts.

---

## Finding subaccounts

You can query any particular subaccount and its related resources via the REST API by AccountSid.

### Return a subaccount resource by its account SID

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts(
    "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(account.auth_token)
```

### Response

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

If you don't know the AccountSid of a subaccount but you know the FriendlyName, you can query your Accounts list resource with a FriendlyName query string filter.

### Query subaccounts by friendly name

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

accounts = client.api.v2010.accounts.list(
    friendly_name="MySubaccount", limit=20
)

for record in accounts:
    print(record.auth_token)
```

### Response

```json
{
  "first_page_uri": "/2010-04-01/Accounts.json?FriendlyName=friendly_name&Status=active&PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "accounts": [],
  "uri": "/2010-04-01/Accounts.json?FriendlyName=friendly_name&Status=active&PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
```

---

## Making a phone call with a subaccount

To make calls using a subaccount, use the subaccount's Account SID and Auth Token.

### Make a call from a subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

call = client.calls.create(
    url="https://twimlets.com/message?Message%5B0%5D=Hello%20from%20your%20subaccount",
    to="+16518675310",
    from_="+14158141829",
)

print(call.sid)
```

### Response

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
  "from": "+14158141829",
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
  "to": "+16518675310",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

---

## Sending a message from a subaccount

To send messages using a subaccount, use the subaccount's Account SID and Auth Token when making your request to the Twilio Programmable Messaging API.

### Send a message from a subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

message = client.messages.create(
    to="+16518675310", from_="+14158141829", body="Ahoy there!"
)

print(message.body)
```

### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Ahoy there!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14158141829",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+16518675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

---

## Calculate billing for subaccount usage

In many cases, you may want to calculate the billing incurred by a subaccount. Let's say you created a subaccount for a customer and you needed to charge them for their usage.

You can iterate over all of the calls and sum up the product of price and duration.

The following example shows the API request to fetch all Calls that began on January 15, 2018. In the response, each object in the calls array contains a price property.

**Note:** In this example, the StartTime parameter returns calls only that began on January 15, 2018. You can also use inequalities (for example, `<=` and `>=`) and the EndTime parameter to fetch all Calls from a specific date span. Learn more on the Call Resource API Reference page.

### Calculate billing for subaccount usage

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
subaccount_sid = os.environ["TWILIO_SUBACCOUNT_SID"]
client = Client(account_sid, auth_token, subaccount_sid)

calls = client.calls.list(start_time=datetime(2009, 7, 6, 20, 30, 0), limit=20)

for record in calls:
    print(record.price)
```

### Response

```json
{
  "calls": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "answered_by": "machine_start",
      "api_version": "2010-04-01",
      "caller_name": "callerid1",
      "date_created": "Fri, 18 Oct 2019 17:00:00 +0000",
      "date_updated": "Fri, 18 Oct 2019 17:01:00 +0000",
      "direction": "outbound-api",
      "duration": "4",
      "end_time": "Fri, 18 Oct 2019 17:03:00 +0000",
      "forwarded_from": "calledvia1",
      "from": "+13051416799",
      "from_formatted": "(305) 141-6799",
      "group_sid": "GPdeadbeefdeadbeefdeadbeefdeadbeef",
      "parent_call_sid": "CAdeadbeefdeadbeefdeadbeefdeadbeef",
      "phone_number_sid": "PNdeadbeefdeadbeefdeadbeefdeadbeef",
      "price": "-0.200",
      "price_unit": "USD",
      "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "start_time": "Fri, 18 Oct 2019 17:02:00 +0000",
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
      "to": "+13051913581",
      "to_formatted": "(305) 191-3581",
      "trunk_sid": "TKdeadbeefdeadbeefdeadbeefdeadbeef",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "queue_time": "1000"
    }
  ],
  "end": 1,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=1&PageToken=PACAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa0",
  "page": 0,
  "page_size": 2,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json?Status=completed&To=%2B123456789&From=%2B987654321&StartTime=2008-01-02&ParentCallSid=CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EndTime=2009-01-02&PageSize=2&Page=0"
}
```

---

## Suspending a subaccount

While an account is suspended, it can't make or receive phone calls or send and receive SMS messages. This is useful when your customer does not pay their bill and you want to suspend their account until a successful payment is received. However, you will be charged monthly for any phone numbers the subaccount owns.

To suspend a subaccount, POST the parameter 'Status' with the value 'suspended'.

> **Warning**
> Note that in-progress calls will not end when a subaccount is suspended. You must change the status of these calls to completed.

### Suspend a Subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="suspended"
)

print(account.sid)
```

### Response

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "suspended",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

To reactivate a suspended subaccount, POST the value active for the Status parameter and we will restore the account to full service.

### Re-activate a Suspended Subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="active"
)

print(account.auth_token)
```

### Response

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "active",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

> **Warning**
> Note that you must use your main account's authentication credentials to suspend a subaccount. You can't suspend your main account.

---

## Closing a subaccount

If your customer closes their account with you, you can permanently close the associated Twilio subaccount by POSTing the parameter Status with the value closed to the subaccount resource URI.

### Permanently Close a Subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts("ACXXXX-SUBACCOUNT-SID-XXXX").update(
    status="closed"
)

print(account.auth_token)
```

### Response

```json
{
  "auth_token": "auth_token",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "owner_account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "ACXXXX-SUBACCOUNT-SID-XXXX",
  "status": "closed",
  "subresource_uris": {
    "available_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json",
    "calls": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls.json",
    "conferences": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json",
    "incoming_phone_numbers": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json",
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "outgoing_caller_ids": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OutgoingCallerIds.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "addresses": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json",
    "signing_keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SigningKeys.json",
    "connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json",
    "sip": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP.json",
    "authorized_connect_apps": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json",
    "usage": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage.json",
    "keys": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json",
    "applications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json",
    "short_codes": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SMS/ShortCodes.json",
    "queues": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Queues.json",
    "messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages.json",
    "balance": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Balance.json"
  },
  "type": "Full",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

When you close a subaccount, Twilio will release all phone numbers assigned to it and shut it down completely. You can't ever use a closed account to make and receive phone calls or send and receive SMS messages. Note that you can't reopen a closed account.

Your closed subaccount will still appear in your accounts list, and you will still have access to historical data for that subaccount, unless deletion of closed subaccounts is activated.

If you have turned on deletion of closed subaccounts through the Subaccounts settings page, Twilio will delete all subaccount data 30 days after closure. This includes previously closed subaccounts. Those subaccounts will no longer appear on the Console.

Twilio has turned on this setting for all accounts created after July 5, 2018, and for all accounts without subaccounts. For all other accounts, account owners can turn this setting on through the Subaccounts settings page.

> **Warning**
> Note that you must use your main account's authentication credentials to close a subaccount. You also can't close your main account.

---

## Exchange phone numbers between accounts

Before transferring phone numbers, review the following information about WhatsApp-activated numbers:

> **WhatsApp Activated Numbers**
> If you have a WhatsApp Sender connected to your phone number, it will not be moved to the gaining account SID. To move phone numbers connected to WhatsApp Senders, open a support ticket to move the WhatsApp Sender before moving the phone number.

You can transfer numbers between subaccounts, and between your main account and any one of your subaccounts. You must use your main account's credentials when making the API request to transfer a phone number.

To transfer a phone number between two accounts that you control, make an HTTP POST request to an IncomingPhoneNumber instance resource URI. In the body of the POST set the parameter 'AccountSid' to the AccountSid of the account you want to own that number. This will remove the phone number from its original account and make it available under the IncomingPhoneNumbers list resource of the target account.

**Important notes:**
- Number configurations may need to be reconfigured.
- Any Toll-Free number verifications, A2P registrations or Trust Hub enrollments will need to be resubmitted and reconfigured.
- If any of the phone numbers you would like to transfer have Address Requirements, you will need to create a compliant Address in the target subaccount before transferring the phone number.
- Closing a subaccount as described above will release all of that account's phone numbers. You might consider transferring all numbers to your main account beforehand if you want to keep them.

### Example: Transfer phone numbers from primary account to subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
sub_account_sid = os.environ['TWILIO_SUBACCOUNT_SID']
client = Client(account_sid, auth_token)

incoming_phone_number = client \
    .incoming_phone_numbers('PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
    .update(account_sid=sub_account_sid)

print(incoming_phone_number.friendly_name)
```

### Output

```json
{
  "account_sid": "AC00000000000000000000000000000002",
  "address_requirements": "none",
  "address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "beta": false,
  "capabilities": {
    "mms": true,
    "sms": false,
    "voice": true
  },
  "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
  "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
  "emergency_status": "Inactive",
  "emergency_address_sid": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "My Company Line",
  "identity_sid": "RIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "origin": "origin",
  "phone_number": "+15105647903",
  "sid": "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sms_application_sid": null,
  "sms_fallback_method": "POST",
  "sms_fallback_url": "",
  "sms_method": "POST",
  "sms_url": "",
  "status_callback": "",
  "status_callback_method": "POST",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/AC00000000000000000000000000000002/IncomingPhoneNumbers/PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json",
  "voice_application_sid": null,
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_url": null
}
```