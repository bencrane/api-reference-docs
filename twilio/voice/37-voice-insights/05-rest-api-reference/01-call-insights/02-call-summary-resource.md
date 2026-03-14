# Call Summary Resource

A Call Summary provides an overview of:

- metadata, and
- quality metrics

for a single call.

Using the Call Summary Resource, you can get a single summary for a specific Call.

To get a list of Call Summaries for multiple calls use the Call Summaries Resource.

> ⚠️ **Warning:** Voice Insights Advanced Features must be active to use this API Resource.

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
| `call_type` | enum\<string\> | Optional | Not PII | The Call Type of the summarized Call. One of `carrier`, `sip`, `trunking`, `client` and `whatsapp`. |
| `call_state` | enum\<string\> | Optional | Not PII | The Call State of the summarized Call. One of `ringing`, `completed`, `busy`, `fail`, `noanswer`, `canceled`, `answered`, `undialed`. |
| `answered_by` | enum\<string\> | Optional | Not PII | The Answered By value for the summarized call based on Answering Machine Detection (AMD). One of `unknown`, `machine_start`, `machine_end_beep`, `machine_end_silence`, `machine_end_other`, `human` or `fax`. Refer to AMD for more detail. |
| `processing_state` | enum\<string\> | Optional | Not PII | The Processing State of the Call Summary. The Processing State will be `partial` until the assembly of the Call Summary finishes, which occurs approximately 30 minutes after Call end. Then the Processing State changes to `complete`. Possible values: `complete`, `partial` |
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
| `annotation` | object | Optional | Not PII | Programmatically labeled annotations for the Call. Developers can update the Call Summary records with Annotation during or after a Call. Annotations can be updated as long as the Call Summary record is addressable via the API. |

## Fetch a Summary resource

```
GET https://insights.twilio.com/v1/Voice/{CallSid}/Summary
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `call_sid` | SID\<CA\> | required | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `processing_state` | enum\<string\> | Optional | Not PII | The Processing State of this Call Summary. One of `complete`, `partial` or `all`. |

## Fetch a Call Summary

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

summary = (
    client.insights.v1.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .summary()
    .fetch()
)

print(summary.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_type": "carrier",
  "call_state": "ringing",
  "answered_by": "machine_start",
  "processing_state": "complete",
  "created_time": "2015-07-30T20:00:00Z",
  "start_time": "2015-07-30T20:00:00Z",
  "end_time": "2015-07-30T20:00:00Z",
  "duration": 100,
  "connect_duration": 99,
  "from": {},
  "to": {},
  "carrier_edge": {},
  "client_edge": {},
  "sdk_edge": {},
  "sip_edge": {},
  "tags": [
    "tags"
  ],
  "attributes": {},
  "properties": {},
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
  "annotation": {
    "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "answered_by": "human",
    "connectivity_issue": "invalid_number",
    "quality_issues": [
      "low_volume"
    ],
    "spam": true,
    "call_score": 2,
    "comment": "this is a call",
    "incident": "https://twilio.zendesk.com/support/tickets/17353089"
  },
  "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Summary"
}
```

## Fetch a partial Call Summary

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

summary = (
    client.insights.v1.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .summary()
    .fetch(processing_state="partial")
)

print(summary.account_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_type": "carrier",
  "call_state": "ringing",
  "answered_by": "machine_start",
  "processing_state": "partial",
  "created_time": "2015-07-30T20:00:00Z",
  "start_time": "2015-07-30T20:00:00Z",
  "end_time": "2015-07-30T20:00:00Z",
  "duration": 100,
  "connect_duration": 99,
  "from": {},
  "to": {},
  "carrier_edge": {},
  "client_edge": {},
  "sdk_edge": {},
  "sip_edge": {},
  "tags": [
    "tags"
  ],
  "attributes": {},
  "properties": {},
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
  "annotation": {
    "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "answered_by": "human",
    "connectivity_issue": "invalid_number",
    "quality_issues": [
      "low_volume"
    ],
    "spam": true,
    "call_score": 2,
    "comment": "this is a call",
    "incident": "https://twilio.zendesk.com/support/tickets/17353089"
  },
  "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Summary"
}
```