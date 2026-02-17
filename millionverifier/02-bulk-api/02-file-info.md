# MillionVerifier - BulkAPI - File Info

Get info of the uploaded file.

**Endpoint:** `GET /bulkapi/v2/fileinfo`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |
| `file_id` | Yes | integer | `file_id=940` | The ID of the uploaded file |

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/v2/fileinfo?key=your-api-key&file_id=940',
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
  "file_id": "940",
  "file_name": "mails500.txt",
  "status": "in_progress",
  "unique_emails": 257,
  "updated_at": "2021-05-16 12:25:42",
  "createdate": "2021-05-16 12:25:42",
  "percent": 60,
  "total_rows": 500,
  "verified": 0,
  "unverified": 0,
  "ok": 0,
  "catch_all": 0,
  "disposable": 0,
  "invalid": 0,
  "unknown": 0,
  "reverify": 0,
  "credit": 0,
  "estimated_time_sec": 120,
  "error": ""
}
```