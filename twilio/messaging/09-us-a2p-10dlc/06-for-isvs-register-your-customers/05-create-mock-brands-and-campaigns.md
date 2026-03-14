# Create Mock US A2P 10DLC Brands and Campaigns

> **Info**
> New to US A2P 10DLC? See "What is A2P 10DLC?" (support article) for more information.

This guide shows you how to create a mock US A2P 10DLC Brand and Campaign that you can use to test and develop applications with. While the creation process of mock and real Brands and Campaigns is similar, there are some key differences to keep in mind:

- There are no A2P 10DLC fees from The Campaign Registry (TCR) or billing events for creating mock Brands and Campaigns because there is no vetting or validation of the submitted data.
- Mock Campaigns are not functional and cannot be used to send SMS traffic.
- Mock Sole Proprietor Brands cannot have mock Campaigns created for them and a one-time password (OTP) email will not be sent during mock Brand creation.

## Before you begin

Before you can create a mock Brand and Campaign, you'll need to create a real Customer Profile as an ISV-type customer.

First, determine if you'll want to register a mock Standard, Low Volume Standard, or Sole Proprietor Brand with your Customer Profile. If you're not sure which Brand type to choose, check out this Support article for a detailed look at the differences. Note that mock Sole Proprietor Brands cannot have mock Campaigns created for them, because the OTP (one time password) will not be sent to the designated contact during Brand creation.

**For a mock Standard or Low Volume Standard Brand:**
Complete all steps before 3. Create a BrandRegistration in this API walkthrough, then proceed to Step 1.

**For a mock Sole Proprietor Brand:**
Complete all steps before 3. Create a new Sole Proprietor A2P Brand in this API walkthrough, then proceed to Step 1.

## Step 1. Create a mock Brand

Now that your Customer Profile is set up and linked to an A2P Messaging Profile, you can create a mock Brand.

The process for creating a mock Brand is almost identical to creating a real Brand. The key difference is that you'll need to set the mock request body parameter to True when making the POST request to the Messaging API BrandRegistration Resource. If mock is not specified or set to False, a real Brand will be created.

**For a mock Standard or Low Volume Standard Brand:**
Reference step 3. Create a BrandRegistration in this API walkthrough for constructing your API request, and set mock to True.

**For a mock Sole Proprietor Brand:**
Reference step 3. Create a new Sole Proprietor A2P Brand in this API walkthrough for constructing your API request, and set mock to True.

| Parameter | Valid Values | Description |
|-----------|--------------|-------------|
| mock | True, False | Will create a mock Brand if set to True or a real Brand if either set to False or not specified. |

### Create a mock Standard Brand

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

brand_registration = client.messaging.v1.brand_registrations.create(
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
    brand_type="STANDARD",
    mock=True,
)

print(brand_registration.sid)
```

**Response:**

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
  "date_created": "2021-01-28T10:45:51Z",
  "date_updated": "2021-01-28T10:45:51Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": true,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "errors": [],
  "mock": true,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

You can confirm that the new Brand you created is a mock by checking for `"mock": true` in the response. Real (non-mock) Brands will incur A2P 10DLC fees and billing events where applicable.

If you created a mock Sole Proprietor Brand, you will not be able to create mock Campaigns and can skip the remaining steps.

## Step 2. Create a Messaging Service

> **Danger**
> We highly discourage the use of existing Messaging Services with Senders in the Sender Pool to avoid any risks of your US messages failing.

Now you will need a Messaging Service to associate with the mock Campaign you are about to create. We recommend creating a new Messaging Service without any Senders. To do that, follow step 4. Create a Messaging Service in this API walkthrough.

## Step 3. Create a mock Campaign

Now that you've created a mock Brand and Messaging Service, you can create an associated mock Campaign. A Campaign represents a single messaging use case or the intent of the messages you wish to send. For example, your Campaign's use case might be to send marketing or account notifications.

The process for creating a mock Campaign is identical to creating a real Campaign. Any Campaign that is associated with a mock Brand automatically becomes a mock Campaign, so there is no need to pass in a mock request parameter during Campaign creation.

Reference step 5. Create an A2P Campaign in this API walkthrough when constructing your API request.

### Create a mock Standard Campaign

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).us_app_to_person.create(
    brand_registration_sid="BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    description="Send marketing messages about sales and offers",
    us_app_to_person_usecase="STANDARD",
    message_samples=["Book your next OWL FLIGHT for just 1 EUR"],
    message_flow="MessageFlow",
    has_embedded_links=False,
    has_embedded_phone=False,
)

print(us_app_to_person.brand_registration_sid)
```

You can confirm that the new Campaign you created is a mock by checking for `"mock": true` in the response.

## Mock deletion

Mock Brands cannot be manually deleted. They will expire and be automatically deleted 30 days after initial creation, along with all mock Campaigns associated with them.

Mock Campaigns can be deleted using the Messaging API with the US A2P identifier `QE2c6890da8086d771620e9b13fadeba0b` as seen in the example below. This request will remove the mock Campaign associated with the specified Messaging Service.

### Delete a mock Campaign

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person("QE2c6890da8086d771620e9b13fadeba0b").delete()
```

## Get help with A2P 10DLC

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.