# GraphQL API Quickstart

URL: https://documentation.enigma.com/guides/graphql/api

Enigma's GraphQL API provides four main query patterns for accessing business data. Each query type serves different use cases and returns different types of information.

## Connect and Query

To query Enigma's GraphQL API, submit POST requests to the `https://api.enigma.com/graphql` endpoint with your query in the request body. Request body is a standard GraphQL query conforming to the [GraphQL Specification](https://spec.graphql.org/October2021/) .

All API requests require an API key. Include it in the `x-api-key` header:

```text
x-api-key: YOUR_API_KEY
```

## 1. Business Search

**Purpose** : Find a specific business by name and get basic information about it.

**When to use** : When you know the business name and want to get their Brand ID and basic metrics.

**What you get** : Revenue, location count, growth rate, Brand ID for further queries.

### Example

```graphql
query SearchBrand($searchInput: SearchInput!, $cardTransactionConditions: ConnectionConditions!) {
  search(searchInput: $searchInput) {
    ... on Brand {
      id
      enigmaId
      names(first: 1) {
        edges {
          node {
            name
          }
        }
      }
      count(field: "operatingLocations")
      cardTransactions(first: 1, conditions: $cardTransactionConditions) {
        edges {
          node {
            projectedQuantity
          }
        }
      }
    }
  }
}
```

**Variables** :

```json
{
  "searchInput": {
    "entityType": "BRAND",
    "name": "Starbucks"
  },
  "cardTransactionConditions": {
    "filter": {
      "AND": [
        {"EQ": ["period", "12m"]},
        {"EQ": ["quantityType", "card_revenue_amount"]},
        {"EQ": ["rank", 0]}
      ]
    }
  }
}
```

**Sample Response** :

```json
{
    "data": {
        "search": [
            {
                "id": "5f1147ed-8e99-477d-827a-51094b2de153",
                "enigmaId": "5f1147ed-8e99-477d-827a-51094b2de153",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "STARBUCKS"
                            }
                        }
                    ]
                },
                "count": 20153,
                "cardTransactions": {
                    "edges": [
                        {
                            "node": {
                                "projectedQuantity": 19980525299
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Common Use Cases

- **Verify a business exists** in the database
- **Get basic financial metrics** before deeper analysis
- **Obtain Brand ID** needed for location and legal entity queries
- **Quick company overview** for initial research

## 2. Brand Locations

**Purpose** : Get all locations for a specific business you already found.

**When to use** : After getting a Brand ID from business search, when you want to see where a company operates.

**What you get** : Address, revenue, growth rate, competitive ranking for each location.

### Example

```graphql
query GetBrandLocations($searchInput: SearchInput!, $cardTransactionConditions: ConnectionConditions!) {
  search(searchInput: $searchInput) {
    ... on Brand {
      operatingLocations(first: 1) {
        edges {
          node {
            id
            names(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
            addresses(first: 1) {
              edges {
                node {
                  fullAddress
                }
              }
            }
            cardTransactions(conditions: $cardTransactionConditions, first: 1) {
              edges {
                node {
                  projectedQuantity
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

**Variables** :

```json
{
  "searchInput": {
    "entityType": "BRAND", 
    "id": "5f1147ed-8e99-477d-827a-51094b2de153"
  },
  "cardTransactionConditions": {
    "filter": {
      "AND": [
        {"EQ": ["period", "12m"]},
        {"EQ": ["quantityType", "card_revenue_amount"]},
        {"EQ": ["rank", 0]}
      ]
    }
  }
}
```

**Sample Response** :

```json
{
    "data": {
        "search": [
            {
                "operatingLocations": {
                    "edges": [
                        {
                            "node": {
                                "id": "2c50eb32-ff30-40c5-8ab0-ad4c03bc2346",
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "STARBUCKS"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "2401 UTAH AVE S # 8 SEATTLE WA 98134"
                                            }
                                        }
                                    ]
                                },
                                "cardTransactions": {
                                    "edges": [
                                        {
                                            "node": {
                                                "projectedQuantity": 1561081
                                            }
                                        }
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

### Common Use Cases

- **Market analysis** : See where competitors operate
- **Site selection** : Find successful location patterns
- **Performance comparison** : Compare revenue across locations
- **Geographic expansion** : Identify market gaps

## 3. Legal Entities

**Purpose** : Get all legal entities (corporations, LLCs) associated with a business.

**When to use** : When you need to understand corporate structure or verify business registrations.

**What you get** : Legal entity names, formation dates, state registrations, business structure.

### Example

```graphql
query GetBrandLegalEntities($searchInput: SearchInput!) {
    search(searchInput: $searchInput) {
        ... on Brand {
            id
            legalEntities(first: 1) {
                edges {
                    node {
                        registeredEntities {
                            edges {
                                node {
                                    registeredEntityType
                                    formationDate
                                    name
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

**Variables** :

```json
{
  "searchInput": {
    "id": "5f1147ed-8e99-477d-827a-51094b2de153"
    }
}
```

**Sample Response** :

```json
{
    "data": {
        "search": [
            {
                "id": "5f1147ed-8e99-477d-827a-51094b2de153",
                "legalEntities": {
                    "edges": [
                        {
                            "node": {
                                "registeredEntities": {
                                    "edges": [
                                        {
                                            "node": {
                                                "registeredEntityType": "Corporation",
                                                "formationDate": "1985-11-04",
                                                "name": "STARBUCKS CORPORATION"
                                            }
                                        }
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

### Understanding Different Business Models

Different types of businesses have different legal structures:

Corporate Chains

**Starbucks** : 1 main entity

**Tesla** : 4 entities (different business units)

Few entities, centralized ownership

Franchise Networks

**Dairy Queen** : 400+ entities

**McDonald's** : 300+ entities

Many entities, distributed ownership

### Pagination for Complex Structures

```graphql
query GetAllLegalEntities($brandId: ID!, $after: String) {
  search(searchInput: $searchInput) {
    legalEntitiesConnection(
      first: 200
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          name
          registrations {
            jurisdiction
            entityType
            status
          }
        }
      }
    }
  }
}
```

### Common Use Cases

- **Due diligence** : Verify business registrations
- **Compliance** : Check multi-state registrations
- **Corporate structure** : Understand business organization
- **Franchise analysis** : Count franchisee entities

## Choosing the Right Query Type

When you know the business name

1. **Search for Brand**
Get Brand ID and basic metrics

1. **Get Brand Locations**
See where they operate

1. **Get Legal Entities**
Understand corporate structure

When you want to discover businesses

1. **Search by Category/Location**
Find companies or locations by criteria

1. **Apply Filters**
Narrow by revenue, geography, etc.

Then use Brand ID from results for deeper analysis

## Complete Example Workflow

Here's how the query types work together:

```graphql
# 1. DISCOVERY: Find coffee shops in Seattle
query DiscoverCoffeeShops($searchInput: SearchInput!) {
      search(searchInput: $searchInput) {
        ... on Brand {
          id
      namesConnection(first: 1) {
        edges {
          node {
            name
          }
        }
          }
      cardTransactions(
        conditions: {
          filter: {
            AND: [
              {EQ: ["period", "12m"]}
              {EQ: ["quantityType", "card_revenue_amount"]}
              {EQ: ["rank", 0]}
              {GT: ["projectedQuantity", 500000]}  # Min $500K revenue
            ]
          }
        }
        first: 1
      ) {
        edges {
          node {
            projectedQuantity
          }
        }
      }
    }
  }
}

# 2. DETAILED ANALYSIS: Get specific brand information
query AnalyzeBrand($brandId: ID!) {
  search(searchInput: $searchInput) {
    namesConnection(first: 1) {
      edges {
        node {
          name
        }
      }
    }
    operatingLocationsConnection(first: 50) {
      totalCount
      edges {
        node {
          id
          name
          addressesConnection(first: 1) {
            edges {
              node {
                fullAddress
                }
              }
            }
          cardTransactions(
            conditions: {
              filter: {
                AND: [
                  {EQ: ["period", "12m"]}
                  {EQ: ["quantityType", "card_revenue_amount"]}
                  {EQ: ["rank", 0]}
                ]
              }
            }
            first: 1
          ) {
            edges {
              node {
                projectedQuantity
              }
            }
          }
        }
      }
    }
    legalEntitiesConnection(first: 10) {
      edges {
        node {
          name
          registrations {
            entityType
            jurisdiction
          }
        }
      }
    }
  }
}
```

This workflow shows how to:

1. **Discover** businesses matching criteria
2. **Select** interesting candidates
3. **Analyze** specific businesses in detail
4. **Map** their geographic presence
5. **Understand** their corporate structure
Each query type serves a specific purpose in this research process.