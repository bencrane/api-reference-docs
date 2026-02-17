# RESOURCES - Upgrade from KYB v1 to v2

URL: https://documentation.enigma.com/resources/kyb-upgrade

Enigma's v2 KYB API is a familiar interface to the v1 KYB API user, supercharged with more accurate data and new verification capabilities, including:

- A new **Social Security Number (SSN) verification task**, which verifies that an input SSN and `person` last name combination matches IRS records.
- A new **person verification task**, which verifies that an input `person` name matches an officer name on a matching Secretary of State (SoS) registration.
- Additional **address deliverability attributes**, such as whether an address is associated with a Commercial Mail Receiving Agency (CMRA), which you can use to determine whether it satisfies your compliance requirements.

The v2 KYB API returns information from Enigma's enhanced v2 data model. The enhanced v2 data model and resolution platform enable increased name verification rates, industry classification fill rates, website fill rates, and more.

Upgrading to the v2 KYB API is simple. Most users can implement, test, and deploy the necessary changes in just a few hours.

---

## Make a v2 Request

The v2 request body is backwards compatible with the v1 request body for most purposes. All add-on tasks and the most commonly used add-on attributes are supported in v2.

Try it by sending a request that you have successfully submitted to v1, by updating the version to `v2` in the endpoint URL:

```bash
curl --request POST 'https://api.enigma.com/v2/kyb/?package=verify&attrs=tin_verification,watchlist' \
--header 'Content-Type: application/json' \
--header 'x-api-key: YOUR-API-KEY' \
--data-raw '{
    "data": {
        "names": [
            "Enigma Technologies",
            "Enigma"
        ],
        "addresses": [
            {
                "street_address1": "245 5th Ave",
                "city": "New York",
                "state": "NY",
                "postal_code": "10016"
            }
        ],
        "persons": [
            {
                "first_name": "Hicham",
                "last_name": "Oudghiri",
                "ssn": "111111111"
            }
        ],
        "tins": [
            "000000000"
        ]
    }
}'
```

That's it! You'll receive a response very similar to what you received from `v1/kyb`.

The default package for v2 is `verify`, not `identify` as it is in v1. To ensure consistent behavior, specify your package via the `package` parameter when making your request.

While the backwards-compatible v2 API supports a configurable `match_threshold` with the same range of values as v1, the same value may produce different behavior between v1 and v2. If you set a custom `match_threshold`, we recommend re-evaluating it by testing with a sample of representative requests before upgrading.

> **Requesting Watchlist Screening:** In v2, the watchlist task does not require the `persons_to_screen` object in the request body, as v1 did. Instead, the values in the `name`, `person` and `address` fields are used for watchlist screening. For more information, see the watchlist task page.

---

## Compare the v1 and v2 Response

The v2 KYB API response is largely consistent with the v1 KYB API response, but there are some differences that may require changes in your integration. Below is a comparison of the v1 and v2 responses. Note that your response may vary depending on the package, add-on tasks, and add-on attributes that you request.

### v1 Response

```json
{
  "response_id": "9a7811e2447041508e17d8c1af811b1b",
  "risk_summary": {
    "legal_existence_risk_rating": "low",
    "activity_risk_rating": "low",
    "watchlist_risk_rating": "low",
    "overall_risk_rating": "low",
    "tasks": [
      {
        "task_name": "address_verification",
        "status": "success",
        "result": "address_approximate_match",
        "reason": "An input address and an address we identified match approximately"
      },
      {
        "task_name": "sos_address_verification",
        "status": "success",
        "result": "address_approximate_match",
        "reason": "An input address and an address on an SoS record match approximately"
      },
      {
        "task_name": "name_verification",
        "status": "success",
        "result": "name_exact_match",
        "reason": "An input name and a name we identified match exactly"
      },
      {
        "task_name": "sos_name_verification",
        "status": "success",
        "result": "name_approximate_match",
        "reason": "An input name and a name on an SoS record match approximately"
      },
      {
        "task_name": "domestic_registration",
        "status": "success",
        "result": "domestic_unknown",
        "reason": "Domestic filing found but no status provided by state"
      },
      {
        "task_name": "tin_verification",
        "status": "failure",
        "result": "error",
        "reason": "Invalid TIN"
      },
      {
        "task_name": "watchlist",
        "status": "success",
        "result": "watchlist_no_hits",
        "reason": "No hits identified on the consolidated sanctions list (including OFAC)"
      }
    ]
  },
  "data": {
    "best_match": {
      "match_confidence": 1.0,
      "matched_fields": {
        "name": "ENIGMA TECHNOLOGIES, INC.",
        "address": { "state": "NY" },
        "person": "HICHAM OUDGHIRI"
      }
    },
    "legal_entities": [
      {
        "enigma_id": "L000017e91c91",
        "formation_date": "2011-04-26",
        "legal_entity_type": "Corporation",
        "registrations": [
          {
            "registration_state": "DE",
            "jurisdiction_type": "domestic",
            "home_jurisdiction_state": null,
            "registered_name": "ENIGMA TECHNOLOGIES, INC.",
            "file_number": "4973743",
            "issue_date": "2011-04-26",
            "standardized_status": "unknown",
            "registration_status": null,
            "status": {
              "status": "unknown",
              "sub_status": null,
              "status_detail": null
            },
            "persons": [
              {
                "name": "CORPORATION SERVICE COMPANY",
                "titles": ["registered agent"]
              }
            ],
            "addresses": [
              {
                "street_address1": "251 LITTLE FALLS DR",
                "street_address2": null,
                "city": "WILMINGTON",
                "state": "DE",
                "postal_code": "19808",
                "type": "registered_agent"
              }
            ]
          }
        ]
      }
    ],
    "brands": [
      {
        "enigma_id": "B00021aac539f",
        "data_sources": [
          "Card Transactions",
          "Third-Party Active Business",
          "Public Web Directories",
          "H1B Visa Applications",
          "Corporate Registrations"
        ],
        "match_confidence": 1.0,
        "matched_fields": {
          "name": "ENIGMA TECHNOLOGIES",
          "person": "HICHAM OUDGHIRI",
          "address": {
            "street_address1": "245 5TH AVE",
            "street_address2": "FL 17",
            "city": "NEW YORK",
            "state": "NY",
            "postal_code": "10016"
          }
        },
        "activities": {
          "compliance_risk_level": null,
          "activity_types": []
        },
        "names": [{ "name": "ENIGMA TECHNOLOGIES" }],
        "industries": [
          {
            "classification_description": "software company",
            "classification_type": "enigma_description"
          },
          {
            "classification_description": "Software Publishers",
            "classification_type": "NAICS_2017",
            "classification_code": "511210"
          }
        ],
        "websites": ["enigma.com"],
        "addresses": [
          {
            "street_address1": "32 MERCER ST",
            "street_address2": "FL 8",
            "city": "NEW YORK",
            "state": "NY",
            "postal_code": "10013",
            "country": "US",
            "type": null
          }
        ]
      }
    ]
  }
}
```

### v2 Response

```json
{
  "response_id": "67386152-0985-45b2-8e52-02db45a321d1",
  "risk_summary": {
    "tasks": [
      {
        "task_name": "address_verification",
        "status": "success",
        "result": "address_match",
        "reason": "An input address matches an address in any of Enigma's records",
        "sources": [
          {
            "address": {
              "address_line_1": "245 5TH AVE",
              "city": "NEW YORK",
              "state": "NY",
              "postal_code": "10016"
            },
            "match_entity_type": "registered_entity"
          },
          {
            "address": {
              "address_line_1": "245 5TH AVE",
              "city": "NEW YORK",
              "state": "NY",
              "postal_code": "10016"
            },
            "match_entity_type": "registered_entity"
          },
          {
            "address": {
              "address_line_1": "245 5TH AVE",
              "city": "NEW YORK",
              "state": "NY",
              "postal_code": "10016"
            },
            "match_entity_type": "brand"
          }
        ]
      },
      {
        "task_name": "sos_address_verification",
        "status": "success",
        "result": "address_match",
        "reason": "An input address matches an address on a matching SoS registration",
        "sources": [
          {
            "address": {
              "address_line_1": "245 5TH AVE",
              "city": "NEW YORK",
              "state": "NY",
              "postal_code": "10016"
            },
            "match_entity_type": "registered_entity"
          },
          {
            "address": {
              "address_line_1": "245 5TH AVE",
              "city": "NEW YORK",
              "state": "NY",
              "postal_code": "10016"
            },
            "match_entity_type": "registered_entity"
          }
        ]
      },
      {
        "task_name": "name_verification",
        "status": "success",
        "result": "name_exact_match",
        "reason": "An input business name exactly matches a business name on a matching SoS registration",
        "sources": [
          {
            "name": "ENIGMA TECHNOLOGIES",
            "match_entity_type": "brand"
          }
        ]
      },
      {
        "task_name": "sos_name_verification",
        "status": "success",
        "result": "name_match",
        "reason": "An input business name matches a business name on a matching SoS registration",
        "sources": [
          { "name": "Enigma Technologies, Inc.", "match_entity_type": "registered_entity" },
          { "name": "ENIGMA TECHNOLOGIES, INC.", "match_entity_type": "registered_entity" },
          { "name": "ENIGMA TECHNOLOGIES, INC", "match_entity_type": "registered_entity" },
          { "name": "Enigma Technologies, Inc.", "match_entity_type": "registered_entity" },
          { "name": "ENIGMA TECHNOLOGIES, INC.", "match_entity_type": "registered_entity" },
          { "name": "ENIGMA TECHNOLOGIES, INC", "match_entity_type": "registered_entity" }
        ]
      },
      {
        "task_name": "domestic_registration",
        "status": "success",
        "result": "domestic_unknown",
        "reason": "A domestic registration was found but no status was provided by the SoS",
        "sources": []
      },
      {
        "task_name": "person_verification",
        "status": "success",
        "result": "person_match",
        "reason": "The person name matches a person name on a matching SoS registration",
        "sources": [
          {
            "name": "HICHAM OUDGHIRI",
            "match_entity_type": "registered_entity"
          }
        ]
      },
      {
        "task_name": "tin_verification",
        "status": "failure",
        "result": "tin_invalid",
        "reason": "The TIN is invalid",
        "sources": [
          {
            "tin": "000000000",
            "name": "ENIGMA TECHNOLOGIES, INC."
          }
        ]
      },
      {
        "task_name": "watchlist",
        "status": "success",
        "result": "watchlist_no_hits",
        "reason": "No hits were identified on the consolidated sanctions list (including OFAC)"
      }
    ]
  },
  "data": {
    "registered_entities": [
      {
        "id": "350806dc-5617-7c57-0000-10c000000000",
        "formation_date": "2011-04-26",
        "registered_entity_type": "Corporation",
        "names": [
          { "name": "ENIGMA TECHNOLOGIES, INC." },
          { "name": "ENIGMA TECHNOLOGIES, INC" }
        ],
        "brand_ids": ["5f53e079-c66a-487e-8a9d-08efc39652ee"],
        "registrations": [
          {
            "registration_state": "DE",
            "jurisdiction_type": "domestic",
            "home_jurisdiction_state": null,
            "registered_name": "ENIGMA TECHNOLOGIES, INC.",
            "file_number": "4973743",
            "issue_date": "2011-04-26",
            "status": "unknown",
            "sub_status": null,
            "status_detail": null,
            "persons": [
              {
                "name": "CORPORATION SERVICE COMPANY",
                "titles": ["registered agent"]
              }
            ],
            "addresses": [
              {
                "street_address1": "251 LITTLE FALLS DR",
                "street_address2": null,
                "city": "WILMINGTON",
                "state": "DE",
                "postal_code": "19808",
                "type": "registered_agent",
                "deliverable": "deliverable",
                "virtual": "not_virtual",
                "delivery_type": "street",
                "rdi": "commercial"
              }
            ]
          }
        ]
      }
    ],
    "brands": [
      {
        "id": "5f53e079-c66a-487e-8a9d-08efc39652ee",
        "registered_entity_ids": [
          "350806dc-5617-7c57-0000-10c000000000",
          "4089bd01-fca9-8bb7-0000-108000000000"
        ],
        "activities": {
          "activities": []
        },
        "names": [
          { "name": "ENIGMA TECHNOLOGIES" },
          { "name": "ENIGMA TECHNOLOGIES, INC." },
          { "name": "ENIGMA COMPUTER SOLUTION" }
        ],
        "industries": [
          {
            "classification_description": "software company",
            "classification_type": "enigma_industry_description",
            "classification_code": null
          },
          {
            "classification_description": "Software Publishers",
            "classification_type": "naics_2022_code",
            "classification_code": "513210"
          }
        ],
        "websites": ["https://enigma.com"],
        "operating_locations": [
          {
            "id": "17d0604e-4efa-45fa-9c4f-ab7ac8e22b49",
            "addresses": [
              {
                "street_address1": "25 BROADWAY",
                "street_address2": null,
                "city": "NEW YORK",
                "state": "NY",
                "postal_code": "10004",
                "deliverable": "not_deliverable",
                "virtual": "not_virtual",
                "delivery_type": "multi-tenant building",
                "rdi": "commercial"
              }
            ],
            "names": [{ "name": "ENIGMA TECHNOLOGIES" }]
          },
          {
            "id": "399731b7-ee0d-4fd9-8079-8c3e8936ef57",
            "addresses": [
              {
                "street_address1": "245 5TH AVE",
                "street_address2": "FL 17",
                "city": "NEW YORK",
                "state": "NY",
                "postal_code": "10016",
                "deliverable": "vacant",
                "virtual": "not_virtual",
                "delivery_type": "multi-tenant building",
                "rdi": "commercial"
              }
            ],
            "names": [
              { "name": "ENIGMA TECHNOLOGIES" },
              { "name": "ENIGMA COMPUTER SOLUTION" }
            ]
          },
          {
            "id": "20e8d448-f6c7-4854-9855-f8367b97b097",
            "addresses": [
              {
                "street_address1": "32 MERCER ST",
                "street_address2": "# 8",
                "city": "NEW YORK",
                "state": "NY",
                "postal_code": "10013",
                "deliverable": "deliverable",
                "virtual": "not_virtual",
                "delivery_type": "street",
                "rdi": "commercial"
              }
            ],
            "names": [
              { "name": "ENIGMA TECHNOLOGIES" },
              { "name": "ENIGMA TECHNOLOGIES, INC." }
            ]
          }
        ]
      }
    ]
  }
}
```

---

## Response Changes

The overall structure of the v2 response is similar to v1, with some notable differences:

### Removed or Renamed Fields

- Removed `legal_existence_risk_rating`, `activity_risk_rating`, `watchlist_risk_rating`, and `overall_risk_rating` from the `risk_summary` object
- Removed the `best_match` object from the `data` object. Instead, the first object in the `registered_entities` array is the best match for the request. If no registered entities are returned, the first object (if any) in the `brands` array is the best match.
- Removed `data_sources`, `match_confidence`, and `matched_fields` from the `legal_entity` and `brand` objects
- Un-nested `status` object on registrations to three fields: `status`, `sub_status`, and `status_detail`
- Removed deprecated fields from the `registration` object:
  - Removed `standardized_status`, which returns the same value as `status`
  - Removed `registration_status`, which returns the same value as `status_detail`
- Removed `compliance_risk_level` from the `activities` object
- Renamed `legal_entities` to `registered_entities`
- Renamed `legal_entity_type` to `registered_entity_type`
- Renamed `enigma_id` to `id` throughout the response
- Renamed `enigma_description` to `enigma_industry_description`
- Nested `addresses` under `operating_locations` instead of `brands` directly

### Added Fields

- Added `sources` to task objects to indicate the data sources that were used to verify the task result
- Added `brand_ids` and `registered_entity_ids` to registered entity and brand objects, respectively

### Field Value Changes

- Non-exact task result values no longer include the word "approximate". For example, the `name_verification` task result now returns `name_match` instead of `name_approximate_match`.
- Task `reason` values are different and more descriptive
- All IDs, including `response_id`, `operating_location_id`, `registration_id`, `registered_entity_id`, and `brand_id`, are UUIDs instead of strings
- NAICS codes and descriptions conform to 2022 standards instead of 2017 standards
- Websites are returned as full URLs instead of just the domain

---

## FAQ

### Does my v1 package work with the v2 KYB API?

Both the `identify` and `verify` packages work with the v2 KYB API without any modifications. Each package returns the same information that it did with the v1 KYB API. If you use a different package, contact Enigma to discuss the best upgrade path.

### Does the v2 KYB API still support add-ons?

Yes, the v2 KYB API offers all of the same add-on attributes as the v1 KYB API (and more). See available add-on attributes for more information.

### Have the underlying data sources changed?

Registration data is sourced from each US SoS, just as before, but Enigma has augmented these authoritative sources with additional information. Enigma is constantly expanding and improving on the data sources that power our data asset.