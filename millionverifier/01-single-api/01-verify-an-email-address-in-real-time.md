# MillionVerifier - Single API - Verify an email address in real time

Verify an email address in real time as your subscriber signs up to your newsletter. For cleaning larger databases please use the Bulk API.

Special characters in the email address should be encoded.

## Demo API Keys

| Key | Description |
|-----|-------------|
| `API_KEY_FOR_TEST` | Returns with a random response |
| `API_KEY_FOR_UNVERIFIED` | |
| `API_KEY_FOR_OK` | |
| `API_KEY_FOR_CATCH_ALL` | |
| `API_KEY_FOR_INVALID` | |
| `API_KEY_FOR_UNKOWN` | |
| `API_KEY_FOR_DISPOSABLE` | |
| `API_KEY_FOR_ERROR_NO_EMAIL` | |
| `API_KEY_FOR_ERROR_NO_APIKEY` | |
| `API_KEY_FOR_ERROR_INVALID_APIKEY` | |
| `API_KEY_FOR_ERROR_INSUFFICIENT_CREDITS` | |
| `API_KEY_FOR_ERROR_IP_ADDRESS_BLOCKED` | |
| `API_KEY_FOR_ERROR_INTERNAL_ERROR` | |

## Verify an Email Address in Real Time

Verify an email address in real time and get results in just a second.

**Endpoint:** `GET /api/v3`

**Base URL:** `https://api.millionverifier.com`

### Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `api` | Yes | string | `api=your-api-key` | Your API key |
| `email` | Yes | string | `email=test@example.com` | Email address that needs to be verified |
| `timeout` | No | integer | `timeout=10` | Time in seconds to terminate the connection in case no response received from the recipient server. You can set between 2 and 60 seconds. Default timeout is 20 seconds. |

### Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.millionverifier.com/api/v3/?api=your-api-key&email=test@example.com&timeout=10',
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

### Response (200 - Successful Request)

**Content type:** `application/json`

```json
{
  "email": "bademail@gmal.com",
  "quality": "good",
  "result": "invalid",
  "resultcode": 6,
  "subresult": "unknown",
  "free": false,
  "role": false,
  "didyoumean": "bademail@gmail.com",
  "credits": 3454,
  "executiontime": 2,
  "error": "",
  "livemode": true
}
```