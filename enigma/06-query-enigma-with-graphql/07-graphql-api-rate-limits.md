# GraphQL API Rate Limits

URL: https://documentation.enigma.com/guides/graphql/rate-limits

Rate limits are based on your account's [plan](https://www.enigma.com/pricing) .

| **Plan** | **Rate Limit (RPS)** | **Burst Limit** | **Daily Request Quota** | **Description** 
| **Trial** | 10 | 20 | 100,000 | Basic usage plan for free tier 
| **Pro** | 50 | 100 | 500,000 | Professional usage plan 
| **Max** | 50 | 100 | 500,000 | Maximum usage plan 
| **Enterprise** | 100 | 200 | No limit | Enterprise usage plan with environment-specific limits 

A `429 Slow Down` response code is returned if you hit a rate limit.

## Other Rate Limits

GraphQL API rate limits are independent of other rate limits, including the [MCP tool rate limits](/resources/rate-limits) and the KYB API rate limit.