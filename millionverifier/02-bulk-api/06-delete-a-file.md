# MillionVerifier - BulkAPI - Delete a File

This will delete a file uploaded to the bulk API.

**Endpoint:** `GET /bulkapi/v2/delete`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |
| `file_id` | Yes | string | `file_id=115` | The ID of the uploaded file |

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/v2/delete?key=your-api-key&file_id=115',
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