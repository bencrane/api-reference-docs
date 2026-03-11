# FMCSA Dataset Endpoint

## Department of Transportation Inventory of Artificial Intelligence Use Cases

Welcome to this Data.Transportation.gov API, powered by Socrata.

> This is the latest 3.0 Version of the SODA API. See the support article for information about requirements for identifying API calls, export formats, and other updates in this version of the API.

---

## About This Dataset

| Property | Value |
|---|---|
| Dataset Identifier | `anj8-k6f5` |
| Total Rows | 70 |
| Source Domain | data.transportation.gov |
| Created | 10/24/2022, 4:46:35 PM |
| Last Updated | 2/1/2026, 2:14:35 PM |
| Category | Administrative |
| Attribution | US Department of Transportation |
| License | Public Domain U.S. Government |
| Owner | DOT DataHub (DoNotDelete) |
| Endpoint Version | 3.0 |

This dataset is a list of Department of Transportation (DOT) Artificial Intelligence (AI) use cases.

The Advancing American AI Act, Executive Order (EO) 13960, Promoting the Use of Trustworthy Artificial Intelligence in the Federal Government, and Office of Management and Budget (OMB) Memorandum M-25-21, Accelerating Federal Use of AI through Innovation, Governance, and Public Trust, require Federal agencies to report on their use of artificial intelligence (AI).

---

## Download & Export

You can use the query or export endpoints to fetch the entire dataset as a static, downloadable file.

- [Export dataset as CSV](https://data.transportation.gov/api/v3/views/anj8-k6f5/export.csv)

---

## Getting Started

All communication with the API is done through HTTPS, and errors are communicated through HTTP response codes. Available response types include JSON (including GeoJSON), XML, and CSV, which are selectable by the "extension" (`.json`, etc.) on the API endpoint or through content-negotiation with HTTP `Accept` headers.

While the documentation examples function via HTTP GET, it is recommended that you use **HTTP POST** instead in order to access the full range of request options and to allow for very long query texts.

### Base Endpoint

```
https://data.transportation.gov/api/v3/views/anj8-k6f5/query.json
```

---

## App Tokens

All requests should include an app token that identifies your application, and each application should have its own unique app token. A limited number of requests can be made without an app token, but they are subject to much lower throttling limits than requests that do include one. With an app token, your application is guaranteed access to its own pool of requests.

Once you have an app token, you can include it with your request either by using the `X-App-Token` HTTP header, or by passing it via the `app_token` parameter on your URL.

---

## Fields

Each column in the dataset is represented by a single field in its SODA API. Using SoQL queries, you can search for records, limit your results, and change the way the data is output.

### Example Filter Query

```
https://data.transportation.gov/api/v3/views/anj8-k6f5/query.json?pageNumber=1&pageSize=10&app_token=$YOUR_APP_TOKEN&query=SELECT%20*%20WHERE%20%60use_case_identifier%60%3D'DOT-1000061'
```

### Field Reference

| Field Name | Type | Description |
|---|---|---|
| `use_case_identifier` | text | Use Case Identifier |
| `use_case_name` | text | Use Case Name |
| `agency` | text | Agency |
| `bureau` | text | Bureau |
| `email_address` | text | Email Address |
| `public_reporting_indicator` | text | Public Reporting Indicator |
| `development_stage` | text | Development Stage |
| `high_impact_indicator` | text | High Impact Indicator |
| `high_impact_justification` | text | High Impact Justification |
| `use_case_topic_area` | text | Use Case Topic Area |
| `ai_classification` | text | AI Classification |
| `problem_description` | text | Problem Description |
| `benefit_description` | text | Benefit Description |
| `output_description` | text | Output Description |
| `operation_date` | floating_timestamp | Operation Date |
| `contractor_indicator` | text | Contractor Indicator |
| `vendor_name` | text | Vendor Name |
| `ato_indicator` | text | ATO Indicator |
| `system_name` | text | System Name |
| `training_data_description` | text | Training Data Description |
| `enterprise_data_inventory_url` | url | Enterprise Data Inventory URL |
| `pii_indicator` | text | PII Indicator |
| `pia_url` | text | PIA URL |
| `demographic_variable_description` | text | Demographic Variable Description |
| `custom_code_indicator` | text | Custom Code Indicator |
| `open_source_code_url` | url | Open Source Code URL |
| `predeployment_testing_indicator` | text | Predeployment Testing Indicator |
| `ai_impact_assessment_indicator` | text | AI Impact Assessment Indicator |
| `potential_impact_description` | text | Potential Impact Description |
| `independent_review_indicator` | text | Independent Review Indicator |
| `ongoing_monitoring_indicator` | text | Ongoing Monitoring Indicator |
| `operator_training_indicator` | text | Operator Training Indicator |
| `fail_safe_indicator` | text | Fail Safe Indicator |
| `appeal_process_indicator` | text | Appeal Process Indicator |
| `end_user_feedback_description` | text | End User Feedback Description |

---

## Code Snippets

### jQuery

```javascript
$.ajax({
  url: "https://data.transportation.gov/api/v3/views/anj8-k6f5/query.json",
  type: "POST",
  dataType: 'text',
  headers: {
    'Content-Type': 'application/json',
    'X-App-Token': "YOURAPPTOKENHERE"
  },
  data: JSON.stringify({
    query: 'SELECT *',
    page: {
      pageNumber: 1,
      pageSize: 5000
    },
    includeSynthetic: false
  })
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});
```

### Other Available Libraries

- Python Pandas
- PowerShell
- RSocrata
- SAS
- soda-ruby
- SODA.NET
- Stata

---

## Embed These Docs

```html
<script type="application/javascript">
  function resize(id, source) {
    var iframe = document.getElementById(id);
    window.addEventListener('message', function(e) {
      if(e.origin !== source) return;
      if(isNaN(e.data.height)) return;
      iframe.height = (e.data.height + 72) + "px";
    }, false);
  }
</script>
<iframe src="https://dev.socrata.com/foundry/data.transportation.gov/anj8-k6f5/embed"
  style="border-width:0" width="1020px" height="1000px" frameborder="0"
  id="embed-anj8-k6f5" scrolling="yes"
  onload="resize('embed-anj8-k6f5', 'https://dev.socrata.com');"></iframe>
```