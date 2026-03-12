# Branded Calling - US Basic Branded Calling

Display your business name on the called party's mobile phone when they receive your call. This helps your customers identify your calls and increases the likelihood that they will answer.


(new)
Public Beta
US Basic Branded Calling is currently available as a Public Beta product, and the information contained in this document is subject to change. This means that some features aren't yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products aren't covered by the Twilio Support Terms or Twilio Service Level Agreement (SLA).
Note: Branded Calling works on mobile phones. For landlines, use Caller ID Name (CNAM) instead.

Coverage





US Basic Branded Calling supports the following networks:

Country	Network
United States	T-Mobile, Verizon
Eligibility





US Basic Branded Calling is available for both direct customers of Twilio and Independent Software Vendors (ISVs). If you need assistance with the Branded Calling registration process, contact your Twilio account manager.

To use Branded Calling, you must meet the following requirements:

You have legal authority to use the Branded Calling display name.
You can't use Branded Calling for illegal purposes, such as to deceive or mislead customers. If you get a high number of SIP 608 or 603 responses in your outbound calls, you might not be able to use Branded Calling. Learn more about recommendations and best practices for maintaining a positive caller reputation

.
Prerequisites





Before you begin, you must complete the following tasks:

Purchase one or more Twilio phone numbers.
Create a primary or secondary Business Profile and have it approved.
Create a Voice Integrity instance and have it approved. Voice Integrity lets you register your phone numbers with analytic vendors to reduce spam labeling. Learn more about how to onboard Voice Integrity.
Register your phone numbers with the Business Profile and with Voice Integrity. You'll need your Voice Integrity SID

.
Prepare a short description of your Branded Calling use case.
Register your brand





In the Twilio Console, on the Branded Calling Trust Product

 page, click Register branded calling and follow the instructions.

Branded Calling bundle guidelines





When you register your brand, keep the following in mind:

A Branded Calling bundle is associated with one display name and one or more phone numbers.
A phone number can be associated with only one Branded Calling bundle.
You must create a new Branded Calling bundle for each display name you want to register.
Display name restrictions





Maximum 15 characters for Verizon and 32 characters for T-Mobile
Must be related to your business name
Must not contain Personally Identifiable Information (PII)
Must not contain web links
Letters and numbers only
For more information, see the Branded Calling FAQ

.

Review process





When you register your brand, Twilio reviews your submission to make sure it meets all requirements. The review process can take up to seven days.

Billing





Twilio charges all applicable Branded Calling fees to the account where the Branded Calling bundle is created.
Twilio bills you only when the brand information is successfully delivered. If the brand information isn't delivered, Twilio doesn't charge you for that call.
Learn more about Branded Calling pricing

.

Manage your Branded Calling bundle





You can manage your Branded Calling bundle in the Twilio Console. To use the API to manage your Branded Calling bundle, see API requests.

Assign phone numbers to your Branded Calling bundle





In the Twilio Console, on the Branded Calling Trust Product

 page, click Branded Calling.
Select a Branded Calling bundle you want to update.
Click the Assigned phone numbers tab.
Click Add phone numbers, select the phone numbers you want to add, and click Save.
Twilio reviews the new assigned phone numbers before adding them to the Branded Calling bundle. This can take 24 to 48 hours.

Note: After you assign a phone number to an approved bundle, the branded information can take up to two hours to appear on recipients' mobile devices.

Unassign phone numbers from your Branded Calling bundle






(information)
Info
It can take 24 to 48 hours for the carrier to fully remove the branded display name from their system.
In the Twilio Console, on the Branded Calling Trust Product

 page, click Branded Calling.
Select a Branded Calling bundle you want to update.
Click the Assigned phone numbers tab.
Select the phone numbers you want to remove, and click Unassign.
The phone numbers will no longer be associated with the Branded Calling bundle and won't display the branded display name.

API requests





You can do the following tasks using the Trust Products API:

Assign phone numbers to your Branded Calling bundle.
Retrieve Assignment SIDs for your Branded Calling bundle.
Unassign phone numbers from your Branded Calling bundle.
Assign phone numbers to your Branded Calling bundle





Make a POST /v1/TrustProducts/YOUR_BRANDED_CALLING_SID/ChannelEndpointAssignments request to assign phone numbers to your Branded Calling bundle.

Your Branded Calling SID begins with BU. You can find the Branded Calling SID on the Branded Calling Trust Product

 page in the Trust Hub.
Your Phone Number SID begins with PN. Make sure that you've registered the phone number with your Voice Integrity instance.
The response includes an Sid that starts with RA. This is the Assignment SID that you'll use to unassign the phone number later.
Learn how to check your Branded Calling SIDs, Phone Number SIDs, and Business Profile SIDs.


(warning)
Warning
The ChannelEndpointType or channel_endpoint_type value must be phone-number. Don't change this value.
Assign phone numbers to your Branded Calling bundle





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
    "YOUR_BRANDED_CALLING_SID"
).trust_products_channel_endpoint_assignment.create(
    channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    channel_endpoint_type="phone-number",
)

print(trust_products_channel_endpoint_assignment.sid)
Response



Copy response
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_BRANDED_CALLING_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
Retrieve Assignment SIDs





Make a GET /v1/TrustProducts/YOUR_BRANDED_CALLING_SID/ChannelEndpointAssignments request to retrieve a list of Assignment SIDs (Sid) for your Branded Calling bundle.

Retrieve a list of Assignment SIDs





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
    "YOUR_BRANDED_CALLING_SID"
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
Unassign a phone number from your Branded Calling bundle





Make a DELETE /v1/TrustProducts/YOUR_BRANDED_CALLING_SID/ChannelEndpointAssignments/YOUR_ASSIGNMENT_SID request to unassign a phone number from your Branded Calling bundle.

When you unassign a phone number, it's no longer associated with the Branded Calling bundle and doesn't display the display name when making calls.

Unassign a phone number from your Branded Calling bundle





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

client.trusthub.v1.trust_products(
    "YOUR_BRANDED_CALLING_SID"
).trust_products_channel_endpoint_assignment("YOUR_ASSIGNMENT_SID").delete()
Additional API requests





Check your Branded Calling SIDs, Phone Number SIDs, and Business Profile SIDs.

Retrieve Branded Calling SIDs





Retrieve Branded Calling SIDs





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
Retrieve Phone Number SIDs from a parent account





Retrieve Phone Number SIDs from a parent account





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
Retrieve Business Profile SIDs





Retrieve Business Profile SIDs





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
Retrieve phone number assignments for a Business profile





Retrieve phone number assignments for a Business profile





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
Next steps





Learn more about Customer Profiles and other Trust Products in the Trust Hub documentation.
Learn more about the Customer Profiles API and Trust Products API.