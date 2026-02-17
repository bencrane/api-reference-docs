# RESOURCES - Evaluating Card Revenue Data Quality

URL: https://documentation.enigma.com/resources/card_revenue_data

## Key Takeaway

Enigma's card revenue data shows strong accuracy, with 67% of brands having error rates within ±30% of ground truth data, and particularly high precision for businesses with annual revenues below $100k or above $1M.

This guide helps you validate Enigma's card revenue data against your own ground truth sources. Whether you're evaluating data quality for risk assessment, sales intelligence, or market analysis, you'll learn how to:

- Measure and interpret error rates
- Validate revenue bucket accuracy
- Understand common comparison challenges
- Make informed decisions about data quality

---

## Quality Metrics

We evaluate card revenue data quality through four key metrics, each designed to answer specific business questions:

| Metric | Business Question | Success Criteria |
|---|---|---|
| **Error Rate** | How close are our revenue estimates to actual values? | ±30% of ground truth |
| **Revenue Buckets** | Can we accurately segment businesses by revenue tier? | >80% precision in key ranges |
| **Growth Trends** | Do we capture revenue changes reliably? | Strong correlation with ground truth |
| **Data Coverage** | What portion of businesses have revenue data? | >90% for card-accepting industries |

Each metric helps validate a different aspect of our data quality, ensuring you can trust Enigma's revenue data for your specific use case.

---

## Validation Process

### Step 1: Prepare Your Data

Start with a recent time period where you have reliable card spend data, ideally monthly data from 2024. Structure your input file with these key fields:

- **Required:** Business name, address (for location matching)
- **Optional:** Website, phone, legal name, person details

### Step 2: Choose Your Entity Type

Select the appropriate comparison level:

- **Brand Level**: Use for companies where you have total company revenue (e.g., all Starbucks locations)
- **Location Level**: Use when you have individual store revenue data

> **Entity Matching:** Matching at the correct level is crucial for accurate comparison. Brand-level matching includes both in-store and online revenue, while location matching only includes in-store revenue.

### Step 3: Calculate Error Rates

1. Match your entities to Enigma IDs
2. Compare monthly revenue values using the standard error formula:

```
Error = (Enigma - Truth) / ((Enigma + Truth) / 2)
```

3. Group results into 10% buckets for distribution analysis

### Step 4: Analyze Results

Focus your analysis on these key areas:

- Distribution of error rates
- Precision within revenue buckets
- Industry-specific patterns
- Data coverage in your target segments

---

## Methodologies and Example Results

### Error Rate: Percentage Error (%) - Enigma Card Revenue Amount

*What is the distribution of percentage error (%) between Enigma's card revenues and true card spend?*

**Methodology**

1. Pick a relevant **time period** contained in both Enigma and the ground truth set (e.g., card spend data by month during 2024)
2. Ensure your input file is structured with one row per entity, with at least a brand name (and address if choosing operating locations). You may also include attributes such as website, phone, legal name, and person to improve results.
3. Choose the relevant **entity type** from Enigma's data model:
   - **Brand** — Example: You have aggregated card spend for all Starbucks stores in US
   - **Operating Location** — Example: You have card spend for individual Starbucks stores
4. Enrich your input file:
   - Match the entities in your file to Enigma's entity type (e.g., brands)
   - Append attributes including `card_revenue_amount` for `period = 1m`, with `period_end_date` during 2024
5. Measure the percentage error between Enigma's `card_revenue_amount` and true card spend data (`true_card_amount`) during an individual month:

```
Percentage error = (Enigma card_revenue_amount - true_card_amount) / ((Enigma card_revenue_amount + true_card_amount) / 2)
```

6. Plot the distribution of percentage error — recommended buckets of 10% (counting how many brands/operating locations in your sample have a percentage error in this range)

**Results**

When comparing Enigma's latest annual card revenues ($) to the same annual period in the ground truth set, the distribution of percentage error rates is shown below.

> **Note:** The ground truth set often contains online spend for smaller (e.g., single-location) brands, but not for larger (e.g., multi-location) brands. Enigma's brands always contain both "in-store" (from operating locations) and "online" spend, while operating locations only include "in-store" spend. To ensure a fair comparison, use Enigma's brand revenues (including online) for single-location brands, and the sum of all Enigma operating location revenues (excluding online spend) within a brand for multi-location brands.

**Examples of high/low accuracy:**

- **High accuracy** — Percentage error of **-6%**
  - Enigma card revenue: $4.2M
  - Ground truth revenue: $4.4M
- **Low accuracy** — Percentage error of **-80%**
  - Enigma card revenue: $2.5M
  - Ground truth revenue: $5.9M

---

### Precision: Accuracy of Buckets - Card Revenue Amount ($)

*Are Enigma's card revenue buckets close to true card spend buckets?*

**Methodology**

1. Choose your revenue buckets (e.g., $0-$50k, $50-$100k, $100-$150k, $150-$250k, $250k-$500k, $500-$1M, $1M-$5M, $5M+)
2. Pick a relevant **time period** contained in both Enigma and the ground truth set
3. Ensure your input file is structured with one row per entity
4. Choose the relevant **entity type**:
   - **Brand** — Example: You have aggregated card spend for all Starbucks stores and online spend (e.g., website, app payments) in US
   - **Operating Location** — Example: You have in-store card spend for individual Starbucks stores
5. Enrich your input file:
   - Match entities to Enigma's entity type (e.g., brands)
   - Append attributes including `card_revenue_amount` for `period = 1m`, with `period_end_date` during 2024
6. Check how many Enigma matches have revenue during the time period requested
7. Calculate precision for each revenue bucket — e.g., for $1M-$5M: what % of Enigma entities with $1M-$5M in annual card revenue also have $1M-$5M in your ground truth set

**Results**

Comparing Enigma's data to third-party payment processor data, the precision estimates for brand revenues show:

- 51% of brands have a percentage error between -20% and 20%
- 67% of brands have a percentage error between -30% and 30%

> **Note:** Uses Enigma brand revenues for single-location brands, but aggregated Enigma location revenues for multi-location brands.

**Accuracy by bucket:**

- **Very accurate (precision >80%):** $0-$100k, $1-$5M, >$5M
  - *Enigma is very often accurate for brands with less than $100k or more than $1M in revenue*
- **Moderately accurate (precision >60%):** $100-$250k, $250-$500k, $500k-$1M
  - *Enigma is often accurate for brands with $100k-$1M in revenue*

Most false positives are in adjacent buckets.

---

## Troubleshooting Data Quality Issues

### Challenge 1: Entity Matching Quality

> **Common Pitfall:** Poor entity matching is the most frequent cause of significant revenue discrepancies. Always validate your matches before comparing revenue data.

**Problem Signs**

- Multiple input rows matching to the same Enigma ID
- Extreme revenue discrepancies (e.g., small local business matching to a major corporation)
- Low match confidence scores

**Example of Poor Matching**

```json
{
  "input": {
    "name": "Ray's Cycles - Cedarhurst",
    "website": "www.facebook.com/profile/98746585",
    "address": "NY"
  },
  "result": "Matched to Facebook, Inc."
}
```

**Best Practices**

1. Provide accurate business identifiers:
   - Use primary business website, not social media profiles
   - Include complete address information
   - Provide business legal name when available
2. Validate matches before comparison:
   - Review matches with significant revenue differences
   - Check for duplicate matches
   - Sort by revenue to identify outliers

### Challenge 2: Data Comparability

> **Understanding Revenue Types:** Enigma provides card-based revenue data, which may represent only a portion of a business's total revenue, particularly in certain industries.

**Common Scenarios**

- Your data includes non-card revenue (cash, checks, invoices)
- Business operates primarily in B2B or wholesale
- Industry typically has low card payment adoption

**Solution Framework**

1. Assess industry fit:
   - **High card adoption:** retail, restaurants, personal services
   - **Mixed adoption:** professional services, healthcare
   - **Low adoption:** B2B software, wholesale, manufacturing

2. Adjust comparison approach:

```
For high card adoption industries:
  - Direct comparison is valid
  - Expected error rate: ±30%

For mixed adoption industries:
  - Consider Enigma data as revenue floor
  - Focus on trends rather than absolute values

For low adoption industries:
  - Use alternative metrics
  - Consider excluding from analysis
```

3. Focus on relevant metrics:
   - Growth rates for trend analysis
   - Relative market position
   - Transaction patterns

> **Expert Advice:** For the most accurate comparisons, start with businesses in high card adoption industries like retail and restaurants. This provides a baseline for understanding data quality before expanding to more complex cases.