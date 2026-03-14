# Deactivations resource

The Deactivations resource retrieves a list of United States phone numbers that have been deactivated by mobile carriers. These phone numbers are no longer in service for the subscriber who used to own that number. Twilio updates the set of available reports daily.

These reports should be used periodically to remove deactivated phone numbers from your opted-in subscriber list. For more information how to use these reports, see the "Handling Deactivated Phone Numbers" Help Center article.

API requests to the Deactivations resource are free of charge.

## Deactivation Properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `redirect_to` | string\<uri\> | Optional | Not PII | Returns an authenticated url that redirects to a file containing the deactivated numbers for the requested day. This url is valid for up to two minutes. |

---

## Retrieve a list of Deactivations

```
GET https://messaging.twilio.com/v1/Deactivations
```

Retrieve a list of deactivated numbers for a specific date.

You must include the Date parameter with a date value in `YYYY-MM-DD` format.

Twilio's response contains a `redirect_to` property with a signed URL for the requested date's deactivations list in `.txt` format.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `date` | string\<date\> | Optional | Not PII | The request will return a list of all United States Phone Numbers that were deactivated on the day specified by this parameter. This date should be specified in YYYY-MM-DD format. |

### Fetch deactivations for August 13, 2023

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

deactivation = client.messaging.v1.deactivations().fetch(date=date(2023, 8, 13))

print(deactivation.redirect_to)
```

**Response:**

```json
{
  "redirect_to": "https://com-twilio-dev-messaging-deactivations.s3.amazonaws.com"
}
```