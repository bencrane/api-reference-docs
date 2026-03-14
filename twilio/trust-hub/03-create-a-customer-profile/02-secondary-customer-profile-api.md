# API: Create a Secondary Customer Profile

To create a secondary customer profile using the API, gather details about that business, create the regulatory bundle components, and assign them to an empty regulatory bundle.

## Prerequisites

### Twilio Primary Customer Profile

A Primary Customer Profile in the `twilio-approved` state created in the same account.

### Business Registration Data

Gather the following data for your business.

| Property | Necessity | Accepted values |
|----------|-----------|-----------------|
| Business Identity | Required | `direct_customer`, `isv_reseller_or_partner`, `unknown` |
| Business Type | Required | `Sole Proprietorship`, `Partnership`, `Limited Liability Corporation`, `Co-operative`, `Non-profit Corporation`, `Corporation` |
| Business Industry | Required | `AGRICULTURE`, `AUTOMOTIVE`, `BANKING`, `CONSUMER`, `EDUCATION`, `ELECTRONICS`, `ENERGY`, `ENGINEERING`, `FAST_MOVING_CONSUMER_GOODS`, `FINANCIAL`, `FINTECH`, `FOOD_AND_BEVERAGE`, `GOVERNMENT`, `HEALTHCARE`, `HOSPITALITY`, `INSURANCE`, `JEWELRY`, `LEGAL`, `MANUFACTURING`, `MEDIA`, `NOT_FOR_PROFIT`, `OIL_AND_GAS`, `ONLINE`, `RAW_MATERIALS`, `REAL_ESTATE`, `RELIGION`, `RETAIL`, `TECHNOLOGY`, `TELECOMMUNICATIONS`, `TRANSPORTATION`, `TRAVEL` |
| Business Registration ID Type | Required | `EIN` (US), `CBN` (CA), `CN` (UK), `ACN` (AU), `CIN` (IN), `VAT` (EU), `VATRN` (RO), `RN` (IS), `Other` |
| Name of Other Registration Type | If Other | |
| Business Registration Number | Required | Varies by country |
| Business Regions of Operations | Required | `AFRICA`, `ASIA`, `EUROPE`, `LATIN_AMERICA`, `USA_AND_CANADA`, `AUSTRALIA` |
| Website URL | Required | HTTP URL as set in RFC 1738 3.3 |
| Social Media Profile URL | Optional | HTTP URL as set in RFC 1738 3.3 |

### Representative Data

For each representative of the entity set in the CustomerProfile, collect the following data.

| Attribute | Accepted values | Example |
|-----------|-----------------|---------|
| Last Name | Any string | Smith |
| First Name | Any string | Alex |
| Email | Email address | alex.smith@example.com |
| Business Title | Any string | Head of Product Management |
| Job Position | `Director`, `GM`, `VP`, `CEO`, `CFO`, `General Counsel`, `Other` | VP |
| Phone Number | Sequence of integers | 8005550100 |
| Country Code | Telephone country code | +1 |

---

## Create a Compliant Secondary Customer Profile

### Step 1: Fetch Your Policy SID

Fetch the Policy SID for your Primary Customer Profile.

#### Fetch one CustomerProfile resource

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profile = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(customer_profile.sid)
```

#### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  ...
}
```

Copy the `policy_sid` from the response. To create a regulatory bundle, you need this Policy SID.

---

### Step 2: Create an Empty Regulatory Bundle

A regulatory bundle needs data about the company or individual requesting regulatory approval for a specific phone number.

Create an empty regulatory bundle. To create this bundle, provide the following parameters:

- `Email`
- `FriendlyName`
- `PolicySid`
- `StatusCallback`

To find acceptable values for these parameters, see Request body parameters for the Profiles resource.

#### Create an empty Secondary Customer Profile Bundle

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profile = client.trusthub.v1.customer_profiles.create(
    email="email",
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status_callback="http://www.example.com",
)

print(customer_profile.account_sid)
```

#### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "email",
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
```

---

### Step 3: Create Components for Regulatory Bundle

Each regulatory bundle needs four components:

1. Identity of the business
2. Identity of representatives of the business
3. Physical location of the business
4. Documentation that verifies the business identity and address

To add these components into Trust Hub, call three API resources: EndUser three times, Accounts, and SupportingDocuments.

> **Danger**
>
> Updates are coming to Twilio's Starter Brand registration based on changes from The Campaign Registry (TCR) and mobile carriers. We will provide updates on how this change may impact US A2P 10DLC registration as soon as they are available. Brands with EINs will no longer be able to use Twilio's Starter Brand registration going forward.
>
> In the meantime, if you are registering on behalf of an organization with an EIN/Tax ID, please complete a Standard registration.

#### Create EndUser of type: customer_profile_business_information

Provide your business identity data.

```python
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
    friendly_name="friendly name",
    attributes={
        "business_name": "acme business",
        "social_media_profile_urls": "",
        "website_url": "example.com",
        "business_regions_of_operation": "USA_AND_CANADA",
        "business_type": "Partnership",
        "business_registration_identifier": "DUNS",
        "business_identity": "direct_customer",
        "business_industry": "EDUCATION",
        "business_registration_number": "123456789",
    },
)

print(end_user.sid)
```

##### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly name",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "business_name": "acme business",
    "social_media_profile_urls": "",
    "website_url": "example.com",
    "business_regions_of_operation": "USA_AND_CANADA",
    "business_type": "Partnership",
    "business_registration_identifier": "DUNS",
    "business_identity": "direct_customer",
    "business_industry": "EDUCATION",
    "business_registration_number": "123456789"
  },
  "type": "customer_profile_business_information"
}
```

#### Create EndUser of type: authorized_representative_1

Provide data about your first authorized representative.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users.create(
    type="authorized_representative_1",
    friendly_name="auth_rep_1",
    attributes={
        "job_position": "CEO",
        "last_name": "acme",
        "phone_number": "+11234567890",
        "first_name": "rep1",
        "email": "rep1@acme.com",
        "business_title": "ceo",
    },
)

print(end_user.sid)
```

##### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "auth_rep_1",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "job_position": "CEO",
    "last_name": "acme",
    "phone_number": "+11234567890",
    "first_name": "rep1",
    "email": "rep1@acme.com",
    "business_title": "ceo"
  },
  "type": "authorized_representative_1"
}
```

#### Create EndUser of type: authorized_representative_2

Provide data about your second authorized representative.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users.create(
    type="authorized_representative_2",
    friendly_name="auth_rep_2",
    attributes={
        "job_position": "CFO",
        "last_name": "acme",
        "phone_number": "+14345678900",
        "first_name": "rep2",
        "email": "rep2@acme.com",
        "business_title": "cfo",
    },
)

print(end_user.sid)
```

##### Response

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "auth_rep_2",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "job_position": "CFO",
    "last_name": "acme",
    "phone_number": "+14345678900",
    "first_name": "rep2",
    "email": "rep2@acme.com",
    "business_title": "cfo"
  },
  "type": "authorized_representative_2"
}
```

#### Create an Address

Provide the physical location for your business. If you already have an address SID, skip this step.

> **Warning**
>
> Twilio can't accept PO Boxes as your address.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

address = client.addresses.create(
    customer_name="name",
    street="555 AnyStreet",
    street_secondary="Apt B",
    city="Any City",
    region="Any Region",
    postal_code="12345",
    iso_country="US",
)

print(address.sid)
```

##### Response

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "city": "Any City",
  "customer_name": "name",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_upd": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "12345",
  "region": "Any Region",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "555 AnyStreet",
  "street_secondary": "Apt B",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

#### Create Supporting Document

Provide the supporting documentation about your business.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document = client.trusthub.v1.supporting_documents.create(
    type="customer_profile_address",
    friendly_name="address",
    attributes={"address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
)

print(supporting_document.sid)
```

##### Response

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "address",
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
```

---

### Step 4: Assign Components to Your Regulatory Bundle

Associate data with the empty bundle. Each component (supporting document/address, customer profile information, authorized representative 1, authorized representative 2) has its own `object_sid` to assign to the bundle.

#### Assign Customer Profile Business Information

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
```

##### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Assign Authorized Representative 1

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
```

##### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Assign Authorized Representative 2

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
```

##### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Assign a Primary Customer Profile

Assign the Customer Profile as an entity to another Customer Profile. Fetch the Primary Customer Profile SID from the primary account.

Add this SID as the value of the `ObjectSid` parameter. `ObjectSid` accepts a Customer Profile SID from the same account or from the primary account.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
```

##### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Assign a Supporting Document

Assign supporting documentation to the Secondary CustomerProfile instance.

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
```

##### Response

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Assign Phone Numbers

Assign phone numbers to your Secondary Customer Profile. To find your phone number SID, go to Phone Numbers in the Console.

```python
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
        "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).customer_profiles_channel_endpoint_assignment.create(
        channel_endpoint_type="phone-number",
        channel_endpoint_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    )
)

print(customer_profiles_channel_endpoint_assignment.sid)
```

##### Response

```json
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

---

### Step 5: Validate Your Secondary CustomerProfile

Evaluate the Secondary CustomerProfile instance.

#### Run an Evaluation

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_evaluation = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_evaluations.create(
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_evaluation.sid)
```

##### Response

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "noncompliant",
  "date_created": "2020-04-28T18:14:01Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "friendly_name": "Business",
      "object_type": "business",
      "passed": false,
      "failure_reason": "A Business End-User is missing. Please add one to the regulatory bundle.",
      "error_code": 22214,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Please enter in a Business Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Business Registration Number",
          "object_field": "business_registration_number",
          "failure_reason": "The Business Registration Number is missing. Please enter in a Business Registration Number on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Please enter in a First Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Please enter in a Last Name on the Business information.",
          "error_code": 22215
        }
      ],
      "requirement_friendly_name": "Business",
      "requirement_name": "business_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Or, it does not match the Business Name you entered within Business information. Please enter in the Business Name shown on the Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative or make sure both Business Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Name",
      "requirement_name": "business_name_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register showing French address",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register showing French address is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Address sid(s)",
          "object_field": "address_sids",
          "failure_reason": "The Address is missing. Please enter in the address shown on the Excerpt from the commercial register showing French address.",
          "error_code": 22219
        }
      ],
      "requirement_friendly_name": "Business Address (Proof of Address)",
      "requirement_name": "business_address_proof_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis)",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Document Number",
          "object_field": "document_number",
          "failure_reason": "The Document Number is missing. Please enter in the Document Number shown on the Excerpt from the commercial register (Extrait K-bis).",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Registration Number",
      "requirement_name": "business_reg_no_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Or, it does not match the First Name you entered within Business information. Please enter in the First Name shown on the Government-issued ID or make sure both First Name fields use the same exact inputs.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Or, it does not match the Last Name you entered within Business information. Please enter in the Last Name shown on the Government-issued ID or make sure both Last Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Authorized Representative",
      "requirement_name": "name_of_auth_rep_info"
    },
    {
      "friendly_name": "Executed Copy of Power of Attorney",
      "object_type": "power_of_attorney",
      "passed": false,
      "failure_reason": "An Executed Copy of Power of Attorney is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [],
      "requirement_friendly_name": "Power of Attorney",
      "requirement_name": "power_of_attorney_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing on the Governnment-Issued ID.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing on the Government-issued ID",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Person granted the Power of Attorney",
      "requirement_name": "name_in_power_of_attorney_info"
    }
  ]
}
```

---

### Step 6: Submit Your Secondary CustomerProfile

Submit the Secondary CustomerProfile instance for review.

#### Submit for Review

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profile = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(status="pending-review")

print(customer_profile.sid)
```

##### Response

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
```

---

## After Submission

After submission, Twilio performs an evaluation of your request.

- **If it complies:** Your Secondary Customer Profile state changes to `in-review` status.
- **If it doesn't comply:** Twilio rejects it and changes its status to `twilio-rejected`.
