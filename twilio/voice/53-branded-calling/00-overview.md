# CNAM - Brand you calls using CNAM

(new)
Public Beta
Caller ID (CNAM) is in Public Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about beta product support

.
Caller ID Name (CNAM) displays the business name on the recipient's phone during outbound calls from your Twilio numbers.

Eligibility





Looking up or changing CNAM is available only for US phone numbers.
Your Business Profile must be associated with an Employer Identification Number (EIN) or a Data Universal Numbering System (DUNS) number.
CNAM is displayed only if the recipient has enabled the CNAM feature on their phone through their carrier.
For landlines, CNAM is enabled by default.
For mobile phones, most US carriers offer CNAM as an opt-in feature. If the recipient doesn't enable CNAM for their mobile phone, CNAM won't be displayed even if a CNAM is properly set for the number.

(information)
CNAM display depends on the recipient's carrier
CNAM display depends on the recipient's carrier. Twilio keeps its CNAM Line Information Databases (LIDB) up to date with the correct CNAM values. However, not all carriers subscribe to every CNAM database, and Twilio can't control how carriers or database providers manage or update their records.
Onboarding





There are two different options for enabling CNAM on your phone number(s):

Using the Twilio Console
Twilio's Trust Hub REST API.
CNAM conditions





Can be a maximum of 15 characters.
Must be a unique name or value, cannot be a generic value such as a City/State.
Should begin with a letter and can only contain letters, numbers, periods, commas and spaces
If no Caller Name (CNAM) is set for the number, the City and State of the number is the default display along with phone number.
Note: At this time, you are unable to update Toll-Free numbers CNAM via the Twilio Console or API. To update the CNAM on a Toll-Free number, please contact support

.


(warning)
Additional charges apply
CNAM lookups incur additional charges. See Lookup pricing

 for details.
CNAM Onboarding in the Twilio Console





Create a Business Profile in the Console's Trust Hub

 and submit for vetting.
If you are an ISV, then you would need to create a Secondary Business Profile for your customer(s).
Assign phone numbers in your account to the Business Profile.
This associates a single identity with the phone numbers.
Create a CNAM Trust Product instance

 that is associated with your Business Profile in the Trust Hub and submit for vetting.
After Twilio approves the CNAM Trust Product, you register your phone numbers for CNAM.
Only US standard long code phone numbers which are already assigned to your Business Profile are eligible for assignment to the CNAM profile.
CA numbers cannot be assigned to CNAM profiles.
US and CA Toll Free numbers cannot be assigned to CNAM profiles. For help updating CNAM on Toll Free numbers, engage Support.
Click Save
When the CNAM Trust Product reaches Twilio-Approved status, Twilio will register CNAM display name for your numbers with the CNAM authoritative databases in the United States.
Enable Caller Name Lookup for the phone number.
In the Twilio Console, go to Phone Numbers > Active Numbers

.
Click the phone number you want to enable Caller Name Lookup for.
In the Voice Configuration section, from the Caller Name Lookup dropdown, select Enabled.
Click Save Configuration.
NOTE: You can remove CNAM by unassigning Phone Number from CNAM Trust Product or by deleting the CNAM Trust Product.

That's it. No coding required.

CNAM Onboarding with the Trust Hub REST API





Please refer to Trust Hub Rest API Docs for more details.

Create a Business Profile in the Console's Trust Hub and submit for vetting.
Visit the Console's Trust Hub section

 to create a Business Profile.
If you are an ISV, then you would need to create a Secondary Business Profile for your customer(s).
Assign phone numbers in your account to the Business Profile. This associates a single identity with the phone numbers.
You'll need your Phone Number SID(s)
To find your Phone Number SIDs in the Console, go to your Dashboard. In the Project Info section, click on See all phone numbers, then click on a phone number to find the SID.
To find your Phone Number SIDs via API, see the Additional API Calls section below.
Phone Number SIDs begin with "PN".
In the API Call below, don't change the ChannelEndpointType. It needs to be phone-number to add a phone number to your Business Profile.
Assign Phone Numbers to Your Business Profile





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

customer_profiles_channel_endpoint_assignment = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.create(
        channel_endpoint_type="phone-number",
        channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    )
)

print(customer_profiles_channel_endpoint_assignment.sid)
Response



Copy response
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Create CNAM Trust Product
Note: Do not change the policy_sid from the example below. This is a static value that will stay the same across all accounts.
The response will contain the SID for your Trust Product. You'll need this for several other API calls.
Create CNAM Trust Product





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

trust_product = client.trusthub.v1.trust_products.create(
    friendly_name="FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
    email="EMAIL@EXAMPLE.COM",
    policy_sid="RNf3db3cd1fe25fcfd3c3ded065c8fea53",
)

print(trust_product.sid)
Response



Copy response
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNf3db3cd1fe25fcfd3c3ded065c8fea53",
  "friendly_name": "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
  "status": "draft",
  "email": "EMAIL@EXAMPLE.COM",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
Connect your CNAM Trust Product to your Business Profile
You will need your Trust Product SID (returned in the previous API call).
You'll need your Business Profile's SID.
To retrieve this SID via API, see the Additional API Calls section below.
You can also find it in the Console under Trust Hub

.
Connect your CNAM Trust Product to your Business Profile





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

trust_products_entity_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_entity_assignments.create(
    object_sid="YOUR_BUSINESS_PROFILE_SID"
)

print(trust_products_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_BUSINESS_PROFILE_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Create CNAM End User
Note: In the API Call below, don't change the Type. It needs to be cnam_information to create the proper CNAM End User resource.
This API call will return the SID for the End User. You will need this in the next step.
Create CNAM End User





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

end_user = client.trusthub.v1.end_users.create(
    friendly_name="YOUR_END_USER_FRIENDLY_NAME",
    attributes={"cnam_display_name": "DISPLAY NAME"},
    type="cnam_information",
)

print(end_user.sid)
Response



Copy response
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "YOUR_END_USER_FRIENDLY_NAME",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "cnam_display_name": "DISPLAY NAME"
  },
  "type": "cnam_information"
}
Connect your CNAM Trust Product to your End User
You will need the End User SID from the previous step.
You will also need the CNAM Trust Product SID, returned from the API call in Step 3
To retrieve this SID via API, see the Additional API Calls section below.
Connect your CNAM Trust Product to your End User





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

trust_products_entity_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_entity_assignments.create(object_sid="YOUR_CNAM_END_USER_SID")

print(trust_products_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_CNAM_END_USER_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Add Phone Number to CNAM Trust Product
You'll need the CNAM Trust Product SID, returned from the API call in Step 3
You'll need the Phone Number SID(s) you assigned to your Business Profile earlier. (Note: Only those phone numbers already assigned to your Business Profile are eligible)
You'll need your Business Profile SID. It starts with "BU".
To retrieve any of these SIDs via API, see the Additional API Calls section below.
Note: Don't change the ChannelEndpointType
Assign Phone Numbers to your CNAM Trust Product





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

trust_products_channel_endpoint_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_channel_endpoint_assignment.create(
    channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    channel_endpoint_type="phone-number",
)

print(trust_products_channel_endpoint_assignment.sid)
Response



Copy response
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Submit CNAM Trust Product
Submit CNAM Trust Product for Vetting





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

trust_product = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).update(status="pending-review")

print(trust_product.sid)
Response



Copy response
{
  "sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "pending-review",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
Learn more about Business Profiles and other Trust Products in the Trust Hub Docs.


(information)
Info
After your CNAM Trust Product reaches "Twilio-Approved", the display name may take 48-72 hours to propagate to all carriers in the United States.
Additional API Calls





Get Phone Number SIDs from Parent Account





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

incoming_phone_numbers = client.incoming_phone_numbers.list(limit=20)

for record in incoming_phone_numbers:
    print(record.account_sid)
Response



Copy response
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0",
  "incoming_phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "address_requirements": "none",
      "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "beta": null,
      "capabilities": {
        "voice": true,
        "sms": false,
        "mms": true,
        "fax": false
      },
      "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
      "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
      "emergency_status": "Active",
      "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "emergency_address_status": "registered",
      "friendly_name": "(808) 925-5327",
      "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "origin": "origin",
      "phone_number": "+18089255327",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_application_sid": "",
      "sms_fallback_method": "POST",
      "sms_fallback_url": "",
      "sms_method": "POST",
      "sms_url": "",
      "status_callback": "",
      "status_callback_method": "POST",
      "trunk_sid": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_application_sid": "",
      "voice_caller_id_lookup": false,
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_url": null,
      "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "voice_receive_mode": "voice",
      "status": "in-use",
      "type": "local"
    }
  ],
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0"
}
Check Business Profile Phone Number Assignments





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

customer_profiles_channel_endpoint_assignments = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
Get Business Profile SIDs





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

customer_profiles = client.trusthub.v1.customer_profiles.list(limit=20)

for record in customer_profiles:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "status": "twilio-approved",
      "email": "notification@email.com",
      "status_callback": "http://www.example.com",
      "valid_until": "2020-07-31T01:00:00Z",
      "date_created": "2019-07-30T22:29:24Z",
      "date_updated": "2019-07-31T01:09:00Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
        "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
        "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
      },
      "errors": [
        {
          "code": 18601
        }
      ]
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
Check Business Profile Phone Number Assignments





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

customer_profiles_channel_endpoint_assignments = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
Fetch Trust Product SIDs





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

trust_products = client.trusthub.v1.trust_products.list(limit=20)

for record in trust_products:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "status": "twilio-approved",
      "email": "notification@email.com",
      "status_callback": "http://www.example.com",
      "valid_until": "2020-07-31T01:00:00Z",
      "date_created": "2019-07-30T22:29:24Z",
      "date_updated": "2019-07-31T01:09:00Z",
      "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
        "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
        "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
      },
      "errors": null
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/TrustProducts?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/TrustProducts?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
Check CNAM Phone Number Assignments





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

trust_products_channel_endpoint_assignments = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_channel_endpoint_assignment.list(limit=20)

for record in trust_products_channel_endpoint_assignments:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}