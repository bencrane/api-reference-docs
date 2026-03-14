# Bulk Download

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/bulk_download/awards/` | POST | Generates zip file for download of award data in CSV format |
| `/api/v2/bulk_download/list_agencies/` | POST | Lists all the agencies and the subagencies or federal accounts associated under specific agencies |
| `/api/v2/bulk_download/list_monthly_files/` | POST | Lists the monthly files associated with the requested params |
| `/api/v2/bulk_download/status/` | GET | Returns the current status of a download job requested with the `v2/bulk_download/awards/` or `v2/bulk_download/transaction/` endpoint that same day |
