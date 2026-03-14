# Conference Participant Summary Resource

A Conference Participant Summary contains an overview of:

- metadata,
- quality metrics, and
- events

for a single participant of a conference call.

Using the Conference Participant Summary Resource, you can:

- get the summary for a specific participant of a conference, or
- get a list of summaries for multiple participants in a conference.

> **Warning:** Voice Insights Advanced Features must be active to use this API Resource.

## Conference Participant Summary Properties

The following table details the properties of a single Conference Participant Summary instance.

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `participant_sid` | SID\<CP\> | Optional | Not PII | SID for this participant. Pattern: `^CP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `label` | string | Optional | PII MTL: 30 days | The user-specified label of this participant. |
| `conference_sid` | SID\<CF\> | Optional | Not PII | The unique SID identifier of the Conference. Pattern: `^CF[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `call_sid` | SID\<CA\> | Optional | Not PII | Unique SID identifier of the call that generated the Participant resource. Pattern: `^CA[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `account_sid` | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `call_direction` | enum\<string\> | Optional | Not PII | Call direction of the participant; inbound or outbound. Possible values: `inbound`, `outbound` |
| `from` | string | Optional | PII MTL: 30 days | Caller ID of the calling party. |
| `to` | string | Optional | PII MTL: 30 days | Called party. |
| `call_status` | enum\<string\> | Optional | Not PII | Call status of the call that generated the participant. Possible values: `answered`, `completed`, `busy`, `fail`, `noanswer`, `ringing`, `canceled` |
| `country_code` | string | Optional | Not PII | ISO alpha-2 country code of the participant based on caller ID or called number. |
| `is_moderator` | boolean | Optional | Not PII | Boolean. Indicates whether participant had startConferenceOnEnter=true or endConferenceOnExit=true. |
| `join_time` | string\<date-time\> | Optional | Not PII | ISO 8601 timestamp of participant join event. |
| `leave_time` | string\<date-time\> | Optional | Not PII | ISO 8601 timestamp of participant leave event. |
| `duration_seconds` | integer | Optional | Not PII | Participant durations in seconds. |
| `outbound_queue_length` | integer | Optional | Not PII | Add Participant API only. Estimated time in queue at call creation. |
| `outbound_time_in_queue` | integer | Optional | Not PII | Add Participant API only. Actual time in queue in seconds. |
| `jitter_buffer_size` | enum\<string\> | Optional | Not PII | The Jitter Buffer Size of this Conference Participant. One of large, small, medium or off. Possible values: `large`, `small`, `medium`, `off` |
| `is_coach` | boolean | Optional | Not PII | Boolean. Indicated whether participant was a coach. |
| `coached_participants` | array[string] | Optional | Not PII | Call SIDs coached by this participant. |
| `participant_region` | enum\<string\> | Optional | Not PII | Twilio region where the participant media originates. Possible values: `us1`, `us2`, `au1`, `br1`, `ie1`, `jp1`, `sg1`, `de1`, `in1` |
| `conference_region` | enum\<string\> | Optional | Not PII | The Conference Region of this Conference Participant. One of us1, us2, au1, br1, ie1, jp1, sg1 or de1. Possible values: `us1`, `us2`, `au1`, `br1`, `ie1`, `jp1`, `sg1`, `de1`, `in1` |
| `call_type` | enum\<string\> | Optional | Not PII | The Call Type of this Conference Participant. One of carrier, client or sip. Possible values: `carrier`, `client`, `sip` |
| `processing_state` | enum\<string\> | Optional | Not PII | Processing state of the Participant Summary. Will be `in_progress` while data is being aggregated, `timeout` if Twilio couldn't process the summary in 24hrs, and `complete` once aggregations and analysis has ended. Possible values: `complete`, `in_progress`, `timeout` |
| `properties` | object | Optional | Not PII | Participant properties and metadata. |
| `events` | object | Optional | Not PII | Object containing information of actions taken by participants. Contains a dictionary of URL links to nested resources of this Conference Participant. |
| `metrics` | object | Optional | Not PII | Object. Contains participant call quality metrics. |
| `url` | string\<uri\> | Optional | Not PII | The URL of this resource. |

## Get a Conference Participant Summary

```
GET https://insights.twilio.com/v1/Conferences/{ConferenceSid}/Participants/{ParticipantSid}
```

### Path Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conference_sid` | SID\<CF\> | required | Not PII | The unique SID identifier of the Conference. Pattern: `^CF[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| `participant_sid` | SID\<CP\> | required | Not PII | The unique SID identifier of the Participant. Pattern: `^CP[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `events` | string | Optional | Not PII | Conference events generated by application or participant activity; e.g. hold, mute, etc. |
| `metrics` | string | Optional | Not PII | Object. Contains participant call quality metrics. |

### Example: Get a Conference Participant Summary

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conference_participant = (
    client.insights.v1.conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .conference_participants("CPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(conference_participant.participant_sid)
```

### Response

```json
{
  "participant_sid": "CPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "label": null,
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_direction": "outbound",
  "from": "+10000000000",
  "to": "+1000000001",
  "call_status": "completed",
  "country_code": "US",
  "is_moderator": true,
  "join_time": "2021-10-08T02:58:59Z",
  "leave_time": "2021-10-08T03:00:02Z",
  "duration_seconds": 64,
  "outbound_queue_length": 0,
  "outbound_time_in_queue": 965,
  "jitter_buffer_size": null,
  "is_coach": false,
  "coached_participants": null,
  "participant_region": "us1",
  "conference_region": "us1",
  "call_type": "carrier",
  "processing_state": "complete",
  "properties": {
    "start_conference_on_enter": false,
    "end_conference_on_exit": false,
    "play_early_media": false,
    "enter_muted": true,
    "beep_on_enter": false,
    "beep_on_exit": false
  },
  "events": {
    "mute": [
      1633705131000
    ]
  },
  "metrics": {
    "inbound": {
      "total_packets_lost": 0,
      "total_packets_received": 49,
      "packet_loss_percentage": 0,
      "jitter": {
        "avg": 0.34,
        "max": 0.53
      },
      "latency": {
        "avg": 0,
        "max": 0
      },
      "mos": 4.4
    },
    "outbound": {
      "total_packets_lost": 0,
      "total_packets_received": 126,
      "packet_loss_percentage": 0,
      "jitter": {
        "avg": 0.01,
        "max": 0.01
      },
      "latency": {
        "avg": 0,
        "max": 0
      },
      "mos": 4.4
    }
  },
  "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Get Multiple Participant Summaries for a Conference

```
GET https://insights.twilio.com/v1/Conferences/{ConferenceSid}/Participants
```

### Path Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `conference_sid` | SID\<CF\> | required | Not PII | The unique SID identifier of the Conference. Pattern: `^CF[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query Parameters

| Property Name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `participant_sid` | string | Optional | Not PII | The unique SID identifier of the Participant. |
| `label` | string | Optional | PII MTL: 30 days | User-specified label for a participant. |
| `events` | string | Optional | Not PII | Conference events generated by application or participant activity; e.g. hold, mute, etc. |
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Example: Get Multiple Participant Summaries for a Conference

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conference_participants = client.insights.v1.conferences(
    "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).conference_participants.list(limit=20)

for record in conference_participants:
    print(record.participant_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=25&Page=0",
    "previous_page_url": null,
    "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=25&Page=0",
    "next_page_url": null,
    "key": "participants"
  },
  "participants": [
    {
      "participant_sid": "CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_direction": "outbound",
      "from": "+10000000000",
      "to": "+10000000001",
      "call_status": "completed",
      "country_code": "US",
      "is_moderator": true,
      "join_time": "2021-10-08T02:58:51Z",
      "leave_time": "2021-10-08T02:59:55Z",
      "duration_seconds": 65,
      "outbound_queue_length": 0,
      "outbound_time_in_queue": 3361,
      "jitter_buffer_size": null,
      "is_coach": false,
      "coached_participants": null,
      "participant_region": "us1",
      "conference_region": "us1",
      "call_type": "carrier",
      "processing_state": "complete",
      "properties": {
        "start_conference_on_enter": true,
        "end_conference_on_exit": false,
        "play_early_media": true,
        "enter_muted": false,
        "beep_on_enter": false,
        "beep_on_exit": false
      },
      "metrics": {
        "inbound": {
          "total_packets_lost": 0,
          "total_packets_received": 70,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.41,
            "max": 0.84
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4
        },
        "outbound": {
          "total_packets_lost": 0,
          "total_packets_received": 126,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.01,
            "max": 0.01
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4
        }
      },
      "events": null,
      "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "participant_sid": "CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "label": null,
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_direction": "outbound",
      "from": "+10000000000",
      "to": "+10000000002",
      "call_status": "completed",
      "country_code": "US",
      "is_moderator": true,
      "join_time": "2021-10-08T02:58:52Z",
      "leave_time": "2021-10-08T02:59:54Z",
      "duration_seconds": 63,
      "outbound_queue_length": 0,
      "outbound_time_in_queue": 321,
      "jitter_buffer_size": null,
      "is_coach": false,
      "coached_participants": null,
      "participant_region": "us1",
      "conference_region": "us1",
      "call_type": "carrier",
      "processing_state": "complete",
      "properties": {
        "start_conference_on_enter": false,
        "end_conference_on_exit": false,
        "early_media": false,
        "enter_muted": true,
        "beep_on_enter": false,
        "beep_on_exit": false
      },
      "metrics": {
        "inbound": {
          "total_packets_lost": 0,
          "total_packets_received": 16,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.26,
            "max": 0.45
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4
        },
        "outbound": {
          "total_packets_lost": 0,
          "total_packets_received": 42,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.03,
            "max": 0.08
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4,
          "tags": [
            "silent"
          ]
        }
      },
      "events": {
        "mute": [
          1633705131000
        ]
      },
      "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
    }
  ]
}
```

### Example: Get Multiple Participant Summaries for a Conference Filtered by Label

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conference_participants = client.insights.v1.conferences(
    "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).conference_participants.list(label="PXXXXX", limit=20)

for record in conference_participants:
    print(record.participant_sid)
```

### Response

```json
{
  "meta": {
    "page": 0,
    "page_size": 25,
    "first_page_url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?Label=client&PageSize=25&Page=0",
    "previous_page_url": null,
    "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?Label=client&PageSize=25&Page=0",
    "next_page_url": null,
    "key": "participants"
  },
  "participants": [
    {
      "participant_sid": "CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "call_direction": "outbound",
      "from": "+10000000000",
      "to": "+10000000001",
      "call_status": "completed",
      "country_code": "US",
      "is_moderator": true,
      "join_time": "2021-10-08T02:58:51Z",
      "leave_time": "2021-10-08T02:59:55Z",
      "duration_seconds": 65,
      "label": "client",
      "outbound_queue_length": 0,
      "outbound_time_in_queue": 3361,
      "jitter_buffer_size": null,
      "is_coach": false,
      "coached_participants": null,
      "participant_region": "us1",
      "conference_region": "us1",
      "call_type": "carrier",
      "processing_state": "complete",
      "properties": {
        "start_conference_on_enter": true,
        "end_conference_on_exit": false,
        "play_early_media": true,
        "enter_muted": false,
        "beep_on_enter": false,
        "beep_on_exit": false
      },
      "metrics": {
        "inbound": {
          "total_packets_lost": 0,
          "total_packets_received": 70,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.41,
            "max": 0.84
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4
        },
        "outbound": {
          "total_packets_lost": 0,
          "total_packets_received": 96,
          "packet_loss_percentage": 0,
          "jitter": {
            "avg": 0.01,
            "max": 0.01
          },
          "latency": {
            "avg": 0,
            "max": 0
          },
          "mos": 4.4
        }
      },
      "events": null,
      "url": "https://insights.twilio.com/v1/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/CPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```