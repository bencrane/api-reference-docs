# Call Metric Resource

A Call Metric is an object representing:

- a set of quantitative measurements and
- meta data

related to the quality of a voice call.

Using the Call Metrics Resource, you can read a list of Call Metrics for a specified voice call.

> ⚠️ **Warning:** Voice Insights Advanced Features must be active to use this API Resource.

> ℹ️ **Info:** Metrics are typically available via the API within 90 seconds of call completion.

## Call Metric properties

The following table details the properties of a single Call Metric sample instance.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `timestamp` | string | Optional | Not PII | Timestamp of metric sample. Samples are taken every 10 seconds and contain the metrics for the previous 10 seconds. |
| `call_sid` | SID\<CA\> | Optional | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `edge` | enum\<string\> | Optional | Not PII | The Twilio media edge this Metric was captured on. One of `unknown_edge`, `carrier_edge`, `sip_edge`, `sdk_edge` or `client_edge`. |
| `direction` | enum\<string\> | Optional | Not PII | The Direction of the media stream from the perspective of the Twilio media edge. One of `unknown`, `inbound`, `outbound` or `both`. |
| `carrier_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a PSTN call. |
| `sip_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a SIP Interface or Trunking call. |
| `sdk_edge` | object | Optional | Not PII | Contains metrics and properties for the SDK sensor library for Client calls. |
| `client_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a Client call. |

## Edge Metrics and properties

Metric samples from these edges contain the following properties:

| Property | Description |
|----------|-------------|
| `codec` | RTP profile number of the detected codec |
| `codec_name` | Name of the detected codec |
| `cumulative` | Cumulative jitter (max/avg), packets lost, and packet count for the stream received at this edge |
| `interval` | `sdk_edge`: audio in/out, jitter, packet loss, rtt, and packet loss percentage for the sampling interval. *All other edges*: packets received, packets lost, and packet loss percentage. |
| `metadata` | Twilio media region of the selected edge, Twilio and endpoint IP media IP addresses |

## Read multiple Call Metric resources

```
GET https://insights.twilio.com/v1/Voice/{CallSid}/Metrics
```

Use this action to retrieve a list of Call Metrics for the specified voice call.

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
| `edge` | enum\<string\> | Optional | Not PII | The Edge of this Metric. One of `unknown_edge`, `carrier_edge`, `sip_edge`, `sdk_edge` or `client_edge`. |
| `direction` | enum\<string\> | Optional | Not PII | The Direction of this Metric. One of `unknown`, `inbound`, `outbound` or `both`. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

## Read multiple Call Metrics for a Call

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

metrics = client.insights.v1.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).metrics.list(limit=20)

for record in metrics:
    print(record.timestamp)
```

### Response

```json
{
  "meta": {
    "page": 10,
    "page_size": 5,
    "first_page_url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Metrics?Direction=both&Edge=sdk_edge&PageSize=5&Page=0",
    "previous_page_url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Metrics?Direction=both&Edge=sdk_edge&PageSize=5&Page=9&PageToken=PT10",
    "next_page_url": null,
    "key": "metrics",
    "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Metrics?Direction=both&Edge=sdk_edge&PageSize=5&Page=10"
  },
  "metrics": [
    {
      "timestamp": "2019-10-07T22:32:06Z",
      "call_sid": "CA7569efe0253644fa4a88aa97beca3310",
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "edge": "sdk_edge",
      "direction": "both",
      "sdk_edge": {
        "interval": {
          "packets_received": 50,
          "packets_lost": 0,
          "audio_in": {
            "value": 81
          },
          "audio_out": {
            "value": 5237
          },
          "jitter": {
            "value": 9
          },
          "mos": {
            "value": 4.39
          },
          "rtt": {
            "value": 81
          }
        },
        "cumulative": {
          "bytes_received": 547788,
          "bytes_sent": 329425,
          "packets_received": 3900,
          "packets_lost": 0,
          "packets_sent": 3934
        }
      },
      "client_edge": null,
      "carrier_edge": null,
      "sip_edge": null
    }
  ]
}
```

## Read multiple Call Metrics for a Call filtered by Media Edge

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

metrics = client.insights.v1.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).metrics.list(edge="sdk_edge", limit=20)

for record in metrics:
    print(record.timestamp)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Metrics?PageSize=50&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "metrics",
    "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Metrics?PageSize=50&Page=0"
  },
  "metrics": [
    {
      "timestamp": "2019-10-07T22:32:06Z",
      "call_sid": "CA7569efe0253644fa4a88aa97beca3310",
      "account_sid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "edge": "sdk_edge",
      "direction": "both",
      "sdk_edge": {
        "interval": {
          "packets_received": 50,
          "packets_lost": 0,
          "audio_in": {
            "value": 81
          },
          "audio_out": {
            "value": 5237
          },
          "jitter": {
            "value": 9
          },
          "mos": {
            "value": 4.39
          },
          "rtt": {
            "value": 81
          }
        },
        "cumulative": {
          "bytes_received": 547788,
          "bytes_sent": 329425,
          "packets_received": 3900,
          "packets_lost": 0,
          "packets_sent": 3934
        }
      },
      "client_edge": null,
      "carrier_edge": null,
      "sip_edge": null
    }
  ]
}
```