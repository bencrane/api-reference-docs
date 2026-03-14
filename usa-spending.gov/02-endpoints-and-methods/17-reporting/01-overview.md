# Reporting

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v2/reporting/agencies/<TOPTIER_CODE>/differences/` | GET | Returns About the Data information about differences in account balance and spending obligations for a specific agency/year/period |
| `/api/v2/reporting/agencies/<TOPTIER_CODE>/discrepancies/` | GET | Returns TAS discrepancies of the specified agency's submission data for a specific FY/FP |
| `/api/v2/reporting/agencies/<TOPTIER_CODE>/overview/` | GET | Returns a list of submission data for the provided agency |
| `/api/v2/reporting/agencies/overview/` | GET | Returns About the Data information about all agencies with submissions in a provided fiscal year and period |
| `/api/v2/reporting/agencies/publish_dates/` | GET | Returns submission publication and certification information about all agencies with submissions in a provided fiscal year and period |
| `/api/v2/reporting/agencies/<TOPTIER_CODE>/<FISCAL_YEAR>/<FISCAL_PERIOD>/submission_history/` | GET | Returns a list of submission publication dates and certified dates for the provided agency for the provided fiscal year and period |
| `/api/v2/reporting/agencies/<TOPTIER_CODE>/<FISCAL_YEAR>/<FISCAL_PERIOD>/unlinked_awards/<TYPE>/` | GET | Returns counts of an agency's linked and unlinked awards for a given period |
