# Intelligent Alerts for Twilio Messaging

**(new) Public Beta**

Intelligent Alerts for Twilio Messaging is currently in Public Beta.

## Overview

Twilio proactively monitors the health of your messaging traffic by analyzing changes in error code volumes against your most recent SMS traffic. Our systems leverage a mix of rules and machine learning (ML) models to identify patterns in your real-time traffic and automatically configure dynamic thresholds based on your account's historical data and other signals from our messaging ecosystem. If an anomaly is detected, our systems will flag it for processing.

## Why Intelligent Alerts?

Intelligent Alerts take the burden away from having to configure alarms manually and setting thresholds that will give meaningful results. Our models identify anomalies in the volume of each supported error code and dynamically calculate thresholds per mobile network code (MNC) for the sub-account based on historical data.

## How to be notified of Intelligent Alerts

You can find the Intelligent Alerts settings by navigating to Twilio Console > Monitor > Insights > Messaging Intelligence > Intelligent Alerts > Manage notifications. From there, provide your preferred email addresses where you can be notified in real-time.

## Solutions

### Anomaly detection

Intelligent Alerts provide proactive alerting when abnormal volume increases are detected in the following error codes:

- Queue overflow (30001)
- Unknown destination handset (30005)
- Landline or unreachable carrier (30006)
- Message filtering (30007)
- Message delivery unknown error (30008)

### Adaptive Thresholds

Thresholds are dynamically configured based on the most recent account data, ensuring that alerts are relevant and timely.

### Granularity

Monitoring is done at the sub-account level per mobile network code (MNC), providing detailed insights into your messaging traffic.

### Real-time analysis

Traffic is ingested in real-time as it becomes available to Twilio and analyzed in 5-minute intervals.

### Notifications

Alerts are delivered via email to the email you specify and your Twilio account team. A one-hour "quiet period" is set up by default for alerts of the same type. Alerts resume if new anomalies are detected after the quiet period expires.

### Review in Twilio Console

An aggregated view of all anomalies detected in your accounts is available on the Intelligent Alerts summary page in the Twilio Console.

## Reviewing Intelligent Alerts

The main Intelligent Alerts page provides an aggregated view of all the Intelligent Alerts identified on your accounts. Global and page filters are incorporated into the page to help narrow down searches and streamline troubleshooting. This page offers links that allow you to configure their notification preferences and drill down into each of the anomalies in the Alert Details page.

### Using Global Filters

In the Intelligent Alerts summary page, you have two filter options that carry through any current or future tabs in the Intelligence section:

- **Time range:** You can choose from a range of predefined time periods. The Intelligent Alerts summary banner and the event table will update based on the user selection.
- **Sub-account:** Provide the sub-account SID or the sub-account name. All the Intelligent Alerts identified for that sub-account will be populated.

## Alert Impact Score and Impact Category

Intelligent Alerts automatically categorize anomaly events within four groups: Urgent, Critical, Important, and Warning. We use metrics such as deliverability rate, data sparsity, and traffic volume fluctuations, which are calculated in real-time from your most recent period of observation. Each of these metrics is weighted to calculate an Impact Score ranging from 0 to 1. After comparing them to your historical patterns, we can estimate the impact the anomalous event may have on your traffic.

Based on the calculated Impact Score, we map each anomaly to an Impact Category following this logic:

- **Urgent:** Impact score is > 0.9
- **Critical:** Impact score is > 0.6 or < 0.89
- **Important:** Impact score is > 0.3 or < 0.59
- **Warning:** Impact score is < 0.29

Some anomalies may not fit into any of these categories as certain error codes we monitor do not appropriately fit into the logic above.

### Understanding the Impact Category section

Immediately after the global filters, you will find a summary section that provides a snapshot of all the alerts identified based on global filters applied. You will find the total number of anomalies for the time range to the far left and a breakdown of each alert into their specific Impact Category next to it. Below each category, you can see the percentage change from the prior period (based on the global time range filter).

### Intelligent Alerts summary table

You are presented with an aggregated view of all of their alerts based on the global filters applied. You can filter the table by event types, error code, or impact. An option to export a CSV file with the current page content is also available.

## Intelligent Alerts details page

When selecting one of the alerts in the Summary table, you will be taken to the alert details for that alert. The Alert Details Page breaks down into the following sections:

### Event Properties

Specific to each alert:

- **Impacted account friendly name:** Friendly name configured by the customer for the impacted Account SID.
- **Impacted account:** The Account SID of the impacted account. Monitoring happens at the sub-account level, and in most cases, sub-account = Account SID unless a Parent Account has no sub-accounts.
- **Alert ID:** Unique Alert ID given to the anomalous event.
- **Day of anomaly:** Date in UTC for when the anomaly occurred.
- **Time of occurrence:** Time window in UTC for when the anomaly occurred. Currently, anomalies are evaluated based on 5-minute evaluation windows.
- **MCC/MNC:** Mobile Country Codes (MCC) and Mobile Network Codes (MNC).
- **Carrier Route:** Carrier Name.
- **Alert threshold:** Dynamic threshold calculated by the Intelligent Alerts platform based on the customer's own historical trends.
- **Number of errors:** The sum of all of the errors in the 5-minute evaluation window for the impacted error code and carrier combination for which the anomaly was identified.
- **Number of messages:** The sum of all of the outbound SMS in the 5-minute evaluation window for the impacted carrier route for which the anomaly was identified.

### Historical graph

Shows the historical trends for the impacted Account SID. Note that the historical trend is based on the aggregation key, meaning that trends only look at messages and error codes for the carrier route identified as an anomaly.

### Possible causes

A description of the possible causes for the anomaly.

### Possible solutions

A list of the possible solutions for the anomaly.

### Error description

Includes a high-level description and possible causes and solutions for the error code where the anomaly was identified.

## AI Nutrition Facts for Intelligent Alerts (Public Beta)

Twilio's AI Nutrition Facts provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Intelligent Alerts' AI qualities are outlined in the following Nutrition Facts label. The AI Nutrition Facts for Recommendations apply to both the Public Beta and Private Beta offerings. For more information and the glossary regarding the AI Nutrition Facts Label, refer to Twilio's AI Nutrition Facts page.

## Next steps and additional resources

Here are some possible next steps and additional resources to help you get started:

- Twilio Programmable Messaging API Documentation
- Contact Twilio Support