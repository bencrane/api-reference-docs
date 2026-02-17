# Resources - Rate Limits

> Source: https://documentation.enigma.com/resources/rate-limits

Rate limits are based on your Enigma account's [plan](https://www.enigma.com/pricing). All queries count towards the rate limit regardless of the query type.

---

## GraphQL API Rate Limits

Enigma's [GraphQL API](/guides/graphql/) has the following rate limits:

| **Plan** | **Rate Limit (RPS)** | **Burst Limit** | **Daily Limit (RPD)** |
|---|---|---|---|
| **Trial** | 10 | 20 | 100,000 |
| **Pro** | 50 | 100 | 500,000 |
| **Max** | 50 | 100 | 500,000 |
| **Enterprise** | 100 | 200 | No limit |

A `429 Slow Down` response code is returned if you hit a rate limit.

---

## MCP Tool Call Rate Limits

Each [MCP tool](/guides/ai-mcp/) has both daily and monthly rate limits:

- Daily rate limits are calculated on a rolling 24-hour window basis.
- Monthly rate limits are calculated on a rolling 30-day window basis.

Tool rate limits are independent of each other — hitting the rate limit for one tool does not impact utilization of other tools. When a tool hits a rate limit, it returns a `429 Slow Down` response code.

### Pro Plan Limits

| **Tool** | **Daily Limit (RPD)** | **Monthly Limit (RPM)** |
|---|---|---|
| `search_business` | 500 | 8000 |
| `get_brand_locations` | 500 | 8000 |
| `get_brand_legal_entities` | 500 | 8000 |
| `get_brand_card_analytics` | 500 | 8000 |
| `search_gov_archive` | 500 | 6000 |
| `generate_brands_segment` | 100 | 1000 |
| `generate_locations_segment` | 100 | 1000 |
| `search_kyb` | 100 | 2000 |
| `search_negative_news` | 100 | 2000 |

### Max Plan Limits

| **Tool** | **Daily Limit (RPD)** | **Monthly Limit (RPM)** |
|---|---|---|
| `search_business` | 500 | 8000 |
| `get_brand_locations` | 500 | 8000 |
| `get_brand_legal_entities` | 500 | 8000 |
| `get_brand_card_analytics` | 500 | 8000 |
| `search_gov_archive` | 500 | 6000 |
| `generate_brands_segment` | 100 | 1000 |
| `generate_locations_segment` | 100 | 1000 |
| `search_kyb` | 100 | 2000 |
| `search_negative_news` | 100 | 2000 |

### Enterprise Plan Limits

Enterprise plan rate limits are configurable based on your organization's needs. Please [contact us](https://www.enigma.com/contact-us) to discuss your needs.