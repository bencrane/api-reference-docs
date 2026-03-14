# A2P 10DLC - Standard and Low-Volume Standard Brand Onboarding Guide for ISVs

This is a step-by-step walkthrough for Independent Software Vendors (ISVs) who want to use Twilio REST API to register a customer. This guide covers registering a Standard Brand or Low-Volume Brand for A2P 10DLC.

Not sure if you're an ISV? Check out the Determine your customer type section on the A2P 10DLC Overview Page.

The onboarding process involves the following main steps:

1. Provide Twilio with your customer's business and contact information.
2. Create a Brand Registration for your customer that will be evaluated by The Campaign Registry (TCR).
3. Create a Campaign/Use Case for your customer that will be evaluated by TCR.

## Before you begin

This section covers the prerequisite steps you need to complete before attempting to register your customer for A2P 10DLC via API.

### Gather customer information

Twilio and TCR need specific information about your customer's business to register for A2P 10DLC. Visit the A2P 10DLC - Gather Business Information page to learn which information you need to collect from your customers.

### Update your SDK

If you plan to use one of the SDKs for this registration process, be sure you're using the latest version.

### Create a Primary Business Profile for your parent Twilio Account

Before onboarding your customers, you must have a Primary Business Profile with a Twilio Approved status.

Create your Primary Business Profile in the Trust Hub in the Console. Select ISV Reseller or Partner as your Business Type.

Make note of your Primary Business Profile SID. You need it in later steps in this guide.

### Use the correct Account SID

When making the API requests in this guide, use the Twilio Account SID and Auth Token for the Account your customer will use for A2P 10DLC messaging.

## Step 1: Provide Twilio with your customer's business information

The API requests in this section use the TrustHub API to create a Secondary Customer Profile. This is a collection of contact details and business information about your customer's business.

- In Step 1.1, you create a CustomerProfile resource (the "Secondary Customer Profile").
- In Steps 1.2-1.7, you create additional resources that contain business information, and then attach these resources to the CustomerProfile resource.
- After attaching all required information, you can check and submit the Secondary Customer Profile for review.

### 1.1. Create a Secondary Customer Profile

This step creates a CustomerProfile resource for your customer's business.

> **Info**
> If you've already registered customers within TrustHub for SHAKEN/STIR, Branded Calls, or CNAM, your customer may already have a Secondary Customer Profile.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profile = client.trusthub.v1.customer_profiles.create(
    policy_sid="RNdfbf3fae0e1107f8aded0e7cead80bf5",
    friendly_name="Acme, Inc. Secondary Customer Profile",
    email="acme-inc@example.com",
    status_callback="https://www.example.com/status-callback-endpoint",
)

print(customer_profile.sid)
```

### 1.2. Create an EndUser resource of type customer_profile_business_information

This step creates an EndUser resource containing your customer's business information.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users.create(
    attributes={
        "business_name": "Acme, Inc.",
        "social_media_profile_urls": "https://example.com/acme-social-media-profile",
        "website_url": "https://www.example.com",
        "business_regions_of_operation": "USA_AND_CANADA",
        "business_type": "Partnership",
        "business_registration_identifier": "EIN",
        "business_identity": "direct_customer",
        "business_industry": "EDUCATION",
        "business_registration_number": "123456789",
    },
    friendly_name="Acme, Inc. - Business Information EndUser resource",
    type="customer_profile_business_information",
)

print(end_user.sid)
```

### 1.3. Attach the EndUser to the Secondary Customer Profile

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
```

### 1.4. Create an EndUser resource of type: authorized_representative_1

This step provides required information about an authorized representative for your customer's business.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

end_user = client.trusthub.v1.end_users.create(
    attributes={
        "job_position": "CEO",
        "last_name": "Doe",
        "phone_number": "+12225557890",
        "first_name": "Jane",
        "email": "jdoe@example.com",
        "business_title": "CEO",
    },
    friendly_name="Acme, Inc Authorized Rep 1",
    type="authorized_representative_1",
)

print(end_user.sid)
```

### 1.5. Attach the EndUser resource to the Secondary Customer Profile

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
```

### 1.6. Create an Address resource

This API request creates an Address resource containing your customer's mailing address.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

address = client.addresses.create(
    customer_name="Acme, Inc.",
    street="1234 Market St",
    city="San Francisco",
    region="CA",
    postal_code="12345",
    iso_country="US",
)

print(address.account_sid)
```

### 1.7. Create a SupportingDocument resource

This step creates a SupportingDocument resource to store the Address information.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

supporting_document = client.trusthub.v1.supporting_documents.create(
    friendly_name="acme",
    type="customer_profile_address",
    attributes={"address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"},
)

print(supporting_document.sid)
```

### 1.8. Attach the SupportingDocument resource to the Secondary Customer Profile

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
```

### 1.9. Check the Secondary Customer Profile's status

Before submitting, verify all required information has been attached.

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profiles_evaluations = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_evaluations.create(policy_sid="RNdfbf3fae0e1107f8aded0e7cead80bf5")

print(customer_profiles_evaluations.status)
```

### 1.10. Submit the Secondary Customer Profile for review

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

customer_profile = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(status="pending-review")

print(customer_profile.status)
```

## Step 2: Register the Brand

After the Secondary Customer Profile is approved, register a Brand for your customer.

### 2.1. Create a BrandRegistration

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registration = client.messaging.v1.brand_registrations.create(
    customer_profile_bundle_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    a2p_profile_bundle_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(brand_registration.sid)
```

## Step 3: Register the Campaign

After the Brand is registered, create a Campaign for your customer's messaging use case.

### 3.1. Create a Messaging Service

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

service = client.messaging.v1.services.create(friendly_name="My Messaging Service")

print(service.sid)
```

### 3.2. Add phone numbers to the Messaging Service

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

phone_number = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(phone_number_sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(phone_number.sid)
```

### 3.3. Create the Campaign (UsAppToPerson)

```python
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person.create(
    brand_registration_sid="BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    description="Send marketing messages about sales and offers",
    message_samples=["Hi! Your order has shipped.", "Your package arrives tomorrow."],
    us_app_to_person_usecase="MARKETING",
    has_embedded_links=True,
    has_embedded_phone=False,
)

print(us_app_to_person.sid)
```

## Get help with A2P 10DLC

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
