# Voice Insights Reports API Overview

> **(new) Public Beta**
> Voice Insights Reports API is currently offered as a Public Beta, exclusively available to Voice Insights Advanced Features customers. Information contained in this document is subject to change. Public Beta products aren't covered by a Twilio Service Level Agreement. Learn more in the Twilio Beta Product Support Help Center article.

The Reports API provides programmatic access to aggregated Voice Insights metrics and high‑level, actionable insights in two flavors: **Account Reports API** and **Phone Number Reports API**, delivering real‑time, out‑of‑the‑box rollups in a single API call, reducing time‑to‑value and the cost of operationalizing these metrics in customer workflows.

## Key metrics and breakdowns available

- Call deliverability
- Answer score
- Blocked calls
- Voice Integrity bundles
- Answer rates by use case
- Branded calls usage and answer rates
- Human answer rate
- Short-duration calls
- Engaged calls
- Segmentations: by region, call type, Twilio Edge, and network-affected calls

## What problem does it solve

### Scalability of aggregated metrics

- **Today:** Aggregates exist only in the console; APIs expose call-level data.
- **Solution:** Retrieve account/subaccount/number-level rollups and trends via API, with filters, cohorts, and time windows. Built for ISVs with many subaccounts to manage insights at scale without manual console work.

### Lower cost of adoption and faster time to value

- **Today:** Customers must build ingestion pipelines, storage, transforms, and BI layers just to compute basic KPIs.
- **Solution:** Twilio delivers real-time aggregations and curated insights as JSON, eliminating heavy data engineering, infra, and ongoing maintenance, thereby reducing operational cost.

### From data-rich to insights-rich

- **Today:** Customers piece together low-level metrics and need telecom/product expertise to interpret them.
- **Solution:** Out-of-the-box, high-level insights that map to business outcomes (e.g., answer rate declines, low trust driving missed leads, carrier blocking risk). Include drivers, anomaly flags, and recommended mitigations that tie to Twilio trust products and branded experiences.

## Meta Data

| Property | Description |
|----------|-------------|
| start_datetime | Date ISO8601 format (yyyy-MM-ddTHH:mm:ssZ) |
| end_datetime | Date ISO8601 format (yyyy-MM-ddTHH:mm:ssZ) |
| report_id | A unique id for each report request |
| filters | The filters applied to the report request |

## Metric Resources

| Property | Description |
|----------|-------------|
| call_deliverability_score | Call deliverability rate measures the network effectiveness in calls reaching a destination; Typically this should be over 98% |
| call_answer_score | Completed calls / total calls |
| total_calls | The number of total calls |
| call_direction | Associated call directions in inbound and outbound |
| call_type | Associated call types: carrier, sip, trunking, client and whatsapp |
| aloc | Average length of an answered call in seconds |
| twilio_edge_location | A set of the media regions where Twilio gateway handled the media |
| caller_country_code | ISO Alpha-2 country code of the calling parties |
| callee_country_code | ISO Alpha-2 country code of the called parties |
| average_queue_time_ms | An average of estimated queue time between API requests to create a new call and when the actual call begins in seconds. A value > 1000ms is indicative that customers might want to consider increasing the CPS value |
| percentage_silent_calls | Percentage of calls with silence tags over total calls. A silent tag is indicative of a connectivity issue or muted audio. |
| network_issues | Percentage of calls for SDK and Twilio Gateway with each network issues over total calls |
| answering_machine_detection | Results of answering machine detection |
| kyt | end_user_behaviour and outbound callings |

## KYT (Know Your Traffic)

> Only Valid for outbound calls

| Property | Description |
|----------|-------------|
| unique_calling_numbers | Unique from numbers |
| unique_called_numbers | Unique to numbers |
| blocked_calls_by_carrier | Calls blocked by the carriers in US |
| short_duration_calls_percentage | Percentage of calls under 10s |
| long_duration_calls_percentage | Percentage of calls over 60s |
| potential_robocalls_percentage | Percentage of calls to invalid numbers. Indicative of robocalling activity |
| branded_calling | Branded calling metrics such as total_branded_calls, percent_branded_calls, answer_rate, human_answer_rate, engagement_rate, by_use_case |
| voice_integrity | Voice Integrity metrics such as enabled_calls, and calls_per_bundle, including bundle_sid, enabled_phonenumbers, total_calls, answer_rate, human_answer_rate. |
| stir_shaken | ST/SH Attestation metrics included calls and answer rates |

## Base URL

Reports are available under the following base URL. The REST API is served over HTTPS; unencrypted HTTP is not supported.

```
https://insights.twilio.com/v2/Voice/
```

## Authentication

To authenticate requests to the Twilio APIs, Twilio supports HTTP Basic authentication. Use your API key as the username and your API key secret as the password. You can create an API key either in the Twilio Console or using the API.

> **Note:** Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the Twilio Console.

Learn more about Twilio API authentication.

```bash
curl -G https://insights.twilio.com/v2/Voice/Reports/{Report_Id} \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Resources

The following resources are available in the Voice Insights Reports REST API.

| Resource | Description |
|----------|-------------|
| Account Reports Resource | Create and fetch aggregated Voice Insights metrics and reports at the Account level. |
| Inbound Phone Number Reports Resource | Create and fetch aggregated Voice Insights metrics and reports at the Inbound Phone Number level. |
| Outbound Phone Number Reports Resource | Create and fetch aggregated Voice Insights metrics and reports at the Outbound Phone Number level. |