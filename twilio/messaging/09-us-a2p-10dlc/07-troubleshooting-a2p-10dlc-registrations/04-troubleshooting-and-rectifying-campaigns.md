# Troubleshooting and rectifying Campaigns

A2P Brand & Campaign registration via the API consists of the following steps:

1. Create a Customer Profile (this will either be a Starter Profile for Sole Proprietor Brands, or a Standard Profile for Standard or LVS Brands)
2. Create an A2P Trust Bundle
3. Create an A2P Brand
4. Create an A2P Campaign around a single use case (each Sole Proprietor Brand can only have one Campaign, but Standard Brands can have multiple Campaigns)
5. Add a Phone Number to the Campaign (each Sole Proprietor Campaign can only use one Phone Number to send messages, but a Standard/LVS Campaign can have many)

The present guide addresses troubleshooting of failures that can happen at Step 4, Campaign creation/submission. The process can also fail at prior steps 1 or 3. Troubleshooting these for Sole Proprietor Brands is covered in the Sole Proprietor guide; troubleshooting these for Standard or LVS Brands is covered in the Standard/LVS guide. Finally, Phone Numbers added to successfully-created Campaigns (Step 5) can themselves fail to be successfully registered, or their successful registration can take longer than expected. Troubleshooting these phone number issues is addressed in a separate guide.

---

## Troubleshooting Campaigns via Console

Since Campaigns can be rejected by TCR for a wide variety of reasons, if you are an ISV registering multiple secondary customer Campaigns, you may find these approved at different times, or you may find that some are approved and others are rejected (FAILED). For this reason, both ISVs and direct customers sometimes find it easier to track the status of Campaigns via the Console, whether they were originally submitted via Console or via API.

Going to **Messaging > Regulatory Compliance > Campaigns** will show a list of all your Campaign submissions, with a status indicated for each. If you click on the name or Campaign SID of a FAILED Campaign, you will see a Campaign Details page with failure reasons indicated.

In the Campaign Information panel, you may see multiple separate failure reasons. For example:
- The Campaign description was found to be invalid, probably because it was not detailed enough
- The content of the first Sample message was inappropriate for the designated use case

### Editing a Campaign in the Console

If you click on the blue **Edit Campaign** link, you will be taken to a modal that begins with a banner confirming that this Campaign was failed upon review, inviting you to fix whatever issues were flagged.

Below this you will see text entry boxes corresponding to most of the text-entry fields in the original Campaign submission flow:

- **Campaign description**
- **Sample messages** (boxes for up to five different sample messages, but only the first two are required)
- **Message contents checkboxes** to indicate whether any of your messages will contain:
  - Embedded links
  - Phone numbers
  - Content related to direct lending or other loan arrangements
  - Age-gated content
- **Opt-in process description** (how end users give their consent to receiving text messages)

All of these will be pre-populated with the information entered in the original Campaign submission.

After you have made the necessary changes to address your own `failure_reason`, click **Update** to resubmit your Campaign for approval. This initiates a new Campaign vetting process, which involves the same time and effort from our A2P ecosystem partners as the original Campaign submission. A vetting fee will be assessed on resubmissions for Campaigns that failed review by the third-party vetting partner.

### Deleting and Recreating a failed Campaign via Console

Clicking the "Delete Campaign" link will launch a confirmation modal; this Delete Campaign link is active for APPROVED Campaigns as well as FAILED ones, and you definitely do not want to delete an approved Campaign unless you have very good reason to do so.

> **NOTE:** Since you will want to use either most or all of the original Campaign details in the new submission, it might be a good idea to duplicate the tab with the original Campaign details screen, so that you can refer back to these Campaign details when you recreate the Campaign.

Once the FAILED Campaign has been deleted, you can then go back to the Brand for which you submitted this Campaign (you can find this via **Messaging > Regulatory Compliance > Brands** in the left navigation, which will allow you to click on the appropriate Brand and launch the Brand details page).

- If you just need to resubmit the Campaign with a new use case indicated, use the blue **Register New Campaign** button in the Brand details screen, which will launch a new Campaign creation workflow and allow you to enter whatever original and new Campaign information is appropriate.

- If the Campaign's failure reason lies with the Brand information itself (which ultimately always means some aspect of the Brand's underlying business profile or trust bundle), you will need to remediate Brand issues first. But the Campaign deletion still needs to happen first; a Brand cannot be edited if it has a Campaign associated with it. Once the Brand has been resubmitted, then on the Brand details screen you can use the **Register New Campaign** button to launch the new Campaign creation workflow.

---

> **Info: Valid and invalid shortened links in Campaign submissions**
>
> If you present a business website URL in any part of your Campaign submission (such as sample messages) that uses a shortened URL, be aware that only certain forms of shortened URL are acceptable to The Campaign Registry. Specifically, you must use a dedicated, branded short domain that belongs to your business. You cannot use the sort of randomly-shortened URL typically furnished by a free service like bit.ly or TinyUrl; this will lead to rejection of the Campaign by TCR.

---

## Troubleshooting Campaigns via API

In the guides to registering Standard/Low-Volume Standard Brands via API as well as the guide to registering Sole Proprietor Brands, you created a new messaging Campaign to go with your new A2P Brand. The guide directs you to do a fetch call on the newly-created Campaign to check its status.

It's important to remember that, like new A2P Brand registration, new Campaign verification is never an instantaneous process. Sole-Proprietor Campaigns tend to be approved (or rejected) most quickly, while Standard Campaigns must go through several distinct layers of vetting and this process can take up to several weeks.

If your fetch call to the new Campaign returns a `campaign_status` of `IN_PROGRESS`, this vetting process is not yet complete. Once the process is complete, your fetch call will return a `campaign_status` of either `VERIFIED` or `FAILED` (or in some rare cases `SUSPENDED`).

### GET A2P Messaging Campaign Status

This call requires two parameters:
- The `messaging_service_sid` (i.e., the SID of the Messaging Service you're using in this Campaign)
- A hardcoded compliance type of `QE2c6890da8086d771620e9b13fadeba0b`

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

us_app_to_person = (
    client.messaging.v1.services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .us_app_to_person("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(us_app_to_person.brand_registration_sid)
```

### Understanding Campaign Failure Errors

If you receive a `campaign_status` of `FAILED`, the `errors[]` object in the call's JSON return will be populated with information:

```json
"errors": [
    {
      "error_code": 30897,
      "fields": [ "MESSAGE_FLOW" ],
      "url": "https://www.twilio.com/docs/api/errors/30897",
      "description": "The campaign submission has been reviewed and it was rejected due to Disallowed Content."
    }
  ]
```

For a FAILED Campaign, there will always be at least one such error listed, but there could be multiple errors:

```json
"errors": [
    {
      "url": "https://www.twilio.com/docs/api/errors/30886",
      "fields": [
        "USE_CASE_DESCRIPTION"
      ],
      "error_code": 30886,
      "description": "The campaign submission has been reviewed and it was rejected because of invalid campaign description."
    },
    {
      "url": "https://www.twilio.com/docs/api/errors/30892",
      "fields": [
        "SAMPLE_MESSAGE_1"
      ],
      "error_code": 30892,
      "description": "The campaign submission has been reviewed and it was rejected because of URL shortener in the sample message."
    },
    {
      "url": "https://www.twilio.com/docs/api/errors/30893",
      "fields": [
        "SAMPLE_MESSAGE_2"
      ],
      "error_code": 30893,
      "description": "The campaign submission has been reviewed and it was rejected because of invalid sample message content."
    }
]
```

### Remediable vs Non-Remediable Errors

There are two categories of errors, and only the first type can be remedied:

**Example of a remediable error (30893):**
- Rejection Category: "Invalid Sample Message Use Case"
- Rejection Reason: "Sample messages are either not provided, unclear, or content does not match the campaign use case."
- Remedy: Verify that sample messages are accurate and detailed. Sample messages should reflect actual messages to be sent under campaign and indicate templated fields with brackets. At least one of the sample messages needs to include your business name. Use case and campaign description need to match campaign description.

Such a Campaign could be deleted and recreated. Learn how to delete and create a Campaign in the UsAppToPerson Resource API Reference doc.

**Examples of non-remediable errors:**

| Error Code | Rejection Category | Rejection Reason |
|------------|-------------------|------------------|
| 30883 | Content Violation - SHAFT - Sex | Submission included content such as nudity, pornography, sex toys, or other adult content |
| 30883 | Content Violation - SHAFT - Hate | Submission included speech that is hateful, profanity, violent, incites violence, or similar speech |
| 30883 | Content Violation - SHAFT - Alcohol | Submission includes content referring to alcohol |

The 30883 error code represents a **Content Violation**, which means that your proposed Campaign has been deemed to deal with content that is prohibited under the terms of A2P Campaign registration, such as sexual references, hate speech, or references to alcohol, firearms, tobacco products or marijuana.

In addition to Content Violations, your Campaign use case could be disallowed because it is deemed to represent:
- A high risk for a spam/phishing attack (30884)
- Other potentially fraudulent activity (30885)
- Violation of Twilio's general Terms & Conditions (30882)
- Use of the same EIN for too many Brand registrations (by default, a single EIN/Tax ID can only be used in a maximum of 50 different Brands)

Customers who disagree with a Campaign rejection for such a non-resubmittable reason may submit an appeal to the Twilio support desk; but outside of this route, there is no remedy for this kind of Campaign rejection except to materially change the nature or content of the proposed Campaign, or in some cases the associated Brand.

---

## Individual Campaign Suspensions

It is possible for a Campaign to be suspended on its own, but it's also possible for a Campaign to be suspended because the Brand it's associated with is suspended. You can check the Brand status to understand which case it is.

If your Brand is still in an Approved state but your Campaign is suspended, it means the campaign may have violated one or more of the following rules:

- **Campaign-to-traffic mismatch:** In-market traffic does not match with the campaign registered
- **Spam:** including but not limited to any kind of unwanted or unsolicited messaging
- **Controlled substance:** including but not limited to messaging pertaining to controlled substances
- **Phishing Messages:** including but not limited to messaging designed to gain access to information through deceptive means
- **(Excessive) Complaints:** including but not limited to unacceptable volumes of consumer complaints
- **Illicit Content:** including but not limited to messages relating to illegal activity
- **Fraudulent Messages:** including but not limited to counterfeit/fraudulent goods or activities
- **Affiliate Marketing:** including but not limited to sharing of opt-ins to affiliate companies
- **Promotional Gambling:** including but not limited to the act of gambling or promoting gambling
- **Lack of Age gate:** No age gate mechanism for messaging campaigns that require it
- **Illegal Sweepstakes:** including but not limited to sweepstakes that do not follow required laws
- Other violations not listed above

The Twilio team should be reaching out to you to provide guidance on how to fix the suspended campaign. Check your email or the Twilio Support Center. If you don't see anything, raise a ticket.

### Restrictions While Campaign is Suspended

> **IMPORTANT:** Do not attempt to send similar messages via another existing or new Campaign. This could result in a serious violation and may result in termination / suspension of your account with Twilio.

Suspended Campaigns face the following restrictions:

- Suspended campaigns cannot be used to send messages. You will receive error code **30033** if you try to do this.
- Suspended campaigns cannot be deleted via self-service and you may not add/remove the numbers. You will receive error code **21729** if you try to do this.
- Before you resolve the suspensions, you're responsible for the monthly registration fees associated with suspended campaigns as well as the monthly fees associated with the numbers that are in the campaigns.
- It is also possible that you won't be able to resolve the suspensions if the ecosystem has determined your use case is not fit for A2P 10DLC. If this is the case, after 30 days of being suspended, Twilio will automatically delete your suspended campaigns and release all the associated phone numbers.