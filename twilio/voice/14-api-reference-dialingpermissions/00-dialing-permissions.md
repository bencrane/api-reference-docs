API REFERENCE - DIALING PERMISSIONS - Dialing Permissions overview

Dialing Permissions overview
Twilio allows you to initiate outbound voice calls to the public telephone network in over 218 countries and territories around the world. Account level Voice Dialing Geographic Permissions allows you to control which of those countries can be called and also block destinations in countries with a high-risk of toll fraud.
For our partners that build and re-sell Twilio powered solutions using subaccounts, Twilio has provided the ability for a subaccount to inherit the dialing permissions of the Master Project. If the partner's customer (the tenant of the subaccount) requires a unique set of permissions, inheritance can be disabled and dialing permissions can be customized on that subaccount.
With this REST API for voice dialing permissions, you can create smart defaults for customers during signup. Smart defaults, aligned with customer needs, leads to more successful calls and more conversions.
Countries permissions
Voice dialing permissions are organized into country permissions identified by __ISO__ code of corresponding country.
Each [Country]](/docs/voice/api/dialingpermissions-country-resource) describes these three groups of phone number prefixes.
* High-risk special numbers - number types such as premium numbers, special services, shared cost, and others
* High-risk toll fraud numbers - narrow number ranges that have a high-risk of international revenue sharing fraud (IRSF) attacks, also known as __toll fraud__.
* Low-risk numbers - low risk phone numbers
Learn more about the __Countries resource__.
BulkCountryUpdates permissions
Voice dialing permissions for a country are updated by using the __BulkCountryUpdates resource__.
Voice dialing permissions for a country can be updated individually or in a group of countries. Learn more about the __BulkCountryUpdates resource__.
HighRiskSpecialPrefixes
The list of high-risk prefixes from a country is returned by the __HighRiskSpecialPrefixes subresource__.
Inheritance settings for voice dialing permissions
The inheritance settings for voice dialing permissions are represented by the __Settings resource__.
You can list and update a subaccount's inheritance settings for voice dialing permissions by using the __Settings resource__.