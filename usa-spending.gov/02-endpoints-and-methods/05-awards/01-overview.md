# Awards

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/awards/<AWARD_ID>/` | GET | Returns details about a specific award |
| `/api/v2/awards/accounts/` | POST | Returns a list of federal accounts for the indicated award |
| `/api/v2/awards/count/federal_account/<AWARD_ID>/` | GET | Returns the number of federal accounts associated with the award |
| `/api/v2/awards/count/subaward/<AWARD_ID>/` | GET | Returns the number of subawards associated with the award |
| `/api/v2/awards/count/transaction/<AWARD_ID>/` | GET | Returns the number of transactions associated with the award |
| `/api/v2/awards/funding` | POST | Returns federal account, awarding agencies, funding agencies, and transaction obligated amount information for a requested award |
| `/api/v2/awards/funding_rollup` | POST | Returns aggregated count of awarding agencies, federal accounts, and total transaction obligated amount for an award |
| `/api/v2/awards/last_updated/` | GET | Returns date of last update |
