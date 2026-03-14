# TrustHub REST API

> ⚠️ **Warning**
> This is an overview of the TrustHub REST API Resources. It is not intended to serve as an onboarding guide for any TrustHub functionality. Select a TrustHub feature below to view the onboarding guide:
> - SHAKEN/STIR
> - A2P10DLC
> - CNAM (currently in Beta)
> - Branded Calling
> - Voice Integrity

The TrustHub REST API organizes the Know Your Customer (KYC) information into **CustomerProfile Resources** and **TrustProduct Resources**.

These resources are considered "bundles", and the information required to submit each bundle successfully is determined by a **Policies Resource**. A Policy may require specific EndUsers, SupportingDocuments, and CustomerProfiles to be attached to each bundle.

Keep reading to learn more about all of the resources available in the TrustHub REST API, or use the API Resources menu in the left navigation pane to see the API reference for a specific TrustHub API Resource.

---

## CustomerProfile Resource

A CustomerProfile Resource is used to establish the identity of someone using a channel endpoint, such as a Twilio phone number or SendGrid email address.

Currently, the CustomerProfiles you can create are:

- **Primary Customer Profile of type Business**
  - Used for SHAKEN/STIR registration for all customers
  - Used for A2P 10DLC registration for all customers
  - Used for CNAM registration for all customers
  - *Note: These can only be created within the Twilio Console.*

- **Secondary Customer Profile of type Business**
  - Used for SHAKEN/STIR registration for ISVs
  - Used for A2P 10DLC registration for ISVs
  - Used for CNAM registration for ISVs

- **Starter Customer Profile of type Business**
  - Used only for A2P 10DLC ISV customers using a Sole Proprietor Brand or A2P Toll-Free verification

---

## CustomerProfileChannelEndpointAssignment Resource

The CustomerProfileChannelEndpointAssignment Resource is used to assign phone numbers to a CustomerProfile Resource.

---

## CustomerProfileEntityAssignment Resource

The CustomerProfileEntityAssignment Resource is used to associate TrustHub Resources with a CustomerProfile Resource, as defined by a Policies Resource.

These TrustHub Resources may include:

- EndUser Resources, such as business information or authorized representatives of a business
- SupportingDocument Resources, such as a business addresses
- An associated CustomerProfile Resource

---

## CustomerProfileEvaluation Resource

The CustomerProfileEvaluation Resource allows developers to understand what failed and why when a CustomerProfile Resource is submitted for evaluation against a Policies Resource.

The synchronous request will provide error codes and instant feedback to fix the given CustomerProfile Resource.

---

## TrustProduct Resource

A TrustProduct Resource is used to enable features on your Twilio account(s) like SHAKEN/STIR authentication, Application-to-Person (A2P) messaging, and Caller ID Name (CNAM).

Currently, the TrustProduct Resources you can create are:

- SHAKEN/STIR Trust Product
- A2P Messaging: Local - Business Trust Product
- Starter A2P Messaging: Local - Business Trust Product
- CNAM Profile Trust Product

---

## TrustProductChannelEndpointAssignment Resource

The TrustProductChannelEndpointAssignment Resource is used to assign phone numbers to a TrustProduct Resource.

---

## TrustProductEntityAssignment Resource

The TrustProductEntityAssignment Resource is used for associating TrustHub Resources with a TrustProduct Resource, as defined by a Policies Resource. These TrustHub Resources may include:

- EndUser Resources, such as US A2P Messaging Profile General Business information and CNAM Information
- An associated CustomerProfile Resource

---

## TrustProductEvaluation Resource

The TrustProductEvaluation Resource allows developers to understand what (if anything) failed and why when a TrustProduct Resource is submitted for evaluation against a Policies Resource.

The synchronous request will provide error codes and instant feedback to fix the given TrustProduct Resource.

---

## EndUser Resource and EndUserType Resource

An EndUser Resource is a representation of an individual or business using the Twilio Platform to communicate with their customers. The structure of an EndUser Resource is described by an EndUserType Resource.

The Policies Resource associated with a CustomerProfile Resource or a TrustProduct Resource will determine what EndUser Resources you'll need to create. See the Policies Resource section below for more information.

You can see the possible EndUserTypes and the structure of each EndUserType by using the **Read multiple EndUserType resources** endpoint.

> **Note:** You will only need to create EndUser Resources that are specific to your use case. See the appropriate onboarding guide (listed at the top of this page) for more information.

---

## SupportingDocument and SupportingDocumentType Resource

A SupportingDocument Resource is a collection of required information to ensure compliance with various TrustHub features. The structure of a SupportingDocument Resource is described by a SupportingDocumentType Resource.

The Policies Resource associated with a CustomerProfile Resource or a TrustProduct Resource will determine what SupportingDocument Resources you'll need to create. See the Policies Resource section below for more information.

You can see the possible SupportingDocumentTypes and the information required for each by using the **Read multiple SupportingDocumentType resources** endpoint.

> **Note:** You will only need to create SupportingDocument Resources that are specific to your use case. See the appropriate onboarding guide (listed at the top of this page) for more information.

---

## Policies Resource

The information required for creating a CustomerProfile Resource or a TrustProduct Resource is defined by a Policies Resource. This required information can include:

- EndUser Resources
- SupportingDocument Resources
- TrustProduct Resources
- Customer Profile Resources

You can view all of the available Policies Resources by using the **Read multiple Policies Resources** endpoint.

> ℹ️ **Info**
> Policies can and do change. Please make sure not to hardcode any Policy SID within your application.
> - Use the **Read multiple Policies Resources** endpoint to see all available Policies Resources.
> - Use the **Fetch a Policies Resource** endpoint to see a specific Policies Resource.

---

## Policies Resource Example

Let's examine the Policies Resource for creating a "Secondary Customer Profile of type Business" to see an example of what information is required when creating a CustomerProfile Resource.

```json
{
    "url": "https://trusthub.twilio.com/v1/Policies/RNdfbf3fae0e1107f8aded0e7cead80bf5",
    "requirements": {
        "end_user": [
            {
                "url": "/EndUserTypes/customer_profile_business_information",
                "fields": [
                    "business_type",
                    "business_registration_number",
                    "business_name",
                    "business_registration_identifier",
                    "business_identity",
                    "business_industry",
                    "website_url",
                    "business_regions_of_operation",
                    "social_media_profile_urls"
                ],
                "type": "customer_profile_business_information",
                "name": "Business Information",
                "requirement_name": "customer_profile_business_information"
            },
            {
                "url": "/EndUserTypes/authorized_representative_1",
                "fields": [
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                    "business_title",
                    "job_position"
                ],
                "type": "authorized_representative_1",
                "name": "Authorized Representative #1",
                "requirement_name": "authorized_representative_1"
            },
            {
                "url": "/EndUserTypes/authorized_representative_2",
                "fields": [
                    "first_name",
                    "last_name",
                    "email",
                    "phone_number",
                    "business_title",
                    "job_position"
                ],
                "type": "authorized_representative_2",
                "name": "Authorized Representative #2",
                "requirement_name": "authorized_representative_2"
            }
        ],
        "supporting_trust_products": [],
        "supporting_document": [
            [
                {
                    "description": "Customer Profile HQ Physical Address",
                    "type": "document",
                    "name": "Physical Business Address",
                    "accepted_documents": [
                        {
                            "url": "/SupportingDocumentTypes/customer_profile_address",
                            "fields": [
                                "address_sids"
                            ],
                            "type": "customer_profile_address",
                            "name": "Physical Business Address"
                        }
                    ],
                    "requirement_name": "customer_profile_address"
                }
            ]
        ],
        "supporting_customer_profiles": [
            {
                "type": "primary_customer_profile_type_business",
                "name": "Primary Customer Profile Bundle",
                "requirement_name": "primary_customer_profile"
            }
        ]
    },
    "friendly_name": "Secondary Customer Profile of type Business",
    "sid": "RNdfbf3fae0e1107f8aded0e7cead80bf5"
}
```

The `requirements` object contains the list of required TrustHub Resources. For this particular Policy, we see the following requirements:

**EndUsers:**
- Business Information
- Authorized Representative #1
- Authorized Representative #2

**SupportingDocuments:**
- Physical Business Address

**Supporting CustomerProfiles:**
- Primary Customer Profile

Now let's look at the first object in the `requirements.end_user` array:

```json
{
  "url": "/EndUserTypes/customer_profile_business_information",
  "fields": [
    "business_type",
    "business_registration_number",
    "business_name",
    "business_registration_identifier",
    "business_identity",
    "business_industry",
    "website_url",
    "business_regions_of_operation",
    "social_media_profile_urls"
  ],
  "type": "customer_profile_business_information",
  "name": "Business Information",
  "requirement_name": "customer_profile_business_information"
}
```

This indicates that one of the requirements is a "Business Information" EndUser with the EndUserType of `customer_profile_business_information`.

The fields (information) needed for this `customer_profile_business_information` EndUserType are listed in the "fields" array. These fields are the parameters you'll need to include when you create an EndUser Resource.

You can learn more about the structure of the `customer_profile_business_information` EndUserType by making a GET request to the endpoint listed in the "URL" field in the object above.

Similarly, you can examine the structure of other requirements defined by a Policies Resource for "supporting_document" "supporting_trust_products", and "supporting_customer_profiles" by making a GET request to the "URL"s provided by the Policies Resource.

---

## Create a CustomerProfile bundle

> ⚠️ **Warning**
> This is just a general description of how to create a CustomerProfile Resource. Use the specific onboarding guide for the specific TrustHub functionality you're working on.

1. Fetch all Policies Resources and find the SID for the Policies Resource related to the CustomerProfile Resource you want to create.

2. Fetch the specific Policies Resource and examine the requirements you need for your CustomerProfile Resource. This could include EndUsers, SupportingDocuments, or CustomerProfiles.

3. Create a new CustomerProfile Resource using the appropriate Policies Resource SID.
   - You can also pass in FriendlyName, Email, and StatusCallback parameters

4. Create the necessary required TrustHub Resource and take note of the SID of the new resource:
   - Create an EndUser Resource
   - Create a SupportingDocument Resource
   - Create a CustomerProfile Resource

5. Use the SID of the newly-created resource to create a new CustomerProfileEntityAssignment Resource.

6. Repeat steps 4 and 5 for other requirements listed in the Policies Resource.

7. Add a phone number to the CustomerProfile Resource by creating a CustomerProfileChannelEndpointAssignment Resource.
   - The ChannelEndpointType parameter should be `phone-number`.

8. Repeat step 7 for any other phone numbers you want to associate with this CustomerProfile Resource.

9. Evaluate the CustomerProfile Resource.

10. If necessary, fix any errors provided by the Evaluation Resource. Repeat step 9 to reevaluate the CustomerProfile Resource.

11. Submit the CustomerProfile Resource by using the **Update a CustomerProfile Resource** endpoint and setting the Status parameter to `pending-review`.

---

## Create a TrustProduct bundle

> ⚠️ **Warning**
> This is just a general description of how to create a TrustProduct Resource. Use the specific onboarding guide for the specific TrustHub functionality you're working on.

1. Fetch all Policies Resources and find the SID for the Policies Resource related to the TrustProduct Resource you want to create.

2. Fetch the specific Policies Resource and examine the requirements you need for your TrustProduct Resource. This could include EndUsers or CustomerProfiles.

3. Create a new TrustProduct Resource using the appropriate Policies Resource SID.
   - You can also pass in FriendlyName, Email, and StatusCallback parameters

4. Create the necessary required TrustHub Resource and take note of the SID of the new resource:
   - Create an EndUser Resource
   - Create a CustomerProfile Resource

5. Use the SID of the newly-created resource to create a new TrustProductEntityAssignment Resource.

6. Repeat steps 4 and 5 for other requirements listed in the Policies Resource.

7. Add a phone number to the TrustProduct Resource by creating a TrustProductChannelEndpointAssignment Resource.
   - The ChannelEndpointType parameter should be `phone-number`.
   - *Note: You need to add the phone number to any supporting CustomerProfile Resources first. See the previous section for more information.*

8. Repeat step 7 for any other phone numbers you want to associate with this TrustProduct Resource.

9. Evaluate the TrustProduct Resource.

10. If necessary, fix any errors provided by the Evaluation Resource. Repeat step 9 to reevaluate the TrustProduct Resource.

11. Submit the TrustProduct Resource by using the **Update a TrustProduct Resource** endpoint and setting the Status parameter to `pending-review`.