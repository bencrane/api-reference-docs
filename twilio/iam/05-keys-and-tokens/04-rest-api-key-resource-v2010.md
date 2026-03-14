# REST API: Key Resource v2010

> **Warning:** Key resource v2010 limitations - The Key resource v2010 doesn't support creating Restricted API keys. The latest version of the Key resource is Key resource v1. The Key resource v1 supports all the features of Key resource v2010 and adds the ability to create Restricted API keys.

Use the Key resource to create and manage Standard API keys.

API keys represent the required credentials that you'll use to authenticate to Twilio's REST API and to create and revoke Access Tokens.

> **Info:** If your API key requires access to the Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) endpoints, then you'll need to use a Main key. You can create Main keys only in the Twilio Console.

## Types of keys

The API key types are `Main`, `Standard`, and `Restricted` (Key resource v1 only). The following table describes each type:

| Key type | Access permissions | Create in Console | Create with REST API |
|----------|-------------------|-------------------|---------------------|
| Main | Full access to all Twilio API resources. Equivalent to using your Account SID and Auth Token for API requests. | Yes | No |
| Standard | Access to all Twilio API resources, except for Accounts (`/Accounts`) or Keys (`/Accounts/{SID}/Keys`, `/v1/Keys`) resources. | Yes | Yes |
| Restricted | Customized, fine-grained access to specific Twilio API resources. Learn more about Restricted API keys. | Yes | Yes (v1 only) |

## Key Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<SK\> | Optional | Not PII | The unique string that that we created to identify the Key resource. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| friendly_name | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| date_created | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |

---

## Create an API key

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys.json
```

> **Warning:** To create Standard API keys with the API, you must use one of the following credentials: your Account SID and Auth Token, a Main API key, or a Restricted API key with the permission for `/twilio/iam/api-keys/create`.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that will be responsible for the new Key resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |

The response contains a `sid` property and a `secret` property. Store the secret in a secure location, because you won't be able to retrieve it again. Twilio uses the Key resource's `sid` and the `secret` as the credentials when making API requests.

### Create an API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

new_key = client.new_keys.create(friendly_name="Mario's API key")

print(new_key.sid)
```

**Response:**

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar"
}
```

---

## Fetch a Key resource

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
```

Returns a representation of the API key.

> **Warning:** For security reasons, Twilio returns the secret field only when the API key is first created and never includes the secret field when you fetch the resource. Your application should store the API key's SID and secret in a secure location to authenticate to the API.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Key resource to fetch. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| sid | SID\<SK\> | required | Not PII | The Twilio-provided string that uniquely identifies the Key resource to fetch. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Fetch an API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

key = client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(key.sid)
```

**Response:**

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
}
```

---

## List Key resources

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys.json
```

Returns a list of API keys associated with a given Account, sorted by DateUpdated.

The list includes all API keys and paging information.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Key resources to read. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: `1` Maximum: `1000` |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: `0` |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### Read a Key resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

keys = client.keys.list(limit=20)

for record in keys:
    print(record.sid)
```

**Response:**

```json
{
  "keys": [
    {
      "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "foo",
      "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
      "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json?PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Keys.json?PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
```

---

## Update a Key resource

```
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
```

Attempts to update the fields of an API Key resource.

If successful, Twilio returns the updated resource representation. The response is identical to that of the fetch a Key resource endpoint.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Key resources to update. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| sid | SID\<SK\> | required | Not PII | The Twilio-provided string that uniquely identifies the Key resource to update. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |

### Update a Key resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

key = client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name"
)

print(key.sid)
```

**Response:**

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000"
}
```

---

## Delete a Key Resource

```
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
```

Deletes an API key. Deleting an API key revokes the authorization to authenticate to the REST API and invalidates all Access Tokens generated using the API key's secret.

If the deletion is successful, Twilio returns an HTTP 204 response with no body.

> **Warning:** You may only delete keys by authenticating with the account's AccountSid and AuthToken or API keys that have the Main key flag set in the console.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Key resources to delete. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| sid | SID\<SK\> | required | Not PII | The Twilio-provided string that uniquely identifies the Key resource to delete. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Delete a Key resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.keys("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```