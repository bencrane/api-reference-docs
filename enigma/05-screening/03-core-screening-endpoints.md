# API REFERENCE - Core Screening Endpoints

URL: https://documentation.enigma.com/screening/api/core-endpoints

The main screening endpoint enables you to screen customers and transactions against sanctions and other watchlists.

---

## Screen Endpoint

```
POST /evaluation/sanctions/screen
```

### Customer Screening

**Request:**

```bash
curl --location 'https://api.enigma.com/evaluation/sanctions/screen' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--header 'Account-Name: <YOUR ACCOUNT NAME>' \
--data '{
  "tag": "example customer screening request",
  "caller_id": "<some-user-hostname-info>",
  "query_type": "enigma_data",
  "configuration_overrides": {
    "entity": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5,
      "max_results": 30,
      "weights": {
        "person_name": 3,
        "dob": 1,
        "country_of_affiliation": 2,
        "address": 1,
        "org_name": 3
      }
    },
    "general": {
      "archive_retention_days": 90,
      "entity_detail_level": "minimum",
      "overrides_on": true
    },
    "list_groups": [
      "pos/sdn/all",
      "pos/non_sdn/all"
    ],
    "text": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5
    }
  },
  "searches": [
    {
      "type": "ENTITY",
      "tag": "",
      "entity_description": {
        "person_name": ["John Hanafin"],
        "dob": ["19740710"],
        "country_of_affiliation": ["Ireland"]
      }
    }
  ]
}'
```

**Response:**

```json
{
  "alert": true,
  "caller_id": "<some-user-hostname-info>",
  "configuration_used": {
    "entity": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5,
      "max_results": 30,
      "weights": {
        "address": 1.0,
        "country_of_affiliation": 2.0,
        "dob": 1.0,
        "org_name": 3.0,
        "person_name": 3.0
      }
    },
    "general": {
      "archive_retention_days": 90,
      "entity_detail_level": "minimum",
      "overrides_on": true
    },
    "list_groups": [
      "pos/sdn/all",
      "pos/non_sdn/all"
    ],
    "text": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5
    }
  },
  "query_type": "enigma_data",
  "request_id": "fed01a4a-da7e-11ee-8600-0a58a9feac02",
  "request_timestamp": "2024-03-04T23:29:07.084985+00:00",
  "search_results": [
    {
      "alert": true,
      "hits": [
        {
          "alert": true,
          "attributes": {
            "country_of_affiliation": {
              "id": "nationality.62652",
              "index_used": 0,
              "score": 1.0,
              "value": "IRELAND",
              "view_ids": ["pos/sdn/all"]
            },
            "dob": {
              "id": "dob.62651",
              "index_used": 0,
              "score": 1.0,
              "value": "19740710",
              "view_ids": ["pos/sdn/all"]
            },
            "person_name": {
              "id": "primary_name",
              "index_used": 0,
              "score": 0.6708,
              "value": "JOHN DESMOND HANAFIN",
              "view_ids": ["pos/sdn/all"]
            }
          },
          "attributes_used": [
            "person_name",
            "dob",
            "country_of_affiliation"
          ],
          "entity": {
            "id": "ofac/sdn/43085"
          },
          "score": 0.8354,
          "total_weight_used": 6.0
        }
      ],
      "search_index": 0,
      "tag": "",
      "type": "ENTITY"
    }
  ],
  "tag": "example customer screening request"
}
```

### Transaction Screening

> **Text Search Availability:** The request below showcases how to use customized tags within the request to fit your transaction format. This example has an originator, originator bank, recipient, recipient bank, and message field for TEXT search. **Unstructured text-based search (search denoted by `"type": "TEXT"`) is not yet open for public evaluation but soon will be.**

**Request:**

```bash
curl --location 'https://api.enigma.com/evaluation/sanctions/screen' \
--header 'x-api-key: <YOUR API KEY>' \
--header 'Content-Type: application/json' \
--header 'Account-Name: <YOUR ACCOUNT NAME>' \
--data '{
  "tag": "example transaction screening request",
  "query_type": "enigma_data",
  "configuration_overrides": {
    "entity": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5,
      "max_results": 30,
      "weights": {
        "person_name": 3,
        "dob": 1,
        "country_of_affiliation": 2,
        "address": 1,
        "org_name": 3
      }
    },
    "general": {
      "archive_retention_days": 90,
      "entity_detail_level": "minimum",
      "overrides_on": true
    },
    "list_groups": [
      "pos/sdn/all",
      "pos/non_sdn/all"
    ],
    "text": {
      "alert_threshold": 0.8,
      "hit_threshold": 0.5
    }
  },
  "searches": [
    {
      "type": "ENTITY",
      "tag": "originator",
      "entity_description": {
        "person_name": ["John D Hanafin"],
        "country_of_affiliation": ["Ireland"]
      }
    },
    {
      "type": "ENTITY",
      "tag": "originator bank",
      "entity_description": {
        "org_name": ["Wells Fargo"]
      }
    },
    {
      "type": "ENTITY",
      "tag": "recipient",
      "entity_description": {
        "person_name": ["Sandra Milena Hernandez"],
        "address": ["INVERSIONES MACARNIC PATINO Y CIA S.C.S. Pereira Risaralda Colombia"]
      }
    },
    {
      "type": "ENTITY",
      "tag": "recipient bank",
      "entity_description": {
        "org_name": ["Banco de Bogota"],
        "country_of_affiliation": ["Colombia"]
      }
    }
  ]
}'
```

---

## Request Field Reference

### Top-Level Fields

| Field | Description | Required |
|---|---|---|
| `tag` | A description or string associated with the whole request. All tags are returned in the response. | Yes |
| `caller_id` | Optional hostname info associated with the request for troubleshooting. | No |
| `query_type` | Must be the name of one of your account's existing query types. Default is `enigma_data`. | Yes |
| `configuration_overrides` | Override default configuration settings for this request. | No |
| `searches` | Array of search objects. See Search Fields below. | Yes |

### Search Fields

Each item in the `searches` array contains:

| Field | Description | Required |
|---|---|---|
| `type` | Search type: `ENTITY`, `TEXT`, `LLM_ENTITY`, or `LLM_TEXT` | Yes |
| `tag` | A string to associate with this specific search | No |
| `entity_description` | For type `ENTITY` or `LLM_ENTITY`: attributes of the entity being searched. See Entity Description Fields. | Yes (for ENTITY/LLM_ENTITY) |
| `text` | For type `TEXT` or `LLM_TEXT`: the text string to search. | Yes (for TEXT/LLM_TEXT) |

### Search Types

**Standard Screening**

| Type | Description |
|---|---|
| `ENTITY` | Screen structured entity attributes (person or organization) against sanctions lists using weighted attribute matching. Scores are calculated based on configurable weights for each attribute (name, DOB, address, country, etc.). Best for screening customers, counterparties, and organizations with known structured data. |
| `TEXT` | Screen unstructured text against sanctions lists using text matching algorithms. Identifies potential matches within free-form text such as transaction messages, payment references, or document content. Returns matches with span information indicating where in the text the match was found. |

**LLM-Enhanced Screening**

| Type | Description |
|---|---|
| `LLM_ENTITY` | Screen structured entity attributes enhanced with AI-powered live web search. An LLM agent gathers additional context from public web sources to provide richer screening results. Useful when you want to supplement sanctions list matching with current web intelligence about the entity. |
| `LLM_TEXT` | Screen unstructured text enhanced with AI-powered live web search. The LLM agent analyzes the text and performs real-time web searches to identify potential risks and gather additional context not available in static sanctions lists. |

The `LLM_ENTITY` and `LLM_TEXT` types combine traditional sanctions list screening with real-time web intelligence, enabling more comprehensive due diligence by surfacing publicly available information that may not yet appear on official watchlists.

### Entity Description Fields

| Field | Description |
|---|---|
| `person_name` | Full name of the individual |
| `org_name` | Organization name |
| `dob` | Date of birth in `yyyymmdd` format |
| `address` | Street address, city, state/province, postal code |
| `country_of_affiliation` | Country affiliation information |

---

## Response Field Reference

### Top-Level Response Fields

| Field | Description |
|---|---|
| `alert` | Whether at least one hit scored >= alert_threshold |
| `caller_id` | The caller_id from the request, if provided |
| `configuration_used` | The full configuration object used for screening |
| `query_type` | The query_type specified in the request |
| `request_id` | UUID created at request time |
| `request_timestamp` | ISO timestamp of the request |
| `search_results` | Array of results corresponding to each search |

### Search Results Fields

| Field | Description |
|---|---|
| `hits` | Array of hits found for this search |
| `search_index` | Index of the corresponding search |
| `tag` | The tag from the search, if provided |
| `type` | `ENTITY`, `TEXT`, `LLM_ENTITY`, or `LLM_TEXT` |
| `alert` | Whether any hit in this search scored >= alert_threshold |

### Entity Hit Fields

| Field | Description |
|---|---|
| `attributes` | Hit info broken down by attribute, with value and score |
| `score` | Overall hit score (weighted average of attribute scores) |
| `alert` | Whether this hit's score >= alert_threshold |
| `entity` | Entity ID and lookup URL for the matched entity |

### Text Hit Fields

| Field | Description |
|---|---|
| `entity_attribute` | Info about what matched — entity_id, attribute info, etc. |
| `score` | The hit's score |
| `alert` | Whether this hit's score >= alert_threshold |
| `span` | Word-based start/stop indices of the matched fragment |

---

## Attribute Types

### Person Search

- **Person Name**: full name (title, first, middle, surname, suffix)
- **DOB**: date of birth in `yyyymmdd` format
- **Address**: street address, city, state/province, postal code
- **Country of Affiliation**: matches against citizenship, nationality, place of birth

### Organization Search

- **Organization Name**: full name of the organization
- **Address**: street address, city, state/province, postal code
- **Country of Affiliation**: matches against country of domicile

---

## Entity Lookup

Retrieve detailed information about a specific sanctioned entity by its ID.

```bash
curl --location --request POST \
  'https://api.enigma.com/evaluation/sanctions/entity/<provider>/<collection>/<record_id>/<format>' \
  --header 'x-api-key: <YOUR API KEY>'

# Example: Get structured data for OFAC SDN entity 43085
curl --location --request POST \
  'https://api.enigma.com/evaluation/sanctions/entity/ofac/sdn/43085/structured' \
  --header 'x-api-key: <YOUR API KEY>'
```

| Parameter | Description | Required |
|---|---|---|
| `provider` | The data provider (e.g., `ofac`) | Yes |
| `collection` | The list collection (e.g., `sdn`, `non_sdn`) | Yes |
| `record_id` | The entity record ID | Yes |
| `format` | Response format: `raw`, `display`, `structured`, or `attributes` | Yes |

Returns the full entity profile including names, aliases, date of birth, nationality, addresses, identification documents, program designations, and source list information.

The entity ID components can be found in the `entity` field of ENTITY-type hits in your screening results (e.g., `ofac/sdn/43085`).