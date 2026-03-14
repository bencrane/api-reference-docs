# Toll-Free Verification Console Onboarding Guide

Twilio toll-free numbers cannot send SMS messages to the United States and Canada until toll-free verification is completed and approved. This document covers how you can submit your toll-free phone number for messaging verification directly from the Twilio Console and review the verification status for any of the toll-free numbers in your Twilio Account.

See this support article for more information about toll-free verification requirements.

> **Campaign Verify Required for Political Organizations**
> If your organization is a 527 political organization and you are registering for political election campaigns, you must obtain a Campaign Verify token before submitting toll-free verification through the Console. The Console workflow will prompt you to provide this token during the verification process. Read the Campaign Verify section for details.

## Prerequisites

To complete toll-free verification, you need:

- A paid Twilio Account (not in trial). See the Upgrading to a Paid Twilio Account support article for more information.
- A Twilio toll-free number. Learn how to purchase a toll-free number here.

## Submit information for verification

Go to the Active Numbers page in the Console. Any unverified toll-free number you own shows a warning with a link to the verification section in the Console. To get to the verification page for a toll-free number:

1. Click on the phone number.
2. Navigate to the Regulatory Information tab.
3. Click Verify this toll free number.

The verification process differs depending on whether you have existing Customers Profiles. See below for how to verify your number with an existing Customer Profile, or how to create a new Customer Profile and verify your number.

### Verify with an existing Customer Profile

In this case, you have at least one Customer Profile for your business. Select the profile you'd like to use and review the business information. Confirm the "Legal entity name" and "Website URL".

Then, complete the information for your Messaging Use Case and submit the information for verification.

A confirmation message appears after you complete and submit the information.

### Verify with a new Customer Profile

> **Warning**
> If you are an ISV, make sure that your Primary Business Profile is approved before submitting toll-free verification requests for your secondary customers.

In this case, you have not created a Customer Profile before.

1. First, add your business and contact information (Step 1)
2. Then your business location (Step 2)

This automatically creates a Customer Profile for you. Next, complete the information for the Messaging Use Case and submit the information for verification.

A confirmation message appears after you complete and submit the information.

## Review verification status

To review the verification status of any Twilio toll-free number, go to the Twilio Console and navigate to Phone Numbers > Manage > Active numbers. Once there, select the toll-free phone number that you would like to review and click on the Regulatory Information.

Below are the possible verification statuses for a toll-free number:

| Submission Status | What's happening | Toll-Free phone number traffic |
|-------------------|------------------|-------------------------------|
| Not verified | Twilio's systems are processing the request. Verification Ops has not yet received it for review. | The toll-free phone number is Restricted. |
| Verification in progress | Verification Ops have accepted the submission and it is in their queue. | The toll-free phone number is Pending. |
| Approved | Verification Ops approved the submission. | The toll-free phone number is Verified. |
| Rejected | Verification Ops rejected the submission. If the submission is re-submittable, you have seven days to resubmit it for priority review. After seven days, the toll-free phone number remains Restricted until you resubmit verification. See Why Was My Toll-Free Verification Rejected? for more information about rejection reasons and what to do. | If re-submittable, the toll-free phone number is Pending. If not re-submittable, the toll-free phone number is Blocked. If seven days have passed since the rejection, the toll-free phone number is Restricted. |

See Toll-Free Message Verification for US/Canada for more information.

> **Warning**
> If you are an ISV submitting verification requests on behalf of multiple customers, or if you are submitting verification requests for multiple toll-free numbers on your own behalf, consider using Twilio's Event Streams product to subscribe to events related to your toll-free verification requests. See the Toll-Free Verification API reference for more information. Subscribing to Event Streams doesn't require API calls.

## Edit and resubmit a rejected toll-free verification

You can submit a rejected toll-free verification if it is eligible for resubmission.

To see the rejection reason for a number and to see if you can resubmit it, click on the number in the Active numbers section of the Console. Then, click on the Regulatory Information tab.

If the number is eligible for resubmission, you will see a Make corrections and resubmit button, with a message that tells you the number of days you have left to resubmit (for example, "6 days left"). If you resubmit your verification request within this window, your request will go into a priority queue for review. You can still submit outside of this window, but the resubmission will go into the same queue as new toll-free verification requests.

Click the Make corrections and resubmit button to see the reason your verification was rejected and correct the information. At the bottom of the window, you must agree to the Terms of Service and then you can click Send Information for verification.

If the number is not eligible for resubmission, you will see a button that says Review rejection details. See Why Was My Toll-Free Verification Rejected? for more information about rejection reasons and how to fix them.

For additional information about rejections that are ineligible for resubmission, refer to the following articles:

- Forbidden message categories
- Toll-Free best practices

## Delete a toll-free verification

You can delete your toll-free verification requests directly from the Console if it is Pending, Approved, or Rejected.

To delete the verification, go to Phone Numbers > Manage > Active numbers in the Console and select the toll-free phone number. Then, navigate to the Regulatory Information tab and click Delete verification. Confirm that you want to delete the toll-free verification. This is a destructive action and it can't be undone.

> **Info**
> Deleting a toll-free messaging verification request does not release the toll-free number from your Twilio Account. However, releasing the toll-free number from your Twilio Account will delete the toll-free messaging verification.

See below for information about when you can and cannot use this delete feature:

> **Warning**
> Deleting and resubmitting a verification request puts the new verification request in the back of the review queue. Only delete your verification request if you need to make major changes to your messaging use case or opt-in flow. If a previous submission was eligible for resubmission, use the resubmit flow rather than deleting and recreating a verification request.

| Verification Status | Action |
|---------------------|--------|
| Restricted (Not verified) | Deletion is not available. |
| Verification in progress | Delete this verification request to stop this verification and submit a new one. Do this if you need to correct information about the messaging use case, opt-in flow, or business information such as a website URL. Other issues should not impede verification and do not require deletion and resubmission. |
| Approved | Delete an approved verification request if you want to change the messaging use case and/or opt-in flow for that verified toll-free number. Then resubmit the verification for the number with the new information. No deletion and resubmission is required if you're only making minor changes to your use of the toll-free number for messaging, such as the message content. |
| Rejected | If a previous submission was rejected with the note "not eligible for resubmission", deleting that verification request is the only way to resubmit the same toll-free number for verification. Only do so if you have a clear understanding of what you need to correct (for example, a mistyped or incorrect website URL, or an incomplete use case or opt-in description). See Why Was My Toll-Free Verification Rejected? for more information about rejection reasons and how to fix them. |