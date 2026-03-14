# REST API: Accounts

When you sign up with Twilio, you start with one main account. You can create additional accounts as needed. Use subaccounts to segment phone numbers and usage data by customer and to control data access.

To learn more about subaccounts, see Using subaccounts.

## Account Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| auth_token | string | Optional | PII MTL: 30 days | The authorization token for this account. This token should be kept a secret, so no sharing. |
| date_created | string<date-time-rfc-2822> | Optional | Not PII | The date that this account was created, in GMT in RFC 2822 format |
| date_updated | string<date-time-rfc-2822> | Optional | Not PII | The date that this account was last updated, in GMT in RFC 2822 format. |
| friendly_name | string | Optional | PII MTL: 30 days | A human readable description of this account, up to 64 characters long. By default the FriendlyName is your email address. |
| owner_account_sid | SID<AC> | Optional | Not PII | The unique 34 character id that represents the parent of this account. The OwnerAccountSid of a parent account is it's own sid. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID<AC> | Optional | Not PII | A 34 character string that uniquely identifies this resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| status | enum<string> | Optional | Not PII | The status of this account. Usually active, but can be suspended or closed. Possible values: `active`, `suspended`, `closed` |
| subresource_uris | object<uri-map> | Optional | Not PII | A Map of various subresources available for the given Account Instance |
| type | enum<string> | Optional | Not PII | The type of this account. Either Trial or Full if it's been upgraded. Possible values: `Trial`, `Full` |
| uri | string | Optional | Not PII | The URI for this resource, relative to https://api.twilio.com |

---

## Create an Account resource

```
POST https://api.twilio.com/2010-04-01/Accounts.json
```

Create a new Account instance resource as a subaccount of the one used to make the request. See Creating subaccounts for more information.

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A human readable description of the account to create, defaults to SubAccount Created at {YYYY-MM-DD HH:MM meridian} |

### Create an Account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account = client.api.v2010.accounts.create()

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

## Fetch an Account resource

```
GET https://api.twilio.com/2010-04-01/Accounts/{Sid}.json
```

Return an account representation, including the properties listed above.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<AC> | required | Not PII | The Account Sid that uniquely identifies the account to fetch. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch an Account

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
    "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

## Read multiple Account resources

```
GET https://api.twilio.com/2010-04-01/Accounts.json
```

Retrieve all Account resources that belong to the account making the API request, including its subaccounts.

When fetching multiple pages of API results, use the next_page_uri parameter to retrieve the next page. All Twilio SDKs use the next_page_uri value to paginate resources. For more information, see Twilio response pagination.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | Only return the Account resources with friendly names that exactly match this name. |
| status | enum<string> | Optional | Not PII | Only return Account resources with the given status. Can be closed, suspended or active. Possible values: `active`, `suspended`, `closed` |
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List All Accounts

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

accounts = client.api.v2010.accounts.list(limit=20)

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

### List All Active Accounts

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

accounts = client.api.v2010.accounts.list(status="active", limit=20)

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

## Update an Account resource

```
POST https://api.twilio.com/2010-04-01/Accounts/{Sid}.json
```

Modify the properties of an account.

See the Subaccounts reference for more information on suspending, unsuspending or closing subaccounts using the 'Status' parameter.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID<AC> | required | Not PII | The Account Sid that uniquely identifies the account to update. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | Update the human-readable description of this Account |
| status | enum<string> | Optional | Not PII | The status of this account. Usually active, but can be suspended or closed. Possible values: `active`, `suspended`, `closed` |

### Suspend a subaccount

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
).update(status="suspended")

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

### Reactivate a suspended subaccount

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
).update(status="active")

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

### Permanently close a subaccount

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
).update(status="closed")

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