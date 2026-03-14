# Pricing: Messaging Countries resource

You can pull real-time, account-specific pricing for Twilio's Messaging API product using the Pricing API.

Prices can be retrieved at a country level directly via the Countries resource or for a specific phone number by leveraging the Lookup API and Countries resource.

You may also wish to check out our Pricing API resources for Twilio's Voice and Phone Number products.

> **Info:** Looking for details on pricing for Twilio products? Check out Twilio's pricing page.

```bash
curl -G https://pricing.twilio.com/v1/Messaging/Countries/US \
    -u '[YOUR ACCOUNT SID]:[YOUR AUTH TOKEN]'
```

You can find your account SID and auth token on your Twilio Console.

## Countries properties

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `country` | string | Optional | Not PII | The name of the country. |
| `iso_country` | string\<iso-country-code\> | Optional | Not PII | The ISO country code. |
| `url` | string\<uri\> | Optional | Not PII | The absolute URL of the resource. |
| `outbound_sms_prices` | array[object\<outbound-sms-price\>] | Optional | Not PII | The list of OutboundSMSPrice records that represent the price to send a message for each MCC/MNC applicable in this country. |
| `inbound_sms_prices` | array[object\<inbound-sms-price\>] | Optional | Not PII | The list of InboundPrice records that describe the price to receive an inbound SMS to the different Twilio phone number types supported in this country. |
| `price_unit` | string\<currency\> | Optional | Not PII | The currency in which prices are measured, specified in ISO 4127 format (e.g. usd, eur, jpy). |

---

## Fetch a Countries resource

```
GET https://pricing.twilio.com/v1/Messaging/Countries/{IsoCountry}
```

In the above API call, `{IsoCountry}` is the ISO 3166-1 alpha-2 format country code.

### Path parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `iso_country` | string\<iso-country-code\> | required | Not PII | The ISO country code of the pricing information to fetch. |

### Fetch Messaging Prices for Estonia

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

country = client.pricing.v1.messaging.countries("EE").fetch()

print(country.url)
```

**Response:**

```json
{
  "country": "country",
  "inbound_sms_prices": [
    {
      "base_price": "0.05",
      "current_price": "0.05",
      "number_type": "mobile"
    }
  ],
  "iso_country": "EE",
  "outbound_sms_prices": [
    {
      "carrier": "att",
      "mcc": "foo",
      "mnc": "bar",
      "prices": [
        {
          "base_price": "0.05",
          "current_price": "0.05",
          "number_type": "mobile"
        }
      ]
    }
  ],
  "price_unit": "USD",
  "url": "https://pricing.twilio.com/v1/Messaging/Countries/US"
}
```

The Resource Twilio returns represents prices to send messages to phone numbers in a given country, organized by Mobile Country Code (MCC) and Mobile Network Code (MNC), and the prices to receive messages on Twilio phone numbers in this country, organized by phone number type.

A Pricing resource has the following properties attached based on the type of Price record it is (Outbound SMS, Outbound Price, or Inbound Price):

### OutboundSmsPrice

| Property | Description |
|----------|-------------|
| MCC | The Mobile Country Code |
| MNC | The Mobile Network Code |
| Carrier | The name of the carrier for this MCC/MNC combination |
| Prices | List of OutboundPrice records that represent the prices to send a message to this MCC/MNC from different Twilio phone number types |

### OutboundPrice

| Property | Description |
|----------|-------------|
| NumberType | The type of Twilio phone number sending a message, either mobile, local, shortcode, or toll free |
| BasePrice | The retail price to send a message |
| CurrentPrice | The current price (which accounts for any volume or custom price discounts) to send a message |

### InboundPrice

| Property | Description |
|----------|-------------|
| NumberType | The type of Twilio phone number receiving a message, either mobile, local, shortcode, or toll free |
| BasePrice | The retail price to receive a message |
| CurrentPrice | The current price (which accounts for any volume or custom price discounts) to receive a message |

---

## Read multiple Countries resources

```
GET https://pricing.twilio.com/v1/Messaging/Countries
```

Returns a list of countries where Twilio Messaging Services are available along with the corresponding URL for retrieving the country-specific Messaging prices. This list includes paging information.

### Query parameters

| Property name | Type | Required | PII | Description |
|---------------|------|----------|-----|-------------|
| `page_size` | integer\<int64\> | Optional | Not PII | How many resources to return in each list page. The default is 50, and the maximum is 1000. Minimum: 1, Maximum: 1000 |
| `page` | integer | Optional | Not PII | The page index. This value is simply for client state. Minimum: 0 |
| `page_token` | string | Optional | Not PII | The page token. This is provided by the API. |

### Read all Countries resources

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

countries = client.pricing.v1.messaging.countries.list(limit=20)

for record in countries:
    print(record.country)
```

**Response:**

```json
{
  "countries": [],
  "meta": {
    "first_page_url": "https://pricing.twilio.com/v1/Messaging/Countries?PageSize=50&Page=0",
    "key": "countries",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://pricing.twilio.com/v1/Messaging/Countries?PageSize=50&Page=0"
  }
}
```