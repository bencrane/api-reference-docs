# PowerPoint Notes

# USAspending API Training

## Agenda

- Introduction to APIs
- State Profile GET Request
- Advanced Search POST Request
- Additional Exercises & Resources
- Questions

---

## Introduction to APIs

### When to Use the API

The USAspending API powers all functionality on the website. Anything you can do on the site, you can do via the API — and the API exposes some functionality not available on the site.

For many simple or one-off tasks, the website is often easier. Consider using the API if:

- You need functionality only available through the API.
- You want to automate a report you need to run periodically.
- You want to automate repetitive tasks that would otherwise require manual work on the website.
- You want to build a workflow that integrates with tools like Excel.

### What is an API?

The **backend** transforms raw data into simple, digestible formats. The **frontend** designs ways to present that data for human consumption and insight. **APIs** bridge this gap by providing backend-curated data in a standard format for presentation on the website or other tools.

USAspending uses **REST API endpoints** to transfer formatted data from the server to client browsers. A REST API endpoint uses a defined set of rules to share or access formatted data through an HTTP request.

Each USAspending endpoint presents different data elements with different levels of aggregation and enables different sets of filters. For example, the endpoints powering state profile pages differ from those powering advanced search.

> **Reference:** [REST API Overview (StackOverflow)](https://stackoverflow.com/a/18768849)

### GET vs POST Requests

GET and POST are two different types of REST API requests. Each endpoint requires one or the other (specified in the endpoint documentation).

- **GET requests** retrieve data on a specific record with a known numerical identifier. They also support simple filtering (e.g., a count of new awards for an agency in a single fiscal year).
- **POST requests** support more advanced filtering (e.g., all grants awarded to a specific congressional district in a specific fiscal year from a specific agency).

---

## State Profile — GET Request

**Goal:** How much money went to my state in a fiscal year?

### Steps

1. Navigate to a state profile page on USAspending to see the total award amount in a period.
2. Inspect the page to identify which endpoint displays this number.
3. Review the endpoint documentation.
4. Adjust the GET request URL for a different state or time period.
5. Replicate the GET request in Excel.

### Demo Walkthrough

#### 1. Navigate to the State Profile

Go to the California state profile page:

```
https://www.usaspending.gov/state/california/latest
```

Observe the **Total Award Amount** value.

#### 2. Inspect the Page

Right-click the page and select **Inspect** (or use `Cmd+Ctrl+C` on Mac / `Ctrl+Shift+C` on PC).

#### 3. Find the API Call

- Select the **Network** tab and refresh the page.
- Use the filter box to show only API calls to `api.usaspending.gov`.
- Select the `api/v2/recipient/state/06` request.
- Observe the **Request URL** and **Request Method** in the Headers tab.

#### 4. Examine the Request URL

```
https://api.usaspending.gov/api/v2/recipient/state/06/?year=latest
```

- `/06/` specifies a state by FIPS code (California in this case).
- `?year=latest` filters the data to the trailing 12 months.

**Try it:** Change `06` to a different FIPS code, or change the year filter to `2022`.

#### 5. Examine the Response

Opening the Request URL in your browser returns JSON:

```json
{
  "name": "California",
  "code": "CA",
  "fips": "06",
  "type": "state",
  "population": 39536653,
  "pop_year": 2017,
  "pop_source": "U.S. Census Bureau, 2017 Population Estimate",
  "median_household_income": 67739.0,
  "mhi_year": 2016,
  "mhi_source": "U.S. Census Bureau, 2016 American Community Survey 1-Year Estimates",
  "total_prime_amount": 393881512738.49,
  "total_prime_awards": 884698,
  "total_face_value_loan_amount": 119983339041.15,
  "total_face_value_loan_prime_awards": 438551,
  "award_amount_per_capita": 9962.44
}
```

Compare `total_prime_amount` with the **Total Awarded Amount** shown on the website.

#### 6. Replicate in Excel

1. In Excel, go to **Data > Get Data > From Other Sources > From Web**.
2. Paste the GET request URL and click **OK**.
3. Compare the results table to the state profile page.
4. Click **Into Table**, then **Close & Load**.

Your data is now populated in an Excel spreadsheet.

---

## Advanced Search — POST Request

**Goal:** How much did my Congressional District receive in a fiscal year?

### Steps

1. Find this number using USAspending Advanced Search.
2. Inspect the page to identify which endpoints display this number.
3. Review the endpoint documentation.
4. Use PowerQuery to reproduce this API request in Excel.

### Demo Walkthrough

#### 1. Create an Advanced Search

Set up an advanced search with:
- **Time Period:** FY 2021
- **Recipient Location:** Congressional District FL-08

#### 2. Inspect Network Requests

Right-click the page → **Inspect** → **Network** tab. Filter to `api.usaspending.gov`.

#### 3. Use the Map View

Select the **Map** tab in Advanced Search, then choose **Recipient Location** and **Congressional District**. Zoom in and hover over the FL-08 district to see the **Total Obligations** value (e.g., `$11,651,796,324`).

#### 4. Examine the API Call

Select the most recent `spending_by_geography` request:

- **Request URL:** `https://api.usaspending.gov/api/v2/search/spending_by_geography/`
- **Request Method:** POST

##### Payload

```json
{
  "scope": "recipient_location",
  "geo_layer": "district",
  "filters": {
    "time_period": [
      {
        "start_date": "2020-10-01",
        "end_date": "2021-09-30"
      }
    ],
    "recipient_locations": [
      {
        "state": "FL",
        "country": "USA",
        "district": "08"
      }
    ]
  },
  "subawards": false
}
```

##### Response

```json
{
  "scope": "recipient_location",
  "geo_layer": "district",
  "results": [
    {
      "shape_code": "1208",
      "aggregated_amount": 11651796323.78,
      "display_name": "FL-08",
      "population": 768139,
      "per_capita": 15168.86
    }
  ]
}
```

#### 5. Review Endpoint Documentation

Navigate to the Request URL in your browser and click the documentation link.

**Endpoint:** `POST /api/v2/search/spending_by_geography/`

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| `filters` | AdvancedFilterObject (required) | Filters for the search |
| `subawards` | boolean (optional) | `true` for Subawards instead of Awards. Default: `false` |
| `scope` | enum (required) | `place_of_performance` or `recipient_location` |
| `geo_layer` | enum (required) | `state`, `county`, or `district` |
| `geo_layer_filters` | array (optional) | Filter to specific shape codes |

#### AdvancedFilterObject

The `AdvancedFilterObject` powers advanced search and is very useful. It supports:

- `keywords` — text search
- `time_period` — array of `TimePeriodObject`
- `place_of_performance_scope` — domestic/foreign
- `place_of_performance_locations` — array of `LocationObject`
- `agencies` — array of `AgencyObject`
- `recipient_search_text` — recipient name, UEI, DUNS
- `recipient_id` — unique identifier
- `recipient_scope` — domestic/foreign
- `recipient_locations` — array of `LocationObject`

#### TimePeriodObject

| Field | Type | Description |
|-------|------|-------------|
| `start_date` | string (required) | Format: `YYYY-MM-DD`. Earliest: `2007-10-01` (FY2008) |
| `end_date` | string (required) | Format: `YYYY-MM-DD`. Earliest: `2007-10-01` (FY2008) |
| `date_type` | enum (optional) | `action_date` or `last_modified_date` |

#### LocationObject

| Field | Type | Description |
|-------|------|-------------|
| `country` | string (required) | e.g., `USA` |
| `state` | string (optional) | e.g., `VA` |
| `county` | string (optional) | County code |
| `city` | string (optional) | City name |
| `district` | string (optional) | Congressional district |
| `zip` | string (optional) | ZIP code |

#### 6. Replicate in Excel with PowerQuery

1. In a new Excel workbook, go to **Data > Get Data > From Other Sources > Blank Query**.
2. In the PowerQuery Editor, select **Advanced Editor**.
3. Replace the default code with:

```m
let
    url = "https://api.usaspending.gov/api/v2/search/spending_by_geography/",
    body = "{
        ""scope"": ""recipient_location"",
        ""geo_layer"": ""district"",
        ""filters"": {
            ""time_period"": [
                {
                    ""start_date"": ""2020-10-01"",
                    ""end_date"": ""2021-09-30""
                }
            ],
            ""recipient_locations"": [
                {
                    ""state"": ""FL"",
                    ""country"": ""USA"",
                    ""district"": ""08""
                }
            ]
        }
    }",
    Source = Json.Document(Web.Contents(url, [Content=Text.ToBinary(body), Headers=[#"Content-Type"="application/json"]]))
in
    Source
```

> **Note:** PowerQuery handles POST requests in a particular way. The `Web.Contents` call with `Content` and `Headers` parameters (lines 22–24) is required. Also note the double double-quotes (`""`) for escaping strings within PowerQuery.

4. Click **Done** (ensure no syntax errors).
5. Drill into `results` → click the List → click the Record → click **Into Table**.
6. Click **Close & Load** to load results into a spreadsheet.

> **Reference:** [PowerQuery Example on GitHub](https://github.com/fedspendingtransparency/usaspending-api/wiki/API-Usage---Power-Query-Example)

---

## COVID-19 Exercise

**Goal:** How much did my Congressional District receive in COVID-19 funding?

### Steps

1. Navigate to the [USAspending COVID-19 Spending profile page](https://www.usaspending.gov/disaster/covid-19).
2. Scroll to the **Award Spending by Recipient Map**.
3. Configure: Area Type = Congressional Districts, Spending Type = Award Obligations, Amount Type = Total Spending.
4. Inspect the page to find the `spending_by_geography` API call.
5. Review the endpoint documentation.
6. Use PowerQuery to reproduce the request in Excel.

### COVID Profile Page vs Advanced Search DEFC

Agencies report transaction-level award data and COVID-19 DEFC award spending data through different systems. USAspending links these to create a comprehensive picture of government spending.

Advanced Search primarily uses transaction-level award data. Since DEFC information is not available at the transaction level, summary stats for Advanced Search results with a DEFC filter are an approximation. The COVID-19 Spending profile page uses a **different set of endpoints** to present detailed COVID spending data.

> **References:**
> - [COVID-19 Data Sources & Methodology](https://www.usaspending.gov/disaster/covid-19/data-sources)
> - [API Intro Tutorial](https://api.usaspending.gov/docs/intro-tutorial)

### Disaster Spending by Geography Endpoint

**Endpoint:** `POST /api/v2/disaster/spending_by_geography/`

**Documentation:** [GitHub](https://github.com/fedspendingtransparency/usaspending-api/blob/master/usaspending_api/api_contracts/contracts/v2/disaster/spending_by_geography.md)

**Attributes:**

| Attribute | Type | Description |
|-----------|------|-------------|
| `filter` | Filter (required, fixed-type) | Filter by DEFC or award type |
| `geo_layer` | enum (required) | `state`, `county`, or `district` |
| `geo_layer_filters` | array (optional) | List of 4-digit CD FIPS codes |
| `scope` | enum (optional) | `place_of_performance` or `recipient_location` (default) |
| `spending_type` | enum (required) | `obligation`, `outlay`, or `face_value_of_loan` |

> **Key difference:** The `filter` attribute does **not** take an `AdvancedFilterObject`. It allows filtering by DEFC or award type, enabling you to answer questions about spending from a particular COVID supplemental appropriation bill — functionality not available on the website alone.

### PowerQuery Code for COVID Endpoint

```m
let
    url = "https://api.usaspending.gov/api/v2/disaster/spending_by_geography/",
    body = "{
        ""spending_type"": ""obligation"",
        ""geo_layer"": ""district"",
        ""geo_layer_filters"": [""1208""],
        ""filter"": {""def_codes"": [""L"", ""M"", ""N"", ""O"", ""P"", ""U"", ""V""]}
    }",
    Source = Json.Document(Web.Contents(url, [Content=Text.ToBinary(body), Headers=[#"Content-Type"="application/json"]])),
    results = Source[results],
    results1 = results{0},
    #"Converted to Table" = Record.ToTable(results1)
in
    #"Converted to Table"
```

---

## Additional Exercise

**On your own:** Use Excel to create an API request to replicate an advanced search in USAspending.

---

## Additional Resources

- [List of Available Endpoints](https://api.usaspending.gov/docs/endpoints)
- [What is a REST API? (Red Hat)](https://www.redhat.com/en/topics/api/what-is-a-rest-api)
- [Python Requests Tutorial (Real Python)](https://realpython.com/python-requests/)
- [PowerQuery Example (GitHub)](https://github.com/fedspendingtransparency/usaspending-api/wiki/API-Usage---Power-Query-Example)