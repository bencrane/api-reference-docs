# /2010 REST APIs - Phone Numbers - AvailablePhoneNumber Resource - Overview

The AvailablePhoneNumbers resource and its subresources let you search for local, toll-free, and mobile phone numbers that you can purchase. You can search for phone numbers that:

- Match a specific pattern
- Are in a specific country
- Belong to a particular area code (NPA) or exchange (NXX)
- Fall within a defined geographic region

To find available numbers, make a request to one of the following subresources:

- AvailablePhoneNumbers Local subresource
- AvailablePhoneNumbers TollFree subresource
- AvailablePhoneNumbers Mobile subresource

> **Info:** After you identify a number to purchase, provision it with the Incoming Phone Numbers API.

## Supported Countries and Types

To list the subresources available to your account in a given country, query the AvailablePhoneNumbers resource. For full information about our phone number support, see Twilio phone number availability and their capabilities and Twilio phone number types and their capabilities. Each resource instance has the following properties.

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| country_code | string<iso-country-code> | Optional | Not PII | The ISO-3166-1 country code of the country. |
| country | string | Optional | Not PII | The name of the country. |
| uri | string<uri> | Optional | Not PII | The URI of the Country resource, relative to https://api.twilio.com. |
| beta | boolean | Optional | Not PII | Whether all phone numbers available in the country are new to the Twilio platform. true if they are and false if all numbers are not in the Twilio Phone Number Beta program. |
| subresource_uris | object<uri-map> | Optional | Not PII | A list of related AvailablePhoneNumber resources identified by their URIs relative to https://api.twilio.com. |

---

## Fetch a specific country

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account requesting the available phone number Country resource. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |
| country_code | string<iso-country-code> | required | Not PII | The ISO-3166-1 country code of the country to fetch available phone number information about. |

The following example shows how to fetch information about available phone numbers in a specific country:

### Fetch a specific country

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

available_phone_number = client.available_phone_numbers("US").fetch()

print(available_phone_number.country_code)
```

**Response:**

```json
{
  "beta": false,
  "country": "United States",
  "country_code": "US",
  "subresource_uris": {
    "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/Local.json",
    "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US/TollFree.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/US.json"
}
```

---

## Read a list of countries

```
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
```

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| account_sid | SID<AC> | required | Not PII | The SID of the Account requesting the available phone number Country resources. Pattern: `^AC[0-9a-fA-F]{32}$` Min length: 34, Max length: 34 |

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| page_size | integer<int64> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| page | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| page_token | string | Optional | Not PII | The page token. This is provided by the API. |

The following example shows how to retrieve a list of all countries where phone numbers are available:

### Read a list of countries

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

available_phone_numbers = client.available_phone_numbers.list(limit=20)

for record in available_phone_numbers:
    print(record.country_code)
```

**Response:**

```json
{
  "countries": [
    {
      "beta": false,
      "country": "Denmark",
      "country_code": "DK",
      "subresource_uris": {
        "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK/Local.json",
        "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK/TollFree.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/DK.json"
    },
    {
      "beta": false,
      "country": "Australia",
      "country_code": "AU",
      "subresource_uris": {
        "local": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/Local.json",
        "mobile": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/Mobile.json",
        "toll_free": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU/TollFree.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers/AU.json"
    }
  ],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AvailablePhoneNumbers.json"
}
```