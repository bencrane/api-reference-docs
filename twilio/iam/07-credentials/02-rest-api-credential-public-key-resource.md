# Credentials PublicKey Resource

The PublicKey resource represents Public Keys in your Twilio account. Public Key Client Validation requires creating public keys.

## PublicKey Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | Optional | Not PII | The unique string that we created to identify the PublicKey resource. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID<AC> | Optional | Not PII | The SID of the Account that created the Credential that the PublicKey resource belongs to. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `friendly_name` | string | Optional | PII MTL: 0 days | The string that you assigned to describe the resource. |
| `date_created` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was created specified in RFC 2822 format. |
| `date_updated` | string<date-time> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in RFC 2822 format. |
| `url` | string<uri> | Optional | Not PII | The URI for this resource, relative to `https://accounts.twilio.com` |

---

## Create a CredentialPublicKey resource

```
POST https://accounts.twilio.com/v1/Credentials/PublicKeys
```

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `public_key` | string | required | Not PII | A URL encoded representation of the public key. For example, `-----BEGIN PUBLIC KEY-----MIIBIjANB.pa9xQIDAQAB-----END PUBLIC KEY-----` |
| `friendly_name` | string | Optional | PII MTL: 0 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| `account_sid` | SID<AC> | Optional | Not PII | The SID of the Subaccount that this Credential should be associated with. Must be a valid Subaccount of the account issuing the request. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Create a Public Key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

public_key = client.accounts.v1.credentials.public_key.create(
    public_key="PublicKey"
)

print(public_key.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "friendly_name",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/PublicKeys/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Fetch a CredentialPublicKey resource

```
GET https://accounts.twilio.com/v1/Credentials/PublicKeys/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the PublicKey resource to fetch. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Fetch a Public Key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

public_key = client.accounts.v1.credentials.public_key(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(public_key.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "friendly_name",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/PublicKeys/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Read multiple CredentialPublicKey resources

```
GET https://accounts.twilio.com/v1/Credentials/PublicKeys
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Read Public Keys

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

public_keys = client.accounts.v1.credentials.public_key.list(limit=20)

for record in public_keys:
    print(record.sid)
```

#### Response

```json
{
  "credentials": [],
  "meta": {
    "first_page_url": "https://accounts.twilio.com/v1/Credentials/PublicKeys?PageSize=50&Page=0",
    "key": "credentials",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://accounts.twilio.com/v1/Credentials/PublicKeys?PageSize=50&Page=0"
  }
}
```

---

## Update a CredentialPublicKey resource

```
POST https://accounts.twilio.com/v1/Credentials/PublicKeys/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the PublicKey resource to update. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `friendly_name` | string | Optional | PII MTL: 0 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |

### Update a Public Key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

credential_public_key = client.accounts.v1.credentials.public_key(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(credential_public_key.sid)
```

#### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "friendly_name": "FriendlyName",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://accounts.twilio.com/v1/Credentials/PublicKeys/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

## Delete a CredentialPublicKey resource

```
DELETE https://accounts.twilio.com/v1/Credentials/PublicKeys/{Sid}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `sid` | SID<CR> | required | Not PII | The Twilio-provided string that uniquely identifies the PublicKey resource to delete. Pattern: `^CR[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Delete a Public Key

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.accounts.v1.credentials.public_key(
    "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```