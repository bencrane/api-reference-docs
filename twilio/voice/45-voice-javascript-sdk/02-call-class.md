# Call Class

> Represents a media and signaling connection to a TwiML application.

**Extends:** EventEmitter

---

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `callerInfo` | CallerInfo \| null | Caller verification information |
| `customParameters` | Map<string, string> | Custom parameters sent to/from TwiML app |
| `outboundConnectionId` | string | Temporary CallSid for outbound calls |
| `parameters` | Record<string, string> | Call parameters received from Twilio (incoming calls) |

---

## Accessors

| Accessor | Type | Description |
|----------|------|-------------|
| `codec` | string | Audio codec in use |
| `connectToken` | string | Token for reconnecting (available after connection) |
| `direction` | CallDirection | Indicates incoming or outgoing call |

---

## Methods

### Call Management

#### accept(options?)
```typescript
accept(options?: AcceptOptions): void
```
Accept an incoming call.

#### reject()
```typescript
reject(): void
```
Reject an incoming call.

#### ignore()
```typescript
ignore(): void
```
Ignore an incoming call (stops ringing without rejecting).

#### disconnect()
```typescript
disconnect(): void
```
Disconnect from the call.

---

### Audio Control

#### mute(shouldMute?)
```typescript
mute(shouldMute?: boolean): void
```
Mute or unmute the call. If no argument provided, toggles mute state.

#### isMuted()
```typescript
isMuted(): boolean
```
Returns current mute status.

#### sendDigits(digits)
```typescript
sendDigits(digits: string): void
```
Send DTMF digits. Valid characters: `0-9`, `*`, `#`, `w` (0.5s pause).

---

### Stream Access

#### getLocalStream()
```typescript
getLocalStream(): MediaStream | undefined
```
Retrieve the local MediaStream (microphone audio).

#### getRemoteStream()
```typescript
getRemoteStream(): MediaStream | undefined
```
Retrieve the remote MediaStream (call audio).

---

### Status

#### status()
```typescript
status(): Call.State
```
Get the current call state.

---

### Messaging (Beta)

#### sendMessage(message)
```typescript
sendMessage(message: CallMessage): string
```
Send a message to the backend. Returns message SID.

---

### Feedback

#### postFeedback(score?, issue?)
```typescript
postFeedback(score?: FeedbackScore, issue?: FeedbackIssue): Promise<void>
```
Submit call quality feedback after the call ends.

**FeedbackScore:** 1-5 rating

**FeedbackIssue:**
- `audio-latency`
- `one-way-audio`
- `choppy-audio`
- `dropped-call`
- `echo`
- `background-noise`
- `unclear-speech`

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `accept` | Call | Call accepted/connected |
| `audio` | (inputEnabled, outputEnabled) | Audio state changed |
| `cancel` | - | Call cancelled |
| `disconnect` | Call | Call disconnected |
| `error` | TwilioError | Error occurred |
| `messageReceived` | CallMessage | Message received (Beta) |
| `messageSent` | OutgoingCallMessage | Message sent (Beta) |
| `mute` | (isMuted, Call) | Mute state changed |
| `reconnected` | - | Call reconnected after brief disconnect |
| `reconnecting` | TwilioError | Call attempting to reconnect |
| `reject` | - | Call rejected |
| `ringing` | (hasEarlyMedia) | Call ringing |
| `sample` | RTCSample | WebRTC stats sample (every second) |
| `volume` | (inputVolume, outputVolume) | Volume levels changed |
| `warning` | (warningName, warningData) | Quality warning raised |
| `warningCleared` | (warningName) | Quality warning cleared |

### Event Example

```javascript
call.on('accept', () => {
  console.log('Call connected, SID:', call.parameters.CallSid);
});

call.on('disconnect', () => {
  console.log('Call ended');
});

call.on('error', (error) => {
  console.error('Call error:', error.message);
});

call.on('mute', (isMuted) => {
  console.log('Mute state:', isMuted ? 'muted' : 'unmuted');
});

call.on('warning', (name, data) => {
  console.warn('Quality warning:', name, data);
});

call.on('sample', (sample) => {
  console.log('RTT:', sample.rtt, 'MOS:', sample.mos);
});
```

---

## Call.State Enum

| Value | String | Description |
|-------|--------|-------------|
| `Pending` | "pending" | Call is pending (incoming, not yet accepted) |
| `Connecting` | "connecting" | Call is connecting |
| `Ringing` | "ringing" | Call is ringing |
| `Open` | "open" | Call is connected/active |
| `Reconnecting` | "reconnecting" | Call is attempting to reconnect |
| `Closed` | "closed" | Call has ended |

---

## Call.Codec Enum

| Value | Description |
|-------|-------------|
| `PCMU` | G.711 u-law codec |
| `Opus` | Opus codec (recommended) |

---

## Call.QualityWarning Enum

Quality warnings that may be raised during a call:

- `high-rtt` - High round-trip time
- `high-jitter` - High packet jitter
- `high-packet-loss` - High packet loss
- `low-mos` - Low Mean Opinion Score
- `constant-audio-input-level` - Possible microphone issue
- `constant-audio-output-level` - Possible speaker issue

---

## Usage Example

```javascript
// Outgoing call
const call = await device.connect({
  params: { To: '+1234567890' }
});

call.on('accept', () => {
  console.log('Connected!');

  // Send DTMF
  call.sendDigits('1234#');

  // Mute
  call.mute(true);
});

call.on('disconnect', () => {
  // Submit feedback
  call.postFeedback(5); // 5-star rating
});

// Later: disconnect
call.disconnect();
```

```javascript
// Incoming call
device.on('incoming', (call) => {
  console.log('From:', call.parameters.From);
  console.log('To:', call.parameters.To);
  console.log('Custom params:', call.customParameters);

  // Accept with options
  call.accept({
    rtcConstraints: {
      audio: { echoCancellation: true }
    }
  });
});
```
