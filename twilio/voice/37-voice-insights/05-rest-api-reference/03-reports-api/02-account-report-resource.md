# Account Report Resource

## Overview

> **(new) Public Beta**
> Voice Insights Reports API is currently offered as a Public Beta, exclusively available to Voice Insights Advanced Features customers. Information contained in this document is subject to change. Public Beta products aren't covered by a Twilio Service Level Agreement. Learn more in the Twilio Beta Product Support Help Center article.

An Account Report provides an overview of aggregated voice metrics and reports at the account level.

## Account Report Properties

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID\<AC\> | Optional | Not PII | The unique SID identifier of the Account. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| report_id | string | Optional | Not PII | Report ID. Example: `voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX` |
| status | enum\<string\> | Optional | Not PII | The status of the account level report. Possible values: `created`, `running`, `completed` |
| request_meta | object | Optional | Not PII | Time range and filters applied to the generated report. |
| report | object | Optional | Not PII | Aggregated account-level metrics captured in the report. |
| url | string\<uri\> | Optional | Not PII | The URL of this resource. |

## Filter

The filter object allows you to specify criteria for the report data. You can filter by various dimensions such as call state, direction, type, and more. Each filter consists of a key and an array of values to include in the report.

### Filter object

| Key | Accepted values |
|-----|-----------------|
| call_state | completed, fail, busy, noanswer, canceled |
| call_direction | inbound, outbound |
| call_type | carrier, sip, trunking, client, whatsapp |
| twilio_regions | One or more Twilio regions, for example us1, ie1, sg1 |
| caller_country_code | ISO alpha-2 country codes for originating callers, for example US, GB, IN |
| callee_country_code | ISO alpha-2 country codes for destinations, for example US, GB, IN |
| silent | "true" or "false" indicating whether the call was tagged as silent |

---

## Create a new Account Report

```
POST /v2/Voice/Reports
```

> **Info:** A Voice Insights Report will be available for 5 days after it is created.

### Request Body parameters

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| time_range | object | Optional | Not PII | Optional start and end date time for the report window. Defaults to the most recent 7 days when omitted. |
| filters | array[object] | Optional | Not PII | Optional filters applied to the report (for example call direction or carrier). |

### Create a default Account Level Report

The recent 7 days report can be created without any parameters.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports" \
  -H "Content-Type: application/json; charset=utf-8" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**Output:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "report_id": "voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX",
  "request_meta": {
    "end_time": "2025-10-01T21:45:46Z",
    "filters": [],
    "start_time": "2025-09-24T21:45:46Z"
  },
  "status": "created",
  "url": "https://insights.twilio.com/v2/Voice/Reports/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Create an Account Level Report with Date Range

You can create an account level report with a specific date range by providing the time_range parameter.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports" \
  -H "Content-Type: application/json; charset=utf-8" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -d $'{
  "time_range": {
    "start_datetime": "2025-09-24T00:00:00Z",
    "end_datetime": "2025-10-01T00:00:00Z"
  }
}'
```

**Output:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "report_id": "voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX",
  "request_meta": {
    "end_time": "2025-10-01T00:00:00Z",
    "filters": [],
    "start_time": "2025-09-24T00:00:00Z"
  },
  "status": "created",
  "url": "https://insights.twilio.com/v2/Voice/Reports/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Create an Account Level Report with Filters

You can create an account level report with filters by providing the filters parameter.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports" \
  -H "Content-Type: application/json; charset=utf-8" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  -d $'{
  "time_range": {
    "start_datetime": "2025-09-24T00:00:00Z",
    "end_datetime": "2025-10-01T00:00:00Z"
  },
  "filters": [
    {
      "key": "call_type",
      "values": ["carrier", "client"]
    },
    {
      "key": "caller_country_code",
      "values": ["US"]
    }
  ]
}'
```

**Output:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "report_id": "voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX",
  "request_meta": {
    "end_time": "2025-10-01T00:00:00Z",
    "filters": [
      {
        "key": "caller_country_code",
        "values": [
          "US"
        ]
      },
      {
        "key": "call_type",
        "values": [
          "carrier",
          "client"
        ]
      }
    ],
    "start_time": "2025-09-24T00:00:00Z"
  },
  "status": "created",
  "url": "https://insights.twilio.com/v2/Voice/Reports/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

## Fetch an Account Report Resource

```
GET /v2/Voice/Reports/{reportId}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| report_id | string | required | Not PII | A unique request id |

### Fetch the Account Level Report

```bash
curl -X GET "https://insights.twilio.com/v2/Voice/Reports/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**Output:**

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "report": {
    "total_calls": 42069,
    "call_deliverability_score": 98.52,
    "call_answer_score": 95.22,
    "call_direction": {
      "outbound": 42069,
      "inbound": 42069
    },
    "call_type": {
      "carrier": 42069,
      "sip": 42069,
      "trunking": 42069,
      "client": 1112,
      "whatsapp": 1112
    },
    "aloc": 128.4,
    "twilio_edge_location": {
      "ashburn": 84,
      "umatilla": 16
    },
    "caller_country_code": {
      "US": 100,
      "MX": 10,
      "BR": 5,
      "CO": 2
    },
    "callee_country_code": {
      "US": 100,
      "MX": 10,
      "BR": 5,
      "CO": 2
    },
    "average_queue_time_ms": 15.04,
    "silent_calls_percentage": 22.02,
    "network_issues": {
      "sdk": {
        "ice_failures_percentage": 1.3,
        "high_latency_percentage": 5.5,
        "high_packet_loss_percentage": 4.3,
        "high_jitter_percentage": 1.2
      },
      "twilio_gateway": {
        "high_latency_percentage": 5.1,
        "high_packet_loss_percentage": 4.4,
        "high_jitter_percentage": 1.3
      }
    },
    "KYT": {
      "outbound_carrier_calling": {
        "blocked_calls_by_carrier_percentage": [
          {
            "country": "US",
            "values": [
              {
                "carrier": "att",
                "total_calls": 54118,
                "blocked_calls": 6531,
                "blocked_calls_percentage": 12.07
              },
              {
                "carrier": "tmobile",
                "total_calls": 54118,
                "blocked_calls": 6531,
                "blocked_calls_percentage": 12.07
              },
              {
                "carrier": "verizon",
                "total_calls": 54118,
                "blocked_calls": 6531,
                "blocked_calls_percentage": 12.07
              }
            ]
          }
        ],
        "short_duration_calls_percentage": 22.07,
        "long_duration_calls_percentage": 22.07,
        "potential_robocalls_percentage": 2.02,
        "branded_calling": {
          "total_branded_calls": 54118,
          "percent_branded_calls": 47.64,
          "answer_rate": 95.6,
          "human_answer_rate": 88.75,
          "engagement_rate": 86.51,
          "by_use_case": [
            {
              "use_case": "Customer Support",
              "enabled_phonenumbers": 1880,
              "total_calls": 54118,
              "answer_rate": 95.6,
              "human_answer_rate": 88.75,
              "engagement_rate": 86.51
            }
          ]
        },
        "voice_integrity": {
          "enabled_calls": 54118,
          "enabled_percentage": 47.64,
          "calls_per_bundle": [
            {
              "bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
              "enabled_phonenumbers": 1880,
              "total_calls": 54118,
              "answer_rate": 95.6,
              "human_answer_rate": 88.75
            }
          ]
        },
        "stir_shaken": {
          "call_count": {
            "stsh_a": 10069,
            "stsh_b": 10,
            "stsh_c": 1069
          },
          "percentage": {
            "stsh_a": 89.63,
            "stsh_b": 0.01,
            "stsh_c": 0.06
          },
          "answer_rate": {
            "stsh_a": 89.63,
            "stsh_b": 100.0,
            "stsh_c": 0.0
          }
        }
      }
    },
    "answering_machine_detection": {
      "total_calls": 136069,
      "answered_by_human_percentage": 67.59,
      "answered_by_machine_percentage": 31.39
    }
  },
  "report_id": "voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX",
  "request_meta": {
    "end_time": "2025-10-01T00:00:00Z",
    "filters": [
      {
        "key": "call_type",
        "values": [
          "carrier",
          "client"
        ]
      },
      {
        "key": "caller_country_code",
        "values": [
          "US"
        ]
      }
    ]
  }
}
```