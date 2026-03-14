# Inbound Phone Number Report Resource

## Overview

> **(new) Public Beta**
> Voice Insights Reports API is currently offered as a Public Beta, exclusively available to Voice Insights Advanced Features customers. Information contained in this document is subject to change. Public Beta products aren't covered by a Twilio Service Level Agreement. Learn more in the Twilio Beta Product Support Help Center article.

An Inbound Phone Number Report aggregates Voice Insights metrics for calls received by a specific phone number handle.

## Inbound Phone Number Report Properties

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| handle | string | Optional | PII MTL: 30 days | Inbound phone number handle represented in the report. |
| total_calls | integer | Optional | Not PII | Total number of inbound calls observed during the report period. |
| call_answer_score | number\<float\> | Optional | Not PII | Score (0-100) representing how often inbound calls were answered. |
| call_state_percentage | object | Optional | Not PII | Percentage of calls by call state (completed, fail, busy, no-answer, canceled). |
| silent_calls_percentage | number\<float\> | Optional | Not PII | Percentage of inbound calls with silence tags over total outbound calls. A silent tag is indicative of a connectivity issue or muted audio. |

---

## Create an Inbound Phone Number Report

```
POST /v2/Voice/Reports/PhoneNumbers/Inbound
```

> **Info:** A Voice Insights Report will be available for 5 days after it is created.

### Request body parameters

**Encoding type:** `application/json`

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| time_range | object | Optional | Not PII | Optional start and end date time for the report window. Defaults to the most recent 7 days when omitted. |
| size | integer | Optional | Not PII | Maximum number of phone number handles to return in the report. Default: 1000, Minimum: 1, Maximum: 6000 |

### Create a default Inbound Phone Number Report

The recent 7 days report can be created without any parameters.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound" \
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
  "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Create an Inbound Phone Number Report with Date Range

Generate an inbound report for a specific period by providing the time_range parameter.

```bash
curl -X POST "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound" \
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
  "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

---

## Fetch an Inbound Phone Number Report

```
GET /v2/Voice/Reports/PhoneNumbers/Inbound/{reportId}
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

### Fetch an Inbound Phone Number Report

```bash
curl -X GET "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX" \
  -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

**Output:**

```json
{
  "meta": {
    "first_page_url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX?PageSize=50&Page=0",
    "key": "reports",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://insights.twilio.com/v2/Voice/Reports/PhoneNumbers/Inbound/voiceinsights_report_XXXXXXXXXXXXXXXXXXXXXXXXXX?PageSize=50&Page=0"
  },
  "reports": [
    {
      "call_answer_score": 0,
      "call_state_percentage": {
        "busy": 100,
        "canceled": 0,
        "completed": 0,
        "fail": 0,
        "noanswer": 0
      },
      "handle": "+15555555555",
      "silent_calls_percentage": 0,
      "total_calls": 3
    }
  ]
}
```