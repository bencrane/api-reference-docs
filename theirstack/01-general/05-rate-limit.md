# TheirStack - General - Rate Limit

Learn how API rate limits work with tiered endpoints, sliding windows, IETF-compliant RateLimit headers, and HTTP 429 responses.

All API endpoints are rate limited to ensure reliability and fair usage. When a limit is exceeded, the API returns HTTP 429 Too Many Requests. Limits are applied per user (or per API key) with sliding windows; multiple windows may apply simultaneously.

## Tiered endpoints and limits

Endpoints covered by tier-based limits:

- POST `/v1/jobs/search` (Jobs Search)
- POST `/v1/companies/search` (Companies Search)
- POST `/v1/companies/technologies` (Technographics)

Shared limits across all three endpoints:

| Tier | API limits |
|------|-----------|
| Free | 4/second, 10/minute, 50/hour, 400/day |
| Paid | 4/second |

- **Paid tier** applies to users who have made at least one payment.
- **Free tier** applies to all other users (users who have never paid or users without any payments done).

Multiple limits are applied simultaneously. A request is rejected if it exceeds any active window.

## Rate limit headers

The API returns rate limit information in every response. We follow the IETF HTTPAPI draft for RateLimit headers: RateLimit header fields for HTTP. When multiple rate limits apply, header items are comma-separated and ordered consistently across headers.

### IETF compliant headers

- `RateLimit`: Current quota status per policy. Format: `"<policy-name>"; r=<remaining-requests>; t=<time-until-reset>; pk=<partition-key>`.
- `RateLimit-Policy`: Applied policy definition. Format: `"<policy-name>"; q=<limit>; w=<window-seconds>`.

### Other headers

These are included for client convenience:

- `RateLimit-Limit`: Total allowed requests for each window
- `RateLimit-Remaining`: Requests remaining in each window
- `RateLimit-Reset`: Seconds until the current window resets

The order of values in legacy headers matches the order of `RateLimit` items.

### Example response headers

```
RateLimit: "per-second";r=3;t=1;pk="dXNlcjoxMjM0", "per-minute";r=9;t=60;pk="dXNlcjoxMjM0", "per-hour";r=49;t=3600;pk="dXNlcjoxMjM0", "per-day";r=399;t=86400;pk="dXNlcjoxMjM0"
RateLimit-Policy: "per-second";q=4;w=1, "per-minute";q=10;w=60, "per-hour";q=50;w=3600, "per-day";q=400;w=86400
RateLimit-Limit: 4, 10, 50, 400
RateLimit-Remaining: 3, 9, 49, 399
RateLimit-Reset: 1, 60, 3600, 86400
```

## Exceeding limits and best practices

- Retry with exponential backoff on HTTP 429 responses.
- Monitor `RateLimit` or `RateLimit-Remaining` and `RateLimit-Reset` to avoid hitting limits.
- Prefer batching and caching to reduce request counts.
- Avoid concurrent bursts that violate per-second limits.