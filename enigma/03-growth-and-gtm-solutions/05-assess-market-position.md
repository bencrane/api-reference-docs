# Growth & GTM Solutions - Assess Market Position

> Source: https://documentation.enigma.com/growth/market-rank-attributes

Market rank attributes show how individual business locations rank against competitors in their local market. This data reveals competitive positioning, market share, and performance relative to similar businesses.

---

## Understanding Market Rankings

Each business location gets ranked within its local cohort of similar businesses. Rankings consider factors like revenue performance, customer volume, and market share within defined geographic areas.

### Key Rank Attributes

| Attribute | Description | Example |
|---|---|---|
| Position | Numerical rank within local cohort | #1, #15, #247 |
| Cohort Size | Total businesses in comparison group | 565 total, 47 total, 1,234 total |
| Rank Type | What metric is being ranked | Usually "revenue_performance" |
| Market Context | Geographic and category-based grouping | Similar businesses in same area |

---

## Accessing Rank Data

### Basic Query Pattern

```graphql
query GetLocationRanks($searchInput: SearchInput!, $cardTransactionConditions: ConnectionConditions!) {
  search(searchInput: $searchInput) {
    ... on OperatingLocation {
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
            city
            state
          }
        }
      }
      ranks(first: 1) {
        edges {
          node {
            position
            cohortSize
            rank
            quantityType
            period
          }
        }
      }
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

**Variables:**

```json
{
  "searchInput": {
    "entityType": "OPERATING_LOCATION",
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

### Sample Response Structure

```json
{
  "data": {
    "brand": {
      "operatingLocationsConnection": {
        "edges": [
          {
            "node": {
              "id": "loc_12345",
              "name": "Casa Garcia's Mexican Restaurant - Austin HQ",
              "addressesConnection": {
                "edges": [
                  {
                    "node": {
                      "fullAddress": "1901 E 6th St, Austin, TX 78702"
                    }
                  }
                ]
              },
              "ranksConnection": {
                "edges": [
                  {
                    "node": {
                      "position": 1,
                      "cohortSize": 565,
                      "rank": "revenue_performance",
                      "updatedAt": "2024-01-15T00:00:00Z"
                    }
                  }
                ]
              },
              "cardTransactions": {
                "edges": [
                  {
                    "node": {
                      "projectedQuantity": 3542891
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  }
}
```

---

## Real-World Example: Casa Garcia's

Casa Garcia's operates multiple Mexican restaurant locations across Texas. Their ranking data reveals market position patterns.

### Location Performance Analysis

```graphql
query CasaGarciasAnalysis($brandId: ID!) {
  search(searchInput: $searchInput) {
    namesConnection(first: 1) {
      edges {
        node {
          name
        }
      }
    }
    operatingLocationsConnection(first: 10) {
      totalCount
      edges {
        node {
          id
          name
          addressesConnection(first: 1) {
            edges {
              node {
                fullAddress
                city
                state
              }
            }
          }
          ranksConnection(first: 1) {
            edges {
              node {
                position
                cohortSize
                rank
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
  }
}
```

### Sample Analysis Results

**Casa Garcia's Market Position:**

- **Austin HQ:** #1 of 565 Mexican restaurants ($3.5M revenue)
- **New Braunfels:** #15 of 529 Mexican restaurants ($1.1M revenue)
- **San Antonio Northwest:** #45 of 1,234 Mexican restaurants ($892K revenue)
- **Round Rock:** #8 of 298 Mexican restaurants ($743K revenue)

**Key Insights:**

- Market leader in Austin with #1 position
- Strong performance in smaller markets (Round Rock #8/298)
- Faces more competition in San Antonio (larger cohort = more competitors)
- Revenue and rank correlation shows market validation

---

## Ranking Analysis Patterns

### Market Percentile Calculation

```graphql
query CalculateMarketPosition($brandId: ID!) {
  search(searchInput: $searchInput) {
    operatingLocationsConnection(first: 50) {
      edges {
        node {
          name
          ranksConnection(first: 1) {
            edges {
              node {
                position
                cohortSize
                # Calculate percentile: ((cohortSize - position + 1) / cohortSize) * 100
              }
            }
          }
        }
      }
    }
  }
}
```

### Understanding Percentile Performance

| Tier | Description | Example |
|---|---|---|
| Top 10% | Market Leaders | Austin HQ: #1/565 = 100th percentile |
| Top 25% | Strong Performers | Round Rock: #8/298 = 97th percentile |
| Below 75% | Average/Struggling | San Antonio: #45/1234 = 96th percentile |

### Bulk Location Analysis

```graphql
query AnalyzeMarketRanks($searchInput: SearchInput!) {
  search(searchInput: $searchInput) {
    ... on OperatingLocation {
      id
      name
      addressesConnection(first: 1) {
        edges {
          node {
            fullAddress
            city
            state
          }
        }
      }
      brandsConnection(first: 1) {
        edges {
          node {
            name
          }
        }
      }
      ranksConnection(first: 1) {
        edges {
          node {
            position
            cohortSize
            rank
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
```

**Variables for Mexican restaurants in Austin:**

```json
{
  "searchInput": {
    "entityType": "OPERATING_LOCATION",
    "businessCategory": "mexican restaurant",
    "address": {
      "city": "Austin",
      "state": "TX"
    }
  }
}
```

---

## Advanced Ranking Analysis

### Competitive Intelligence

Use ranking data to understand:

| Signal | Meaning | Example |
|---|---|---|
| Market Density | Large cohort size = saturated market | San Antonio: 1,234 Mexican restaurants (high competition) |
| Market Opportunity | Small cohort size = niche market | Round Rock: 298 Mexican restaurants (less competition) |

### Performance Benchmarking

```graphql
query BenchmarkPerformance($brandId: ID!) {
  search(searchInput: $searchInput) {
    operatingLocationsConnection(first: 100) {
      edges {
        node {
          name
          addressesConnection(first: 1) {
            edges {
              node {
                city
                state
              }
            }
          }
          ranksConnection(first: 1) {
            edges {
              node {
                position
                cohortSize
                # Calculate market share proxy
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
  }
}
```

### Site Selection Applications

Ranking data helps with location decisions:

1. **High-rank locations** in small cohorts = successful formats in underserved markets
2. **Low-rank locations** in large cohorts = need repositioning or closure
3. **Market gaps** where top-ranked locations have low revenue = expansion opportunities

---

## Key Ranking Insights

### What Rankings Reveal

- **Market Position:** Direct competitive comparison within local market
- **Market Size:** Cohort size indicates market saturation and competition level
- **Performance Validation:** Revenue correlation with rank confirms market effectiveness
- **Expansion Signals:** Strong ranks in smaller markets suggest replicable success

### Strategic Applications

- **Investment Research:** Identify market leaders and growth opportunities
- **Competitive Analysis:** Benchmark performance against local competitors
- **Site Selection:** Find markets with good rank/revenue ratios
- **Portfolio Optimization:** Focus resources on highest-performing locations

---

## Practical Implementation

### Data Processing Pattern

```javascript
// Example of processing rank data in application
function calculateMarketMetrics(locationData) {
  return locationData.map(location => {
    const rank = location.ranksConnection.edges[0]?.node;
    const revenue = location.cardTransactions.edges[0]?.node?.projectedQuantity;
    
    if (!rank) return { ...location, marketMetrics: null };
    
    const percentile = ((rank.cohortSize - rank.position + 1) / rank.cohortSize) * 100;
    const isMarketLeader = rank.position <= 5;
    const marketSize = rank.cohortSize > 500 ? 'Large' : 
                      rank.cohortSize > 100 ? 'Medium' : 'Small';
    
    return {
      ...location,
      marketMetrics: {
        percentile: Math.round(percentile),
        isMarketLeader,
        marketSize,
        revenuePerRank: revenue ? revenue / rank.position : null
      }
    };
  });
}
```

### Integration with Location Analysis

Combine ranking data with other location attributes for comprehensive market intelligence. Rankings provide the competitive context that makes revenue and growth data meaningful within local market conditions.