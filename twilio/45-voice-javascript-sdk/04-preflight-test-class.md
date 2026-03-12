# PreflightTest Class

> Runs tests to identify issues prohibiting successful calling. Use before or during calls to troubleshoot connectivity and bandwidth issues.

**Extends:** EventEmitter

---

## Constructor

```typescript
new PreflightTest(token: string, options?: PreflightTest.Options)
```

Or via Device:
```typescript
device.runPreflight(token, options);
```

---

## Properties (Accessors)

| Property | Type | Description |
|----------|------|-------------|
| `callSid` | string \| undefined | The CallSid generated for the test call |
| `status` | PreflightTest.Status | The current status of the test |
| `startTime` | number | Timestamp (ms) of when the test started |
| `endTime` | number \| undefined | Timestamp (ms) of when the test ended |
| `latestSample` | RTCSample \| undefined | The latest WebRTC sample collected |
| `report` | PreflightTest.Report \| undefined | The final report (available after completion) |

---

## Methods

#### stop()
```typescript
stop(): void
```
Stops the current test and raises a `failed` event.

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `connected` | - | Test reached Connected status |
| `completed` | Report | Test completed; report is available |
| `failed` | DOMException \| TwilioError | Connection failure or fatal error |
| `sample` | RTCSample | WebRTC statistics (emitted every second) |
| `warning` | (name, WarningData) | Warning occurred during the call |

---

## PreflightTest.Status Enum

| Value | Description |
|-------|-------------|
| `Connecting` | Test is connecting |
| `Connected` | Test call is connected |
| `Completed` | Test completed successfully |
| `Failed` | Test failed |

---

## PreflightTest.CallQuality Enum

| Value | Description |
|-------|-------------|
| `Excellent` | Excellent call quality expected |
| `Great` | Great call quality expected |
| `Good` | Good call quality expected |
| `Fair` | Fair call quality expected |
| `Degraded` | Degraded call quality expected |

---

## PreflightTest.Report

The report object returned after test completion:

| Property | Type | Description |
|----------|------|-------------|
| `callQuality` | CallQuality | Overall quality assessment |
| `callSid` | string | The test call SID |
| `edge` | string | Edge location used |
| `iceCandidateStats` | IceCandidateStats[] | ICE candidate information |
| `networkTiming` | NetworkTiming | Connection timing measurements |
| `samples` | RTCSample[] | All collected WebRTC samples |
| `selectedEdge` | string | Actually selected edge |
| `selectedIceCandidatePairStats` | IceCandidatePairStats | Selected ICE candidate pair |
| `stats` | Stats | Aggregated statistics |
| `testTiming` | TimeMeasurement | Overall test timing |
| `totals` | RTCSampleTotals | Total packets/bytes |
| `warnings` | Warning[] | Any warnings raised |

---

## PreflightTest.Options

| Option | Type | Description |
|--------|------|-------------|
| `codecPreferences` | Codec[] | Preferred audio codecs |
| `edge` | string | Edge location to test |
| `fakeMicInput` | boolean | Use fake microphone input |
| `iceServers` | RTCIceServer[] | Custom ICE servers |
| `signalingTimeoutMs` | number | Signaling timeout |

---

## NetworkTiming Interface

| Property | Type | Description |
|----------|------|-------------|
| `dtls` | TimeMeasurement | DTLS connection establishment |
| `ice` | TimeMeasurement | ICE connection establishment |
| `peerConnection` | TimeMeasurement | PeerConnection establishment |
| `signaling` | TimeMeasurement | Signaling connection establishment |

---

## Usage Example

```javascript
import { Device } from '@twilio/voice-sdk';

const device = new Device(token);

// Run preflight test
const preflightTest = device.runPreflight(token, {
  edge: 'ashburn',
  codecPreferences: ['opus']
});

// Monitor progress
preflightTest.on('connected', () => {
  console.log('Test call connected');
});

preflightTest.on('sample', (sample) => {
  console.log('RTT:', sample.rtt, 'ms');
  console.log('Jitter:', sample.jitter);
  console.log('Packet Loss:', sample.packetsLostFraction);
  console.log('MOS:', sample.mos);
});

preflightTest.on('warning', (name, data) => {
  console.warn('Warning:', name, data);
});

preflightTest.on('completed', (report) => {
  console.log('=== Preflight Report ===');
  console.log('Call Quality:', report.callQuality);
  console.log('Edge:', report.selectedEdge);

  // Network timing
  const timing = report.networkTiming;
  console.log('Signaling:', timing.signaling?.duration, 'ms');
  console.log('ICE:', timing.ice?.duration, 'ms');
  console.log('DTLS:', timing.dtls?.duration, 'ms');

  // Statistics
  const stats = report.stats;
  console.log('Avg RTT:', stats.rtt?.average);
  console.log('Avg Jitter:', stats.jitter?.average);
  console.log('Avg MOS:', stats.mos?.average);

  // Warnings
  if (report.warnings.length > 0) {
    console.log('Warnings:', report.warnings);
  }
});

preflightTest.on('failed', (error) => {
  console.error('Preflight failed:', error.message);
});

// Stop test early if needed
// preflightTest.stop();
```

---

## Interpreting Results

### Call Quality Levels

| Quality | MOS Range | Description |
|---------|-----------|-------------|
| Excellent | 4.2+ | Crystal clear audio |
| Great | 4.0 - 4.2 | Very good quality |
| Good | 3.6 - 4.0 | Acceptable quality |
| Fair | 3.1 - 3.6 | Noticeable degradation |
| Degraded | < 3.1 | Poor quality, may have issues |

### Common Warnings

- **high-rtt**: Round-trip time > 400ms
- **high-jitter**: Packet jitter is high
- **high-packet-loss**: Packet loss > 3%
- **low-mos**: Mean Opinion Score is low

### Recommended Thresholds

| Metric | Good | Warning |
|--------|------|---------|
| RTT | < 200ms | > 400ms |
| Jitter | < 30ms | > 50ms |
| Packet Loss | < 1% | > 3% |
| MOS | > 4.0 | < 3.5 |
