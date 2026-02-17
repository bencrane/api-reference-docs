# Batch Processing

URL: https://documentation.enigma.com/screening/api/batch

For high-volume screening needs, the batch processing API allows you to submit Excel files containing multiple entities to screen and retrieve results asynchronously.

Batch API Availability
Batch processing endpoints are available upon request. Contact your Enigma representative to enable batch processing for your account.

## Start Batch Job

Upload an Excel file and start a batch screening job.

```bash
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/batch/start' \
--header 'x-api-key: <YOUR API KEY>' \
--form 'file=@"/path/to/your/screening_batch.xlsx"'
```

### Request Details

- **Content-Type** : `multipart/form-data`
- **File field name** : `file`
- **Supported formats** : `.xlsx` , `.xls`

### Excel File Format

Batch screening currently supports screening individuals only (not organizations). The Excel file must include a header row with the following columns:

| Column | Description | Required 
| `#` | Row number or unique identifier | Yes 
| `First Name` | Individual's first name | Yes 
| `Last Name` | Individual's last name | Yes 
| `Date of Birth` | Date of birth in `YYYYMMDD` format (e.g., `19740710` ) | No 
| `Nationality` | Country of nationality | No 
| `Passport Number` | Government-issued passport number | No 
| `Passport Issued Country` | Country that issued the passport | No 

**Example:**

| # | First Name | Last Name | Date of Birth | Nationality | Passport Number | Passport Issued Country 
| 1 | John | Hanafin | 19740710 | Ireland | AB123456 | Ireland 
| 2 | Maria | Garcia | 19850315 | Spain | XY789012 | Spain 

### Response

```json
{
  "run_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## Get Batch Job Status

Check the status of a batch job.

```bash
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/batch/status/<run_id>' \
--header 'x-api-key: <YOUR API KEY>'
```

### Response

```json
{
  "run_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "status": "SUCCESS"
}
```

### Status Values

| Status | Description 
| `QUEUED` | Job is waiting to be processed 
| `STARTED` | Job is currently running 
| `SUCCESS` | Job completed successfully 
| `FAILURE` | Job failed 
| `CANCELED` | Job was canceled 

## Get Batch Job Results

Download the results of a completed batch job.

```bash
# Get raw results
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/batch/results/<run_id>?type=raw' \
--header 'x-api-key: <YOUR API KEY>' \
--output results.csv

# Get web screen report format
curl --location --request POST 'https://api.enigma.com/evaluation/sanctions/batch/results/<run_id>?type=web_screen' \
--header 'x-api-key: <YOUR API KEY>' \
--output web_screen_results.csv
```

### Query Parameters

| Parameter | Description | Required 
| `type` | Result format: `raw` or `web_screen` | No (default: `raw` ) 

## Use Cases

Batch processing is ideal for:

- **Periodic screening** : Re-screen your entire customer base against updated watchlists
- **Onboarding** : Screen large batches of new customers during onboarding
- **Historical review** : Screen historical records that weren't previously screened
- **List updates** : Re-screen after watchlist additions or changes