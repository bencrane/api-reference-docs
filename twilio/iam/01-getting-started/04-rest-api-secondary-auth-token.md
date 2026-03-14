# REST API: Secondary Auth Token

> **Warning:** If you are using **Services** or **Functions(Classic)** and have included your auth token directly instead of using a variable, you must wait for 1 minute for the update of your auth token to propagate. Otherwise, those functions and services will fail with a `403 Forbidden` error.

Twilio uses the Account SID and Auth Token to authenticate API requests. The Auth Token can be rotated in the **Console** or with this API. There are two related endpoints, one to **promote the secondary Auth Token** and this one to create or delete the secondary Auth Token.

## Secondary Auth Token properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the **Account** that the secondary Auth Token was created for. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| date_created | string\<date-time\> | Optional | Not PII | The date and time in UTC when the resource was created specified in **ISO 8601** format. |
| date_updated | string\<date-time\> | Optional | Not PII | The date and time in UTC when the resource was last updated specified in **ISO 8601** format. |
| secondary_auth_token | string | Optional | PII MTL: 0 days | The generated secondary Auth Token that can be used to authenticate future API requests. |
| url | string\<uri\> | Optional | Not PII | The URI for this resource, relative to `https://accounts.twilio.com` |

## Create a SecondaryAuthToken resource

```
POST https://accounts.twilio.com/v1/AuthTokens/Secondary
```

### Create a Secondary Auth Token

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

secondary_auth_token = client.accounts.v1.secondary_auth_token().create()

print(secondary_auth_token.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "secondary_auth_token": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "url": "https://accounts.twilio.com/v1/AuthTokens/Secondary"
}
```

## Delete a SecondaryAuthToken resource

```
DELETE https://accounts.twilio.com/v1/AuthTokens/Secondary
```

### Delete the Secondary Auth Token

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.accounts.v1.secondary_auth_token().delete()
```