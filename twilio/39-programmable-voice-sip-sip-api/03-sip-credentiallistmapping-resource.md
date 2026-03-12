# SIP CredentialListMapping Resource




The CredentialListMapping resource represents the CredentialList resources associated with a SIP Domain. A CredentialList resource contains the Credential resources of the users who can access the SIP Domain.

If an INVITE is received for a domain with a credential list mapped to it, we challenge the request and your system must authenticate it with a username and password. To be accepted, the username and password must be in one of the credential lists mapped to the SIP Domain.

SIP CredentialListMapping properties





Property nameTypeRequiredPIIDescriptionChild properties
account_sid
SID<AC>
Optional
Not PII
The SID of the Account that created the CredentialListMapping resource.

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
SID<CL>
Optional
Not PII
The unique string that that we created to identify the CredentialListMapping resource.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SIP CredentialListMapping resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json

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
credential_list_sid
SID<CL>
required
Not PII
The SID of the CredentialList resource to map to the SIP domain.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Create a SIP CredentialListMapping resource





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

credential_list_mapping = client.sip.domains(
    "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).auth.calls.credential_list_mappings.create(
    credential_list_sid="CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(credential_list_mapping.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "sid": "CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Fetch a SIP CredentialListMapping resource





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the CredentialListMapping resource to fetch.

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
SID<CL>
required
Not PII
The Twilio-provided string that uniquely identifies the CredentialListMapping resource to fetch.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Fetch a SIP CredentialListMapping resource





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

credential_list_mapping = (
    client.sip.domains("SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .auth.calls.credential_list_mappings("CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(credential_list_mapping.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "friendly_name": "friendly_name",
  "sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
Read multiple SIP CredentialListMapping resources





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the CredentialListMapping resources to read.

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

Read multiple SIP CredentialListMapping resources





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

credential_list_mappings = client.sip.domains(
    "SDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).auth.calls.credential_list_mappings.list(limit=20)

for record in credential_list_mappings:
    print(record.account_sid)
Response



Copy response
{
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Auth/Calls/CredentialListMappings.json?PageSize=50&Page=0",
  "end": 0,
  "previous_page_uri": null,
  "contents": [],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/Domains/SDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Auth/Calls/CredentialListMappings.json?PageSize=50&Page=0",
  "page_size": 50,
  "start": 0,
  "next_page_uri": null,
  "page": 0
}
Delete a SIP CredentialListMapping resource





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The SID of the Account that created the CredentialListMapping resources to delete.

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
The SID of the SIP domain that contains the resource to delete.

Pattern:
^SD[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<CL>
required
Not PII
The Twilio-provided string that uniquely identifies the CredentialListMapping resource to delete.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a SIP CredentialListMapping resource





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
).auth.calls.credential_list_mappings(
    "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()