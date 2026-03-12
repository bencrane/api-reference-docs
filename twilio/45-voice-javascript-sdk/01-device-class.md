# Device Class

> Twilio's primary interface for voice communication. Enables registration for incoming calls and placement of outgoing calls.

**Extends:** EventEmitter

---

## Static Properties

| Property | Type | Description |
|----------|------|-------------|
| `isSupported` | boolean | Browser compatibility check |
| `version` | string | Current SDK version |
| `packageName` | string | Package identifier |

---

## Instance Properties

| Property | Type | Description |
|----------|------|-------------|
| `state` | Device.State | Current Device state |
| `isBusy` | boolean | Whether Device is actively on a call |
| `identity` | string | Associated identity for incoming calls (populated when registered) |
| `token` | string | JWT authentication token |
| `edge` | string \| null | Current edge server connection (null when offline) |
| `home` | string \| null | Home region value (null when offline) |
| `calls` | Call[] | Array of active Call objects |
| `audio` | AudioHelper | AudioHelper instance for audio operations |

---

## Constructor

```typescript
new Device(token: string, options?: Device.Options)
```

### Device.Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `allowIncomingWhileBusy` | boolean | false | Raise incoming event when already on a call |
| `appName` | string | - | Application identifier for Insights logging |
| `appVersion` | string | - | Application version for tracking |
| `closeProtection` | string \| boolean | - | Prevent accidental page navigation during calls |
| `codecPreferences` | Codec[] | - | Ordered array of codec names (most to least preferred) |
| `disableAudioContextSounds` | boolean | - | Disable AudioContext, use HTMLAudioElement fallback |
| `maxAverageBitrate` | number | - | Audio bitrate limit in bps (recommended 8000-40000) |
| `edge` | string \| string[] | "roaming" | Geographic connection location |
| `dscp` | boolean | - | Enable googDscp in RTC constraints |
| `forceAggressiveIceNomination` | boolean | - | Experimental ICE nomination strategy |
| `maxCallSignalingTimeoutMs` | number | - | Max reconnection duration before edge-fallback |
| `enableImprovedSignalingErrorPrecision` | boolean | - | More precise error codes |
| `logLevel` | LogLevelDesc | - | Logging verbosity (0-5 or trace/debug/info/warn/error/silent) |
| `tokenRefreshMs` | number | 10000 | Milliseconds before token expiration to emit tokenWillExpire |
| `sounds` | Record<SoundName, string> | - | Custom sound URLs by sound name |

---

## Methods

### Registration

#### register()
```typescript
register(): Promise<void>
```
Enables the Device to receive incoming calls.

#### unregister()
```typescript
unregister(): Promise<void>
```
Disables incoming call reception.

---

### Call Operations

#### connect(options?)
```typescript
connect(options?: Device.ConnectOptions): Promise<Call>
```
Initiates an outgoing call. Returns a Promise that resolves to a Call object.

**ConnectOptions:**
| Option | Type | Description |
|--------|------|-------------|
| `params` | Record<string, string> | Parameters to pass to TwiML app |
| `rtcConstraints` | RTCOfferOptions | WebRTC constraints |
| `rtcConfiguration` | RTCConfiguration | WebRTC configuration |

#### disconnectAll()
```typescript
disconnectAll(): void
```
Terminates all active calls.

---

### Configuration

#### updateToken(token)
```typescript
updateToken(token: string): void
```
Refreshes the authentication token.

#### updateOptions(options?)
```typescript
updateOptions(options?: Device.Options): void
```
Modifies Device settings.

---

### Testing

#### runPreflight(token, options?)
```typescript
runPreflight(token: string, options?: PreflightTest.Options): PreflightTest
```
Diagnostic tool for identifying communication issues.

---

### Cleanup

#### destroy()
```typescript
destroy(): void
```
Releases device resources for garbage collection.

---

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `registered` | - | Successfully registered for incoming calls |
| `registering` | - | Registration process initiated |
| `unregistered` | - | Unregistration completed |
| `incoming` | Call | Incoming call received |
| `tokenWillExpire` | Device | Token expiration imminent |
| `error` | TwilioError | Error occurred |
| `destroyed` | - | Device instance destroyed |

### Event Example

```javascript
device.on('incoming', (call) => {
  console.log('Incoming call from:', call.parameters.From);
  call.accept();
});

device.on('tokenWillExpire', () => {
  // Fetch new token and update
  device.updateToken(newToken);
});

device.on('error', (error) => {
  console.error('Device error:', error.message);
});
```

---

## Device.State Enum

| Value | String | Description |
|-------|--------|-------------|
| `Destroyed` | "destroyed" | Device has been destroyed |
| `Registered` | "registered" | Device is registered and can receive calls |
| `Registering` | "registering" | Device is in the process of registering |
| `Unregistered` | "unregistered" | Device is not registered |

---

## Usage Example

```javascript
import { Device } from '@twilio/voice-sdk';

// Initialize
const device = new Device(token, {
  edge: 'ashburn',
  logLevel: 'debug',
  codecPreferences: ['opus', 'pcmu'],
  allowIncomingWhileBusy: true
});

// Register for incoming calls
await device.register();

// Make outgoing call
const call = await device.connect({
  params: {
    To: '+1234567890',
    CustomParam: 'value'
  }
});

// Handle incoming calls
device.on('incoming', (incomingCall) => {
  incomingCall.accept();
});

// Cleanup
device.destroy();
```
