# SIP Domain Resource




A SIP Domain resource describes a custom DNS hostname that can accept SIP traffic for your account. A SIP request to that domain, such as to sip:alice@example.sip.twilio.com, routes to Twilio. Twilio authenticates the request and requests TwiML from the voice_url of the SIP Domain.

SIP Domain Authentication





Your SIP Domain must map at least one of these two authentication methods or requests to it will be blocked.

IpAccessControlLists, mapped by IpAccessControlListMapping resources
CredentialLists, mapped by CredentialListMapping resources
Domain Properties





Property nameTypeRequiredPIIDescriptionChild properties
account_sid
SID<AC>
Optional
Not PII
The SID of the Account that created the SipDomain resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
api_version
string
Optional
Not PII
The API version used to process the call.

auth_type
string
Optional
Not PII
The types of authentication you have mapped to your domain. Can be: IP_ACL and CREDENTIAL_LIST. If you have both defined for your domain, both will be returned in a comma delimited string. If auth_type is not defined, the domain will not be able to receive any traffic.

date_created
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that the resource was created specified in RFC 2822

 format.

date_updated
string<date-time-rfc-2822>
Optional
Not PII
The date and time in GMT that the resource was last updated specified in RFC 2822

format.

domain_name
string
Optional
Not PII
The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with sip.twilio.com.

friendly_name
string
Optional
Not PII
The string that you assigned to describe the resource.

sid
SID<SD>
Optional
Not PII
The unique string that that we created to identify the SipDomain resource.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
uri
string
Optional
Not PII
The URI of the resource, relative to https://api.twilio.com.

voice_fallback_method
enum<http-method>
Optional
Not PII
The HTTP method we use to call voice_fallback_url. Can be: GET or POST.

Possible values:
GET
POST
voice_fallback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we call when an error occurs while retrieving or executing the TwiML requested from voice_url.

voice_method
enum<http-method>
Optional
Not PII
The HTTP method we use to call voice_url. Can be: GET or POST.

Possible values:
GET
POST
voice_status_callback_method
enum<http-method>
Optional
Not PII
The HTTP method we use to call voice_status_callback_url. Either GET or POST.

Possible values:
GET
POST
voice_status_callback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we call to pass status parameters (such as call ended) to your application.

voice_url
string<uri>
Optional

PII MTL: 30 days
The URL we call using the voice_method when the domain receives a call.

subresource_uris
object<uri-map>
Optional
Not PII
A list of mapping resources associated with the SIP Domain resource identified by their relative URIs.

sip_registration
boolean
Optional
Not PII
Whether to allow SIP Endpoints to register with the domain to receive calls.

emergency_calling_enabled
boolean
Optional
Not PII
Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.

secure
boolean
Optional
Not PII
Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.

byoc_trunk_sid
SID<BY>
Optional
Not PII
The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.

Pattern:
^BY[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
emergency_caller_sid
SID<PN>
Optional
Not PII
Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.

Pattern:
^PN[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SipDomain resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that will create the resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
domain_name
string
required
Not PII
The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with sip.twilio.com.

friendly_name
string
Optional
Not PII
A descriptive string that you created to describe the resource. It can be up to 64 characters long.

voice_url
string<uri>
Optional

PII MTL: 30 days
The URL we should when the domain receives a call.

voice_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_url. Can be: GET or POST.

Possible values:
GET
POST
voice_fallback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we should call when an error occurs while retrieving or executing the TwiML from voice_url.

voice_fallback_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_fallback_url. Can be: GET or POST.

Possible values:
GET
POST
voice_status_callback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we should call to pass status parameters (such as call ended) to your application.

voice_status_callback_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_status_callback_url. Can be: GET or POST.

Possible values:
GET
POST
sip_registration
boolean
Optional
Not PII
Whether to allow SIP Endpoints to register with the domain to receive calls. Can be true or false. true allows SIP Endpoints to register with the domain to receive calls, false does not.

emergency_calling_enabled
boolean
Optional
Not PII
Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.

secure
boolean
Optional
Not PII
Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.

byoc_trunk_sid
SID<BY>
Optional
Not PII
The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.

Pattern:
^BY[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
emergency_caller_sid
SID<PN>
Optional
Not PII
Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.

Pattern:
^PN[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SipDomain resource





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

domain = client.sip.domains.create(domain_name="domain_name")

print(domain.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "auth_type": "IP_ACL",
  "date_created": "Mon, 20 Jul 2015 17:27:10 +0000",
  "date_updated": "Mon, 20 Jul 2015 17:27:10 +0000",
  "domain_name": "domain_name",
  "friendly_name": "Scranton Office",
  "sip_registration": true,
  "sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "subresource_uris": {
    "credential_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialListMappings.json",
    "ip_access_control_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlListMappings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_status_callback_method": "POST",
  "voice_status_callback_url": null,
  "voice_url": "https://dundermifflin.example.com/twilio/app.php",
  "emergency_calling_enabled": true,
  "secure": true,
  "byoc_trunk_sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_caller_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Fetch a SipDomain resource





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the SipDomain resource to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<SD>
required
Not PII
The Twilio-provided string that uniquely identifies the SipDomain resource to fetch.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Fetch a SipDomain resource





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

domain = client.sip.domains("SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(domain.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "auth_type": "IP_ACL",
  "date_created": "Mon, 20 Jul 2015 17:27:10 +0000",
  "date_updated": "Mon, 20 Jul 2015 17:27:10 +0000",
  "domain_name": "dunder-mifflin-scranton.sip.twilio.com",
  "friendly_name": "Scranton Office",
  "sip_registration": true,
  "sid": "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "subresource_uris": {
    "credential_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialListMappings.json",
    "ip_access_control_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlListMappings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_status_callback_method": "POST",
  "voice_status_callback_url": null,
  "voice_url": "https://dundermifflin.example.com/twilio/app.php",
  "emergency_calling_enabled": true,
  "secure": true,
  "byoc_trunk_sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_caller_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Read multiple SipDomain resources





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the SipDomain resources to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Query parameters





Property nameTypeRequiredPIIDescription
page_size
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
page_token
string
Optional
Not PII
The page token. This is provided by the API.

Read multiple SipDomain resources





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

domains = client.sip.domains.list(limit=20)

for record in domains:
    print(record.account_sid)
Response



Copy response
{
  "domains": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "auth_type": "IP_ACL",
      "date_created": "Mon, 20 Jul 2015 17:27:10 +0000",
      "date_updated": "Mon, 20 Jul 2015 17:27:10 +0000",
      "domain_name": "dunder-mifflin-scranton.sip.twilio.com",
      "friendly_name": "Scranton Office",
      "sip_registration": true,
      "sid": "SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "subresource_uris": {
        "credential_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialListMappings.json",
        "ip_access_control_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlListMappings.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_status_callback_method": "POST",
      "voice_status_callback_url": null,
      "voice_url": "https://dundermifflin.example.com/twilio/app.php",
      "emergency_calling_enabled": true,
      "secure": true,
      "byoc_trunk_sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "emergency_caller_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "start": 0,
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains.json?PageSize=50&Page=0"
}
Update a SipDomain resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the SipDomain resource to update.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<SD>
required
Not PII
The Twilio-provided string that uniquely identifies the SipDomain resource to update.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
friendly_name
string
Optional
Not PII
A descriptive string that you created to describe the resource. It can be up to 64 characters long.

voice_fallback_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_fallback_url. Can be: GET or POST.

Possible values:
GET
POST
voice_fallback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we should call when an error occurs while retrieving or executing the TwiML requested by voice_url.

voice_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_url

Possible values:
GET
POST
voice_status_callback_method
enum<http-method>
Optional
Not PII
The HTTP method we should use to call voice_status_callback_url. Can be: GET or POST.

Possible values:
GET
POST
voice_status_callback_url
string<uri>
Optional

PII MTL: 30 days
The URL that we should call to pass status parameters (such as call ended) to your application.

voice_url
string<uri>
Optional

PII MTL: 30 days
The URL we should call when the domain receives a call.

sip_registration
boolean
Optional
Not PII
Whether to allow SIP Endpoints to register with the domain to receive calls. Can be true or false. true allows SIP Endpoints to register with the domain to receive calls, false does not.

domain_name
string
Optional
Not PII
The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and "-" and must end with sip.twilio.com.

emergency_calling_enabled
boolean
Optional
Not PII
Whether emergency calling is enabled for the domain. If enabled, allows emergency calls on the domain from phone numbers with validated addresses.

secure
boolean
Optional
Not PII
Whether secure SIP is enabled for the domain. If enabled, TLS will be enforced and SRTP will be negotiated on all incoming calls to this sip domain.

byoc_trunk_sid
SID<BY>
Optional
Not PII
The SID of the BYOC Trunk(Bring Your Own Carrier) resource that the Sip Domain will be associated with.

Pattern:
^BY[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
emergency_caller_sid
SID<PN>
Optional
Not PII
Whether an emergency caller sid is configured for the domain. If present, this phone number will be used as the callback for the emergency call.

Pattern:
^PN[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Update a SipDomain resource





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

sip_domain = client.sip.domains("SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    friendly_name="friendly_name"
)

print(sip_domain.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "auth_type": "IP_ACL",
  "date_created": "Mon, 20 Jul 2015 17:27:10 +0000",
  "date_updated": "Mon, 20 Jul 2015 17:27:10 +0000",
  "domain_name": "dunder-mifflin-scranton.sip.twilio.com",
  "friendly_name": "friendly_name",
  "sip_registration": true,
  "sid": "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "subresource_uris": {
    "credential_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialListMappings.json",
    "ip_access_control_list_mappings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlListMappings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_fallback_method": "POST",
  "voice_fallback_url": null,
  "voice_method": "POST",
  "voice_status_callback_method": "POST",
  "voice_status_callback_url": null,
  "voice_url": "https://dundermifflin.example.com/twilio/app.php",
  "emergency_calling_enabled": true,
  "secure": true,
  "byoc_trunk_sid": "BYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "emergency_caller_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Delete a SipDomain resource





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the SipDomain resources to delete.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<SD>
required
Not PII
The Twilio-provided string that uniquely identifies the SipDomain resource to delete.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a SipDomain resource





Report code block


Copy code block
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.sip.domains("SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()