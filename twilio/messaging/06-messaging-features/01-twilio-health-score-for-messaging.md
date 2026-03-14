# Twilio Health Score for Messaging

## Overview

Your Twilio Health Score for Messaging provides a comprehensive overview of your messaging performance, and guides you on how to optimize deliverability and engagement. You can use your Twilio Health Score to:

- Quickly determine if your performance is on track compared to messaging industry benchmarks.
- Prioritize where to take action across five subscores (Sent Rate, Compliance, Fraud, Latency, and Engagement) and the issues most impacting your traffic ("Top Issues").
- View personalized recommendations, including the potential impact of improvements and relevant Twilio products that can enhance your traffic.
- Set actionable goals, track performance over time, and more easily justify resources investments.
- Learn about best practices for optimizing your end customers experience, monitoring compliance and fraud risk, optimizing latency, and more.

The Twilio Health Score for Messaging benchmarks and calculations are defined by analyzing all of Twilio's messaging traffic, which provides you with a comparison to the messaging industry.

For example, if your overall score category is Good, this indicates your messaging deliverability is good relative to all of Twilio's messaging traffic.

Your total score is the sum of the five subscores and has a maximum score of 100. Twilio calculates the five subscores by analyzing errors and issues in your messaging traffic, using thresholds for acceptable issue rates based on best practices and Twilio data.

For example, the Sent Rate subscore recognizes that some errors, like occasional error code 30005 when a device is off, are normal.

In contrast, the Compliance subscore applies a stricter error rate threshold to set a higher bar for performance. Your score also provides comparison to industry-best-practice benchmarks that can help you optimize elements beyond deliverability.

For example, ensuring OTP traffic latency is < 10 seconds, or reducing your compliance risk and promoting message recipient trust by keeping opt out rates below 1%.

For each subscore, the "Top Issues" section shows you the issues with the biggest negative impact to your messaging health. Prioritize taking action on these so you can improve your Score and messaging traffic performance!

The score refreshes daily, and shows a 7-day-aggregated view of your traffic. You can filter your Twilio Health Score by account or subaccount.

## Personalized Recommendations

Along with your score, you can view Personalized Recommendations that analyze your messaging data and identify key opportunities for improving deliverability. The feature provides tailored insights, estimates the potential impact of suggested changes, and highlights relevant Twilio products that can enhance your messaging performance. Recommendations are refreshed weekly alongside your Twilio Health Score for Messaging and are accessible through the Messaging Insights dashboard.

## Weekly Email Notification

Sign up to receive a weekly email notification of your score so you can see how your messaging traffic is performing. The email provides your most recent score and a link to Twilio Console Messaging Insights, where you can view your score details.

If you have subaccounts, you can sign up at the parent account level and receive a weekly email. This email will show your main account score and highlight subaccounts with the most significant score changes. You can also receive individual emails for specific subaccounts.

You can find the Twilio Health Score for Messaging notification settings by navigating to Twilio Console > Monitor > Insights > Messages > Overview > Manage Notifications.

## Sent Rate

Sent rate measures the error rate for certain configuration and formatting errors, such as invalid destinations, unreachable handsets, missing message body, and mismatch between your From Number and Twilio account. Sent rate compares your rate for these errors against other senders on Twilio, giving you a benchmark to understand how your data quality and messaging setup stack up.

Monitor your sent rate to find opportunities to reduce avoidable errors and improve overall message deliverability.

### Error Codes Impacting Sent Rate Subscore

#### Invalid numbers and addresses

- 14101: Invalid To attribute.
- 21211: Invalid To phone number.
- 21212: Invalid From number.
- 21608: The To phone number provided is not yet verified for this account.
- 21612: Message cannot be sent with the current combination of To and/or From parameters.
- 21614: To number is not a valid mobile number.
- 21401: Invalid phone number.
- 21606: The From phone number provided is not a valid message-capable Twilio phone number for this destination/account.
- 30011: MMS not supported by the receiving phone number in this region.
- 30042: The Sender ID is blocked as generic or it contains special characters.
- 63024: Invalid message recipient.

#### Unreachable or blocked destinations

- 30003: Unreachable destination handset.
- 30004: Message blocked.
- 30005: Unknown destination handset.
- 30006: Landline or unreachable carrier.
- 30008: Unknown error.
- 60005: Downstream carrier error.
- 63036: The specified phone number cannot be reached by Rich Business Messaging (RBM) at this time.

#### Invalid or missing parameters

- 14103: Invalid body.
- 20422: Invalid parameter.
- 21602: Message body is required.
- 21603: A From or MessagingServiceSid parameter is required to send a message.
- 21609: Invalid StatusCallback.
- 21617: The concatenated message body exceeds the 1600 character limit.
- 21619: A message body, media URL, or content SID is required.
- 21621: The From number has not been enabled for MMS.
- 21910: Invalid From and To pair. From and To should be of the same channel.
- 21624: Invalid validity period value.
- 21627: Max price must be a valid float.
- 21654: ContentSid required.
- 21658: Parameter exceeded character limit.
- 21701: The Messaging Service does not exist.
- 21703: The Messaging Service does not have a phone number available to send a message.
- 21704: The Messaging Service contains no phone numbers.
- 35111: SendAt timestamp is missing.
- 35114: Scheduling does not support this timestamp.
- 35118: MessagingServiceSid is required to schedule a message.
- 63001: Channel could not authenticate the request. Please see channel-specific error message for more information.
- 63002: Channel could not find the From address.
- 63003: Channel could not find To address.
- 63007: Twilio could not find a channel with the specified From address.
- 63031: Channel's message cannot have the same From and To.

#### Content and media errors

- 11200: HTTP retrieval failure.
- 11205: HTTP connection failure.
- 11210: HTTP bad host name.
- 11215: HTTP too many redirects.
- 11220: SSL/TLS handshake error.
- 11237: Certificate invalid—could not find path to certificate.
- 12300: Invalid Content-Type.
- 11751: Media message—media exceeds messaging provider size limit.
- 21620: Invalid media URL(s).
- 30019: Content size exceeds carrier limit.
- 63019: Media failed to download.
- 63034: Media exceeds size limit.

#### Channel and template issues

- 19023: Invalid channel type.
- 30015: Non-supported channel type is used.
- 63005: Channel did not accept given content. Please see channel-specific error message for more information.
- 63009: Channel provider returned an internal service error (HTTP 5xx). Please see channel-specific error message for more information.
- 63012: Channel provider returned an internal service error.
- 63015: Channel Sandbox can only send messages to phone numbers that have joined the Sandbox.
- 63016: Failed to send a free-form message because you are outside the allowed window. If you are using WhatsApp, please use a Message Template.
- 63021: Channel invalid content error.
- 63027: Template does not exist for a language and locale.
- 63028: Number of parameters provided does not match the expected number of parameters.
- 63030: Unsupported parameter for type of channel's message.
- 63032: We cannot send this message to this user because of a WhatsApp limitation.
- 63040: Template rejected.
- 63041: Template paused.
- 63042: Template disabled.

#### Internal and provider errors

- 20410: Gone.
- 20500: Internal server error.
- 30410: Provider timeout error.
- 63010: Twilio's platform encountered an internal error processing this message.

Any error not listed here and not covered in the other four subscores will also be counted in Sent Rate.

## Compliance

Compliance evaluates adherence of your messaging traffic to regulatory, carrier, and platform-specific policies and guidelines. It includes error codes related to spam, registration issues, policy violations, and account restrictions, as well as performance metrics like opt-out rate. Monitor and address compliance-related errors and metrics to improve your Compliance subscore and maintain messaging reliability.

Twilio may reach out to you about compliance issues even if you have a high Compliance subscore.

## Fraud

A high score is good. It means your messages are free from signs of fraud.

Fraud score measures the rate at which Twilio has identified potential fraudulent messages being sent to your destinations, relative to your total traffic. Monitor and address this error to increase your Fraud subscore, protect your organization, and promote trust and safety of your message recipients.

Twilio may reach out to you about fraud issues even if you have a high Fraud subscore.

### Error Codes Impacting Fraud Subscore

#### Undeliverable messages

- 30453: Message couldn't be delivered.

#### Excluded error code

- 30450: Message prevented from being sent out because of SMS Pumping Protection (explicitly excluded from Fraud Score).

## Latency

Latency measures how efficiently your messages are processed within Twilio and handed off to carriers. This includes errors (e.g., queuing, rate limits, congestion) as well as performance metrics that assess the percentage of your messages meeting best-practice latency benchmarks across different message categories (e.g., OTP, customer care, marketing).

Twilio categorizes your messages using various signals, including Traffic Shaping Message Intent, 10DLC A2P campaign use cases, usage of Verify, and the Messaging Feedback Resource.

These categorizations reflect the message's purpose and can affect its delivery priority and how it's handled by carriers.

### Improving Latency

You can improve latency by:

- Using high-priority sender types (e.g., short codes for OTPs).
- Segmenting your traffic by use case or intent.
- Optimizing message content and routing logic.
- Leveraging tools like Multi-Tenancy and Traffic Shaping for smarter throughput allocation.

### Error Codes Impacting Latency Subscore

#### Message limits and queuing issues

- 20429: Too many requests.
- 21611: This From number has exceeded the maximum number of queued messages.
- 30001: Queue overflow.
- 63038: Account exceeded the daily messages limit.

#### Rate limits and network congestion

- 30017: Carrier network congestion.
- 63018: Rate limit exceeded for channel.

#### Expired validity period

- 30036: Validity period expired.

### Performance Metrics

#### Critical & Time-Sensitive messages
This is the percentage of high-priority messages — like OTPs, fraud alerts, and conversations — that meet the best-practice latency benchmark for this category (under 10 seconds).

**Traffic Shaping MessageIntent includes:**
- otp
- notifications (account notifications, two-way conversational messaging)
- fraud
- security

**10DLC A2P campaign use case includes:**
- 2FA
- ACCOUNT_NOTIFICATION
- PROXY (conversational)
- FRAUD_ALERT
- EMERGENCY
- SECURITY_ALERT
- Verify
- Message Feedback Resource used.

#### Notification & Customer Care messages
This is the percentage of messages, such as delivery notifications and support updates, that meet the best-practice latency benchmark for this category (under 10 minutes).

**Traffic Shaping MessageIntent includes:**
- customercare
- delivery
- education
- events

**10DLC A2P campaign use case includes:**
- CUSTOMER_CARE
- DELIVERY_NOTIFICATION
- HIGHER_EDUCATION
- K12_EDUCATION
- PUBLIC_SERVICE_ANNOUNCEMENT

#### Marketing & Announcements messages
This is the percentage of promotional or announcement messages that meet the best-practice latency benchmark for this category (under 2 hours).

**Traffic Shaping MessageIntent is one of:**
- Polling and voting (non-political)
- Public service announcement (non-emergency)
- General and campaign marketing

**10DLC A2P campaign use case is one of:**
- POLITICAL
- POLLING_VOTING
- MARKETING
- AGENTS_FRANCHISES
- CHARITY
- LOW_VOLUME
- MIXED
- SOCIAL
- STARTER
- SWEEPSTAKE

#### Unknown Category messages
This is the percentage of uncategorized messages as those sent via toll-free or short codes without an assigned 10DLC A2P campaign use case or MessageIntent that meet the best-practice latency benchmark. Since the category is unknown and could include some Critical & Time-Sensitive messages, we use a 10-second benchmark.

## Engagement

Engagement evaluates the performance of message delivery in terms of user interaction and engagement. It encompasses error codes for expired certificates, unverified domains, and link shortening failures, as well as performance metrics like shortened link click rate and OTP conversion rate. By monitoring and addressing engagement-related errors, you can increase your Engagement subscore.

### Error Codes Impacting Engagement Subscore

#### Certificate and domain issues

- 30101: Domain is unverified.
- 30102: TLS certificate for your domain has expired.
- 30107: Domain private certificate has not been uploaded.

#### Link shortening failures

- 30103: Links not shortened due to application failure.

### Performance Metrics

- **Shortened Link Click Rate:** The percentage of Twilio-shortened links clicked out of all messages using Twilio Link Shortening or categorized as Marketing & Announcements. To track link clicks, enable and configure Twilio Link Shortening.
- **OTP Conversion Rate:** This is the percentage of OTP/2FA messages that result in successful user verification. To track this metric, use Twilio's Verify API or Messaging Feedback Resource.