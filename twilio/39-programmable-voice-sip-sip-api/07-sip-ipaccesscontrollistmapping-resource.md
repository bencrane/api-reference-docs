# SIP IpAccessControlListMapping Resource




IpAccessControlListMapping resources contain the list of IpAccessControlList resources associated with this domain. IpAccessControlList resources contain the IpAddress resources that describe the IP addresses with access to the SIP Domain.

When an INVITE is received for a SIP Domain, the source IP address must be in one of the mapped lists to be accepted.

SIP IpAccessControlListMapping properties





Property nameTypeRequiredPIIDescriptionChild properties
account_sid
SID<AC>
Optional
Not PII
The SID of the Account that created the IpAccessControlListMapping resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
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

friendly_name
string
Optional

PII MTL: 0 days
The string that you assigned to describe the resource.

sid
SID<AL>
Optional
Not PII
The unique string that that we created to identify the IpAccessControlListMapping resource.

Pattern:
^AL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SIP IpAccessControlListMapping resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json

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
domain_sid
SID<SD>
required
Not PII
The SID of the SIP domain that will contain the new resource.

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
ip_access_control_list_sid
SID<AL>
required
Not PII
The SID of the IpAccessControlList resource to map to the SIP domain.

Pattern:
^AL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SIP IpAccessControlListMapping resource





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

ip_access_control_list_mapping = client.sip.domains(
    "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).auth.calls.ip_access_control_list_mappings.create(
    ip_access_control_list_sid="ALXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(ip_access_control_list_mapping.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "sid": "ALaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Fetch a SIP IpAccessControlListMapping resource





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the IpAccessControlListMapping resource to fetch.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
domain_sid
SID<SD>
required
Not PII
The SID of the SIP domain that contains the resource to fetch.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<AL>
required
Not PII
The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to fetch.

Pattern:
^AL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Fetch a SIP IpAccessControlListMapping resource





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

ip_access_control_list_mapping = (
    client.sip.domains("SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .auth.calls.ip_access_control_list_mappings(
        "ALXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
    .fetch()
)

print(ip_access_control_list_mapping.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "sid": "ALXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
Read multiple SIP IpAccessControlListMapping resources





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the IpAccessControlListMapping resources to read.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
domain_sid
SID<SD>
required
Not PII
The SID of the SIP domain that contains the resources to read.

Pattern:
^SD[0-9a-fA-F]{32}$
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

Read multiple SIP IpAccessControlListMapping resources





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

ip_access_control_list_mappings = client.sip.domains(
    "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).auth.calls.ip_access_control_list_mappings.list(limit=20)

for record in ip_access_control_list_mappings:
    print(record.account_sid)
Response



Copy response
{
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Auth/Calls/IpAccessControlListMappings.json?PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "contents": [],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Auth/Calls/IpAccessControlListMappings.json?PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
Delete a SIP IpAccessControlListMapping resource





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the IpAccessControlListMapping resources to delete.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
domain_sid
SID<SD>
required
Not PII
The SID of the SIP domain that contains the resources to delete.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<AL>
required
Not PII
The Twilio-provided string that uniquely identifies the IpAccessControlListMapping resource to delete.

Pattern:
^AL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a SIP IpAccessControlListMapping resource





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

client.sip.domains(
    "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).auth.calls.ip_access_control_list_mappings(
    "ALXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()