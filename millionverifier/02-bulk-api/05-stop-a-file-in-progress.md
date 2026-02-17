# MillionVerifier - BulkAPI - Stop a File in Progress

This will cancel the file in progress and the results for already verified emails can be downloaded in a few seconds.

**Endpoint:** `GET /bulkapi/stop`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |
| `file_id` | Yes | string | `file_id=940` | The ID of the uploaded file |

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/stop?key=your-api-key&file_id=942',
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
  "result": "ok"
}
```