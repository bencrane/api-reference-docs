# Direct Standard and Low-Volume Standard Registration Guide

This guide will help direct customers register their business for A2P 10DLC messaging. You'll create a Customer Profile in Trust Hub, register a US A2P 10DLC Standard or Low-Volume Standard Brand, and register a US A2P 10DLC Campaign.

By registering your Brand, you give US carriers information about your business and the messages you send, so carriers don't filter them.

**This guide is intended for:**
- US businesses with an Employer Identification Number (EIN).
- Canadian businesses with a Canadian Business Number.
- Businesses headquartered outside of the US, Canada, EU, UK, or Australia.

**This guide isn't intended for:**
- US or Canadian customers without an EIN or Canadian Business Number. Follow the Direct Sole Proprietor Registration Overview instead.
- Independent Software Vendors (ISVs). Follow the Standard and Low-Volume Standard Brand Onboarding Guide for ISVs instead.

> **Info**
> If you're registering a Campaign with the OTP (One-Time Password) use case or any other form of 2FA, Twilio Verify may be a better option for you. Verify does not require A2P registration or sender provisioning.

## Prerequisites

### Gather required information

Before you begin the registration process, read Gather the Required Business Information. Pay special attention to the "Standard and Low-Volume Standard Brands" and "Campaign Details" sections.

The accuracy of your information is vital to the registration process. It contributes to your Trust Score from The Campaign Registry (TCR). This score determines your messaging throughput to US networks and daily message limits from mobile carriers.

### Determine your Brand type

You can register as either a Standard or Low-Volume Standard Brand. A Low-Volume Standard Brand is best suited for customers sending fewer than 6,000 message segments per day.

### Review process for government, nonprofit, and political organizations

If you're registering a government agency, nonprofit, or 527 political organization, read Registration for Government and Nonprofit Agencies before proceeding.

## Step 1: Create a Primary Customer Profile in Trust Hub

First, create a Primary Customer Profile in Trust Hub. This is a one-time step that validates your business identity with Twilio. You can skip this step if you've already created a Primary Customer Profile for another Twilio product.

### Registration process

Go to the Onboarding page in your Console and begin the process listed under the Create Customer Profile tab.

### Approval process

It may take 72 hours or more for Twilio to approve your Customer Profile. While it's pending approval, you can continue to the next step.

## Step 2: Register a Brand

Next, create a US A2P Brand. A Brand verifies who you are with US carriers.

### Registration process

Go to the Onboarding page in your Console and begin the process listed under the Register Brand tab.

> **Info**
> Starting October 17, 2024, public, for-profit Brands require Brand identity verification for new and existing Brand registrations when creating new Campaigns.

### Approval process

When you complete the Brand registration form, Twilio submits your Brand application to TCR for their review. TCR review typically occurs within a few minutes after submitting.

A Brand can have one of the following statuses:

- `IN_REVIEW`: Brand registration is in progress and under manual third-party review.
- `APPROVED` (Registered): Brand registration is complete and verified. You can now register your Campaigns.
- `FAILED`: Brand information couldn't be verified and registration has failed.
- `SUSPENDED`: The Brand potentially violates one or more rules for Brand registration.

## Step 3: Register a Campaign and associate a Messaging Service

> **Warning**
> Due to an increase in campaign submissions, campaign reviews are currently taking 10–15 days.

Now that your Customer Profile and Brand are successfully registered, you can register a Campaign for your Brand to send A2P 10DLC messages. A Brand can have up to five Campaigns associated with it.

### Set up a Messaging Service and Twilio Phone Number

Campaigns require an associated Messaging Service with at least one Twilio 10DLC Phone Number in its Sender Pool. You can use an existing Messaging Service or create one before or during Campaign registration.

Add all of the Phone Numbers that you plan on using for A2P 10DLC messaging to the Messaging Service before submitting your Campaign registration.

### Select a use case

A Campaign represents a single messaging use case which describes the type of messages you send to recipients, such as marketing promotions or order confirmations.

### Registration process

Go to the Onboarding page in your Console and begin the process listed under the Campaign Registration tab.

### Approval process

Once submitted, your Campaign undergoes a manual vetting process and has a `pending` status. This process can take between two to three weeks to complete. Twilio will contact you if any additional information is required.
