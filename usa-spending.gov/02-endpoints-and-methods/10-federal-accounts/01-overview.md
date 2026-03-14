# Federal Accounts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/` | GET | Returns a federal account based on its federal account code |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/available_object_classes/` | GET | Returns financial spending data by object class based on account's internal ID |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/fiscal_year_snapshot/<YEAR>/` | GET | Returns budget information for a federal account for the year provided based on account's internal ID |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/fiscal_year_snapshot/` | GET | Returns budget information for a federal account for the most recent year based on account's internal ID |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/object_classes/total/` | POST | Returns a list of object classes under a federal account including the sum of their obligation |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/program_activities/` | GET | Returns a list of program activities under a federal account based on its federal account code |
| `/api/v2/federal_accounts/<ACCOUNT_CODE>/program_activities/total` | POST | Returns a list of program activities including the sum of their obligations under a federal account based on its federal account code |
| `/api/v2/federal_accounts/` | POST | Returns financial spending data by object class |
