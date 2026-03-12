# Twilio Voice JavaScript SDK - API Reference

> **Package:** `@twilio/voice-sdk`
> **Source:** https://github.com/twilio/twilio-voice.js
> **Docs:** https://twilio.github.io/twilio-voice.js/
> **Purpose:** Enables real-time voice and PSTN calling in web applications.

---

## Installation

```bash
npm install @twilio/voice-sdk --save
```

> Note: CDN distribution was discontinued as of v2.0

---

## Quick Navigation for LLM Agents

This folder contains comprehensive API documentation for the Twilio Voice JavaScript SDK.

### File Structure

| File | Description |
|------|-------------|
| `00-index.md` | This overview file |
| `01-device-class.md` | Device class - main entry point |
| `02-call-class.md` | Call class - call management |
| `03-audio-helper-class.md` | AudioHelper class - audio device management |
| `04-preflight-test-class.md` | PreflightTest class - connectivity testing |
| `05-output-device-collection-class.md` | OutputDeviceCollection class |
| `06-interfaces.md` | All interfaces (Options, AudioProcessor, RTCSample, etc.) |
| `07-enums.md` | All enumerations (Edge, State, etc.) |
| `08-errors.md` | TwilioError namespace and error handling |

---

## Core Classes

| Class | Description |
|-------|-------------|
| **Device** | Main entry point. Enables registration for incoming calls and placement of outgoing calls. |
| **Call** | Represents a media and signaling connection to a TwiML application. |
| **AudioHelper** | Provides input and output audio-based functionality. |
| **PreflightTest** | Runs tests to identify issues prohibiting successful calling. |
| **OutputDeviceCollection** | Smart collection containing active output devices. |

---

## Interfaces

| Interface | Description |
|-----------|-------------|
| **Device.Options** | Configuration parameters for Device constructor. |
| **Device.ConnectOptions** | Options for outgoing calls. |
| **AudioProcessor** | Contract for custom audio processing. |
| **NetworkTiming** | Network-related time measurements. |
| **RTCSample** | Real-time communication statistics. |
| **RTCSampleTotals** | Totals for packets and bytes information. |
| **RTCWarning** | Warning data for statistics. |
| **ThresholdWarningData** | Threshold information for RTCWarning. |
| **TimeMeasurement** | Timing measurements for operational milestones. |

---

## Enumerations

| Enum | Description |
|------|-------------|
| **Edge** | Valid geographical and interconnect edge locations. |
| **Device.State** | Device operational states (Destroyed, Registered, Registering, Unregistered). |
| **Call.State** | Call lifecycle states (Closed, Connecting, Open, Pending, Reconnecting, Ringing). |
| **Call.Codec** | Audio codecs (PCMU, Opus). |
| **PreflightTest.Status** | Test state tracking. |
| **PreflightTest.CallQuality** | Quality assessment levels. |

---

## Error Handling

The SDK provides structured error handling through the **TwilioError** namespace:

### Error Categories
- AuthorizationErrors
- ClientErrors
- GeneralErrors
- MalformedRequestErrors
- MediaErrors
- SignalingErrors
- SignatureValidationErrors
- SIPServerErrors
- UserMediaErrors

### Error Classes
- TwilioError (base class)
- InvalidArgumentError
- InvalidStateError
- NotSupportedError

---

## Common Usage Patterns

### Initialize Device and Make Outbound Call

```javascript
import { Device } from '@twilio/voice-sdk';

const device = new Device(token, {
  edge: 'ashburn',
  codecPreferences: ['opus', 'pcmu']
});

await device.register();

const call = await device.connect({
  params: { To: '+1234567890' }
});

call.on('accept', () => console.log('Call connected'));
call.on('disconnect', () => console.log('Call ended'));
```

### Handle Incoming Calls

```javascript
device.on('incoming', (call) => {
  console.log('Incoming call from:', call.parameters.From);

  call.accept();
  // or call.reject();
});
```

### Audio Device Management

```javascript
const audioDevices = device.audio.availableInputDevices;

// Select specific microphone
await device.audio.setInputDevice(deviceId);

// Get speaker devices
const speakers = device.audio.speakerDevices;
await speakers.set(speakerId);
```

### Run Preflight Test

```javascript
const preflightTest = device.runPreflight(token);

preflightTest.on('completed', (report) => {
  console.log('Call quality:', report.callQuality);
  console.log('Network timing:', report.networkTiming);
});

preflightTest.on('failed', (error) => {
  console.error('Preflight failed:', error);
});
```

---

## Events

### Device Events
| Event | Description |
|-------|-------------|
| `registered` | Successfully registered for incoming calls |
| `registering` | Registration process initiated |
| `unregistered` | Unregistration completed |
| `incoming` | Incoming call received |
| `tokenWillExpire` | Token expiration imminent |
| `error` | Error occurred |
| `destroyed` | Device instance destroyed |

### Call Events
| Event | Description |
|-------|-------------|
| `accept` | Call accepted |
| `audio` | Audio state changed |
| `cancel` | Call cancelled |
| `disconnect` | Call disconnected |
| `error` | Error occurred |
| `messageReceived` | Message received (Beta) |
| `messageSent` | Message sent (Beta) |
| `mute` | Mute state changed |
| `reconnected` | Call reconnected |
| `reconnecting` | Call reconnecting |
| `reject` | Call rejected |
| `ringing` | Call ringing |
| `sample` | WebRTC sample received |
| `volume` | Volume changed |
| `warning` | Quality warning |
| `warningCleared` | Warning cleared |

---

## Edge Locations

### Standard Edges
- `ashburn` - US East
- `dublin` - Ireland
- `frankfurt` - Germany
- `roaming` - Auto-select (default)
- `sao-paulo` - Brazil
- `singapore` - Singapore
- `sydney` - Australia
- `tokyo` - Japan
- `umatilla` - US West

### Interconnect Edges
- `ashburn-ix`, `frankfurt-ix`, `london-ix`, `san-jose-ix`, `singapore-ix`, `sydney-ix`, `tokyo-ix`

---

## Browser Compatibility

Check `Device.isSupported` to verify browser compatibility before initializing.

```javascript
if (Device.isSupported) {
  const device = new Device(token);
} else {
  console.error('Browser not supported');
}
```

---

## Content Security Policy

If using CSP, add these directives:

```
script-src blob:
connect-src *.twilio.com wss://*.twilio.com
media-src mediastream:
```

---

## Migration from twilio-client.js 1.x

This SDK replaces the legacy `twilio-client.js`. See the migration guide for upgrade instructions.
