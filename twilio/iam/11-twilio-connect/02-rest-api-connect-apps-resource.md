# Twilio Connect - REST API: Connect Apps

The ConnectApps list resource shows all of the Connect Apps that you have created within your Twilio account. The instance resource shows information about the ConnectApp as well as the permissions the ConnectApp will request from authorized users.

## ConnectApp Instance Resource

### Resource URI

```
/2010-04-01/Accounts/{AccountSid}/ConnectApps/{ConnectAppSid}
```

### Resource Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The SID of the Account that created the ConnectApp resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| authorize_redirect_url | string\<uri\> | Optional | PII MTL: 30 days | The URL we redirect the user to after we authenticate the user and obtain authorization to access the Connect App. |
| company_name | string | Optional | PII MTL: 30 days | The company name set for the Connect App. |
| deauthorize_callback_method | enum\<http-method\> | Optional | Not PII | The HTTP method we use to call deauthorize_callback_url. Possible values: `GET`, `POST` |
| deauthorize_callback_url | string\<uri\> | Optional | PII MTL: 30 days | The URL we call using the deauthorize_callback_method to de-authorize the Connect App. |
| description | string | Optional | PII MTL: 30 days | The description of the Connect App. |
| friendly_name | string | Optional | PII MTL: 30 days | The string that you assigned to describe the resource. |
| homepage_url | string\<uri\> | Optional | PII MTL: 30 days | The public URL where users can obtain more information about this Connect App. |
| permissions | array[enum\<string\>] | Optional | Not PII | The set of permissions that your ConnectApp requests. Possible values: `get-all`, `post-all` |
| sid | SID\<CN\> | Optional | Not PII | The unique string that that we created to identify the ConnectApp resource. Pattern: `^CN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| uri | string | Optional | Not PII | The URI of the resource, relative to https://api.twilio.com. |

### HTTP GET

Get the properties of a Connect App.

#### Example: Retrieve a Connect App

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connect_app = client.connect_apps("CNb989fdd207b04d16aee578018ef5fd93").fetch()

print(connect_app.account_sid)
```

#### Response

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "authorize_redirect_url": "http://example.com/redirect",
  "company_name": "Twilio",
  "deauthorize_callback_method": "GET",
  "deauthorize_callback_url": "http://example.com/deauth",
  "description": null,
  "friendly_name": "Connect app for deletion",
  "homepage_url": "http://example.com/home",
  "permissions": [],
  "sid": "CNb989fdd207b04d16aee578018ef5fd93",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### HTTP POST

Tries to update the Connect App's properties, and returns the updated resource representation if successful. The returned response is identical to that returned above when making a GET request.

#### Optional Parameters

You may specify one or more of the following parameters to update this Connect App's respective properties:

#### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | required | Not PII | The SID of the Account that created the ConnectApp resources to update. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| sid | SID\<CN\> | required | Not PII | The Twilio-provided string that uniquely identifies the ConnectApp resource to update. Pattern: `^CN[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

#### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| authorize_redirect_url | string\<uri\> | Optional | PII MTL: 30 days | The URL to redirect the user to after we authenticate the user and obtain authorization to access the Connect App. |
| company_name | string | Optional | PII MTL: 30 days | The company name to set for the Connect App. |
| deauthorize_callback_method | enum\<http-method\> | Optional | Not PII | The HTTP method to use when calling deauthorize_callback_url. Possible values: `GET`, `POST` |
| deauthorize_callback_url | string\<uri\> | Optional | PII MTL: 30 days | The URL to call using the deauthorize_callback_method to de-authorize the Connect App. |
| description | string | Optional | PII MTL: 30 days | A description of the Connect App. |
| friendly_name | string | Optional | PII MTL: 30 days | A descriptive string that you create to describe the resource. It can be up to 64 characters long. |
| homepage_url | string\<uri\> | Optional | PII MTL: 30 days | A public URL where users can obtain more information about this Connect App. |
| permissions | array[enum\<string\>] | Optional | Not PII | A comma-separated list of the permissions you will request from the users of this ConnectApp. Can include: `get-all` and `post-all`. |

### HTTP PUT

Not supported.

### HTTP DELETE

Not supported.

## ConnectApp List Resource

### Resource URI

```
/2010-04-01/Accounts/{AccountSid}/ConnectApps
```

### HTTP GET

Returns a list of Connect App resource representations, each representing a Connect App in your account. The list includes paging information.

#### Example 1: Retrieve all Connect Apps

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

connect_apps = client.connect_apps.list(limit=20)

for record in connect_apps:
    print(record.account_sid)
```

#### Response

```json
{
  "connect_apps": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "authorize_redirect_url": "http://example.com/redirect",
      "company_name": "Twilio",
      "deauthorize_callback_method": "GET",
      "deauthorize_callback_url": "http://example.com/deauth",
      "description": null,
      "friendly_name": "Connect app for deletion",
      "homepage_url": "http://example.com/home",
      "permissions": [],
      "sid": "CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps/CNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json?Page=0&PageSize=50",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ConnectApps.json?Page=0&PageSize=50"
}
```

### HTTP POST

Not Supported.

### HTTP PUT

Not Supported.

### HTTP DELETE

Not Supported.