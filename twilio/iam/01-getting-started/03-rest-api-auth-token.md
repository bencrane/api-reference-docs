# REST API: Auth Token

> **Warning:** If you are using **Services** or **Functions(Classic)** and have included your auth token directly instead of using a variable, you must wait for 1 minute for the update of your auth token to propagate. Otherwise, those functions and services will fail with a `403 Forbidden` error.

Twilio uses the Account SID and Auth Token to authenticate API requests. You can rotate the Auth Token in the **Twilio Console** or by using this API. Two related endpoints help you manage Auth Tokens: use the **Secondary Auth Token endpoint** to create or delete a secondary token, and use this endpoint to promote the secondary token.

## Auth Token properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the **Account** that the secondary Auth Token was created for. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: `34` Max length: `34` |
| auth_token | string | Optional | PII MTL: 0 days | The promoted Auth Token that must be used to authenticate future API requests. |
| date_created | string\<date-time\> | Optional | Not PII | The date and time in UTC when the resource was created specified in **ISO 8601** format. |
| date_updated | string\<date-time\> | Optional | Not PII | The date and time in GMT when the resource was last updated specified in **ISO 8601** format. |
| url | string\<uri\> | Optional | Not PII | The URI for this resource, relative to `https://accounts.twilio.com` |

## Update an AuthTokenPromotion resource

```
POST https://accounts.twilio.com/v1/AuthTokens/Promote
```

This action deletes the current primary Auth Token and promotes the secondary Auth Token to primary.

### Promote the Secondary Auth Token

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

auth_token_promotion = client.accounts.v1.auth_token_promotion().update()

print(auth_token_promotion.account_sid)
```

**Response:**

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "auth_token": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "date_created": "2015-07-31T04:00:00Z",
  "date_updated": "2015-07-31T04:00:00Z",
  "url": "https://accounts.twilio.com/v1/AuthTokens/Promote"
}
```