# MillionVerifier - BulkAPI - File Upload

Upload file containing email addresses for verification.

**Endpoint:** `POST /bulkapi/v2/upload`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |

## Request Body Schema

**Content type:** `multipart/form-data`

| Parameter | Type | Description |
|-----------|------|-------------|
| `file_contents` | string \<binary\> | Request parameters for upload |

## Response (200 - Successful Request)

**Content type:** `application/json`

One of: `BulkapiUploadSuccess` | `BulkapiInsufficientCredits`

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `file_id` | string | The ID of the uploaded file |
| `file_name` | string | The name of the uploaded file |
| `status` | string | The status of the verification |
| `unique_emails` | integer | The number of unique emails found in the file |
| `updated_at` | string | The last update of the file |
| `createdate` | string | The date of creation |
| `percent` | integer | Progress percentage |
| `total_rows` | integer | Total rows in the file |
| `verified` | integer | Amount of verified |
| `unverified` | integer | Amount of unverified |
| `ok` | integer | Amount of ok emails |
| `catch_all` | integer | Amount of catch all emails |
| `disposable` | integer | Amount of disposable emails |
| `invalid` | integer | Amount of invalid emails |
| `unknown` | integer | Amount of unknown emails |
| `reverify` | integer | Amount of emails that needs to be reverified |
| `credit` | integer | Amount of credits needed for the verification of the file |
| `estimated_time_sec` | integer | Amount of estimated seconds it will take to verify the file |
| `error` | string | Any errors that happened with the file |

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/v2/upload?key=your-api-key',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array('file_contents'=> new CURLFILE('path/to/file')),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

## Response Example

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