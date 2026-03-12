API REFERENCE - DIALING PERMISSIONS - Countries

Dialing Permissions - Countries resource




Voice dialing permissions are organized by country and identified by the country's ISO

 code.

Countries properties





Property nameTypeRequiredPIIDescriptionChild properties
isoCode
string<iso-country-code>
Optional
Not PII
The ISO country code

.

name
string
Optional
Not PII
The name of the country.

continent
string
Optional
Not PII
The name of the continent in which the country is located.

countryCodes
array[string]
Optional
Not PII
The E.164 assigned country codes(s)


lowRiskNumbersEnabled
boolean
Optional
Not PII
Whether dialing to low-risk numbers is enabled.

highRiskSpecialNumbersEnabled
boolean
Optional
Not PII
Whether dialing to high-risk special services numbers is enabled. These prefixes include number ranges allocated by the country and include premium numbers, special services, shared cost, and others

highRiskTollfraudNumbersEnabled
boolean
Optional
Not PII
Whether dialing to high-risk toll fraud

 numbers is enabled. These prefixes include narrow number ranges that have a high-risk of international revenue sharing fraud (IRSF) attacks, also known as toll fraud

. These prefixes are collected from anti-fraud databases and verified by analyzing calls on our network. These prefixes are not available for download and are updated frequently

url
string<uri>
Optional
Not PII
The absolute URL of this resource.

links
object<uri-map>
Optional
Not PII
A list of URLs related to this resource.

Retrieve a Country





GET https://voice.twilio.com/v1/DialingPermissions/Countries/{IsoCode}

Path parameters





Property nameTypeRequiredPIIDescription
isoCode
string<iso-country-code>
required
Not PII
The ISO country code

 of the DialingPermissions Country resource to fetch

Retrieve a Country





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchDialingPermissionsCountry() {
  const country = await client.voice.v1.dialingPermissions
    .countries("US")
    .fetch();

  console.log(country.isoCode);
}

fetchDialingPermissionsCountry();
Response



Copy response
{
  "iso_code": "US",
  "name": "United States/Canada",
  "country_codes": [
    "+1"
  ],
  "continent": "NORTH_AMERICA",
  "low_risk_numbers_enabled": false,
  "high_risk_special_numbers_enabled": false,
  "high_risk_tollfraud_numbers_enabled": false,
  "url": "https://voice.twilio.com/v1/DialingPermissions/Countries/US",
  "links": {
    "highrisk_special_prefixes": "https://voice.twilio.com/v1/DialingPermissions/Countries/US/HighRiskSpecialPrefixes"
  }
}
Retrieve a list of Countries





GET https://voice.twilio.com/v1/DialingPermissions/Countries

Query parameters





Property nameTypeRequiredPIIDescription
isoCode
string<iso-country-code>
Optional
Not PII
Filter to retrieve the country permissions by specifying the ISO country code


continent
string
Optional
Not PII
Filter to retrieve the country permissions by specifying the continent

countryCode
string
Optional
Not PII
Filter the results by specified country codes


lowRiskNumbersEnabled
boolean
Optional
Not PII
Filter to retrieve the country permissions with dialing to low-risk numbers enabled. Can be: true or false.

highRiskSpecialNumbersEnabled
boolean
Optional
Not PII
Filter to retrieve the country permissions with dialing to high-risk special service numbers enabled. Can be: true or false

highRiskTollfraudNumbersEnabled
boolean
Optional
Not PII
Filter to retrieve the country permissions with dialing to high-risk toll fraud

 numbers enabled. Can be: true or false.

pageSize
integer<int64>
Optional
Not PII
How many resources to return in each list page. The default is 50, and the maximum is 1000.

Minimum:
1
Maximum:
1000
page
integer
Optional
Not PII
The page index. This value is simply for client state.

Minimum:
0
pageToken
string
Optional
Not PII
The page token. This is provided by the API.

Retrieve a list of Countries





Report code block


Copy code block
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listDialingPermissionsCountry() {
  const countries = await client.voice.v1.dialingPermissions.countries.list({
    limit: 20,
  });

  countries.forEach((c) => console.log(c.isoCode));
}

listDialingPermissionsCountry();
Response



Copy response
{
  "content": [
    {
      "iso_code": "US",
      "name": "United States/Canada",
      "country_codes": [
        "+1"
      ],
      "continent": "NORTH_AMERICA",
      "low_risk_numbers_enabled": false,
      "high_risk_special_numbers_enabled": false,
      "high_risk_tollfraud_numbers_enabled": false,
      "url": "https://voice.twilio.com/v1/DialingPermissions/Countries/US",
      "links": {
        "highrisk_special_prefixes": "https://voice.twilio.com/v1/DialingPermissions/Countries/US/HighRiskSpecialPrefixes"
      }
    }
  ],
  "meta": {
    "first_page_url": "https://voice.twilio.com/v1/DialingPermissions/Countries?IsoCode=US&PageSize=50&Page=0",
    "key": "content",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://voice.twilio.com/v1/DialingPermissions/Countries?IsoCode=US&PageSize=50&Page=0"
  }
}
Need