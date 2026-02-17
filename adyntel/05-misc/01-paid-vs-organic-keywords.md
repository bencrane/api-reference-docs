# Adyntel - Paid vs. Organic Keywords

## INTELLIGENCE — Paid vs. Organic Keywords

You first need to create an account, you can sign up [here](https://app.adyntel.com/signup) to receive 50 credits to test it out.

This endpoint offers an overview of paid and organic keywords for a domain, with estimation of budgets and CPC included.

Company domain has to be passed in the `company.com` format, meaning all prefixes like `https://` or `www.` need to be removed.

---

## API Endpoint

```
POST api.adyntel.com/domain-keywords
```

Get paid and organic keyword details using the company domain as input.

### Headers

| Name         | Value            | Required |
|--------------|------------------|----------|
| Content-Type | application/json | ✅       |

### Body

| Name           | Type   | Description                              | Required |
|----------------|--------|------------------------------------------|----------|
| api_key        | string | Adyntel API key                          | ✅       |
| email          | string | Adyntel account email                    | ✅       |
| company_domain | string | Company website (without www or http)    | ✅       |

---

## Example Request

```json
{
    "api_key": "hd-nndgi7gy6b3kdsgd-a",
    "email": "elon@tesla.com",
    "company_domain": "lokalise.com"
}
```

---

## Example Response

The `organic` and `paid` objects contain absolute numbers. The `organic_percentages` and `paid_percentages` objects contain the same metrics as percentages. For example, `pos_1` from `organic_percentages` is calculated by dividing `pos_1` by `count` from `organic`, representing the percentage of organic keywords ranking 1st out of all keywords.

```json
{
    "organic": {
        "pos_1": 379,
        "pos_2_3": 1035,
        "pos_4_10": 3364,
        "pos_11_20": 4110,
        "pos_21_30": 4835,
        "pos_31_40": 4781,
        "pos_41_50": 3728,
        "pos_51_60": 2663,
        "pos_61_70": 2260,
        "pos_71_80": 2022,
        "pos_81_90": 1540,
        "pos_91_100": 1004,
        "count": 31721,
        "is_new": 11585,
        "is_up": 9083,
        "is_down": 8971,
        "is_lost": 0,
        "estimated_traffic": 371656
    },
    "organic_percentages": {
        "pos_1": 1.19,
        "pos_2_3": 3.26,
        "pos_4_10": 10.6,
        "pos_11_20": 12.96,
        "pos_21_30": 15.24,
        "pos_31_40": 15.07,
        "pos_41_50": 11.75,
        "pos_51_60": 8.4,
        "pos_61_70": 7.12,
        "pos_71_80": 6.37,
        "pos_81_90": 4.85,
        "pos_91_100": 3.17,
        "is_new": 36.52,
        "is_up": 28.63,
        "is_down": 28.28,
        "is_lost": 0.0
    },
    "paid": {
        "pos_1": 82,
        "pos_2_3": 11,
        "pos_4_10": 1,
        "pos_11_20": 0,
        "pos_21_30": 0,
        "pos_31_40": 0,
        "pos_41_50": 0,
        "pos_51_60": 0,
        "pos_61_70": 0,
        "pos_71_80": 0,
        "pos_81_90": 0,
        "pos_91_100": 0,
        "count": 94,
        "is_new": 88,
        "is_up": 1,
        "is_down": 1,
        "is_lost": 0,
        "estimated_traffic": 8812,
        "estimated_ad_budget": 47297,
        "estimated_avg_cpc": 5.37
    },
    "paid_percentages": {
        "pos_1": 87.23,
        "pos_2_3": 11.7,
        "pos_4_10": 1.06,
        "pos_11_20": 0.0,
        "pos_21_30": 0.0,
        "pos_31_40": 0.0,
        "pos_41_50": 0.0,
        "pos_51_60": 0.0,
        "pos_61_70": 0.0,
        "pos_71_80": 0.0,
        "pos_81_90": 0.0,
        "pos_91_100": 0.0,
        "is_new": 93.62,
        "is_up": 1.06,
        "is_down": 1.06,
        "is_lost": 0.0
    }
}
```

---

## Response Attributes

### Organic / Paid Objects (Absolute Numbers)

| Attribute           | Type    | Description                                              |
|---------------------|---------|----------------------------------------------------------|
| pos_1               | integer | Keywords ranking in position 1.                          |
| pos_2_3             | integer | Keywords ranking in positions 2–3.                       |
| pos_4_10            | integer | Keywords ranking in positions 4–10.                      |
| pos_11_20           | integer | Keywords ranking in positions 11–20.                     |
| pos_21_30           | integer | Keywords ranking in positions 21–30.                     |
| pos_31_40           | integer | Keywords ranking in positions 31–40.                     |
| pos_41_50           | integer | Keywords ranking in positions 41–50.                     |
| pos_51_60           | integer | Keywords ranking in positions 51–60.                     |
| pos_61_70           | integer | Keywords ranking in positions 61–70.                     |
| pos_71_80           | integer | Keywords ranking in positions 71–80.                     |
| pos_81_90           | integer | Keywords ranking in positions 81–90.                     |
| pos_91_100          | integer | Keywords ranking in positions 91–100.                    |
| count               | integer | Total number of keywords.                                |
| is_new              | integer | Keywords newly ranking.                                  |
| is_up               | integer | Keywords that moved up in ranking.                       |
| is_down             | integer | Keywords that moved down in ranking.                     |
| is_lost             | integer | Keywords that lost ranking entirely.                     |
| estimated_traffic   | integer | Estimated traffic from these keywords.                   |
| estimated_ad_budget | integer | Estimated ad spend budget. **Paid only.**                |
| estimated_avg_cpc   | float   | Estimated average cost per click. **Paid only.**         |

### Organic Percentages / Paid Percentages Objects

Same position range keys (`pos_1`, `pos_2_3`, etc.) and movement keys (`is_new`, `is_up`, `is_down`, `is_lost`) as above, but values are **floats representing percentages** of the total keyword count.