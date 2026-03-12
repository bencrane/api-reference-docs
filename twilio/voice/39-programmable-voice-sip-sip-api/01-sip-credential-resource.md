# SIP - Credential Resource




The Credential resource stores usernames and password information.

Username and Password





Each Username requires a corresponding password that meets the requirements in the Password parameter's description.

We don't store the passwords you provide in the credential records as cleartext. Instead, they are MD5 hashed in accordance with the digest authentication specification.

SIP Credential properties





Property nameTypeRequiredPIIDescriptionChild properties
sid
SID<CR>
Optional
Not PII
A 34 character string that uniquely identifies this resource.

Pattern:
^CR[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
account_sid
SID<AC>
Optional
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
Optional
Not PII
The unique id that identifies the credential list that includes this credential.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
username
string
Optional

PII MTL: 30 days
The username for this credential.

date_created
string<date-time-rfc-2822>
Optional
Not PII
The date that this resource was created, given as GMT in RFC 2822

 format.

date_updated
string<date-time-rfc-2822>
Optional
Not PII
The date that this resource was last updated, given as GMT in RFC 2822

 format.

uri
string
Optional
Not PII
The URI for this resource, relative to https://api.twilio.com

Create a SIP Credential resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
required
Not PII
The unique id that identifies the credential list to include the created credential.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
username
string
required

PII MTL: 30 days
The username that will be passed when authenticating SIP requests. The username should be sent in response to Twilio's challenge of the initial INVITE. It can be up to 32 characters long.

password
string
required
Not PII
The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg IWasAtSignal2018)

Create a SIP Credential resource





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

credential = client.sip.credential_lists(
    "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).credentials.create(username="username", password="password")

print(credential.sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "credential_list_sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 19 Aug 2015 19:48:45 +0000",
  "date_updated": "Wed, 19 Aug 2015 19:48:45 +0000",
  "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "username": "username"
}
Fetch a SIP Credential resource





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
required
Not PII
The unique id that identifies the credential list that contains the desired credential.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<CR>
required
Not PII
The unique id that identifies the resource to fetch.

Pattern:
^CR[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Fetch a SIP Credential resource





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

credential = (
    client.sip.credential_lists("CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .credentials("CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(credential.sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "credential_list_sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 19 Aug 2015 19:48:45 +0000",
  "date_updated": "Wed, 19 Aug 2015 19:48:45 +0000",
  "sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "username": "1440013725.28"
}
Read multiple SIP Credential resources





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
required
Not PII
The unique id that identifies the credential list that contains the desired credentials.

Pattern:
^CL[0-9a-fA-F]{32}$
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

Read multiple SIP Credential resources





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

credentials = client.sip.credential_lists(
    "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).credentials.list(limit=20)

for record in credentials:
    print(record.sid)
Response



Copy response
{
  "credentials": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "credential_list_sid": "CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Wed, 19 Aug 2015 19:48:45 +0000",
      "date_updated": "Wed, 19 Aug 2015 19:48:45 +0000",
      "sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "username": "1440013725.28"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json?PageSize=50&Page=0"
}
Update a SIP Credential resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json

The update action is used to update a user's password.

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
required
Not PII
The unique id that identifies the credential list that includes this credential.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<CR>
required
Not PII
The unique id that identifies the resource to update.

Pattern:
^CR[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
password
string
Optional
Not PII
The password that the username will use when authenticating SIP requests. The password must be a minimum of 12 characters, contain at least 1 digit, and have mixed case. (eg IWasAtSignal2018)

Update a SIP Credential resource





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

sip_credential = (
    client.sip.credential_lists("CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .credentials("CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(password="password")
)

print(sip_credential.sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "credential_list_sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 19 Aug 2015 19:48:45 +0000",
  "date_updated": "Wed, 19 Aug 2015 19:48:45 +0000",
  "sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials/CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "username": "username"
}
Delete a SIP Credential resource





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json

Path parameters





Property nameTypeRequiredPIIDescription
account_sid
SID<AC>
required
Not PII
The unique id of the Account that is responsible for this resource.

Pattern:
^AC[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
credential_list_sid
SID<CL>
required
Not PII
The unique id that identifies the credential list that contains the desired credentials.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
sid
SID<CR>
required
Not PII
The unique id that identifies the resource to delete.

Pattern:
^CR[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a SIP Credential resource





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

client.sip.credential_lists("CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").credentials(
    "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()