# MillionVerifier - BulkAPI - Download Report

Download report of the verification result.

**Endpoint:** `GET /bulkapi/v2/download`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |
| `file_id` | Yes | string | `file_id=940` | The ID of the uploaded file |
| `filter` | Yes | string | `filter=all` | Download only filtered results |
| `statuses` | No | string | `statuses=ok,disposable,invalid` | When the 'custom' filter is used, result statuses can be given as comma separated values. If omitted, then all statuses will be in the results |
| `free` | No | string | — | When the 'custom' filter is used, this option decides whether to filter for free domains or not. If omitted, both type of domains will be in the results |
| `role` | No | string | — | When the 'custom' filter is used, this option decides whether to filter for role emails or not. If omitted, both type of emails will be in the results |

### filter Enum Values

`ok` | `ok_and_catch_all` | `unknown` | `invalid` | `all` | `custom`

### statuses Enum Values

`ok` | `catch_all` | `unknown` | `invalid` | `disposable`

### free Enum Values

`1` | `0`

### role Enum Values

`1` | `0`

## Request Example (PHP)

```php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/v2/download?key=your-api-key&file_id=940&filter=all',
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

**Example:** Invalid API Key

```json
{
  "error": "invalid_api_key"
}
```