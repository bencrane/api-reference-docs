# Account - Analytics API

> Monitor your API usage with comprehensive analytics endpoints.

## Overview

Get detailed insights into your API usage, credit consumption, and performance metrics. All analytics endpoints are **free** — they consume zero credits and have no rate limits.

**Base URL:** `https://api.leadmagic.io`

### Authentication

| Header      | Type   | Required | Description         |
|-------------|--------|----------|---------------------|
| `X-API-Key` | string | Yes      | Your LeadMagic API key (case-insensitive header name) |

---

## Quick Reference

| Endpoint                  | Method | Description                | Best For                       |
|---------------------------|--------|----------------------------|--------------------------------|
| `/v1/analytics/dashboard` | GET    | Real-time account status   | Live dashboards, health checks |
| `/v1/analytics/usage`     | GET    | Daily usage summary        | Weekly/monthly reports         |
| `/v1/analytics/products`  | GET    | Per-product breakdown      | Cost optimization              |
| `/v1/analytics/credits`   | GET    | Credit consumption history | Spend tracking                 |
| `/v1/analytics/summary`   | GET    | All-time statistics        | Account overview               |
| `/v1/analytics/daily`     | GET    | Daily performance metrics  | SLA monitoring                 |
| `/v1/analytics/day/:date` | GET    | Single day breakdown       | Debugging, audits              |

---

## Dashboard

Get a real-time snapshot of your account status including credits, rate limits, and usage statistics.

```
GET /v1/analytics/dashboard
```

### Examples

#### cURL

```bash
curl 'https://api.leadmagic.io/v1/analytics/dashboard' \
  -H 'X-API-Key: YOUR_API_KEY'
```

#### Node.js

```javascript
const response = await fetch('https://api.leadmagic.io/v1/analytics/dashboard', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});
const dashboard = await response.json();
```

#### Python

```python
import requests

response = requests.get(
    'https://api.leadmagic.io/v1/analytics/dashboard',
    headers={'X-API-Key': 'YOUR_API_KEY'}
)
dashboard = response.json()
```

#### Go

```go
req, _ := http.NewRequest("GET", "https://api.leadmagic.io/v1/analytics/dashboard", nil)
req.Header.Set("X-API-Key", "YOUR_API_KEY")
resp, _ := http.DefaultClient.Do(req)
```

### Response

```json
{
  "user": {
    "id": "user_abc123",
    "email": "developer@company.com"
  },
  "credits": {
    "current": 15432.50,
    "formatted": "$154.33"
  },
  "rate_limit": {
    "minute": {
      "limit": 3000,
      "used": 45,
      "remaining": 2955,
      "utilization": 1.5
    },
    "daily": {
      "limit": 500000,
      "used": 12500,
      "remaining": 487500,
      "utilization": 2.5
    }
  },
  "concurrency": {
    "current": 0,
    "peak": 23,
    "active_reservations": 0
  },
  "stats": {
    "today": {
      "requests": 1250,
      "credits": 875.50,
      "chargeable_requests": 1100,
      "chargeable_rate": 88.0,
      "unique_products": 5
    },
    "this_week": {
      "requests": 8500,
      "credits": 5200.25,
      "chargeable_requests": 7200,
      "chargeable_rate": 84.7,
      "unique_products": 8
    },
    "this_month": {
      "requests": 45000,
      "credits": 28500.00,
      "chargeable_requests": 38000,
      "chargeable_rate": 84.4,
      "unique_products": 12
    }
  }
}
```

### Response Fields

#### `user` (object)

| Field   | Type   | Description              |
|---------|--------|--------------------------|
| `id`    | string | Unique user identifier   |
| `email` | string | Account email address    |

#### `credits` (object)

| Field       | Type   | Description                             |
|-------------|--------|-----------------------------------------|
| `current`   | number | Raw credit balance (1 credit = $0.01)   |
| `formatted` | string | Human-readable dollar value             |

#### `rate_limit` (object)

Each sub-object (`minute`, `daily`) contains:

| Field         | Type   | Description                          |
|---------------|--------|--------------------------------------|
| `limit`       | number | Maximum requests allowed             |
| `used`        | number | Requests used in current window      |
| `remaining`   | number | Requests remaining in current window |
| `utilization` | number | Percentage of limit used (0–100)     |

#### `concurrency` (object)

| Field                 | Type   | Description                        |
|-----------------------|--------|------------------------------------|
| `current`             | number | Currently in-flight requests       |
| `peak`                | number | Peak concurrent requests (session) |
| `active_reservations` | number | Credit reservations pending        |

#### `stats` (object)

Each time window (`today`, `this_week`, `this_month`) contains:

| Field                 | Type   | Description                            |
|-----------------------|--------|----------------------------------------|
| `requests`            | number | Total API requests                     |
| `credits`             | number | Total credits consumed                 |
| `chargeable_requests` | number | Requests that consumed credits         |
| `chargeable_rate`     | number | Percentage of requests charged         |
| `unique_products`     | number | Number of different endpoints used     |

---

## Usage Summary

Get aggregated usage metrics over a time period with daily breakdown.

```
GET /v1/analytics/usage?days=30
```

### Parameters

| Parameter | Type   | Default | Description                |
|-----------|--------|---------|----------------------------|
| `days`    | number | 30      | Number of days to include (1–90) |

### Response

```json
{
  "period": {
    "start": "2025-10-02",
    "end": "2025-11-01",
    "days": 30
  },
  "summary": {
    "total_requests": 45000,
    "chargeable_requests": 38000,
    "total_credits": 28500.00,
    "avg_credits_per_request": 0.63,
    "chargeable_rate": 84.4,
    "unique_products": 12
  },
  "daily": [
    {
      "date": "2025-11-01",
      "total_requests": 1250,
      "chargeable_requests": 1100,
      "total_credits": 875.50,
      "unique_products_used": 5
    }
  ]
}
```

> **Tip:** `chargeable_rate` shows what percentage of your requests consumed credits. A lower rate means more free results (catch-all emails, not-found responses, etc.).

---

## Products Breakdown

Get per-product usage with requests, credits, and success rates. Essential for cost optimization.

```
GET /v1/analytics/products?days=30
```

### Parameters

| Parameter | Type   | Default | Description                |
|-----------|--------|---------|----------------------------|
| `days`    | number | 30      | Number of days to include (1–90) |

### Response

```json
{
  "period": {
    "start": "2025-10-02",
    "end": "2025-11-01",
    "days": 30
  },
  "products": {
    "email_validation": {
      "total_requests": 20000,
      "total_credits": 1000.00,
      "successful_requests": 19500,
      "failed_requests": 500,
      "success_rate": 97.5,
      "avg_credits_per_request": 0.05
    },
    "email_finder": {
      "total_requests": 10000,
      "total_credits": 8500.00,
      "successful_requests": 8500,
      "failed_requests": 1500,
      "success_rate": 85.0,
      "avg_credits_per_request": 0.85
    }
  },
  "daily": [...]
}
```

> **Note:** `success_rate` means data was found. For email finder, 85% success means 85% of lookups returned an email. You only pay for successful results.

---

## Credit History

Get credit consumption history with daily breakdown. Perfect for spend tracking and budgeting.

```
GET /v1/analytics/credits?days=30
```

### Parameters

| Parameter | Type   | Default | Description                |
|-----------|--------|---------|----------------------------|
| `days`    | number | 30      | Number of days to include (1–90) |

### Response

```json
{
  "period": {
    "start": "2025-10-02",
    "end": "2025-11-01",
    "days": 30
  },
  "summary": {
    "total_credits": 28500.00,
    "total_requests": 45000,
    "chargeable_requests": 38000,
    "avg_credits_per_request": 0.63,
    "chargeable_rate": 84.4
  },
  "daily": [
    {
      "date": "2025-11-01",
      "total_credits": 875.50,
      "total_requests": 1250,
      "chargeable_requests": 1100
    }
  ]
}
```

---

## All-Time Summary

Get lifetime statistics for your account, or specify a custom date range.

```
GET /v1/analytics/summary
GET /v1/analytics/summary?start_date=2025-10-01&end_date=2025-11-01
```

### Parameters

| Parameter    | Type   | Required | Description                   |
|--------------|--------|----------|-------------------------------|
| `start_date` | string | No       | Start date (YYYY-MM-DD)       |
| `end_date`   | string | No       | End date (YYYY-MM-DD)         |

### Response

```json
{
  "total_api_requests": 1250000,
  "total_credits_consumed": 425000.50,
  "unique_products_used": 15,
  "successful_requests": 1150000,
  "failed_requests": 100000,
  "success_rate": 92.0,
  "avg_response_time_ms": 245,
  "first_request": "2023-06-15T10:30:00.000Z",
  "last_request": "2025-11-01T14:22:00.000Z"
}
```

---

## Daily Metrics

Get detailed daily metrics including latency percentiles and error rates. Essential for SLA monitoring.

```
GET /v1/analytics/daily?days=30
```

### Parameters

| Parameter | Type   | Default | Description                |
|-----------|--------|---------|----------------------------|
| `days`    | number | 30      | Number of days to include (1–90) |

### Response

```json
{
  "period": {
    "start": "2025-10-02",
    "end": "2025-11-01",
    "days": 30
  },
  "data": [
    {
      "date": "2025-11-01",
      "total_requests": 1250,
      "successful_requests": 1175,
      "failed_requests": 75,
      "total_credits": 875.50,
      "p50_latency_ms": 180,
      "p95_latency_ms": 450,
      "p99_latency_ms": 890,
      "error_rate": 6.0
    }
  ]
}
```

### Latency Percentiles

| Metric           | Description                            |
|------------------|----------------------------------------|
| `p50_latency_ms` | Median response time (50th percentile) |
| `p95_latency_ms` | 95% of requests faster than this       |
| `p99_latency_ms` | 99% of requests faster than this       |

---

## Day Breakdown

Get per-product breakdown for a specific day. Perfect for debugging and audits.

```
GET /v1/analytics/day/2025-11-01
```

### Response

```json
{
  "date": "2025-11-01",
  "summary": {
    "total_credits": 875.50,
    "total_requests": 1250,
    "products_count": 8
  },
  "products": [
    {
      "product_id": "email_validation",
      "requests": 500,
      "credits": 25.00,
      "credits_percentage": 2.86,
      "avg_credits_per_request": 0.05,
      "max_credits": 0.05
    },
    {
      "product_id": "email_finder",
      "requests": 350,
      "credits": 297.50,
      "credits_percentage": 34.00,
      "avg_credits_per_request": 0.85,
      "max_credits": 1.00
    }
  ]
}
```

---

## Practical Examples

### Build a Real-Time Dashboard

Fetch all metrics in parallel for a comprehensive dashboard:

```javascript
const headers = { 'X-API-Key': process.env.LEADMAGIC_API_KEY };

async function getDashboardMetrics() {
  const [dashboard, usage, products, daily] = await Promise.all([
    fetch('https://api.leadmagic.io/v1/analytics/dashboard', { headers }),
    fetch('https://api.leadmagic.io/v1/analytics/usage?days=7', { headers }),
    fetch('https://api.leadmagic.io/v1/analytics/products?days=7', { headers }),
    fetch('https://api.leadmagic.io/v1/analytics/daily?days=7', { headers })
  ]).then(responses => Promise.all(responses.map(r => r.json())));
  
  return {
    // Account health
    credits: dashboard.data.credits.current,
    creditsFormatted: dashboard.data.credits.formatted,
    
    // Rate limits
    minuteUtilization: dashboard.data.rate_limit.minute.utilization,
    dailyUtilization: dashboard.data.rate_limit.daily.utilization,
    
    // Weekly stats
    weeklyRequests: usage.data.summary.total_requests,
    weeklyCredits: usage.data.summary.total_credits,
    chargeableRate: usage.data.summary.chargeable_rate,
    
    // Top products by spend
    topProducts: Object.entries(products.data.products)
      .sort((a, b) => b[1].total_credits - a[1].total_credits)
      .slice(0, 5),
    
    // Performance
    avgLatency: daily.data.data.reduce((sum, d) => sum + d.p50_latency_ms, 0) / daily.data.data.length,
    avgErrorRate: daily.data.data.reduce((sum, d) => sum + d.error_rate, 0) / daily.data.data.length
  };
}
```

### Set Up Usage Alerts

Monitor credits and rate limits to prevent service interruptions:

```javascript
async function checkAndAlert() {
  const response = await fetch('https://api.leadmagic.io/v1/analytics/dashboard', {
    headers: { 'X-API-Key': process.env.LEADMAGIC_API_KEY }
  });
  const { data } = await response.json();
  
  const alerts = [];
  
  // Credit alerts
  if (data.credits.current < 100) {
    alerts.push({
      level: 'critical',
      message: `Credits critically low: ${data.credits.formatted}`
    });
  } else if (data.credits.current < 1000) {
    alerts.push({
      level: 'warning', 
      message: `Credits running low: ${data.credits.formatted}`
    });
  }
  
  // Rate limit alerts
  if (data.rate_limit.daily.utilization > 90) {
    alerts.push({
      level: 'warning',
      message: `Daily rate limit at ${data.rate_limit.daily.utilization}%`
    });
  }
  
  if (data.rate_limit.minute.utilization > 80) {
    alerts.push({
      level: 'warning',
      message: `Minute rate limit at ${data.rate_limit.minute.utilization}%`
    });
  }
  
  // Send alerts via Slack, email, PagerDuty, etc.
  for (const alert of alerts) {
    await sendAlert(alert);
  }
  
  return alerts;
}

// Run every 5 minutes
setInterval(checkAndAlert, 5 * 60 * 1000);
```

### Analyze and Optimize Spending

Identify which products consume the most credits:

```python
import requests

def analyze_spending():
    headers = {'X-API-Key': 'YOUR_API_KEY'}
    
    # Get last 30 days of product usage
    response = requests.get(
        'https://api.leadmagic.io/v1/analytics/products?days=30',
        headers=headers
    )
    data = response.json()['data']
    
    # Calculate cost breakdown
    products = data['products']
    total_credits = sum(p['total_credits'] for p in products.values())
    
    print(f"Total spend: ${total_credits * 0.01:.2f}")
    print("\nBreakdown by product:")
    
    for product_id, stats in sorted(
        products.items(), 
        key=lambda x: x[1]['total_credits'], 
        reverse=True
    ):
        percentage = (stats['total_credits'] / total_credits) * 100
        cost = stats['total_credits'] * 0.01
        
        print(f"  {product_id}:")
        print(f"    Requests: {stats['total_requests']:,}")
        print(f"    Credits: {stats['total_credits']:,.2f} ({percentage:.1f}%)")
        print(f"    Cost: ${cost:.2f}")
        print(f"    Success rate: {stats['success_rate']}%")
        print(f"    Avg per request: {stats['avg_credits_per_request']:.3f}")
        print()
```

### Track Performance SLAs

Monitor latency and error rates against your SLA targets:

```javascript
const SLA_TARGETS = {
  p95_latency_ms: 1000,  // 1 second
  p99_latency_ms: 2000,  // 2 seconds
  error_rate: 5.0        // 5%
};

async function checkSLA() {
  const response = await fetch(
    'https://api.leadmagic.io/v1/analytics/daily?days=7',
    { headers: { 'X-API-Key': process.env.LEADMAGIC_API_KEY } }
  );
  const { data } = await response.json();
  
  const violations = [];
  
  for (const day of data.data) {
    if (day.p95_latency_ms > SLA_TARGETS.p95_latency_ms) {
      violations.push({
        date: day.date,
        metric: 'p95_latency',
        value: day.p95_latency_ms,
        target: SLA_TARGETS.p95_latency_ms
      });
    }
    
    if (day.error_rate > SLA_TARGETS.error_rate) {
      violations.push({
        date: day.date,
        metric: 'error_rate',
        value: day.error_rate,
        target: SLA_TARGETS.error_rate
      });
    }
  }
  
  return {
    period: data.period,
    violations,
    slaCompliant: violations.length === 0
  };
}
```

---

## Best Practices

### Cache Dashboard Responses

Analytics endpoints are free, but caching improves your dashboard performance:

```javascript
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 1000; // 1 minute

async function getCachedDashboard() {
  if (cache.data && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }
  
  const response = await fetch('https://api.leadmagic.io/v1/analytics/dashboard', {
    headers: { 'X-API-Key': process.env.LEADMAGIC_API_KEY }
  });
  
  cache = { data: await response.json(), timestamp: Date.now() };
  return cache.data;
}
```

### Use Response Headers Instead

Every API response includes `X-Credits-Remaining` — use this instead of polling the dashboard:

```javascript
const response = await fetch('https://api.leadmagic.io/v1/people/email-validation', {
  method: 'POST',
  headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
});

const creditsRemaining = response.headers.get('X-Credits-Remaining');
const requestId = response.headers.get('X-Request-Id');

console.log(`Credits after request: ${creditsRemaining}`);
```

### Batch Analytics Calls

Fetch multiple analytics endpoints in parallel:

```javascript
const [dashboard, products, daily] = await Promise.all([
  fetch('/v1/analytics/dashboard', { headers }),
  fetch('/v1/analytics/products?days=30', { headers }),
  fetch('/v1/analytics/daily?days=30', { headers })
]).then(responses => Promise.all(responses.map(r => r.json())));
```

### Set Up Regular Reporting

Schedule weekly reports using cron or serverless functions:

```javascript
async function generateWeeklyReport() {
  const [usage, products] = await Promise.all([
    fetch('/v1/analytics/usage?days=7', { headers }).then(r => r.json()),
    fetch('/v1/analytics/products?days=7', { headers }).then(r => r.json())
  ]);
  
  return {
    period: usage.data.period,
    totalRequests: usage.data.summary.total_requests,
    totalCredits: usage.data.summary.total_credits,
    topProducts: Object.entries(products.data.products)
      .sort((a, b) => b[1].total_credits - a[1].total_credits)
      .slice(0, 5)
      .map(([id, stats]) => ({ id, ...stats }))
  };
}
```

---

## Error Response (401 — Unauthorized)

```json
{
  "success": false,
  "errors": [
    {
      "type": "https://api.leadmagic.io/errors/missing_authentication",
      "title": "Authentication required. Provide a valid API key in the X-API-Key header (case-insensitive).",
      "status": 401,
      "code": "missing_authentication",
      "docs": "https://docs.leadmagic.io/api-reference/authentication"
    }
  ],
  "meta": {
    "request_id": "ea6e3248-f4d2-437d-bca3-20881b529129",
    "timestamp": "2024-02-01T12:00:00.000Z"
  }
}
```

---

## See Also

- **Check Credits** (`/v1/credits`) — Simple endpoint to check your current balance.
- **Rate Limits** — Learn about rate limiting and how to stay within limits.