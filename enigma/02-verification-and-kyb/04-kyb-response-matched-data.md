# Verification & KYB - KYB Tasks & Matched Data - KYB Response Matched Data

> Source: https://documentation.enigma.com/kyb/response/data

The `data` object returned in the KYB API response is a structured compilation of attributes describing entities in [Enigma's data model](/getting_started/data_model) that best match the information provided in [the request](/kyb/verify-identity). The response is structured as arrays of:

- `registered_entities`
  - which can have many `registrations`
    - which can have many `persons`
    - which can have many `addresses`
- `brands`
  - which can operate in many `industries`
  - which can operate at many `operating locations`
    - each of which is located at an `address`

Together, these attributes offer a holistic perspective of a business and its relationship to people and places. They are the basis on which [tasks](/kyb/response/tasks) verify the information you provide about a business.

---

## `registered_entities` attributes

These attributes are included for each registered entity, also known as a legal entity, returned in the response. By default, up to one registered entity is returned, but more can be returned by specifying a greater number via the `top_n` parameter. See [Advanced Query Parameters](/kyb/verify-identity#advanced-query-parameters) for more information.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `id` | Enigma's unique ID for the registered entity. | `350806dc-5617-7c57-0000-10c000000000` |
| `formation_date` | The earliest non-null issue_date from the entity's registrations, formatted YYYY-MM-DD. | `2011-04-26` |
| `registered_entity_type` | The standardized legal form of the entity. Possible values include `Non-profit Co-operative`, `Non-stock Co-operative`, `Co-operative`, `Unknown`, `Non-profit Limited Partnership`, `Professional Limited Liability Company`, `Unincorporated Non-profit Association`, `Limited Cooperative Association`, `Limited Liability Company`, `Non-stock Corporation`, `Non-profit Limited Liability Company`, `Professional Limited Partnership`, `Non-profit Corporation`, `Limited Partnership`, `General Partnership`, `Sole Proprietorship`, `Corporation`, and `Professional Corporation`. | `Corporation` |
| `names` | Array of up to ten standardized names of the entity, derived from the name as listed on the entity's registration. | `ENIGMA TECHNOLOGIES, INC.` |
| `brand_ids` | Array of Brand IDs associated with the registered entity. | `5f53e079-c66a-487e-8a9d-08efc39652ee` |
| `registrations` | Array of all registrations associated with the registered entity. See `registrations` attributes for more information. | See `registrations` attributes. |

---

## `registrations` attributes

Legal entities must file a registration with the Secretary of State (SoS) of each U.S. state that they operate in. Enigma sources and standardizes legal entity registrations from all applicable U.S. jurisdictions, including all 50 states, as well as Washington DC and Puerto Rico. These attributes are included for each registration returned in the `registrations` array.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `registration_state` | The US state where the registration was filed. | `DE` |
| `jurisdiction_type` | **`foreign`** if the registration is for any state other than the business's home state; otherwise, **`domestic`**. Only included in the [verify package](/kyb/kyb-packages). | `domestic` |
| `home_jurisdiction_state` | Two-letter abbreviation for the state jurisdiction of the business. Only included in the [verify package](/kyb/kyb-packages). | `NY` |
| `registered_name` | Business name as on the registration filing. | `ENIGMA TECHNOLOGIES, INC.` |
| `file_number` | File number of the registration filing. | `4973743` |
| `issue_date` | Issue date of the registration filing, formatted YYYY-MM-DD. | `2011-04-26` |
| `status` | Standardized status of the standing of the registration. Possible values include `active`, `inactive`, or `unknown`. Only included in the [verify package](/kyb/kyb-packages). | `active` |
| `sub_status` | If available from the state, a normalized sub-status for the business. Possible values include `good_standing`, `not_good_standing`, `pending_active`, `pending_inactive`, `unknown`, and `null`. Only included in the [verify package](/kyb/kyb-packages). | `good_standing` |
| `status_detail` | If available, the official filing status message provided by the state. Only included in the [verify package](/kyb/kyb-packages). | `Permanently Revoked` |
| `persons` | Array of up to ten persons named on the registration filing. See `persons` attributes for more information. | See `persons` attributes. |
| `addresses` | Array of up to ten addresses listed on the registration filing. See `addresses` attributes for more information. | See `addresses` attributes. |

---

## `persons` attributes

These attributes are included for each person returned in the `persons` array.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `name` | The name of the person named on the registration filing. | `HICHAM OUDGHIRI` |
| `titles` | The title of the person named on the registration filing. | `chief executive officer` |

---

## `addresses` attributes

These attributes are included for each address, of which there can be up to ten per `registration` or `operating_location`.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `street_address1` | The main street address with number, name, and directionals using USPS standards. | `245 5TH AVE` |
| `street_address2` | Additional address information like unit, suite or floor number using USPS abbreviations. | `FL 17` |
| `city` | The city where this address is located. | `NEW YORK` |
| `state` | The two-letter abbreviation of the U.S. state or territory. | `NY` |
| `postal_code` | The current five-digit U.S. postal code of the address. | `10016` |
| `type` | The standardized address type as it appears on the registration with the relevant Secretary of State. Possible values include `headquarters`, `site`, `registered_agent`, `registered`, `officer`, and `mailing`. | `registered` |
| `deliverable` | Indicates whether the address is deliverable based on USPS delivery point validation data. | `vacant` |
| `virtual` | Indicates whether the address is virtual based on whether it is associated with a Commercial Mail Receiving Agency (CMRA). | `not_virtual` |
| `delivery_type` | The type of mail delivery for this address. Possible values include `rural route or highway contract route`, `general delivery`, `street`, `post office box`, `multi-tenant building`, `firm`, and `null`. | `multi-tenant building` |
| `rdi` | Indicator showing if USPS identifies the address as Residential or Commercial. | `commercial` |

---

## `brands` attributes

These attributes are included for each brand returned in the brands array. By default, one brand is returned, but you can retrieve more by specifying a greater number via the `top_n` parameter. See [Advanced Query Parameters](/kyb/verify-identity#advanced-query-parameters) for more information.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `id` | Enigma's unique ID for the brand. | `5f53e079-c66a-487e-8a9d-08efc39652ee` |
| `registered_entity_ids` | Array of registered entity IDs associated with the brand. | `350806dc-5617-7c57-0000-10c000000000` |
| `activities` | Array of notable activities that the brand is engaged in. See [Brand Activity](/reference/attributes/brand-activity) for more information. | `Cannabis` |
| `names` | The customer-facing version of the names that represent the business. See [Brand Name](/reference/attributes/brand-name) for more information. | `ENIGMA TECHNOLOGIES` |
| `industries` | Array of industries that the brand does business in. See `industries` attributes for more information. | See `industries` attributes. |
| `websites` | Array of websites associated with the brand. | `https://enigma.com` |
| `operating_locations` | Array of operating locations that the brand operates. See `operating_locations` attributes for more information. | See `operating_locations` attributes. |

---

## `industries` attributes

These attributes are included for each industry returned in the `industries` array.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `classification_description` | Human-readable description of the industry. For industries with an industry_type that is an industry classification system, this will be the description corresponding to industry_code, provided by the developer of the industry classification system. | `Software Publishers` |
| `classification_type` | The classification system used. Possible values are `naics_2017_code`, `naics_2022_code`, `sic_code`, `mcc_code`, and `enigma_industry_description`. The *enigma_industry_description* is a non-hierarchical, colloquial classification that often expresses dimensions of a business that are unavailable in standard industry classification systems (e.g. the style of food offered by a restaurant). | `naics_2022_code` |
| `classification_code` | The numeric value of the industry code. This field only contains a value for certain industry classification systems (The industry_type indicates the industry classification system). For all other classification systems, this field is null. | `513210` |

---

## `operating_locations` attributes

These attributes are included for each operating location returned in the `operating_locations` array.

| **Attribute** | **Description** | **Example** |
|---|---|---|
| `id` | Enigma's unique ID for the operating location. | `20e8d448-f6c7-4854-9855-f8367b97b097` |
| `addresses` | Array of up to ten addresses associated with this operating location. See `addresses` attributes for more information. | See `addresses` attributes. |
| `names` | Array of up to ten names associated with this operating location. | `ENIGMA TECHNOLOGIES` |

---

## Available Add-On Attributes

Optionally, additional attributes can be requested via the `attrs` parameter. See [advanced query parameters](/kyb/verify-identity#advanced-query-parameters) for more information on how to request add-on attributes.

| **Attribute** | **Included in** | **Description** | **Example** |
|---|---|---|---|
| `bankruptcies` | `registered_entities` | The details of bankruptcy filings (chapter_type, filing date and case number etc.) associated with this legal entity. All bankruptcy cases are handled in federal courts under rules outlined in the U.S. Bankruptcy Code. | See [bankruptcy](/reference/attributes/legal-entity-bankruptcy) for more information. |
| `avg_transaction_size` | `brands.card_transactions` | The record is the average transaction size in dollars for the location for that time period. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `card_transactions_count` | `brands.card_transactions` | The record is the total number of card transactions for the location for that time period. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `card_revenue_amount` | `brands.card_transactions` | The record is the sum of all transaction amounts in dollars for the location for that time period. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `card_revenue_yoy_growth` | `brands.card_transactions` | The record is the ratio of the location's current period's revenue to the period one year prior's revenue. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `card_revenue_prior_period_growth` | `brands.card_transactions` | The record is the ratio of the location's current period's revenue to the previous period's revenue. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `card_customers_average_daily_count` | `brands.card_transactions` | The record is the average number of unique daily customers for the location for that time period. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `has_transactions` | `brands.card_transactions` | The record is a 1 if the location had any transactions in the time period, and 0 otherwise. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `refunds_amount` | `brands.card_transactions` | The record is the total amount of refunds in dollars for the location for that time period. | See [card transactions](/reference/attributes/brand-card-transaction) for more information. |
| `revenue_quality` | `brands.card_transactions` | Warnings and issues related to the revenue of this brand. | See [revenue quality](/reference/attributes/brand-revenue-quality) for more information. |
| `operating_status` | `operating_locations` | This field reflects the operational state of the brand at this address during the time period shown. Possible values include `Open`, `Closed`, `Temporarily Closed`, and `Unknown`. | `Open` |
| `phone_numbers` | `operating_locations` | Twelve-digit string representation of the complete phone number. | `+12544454098` |