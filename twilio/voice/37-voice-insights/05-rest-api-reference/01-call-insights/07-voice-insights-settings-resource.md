# Voice Insights Settings Resource

Voice Insights Settings determine whether:

- Advanced Features and/or
- Voice Trace

are activated for a given account.

Using the Voice Insights Settings Resource, you can:

- get the Voice Insights Settings, or
- update one or more of the Voice Insights Settings

for an account or a specific subaccount.

## Voice Insight Settings properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `advanced_features` | boolean | Optional | Not PII | A boolean flag indicating whether Advanced Features for Voice Insights are enabled. |
| `voice_trace` | boolean | Optional | Not PII | A boolean flag indicating whether Voice Trace is enabled. |
| `url` | string\<uri\> | Optional | Not PII | The URL of this resource. |

## Get the Voice Insights Settings

```
GET https://insights.twilio.com/v1/Voice/Settings
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `subaccount_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Subaccount. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Get the Voice Insights Settings for the account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

setting = client.insights.v1.settings().fetch()

print(setting.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_trace": true,
  "advanced_features": true,
  "url": "https://insights.twilio.com/v1/Voice/Settings"
}
```

## Update Voice Insights Settings

```
POST https://insights.twilio.com/v1/Voice/Settings
```

To manage subaccount Settings pass the subaccount SID as a parameter in the request.

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `advanced_features` | boolean | Optional | Not PII | A boolean flag to enable Advanced Features for Voice Insights. |
| `voice_trace` | boolean | Optional | Not PII | A boolean flag to enable Voice Trace. |
| `subaccount_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Subaccount. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Update Settings to activate Advanced Features for the account

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account_settings = client.insights.v1.settings().update(advanced_features=True)

print(account_settings.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_trace": true,
  "advanced_features": true,
  "url": "https://insights.twilio.com/v1/Voice/Settings"
}
```

### Update Settings to activate Voice Trace for a subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

account_settings = client.insights.v1.settings().update(
    subaccount_sid="ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab", voice_trace=True
)

print(account_settings.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "voice_trace": true,
  "advanced_features": true,
  "url": "https://insights.twilio.com/v1/Voice/Settings"
}
```