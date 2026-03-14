# Details: Call Tags

## Tags

Calls can be tagged for one or more conditions that may impact the subjective experience of quality on the call. Tags are based on analysis of the call at the Twilio Gateway. The tags for carrier, client, and SIP edges are:

| Tag | Description |
|-----|-------------|
| `silence` | Silence detected on the line; either due to a missing audio stream or a completely silent stream received |
| `high_jitter` | Two conditions can result in calls being tagged with high jitter: average jitter of 5ms and max jitter of 30ms, or more than 1% of packets delayed by 200ms or more |
| `high_packet_loss` | >5% packet loss |
| `high_pdd` | Post-dial delay (time between SIP INVITE and 18x response) > p95 for this country |
| `high_latency` | The average Twilio-internal RTP traversal time for packets received at this edge to this call SID exceeded 150ms. The call SID that received the delayed packets is the one that is tagged. |
| `pstn_short_duration` | Completed calls which are under 10 seconds. |

## SDK Edge Tags

SDK Tags are based on analysis of the call at the SDK sensors on the local device. They report on the cumulative condition of the media streams sent to the SDK from the Twilio Gateway. The tags for SDK edge are:

| Tag | Description |
|-----|-------------|
| `high_latency` | Round Trip Time (RTT) > 400 ms |
| `low_mos` | Mean Opinion Score (MOS) < 3.5 |
| `high_jitter` | Average jitter of 5ms and max jitter of 30ms |
| `high_packet_loss` | >5% packet loss |
| `ice_failure` | The ICE candidate has checked all candidates pairs against one another and has failed to find compatible matches for all components of the connection. |

> ℹ️ **Info:** Further guidance regarding Call Tags can be found in **Voice Insights Frequently Asked Questions**.