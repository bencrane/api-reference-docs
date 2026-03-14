# Recipient

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/recipient/` | POST | Returns a list of recipients in USAspending DB |
| `/api/v2/recipient/children/<DUNS_OR_UEI>/` | GET | Returns recipient details based on DUNS or UEI number |
| `/api/v2/recipient/count/` | POST | Returns the count of recipients for the given filters |
| `/api/v2/recipient/duns/<HASH_VALUE>/` | GET | Returns a high-level overview of a specific recipient, given its id |
| `/api/v2/recipient/duns/` | POST | Returns a list of recipients in USAspending DB |
| `/api/v2/recipient/<HASH_VALUE>/` | GET | Returns an individual recipient in USAspending DB |
| `/api/v2/recipient/state/<FIPS>/` | GET | Returns basic information about the specified state |
| `/api/v2/recipient/state/` | GET | Returns basic information about the specified state |
| `/api/v2/recipient/state/awards/<FIPS>/` | GET | Returns award breakdown based on FIPS |
