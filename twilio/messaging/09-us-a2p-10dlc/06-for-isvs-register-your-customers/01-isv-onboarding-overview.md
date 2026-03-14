# ISV A2P 10DLC Onboarding Overview

This onboarding overview is for independent software vendors (ISVs) who want to register themselves and their customers for A2P 10DLC.

If you're an ISV who only sends messages on behalf of your own company, follow the Direct Standard and Low-Volume Standard Registration Overview instead. This guide is only for ISVs who send messages on behalf of their customers.

This overview explains how to prepare for A2P 10DLC registration by walking through the following steps:

- **Identify your ISV architecture**: The way your Accounts and Messaging Campaigns are organized determines the specific steps you'll need to take when onboarding.
- **Onboard via the Twilio Console or API**: You register your ISV and your customers for A2P 10DLC by creating Customer Profiles, registering Brands, and registering Campaigns.
- **Creating Customer Profiles**: A Twilio Customer Profile gives you access to products that can increase consumer trust, such as A2P 10DLC. You can create a Primary Customer Profile for your ISV and Secondary Customer Profiles for your customers.
- **Registering Brands**: A Brand represents the sender of a messaging use case, such as your customer's company. It belongs to a single Customer Profile.
- **Registering Campaigns**: A Campaign represents a single use case for sending messages. It belongs to one Brand, which can have one to many Campaigns associated with it.

## Sample ISV onboarding process

This section shows how a sample ISV with two customers can onboard to A2P 10DLC.

Consider an ISV (Owl Inc) that is the primary Account, with two customers (Acme and Buy n Large) separated into subaccounts. Each company has its own SMS messaging use cases:

- Owl Inc sends two-factor authentication (2FA) messages for its customers to log in to their platform.
- Acme Corp sends support ticket status updates.
- Buy n Large sends promotional messages and appointment offers.

### Determine ISV architecture type

Before onboarding to A2P 10DLC, identify your ISV architecture type. This type informs the specific steps you'll follow to onboard by creating Customer Profiles, registering Brands, and registering Campaigns.

### Create Customer Profiles and register Brands

For each business entity that sends messages, you need to create a separate Customer Profile and register a Brand:

**For your ISV:**
- Create one Primary Customer Profile
- Register one Brand

**For each customer:**
- Create one Secondary Customer Profile
- Register one Brand

### Register Campaigns

Register a Campaign for each messaging use case. Each Campaign represents a single use case for sending messages.

## Step 1: Identify your ISV architecture

There are many different patterns of how Twilio Accounts, subaccounts, and Messaging Services are organized for ISVs. Before you begin onboarding to A2P 10DLC, identify which ISV architecture type you're using from the six types detailed below.

### Architecture types

> **Warning**
> Architecture types #3, #5, and #6 are incompatible with A2P 10DLC as of Summer 2023.
>
> In these cases, Twilio recommends restructuring to type #1 for the best long-term viability.

| | #1 | #2 | #3 | #4 | #5 | #6 |
|---|---|---|---|---|---|---|
| Do you use subaccounts? | YES | YES | YES | NO | NO | NO |
| Are subaccounts mapped to individual customers? | YES | NO | YES | N/A | N/A | N/A |
| Do you use Messaging Services? | YES | YES | NO | YES | YES | NO |
| Are Messaging Services mapped to individual customers? | N/A | YES | N/A | YES | NO | N/A |

### ISV architecture #1 (Preferred)

**Description:**
- You use subaccounts and they are mapped to individual customers.
- You use Messaging Services.

Type #1 is the preferred architecture for A2P 10DLC onboarding because the messaging traffic for each customer is separated by subaccounts. This allows for easier analytics tracking and minimizes the impact of any potential noncompliant traffic.

**Onboarding steps for each customer:**
1. Create a Secondary Customer Profile under the customer's subaccount.
2. Register a Brand under the customer's subaccount.
3. Register Campaigns for each messaging use case. Each use case should map to its own Messaging Service under the same subaccount.

**If your ISV also has A2P 10DLC messaging use cases:**
1. Create a Primary Customer Profile under your primary Account.
2. Register a Brand under your primary Account.
3. Register Campaigns for each messaging use case under the same Account.

### ISV architecture #2

**Description:**
- You use subaccounts and they are not mapped to individual customers.
- You use Messaging Services and they are mapped to individual customers.

**Onboarding steps for each customer:**
1. Create a Secondary Customer Profile under your primary Account.
2. Register a Brand under your primary Account.
3. Register Campaigns for each messaging use case within your primary Account.

### ISV architecture #3 (Incompatible)

- You use subaccounts and they are mapped to individual customers.
- You do not use Messaging Services.

Type #3 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1.

### ISV architecture #4

**Description:**
- You do not use subaccounts.
- You use Messaging Services and they are mapped to individual customers.

**Onboarding steps for each customer:**
1. Create a Secondary Customer Profile under your primary Account.
2. Register a Brand under your primary Account.
3. Register Campaigns for each messaging use case within your primary Account.

### ISV architecture #5 (Incompatible)

- You do not use subaccounts.
- You use Messaging Services and they are not mapped to individual customers.

Type #5 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1.

### ISV architecture #6 (Incompatible)

- You do not use subaccounts.
- You do not use Messaging Services.

Type #6 is incompatible with A2P 10DLC. Twilio recommends restructuring to type #1.

## Step 2: Onboard via API or the Console

After you identify your ISV architecture type, create Customer Profiles, Brands, and Campaigns in the Console or with the API.

When creating Secondary Customer Profiles and registering Brands for your customer, remember to fill in the business details of that specific customer.

> **Info**
> Primary Customer Profiles can only be created in the Console at this time.

### Determine your Brand type

Before creating a Customer Profile and registering a Brand, determine if it's a Standard, Low-Volume Standard, or Sole Proprietor Brand.

### Onboard with API

If you have multiple customers to register, use Twilio APIs to automate the onboarding process.

- To register a Standard or Low-Volume Standard Brand via API, follow the Standard and Low-Volume Standard Brand API Onboarding Guide for ISVs.
- To register a Sole Proprietor Brand via API, follow the Sole Proprietor Brand API Onboarding Guide for ISVs.

### Onboard with the Console

If you prefer a more guided experience, or are only registering a few customers, you can use the Console for onboarding. Navigate to Twilio Console > Messaging > Regulatory Compliance > Onboarding.

Use the Switch Customer Profile option to move between your Primary and Secondary Customer Profiles after you create them.

## Get help with A2P 10DLC

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
