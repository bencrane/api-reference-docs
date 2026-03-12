Voice Insights - Overview




Voice Insights Overview





Voice Insights provides call quality analytics and aggregation tools for investigating Twilio calls and conferences. Sensors in the Twilio Voice SDKs and on Twilio media gateways gather call metrics and events and send them to the Voice Insights platform for analysis and aggregation.

Once aggregated, these Call Insights and Conference Insights are made available through powerful reporting dashboards and detailed summaries in the Twilio Console to highlight aspects of call and conference behavior.

Voice Insights for Twilio Voice SDKs allows you to react to call quality events directly in your Twilio SDK code. For a reference of related Voice SDK events, please see Details: Voice Insights SDK Events.


(information)
Info
Voice Insights data is available for calls or conferences made within the last 30 days.
Voice Insights Advanced Features provide you with valuable additional analytical capabilities to investigate call and conference quality issues by

exploring time-series data of metrics and event streams in the Twilio Console,
programmatically accessing, via the Voice Insights REST API or Voice Insights Event Streams,
call summaries, call metrics, call insights events and call annotations, or
conference summaries and conference participant summaries.

(information)
Info
Advanced Features are available at an additional cost to regular call charges. Please, see our Voice Pricing pages for Voice Insights pay-as-you-go and committed pricing information

.
Voice Insights is available for all calls and conferences made using

one of the Twilio Voice SDKs:
Voice JavaScript SDK (v1.3+),
Voice iOS SDK (v3.0+), or
Voice Android SDK (v3.0+),
the Programmable Voice APIs, or
Elastic SIP Trunking.
Call Insights





Call Insights provides multiple ways to use call metadata which allow you to see call parameters, investigate call metrics and event timelines, and understand detected quality issues.

The following table contains a reference to the documentation for features broken down by Console, Voice Insights Event Stream and Call Insights REST API. Where applicable for a feature, the table indicates whether Voice Insights Advanced Features must be activated to use all or part of it.

Feature	Description
Console	
Call Insights Dashboard	Use the Call Insights Dashboard as a powerful account-level aggregation tool to analyze trends in call volume and length as well as issues with connectivity and audio quality. Apply flexible filters to refine the analysis and dynamically update data visualizations and call logs.
Subaccount Call Insights Dashboard	If you have a parent account with subaccounts, use the Subaccount Call Insights Dashboard to compare call volume and length across subaccounts. Gain insights into which of your subaccounts are outliers in terms of call quality performance.
Call Summary	Use the Call Summary to see call metadata, connection parameters, and quality indicators in a single cumulative view for a call placed on the Twilio platform. Activate Voice Insights Advanced Features to view time-series data of metrics and event streams as part of the Call Summary.
Voice Insights IDA (Intelligence Discovery AI Assistant)	Voice Insights IDA is an AI-driven assistant enabling you to interact with your voice data using natural language. The Assistant helps you troubleshoot Voice-related issues, including deliverability (connection rate), answer rate, networking related and other behavioral issues such as silent calls. Activate Voice Insights Advanced Features to use this feature.
Event Stream	
Call Insights Event Stream	Subscribe to the Call Insights Event Stream to consume call summaries, call metrics, as well as call progress and Voice SDK insights events. Activate Voice Insights Advanced Features to use this feature.
REST API	
Call Summary Resource (single Call Summary)	Get a call summary for a single call. Activate Voice Insights Advanced Features to use this feature.
Call Summaries Resource (list of Call Summaries)	Get a list of call summaries for multiple calls. Activate Voice Insights Advanced Features to use this feature.
Call Insights Event Resource	Get call progress and quality-related Voice SDK events data for a specific call. Activate Voice Insights Advanced Features to use this feature.
Call Metric Resource	Get quality-related metrics for a specific call. Activate Voice Insights Advanced Features to use this feature.
Call Annotation Resource	Annotate calls to provide subjective experience details. Get the annotations for a specific call. Activate Voice Insights Advanced Features to use this feature.
Voice Insights Settings Resource	Control Voice Insights Advanced Features and Voice Trace status for an account. This REST API resource can be used to programmatically activate or deactivate Voice Insights Advanced Features.
Conference Insights





Conference Insights provides multiple ways to use conference metadata which allow you to see conference parameters, investigate participant event timelines, and understand detected quality issues.

The following table contains a reference to the documentation for Conference Insights features broken down by Console, Voice Insights Event Stream and Conference Insights REST API. Where applicable for a feature, the table indicates whether Voice Insights Advanced Features must be activated to use all or part of it.

Feature	Description
Console	
Conference Insights Dashboard	Use the Conference Insights Dashboard to take an account-level look at key performance indicators and trends in conference volume, length, and quality warnings. Explore aggregated conference participant behavior and region configuration issues.
Conference and Participant Summary	Use the Conference and Participant Summary to view metadata, quality issues and participant event timelines for a specific conference. Explore detected participant behavior issues. Activate Voice Insights Advanced Features to display quality issues in the Participant Timeline.
Event Stream	
Conference Insights Event Stream	Subscribe to the Conference Insights Event Stream to consume conference summaries and conference participant summaries. Activate Voice Insights Advanced Features to use this feature.
REST API	
Conference Summary Resource	Get conference summaries with events and metadata. Activate Voice Insights Advanced Features to use this feature.
Conference Participant Summary Resource	Get conference participant summaries with events and metadata for individual participants. Activate Voice Insights Advanced Features to use this feature.
Voice Insights - Trust & Engagement Insights





Trust & Engagement Insights helps you monitor and improve the trust, compliance, and performance factors that determine whether outbound calls are delivered and answered. By analyzing calling patterns and customer behaviors, the dashboard surfaces the metrics that influence reach and pickup, predicts when each customer is most likely to answer, and evaluates the return on investment (ROI) of Trust Products such as branded calling.

Activate Voice Insights Advanced Features to use this feature.

Voice Insights - Reports API





Reports API offers scalable, aggregated voice metrics and reports at both account and phone number levels, designed to convert data into actionable business insights with just a single API call. Accelerate decision-making with a low-code, cost-effective solution that requires minimal technical resources, providing immediate, actionable insights to enhance business performance with just a single API call.

Activate Voice Insights Advanced Features to use this feature.

Further Information





To obtain further information about Voice Insights please explore:

Frequently Asked Questions, or
our free self-paced Online Course for Voice Insights Fundamentals

 on the Twilio Training platform.