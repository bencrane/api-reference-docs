# CourtListener Dockets API — Bankruptcy Signal Reference

> **Base URL:** `https://www.courtlistener.com/api/rest/v4/dockets/`
> **Auth:** `Authorization: Token YOUR_TOKEN`
> **Rate Limit:** 5,000 requests/hour (authenticated)
> **Cost:** Free

---

## What This API Does

The Dockets API is a **structured database query** against CourtListener's PostgreSQL backend. It returns docket records — one per case — with filters for court, date, jurisdiction, case type, and more. This is NOT a search engine. It's a direct table lookup with Django ORM-style filtering.

Use this when you want to:
- Pull all bankruptcy dockets filed in a date range
- Get docket detail (parties, entries, documents) for a specific case
- Paginate through large result sets with cursor-based pagination
- Filter by court, judge, nature of suit, etc.

---

## Authentication

```bash
# Token auth (recommended for programmatic access)
curl "https://www.courtlistener.com/api/rest/v4/dockets/" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Get your token at: https://www.courtlistener.com/profile/api/

---

## Core Request: List Dockets

```bash
# Basic request — returns paginated dockets
curl "https://www.courtlistener.com/api/rest/v4/dockets/" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Response Structure

```json
{
  "count": "https://www.courtlistener.com/api/rest/v4/dockets/?count=on",
  "next": "https://www.courtlistener.com/api/rest/v4/dockets/?cursor=2",
  "previous": null,
  "results": [
    {
      "resource_uri": "https://www.courtlistener.com/api/rest/v4/dockets/12345/",
      "id": 12345,
      "court": "https://www.courtlistener.com/api/rest/v4/courts/nysb/",
      "court_id": "nysb",
      "court_citation_string": "Bankr. S.D.N.Y.",
      "assigned_to": "https://www.courtlistener.com/api/rest/v4/people/678/",
      "assigned_to_str": "Judge Martin Glenn",
      "referred_to": null,
      "referred_to_str": "",
      "case_name": "In re: Acme Corporation",
      "case_name_short": "Acme Corporation",
      "case_name_full": "In re: Acme Corporation, Debtor",
      "slug": "in-re-acme-corporation",
      "docket_number": "22-10001 (MG)",
      "docket_number_core": "2210001",
      "pacer_case_id": "123456",
      "cause": "",
      "nature_of_suit": "",
      "jury_demand": "",
      "jurisdiction_type": "",
      "date_filed": "2022-01-15",
      "date_terminated": null,
      "date_last_filing": "2022-06-30",
      "date_created": "2022-01-16T08:30:00Z",
      "date_modified": "2022-07-01T14:22:00Z",
      "date_blocked": null,
      "blocked": false,
      "absolute_url": "/docket/12345/in-re-acme-corporation/",
      "clusters": [],
      "audio_files": [],
      "tags": [],
      "panel": []
    }
  ]
}
```

---

## Key Fields for Bankruptcy Signal Extraction

| Field | Type | What It Tells You |
|-------|------|-------------------|
| `id` | int | Unique docket ID — use for detail lookups |
| `court_id` | string | Court code (e.g., `nysb` = Bankruptcy S.D.N.Y.) |
| `case_name` | string | The debtor — this is your company match target |
| `case_name_short` | string | Abbreviated version for matching |
| `docket_number` | string | Full case number with judge initials |
| `date_filed` | date | When the petition was filed — your trigger date |
| `date_terminated` | date | Null = still open. Date = case closed. |
| `date_last_filing` | date | Most recent activity — shows if case is active |
| `nature_of_suit` | string | NOS code (not always populated for bankruptcy) |
| `jurisdiction_type` | string | Court jurisdiction classification |
| `assigned_to_str` | string | Judge name |
| `pacer_case_id` | string | PACER's internal ID — useful for cross-referencing |
| `absolute_url` | string | Link to the docket on CourtListener.com |

---

## Filtering — The Important Part

Discover all available filters with an OPTIONS request:

```bash
curl -X OPTIONS \
  --header 'Authorization: Token YOUR_TOKEN' \
  "https://www.courtlistener.com/api/rest/v4/dockets/" | jq '.filters'
```

### Filter by Court (Bankruptcy Courts)

Bankruptcy court IDs follow the pattern `{state_abbrev}b` (e.g., `nysb`, `casb`, `txsb`).

```bash
# All dockets from Southern District of New York Bankruptcy Court
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court=nysb" \
  --header 'Authorization: Token YOUR_TOKEN'
```

#### Common Bankruptcy Court IDs

| Court ID | Court Name |
|----------|-----------|
| `nysb` | Bankr. S.D.N.Y. |
| `nyeb` | Bankr. E.D.N.Y. |
| `nynb` | Bankr. N.D.N.Y. |
| `nywb` | Bankr. W.D.N.Y. |
| `casb` | Bankr. S.D. Cal. |
| `cacb` | Bankr. C.D. Cal. |
| `canb` | Bankr. N.D. Cal. |
| `caeb` | Bankr. E.D. Cal. |
| `txsb` | Bankr. S.D. Tex. |
| `txnb` | Bankr. N.D. Tex. |
| `txeb` | Bankr. E.D. Tex. |
| `txwb` | Bankr. W.D. Tex. |
| `deb` | Bankr. D. Del. (popular for large Ch.11) |
| `ilnb` | Bankr. N.D. Ill. |
| `flsb` | Bankr. S.D. Fla. |
| `flmb` | Bankr. M.D. Fla. |
| `njb` | Bankr. D.N.J. |
| `dcb` | Bankr. D.D.C. |
| `mab` | Bankr. D. Mass. |
| `vab` | Bankr. E.D. Va. |

> **Tip:** Delaware (`deb`) and S.D.N.Y. (`nysb`) handle the majority of large corporate Chapter 11 filings.

### Filter by Multiple Courts

```bash
# Delaware + SDNY bankruptcy courts
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court=deb&court=nysb" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Filter by Jurisdiction Type

Use the `court__jurisdiction` related filter to get all bankruptcy courts at once:

```bash
# FB = Federal Bankruptcy jurisdiction
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Jurisdiction codes:
- `F` = Federal Appellate
- `FD` = Federal District
- `FB` = Federal Bankruptcy
- `FS` = Federal Special (e.g., Court of Federal Claims)
- `S` = State Supreme
- `SA` = State Appellate
- `ST` = State Trial

### Filter by Date

```bash
# Dockets filed after Jan 1, 2025
curl "https://www.courtlistener.com/api/rest/v4/dockets/?date_filed__gte=2025-01-01" \
  --header 'Authorization: Token YOUR_TOKEN'

# Dockets filed in the last 7 days (adjust date accordingly)
curl "https://www.courtlistener.com/api/rest/v4/dockets/?date_filed__gte=2025-02-11" \
  --header 'Authorization: Token YOUR_TOKEN'

# Dockets filed between two dates
curl "https://www.courtlistener.com/api/rest/v4/dockets/?date_filed__gte=2025-01-01&date_filed__lte=2025-01-31" \
  --header 'Authorization: Token YOUR_TOKEN'

# Dockets modified recently (good for detecting new activity)
curl "https://www.courtlistener.com/api/rest/v4/dockets/?date_modified__gte=2025-02-17" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Date filter suffixes:
- `__exact` — exact match
- `__gte` — greater than or equal
- `__gt` — greater than
- `__lte` — less than or equal
- `__lt` — less than
- `__range` — inclusive range (comma-separated)

### Filter by ID Range (for Pagination/Diffing)

```bash
# Get dockets with ID greater than your last-seen ID
curl "https://www.courtlistener.com/api/rest/v4/dockets/?id__gt=5000000&court__jurisdiction=FB" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Combine Filters — Daily Bankruptcy Signal Pull

```bash
# All bankruptcy dockets filed yesterday, ordered by most recent
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&date_filed__gte=2025-02-17&order_by=-date_filed" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Exclusion Filters

Prepend `!` to exclude:

```bash
# All federal dockets EXCEPT bankruptcy
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction!=FB" \
  --header 'Authorization: Token YOUR_TOKEN'
```

---

## Field Selection — Optimize Requests

Don't pull everything. Select only what you need:

```bash
# Only get the fields needed for signal detection
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&date_filed__gte=2025-02-17&fields=id,case_name,case_name_short,court_id,docket_number,date_filed,date_terminated,date_last_filing,absolute_url,assigned_to_str" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Omit Heavy Fields

```bash
# Omit nested objects you don't need
curl "https://www.courtlistener.com/api/rest/v4/dockets/12345/?omit=clusters,audio_files,tags,panel" \
  --header 'Authorization: Token YOUR_TOKEN'
```

---

## Get Single Docket Detail

```bash
curl "https://www.courtlistener.com/api/rest/v4/dockets/12345/" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Returns the full docket object with all fields, including nested parties, entries, and documents if available.

---

## Related Endpoints

### Docket Entries (Filings Within a Case)

```bash
# Get all entries for a specific docket
curl "https://www.courtlistener.com/api/rest/v4/docket-entries/?docket=12345&order_by=entry_number" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Returns individual filings with `entry_number`, `description`, `date_filed`, and linked RECAP documents.

### Parties (Creditor Lists — The Competitor Poaching Play)

```bash
# Get parties for a specific docket
curl "https://www.courtlistener.com/api/rest/v4/parties/?docket=12345" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Returns party names, types (debtor, creditor, trustee), and associated attorneys. **Creditor lists from Chapter 11 filings are literal customer/vendor lists of distressed companies.**

### RECAP Documents (Actual PDFs)

```bash
# Get RECAP documents for a docket entry
curl "https://www.courtlistener.com/api/rest/v4/recap-document/?docket_entry__docket=12345" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Returns document metadata, `plain_text` (extracted text), and download URLs.

---

## Pagination

### Cursor-Based (Deep Pagination)

For large result sets, use cursor-based pagination by ordering on `id`, `date_modified`, or `date_created`:

```bash
# First page
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&order_by=id" \
  --header 'Authorization: Token YOUR_TOKEN'

# Response includes "next" URL — follow it
# "next": "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&cursor=cD0xMjM0NTY&order_by=id"
```

Always follow the `next` URL from the response. Do NOT construct cursor values manually.

### Page-Based (Limited to 100 Pages)

```bash
curl "https://www.courtlistener.com/api/rest/v4/dockets/?page=2" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Limited to 100 pages. Use cursor-based for anything larger.

### Count Only

```bash
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&date_filed__gte=2025-01-01&count=on" \
  --header 'Authorization: Token YOUR_TOKEN'

# Returns: {"count": 14523}
```

---

## Ordering

```bash
# Most recently filed first
curl "https://www.courtlistener.com/api/rest/v4/dockets/?order_by=-date_filed" \
  --header 'Authorization: Token YOUR_TOKEN'

# Most recently modified (catches updates to existing cases)
curl "https://www.courtlistener.com/api/rest/v4/dockets/?order_by=-date_modified" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Use `-` prefix for descending. Combine with comma: `order_by=-date_filed,id`

---

## Practical Workflow: Daily Bankruptcy Signal Feed

### Step 1: Pull New Bankruptcy Filings (1 request)

```bash
curl "https://www.courtlistener.com/api/rest/v4/dockets/?court__jurisdiction=FB&date_filed__gte=2025-02-17&order_by=-date_filed&fields=id,case_name,case_name_short,court_id,docket_number,date_filed,absolute_url" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Step 2: Match Company Names Against Your Pipeline

Take `case_name` / `case_name_short` and fuzzy-match against your FMCSA, Enigma, or client company lists.

### Step 3: Enrich Matches — Pull Party Details (1 request per match)

```bash
curl "https://www.courtlistener.com/api/rest/v4/parties/?docket=MATCHED_DOCKET_ID" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Step 4: Extract Creditor List for Competitor Poaching

Parse party records where type = creditor. These are the companies that were doing business with the bankrupt entity.

---

## Error Handling

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `401` | Missing or invalid token |
| `403` | Insufficient permissions |
| `404` | Docket not found |
| `429` | Rate limit exceeded (check `Retry-After` header) |

Common mistake: Forgetting the word `Token` in the auth header. It's `Authorization: Token YOUR_TOKEN`, not just `Authorization: YOUR_TOKEN`.

---

## Python Example

```python
import requests
from datetime import date, timedelta

BASE = "https://www.courtlistener.com/api/rest/v4"
TOKEN = "YOUR_TOKEN"
HEADERS = {"Authorization": f"Token {TOKEN}"}

# Pull yesterday's bankruptcy filings
yesterday = (date.today() - timedelta(days=1)).isoformat()

url = f"{BASE}/dockets/"
params = {
    "court__jurisdiction": "FB",
    "date_filed__gte": yesterday,
    "order_by": "-date_filed",
    "fields": "id,case_name,case_name_short,court_id,docket_number,date_filed,absolute_url",
}

all_results = []
while url:
    resp = requests.get(url, headers=HEADERS, params=params if not all_results else None)
    data = resp.json()
    all_results.extend(data["results"])
    url = data.get("next")  # Follow cursor pagination

print(f"Found {len(all_results)} new bankruptcy filings")
for d in all_results:
    print(f"  {d['date_filed']} | {d['court_id']} | {d['case_name']} | {d['docket_number']}")
```

---

## Notes

- **Coverage is RECAP-dependent.** CourtListener's docket data comes from PACER via the RECAP crowdsourcing project. Not every bankruptcy filing will appear immediately. High-profile cases and busy courts have better coverage.
- **`nature_of_suit` is often empty** for bankruptcy dockets. Filter by `court__jurisdiction=FB` instead.
- **Docket numbers for bankruptcy** follow the pattern `YY-NNNNN` (e.g., `22-10001`). The chapter (7, 11, 13) is NOT a field on the docket — it's in the case title or docket entries.
- **To detect Chapter type**, look for "Chapter 7", "Chapter 11", "Chapter 13" in `case_name` or search the docket entries.
- **`date_modified`** updates when CourtListener adds new entries to the docket, not when the court acts. Use `date_filed` for the actual filing date.