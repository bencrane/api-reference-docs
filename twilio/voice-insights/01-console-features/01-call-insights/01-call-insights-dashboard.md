# Call Insights Dashboard

The Call Insights Dashboard provides a comprehensive overview of your voice communications performance. The images below offer a snapshot of key metrics, including call trends, connection rate, and verification details, to help you quickly understand the dashboard layout and navigate to more detailed data.

The Insights Dashboard is a powerful aggregation tool that allows users to filter on specific dimensions like call type, timeframe, number prefix, country code, and automatically updates the data visualizations to take into account the filter criteria. Key sections of the Dashboard include the total number of calls placed on Twilio, the average length of those calls, who hung up, call completion rate (ASR), calls with high PDD, and calls whose quality performance may have been impacted by network conditions. Call data can be visualized in a number of ways for each metric, and calls can be exported to .csv.

The user experience of voice communication is measured by two key components - call connectivity and audio quality. Connectivity issues can originate from the user's handset, the last mile link between their phones and the cell tower, their carrier network, or from within Twilio's network. Congestion, spotty coverage, handoff failures and numerous other issues could prevent you from reaching your users, or cause connected calls to drop. Voice Insights Connectivity dashboards enable you to rapidly identify connectivity problems by giving you real-time visibility into four key metrics:

- **Connection Rate:** The percent of total calls that reached the destination. Canceled and failed calls are excluded from this calculation.
- **High Post Dial Delay (PDD):** Calls where the number of seconds elapsed between dialing the last digit of the phone number and the start of ringing exceeds local thresholds. High PDD can sometimes be reported as "dead air", "one way audio", or even "dropped calls".
- **Network Affected:** Percentage of calls adversely affected by poor network quality. Issues that indicate poor network quality include: packet loss, jitter, and latency.
- **Who Hung Up:** Breakdown of calls in which the SIP BYE message was received from the caller or callee. The BYE message signals the termination of an answered call. Calls that have not been answered will not have a BYE, so they will be excluded from the results.

---

## Filters

### 1. Time Range Picker
Select the desired time frame for the data.

### 2. Filter Selector
Clicking on the Filter Builder opens the Filter Builder panel on the right-hand side.

### 3. Filter Builder
You can narrow down the metrics you are viewing by choosing to view the data for a specific phone number, number prefix, country, device type, or user's carrier network. The applicable filters are listed below.

| Filter | Description |
|--------|-------------|
| To Phone Number | The phone number of the called party |
| From Phone Number | The phone number of the calling party |
| To Client Name | Registered Client name of the called party; e.g. client:alice. Voice SDK calls only. |
| From Client Name | Registered Client name of the calling party; e.g. client:alice. Voice SDK calls only. |
| Verified Caller | True/false. True indicates the caller ID has been received SHAKEN/STIR attestation value of A. Any other value, or absent attestation will be false. |
| Branded Call | True/false. True indicates that the branded call details were successfully presented to the called party. False indicates that the branded call details were provided, but not successfully presented. |
| Branded Call Caller | Brand name caller ID provided during Branded Call creation. |
| To SIP URI | SIP URI of the called party; e.g. sip:bob@pbx. SIP Interface and Elastic SIP Trunking calls only. |
| From SIP URI | SIP URI of the calling party; e.g. sip:bob@pbx. SIP Interface and Elastic SIP Trunking calls only. |
| To Carrier | The carrier of called party |
| From Carrier | The carrier of the calling party |
| To Country Code | ISO Alpha-2 country code of the called party |
| From Country Code | ISO Alpha-2 country code of the calling party |
| To Device Type | Landline, Mobile, or VoIP connection of the called party |
| From Device Type | Landline, Mobile, or VoIP connection of the calling party |
| To Number Prefix | Country code and area code or exchange for the called party |
| From Number Prefix | Country code and area code or exchange for the calling party |
| SIP Response | The last SIP response code received in the dialog. |
| Call State | The final call status. |
| Network Affected | Carrier, SIP, or Trunking calls tagged with jitter, packet loss, or latency. |
| Network Affected (SDK) | Voice SDK calls tagged with jitter, packet loss, or latency. Twilio Voice SDK calls only. |
| To Browser | Browser used to answer WebRTC calls. Voice JavaScript SDK only. |
| From Browser | Browser used to place WebRTC calls. Voice JavaScript SDK only. |
| To SDK Type | JavaScript, iOS, or Android. Twilio Voice SDK calls only. |
| From SDK Type | JavaScript, iOS, or Android. Twilio Voice SDK calls only. |
| To SDK Version | Twilio SDK version number. Twilio Voice SDK calls only. |
| From SDK Version | Twilio SDK version number. Twilio Voice SDK calls only. |
| To Client Registration Region | The Twilio region where the Client was registered. Twilio Voice SDK calls only. |
| From Client Registration Region | The Twilio region where the Client was registered. Twilio Voice SDK calls only. |
| Edge Location (Region) | The media region where the Twilio gateway handled media. |
| Client IP Address | The IP address of the Client user. Twilio Voice SDK calls only. |
| App Name | The application name provided when creating the Twilio device in JavaScript, iOS, and Android SDKs. |
| App Version | The application version provided when creating the Twilio device in JavaScript, iOS and Android SDKs. |
| Call Direction | The type of call and associated direction: inbound, outbound API, outbound <Dial>, trunking originating, trunking terminating. |
| Silence Detected | True/false. True indicates Twilio detected silence on one of the media streams for the call. Depending on your use case, silence may be expected; e.g. one-time password delivery. |
| Answered by (AMD) | The Answered By value for the summarized call based on Answering Machine Detection (AMD). One of unknown, machine_start, machine_end_beep, machine_end_silence, machine_end_other, human or fax. Refer to AMD for more detail. |
| Annotations: Answered By | A filter for subjective feedback identifying who answered the call. One of machine or human. |
| Annotations: Spam | True/False. A filter for subjective feedback identifying if the call was spam or not. |
| Annotations: Call Score | A filter for subjective feedback regarding call score. A range of 1-5 indicates the call experience score, with the following mapping as a reference for the rated call [5: Excellent, 4: Good, 3: Fair, 2: Poor, 1: Bad]. |
| Annotations: Connectivity Issues | A filter for subjective feedback regarding call connectivity issues. One of no_connectivity_issue, invalid_number, caller_id, dropped_call, or number_reachability. |
| Annotations: Quality Issues | A filter for subjective feedback regarding call quality issues. One of no_quality_issue, low_volume, choppy_robotic, echo, dtmf, latency, owa, static_noise. |

---

## Historical Trends

Our trends graphs show comparisons of call volume and average length of call (ALOC) for the selected time frame. Call volume and ALOC are classic telecom metrics and changes in these should be investigated closely; for example, a very common pattern when a quality problem is introduced is the number of calls to increase, while the ALOC goes down. This is due to people being dissatisfied with the quality of their experience, ending the call early, and placing another call (or calls) in an attempt to get an acceptable experience. You can also select-to-zoom on these graphs for greater detail.

| Metric | Description |
|--------|-------------|
| Total Calls | Total number of Twilio calls made from this account over the selected date range. |
| Average Length of Call | Sum of duration of all calls divided by the total number of completed calls made from the account. |

---

## Connection Rate

Connection Rate allows you to filter by call state.

The Voice Insights account-level dashboards provide trends on the following metrics:

| Metric | Description |
|--------|-------------|
| Who Hung Up | Who disconnected the call, based on the direction of the SIP BYE event. Percentage is calculated based on the total number of errors with respect to the total calls. |
| Connection Rate | Total calls completed with respect to the total number of calls. Documentation for the applicable call status values is here. |
| High PDD | Post-dial-delay (PDD) is the number of seconds elapsed between dialing the last digit of the phone number and the start of ringing. The tab represents percentage of total calls with high Post-Dial-Delay (PDD), compared against 99th percentile of all Twilio calls to the destination country. |
| Network Affected | This tab shows percentage of calls adversely affected by poor network quality. Issues that indicate poor network quality include packets arriving out of order (jitter), never arriving (packet loss), and taking a long time to arrive (latency). For Carrier and SIP/Trunking call types, high packet loss is defined as 5% cumulative packet loss, high jitter is defined as average jitter of more than 5 milliseconds, and high latency is defined as Twilio-internal RTP traversal time of greater than 150 milliseconds. For SDK calls high jitter is defined as 30 milliseconds or higher for 3 out 5 consecutive samples, and high packet loss at 1% or higher for 3 out of 5 consecutive samples. |

---

## Who Hung Up

| Who Hung Up Values | Description |
|--------------------|-------------|
| Caller | The BYE message was received from the "From" number |
| Callee | The BYE message was received from the "To" number |
| Error | A SIP error code was received on the call. The count is based on the total number of server or global errors seen. |

---

## Call Logs View

The call logs view helps you drill down into a subset of calls with specific issues. To get to the call logs, click on the phone icon towards the right of the screen as shown below. Up to 2000 results can also be exported to a comma-separated value file.