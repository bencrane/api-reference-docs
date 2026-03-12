# OutputDeviceCollection Class

> A smart collection containing a Set of active output devices.

Used for managing speaker devices for call audio (`speakerDevices`) and ringtone audio (`ringtoneDevices`).

---

## Methods

### get()
```typescript
get(): Set<MediaDeviceInfo>
```
Retrieves the current collection of active output devices as a Set.

**Returns:** `Set<MediaDeviceInfo>`

---

### set(deviceIdOrIds)
```typescript
set(deviceIdOrIds: string | string[]): Promise<void>
```
Replaces all current devices with new ones using device ID(s).

**Parameters:**
- `deviceIdOrIds`: Single device ID or array of device IDs

**Throws:** Rejects if:
- Feature isn't supported by the browser
- Supplied IDs aren't found
- No IDs are provided

---

### delete(device)
```typescript
delete(device: MediaDeviceInfo): boolean
```
Removes a specified device from the collection.

**Behavior:** If deletion leaves no devices, the system automatically adds either the 'default' device or the first available device as a fallback.

**Returns:** `boolean` - Whether the device existed before removal

---

### test(soundUrl?)
```typescript
test(soundUrl?: string): Promise<void>
```
Plays audio through the configured devices to test them.

**Parameters:**
- `soundUrl` (optional): Custom audio URL to play. If omitted, a default test tone plays.

**Returns:** Promise resolving with results from the underlying HTMLAudioElements' play() methods.

---

## Usage Examples

### Basic Speaker Selection

```javascript
const audioHelper = device.audio;

// Get current speakers
const currentSpeakers = audioHelper.speakerDevices.get();
console.log('Current speakers:', [...currentSpeakers].map(d => d.label));

// Set a single speaker
await audioHelper.speakerDevices.set('speaker-device-id');

// Set multiple speakers (for redundancy)
await audioHelper.speakerDevices.set([
  'speaker-device-id-1',
  'speaker-device-id-2'
]);
```

### Separate Ringtone and Call Audio

```javascript
// Use external speaker for ringtone (louder)
await audioHelper.ringtoneDevices.set('external-speaker-id');

// Use headphones for call audio (private)
await audioHelper.speakerDevices.set('headphone-id');
```

### Test Speakers

```javascript
// Test with default tone
await audioHelper.speakerDevices.test();

// Test with custom sound
await audioHelper.speakerDevices.test('https://example.com/test-tone.mp3');
```

### Remove a Device

```javascript
const speakers = audioHelper.speakerDevices.get();
const firstSpeaker = [...speakers][0];

// Remove device (will auto-add fallback if this was the only one)
const existed = audioHelper.speakerDevices.delete(firstSpeaker);
console.log('Device existed:', existed);
```

### List Available Output Devices

```javascript
// Get all available output devices
const available = audioHelper.availableOutputDevices;

// Find device by label
let targetDevice = null;
available.forEach((device, id) => {
  if (device.label.includes('Headphones')) {
    targetDevice = id;
  }
});

if (targetDevice) {
  await audioHelper.speakerDevices.set(targetDevice);
}
```

---

## Browser Support

Output device selection requires browser support. Check before using:

```javascript
if (audioHelper.isOutputSelectionSupported) {
  // Can select output devices
  await audioHelper.speakerDevices.set(deviceId);
} else {
  // Browser doesn't support output selection
  console.warn('Output device selection not supported');
}
```

**Supported browsers:**
- Chrome 49+
- Edge 79+
- Opera 36+

**Not supported:**
- Firefox
- Safari
