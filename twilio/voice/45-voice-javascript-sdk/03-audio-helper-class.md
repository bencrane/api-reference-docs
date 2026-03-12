# AudioHelper Class

> Provides input and output audio-based functionality in one convenient class.

**Extends:** EventEmitter

---

## Properties

### Audio Devices

| Property | Type | Description |
|----------|------|-------------|
| `availableInputDevices` | Map<string, MediaDeviceInfo> | All accessible microphone devices by ID |
| `availableOutputDevices` | Map<string, MediaDeviceInfo> | All accessible speaker devices by ID |
| `speakerDevices` | OutputDeviceCollection | Output devices for call audio (voice, DTMF, disconnect sounds) |
| `ringtoneDevices` | OutputDeviceCollection | Output devices for incoming ringtone audio |

### Capabilities

| Property | Type | Description |
|----------|------|-------------|
| `isOutputSelectionSupported` | boolean | Browser support for output device selection |
| `isVolumeSupported` | boolean | Browser support for real-time volume analysis |

---

## Accessors

| Accessor | Type | Description |
|----------|------|-------------|
| `inputDevice` | MediaDeviceInfo \| null | Currently active microphone device |
| `inputStream` | MediaStream \| null | Audio stream from microphone or processor |
| `audioConstraints` | MediaTrackConstraints \| null | Currently applied media constraints |
| `localProcessedStream` | MediaStream \| null | Processed local audio (if processor attached) |
| `remoteProcessedStream` | MediaStream \| null | Processed remote audio (if processor attached) |

---

## Methods

### Device Management

#### setInputDevice(deviceId)
```typescript
setInputDevice(deviceId: string): Promise<void>
```
Select a microphone by device ID.

#### unsetInputDevice()
```typescript
unsetInputDevice(): Promise<void>
```
Release the current microphone.

#### setAudioConstraints(constraints)
```typescript
setAudioConstraints(constraints: MediaTrackConstraints): Promise<void>
```
Apply media constraints to the audio input.

**Example constraints:**
```javascript
await device.audio.setAudioConstraints({
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true
});
```

#### unsetAudioConstraints()
```typescript
unsetAudioConstraints(): Promise<void>
```
Remove all applied audio constraints.

---

### Audio Processing

#### addProcessor(processor, isRemote?)
```typescript
addProcessor(processor: AudioProcessor, isRemote?: boolean): void
```
Attach an audio processor to the input or output stream.

- `isRemote = false` (default): Process local microphone audio
- `isRemote = true`: Process remote call audio

#### removeProcessor(processor, isRemote?)
```typescript
removeProcessor(processor: AudioProcessor, isRemote?: boolean): void
```
Detach an audio processor.

---

### Sound Control

#### incoming(enable)
```typescript
incoming(enable: boolean): void
```
Toggle incoming ringtone sound.

#### outgoing(enable)
```typescript
outgoing(enable: boolean): void
```
Toggle outgoing call sound.

#### disconnect(enable)
```typescript
disconnect(enable: boolean): void
```
Toggle disconnect sound.

---

## Usage Examples

### List and Select Input Devices

```javascript
const audioHelper = device.audio;

// List all microphones
audioHelper.availableInputDevices.forEach((device, id) => {
  console.log(`${id}: ${device.label}`);
});

// Select a specific microphone
await audioHelper.setInputDevice('deviceId123');

// Check current input
console.log('Current mic:', audioHelper.inputDevice?.label);
```

### Manage Output Devices

```javascript
// List all speakers
audioHelper.availableOutputDevices.forEach((device, id) => {
  console.log(`${id}: ${device.label}`);
});

// Set speaker for call audio
await audioHelper.speakerDevices.set('speakerId123');

// Set speaker for ringtone (can be different)
await audioHelper.ringtoneDevices.set('speakerId456');

// Test speakers
await audioHelper.speakerDevices.test();
```

### Custom Audio Processing

```javascript
// Create a noise suppression processor
const noiseProcessor = {
  async createProcessedStream(stream) {
    // Apply noise suppression
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);

    // ... apply processing ...

    const destination = audioContext.createMediaStreamDestination();
    source.connect(destination);

    return destination.stream;
  },

  async destroyProcessedStream(stream) {
    // Cleanup
    stream.getTracks().forEach(track => track.stop());
  }
};

// Add processor to local audio
audioHelper.addProcessor(noiseProcessor, false);

// Add processor to remote audio
audioHelper.addProcessor(remoteProcessor, true);

// Remove later
audioHelper.removeProcessor(noiseProcessor, false);
```

### Audio Constraints

```javascript
// Apply constraints
await audioHelper.setAudioConstraints({
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  channelCount: 1,
  sampleRate: 48000
});

// Remove constraints
await audioHelper.unsetAudioConstraints();
```

### Disable Sounds

```javascript
// Disable all sounds
audioHelper.incoming(false);   // No ringtone
audioHelper.outgoing(false);   // No outgoing sound
audioHelper.disconnect(false); // No disconnect sound
```

---

## Events

The AudioHelper extends EventEmitter but primarily manages device states through the Device's event system. Listen on the Device for audio-related events:

```javascript
device.on('audio', (inputEnabled, outputEnabled) => {
  console.log('Audio state:', { inputEnabled, outputEnabled });
});
```
