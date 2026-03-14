# SMS Pumping Protection for Programmable Messaging

SMS Pumping Protection uses automatic fraud detection to block messages flagged as being suspicious for SMS pumping fraud from being sent. It works by analyzing your current and historical SMS traffic for unusual patterns. When unexpected fluctuations in your SMS traffic for a specific location, or system-known malicious activity, are detected this feature will automatically block messages to phone numbers associated with the suspected fraud.

> **Note**
> It is important to note that no provider side solution can guarantee 100% protection against sophisticated attackers. Customer participation in fraud prevention is essential. More information on steps you can take to prevent fraud can be found here.

> **Pricing**
> For pricing information on SMS Pumping Protection for Programmable Messaging:
> 
> 1. Navigate to the SMS Pricing page.
> 2. Select the country you are interested in.
> 3. Check the Features section of the page.
> 
> Note that, for the United States and Canada, SMS Pumping Protection for Programmable Messaging is provided at no additional cost, therefore you may not find a line item in the Features section of their SMS Pricing pages.
> 
> Alternatively, you can contact Sales for pricing information.

> **Verify and Fraud Guard**
> If you're using Programmable Messaging to send one-time passcode (OTP) verifications, consider migrating to Verify which includes Fraud Guard with customizable protection levels at no extra charge.

## Enable SMS Pumping Protection

You can find the SMS Pumping Protection settings by navigating to the Twilio Console > Messaging > Settings > General page. From there, select Enabled to activate SMS Pumping Protection on your account.

Once the feature is enabled on your account, no further actions are needed on your part. Your protection will begin immediately.

## Fraud detection process

This feature works by detecting SMS pumping fraud. SMS pumping fraud happens when fraudsters take advantage of a phone number input field to receive a one-time passcode, an app download link, or anything else via SMS. The messages are sent to a range of numbers controlled by a specific mobile network operator (MNO) and the fraudsters get a share of the generated revenue.

Twilio uses a baseline of expected message data to find outliers in behavior based traffic patterns. We combine behavioral data with known explicit fraud schemes to filter out bad behavior.

Our model is always changing and uses multiple parameters to determine fraud. Examples of things we may temporarily block could include:

- Messages to a specific region, country or locale we know is engaging in SMS pumping
- Messages in a country your account has never sent SMS to previously
- Messages with parameters and characteristics that would suggest non-human behavior

## AI Nutrition Facts

Twilio's AI Nutrition Facts provide an overview of the AI feature you're using, so you can better understand how AI is working with your data. The qualities of SMS Pumping Protection are outlined in the following Nutrition Facts label. For more information, including the glossary regarding the AI Nutrition Facts label, refer to Twilio's AI Nutrition Facts page.

| AI Nutrition Facts | |
|---|---|
| **SMS Pumping Protection for Programmable Messaging** | |
| **Description** | SMS Pumping Protection detects and prevents SMS pumping abuse in real time to protect customers from artificially inflated traffic using first-of-its-kind technology and Twilio's Proprietary Customer AI engine. |
| **Privacy Ladder Level** | 2 |
| **Feature is Optional** | Yes |
| **Model Type** | Predictive |
| **Base Model** | Twilio Proprietary Model and Prophet |

### Trust Ingredients

| Attribute | Value |
|---|---|
| Base Model Trained with Customer Data | Yes - Customer messaging traffic metadata is used for model training. |
| Customer Data is Shared with Model Vendor | N/A |
| Training Data Anonymized | Yes |
| Data Deletion | Yes |
| Human in the Loop | No |
| Data Retention | 30 days |

### Compliance

| Attribute | Value |
|---|---|
| Logging & Auditing | Yes - Standard service logging is applied and logs are stored for future review. |
| Guardrails | N/A |
| Input/Output Consistency | Yes |
| Other Resources | SMS Pumping Insights available to provide transparency to customers around how the product works. |

## Preventing false positives

Like any fraud prevention feature, there's a small chance our models may flag legitimate users as suspicious. We're constantly monitoring our results and adapting the fraud detection model to keep false positives extremely low.

### Global Safe List

You can use the Global Safe List API to maintain a list of phone numbers that will never be blocked by Programmable Messaging SMS Pumping Protection, Verify Fraud Guard, Verify Geo Permissions or any other internal fraud & risk check solution. By adding safe and verified phone numbers such as known customers, partners, or approved contacts to the Global Safe List, you ensure timely delivery of critical communications to these message recipients.

### RiskCheck parameter

When you create a Message with the Programmable Messaging API, you can use the RiskCheck parameter to adjust the level of risk protection for individual outbound messages. Using the RiskCheck parameter, you can determine whether to apply SMS Pumping Protection to a specific message giving you more flexibility when sending messages for multiple use cases with different risk profiles using the same phone number.

For example, you may want to send messages for two different use cases using the same phone number:

- SMS messages with one-time passcode (OTP)/two-factor authentication (2FA) content
- Marketing SMS messages

Account- or phone number-level risk protection settings are not granular enough if you want to treat these two use cases differently for purposes of SMS Pumping Protection. However, to achieve this goal you can:

- Set the RiskCheck parameter to enable (default value) when creating an OTP/2FA message to take advantage of the built-in SMS Pumping Protection.
- Set the RiskCheck parameter to disable when creating a marketing message which does not need SMS Pumping Protection.

### Other actions

You can also take these actions if you suspect false positives:

- Fall back to a different messaging method like WhatsApp or Facebook Messenger
- Create a separate subaccount for your legitimate users which has SMS Pumping Protection disabled
- Reach out to your Solutions Architect or contact Twilio Support through the Console or Help Center

## Monitoring

Error 30450 will show in the Twilio error logs when an SMS delivery is blocked by SMS Pumping Protection.

You can use the Messaging Intelligence SMS Pumping Protection Insights dashboard to answer questions such as:

- What are the projected monthly savings from using the SMS Pumping Protection for Programmable Messaging feature?
- What is the volume of sent messages that were blocked by SMS Pumping Protection?
- How do SMS pumping fraud activities break down by geography?