# IDVs (Indefinite Delivery Vehicles)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/idvs/accounts/` | POST | Returns a list of federal accounts for the indicated IDV |
| `/api/v2/idvs/activity/` | POST | Returns information about child awards and grandchild awards for a given IDV |
| `/api/v2/idvs/amounts/<AWARD_ID>/` | GET | Returns the direct children of an IDV |
| `/api/v2/idvs/awards/` | POST | Returns IDVs or contracts related to the requested IDV award |
| `/api/v2/idvs/count/federal_account/<AWARD_ID>/` | GET | Returns the number of federal accounts associated with children and grandchild awards of an IDV |
| `/api/v2/idvs/funding/` | POST | Returns File C funding records associated with an IDV |
| `/api/v2/idvs/funding_rollup/` | POST | Returns aggregated count of awarding agencies, federal accounts, and total transaction obligated amount for all contracts under an IDV |
