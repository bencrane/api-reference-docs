# GraphQL API Reference

URL: https://documentation.enigma.com/reference/graphql_api/

> **info:** This page has all of the context an LLM needs to construct GraphQL queries for Enigma's API. Try it by [downloading this document](/files/graphql_api.mdx) and providing it to an LLM.

Welcome to the Enigma GraphQL API reference. This API provides access to Enigma's data and services through a flexible GraphQL interface.

This reference is intended for developers who are familiar with GraphQL and provides extensive details on the schema, queries, mutations, and more.

## Getting Started

You can interact with Enigma's GraphQL API through various means. Here, we will walk through a few common ones.

### GraphQL Playground

Head over to the [API Playground](https://console.enigma.com/explore/graphql) in the Enigma Console. Click on the "Execute query" button to run the example query.

### Programmatic Access

#### Authentication

All API requests to the GraphQL API must include an `x-api-key` header with your API key:

```bash
x-api-key: YOUR_API_KEY
```

#### Base URL

The GraphQL API endpoint is:

```text
https://api.enigma.com/graphql
```

#### Making Requests

You can make requests to the GraphQL API using any GraphQL client. Here are examples (replace `YOUR_API_KEY` with your actual API key):

Curl
```bash
curl -i 'https://api.enigma.com/graphql' \
    -H 'content-type: application/json' \
    -H 'x-api-key: YOUR_API_KEY' \
    -d '{"query":"query{search(searchInput:{name:\"Enigma\",entityType:BRAND,address:{state:\"NY\",city:\"New York\"}}){... on Brand{names{edges{node{name}}}operatingLocations{edges{node{addresses(first:1){edges{node{fullAddress}}}}}}}}}"}'
```

Python
```python
import requests

    query = f"""
    query brandSearch($searchInput: SearchInput!) {{
        search(
            searchInput: $searchInput
        ) {{
            ... on Brand {{
                names {{
                    edges {{
                        node {{
                            name
                        }}
                    }}
                }}
                operatingLocations {{
                    edges {{
                        node {{
                            addresses(first: 1) {{
                                edges {{
                                    node {{
                                        fullAddress
                                    }}
                                }}
                            }}
                        }}
                    }}
                }}
            }}
        }}
    }}
    """

    variables =  {
        "searchInput": {
            "name": "Enigma",
            "entityType": "BRAND",
            "address": { "state": "NY", "city": "New York" }
        }
    }

    response=requests.post(
        'https://api.enigma.com/graphql',
        headers={"x-api-key":"YOUR_API_KEY"},
        json={"query": query, "variables": variables}
    )

    print(response.json())
```

Postman Postman provides handy tools for working with GraphQL requests. Refer to [Postman's documentation](https://learning.postman.com/docs/sending-requests/graphql/graphql-http/) on how to set up GraphQL requests on Postman.

### Usage with LLMs

Follow these best practices for using this documentation with an LLM:

- We find that [Claude](https://claude.ai/) most consistently generates correct GraphQL queries using this resource.
- Click [here](/files/graphql_api.mdx) to download this document as a markdown file and provide it to [Claude](https://claude.ai/). When using the Claude app, ensure that Claude can read the content of the whole file dragging and dropping it into context, instead of selecting it through the "Upload a file" button.
- Direct [Claude](https://claude.ai/) to use the document in your prompt, for example: "Using the attached documentation, create a GraphQL query to ..."
[Contact us](https://www.enigma.com/contact-us) if you have any issues with your GraphQL query.

## GraphQL Schema Definition Language (SDL)

Find the GraphQL Schema Definition Language (SDL) below:

schema.graphql
```graphql
"""Exposes a URL that specifies the behavior of this scalar."""
directive @specifiedBy(
  """The URL that specifies the behavior of this scalar."""
  url: String!
) on SCALAR

type Account {
  customerId: ID
  customerEmail: String
  billingAccountId: ID
  pricingPlan: String
  creditsAvailable: Boolean
  autoRenewEnabled: Boolean
  autoRechargeDesiredState: Boolean
  autoRechargeCurrentState: Boolean
  autoRechargeThresholdAmount: Int
  autoRechargeRechargeToAmount: Int
  autoRechargeLimitUsd: Int
  autoRechargeReenableAfterTimestamp: String
}

"""
## Description
The address is a physical street address for the business. We conform to the
standards provided by [USPS Publication
28](https://pe.usps.com/text/pub28/welcome.htm) where possible.

If information is available we indicate the specific street address and unit.
This means that two units in the same building appear as two distinct addresses.
Otherwise, the address may be a postal code or city/state rather than a complete
street address.
"""
type Address implements MathFunctions {
  fullAddress: String
  id: UUID!
  streetAddress1: String
  streetAddress2: String
  city: String
  state: String
  zip: String
  firstObservedDate: String
  lastObservedDate: String
  county: String
  msa: String
  csa: String
  latitude: Float
  longitude: Float
  h3Index: String
  country: String
  internalId: String
  internalAddressId: String
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): AddressOperatingLocationConnection
  registrations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): AddressRegistrationConnection
  deliverabilities(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): AddressDeliverabilityConnection
  watchlistEntries(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): AddressWatchlistEntryConnection
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): AddressLegalEntityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type AddressDeliverability implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  rdi: String
  deliveryType: String
  deliverable: String
  virtual: String
  internalId: String
  internalAddressId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type AddressDeliverabilityConnection {
  pageInfo: PageInfo!
  edges: [AddressDeliverabilityEdge]!
}

type AddressDeliverabilityEdge {
  node: AddressDeliverability
  cursor: String!
}

input AddressInput {
  id: ID
  street1: String
  street2: String
  city: String
  state: String
  postalCode: String
}

type AddressLegalEntityConnection {
  pageInfo: PageInfo!
  edges: [AddressLegalEntityEdge]!
}

type AddressLegalEntityEdge {
  node: LegalEntity
  cursor: String!
  id: ID
  legalEntityReceivesMailAtAddressId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalLegalEntityReceivesMailAtAddressId: String
}

type AddressOperatingLocationConnection {
  pageInfo: PageInfo!
  edges: [AddressOperatingLocationEdge]!
}

type AddressOperatingLocationEdge {
  node: OperatingLocation
  cursor: String!
  id: ID
  operatingLocationOperatesAtAddressId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalOperatingLocationOperatesAtAddressId: String
}

type AddressRegistrationConnection {
  pageInfo: PageInfo!
  edges: [AddressRegistrationEdge]!
}

type AddressRegistrationEdge {
  node: Registration
  cursor: String!
  registrationRecordedAddressId: UUID
  addressType: String
  rank: Int
  id: ID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalRegistrationRecordedAddressId: String
}

type AddressWatchlistEntryConnection {
  pageInfo: PageInfo!
  edges: [AddressWatchlistEntryEdge]!
}

type AddressWatchlistEntryEdge {
  node: WatchlistEntry
  cursor: String!
  id: ID
  addressAppearsOnWatchlistEntryId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalAddressAppearsOnWatchlistEntryId: String
}

type AggregateResult {
  count(field: String!, conditions: Conditions): Int
}

type AttributeMetadata {
  rank: Int
  matched: String
}

type BackgroundTask {
  id: UUID!
  apiKeyId: String!
  backgroundTaskType: String!
  status: String!
  args: JSON
  result: JSON
  lastError: String
  executionAttempts: Int!
  etag: String!
  createdTimestamp: DateTime!
  updatedTimestamp: DateTime!
  lastExecutionTimestamp: DateTime
  nextExecutionTimestamp: DateTime!
}

type Brand implements MathFunctions & Entity {
  id: ID!
  internalId: String
  enigmaId: String
  tieBreakerMetadata: BrandTieBreakerMetadata
  searchMetadata: Searchmetadata
  names(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandNameConnection
  websites(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandWebsiteConnection
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandOperatingLocationConnection
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandLegalEntityConnection
  affiliatedBrands(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandBrandConnection
  cardTransactions(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandCardTransactionConnection
  industries(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandIndustryConnection
  revenueQualities(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandRevenueQualityConnection
  locationDescriptions(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandLocationDescriptionConnection
  isMarketables(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandIsMarketableConnection
  activities(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): BrandActivityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
  minDate(field: String!, conditions: Conditions): Date @deprecated(reason: "Use minDateTime instead")
  maxDate(field: String!, conditions: Conditions): Date @deprecated(reason: "Use maxDateTime instead")
}

type BrandActivity implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  activityType: String
  internalId: String
  internalBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandActivityConnection {
  pageInfo: PageInfo!
  edges: [BrandActivityEdge]!
}

type BrandActivityEdge {
  node: BrandActivity
  cursor: String!
}

type BrandBrandConnection {
  pageInfo: PageInfo!
  edges: [BrandBrandEdge]!
}

type BrandBrandEdge {
  node: Brand
  cursor: String!
  brandIsAffiliatedWithBrandId: UUID
  rank: Int
  id: ID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  affiliationType: String
  internalId: String
  internalBrandIsAffiliatedWithBrandId: String
}

type BrandCardTransaction implements MathFunctions {
  quantityType: String
  period: String
  projectedQuantity: Float
  platformBrandId: UUID
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  periodStartDate: Date
  periodEndDate: Date
  internalId: String
  internalBrandId: String
  internalPlatformBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandCardTransactionConnection {
  pageInfo: PageInfo!
  edges: [BrandCardTransactionEdge]!
}

type BrandCardTransactionEdge {
  node: BrandCardTransaction
  cursor: String!
}

type BrandConnection {
  pageInfo: PageInfo!
  edges: [BrandEdge]!
}

type BrandEdge {
  node: Brand
  cursor: String!
}

type BrandIndustryConnection {
  pageInfo: PageInfo!
  edges: [BrandIndustryEdge]!
}

type BrandIndustryEdge {
  node: Industry
  cursor: String!
  id: ID
  brandDoesBusinessWithinIndustryId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalBrandDoesBusinessWithinIndustryId: String
}

type BrandIsMarketable implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  isMarketable: Boolean
  internalId: String
  internalBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandIsMarketableConnection {
  pageInfo: PageInfo!
  edges: [BrandIsMarketableEdge]!
}

type BrandIsMarketableEdge {
  node: BrandIsMarketable
  cursor: String!
}

type BrandLegalEntityConnection {
  pageInfo: PageInfo!
  edges: [BrandLegalEntityEdge]!
}

type BrandLegalEntityEdge {
  node: LegalEntity
  cursor: String!
  id: ID
  legalEntityDoesBusinessAsBrandId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalLegalEntityDoesBusinessAsBrandId: String
}

type BrandLocationDescription implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  locationDescription: String
  internalId: String
  internalBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandLocationDescriptionConnection {
  pageInfo: PageInfo!
  edges: [BrandLocationDescriptionEdge]!
}

type BrandLocationDescriptionEdge {
  node: BrandLocationDescription
  cursor: String!
}

type BrandName implements MathFunctions {
  name: String
  nameFullTextSearchVector: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandNameConnection {
  pageInfo: PageInfo!
  edges: [BrandNameEdge]!
}

type BrandNameEdge {
  node: BrandName
  cursor: String!
}

type BrandOperatingLocationConnection {
  pageInfo: PageInfo!
  edges: [BrandOperatingLocationEdge]!
}

type BrandOperatingLocationEdge {
  node: OperatingLocation
  cursor: String!
  id: ID
  brandOperatesAtOperatingLocationId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalBrandOperatesAtOperatingLocationId: String
}

type BrandRevenueQuality implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  issueReason: String
  issueSeverity: String
  issueDescription: String
  internalId: String
  internalBrandId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type BrandRevenueQualityConnection {
  pageInfo: PageInfo!
  edges: [BrandRevenueQualityEdge]!
}

type BrandRevenueQualityEdge {
  node: BrandRevenueQuality
  cursor: String!
}

type BrandTieBreakerMetadata {
  enigmaIdExists: RankMetadata
  websiteExists: RankMetadata
  operatingLocationCount: RankMetadata
}

type BrandWebsiteConnection {
  pageInfo: PageInfo!
  edges: [BrandWebsiteEdge]!
}

type BrandWebsiteEdge {
  node: Website
  cursor: String!
  id: ID
  brandOperatesWebsiteWebsiteId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalBrandOperatesWebsiteWebsiteId: String
}

input Conditions {
  filter: JSON
  orderBy: [String]
  limit: Int
  pageToken: String
}

input ConnectionConditions {
  filter: JSON
  orderBy: [String]
}

scalar Date
scalar DateTime

type EmailAddress implements MathFunctions {
  emailAddress: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalEmailAddressId: String
  roles(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): EmailAddressRoleConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type EmailAddressRoleConnection {
  pageInfo: PageInfo!
  edges: [EmailAddressRoleEdge]!
}

type EmailAddressRoleEdge {
  node: Role
  cursor: String!
  id: ID
  roleIsAssociatedWithEmailAddressId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalRoleIsAssociatedWithEmailAddressId: String
}

enum EntityType {
  BRAND
  OPERATING_LOCATION
  LEGAL_ENTITY
}

interface Entity {
  id: ID!
  searchMetadata: Searchmetadata
}

type Industry implements MathFunctions {
  industryDesc: String
  industryCode: String
  industryType: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalIndustryId: String
  brands(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): IndustryBrandConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type IndustryBrandConnection {
  pageInfo: PageInfo!
  edges: [IndustryBrandEdge]!
}

type IndustryBrandEdge {
  node: Brand
  cursor: String!
  id: ID
  brandDoesBusinessWithinIndustryId: UUID
  datasetIds: JSON
  firstObservedDate: String
  lastObservedDate: String
  rank: Int
  internalId: String
  internalBrandDoesBusinessWithinIndustryId: String
}

scalar JSON
scalar JSONString

type LegalEntity implements MathFunctions & Entity {
  id: ID!
  internalId: String
  enigmaId: String
  tieBreakerMetadata: LegalEntityTieBreakerMetadata
  searchMetadata: Searchmetadata
  brands(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityBrandConnection
  names(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityNameConnection
  roles(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityRoleConnection
  persons(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityPersonConnection
  registeredEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityRegisteredEntityConnection
  tins(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityTinConnection
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityOperatingLocationConnection
  isFlaggedByWatchlistEntries(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityIsFlaggedByWatchlistEntryConnection
  appearsOnWatchlistEntries(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityAppearsOnWatchlistEntryConnection
  addresses(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityAddressConnection
  types(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityTypeConnection
  bankruptcies(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): LegalEntityBankruptcyConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type LegalEntityName implements MathFunctions {
  name: String
  nameFullTextSearchVector: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  legalEntityType: String
  internalId: String
  internalLegalEntityId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type LegalEntityBankruptcy implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  debtorName: String
  trustee: String
  judge: String
  filingDate: Date
  chapterType: String
  caseNumber: String
  petition: String
  entryDate: Date
  dateConverted: Date
  dateDismissed: Date
  dateTerminated: Date
  debtorDischargedDate: Date
  planConfirmedDate: Date
  internalId: String
  internalLegalEntityId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type LegalEntityType implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  legalEntityType: String
  internalId: String
  internalLegalEntityId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

interface MathFunctions {
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocation implements MathFunctions & Entity {
  operatingLocationCache(conditions: Conditions): [OperatingLocationCache]
  internalId: String
  enigmaId: String
  id: ID!
  tieBreakerMetadata: OperatingLocationTieBreakerMetadata
  searchMetadata: Searchmetadata
  names(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationNameConnection
  addresses(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationAddressConnection
  phoneNumbers(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationPhoneNumberConnection
  brands(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationBrandConnection
  roles(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationRoleConnection
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationLegalEntityConnection
  operatingStatuses(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationOperatingStatusConnection
  technologiesUseds(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationTechnologiesUsedConnection
  websites(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationWebsiteConnection
  reviewSummaries(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationReviewSummaryConnection
  isMarketables(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationIsMarketableConnection
  locationTypes(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationLocationTypeConnection
  ranks(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationRankConnection
  revenueQualities(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationRevenueQualityConnection
  cardTransactions(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): OperatingLocationCardTransactionConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocationOperatingStatus implements MathFunctions {
  operatingStatus: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalOperatingLocationId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocationCardTransaction implements MathFunctions {
  quantityType: String
  period: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  rawQuantity: Float
  projectedQuantity: Float
  periodStartDate: Date
  periodEndDate: Date
  internalId: String
  internalOperatingLocationId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocationTechnologiesUsed implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  technology: String
  category: String
  internalId: String
  internalOperatingLocationId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocationRank implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  quantityType: String
  period: String
  position: Int
  cohortSize: Int
  periodStartDate: Date
  periodEndDate: Date
  internalId: String
  internalOperatingLocationId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type OperatingLocationCache {
  dummyColumn: String
  operatingLocationId: UUID!
  brandId: UUID
  latitude: Float
  longitude: Float
  websiteHttpStatusCode: Float
  latest12mCardRevenueRaw: Float
  latest12mCardRevenueProjected: Float
  latest12mYoyGrowthRaw: Float
  latest12mYoyGrowthProjected: Float
  latest12mCardTransactionsRaw: Float
  latest12mCardTransactionsProjected: Float
  websiteTechnologiesUsed: JSONString
  reviewCountAvg: Float
  name: String
  streetAddress1: String
  streetAddress2: String
  city: String
  state: String
  zip: String
  fullAddress: String
  website: String
  websiteAvailability: String
  websiteFirstObservedDate: String
  websiteLastObservedDate: String
  websiteFaviconUrl: String
  operatingStatus: String
  primaryBrandNaicsIndustry: String
  primaryBrandEnigmaIndustry: String
  rankPosition: Int
  rankCohortSize: Int
  phoneNumber: String
  hasRolePhoneNumber: Boolean
  hasRoleEmailAddress: Boolean
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Person implements MathFunctions {
  firstName: String
  lastName: String
  fullName: String
  dateOfBirth: Date
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalPersonId: String
  fullNameFullTextSearchVector: String
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): PersonLegalEntityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

input PersonInput {
  firstName: String
  lastName: String
  dateOfBirth: String
  address: AddressInput = null
  tin: TinInput = null
}

type PhoneNumber implements MathFunctions {
  phoneNumber: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalPhoneNumberId: String
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): PhoneNumberOperatingLocationConnection
  roles(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): PhoneNumberRoleConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type Query {
  backgroundTask(id: String!): BackgroundTask
  search(searchInput: SearchInput!): [SearchUnion]
  aggregate(searchInput: SearchInput!): AggregateResult
  enrich(enrichmentInput: EnrichmentInput!): [SearchUnion]
  account: Account
  lists(input: SearchListsInput): ListConnection
  listMaterialization(input: GetListMaterializationInput!): ListMaterialization
  _schemaExtended: ExtendedSchema
}

type RegisteredEntity implements MathFunctions {
  name: String
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  registeredEntityType: String
  formationDate: Date
  formationYear: Int
  internalId: String
  internalRegisteredEntityId: String
  nameFullTextSearchVector: String
  registrations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RegisteredEntityRegistrationConnection
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RegisteredEntityLegalEntityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type Registration implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  registrationType: String
  expirationDate: Date
  registrationState: String
  jurisdictionType: String
  homeJurisdictionState: String
  registeredName: String
  fileNumber: String
  issueDate: Date
  status: String
  subStatus: String
  statusDetail: String
  internalId: String
  internalRegistrationId: String
  addresses(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RegistrationAddressConnection
  roles(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RegistrationRoleConnection
  registeredEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RegistrationRegisteredEntityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type ReviewSummary implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  reviewCount: String
  reviewScoreAvg: String
  firstReviewDate: Date
  lastReviewDate: Date
  internalId: String
  internalReviewSummaryId: String
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): ReviewSummaryOperatingLocationConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type Role implements MathFunctions {
  externalId: JSON
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  jobTitle: String
  jobFunction: String
  managementLevel: String
  externalUrls: JSON
  internalId: String
  internalRoleId: String
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RoleOperatingLocationConnection
  phoneNumbers(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RolePhoneNumberConnection
  emailAddresses(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RoleEmailAddressConnection
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RoleLegalEntityConnection
  registrations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): RoleRegistrationConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

input SearchInput {
  prompt: String
  id: String
  name: String
  address: AddressInput = null
  addresses: [AddressInput]
  person: PersonInput = null
  phoneNumber: String
  website: String
  conditions: Conditions = null
  tin: TinInput = null
  matchThreshold: Float
  entityType: EntityType = null
  engine: String
  output: OutputSpec = null
  enrichmentIdsS3Path: String
}

union SearchUnion = LegalEntity | Brand | OperatingLocation

type Tin implements MathFunctions {
  id: UUID!
  tin: String
  tinType: String
  validity: String
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalTinId: String
  legalEntities(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): TinLegalEntityConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

input TinInput {
  tin: String
  tinType: TinType = null
}

enum TinType {
  EIN
  SSN
  ITIN
  TIN
}

scalar UUID

type WatchlistEntry implements MathFunctions {
  id: UUID!
  watchlistName: String
  firstObservedDate: String
  lastObservedDate: String
  internalId: String
  internalWatchlistEntryId: String
  legalEntitiesIsFlaggedBy(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WatchlistEntryIsFlaggedByLegalEntityConnection
  legalEntitiesAppearsOn(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WatchlistEntryAppearsOnLegalEntityConnection
  addresses(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WatchlistEntryAddressConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type Website implements MathFunctions {
  website: String
  firstObservedDate: String
  id: UUID!
  lastObservedDate: String
  subdomain: String
  domain: String
  topLevelDomain: String
  path: String
  fragment: String
  internalId: String
  internalWebsiteId: String
  brands(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteBrandConnection
  operatingLocations(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteOperatingLocationConnection
  websiteContents(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteWebsiteContentConnection
  technologiesUseds(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteTechnologiesUsedConnection
  onlinePresences(first: Int = 3, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteOnlinePresenceConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type WebsiteContent implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  httpStatusCode: String
  faviconUrl: String
  faviconImage: String
  websiteAvailability: String
  internalId: String
  internalWebsiteContentId: String
  websites(first: Int = 100, last: Int, after: String, before: String, conditions: ConnectionConditions): WebsiteContentWebsiteConnection
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type WebsiteOnlinePresence implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  hasOnlineSales: String
  internalId: String
  internalWebsiteId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

type WebsiteTechnologiesUsed implements MathFunctions {
  id: UUID!
  firstObservedDate: String
  lastObservedDate: String
  technology: String
  category: String
  internalId: String
  internalWebsiteId: String
  count(field: String!, conditions: Conditions): Int
  sum(field: String!, conditions: Conditions): Int
  min(field: String!, conditions: Conditions): Int
  max(field: String!, conditions: Conditions): Int
  avg(field: String!, conditions: Conditions): Float
  collect(field: String!, separator: String, conditions: Conditions): String
  minDateTime(field: String!, conditions: Conditions): DateTime
  maxDateTime(field: String!, conditions: Conditions): DateTime
}

input OutputSpec {
  filename: String
  format: OutputFormat = null
}

enum OutputFormat {
  PARQUET
  CSV
}
```

## Queries

### Search

The `search` query is for discovering and retrieving entities from Enigma's data.

#### Request Parameters

##### SearchInput

`SearchInput` is a required input field for the search query. This table describes the input fields in `SearchInput`:

| **Input Field** | **Description** | **Example** |
|-----------------|-----------------|-------------|
| `prompt` | A description of the business. Only supported for `entityType` `BRAND`. Must not be used with `id`, `name`, `website`, and `address`. | "fast food", "pizza" |
| `id` | The ID of the entity. Takes precedence over all other input fields. Use with `entityType`. | 2daa02e4-f887-40f5-8bd2-c00764b91e76 |
| `name` | The name of the business. | McDonald's |
| `address` | Address components: `id`, `street1`, `street2`, `city`, `state`, `postalCode` (all optional) | `{ "street1": "123 Main St.", "city": "NEW YORK", "state": "NY", "postalCode": "10013" }` |
| `addresses` | A list of `addresses`. Either `address` or `addresses` can be specified, not both. Only supported for `aggregate`. | `[{ "city": "New York", "state": "NY" }, { "city": "Boston", "state": "MA" }]` |
| `person` | Person info: `firstName`, `lastName`, `dateOfBirth`, `address`, `tin` (all optional) | `{ "firstName": "John", "lastName": "Doe" }` |
| `phoneNumber` | A 10-digit U.S. phone number | 1234567890 or 123-456-7890 |
| `website` | A website URL | enigma.com |
| `conditions` | `filter`, `orderBy`, `limit`, `pageToken` | `{ filter: { EQ: ["field1", 123] }, limit: 3 }` |
| `tin` | The TIN of the business. `name` must also be provided. | `{ "tin": "123456789", "tinType": "TIN" }` |
| `matchThreshold` | Confidence threshold (0.0 - 1.0) | 0.8 |
| `entityType` | Entity type. Defaults to `BRAND`. | `BRAND`, `LEGAL_ENTITY`, `OPERATING_LOCATION` |
| `output` | Background task output config: `filename` (required), `format` (optional) | `{ "filename": "my_csv", "format": "CSV" }` |

#### Conditions and ConnectionConditions

##### Filter

| **Operator** | **Desc** | **Examples** |
|-------------|----------|-------------|
| `EQ` | Equals | `filter: { EQ: ["name", "McDonald's"] }` |
| `NE` | Not equals | `filter: { NE: ["state", "NY"] }` |
| `GT` | Greater than | `filter: { GT: ["firstObservedDate", "2025-01-01"] }` |
| `GTE` | Greater than or equal | `filter: { GTE: ["firstObservedDate", "2025-01-01"] }` |
| `LT` | Less than | `filter: { LT: ["firstObservedDate", "2025-01-01"] }` |
| `LTE` | Less than or equal | `filter: { LTE: ["firstObservedDate", "2025-01-01"] }` |
| `IN` | Value in list | `filter: { IN: ["operatingStatus", ["Open", "Closed"]] }` |
| `NOT_IN` | Value not in list | `filter: { NOT_IN: ["operatingStatus", ["Open", "Closed"]] }` |
| `LIKE` | Case-sensitive match | `filter: { LIKE: ["name", "%Pizza%"] }` |
| `ILIKE` | Case-insensitive match | `filter: { ILIKE: ["name", "%PiZza%"] }` |
| `AND` | Logical AND | `filter: { AND: [ expr1, expr2 ] }` |
| `OR` | Logical OR | `filter: { OR: [ expr1, expr2 ] }` |
| `NOT` | Logical NOT | `filter: { NOT: [ expr ] }` |
| `ADD` | Addition | `filter: { ADD: [ "monthlySales", 123 ] }` |
| `SUB` | Subtraction | `filter: { SUB: [ "monthlySales", 123 ] }` |
| `MUL` | Multiplication | `filter: { MUL: [ "monthlySales", 12 ] }` |
| `DIV` | Division | `filter: { DIV: [ "annualSales", 12 ] }` |
| `HAS` | Checks if value present | `filter: { HAS: ["roles.emailAddresses"] }` |

###### Filtering by Field Paths

Use dot notation for nested fields. Example: `operatingLocations.operatingStatuses.operatingStatus`

Logic based on GraphQL schema traversal:
1. `search` returns `SearchUnion` (Brand | OperatingLocation | LegalEntity)
2. From `Brand` → `operatingLocations` (BrandOperatingLocationConnection)
3. Nodes are `OperatingLocation`
4. From `OperatingLocation` → `operatingStatuses` (OperatingLocationOperatingStatusConnection)
5. Nodes are `OperatingLocationOperatingStatus`
6. Field: `operatingStatus`

###### Filter Examples

1. Brand operating location status: `operatingLocations.operatingStatuses.operatingStatus`
2. Brand operating location state: `operatingLocations.addresses.state`
3. Brand industry type/code: `industries.industryType` / `industries.industryCode`
4. Card transaction period: `cardTransactions.period`

##### OrderBy

Format: `<field_name> [ASC|DESC]`

```graphql
names(conditions: { orderBy: ["name DESC"] })
```

Multiple ordering:
```graphql
addresses(conditions: { orderBy: ["streetAddress1 ASC", "city ASC"] })
```

#### Math Functions

| **Function** | **Return Type** | **Description** |
|-------------|-----------------|-----------------|
| `count` | Int | Count related records |
| `sum` | Int | Sum numeric values |
| `min` | Int | Find minimum value |
| `max` | Int | Find maximum value |
| `avg` | Float | Calculate average |
| `collect` | String | Collect values into string |
| `minDateTime` | DateTime | Find minimum datetime |
| `maxDateTime` | DateTime | Find maximum datetime |

Parameters:
- `field` (required): Path to the field
- `conditions` (optional): Filter conditions
- `separator` (optional, collect only): Join separator, default ","

##### Count Example

```graphql
query Search {
  search(searchInput: { name: "McDonald's", entityType: BRAND }) {
    ... on Brand {
      id
      websitesCount: count(field: "websites")
      namesCount: count(field: "names")
    }
  }
}
```

##### Min/Max Example

```graphql
query Search {
  search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
    ... on OperatingLocation {
      minReviewCount: min(field: "reviewSummaries.reviewCount")
      maxReviewCount: max(field: "reviewSummaries.reviewCount")
      avgReviewCount: avg(field: "reviewSummaries.reviewCount")
    }
  }
}
```

##### MinDateTime/MaxDateTime Example

```graphql
query Search {
  search(searchInput: { name: "McDonald's", entityType: OPERATING_LOCATION }) {
    ... on OperatingLocation {
      firstObservedDateTime: minDateTime(field: "addresses.firstObservedDate")
      lastObservedDateTime: maxDateTime(field: "addresses.lastObservedDate")
    }
  }
}
```

#### Pagination

Relay Connection specification cursor-based pagination.

##### PageInfo Structure

- `hasNextPage`: Boolean
- `hasPreviousPage`: Boolean
- `startCursor`: First item cursor
- `endCursor`: Last item cursor

##### Forward Pagination

- `first`: Number of items from beginning
- `after`: Cursor to start after (exclusive)

##### Backward Pagination

- `last`: Number of items from end
- `before`: Cursor to end before (exclusive)

##### Validation Rules

- Cannot specify both `first` and `last`
- `after` requires `first`
- `before` requires `last`
- All parameters must be >= 0

#### Usage

The `search` query supports four main patterns:

##### Text Search

```graphql
query Search {
  search(
    searchInput: {
      name: "Enigma"
      person: {firstName: "Joe", lastName: "Smith"}
      entityType: BRAND
      address: {city: "NEW YORK", state:"NY"}
    }
  ) {
    ... on Brand {
      id
      names { edges { node { name } } }
    }
  }
}
```

##### Lookup

```graphql
query Search {
  search(
    searchInput: {
      id: "5f53e079-c66a-487e-8a9d-08efc39652ee"
    }
  ) {
    ... on Brand {
      id
      names { edges { node { name } } }
    }
  }
}
```

##### Prompt Search

```graphql
query Search {
  search(
    searchInput: {
      prompt: "Mexican restaurants"
      entityType: BRAND
      conditions: {limit: 3}
    }
  ) {
    ... on Brand {
      names { edges { node { name } } }
    }
  }
}
```

##### Segmentation

For large datasets, use async with `output`:

```graphql
query Search {
  search(
    searchInput: {
      prompt: "Mexican restaurants"
      entityType: OPERATING_LOCATION
      output: { filename: "mexican_restaurants_search_query_1" }
    }
  ) {
    ... on OperatingLocation {
      addresses(first: 1) { edges { node { fullAddress } } }
    }
  }
}
```

Returns `202 Accepted` with background task ID. Poll with:

```graphql
query BackgroundTask {
  backgroundTask(id: "285b6f06-c532-4969-bcfd-cdd82f5de373") {
    status
    result
  }
}
```

Status values: `PROCESSING`, `CANCELLED`, `FAILED`, `SUCCESS`

#### Best Practices

- Entity types: **Brand**, **Legal Entity**, **Operating Location**
- `search` requires either `id`, `name`, or `website`; or `prompt` with `output`
- Set input fields inline over using GraphQL variables

#### Common Use Cases

- Find businesses by industry, location, or name
- Look up specific companies by ID
- Generate market research datasets
- Discover competitors in specific markets
- Find businesses with specific characteristics (revenue, size, etc.)

### Aggregation

The `aggregate` query counts operating locations and their associated brands or legal entities.

Only supports `entityType` `OPERATING_LOCATION`.

Only filter supported:
```json
{
  "filter": {"EQ": ["operatingStatuses.operatingStatus", "Open"] }
}
```

Count field accepts: `brand`, `operatingLocation`, `legalEntity`

```graphql
query Aggregate {
  aggregate(
    searchInput: {
      entityType: OPERATING_LOCATION,
      address: { city: "NEW YORK", state: "NY" }
    }
  ) {
    brandsCount: count(field: "brand")
    operatingLocationsCount: count(field: "operatingLocation")
  }
}
```

## Need Help?

- Reach out to us at [support@enigma.com](mailto:support@enigma.com)
