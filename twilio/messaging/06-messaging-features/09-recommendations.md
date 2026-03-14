# Personalized Recommendations for Twilio Messaging

## Overview

Personalized Recommendations for Twilio Messaging provide actionable insights to help you optimize your messaging traffic, improve deliverability, and maintain compliance. Recommendations are now available in two primary experiences:

- The Recommendations Widget on the Messaging Insights Overview page, alongside your Health Score for Messaging
- The Intelligent Discovery Assistant for Twilio Messaging

By analyzing your messaging data, Recommendations can identify issues such as high opt-out rates or spam complaints and offer potential solutions.

After reading this document, you will be able to:

- Understand how Recommendations analyzes your messaging data.
- View and interpret recommendations in the Messaging Insights overview and the Intelligent Discovery Assistant.
- Implement suggested actions to improve your messaging deliverability.

## What data is being analyzed?

Personalized Recommendations analyze various parameters of your messaging traffic, including:

- Traffic patterns and account-level signals used to generate your Health Score for Messaging
- Opt-out rates for the past seven days and other time periods
- Spam complaints for the past seven days and other time periods

## Example recommendations

### Solution recommendation for opt-out rate

When interacting with the Intelligent Discovery Assistant regarding outbound messages failing with error code 30007 and your parameters match a personalized recommendation for high opt-out rate, you will receive a response with actions you can take:

- **Ensure you have permission first.** Only send messages to mobile users who have provided consent (opted-in) to receive messages from you.

- **Have a clear introduction.** Ensure that your messages clearly identify who is sending the message.

- **Maintain your contact list.** If you are sending messages to users repeatedly over a long period of time, check in with your recipients at least once every 18 months to ensure they still want to receive messages from you. The mobile number you are sending messages to may have changed owners, or the recipient may not remember giving consent to receive messages from you.

- **Actively manage your contact list.** Process the daily deactivation file. Once a customer deactivates their phone number, you no longer have consent to send to that number.

- **Revisit your consent processes.** Spikes in opt-outs can be an indicator that there is something that needs to be corrected in your consent or opt-out mechanisms.

### Solution recommendation for spam complaints

When interacting with the Intelligent Discovery Assistant regarding outbound messages failing with error code 30007 and your parameters match a personalized recommendation for high spam complaints, you will receive a response with actions you can take:

- **Validate that your messages are compliant.** Ensure that you are not sending content that is illegal, harmful, unwanted, inappropriate, including content that is false or inaccurate, is hateful or encourages hatred or violence against individuals or groups, or could endanger public safety.

- **Adhere to country-specific SMS guidelines.** Twilio provides SMS guidelines for different countries. It's crucial to check and follow these guidelines to ensure compliance with local regulations and best practices.

- **Avoid spam triggers.** Be mindful of the content in your messages. Avoid using spam trigger words, excessive use of caps, or exclamation marks that might flag your messages as spam.

- **Ensure you have permission first.** Your recipients must have explicitly opted in to receive messages from you. Provide them with a straightforward and clear way to opt-out of future communications.

- **Personalize and segment your messages.** Tailor your messages to the interests and preferences of your audience. Use segmentation to ensure that the right messages reach the right people at the right time.

- **Revisit your consent processes.** Spikes in spam complaints can be an indicator that there is something that needs to be corrected in your consent or opt-out mechanisms.

## Providing feedback on recommendations

Each recommendation includes built-in feedback controls so that you can help improve future recommendations.

### Thumbs up and thumbs down

Every recommendation includes thumbs up and thumbs down buttons:

- Click the thumbs up button to indicate that a recommendation was helpful or relevant.
- Click the thumbs down button if the recommendation was not helpful or did not apply to your use case.

When you click thumbs down, a feedback modal appears, allowing you to provide additional information about why the recommendation was not useful. Twilio uses your feedback to continuously improve the accuracy and relevance of future recommendations.

### Dismissing a recommendation

To dismiss a recommendation in the Recommendations widget, click the x button in the corner of the recommendation. The recommendation will be hidden for at least seven days.

## AI Nutrition Facts for Recommendations

Twilio's AI Nutrition Facts provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Recommendations' AI qualities are outlined in the Nutrition Facts label. The AI Nutrition Facts for Recommendations apply to both the Public Beta and Private Beta offerings. For more information and the glossary regarding the AI Nutrition Facts Label, refer to Twilio's AI Nutrition Facts page.

## Next steps and additional resources

Here are some possible next steps and additional resources to help you get started:

- Twilio Programmable Messaging API Documentation
- Contact Twilio Support