# Interfaces

This document covers all interfaces in the Twilio Voice JavaScript SDK.

---

## AudioProcessor

Contract for custom audio processing pipelines.

```typescript
interface AudioProcessor {
  createProcessedStream(stream: MediaStream): Promise<MediaStream>;
  destroyProcessedStream(stream: MediaStream): Promise<void>;
}
```

### Methods

#### createProcessedStream(stream)
Called when the SDK detects changes to the active input audio stream. Use this to initiate your audio processing pipeline.

**Parameters:**
- `stream`: Original MediaStream from input devices

**Returns:** `Promise<MediaStream>` - Processed version of the stream

#### destroyProcessedStream(stream)
Called after both the original input stream and processed stream have been destroyed. Use for cleanup and teardown routines.

**Parameters:**
- `stream`: The stream being destroyed

**Returns:** `Promise<void>`

### Use Cases
- Background noise elimination
- On-hold music playback
- Audio filtering
- AI-driven audio classification

### Example

```javascript
const processor = {
  async createProcessedStream(stream) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const destination = audioContext.createMediaStreamDestination();

    // Apply processing (e.g., gain, filters)
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 1.5;

    source.connect(gainNode);
    gainNode.connect(destination);

    return destination.stream;
  },

  async destroyProcessedStream(stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};

// Register processor
device.audio.addProcessor(processor, false); // false = local audio
```

---

## RTCSample

Real-time communication statistics snapshot, emitted every second during calls.

```typescript
interface RTCSample {
  audioInputLevel: number;
  audioOutputLevel: number;
  bytesReceived: number;
  bytesSent: number;
  codecName: string;
  jitter: number;
  mos: number | null;
  packetsLost: number;
  packetsLostFraction: number;
  packetsReceived: number;
  packetsSent: number;
  rtt: number;
  timestamp: number;
  totals: RTCSampleTotals;
  [key: string]: any;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `audioInputLevel` | number | Audio input level (0-32767, representing -100 to -30 dB) |
| `audioOutputLevel` | number | Audio output level (0-32767, representing -100 to -30 dB) |
| `bytesReceived` | number | Bytes received in last second |
| `bytesSent` | number | Bytes sent in last second |
| `codecName` | string | Audio codec ("pcmu" or "opus") |
| `jitter` | number | Packet delay variation |
| `mos` | number \| null | Mean Opinion Score (1.0 - ~4.5) |
| `packetsLost` | number | Packets lost in last second |
| `packetsLostFraction` | number | Packet loss ratio (0.0 - 1.0) |
| `packetsReceived` | number | Packets received in last second |
| `packetsSent` | number | Packets sent in last second |
| `rtt` | number | Round-trip time in milliseconds |
| `timestamp` | number | Timestamp of the sample |
| `totals` | RTCSampleTotals | Cumulative totals |

---

## RTCSampleTotals

Cumulative totals for packets and bytes.

```typescript
interface RTCSampleTotals {
  bytesReceived: number;
  bytesSent: number;
  packetsLost: number;
  packetsLostFraction: number;
  packetsReceived: number;
  packetsSent: number;
}
```

---

## RTCWarning

Warning data for statistics.

```typescript
interface RTCWarning {
  name?: string;
  samples?: RTCSample[];
  threshold?: ThresholdWarningData;
  value?: number;
  values?: number[];
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Name of the stat for this warning |
| `samples` | RTCSample[] | List of samples related to this warning |
| `threshold` | ThresholdWarningData | Threshold data that triggered the warning |
| `value` | number | Current value for the stat |
| `values` | number[] | List of recent values |

---

## ThresholdWarningData

Threshold information for RTCWarning.

```typescript
interface ThresholdWarningData {
  name: string;
  value: number;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Name of the threshold |
| `value` | number | Threshold value |

---

## NetworkTiming

Network-related time measurements for connection establishment.

```typescript
interface NetworkTiming {
  dtls?: TimeMeasurement;
  ice?: TimeMeasurement;
  peerConnection?: TimeMeasurement;
  signaling?: TimeMeasurement;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `dtls` | TimeMeasurement | DTLS connection (connecting to connected state) |
| `ice` | TimeMeasurement | ICE connection (checking to connected state) |
| `peerConnection` | TimeMeasurement | PeerConnection (connecting to connected state) |
| `signaling` | TimeMeasurement | Signaling connection (device.connect() to stable state) |

---

## TimeMeasurement

Timing measurements for operational milestones.

```typescript
interface TimeMeasurement {
  start: number;
  duration?: number;
  end?: number;
}
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `start` | number | Millisecond timestamp when process began (required) |
| `duration` | number | Milliseconds elapsed during measurement (optional) |
| `end` | number | Millisecond timestamp when process concluded (optional) |

---

## Device.Options

Configuration parameters for Device constructor. See [Device Class](./01-device-class.md) for full details.

---

## Device.ConnectOptions

Options for outgoing calls.

```typescript
interface ConnectOptions {
  params?: Record<string, string>;
  rtcConstraints?: RTCOfferOptions;
  rtcConfiguration?: RTCConfiguration;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `params` | Record<string, string> | Parameters passed to TwiML application |
| `rtcConstraints` | RTCOfferOptions | WebRTC offer constraints |
| `rtcConfiguration` | RTCConfiguration | WebRTC peer connection configuration |

### Example

```javascript
const call = await device.connect({
  params: {
    To: '+1234567890',
    From: '+0987654321',
    CustomParam: 'value'
  },
  rtcConstraints: {
    offerToReceiveAudio: true
  },
  rtcConfiguration: {
    iceServers: [
      { urls: 'stun:stun.example.com' }
    ]
  }
});
```

---

## CallMessage

The constituent values of a Call Message (Beta feature).

```typescript
interface CallMessage {
  content: string;
  contentType: string;
  messageType: string;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `content` | string | Message content |
| `contentType` | string | MIME type of content |
| `messageType` | string | Type of message |
