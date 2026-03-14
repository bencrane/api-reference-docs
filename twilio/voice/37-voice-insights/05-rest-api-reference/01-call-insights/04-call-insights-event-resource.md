# Call Insights Event Resource

A Call Insights Event is an object representing an event which occurred during a voice call.

Call Events can be:

- call progress events, or
- Voice SDK quality events.

Using the Call Insights Event Resource, you can read a list of Call Insights Events for a specific voice call.

> ⚠️ **Warning:** Voice Insights Advanced Features must be active to use this API Resource.

> ⚠️ **Warning:** Voice Insights for mobile SDKs is supported for versions 3.x and later. Calls placed using 2.x mobile SDKs are not supported and details are provided as-is and may not be reliable indicators of actual behavior on the handset.

> ℹ️ **Info:** Events are typically available via the API within 90 seconds.

## Call Insights Event properties

The following table details the properties of a single Call Insights Event instance.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `timestamp` | string | Optional | Not PII | Event time. |
| `call_sid` | SID\<CA\> | Optional | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `edge` | enum\<string\> | Optional | Not PII | The Edge of this Event. One of `unknown_edge`, `carrier_edge`, `sip_edge`, `sdk_edge` or `client_edge`. |
| `group` | string | Optional | Not PII | Event group. |
| `level` | enum\<string\> | Optional | Not PII | The Level of this Event. One of `UNKNOWN`, `DEBUG`, `INFO`, `WARNING` or `ERROR`. |
| `name` | string | Optional | Not PII | Event name. |
| `carrier_edge` | object | Optional | Not PII | Represents the connection between Twilio and our immediate carrier partners. The events here describe the call lifecycle as reported by Twilio's carrier media gateways. |
| `sip_edge` | object | Optional | Not PII | Represents the Twilio media gateway for SIP interface and SIP trunking calls. The events here describe the call lifecycle as reported by Twilio's public media gateways. |
| `sdk_edge` | object | Optional | Not PII | Represents the Voice SDK running locally in the browser or in the Android/iOS application. The events here are emitted by the Voice SDK in response to certain call progress events, network changes, or call quality conditions. |
| `client_edge` | object | Optional | Not PII | Represents the Twilio media gateway for Client calls. The events here describe the call lifecycle as reported by Twilio's Voice SDK media gateways. |

## Read multiple Call Insights Event resources

```
GET https://insights.twilio.com/v1/Voice/{CallSid}/Events
```

Use this action to retrieve a list of Call Insights Events for the specified voice call.

You can use the optional `edge` parameter to filter the list by media edge. See Understanding Twilio Media Edges for more information.

If no edge parameter is provided, the resulting list will depend on the call type:

| Call Type | Default Edge | Additional Edge |
|-----------|--------------|-----------------|
| Carrier | carrier_edge | N/A |
| SIP | sip_edge | N/A |
| Client | sdk_edge | client_edge |
| Trunking Originating | carrier_edge | sip_edge |
| Trunking Terminating | sip_edge | carrier_edge |

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `call_sid` | SID\<CA\> | required | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `edge` | enum\<string\> | Optional | Not PII | The Edge of this Event. One of `unknown_edge`, `carrier_edge`, `sip_edge`, `sdk_edge` or `client_edge`. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

## Read multiple Call Insights Events for a Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

events = client.insights.v1.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).events.list(limit=20)

for record in events:
    print(record.timestamp)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "events",
    "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?PageSize=50&Page=0"
  },
  "events": [
    {
      "timestamp": "2019-09-19T22:15:23Z",
      "call_sid": "CA03a02b156c6faa96c86906f7e9ad0f38",
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "edge": "sdk_edge",
      "group": "connection",
      "name": "error",
      "level": "ERROR",
      "sdk_edge": {
        "error": {
          "code": 31600
        },
        "metadata": {
          "client_name": "GTI9300323095d271b890c91568931321395",
          "location": {
            "lat": 37.4192,
            "lon": -122.0574
          },
          "city": "Mountain View",
          "country_code": "US",
          "country_subdivision": "California",
          "ip_address": "108.177.7.83",
          "sdk": {
            "type": "twilio-voice-android",
            "version": "4.5.1",
            "platform": "android",
            "selected_region": "gll",
            "os": {
              "name": "android",
              "version": "4.3"
            },
            "device": {
              "model": "GT-I9300",
              "type": "GT-I9300",
              "vendor": "samsung",
              "arch": "armeabi-v7a"
            }
          }
        }
      },
      "client_edge": null,
      "carrier_edge": null,
      "sip_edge": null
    }
  ]
}
```

## Read multiple Call Insights Events for a Call filtered by Media Edge

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

events = client.insights.v1.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).events.list(edge="sdk_edge", limit=20)

for record in events:
    print(record.timestamp)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "events",
    "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?PageSize=50&Page=0"
  },
  "events": [
    {
      "timestamp": "2019-09-19T22:15:23Z",
      "call_sid": "CA03a02b156c6faa96c86906f7e9ad0f38",
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "edge": "sdk_edge",
      "group": "connection",
      "name": "error",
      "level": "ERROR",
      "sdk_edge": {
        "error": {
          "code": 31600
        },
        "metadata": {
          "client_name": "GTI9300323095d271b890c91568931321395",
          "location": {
            "lat": 37.4192,
            "lon": -122.0574
          },
          "city": "Mountain View",
          "country_code": "US",
          "country_subdivision": "California",
          "ip_address": "108.177.7.83",
          "sdk": {
            "type": "twilio-voice-android",
            "version": "4.5.1",
            "platform": "android",
            "selected_region": "gll",
            "os": {
              "name": "android",
              "version": "4.3"
            },
            "device": {
              "model": "GT-I9300",
              "type": "GT-I9300",
              "vendor": "samsung",
              "arch": "armeabi-v7a"
            }
          }
        }
      },
      "client_edge": null,
      "carrier_edge": null,
      "sip_edge": null
    }
  ]
}
```