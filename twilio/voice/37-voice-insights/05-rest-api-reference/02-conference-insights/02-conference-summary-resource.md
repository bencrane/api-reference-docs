# Conference Summary Resource

A Conference Summary provides an overview of:

- metadata, and
- quality metrics

for a single conference.

Using the Conference Summary Resource, you can:

- get a single summary for a specific conference
- get a list of summaries for multiple conferences.

> **Warning:** Voice Insights Advanced Features must be active to use this API Resource.

> **Info:** A completed Conference Summary may take up to 30 minutes to generate following the end of the conference.

## Conference Summary Properties

The following table details the properties of a single Conference Summary instance.

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conference_sid` | SID\<CF\> | Optional | Not PII | The unique SID identifier of the Conference. Pattern: `^CF[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `friendly_name` | string | Optional | PII MTL: 30 days | Custom label for the conference resource, up to 64 characters. |
| `create_time` | string\<date-time\> | Optional | Not PII | Conference creation date and time in ISO 8601 format. |
| `start_time` | string\<date-time\> | Optional | Not PII | Timestamp in ISO 8601 format when the conference started. Conferences do not start until at least two participants join, at least one of whom has startConferenceOnEnter=true. |
| `end_time` | string\<date-time\> | Optional | Not PII | Conference end date and time in ISO 8601 format. |
| `duration_seconds` | integer | Optional | Not PII | Conference duration in seconds. |
| `connect_duration_seconds` | integer | Optional | Not PII | Duration of the between conference start event and conference end event in seconds. |
| `status` | enum\<string\> | Optional | Not PII | Status of this Conference; `in_progress`, `not_started`, `completed` or `summary_timeout`. If Twilio doesn't receive last_participant_left event, summary will be timeout after 24 hours. Possible values: `in_progress`, `not_started`, `completed`, `summary_timeout` |
| `max_participants` | integer | Optional | Not PII | Maximum number of concurrent participants as specified by the configuration. |
| `max_concurrent_participants` | integer | Optional | Not PII | Actual maximum number of concurrent participants in the conference. |
| `unique_participants` | integer | Optional | Not PII | Unique conference participants based on caller ID. |
| `end_reason` | enum\<string\> | Optional | Not PII | Conference end reason; e.g. last participant left, modified by API, etc. Possible values: `last_participant_left`, `conference_ended_via_api`, `participant_with_end_conference_on_exit_left`, `last_participant_kicked`, `participant_with_end_conference_on_exit_kicked` |
| `ended_by` | SID\<CA\> | Optional | Not PII | Call SID of the participant whose actions ended the conference. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `mixer_region` | enum\<string\> | Optional | Not PII | Twilio region where the conference media was mixed. Possible values: `us1`, `us2`, `au1`, `br1`, `ie1`, `jp1`, `sg1`, `de1`, `in1` |
| `mixer_region_requested` | enum\<string\> | Optional | Not PII | Twilio region where conference mixed was specified to be mixed in configuration. Possible values: `us1`, `us2`, `au1`, `br1`, `ie1`, `jp1`, `sg1`, `de1`, `in1` |
| `recording_enabled` | boolean | Optional | Not PII | Boolean. Indicates whether recording was enabled at the conference mixer. |
| `detected_issues` | object | Optional | Not PII | Potential issues detected by Twilio during the conference. |
| `tags` | array[enum\<string\>] | Optional | Not PII | Tags for detected conference conditions and participant behaviors which may be of interest. Possible values: `invalid_requested_region`, `duplicate_identity`, `start_failure`, `region_configuration_issues`, `quality_warnings`, `participant_behavior_issues`, `high_packet_loss`, `high_jitter`, `high_latency`, `low_mos` |
| `tag_info` | object | Optional | Not PII | Object. Contains details about conference tags including severity. |
| `processing_state` | enum\<string\> | Optional | Not PII | Processing state for the Conference Summary resource. Will be `in_progress` while data is being aggregated, `timeout` if Twilio couldn't process the summary in 24hrs, and `complete` once aggregations and analysis has ended. Possible values: `complete`, `in_progress`, `timeout` |
| `url` | string\<uri\> | Optional | Not PII | The URL of this resource. |
| `links` | object\<uri-map\> | Optional | Not PII | Contains a dictionary of URL links to nested resources of this Conference. |

## Get a Conference Summary

```
GET https://insights.twilio.com/v1/Conferences/{ConferenceSid}
```

### Path Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conference_sid` | SID\<CF\> | required | Not PII | The unique SID identifier of the Conference. Pattern: `^CF[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Example: Get a Conference Summary

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conference = client.insights.v1.conferences(
    "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(conference.conference_sid)
```

### Response

```json
{
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "conference1",
  "start_time": "2021-10-08T02:58:51Z",
  "create_time": "2021-10-08T02:58:47Z",
  "end_time": "2021-10-08T03:00:02Z",
  "duration_seconds": 76,
  "connect_duration_seconds": 72,
  "status": "completed",
  "max_participants": 250,
  "max_concurrent_participants": 4,
  "unique_participants": 4,
  "end_reason": "last_participant_left",
  "ended_by": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "mixer_region": "us1",
  "mixer_region_requested": "us1",
  "recording_enabled": false,
  "processing_state": "complete",
  "detected_issues": {
    "call_quality": 1,
    "region_configuration": 0,
    "participant_behavior": 3
  },
  "tags": [
    "duplicate_identity",
    "detected_silence",
    "participant_behavior_issues"
  ],
  "tag_info": null,
  "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "conference_participants": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
  }
}
```

## Get Multiple Conference Summaries

```
GET https://insights.twilio.com/v1/Conferences
```

The Conference Summary list resource allows results to be filtered by:

- date,
- friendly name,
- region, and
- other dimensions.

By default, the Conference Summary list resource returns a list of conferences hosted in the last 24 hours. To get multiple Conference Summaries of Conferences hosted prior to the last 24 hours, specify the `CreatedAfter` and/or `CreatedBefore` query parameters.

### Query Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conference_sid` | string | Optional | Not PII | The SID of the conference. |
| `friendly_name` | string | Optional | PII MTL: 30 days | Custom label for the conference resource, up to 64 characters. |
| `status` | string | Optional | Not PII | Conference status. |
| `created_after` | string | Optional | Not PII | Conferences created after the provided timestamp specified in ISO 8601 format. |
| `created_before` | string | Optional | Not PII | Conferences created before the provided timestamp specified in ISO 8601 format. |
| `mixer_region` | string | Optional | Not PII | Twilio region where the conference media was mixed. |
| `tags` | string | Optional | Not PII | Tags applied by Twilio for common potential configuration, quality, or performance issues. |
| `subaccount` | SID\<AC\> | Optional | Not PII | Account SID for the subaccount whose resources you wish to retrieve. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `detected_issues` | string | Optional | Not PII | Potential configuration, behavior, or performance issues detected during the conference. |
| `end_reason` | string | Optional | Not PII | Conference end reason; e.g. last participant left, modified by API, etc. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: Get Multiple Conference Summaries

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conferences = client.insights.v1.conferences.list(limit=20)

for record in conferences:
    print(record.conference_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Conferences?CreatedAfter=2021-10-09T17%3A20%3A53Z&CreatedBefore=2021-10-12T18%3A37%3A53Z&PageSize=25&Page=0",
    "previous_page_url": null,
    "url": "https://insights.twilio.com/v1/Conferences?CreatedAfter=2021-10-09T17%3A20%3A53Z&CreatedBefore=2021-10-12T18%3A37%3A53Z&PageSize=25&Page=0",
    "next_page_url": null,
    "key": "conferences"
  },
  "conferences": [
    {
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "conference 1",
      "start_time": "2021-10-12T18:11:10Z",
      "create_time": "2021-10-12T18:11:09Z",
      "end_time": "2021-10-12T18:11:15Z",
      "duration_seconds": 7,
      "connect_duration_seconds": 5,
      "status": "completed",
      "max_participants": 250,
      "max_concurrent_participants": 2,
      "unique_participants": 2,
      "end_reason": "last_participant_left",
      "ended_by": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "mixer_region": "us1",
      "mixer_region_requested": null,
      "recording_enabled": false,
      "processing_state": "complete",
      "detected_issues": {
        "call_quality": 1,
        "region_configuration": 0,
        "participant_behavior": 0
      },
      "tags": null,
      "tag_info": null,
      "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "conference_participants": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
      }
    },
    {
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "conference 2",
      "start_time": null,
      "create_time": "2021-10-12T18:09:21Z",
      "end_time": "2021-10-12T18:09:21Z",
      "duration_seconds": 1,
      "connect_duration_seconds": 0,
      "status": "completed",
      "max_participants": 250,
      "max_concurrent_participants": 2,
      "unique_participants": 3,
      "end_reason": "last_participant_left",
      "ended_by": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "mixer_region": "us1",
      "mixer_region_requested": null,
      "recording_enabled": false,
      "processing_state": "complete",
      "detected_issues": {
        "call_quality": 1,
        "region_configuration": 0,
        "participant_behavior": 0
      },
      "tags": [
        "detected_silence",
        "participant_behavior_issues"
      ],
      "tag_info": null,
      "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "links": {
        "conference_participants": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab/Participants"
      }
    }
  ]
}
```

### Example: Get Multiple Conference Summaries for a Subaccount

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conferences = client.insights.v1.conferences.list(
    subaccount="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in conferences:
    print(record.conference_sid)
```

### Example: Get Multiple Conference Summaries in ie1 with Call Quality Detected Issues

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conferences = client.insights.v1.conferences.list(
    mixer_region="ie1", detected_issues="call_quality", limit=20
)

for record in conferences:
    print(record.conference_sid)
```