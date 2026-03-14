# REST API: Authorized Connect Apps

The AuthorizedConnectApps list resource shows all of the Connect Apps that you have authorized for your account. Each Connect App corresponds to a subaccount within your Twilio account, which acts as that Connect App's sandbox. The instance resource shows you the permissions you have granted for a Connect App as well as information about the Connect App itself.

## AuthorizedConnectApp Instance Resource

### Resource URI

```
/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}
```

### Resource Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the Account that created the AuthorizedConnectApp resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| connect_app_company_name | string | Optional | Not PII | The company name set for the Connect App. |
| connect_app_description | string | Optional | Not PII | A detailed description of the Connect App. |
| connect_app_friendly_name | string | Optional | Not PII | The name of the Connect App. |
| connect_app_homepage_url | string\<uri\> | Optional | Not PII | The public URL for the Connect App. |
| connect_app_sid | SID\<CN\> | Optional | Not PII | The SID that we assigned to the Connect App. Pattern: `^CN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| permissions | array[enum\<string\>] | Optional | Not PII | The set of permissions that you authorized for the Connect App. Can be: `get-all` or `post-all`. |
| uri | string | Optional | Not PII | The URI of the resource, relative to https://api.twilio.com. |

### HTTP GET

#### Example: Retrieve an Authorized Connect App

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

authorized_connect_app = client.authorized_connect_apps(
    "CN47260e643654388faabe8aaa18ea6756"
).fetch()

print(authorized_connect_app.account_sid)
```

#### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "connect_app_company_name": "aaa",
  "connect_app_description": "alksjdfl;ajseifj;alsijfl;ajself;jasjfjas;lejflj",
  "connect_app_friendly_name": "aaa",
  "connect_app_homepage_url": "http://www.google.com",
  "connect_app_sid": "CN47260e643654388faabe8aaa18ea6756",
  "permissions": [
    "get-all"
  ],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### HTTP POST

Not supported.

### HTTP PUT

Not supported.

### HTTP DELETE

Not supported.

## AuthorizedConnectApps List Resource

### Resource URI

```
/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps
```

### HTTP GET

Returns a list of Connect App resource representations, each representing a Connect App you've authorized to access your account. The list includes paging information.

#### Example 1: Retrieve all Authorized Connect Apps

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

authorized_connect_apps = client.authorized_connect_apps.list(limit=20)

for record in authorized_connect_apps:
    print(record.account_sid)
```

#### Response

```json
{
  "authorized_connect_apps": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "connect_app_company_name": "aaa",
      "connect_app_description": "alksjdfl;ajseifj;alsijfl;ajself;jasjfjas;lejflj",
      "connect_app_friendly_name": "aaa",
      "connect_app_homepage_url": "http://www.google.com",
      "connect_app_sid": "CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "permissions": [
        "get-all"
      ],
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=0&PageSize=50",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=2&PageSize=50",
  "page": 0,
  "page_size": 50,
  "previous_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=1&PageSize=50",
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AuthorizedConnectApps.json?Page=0&PageSize=50"
}
```

### HTTP POST

Not Supported.

### HTTP PUT

Not Supported.

### HTTP DELETE

Not Supported.