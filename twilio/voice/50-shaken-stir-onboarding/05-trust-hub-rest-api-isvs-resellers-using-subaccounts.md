# SHAKEN/STIR Onboarding - Trust Hub REST API (ISVs/Resellers using Subaccounts)





(information)
Info
For general information on the Trust Hub API, go to the Trust Hub API Docs.
This page walks ISVs/Resellers using subaccounts through creating a SHAKEN/STIR Trust Product with the Trust Hub REST API.

Not an ISV/Reseller using subaccounts? Find the appropriate onboarding instructions below:

Direct Customer (no Subaccounts)
Direct Customer using Subaccounts
ISV/Reseller with single, top-level project
Overview:





There are three main sections in this guide:

Create Primary Business Profile in the Console
Create Secondary Business Profile under Customer Subaccount, Add Phone Numbers
Create Secondary Business Profile, Connect to Primary Business Profile
Create a Supporting Document, Connect to Secondary Business Profile
Create Business Information, Connect to Secondary Business Profile
Create Authorized Representative, Connect to Secondary Business Profile
Add Phone Numbers to Secondary Business Profile
Submit Secondary Business Profile for Vetting
Create Trust Product, Add Phone Numbers, and Submit for Vetting
SHAKEN/STIR onboarding flow for ISVs with subaccounts, showing business profiles and attestation levels.

Expand image
Create a Primary Business Profile in your Parent Account in the Console's Trust Hub and submit for vetting.





In your Console, navigate to Trust Hub -> Customer Profiles

 to create your profile.
You will only need to do this one time.
For more information on Business Profiles and vetting, go to the Trust Hub Docs.
Create Secondary Business Profile for Customer Subaccount





1. Create a Secondary Business Profile for your Customer's Subaccount





You will want to save the sid from the response. This is your Secondary Business Profile SID, and you will need it for the next step.
Do not change the PolicySID in the API call below. This is a static value that will be the same across all accounts.
Create Secondary Business Profile under Customer Subaccount





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

customer_profile = client.trusthub.v1.customer_profiles.create(
    friendly_name="YOUR_FRIENDLY_NAME_FOR_SECONDARY_CUSTOMER_PROFILE",
    email="EMAIL@EXAMPLE.COM",
    policy_sid="RNdfbf3fae0e1107f8aded0e7cead80bf5",
)

print(customer_profile.sid)
Response



Copy response
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNdfbf3fae0e1107f8aded0e7cead80bf5",
  "friendly_name": "YOUR_FRIENDLY_NAME_FOR_SECONDARY_CUSTOMER_PROFILE",
  "status": "draft",
  "email": "EMAIL@EXAMPLE.COM",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
2. Connect the Secondary Business Profile to your Primary Business Profile





You'll need your Secondary Business Profile's SID, which was returned in the previous step.
You'll need your Primary Business Profile SID.
To retrieve these SIDs via the API, see the Additional API Calls section below. You can also find them in the Console under Trust Hub

.
Connect the Secondary Business Profile to Primary Business Profile





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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
).customer_profiles_entity_assignments.create(
    object_sid="YOUR_PRIMARY_BUSINESS_PROFILE_SID"
)

print(customer_profiles_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_PRIMARY_BUSINESS_PROFILE_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
3. Create a Supporting Document





You will need the Address SID for the Secondary Business.
If you already created an address for your Secondary Business, you can find it in the Console under Trust Hub

.
If you prefer to use an API to create an Address or retrieve Address SIDs, see the Additional API Calls section below. For more detailed Address API Info, go to the REST API: Addresses page.
This will return the SID for the Supporting Document. You will need this for the next step.
The Supporting Document SID will start with "RD"
Create a Supporting Document





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

supporting_document = client.trusthub.v1.supporting_documents.create(
    attributes={"address_sids": "YOUR_CUSTOMER_ADDRESS_SID"},
    friendly_name="YOUR_CUSTOMER_FRIENDLY_NAME",
    type="customer_profile_address",
)

print(supporting_document.sid)
Response



Copy response
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "YOUR_CUSTOMER_FRIENDLY_NAME",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "YOUR_CUSTOMER_ADDRESS_SID"
  },
  "type": "customer_profile_address",
  "mime_type": null
}
4. Connect the Supporting Document to your Secondary Business Profile





You will need your Secondary Business Profile SID used earlier.
You will need the Supporting Document SID, which was returned in the previous step.
If you need to retrieve the Supporting Document SID via API, see the Additional API Calls section below.
Connect the Supporting Document to your Secondary Business Profile





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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "YOUR_SECONDARY_CUSTOMER_PROFILE_SID"
).customer_profiles_entity_assignments.create(
    object_sid="YOUR_SUPPORTING_DOCUMENT_SID"
)

print(customer_profiles_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_SECONDARY_CUSTOMER_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_SUPPORTING_DOCUMENT_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
5. Create Business Information for the Secondary Business Profile





You will need the following information about your Secondary Business:

Parameter	Definition/Possible Values
business_name

required	Definition: Your Secondary Business' legal business name

Possible Values: [any string]
business_identity

required	Definition: Your Secondary Business' structure.

Possible Values:

direct_customer

isv_reseller_or_partner

unknown
business_type

required	Definition: Business type for your Secondary Business

Possible Values:

Sole Proprietorship

Partnership

Limited Liability Corporation

Corporation

Co-operative

Limited Liability Partnership

Non-profit
business_industry

required	Definition: Industry of Secondary Business

Possible Values: AUTOMOTIVE

AGRICULTURE

BANKING

CONSUMER

EDUCATION

ENGINEERING

ENERGY

OIL_AND_GAS

FAST_MOVING_CONSUMER_GOODS

FINANCIAL

FINTECH

FOOD_AND_BEVERAGE

GOVERNMENT

HEALTHCARE

HOSPITALITY

INSURANCE

LEGAL

MANUFACTURING

MEDIA

ONLINE

RAW_MATERIALS

REAL_ESTATE

RELIGION

RETAIL

JEWELRY

TECHNOLOGY

TELECOMMUNICATIONS

TRANSPORTATION

TRAVEL

ELECTRONICS

NOT_FOR_PROFIT
business_registration_identifier

required	Definition: The official method used to register the Secondary Business' identity.

Possible Values:

USA: DUNS Number (Dun & Bradstreet)

USA: Employer Identification Number (EIN)
business_registration_number

required	Definition: The number used to identify your Secondary Business of the type chosen for your business_registration_identifier

Possible Values: [numerical string for USA types]
business_regions_of_operation

required	Definition: Regions your Secondary Business

AFRICA

ASIA

EUROPE

LATIN_AMERICA

USA_AND_CANADA
website_url

required	Definition: The URL for the Secondary Business' website

Possible Values: [any valid URL string]
social_media_profile_urls

optional	Definition: The URL(s) for the Secondary Business' social media accounts (i.e. LinkedIn, Facebook, Twitter)

Possible Values: [any valid URL string]
Do not change the Type value. It must be customer_profile_business_information in order to create the correct resource.

You'll need the Business Information SID returned from this API call for the next step.

(error)
Danger
Updates are coming to Twilio's Starter Brand registration based on changes from The Campaign Registry (TCR)

 and mobile carriers. We will provide updates on how this change may impact US A2P 10DLC registration as soon as they are available. Brands with EINs will no longer be able to use Twilio's Starter Brand registration going forward.

In the meantime, if you are registering on behalf of an organization with an EIN/Tax ID, please complete a Standard registration.
Create Business Information for Secondary Business Profile





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
    type="customer_profile_business_information",
    friendly_name="YOUR_CUSTOMER_FRIENDLY_NAME",
    attributes={
        "business_name": "YOUR_SECONDARY_BUSINESS_NAME",
        "business_identity": "YOUR_SECONDARY_BUSINESS_IDENTITY",
        "business_type": "YOUR_SECONDARY_BUSINESS_TYPE",
        "business_industry": "YOUR_SECONDARY_BUSINESS_INDUSTRY",
        "business_registration_identifier": "YOUR_SECONDARY_BUSINESS_IDENTIFIER",
        "business_registration_number": "YOUR_SECONDARY_BUSINESS_REGISTRATION_NUMBER",
        "business_regions_of_operation": "YOUR_SECONDARY_BUSINESS_REGIONS_OF_OPERATION",
        "website_url": "YOUR_SECONDARY_BUSINESS_URL",
        "social_media_profile_urls": "",
    },
)

print(end_user.sid)
Response



Copy response
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "YOUR_CUSTOMER_FRIENDLY_NAME",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "business_name": "YOUR_SECONDARY_BUSINESS_NAME",
    "business_identity": "YOUR_SECONDARY_BUSINESS_IDENTITY",
    "business_type": "YOUR_SECONDARY_BUSINESS_TYPE",
    "business_industry": "YOUR_SECONDARY_BUSINESS_INDUSTRY",
    "business_registration_identifier": "YOUR_SECONDARY_BUSINESS_IDENTIFIER",
    "business_registration_number": "YOUR_SECONDARY_BUSINESS_REGISTRATION_NUMBER",
    "business_regions_of_operation": "YOUR_SECONDARY_BUSINESS_REGIONS_OF_OPERATION",
    "website_url": "YOUR_SECONDARY_BUSINESS_URL",
    "social_media_profile_urls": ""
  },
  "type": "customer_profile_business_information"
}
6. Connect Business Information to Secondary Business Profile





You will need the Customer Profile Business Information SID, which was returned in the last step.
The Customer Profile Business Information SID will start with "IT".
To find your Customer Profile Business Information SID via API, see the Read all End Users call in the Additional API Calls section.
Connect Business Information to Secondary Business Profile





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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
).customer_profiles_entity_assignments.create(
    object_sid="YOUR_CUSTOMER_PROFILE_BUSINESS_INFORMATION_SID"
)

print(customer_profiles_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_CUSTOMER_PROFILE_BUSINESS_INFORMATION_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
7. Create an Authorized Representative for your Secondary Business Profile





You must add one Authorized Representative as a contact for the Secondary Business.
A second Authorized Representative is optional.
To add a second representative repeat this step with the second Authorized Representative's information, but you will need to change the Type parameter to authorized_representative_2
Information you will need:
First Name
Last Name
Email
Phone Number
Business Title
Job Position
Possible Values: Director, GM, VP, CEO, CFO, General Counsel
This call will return the Authorized Representative's SID. You will need this for the next step.
Create an Authorized Representative





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
    friendly_name="YOUR_SECONDARY_BUSINESS_FRIENDLY_NAME",
    type="authorized_representative_1",
    attributes={
        "first_name": "REPRESENTATIVE_FIRST_NAME",
        "last_name": "REPRESENTATIVE_LAST_NAME",
        "email": "EMAIL@EXAMPLE.COM",
        "phone_number": "+1XXXXXXXXXX",
        "business_title": "BUSINESS_TITLE",
        "job_position": "JOB_POSITION",
    },
)

print(end_user.sid)
Response



Copy response
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "YOUR_SECONDARY_BUSINESS_FRIENDLY_NAME",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "first_name": "REPRESENTATIVE_FIRST_NAME",
    "last_name": "REPRESENTATIVE_LAST_NAME",
    "email": "EMAIL@EXAMPLE.COM",
    "phone_number": "+1XXXXXXXXXX",
    "business_title": "BUSINESS_TITLE",
    "job_position": "JOB_POSITION"
  },
  "type": "authorized_representative_1"
}
8. Connect Authorized Representative to Secondary Business Profile





You will need the Authorized Representative's SID, which was returned in the last API call.
To find the SID via API, see the Read all End Users call in the Additional API Calls section below.
If you added a second Authorized Representative, you will need to repeat this call with that Representative's SID.
Connect Authorized Representative to Secondary Business Profile





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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
).customer_profiles_entity_assignments.create(
    object_sid="YOUR_AUTHORIZED_REPRESENTATIVE_SID"
)

print(customer_profiles_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_AUTHORIZED_REPRESENTATIVE_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
9. Add Phone Number(s) to Secondary Business Profile





You will need your Secondary Business Profile SID.
You'll also need your Phone Number SID(s)
To find your Phone Number SIDs in the Console, go to your Dashboard for your Customer Subaccount. In the Project Info section, click on See all phone numbers, then click on a phone number to find the SID.
To find your Phone Number SIDs via API, see the Additional API Calls section below.
Phone Number SIDs begin with "PN".
In the API Call below, don't change the ChannelEndpointType. It needs to be phone-number to add a phone number to your Business Profile.
Add Phone Number to Secondary Business Profile





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
        "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
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
  "customer_profile_sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
10. Submit Secondary Business Profile





You will need your Secondary Business Profile SID.
Do not change the value of the Status parameter. pending-review is needed to properly submit your Secondary Business Profile
Submit Secondary Business Profile





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

customer_profile = client.trusthub.v1.customer_profiles(
    "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
).update(status="pending-review")

print(customer_profile.sid)
Response



Copy response
{
  "sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "pending-review",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
Create Trust Product, Add Phone Numbers, and Submit for Vetting





1. Create a SHAKEN/STIR Trust Product





Note: Do not change the policy_sid from the example below. This is a static value that will stay the same across all accounts.
The response will contain the SID for your Trust Product. You'll need this for the next step.
Create SHAKEN/STIR Trust Product





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
    policy_sid="RN7a97559effdf62d00f4298208492a5ea",
)

print(trust_product.sid)
Response



Copy response
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RN7a97559effdf62d00f4298208492a5ea",
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
2. Connect your SHAKEN/STIR Trust Product to your Secondary Business Profile





You'll need your Trust Product's SID. This was returned by the previous API call.
You'll need your Secondary Business Profile's SID.
To retrieve these SIDs via the API, see the Additional API Calls section below. You can also find them in the Console under Trust Hub.
Connect your SHAKEN/STIR Trust Product to your Secondary Business Profile





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
    "YOUR_TRUST_PRODUCT_SID"
).trust_products_entity_assignments.create(
    object_sid="YOUR_SECONDARY_BUSINESS_PROFILE_SID"
)

print(trust_products_entity_assignment.sid)
Response



Copy response
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_SECONDARY_BUSINESS_PROFILE_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
3. Assign phone numbers to your SHAKEN/STIR Trust Product





You'll need the Phone Number SID(s) you assigned to your Business Profile earlier. (Note: Only those phone numbers already assigned to your Secondary Business Profile are eligible)
You'll need your Trust Product SID.
Don't change the ChannelEndpointType
You can complete this step before or after submitting your SHAKEN/STIR Trust Product for vetting
To check your Secondary Business Profile's phone numbers via API, see the Additional API Calls section below.
Assign Phone Numbers to SHAKEN/STIR Trust Product





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
    "YOUR_TRUST_PRODUCT_SID"
).trust_products_channel_endpoint_assignment.create(
    channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    channel_endpoint_type="phone-number",
)

print(trust_products_channel_endpoint_assignment.sid)
Response



Copy response
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
4. Submit your SHAKEN/STIR Trust Product for vetting





Once it reaches Twilio-Approved status, you will be able to sign outbound calls with "A" level attestation.
Submit SHAKEN/STIR Trust Product for Vetting





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
    "YOUR_TRUST_PRODUCT_SID"
).update(
    status="pending-review",
    status_callback="https://www.yourcallbackuri.com/webhook",
)

print(trust_product.sid)
Response



Copy response
{
  "sid": "YOUR_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "pending-review",
  "email": "notification@email.com",
  "status_callback": "https://www.yourcallbackuri.com/webhook",
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
Including the status callback URL allows Twilio to send notifications to your webhook. The status callback URL, shown in the previous example, isn't required.

Twilio sends notifications about the approval status over email and to this webhook.

Additional API Calls





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
Create an Address Resource





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

address = client.addresses.create(
    customer_name="YOUR_CUSTOMER_NAME",
    street="CUSTOMER_STREET",
    city="CUSTOMER_CITY",
    region="CUSTOMER_STATE_OR_REGION",
    postal_code="CUSTOMER_POSTAL_CODE",
    iso_country="BB",
)

print(address.account_sid)
Response



Copy response
{
  "account_sid": "YOUR_PARENT_ACCOUNT_OR_SUBACCOUNT_SID",
  "city": "CUSTOMER_CITY",
  "customer_name": "YOUR_CUSTOMER_NAME",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "BB",
  "postal_code": "CUSTOMER_POSTAL_CODE",
  "region": "CUSTOMER_STATE_OR_REGION",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "CUSTOMER_STREET",
  "street_secondary": "Suite 300",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
Retrieve Address SIDs





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

addresses = client.addresses.list(limit=20)

for record in addresses:
    print(record.account_sid)
Response



Copy response
{
  "addresses": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "city": "SF",
      "customer_name": "name",
      "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
      "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
      "emergency_enabled": false,
      "friendly_name": "Main Office",
      "iso_country": "US",
      "postal_code": "94019",
      "region": "CA",
      "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "street": "4th",
      "street_secondary": null,
      "validated": false,
      "verified": false,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses.json?FriendlyName=friendly_name&IsoCountry=US&CustomerName=customer_name&PageSize=50&Page=0"
}
Retrieve Supporting Document SIDs





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

supporting_documents = client.trusthub.v1.supporting_documents.list(limit=20)

for record in supporting_documents:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "status": "DRAFT",
      "date_updated": "2021-02-11T17:23:00Z",
      "friendly_name": "Business-profile-physical-address",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2021-02-11T17:23:00Z",
      "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": {
        "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "type": "customer_profile_address",
      "mime_type": null
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/SupportingDocuments?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/SupportingDocuments?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
Read all End Users





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

end_users = client.trusthub.v1.end_users.list(limit=20)

for record in end_users:
    print(record.sid)
Response



Copy response
{
  "results": [
    {
      "date_updated": "2021-02-16T20:40:57Z",
      "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "auth_rep_1",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2021-02-16T20:40:57Z",
      "attributes": {
        "phone_number": "+11234567890",
        "job_position": "CEO",
        "first_name": "rep1",
        "last_name": "test",
        "business_title": "ceo",
        "email": "foobar@test.com"
      },
      "type": "authorized_representative_1"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/EndUsers?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/EndUsers?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
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
Check Secondary Business Profile Phone Number Assignments





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
        "YOUR_SECONDARY_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.channel_endpoint_sid)
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