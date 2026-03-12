# Enumerations

This document covers all enumerations in the Twilio Voice JavaScript SDK.

---

## Edge

Valid geographical and interconnect edge locations for Twilio voice services.

```typescript
enum Edge {
  // Standard Edges
  Ashburn = "ashburn",
  Dublin = "dublin",
  Frankfurt = "frankfurt",
  Roaming = "roaming",
  SaoPaulo = "sao-paulo",
  Singapore = "singapore",
  Sydney = "sydney",
  Tokyo = "tokyo",
  Umatilla = "umatilla",

  // Interconnect Edges (IX)
  AshburnIx = "ashburn-ix",
  FrankfurtIx = "frankfurt-ix",
  LondonIx = "london-ix",
  SanJoseIx = "san-jose-ix",
  SingaporeIx = "singapore-ix",
  SydneyIx = "sydney-ix",
  TokyoIx = "tokyo-ix"
}
```

### Standard Edges (16 total)

| Value | String | Location |
|-------|--------|----------|
| `Ashburn` | "ashburn" | US East (Virginia) |
| `Dublin` | "dublin" | Ireland |
| `Frankfurt` | "frankfurt" | Germany |
| `Roaming` | "roaming" | Auto-select nearest (default) |
| `SaoPaulo` | "sao-paulo" | Brazil |
| `Singapore` | "singapore" | Singapore |
| `Sydney` | "sydney" | Australia |
| `Tokyo` | "tokyo" | Japan |
| `Umatilla` | "umatilla" | US West (Oregon) |

### Interconnect Edges

For enterprise customers with direct interconnect:

| Value | String |
|-------|--------|
| `AshburnIx` | "ashburn-ix" |
| `FrankfurtIx` | "frankfurt-ix" |
| `LondonIx` | "london-ix" |
| `SanJoseIx` | "san-jose-ix" |
| `SingaporeIx` | "singapore-ix" |
| `SydneyIx` | "sydney-ix" |
| `TokyoIx` | "tokyo-ix" |

### Usage

```javascript
import { Device, Edge } from '@twilio/voice-sdk';

const device = new Device(token, {
  edge: Edge.Ashburn
});

// Or with fallback edges
const device = new Device(token, {
  edge: [Edge.Ashburn, Edge.Umatilla, Edge.Dublin]
});
```

---

## Device.State

All possible Device operational states.

```typescript
enum State {
  Destroyed = "destroyed",
  Registered = "registered",
  Registering = "registering",
  Unregistered = "unregistered"
}
```

| Value | String | Description |
|-------|--------|-------------|
| `Destroyed` | "destroyed" | Device has been destroyed and cannot be used |
| `Registered` | "registered" | Device is registered and can receive incoming calls |
| `Registering` | "registering" | Device is in the process of registering |
| `Unregistered` | "unregistered" | Device is not registered for incoming calls |

### State Transitions

```
Unregistered -> Registering -> Registered
                     |              |
                     v              v
                  Failed       Unregistered
                     |              |
                     v              v
                            Destroyed
```

---

## Call.State

Possible states of a Call during its lifecycle.

```typescript
enum State {
  Closed = "closed",
  Connecting = "connecting",
  Open = "open",
  Pending = "pending",
  Reconnecting = "reconnecting",
  Ringing = "ringing"
}
```

| Value | String | Description |
|-------|--------|-------------|
| `Pending` | "pending" | Incoming call, not yet accepted |
| `Connecting` | "connecting" | Call is being established |
| `Ringing` | "ringing" | Outbound call is ringing |
| `Open` | "open" | Call is active/connected |
| `Reconnecting` | "reconnecting" | Call is attempting to reconnect |
| `Closed` | "closed" | Call has ended |

### State Transitions

**Outbound Call:**
```
Connecting -> Ringing -> Open -> Closed
                  |        |
                  v        v
               Closed  Reconnecting -> Open
                                  |
                                  v
                               Closed
```

**Inbound Call:**
```
Pending -> Open -> Closed
    |        |
    v        v
 Closed  Reconnecting -> Open
                    |
                    v
                 Closed
```

---

## Call.Codec

Available audio codecs.

```typescript
enum Codec {
  PCMU = "pcmu",
  Opus = "opus"
}
```

| Value | String | Description |
|-------|--------|-------------|
| `PCMU` | "pcmu" | G.711 u-law codec (64 kbps, widely compatible) |
| `Opus` | "opus" | Opus codec (variable bitrate, better quality) |

**Recommendation:** Use Opus when possible for better audio quality and bandwidth efficiency.

---

## Call.FeedbackScore

Quality feedback scores (1-5 scale).

```typescript
enum FeedbackScore {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5
}
```

---

## Call.FeedbackIssue

Types of issues for call quality feedback.

```typescript
enum FeedbackIssue {
  AudioLatency = "audio-latency",
  OneWayAudio = "one-way-audio",
  ChoppyAudio = "choppy-audio",
  DroppedCall = "dropped-call",
  Echo = "echo",
  BackgroundNoise = "background-noise",
  UnclearSpeech = "unclear-speech"
}
```

| Value | String | Description |
|-------|--------|-------------|
| `AudioLatency` | "audio-latency" | Noticeable delay in audio |
| `OneWayAudio` | "one-way-audio" | Audio only works in one direction |
| `ChoppyAudio` | "choppy-audio" | Audio cuts in and out |
| `DroppedCall` | "dropped-call" | Call disconnected unexpectedly |
| `Echo` | "echo" | Hearing own voice echoed back |
| `BackgroundNoise` | "background-noise" | Excessive background noise |
| `UnclearSpeech` | "unclear-speech" | Difficulty understanding speech |

### Usage

```javascript
call.on('disconnect', () => {
  call.postFeedback(
    Call.FeedbackScore.Three,
    Call.FeedbackIssue.ChoppyAudio
  );
});
```

---

## Call.QualityWarning

Quality warnings raised during calls.

| Warning | Description |
|---------|-------------|
| `high-rtt` | Round-trip time exceeds threshold |
| `high-jitter` | Packet jitter is high |
| `high-packet-loss` | Packet loss exceeds threshold |
| `low-mos` | Mean Opinion Score is low |
| `constant-audio-input-level` | Input level not changing (mic issue) |
| `constant-audio-output-level` | Output level not changing (speaker issue) |

---

## PreflightTest.Status

Test state tracking.

```typescript
enum Status {
  Connecting = "connecting",
  Connected = "connected",
  Completed = "completed",
  Failed = "failed"
}
```

---

## PreflightTest.CallQuality

Quality assessment levels from preflight test.

```typescript
enum CallQuality {
  Excellent = "excellent",
  Great = "great",
  Good = "good",
  Fair = "fair",
  Degraded = "degraded"
}
```

| Value | MOS Range | Description |
|-------|-----------|-------------|
| `Excellent` | 4.2+ | Crystal clear audio |
| `Great` | 4.0 - 4.2 | Very good quality |
| `Good` | 3.6 - 4.0 | Acceptable quality |
| `Fair` | 3.1 - 3.6 | Noticeable degradation |
| `Degraded` | < 3.1 | Poor quality |

---

## Device.SoundName

Sound notification types that can be customized.

```typescript
enum SoundName {
  Incoming = "incoming",
  Outgoing = "outgoing",
  Disconnect = "disconnect",
  Dtmf0 = "dtmf0",
  Dtmf1 = "dtmf1",
  // ... dtmf2-9, dtmfS (*), dtmfH (#)
}
```

### Customizing Sounds

```javascript
const device = new Device(token, {
  sounds: {
    [Device.SoundName.Incoming]: 'https://example.com/ringtone.mp3',
    [Device.SoundName.Outgoing]: 'https://example.com/calling.mp3',
    [Device.SoundName.Disconnect]: 'https://example.com/hangup.mp3'
  }
});
```
