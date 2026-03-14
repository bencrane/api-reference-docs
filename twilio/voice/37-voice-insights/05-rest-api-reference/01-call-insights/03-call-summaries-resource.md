# Call Summaries Resource

A Call Summary provides an overview of:

- metadata, and
- quality metrics

for a single call.

Using the Call Summaries Resource, you can get a list of Call Summaries.

To get the Call Summary for an individual call use the Call Summary Resource.

> ℹ️ **Info:** Voice Insights Advanced Features must be active to use this API Resource.

> ℹ️ **Info:** A completed Call Summary may take up to a half hour to generate, but a partial summary record will be available within ten minutes of a call ending.

## Call Summary properties

The following table contains the top-level properties of a single Call Summary instance.

A Call Summary is a complex data structure with several of the top-level properties constituting nested objects.

The top level contains attributes and properties objects, and each edge of a call has metrics for both directions of the media stream as well as properties and summarized metrics. Further information for these object-typed properties can be found on the Details: Call Summary page.

Whether a particular edge is present will depend on the call type. A Voice SDK call will have an `sdk_edge` and a `client_edge`. A SIP trunking call will have a `sip_edge` and a `carrier_edge`. A SIP domain or `<Dial><Sip>` call will have only a `sip_edge`. A PSTN call will have only a `carrier_edge`. See Understanding Twilio Media Edges for a conceptual explanation.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `call_sid` | SID\<CA\> | Optional | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `answered_by` | enum\<string\> | Optional | Not PII | The Answered By value for the summarized call based on Answering Machine Detection (AMD). One of `unknown`, `machine_start`, `machine_end_beep`, `machine_end_silence`, `machine_end_other`, `human` or `fax`. |
| `call_type` | enum\<string\> | Optional | Not PII | The Call Type of the summarized Call. One of `carrier`, `sip`, `trunking`, `client` or `whatsapp`. |
| `call_state` | enum\<string\> | Optional | Not PII | The Call State of the summarized Call. One of `ringing`, `completed`, `busy`, `fail`, `noanswer`, `canceled`, `answered`, `undialed`. |
| `processing_state` | enum\<string\> | Optional | Not PII | The Processing State of the Call Summary. The Processing State will be `partial` until the assembly of the Call Summary finishes, which occurs approximately 30 minutes after Call end. Then the Processing State changes to `complete`. |
| `created_time` | string\<date-time\> | Optional | Not PII | The time at which the Call was created, given in ISO 8601 format. Can be different from `start_time` in the event of queueing due to CPS. |
| `start_time` | string\<date-time\> | Optional | Not PII | The time at which the Call was started, given in ISO 8601 format. |
| `end_time` | string\<date-time\> | Optional | Not PII | The time at which the Call was ended, given in ISO 8601 format. |
| `duration` | integer | Optional | Not PII | Duration between when the call was initiated and the call was ended. |
| `connect_duration` | integer | Optional | Not PII | Duration between when the call was answered and when it ended. |
| `from` | object | Optional | PII MTL: 30 days | The calling party. |
| `to` | object | Optional | PII MTL: 30 days | The called party. |
| `carrier_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a PSTN call. |
| `client_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a Client call. |
| `sdk_edge` | object | Optional | Not PII | Contains metrics and properties for the SDK sensor library for Client calls. |
| `sip_edge` | object | Optional | Not PII | Contains metrics and properties for the Twilio media gateway of a SIP Interface or Trunking call. |
| `tags` | array[string] | Optional | Not PII | Tags applied to calls by Voice Insights analysis indicating a condition that could result in subjective degradation of the call quality. |
| `url` | string\<uri\> | Optional | Not PII | The URL of this resource. |
| `attributes` | object | Optional | Not PII | Attributes capturing call-flow-specific details. |
| `properties` | object | Optional | Not PII | Contains edge-agnostic call-level details. |
| `trust` | object | Optional | Not PII | Contains trusted communications details including Branded Call and verified caller ID. |
| `annotation` | null | Optional | Not PII | |

## Read multiple Call Summary resources

```
GET https://insights.twilio.com/v1/Voice/Summaries
```

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `from` | string | Optional | PII MTL: 30 days | A calling party. Could be an E.164 number, a SIP URI, or a Twilio Client registered name. |
| `to` | string | Optional | PII MTL: 30 days | A called party. Could be an E.164 number, a SIP URI, or a Twilio Client registered name. |
| `from_carrier` | string | Optional | Not PII | An origination carrier. |
| `to_carrier` | string | Optional | Not PII | A destination carrier. |
| `from_country_code` | string | Optional | Not PII | A source country code based on phone number in From. |
| `to_country_code` | string | Optional | Not PII | A destination country code. Based on phone number in To. |
| `verified_caller` | boolean | Optional | Not PII | A boolean flag indicating whether or not the caller was verified using SHAKEN/STIR. One of `true` or `false`. |
| `has_tag` | boolean | Optional | Not PII | A boolean flag indicating the presence of one or more Voice Insights Call Tags. |
| `start_time` | string | Optional | Not PII | A Start time of the calls. xm (x minutes), xh (x hours), xd (x days), 1w, 30m, 3d, 4w or datetime-ISO. Defaults to 4h. |
| `end_time` | string | Optional | Not PII | An End Time of the calls. xm (x minutes), xh (x hours), xd (x days), 1w, 30m, 3d, 4w or datetime-ISO. Defaults to 0m. |
| `call_type` | string | Optional | Not PII | A Call Type of the calls. One of `carrier`, `sip`, `trunking` or `client`. |
| `call_state` | string | Optional | Not PII | A Call State of the calls. One of `ringing`, `completed`, `busy`, `fail`, `noanswer`, `canceled`, `answered`, `undialed`. |
| `direction` | string | Optional | Not PII | A Direction of the calls. One of `outbound_api`, `outbound_dial`, `inbound`, `trunking_originating`, `trunking_terminating`. |
| `processing_state` | enum\<string\> | Optional | Not PII | A Processing State of the Call Summaries. One of `completed`, `partial` or `all`. |
| `sort_by` | enum\<string\> | Optional | Not PII | A Sort By criterion for the returned list of Call Summaries. One of `start_time` or `end_time`. |
| `subaccount` | SID\<AC\> | Optional | Not PII | A unique SID identifier of a Subaccount. Pattern: `^AC[0-9a-fA-F]{32}$` |
| `abnormal_session` | boolean | Optional | Not PII | A boolean flag indicating an abnormal session where the last SIP response was not 200 OK. |
| `answered_by` | enum\<string\> | Optional | Not PII | An Answered By value for the calls based on AMD. One of `unknown`, `machine_start`, `machine_end_beep`, `machine_end_silence`, `machine_end_other`, `human` or `fax`. |
| `answered_by_annotation` | string | Optional | Not PII | Either `machine` or `human`. |
| `connectivity_issue_annotation` | string | Optional | Not PII | A Connectivity Issue with the calls. One of `no_connectivity_issue`, `invalid_number`, `caller_id`, `dropped_call`, or `number_reachability`. |
| `quality_issue_annotation` | string | Optional | Not PII | A subjective Quality Issue with the calls. One of `no_quality_issue`, `low_volume`, `choppy_robotic`, `echo`, `dtmf`, `latency`, `owa`, `static_noise`. |
| `spam_annotation` | boolean | Optional | Not PII | A boolean flag indicating spam calls. |
| `call_score_annotation` | string | Optional | Not PII | A Call Score of the calls. Use a range of 1-5 to indicate the call experience score (5: Excellent, 4: Good, 3: Fair, 2: Poor, 1: Bad). |
| `branded_enabled` | boolean | Optional | Not PII | A boolean flag indicating whether or not the calls were branded using Twilio Branded Calls. |
| `voice_integrity_enabled` | boolean | Optional | Not PII | A boolean flag indicating whether or not the phone number had voice integrity enabled. |
| `branded_bundle_sid` | string | Optional | Not PII | A unique SID identifier of the Branded Call. |
| `branded_logo` | boolean | Optional | Not PII | Indicates whether the branded logo was displayed during the in_brand branded call. |
| `branded_type` | string | Optional | Not PII | Indicates whether the Branded Call is `in_band` vs `out_of_band`. |
| `branded_use_case` | string | Optional | Not PII | Specifies the user-defined purpose for the call, as provided during the setup of in_band branded calling. |
| `branded_call_reason` | string | Optional | Not PII | Specifies the user-defined reason for the call, which will be displayed to the end user on their mobile device during an in_band branded call. |
| `voice_integrity_bundle_sid` | string | Optional | Not PII | A unique SID identifier of the Voice Integrity Profile. |
| `voice_integrity_use_case` | string | Optional | Not PII | A Voice Integrity Use Case. One of `abandoned_cart`, `appointment_reminders`, `customer_support`, `telehealth`, etc. |
| `business_profile_identity` | string | Optional | Not PII | A Business Identity of the calls. One of `direct_customer`, `isv_reseller_or_partner`. |
| `business_profile_industry` | string | Optional | Not PII | A Business Industry of the calls. One of `automotive`, `banking`, `healthcare`, `technology`, etc. |
| `business_profile_bundle_sid` | string | Optional | Not PII | A unique SID identifier of the Business Profile. |
| `business_profile_type` | string | Optional | Not PII | A Business Profile Type of the calls. One of `primary`, `secondary`. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

## Read multiple Call Summaries

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(limit=20)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?PageSize=25&Page=0"
  },
  "call_summaries": []
}
```

## Read multiple Call Summaries from to/from specific carriers for a date range

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(
    to_carrier="AT&T Wireless", start_time="4h", limit=20
)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?ToCarrier=AT%26T+Wireless&AnsweredBy=machine_start&VoiceIntegrityEnabled=true&StartTime=4h&BrandedEnabled=true&PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?ToCarrier=AT%26T+Wireless&AnsweredBy=machine_start&VoiceIntegrityEnabled=true&StartTime=4h&BrandedEnabled=true&PageSize=25&Page=0"
  },
  "call_summaries": [
    {
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "created_time": "2021-08-25T03:40:25Z",
      "start_time": "2021-08-25T03:40:25Z",
      "end_time": "2021-08-25T03:40:45Z",
      "duration": 20,
      "connect_duration": 20,
      "call_type": "carrier",
      "call_state": "completed",
      "answered_by": "machine_start",
      "from": {
        "caller": "+15555555555",
        "carrier": "T-Mobile USA, Inc.",
        "connection": "mobile",
        "number_prefix": "1555",
        "location": {
          "lat": 40.83885,
          "lon": -74.04568
        },
        "country_code": "US"
      },
      "to": {
        "callee": "+15555555556",
        "carrier": "AT&T Wireless",
        "connection": "mobile",
        "number_prefix": "1555",
        "location": {
          "lat": 33.42767,
          "lon": -86.886475
        },
        "country_code": "US"
      },
      "processing_state": "complete",
      "sdk_edge": null,
      "sip_edge": null,
      "client_edge": null,
      "carrier_edge": {
        "properties": {
          "media_region": "us1",
          "signaling_region": "us1",
          "edge_location": "xxxxx",
          "direction": "inbound"
        },
        "metrics": {
          "inbound": {
            "codec": 0,
            "codec_name": "pcmu",
            "packets_received": 202,
            "packets_lost": 0,
            "packets_loss_percentage": 0,
            "jitter": {
              "max": 1.48209,
              "avg": 0.483035
            }
          },
          "outbound": {
            "codec": 0,
            "codec_name": "pcmu",
            "packets_sent": 218,
            "packets_lost": 0,
            "packets_loss_percentage": 0,
            "jitter": {
              "max": 0.51868,
              "avg": 0.364434
            }
          }
        }
      },
      "tags": [
        "high_packet_loss",
        "high_jitter"
      ],
      "attributes": {
        "conference_participant": false
      },
      "properties": {
        "last_sip_response_num": 200,
        "pdd_ms": 121,
        "disconnected_by": "callee",
        "direction": "inbound"
      },
      "trust": {
        "verified_caller": {
          "verified": true
        },
        "branded": {
          "enabled": true,
          "display_name": "Owl bank",
          "long_display_name": "Owl bank Ltd",
          "bundle_sid": "BU5ceeea51b1424478fc541dfef0e2b167",
          "logo": true,
          "type": "in_band",
          "use_case": "Customer Care",
          "call_reason": "Branded CTIA"
        },
        "business_profile": {
          "bundle_sid": "BU5ceeea51b1424478fc541dfef0e2b167",
          "identity": "direct_customer",
          "industry": "BANKING",
          "type": "corporate"
        },
        "voice_integrity": {
          "enabled": true,
          "bundle_sid": "BU5ceeea51b1424478fc541dfef0e2b167",
          "use_case": "customer_support"
        }
      },
      "annotation": null,
      "url": "https://insights.twilio.com/v1/Voice/Summaries"
    }
  ]
}
```

## Read multiple Call Summaries from a subaccount with detected issues

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(
    has_tag=True,
    start_time="7d",
    call_type="client",
    subaccount="ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
    limit=20,
)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?CallType=client&StartTime=7d&HasTag=true&Subaccount=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab&PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?CallType=client&StartTime=7d&HasTag=true&Subaccount=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab&PageSize=25&Page=0"
  },
  "call_summaries": [
    {
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "created_time": "2021-08-25T04:16:35Z",
      "start_time": "2021-08-25T04:16:36Z",
      "end_time": "2021-08-25T04:16:42Z",
      "duration": 7,
      "connect_duration": 6,
      "call_type": "client",
      "call_state": "completed",
      "answered_by": "machine_start",
      "from": {
        "caller": "client:+15555555555",
        "connection": "twilio_sdk"
      },
      "to": {
        "callee": "client:TBBXXXXXXXXXXXX",
        "connection": "twilio_sdk"
      },
      "processing_state": "complete",
      "sdk_edge": null,
      "sip_edge": null,
      "client_edge": {
        "properties": {
          "media_region": "us1",
          "signaling_region": "us1",
          "twilio_media_ip": "54.xxx.xx.xxx",
          "external_media_ip": "54.xxx.xx.xxx",
          "edge_location": "xxxxxx",
          "direction": "inbound"
        },
        "metrics": {
          "inbound": {
            "codec": 0,
            "codec_name": "pcmu",
            "packets_received": 252,
            "packets_lost": 0,
            "packets_loss_percentage": 0,
            "jitter": {
              "max": 5.60994,
              "avg": 0.933334
            }
          },
          "outbound": {
            "codec": 0,
            "codec_name": "pcmu",
            "packets_sent": 229,
            "packets_lost": 0,
            "packets_loss_percentage": 0,
            "jitter": {
              "max": 0.960786,
              "avg": 0.399859
            }
          }
        }
      },
      "carrier_edge": null,
      "tags": [
        "high_pdd"
      ],
      "attributes": {
        "conference_participant": false
      },
      "properties": {
        "last_sip_response_num": 200,
        "pdd_ms": 58,
        "disconnected_by": "callee",
        "direction": "inbound"
      },
      "trust": null,
      "annotation": null,
      "url": "https://insights.twilio.com/v1/Voice/Summaries"
    }
  ]
}
```

## Read multiple Call Summaries for outbound calls signed with SHAKEN/STIR

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(
    verified_caller=True,
    start_time="1d",
    direction="outbound_api,outbound_dial,trunking_terminating",
    limit=20,
)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?Direction=outbound_api%2Coutbound_dial%2Ctrunking_terminating&StartTime=1d&VerifiedCaller=true&PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?Direction=outbound_api%2Coutbound_dial%2Ctrunking_terminating&StartTime=1d&VerifiedCaller=true&PageSize=25&Page=0"
  },
  "call_summaries": [
    {
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "created_time": "2021-08-25T14:31:18Z",
      "start_time": "2021-08-25T14:31:22Z",
      "end_time": "2021-08-25T14:32:02Z",
      "duration": 44,
      "connect_duration": 41,
      "call_type": "trunking",
      "call_state": "completed",
      "answered_by": "machine_start",
      "processing_state": "complete",
      "tags": [
        "silence"
      ],
      "trust": {
        "verified_caller": {
          "verified": true
        }
      },
      "annotation": null,
      "url": "https://insights.twilio.com/v1/Voice/Summaries"
    }
  ]
}
```

## Read multiple Call Summaries for SIP calls which did not end in 200 OK

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(
    start_time="15d",
    call_type="sip,trunking",
    call_state="completed",
    abnormal_session=True,
    limit=20,
)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?CallType=sip%2Ctrunking&CallState=completed&StartTime=15d&AbnormalSession=true&PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?CallType=sip%2Ctrunking&CallState=completed&StartTime=15d&AbnormalSession=true&PageSize=25&Page=0"
  },
  "call_summaries": [
    {
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "created_time": "2021-08-25T14:46:40Z",
      "start_time": "2021-08-25T14:46:40Z",
      "end_time": "2021-08-25T14:46:52Z",
      "duration": 12,
      "connect_duration": 12,
      "call_type": "sip",
      "call_state": "completed",
      "answered_by": "machine_start",
      "processing_state": "complete",
      "tags": null,
      "annotation": null,
      "url": "https://insights.twilio.com/v1/Voice/Summaries"
    }
  ]
}
```

## Read multiple Call Summaries with annotations

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call_summaries = client.insights.v1.call_summaries.list(
    start_time="15d",
    answered_by="human",
    connectivity_issue_annotation="no_connectivity_issue",
    quality_issue_annotation="latency",
    spam_annotation=False,
    call_score_annotation="1",
    limit=20,
)

for record in call_summaries:
    print(record.account_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Voice/Summaries?PageSize=25&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "call_summaries",
    "url": "https://insights.twilio.com/v1/Voice/Summaries?PageSize=25&Page=0"
  },
  "call_summaries": []
}
```