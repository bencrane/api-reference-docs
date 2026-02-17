# MillionVerifier - API Credits - Get Status

Get information of the available credits on your account.

**Endpoint:** `GET /api/v3/credits`

**Base URL:** `https://api.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `api` | Yes | string | `api=your-api-key` | Your API key |

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.millionverifier.com/api/v3/credits?api=your-api-key',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'GET',
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

## Response (200 - Successful Request)

**Content type:** `application/json`

```json
{
  "credits": 12345,
  "bulk_credits": 12345,
  "renewing_credits": 0,
  "plan": 4
}
```