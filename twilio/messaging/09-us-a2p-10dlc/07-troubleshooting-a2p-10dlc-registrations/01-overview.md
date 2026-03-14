# Troubleshooting A2P 10DLC Registrations

To join the US 10DLC ecosystem, you need to register a Brand for your business and an A2P messaging Campaign for that Brand. This process can fail at both the Brand and Campaign approval stages. Brand registrations may fail if the business information is incomplete, formatted incorrectly, or doesn't match existing records. Campaigns may fail if the Campaign purpose, use-case, workflow, opt-in, and opt-out methods are incomplete or inadequate, or if Twilio's Campaign Registry policies find the Campaign's content to be in violation.

After registering a Campaign for A2P, the **A2P ecosystem partners** must register each phone number in the linked Messaging Service. This starts after Campaign approval but may not be immediate. Delays or failures can occur.

This document links to specific guides that explore:

- Troubleshooting and fixing errors for Sole Proprietor Brand submissions
- Troubleshooting and fixing errors for Standard and Low-Volume Standard Brand submissions
- Troubleshooting and fixing errors with Campaign submissions (for all types of Brands)
- Troubleshooting issues with registering phone numbers for successful Campaigns

> **Info**
> The three types of Brands (and associated Campaigns) for which a business can register are Standard, Low-Volume Standard, and Sole Proprietor. See **Determine your customer type** for a comparison of the three brand types, as well as the difference between Direct and ISV customers. In general, the registration and error reasons for Sole Proprietor Brands can differ from those for Standard and Low-Volume Standard Brands.

## Troubleshoot and fix Sole Proprietor Brand registration failures

Review **this guide** for help with Sole Proprietor Brand registration failures. This includes errors in registering Business Profiles. Sole Proprietor Brands need different troubleshooting due to unique validations and review steps.

## Troubleshoot and fix Standard and Low Volume Standard Brand registration failures

Review **this guide** for help with Standard and Low-Volume Standard Brand registration failures. This includes errors when registering the Business Profiles.

## Troubleshoot and fix A2P Campaign submission failures

You can now edit a FAILED Campaign via the Console, and it is also available via API in **private beta**. While you can delete and recreate failed Campaigns, this process is more cumbersome and should only be undertaken in certain scenarios. See **this guide** for example scenarios and the process for fixing failed Campaign submissions for all Brand types.

## Troubleshoot Campaign phone number registration issues

After you successfully register a Campaign for A2P, the **A2P ecosystem partners** must also register each phone number in the Messaging Service linked to that Campaign. This process starts once they approve the Campaign, but it is not instant and can face delays or failures. See **this guide** to learn how to check the status of all such phone numbers and what to do if one or more fails registration.