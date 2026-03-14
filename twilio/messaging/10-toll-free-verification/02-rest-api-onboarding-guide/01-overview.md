# Get started with toll-free verification using the API

> **ISVs: Compliance Embeddable for Toll-Free Verification**
> By adding the Compliance Embeddable to their website, an independent software vendor (ISV) can onboard customers without using the Toll-Free Verification (TFV) API. The Compliance Embeddable lets customers submit compliance information through a self-service workflow. To learn more, see the blog post introducing the Compliance Embeddable for Toll-Free verification. To get additional guidance, see our support article for guidance on TFV for ISVs.

Toll-free phone numbers for the US and Canada use the North American Numbering Plan (NANP). NANP toll-free numbers begin with 800, 888, 877, 866, 855, 844, or 833. To use these numbers to send SMS messages, your organization must comply with federal regulations. Compliance requires verifying how you plan to use your phone number to send texts. To verify your NANP toll-free phone number for regulatory compliance, use the Toll-Free Verification API.

> **Business Registration Number required and optional properties**
> Registration includes properties for a business registration number and related compliance information.
>
> To reduce review times and minimize the risk of rejection, provide your business registration number and related details. To learn more, see Toll-Free Verification Policy for Collecting Business Registration Number.

> **Warning: Campaign Verify Token Required for Political Organizations**
> If your organization is a 527 political organization and you are registering for the POLITICAL_ELECTION_CAMPAIGNS use case, you MUST provide a Campaign Verify (CV) token during toll-free verification. Failure to provide a valid CV token will result in rejection of your verification request.
>
> Read the Campaign Verify section below before starting the TFV process.

## Create a Trust Hub Primary Customer Profile

TFV requests with Twilio require your business to have a Trust Hub Primary Customer Profile. A Primary Customer Profile is also known as a Primary Business Profile.

1. Open the Trust Hub in the Twilio Console.
2. Create your Trust Hub Primary Customer Profile.
3. When you reach the Business Information step of the Create Profile workflow, set the value of Select business identity.
   - If you plan to use Twilio in a product you sell to customers, Twilio considers you an ISV. Choose ISV Reseller or Partner.
   - If you plan to use Twilio to communicate directly with customers or staff, Twilio considers you a direct customer. Choose Direct Customer.
4. At the Notification settings step, provide an email address at which Twilio can contact you about the status of your request.
5. After you submit your request to Twilio, Twilio reviews it and sends a notification of approval or rejection to the email address you provided.
6. After you receive notification of your profile status, open the Trust Hub in the Twilio Console. Twilio approved your Primary Customer Profile.
7. Your Profile Details page displays a Status of Twilio-Approved.
8. Copy the Business Profile SID value of your parent account. This SID begins with BU with 32 hexadecimal digits. To Create a TFV request, you need this Business Profile SID. The Create TFV resource names this parameter CustomerProfileSid. These refer to the same value.

Trust Hub Customer Profiles can link to a parent account or a subaccount. Think of a parent account as the main organization and subaccounts as departments or subsidiaries. To create a parent account, you must use the Twilio Console. You can create subaccounts using the Twilio TrustHub API.

To keep customers separate, production ISV parent accounts should link Trust Hub customer profiles to subaccounts.

## Create a TFV request

To use an NANP toll-free phone number for messaging, submit a verification request for the related business. As you have an approved Primary Customer Profile, your request only needs the parameters for the TFV. To learn more, see Required Information for Toll-Free Verification in the Twilio Help Center.

### Provide business and compliance data

To support changes to toll-free messaging policy when submitting a TFV request, include additional metadata about your business. To avoid rejection and accelerate vetting, provide this information before its required. To learn more, see Toll-Free Verification Policy for Collecting Business Registration Number in the Twilio Help Center.

Make a POST request to the `https://messaging.twilio.com/v1/Tollfree/Verifications` resource. All parameters for this request are request body parameters.

> **Info**
> Note about Campaign Verify parameters: The VettingId and VettingProvider parameters shown in this example are REQUIRED if your organization is a 527 political organization and if you are registering for the POLITICAL_ELECTION_CAMPAIGNS use case. For all other organizations and use cases, these parameters are optional. See the Campaign Verify section for details.

### Submit a TFV Request using your Customer Profile

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications.create(
    customer_profile_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    business_name="Owl, Inc.",
    business_website="http://www.example.com",
    notification_email="support@example.com",
    use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
    use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
    production_message_sample="lorem ipsum",
    opt_in_image_urls=[
        "https://example.com/images/image1.jpg",
        "https://example.com/images/image2.jpg",
    ],
    opt_in_type="VERBAL",
    message_volume="10",
    additional_information="privacy policy is geo-locked to NAMER region",
    tollfree_phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    vetting_id="cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
    vetting_provider="CAMPAIGN_VERIFY",
)

print(tollfree_verification.sid)
```

Twilio reviews TFV requests within three business days.

### Check the status of your TFV request

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(tollfree_verification.sid)
```

If you don't have your TFV request SID, use the API to get a list of TFV SIDs for your related toll-free number.

Look for the status property in the response.

### Response to a Check TFV request

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": null,
  "trust_product_sid": null,
  "business_name": "Owl, Inc.",
  "status": "PENDING_REVIEW",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.example.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@company.com",
  "business_contact_phone": "+11231231234",
  "notification_email": "support@example.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
  "production_message_sample": "lorem ipsum",
  "opt_in_image_urls": [
    "https://testbusiness.com/images/image1.jpg",
    "https://testbusiness.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "10",
  "additional_information": "privacy policy is geo-locked to NAMER region",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {},
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": "abc123xyz567",
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "doing_business_as": "Other Company",
  "business_type": "PRIVATE_PROFIT",
  "opt_in_confirmation_sample": "Opt in sample message",
  "help_message_sample": "Help sample",
  "privacy_policy_url": "http://www.example.com/privacy",
  "terms_and_condition_url": "http://www.example.com/terms",
  "age_gated_content": false,
  "opt_in_keywords": "STOP",
  "vetting_id": "cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4",
  "vetting_provider": "CAMPAIGN_VERIFY",
  "vetting_id_expiration": "2027-01-31T23:59:59Z"
}
```

If Twilio approved your TFV request, status reads as `"status": "TWILIO_APPROVED"`. The verified toll-free number can send Application to Person (A2P) SMS messages with minimal traffic filtering.

If you don't have a Trust Hub Customer Profile, you can create one at the same time as submitting your TFV request. To learn how to perform both tasks at once, see this variation on the Create TFV request.

## Fix a rejected TFV request

If Twilio rejected your TFV request, your check request displays `"status": "TWILIO_REJECTED"`. The toll-free number isn't verified and you can't use it to send messages. To review common rejection reasons, see Why Was My Toll-Free Verification Rejected? in the Twilio Help Center.

If the response includes `"edit_allowed": true`, you can resubmit your TFV request.

1. Check the status of your TFV request.
2. In the response, find two properties:
   - **The edit_allowed property**: If this value is set to true, you can edit the TFV request and resubmit it. You must submit the TFV request before the timestamp provided in the edit_expiration property. Twilio sets this property value to seven days from the initial request. After that date, the TFV request expires and you need to create another.
   - **The rejection_reasons property array**: This array returns the list of reasons why Twilio rejected your TFV as a human-readable reason and a code that links to details on this error.
3. To correct any errors in your TFV request, use the Edit a TFV Request resource.

### Edit a TFV Request

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

tollfree_verification = client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    edit_reason="Updated the ProductionMessageSample",
    use_case_categories=["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
    use_case_summary="This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
    production_message_sample="Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
    opt_in_image_urls=[
        "https://example.com/images/image1.jpg",
        "https://example.com/images/image2.jpg",
    ],
    opt_in_type="VERBAL",
    message_volume="1,000",
    additional_information="See our privacy policy at www.example.com/privacypolicy",
)

print(tollfree_verification.sid)
```

### Response

```json
{
  "sid": "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulated_item_sid": null,
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": null,
  "status": "PENDING_REVIEW",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "business_name": "Owl, Inc.",
  "business_street_address": "123 Main Street",
  "business_street_address2": "Suite 101",
  "business_city": "Anytown",
  "business_state_province_region": "AA",
  "business_postal_code": "11111",
  "business_country": "US",
  "business_website": "http://www.company.com",
  "business_contact_first_name": "firstname",
  "business_contact_last_name": "lastname",
  "business_contact_email": "email@company.com",
  "business_contact_phone": "+11231231234",
  "notification_email": "support@company.com",
  "use_case_categories": [
    "TWO_FACTOR_AUTHENTICATION",
    "MARKETING"
  ],
  "use_case_summary": "This number is used to send out promotional offers and coupons to the customers of Owl, Inc.",
  "production_message_sample": "Get 10% off when you save this coupon: https://bit.ly/owlcoupon",
  "opt_in_image_urls": [
    "https://example.com/images/image1.jpg",
    "https://example.com/images/image2.jpg"
  ],
  "opt_in_type": "VERBAL",
  "message_volume": "1,000",
  "additional_information": "See our privacy policy at www.example.com/privacypolicy",
  "tollfree_phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "rejection_reason": null,
  "error_code": null,
  "edit_expiration": null,
  "edit_allowed": null,
  "rejection_reasons": null,
  "resource_links": {},
  "url": "https://messaging.twilio.com/v1/Tollfree/Verifications/HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "external_reference_id": null,
  "business_registration_number": "123456789",
  "business_registration_authority": "EIN",
  "business_registration_country": "US",
  "business_type": "PRIVATE_PROFIT",
  "business_registration_phone_number": "+13023334444",
  "doing_business_as": "Toms Widgets",
  "age_gated_content": false,
  "help_message_sample": "For help, reply HELP or visit our website.",
  "opt_in_confirmation_message": "Thank you for opting in!",
  "opt_in_keywords": [
    "START"
  ],
  "privacy_policy_url": "https://www.example.com/privacy",
  "terms_and_conditions_url": "https://www.example.com/terms",
  "tollfree_phone_number": "+18003334444",
  "vetting_id": null,
  "vetting_id_expiration": null,
  "vetting_provider": null
}
```

Check your TFV request status.

## Delete a failed TFV request

If you can't edit your TFV request, delete it. The delete resource requires the SID for the Verification record to delete. This SID starts with HH followed by 32 other hexadecimal digits.

If you don't have your TFV request SID, use the API to get a list of TFV SIDs for your related toll-free number.

### Delete a TFV request record

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.messaging.v1.tollfree_verifications(
    "HHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

## Campaign Verify for Political Messaging

> **Info**
> This section applies to 527 political organizations registering for the POLITICAL_ELECTION_CAMPAIGNS use case for toll-free messaging.

Campaign Verify is a secure, non-partisan verification solution for US political organizations who wish to engage with voters via toll-free messaging.

All organizations sending political communications on behalf of a federal, state, or local political campaign must be verified by Campaign Verify to complete toll-free verification for political use cases.

> **Warning**
> You should read the Campaign Verify FAQ before continuing with this guide, as this process involves fees and identity verification.

### When Campaign Verify tokens are required

A Campaign Verify token is REQUIRED for toll-free verification when:

- Your organization is a 527 political organization
- And you select POLITICAL_ELECTION_CAMPAIGNS as a use case category.

Without a valid CV token, your toll-free verification will be rejected if you meet these criteria.

### Obtaining a Campaign Verify token

Verification involves submitting information about your political organization to Campaign Verify, as well as verifying your identity as an authorized person associated with the political organization.

1. Visit Campaign Verify to begin the verification process
2. Complete identity verification and provide required organization information
3. After approval, Campaign Verify issues you a CV token
4. Provide this CV token during TFV registration using the VettingId and VettingProvider parameters

### Campaign Verify token format

A full CV token is composed of 6 pipe (|) delimited fields, for example:

```
cv|1.0|mno|tfree|b344a16f-b435-4a39-bf91-df9b8e4e0a0d|E5eh-rOPHCr_lrgHDYEZP45FzuJSHS1fkFTmVPD8GQ4
```

When submitting your TFV request:

- Set VettingProvider to `CAMPAIGN_VERIFY`
- Set VettingId to your full CV token (all 6 fields, including the pipes)
- The token is case-sensitive and must match the format provided by Campaign Verify exactly

### Token expiration and management

- CV tokens expire after a period of time (expiration date provided by Campaign Verify)
- The vetting_id_expiration field in the TFV response shows when your token expires
- The CV token must be registered for the organization entity listed on the token. If your TFV request is rejected with an error code related to Campaign Verify, check that the token is valid and registered to the correct organization.
- If you are ISV and multiple customers sending political messaging, each customer needs a separate CV token.
- To update an expired token, edit your existing TFV request with a new CV token

> **Warning**
> An organization that does not provide a Campaign Verify token when required will have their toll-free verification rejected. Even if approved without a token initially, carriers may block political messaging traffic that is not properly verified through Campaign Verify.