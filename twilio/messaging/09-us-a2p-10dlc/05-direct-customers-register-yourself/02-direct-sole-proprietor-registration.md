# Direct Sole Proprietor Registration Overview

This guide provides an overview for Direct customers who want to register A2P 10DLC messaging capabilities as a Sole Proprietor Brand using the Twilio Console.

Following this process lets US Carriers know who you are and what types of messages you'll be sending to end-users. This is important so that carriers do not filter your messages.

Sole Proprietor registration is available for customers in the United States and Canada who do not have a business Tax ID. A Tax ID in this case would be a U.S. EIN or a Canadian Business Number. If you DO have a Tax ID, you must register for a Standard or Low-Volume Standard Brand instead.

> **Info**
> If you are seeking to register solely for an OTP (One-Time Password) or 2FA use case, you should investigate Twilio's Verify service. With Verify you do not need to worry about A2P registration.

## Direct Brand Sole Proprietor registration steps

You will complete A2P 10DLC registration in the Twilio Console:

1. **Create a Twilio Starter Profile** (Messaging > Regulatory Compliance)
2. **Register a US A2P Sole Proprietor Brand** - A Brand verifies who you are with US carriers
3. **Register a new Campaign and link to a Messaging Service** - A Campaign describes the messages you will be sending

Once you create a campaign, you will attach it to a Messaging Service. Sole Proprietor Campaigns can only have one 10DLC phone number attached to them.

## 1. Create a Twilio Starter Profile

Navigate to the Twilio Console → Messaging → Regulatory Compliance → Onboarding page.

You'll answer questions about your Profile needs to determine the best type of Trust Hub profile. To create a Starter Profile and register as a Sole Proprietor:
- You must have a US or Canadian address
- You should NOT have a business Tax ID

On the registration screen, provide:
- **Profile Name**: Your name or business name
- **First name**
- **Last name**
- **Email address**: Must be a well formatted address with a valid domain
- **Phone number**

Then provide your business/personal address (must be a valid US or Canadian address).

## 2. Register your US A2P brand

Register your Starter Profile for A2P 10DLC capabilities by creating a US A2P Brand.

Provide:
- **Your registered Starter Profile from Step 1**
- **Your Brand type**: Sole Proprietor
- **Your Brand name**: Your business name or first and last name
- **(Optional) Your business vertical**
- **Your mobile phone number**: For OTP verification
  - Must belong to a valid U.S. or Canadian mobile device
  - Can't be acquired from a CPaaS provider like Twilio
  - Can be used no more than three times across all A2P 10DLC registrations

Before your Brand can be fully approved, you will receive an SMS OTP to the mobile number you provided. You must respond within 24 hours.

## 3. Register your Campaign

Once your Sole Proprietor Brand is approved, register a Campaign for sending messages.

You'll need:
- The Messaging Service to associate with the Campaign
- The A2P use case type (must be Sole Proprietor)
- Campaign use case description
- Two sample messages (up to 1024 characters each)
- Message flow: how consumers opt-in to your campaign
- At least one Twilio Phone Number for the Sender Pool

### Campaign description

Provide a thorough explanation of the campaign's objective. Single-word answers like "Marketing" are not sufficient.

### Sample Messages

Two sample messages are required. Best practices:
- Relate to the campaign description
- Specify company name and website
- Use brackets [] for templated information
- Indicate an opt-out mechanism

### How do end-users consent?

This is mandatory for campaign approval. SMS messaging campaigns must have an explicit end-user opt-in, which cannot be solicited via SMS.

## 4. Register a Twilio Phone Number with the Campaign

While your Campaign is pending or after approval, associate a Twilio phone number with the Campaign's Messaging Service.

> **Warning**
> Sole Proprietor Campaigns can only have one 10DLC phone number attached to them.

Once the Campaign has been verified, you'll be able to start using it to send SMS messages.
