# Call Annotation Resource

> ⚠️ **Warning:** Currently the Call Annotation API is only available for the United States (US1) Region. Find more information on the Twilio Regional Product and Feature Availability page.

A Call Annotation captures subjective experience details for a voice call.

For instance, a Call Annotation can contain information about:

- call quality issues,
- spam labeling,
- customer-internal tags, and
- other meta data.

Using the Call Annotation Resource, you can:

- get the Call Annotation, or
- update the Call Annotation

for a specific call.

To get a list of Call Summaries with specific Call Annotations, you can use the Call Summaries Resource.

## Annotation Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `call_sid` | SID\<CA\> | Optional | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `answered_by` | enum\<string\> | Optional | Not PII | Specifies which entity answered the call as determined by Answering Machine Detection. Possible values: `unknown_answered_by`, `human`, `machine`. `human` indicates the call was answered by a person. `machine` indicates the call was answered by an answering machine. |
| `connectivity_issue` | enum\<string\> | Optional | Not PII | Specifies if the call had any connectivity issues. One of `unknown_connectivity_issue`, `no_connectivity_issue`, `invalid_number`, `caller_id`, `dropped_call`, or `number_reachability`. |
| `quality_issues` | array[string] | Optional | Not PII | Specifies if the call had any subjective quality issues. Possible values are one or more of `no_quality_issue`, `low_volume`, `choppy_robotic`, `echo`, `dtmf`, `latency`, `owa`, or `static_noise`. |
| `spam` | boolean | Optional | Not PII | Specifies if the call was a spam call. Use this to provide feedback on whether calls placed from your account were marked as spam, or if inbound calls received by your account were unwanted spam. Use `true` if the call was a spam call. |
| `call_score` | integer | Optional | Not PII | Specifies the Call Score, if available. Use a range of 1-5 to indicate the call experience score (5: Excellent, 4: Good, 3: Fair, 2: Poor, 1: Bad). |
| `comment` | string | Optional | Not PII | Specifies any comments pertaining to the call. Twilio does not treat this field as PII, so no PII should be included in comments. |
| `incident` | string | Optional | Not PII | Incident or support ticket associated with this call. Maximum character limit of 100. Twilio does not treat this field as PII, so no PII should be included in incident. |
| `url` | string\<uri\> | Optional | Not PII | The URL of this resource. |

## Get the Call Annotation for a specific Call

```
GET https://insights.twilio.com/v1/Voice/{CallSid}/Annotation
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `call_sid` | SID\<CA\> | required | Not PII | The unique SID identifier of the Call. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Get a Call Annotation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

annotation = (
    client.insights.v1.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .annotation()
    .fetch()
)

print(annotation.call_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": "human",
  "connectivity_issue": "invalid_number",
  "quality_issues": [
    "low_volume"
  ],
  "spam": true,
  "call_score": 2,
  "comment": "this is a call",
  "incident": "https://twilio.zendesk.com/support/tickets/17353089",
  "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Annotation"
}
```

## Update the Call Annotation for a specific Call

```
POST https://insights.twilio.com/v1/Voice/{CallSid}/Annotation
```

> ℹ️ **Info:** Call Annotations can be updated as long as the Call Summary record is addressable via the API.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `call_sid` | SID\<CA\> | required | Not PII | The unique string that Twilio created to identify this Call resource. It always starts with a CA. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Request body parameters

Encoding type: `application/x-www-form-urlencoded`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `answered_by` | enum\<string\> | Optional | Not PII | Specify which entity answered the call as determined by Answering Machine Detection. Use this to provide feedback on Answering Machine Detection accuracy. Possible values: `unknown_answered_by`, `human`, `machine`. |
| `connectivity_issue` | enum\<string\> | Optional | Not PII | Specify if the call had any connectivity issues. Possible values: `unknown_connectivity_issue`, `no_connectivity_issue`, `invalid_number`, `caller_id`, `dropped_call`, or `number_reachability`. |
| `quality_issues` | string | Optional | Not PII | Specify if the call had any subjective quality issues. Possible values: `no_quality_issue`, `low_volume`, `choppy_robotic`, `echo`, `dtmf`, `latency`, `owa`, `static_noise`. Use comma separated values to indicate multiple quality issues for the same call. |
| `spam` | boolean | Optional | Not PII | A boolean flag to indicate if the call was a spam call. Use this to provide feedback on whether calls placed from your account were marked as spam, or if inbound calls received by your account were unwanted spam. Use `true` if the call was a spam call. |
| `call_score` | integer | Optional | Not PII | Specify the call score. Use a range of 1-5 to indicate the call experience score (5: Excellent, 4: Good, 3: Fair, 2: Poor, 1: Bad). |
| `comment` | string | Optional | Not PII | Specify any comments pertaining to the call. Maximum character limit of 100. Twilio does not treat this field as PII, so no PII should be included in the comment. |
| `incident` | string | Optional | Not PII | Associate this call with an incident or support ticket. Maximum character limit of 100. Twilio does not treat this field as PII, so no PII should be included in incident. |

### Update a Comment

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

annotation = (
    client.insights.v1.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .annotation()
    .update(answered_by="human")
)

print(annotation.call_sid)
```

### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "answered_by": "human",
  "connectivity_issue": "invalid_number",
  "quality_issues": [
    "low_volume",
    "choppy_robotic"
  ],
  "spam": true,
  "call_score": 2,
  "comment": "this is a call",
  "incident": "https://twilio.zendesk.com/support/tickets/17353089",
  "url": "https://insights.twilio.com/v1/Voice/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Annotation"
}
```