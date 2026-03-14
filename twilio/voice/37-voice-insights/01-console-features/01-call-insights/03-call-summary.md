# Call Summary

The Voice Insights Call Summary provides a glimpse into call metadata, connection parameters, and quality indicators in a single cumulative view for every call placed on the Twilio platform. Call summary details are gathered and incomplete summary details are available while the call is in-progress. Completed call summaries are typically available within a few minutes after the call ends, though it may take up to 30 minutes for all the details to be aggregated and displayed.

The call summary is divided into different sections to isolate details based on the call flow, direction, and the type(s) of media edges present on the call.

---

## From/To Sections

The From section contains metadata about the calling party. The To section contains metadata about the called party. Different metadata are available depending on the direction and type of call; e.g. an Elastic SIP Trunking origination call will have different metadata compared with an iOS Voice SDK call.

| Property | Description |
|----------|-------------|
| From | The caller ID of the calling party. |
| To | The called party. |
| Connection | Describes the method by which the call was delivered to/from Twilio; e.g. twilio_sdk, sip_trunk, landline, etc. |
| User Agent | SIP Interface/SIP Trunking only: endpoint device type; e.g. PBX version, SIP phone model, etc. |
| SIP Call ID | SIP Interface/SIP Trunking only: SIP call ID for the call between Twilio & your SIP infrastructure. |
| Signaling IPs | The IP address for Twilio's signaling gateway. Not available for calls to/from the PSTN. |
| Media IPs | The IP address for Twilio's media gateway. Not available for calls to/from the PSTN. |
| Region | The AWS region where Twilio's signaling and media gateway reside. |
| Country | The country based on the IP address or E.164 country code. |
| Operating System | Voice SDK only: the OS reported by the application. |
| Engine | JS Voice SDK only: the engine reported by the application. |
| Browser | JS Voice SDK only: the browser reported by the application. |
| SDK Version | Voice SDK only: Twilio Voice SDK version number. |
| Selected Region | Voice SDK only: Twilio Region selected by the application; default selection is GLL. |
| Client Name | Voice SDK only: registered username for call delivery. |
| Client IP Address | Voice SDK only: IP address reported by the application. |
| Client Location | Voice SDK only: location derived from IP address reported by the application. |

---

## Properties Section

| Property | Description |
|----------|-------------|
| Who Hung Up | Which party ended the call as determined by the direction of the SIP BYE received at Twilio's signaling gateway. |
| Last SIP Response | Final SIP response code for the dialog. |
| Twilio RTP Latency | Twilio-internal RTP traversal time from ingress to egress for packets to arrive at the media edge for this call SID; aka the amount of time in milliseconds that media spent in Twilio's voice infrastructure. Average and max values shown. High latency can result in long delays between speakers or speakers talking over each other. |
| Post-dial Delay | The amount of time between the SIP INVITE and a 18x response; how long it took for the calling party to hear ringing. |
| Call State | Call status as defined in Twilio documentation. |
| Silence Detected | Boolean. Will be true in the event of a missing RTP stream or total silence from one of the parties. Silent calls may be reported as dead air or dropped calls. |

---

## Metrics Section

The Metrics section provides an overview of the inbound media stream quality as received at the specified edge. The condition of the outbound stream from the edge can be determined by looking at the inbound stream on the parent/child call, or other conference participants. This allows you to understand the source of the underlying issue and troubleshoot accordingly.

For example, if you are looking at an Elastic SIP trunking call and see that the Carrier edge metrics do not show packet loss or jitter, but the SIP edge shows both, that indicates the problems on the call were due to the condition of the RTP stream received from your SIP PBX and not the PSTN.

A view of both inbound and outbound stream conditions are available in Console through the Metrics page and via API with Voice Insights Advanced Features.

| Property | Description |
|----------|-------------|
| Codec | The RTP profile name of the codec used for the call; e.g. Opus, PCMU, etc. |
| Packet Loss Detected | Boolean. Will be true if cumulative packet loss >5% for non-Voice SDK calls; >1% for 3 out of 5 consecutive samples for Voice SDK calls; if true the percentage of packet loss detected will be shown. Packet loss results in choppy audio. Note: Voice SDK calls placed using the Opus codec have forward error correction which can result in the subjective experience of the listener being "better" than the packet loss metrics might indicate. |
| Jitter Detected | Boolean. Will be true if more than 1% of the packets are delayed by 200ms, or if the average jitter is greater than 5ms and max jitter is >30ms for non-Voice SDK calls; max jitter >30ms for 3 out of 5 consecutive samples for Voice SDK calls; if true the average/max jitter will be shown. Jitter results in noisy or robotic-sounding audio. Note: Voice SDK and calls using Twilio Conference have a small jitter buffer that can smooth out the packet delivery which can result in the subjective experience of the listener being "better" than the jitter metrics might indicate. |
| Low MOS | Voice SDK only: Boolean. Will be true if MOS <3.5 for 3 out of 5 consecutive samples; if true the MOS score will be shown. MOS is the output of a function that takes jitter, packet loss, and round trip time as inputs and outputs a single number. A MOS score of 4.2 or higher is generally considered to be a good quality call. If MOS is 3.5 or below, look at which of the input metrics is most impacting the score for recommendations on how to address. |
| High Round Trip Time | Voice SDK only: Boolean. Will be true if RTT > 400 ms for 3 out of 5 consecutive samples; if true the average/max round trip time (RTT) will be shown. Also called latency. |
| ICE Failure | Voice SDK only: Boolean. Will be true if the ICE candidate has checked all candidate pairs against one another and has failed to find compatible matches for the components of the connection. |

> **NOTE:** In some call flows with multiple SSRCs we may indicate that an issue was detected where the values do not breach the thresholds defined above. This is due to the fact that each SSRC is analyzed individually, but the metrics displayed are the cumulative metrics of all SSRCs.

---

## Interpreting Call Summary Results

### Interpreting the Call Summary for Voice SDK calls

For Voice SDK calls the Call Summary will include metrics for both the SDK Edge, which represents the sensors in the Android/iOS/JavaScript SDKs, and the Client Edge which represents Twilio's media edge.

**SDK Edge:** Reporting on what was received at the Voice SDK browser Device from the Twilio Voice SDK edge. Issues with jitter, packet loss, or high RTT detected here indicate that the downlink connection to the application is introducing the issues. This can be due to machine resource availability (too many browser windows open, too many high-CPU/high-RAM applications running concurrently) or network configuration and congestion (downlink bandwidth allocations, too many machines on the same network consuming high bandwidth).

**Client Edge:** Reporting on what was received at Twilio's media gateway from the Voice SDK application. In practice, the overwhelming majority of issues with calls are detected here. This is typically due to bandwidth or quality-of-service limitations on the uplink from the Voice SDK application's network connection.

In a managed network like a contact center or an office the network conditions can typically be investigated by your local network administrators to ensure that routing policies and quality of service implementations are treating the VoIP traffic with appropriate priority. As you investigate if you discover that the audio is leaving your network infrastructure in jitter- and packet loss-free condition, but arriving at Twilio's Client Edge in a jittery, packet loss-ridden state, you may wish to investigate with your local network administrators to ensure that the media is not being degraded after leaving your network, or perform trace routes with your ISP to ensure that the uplink from your network edge to Twilio is free from degradation.

In unmanaged networks like a voice application user on a home WiFi connection the options are somewhat limited. Most people have asymmetric bandwidth allocations from their home ISPs, i.e. they pay for download speed rather than upload speed. For things like streaming 4K movies this is optimal, but for placing VoIP calls this allocation can prevent the audio stream from reaching Twilio's media edge without latency, jitter, or packet loss. See the Addressing network issues section for options on how to optimize networks for Voice SDK calls.

It is possible, though rare, that Twilio's underlying ISP is introducing jitter, packet loss, or latency. In those cases, Twilio will file an incident and post a notification on their status page so you don't waste time troubleshooting your network.

### Interpreting the Call Summary for Elastic SIP Trunking calls

For Elastic SIP Trunking calls the Call Summary will include metrics for both the SIP Edge, which represents the sensors at Twilio's media edge your SIP infrastructure is communicating with, and the Carrier Edge which represents what was sent to and received from the source or destination carrier.

If you see jitter or packet loss reported at the **Carrier Edge**, this indicates the media stream was received in this condition from the PSTN carrier, and since Twilio does not perform any jitter buffering or packet loss concealment on our media edges, the audio will be passed on in this condition to your SIP infrastructure.

If you see jitter or packet loss reported at the **SIP Edge**, this indicates that the stream Twilio received from your SIP infrastructure was degraded. In many cases this is due things like missing or misapplied quality of service settings for SIP devices in your SIP infrastructure. As you investigate if you discover that the audio is leaving your SIP infrastructure in jitter- and packet loss-free condition, but arriving at Twilio's SIP Edge in a jittery, packet loss-ridden state, you may wish to investigate with your local network administrators to ensure that the media is not being degraded after leaving your SIP infrastructure, or perform trace routes with your ISP to ensure that the uplink from your network edge to Twilio is free from degradation.

It is possible, though rare, that Twilio's underlying ISP is introducing jitter, packet loss, or latency. In those cases, Twilio will file an incident and post a notification on their status page so you don't waste time troubleshooting your network or SIP infrastructure.

### Interpreting the Call Summary for Carrier calls

If you see jitter or packet loss reported at the Carrier Edge, this indicates the media stream was received in this condition from the PSTN carrier, and since Twilio does not perform any jitter buffering or packet loss concealment on our media edges, the audio will be passed on in this condition to the recipient. Twilio actively monitors the performance of carriers and in the event of significant degradation our self-healing Super Network will reroute traffic away from carriers experiencing quality issues. In some cases the network degradation is being introduced at the country- or underlying-ISP level. In those cases Twilio will file an incident and post a notification on their status page to inform you of problems with specific carriers or destinations.

---

## Addressing Network Issues

Local network conditions are the number one contributing factor to issues with voice quality. Jitter, latency, and packet loss are the most significant contributors to voice quality issues in any VoIP network.

| Metric | Definition | User Experience |
|--------|------------|-----------------|
| Round Trip Time | The time it takes the media packets to arrive at the destination | Audio delays, callers may hear long periods of silence or speak over the top of each other. |
| Packet loss | Packets that don't make it to the final destination | Gaps and cut-outs in audio, callers may not hear or be able to understand the other side. |
| Jitter | Packets that arrive at the destination out of order | A 'robotic' or 'noisy' distortion effect in audio. |

### Latency

High latency can substantially degrade a caller's experience. While there will always be some latency between the codec algorithm, the jitter buffer, and network traversal, the goal is to keep this to a minimum. Callers typically start to notice the effect of latency once it breaches 250ms, and find latency above ~600ms to be nearly unusable. Here are some options to minimize latency on your network:

- Some lower bandwidth fixed internet connections can often have a higher latency. If possible, upgrade your internet connectivity.
- Stick to high-bandwidth connections. Mobile networks such as LTE (mobile 4G Data) can often have high latency.
- Ensure you're using Twilio Voice JavaScript SDK 1.3 or higher to take advantage of Twilio's Global Low Latency routing infrastructure.

### Jitter

Packet loss, most frequently jitter-induced packet loss, can make a big impact on your VoIP call quality. Wi-Fi can be particularly bad for creating jitter. Here are some options to minimize jitter on your network:

- Use fixed ethernet instead of Wi-Fi whenever possible
- Reduce packet conflicts on Wi-Fi by reducing the number of devices operating on the same channel
- Avoid large data file transfers over the same Wi-Fi environment concurrently with voice
- Avoid bufferbloat, which can result in high latency, and bursts of jitter. We recommend ensuring your router is configured with a low buffer size, as high jitter cannot be masked by a buffer without introducing artificial delay, and often choppy audio. Note: Not all routers allow for configuring buffer sizes, but some routers ship with defaults which are not optimized for real time VoIP networks. Open source routers, enterprise grade routers and gamer-oriented routers are good candidates for providing the right configuration options and defaults.
- If you have addressed the above issues and continue to have jitter related impact on your voice quality, you may consider configuring your router with QoS rules to prioritize VoIP traffic.