# SIP CredentialList Resource




SIP CredentialList resources contain the credentials of the users who are allowed to reach your SIP Domain. We only allow traffic from users who have their credentials in the credential list.

For information about the individual Credential resources in the list, such as to create, list, read, update, or delete individual credentials, see the Credential Resource.

After you create a CredentialList resource, you will need to map it to your SIP domain for it to take effect. You can map a CredentialList to more than one SIP domain.

Your Account can have up to 100 CredentialList resources.

Each CredentialList resource can contain up to 1,000 unique users.

CredentialList Properties





Property nameTypeRequiredPIIDescriptionChild properties
account_sid
SID<AC>
Optional
Not PII
The unique id of the Account that owns this resource.

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
The date that this resource was created, given as GMT in RFC 2822

 format.

date_updated
string<date-time-rfc-2822>
Optional
Not PII
The date that this resource was last updated, given as GMT in RFC 2822

 format.

friendly_name
string
Optional
Not PII
A human readable descriptive text that describes the CredentialList, up to 64 characters long.

sid
SID<CL>
Optional
Not PII
A 34 character string that uniquely identifies this resource.

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
subresource_uris
object<uri-map>
Optional
Not PII
A list of credentials associated with this credential list.

uri
string
Optional
Not PII
The URI for this resource, relative to https://api.twilio.com.

Create a SIP CredentialList resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json

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
Request body parameters





Encoding type:application/x-www-form-urlencoded
Schema
Example
Property nameTypeRequiredPIIDescriptionChild properties
friendly_name
string
required
Not PII
A human readable descriptive text that describes the CredentialList, up to 64 characters long.

Create a SIP CredentialList resource





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

credential_list = client.sip.credential_lists.create(
    friendly_name="friendly_name"
)

print(credential_list.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 11 Sep 2013 17:51:38 +0000",
  "date_updated": "Wed, 11 Sep 2013 17:51:38 +0000",
  "friendly_name": "friendly_name",
  "sid": "CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "subresource_uris": {
    "credentials": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Fetch a SIP CredentialList resource





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json

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
sid
SID<CL>
required
Not PII
The credential list Sid that uniquely identifies this resource

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Fetch a SIP CredentialList resource





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

credential_list = client.sip.credential_lists(
    "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(credential_list.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 11 Sep 2013 17:51:38 +0000",
  "date_updated": "Wed, 11 Sep 2013 17:51:38 +0000",
  "friendly_name": "Low Rises",
  "sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "subresource_uris": {
    "credentials": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Read multiple SIP CredentialList resources





GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json

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

Read multiple SIP CredentialList resources





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

credential_lists = client.sip.credential_lists.list(limit=20)

for record in credential_lists:
    print(record.account_sid)
Response



Copy response
{
  "credential_lists": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "Wed, 11 Sep 2013 17:51:38 +0000",
      "date_updated": "Wed, 11 Sep 2013 17:51:38 +0000",
      "friendly_name": "Low Rises",
      "sid": "CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "subresource_uris": {
        "credentials": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "start": 0,
  "end": 0,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists.json?PageSize=50&Page=0"
}
Update a SIP CredentialList resource





POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json

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
sid
SID<CL>
required
Not PII
The credential list Sid that uniquely identifies this resource

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
friendly_name
string
required
Not PII
A human readable descriptive text for a CredentialList, up to 64 characters long.

Update a SIP CredentialList resource





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

sip_credential_list = client.sip.credential_lists(
    "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(friendly_name="friendly_name")

print(sip_credential_list.account_sid)
Response



Copy response
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Wed, 11 Sep 2013 17:51:38 +0000",
  "date_updated": "Wed, 11 Sep 2013 17:51:38 +0000",
  "friendly_name": "friendly_name",
  "sid": "CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "subresource_uris": {
    "credentials": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Credentials.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SIP/CredentialLists/CLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Delete a SIP CredentialList resource





DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json

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
sid
SID<CL>
required
Not PII
The credential list Sid that uniquely identifies this resource

Pattern:
^CL[0-9a-fA-F]{32}$
Min length:
34
Max length:
34
Delete a SIP CredentialList resource





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

client.sip.credential_lists("CLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()