# Resources - Pricing & Credit Use

> Source: https://documentation.enigma.com/resources/credit-utilization

> **Note:** Attribute pricing tiers are subject to change. Refer to the [attribute tier](https://www.enigma.com/pricing) page or run Enigma's GraphQL introspection to get the latest attribute tier assignments.

With Enigma, you only pay for the data you use with credits. Credits are deducted from the billing account linked to your API key. The number of credits depends on the type of attributes you request and the data returned in the response. If the requested data is not returned, no credits are used. Requesting the same data multiple times will incur credits each time.

---

## What is an Attribute?

An **attribute** is a data field on an entity (i.e., `Brand`, `Operating Location`, `Person`). For example, the `name` of a `Brand` is an attribute. For a full list of attributes, see the [Attribute Reference](/reference/attributes/).

## How Credit Utilization is Calculated

Credits are calculated based on the **type of attribute** returned and its [pricing tier](https://www.enigma.com/pricing) that attribute belongs to.

If you request **multiple attributes for the same entity in a single query**, you are charged **once per entity**, at the tier of the **most expensive attribute** included in the response.

---

## Lookup Attribute Tiers via API

The pricing tier for each attribute is available through Enigma's GraphQL API by issuing an extended schema introspection query:

**Extended Schema Introspection Example Request:**

```graphql
query GetSchemaExtended {
  _schemaExtended {
    types {
      name
      pricingTier
      fields {
        name
        pricingTier
      }
    }
  }
}
```

### Pricing Tier Summary by Type

Based on the introspection response, here is a summary of entity types and their pricing tiers:

#### Free Tier

| Type | Key Fields |
|---|---|
| `LegalEntityName` | name, legalEntityType, legalEntityId |
| `LegalEntityType` | type, legalEntityType, legalEntityId |

#### Core Tier

| Type | Key Fields |
|---|---|
| `Address` | streetAddress1, streetAddress2, city, state, zip, fullAddress, latitude, longitude, county, msa, csa, h3Index, rdi |
| `BrandIsMarketable` | isMarketable, brandId |
| `BrandLocationDescription` | locationDescription, brandId |
| `BrandName` | name, brandId |
| `EmailAddress` | emailAddress, emailAddressId |
| `Industry` | industryCode, industryDesc, industryType, industryId |
| `OperatingLocationIsMarketable` | isMarketable, operatingLocationId |
| `OperatingLocationLocationType` | locationType, operatingLocationId |
| `OperatingLocationName` | name, operatingLocationId |
| `OperatingLocationOperatingStatus` | operatingStatus, operatingLocationId |
| `Person` | firstName, lastName, fullName, dateOfBirth, personId |
| `PhoneNumber` | phoneNumber, areaCode, exchangeNumber, lineNumber, phoneNumberId |
| `Website` | website, domain, subdomain, topLevelDomain, path, websiteId |
| `WebsiteOnlinePresence` | hasOnlinePayments, hasOnlineSales, websiteId |

#### Plus Tier

| Type | Key Fields |
|---|---|
| `AddressDeliverability` | deliverable, deliveryType, rdi, virtual, addressId |
| `BrandActivity` | activityType, brandId |
| `BrandCardTransaction` | period, periodStartDate, periodEndDate, projectedQuantity, rawQuantity, quantityType, brandId |
| `BrandRevenueQuality` | issueDescription, issueReason, issueSeverity, brandId |
| `OperatingLocationCardTransaction` | period, periodStartDate, periodEndDate, projectedQuantity, rawQuantity, quantityType, operatingLocationId |
| `OperatingLocationRank` | position, cohortSize, period, periodStartDate, periodEndDate, quantityType, operatingLocationId |
| `OperatingLocationRevenueQuality` | issueDescription, issueReason, issueSeverity, operatingLocationId |
| `ReviewSummary` | reviewCount, reviewScoreAvg, firstReviewDate, lastReviewDate, reviewSummaryId |
| `Role` | jobTitle, jobFunction, managementLevel, roleId |
| `TxnMerchant` | name, merchantId, firstTransactionDate, lastTransactionDate, txnMerchantId |
| `WebsiteContent` | websiteAvailability, httpStatusCode, faviconUrl, faviconImage, websiteContentId |

#### Premium Tier

| Type | Key Fields |
|---|---|
| `LegalEntityBankruptcy` | chapterType, filingDate, caseNumber, debtorName, judge, trustee, legalEntityId |
| `OperatingLocationTechnologiesUsed` | technology, category, operatingLocationId |
| `RegisteredEntity` | name, registeredEntityType, formationDate, formationYear, registeredEntityId |
| `Registration` | registeredName, registrationState, jurisdictionType, homeJurisdictionState, fileNumber, issueDate, status, subStatus, statusDetail |
| `Tin` | tin, tinType, validity, tinId |
| `WatchlistEntry` | watchlistName, watchlistEntryId |
| `WebsiteTechnologiesUsed` | technology, category, websiteId |

---

## Examples

### Single Attribute and Single Entity

**Cost: 1 credit.** `names` is a `core` pricing tier attribute. And since `conditions: {limit: 1}` is used, only one entity is returned.

**Request:**

```graphql
query Search {
  search(searchInput: {name: "Enigma", conditions: { limit: 1 } }) {
    __typename
    ... on Brand {
      id
      names {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "search": [
      {
        "__typename": "Brand",
        "id": "d13a9d69-759e-42b5-b1ee-306f458c994c",
        "names": {
          "edges": [
            {
              "node": {
                "name": "ENIGMA"
              }
            }
          ]
        }
      }
    ]
  }
}
```

---

### Single Attribute and Multiple Entities

**Cost: 10 credits.** `names` is a `core` pricing tier attribute. And since `conditions: {limit: 10}` is used, ten entities are returned.

**Request:**

```graphql
query Search {
  search(searchInput: {name: "Enigma", conditions: { limit: 10 } }) {
    __typename
    ... on Brand {
      id
      names {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
```

**Response (truncated):**

```json
{
  "data": {
    "search": [
      {
        "__typename": "Brand",
        "id": "d13a9d69-759e-42b5-b1ee-306f458c994c",
        "names": { "edges": [{ "node": { "name": "ENIGMA" } }] }
      },
      {
        "__typename": "Brand",
        "id": "54ab701f-ff59-4e43-88ec-23b426ae5678",
        "names": { "edges": [{ "node": { "name": "ENIGMA" } }] }
      },
      {
        "__typename": "Brand",
        "id": "459aaa39-c5d9-4fdb-965a-365071db544e",
        "names": { "edges": [{ "node": { "name": "ENIGMA" } }, { "node": { "name": "ENIGMA SALON & SPA" } }] }
      }
    ]
  }
}
```

*(10 brands total returned, each costing 1 credit)*

---

### Multiple Attributes, Single Entity, and Single Pricing Tier

**Cost: 1 credit.** Both `names` and `isMarketables` are `core` pricing tier attributes. And since `conditions: {limit: 1}` is used, only one entity is returned.

**Request:**

```graphql
query Search {
  search(searchInput: {name: "Enigma", conditions: { limit: 1 } }) {
    __typename
    ... on Brand {
      id
      names {
        edges {
          node {
            name
          }
        }
      }
      isMarketables {
        edges {
          node {
            isMarketable
          }
        }
      }
    }
  }
}
```

**Response:**

```json
{
  "data": {
    "search": [
      {
        "__typename": "Brand",
        "id": "d13a9d69-759e-42b5-b1ee-306f458c994c",
        "names": {
          "edges": [{ "node": { "name": "ENIGMA" } }]
        },
        "isMarketables": {
          "edges": [{ "node": { "isMarketable": "true" } }]
        }
      }
    ]
  }
}
```

---

### Multiple Attributes, Single Entity, and Multiple Pricing Tiers

**Cost: 6 credits.** `txnMerchants` is a `plus` attribute which is higher than `names`'s `core`. And since `conditions: {limit: 2}` is used, two entities are returned, each costing 3 credits each (3 × 2 = 6).

**Request:**

```graphql
query Search {
  search(searchInput: {name: "ENIGMA", conditions: { limit: 2 } }) {
    __typename
    ... on Brand {
      id
      names {
        edges {
          node {
            name
          }
        }
      }
      txnMerchants(first: 10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
```

**Response (truncated):**

```json
{
  "data": {
    "search": [
      {
        "__typename": "Brand",
        "id": "d13a9d69-759e-42b5-b1ee-306f458c994c",
        "names": { "edges": [{ "node": { "name": "ENIGMA" } }] },
        "txnMerchants": {
          "edges": [
            { "node": { "name": "ENIGMA BAR AND LO" } },
            { "node": { "name": "GREG S ENIGMA" } },
            { "node": { "name": "ENIGMA BAR AND LOUNGE" } }
          ]
        }
      },
      {
        "__typename": "Brand",
        "id": "54ab701f-ff59-4e43-88ec-23b426ae5678",
        "names": { "edges": [{ "node": { "name": "ENIGMA" } }] },
        "txnMerchants": {
          "edges": [
            { "node": { "name": "ENIGMA S" } },
            { "node": { "name": "NIGMA" } },
            { "node": { "name": "ENIGMA" } }
          ]
        }
      }
    ]
  }
}
```

---

### Nested Entities

**Cost: 51 credits.**

- The response contains `Brand.names`, which is a `core` pricing tier attribute → **1 credit**
- The response contains `OperatingLocations.names` and `OperatingLocations.cardTransactions`. Since `OperatingLocations.cardTransactions` is a `premium` attribute, each OperatingLocation costs 5 credits. With 10 OperatingLocations (5 × 10) → **50 credits**
- **Total: 1 + 50 = 51 credits**

**Request:**

```graphql
query Search {
  search(searchInput: {name: "home depot", conditions: { limit: 1 } }) {
    __typename
    ... on Brand {
      id
      names {
        edges {
          node {
            name
          }
        }
      }
      operatingLocations(first: 10) {
        __typename
        edges {
          node {
            names {
              edges {
                node {
                  name
                }
              }
            }
            cardTransactions(first: 10000) {
              edges {
                node {
                  period
                  projectedQuantity
                  periodEndDate
                }
              }
            }
          }
        }
      }
    }
  }
}
```

**Response (truncated):**

```json
{
  "data": {
    "search": [
      {
        "__typename": "Brand",
        "id": "a42c7301-b00c-4468-91d1-4a8b76ada533",
        "names": {
          "edges": [
            { "node": { "name": "PRO DESK" } },
            { "node": { "name": "HOME DEPOT PRO DESK" } },
            { "node": { "name": "HOME SERVICES" } }
          ]
        },
        "operatingLocations": {
          "__typename": "BrandOperatingLocationConnection",
          "edges": [
            {
              "node": {
                "names": {
                  "edges": [
                    { "node": { "name": "HOME SERVICES" } },
                    { "node": { "name": "PRO DESK" } }
                  ]
                },
                "cardTransactions": {
                  "edges": [
                    { "node": { "period": "12m", "projectedQuantity": 1, "periodEndDate": "2021-02-28" } },
                    { "node": { "period": "12m", "projectedQuantity": 0, "periodEndDate": "2025-06-30" } },
                    { "node": { "period": "12m", "projectedQuantity": 2328, "periodEndDate": "2021-02-28" } }
                  ]
                }
              }
            }
          ]
        }
      }
    ]
  }
}
```

*(10 operating locations returned in full response, each with card transaction data)*