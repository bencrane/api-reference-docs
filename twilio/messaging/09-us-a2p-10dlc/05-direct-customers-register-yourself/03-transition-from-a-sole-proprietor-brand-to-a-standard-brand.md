# Transition from a Sole Proprietor to a Standard Brand

Twilio offers a Sole Proprietor Brand A2P 10DLC registration experience for Direct Customers or Low-Volume Customers of Independent Software Vendors (ISVs) without an EIN/Tax ID. Sole Proprietor Brands come with more limitations on message volume, throughput, and phone number allotment than Standard Brands.

When a Sole Proprietor Brand's messaging needs exceed these limits, or when the business entity acquires an EIN/Tax ID, the Brand needs to be transitioned to a Standard or a Low-Volume Standard Brand.

This guide provides a detailed Sole Proprietor to Standard or Low-Volume Standard Brand transition process using the Twilio Console.

## Transition path considerations

Transitioning from a Sole Proprietor to a Standard or Low-Volume Standard Brand on Twilio involves creating a separate Customer Profile, Brand, and Campaign for customers who initially have Sole Proprietor Brands.

> **Info**
> While Campaign registration is straightforward, verification can take several days or even several weeks.

## Before you begin

Review the following resources:

- The US A2P 10DLC standard and different Brand types
- If you'd prefer transitioning your Sole Proprietor Brand via API, read the Standard and Low-Volume Standard Brand API Onboarding Guide for ISVs
- If you are a Direct Customer, you can follow the Direct Standard and Low-Volume Standard Registration Overview

## Existing or new Messaging Service?

You can continue using the existing Messaging Service for the Sole Proprietor Campaign, or create a new Messaging Service for the new Standard or Low-Volume Standard Campaign. Both options have pros and cons:

- **Existing Messaging Service**: Maintains settings like Opt-Out and Sticky Sender but messaging traffic is blocked while the new Campaign is awaiting approval.
- **New Messaging Service**: Avoids disruption of service but loses previous settings from the old Messaging Service.

### Reuse Options: Phone Number, Messaging Service, or neither

When registering the new Standard or Low-Volume Standard Campaign, you can reuse the sender phone numbers or Messaging Service associated with the Sole Proprietor Brands, or choose new ones:

| Option | What it means |
|--------|---------------|
| Phone Number | This is a separate option from reusing the entire Messaging Service. When creating a new Campaign for your new Standard or Low-Volume Standard Brand, you must select a Messaging Service—either new or existing. |
| Messaging Service | Choosing an existing Messaging Service during Campaign creation automatically transfers any associated phone numbers and retains existing Opt-In/Opt-Out and Sticky Sender settings. However, until verification is complete, the sender number linked to the reused Messaging Service loses its A2P registration status. |
| Neither | If significant traffic is sent through the existing Sole Proprietor Campaign, the best strategy is to reuse neither. Leave both the Messaging Service and its associated A2P 10DLC number as they are. Create a new Messaging Service for the new Standard or Low-Volume Standard Campaign. |

> **Warning**
> Reusing an existing Messaging Service or a phone number immediately poses a risk of service interruption for up to several weeks. Either option is suitable for customers with intermittent messaging traffic via their existing Sole Proprietor Brands.

## Console option 1: New Profile, new Standard Brand, new Messaging Service

It's not necessary to link any sender phone number with the new Messaging Service at the time of creation. You can wait until the new Campaign is fully verified before transferring the old number from the Sole Proprietor Campaign.

### Create a new Secondary Profile

Log into the Console and navigate to Messaging > Regulatory Compliance > Onboarding to create a new Secondary Profile.

To begin creating a new Secondary Profile:

1. Click the **Switch Customer Profile** link at the top right of the Customer Profile page.
2. From the Select a Customer Profile popup, click **+ New Customer Profile**.
3. On the Customer Profile New Registration page, your answers will determine your eligibility for creating a Secondary Customer Profile.

### Create a new Standard Brand

After submitting the Secondary Customer Profile for review, submit a Brand by choosing between a Standard or Low-Volume Standard Brand and specifying the organization type.

Upon clicking Register, Twilio will submit the Secondary Profile and Brand to The Campaign Registry. Once registered, you can review your A2P Brands list and click on the newly registered one to view its details.

Standard Brands have Trust Scores while Low-Volume Standard Brands do not as they skip secondary vetting during registration.

### Register a new Campaign using a new Messaging Service

Register a new Campaign associated with the new Standard Brand, choosing a new Messaging Service. Provide detailed information about the Campaign, including:

- Use case
- Messaging Service
- Campaign description
- Sample messages
- End-user consent mechanisms

### Register a Twilio Phone Number with the new Campaign

1. Under Regulatory Compliance > Campaigns, click on your newly registered Campaign.
2. Click on the Linked Messaging Service.
3. On the Sender Pool page, associate a Twilio phone number with the new Campaign and Messaging Service, ensuring the number is not currently associated with an existing Messaging Service.

#### Reusing an Existing 10DLC Number

If you're reusing a Twilio number associated with your Sole Proprietor Campaign, navigate to the existing Campaign's details page. On the Sender Pool page, select the number and click Remove before adding it to the new Campaign.

## Console option 2: New Profile, new Standard Brand, reuse existing Messaging Service

This option follows similar steps to Console option 1 but involves reusing an existing Messaging Service associated with the Sole Proprietor Brand. It requires deleting the existing Sole Proprietor Campaign to free up the Messaging Service for the new Standard Campaign.

## Get help with A2P 10DLC

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
