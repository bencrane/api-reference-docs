# Outbound Phone Number Report Resource

## Overview

> **(new) Public Beta**
> Voice Insights Reports API is currently offered as a Public Beta, exclusively available to Voice Insights Advanced Features customers. Information contained in this document is subject to change. Public Beta products aren't covered by a Twilio Service Level Agreement. Learn more in the Twilio Beta Product Support Help Center article.

An Outbound Phone Number Report aggregates Voice Insights metrics for calls placed from a specific phone number handle.

## Outbound Phone Number Report Properties

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| handle | string | Optional | PII MTL: 30 days | Outbound phone number handle represented in the report. |
| total_calls | integer | Optional | Not PII | Total number of outbound calls made during the report period. |
| call_answer_score | number\<float\> | Optional | Not PII | Score (0-100) representing how often outbound calls were answered. |
| calls_by_device_type | object | Optional | Not PII | Number of outbound calls placed per device type (voip, mobile, landline, unknown). Example: `{"voip":150,"mobile":300,"landline":100,"unknown":50}` |
| answer_rate_device_type | object | Optional | Not PII | Answer rate per device type (voip, mobile, landline, unknown). Example: `{"voip":75,"mobile":80,"landline":70,"unknown":60}` |
| call_state_percentage | object | Optional | Not PII | Percentage of outbound calls by call state (completed, fail, busy, no-answer, canceled). |
| blocked_calls_by_carrier | array[object] | Optional | Not PII | Associated metrics for completed outbound calls which are blocked by respective downstream carriers. Currently only the US carriers such as ATT, T-Mobile and Verizon provide this information. |
| silent_calls_percentage | number\<float\> | Optional | Not PII | Percentage of calls with silence tags over total calls. A silent tag is indicative of a connectivity issue or muted audio. |
| short_duration_calls_percentage | number\<float\> | Optional | Not PII | Percentage of completed outbound calls under 10 seconds; More than 15% is typically low trust measured. |
| long_duration_calls_percentage | number\<float\> | Optional | Not PII | Percentage of outbound calls lasting 60 seconds or longer. |
| potential_robocalls_percentage | number\<float\> | Optional | Not PII | Percentage of completed outbound calls to unassigned or unallocated phone numbers. |
| answering_machine_detection | object | Optional | Not PII | Associated answering machine detection enabled calls. |

---

## Create an Outbound Phone Number Report

```
POST /v2/Voice/Reports/PhoneNumbers/Outbound
```

> **Info:** A Voice Insights Report will be available for 5 days after it is created.

### Request body parameters

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| time_range | object | Optional | Not PII | Optional start and end date time for the report window. Defaults to the most recent 7 days when omitted. |
| size | integer | Optional | Not PII | Maximum number of phone number handles to return in the report. Default: 1000, Minimum: 1, Maximum: 6000 |

### Create a default Outbound Phone Number Report

The recent 7 days report can be created without any parameters.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound" \
  -H "Content-Type: application/json; charset=utf-8" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
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
  "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Create an Outbound Phone Number Report with Date Range

Generate an outbound report for a specific period by providing the time_range parameter.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound" \
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
  "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

## Fetch an Outbound Phone Number Report

```
GET /v2/Voice/Reports/PhoneNumbers/Outbound/{reportId}
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| report_id | string | required | Not PII | A unique request id |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Default: 50, Minimum: 1, Maximum: 1000 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |

### Fetch an Outbound Phone Number Report

```bash
curl -X GET "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**Output:**

```json
{
  "meta": {
    "first_page_url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX?PageSize=50&Page=0",
    "key": "reports",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Outbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX?PageSize=50&Page=0"
  },
  "reports": [
    {
      "handle": "+15555555555",
      "total_calls": 23611,
      "call_answer_score": 88.73,
      "calls_by_device_type": {
        "voip": 84,
        "mobile": 21056,
        "landline": 1535,
        "unknown": 936
      },
      "answer_rate_device_type": {
        "voip": 80.95,
        "mobile": 94.6,
        "landline": 60.46,
        "unknown": 3.53
      },
      "call_state_percentage": {
        "completed": 88.73,
        "noanswer": 2.19,
        "fail": 5.1,
        "busy": 0.92,
        "canceled": 3.07
      },
      "blocked_calls_by_carrier": [
        {
          "country": "US",
          "carriers": [
            {
              "carrier": "att",
              "total_calls": 6599,
              "blocked_calls": 24,
              "blocked_calls_percentage": 0.36
            },
            {
              "carrier": "tmobile",
              "total_calls": 4626,
              "blocked_calls": 17,
              "blocked_calls_percentage": 0.37
            },
            {
              "carrier": "verizon",
              "total_calls": 9166,
              "blocked_calls": 29,
              "blocked_calls_percentage": 0.32
            }
          ]
        }
      ],
      "silent_calls_percentage": 1.05,
      "short_duration_calls_percentage": 26.36,
      "long_duration_calls_percentage": 8.5,
      "potential_robocalls_percentage": 0.43,
      "answering_machine_detection": {
        "total_calls": 0,
        "answered_by_human_percentage": 0.0,
        "answered_by_machine_percentage": 0.0
      }
    }
  ]
}
```