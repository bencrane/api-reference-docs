# REST API: Key Resource v1

Use the Key resource to create and manage Standard and Restricted API keys.

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
| sid | SID\<SK\> | Optional | Not PII | The unique string that we created to identify the Key resource. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| friendly_name | string | Optional | Not PII | The string that you assigned to describe the resource. |
| date_created | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that the resource was created specified in RFC 2822 format. |
| date_updated | string\<date-time-rfc-2822\> | Optional | Not PII | The date and time in GMT that the resource was last updated specified in RFC 2822 format. |
| flags | array[string] | Optional | Not PII | |

---

## Create an API key

```
POST https://iam.twilio.com/v1/Keys
```

> **Warning:** To create Standard API keys with the API, you must use one of the following credentials: your Account SID and Auth Token, a Main API key, or a Restricted API key with the permission for `/twilio/iam/api-keys/create`.

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Payments resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| key_type | enum\<string\> | Optional | Not PII | The `KeyType` form parameter is used to specify the type of key you want to create. Default Behavior: If `KeyType` is not specified, the API will generate a standard key. Restricted Key: If `KeyType` is set to `restricted`, the API will create a new restricted key. In this case, a policy object is required to define the permissions. Possible values: `restricted` |
| policy | | Optional | Not PII | The `Policy` object is a collection that specifies the allowed Twilio permissions for the restricted key. For more information on the permissions available with restricted API keys, refer to the Twilio documentation. |

### Create a Standard API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

new_api_key = client.iam.v1.new_api_key.create(
    friendly_name="Mario's API key",
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(new_api_key.sid)
```

**Response:**

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar",
  "policy": null
}
```

The response contains a `sid` property and a `secret` property. Store the secret in a secure location, because you won't be able to retrieve it again. Twilio uses the Key resource's `sid` and the `secret` as the credentials when making API requests.

### Create a Restricted API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

new_api_key = client.iam.v1.new_api_key.create(
    friendly_name="Mario's API key",
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    key_type="restricted",
    policy={"allow": ["/twilio/messaging/messages/read"]},
)

print(new_api_key.sid)
```

**Response:**

```json
{
  "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Mario's API key",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "secret": "foobar",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read"
    ]
  }
}
```

---

## Fetch a Key resource

```
GET https://iam.twilio.com/v1/Keys/{Sid}
```

Returns a representation of the API key.

> **Warning:** For security reasons, Twilio returns the secret field only when the API key is first created and never includes the secret field when you fetch the resource. Your application should store the API key's SID and secret in a secure location to authenticate to the API.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<SK\> | required | Not PII | The Twilio-provided string that uniquely identifies the Key resource to fetch. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Fetch a Standard API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

api_key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1").fetch()

print(api_key.sid)
```

**Response:**

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": null
}
```

### Fetch a Restricted API key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

api_key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2").fetch()

print(api_key.sid)
```

**Response:**

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX2",
  "friendly_name": "foo",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read"
    ]
  }
}
```

---

## List Key resources

```
GET https://iam.twilio.com/v1/Keys
```

Returns a list of API keys associated with a given Account, sorted by DateUpdated.

The list includes all API keys and paging information.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the Payments resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| page_size | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: `1` Maximum: `1000` |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: `0` |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

### List Key resources

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

get_api_keys = client.iam.v1.get_api_keys.list(
    account_sid="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in get_api_keys:
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
      "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
      "flags": [
        "rest_api",
        "signing"
      ]
    },
    {
      "sid": "SKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "friendly_name": "bar",
      "date_created": "Mon, 13 Jun 2016 20:50:08 +0000",
      "date_updated": "Mon, 13 Jun 2016 20:50:08 +0000",
      "flags": [
        "rest_api",
        "signing"
      ]
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://iam.twilio.com/v1/Keys?AccountSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://iam.twilio.com/v1/Keys?AccountSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "keys"
  }
}
```

---

## Update a Key resource

```
POST https://iam.twilio.com/v1/Keys/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| sid | SID\<SK\> | required | Not PII | The Twilio-provided string that uniquely identifies the Key resource to update. Pattern: `^SK[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| policy | | Optional | Not PII | The `Policy` object is a collection that specifies the allowed Twilio permissions for the restricted key. For more information on the permissions available with restricted API keys, refer to the Twilio documentation. |

Attempts to update the fields of an API Key resource.

If successful, Twilio returns the updated resource representation. The response is identical to that of the fetch a Key resource endpoint.

### Update a Standard Key resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
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
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": null
}
```

> **Info:** Update a Restricted key - The update request completely overwrites the existing policy associated with the original API key. You must include all the required permissions in the Policy object of an update request. To remove a specific permission while retaining others, include only the permissions that should be kept.

### Update a Restricted Key resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

key = client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name",
    policy={
        "allow": [
            "/twilio/messaging/messages/read",
            "/twilio/messaging/messages/update",
        ]
    },
)

print(key.sid)
```

**Response:**

```json
{
  "sid": "SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "friendly_name": "friendly_name",
  "date_created": "Mon, 13 Jun 2016 22:50:08 +0000",
  "date_updated": "Mon, 13 Jun 2016 22:50:08 +0000",
  "policy": {
    "allow": [
      "/twilio/messaging/messages/read",
      "/twilio/messaging/messages/update"
    ]
  }
}
```

---

## Delete a Key resource

```
DELETE https://iam.twilio.com/v1/Keys/{Sid}
```

Deletes an API key. Deleting an API key revokes the authorization to authenticate to the REST API and invalidates all Access Tokens generated using the API key's secret.

If the deletion is successful, Twilio returns an HTTP 204 response with no body.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
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

client.iam.v1.api_key("SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```