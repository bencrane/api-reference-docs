# CourtListener Search API — Bankruptcy Signal Reference

> **Base URL:** `https://www.courtlistener.com/api/rest/v4/search/`
> **Auth:** `Authorization: Token YOUR_TOKEN`
> **Rate Limit:** 5,000 requests/hour (authenticated)
> **Cost:** Free

---

## What This API Does

The Search API is an **Elasticsearch-powered full-text search** across CourtListener's entire corpus. Unlike the Dockets API (which is a structured database query), this is a search engine — it supports free-text queries, relevance scoring, field-specific searches, and Boolean operators.

Use this when you want to:
- Search by company name across all PACER filings
- Find bankruptcy cases mentioning specific parties or terms
- Search docket entry descriptions for specific filing types (e.g., "creditor matrix", "disclosure statement")
- Cast a wide net and filter down results

---

## Authentication

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11" \
  --header 'Authorization: Token YOUR_TOKEN'
```

---

## Search Types

The `type` parameter controls which index you're searching:

| Type | Index | What It Searches |
|------|-------|-----------------|
| `o` | Opinions | Case law / judicial opinions |
| `r` | RECAP / Dockets | PACER dockets and docket entries |
| `oa` | Oral Arguments | Audio recordings |
| `p` | People | Judges and judicial personnel |

**For bankruptcy signals, you always want `type=r`** (RECAP/dockets).

---

## Core Request: Search RECAP Dockets

```bash
# Search for Chapter 11 bankruptcy filings
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Response Structure (type=r)

```json
{
  "count": "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11&count=on",
  "next": "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11&cursor=cD0xMjM0",
  "previous": null,
  "results": [
    {
      "docket_absolute_url": "/docket/65789098/in-re-acme-corp/",
      "docket_id": 65789098,
      "caseName": "In re: Acme Corp",
      "case_name_full": "In re: Acme Corp, Debtor",
      "court": "nysb",
      "court_citation_string": "Bankr. S.D.N.Y.",
      "court_exact": "nysb",
      "docketNumber": "22-10001 (MG)",
      "judge": "Martin Glenn",
      "assigned_to_id": 678,
      "referred_to_id": null,
      "dateArgued": null,
      "dateFiled": "2022-01-15",
      "dateTerminated": null,
      "party_name": [
        "Acme Corp",
        "Bank of America",
        "Internal Revenue Service"
      ],
      "attorney": [
        "John Smith, Esq.",
        "Weil, Gotshal & Manges LLP"
      ],
      "assignedTo": "Martin Glenn",
      "suitNature": "",
      "cause": "",
      "juryDemand": "",
      "jurisdictionType": "",
      "pacer_case_id": "123456",
      "meta": {
        "timestamp": "2022-07-01T14:22:00Z",
        "date_created": "2022-01-16T08:30:00Z",
        "score": {
          "bm25": 12.45
        }
      },
      "short_description": "",
      "entry_number": null,
      "document_type": "",
      "document_number": null,
      "entry_date_filed": null,
      "recap_documents": []
    }
  ]
}
```

---

## Key Response Fields for Bankruptcy Signals

| Field | Type | What It Tells You |
|-------|------|-------------------|
| `docket_id` | int | Use to call Dockets API for full detail |
| `caseName` | string | Debtor / company name — your match target |
| `court` | string | Court code (e.g., `nysb`) |
| `docketNumber` | string | Full case number |
| `dateFiled` | date | Petition filing date |
| `dateTerminated` | date | Null = active case |
| `party_name` | array | All parties — **creditors are in here** |
| `attorney` | array | All attorneys on the case |
| `assignedTo` | string | Judge name |
| `suitNature` | string | Nature of suit code (often empty for bankruptcy) |
| `pacer_case_id` | string | PACER's internal ID |
| `meta.score.bm25` | float | Relevance score — higher = better match |
| `short_description` | string | Docket entry description (when result is an entry) |
| `entry_number` | int | Filing entry number within the docket |
| `entry_date_filed` | date | When this specific entry was filed |

---

## Query Syntax

The `q` parameter supports Elasticsearch query syntax:

### Basic Text Search

```bash
# Free text — searches across all indexed fields
?type=r&q=acme+corporation+bankruptcy
```

### Exact Phrase

```bash
# Exact phrase match
?type=r&q="acme corporation"
```

### Field-Specific Search

```bash
# Search only case names
?type=r&q=caseName:"acme corporation"

# Search only party names
?type=r&q=party:"bank of america"

# Search only docket entry descriptions
?type=r&q=short_description:"creditor matrix"

# Search for specific chapter type in the case name
?type=r&q=caseName:"chapter 11"

# Search by docket number
?type=r&q=docketNumber:"22-10001"
```

### Boolean Operators

```bash
# AND (default behavior — all terms must match)
?type=r&q=chapter+11+acme

# OR
?type=r&q=chapter+11+OR+chapter+7

# NOT (exclude terms)
?type=r&q=chapter+11+-dismissed

# Grouping
?type=r&q=(chapter+11+OR+chapter+7)+AND+"creditor matrix"
```

### Wildcard

```bash
# Wildcard search
?type=r&q=caseName:acme*
```

### Advanced: Document Type Filtering

```bash
# Search for PACER documents specifically
?type=r&q=document_type:"PACER Document"+short_description:"disclosure statement"

# Exclude certain entry types
?type=r&q=chapter:11+short_description:"disclosure statement"+-short_description:Approving
```

---

## Filter Parameters (GET Params)

These are separate from the `q` query and work as structured filters:

### Court Filter

```bash
# Single court
?type=r&q=chapter+11&court=nysb

# Multiple courts (space-separated in a single param)
?type=r&q=chapter+11&court=nysb+deb+txsb+ilnb+flsb

# All bankruptcy courts — pass all court IDs
# (There's no single "all bankruptcy" shortcut in search like the Dockets API's court__jurisdiction=FB)
?type=r&q=chapter+11&court=almb+alnb+alsb+akb+arb+areb+arwb+cacb+caeb+canb+casb+cob+ctb+deb+dcb+flmb+flnb+flsb+gamb+ganb+gasb+hib+idb+ilcb+ilnb+ilsb+innb+insb+ianb+iasb+ksb+kyeb+kywb+laeb+lamb+lawb+meb+mdb+mab+mieb+miwb+mnb+msb+moeb+mowb+mtb+neb+nvb+nhb+njb+nmb+nyeb+nynb+nysb+nywb+nceb+ncmb+ncwb+ndb+ohnb+ohsb+okeb+oknb+okwb+orb+paeb+pamb+pawb+rib+scb+sdb+tneb+tnmb+tnwb+txeb+txnb+txsb+txwb+utb+vtb+vaeb+vawb+waeb+wawb+wvnb+wvsb+wieb+wiwb+wyb
```

### Date Filters

```bash
# Filed after a date
?type=r&q=chapter+11&filed_after=2025-01-01

# Filed before a date
?type=r&q=chapter+11&filed_before=2025-01-31

# Both (date range)
?type=r&q=chapter+11&filed_after=2025-01-01&filed_before=2025-01-31
```

> **Note:** Search API uses `filed_after` / `filed_before` (not `date_filed__gte` like the Dockets API).

### Party Name Filter

```bash
# Filter by party name (separate from free text search)
?type=r&party_name=Acme+Corporation
```

### Judge Filter

```bash
?type=r&q=chapter+11&assigned_to=Glenn
```

### Attorney Filter

```bash
?type=r&q=chapter+11&attorney=Weil+Gotshal
```

### Available Documents Only

```bash
# Only return results where RECAP has the actual document
?type=r&q=chapter+11&available_only=on
```

### Ordering

```bash
# By relevance score (default)
?type=r&q=chapter+11&order_by=score+desc

# By filing date, newest first
?type=r&q=chapter+11&order_by=dateFiled+desc

# By filing date, oldest first
?type=r&q=chapter+11&order_by=dateFiled+asc
```

---

## Result Types: Cases vs. Docket Entries

The RECAP search (`type=r`) returns **two kinds of results mixed together**:

1. **Case-level results** — the docket itself. `entry_number` is null, `short_description` is empty.
2. **Entry-level results** — individual filings within a docket. `entry_number` is populated, `short_description` has the filing description.

### Distinguishing Them

```python
for result in data["results"]:
    if result.get("entry_number"):
        # This is a docket ENTRY (a specific filing)
        print(f"Entry #{result['entry_number']}: {result['short_description']}")
    else:
        # This is a CASE (the docket itself)
        print(f"Case: {result['caseName']} ({result['docketNumber']})")
```

---

## Practical Examples

### Example 1: Find All Recent Chapter 11 Filings

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=caseName:\"chapter+11\"&filed_after=2025-02-01&order_by=dateFiled+desc" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Example 2: Search for a Specific Company in Bankruptcy

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=\"Acme+Trucking\"&court=nysb+deb+txsb" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Example 3: Find Creditor Matrix Filings

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=short_description:\"creditor+matrix\"&filed_after=2025-01-01&available_only=on" \
  --header 'Authorization: Token YOUR_TOKEN'
```

The creditor matrix is the document that lists every creditor of the bankrupt company — it's the raw material for the competitor poaching play.

### Example 4: Find Disclosure Statements (Late-Stage Ch.11)

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=short_description:\"disclosure+statement\"+-short_description:Approving&court=nysb+deb&available_only=on" \
  --header 'Authorization: Token YOUR_TOKEN'
```

### Example 5: Search by Party Name Across All Courts

```bash
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&party_name=Bank+of+America" \
  --header 'Authorization: Token YOUR_TOKEN'
```

Useful for finding all cases where a specific company appears as a creditor.

---

## Pagination

The Search API uses cursor-based pagination:

```bash
# First page
curl "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11" \
  --header 'Authorization: Token YOUR_TOKEN'

# Follow the "next" URL from the response
# "next": "https://www.courtlistener.com/api/rest/v4/search/?type=r&q=chapter+11&cursor=cD0xMjM0"
```

---

## Search API vs. Dockets API — When to Use Which

| Use Case | API | Why |
|----------|-----|-----|
| "Get all bankruptcy filings from yesterday" | **Dockets API** | Structured date + jurisdiction filter, no text query needed |
| "Find cases mentioning Acme Corp" | **Search API** | Full-text search across all fields |
| "Pull creditor matrix documents" | **Search API** | Need to search docket entry descriptions |
| "Get full detail on docket #12345" | **Dockets API** | Direct lookup by ID |
| "Find all cases where X is a creditor" | **Search API** | Party name search across all dockets |
| "Daily feed of new bankruptcy filings" | **Dockets API** | `court__jurisdiction=FB&date_filed__gte=yesterday` |
| "Monitor for filings mentioning specific keywords" | **Search API** | This is what Search Alerts are built on |

---

## Workflow: Search → Docket → Parties → Creditors

### Step 1: Search for Bankruptcy Filings (Search API)

```python
import requests

BASE = "https://www.courtlistener.com/api/rest/v4"
TOKEN = "YOUR_TOKEN"
HEADERS = {"Authorization": f"Token {TOKEN}"}

# Search for recent Chapter 11 filings
resp = requests.get(f"{BASE}/search/", headers=HEADERS, params={
    "type": "r",
    "q": 'caseName:"chapter 11"',
    "filed_after": "2025-02-01",
    "order_by": "dateFiled desc",
})
search_results = resp.json()["results"]

# Extract docket IDs from case-level results
docket_ids = [r["docket_id"] for r in search_results if not r.get("entry_number")]
```

### Step 2: Get Full Docket Details (Dockets API)

```python
for docket_id in docket_ids:
    resp = requests.get(
        f"{BASE}/dockets/{docket_id}/",
        headers=HEADERS,
        params={"fields": "id,case_name,court_id,docket_number,date_filed,date_terminated"}
    )
    docket = resp.json()
    print(f"{docket['case_name']} | {docket['court_id']} | {docket['date_filed']}")
```

### Step 3: Pull Parties / Creditor List

```python
for docket_id in docket_ids:
    resp = requests.get(
        f"{BASE}/parties/",
        headers=HEADERS,
        params={"docket": docket_id}
    )
    parties = resp.json()["results"]
    for party in parties:
        print(f"  Party: {party['name']} | Type: {party.get('party_type', 'unknown')}")
```

### Step 4: Match Creditors Against Your Pipeline

```python
# Fuzzy match creditor names against your FMCSA / Enigma / client companies
from difflib import SequenceMatcher

your_companies = ["Acme Trucking LLC", "Big Freight Inc", ...]

for party in creditor_parties:
    for company in your_companies:
        ratio = SequenceMatcher(None, party["name"].lower(), company.lower()).ratio()
        if ratio > 0.8:
            print(f"MATCH: {party['name']} ≈ {company} (score: {ratio:.2f})")
```

---

## Error Handling

| Status | Meaning |
|--------|---------|
| `200` | Success |
| `400` | Bad query syntax |
| `401` | Missing or invalid token |
| `429` | Rate limit exceeded |

If you get garbled results, check:
1. URL encoding of special characters in `q`
2. Proper quoting of exact phrases
3. That `type=r` is set (default may be opinions)

---

## Limitations

- **RECAP coverage is crowdsourced.** Not every PACER filing is in CourtListener. High-profile cases have near-complete coverage; small cases may have gaps.
- **No direct "chapter type" filter.** You have to infer Ch. 7/11/13 from the case name or docket entry text. The Dockets API doesn't have a `chapter` field.
- **Search result limits.** Very broad queries may be throttled. The system will tell you if results are too numerous for alerts.
- **`party_name` in search results** is a flat array of strings — no party type (debtor vs. creditor) distinction. You need the Parties API for that.
- **Date format difference.** Search API uses `filed_after`/`filed_before`. Dockets API uses `date_filed__gte`/`date_filed__lte`. Don't mix them up.