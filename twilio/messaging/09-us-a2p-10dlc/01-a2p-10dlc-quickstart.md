# A2P 10DLC Registration Application Quickstart

In this quickstart, you'll apply for Application-to-Person (A2P) 10-digit long code (10DLC) registration. US regulations require A2P 10DLC registration to send text messages from a US 10DLC number to US recipients through an application.

The estimated time to complete the application is 15 minutes.

> **Warning**
> Due to an increase in campaign submissions, campaign reviews are currently taking 10–15 days. Twilio will contact you if additional information is needed. Once approved, you can begin sending A2P 10DLC messages.

## Complete the prerequisites

- Sign up for a paid Twilio account or upgrade your existing Twilio trial account. Twilio trial accounts can't register for A2P 10DLC.
- Buy a Twilio US 10DLC phone number.
  - In the Twilio Console sidebar, click Phone Numbers > Manage > Buy a number.
  - Filter results to include (+1) United States - US for Country and click Search.
  - Click Buy next to the number you want to buy.

## Apply for A2P 10DLC registration

Select your customer type and follow these steps to apply for A2P 10DLC registration.

- **Sole Proprietor**: you aren't acting as part of a registered business (includes hobbyists) and you're located in the US or Canada.
- **Business Representative**: you represent a business that has a Business Registration ID, such as a US EIN.

> **Warning**
> Most application failures occur in step 3 (campaign registration). Review the tips and examples in step 3 to help prevent registration failure.

### Registration Steps

1. **Create a customer profile in the Twilio Console**
   - Complete the required fields.
   - For "Does the business you're registering have a tax ID?", select appropriately.
   - On the final screen, click Submit for review.

2. **Register your brand in the Twilio Console**
   - Complete the required fields and click Register.
   - Twilio sends a One Time Password (OTP) verification request to the mobile number you provide. You must respond within 24 hours.
   - The Campaign Registry (TCR) typically approves brands within a few minutes of submission.

3. **Register your campaign in the Twilio Console**
   - After TCR approves your brand, complete the required fields to register your campaign.

| Field | Description | Tips for approval |
|-------|-------------|-------------------|
| Campaign description | A summary of the campaign use case. | Provide a thorough explanation of the campaign's objective. Single-word answers like "Marketing" are insufficient. |
| Sample messages | Two example messages that reflect the content your campaign sends. | Specify the sender in every message. Use brackets [] to indicate templated information. Indicate an opt-out mechanism in every message. |
| How do end-users consent? | Your explicit end user opt-in process. | Provide an opt-in method that TCR can verify, such as a link to a publicly-accessible website with an opt-in process. |
| Opt-In Keywords | Terms that a user can text to opt in. | If you don't support opt-in through text, leave this blank. |
| Opt-In Message | Auto-reply message for users that opt in through text. | Include a message if you specified Opt-In Keywords. |

4. **Register your Twilio Phone Number in the Twilio Console**
   - Select the Messaging Service you want to use.
   - Click Add Senders.
   - Select the Twilio phone number you bought and click Add Senders.

Your application is complete. After your campaign's status changes to VERIFIED, you can send SMS messages programmatically with Twilio.

## Next steps

- Send SMS and MMS messages
- Receive and reply to incoming messages
- Browse the Messaging API Reference
- Review TwiML documentation
