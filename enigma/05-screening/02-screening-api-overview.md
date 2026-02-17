# API REFERENCE - Screening API Overview

URL: https://documentation.enigma.com/screening/api/

The Enigma Screening API provides a comprehensive set of endpoints for sanctions and watchlist screening. This section documents all available endpoints and their usage.

---

## Authentication

All API requests require authentication via API key in the request header:

```bash
--header 'x-api-key: <YOUR API KEY>'
--header 'Account-Name: <YOUR ACCOUNT NAME>'
```

## Base URL

All endpoints use the base URL:

```
https://api.enigma.com/evaluation/sanctions/
```

## Available Endpoints

| Endpoint Category | Description |
|---|---|
| [Core Screening](/screening/api/core-endpoints) | Screen customers and transactions against watchlists |
| [Decisions](/screening/api/decisions) | Retrieve and update screening decisions |
| [Batch Processing](/screening/api/batch) | Process high-volume screening via file upload (available on request) |

## Request Format

All POST requests should use `Content-Type: application/json` and include a JSON body.

## Response Format

All responses are returned as JSON. Successful responses include the requested data, while error responses include an error message and appropriate HTTP status code.