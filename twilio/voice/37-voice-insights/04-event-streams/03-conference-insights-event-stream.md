# Conference Insights Event Stream

**Voice Insights** provides three Conference Insights Events that you can subscribe to using Event Streams. Together with the **Call Insights Event Stream**, these form part of the unified **Voice Insights Event Streams**.

| Event | Description |
|-------|-------------|
| `com.twilio.voice.insights.participant-summary.complete` | Contains the full set of **Conference Participant Summary Resource** details. Emitted with the participant-leave event. |
| `com.twilio.voice.insights.conference-summary.complete` | Contains the full set of **Conference Summary Resource** details. Emitted with the conference-end event. |
| `com.twilio.voice.insights.conference-summary.partial` | Contains a partial set of **Conference Summary Resource** details. Emitted with the conference-start event. |