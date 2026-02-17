# MillionVerifier - BulkAPI - Files List

Get a list of files according to the given filters.

**Endpoint:** `GET /bulkapi/v2/filelist`

**Base URL:** `https://bulkapi.millionverifier.com`

## Query Parameters

| Parameter | Required | Type | Example | Description |
|-----------|----------|------|---------|-------------|
| `key` | Yes | string | `key=your-api-key` | Your API key |
| `offset` | No | integer | `offset=0` | Offset for pagination |
| `limit` | No | integer | `limit=25` | The amount of files to show on one page. Defaults to 50, which is also the maximum amount that can be used for limit |
| `id` | No | integer | `id=1` | Filter for file IDs. To filter for multiple file IDs, use comma separated values e.g.: `id=1,2,3` |
| `name` | No | string | `name=myfile.txt` | Filter for file name. It checks if any of the file names contain the given filter |
| `status` | No | string | `status=in_progress,error` | Filter for file state. To filter for multiple file states, use comma separated values e.g.: `status=in_progress,finished`. Any state type that does not match the possible values will be ignored |
| `updated_at_from` | No | string \<yyyy-MM-dd HH:mm:ss\> | `updated_at_from=2023-01-01 15:00:05` | Filter for files that were updated after the given date time. If the given value does not match the format, the filter will be ignored |
| `updated_at_to` | No | string \<yyyy-MM-dd HH:mm:ss\> | `updated_at_to=2023-01-01 15:00:05` | Filter for files that were updated before the given date time. If the given value does not match the format, the filter will be ignored |
| `createdate_from` | No | string \<yyyy-MM-dd HH:mm:ss\> | `createdate_from=2023-01-01 15:00:05` | Filter for files that were created after the given date time. If the given value does not match the format, the filter will be ignored |
| `createdate_to` | No | string \<yyyy-MM-dd HH:mm:ss\> | `createdate_to=2023-01-01 15:00:05` | Filter for files that were created before the given date time. If the given value does not match the format, the filter will be ignored |
| `percent_from` | No | integer | `percent_from=50` | Filter for files that has a progress over the given percentage |
| `percent_to` | No | integer | `percent_to=75` | Filter for files that has a progress below the given percentage |
| `has_error` | No | string | `has_error=0` | Filter for files that either had or didn't have any errors. It accepts boolean values. Any other values will be ignored |

### Status Enum Values

`in_progress` | `error` | `finished` | `canceled` | `paused` | `in_queue_to_start`

### has_error Accepted Values

`1` | `t` | `T` | `TRUE` | `True` | `true` | `0` | `f` | `F` | `FALSE` | `False` | `false`

## Request Example (PHP)

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://bulkapi.millionverifier.com/bulkapi/v2/filelist?key=your-api-key&offset=0&limit=0&status=in_progress&updated_at_from=2023-01-18%2015:00:00&percent_from=5&percent_to=75&has_error=0',
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
  "files": [
    {}
  ],
  "total": 1
}
```