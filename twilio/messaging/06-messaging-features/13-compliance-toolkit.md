# Compliance Toolkit for Programmable Messaging

**(new) Public Beta**

Programmable Messaging customers can activate the Public Beta of the Compliance Toolkit from the Twilio Console.

This feature supports SMS messages terminating in the United States written in English and Spanish languages only.

Compliance Toolkit is available as a Public Beta release and the information contained in this document is subject to change. Some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by the Twilio Support Terms or the Twilio Service Level Agreement.

**⚠️ HIPAA incompatible:** Compliance Toolkit shouldn't be used in workflows subject to HIPAA regulations.

**ℹ️ Pricing:** To learn about Compliance Toolkit pricing for Programmable Messaging, see the SMS Pricing page or contact Sales.

Compliance Toolkit helps you mitigate your compliance exposure by using artificial intelligence and machine learning to proactively detect possible regulatory violations and prevent or reschedule their transmission.

## Get started with Compliance Toolkit

To activate Compliance Toolkit, go to your account settings in the Twilio Console.

1. Log in to the Twilio Console
2. Go to Messaging > Settings > General.
3. Select Enabled. The Compliance Toolkit modal displays.
4. Review the text of this modal, then acknowledge that you have read the Twilio Compliance Toolkit: AI/ML and Product Terms Addendum.
5. Click Done then Save. Once activated, the toolkit runs on your existing messaging flows. This requires no further action on your part.

## Compliance checks

To identify and resolve possible violations of the following regulations, Twilio passes all US outbound SMS traffic through Compliance Toolkit.

### Quiet Hours enforcement

#### Quiet Hours check

When Twilio tries to send a message, Compliance Toolkit checks if it falls within Quiet Hours. The US Federal Communications Commission defines these hours under the Telephone Consumer Protection Act (TCPA) as 9:00 PM to 8:00 AM in the recipient's local time zone in the US. Twilio infers the time zone using the recipient's phone number area code.

**ℹ️ Recommended:** To improve accuracy, you can provide the most known ZIP codes of your recipients with the Contact API. When available, Compliance Toolkit uses the ZIP codes as entered in the Contacts API to enforce Quiet Hours.

#### Message classification

If the message falls within Quiet Hours, Compliance Toolkit classifies the message using AI/ML model as essential or non-essential. This classification is based on the message content and context.

If you want to override the defaults and bypass Compliance Toolkit's classification model and set specific messages as essential, use the MessageIntent parameter.

**Examples of non-essential messages:**
- Marketing and promotional campaigns like discounts, loyalty points, and flash sales
- Charity or events-related broadcasts

**Examples of essential messages:**
- Fraud alerts or suspicious activity notifications
- Shipping and delivery updates
- Customer support messages
- Emergency announcements
- School alerts to parents and students
- Receipts or confirmations requested through SMS
- Replies to recent inbound messages
- Opt-in and unsubscribe confirmations

#### Delivery behavior

If Compliance Toolkit classifies a message as non-essential and it falls within Quiet Hours, it will not be sent immediately. Instead, by default the message is automatically rescheduled to be delivered after Quiet Hours, and the message metadata in the following ways:

- The delivery status changes to scheduled.
- It adds a ScheduledAt timestamp in the Message Logs that states when it plans to deliver the message.

You can track the scheduled status with existing webhooks, logs and Messaging Insights experience.

This feature delivers messages while respecting both compliance requirements and recipient experience.

You can set your preference for Quiet Hours message handling as one of two options:

- **Reschedule (default):** The default behavior that reschedules the message with a new delivery time.
- **Block:** This blocks the non-essential message sent during Quiet Hours and returns a 30610 error code.

### State Specific Quiet Hours enforcement

In addition to TCPA requirements, Compliance Toolkit enforces state-specific quiet hours in the following states. This ensures that non-essential messages are not delivered to recipients during the following time windows.

Compliance Toolkit applies these Quiet hours based on the recipient's location. It determines this from either from the area code of the phone number (default) or from the location provided with the Contact API. Non-essential messages that fall into these restricted windows get rescheduled and delivered once Quiet Hours end.

**⚠️ Note:** The following US states have additional Quiet Hour requirements like non-essential messages prohibited or different Quiet Hour windows on weekends. Compliance Toolkit doesn't enforce any restrictions or requirements outside what's in this table. When using any Twilio Services, customers should check with counsel for any additional requirements and ensure compliance.

| State(s) | Quiet Hours Enforced (Local Time) |
|----------|-----------------------------------|
| Alabama, Florida, Louisiana, Maryland, Mississippi, Oklahoma, Tennessee, Washington | 8:00 PM – 8:00 AM |
| Connecticut, Nevada | 8:00 PM – 9:00 AM |
| Texas | 9:00 PM – 9:00 AM (Monday–Saturday), 9:00 PM – 12:00 PM (Sundays) |

## Monitoring & Insights

### Opt out check

To identify users who have opted out of receiving your messages, Twilio checks against its opt-out database.

By sending a reply to your messages with one of the following keywords, these previous subscribers opted out:

- STOP
- UNSUBSCRIBE
- END
- QUIT
- STOPALL
- REVOKE
- OPTOUT
- CANCEL

If the associated recipient replied to a message with the appropriate opt-out command after the recorded opt-in date, Twilio blocks the message and returns error 21610.

Twilio also checks the recipient's consent status using the Consent Management API. If a recipient opted out, Twilio blocks your message to that specific user and returns error 21610.

### Reassigned number check

Compliance Toolkit verifies that the intended recipient's phone number belongs to the original subscriber who consented to communications. This verification happens through tracking and updating customer's consent against the US FCC's reassigned phone number database. If the a carrier reassigned this phone number to a different consumer after the date of the on-record consent, Twilio blocks the message and returns error 21610.

After the first reassigned number check on a particular phone number, this feature checks that number for new messages every 30 days.

## Consent management

To bulk update and manage user consent preferences for SMS messaging, use the Twilio Consent Management API. It stores and updates consent statuses for your users with data on how and when Twilio collected consent.

The Consent Management API lets you upsert multiple consent records in a single request. To synchronize large volumes of user consent preferences between two or more data sources, use this API.

To opt-in a user again, update the recipient's consent status to opt-in. This overrides the STOP keyword and allows you to send messages to this user again.

### Supported consent preferences

With this API, you can manage the following user consent statuses:

| Consent status | Description |
|----------------|-------------|
| opt in | The user has provided valid consent to receive SMS messages. |
| opt out | The user has revoked consent or replied with STOP-like keywords. |
| re-opt in | Handled as opt-in. The user has opted in again after a prior opt-out. Overrides STOP keyword |

To block or allow messages, Twilio checks this consent status in the Consent Management API records and keyword-based signals.

## Tune your Compliance Toolkit setup

To meet your specific messaging needs, Twilio Compliance Toolkit provides customization options through three API resources.

- **Contact API** can set the known ZIP code for each end user. By using the recipient's location instead of their phone number's area code, this improves Quiet Hours accuracy.

- **Consent Management API** allows you to set each subscriber's opt-in or opt-out status. Twilio uses these up-to-date, verified preferences to block or permit messages.

- **Twilio Programmable Messaging API:**
  - The **riskCheck** parameter lets you set which messages the Compliance Toolkit evaluates. When set to disable, Compliance Toolkit doesn't evaluate that message. You also don't incur associated charges.
  - The **messageIntent** parameter lets you set the use case of the message.
    - If you set the messageIntent as an essential use case value like otp and notifications using this parameter, Twilio exempts it from Quiet Hours checks and delivers it.
    - If you set the messageIntent as non-essential use case value like marketing using this parameter, Twilio reschedules its delivery after Quiet Hours.

### MessageIntent parameter values

The following table lists which use cases you can configure for the messageIntent parameter and the Quiet Hours Mapping assigned for that use case.

| Use case | MessageIntent parameter value | Quiet Hours Mapping |
|----------|-------------------------------|---------------------|
| Two-factor auth (2FA) and one-time passcodes (OTP) | otp | Essential |
| Account notifications, two-way conversational messaging | notifications | Essential |
| Fraud alerts | fraud | Essential |
| Security alerts, emergency | security | Essential |
| Customer care | customercare | Essential |
| Delivery notifications | delivery | Essential |
| Education | education | Non-Essential |
| Event marketing | events | Non-Essential |
| Polling and voting (non-political) | polling | Non-Essential |
| Public service announcement (non-emergency) | announcements | Non-Essential |
| General and campaign marketing | marketing | Non-Essential |

## Monitoring

When Compliance Toolkit blocks an SMS delivery due to Opt-Out or Reassigned Phone Number identification, Twilio returns an error 21610. This message displays in the Twilio error logs and the API response.

When Compliance Toolkit detects a marketing message being sent during Quiet Hours, it doesn't deliver it. It sets the delivery status to scheduled and the ScheduledAt timestamp for after the end of Quiet Hours, up to 4 hours later.

When you opt to block, rather than reschedule these messages, Compliance Toolkit returns error 30610 is displayed in the Twilio error logs and the API response.

To analyze aggregate trends and drill into Compliance Toolkit outcomes, use Messaging Logs and Insights in the Twilio Console.

To view all non-essential messages detected during quiet hours and automatically re-scheduled by Compliance Toolkit, filter by: "Used Scheduling" = Yes.

## FAQs

### Can I use Compliance Toolkit only for specific messages or subaccounts?

Yes. From the Twilio Console, you can activate Compliance Toolkit only for specific subaccounts. To invoke Compliance Toolkit per message, use the riskCheck parameter in the Twilio Programmable Messaging API. This controls when Compliance Toolkit gets applied.

### How does this differ from Twilio's Message Scheduling feature?

Twilio Message Scheduling within the Engagement Suite activates users so they can schedule messages for delivery at a future date and time. Twilio Message Scheduling doesn't analyze the message type nor prevent flagged messages from being sent during Quiet Hours.

### How does Compliance Toolkit determine a recipient's timezone for Quiet Hours?

By default, Compliance Toolkit infers the timezone from one of two data points:

- User phone number area code
- Latest known ZIP code provided from the Twilio Contacts API.

## AI Nutrition Facts

Twilio AI Nutrition Facts provide an overview of this AI feature. This overview helps you better understand how AI works with your data. The following Nutrition Facts label outlines the qualities of Compliance Toolkit.

| Field | Value |
|-------|-------|
| **Description** | Compliance Toolkit is a product available to Twilio Messaging customers that uses Artificial Intelligence to help manage their obligations with respect to certain local regulatory or compliance requirements. |
| **Privacy Ladder Level** | 3 |
| **Feature is Optional** | Yes |
| **Model Type** | Machine Learning |
| **Base Model** | Logistic Regression |
| **Base Model Trained with Customer Data** | Yes - Customer messaging traffic metadata is used for model training. |
| **Customer Data is Shared with Model Vendor** | No |
| **Training Data Anonymized** | Yes |
| **Data Deletion** | Yes |
| **Human in the Loop** | Yes |
| **Data Retention** | 30 days |
| **Logging & Auditing** | Yes - Standard service logging is applied and logs are stored for future review. |
| **Guardrails** | Yes |
| **Input/Output Consistency** | Yes |