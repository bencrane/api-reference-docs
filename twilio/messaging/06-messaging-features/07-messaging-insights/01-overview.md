# Messaging Insights - Overview

Twilio's Messaging Insights enable you to analyze your application's messaging activities, identify and debug issues, optimize delivery, monitor fraud protection, and find areas to boost engagement with your end-users.

Messaging Insights consist of:

- A collection of real-time dashboards ranging from messaging delivery and errors to responses and OTP (one-time password) conversions.
- Insights into the performance of Messaging Intelligence-based real-time messaging solutions like SMS Pumping Protection.

---

## Visualize your Messaging data with dashboards

You can find the Messaging Insights dashboards in the Twilio Console under Monitor > Insights > Messaging. Use them to answer questions such as:

- What are the delivery rates for my messages, both incoming and outgoing?
- What caused delivery rates to drop during a certain time period?
- What are my opt-out rates?
- How many of my OTP messages are converting successfully?
- What is the volume and distribution of my scheduled messages for the coming week?
- What is the click through rate of my messages using shortened links?

Messaging Insights dashboards give you specific insight into the aspects of message delivery and engagement:

| Dashboard | Description |
|-----------|-------------|
| Overview | Displays a high-level view of your outgoing and incoming messages. |
| Delivery & Error | Displays three deep dives into factors that affect deliverability to help you identify what is causing an issue. |
| Responses | Includes different ways to visualize and filter the inbound messages that you're receiving back from your end-users. |
| OTP Conversion | Aggregates and visualizes the information that you have sent to Twilio about successful OTP messages. |
| Scheduled | Displays metrics relating to the volume of your upcoming scheduled messages. |
| Link Shortening | Visualizes success metrics such as deliverability and click through rate for messages using shortened links. |

---

## Use Messaging Intelligence to enhance your insights

Twilio's Messaging Intelligence comprises a suite of real-time messaging solutions leveraging AI/ML algorithms to enhance customer value beyond the use of logs and the Messaging Insights dashboards discussed above.

Currently, the following Messaging Intelligence insights are supported:

| Messaging Intelligence Insights | Description |
|--------------------------------|-------------|
| SMS Pumping Protection Insights | Monitors the efficacy of and estimated cost savings from using SMS Pumping Protection. |

---

## Intelligent Discovery AI Assistant

The Intelligent Discovery AI Assistant is an AI-driven tool designed to help users interact with Twilio's messaging data using natural language. It assists in troubleshooting messaging-related issues, such as deliverability errors, by analyzing data and providing actionable recommendations. The Assistant supports both technical and non-technical users, offering features like identifying message delivery problems, providing country-specific and phone number-specific insights, and offering advanced recommendations. Users can also seamlessly connect with a live Twilio support agent if needed. The Assistant is accessible via the Messaging Insights Console and aims to streamline the troubleshooting process, reduce support tickets, and maintain customer trust.

---

## Deliverability Score

The Messaging Deliverability Score provides a high-level overview of the performance of your Twilio messaging traffic, helping you monitor the health of your messaging services. This score is composed of five subscores:

- Sent Rate
- Compliance
- Fraud
- Latency
- Engagement

Each of these subscores is calculated by analyzing outbound messaging traffic for errors and metrics such as scale and click-through rate. The score is refreshed weekly and can be filtered at the account or subaccount level. For detailed insights and issue resolution, you can use the Messaging Insights dashboards or the Intelligent Discovery Assistant.

---

## Recommendations

The Intelligent Discovery Assistant for Twilio Messaging offers personalized recommendations to optimize your messaging traffic by analyzing specific parameters of your data. It identifies issues such as high opt-out rates or spam complaints and provides tailored solutions to address these problems.

---

## Intelligent Alerts

Intelligent Alerts for Twilio Messaging proactively monitors the health of your messaging traffic by analyzing changes in error code volumes using a combination of rules and machine learning models. This system dynamically configures thresholds based on historical data and real-time signals, identifying anomalies and notifying you of issues via email. You can manage notifications through the Twilio Console and review aggregated anomalies, categorized by impact, on the Intelligent Alerts summary page. The system also offers real-time analysis, adaptive thresholds, and a detailed breakdown of each alert, including possible causes and solutions.

---

## Where to next?

Now that you have an overview of what Twilio's Messaging Insights entail, you can:

- Read the guide explaining the Messaging Insights real-time dashboards and explore their use in the Twilio Console under Monitor > Insights > Messaging.
- Check out the Messaging Intelligence insights Twilio Console page under the Monitor > Insights > Intelligence.
- You can also learn more about Twilio's Messaging Services and factors that can affect global messaging.